/**
 * Pure calculation primitives shared by all transport decision models.
 * Inputs are unit-system-aware where efficiency conventions differ
 * (MPG vs L/100km); callers pass the active UnitSystem.
 */

import type { UnitSystem } from "../units";

export function fuelUsed(
  distance: number,
  efficiency: number,
  unit: UnitSystem
): number {
  if (distance <= 0 || efficiency <= 0) return 0;
  if (unit === "imperial") {
    // miles / MPG = gallons
    return distance / efficiency;
  }
  // (L/100km) * km / 100 = litres
  return (efficiency / 100) * distance;
}

export function fuelCost(fuelVolume: number, pricePerUnit: number): number {
  if (fuelVolume <= 0 || pricePerUnit < 0) return 0;
  return fuelVolume * pricePerUnit;
}

/** Duration in hours given distance and speed in matching units. */
export function duration(distance: number, speed: number): number {
  if (distance <= 0 || speed <= 0) return 0;
  return distance / speed;
}

/**
 * Range at constant speed from usable tank capacity and burn rate per hour.
 * Distance units match speed units (e.g. NM when speed is knots).
 */
export function rangeFromBurnRate(
  usableCapacity: number,
  burnPerHour: number,
  speed: number
): number {
  if (usableCapacity <= 0 || burnPerHour <= 0 || speed <= 0) return 0;
  const hours = usableCapacity / burnPerHour;
  return hours * speed;
}

/**
 * Road range from tank capacity and efficiency.
 * Imperial: gallons * MPG. Metric: litres / (L/100km) * 100.
 */
export function rangeFromEfficiency(
  tankCapacity: number,
  efficiency: number,
  unit: UnitSystem
): number {
  if (tankCapacity <= 0 || efficiency <= 0) return 0;
  if (unit === "imperial") return tankCapacity * efficiency;
  return (tankCapacity / efficiency) * 100;
}

/** Cost per distance unit (mile or km). */
export function costPerDistance(totalCost: number, distance: number): number {
  if (distance <= 0) return 0;
  return totalCost / distance;
}

/** Cost per hour of travel. */
export function costPerHour(totalCost: number, hours: number): number {
  if (hours <= 0) return 0;
  return totalCost / hours;
}

/**
 * Apply a reserve fraction to tank capacity (e.g. 0.15 → 85% usable).
 * Also used for marine one-third planning via higher reserve fractions.
 */
export function usableCapacity(tankCapacity: number, reserveFraction: number): number {
  if (tankCapacity <= 0) return 0;
  const clamped = Math.min(Math.max(reserveFraction, 0), 1);
  return tankCapacity * (1 - clamped);
}

/**
 * Remaining fuel after a trip (never negative).
 */
export function remainingFuel(tankCapacity: number, fuelConsumed: number): number {
  if (tankCapacity <= 0) return 0;
  return Math.max(0, tankCapacity - Math.max(0, fuelConsumed));
}

/**
 * Reserve margin: usable reserve left after consumption, relative to requested reserve.
 * Positive = still holding reserve; negative = dipping into reserve.
 */
export function reserveMargin(
  tankCapacity: number,
  fuelConsumed: number,
  reserveFraction: number
): number {
  const reserved = tankCapacity * Math.min(Math.max(reserveFraction, 0), 1);
  const remaining = remainingFuel(tankCapacity, fuelConsumed);
  return remaining - reserved;
}

/**
 * Towing/load penalty worsens efficiency.
 * Metric: L/100km increases by penalty%. Imperial: MPG decreases by penalty%.
 */
export function applyTowingPenalty(
  baseEfficiency: number,
  penaltyPercent: number,
  unit: UnitSystem
): number {
  if (baseEfficiency <= 0) return 0;
  const factor = 1 + Math.max(0, penaltyPercent) / 100;
  if (unit === "metric") return baseEfficiency * factor;
  return baseEfficiency / factor;
}

export interface ScenarioResult<T> {
  id: string;
  label: string;
  result: T;
}

/** Compare two numeric totals; returns cheaper id or "tie" within epsilon. */
export function compareTotals(
  a: { id: string; total: number },
  b: { id: string; total: number },
  epsilon = 1
): { cheaper: string; savings: number } {
  const diff = a.total - b.total;
  if (Math.abs(diff) < epsilon) {
    return { cheaper: "tie", savings: 0 };
  }
  if (diff < 0) {
    return { cheaper: a.id, savings: Math.abs(diff) };
  }
  return { cheaper: b.id, savings: Math.abs(diff) };
}

export function compareScenarios<T extends { total: number }>(
  scenarios: ScenarioResult<T>[],
  epsilon = 1
): { cheapestId: string | "tie"; ranked: ScenarioResult<T>[] } {
  if (scenarios.length === 0) return { cheapestId: "tie", ranked: [] };
  const ranked = [...scenarios].sort((x, y) => x.result.total - y.result.total);
  if (ranked.length === 1) {
    return { cheapestId: ranked[0].id, ranked };
  }
  const best = ranked[0];
  const second = ranked[1];
  if (Math.abs(best.result.total - second.result.total) < epsilon) {
    return { cheapestId: "tie", ranked };
  }
  return { cheapestId: best.id, ranked };
}
