"use client";
import { useState } from "react";

export default function SocialROICalc() {
  const [adSpend, setAdSpend] = useState("");
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const s = parseFloat(adSpend), r = parseFloat(revenue);
    if (!s || !r || s <= 0) { setError("Please enter valid numbers. Ad Spend must be > 0."); setResult(null); return; }
    setError(""); setResult(((r - s) / s) * 100);
  };

  const getRating = (roi: number) =>
    roi >= 300 ? { label: "Excellent Social Media ROI", color: "text-green-600" }
    : roi >= 100 ? { label: "Strong ROI", color: "text-blue-600" }
    : roi >= 0 ? { label: "Positive — but room to grow", color: "text-yellow-600" }
    : { label: "Negative ROI — review your campaigns", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Social Media ROI</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Social Media Ad Spend (AUD)</label>
          <input type="number" min="1" value={adSpend} onChange={e => setAdSpend(e.target.value)} placeholder="e.g. 3000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Revenue from Social Media (AUD)</label>
          <input type="number" min="0" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 12000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">Calculate Social Media ROI</button>
      {result !== null && (
        <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Social Media ROI</p>
          <p className="text-4xl font-bold text-orange-500">{result.toFixed(1)}%</p>
          <p className={"mt-2 text-sm font-medium " + getRating(result).color}>{getRating(result).label}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Net return: ${(parseFloat(revenue) - parseFloat(adSpend)).toFixed(0)} on ${adSpend} invested.
          </p>
        </div>
      )}
    </div>
  );
}
