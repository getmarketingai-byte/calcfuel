import { describe, expect, it } from "vitest";
import {
  calculateBoatTrip,
  compareBoatScenarios,
  estimateBurnRateFromHp,
} from "./boatTrip";
import { calculateRoadTrip } from "./roadTrip";
import { calculateTowingTrip } from "./towingTrip";
import { calculateDriveVsFly } from "./driveVsFly";
import { calculateVehicleComparison } from "./vehicleComparison";
import { calculateFuelBudget } from "./fuelBudget";

describe("BoatTrip", () => {
  it("plans a one-way trip from burn rate", () => {
    const result = calculateBoatTrip({
      distanceNm: 40,
      speedKnots: 20,
      burnPerHour: 30,
      fuelPrice: 2.2,
      tankCapacity: 300,
      reserveFraction: 0.15,
    });
    expect(result).not.toBeNull();
    expect(result!.travelTimeHours).toBeCloseTo(2);
    expect(result!.fuelRequired).toBeCloseTo(60);
    expect(result!.fuelCost).toBeCloseTo(132);
    expect(result!.safeRangeNm).toBeCloseTo(170); // 255/30*20
  });

  it("doubles distance for return trips", () => {
    const result = calculateBoatTrip({
      distanceNm: 40,
      speedKnots: 20,
      burnPerHour: 30,
      fuelPrice: 2,
      tankCapacity: 300,
      returnTrip: true,
    });
    expect(result!.tripDistanceNm).toBe(80);
    expect(result!.fuelRequired).toBeCloseTo(120);
  });

  it("compares speed scenarios", () => {
    const base = {
      distanceNm: 40,
      burnPerHour: 25,
      fuelPrice: 2,
      tankCapacity: 300,
    };
    const cmp = compareBoatScenarios(
      { id: "slow", label: "15 kn", input: { ...base, speedKnots: 15, burnPerHour: 20 } },
      { id: "fast", label: "20 kn", input: { ...base, speedKnots: 20, burnPerHour: 35 } }
    );
    expect(cmp).not.toBeNull();
    expect(cmp!.cheaper).toBe("slow");
  });

  it("estimates HP burn as optional heuristic", () => {
    const gph = estimateBurnRateFromHp({ engineHp: 150, throttlePercent: 75 });
    expect(gph).toBeGreaterThan(0);
    const lph = estimateBurnRateFromHp({ engineHp: 150, throttlePercent: 75, metric: true });
    expect(lph).toBeGreaterThan(gph);
  });
});

describe("RoadTrip", () => {
  it("calculates imperial road trip", () => {
    const r = calculateRoadTrip({
      unit: "imperial",
      distance: 350,
      efficiency: 30,
      fuelPrice: 3.5,
    });
    expect(r!.fuelUsed).toBeCloseTo(350 / 30);
    expect(r!.totalCost).toBeCloseTo((350 / 30) * 3.5);
  });

  it("applies commute and carpool modes", () => {
    const commute = calculateRoadTrip({
      unit: "metric",
      distance: 25,
      efficiency: 8,
      fuelPrice: 1.8,
      mode: "commute",
      commuteDays: 5,
    });
    expect(commute!.effectiveDistance).toBe(250);

    const carpool = calculateRoadTrip({
      unit: "metric",
      distance: 100,
      efficiency: 8,
      fuelPrice: 2,
      mode: "carpool",
      passengers: 4,
    });
    expect(carpool!.costPerPerson).toBeCloseTo(carpool!.totalCost / 4);
  });
});

describe("TowingTrip", () => {
  it("adds extra fuel for towing penalty", () => {
    const r = calculateTowingTrip({
      unit: "metric",
      distance: 500,
      baseEfficiency: 10,
      fuelPrice: 2,
      penaltyPercent: 25,
    });
    expect(r!.normalFuel).toBeCloseTo(50);
    expect(r!.towingFuel).toBeCloseTo(62.5);
    expect(r!.extraCost).toBeCloseTo(25);
  });
});

describe("DriveVsFly", () => {
  it("picks cheaper option", () => {
    const r = calculateDriveVsFly({
      unit: "imperial",
      distance: 600,
      efficiency: 30,
      fuelPrice: 3.5,
      drivePassengers: 2,
      tolls: 40,
      wearRateCents: 10,
      hoursDriving: 10,
      timeValuePerHour: 20,
      flyPassengers: 2,
      ticketPricePerPerson: 180,
      airportParkingDays: 3,
      airportParkingRate: 30,
    });
    expect(r).not.toBeNull();
    expect(["drive", "fly", "tie"]).toContain(r!.cheaper);
    expect(r!.drive.fuel).toBeCloseTo((600 / 30) * 3.5);
    expect(r!.fly.tickets).toBe(360);
  });
});

describe("VehicleComparison", () => {
  it("computes break-even for hybrid vs gas", () => {
    const r = calculateVehicleComparison({
      unit: "metric",
      annualDistance: 15000,
      fuelPrice: 1.8,
      vehicleA: {
        id: "hybrid",
        label: "Hybrid",
        purchasePrice: 45000,
        efficiency: 4.5,
        annualOtherSavings: 300,
      },
      vehicleB: {
        id: "gas",
        label: "Petrol",
        purchasePrice: 35000,
        efficiency: 8.5,
      },
    });
    expect(r).not.toBeNull();
    expect(r!.annualFuelSavings).toBeGreaterThan(0);
    expect(r!.purchasePremium).toBe(10000);
    expect(r!.neverBreaksEven).toBe(false);
    expect(r!.breakEvenYears).toBeGreaterThan(0);
  });
});

describe("FuelBudget", () => {
  it("annualises monthly budget", () => {
    const r = calculateFuelBudget({
      unit: "metric",
      distancePerPeriod: 1200,
      efficiency: 8,
      fuelPrice: 1.8,
      period: "monthly",
    });
    expect(r!.periodCost).toBeCloseTo(172.8);
    expect(r!.annualCost).toBeCloseTo(172.8 * 12);
  });
});
