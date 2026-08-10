/**
 * BoatTrip decision model — Boat Trip Fuel Planner.
 *
 * Primary path: burn rate (L/h or gal/h) + speed + distance.
 * Optional HP-derived burn is labelled as an estimate only.
 */

import {
  costPerDistance,
  costPerHour,
  duration,
  fuelCost,
  rangeFromBurnRate,
  remainingFuel,
  reserveMargin,
  usableCapacity,
} from "../calculations/primitives";

export type HullType =
  | "planing"
  | "semi-displacement"
  | "displacement"
  | "pontoon"
  | "sail-assist";

export const HULL_BURN_FACTOR: Record<HullType, number> = {
  planing: 1.0,
  "semi-displacement": 0.75,
  displacement: 0.6,
  pontoon: 0.85,
  "sail-assist": 0.3,
};

export const HULL_LABELS: Record<HullType, string> = {
  planing: "Planing hull (speedboat, bowrider)",
  "semi-displacement": "Semi-displacement hull",
  displacement: "Displacement hull (trawler, sailboat motor)",
  pontoon: "Pontoon / flat-bottom",
  "sail-assist": "Sail assist (engine only)",
};

/** Rough US-gallon/hour at full throttle ≈ 0.05 gal/h per HP (rule of thumb). */
export function estimateBurnRateFromHp(input: {
  engineHp: number;
  numEngines?: number;
  throttlePercent?: number;
  hullType?: HullType;
  /** When true, convert estimated gal/h → L/h. */
  metric?: boolean;
}): number {
  const engines = input.numEngines && input.numEngines > 0 ? input.numEngines : 1;
  const throttle = Math.min(Math.max((input.throttlePercent ?? 75) / 100, 0), 1);
  const hull = input.hullType ?? "planing";
  const totalHp = Math.max(0, input.engineHp) * engines;
  const rawGph = totalHp * 0.05;
  const adjustedGph = rawGph * Math.pow(throttle, 2.5) * HULL_BURN_FACTOR[hull];
  if (input.metric) {
    return adjustedGph * 3.785411784;
  }
  return adjustedGph;
}

export interface BoatTripInput {
  /** Distance in nautical miles. */
  distanceNm: number;
  /** Speed in knots. */
  speedKnots: number;
  /** Burn rate in L/h (metric) or gal/h (imperial). */
  burnPerHour: number;
  fuelPrice: number;
  tankCapacity: number;
  /** Fraction of tank held as reserve (default 0.15 → 85% usable for range). */
  reserveFraction?: number;
  /** If true, fuel for out-and-back (2× distance). */
  returnTrip?: boolean;
}

export interface BoatTripResult {
  tripDistanceNm: number;
  travelTimeHours: number;
  fuelRequired: number;
  fuelCost: number;
  costPerNm: number;
  costPerHour: number;
  /** Safe range using usable capacity after reserve. */
  safeRangeNm: number;
  remainingFuel: number;
  reserveMargin: number;
  burnPer100Nm: number;
}

export function calculateBoatTrip(input: BoatTripInput): BoatTripResult | null {
  const {
    distanceNm,
    speedKnots,
    burnPerHour,
    fuelPrice,
    tankCapacity,
    reserveFraction = 0.15,
    returnTrip = false,
  } = input;

  if (speedKnots <= 0 || burnPerHour <= 0) return null;

  const tripDistanceNm = Math.max(0, distanceNm) * (returnTrip ? 2 : 1);
  const travelTimeHours = duration(tripDistanceNm, speedKnots);
  const fuelRequired = burnPerHour * travelTimeHours;
  const cost = fuelCost(fuelRequired, Math.max(0, fuelPrice));
  const usable = usableCapacity(Math.max(0, tankCapacity), reserveFraction);
  const safeRangeNm = rangeFromBurnRate(usable, burnPerHour, speedKnots);
  const remaining = remainingFuel(Math.max(0, tankCapacity), fuelRequired);
  const margin = reserveMargin(Math.max(0, tankCapacity), fuelRequired, reserveFraction);
  const burnPer100Nm = (burnPerHour / speedKnots) * 100;

  return {
    tripDistanceNm,
    travelTimeHours,
    fuelRequired,
    fuelCost: cost,
    costPerNm: costPerDistance(cost, tripDistanceNm),
    costPerHour: costPerHour(cost, travelTimeHours),
    safeRangeNm,
    remainingFuel: remaining,
    reserveMargin: margin,
    burnPer100Nm,
  };
}

/** Compare two boat scenarios (e.g. 15 vs 20 knots) by total fuel cost. */
export function compareBoatScenarios(
  a: { id: string; label: string; input: BoatTripInput },
  b: { id: string; label: string; input: BoatTripInput }
) {
  const ra = calculateBoatTrip(a.input);
  const rb = calculateBoatTrip(b.input);
  if (!ra || !rb) return null;
  const cheaper =
    Math.abs(ra.fuelCost - rb.fuelCost) < 1
      ? "tie"
      : ra.fuelCost < rb.fuelCost
        ? a.id
        : b.id;
  return {
    a: { id: a.id, label: a.label, result: ra },
    b: { id: b.id, label: b.label, result: rb },
    cheaper,
    savings: Math.abs(ra.fuelCost - rb.fuelCost),
  };
}
