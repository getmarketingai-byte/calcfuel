"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function AdSpendCalc() {
  const [budget, setBudget] = useState("");
  const [cpc, setCpc] = useState("");
  const [convRate, setConvRate] = useState("");
  const [dealValue, setDealValue] = useState("");
  const [result, setResult] = useState<{ clicks: number; leads: number; revenue: number; roi: number; roas: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const b = parseFloat(budget), c = parseFloat(cpc), cv = parseFloat(convRate), d = parseFloat(dealValue);
      if (!budget && !cpc && !convRate && !dealValue) { setResult(null); setError(""); return; }
      if (!b || !c || !cv || !d || c <= 0 || cv <= 0) { setError("Please fill in all fields with valid numbers."); setResult(null); return; }
      const clicks = b / c;
      const leads = clicks * (cv / 100);
      const revenue = leads * d;
      const res = { clicks, leads, revenue, roi: ((revenue - b) / b) * 100, roas: revenue / b };
      setError("");
      setResult(res);
      trackCalculation("ad_spend", { budget: b, cpc: c, conversion_rate: cv, deal_value: d, projected_revenue: revenue, roi: parseFloat(res.roi.toFixed(1)), roas: parseFloat(res.roas.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [budget, cpc, convRate, dealValue]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Plan Your Ad Budget</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ad Budget (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 5000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost Per Click — CPC (AUD)</label>
          <input type="number" inputMode="decimal" min="0.01" step="0.01" value={cpc} onChange={e => setCpc(e.target.value)} placeholder="e.g. 2.50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conversion Rate (%)</label>
          <input type="number" inputMode="decimal" min="0.01" max="100" step="0.1" value={convRate} onChange={e => setConvRate(e.target.value)} placeholder="e.g. 3.5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Average Deal / Order Value (AUD)</label>
          <input type="number" inputMode="decimal" min="1" value={dealValue} onChange={e => setDealValue(e.target.value)} placeholder="e.g. 500"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4" aria-live="polite">
          {[
            { label: "Estimated Clicks", value: Math.round(result.clicks).toLocaleString(), cls: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800", tc: "text-blue-600" },
            { label: "Estimated Leads", value: Math.round(result.leads).toLocaleString(), cls: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800", tc: "text-purple-600" },
            { label: "Estimated Revenue", value: fmt(result.revenue), cls: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800", tc: "text-green-600" },
            { label: "ROI", value: result.roi.toFixed(1) + "%", cls: result.roi >= 0 ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800", tc: result.roi >= 0 ? "text-orange-500" : "text-red-500" },
            { label: "ROAS", value: result.roas.toFixed(2) + "x", cls: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800", tc: "text-yellow-600" },
          ].map(item => (
            <div key={item.label} className={"p-4 rounded-xl border " + item.cls}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
              <p className={"text-2xl font-bold " + item.tc}>{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
