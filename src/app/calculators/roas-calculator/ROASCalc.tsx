"use client";
import { useState } from "react";

export default function ROASCalc() {
  const [revenue, setRevenue] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const r = parseFloat(revenue), s = parseFloat(adSpend);
    if (!r || !s || s <= 0) { setError("Please enter valid numbers."); setResult(null); return; }
    setError(""); setResult(r / s);
  };

  const getRating = (roas: number) =>
    roas >= 8 ? { label: "Outstanding ROAS", color: "text-green-600" }
    : roas >= 4 ? { label: "Strong ROAS", color: "text-blue-600" }
    : roas >= 2 ? { label: "Average ROAS", color: "text-yellow-600" }
    : roas >= 1 ? { label: "Below break-even for most businesses", color: "text-orange-500" }
    : { label: "Losing money on ads", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your ROAS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Revenue from Ads (AUD)</label>
          <input type="number" min="0" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 20000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ad Spend (AUD)</label>
          <input type="number" min="1" value={adSpend} onChange={e => setAdSpend(e.target.value)} placeholder="e.g. 5000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">Calculate ROAS</button>
      {result !== null && (
        <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your ROAS</p>
          <p className="text-4xl font-bold text-orange-500">{result.toFixed(2)}x</p>
          <p className={"mt-2 text-sm font-medium " + getRating(result).color}>{getRating(result).label}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            For every $1 spent on ads, you earn {result.toFixed(2)} in revenue.
          </p>
        </div>
      )}
    </div>
  );
}
