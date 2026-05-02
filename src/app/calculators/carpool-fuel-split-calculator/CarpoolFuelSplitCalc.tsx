"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

const PRESET_PASSENGERS = [2, 3, 4, 5];

interface SplitResult {
  totalFuelUsed: number;
  totalCost: number;
  equalPerPerson: number;
  driverPays: number;
  passengerPays: number;
  surchargeAmount: number;
  passengers: number;
  hasSurcharge: boolean;
}

export default function CarpoolFuelSplitCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [distance, setDistance] = useState("");
  const [passengerPreset, setPassengerPreset] = useState<string>("3");
  const [passengerCustom, setPassengerCustom] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [driverSurcharge, setDriverSurcharge] = useState("0");
  const [result, setResult] = useState<SplitResult | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCustom = passengerPreset === "custom";
  const passengersValue = isCustom ? passengerCustom : passengerPreset;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const p = parseFloat(passengersValue);
      const e = parseFloat(efficiency);
      const fp = parseFloat(fuelPrice);
      const surPct = parseFloat(driverSurcharge) || 0;

      const anyFilled = distance || passengersValue || efficiency || fuelPrice;
      if (!anyFilled) { setResult(null); setError(""); return; }

      if (!d || d <= 0) { setError("Please enter a valid trip distance."); setResult(null); return; }
      if (!p || p < 2 || !Number.isInteger(p)) { setError("Passengers must be a whole number of 2 or more."); setResult(null); return; }
      if (!e || e <= 0) { setError("Please enter a valid fuel efficiency."); setResult(null); return; }
      if (!fp || fp <= 0) { setError("Please enter a valid fuel price."); setResult(null); return; }
      if (surPct < 0 || surPct > 100) { setError("Driver surcharge must be between 0 and 100."); setResult(null); return; }

      let totalFuelUsed: number;
      if (unit === "imperial") {
        totalFuelUsed = d / e;
      } else {
        totalFuelUsed = (e / 100) * d;
      }
      const totalCost = totalFuelUsed * fp;

      // Equal split: everyone pays the same
      const equalPerPerson = totalCost / p;

      // With driver surcharge:
      // Each non-driver passenger pays their base share PLUS a portion of the surcharge
      // surchargeAmount = (surPct / 100) * totalCost  — extra the driver earns back
      // Each passenger pays: (totalCost * (1 + surPct/100)) / p
      // Driver pays: totalCost - (p - 1) * passengerPays
      const surchargeAmount = (surPct / 100) * totalCost;
      const passengerPays = (totalCost * (1 + surPct / 100)) / p;
      const driverPays = totalCost - (p - 1) * passengerPays;

      setError("");
      setResult({
        totalFuelUsed,
        totalCost,
        equalPerPerson,
        driverPays,
        passengerPays,
        surchargeAmount,
        passengers: p,
        hasSurcharge: surPct > 0,
      });

      trackCalculation("carpool_fuel_split", {
        unit,
        distance: d,
        passengers: p,
        efficiency: e,
        fuel_price: fp,
        driver_surcharge_pct: surPct,
        total_cost: parseFloat(totalCost.toFixed(2)),
        per_passenger: parseFloat(passengerPays.toFixed(2)),
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [distance, passengersValue, efficiency, fuelPrice, driverSurcharge, unit]);

  const fmt = (n: number) => "$" + n.toFixed(2);
  const fmtNum = (n: number, dp = 2) => n.toFixed(dp);

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Split Carpool Fuel Costs</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm self-start sm:self-auto">
          <button
            onClick={() => setUnit("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Miles / MPG
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            km / L/100km
          </button>
        </div>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Distance */}
        <div>
          <label className={labelClass}>
            {unit === "imperial" ? "Total Trip Distance (miles)" : "Total Trip Distance (km)"}
          </label>
          <input
            type="number" inputMode="decimal" min="0"
            value={distance} onChange={e => setDistance(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 150" : "e.g. 240"}
            className={inputClass}
          />
        </div>

        {/* Fuel efficiency */}
        <div>
          <label className={labelClass}>
            {unit === "imperial" ? "Fuel Economy (MPG)" : "Fuel Economy (L/100km)"}
          </label>
          <input
            type="number" inputMode="decimal" min="0" step="0.1"
            value={efficiency} onChange={e => setEfficiency(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 32" : "e.g. 8"}
            className={inputClass}
          />
        </div>

        {/* Fuel price */}
        <div>
          <label className={labelClass}>
            {unit === "imperial" ? "Gas Price (per gallon)" : "Fuel Price (per litre)"}
          </label>
          <input
            type="number" inputMode="decimal" min="0" step="0.01"
            value={fuelPrice} onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
            className={inputClass}
          />
        </div>

        {/* Driver surcharge */}
        <div>
          <label className={labelClass}>
            Driver Surcharge % <span className="text-gray-400 font-normal">(optional, default 0)</span>
          </label>
          <input
            type="number" inputMode="decimal" min="0" max="100" step="1"
            value={driverSurcharge} onChange={e => setDriverSurcharge(e.target.value)}
            placeholder="e.g. 10"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Extra % the driver receives for vehicle wear &amp; time</p>
        </div>
      </div>

      {/* Passengers selector */}
      <div className="mb-6">
        <label className={labelClass}>Number of People (including driver)</label>
        <div className="flex flex-wrap gap-2 items-center">
          {PRESET_PASSENGERS.map(n => (
            <button
              key={n}
              onClick={() => { setPassengerPreset(String(n)); setPassengerCustom(""); }}
              className={
                "px-4 py-2 rounded-lg border text-sm font-medium transition-colors " +
                (passengerPreset === String(n) && !isCustom
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400")
              }
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPassengerPreset("custom")}
            className={
              "px-4 py-2 rounded-lg border text-sm font-medium transition-colors " +
              (isCustom
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400")
            }
          >
            Custom
          </button>
          {isCustom && (
            <input
              type="number" inputMode="numeric" min="2" max="20"
              value={passengerCustom} onChange={e => setPassengerCustom(e.target.value)}
              placeholder="e.g. 6"
              className="w-24 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {/* Results */}
      {result !== null && (
        <div aria-live="polite">
          {/* Top summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Total Fuel Used ({unit === "imperial" ? "gal" : "L"})
              </p>
              <p className="text-2xl font-bold text-blue-600">{fmtNum(result.totalFuelUsed)}</p>
            </div>
            <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Fuel Cost</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.totalCost)}</p>
            </div>
            <div className="p-4 rounded-xl border bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">People in Car</p>
              <p className="text-2xl font-bold text-purple-600">{result.passengers}</p>
            </div>
          </div>

          {/* Cost split breakdown */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-750 px-5 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Cost Split Breakdown</h3>
            </div>

            {/* Equal split row */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">Equal split</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Everyone pays the same share</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg px-4 py-1.5 font-bold text-lg">
                  {fmt(result.equalPerPerson)} / person
                </span>
              </div>
            </div>

            {/* Driver surcharge split — always show, highlight when active */}
            <div className={"px-5 py-4 " + (result.hasSurcharge ? "bg-amber-50 dark:bg-amber-950/30" : "")}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm flex items-center gap-2">
                    With driver surcharge
                    {result.hasSurcharge && (
                      <span className="text-xs font-normal bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded px-2 py-0.5">
                        Active
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {result.hasSurcharge
                      ? `Driver earns back ${fmt(result.surchargeAmount)} for vehicle wear & time`
                      : "Set a driver surcharge % above to activate"}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Driver pays</p>
                      <p className={"text-xl font-bold " + (result.hasSurcharge ? "text-green-600" : "text-gray-400 dark:text-gray-500")}>
                        {fmt(result.driverPays)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                        Each passenger pays
                        {result.passengers > 2 ? ` (×${result.passengers - 1})` : ""}
                      </p>
                      <p className={"text-xl font-bold " + (result.hasSurcharge ? "text-orange-500" : "text-gray-400 dark:text-gray-500")}>
                        {fmt(result.passengerPays)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick reference summary */}
          <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>
              <span className="font-medium">{unit === "imperial" ? "Cost per mile:" : "Cost per km:"}</span>{" "}
              {fmt(result.totalCost / parseFloat(distance))}
            </p>
            <p>
              <span className="font-medium">Fuel used:</span>{" "}
              {fmtNum(result.totalFuelUsed)} {unit === "imperial" ? "gallons" : "litres"} over{" "}
              {parseFloat(distance).toLocaleString()} {unit === "imperial" ? "miles" : "km"}
            </p>
            {result.hasSurcharge && (
              <p>
                <span className="font-medium">Driver bonus:</span>{" "}
                {fmt(result.surchargeAmount)} ({driverSurcharge}% of total cost)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
