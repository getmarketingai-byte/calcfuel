"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

// Prompt caching pricing per 1M tokens (May 2025)
const MODELS = [
  { label: "Claude Sonnet 4.5", value: "claude-sonnet", provider: "anthropic", inputPer1M: 3.00, outputPer1M: 15.00, cacheWritePer1M: 3.75, cacheReadPer1M: 0.30, storagePer1MPerHour: 0 },
  { label: "Claude Haiku 3.5", value: "claude-haiku", provider: "anthropic", inputPer1M: 0.80, outputPer1M: 4.00, cacheWritePer1M: 1.00, cacheReadPer1M: 0.08, storagePer1MPerHour: 0 },
  { label: "Claude Opus 4.5", value: "claude-opus", provider: "anthropic", inputPer1M: 15.00, outputPer1M: 75.00, cacheWritePer1M: 18.75, cacheReadPer1M: 1.50, storagePer1MPerHour: 0 },
  { label: "GPT-4o", value: "gpt-4o", provider: "openai", inputPer1M: 2.50, outputPer1M: 10.00, cacheWritePer1M: 0, cacheReadPer1M: 1.25, storagePer1MPerHour: 0 },
  { label: "GPT-4o mini", value: "gpt-4o-mini", provider: "openai", inputPer1M: 0.15, outputPer1M: 0.60, cacheWritePer1M: 0, cacheReadPer1M: 0.075, storagePer1MPerHour: 0 },
  { label: "Gemini 1.5 Pro", value: "gemini-pro", provider: "google", inputPer1M: 1.25, outputPer1M: 5.00, cacheWritePer1M: 0, cacheReadPer1M: 0.3125, storagePer1MPerHour: 1.00 },
  { label: "Gemini 1.5 Flash", value: "gemini-flash", provider: "google", inputPer1M: 0.075, outputPer1M: 0.30, cacheWritePer1M: 0, cacheReadPer1M: 0.01875, storagePer1MPerHour: 0.25 },
];

function fmt(n: number) {
  if (n >= 1000) return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  if (n >= 1) return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(n);
}

function fmtNum(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(n);
}

const CHARS_PER_TOKEN = 4;

export default function PromptCachingCalc() {
  const [promptTokens, setPromptTokens] = useState("5000");
  const [promptChars, setPromptChars] = useState("");
  const [dailyQueries, setDailyQueries] = useState("1000");
  const [outputTokens, setOutputTokens] = useState("300");
  const [selectedModel, setSelectedModel] = useState("claude-sonnet");
  const [useCharEstimator, setUseCharEstimator] = useState(false);

  const [result, setResult] = useState<{
    withoutCachingMonthly: number;
    withCachingMonthly: number;
    savings: number;
    savingsPct: number;
    breakEvenQueries: number | null;
    provider: string;
    discountLabel: string;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Estimate tokens from character count
  useEffect(() => {
    if (useCharEstimator && promptChars) {
      const chars = parseFloat(promptChars);
      if (chars > 0) {
        setPromptTokens(Math.ceil(chars / CHARS_PER_TOKEN).toString());
      }
    }
  }, [promptChars, useCharEstimator]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const tokens = parseFloat(promptTokens);
      const queries = parseFloat(dailyQueries);
      const outTok = parseFloat(outputTokens);

      if (!promptTokens && !dailyQueries) { setResult(null); setError(""); return; }
      if (!tokens || !queries || tokens <= 0 || queries <= 0) {
        setError("Please enter valid positive numbers for prompt tokens and daily queries.");
        setResult(null);
        return;
      }
      if (tokens < 512) {
        setError("Prompt caching typically requires at least 512–1024 tokens to be effective. Increase your prompt length.");
        setResult(null);
        return;
      }

      const model = MODELS.find(m => m.value === selectedModel)!;
      const output = outTok > 0 ? outTok : 300;

      // Monthly without caching: all prompt tokens charged as input on every request
      const withoutCachingMonthly = (
        30 * queries * (tokens * model.inputPer1M + output * model.outputPer1M)
      ) / 1_000_000;

      let withCachingMonthly: number;
      let breakEvenQueries: number | null = null;
      let discountLabel: string;

      if (model.provider === "anthropic") {
        // 1 cache write per day (session), then daily_queries * cache reads
        const dailyCacheCost = (
          1 * tokens * model.cacheWritePer1M +
          queries * tokens * model.cacheReadPer1M +
          queries * output * model.outputPer1M
        ) / 1_000_000;
        withCachingMonthly = dailyCacheCost * 30;

        // Break-even: write cost premium / per-query savings
        // Extra cost of one write vs one standard read = (cacheWritePer1M - inputPer1M) * tokens / 1M
        // Savings per subsequent read = (inputPer1M - cacheReadPer1M) * tokens / 1M
        const extraWriteCost = ((model.cacheWritePer1M - model.inputPer1M) * tokens) / 1_000_000;
        const savingsPerRead = ((model.inputPer1M - model.cacheReadPer1M) * tokens) / 1_000_000;
        breakEvenQueries = savingsPerRead > 0 ? Math.ceil(extraWriteCost / savingsPerRead) + 1 : null;
        discountLabel = "90% discount on cached reads";
      } else if (model.provider === "openai") {
        // Auto-caching: all prompt tokens charged at cached rate (no write overhead)
        withCachingMonthly = (
          30 * queries * (tokens * model.cacheReadPer1M + output * model.outputPer1M)
        ) / 1_000_000;
        breakEvenQueries = 1; // immediate savings, no write cost
        discountLabel = "50% discount on cached input tokens (automatic)";
      } else {
        // Google: cached reads + hourly storage for 24h/day
        const storagePerHour = model.storagePer1MPerHour;
        withCachingMonthly = (
          30 * queries * (tokens * model.cacheReadPer1M + output * model.outputPer1M) +
          30 * 24 * tokens * storagePerHour
        ) / 1_000_000;
        breakEvenQueries = null; // depends on storage duration
        discountLabel = "75% discount on cached input tokens";
      }

      const savings = withoutCachingMonthly - withCachingMonthly;
      const savingsPct = withoutCachingMonthly > 0 ? (savings / withoutCachingMonthly) * 100 : 0;

      setError("");
      setResult({
        withoutCachingMonthly,
        withCachingMonthly,
        savings,
        savingsPct,
        breakEvenQueries,
        provider: model.provider,
        discountLabel,
      });

      trackCalculation("prompt_caching_discount_estimator", {
        prompt_tokens: tokens,
        daily_queries: queries,
        output_tokens: output,
        model: selectedModel,
        without_caching_monthly_usd: parseFloat(withoutCachingMonthly.toFixed(2)),
        with_caching_monthly_usd: parseFloat(withCachingMonthly.toFixed(2)),
        monthly_savings_usd: parseFloat(savings.toFixed(2)),
        savings_pct: parseFloat(savingsPct.toFixed(1)),
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [promptTokens, dailyQueries, outputTokens, selectedModel]);

  const model = MODELS.find(m => m.value === selectedModel)!;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Estimate Your Prompt Caching Savings</h2>

      {/* Model selector */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Model / Provider
        </label>
        <select
          value={selectedModel}
          onChange={e => setSelectedModel(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <optgroup label="Anthropic (explicit cache write + read)">
            {MODELS.filter(m => m.provider === "anthropic").map(m => (
              <option key={m.value} value={m.value}>{m.label} — ${m.inputPer1M}/M input · ${m.cacheReadPer1M}/M cache read</option>
            ))}
          </optgroup>
          <optgroup label="OpenAI (automatic caching, 50% discount)">
            {MODELS.filter(m => m.provider === "openai").map(m => (
              <option key={m.value} value={m.value}>{m.label} — ${m.inputPer1M}/M input · ${m.cacheReadPer1M}/M cached</option>
            ))}
          </optgroup>
          <optgroup label="Google (context caching, 75% discount + storage)">
            {MODELS.filter(m => m.provider === "google").map(m => (
              <option key={m.value} value={m.value}>{m.label} — ${m.inputPer1M}/M input · ${m.cacheReadPer1M}/M cached</option>
            ))}
          </optgroup>
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {model.provider === "google"
            ? `Cache discount: 75% off input · Storage: $${model.storagePer1MPerHour}/M tokens/hr`
            : model.provider === "anthropic"
            ? `Cache write: $${model.cacheWritePer1M}/M · Cache read: $${model.cacheReadPer1M}/M`
            : `Cached input: $${model.cacheReadPer1M}/M (automatic, no write fee)`}
        </p>
      </div>

      {/* Prompt token input */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            System Prompt Length
          </label>
          <button
            type="button"
            onClick={() => setUseCharEstimator(!useCharEstimator)}
            className="text-xs text-orange-500 hover:text-orange-600 underline"
          >
            {useCharEstimator ? "Enter tokens directly" : "Estimate from characters"}
          </button>
        </div>

        {useCharEstimator ? (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={promptChars}
              onChange={e => setPromptChars(e.target.value)}
              placeholder="e.g. 20000 characters"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <span className="text-sm text-gray-500 whitespace-nowrap">≈ {promptTokens || "—"} tokens</span>
          </div>
        ) : (
          <input
            type="number"
            inputMode="numeric"
            min="512"
            value={promptTokens}
            onChange={e => setPromptTokens(e.target.value)}
            placeholder="e.g. 5000 tokens"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Quick guide: 1,000 words ≈ 1,333 tokens · 10-page PDF ≈ 10,000 tokens · 100-page codebase ≈ 80,000 tokens
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Daily Queries (requests/day)
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            value={dailyQueries}
            onChange={e => setDailyQueries(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Avg Output Tokens per Query
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            value={outputTokens}
            onChange={e => setOutputTokens(e.target.value)}
            placeholder="e.g. 300"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result !== null && (
        <div aria-live="polite">
          {/* Savings banner */}
          {result.savings > 0 && (
            <div className="mb-6 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-5 py-4">
              <p className="text-green-700 dark:text-green-400 font-bold text-lg">
                Prompt caching saves you {result.savingsPct.toFixed(1)}% on this prompt
              </p>
              <p className="text-green-600 text-sm mt-1">
                {result.discountLabel} · saves {fmt(result.savings)}/month
              </p>
              {result.breakEvenQueries !== null && result.breakEvenQueries <= 5 && (
                <p className="text-green-500 text-xs mt-1">
                  Break-even after just {result.breakEvenQueries} {result.breakEvenQueries === 1 ? "query" : "queries"} — caching pays off almost immediately
                </p>
              )}
            </div>
          )}

          {result.savings <= 0 && (
            <div className="mb-6 rounded-xl bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 px-5 py-4">
              <p className="text-yellow-700 dark:text-yellow-400 font-bold">
                Caching may not save money at this volume
              </p>
              <p className="text-yellow-600 text-sm mt-1">
                Storage costs (Google) or low query volume may offset the discount. Try increasing daily queries.
              </p>
            </div>
          )}

          {/* Cost comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="p-4 rounded-xl border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Without Caching / Month</p>
              <p className="text-2xl font-bold text-red-600">{fmt(result.withoutCachingMonthly)}</p>
              <p className="text-xs text-gray-500 mt-1">Full prompt sent every request</p>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">With Caching / Month</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.withCachingMonthly)}</p>
              <p className="text-xs text-gray-500 mt-1">Prompt read from cache</p>
            </div>
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Monthly Savings</p>
              <p className={`text-2xl font-bold ${result.savings > 0 ? "text-blue-600" : "text-gray-500"}`}>{fmt(Math.abs(result.savings))}</p>
              <p className="text-xs text-gray-500 mt-1">{result.savings > 0 ? `${result.savingsPct.toFixed(1)}% reduction` : "No saving at this volume"}</p>
            </div>
          </div>

          {/* Break-even detail */}
          {result.breakEvenQueries !== null && (
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mb-5">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Break-even point</h3>
              {result.breakEvenQueries <= 1 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Caching is <strong>always cheaper</strong> — no write overhead. Start caching immediately.
                </p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  After <strong>{fmtNum(result.breakEvenQueries)} queries</strong>, caching pays for its own write cost and every subsequent read is cheaper. At <strong>{fmtNum(parseFloat(dailyQueries))} queries/day</strong> you hit break-even in under a second.
                </p>
              )}
            </div>
          )}

          {/* Provider notes */}
          {result.provider === "google" && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 mb-5">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Google Context Caching note:</strong> The estimate above includes 24h of cache storage per day. If you cache for shorter periods (e.g. during peak hours only), your storage cost will be lower and savings will increase.
              </p>
            </div>
          )}

          {/* Assumptions */}
          <details className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">Show calculation assumptions</summary>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li>Anthropic: 1 cache write per day (session); all daily queries read from cache</li>
              <li>OpenAI: all prompt tokens charged at cached rate; no write overhead (automatic caching)</li>
              <li>Google: all requests hit cache; storage billed for 24h/day</li>
              <li>Output tokens are NOT cached — charged at standard output rate for all providers</li>
              <li>Prices from official provider pages, May 2025</li>
            </ul>
          </details>
        </div>
      )}

      {/* MarketingAI CTA */}
      <div className="mt-8 rounded-xl bg-gray-900 dark:bg-gray-950 text-white p-6">
        <h3 className="text-lg font-bold mb-2">Want your AI marketing system set up in a week?</h3>
        <p className="text-gray-300 text-sm mb-4">
          MarketingAI builds and hands over three coordinated, AI-assisted marketing systems — content engine, outbound lead sequence, and email nurture — configured to your business. Done in under a week. You own it permanently.
        </p>
        <a
          href="https://marketing-ai-psi-nine.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          Get your marketing system →
        </a>
      </div>
    </div>
  );
}
