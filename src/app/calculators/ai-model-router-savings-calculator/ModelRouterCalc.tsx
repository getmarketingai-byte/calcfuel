"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

const MODELS = [
  { label: "GPT-4o", value: "gpt-4o", inputPer1M: 2.50, outputPer1M: 10.00 },
  { label: "GPT-4o mini", value: "gpt-4o-mini", inputPer1M: 0.15, outputPer1M: 0.60 },
  { label: "Claude Opus 4.5", value: "claude-opus", inputPer1M: 15.00, outputPer1M: 75.00 },
  { label: "Claude Sonnet 4.5", value: "claude-sonnet", inputPer1M: 3.00, outputPer1M: 15.00 },
  { label: "Claude Haiku 3.5", value: "claude-haiku", inputPer1M: 0.80, outputPer1M: 4.00 },
  { label: "Gemini 1.5 Pro", value: "gemini-pro", inputPer1M: 1.25, outputPer1M: 5.00 },
  { label: "Gemini 1.5 Flash", value: "gemini-flash", inputPer1M: 0.075, outputPer1M: 0.30 },
  { label: "Llama 3.1 70B (Groq)", value: "llama-groq", inputPer1M: 0.59, outputPer1M: 0.79 },
];

// 60% cheap / 40% expensive routing
const CHEAP_RATIO = 0.60;
const EXPENSIVE_RATIO = 0.40;

// Cheap model pairings for each expensive model
const CHEAP_PAIRING: Record<string, string> = {
  "gpt-4o": "gpt-4o-mini",
  "gpt-4o-mini": "llama-groq",
  "claude-opus": "claude-haiku",
  "claude-sonnet": "claude-haiku",
  "claude-haiku": "llama-groq",
  "gemini-pro": "gemini-flash",
  "gemini-flash": "llama-groq",
  "llama-groq": "llama-groq",
};

function costPerToken(model: (typeof MODELS)[number], tokens: number): number {
  // Assume 30% input tokens, 70% output tokens
  const inputTokens = tokens * 0.30;
  const outputTokens = tokens * 0.70;
  return (inputTokens * model.inputPer1M + outputTokens * model.outputPer1M) / 1_000_000;
}

export default function ModelRouterCalc() {
  const [dailyCalls, setDailyCalls] = useState("");
  const [tokensPerCall, setTokensPerCall] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [result, setResult] = useState<{
    currentMonthly: number;
    blendedMonthly: number;
    savings: number;
    savingsPct: number;
    cheapModel: string;
    expensiveModel: string;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const calls = parseFloat(dailyCalls);
      const tokens = parseFloat(tokensPerCall);

      if (!dailyCalls && !tokensPerCall) { setResult(null); setError(""); return; }
      if (!calls || !tokens || calls <= 0 || tokens <= 0) {
        setError("Please fill in all fields with valid positive numbers.");
        setResult(null);
        return;
      }

      const expensiveModel = MODELS.find(m => m.value === selectedModel)!;
      const cheapModelKey = CHEAP_PAIRING[selectedModel];
      const cheapModel = MODELS.find(m => m.value === cheapModelKey)!;

      const dailyCostCurrent = calls * costPerToken(expensiveModel, tokens);
      const currentMonthly = dailyCostCurrent * 30;

      const dailyCostBlended =
        calls * EXPENSIVE_RATIO * costPerToken(expensiveModel, tokens) +
        calls * CHEAP_RATIO * costPerToken(cheapModel, tokens);
      const blendedMonthly = dailyCostBlended * 30;

      const savings = currentMonthly - blendedMonthly;
      const savingsPct = currentMonthly > 0 ? (savings / currentMonthly) * 100 : 0;

      setError("");
      setResult({
        currentMonthly,
        blendedMonthly,
        savings,
        savingsPct,
        cheapModel: cheapModel.label,
        expensiveModel: expensiveModel.label,
      });

      trackCalculation("ai_model_router_savings", {
        daily_calls: calls,
        tokens_per_call: tokens,
        current_model: selectedModel,
        current_monthly_usd: parseFloat(currentMonthly.toFixed(2)),
        blended_monthly_usd: parseFloat(blendedMonthly.toFixed(2)),
        monthly_savings_usd: parseFloat(savings.toFixed(2)),
        savings_pct: parseFloat(savingsPct.toFixed(1)),
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [dailyCalls, tokensPerCall, selectedModel]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Routing Savings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Average Daily LLM Calls
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            value={dailyCalls}
            onChange={e => setDailyCalls(e.target.value)}
            placeholder="e.g. 10000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Avg Tokens Per Call (input + output)
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            value={tokensPerCall}
            onChange={e => setTokensPerCall(e.target.value)}
            placeholder="e.g. 2000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Your Current Model (the expensive one you send everything to)
        </label>
        <select
          value={selectedModel}
          onChange={e => setSelectedModel(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          {MODELS.map(m => (
            <option key={m.value} value={m.value}>
              {m.label} — ${m.inputPer1M.toFixed(3)}/M input · ${m.outputPer1M.toFixed(2)}/M output
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Routing assumption: 40% hard queries → {MODELS.find(m => m.value === selectedModel)?.label} · 60% easy queries → {MODELS.find(m => m.value === CHEAP_PAIRING[selectedModel])?.label}
        </p>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result !== null && (
        <div aria-live="polite">
          {result.savingsPct > 0 && (
            <div className="mb-6 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 px-5 py-4">
              <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">
                You are overspending by {result.savingsPct.toFixed(1)}% a month
              </p>
              <p className="text-orange-500 text-sm mt-1">
                Routing 60% of easy queries to {result.cheapModel} could save you {fmt(result.savings)}/month
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Monthly Cost</p>
              <p className="text-2xl font-bold text-red-600">{fmt(result.currentMonthly)}</p>
              <p className="text-xs text-gray-500 mt-1">All calls → {result.expensiveModel}</p>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Blended Monthly Cost</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.blendedMonthly)}</p>
              <p className="text-xs text-gray-500 mt-1">60% {result.cheapModel} · 40% {result.expensiveModel}</p>
            </div>
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Monthly Savings</p>
              <p className="text-2xl font-bold text-blue-600">{fmt(result.savings)}</p>
              <p className="text-xs text-gray-500 mt-1">{result.savingsPct.toFixed(1)}% reduction</p>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Routing breakdown</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span>Easy queries → {result.cheapModel}</span>
                  <span>60%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-green-400 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span>Hard queries → {result.expensiveModel}</span>
                  <span>40%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-orange-400 rounded-full" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </div>
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
