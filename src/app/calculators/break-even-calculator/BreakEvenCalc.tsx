"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function BreakEvenCalc() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [result, setResult] = useState<{ units: number; revenue: number; contributionMargin: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const fc = parseFloat(fixedCosts), p = parseFloat(pricePerUnit), vc = parseFloat(variableCost);
      if (!fixedCosts && !pricePerUnit && !variableCost) { setResult(null); setError(""); return; }
      if (!fc || fc < 0) { setError("Please enter valid fixed costs."); setResult(null); return; }
      if (!p || p <= 0) { setError("Please enter a valid price per unit."); setResult(null); return; }
      if (isNaN(vc) || vc < 0) { setError("Please enter a valid variable cost per unit."); setResult(null); return; }
      const contributionMargin = p - vc;
      if (contributionMargin <= 0) { setError("Price per unit must be greater than variable cost per unit."); setResult(null); return; }
      const units = fc / contributionMargin;
      const revenue = units * p;
      setError("");
      setResult({ units, revenue, contributionMargin });
      trackCalculation("break_even", { fixed_costs: fc, price_per_unit: p, variable_cost: vc, break_even_units: Math.ceil(units), break_even_revenue: revenue });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [fixedCosts, pricePerUnit, variableCost]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Break-Even Point</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fixed Costs (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} placeholder="e.g. 20000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Per Unit (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} placeholder="e.g. 50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Variable Cost Per Unit (AUD)</label>
          <input type="number" inputMode="decimal" min="0" value={variableCost} onChange={e => setVariableCost(e.target.value)} placeholder="e.g. 20"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Break-Even Units</p>
            <p className="text-4xl font-bold text-orange-500">{Math.ceil(result.units).toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-500">units to sell</p>
          </div>
          <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Break-Even Revenue</p>
            <p className="text-3xl font-bold text-blue-600">{fmt(result.revenue)}</p>
          </div>
          <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Contribution Margin</p>
            <p className="text-3xl font-bold text-green-600">{fmt(result.contributionMargin)}</p>
            <p className="mt-2 text-sm text-gray-500">per unit</p>
          </div>
        </div>
      )}
    </div>
  );
}
