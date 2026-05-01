"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

export default function CommuteFuelCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [oneWay, setOneWay] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [efficiency, setEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [result, setResult] = useState<{ daily: number; weekly: number; monthly: number; annual: number; costPerUnit: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(oneWay);
      const days = parseFloat(daysPerWeek);
      const e = parseFloat(efficiency);
      const p = parseFloat(fuelPrice);
      if (!oneWay && !efficiency && !fuelPrice) { setResult(null); setError(""); return; }
      if (!d || !days || !e || !p || d <= 0 || e <= 0 || p <= 0 || days <= 0 || days > 7) {
        setError("Please fill in all fields with valid values."); setResult(null); return;
      }
      const roundTripDist = d * 2;
      let fuelPerTrip: number;
      if (unit === "imperial") {
        fuelPerTrip = roundTripDist / e;
      } else {
        fuelPerTrip = (e / 100) * roundTripDist;
      }
      const costPerTrip = fuelPerTrip * p;
      const costPerUnit = costPerTrip / roundTripDist;
      const daily = costPerTrip;
      const weekly = daily * days;
      const monthly = weekly * 4.33;
      const annual = weekly * 52;
      setError("");
      setResult({ daily, weekly, monthly, annual, costPerUnit });
      trackCalculation("commute_fuel_cost", { unit, one_way: d, days_per_week: days, efficiency: e, fuel_price: p, annual_cost: parseFloat(annual.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [oneWay, daysPerWeek, efficiency, fuelPrice, unit]);

  const fmt = (n: number) => "$" + n.toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calculate Commute Fuel Cost</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Miles / MPG</button>
          <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km / L/100km</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "One-Way Distance (miles)" : "One-Way Distance (km)"}
          </label>
          <input type="number" inputMode="decimal" min="0" value={oneWay} onChange={e => setOneWay(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 15" : "e.g. 24"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days Per Week</label>
          <input type="number" inputMode="numeric" min="1" max="7" value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}
            placeholder="e.g. 5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Fuel Efficiency (MPG)" : "Fuel Efficiency (L/100km)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.1" value={efficiency} onChange={e => setEfficiency(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 28" : "e.g. 9"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Gas Price (per gallon)" : "Fuel Price (per litre)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4" aria-live="polite">
          {[
            { label: "Daily Cost", value: fmt(result.daily), cls: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800", tc: "text-blue-600" },
            { label: "Weekly Cost", value: fmt(result.weekly), cls: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800", tc: "text-purple-600" },
            { label: "Monthly Cost", value: fmt(result.monthly), cls: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800", tc: "text-orange-500" },
            { label: "Annual Cost", value: fmt(result.annual), cls: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800", tc: "text-green-600" },
          ].map(item => (
            <div key={item.label} className={"p-4 rounded-xl border " + item.cls}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
              <p className={"text-2xl font-bold " + item.tc}>{item.value}</p>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
            Cost per {unit === "imperial" ? "mile" : "km"}: <strong>{fmt(result.costPerUnit)}</strong> &nbsp;|&nbsp; Round trip: <strong>{unit === "imperial" ? (parseFloat(oneWay) * 2).toFixed(1) + " miles" : (parseFloat(oneWay) * 2).toFixed(1) + " km"}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
