"use client";

import Link from "next/link";
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
import { calculateRoadTrip, type RoadTripResult } from "@/domain/models/roadTrip";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation } from "@/lib/analytics";

/** Standalone commute URL — uses RoadTrip commute mode; canonical UX is Trip Fuel modes. */
export default function CommuteFuelCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [distance, setDistance] = useState("25");
  const [efficiency, setEfficiency] = useState("8");
  const [fuelPrice, setFuelPrice] = useState("1.80");
  const [days, setDays] = useState("5");
  const [result, setResult] = useState<RoadTripResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trip = calculateRoadTrip({
        unit,
        distance: parseFloat(distance),
        efficiency: parseFloat(efficiency),
        fuelPrice: parseFloat(fuelPrice),
        mode: "commute",
        commuteDays: parseFloat(days) || 5,
      });
      setResult(trip);
      if (trip) {
        trackCalculation("commute_fuel_cost", {
          unit,
          distance: parseFloat(distance),
          total_cost: parseFloat(trip.totalCost.toFixed(2)),
        });
      }
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [distance, efficiency, fuelPrice, days, unit]);

  const fuelUnit = unit === "imperial" ? "gal" : "L";

  return (
    <>
      <CalculatorLifecycle
        calculatorId="commute_fuel_cost"
        category="trip_planning"
        hasResult={!!result}
        unitSystem={unit}
      />
      <CalculatorShell
        title="Commute Fuel Cost"
        description="One-way distance × return × working days. Also available as the Commute mode on Trip Fuel Cost."
        toolbar={
          <UnitToggle
            value={unit}
            onChange={setUnit}
            metricLabel="km / L/100km"
            imperialLabel="Miles / MPG"
          />
        }
        results={
          result ? (
            <ResultGrid columns={3}>
              <ResultCard label={`Fuel (${fuelUnit})`} value={result.fuelUsed.toFixed(2)} tone="info" />
              <ResultCard label="Period fuel cost" value={`$${result.totalCost.toFixed(2)}`} tone="success" />
              <ResultCard
                label={`Cost / ${unit === "imperial" ? "mile" : "km"}`}
                value={`$${result.costPerDistance.toFixed(3)}`}
                tone="primary"
              />
            </ResultGrid>
          ) : null
        }
        footer={
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prefer the unified planner? Use{" "}
              <Link href="/calculators/trip-fuel-cost-calculator" className="text-orange-700 dark:text-orange-400 underline underline-offset-2">
                Trip Fuel Cost → Commute mode
              </Link>
              .
            </p>
            <Methodology>
              <p>Effective distance = one-way × 2 × working days. Fuel uses shared RoadTrip primitives.</p>
            </Methodology>
            <Disclaimer variant="commute" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label={`One-way distance (${unit === "imperial" ? "miles" : "km"})`}
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "MPG" : "L/100km"}
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
          />
          <InputGroup
            label={unit === "imperial" ? "Price / gallon" : "Price / litre"}
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
          />
          <InputGroup
            label="Working days in period"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
      </CalculatorShell>
    </>
  );
}
