"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalculatorLifecycle,
  CalculatorShell,
  Disclaimer,
  InputGroup,
  Methodology,
  ResultCard,
  ResultGrid,
  UnitToggle,
} from "@/components/calc";
import { calculateFuelBudget } from "@/domain/models/fuelBudget";
import type { UnitSystem } from "@/domain/units";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

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

const DEFAULT_VEHICLE: Vehicle = {
  name: "Primary vehicle",
  weeklyDistance: "250",
  fuelEconomy: "8",
  fuelPrice: "1.80",
};

const IMPERIAL_DEFAULT: Vehicle = {
  name: "Primary vehicle",
  weeklyDistance: "150",
  fuelEconomy: "28",
  fuelPrice: "3.50",
};

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FuelBudgetPlannerCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [vehicles, setVehicles] = useState<Vehicle[]>([{ ...DEFAULT_VEHICLE }]);
  const [monthlyBudget, setMonthlyBudget] = useState("400");
  const [results, setResults] = useState<VehicleResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    setVehicles([next === "metric" ? { ...DEFAULT_VEHICLE } : { ...IMPERIAL_DEFAULT }]);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const vehicleResults = vehicles.map((v) => {
        const budget = calculateFuelBudget({
          unit,
          distancePerPeriod: parseFloat(v.weeklyDistance),
          efficiency: parseFloat(v.fuelEconomy),
          fuelPrice: parseFloat(v.fuelPrice),
          period: "weekly",
        });
        if (!budget) return { weekly: 0, monthly: 0, annual: 0, valid: false };
        return {
          weekly: budget.weeklyCost,
          monthly: budget.monthlyCost,
          annual: budget.annualCost,
          valid: true,
        };
      });
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
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [vehicles, unit]);

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    setVehicles((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };

  const addVehicle = () => {
    if (vehicles.length < 3) {
      setVehicles((prev) => [
        ...prev,
        {
          name: `Vehicle ${prev.length + 1}`,
          weeklyDistance: "",
          fuelEconomy: "",
          fuelPrice: "",
        },
      ]);
    }
  };

  const removeVehicle = (index: number) => {
    setVehicles((prev) => prev.filter((_, i) => i !== index));
  };

  const hasAnyResult = results.some((r) => r.valid);
  const totalWeekly = results.reduce((sum, r) => sum + r.weekly, 0);
  const totalMonthly = results.reduce((sum, r) => sum + r.monthly, 0);
  const totalAnnual = results.reduce((sum, r) => sum + r.annual, 0);
  const budgetVal = parseFloat(monthlyBudget);
  const hasBudget = monthlyBudget !== "" && !isNaN(budgetVal) && budgetVal > 0;
  const budgetDiff = hasBudget ? budgetVal - totalMonthly : 0;

  return (
    <>
    <CalculatorLifecycle
      calculatorId="fuel_budget_planner"
      category="trip_planning"
      hasResult={!!hasAnyResult}
      unitSystem={unit}
    />
    <CalculatorShell
      title="Fuel Budget Planner"
      description="Plan weekly, monthly and annual fuel spend across one to three vehicles — and check against a monthly budget."
      toolbar={
        <UnitToggle
          value={unit}
          onChange={switchUnit}
          metricLabel="km / L/100km"
          imperialLabel="Miles / MPG"
        />
      }
      results={
        hasAnyResult ? (
          <div className="space-y-4">
            <ResultGrid columns={3}>
              <ResultCard label="Weekly total" value={fmt(totalWeekly)} tone="info" />
              <ResultCard label="Monthly total" value={fmt(totalMonthly)} tone="primary" />
              <ResultCard label="Annual total" value={fmt(totalAnnual)} tone="success" />
            </ResultGrid>
            {hasBudget ? (
              <div
                className={
                  "rounded-xl border p-4 text-sm " +
                  (budgetDiff >= 0
                    ? "border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-200"
                    : "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200")
                }
              >
                {budgetDiff >= 0
                  ? `Under budget by ${fmt(budgetDiff)} / month`
                  : `Over budget by ${fmt(Math.abs(budgetDiff))} / month`}
              </div>
            ) : null}
            {results.map((r, i) =>
              r.valid ? (
                <p key={i} className="text-xs text-gray-700 dark:text-gray-300">
                  {vehicles[i]?.name || `Vehicle ${i + 1}`}: {fmt(r.monthly)}/mo · {fmt(r.annual)}/yr
                </p>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Enter weekly distance, economy, and fuel price for at least one vehicle.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Each vehicle’s weekly fuel cost is annualised (×52) then divided for monthly (÷12). Multi-vehicle
              totals sum independent plans. Budget check compares monthly spend to your target.
            </p>
          </Methodology>
          <Disclaimer variant="commute" />
        </div>
      }
    >
      <div className="mb-4 max-w-xs">
        <InputGroup
          label="Monthly fuel budget (optional)"
          type="number"
          min="0"
          step="1"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {vehicles.map((v, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <InputGroup
                label="Vehicle name"
                value={v.name}
                onChange={(e) => updateVehicle(i, "name", e.target.value)}
              />
              {vehicles.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeVehicle(i)}
                  className="text-xs text-red-500 hover:underline mt-6 shrink-0"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InputGroup
                label={unit === "metric" ? "Weekly distance (km)" : "Weekly distance (miles)"}
                type="number"
                min="0"
                value={v.weeklyDistance}
                onChange={(e) => updateVehicle(i, "weeklyDistance", e.target.value)}
              />
              <InputGroup
                label={unit === "metric" ? "Fuel use (L/100km)" : "Fuel economy (MPG)"}
                type="number"
                min="0"
                step="0.1"
                value={v.fuelEconomy}
                onChange={(e) => updateVehicle(i, "fuelEconomy", e.target.value)}
              />
              <InputGroup
                label={unit === "metric" ? "Price / litre" : "Price / gallon"}
                type="number"
                min="0"
                step="0.01"
                value={v.fuelPrice}
                onChange={(e) => updateVehicle(i, "fuelPrice", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {vehicles.length < 3 ? (
        <button
          type="button"
          onClick={addVehicle}
          className="mt-4 text-sm font-medium text-orange-700 dark:text-orange-400 underline underline-offset-2"
        >
          + Add another vehicle
        </button>
      ) : null}
    </CalculatorShell>
    </>
  );
}
