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
  SelectGroup,
  UnitToggle,
} from "@/components/calc";
import {
  calculateTowingTrip,
  TRAILER_PENALTIES,
  type TowingTripResult,
} from "@/domain/models/towingTrip";
import type { UnitSystem } from "@/domain/units";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

const DEFAULTS = {
  metric: { distance: "450", baseEfficiency: "10.5", fuelPrice: "1.92" },
  imperial: { distance: "280", baseEfficiency: "22", fuelPrice: "3.80" },
};

export default function TowingFuelCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [distance, setDistance] = useState(DEFAULTS.metric.distance);
  const [baseEfficiency, setBaseEfficiency] = useState(DEFAULTS.metric.baseEfficiency);
  const [fuelPrice, setFuelPrice] = useState(DEFAULTS.metric.fuelPrice);
  const [trailerIdx, setTrailerIdx] = useState(3);
  const [customPenalty, setCustomPenalty] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [result, setResult] = useState<TowingTripResult | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    const d = DEFAULTS[next];
    setDistance(d.distance);
    setBaseEfficiency(d.baseEfficiency);
    setFuelPrice(d.fuelPrice);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const e = parseFloat(baseEfficiency);
      const p = parseFloat(fuelPrice);
      const penalty = useCustom
        ? parseFloat(customPenalty)
        : TRAILER_PENALTIES[trailerIdx].penaltyPercent;

      if (useCustom && (isNaN(penalty) || penalty < 0 || penalty > 100)) {
        setError("Custom penalty must be between 0 and 100%.");
        setResult(null);
        return;
      }

      const trip = calculateTowingTrip({
        unit,
        distance: d,
        baseEfficiency: e,
        fuelPrice: p,
        penaltyPercent: penalty,
      });

      if (!trip) {
        setError("");
        setResult(null);
        return;
      }

      setError("");
      setResult(trip);
      trackCalculation("towing_fuel_cost", {
        unit,
        distance: d,
        base_efficiency: e,
        fuel_price: p,
        penalty_pct: penalty,
        towing_cost: parseFloat(trip.towingCost.toFixed(2)),
      });
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [distance, baseEfficiency, fuelPrice, trailerIdx, customPenalty, useCustom, unit]);

  const fuelUnit = unit === "metric" ? "L" : "gal";

  return (
    <>
    <CalculatorLifecycle
      calculatorId="towing_fuel_cost"
      category="towing"
      hasResult={!!result}
      unitSystem={unit}
    />
    <CalculatorShell
      title="Towing Fuel Cost"
      description="See how much extra fuel a trailer or caravan adds to a trip — and what that costs."
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
            <ResultGrid columns={2}>
              <ResultCard
                label="Without towing"
                value={`$${result.normalCost.toFixed(2)}`}
                hint={`${result.normalFuel.toFixed(1)} ${fuelUnit}`}
                tone="info"
              />
              <ResultCard
                label="With towing"
                value={`$${result.towingCost.toFixed(2)}`}
                hint={`${result.towingFuel.toFixed(1)} ${fuelUnit}`}
                tone="primary"
              />
            </ResultGrid>
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-gray-700 dark:text-gray-300">
              Towing adds{" "}
              <strong className="text-red-600 dark:text-red-400">${result.extraCost.toFixed(2)}</strong> (
              {result.extraFuel.toFixed(1)} {fuelUnit}) — a{" "}
              <strong>{result.penaltyPercent}% fuel penalty</strong>
              {unit === "metric" ? (
                <>
                  . Effective use while towing:{" "}
                  <strong>{result.effectiveLPer100km.toFixed(1)} L/100km</strong>
                </>
              ) : null}
              .
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter distance, unloaded economy, and fuel price to compare towing cost.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Towing worsens efficiency by a penalty percentage (preset by trailer class, or custom).
              Metric: L/100km × (1 + penalty%). Imperial: MPG ÷ (1 + penalty%). Extra cost is towing
              fuel cost minus unloaded fuel cost for the same distance.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputGroup
          label={unit === "metric" ? "Trip distance (km)" : "Trip distance (miles)"}
          type="number"
          inputMode="decimal"
          min="0"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <InputGroup
          label={
            unit === "metric"
              ? "Unloaded fuel use (L/100km)"
              : "Unloaded fuel economy (MPG)"
          }
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={baseEfficiency}
          onChange={(e) => setBaseEfficiency(e.target.value)}
        />
        <InputGroup
          label={unit === "metric" ? "Fuel price (per litre)" : "Fuel price (per gallon)"}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
        <SelectGroup
          label="What are you towing?"
          value={useCustom ? "custom" : String(trailerIdx)}
          onChange={(e) => {
            if (e.target.value === "custom") setUseCustom(true);
            else {
              setUseCustom(false);
              setTrailerIdx(parseInt(e.target.value, 10));
            }
          }}
        >
          {TRAILER_PENALTIES.map((t, i) => (
            <option key={t.id} value={String(i)}>
              {t.label} (+{t.penaltyPercent}%)
            </option>
          ))}
          <option value="custom">Custom fuel penalty %</option>
        </SelectGroup>
      </div>

      {useCustom ? (
        <div className="mt-4 max-w-xs">
          <InputGroup
            label="Custom fuel penalty (%)"
            type="number"
            min="0"
            max="100"
            value={customPenalty}
            onChange={(e) => setCustomPenalty(e.target.value)}
            hint="e.g. 20 means 20% more fuel while towing"
          />
        </div>
      ) : null}
    </CalculatorShell>
    </>
  );
}
