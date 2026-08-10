/**
 * VehicleComparison decision model — Hybrid/EV vs petrol foundation.
 * Feeds future Vehicle Running Cost Calculator.
 */

import type { UnitSystem } from "../units";
import { fuelCost, fuelUsed } from "../calculations/primitives";

export interface VehicleOption {
  id: string;
  label: string;
  /** Purchase price (optional for fuel-only comparisons). */
  purchasePrice?: number;
  /** MPG or L/100km. */
  efficiency: number;
  /** Extra annual non-fuel savings vs baseline (e.g. maintenance). */
  annualOtherSavings?: number;
}

export interface VehicleComparisonInput {
  unit: UnitSystem;
  annualDistance: number;
  fuelPrice: number;
  /** Vehicle A is typically the more efficient option (hybrid/EV proxy). */
  vehicleA: VehicleOption;
  /** Vehicle B is typically petrol/ICE baseline. */
  vehicleB: VehicleOption;
}

export interface VehicleAnnualCosts {
  id: string;
  label: string;
  annualFuelVolume: number;
  annualFuelCost: number;
  purchasePrice: number;
}

export interface VehicleComparisonResult {
  vehicleA: VehicleAnnualCosts;
  vehicleB: VehicleAnnualCosts;
  annualFuelSavings: number;
  annualTotalSavings: number;
  purchasePremium: number;
  breakEvenMonths: number | null;
  breakEvenYears: number | null;
  neverBreaksEven: boolean;
  savings5yr: number;
  savings10yr: number;
}

function annualFor(
  option: VehicleOption,
  annualDistance: number,
  fuelPrice: number,
  unit: UnitSystem
): VehicleAnnualCosts {
  const volume = fuelUsed(annualDistance, option.efficiency, unit);
  return {
    id: option.id,
    label: option.label,
    annualFuelVolume: volume,
    annualFuelCost: fuelCost(volume, fuelPrice),
    purchasePrice: option.purchasePrice ?? 0,
  };
}

export function calculateVehicleComparison(
  input: VehicleComparisonInput
): VehicleComparisonResult | null {
  const { unit, annualDistance, fuelPrice, vehicleA, vehicleB } = input;

  if (
    annualDistance <= 0 ||
    fuelPrice < 0 ||
    vehicleA.efficiency <= 0 ||
    vehicleB.efficiency <= 0
  ) {
    return null;
  }

  const a = annualFor(vehicleA, annualDistance, fuelPrice, unit);
  const b = annualFor(vehicleB, annualDistance, fuelPrice, unit);

  const other = (vehicleA.annualOtherSavings ?? 0) - (vehicleB.annualOtherSavings ?? 0);
  const annualFuelSavings = b.annualFuelCost - a.annualFuelCost;
  const annualTotalSavings = annualFuelSavings + other;
  const purchasePremium = a.purchasePrice - b.purchasePrice;

  let breakEvenMonths: number | null = null;
  let breakEvenYears: number | null = null;
  let neverBreaksEven = false;

  if (purchasePremium <= 0) {
    breakEvenMonths = 0;
    breakEvenYears = 0;
  } else if (annualTotalSavings <= 0) {
    neverBreaksEven = true;
  } else {
    breakEvenYears = purchasePremium / annualTotalSavings;
    breakEvenMonths = breakEvenYears * 12;
  }

  return {
    vehicleA: a,
    vehicleB: b,
    annualFuelSavings,
    annualTotalSavings,
    purchasePremium,
    breakEvenMonths,
    breakEvenYears,
    neverBreaksEven,
    savings5yr: annualTotalSavings * 5 - Math.max(0, purchasePremium),
    savings10yr: annualTotalSavings * 10 - Math.max(0, purchasePremium),
  };
}
