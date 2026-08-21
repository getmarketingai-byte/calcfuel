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
  Sources,
  UnitToggle,
} from "@/components/calc";
import { calculateIdlingWaste, type IdlingResult } from "@/domain/models/idlingWaste";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

export default function IdlingFuelWasteCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [dailyMinutes, setDailyMinutes] = useState("10");
  const [idleBurnRate, setIdleBurnRate] = useState("3.0");
  const [fuelPrice, setFuelPrice] = useState("1.85");
  const [vehicles, setVehicles] = useState("1");
  const [workingDays, setWorkingDays] = useState("250");
  const [result, setResult] = useState<IdlingResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: typeof unit) => {
    if (next === unit) return;
    setUnit(next);
    if (next === "imperial") {
      setIdleBurnRate("0.8");
      setFuelPrice("3.50");
    } else {
      setIdleBurnRate("3.0");
      setFuelPrice("1.85");
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const calc = calculateIdlingWaste({
        dailyMinutes: parseFloat(dailyMinutes),
        burnPerHour: parseFloat(idleBurnRate),
        fuelPrice: parseFloat(fuelPrice),
        vehicles: parseFloat(vehicles) || 1,
        workingDaysPerYear: parseFloat(workingDays) || 250,
        co2PerFuelUnit: unit === "imperial" ? 8.89 : 2.31,
      });
      setResult(calc);
      if (calc) {
        trackCalculation("idling_fuel_waste", {
          unit,
          daily_minutes: parseFloat(dailyMinutes),
          annual_cost: parseFloat(calc.annualCost.toFixed(2)),
        });
      }
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [dailyMinutes, idleBurnRate, fuelPrice, vehicles, workingDays, unit]);

  const fuelUnit = unit === "imperial" ? "gal" : "L";
  const fmt = (n: number) => "$" + n.toFixed(2);

  return (
    <>
      <CalculatorLifecycle
        calculatorId="idling_fuel_waste"
        category="vehicles"
        hasResult={!!result}
        unitSystem={unit}
      />
      <CalculatorShell
        title="Idling Fuel Waste"
        description="See what daily idle time costs in fuel — for one vehicle or a fleet."
        toolbar={
          <UnitToggle
            value={unit}
            onChange={switchUnit}
            metricLabel="L/h"
            imperialLabel="gal/h"
          />
        }
        results={
          result ? (
            <ResultGrid columns={4}>
              <ResultCard label="Daily fuel" value={`${result.dailyFuel.toFixed(2)} ${fuelUnit}`} tone="info" />
              <ResultCard label="Annual fuel" value={`${result.annualFuel.toFixed(1)} ${fuelUnit}`} tone="primary" />
              <ResultCard label="Annual cost" value={fmt(result.annualCost)} tone="success" />
              <ResultCard
                label="Fleet annual cost"
                value={fmt(result.fleetAnnualCost)}
                hint={`≈ ${result.co2PerYear.toFixed(0)} kg CO₂ / yr`}
                tone="neutral"
              />
            </ResultGrid>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300">Enter idle minutes and burn rate to see waste cost.</p>
          )
        }
        footer={
          <div className="space-y-4">
            <Methodology>
              <p>
                Daily fuel = (minutes ÷ 60) × burn rate. Annual = daily × working days. Fleet multiplies
                by vehicle count. CO₂ factors are approximate planning defaults.
              </p>
            </Methodology>
            <Sources
              sources={[
                { label: "EPA / DOE idle fuel consumption guidance (indicative)", note: "Use your measured idle burn when available" },
              ]}
            />
            <Disclaimer variant="stationary" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Daily idle minutes"
            type="number"
            min="0"
            value={dailyMinutes}
            onChange={(e) => setDailyMinutes(e.target.value)}
          />
          <InputGroup
            label={`Idle burn rate (${fuelUnit}/h)`}
            type="number"
            min="0"
            step="0.1"
            value={idleBurnRate}
            onChange={(e) => setIdleBurnRate(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Fuel price / gallon" : "Fuel price / litre"}
            type="number"
            min="0"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
          />
          <InputGroup
            label="Working days / year"
            type="number"
            min="1"
            value={workingDays}
            onChange={(e) => setWorkingDays(e.target.value)}
          />
          <InputGroup
            label="Vehicles (fleet)"
            type="number"
            min="1"
            value={vehicles}
            onChange={(e) => setVehicles(e.target.value)}
          />
        </div>
      </CalculatorShell>
    </>
  );
}
