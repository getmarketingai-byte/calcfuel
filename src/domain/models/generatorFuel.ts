/**
 * Generator fuel model fitted to published Australian specifications.
 *
 * Fuel use is not proportional to load: a generator burns a fixed amount just to keep the
 * engine turning, plus an amount per kWh delivered. Modelled as
 *   L/h = idle × rated kW + marginal × output kW
 * and fitted to the rated-load and ¼-load run times each source publishes.
 */
export type GeneratorFuel = "petrol" | "diesel";

export const GENERATOR_SOURCES = {
  honda: {
    name: "Honda Australia generator brochure (via Judds Engineering, Honda power equipment distributor)",
    url: "https://www.juddsengineering.com.au/download.php?file=32&type=pdf",
    note: "Tank capacity and continuous operating hours at rated and ¼ load, Eco-Throttle on.",
  },
  ablePower: {
    name: "Able Power, \"Diesel Generator Fuel Consumption Chart in Litres\"",
    url: "https://ablepower.com.au/blogs/diesel-generator-fuel-consumption-chart-in-litres/",
    note: "Approximate litres per hour at ¼, ½, ¾ and full load, 10 kVA to 500 kVA. Indicative only.",
  },
} as const;

/** Honda inverter generators as published for Australia. Rated output in kVA ≈ kW for resistive loads. */
export const HONDA_SPECS = [
  { model: "Honda EU10i", ratedKw: 0.9, tankL: 2.1, hoursRated: 3.0, hoursQuarter: 7 },
  { model: "Honda EU22i", ratedKw: 1.8, tankL: 3.6, hoursRated: 3.2, hoursQuarter: 7.5 },
  { model: "Honda EU32i", ratedKw: 2.6, tankL: 4.7, hoursRated: 3.3, hoursQuarter: 8.5 },
  { model: "Honda EU30is", ratedKw: 2.8, tankL: 13, hoursRated: 6.9, hoursQuarter: 17 },
  { model: "Honda EU70is", ratedKw: 5.5, tankL: 19.2, hoursRated: 6.2, hoursQuarter: 16 },
] as const;

/**
 * Coefficients fitted to the sources above.
 * Petrol: mean of the five Honda inverter fits (idle 0.10–0.19, marginal 0.45–0.59).
 * Diesel: Able Power 8–16 kW rows (0.3 L/kWh at full load).
 */
export const GENERATOR_COEFFS: Record<GeneratorFuel, { idle: number; marginal: number }> = {
  petrol: { idle: 0.135, marginal: 0.5 },
  diesel: { idle: 0.035, marginal: 0.265 },
};

export type HondaSpec = (typeof HONDA_SPECS)[number];

/** Exact two-point fit for one published model: passes through its rated and ¼-load figures. */
export function coeffsFromSpec(g: HondaSpec): { idle: number; marginal: number } {
  const lphRated = g.tankL / g.hoursRated;
  const lphQuarter = g.tankL / g.hoursQuarter;
  const marginal = (lphRated - lphQuarter) / (0.75 * g.ratedKw);
  const idle = (lphRated - marginal * g.ratedKw) / g.ratedKw;
  return { idle, marginal };
}

export function generatorLitresPerHour(
  ratedKw: number,
  loadFraction: number,
  fuel: GeneratorFuel,
  coeffs: { idle: number; marginal: number } = GENERATOR_COEFFS[fuel],
): number {
  return coeffs.idle * ratedKw + coeffs.marginal * ratedKw * loadFraction;
}

export interface GeneratorPlan {
  litresPerHour: number;
  litresPerKwh: number;
  runtimeHours: number | null;
  litresNeeded: number | null;
  cost: number | null;
}

export function planGenerator(input: {
  ratedKw: number;
  loadFraction: number;
  fuel: GeneratorFuel;
  fuelOnHandL?: number;
  hoursPerDay?: number;
  days?: number;
  pricePerL?: number;
  coeffs?: { idle: number; marginal: number };
}): GeneratorPlan {
  const litresPerHour = generatorLitresPerHour(input.ratedKw, input.loadFraction, input.fuel, input.coeffs);
  const litresPerKwh = litresPerHour / (input.ratedKw * input.loadFraction);
  const runtimeHours = input.fuelOnHandL && input.fuelOnHandL > 0 ? input.fuelOnHandL / litresPerHour : null;
  const hours = (input.hoursPerDay ?? 0) * (input.days ?? 0);
  const litresNeeded = hours > 0 ? litresPerHour * hours : null;
  const cost = litresNeeded !== null && input.pricePerL && input.pricePerL > 0 ? litresNeeded * input.pricePerL : null;
  return { litresPerHour, litresPerKwh, runtimeHours, litresNeeded, cost };
}
