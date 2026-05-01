"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function ProfitMarginCalc() {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [result, setResult] = useState<{ grossProfit: number; margin: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const r = parseFloat(revenue), c = parseFloat(cogs);
      if (!revenue && !cogs) { setResult(null); setError(""); return; }
      if (!r || r <= 0) { setError("Please enter a valid revenue amount."); setResult(null); return; }
      if (isNaN(c) || c < 0) { setError("Please enter a valid COGS amount."); setResult(null); return; }
      const grossProfit = r - c;
      const margin = (grossProfit / r) * 100;
      setError("");
      setResult({ grossProfit, margin });
      trackCalculation("profit_margin", { revenue: r, cogs: c, gross_profit: grossProfit, margin: parseFloat(margin.toFixed(1)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [revenue, cogs]);

  const getRating = (margin: number) =>
    margin >= 50 ? { label: "Excellent margin", color: "text-green-600" }
    : margin >= 30 ? { label: "Good margin", color: "text-blue-600" }
    : margin >= 15 ? { label: "Acceptable margin", color: "text-yellow-600" }
    : margin >= 0 ? { label: "Thin — review costs", color: "text-orange-500" }
    : { label: "Negative — losing money", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Profit Margin</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Revenue (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 100000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost of Goods Sold / COGS (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={cogs} onChange={e => setCogs(e.target.value)} placeholder="e.g. 60000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Profit Margin</p>
            <p className="text-4xl font-bold text-orange-500">{result.margin.toFixed(1)}%</p>
            <p className={"mt-2 text-sm font-medium " + getRating(result.margin).color}>{getRating(result.margin).label}</p>
          </div>
          <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Gross Profit</p>
            <p className={"text-4xl font-bold " + (result.grossProfit >= 0 ? "text-green-600" : "text-red-500")}>{fmt(result.grossProfit)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
