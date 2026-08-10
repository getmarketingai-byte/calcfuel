/**
 * Fuel Economy & Consumption — merged canonical primitives.
 * Covers MPG ↔ L/100km ↔ km/L, trip fuel/cost, and improvement savings.
 */

import type { UnitSystem } from "../units";
import { lPer100kmToMpg, mpgToLPer100km } from "../units";
import { costPerDistance, fuelCost, fuelUsed } from "../calculations/primitives";

export interface EconomyConversion {
  mpg: number;
  lPer100km: number;
  kmPerLitre: number;
}

/** Convert any one known efficiency figure into the full set. */
export function convertEconomy(input: {
  mpg?: number;
  lPer100km?: number;
  kmPerLitre?: number;
}): EconomyConversion | null {
  let lPer100km = 0;
  if (input.lPer100km && input.lPer100km > 0) {
    lPer100km = input.lPer100km;
  } else if (input.mpg && input.mpg > 0) {
    lPer100km = mpgToLPer100km(input.mpg);
  } else if (input.kmPerLitre && input.kmPerLitre > 0) {
    lPer100km = 100 / input.kmPerLitre;
  } else {
    return null;
  }
  const mpg = lPer100kmToMpg(lPer100km);
  const kmPerLitre = 100 / lPer100km;
  return { mpg, lPer100km, kmPerLitre };
}

export interface EconomyTripInput {
  unit: UnitSystem;
  distance: number;
  efficiency: number;
  fuelPrice: number;
}

export interface EconomyTripResult {
  fuelUsed: number;
  totalCost: number;
  costPerDistance: number;
  conversion: EconomyConversion;
}

export function calculateEconomyTrip(input: EconomyTripInput): EconomyTripResult | null {
  const { unit, distance, efficiency, fuelPrice } = input;
  if (distance <= 0 || efficiency <= 0 || fuelPrice < 0) return null;
  const used = fuelUsed(distance, efficiency, unit);
  const total = fuelCost(used, fuelPrice);
  const conversion =
    convertEconomy(unit === "imperial" ? { mpg: efficiency } : { lPer100km: efficiency })!;
  return {
    fuelUsed: used,
    totalCost: total,
    costPerDistance: costPerDistance(total, distance),
    conversion,
  };
}

export interface EconomyImprovement {
  id: string;
  /** Absolute change: +MPG (imperial) or Δ L/100km (metric, usually negative). */
  gain: number;
}

export interface EconomySavingsInput {
  unit: UnitSystem;
  annualDistance: number;
  currentEfficiency: number;
  fuelPrice: number;
  improvements: EconomyImprovement[];
}

export interface EconomySavingsResult {
  currentCost: number;
  newEfficiency: number;
  newCost: number;
  annualSavings: number;
  conversion: EconomyConversion;
}

export function calculateEconomySavings(
  input: EconomySavingsInput
): EconomySavingsResult | null {
  const { unit, annualDistance, currentEfficiency, fuelPrice, improvements } = input;
  if (annualDistance <= 0 || currentEfficiency <= 0 || fuelPrice < 0) return null;

  const totalGain = improvements.reduce((sum, i) => sum + i.gain, 0);
  const current = calculateEconomyTrip({
    unit,
    distance: annualDistance,
    efficiency: currentEfficiency,
    fuelPrice,
  });
  if (!current) return null;

  let newEfficiency: number;
  if (unit === "imperial") {
    newEfficiency = currentEfficiency + totalGain;
    if (newEfficiency <= 0) return null;
  } else {
    newEfficiency = Math.max(currentEfficiency + totalGain, 0.1);
  }

  const improved = calculateEconomyTrip({
    unit,
    distance: annualDistance,
    efficiency: newEfficiency,
    fuelPrice,
  });
  if (!improved) return null;

  return {
    currentCost: current.totalCost,
    newEfficiency,
    newCost: improved.totalCost,
    annualSavings: current.totalCost - improved.totalCost,
    conversion: improved.conversion,
  };
}

export const ECONOMY_IMPROVEMENTS_IMPERIAL = [
  { id: "tire_pressure", label: "Proper tire inflation", gain: 0.5, desc: "+0.5 MPG avg" },
  { id: "speed_reduction", label: "Reduce highway speed by 10 mph", gain: 2, desc: "+2 MPG avg" },
  { id: "ac_off", label: "Minimize AC use", gain: 1, desc: "+1 MPG avg" },
  { id: "weight_reduction", label: "Remove 100 lbs of cargo", gain: 0.2, desc: "+0.2 MPG avg" },
  { id: "smooth_driving", label: "Smooth acceleration & braking", gain: 1.5, desc: "+1.5 MPG avg" },
] as const;

export const ECONOMY_IMPROVEMENTS_METRIC = [
  { id: "tire_pressure", label: "Proper tire inflation", gain: -0.2, desc: "-0.2 L/100km avg" },
  { id: "speed_reduction", label: "Reduce highway speed by 15 km/h", gain: -0.8, desc: "-0.8 L/100km avg" },
  { id: "ac_off", label: "Minimize AC use", gain: -0.4, desc: "-0.4 L/100km avg" },
  { id: "weight_reduction", label: "Remove 45 kg of cargo", gain: -0.1, desc: "-0.1 L/100km avg" },
  { id: "smooth_driving", label: "Smooth acceleration & braking", gain: -0.6, desc: "-0.6 L/100km avg" },
] as const;
