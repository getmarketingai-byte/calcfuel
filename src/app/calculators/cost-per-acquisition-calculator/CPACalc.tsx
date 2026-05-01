"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function CPACalc() {
  const [campaignCost, setCampaignCost] = useState("");
  const [acquisitions, setAcquisitions] = useState("");
  const [result, setResult] = useState<{ cpa: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const c = parseFloat(campaignCost), a = parseFloat(acquisitions);
      if (!campaignCost && !acquisitions) { setResult(null); setError(""); return; }
      if (!c || c <= 0) { setError("Please enter a valid campaign cost."); setResult(null); return; }
      if (!a || a <= 0) { setError("Please enter a valid number of acquisitions."); setResult(null); return; }
      const cpa = c / a;
      setError("");
      setResult({ cpa });
      trackCalculation("cost_per_acquisition", { campaign_cost: c, acquisitions: a, cpa: parseFloat(cpa.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [campaignCost, acquisitions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Cost Per Acquisition</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Campaign Cost (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={campaignCost} onChange={e => setCampaignCost(e.target.value)} placeholder="e.g. 5000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Acquisitions (Customers)</label>
          <input type="number" inputMode="numeric" min="1" value={acquisitions} onChange={e => setAcquisitions(e.target.value)} placeholder="e.g. 50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800 inline-block min-w-[220px]">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Cost Per Acquisition</p>
            <p className="text-4xl font-bold text-orange-500">{fmt(result.cpa)}</p>
            <p className="mt-2 text-sm text-gray-500">per customer acquired</p>
          </div>
        </div>
      )}
    </div>
  );
}
