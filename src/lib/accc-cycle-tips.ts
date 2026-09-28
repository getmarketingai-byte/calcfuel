/**
 * ACCC petrol buying tips for Australia’s five largest cities, mapped to a
 * CalcFuel cycle phase. Tips are transcribed by hand — never scraped, estimated
 * or invented. Phases are a mapping of ACCC language, not a cents forecast.
 *
 * Refresh procedure: docs/accc-cycle-tips-refresh.md
 */

import { daysSincePricesTo, parseIsoDateUtc } from "@/lib/fuel-price-cadence";

export const CYCLE_PHASES = [
  "climbing",
  "near peak",
  "falling",
  "near low",
  "plateau",
] as const;

export type CyclePhase = (typeof CYCLE_PHASES)[number];

export const CYCLE_CITIES = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Adelaide",
  "Perth",
] as const;

export type CycleCity = (typeof CYCLE_CITIES)[number];

export interface CityCycleTip {
  city: CycleCity;
  phase: CyclePhase;
  /** One-line tip aligned to the current ACCC buying tip. */
  tip: string;
  /** ISO date of the ACCC weekday the tip was last labelled with. */
  tipUpdated: string;
  sourceUrl: string;
  /** ACCC 2025 average cycle length, attributed. Optional context only. */
  cycleLengthNote: string;
}

export const ACCC_CYCLE_PAGE_URL =
  "https://www.accc.gov.au/consumers/petrol-and-fuel/petrol-price-cycles-in-the-5-largest-cities";

export const CYCLE_TIPS_SOURCE = {
  publisher: "ACCC",
  title: "Petrol price cycles in the 5 largest cities",
  url: ACCC_CYCLE_PAGE_URL,
  /** Weekday the ACCC page currently labels on each city’s buying tip. */
  weekdayLabel: "Friday",
  tipUpdated: "2026-09-25",
  tipUpdatedLabel: "25 September 2026",
  /** Calendar day this snapshot was transcribed from the live ACCC page. */
  transcribedOn: "2026-09-26",
} as const;

export const DEFAULT_CYCLE_TIPS_STALE_AFTER_DAYS = 7;
export const CYCLE_TIPS_STALE_AFTER_DAYS_ENV = "CYCLE_TIPS_STALE_AFTER_DAYS";
export const CYCLE_TIPS_ALLOW_STALE_ENV = "CYCLE_TIPS_ALLOW_STALE";

const SOURCE = ACCC_CYCLE_PAGE_URL;
const UPDATED = CYCLE_TIPS_SOURCE.tipUpdated;

/**
 * Current five-city tips, transcribed Sat 26 Sep 2026 from the ACCC cycle page
 * (“Buying tip (updated on Friday)”).
 *
 * Syd / Mel / Bri / Ade: “prices have increased” + shop-around language →
 * climbing. Do not invent a trough day. ACCC also notes that since late
 * February 2026, cycles have mostly not occurred in those four cities.
 *
 * Perth: “prices are decreasing and may decrease further” → falling.
 */
export const CITY_CYCLE_TIPS: readonly CityCycleTip[] = [
  {
    city: "Sydney",
    phase: "climbing",
    tip: "Prices have increased. Motorists looking to buy petrol can shop around for lower priced retailers.",
    tipUpdated: UPDATED,
    sourceUrl: SOURCE,
    cycleLengthNote: "Around 5 weeks on average in 2025 (ACCC).",
  },
  {
    city: "Melbourne",
    phase: "climbing",
    tip: "Prices have increased. If motorists shop around, they may find some retailers who have not yet increased prices.",
    tipUpdated: UPDATED,
    sourceUrl: SOURCE,
    cycleLengthNote: "Around 6 weeks on average in 2025 (ACCC).",
  },
  {
    city: "Brisbane",
    phase: "climbing",
    tip: "Prices have increased. Motorists looking to buy petrol can shop around for lower priced retailers.",
    tipUpdated: UPDATED,
    sourceUrl: SOURCE,
    cycleLengthNote: "Around 6 and a half weeks on average in 2025 (ACCC).",
  },
  {
    city: "Adelaide",
    phase: "climbing",
    tip: "Prices have increased. Motorists looking to buy petrol can shop around for lower priced retailers.",
    tipUpdated: UPDATED,
    sourceUrl: SOURCE,
    cycleLengthNote: "Around 2 and a half weeks on average in 2025 (ACCC).",
  },
  {
    city: "Perth",
    phase: "falling",
    tip: "Prices are decreasing and may decrease further. Motorists looking to buy petrol can shop around for the lowest prices.",
    tipUpdated: UPDATED,
    sourceUrl: SOURCE,
    cycleLengthNote: "Around 1 week on average in 2025 (ACCC).",
  },
];

export function oldestTipUpdated(
  tips: readonly CityCycleTip[] = CITY_CYCLE_TIPS,
): string {
  if (tips.length === 0) {
    throw new Error("CITY_CYCLE_TIPS must include the five largest cities");
  }
  return tips.reduce((oldest, tip) =>
    parseIsoDateUtc(tip.tipUpdated) < parseIsoDateUtc(oldest) ? tip.tipUpdated : oldest,
  tips[0].tipUpdated);
}

export function cycleTipsStaleAfterDaysFromEnv(
  env: Record<string, string | undefined> = process.env,
): number {
  const raw = env[CYCLE_TIPS_STALE_AFTER_DAYS_ENV];
  if (raw === undefined || raw === "") return DEFAULT_CYCLE_TIPS_STALE_AFTER_DAYS;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(
      `${CYCLE_TIPS_STALE_AFTER_DAYS_ENV} must be a positive integer, got ${JSON.stringify(raw)}`,
    );
  }
  return parsed;
}

export function allowCycleTipsStaleFromEnv(
  env: Record<string, string | undefined> = process.env,
): boolean {
  const raw = (env[CYCLE_TIPS_ALLOW_STALE_ENV] ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export function isCycleTipsStale(
  tips: readonly CityCycleTip[] = CITY_CYCLE_TIPS,
  options: { now?: Date; staleAfterDays?: number } = {},
): boolean {
  const limit = options.staleAfterDays ?? cycleTipsStaleAfterDaysFromEnv();
  return daysSincePricesTo(oldestTipUpdated(tips), options.now) >= limit;
}

export function daysSinceOldestTip(
  tips: readonly CityCycleTip[] = CITY_CYCLE_TIPS,
  now: Date = new Date(),
): number {
  return daysSincePricesTo(oldestTipUpdated(tips), now);
}

/** CalcFuel mapping of a phase — not an ACCC cents or day-of-week forecast. */
export function phaseDecisionLine(phase: CyclePhase): string {
  switch (phase) {
    case "climbing":
      return "Prices have risen. Shop around — do not wait for a trough day this tip does not name.";
    case "near peak":
      return "Prices are in the expensive part of the cycle. Shop around; this is not a cheap-day claim.";
    case "falling":
      return "Prices are coming down and may fall further. Shop around for the lowest pump.";
    case "near low":
      return "ACCC language puts prices near the low — a better time to fill, and still shop around.";
    case "plateau":
      return "Little movement, or cycles not occurring. Use a price app, not a calendar.";
  }
}

export function formatPhaseLabel(phase: CyclePhase): string {
  return phase;
}

export const DIESEL_CYCLE_FACT =
  "Retail diesel (and automotive LPG) prices do not move in petrol price cycles. The ACCC does not publish diesel buying tips or a diesel phase.";
