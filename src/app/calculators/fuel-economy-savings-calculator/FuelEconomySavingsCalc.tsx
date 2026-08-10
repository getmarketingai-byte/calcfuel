"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalculatorShell,
  Disclaimer,
  InputGroup,
  Methodology,
  ResultCard,
  ResultGrid,
  UnitToggle,
} from "@/components/calc";
import {
  calculateEconomySavings,
  ECONOMY_IMPROVEMENTS_IMPERIAL,
  ECONOMY_IMPROVEMENTS_METRIC,
  type EconomySavingsResult,
} from "@/domain/models/fuelEconomy";
import type { UnitSystem } from "@/domain/units";
import { trackCalculation } from "@/lib/analytics";

export default function FuelEconomySavingsCalc() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [annualMiles, setAnnualMiles] = useState("15000");
  const [fuelPrice, setFuelPrice] = useState("1.80");
  const [currentEfficiency, setCurrentEfficiency] = useState("8.5");
  const [selected, setSelected] = useState<Set<string>>(new Set(["smooth_driving"]));
  const [result, setResult] = useState<EconomySavingsResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const improvements = unit === "imperial" ? ECONOMY_IMPROVEMENTS_IMPERIAL : ECONOMY_IMPROVEMENTS_METRIC;

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    setSelected(new Set());
    if (next === "imperial") {
      setAnnualMiles("12000");
      setFuelPrice("3.50");
      setCurrentEfficiency("25");
    } else {
      setAnnualMiles("15000");
      setFuelPrice("1.80");
      setCurrentEfficiency("8.5");
    }
  };

  const toggleImp = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const chosen = improvements
        .filter((imp) => selected.has(imp.id))
        .map((imp) => ({ id: imp.id, gain: imp.gain }));
      const calc = calculateEconomySavings({
        unit,
        annualDistance: parseFloat(annualMiles),
        currentEfficiency: parseFloat(currentEfficiency),
        fuelPrice: parseFloat(fuelPrice),
        improvements: chosen,
      });
      setResult(calc);
      if (calc) {
        trackCalculation("fuel_economy_savings", {
          unit,
          annual_miles: parseFloat(annualMiles),
          fuel_price: parseFloat(fuelPrice),
          current_efficiency: parseFloat(currentEfficiency),
          improvements_selected: selected.size,
          annual_savings: parseFloat(calc.annualSavings.toFixed(2)),
        });
      }
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [annualMiles, fuelPrice, currentEfficiency, selected, unit, improvements]);

  const fmt = (n: number) => "$" + Math.abs(n).toFixed(2);
  const effUnit = unit === "imperial" ? "MPG" : "L/100km";

  return (
    <CalculatorShell
      title="Fuel Economy & Consumption"
      description="See annual fuel cost today, after efficiency improvements, and the equivalent MPG / L/100km / km/L figures."
      toolbar={
        <UnitToggle
          value={unit}
          onChange={switchUnit}
          metricLabel="km / L/100km"
          imperialLabel="Miles / MPG"
        />
      }
      results={
        result ? (
          <div className="space-y-4">
            <ResultGrid columns={4}>
              <ResultCard label="Current annual cost" value={fmt(result.currentCost)} tone="neutral" />
              <ResultCard
                label={`Improved (${effUnit})`}
                value={result.newEfficiency.toFixed(1)}
                tone="info"
              />
              <ResultCard label="New annual cost" value={fmt(result.newCost)} tone="primary" />
              <ResultCard
                label="Annual savings"
                value={fmt(result.annualSavings)}
                tone="success"
              />
            </ResultGrid>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Equivalents at improved economy: {result.conversion.mpg.toFixed(1)} MPG ·{" "}
              {result.conversion.lPer100km.toFixed(1)} L/100km ·{" "}
              {result.conversion.kmPerLitre.toFixed(2)} km/L
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter annual distance, current economy, and fuel price.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Annual cost uses the same fuel primitives as Trip Fuel. Improvements add MPG (imperial) or
              reduce L/100km (metric). Conversion uses the standard 235.215 factor between MPG and L/100km;
              km/L = 100 ÷ L/100km.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <InputGroup
          label={`Annual ${unit === "imperial" ? "miles" : "km"}`}
          type="number"
          min="0"
          value={annualMiles}
          onChange={(e) => setAnnualMiles(e.target.value)}
        />
        <InputGroup
          label={unit === "imperial" ? "Current economy (MPG)" : "Current use (L/100km)"}
          type="number"
          min="0"
          step="0.1"
          value={currentEfficiency}
          onChange={(e) => setCurrentEfficiency(e.target.value)}
        />
        <InputGroup
          label={unit === "imperial" ? "Fuel price / gallon" : "Fuel price / litre"}
          type="number"
          min="0"
          step="0.01"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
      </div>

      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Select improvements you plan to make:
      </p>
      <div className="space-y-2">
        {improvements.map((imp) => (
          <label
            key={imp.id}
            className={
              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all " +
              (selected.has(imp.id)
                ? "border-orange-400 bg-orange-50 dark:bg-orange-950"
                : "border-gray-200 dark:border-gray-600 hover:border-orange-300")
            }
          >
            <input
              type="checkbox"
              checked={selected.has(imp.id)}
              onChange={() => toggleImp(imp.id)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            <span className="text-sm text-gray-800 dark:text-gray-200 flex-1">{imp.label}</span>
            <span className="text-xs text-gray-500">{imp.desc}</span>
          </label>
        ))}
      </div>
    </CalculatorShell>
  );
}
