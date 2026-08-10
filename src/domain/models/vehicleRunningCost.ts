/**
 * Vehicle Running Cost — foundation for Hybrid/EV vs petrol decisions.
 * Supports ICE fuel economy and EV energy (mi/kWh or kWh/100km).
 */

import type { UnitSystem } from "../units";
import { fuelCost, fuelUsed } from "../calculations/primitives";
import {
  calculateVehicleComparison,
  type VehicleComparisonResult,
} from "./vehicleComparison";

export type EnergyKind = "fuel" | "electric";

export interface RunningCostVehicle {
  id: string;
  label: string;
  kind: EnergyKind;
  purchasePrice: number;
  /**
   * Fuel: MPG or L/100km.
   * Electric imperial: miles per kWh.
   * Electric metric: kWh/100km.
   */
  efficiency: number;
  /** $/gal, $/L, or $/kWh depending on kind. */
  energyPrice: number;
  annualMaintenance?: number;
  annualInsurance?: number;
}

export interface VehicleRunningCostInput {
  unit: UnitSystem;
  annualDistance: number;
  vehicleA: RunningCostVehicle;
  vehicleB: RunningCostVehicle;
  /** Horizon years for TCO (default 5). */
  years?: number;
}

export interface VehicleSideCosts {
  id: string;
  label: string;
  kind: EnergyKind;
  annualEnergyCost: number;
  annualOpsCost: number;
  purchasePrice: number;
  totalCostOverHorizon: number;
}

export interface VehicleRunningCostResult {
  vehicleA: VehicleSideCosts;
  vehicleB: VehicleSideCosts;
  years: number;
  annualOpsSavings: number;
  purchasePremium: number;
  horizonSavings: number;
  breakEvenYears: number | null;
  neverBreaksEven: boolean;
  /** Fuel-vs-fuel subset when both are fuel (Hybrid path). */
  fuelComparison: VehicleComparisonResult | null;
}

export function annualEnergyCost(
  unit: UnitSystem,
  annualDistance: number,
  vehicle: Pick<RunningCostVehicle, "kind" | "efficiency" | "energyPrice">
): number {
  if (annualDistance <= 0 || vehicle.efficiency <= 0 || vehicle.energyPrice < 0) return 0;

  if (vehicle.kind === "fuel") {
    return fuelCost(fuelUsed(annualDistance, vehicle.efficiency, unit), vehicle.energyPrice);
  }

  // Electric
  if (unit === "imperial") {
    // efficiency = miles per kWh
    return (annualDistance / vehicle.efficiency) * vehicle.energyPrice;
  }
  // efficiency = kWh/100km
  return (vehicle.efficiency / 100) * annualDistance * vehicle.energyPrice;
}

function sideCosts(
  unit: UnitSystem,
  annualDistance: number,
  vehicle: RunningCostVehicle,
  years: number
): VehicleSideCosts {
  const energy = annualEnergyCost(unit, annualDistance, vehicle);
  const ops = energy + (vehicle.annualMaintenance ?? 0) + (vehicle.annualInsurance ?? 0);
  return {
    id: vehicle.id,
    label: vehicle.label,
    kind: vehicle.kind,
    annualEnergyCost: energy,
    annualOpsCost: ops,
    purchasePrice: vehicle.purchasePrice,
    totalCostOverHorizon: vehicle.purchasePrice + ops * years,
  };
}

export function calculateVehicleRunningCost(
  input: VehicleRunningCostInput
): VehicleRunningCostResult | null {
  const { unit, annualDistance, vehicleA, vehicleB } = input;
  const years = input.years && input.years > 0 ? input.years : 5;

  if (annualDistance <= 0) return null;
  if (vehicleA.efficiency <= 0 || vehicleB.efficiency <= 0) return null;

  const a = sideCosts(unit, annualDistance, vehicleA, years);
  const b = sideCosts(unit, annualDistance, vehicleB, years);

  const annualOpsSavings = b.annualOpsCost - a.annualOpsCost;
  const purchasePremium = a.purchasePrice - b.purchasePrice;
  const horizonSavings = b.totalCostOverHorizon - a.totalCostOverHorizon;

  let breakEvenYears: number | null = null;
  let neverBreaksEven = false;

  if (purchasePremium <= 0) {
    breakEvenYears = 0;
  } else if (annualOpsSavings <= 0) {
    neverBreaksEven = true;
  } else {
    breakEvenYears = purchasePremium / annualOpsSavings;
    if (breakEvenYears > 30) {
      neverBreaksEven = true;
      breakEvenYears = null;
    }
  }

  let fuelComparison: VehicleComparisonResult | null = null;
  if (vehicleA.kind === "fuel" && vehicleB.kind === "fuel") {
    // Shared fuel price assumed when both ICE; Hybrid UI passes same price for both.
    const fuelPrice =
      vehicleA.energyPrice > 0 ? vehicleA.energyPrice : vehicleB.energyPrice;
    const maintDelta =
      (vehicleB.annualMaintenance ?? 0) - (vehicleA.annualMaintenance ?? 0);
    fuelComparison = calculateVehicleComparison({
      unit,
      annualDistance,
      fuelPrice,
      vehicleA: {
        id: vehicleA.id,
        label: vehicleA.label,
        purchasePrice: vehicleA.purchasePrice,
        efficiency: vehicleA.efficiency,
        annualOtherSavings: maintDelta,
      },
      vehicleB: {
        id: vehicleB.id,
        label: vehicleB.label,
        purchasePrice: vehicleB.purchasePrice,
        efficiency: vehicleB.efficiency,
      },
    });
  }

  return {
    vehicleA: a,
    vehicleB: b,
    years,
    annualOpsSavings,
    purchasePremium,
    horizonSavings,
    breakEvenYears,
    neverBreaksEven,
    fuelComparison,
  };
}
