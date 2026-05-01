"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function ChurnRateCalc() {
  const [customersLost, setCustomersLost] = useState("");
  const [startingCustomers, setStartingCustomers] = useState("");
  const [result, setResult] = useState<{ churnRate: number; retained: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const lost = parseFloat(customersLost), starting = parseFloat(startingCustomers);
      if (!customersLost && !startingCustomers) { setResult(null); setError(""); return; }
      if (isNaN(lost) || lost < 0) { setError("Please enter a valid number of customers lost."); setResult(null); return; }
      if (!starting || starting <= 0) { setError("Please enter a valid starting customer count."); setResult(null); return; }
      if (lost > starting) { setError("Customers lost cannot exceed starting customer count."); setResult(null); return; }
      const churnRate = (lost / starting) * 100;
      const retained = 100 - churnRate;
      setError("");
      setResult({ churnRate, retained });
      trackCalculation("churn_rate", { customers_lost: lost, starting_customers: starting, churn_rate: parseFloat(churnRate.toFixed(2)), retention_rate: parseFloat(retained.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [customersLost, startingCustomers]);

  const getRating = (churn: number) =>
    churn <= 2 ? { label: "Excellent retention", color: "text-green-600" }
    : churn <= 5 ? { label: "Good retention", color: "text-blue-600" }
    : churn <= 10 ? { label: "Monitor closely", color: "text-yellow-600" }
    : { label: "High churn — act now", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Churn Rate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customers Lost in Period</label>
          <input type="number" inputMode="numeric" min="0" value={customersLost} onChange={e => setCustomersLost(e.target.value)} placeholder="e.g. 25"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Customer Count</label>
          <input type="number" inputMode="numeric" min="1" value={startingCustomers} onChange={e => setStartingCustomers(e.target.value)} placeholder="e.g. 500"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Churn Rate</p>
            <p className="text-4xl font-bold text-orange-500">{result.churnRate.toFixed(2)}%</p>
            <p className={"mt-2 text-sm font-medium " + getRating(result.churnRate).color}>{getRating(result.churnRate).label}</p>
          </div>
          <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Retention Rate</p>
            <p className="text-4xl font-bold text-green-600">{result.retained.toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
