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
  ScenarioComparison,
  SelectGroup,
  Sources,
  UnitToggle,
} from "@/components/calc";
import {
  calculateBoatTrip,
  compareBoatScenarios,
  estimateBurnRateFromHp,
  HULL_LABELS,
  type BoatTripResult,
  type HullType,
} from "@/domain/models/boatTrip";
import { usePersistedUnit } from "@/hooks/usePersistedUnit";
import { trackCalculation, trackScenarioComparison } from "@/lib/analytics";

type BurnMode = "known" | "estimate";

export default function BoatFuelCalc() {
  const [unit, setUnitPersisted] = usePersistedUnit("metric");
  const [burnMode, setBurnMode] = useState<BurnMode>("known");
  const [burnPerHour, setBurnPerHour] = useState("25");
  const [hullType, setHullType] = useState<HullType>("planing");
  const [engineHp, setEngineHp] = useState("150");
  const [numEngines, setNumEngines] = useState("1");
  const [throttle, setThrottle] = useState("75");
  const [speed, setSpeed] = useState("20");
  const [compareSpeed, setCompareSpeed] = useState("15");
  const [tripDistance, setTripDistance] = useState("40");
  const [returnTrip, setReturnTrip] = useState(false);
  const [fuelPrice, setFuelPrice] = useState("2.20");
  const [fuelCapacity, setFuelCapacity] = useState("300");

  const [result, setResult] = useState<BoatTripResult | null>(null);
  const [resolvedBurn, setResolvedBurn] = useState(0);
  const [scenario, setScenario] = useState<ReturnType<typeof compareBoatScenarios>>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fuelUnit = unit === "imperial" ? "gal" : "L";

  const switchUnit = (next: typeof unit) => {
    if (next === unit) return;
    setUnitPersisted(next);
    if (next === "imperial") {
      if (fuelPrice === "2.20") setFuelPrice("5.50");
      if (fuelCapacity === "300") setFuelCapacity("80");
      if (burnPerHour === "25") setBurnPerHour("6.5");
    } else {
      if (fuelPrice === "5.50") setFuelPrice("2.20");
      if (fuelCapacity === "80") setFuelCapacity("300");
      if (burnPerHour === "6.5") setBurnPerHour("25");
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const spd = parseFloat(speed);
      const distance = parseFloat(tripDistance) || 0;
      const price = parseFloat(fuelPrice) || 0;
      const capacity = parseFloat(fuelCapacity) || 0;
      const compareSpd = parseFloat(compareSpeed);

      let burn = parseFloat(burnPerHour);
      if (burnMode === "estimate") {
        const hp = parseFloat(engineHp);
        if (!hp || hp <= 0 || !spd || spd <= 0) {
          setResult(null);
          setScenario(null);
          return;
        }
        burn = estimateBurnRateFromHp({
          engineHp: hp,
          numEngines: parseFloat(numEngines) || 1,
          throttlePercent: parseFloat(throttle) || 75,
          hullType,
          metric: unit === "metric",
        });
      } else if (!burn || burn <= 0 || !spd || spd <= 0) {
        setResult(null);
        setScenario(null);
        return;
      }

      setResolvedBurn(burn);

      const baseInput = {
        distanceNm: distance,
        speedKnots: spd,
        burnPerHour: burn,
        fuelPrice: price,
        tankCapacity: capacity,
        reserveFraction: 0.15,
        returnTrip,
      };

      const trip = calculateBoatTrip(baseInput);
      setResult(trip);

      // Scenario B: alternate speed with burn scaled ~speed^2.5 relative (estimate only)
      if (compareSpd > 0 && compareSpd !== spd && trip) {
        const burnRatio = Math.pow(compareSpd / spd, 2.5);
        const cmp = compareBoatScenarios(
          {
            id: `${spd} kn`,
            label: `${spd} knots`,
            input: baseInput,
          },
          {
            id: `${compareSpd} kn`,
            label: `${compareSpd} knots`,
            input: {
              ...baseInput,
              speedKnots: compareSpd,
              burnPerHour: burn * burnRatio,
            },
          }
        );
        setScenario(cmp);
        if (cmp) {
          trackScenarioComparison("boat_fuel", {
            category: "marine",
            cheaper: cmp.cheaper,
            savings: parseFloat(cmp.savings.toFixed(2)),
          });
        }
      } else {
        setScenario(null);
      }

      if (trip) {
        trackCalculation("boat_fuel", {
          unit,
          burn_mode: burnMode,
          hullType,
          engineHp: parseFloat(engineHp) || 0,
          speed: spd,
          tripDistance: distance,
          return_trip: returnTrip ? 1 : 0,
          burnRatePerHour: burn,
          tripFuel: trip.fuelRequired,
          has_trip_distance: distance > 0 ? 1 : 0,
        });
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    unit,
    burnMode,
    burnPerHour,
    hullType,
    engineHp,
    numEngines,
    throttle,
    speed,
    compareSpeed,
    tripDistance,
    returnTrip,
    fuelPrice,
    fuelCapacity,
  ]);

  const nmPerUnit = resolvedBurn > 0 && parseFloat(speed) > 0 ? parseFloat(speed) / resolvedBurn : null;

  return (
    <>
    <CalculatorLifecycle
      calculatorId="boat_fuel"
      category="marine"
      hasResult={!!result}
      unitSystem={unit}
    />
    <CalculatorShell
      title="Boat Trip Fuel Planner"
      description="Plan fuel, cost, time and safe range for a real boat trip. Enter known burn rate when you have it — HP estimate is labelled as approximate only."
      toolbar={
        <UnitToggle
          value={unit}
          onChange={switchUnit}
          metricLabel="Metric (L)"
          imperialLabel="Imperial (gal)"
        />
      }
      results={
        result ? (
          <div className="space-y-4">
            <ResultGrid columns={4}>
              <ResultCard
                label={`Fuel / hour`}
                value={`${resolvedBurn.toFixed(1)} ${fuelUnit}`}
                tone="primary"
              />
              <ResultCard
                label="Fuel for trip"
                value={`${result.fuelRequired.toFixed(1)} ${fuelUnit}`}
                tone="info"
              />
              <ResultCard
                label="Trip fuel cost"
                value={`$${result.fuelCost.toFixed(2)}`}
                tone="success"
              />
              <ResultCard
                label="Travel time"
                value={`${result.travelTimeHours.toFixed(1)} h`}
                tone="neutral"
              />
              <ResultCard
                label="Safe range (85% tank)"
                value={`${Math.round(result.safeRangeNm)} NM`}
                hint="Estimated planning range"
                tone="success"
              />
              <ResultCard
                label="One-third outbound max"
                value={`${Math.round(result.safeRangeNm / 3)} NM`}
                tone="info"
              />
              <ResultCard
                label={`Cost / NM`}
                value={`$${result.costPerNm.toFixed(2)}`}
                tone="neutral"
              />
              <ResultCard
                label="Cost / hour"
                value={`$${result.costPerHour.toFixed(2)}`}
                tone="neutral"
              />
              <ResultCard
                label={`Fuel remaining`}
                value={`${result.remainingFuel.toFixed(1)} ${fuelUnit}`}
                tone="info"
              />
              <ResultCard
                label="Reserve margin"
                value={`${result.reserveMargin.toFixed(1)} ${fuelUnit}`}
                hint={result.reserveMargin < 0 ? "Dipping into reserve" : "Still holding reserve"}
                tone={result.reserveMargin < 0 ? "primary" : "success"}
              />
              {nmPerUnit !== null ? (
                <ResultCard
                  label={unit === "imperial" ? "NM per gallon" : "NM per litre"}
                  value={nmPerUnit.toFixed(2)}
                  tone="neutral"
                />
              ) : null}
            </ResultGrid>

            {scenario ? (
              <ScenarioComparison
                title="Speed scenario"
                cheaperId={scenario.cheaper === "tie" ? "tie" : scenario.cheaper}
                savingsLabel={`Save $${scenario.savings.toFixed(2)} on fuel`}
                scenarios={[
                  {
                    id: scenario.a.id,
                    label: scenario.a.label,
                    primary: `$${scenario.a.result.fuelCost.toFixed(2)}`,
                    secondary: `${scenario.a.result.fuelRequired.toFixed(1)} ${fuelUnit} · ${scenario.a.result.travelTimeHours.toFixed(1)} h`,
                  },
                  {
                    id: scenario.b.id,
                    label: scenario.b.label,
                    primary: `$${scenario.b.result.fuelCost.toFixed(2)}`,
                    secondary: `${scenario.b.result.fuelRequired.toFixed(1)} ${fuelUnit} · ${scenario.b.result.travelTimeHours.toFixed(1)} h`,
                  },
                ]}
              />
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-gray-700 dark:text-gray-300 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-4">
            Enter cruising speed and a burn rate (or HP estimate) to see trip fuel, cost and range.
          </p>
        )
      }
      footer={
        <div className="space-y-4">
          <Methodology>
            <p>
              Primary path: <strong>fuel burn × travel time</strong>. Travel time is distance ÷ speed
              (nautical miles ÷ knots). Cost is fuel × marina price. Safe range uses 85% of tank capacity
              as usable fuel. Remaining fuel and reserve margin show whether the trip dips into reserve.
            </p>
            <p>
              HP-derived burn is an optional rule of thumb (~0.05 gal/h per HP at full throttle, adjusted
              for throttle and hull). Prefer logged burn rates from your vessel when available.
            </p>
          </Methodology>
          <Sources
            sources={[
              {
                label: "USCG / recreational boating — fuel planning & one-third rule (practice guidance)",
                note: "Planning heuristic, not a legal requirement for all vessels",
              },
              {
                label: "Manufacturer engine/hull data for vessel-specific burn rates",
                note: "Prefer over HP rule of thumb",
              },
            ]}
          />
          <Disclaimer variant="marine" />
        </div>
      }
    >
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          type="button"
          onClick={() => setBurnMode("known")}
          className={
            "px-3 py-1.5 rounded-lg text-sm font-medium border " +
            (burnMode === "known"
              ? "bg-orange-700 text-white border-orange-500"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200")
          }
        >
          Known burn rate
        </button>
        <button
          type="button"
          onClick={() => setBurnMode("estimate")}
          className={
            "px-3 py-1.5 rounded-lg text-sm font-medium border " +
            (burnMode === "estimate"
              ? "bg-orange-700 text-white border-orange-500"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200")
          }
        >
          Estimate from HP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wide">
            Burn & vessel
          </h3>

          {burnMode === "known" ? (
            <InputGroup
              label={`Fuel burn (${fuelUnit}/h)`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={burnPerHour}
              onChange={(e) => setBurnPerHour(e.target.value)}
              hint="Best source: engine display, flow meter, or logged trips"
            />
          ) : (
            <>
              <SelectGroup
                label="Hull type"
                value={hullType}
                onChange={(e) => setHullType(e.target.value as HullType)}
              >
                {(Object.keys(HULL_LABELS) as HullType[]).map((h) => (
                  <option key={h} value={h}>
                    {HULL_LABELS[h]}
                  </option>
                ))}
              </SelectGroup>
              <InputGroup
                label="Engine HP (each)"
                type="number"
                min="1"
                value={engineHp}
                onChange={(e) => setEngineHp(e.target.value)}
              />
              <SelectGroup
                label="Number of engines"
                value={numEngines}
                onChange={(e) => setNumEngines(e.target.value)}
              >
                <option value="1">1 engine</option>
                <option value="2">2 engines</option>
                <option value="3">3 engines</option>
                <option value="4">4 engines</option>
              </SelectGroup>
              <InputGroup
                label="Throttle / load (%)"
                type="number"
                min="10"
                max="100"
                value={throttle}
                onChange={(e) => setThrottle(e.target.value)}
                hint="Cruise ≈ 60–75%. Estimate only — verify with real burn."
              />
            </>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wide">
            Trip plan
          </h3>
          <InputGroup
            label="Cruising speed (knots)"
            type="number"
            min="0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <InputGroup
            label="Compare at speed (knots)"
            type="number"
            min="0"
            step="0.1"
            value={compareSpeed}
            onChange={(e) => setCompareSpeed(e.target.value)}
            hint="Optional second scenario (burn scales with speed^2.5)"
          />
          <InputGroup
            label="Trip distance (nautical miles)"
            type="number"
            min="0"
            step="0.1"
            value={tripDistance}
            onChange={(e) => setTripDistance(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={returnTrip}
              onChange={(e) => setReturnTrip(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            Return trip (double distance)
          </label>
          <InputGroup
            label={`Fuel price (per ${fuelUnit})`}
            type="number"
            min="0"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
          />
          <InputGroup
            label={`Tank capacity (${fuelUnit})`}
            type="number"
            min="0"
            step="1"
            value={fuelCapacity}
            onChange={(e) => setFuelCapacity(e.target.value)}
            hint="Used for safe range and reserve margin"
          />
        </div>
      </div>
    </CalculatorShell>
    </>
  );
}
