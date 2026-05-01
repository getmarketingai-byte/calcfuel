"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

export default function TripFuelCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [result, setResult] = useState<{ fuelUsed: number; totalCost: number; costPerUnit: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const e = parseFloat(efficiency);
      const p = parseFloat(fuelPrice);
      if (!distance && !efficiency && !fuelPrice) { setResult(null); setError(""); return; }
      if (!d || !e || !p || d <= 0 || e <= 0 || p <= 0) {
        setError("Please fill in all fields with positive values."); setResult(null); return;
      }
      let fuelUsed: number;
      if (unit === "imperial") {
        // miles / MPG = gallons
        fuelUsed = d / e;
      } else {
        // L/100km * km / 100 = litres
        fuelUsed = (e / 100) * d;
      }
      const totalCost = fuelUsed * p;
      const costPerUnit = totalCost / d;
      setError("");
      setResult({ fuelUsed, totalCost, costPerUnit });
      trackCalculation("trip_fuel_cost", { unit, distance: d, efficiency: e, fuel_price: p, total_cost: parseFloat(totalCost.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [distance, efficiency, fuelPrice, unit]);

  const fmtCurrency = (n: number) => "$" + n.toFixed(2);
  const fmtNum = (n: number, dp = 2) => n.toFixed(dp);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calculate Trip Fuel Cost</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Miles / MPG</button>
          <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km / L/100km</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Trip Distance (miles)" : "Trip Distance (km)"}
          </label>
          <input type="number" inputMode="decimal" min="0" value={distance} onChange={e => setDistance(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 350" : "e.g. 560"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Fuel Efficiency (MPG)" : "Fuel Efficiency (L/100km)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.1" value={efficiency} onChange={e => setEfficiency(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 30" : "e.g. 8"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Gas Price (per gallon)" : "Fuel Price (per litre)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.80"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4" aria-live="polite">
          {[
            { label: unit === "imperial" ? "Fuel Used (gallons)" : "Fuel Used (litres)", value: fmtNum(result.fuelUsed), cls: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800", tc: "text-blue-600" },
            { label: "Total Fuel Cost", value: fmtCurrency(result.totalCost), cls: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800", tc: "text-green-600" },
            { label: unit === "imperial" ? "Cost per Mile" : "Cost per km", value: fmtCurrency(result.costPerUnit), cls: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800", tc: "text-orange-500" },
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
