"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

const INDUSTRY_BENCHMARKS: Record<string, { label: string; pct: number; note: string }> = {
  b2c_ecommerce:    { label: "B2C E-commerce",        pct: 12, note: "High-competition direct-to-consumer" },
  b2b_saas:         { label: "B2B SaaS",               pct: 15, note: "Aggressive growth typical for SaaS" },
  b2b_services:     { label: "B2B Professional Services", pct: 8, note: "Relationship-driven sales cycle" },
  retail:           { label: "Retail (Brick & Mortar)", pct: 4,  note: "Lower margin drives conservative spend" },
  hospitality:      { label: "Hospitality & Tourism",  pct: 7,  note: "Seasonal campaigns common" },
  healthcare:       { label: "Healthcare & Wellness",  pct: 9,  note: "Regulated but growing digital spend" },
  financial:        { label: "Financial Services",     pct: 8,  note: "Trust-building content emphasis" },
  education:        { label: "Education & Training",   pct: 10, note: "Enrolment-driven paid campaigns" },
  real_estate:      { label: "Real Estate",            pct: 5,  note: "Lead-gen dominates spend" },
  startup:          { label: "Early-Stage Startup",    pct: 20, note: "Invest heavily to establish presence" },
};

export default function MarketingBudgetCalc() {
  const [revenue, setRevenue] = useState("");
  const [industry, setIndustry] = useState("b2b_saas");
  const [customPct, setCustomPct] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [result, setResult] = useState<{ budget: number; pct: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!revenue) { setResult(null); setError(""); return; }
      const r = parseFloat(revenue);
      if (!r || r <= 0) { setError("Please enter a valid annual revenue figure."); setResult(null); return; }
      const pct = useCustom ? parseFloat(customPct) : INDUSTRY_BENCHMARKS[industry].pct;
      if (!pct || pct <= 0 || pct > 100) { setError("Please enter a valid budget percentage (1–100)."); setResult(null); return; }
      const budget = (r * pct) / 100;
      setError("");
      setResult({ budget, pct });
      trackCalculation("marketing_budget", { annual_revenue: r, industry, budget_pct: pct, recommended_budget: parseFloat(budget.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [revenue, industry, customPct, useCustom]);

  const bench = INDUSTRY_BENCHMARKS[industry];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Recommended Marketing Budget</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Revenue ($)</label>
          <input
            type="number" inputMode="decimal" min="0" value={revenue}
            onChange={e => setRevenue(e.target.value)} placeholder="e.g. 500000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Industry / Business Stage</label>
          <select
            value={industry} onChange={e => { setIndustry(e.target.value); setUseCustom(false); }}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
          >
            {Object.entries(INDUSTRY_BENCHMARKS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">Benchmark: {bench.pct}% of revenue</span> — {bench.note}
      </div>
      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox" id="custom-pct" checked={useCustom}
          onChange={e => setUseCustom(e.target.checked)}
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
        />
        <label htmlFor="custom-pct" className="text-sm text-gray-700 dark:text-gray-300">Use custom percentage</label>
        {useCustom && (
          <input
            type="number" inputMode="decimal" min="0" max="100" value={customPct}
            onChange={e => setCustomPct(e.target.value)} placeholder="e.g. 10"
            className="w-24 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none text-sm"
          />
        )}
        {useCustom && <span className="text-sm text-gray-500">%</span>}
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800" aria-live="polite">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Recommended Annual Marketing Budget</p>
          <p className="text-4xl font-bold text-orange-500">${result.budget.toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
          <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{result.pct}% of ${parseFloat(revenue).toLocaleString("en-AU")} annual revenue</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Formula: ${parseFloat(revenue).toLocaleString("en-AU")} × {result.pct}% = ${result.budget.toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
      )}
    </div>
  );
}
