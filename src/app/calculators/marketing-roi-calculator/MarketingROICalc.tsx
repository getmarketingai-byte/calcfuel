"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function MarketingROICalc() {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState<{ roi: number; netProfit: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const r = parseFloat(revenue), c = parseFloat(cost);
      if (!revenue && !cost) { setResult(null); setError(""); return; }
      if (!r || !c || c <= 0) { setError("Please enter valid numbers."); setResult(null); return; }
      const res = { netProfit: r - c, roi: ((r - c) / c) * 100 };
      setError("");
      setResult(res);
      trackCalculation("marketing_roi", { revenue: r, cost: c, roi: parseFloat(res.roi.toFixed(1)), net_profit: res.netProfit });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [revenue, cost]);

  const getRating = (roi: number) =>
    roi >= 400 ? { label: "Exceptional ROI", color: "text-green-600" }
    : roi >= 200 ? { label: "Strong ROI", color: "text-blue-600" }
    : roi >= 100 ? { label: "Good ROI", color: "text-yellow-600" }
    : roi >= 0 ? { label: "Positive — room to improve", color: "text-orange-500" }
    : { label: "Negative ROI — review strategy", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Marketing ROI</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Revenue Generated (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 50000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Marketing Cost (AUD)</label>
          <input type="number" inputMode="decimal" min="1" value={cost} onChange={e => setCost(e.target.value)} placeholder="e.g. 10000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Marketing ROI</p>
            <p className="text-4xl font-bold text-orange-500">{result.roi.toFixed(1)}%</p>
            <p className={"mt-2 text-sm font-medium " + getRating(result.roi).color}>{getRating(result.roi).label}</p>
          </div>
          <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Net Profit</p>
            <p className={"text-4xl font-bold " + (result.netProfit >= 0 ? "text-green-600" : "text-red-500")}>{fmt(result.netProfit)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
