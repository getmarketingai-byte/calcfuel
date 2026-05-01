"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function CLVCalc() {
  const [avgValue, setAvgValue] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lifespan, setLifespan] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!avgValue && !frequency && !lifespan) { setResult(null); setError(""); return; }
      const v = parseFloat(avgValue), f = parseFloat(frequency), l = parseFloat(lifespan);
      if (!v || !f || !l || v <= 0 || f <= 0 || l <= 0) { setError("Please enter valid positive numbers for all fields."); setResult(null); return; }
      const r = v * f * l;
      setError("");
      setResult(r);
      trackCalculation("clv", { avg_purchase_value: v, purchase_frequency: f, customer_lifespan: l, clv: parseFloat(r.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [avgValue, frequency, lifespan]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Customer Lifetime Value</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Avg Purchase Value ($)", value: avgValue, set: setAvgValue, placeholder: "e.g. 150" },
          { label: "Purchases per Year (#)", value: frequency, set: setFrequency, placeholder: "e.g. 4" },
          { label: "Customer Lifespan (years)", value: lifespan, set: setLifespan, placeholder: "e.g. 3" },
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
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Customer Lifetime Value (CLV)</p>
          <p className="text-4xl font-bold text-orange-500">${result.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Formula: ${avgValue} × {frequency}/yr × {lifespan} yrs = ${result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
