"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function CACCalc() {
  const [cost, setCost] = useState("");
  const [customers, setCustomers] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!cost && !customers) { setResult(null); setError(""); return; }
      const c = parseFloat(cost), n = parseFloat(customers);
      if (!c || !n || n <= 0) { setError("Please enter valid numbers. Customers must be > 0."); setResult(null); return; }
      const r = c / n;
      setError("");
      setResult(r);
      trackCalculation("cac", { total_cost: c, customers_acquired: n, cac: parseFloat(r.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [cost, customers]);

  const getRating = (r: number) => r <= 50 ? { label: "Low — very efficient acquisition", color: "text-green-600" }
    : r <= 200 ? { label: "Moderate — acceptable for most businesses", color: "text-blue-600" }
    : r <= 500 ? { label: "High — review your marketing spend mix", color: "text-yellow-600" }
    : { label: "Very high — optimise or reallocate budget", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Customer Acquisition Cost</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Total Sales & Marketing Cost ($)", value: cost, set: setCost, placeholder: "e.g. 10000" },
          { label: "New Customers Acquired (#)", value: customers, set: setCustomers, placeholder: "e.g. 50" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input
              type="number" inputMode="decimal" min="0" value={value}
              onChange={e => set(e.target.value)} placeholder={placeholder}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800" aria-live="polite">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your Customer Acquisition Cost (CAC)</p>
          <p className="text-4xl font-bold text-orange-500">${result.toFixed(2)}</p>
          <p className={`mt-2 text-sm font-medium ${getRating(result).color}`}>{getRating(result).label}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Formula: ${cost} ÷ {customers} customers = ${result.toFixed(2)} per customer</p>
        </div>
      )}
    </div>
  );
}
