"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function RevenuePerLeadCalc() {
  const [revenue, setRevenue] = useState("");
  const [leads, setLeads] = useState("");
  const [result, setResult] = useState<{ rpl: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const r = parseFloat(revenue), l = parseFloat(leads);
      if (!revenue && !leads) { setResult(null); setError(""); return; }
      if (!r || r <= 0) { setError("Please enter a valid revenue amount."); setResult(null); return; }
      if (!l || l <= 0) { setError("Please enter a valid number of leads."); setResult(null); return; }
      const rpl = r / l;
      setError("");
      setResult({ rpl });
      trackCalculation("revenue_per_lead", { revenue: r, leads: l, rpl: parseFloat(rpl.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [revenue, leads]);

  const getRating = (rpl: number) =>
    rpl >= 1000 ? { label: "High-value leads", color: "text-green-600" }
    : rpl >= 500 ? { label: "Good RPL", color: "text-blue-600" }
    : rpl >= 100 ? { label: "Average RPL", color: "text-yellow-600" }
    : { label: "Low RPL — review lead quality", color: "text-orange-500" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Revenue Per Lead</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Revenue (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 250000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Leads</label>
          <input type="number" inputMode="numeric" min="1" value={leads} onChange={e => setLeads(e.target.value)} placeholder="e.g. 500"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800 inline-block min-w-[220px]">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Revenue Per Lead</p>
            <p className="text-4xl font-bold text-orange-500">{fmt(result.rpl)}</p>
            <p className={"mt-2 text-sm font-medium " + getRating(result.rpl).color}>{getRating(result.rpl).label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
