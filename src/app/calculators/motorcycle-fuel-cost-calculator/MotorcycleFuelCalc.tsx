"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "metric" | "imperial";
type TripType = "single" | "commute";

const BIKE_PRESETS = [
  { label: "Small commuter / scooter (125–250cc)", l100: 3.5, mpg: 67 },
  { label: "Naked / standard (300–650cc)", l100: 5.0, mpg: 47 },
  { label: "Sport / supersport (600–1000cc)", l100: 6.5, mpg: 36 },
  { label: "Adventure / dual-sport (650–1200cc)", l100: 6.0, mpg: 39 },
  { label: "Cruiser / touring (800–1800cc)", l100: 7.5, mpg: 31 },
  { label: "Large tourer (1200cc+)", l100: 8.0, mpg: 29 },
];

export default function MotorcycleFuelCalc() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [tripType, setTripType] = useState<TripType>("single");
  const [distance, setDistance] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [presetIdx, setPresetIdx] = useState(1);
  const [useCustom, setUseCustom] = useState(false);
  const [customEfficiency, setCustomEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [result, setResult] = useState<{
    fuelUsed: number; tripCost: number;
    weekly?: number; monthly?: number; annual?: number;
    costPerKm: number;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const p = parseFloat(fuelPrice);
      const days = parseFloat(daysPerWeek);
      const preset = BIKE_PRESETS[presetIdx];
      const efficiencyRaw = useCustom ? parseFloat(customEfficiency) : (unit === "metric" ? preset.l100 : preset.mpg);

      if (!distance && !fuelPrice) { setResult(null); setError(""); return; }
      if (!d || !p || d <= 0 || p <= 0) {
        setError("Please enter valid positive values for distance and fuel price.");
        setResult(null);
        return;
      }
      if (useCustom && (!efficiencyRaw || efficiencyRaw <= 0)) {
        setError("Please enter a valid fuel efficiency.");
        setResult(null);
        return;
      }
      if (tripType === "commute" && (!days || days <= 0 || days > 7)) {
        setError("Days per week must be between 1 and 7.");
        setResult(null);
        return;
      }

      let fuelUsed: number;
      let tripCost: number;
      let costPerKm: number;

      if (unit === "metric") {
        // efficiencyRaw = L/100km
        fuelUsed = (efficiencyRaw / 100) * d;
        tripCost = fuelUsed * p;
        costPerKm = tripCost / d;
      } else {
        // efficiencyRaw = MPG, d = miles, p = $/gallon
        fuelUsed = d / efficiencyRaw;
        tripCost = fuelUsed * p;
        costPerKm = tripCost / d; // cost per mile in imperial
      }

      let weekly: number | undefined;
      let monthly: number | undefined;
      let annual: number | undefined;

      if (tripType === "commute") {
        // one-way distance → double for round trip
        const roundTripCost = tripCost * 2;
        weekly = roundTripCost * days;
        monthly = weekly * 4.33;
        annual = weekly * 52;
      }

      setError("");
      setResult({ fuelUsed, tripCost, weekly, monthly, annual, costPerKm });
      trackCalculation("motorcycle_fuel_cost", {
        unit, trip_type: tripType, distance: d, fuel_price: p,
        trip_cost: parseFloat(tripCost.toFixed(2)),
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [distance, daysPerWeek, presetIdx, useCustom, customEfficiency, fuelPrice, unit, tripType]);

  const fmt = (n: number) => "$" + n.toFixed(2);
  const fmtFuel = (n: number) => n.toFixed(2) + (unit === "metric" ? " L" : " gal");

  const currentEfficiency = useCustom
    ? (parseFloat(customEfficiency) || 0)
    : (unit === "metric" ? BIKE_PRESETS[presetIdx].l100 : BIKE_PRESETS[presetIdx].mpg);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calculate Motorcycle Fuel Cost</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm">
          <button onClick={() => setUnit("metric")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>km / L/100km</button>
          <button onClick={() => setUnit("imperial")} className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}>Miles / MPG</button>
        </div>
      </div>

      {/* Trip type toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTripType("single")}
          className={"flex-1 py-2 rounded-lg text-sm font-medium border transition-colors " + (tripType === "single" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}
        >
          Single Trip
        </button>
        <button
          onClick={() => setTripType("commute")}
          className={"flex-1 py-2 rounded-lg text-sm font-medium border transition-colors " + (tripType === "commute" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")}
        >
          Daily Commute
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {tripType === "commute"
              ? (unit === "metric" ? "One-Way Distance (km)" : "One-Way Distance (miles)")
              : (unit === "metric" ? "Trip Distance (km)" : "Trip Distance (miles)")}
          </label>
          <input type="number" inputMode="decimal" min="0" value={distance} onChange={e => setDistance(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 25" : "e.g. 15"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>

        {tripType === "commute" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days Per Week</label>
            <input type="number" inputMode="numeric" min="1" max="7" value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)}
              placeholder="e.g. 5"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          </div>
        )}

        <div className={tripType === "commute" ? "" : "sm:col-span-1"}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Motorcycle Type</label>
          <select
            value={useCustom ? "custom" : presetIdx.toString()}
            onChange={e => {
              if (e.target.value === "custom") { setUseCustom(true); }
              else { setUseCustom(false); setPresetIdx(parseInt(e.target.value)); }
            }}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {BIKE_PRESETS.map((b, i) => (
              <option key={i} value={i.toString()}>
                {b.label} — {unit === "metric" ? b.l100 + " L/100km" : b.mpg + " MPG"}
              </option>
            ))}
            <option value="custom">Enter my own fuel use</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "metric" ? "Fuel Price (per litre)" : "Fuel Price (per gallon)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.01" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 1.92" : "e.g. 3.80"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>

      {useCustom && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "metric" ? "Fuel Efficiency (L/100km)" : "Fuel Efficiency (MPG)"}
          </label>
          <input type="number" inputMode="decimal" min="0" step="0.1" value={customEfficiency} onChange={e => setCustomEfficiency(e.target.value)}
            placeholder={unit === "metric" ? "e.g. 5.5" : "e.g. 45"}
            className="w-full sm:w-40 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      )}

      {!useCustom && currentEfficiency > 0 && (
        <p className="text-xs text-gray-400 mb-4">
          Using {unit === "metric" ? currentEfficiency + " L/100km" : currentEfficiency + " MPG"} — typical for this bike type. Change the dropdown or select &quot;Enter my own&quot; for a custom figure.
        </p>
      )}

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result !== null && (
        <div className="mt-2 space-y-3" aria-live="polite">
          {tripType === "single" ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Trip Fuel Cost</p>
                <p className="text-2xl font-bold text-orange-500">{fmt(result.tripCost)}</p>
                <p className="text-xs text-gray-400 mt-1">{fmtFuel(result.fuelUsed)} used</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cost per {unit === "metric" ? "km" : "mile"}</p>
                <p className="text-2xl font-bold text-blue-600">{fmt(result.costPerKm)}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Daily (return)", value: fmt(result.tripCost * 2), cls: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800", tc: "text-blue-600" },
                { label: "Weekly", value: fmt(result.weekly!), cls: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800", tc: "text-purple-600" },
                { label: "Monthly", value: fmt(result.monthly!), cls: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800", tc: "text-orange-500" },
                { label: "Annual", value: fmt(result.annual!), cls: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800", tc: "text-green-600" },
              ].map(item => (
                <div key={item.label} className={"p-4 rounded-xl border " + item.cls}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                  <p className="text-2xl font-bold {item.tc}">{item.value}</p>
                </div>
              ))}
              <div className="col-span-2 sm:col-span-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
                Cost per {unit === "metric" ? "km" : "mile"}: <strong>{fmt(result.costPerKm)}</strong>
                &nbsp;|&nbsp; Daily fuel used: <strong>{fmtFuel(result.fuelUsed * 2)}</strong> (round trip)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
