/**
 * Motorcycle trip cost — presets + RoadTrip primitives.
 */

import type { UnitSystem } from "../units";
import { calculateRoadTrip, type RoadTripResult } from "./roadTrip";

export const MOTORCYCLE_PRESETS = [
  { id: "scooter", label: "Small commuter / scooter (125–250cc)", l100: 3.5, mpg: 67 },
  { id: "naked", label: "Naked / standard (300–650cc)", l100: 5.0, mpg: 47 },
  { id: "sport", label: "Sport / supersport (600–1000cc)", l100: 6.5, mpg: 36 },
  { id: "adventure", label: "Adventure / dual-sport (650–1200cc)", l100: 6.0, mpg: 39 },
  { id: "cruiser", label: "Cruiser / touring (800–1800cc)", l100: 7.5, mpg: 31 },
  { id: "tourer", label: "Large tourer (1200cc+)", l100: 8.0, mpg: 29 },
] as const;

export type MotorcycleTripType = "single" | "commute";

export interface MotorcycleFuelInput {
  unit: UnitSystem;
  tripType: MotorcycleTripType;
  /** One-way distance. */
  distance: number;
  efficiency: number;
  fuelPrice: number;
  daysPerWeek?: number;
}

export interface MotorcycleFuelResult {
  trip: RoadTripResult;
  weekly?: number;
  monthly?: number;
  annual?: number;
}

export function calculateMotorcycleFuel(
  input: MotorcycleFuelInput
): MotorcycleFuelResult | null {
  const mode = input.tripType === "commute" ? "commute" : "road_trip";
  const trip = calculateRoadTrip({
    unit: input.unit,
    distance: input.distance,
    efficiency: input.efficiency,
    fuelPrice: input.fuelPrice,
    mode,
    commuteDays: input.daysPerWeek ?? 1,
  });
  if (!trip) return null;

  if (input.tripType !== "commute") {
    return { trip };
  }

  // commute mode already applies round-trip × days as effective distance / totalCost
  const weekly = trip.totalCost;
  return {
    trip,
    weekly,
    monthly: weekly * (52 / 12),
    annual: weekly * 52,
  };
}

export function motorcyclePresetEfficiency(
  presetIndex: number,
  unit: UnitSystem
): number {
  const preset = MOTORCYCLE_PRESETS[presetIndex] ?? MOTORCYCLE_PRESETS[1];
  return unit === "metric" ? preset.l100 : preset.mpg;
}
