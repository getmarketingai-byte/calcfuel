/**
 * RoadTrip decision model — Trip Fuel Cost with modes.
 * Modes: road trip / commute / carpool / return (as appropriate).
 */

import type { UnitSystem } from "../units";
import {
  costPerDistance,
  fuelCost,
  fuelUsed,
} from "../calculations/primitives";

export type RoadTripMode = "road_trip" | "commute" | "carpool" | "return";

export interface RoadTripInput {
  unit: UnitSystem;
  /** One-way distance (miles or km). */
  distance: number;
  /** MPG (imperial) or L/100km (metric). */
  efficiency: number;
  fuelPrice: number;
  mode?: RoadTripMode;
  /** Commute: working days per period (default 1). */
  commuteDays?: number;
  /** Carpool: number of people splitting fuel (default 1). */
  passengers?: number;
}

export interface RoadTripResult {
  mode: RoadTripMode;
  /** Effective distance after mode multipliers. */
  effectiveDistance: number;
  fuelUsed: number;
  totalCost: number;
  costPerDistance: number;
  /** Per-person cost when carpool (else equals totalCost). */
  costPerPerson: number;
}

export function effectiveDistanceForMode(
  distance: number,
  mode: RoadTripMode,
  commuteDays = 1
): number {
  if (distance <= 0) return 0;
  switch (mode) {
    case "return":
      return distance * 2;
    case "commute":
      // Round trip × days
      return distance * 2 * Math.max(1, commuteDays);
    case "road_trip":
    case "carpool":
    default:
      return distance;
  }
}

export function calculateRoadTrip(input: RoadTripInput): RoadTripResult | null {
  const mode = input.mode ?? "road_trip";
  const passengers = Math.max(1, input.passengers ?? 1);
  const commuteDays = input.commuteDays ?? 1;

  if (input.distance <= 0 || input.efficiency <= 0 || input.fuelPrice < 0) {
    return null;
  }

  const effectiveDistance = effectiveDistanceForMode(
    input.distance,
    mode,
    commuteDays
  );
  const used = fuelUsed(effectiveDistance, input.efficiency, input.unit);
  const total = fuelCost(used, input.fuelPrice);
  const perPerson = mode === "carpool" ? total / passengers : total;

  return {
    mode,
    effectiveDistance,
    fuelUsed: used,
    totalCost: total,
    costPerDistance: costPerDistance(total, effectiveDistance),
    costPerPerson: perPerson,
  };
}
