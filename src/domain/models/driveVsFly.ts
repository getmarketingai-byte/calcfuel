/**
 * DriveVsFly decision model — total trip cost comparison.
 */

import type { UnitSystem } from "../units";
import { compareTotals, fuelCost, fuelUsed } from "../calculations/primitives";

export interface DriveVsFlyInput {
  unit: UnitSystem;
  distance: number;
  efficiency: number;
  fuelPrice: number;
  drivePassengers: number;
  tolls?: number;
  destinationParking?: number;
  /** Currency per hour of driving time. */
  timeValuePerHour?: number;
  hoursDriving?: number;
  /**
   * Wear rate: cents per mile (imperial) or cents per km (metric).
   * Converted to currency units (/100).
   */
  wearRateCents?: number;
  flyPassengers: number;
  ticketPricePerPerson: number;
  airportParkingDays?: number;
  airportParkingRate?: number;
  rentalCarDays?: number;
  rentalCarRate?: number;
}

export interface DriveLeg {
  fuel: number;
  tolls: number;
  parking: number;
  wear: number;
  timeValue: number;
  total: number;
  perPerson: number;
}

export interface FlyLeg {
  tickets: number;
  airportParking: number;
  rentalCar: number;
  total: number;
  perPerson: number;
}

export interface DriveVsFlyResult {
  drive: DriveLeg;
  fly: FlyLeg;
  cheaper: "drive" | "fly" | "tie";
  savings: number;
}

export function calculateDriveVsFly(input: DriveVsFlyInput): DriveVsFlyResult | null {
  const {
    unit,
    distance,
    efficiency,
    fuelPrice,
    drivePassengers,
    tolls = 0,
    destinationParking = 0,
    timeValuePerHour = 0,
    hoursDriving = 0,
    wearRateCents = 0,
    flyPassengers,
    ticketPricePerPerson,
    airportParkingDays = 0,
    airportParkingRate = 0,
    rentalCarDays = 0,
    rentalCarRate = 0,
  } = input;

  if (
    distance <= 0 ||
    efficiency <= 0 ||
    fuelPrice < 0 ||
    ticketPricePerPerson < 0 ||
    drivePassengers < 1 ||
    flyPassengers < 1
  ) {
    return null;
  }

  const fuelVolume = fuelUsed(distance, efficiency, unit);
  const fuel = fuelCost(fuelVolume, fuelPrice);
  const wear = distance * (wearRateCents / 100);
  const timeValue = timeValuePerHour * hoursDriving;
  const driveTotal = fuel + tolls + destinationParking + wear + timeValue;

  const tickets = flyPassengers * ticketPricePerPerson;
  const airportParking = airportParkingDays * airportParkingRate;
  const rentalCar = rentalCarDays * rentalCarRate;
  const flyTotal = tickets + airportParking + rentalCar;

  const { cheaper, savings } = compareTotals(
    { id: "drive", total: driveTotal },
    { id: "fly", total: flyTotal }
  );

  return {
    drive: {
      fuel,
      tolls,
      parking: destinationParking,
      wear,
      timeValue,
      total: driveTotal,
      perPerson: driveTotal / drivePassengers,
    },
    fly: {
      tickets,
      airportParking,
      rentalCar,
      total: flyTotal,
      perPerson: flyTotal / flyPassengers,
    },
    cheaper: cheaper as "drive" | "fly" | "tie",
    savings,
  };
}
