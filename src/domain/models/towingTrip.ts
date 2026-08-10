/**
 * TowingTrip decision model — towing / caravan fuel cost.
 */

import type { UnitSystem } from "../units";
import {
  applyTowingPenalty,
  fuelCost,
  fuelUsed,
} from "../calculations/primitives";
import { mpgToLPer100km } from "../units";

export const TRAILER_PENALTIES = [
  { id: "light", label: "Light trailer / box trailer (< 500 kg)", penaltyPercent: 8 },
  { id: "boat", label: "Boat on trailer (500–1,200 kg)", penaltyPercent: 14 },
  { id: "camper", label: "Small camper trailer (750–1,500 kg)", penaltyPercent: 18 },
  { id: "caravan", label: "Caravan / pop-top (1,500–2,200 kg)", penaltyPercent: 24 },
  { id: "large", label: "Large caravan / fifth-wheel (> 2,200 kg)", penaltyPercent: 32 },
] as const;

export interface TowingTripInput {
  unit: UnitSystem;
  distance: number;
  /** Solo (untowed) efficiency: MPG or L/100km. */
  baseEfficiency: number;
  fuelPrice: number;
  /** Percentage penalty (e.g. 24 for typical caravan). */
  penaltyPercent: number;
}

export interface TowingTripResult {
  penaltyPercent: number;
  effectiveEfficiency: number;
  /** Effective L/100km for display (always computed). */
  effectiveLPer100km: number;
  normalFuel: number;
  normalCost: number;
  towingFuel: number;
  towingCost: number;
  extraFuel: number;
  extraCost: number;
}

export function calculateTowingTrip(input: TowingTripInput): TowingTripResult | null {
  const { unit, distance, baseEfficiency, fuelPrice, penaltyPercent } = input;

  if (distance <= 0 || baseEfficiency <= 0 || fuelPrice < 0 || penaltyPercent < 0) {
    return null;
  }

  const effectiveEfficiency = applyTowingPenalty(baseEfficiency, penaltyPercent, unit);
  const normalFuel = fuelUsed(distance, baseEfficiency, unit);
  const towingFuel = fuelUsed(distance, effectiveEfficiency, unit);
  const normalCost = fuelCost(normalFuel, fuelPrice);
  const towingCost = fuelCost(towingFuel, fuelPrice);

  const effectiveLPer100km =
    unit === "metric" ? effectiveEfficiency : mpgToLPer100km(effectiveEfficiency);

  return {
    penaltyPercent,
    effectiveEfficiency,
    effectiveLPer100km,
    normalFuel,
    normalCost,
    towingFuel,
    towingCost,
    extraFuel: towingFuel - normalFuel,
    extraCost: towingCost - normalCost,
  };
}
