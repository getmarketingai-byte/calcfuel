import { describe, expect, it } from "vitest";
import {
  applyTowingPenalty,
  compareTotals,
  costPerDistance,
  duration,
  fuelCost,
  fuelUsed,
  rangeFromBurnRate,
  rangeFromEfficiency,
  remainingFuel,
  reserveMargin,
  usableCapacity,
} from "./primitives";

describe("fuelUsed", () => {
  it("computes gallons from miles/MPG", () => {
    expect(fuelUsed(300, 30, "imperial")).toBeCloseTo(10);
  });

  it("computes litres from km and L/100km", () => {
    expect(fuelUsed(500, 8, "metric")).toBeCloseTo(40);
  });

  it("returns 0 for invalid inputs", () => {
    expect(fuelUsed(0, 30, "imperial")).toBe(0);
    expect(fuelUsed(100, 0, "metric")).toBe(0);
  });
});

describe("fuelCost / duration / costPerDistance", () => {
  it("multiplies volume × price", () => {
    expect(fuelCost(10, 1.8)).toBeCloseTo(18);
  });

  it("computes hours from distance/speed", () => {
    expect(duration(40, 20)).toBeCloseTo(2);
  });

  it("computes cost per distance", () => {
    expect(costPerDistance(50, 100)).toBeCloseTo(0.5);
  });
});

describe("range and reserve", () => {
  it("rangeFromBurnRate uses usable capacity", () => {
    // 255 L usable / 25 L/h * 20 kn = 204 NM
    expect(rangeFromBurnRate(255, 25, 20)).toBeCloseTo(204);
  });

  it("rangeFromEfficiency metric and imperial", () => {
    expect(rangeFromEfficiency(50, 10, "metric")).toBeCloseTo(500);
    expect(rangeFromEfficiency(15, 30, "imperial")).toBeCloseTo(450);
  });

  it("usableCapacity applies reserve fraction", () => {
    expect(usableCapacity(300, 0.15)).toBeCloseTo(255);
  });

  it("remainingFuel never goes negative", () => {
    expect(remainingFuel(100, 120)).toBe(0);
    expect(remainingFuel(100, 40)).toBe(60);
  });

  it("reserveMargin is negative when dipping into reserve", () => {
    // tank 100, reserve 15, consume 90 → remaining 10, margin -5
    expect(reserveMargin(100, 90, 0.15)).toBeCloseTo(-5);
  });
});

describe("towing penalty", () => {
  it("worsens L/100km and MPG correctly", () => {
    expect(applyTowingPenalty(10, 25, "metric")).toBeCloseTo(12.5);
    expect(applyTowingPenalty(30, 50, "imperial")).toBeCloseTo(20);
  });
});

describe("compareTotals", () => {
  it("picks cheaper within epsilon", () => {
    expect(compareTotals({ id: "a", total: 100 }, { id: "b", total: 120 })).toEqual({
      cheaper: "a",
      savings: 20,
    });
    expect(compareTotals({ id: "a", total: 100 }, { id: "b", total: 100.5 }).cheaper).toBe("tie");
  });
});
