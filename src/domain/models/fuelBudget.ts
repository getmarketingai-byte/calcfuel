/**
 * FuelBudget — recurring fuel spend planner (monthly/weekly/annual).
 */

import type { UnitSystem } from "../units";
import { fuelCost, fuelUsed } from "../calculations/primitives";

export type BudgetPeriod = "weekly" | "monthly" | "annual";

export interface FuelBudgetInput {
  unit: UnitSystem;
  /** Distance per period. */
  distancePerPeriod: number;
  efficiency: number;
  fuelPrice: number;
  period: BudgetPeriod;
}

export interface FuelBudgetResult {
  period: BudgetPeriod;
  fuelUsed: number;
  periodCost: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
}

const TO_ANNUAL: Record<BudgetPeriod, number> = {
  weekly: 52,
  monthly: 12,
  annual: 1,
};

export function calculateFuelBudget(input: FuelBudgetInput): FuelBudgetResult | null {
  const { unit, distancePerPeriod, efficiency, fuelPrice, period } = input;
  if (distancePerPeriod <= 0 || efficiency <= 0 || fuelPrice < 0) return null;

  const used = fuelUsed(distancePerPeriod, efficiency, unit);
  const periodCost = fuelCost(used, fuelPrice);
  const annualCost = periodCost * TO_ANNUAL[period];

  return {
    period,
    fuelUsed: used,
    periodCost,
    weeklyCost: annualCost / 52,
    monthlyCost: annualCost / 12,
    annualCost,
  };
}
