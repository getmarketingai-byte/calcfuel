/**
 * Idling fuel waste — burn rate × idle time.
 */

import { fuelCost } from "../calculations/primitives";

export interface IdlingInput {
  dailyMinutes: number;
  /** L/h or gal/h depending on caller unit labelling. */
  burnPerHour: number;
  fuelPrice: number;
  vehicles?: number;
  workingDaysPerYear?: number;
  /** kg CO2 per litre or per gallon (optional; default petrol approx). */
  co2PerFuelUnit?: number;
}

export interface IdlingResult {
  dailyFuel: number;
  weeklyFuel: number;
  monthlyFuel: number;
  annualFuel: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
  fleetAnnualCost: number;
  co2PerYear: number;
}

export function calculateIdlingWaste(input: IdlingInput): IdlingResult | null {
  const {
    dailyMinutes,
    burnPerHour,
    fuelPrice,
    vehicles = 1,
    workingDaysPerYear = 250,
    co2PerFuelUnit = 2.31,
  } = input;

  if (dailyMinutes < 0 || burnPerHour <= 0 || fuelPrice < 0 || vehicles <= 0 || workingDaysPerYear <= 0) {
    return null;
  }

  const dailyFuel = (dailyMinutes / 60) * burnPerHour;
  const weeklyFuel = dailyFuel * 5;
  const annualFuel = dailyFuel * workingDaysPerYear;
  const monthlyFuel = annualFuel / 12;

  const dailyCost = fuelCost(dailyFuel, fuelPrice);
  const weeklyCost = fuelCost(weeklyFuel, fuelPrice);
  const monthlyCost = fuelCost(monthlyFuel, fuelPrice);
  const annualCost = fuelCost(annualFuel, fuelPrice);

  return {
    dailyFuel,
    weeklyFuel,
    monthlyFuel,
    annualFuel,
    dailyCost,
    weeklyCost,
    monthlyCost,
    annualCost,
    fleetAnnualCost: annualCost * vehicles,
    co2PerYear: annualFuel * co2PerFuelUnit * vehicles,
  };
}
