"use client";

import { useEffect, useRef, useState } from "react";
import {
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
  calculateMotorcycleFuel,
  MOTORCYCLE_PRESETS,
  motorcyclePresetEfficiency,
  type MotorcycleFuelResult,
  type MotorcycleTripType,
} from "@/domain/models/motorcycleFuel";
import type { UnitSystem } from "@/domain/units";
import { trackCalculation } from "@/lib/analytics";

export default function MotorcycleFuelCalc() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [tripType, setTripType] = useState<MotorcycleTripType>("single");
  const [distance, setDistance] = useState("80");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [presetIdx, setPresetIdx] = useState(1);
  const [useCustom, setUseCustom] = useState(false);
  const [customEfficiency, setCustomEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("1.90");
  const [result, setResult] = useState<MotorcycleFuelResult | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: UnitSystem) => {
    if (next === unit) return;
    setUnit(next);
    setFuelPrice(next === "metric" ? "1.90" : "3.80");
    setDistance(next === "metric" ? "80" : "50");
    setCustomEfficiency("");
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const p = parseFloat(fuelPrice);
      const days = parseFloat(daysPerWeek);
      const efficiency = useCustom
        ? parseFloat(customEfficiency)
        : motorcyclePresetEfficiency(presetIdx, unit);

      if (!d || !p || d <= 0 || p <= 0 || !efficiency || efficiency <= 0) {
        setResult(null);
        setError("");
        return;
      }
      if (tripType === "commute" && (!days || days <= 0 || days > 7)) {
        setError("Days per week must be between 1 and 7.");
        setResult(null);
        return;
      }

      const calc = calculateMotorcycleFuel({
        unit,
        tripType,
        distance: d,
        efficiency,
        fuelPrice: p,
        daysPerWeek: days,
      });
      setError("");
      setResult(calc);
      if (calc) {
        trackCalculation("motorcycle_fuel_cost", {
          unit,
          trip_type: tripType,
          distance: d,
          fuel_price: p,
          trip_cost: parseFloat(calc.trip.totalCost.toFixed(2)),
        });
      }
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [distance, daysPerWeek, presetIdx, useCustom, customEfficiency, fuelPrice, unit, tripType]);

  const fmt = (n: number) => "$" + n.toFixed(2);
  const fuelUnit = unit === "metric" ? "L" : "gal";
  const distUnit = unit === "metric" ? "km" : "mile";

  return (
    <CalculatorShell
      title="Motorcycle Fuel Cost"
      description="Estimate fuel cost for a ride or weekly commute — with bike-class presets or your own economy."
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
            <ResultGrid columns={3}>
              <ResultCard
                label={`Fuel used (${fuelUnit})`}
                value={result.trip.fuelUsed.toFixed(2)}
                tone="info"
              />
              <ResultCard
                label={tripType === "commute" ? "One-way fuel cost" : "Trip fuel cost"}
                value={fmt(
                  tripType === "commute" ? result.trip.totalCost / (2 * (parseFloat(daysPerWeek) || 1)) : result.trip.totalCost
                )}
                tone="primary"
              />
              <ResultCard
                label={`Cost / ${distUnit}`}
                value={fmt(result.trip.costPerDistance)}
                tone="neutral"
              />
            </ResultGrid>
            {tripType === "commute" && result.weekly != null ? (
              <ResultGrid columns={3}>
                <ResultCard label="Weekly" value={fmt(result.weekly)} tone="info" />
                <ResultCard label="Monthly" value={fmt(result.monthly!)} tone="primary" />
                <ResultCard label="Annual" value={fmt(result.annual!)} tone="success" />
              </ResultGrid>
            ) : null}
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter distance and fuel price to see motorcycle trip cost.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Uses the same RoadTrip primitives as car trip fuel. Commute mode treats distance as
              one-way and multiplies by 2 × days per week. Presets are typical class averages — replace
              with your logged L/100km or MPG when you have it.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setTripType("single")}
          className={
            "flex-1 py-2 rounded-lg text-sm font-medium border " +
            (tripType === "single"
              ? "bg-orange-500 text-white border-orange-500"
              : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300")
          }
        >
          Single trip
        </button>
        <button
          type="button"
          onClick={() => setTripType("commute")}
          className={
            "flex-1 py-2 rounded-lg text-sm font-medium border " +
            (tripType === "commute"
              ? "bg-orange-500 text-white border-orange-500"
              : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300")
          }
        >
          Weekly commute
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputGroup
          label={
            tripType === "commute"
              ? `One-way distance (${distUnit}s)`
              : `Trip distance (${distUnit}s)`
          }
          type="number"
          min="0"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <InputGroup
          label={unit === "metric" ? "Fuel price / litre" : "Fuel price / gallon"}
          type="number"
          min="0"
          step="0.01"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />

        <SelectGroup
          label="Bike class"
          value={useCustom ? "custom" : String(presetIdx)}
          onChange={(e) => {
            if (e.target.value === "custom") setUseCustom(true);
            else {
              setUseCustom(false);
              setPresetIdx(parseInt(e.target.value, 10));
            }
          }}
        >
          {MOTORCYCLE_PRESETS.map((p, i) => (
            <option key={p.id} value={String(i)}>
              {p.label} ({unit === "metric" ? `${p.l100} L/100km` : `${p.mpg} MPG`})
            </option>
          ))}
          <option value="custom">Custom economy</option>
        </SelectGroup>

        {tripType === "commute" ? (
          <InputGroup
            label="Days per week"
            type="number"
            min="1"
            max="7"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
          />
        ) : (
          <div />
        )}
      </div>

      {useCustom ? (
        <div className="mt-4 max-w-xs">
          <InputGroup
            label={unit === "metric" ? "Custom L/100km" : "Custom MPG"}
            type="number"
            min="0"
            step="0.1"
            value={customEfficiency}
            onChange={(e) => setCustomEfficiency(e.target.value)}
          />
        </div>
      ) : null}
    </CalculatorShell>
  );
}
