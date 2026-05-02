"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Unit = "imperial" | "metric";

interface Vehicle {
  name: string;
  weeklyDistance: string;
  fuelEconomy: string;
  fuelPrice: string;
}

interface VehicleResult {
  weekly: number;
  monthly: number;
  annual: number;
  valid: boolean;
}

const DEFAULT_VEHICLE: Vehicle = { name: "", weeklyDistance: "", fuelEconomy: "", fuelPrice: "" };

function calcVehicle(v: Vehicle, unit: Unit): VehicleResult {
  const d = parseFloat(v.weeklyDistance);
  const e = parseFloat(v.fuelEconomy);
  const p = parseFloat(v.fuelPrice);
  if (!d || !e || !p || d <= 0 || e <= 0 || p <= 0) {
    return { weekly: 0, monthly: 0, annual: 0, valid: false };
  }
  let weekly: number;
  if (unit === "imperial") {
    weekly = (d / e) * p;
  } else {
    weekly = (d * e / 100) * p;
  }
  const monthly = weekly * 52 / 12;
  const annual = weekly * 52;
  return { weekly, monthly, annual, valid: true };
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FuelBudgetPlannerCalc() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [vehicles, setVehicles] = useState<Vehicle[]>([{ ...DEFAULT_VEHICLE }]);
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [results, setResults] = useState<VehicleResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const vehicleResults = vehicles.map((v) => calcVehicle(v, unit));
      setResults(vehicleResults);

      const validCount = vehicleResults.filter((r) => r.valid).length;
      if (validCount > 0) {
        const totalAnnual = vehicleResults.reduce((sum, r) => sum + r.annual, 0);
        trackCalculation("fuel_budget_planner", {
          unit,
          vehicle_count: validCount,
          total_annual: parseFloat(totalAnnual.toFixed(2)),
        });
      }
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [vehicles, unit]);

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    setVehicles((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };

  const addVehicle = () => {
    if (vehicles.length < 3) setVehicles((prev) => [...prev, { ...DEFAULT_VEHICLE }]);
  };

  const removeVehicle = (index: number) => {
    setVehicles((prev) => prev.filter((_, i) => i !== index));
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const hasAnyResult = results.some((r) => r.valid);
  const totalWeekly = results.reduce((sum, r) => sum + r.weekly, 0);
  const totalMonthly = results.reduce((sum, r) => sum + r.monthly, 0);
  const totalAnnual = results.reduce((sum, r) => sum + r.annual, 0);

  const budgetVal = parseFloat(monthlyBudget);
  const hasBudget = monthlyBudget !== "" && !isNaN(budgetVal) && budgetVal > 0;
  const budgetDiff = hasBudget ? budgetVal - totalMonthly : 0;
  const underBudget = budgetDiff >= 0;

  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";
  const labelCls = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1";

  const vehicleColors = [
    { ring: "border-orange-300 dark:border-orange-700", header: "bg-orange-50 dark:bg-orange-950/40" },
    { ring: "border-blue-300 dark:border-blue-700", header: "bg-blue-50 dark:bg-blue-950/40" },
    { ring: "border-purple-300 dark:border-purple-700", header: "bg-purple-50 dark:bg-purple-950/40" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Household Fuel Budget Planner</h2>
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

      {/* Vehicle cards */}
      <div className="space-y-4 mb-6">
        {vehicles.map((vehicle, idx) => {
          const color = vehicleColors[idx % vehicleColors.length];
          const res = results[idx];
          return (
            <div key={idx} className={"rounded-xl border-2 overflow-hidden " + color.ring}>
              {/* Vehicle header */}
              <div className={"flex items-center justify-between px-4 py-3 " + color.header}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                    Vehicle {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={vehicle.name}
                    onChange={(e) => updateVehicle(idx, "name", e.target.value)}
                    placeholder={idx === 0 ? "e.g. Family SUV" : idx === 1 ? "e.g. Daily Commuter" : "e.g. Weekend Car"}
                    className="flex-1 min-w-0 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-orange-400 py-0.5"
                  />
                </div>
                {vehicles.length > 1 && (
                  <button
                    onClick={() => removeVehicle(idx)}
                    className="ml-3 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium whitespace-nowrap"
                    aria-label={`Remove vehicle ${idx + 1}`}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Vehicle inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4">
                <div>
                  <label className={labelCls}>
                    {unit === "imperial" ? "Weekly Distance (miles)" : "Weekly Distance (km)"}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={vehicle.weeklyDistance}
                    onChange={(e) => updateVehicle(idx, "weeklyDistance", e.target.value)}
                    placeholder={unit === "imperial" ? "e.g. 200" : "e.g. 320"}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    {unit === "imperial" ? "Fuel Economy (MPG)" : "Fuel Economy (L/100km)"}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={vehicle.fuelEconomy}
                    onChange={(e) => updateVehicle(idx, "fuelEconomy", e.target.value)}
                    placeholder={unit === "imperial" ? "e.g. 28" : "e.g. 9.0"}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    {unit === "imperial" ? "Gas Price (per gallon)" : "Fuel Price (per litre)"}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={vehicle.fuelPrice}
                    onChange={(e) => updateVehicle(idx, "fuelPrice", e.target.value)}
                    placeholder={unit === "imperial" ? "e.g. 3.50" : "e.g. 1.85"}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Per-vehicle mini results */}
              {res && res.valid && (
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
                  {[
                    { label: "Weekly", value: fmt(res.weekly) },
                    { label: "Monthly", value: fmt(res.monthly) },
                    { label: "Annual", value: fmt(res.annual) },
                  ].map((item) => (
                    <div key={item.label} className="px-4 py-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-white mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add vehicle button */}
      {vehicles.length < 3 && (
        <button
          onClick={addVehicle}
          className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-orange-400 hover:text-orange-500 transition-colors mb-6"
        >
          + Add Vehicle {vehicles.length + 1} of 3
        </button>
      )}

      {/* Monthly budget input */}
      <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Monthly Fuel Budget (optional)
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Enter your total household monthly fuel budget to see if you are over or under.
        </p>
        <div className="flex items-center gap-2 max-w-xs">
          <span className="text-gray-500 dark:text-gray-400 font-medium">$</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="10"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            placeholder="e.g. 400"
            className={inputCls}
          />
        </div>
      </div>

      {/* Household totals */}
      {hasAnyResult && (
        <div aria-live="polite">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            Household Total{vehicles.filter((_, i) => results[i]?.valid).length > 1 ? ` (${vehicles.filter((_, i) => results[i]?.valid).length} vehicles)` : ""}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Weekly Total", value: fmt(totalWeekly), cls: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800", tc: "text-blue-600 dark:text-blue-400" },
              { label: "Monthly Total", value: fmt(totalMonthly), cls: "bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800", tc: "text-orange-500" },
              { label: "Annual Total", value: fmt(totalAnnual), cls: "bg-green-50 dark:bg-green-950/60 border-green-200 dark:border-green-800", tc: "text-green-600 dark:text-green-400" },
            ].map((item) => (
              <div key={item.label} className={"p-4 rounded-xl border " + item.cls}>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                <p className={"text-2xl font-bold " + item.tc}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Budget comparison */}
          {hasBudget && (
            <div
              className={
                "flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-medium text-sm " +
                (underBudget
                  ? "bg-green-50 dark:bg-green-950/50 border-green-400 dark:border-green-600 text-green-700 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-950/50 border-red-400 dark:border-red-600 text-red-700 dark:text-red-300")
              }
            >
              <span className="text-2xl">{underBudget ? "✓" : "!"}</span>
              <div>
                <p className="font-bold text-base">
                  {underBudget ? `${fmt(Math.abs(budgetDiff))} under budget` : `${fmt(Math.abs(budgetDiff))} over budget`}
                </p>
                <p className="text-xs opacity-80 mt-0.5">
                  Monthly fuel spend {fmt(totalMonthly)} vs budget {fmt(budgetVal)}
                  {!underBudget && " — consider carpooling or reducing weekly distances to get back on track."}
                  {underBudget && " — you have room to spare in your fuel budget."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
