"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface Results {
  dailyFuel: number;
  weeklyFuel: number;
  monthlyFuel: number;
  annualFuel: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
  fleetAnnualCost: number;
  co2PerYear: number;
}

export default function IdlingFuelWasteCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [dailyMinutes, setDailyMinutes] = useState("10");
  const [idleBurnRate, setIdleBurnRate] = useState("0.8");
  const [fuelPrice, setFuelPrice] = useState("3.50");
  const [vehicles, setVehicles] = useState("1");
  const [workingDays, setWorkingDays] = useState("250");
  const [result, setResult] = useState<Results | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep sensible defaults when toggling units
  useEffect(() => {
    if (unit === "imperial") {
      setIdleBurnRate("0.8");
      setFuelPrice("3.50");
    } else {
      setIdleBurnRate("3.0");
      setFuelPrice("1.85");
    }
  }, [unit]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const mins = parseFloat(dailyMinutes);
      const burn = parseFloat(idleBurnRate);
      const price = parseFloat(fuelPrice);
      const numVehicles = parseFloat(vehicles);
      const days = parseFloat(workingDays);

      if (!dailyMinutes && !idleBurnRate && !fuelPrice) {
        setResult(null);
        setError("");
        return;
      }

      if (
        !mins || !burn || !price || !numVehicles || !days ||
        mins <= 0 || burn <= 0 || price <= 0 || numVehicles < 1 || days <= 0 || days > 365
      ) {
        setError("Please fill in all fields with valid positive values (working days: 1–365).");
        setResult(null);
        return;
      }

      // Core formula
      const dailyFuelPerVehicle = (mins / 60) * burn;       // gal or L per vehicle per day
      const annualFuelPerVehicle = dailyFuelPerVehicle * days;
      const annualFuelFleet = annualFuelPerVehicle * numVehicles;

      const dailyCostPerVehicle = dailyFuelPerVehicle * price;
      const annualCostPerVehicle = dailyCostPerVehicle * days;
      const fleetAnnualCost = annualCostPerVehicle * numVehicles;

      // Derived breakdowns (per-vehicle basis for display, fleet for totals)
      const weeklyFuel = dailyFuelPerVehicle * 5;   // 5-day working week
      const monthlyFuel = annualFuelPerVehicle / 12;
      const weeklyCost = dailyCostPerVehicle * 5;
      const monthlyCost = annualCostPerVehicle / 12;

      // CO2: 8.887 kg per gallon, 2.346 kg per litre
      const co2Factor = unit === "imperial" ? 8.887 : 2.346;
      const co2PerYear = dailyFuelPerVehicle * co2Factor * days * numVehicles;

      setError("");
      setResult({
        dailyFuel: dailyFuelPerVehicle,
        weeklyFuel,
        monthlyFuel,
        annualFuel: annualFuelPerVehicle,
        dailyCost: dailyCostPerVehicle,
        weeklyCost,
        monthlyCost,
        annualCost: annualCostPerVehicle,
        fleetAnnualCost,
        co2PerYear,
      });

      trackCalculation("idling_fuel_waste", {
        unit,
        daily_minutes: mins,
        vehicles: numVehicles,
        annual_cost: parseFloat(fleetAnnualCost.toFixed(2)),
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [dailyMinutes, idleBurnRate, fuelPrice, vehicles, workingDays, unit]);

  const isFleet = parseFloat(vehicles) > 1 && !isNaN(parseFloat(vehicles));
  const fuelUnit = unit === "imperial" ? "gal" : "L";
  const fmt$ = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtFuel = (n: number) => n.toFixed(unit === "imperial" ? 3 : 2) + " " + fuelUnit;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header + unit toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calculate Idling Fuel Waste</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm self-start sm:self-auto">
          <button
            onClick={() => setUnit("imperial")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "imperial" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Imperial (gal)
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={"px-3 py-1.5 font-medium transition-colors " + (unit === "metric" ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")}
          >
            Metric (L)
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Daily idling time (minutes)
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="1"
            value={dailyMinutes}
            onChange={e => setDailyMinutes(e.target.value)}
            placeholder="e.g. 10"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Fuel burn while idling (gal/hr)" : "Fuel burn while idling (L/hr)"}
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={idleBurnRate}
            onChange={e => setIdleBurnRate(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 0.8" : "e.g. 3.0"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            {unit === "imperial" ? "Typical: 0.6–1.5 gal/hr" : "Typical: 2.3–5.7 L/hr"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {unit === "imperial" ? "Fuel price (per gallon)" : "Fuel price (per litre)"}
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={fuelPrice}
            onChange={e => setFuelPrice(e.target.value)}
            placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of vehicles in fleet
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={vehicles}
            onChange={e => setVehicles(e.target.value)}
            placeholder="e.g. 1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Use 1 for personal vehicles</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Working days per year
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="365"
            step="1"
            value={workingDays}
            onChange={e => setWorkingDays(e.target.value)}
            placeholder="e.g. 250"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">250 = commercial; 365 = daily driver</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result !== null && (
        <div aria-live="polite">
          {/* Per-vehicle breakdown */}
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            {isFleet ? "Per-vehicle breakdown" : "Fuel waste breakdown"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Daily waste", fuel: fmtFuel(result.dailyFuel), cost: fmt$(result.dailyCost) },
              { label: "Weekly waste", fuel: fmtFuel(result.weeklyFuel), cost: fmt$(result.weeklyCost) },
              { label: "Monthly waste", fuel: fmtFuel(result.monthlyFuel), cost: fmt$(result.monthlyCost) },
              { label: "Annual waste", fuel: fmtFuel(result.annualFuel), cost: fmt$(result.annualCost) },
            ].map((item, i) => {
              const isAnnual = i === 3;
              return (
                <div
                  key={item.label}
                  className={
                    "p-4 rounded-xl border " +
                    (isAnnual
                      ? "bg-orange-50 dark:bg-orange-950 border-orange-300 dark:border-orange-700 ring-1 ring-orange-400"
                      : "bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-600")
                  }
                >
                  <p className={"text-xs font-medium mb-1 " + (isAnnual ? "text-orange-600 dark:text-orange-400" : "text-gray-500 dark:text-gray-400")}>
                    {item.label}
                  </p>
                  <p className={"text-lg font-bold " + (isAnnual ? "text-orange-600 dark:text-orange-400" : "text-gray-800 dark:text-white")}>
                    {item.cost}
                  </p>
                  <p className={"text-xs mt-0.5 " + (isAnnual ? "text-orange-500 dark:text-orange-400" : "text-gray-400 dark:text-gray-500")}>
                    {item.fuel}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Fleet total — shown only when vehicles > 1 */}
          {isFleet && (
            <div className="mb-4 p-5 rounded-xl border-2 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">
                Fleet total — {vehicles} vehicles
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{fmt$(result.fleetAnnualCost)}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                wasted on idling per year across entire fleet
              </p>
              <p className="text-xs text-green-500 dark:text-green-500 mt-0.5">
                {fmtFuel(result.annualFuel * parseFloat(vehicles))} total fuel &bull; {fmt$(result.fleetAnnualCost / parseFloat(vehicles))} per vehicle
              </p>
            </div>
          )}

          {/* CO2 banner */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-2xl select-none" aria-hidden="true">🌿</span>
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                {result.co2PerYear.toLocaleString("en-US", { maximumFractionDigits: 0 })} kg CO₂/year avoided if idling eliminated
              </p>
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-0.5">
                Based on {unit === "imperial" ? "8.887 kg CO₂ per gallon burned" : "2.346 kg CO₂ per litre burned"} (EPA estimate)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
