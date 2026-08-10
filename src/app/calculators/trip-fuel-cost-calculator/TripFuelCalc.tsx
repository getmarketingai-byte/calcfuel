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
import {
  calculateRoadTrip,
  type RoadTripMode,
  type RoadTripResult,
} from "@/domain/models/roadTrip";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

const MODES: { id: RoadTripMode; label: string }[] = [
  { id: "road_trip", label: "Road trip" },
  { id: "return", label: "Return" },
  { id: "commute", label: "Commute" },
  { id: "carpool", label: "Carpool" },
];

const DEFAULTS = {
  imperial: { distance: "350", efficiency: "30", fuelPrice: "3.50" },
  metric: { distance: "560", efficiency: "8", fuelPrice: "1.80" },
};

export default function TripFuelCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [mode, setMode] = useState<RoadTripMode>("road_trip");
  const [distance, setDistance] = useState(DEFAULTS.metric.distance);
  const [efficiency, setEfficiency] = useState(DEFAULTS.metric.efficiency);
  const [fuelPrice, setFuelPrice] = useState(DEFAULTS.metric.fuelPrice);
  const [commuteDays, setCommuteDays] = useState("5");
  const [passengers, setPassengers] = useState("2");
  const [result, setResult] = useState<RoadTripResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchUnit = (next: typeof unit) => {
    if (next === unit) return;
    setUnit(next);
    const d = DEFAULTS[next];
    setDistance(d.distance);
    setEfficiency(d.efficiency);
    setFuelPrice(d.fuelPrice);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(distance);
      const e = parseFloat(efficiency);
      const p = parseFloat(fuelPrice);
      const trip = calculateRoadTrip({
        unit,
        distance: d,
        efficiency: e,
        fuelPrice: p,
        mode,
        commuteDays: parseFloat(commuteDays) || 1,
        passengers: parseInt(passengers, 10) || 1,
      });
      setResult(trip);
      if (trip) {
        trackCalculation("trip_fuel_cost", {
          unit,
          mode,
          distance: d,
          efficiency: e,
          fuel_price: p,
          total_cost: parseFloat(trip.totalCost.toFixed(2)),
        });
      }
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [distance, efficiency, fuelPrice, unit, mode, commuteDays, passengers]);

  const distUnit = unit === "imperial" ? "miles" : "km";
  const fuelUnit = unit === "imperial" ? "gal" : "L";
  const effLabel = unit === "imperial" ? "Fuel economy (MPG)" : "Fuel use (L/100km)";

  return (
    <>
    <CalculatorLifecycle
      calculatorId="trip_fuel_cost"
      category="trip_planning"
      hasResult={!!result}
      unitSystem={unit}
    />
    <CalculatorShell
      title="Trip Fuel Cost"
      description="Decide what a road trip, commute, or carpool will cost in fuel — before you leave."
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
          <ResultGrid columns={mode === "carpool" ? 4 : 3}>
            <ResultCard
              label={`Fuel used (${fuelUnit})`}
              value={result.fuelUsed.toFixed(2)}
              hint={`${result.effectiveDistance.toFixed(0)} ${distUnit} effective`}
              tone="info"
            />
            <ResultCard label="Total fuel cost" value={`$${result.totalCost.toFixed(2)}`} tone="success" />
            <ResultCard
              label={`Cost per ${unit === "imperial" ? "mile" : "km"}`}
              value={`$${result.costPerDistance.toFixed(3)}`}
              tone="primary"
            />
            {mode === "carpool" ? (
              <ResultCard
                label="Cost per person"
                value={`$${result.costPerPerson.toFixed(2)}`}
                tone="neutral"
              />
            ) : null}
          </ResultGrid>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400" role="alert">
            Enter positive distance, efficiency, and fuel price to see results.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Fuel used = distance ÷ MPG (imperial) or (L/100km × km) ÷ 100 (metric). Cost = fuel ×
              price. Return doubles one-way distance. Commute uses round-trip × working days. Carpool
              splits total fuel cost across passengers.
            </p>
          </Methodology>
          <Disclaimer variant="planning" />
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 mb-2" role="group" aria-label="Trip mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={
              "px-3 py-1.5 rounded-lg text-sm font-medium border " +
              (mode === m.id
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200")
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputGroup
          label={
            mode === "commute"
              ? `One-way distance (${distUnit})`
              : `Trip distance (${distUnit})`
          }
          type="number"
          inputMode="decimal"
          min="0"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <InputGroup
          label={effLabel}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
        />
        <InputGroup
          label={unit === "imperial" ? "Fuel price (per gallon)" : "Fuel price (per litre)"}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
      </div>

      {mode === "commute" ? (
        <div className="mt-4 max-w-xs">
          <InputGroup
            label="Working days in period"
            type="number"
            min="1"
            value={commuteDays}
            onChange={(e) => setCommuteDays(e.target.value)}
            hint="e.g. 5 for a work week, 20 for a month"
          />
        </div>
      ) : null}

      {mode === "carpool" ? (
        <div className="mt-4 max-w-xs">
          <InputGroup
            label="Passengers sharing fuel"
            type="number"
            min="1"
            max="8"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
        </div>
      ) : null}
    </CalculatorShell>
    </>
  );
}
