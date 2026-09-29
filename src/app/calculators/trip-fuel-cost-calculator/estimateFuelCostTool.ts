/**
 * Read-only WebMCP tool for the trip fuel cost page.
 * The estimate reuses calculateRoadTrip (one-way road-trip mode) so agents
 * get the same cost the page shows, without a second formula.
 */

import { calculateRoadTrip } from "@/domain/models/roadTrip";
import type { UnitSystem } from "@/domain/units";

export const ESTIMATE_FUEL_COST_TOOL_NAME = "estimate-fuel-cost";

export const ESTIMATE_FUEL_COST_TOOL_DESCRIPTION =
  "Estimates one-way trip fuel cost from distance, efficiency, and fuel price using this page's road-trip formula. Metric (default): litres = (L/100km ÷ 100) × kilometres, and cost = litres × price per litre. Imperial: gallons = miles ÷ MPG, and cost = gallons × price per gallon. Return, commute, and carpool multipliers are not applied. The cost uses the same currency as the price you supply. This does not look up pump prices or forecast future prices.";

export const ESTIMATE_FUEL_COST_INPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    distance: {
      type: "number",
      exclusiveMinimum: 0,
      description:
        "One-way trip distance. Kilometres when unit is metric (the default); miles when unit is imperial.",
    },
    efficiency: {
      type: "number",
      exclusiveMinimum: 0,
      description:
        "Fuel efficiency. Litres per 100 km when unit is metric; miles per gallon when unit is imperial.",
    },
    price: {
      type: "number",
      minimum: 0,
      description:
        "Fuel price per litre when unit is metric, or per gallon when unit is imperial. Cost is in the same currency as this price.",
    },
    unit: {
      type: "string",
      enum: ["metric", "imperial"],
      description:
        "Unit system for distance, efficiency, and price. Omit to use metric (km, L/100km, price per litre).",
    },
  },
  required: ["distance", "efficiency", "price"],
} as const;

export interface EstimateFuelCostSuccess {
  cost: number;
  fuelUsed: number;
  unit: UnitSystem;
  distanceUnit: "km" | "miles";
  efficiencyUnit: "L/100km" | "MPG";
  priceUnit: "per litre" | "per gallon";
}

export interface EstimateFuelCostError {
  error: string;
}

export type EstimateFuelCostResult = EstimateFuelCostSuccess | EstimateFuelCostError;

interface ModelContextLike {
  registerTool: (
    tool: {
      name: string;
      description: string;
      inputSchema: typeof ESTIMATE_FUEL_COST_INPUT_SCHEMA;
      annotations: {
        readOnlyHint: true;
        consequentialHint: false;
        untrustedContentHint: false;
      };
      execute: (input: unknown) => EstimateFuelCostResult;
    },
    options?: { signal?: AbortSignal },
  ) => Promise<unknown> | unknown;
}

declare global {
  interface Document {
    modelContext?: ModelContextLike;
  }

  interface Window {
    __calcfuelEstimateFuelCost?: (input: unknown) => EstimateFuelCostResult;
    __calcfuelEstimateFuelCostRegistered?: boolean;
    __calcfuelAbortEstimateFuelCostTool?: () => void;
    __calcfuelRegisterEstimateFuelCostTool?: () => void;
  }
}

function roundDisplayed(value: number): number {
  return Number(value.toFixed(2));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readFiniteNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

/**
 * One-way fuel cost. Invalid input returns an error object and does not throw.
 * No network, storage, or page-state writes.
 */
export function estimateFuelCost(input: unknown): EstimateFuelCostResult {
  if (!isRecord(input)) {
    return { error: "Input must be an object with distance, efficiency, and price." };
  }

  const distance = readFiniteNumber(input.distance);
  const efficiency = readFiniteNumber(input.efficiency);
  const price = readFiniteNumber(input.price);

  if (distance === null || distance <= 0) {
    return { error: "Distance must be a finite number greater than zero." };
  }
  if (efficiency === null || efficiency <= 0) {
    return { error: "Efficiency must be a finite number greater than zero." };
  }
  if (price === null || price < 0) {
    return { error: "Price must be a finite number greater than or equal to zero." };
  }

  let unit: UnitSystem = "metric";
  if (input.unit !== undefined) {
    if (input.unit !== "metric" && input.unit !== "imperial") {
      return { error: "Unit must be metric or imperial." };
    }
    unit = input.unit;
  }

  const result = calculateRoadTrip({
    unit,
    distance,
    efficiency,
    fuelPrice: price,
    mode: "road_trip",
  });

  if (!result) {
    return { error: "Fuel cost could not be calculated from these inputs." };
  }

  return {
    cost: roundDisplayed(result.totalCost),
    fuelUsed: roundDisplayed(result.fuelUsed),
    unit,
    distanceUnit: unit === "imperial" ? "miles" : "km",
    efficiencyUnit: unit === "imperial" ? "MPG" : "L/100km",
    priceUnit: unit === "imperial" ? "per gallon" : "per litre",
  };
}

/**
 * Page-source bootstrap. Registers the tool only after the calculator bundle
 * has published estimateFuelCost, and only when document.modelContext exists.
 * Leaving the page aborts the signal so the tool is not offered elsewhere.
 */
export const ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT = `(function () {
  function register() {
    if (window.__calcfuelEstimateFuelCostRegistered) return;
    if (typeof window.__calcfuelEstimateFuelCost !== "function") return;
    var modelContext = document.modelContext;
    if (!modelContext || typeof modelContext.registerTool !== "function") return;
    var controller = new AbortController();
    window.__calcfuelEstimateFuelCostRegistered = true;
    window.__calcfuelAbortEstimateFuelCostTool = function () {
      controller.abort();
      window.__calcfuelEstimateFuelCostRegistered = false;
      window.__calcfuelAbortEstimateFuelCostTool = undefined;
    };
    try {
      var pending = document.modelContext.registerTool({
        name: ${JSON.stringify(ESTIMATE_FUEL_COST_TOOL_NAME)},
        description: ${JSON.stringify(ESTIMATE_FUEL_COST_TOOL_DESCRIPTION)},
        inputSchema: ${JSON.stringify(ESTIMATE_FUEL_COST_INPUT_SCHEMA)},
        annotations: { readOnlyHint: true, consequentialHint: false, untrustedContentHint: false },
        execute: function (input) {
          var estimate = window.__calcfuelEstimateFuelCost;
          if (typeof estimate !== "function") {
            return { error: "Fuel cost estimator is not available on this page." };
          }
          return estimate(input);
        }
      }, { signal: controller.signal });
      if (pending && typeof pending.catch === "function") {
        pending.catch(function () {
          if (typeof window.__calcfuelAbortEstimateFuelCostTool === "function") {
            window.__calcfuelAbortEstimateFuelCostTool();
          }
        });
      }
    } catch (err) {
      if (typeof window.__calcfuelAbortEstimateFuelCostTool === "function") {
        window.__calcfuelAbortEstimateFuelCostTool();
      }
    }
  }
  register();
  window.__calcfuelRegisterEstimateFuelCostTool = register;
})();`;

/** Publish the product function and register the tool once for this page visit. */
export function mountEstimateFuelCostTool(): () => void {
  window.__calcfuelEstimateFuelCost = estimateFuelCost;

  if (typeof window.__calcfuelRegisterEstimateFuelCostTool === "function") {
    window.__calcfuelRegisterEstimateFuelCostTool();
  }

  if (!window.__calcfuelEstimateFuelCostRegistered) {
    const script = document.createElement("script");
    script.text = ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT;
    document.documentElement.appendChild(script);
    script.remove();
  }

  return () => {
    delete window.__calcfuelEstimateFuelCost;
    if (typeof window.__calcfuelAbortEstimateFuelCostTool === "function") {
      window.__calcfuelAbortEstimateFuelCostTool();
    }
    delete window.__calcfuelRegisterEstimateFuelCostTool;
  };
}
