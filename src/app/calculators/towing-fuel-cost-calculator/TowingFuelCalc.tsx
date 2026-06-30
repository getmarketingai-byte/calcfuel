"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "metric" | "imperial";

const TRAILER_TYPES = [
  { label: "Light trailer / box trailer (< 500 kg)", penalty: 8 },
  { label: "Boat on trailer (500–1,200 kg)", penalty: 14 },
  { label: "Small camper trailer (750–1,500 kg)", penalty: 18 },
  { label: "Caravan / pop-top (1,500–2,200 kg)", penalty: 24 },
  { label: "Large caravan / fifth-wheel (> 2,200 kg)", penalty: 32 },
];

export default function TowingFuelCalc() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [distance, setDistance] = useState("");
  const [baseEfficiency, setBaseEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [trailerIdx, setTrailerIdx] = useState(3);
  const [customPenalty, setCustomPenalty] = useState("");
  const [useCustomPenalty, setUseCustomPenalty] = useState(false);
  const [result, setResult] = useState<{
    normalFuel: number; normalCost: number;
    towingFuel: number; towingCost: number;
    extraFuel: number; extraCost: number;
    effectiveL100: number; penalty: number;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const e = parseFloat(baseEfficiency);
      const p = parseFloat(fuelPrice);
      const penalty = useCustomPenalty ? parseFloat(customPenalty) : TRAILER_TYPES[trailerIdx].penalty;

      if (!distance && !baseEfficiency && !fuelPrice) { setResult(null); setError(""); return; }
      if (!d || !e || !p || d <= 0 || e <= 0 || p <= 0) {
        setError("Please enter valid positive values for all fields.");
        setResult(null);
        return;
      }
      if (useCustomPenalty && (!penalty || penalty < 0 || penalty > 100)) {
        setError("Custom penalty must be between 0 and 100%.");
        setResult(null);
        return;
      }

      let normalFuel: number;
      let effectiveL100: number;

      if (unit === "metric") {
        normalFuel = (e / 100) * d;
        effectiveL100 = e * (1 + penalty / 100);
      } else {
        // imperial: e = MPG, d = miles
        normalFuel = d / e;
        const effectiveMPG = e / (1 + penalty / 100);
        effectiveL100 = 235.21 / effectiveMPG; // for display only
      }

      const towingFuel = unit === "metric"
        ? (effectiveL100 / 100) * d
        : d / (e / (1 + penalty / 100));

      const normalCost = normalFuel * p;
      const towingCost = towingFuel * p;
      const extraFuel = towingFuel - normalFuel;
      const extraCost = towingCost - normalCost;

      setError("");
      setResult({ normalFuel, normalCost, towingFuel, towingCost, extraFuel, extraCost, effectiveL100, penalty });
      trackCalculation("towing_fuel_cost", {
        unit, distance: d, base_efficiency: e, fuel_price: p, penalty_pct: penalty,
        towing_cost: parseFloat(towingCost.toFixed(2)),
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [distance, baseEfficiency, fuelPrice, trailerIdx, customPenalty, useCustomPenalty, unit]);

  const fmtCurrency = (n: number) => "$" + n.toFixed(2);
  const fmtFuel = (n: number) => n.toFixed(1) + (unit === "metric" ? " L" : " gal");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calculate Towing Fuel Cost</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km / L/100km</button>
          <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Miles / MPG</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "metric" ? "Trip Distance (km)" : "Trip Distance (miles)"}
          </label>
          <input type="number" inputMode="decimal" min="0" value={distance} onChange={e => setDistance(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 450" : "e.g. 280"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "metric" ? "Vehicle Fuel Use (L/100km, unloaded)" : "Vehicle Fuel Economy (MPG, unloaded)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.1" value={baseEfficiency} onChange={e => setBaseEfficiency(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 10.5" : "e.g. 22"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "metric" ? "Fuel Price (per litre)" : "Fuel Price (per gallon)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 1.92" : "e.g. 3.80"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What Are You Towing?</label>
          <select
            value={useCustomPenalty ? "custom" : trailerIdx.toString()}
            onChange={e => {
              if (e.target.value === "custom") { setUseCustomPenalty(true); }
              else { setUseCustomPenalty(false); setTrailerIdx(parseInt(e.target.value)); }
            }}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {TRAILER_TYPES.map((t, i) => (
              <option key={i} value={i.toString()}>{t.label} (+{t.penalty}%)</option>
            ))}
            <option value="custom">Enter my own fuel penalty %</option>
          </select>
        </div>
      </div>

      {useCustomPenalty && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custom Fuel Penalty (%)</label>
          <input type="number" inputMode="decimal" min="0" max="100" value={customPenalty} onChange={e => setCustomPenalty(e.target.value)}
            placeholder="e.g. 20"
            className="w-full sm:w-40 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">Enter the % increase in fuel use when towing (e.g. 20 means 20% more fuel).</p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result !== null && (
        <div className="mt-2 space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Normal Fuel Cost</p>
              <p className="text-2xl font-bold text-blue-600">{fmtCurrency(result.normalCost)}</p>
              <p className="text-xs text-gray-400 mt-1">{fmtFuel(result.normalFuel)} used</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Towing Fuel Cost</p>
              <p className="text-2xl font-bold text-orange-500">{fmtCurrency(result.towingCost)}</p>
              <p className="text-xs text-gray-400 mt-1">{fmtFuel(result.towingFuel)} used</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Towing costs you an extra</strong>{" "}
              <span className="text-red-600 font-bold text-lg">{fmtCurrency(result.extraCost)}</span>{" "}
              ({fmtFuel(result.extraFuel)} extra fuel) on this trip — a <strong>{result.penalty}% fuel penalty</strong>.
            </p>
            {unit === "metric" && (
              <p className="text-xs text-gray-400 mt-2">Effective fuel consumption when towing: <strong>{result.effectiveL100.toFixed(1)} L/100km</strong></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
