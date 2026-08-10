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

/** Standalone carpool URL — uses RoadTrip carpool mode; canonical UX is Trip Fuel modes. */
export default function CarpoolFuelSplitCalc() {
  const [unit, setUnit] = usePersistedUnit("metric");
  const [distance, setDistance] = useState("100");
  const [efficiency, setEfficiency] = useState("8");
  const [fuelPrice, setFuelPrice] = useState("1.80");
  const [passengers, setPassengers] = useState("3");
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
        mode: "carpool",
        passengers: parseInt(passengers, 10) || 1,
      });
      setResult(trip);
      if (trip) {
        trackCalculation("carpool_fuel_split", {
          unit,
          distance: parseFloat(distance),
          total_cost: parseFloat(trip.totalCost.toFixed(2)),
          per_person: parseFloat(trip.costPerPerson.toFixed(2)),
        });
      }
    }, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [distance, efficiency, fuelPrice, passengers, unit]);

  const fuelUnit = unit === "imperial" ? "gal" : "L";

  return (
    <>
      <CalculatorLifecycle
        calculatorId="carpool_fuel_split"
        category="trip_planning"
        hasResult={!!result}
        unitSystem={unit}
      />
      <CalculatorShell
        title="Carpool Fuel Split"
        description="Split trip fuel cost across passengers. Also available as the Carpool mode on Trip Fuel Cost."
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
              <ResultCard label="Total fuel cost" value={`$${result.totalCost.toFixed(2)}`} tone="success" />
              <ResultCard label="Per person" value={`$${result.costPerPerson.toFixed(2)}`} tone="primary" />
            </ResultGrid>
          ) : null
        }
        footer={
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prefer the unified planner? Use{" "}
              <Link href="/calculators/trip-fuel-cost-calculator" className="text-orange-600 hover:underline">
                Trip Fuel Cost → Carpool mode
              </Link>
              .
            </p>
            <Methodology>
              <p>Total fuel cost ÷ passengers. Shared RoadTrip primitives.</p>
            </Methodology>
            <Disclaimer variant="planning" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label={`Trip distance (${unit === "imperial" ? "miles" : "km"})`}
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
            label="Passengers sharing fuel"
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
        </div>
      </CalculatorShell>
    </>
  );
}
