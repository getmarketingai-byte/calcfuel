"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

const IMPROVEMENTS_IMPERIAL = [
  { id: "tire_pressure", label: "Proper tire inflation", gain: 0.5, desc: "+0.5 MPG avg" },
  { id: "speed_reduction", label: "Reduce highway speed by 10 mph", gain: 2, desc: "+2 MPG avg" },
  { id: "ac_off", label: "Minimize AC use", gain: 1, desc: "+1 MPG avg" },
  { id: "weight_reduction", label: "Remove 100 lbs of cargo", gain: 0.2, desc: "+0.2 MPG avg" },
  { id: "smooth_driving", label: "Smooth acceleration & braking", gain: 1.5, desc: "+1.5 MPG avg" },
];

const IMPROVEMENTS_METRIC = [
  { id: "tire_pressure", label: "Proper tire inflation", gain: -0.2, desc: "-0.2 L/100km avg" },
  { id: "speed_reduction", label: "Reduce highway speed by 15 km/h", gain: -0.8, desc: "-0.8 L/100km avg" },
  { id: "ac_off", label: "Minimize AC use", gain: -0.4, desc: "-0.4 L/100km avg" },
  { id: "weight_reduction", label: "Remove 45 kg of cargo", gain: -0.1, desc: "-0.1 L/100km avg" },
  { id: "smooth_driving", label: "Smooth acceleration & braking", gain: -0.6, desc: "-0.6 L/100km avg" },
];

export default function FuelEconomySavingsCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [annualMiles, setAnnualMiles] = useState("12000");
  const [fuelPrice, setFuelPrice] = useState("");
  const [currentEfficiency, setCurrentEfficiency] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<{
    currentCost: number;
    newEfficiency: number;
    newCost: number;
    annualSavings: number;
  } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const improvements = unit === "imperial" ? IMPROVEMENTS_IMPERIAL : IMPROVEMENTS_METRIC;

  const toggleImp = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const am = parseFloat(annualMiles);
      const p = parseFloat(fuelPrice);
      const ce = parseFloat(currentEfficiency);
      if (!am || !p || !ce || ce <= 0 || p <= 0 || am <= 0) { setResult(null); return; }

      const totalGain = improvements
        .filter(imp => selected.has(imp.id))
        .reduce((sum, imp) => sum + imp.gain, 0);

      let currentCost: number;
      let newCost: number;
      let newEfficiency: number;

      if (unit === "imperial") {
        currentCost = (am / ce) * p;
        newEfficiency = ce + totalGain;
        newCost = newEfficiency > 0 ? (am / newEfficiency) * p : currentCost;
      } else {
        currentCost = (ce / 100) * am * p;
        newEfficiency = Math.max(ce + totalGain, 1);
        newCost = (newEfficiency / 100) * am * p;
      }

      const annualSavings = currentCost - newCost;
      setResult({ currentCost, newEfficiency, newCost, annualSavings });
      trackCalculation("fuel_economy_savings", { unit, annual_miles: am, fuel_price: p, current_efficiency: ce, improvements_selected: selected.size, annual_savings: parseFloat(annualSavings.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [annualMiles, fuelPrice, currentEfficiency, selected, unit, improvements]);

  const fmt = (n: number) => "$" + Math.abs(n).toFixed(2);
  const inputCls = "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fuel Economy Savings Calculator</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button onClick={() => { setUnit("imperial"); setSelected(new Set()); }} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Miles / MPG</button>
          <button onClick={() => { setUnit("metric"); setSelected(new Set()); }} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km / L/100km</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Annual {unit === "imperial" ? "Miles" : "km"} Driven
          </label>
          <input type="number" inputMode="numeric" min="0" value={annualMiles} onChange={e => setAnnualMiles(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 12000" : "e.g. 19000"} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Current Fuel Economy (MPG)" : "Current Fuel Economy (L/100km)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.1" value={currentEfficiency} onChange={e => setCurrentEfficiency(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 25" : "e.g. 10"} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Gas Price (per gallon)" : "Fuel Price (per litre)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"} className={inputCls} />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select improvements you plan to make:</p>
        <div className="space-y-2">
          {improvements.map(imp => (
            <label key={imp.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected.has(imp.id) ? "border-orange-400 bg-orange-50 dark:bg-orange-950" : "border-gray-200 dark:border-gray-600 hover:border-orange-300"}`}>
              <input type="checkbox" checked={selected.has(imp.id)} onChange={() => toggleImp(imp.id)} className="accent-orange-500 w-4 h-4" />
              <span className="flex-1 text-sm text-gray-900 dark:text-white">{imp.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{imp.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {result !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
          <div className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Annual Fuel Cost</p>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">{fmt(result.currentCost)}</p>
            <p className="text-xs text-gray-500 mt-1">{currentEfficiency} {unit === "imperial" ? "MPG" : "L/100km"}</p>
          </div>
          <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">New Annual Fuel Cost</p>
            <p className="text-2xl font-bold text-blue-600">{fmt(result.newCost)}</p>
            <p className="text-xs text-gray-500 mt-1">{result.newEfficiency.toFixed(1)} {unit === "imperial" ? "MPG" : "L/100km"}</p>
          </div>
          <div className={`sm:col-span-2 p-4 rounded-xl border ${result.annualSavings >= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Annual Savings</p>
            <p className={`text-3xl font-bold ${result.annualSavings >= 0 ? "text-green-600" : "text-red-500"}`}>{fmt(result.annualSavings)}</p>
            {selected.size === 0 && <p className="text-sm text-gray-500 mt-1">Select improvements above to see your savings</p>}
          </div>
        </div>
      )}
    </div>
  );
}
