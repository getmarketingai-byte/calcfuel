"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type FuelType = "gasoline" | "diesel" | "propane" | "natural_gas";
type Unit = "imperial" | "metric";

const FUEL_RATES: Record<FuelType, number> = {
  gasoline: 0.5,   // gal/hr per kW at 100% load
  diesel: 0.4,     // gal/hr per kW at 100% load
  propane: 0.6,    // gal/hr per kW at 100% load (liquid propane)
  natural_gas: 9,  // cubic feet/hr per kW at 100% load
};

const FUEL_LABELS: Record<FuelType, { unit: string; short: string }> = {
  gasoline: { unit: "gallons", short: "gal" },
  diesel: { unit: "gallons", short: "gal" },
  propane: { unit: "gallons", short: "gal" },
  natural_gas: { unit: "cubic feet", short: "ft³" },
};

export default function GeneratorFuelCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [watts, setWatts] = useState("");
  const [load, setLoad] = useState("50");
  const [fuelType, setFuelType] = useState<FuelType>("gasoline");
  const [fuelAvailable, setFuelAvailable] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [daysNeeded, setDaysNeeded] = useState("");
  const [result, setResult] = useState<{
    consumptionPerHour: number;
    runtimeHours: number | null;
    fuelForDays: number | null;
    costForDays: number | null;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const kw = parseFloat(watts) / 1000;
      const loadPct = parseFloat(load) / 100;
      const avail = parseFloat(fuelAvailable);
      const days = parseFloat(daysNeeded);
      const price = parseFloat(fuelPrice);

      if (!watts) { setResult(null); setError(""); return; }
      if (!kw || kw <= 0) { setError("Please enter a valid wattage."); setResult(null); return; }
      if (!loadPct || loadPct <= 0 || loadPct > 1) { setError("Load must be between 1 and 100%."); setResult(null); return; }

      let ratePerHour = FUEL_RATES[fuelType] * kw * loadPct;
      // metric conversion: for liquid fuels, convert gallons to litres
      if (unit === "metric" && fuelType !== "natural_gas") {
        ratePerHour = ratePerHour * 3.78541; // gal to litres
      }

      const runtimeHours = avail > 0 ? avail / ratePerHour : null;
      const fuelForDays = days > 0 ? ratePerHour * days * 24 : null;
      const costForDays = fuelForDays !== null && price > 0 ? fuelForDays * price : null;

      setError("");
      setResult({ consumptionPerHour: ratePerHour, runtimeHours, fuelForDays, costForDays });
      trackCalculation("generator_fuel", { fuel_type: fuelType, watts: parseFloat(watts), load_pct: parseFloat(load), consumption_per_hour: parseFloat(ratePerHour.toFixed(3)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [watts, load, fuelType, fuelAvailable, fuelPrice, daysNeeded, unit]);

  const fuelUnitLabel = unit === "metric" && fuelType !== "natural_gas" ? "litres" : FUEL_LABELS[fuelType].unit;
  const fuelUnitShort = unit === "metric" && fuelType !== "natural_gas" ? "L" : FUEL_LABELS[fuelType].short;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generator Fuel Calculator</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Imperial</button>
          <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Metric</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Generator Size (watts)</label>
          <input type="number" inputMode="numeric" min="0" value={watts} onChange={e => setWatts(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Load Percentage (%)</label>
          <input type="number" inputMode="numeric" min="1" max="100" value={load} onChange={e => setLoad(e.target.value)}
            placeholder="e.g. 50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuel Type</label>
          <select value={fuelType} onChange={e => setFuelType(e.target.value as FuelType)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none">
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="propane">Propane (LP)</option>
            <option value="natural_gas">Natural Gas</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fuel Available ({fuelUnitLabel}) <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input type="number" inputMode="decimal" min="0" value={fuelAvailable} onChange={e => setFuelAvailable(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 10" : "e.g. 38"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Outage Duration (days) <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.5" value={daysNeeded} onChange={e => setDaysNeeded(e.target.value)}
            placeholder="e.g. 3"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fuel Price (per {fuelUnitShort}) <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
          <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Consumption Rate</p>
            <p className="text-2xl font-bold text-blue-600">{result.consumptionPerHour.toFixed(3)} {fuelUnitShort}/hr</p>
          </div>
          {result.runtimeHours !== null && (
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Runtime on {fuelAvailable} {fuelUnitLabel}</p>
              <p className="text-2xl font-bold text-green-600">
                {result.runtimeHours >= 24
                  ? Math.floor(result.runtimeHours / 24) + "d " + (result.runtimeHours % 24).toFixed(1) + "h"
                  : result.runtimeHours.toFixed(1) + " hrs"}
              </p>
            </div>
          )}
          {result.fuelForDays !== null && (
            <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fuel for {daysNeeded}-day Outage</p>
              <p className="text-2xl font-bold text-orange-500">{result.fuelForDays.toFixed(1)} {fuelUnitLabel}</p>
            </div>
          )}
          {result.costForDays !== null && (
            <div className="p-4 rounded-xl border bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fuel Cost ({daysNeeded} days)</p>
              <p className="text-2xl font-bold text-purple-600">${result.costForDays.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
