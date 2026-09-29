import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { calculateRoadTrip } from "@/domain/models/roadTrip";
import {
  ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT,
  ESTIMATE_FUEL_COST_TOOL_NAME,
  estimateFuelCost,
  type EstimateFuelCostResult,
} from "./estimateFuelCostTool";

const PAGE = readFileSync(
  resolve(process.cwd(), "src/app/calculators/trip-fuel-cost-calculator/page.tsx"),
  "utf8",
);
const CALC = readFileSync(
  resolve(process.cwd(), "src/app/calculators/trip-fuel-cost-calculator/TripFuelCalc.tsx"),
  "utf8",
);

describe("estimateFuelCost", () => {
  it("matches the page's metric road-trip example", () => {
    const viaTool = estimateFuelCost({ distance: 600, efficiency: 8, price: 1.85 });
    const viaProduct = calculateRoadTrip({
      unit: "metric",
      distance: 600,
      efficiency: 8,
      fuelPrice: 1.85,
      mode: "road_trip",
    });
    expect(viaProduct).not.toBeNull();
    expect(viaTool).toEqual({
      cost: Number(viaProduct!.totalCost.toFixed(2)),
      fuelUsed: Number(viaProduct!.fuelUsed.toFixed(2)),
      unit: "metric",
      distanceUnit: "km",
      efficiencyUnit: "L/100km",
      priceUnit: "per litre",
    });
    expect(viaTool).toMatchObject({ cost: 88.8, fuelUsed: 48 });
  });

  it("matches imperial road-trip maths and does not double the distance", () => {
    const viaTool = estimateFuelCost({
      distance: 350,
      efficiency: 30,
      price: 3.5,
      unit: "imperial",
    });
    const viaProduct = calculateRoadTrip({
      unit: "imperial",
      distance: 350,
      efficiency: 30,
      fuelPrice: 3.5,
      mode: "road_trip",
    });
    expect(viaTool).toMatchObject({
      cost: Number(viaProduct!.totalCost.toFixed(2)),
      fuelUsed: Number(viaProduct!.fuelUsed.toFixed(2)),
      unit: "imperial",
      distanceUnit: "miles",
      efficiencyUnit: "MPG",
      priceUnit: "per gallon",
    });
    expect(viaProduct!.effectiveDistance).toBe(350);
  });

  it("defaults an omitted unit to metric", () => {
    const metric = estimateFuelCost({ distance: 100, efficiency: 8, price: 2 });
    const explicit = estimateFuelCost({
      distance: 100,
      efficiency: 8,
      price: 2,
      unit: "metric",
    });
    expect(metric).toEqual(explicit);
  });

  it("rejects inputs the product calculator cannot price", () => {
    expect(estimateFuelCost(null)).toEqual({
      error: "Input must be an object with distance, efficiency, and price.",
    });
    expect(estimateFuelCost({ distance: 0, efficiency: 8, price: 1.8 })).toMatchObject({
      error: expect.stringContaining("Distance"),
    });
    expect(estimateFuelCost({ distance: 10, efficiency: -1, price: 1.8 })).toMatchObject({
      error: expect.stringContaining("Efficiency"),
    });
    expect(estimateFuelCost({ distance: 10, efficiency: 8, price: -0.1 })).toMatchObject({
      error: expect.stringContaining("Price"),
    });
    expect(estimateFuelCost({ distance: "600", efficiency: 8, price: 1.85 })).toMatchObject({
      error: expect.stringContaining("Distance"),
    });
    expect(
      estimateFuelCost({ distance: 10, efficiency: 8, price: 1.8, unit: "nautical" }),
    ).toEqual({ error: "Unit must be metric or imperial." });
  });

  it("allows a zero price without inventing a cost", () => {
    expect(estimateFuelCost({ distance: 100, efficiency: 10, price: 0 })).toMatchObject({
      cost: 0,
      fuelUsed: 10,
    });
  });
});

describe("WebMCP registration", () => {
  it("ships one read-only tool marker on the trip fuel page", () => {
    expect(ESTIMATE_FUEL_COST_TOOL_NAME).toBe("estimate-fuel-cost");
    expect(ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT).toContain("document.modelContext.registerTool");
    expect(ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT).toContain('"estimate-fuel-cost"');
    expect(ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT).toContain(
      "readOnlyHint: true, consequentialHint: false, untrustedContentHint: false",
    );
    expect(ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT).not.toContain("toolautosubmit");
    expect(PAGE).toContain("ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT");
    expect(PAGE).toContain('id="estimate-fuel-cost-webmcp"');
    expect(CALC).toContain("mountEstimateFuelCostTool");
    expect(CALC.match(/mountEstimateFuelCostTool/g)).toHaveLength(2);
  });

  it("registers once and returns the product cost when the page function is published", () => {
    const tools: Array<{
      name: string;
      description: string;
      annotations: { readOnlyHint: boolean; consequentialHint: boolean };
      inputSchema: { required: string[] };
      execute: (input: unknown) => EstimateFuelCostResult;
    }> = [];
    const sandbox: Record<string, unknown> = {
      AbortController,
      Promise,
      document: {
        modelContext: {
          registerTool(tool: (typeof tools)[number]) {
            tools.push(tool);
            return Promise.resolve();
          },
        },
      },
    };
    sandbox.window = sandbox;

    runInNewContext(ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT, sandbox);
    expect(tools).toHaveLength(0);

    sandbox.__calcfuelEstimateFuelCost = estimateFuelCost;
    (sandbox.__calcfuelRegisterEstimateFuelCostTool as () => void)();
    (sandbox.__calcfuelRegisterEstimateFuelCostTool as () => void)();

    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("estimate-fuel-cost");
    expect(tools[0].annotations).toEqual({
      readOnlyHint: true,
      consequentialHint: false,
      untrustedContentHint: false,
    });
    expect(tools[0].inputSchema.required).toEqual(["distance", "efficiency", "price"]);
    expect(tools[0].description).not.toMatch(/rank|citation|agent traffic/i);
    expect(tools[0].execute({ distance: 600, efficiency: 8, price: 1.85 })).toMatchObject({
      cost: 88.8,
      fuelUsed: 48,
    });

    (sandbox.__calcfuelAbortEstimateFuelCostTool as () => void)();
    expect(sandbox.__calcfuelEstimateFuelCostRegistered).toBe(false);
  });

  it("does not throw when the browser has no model context", () => {
    const sandbox: Record<string, unknown> = {
      AbortController,
      Promise,
      document: {},
    };
    sandbox.window = sandbox;
    expect(() => runInNewContext(ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT, sandbox)).not.toThrow();
    sandbox.__calcfuelEstimateFuelCost = estimateFuelCost;
    expect(() =>
      (sandbox.__calcfuelRegisterEstimateFuelCostTool as () => void)(),
    ).not.toThrow();
    expect(sandbox.__calcfuelEstimateFuelCostRegistered).toBeUndefined();
  });
});
