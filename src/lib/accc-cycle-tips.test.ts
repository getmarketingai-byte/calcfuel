import { describe, expect, it } from "vitest";
import {
  ACCC_CYCLE_PAGE_URL,
  CITY_CYCLE_TIPS,
  CYCLE_CITIES,
  CYCLE_PHASES,
  CYCLE_TIPS_SOURCE,
  DEFAULT_CYCLE_TIPS_STALE_AFTER_DAYS,
  DIESEL_CYCLE_FACT,
  allowCycleTipsStaleFromEnv,
  cycleTipsStaleAfterDaysFromEnv,
  daysSinceOldestTip,
  isCycleTipsStale,
  oldestTipUpdated,
  phaseDecisionLine,
} from "./accc-cycle-tips";
import { parseIsoDateUtc } from "./fuel-price-cadence";

describe("ACCC cycle tip snapshot", () => {
  it("covers the five largest cities once each, with a valid phase and citation", () => {
    expect(CITY_CYCLE_TIPS.map((t) => t.city)).toEqual([...CYCLE_CITIES]);
    for (const tip of CITY_CYCLE_TIPS) {
      expect(CYCLE_PHASES).toContain(tip.phase);
      expect(tip.tip.length).toBeGreaterThan(20);
      expect(tip.sourceUrl).toBe(ACCC_CYCLE_PAGE_URL);
      expect(tip.tipUpdated).toBe(CYCLE_TIPS_SOURCE.tipUpdated);
      expect(parseIsoDateUtc(tip.tipUpdated)).toBe(Date.UTC(2026, 10, 18));
    }
  });

  it("maps the Wednesday 18 Nov 2026 transcription without inventing a trough day", () => {
    expect(CYCLE_TIPS_SOURCE.weekdayLabel).toBe("Wednesday");
    expect(CYCLE_TIPS_SOURCE.tipUpdatedLabel).toBe("18 November 2026");
    expect(CYCLE_TIPS_SOURCE.transcribedOn).toBe("2026-11-18");
    const byCity = Object.fromEntries(CITY_CYCLE_TIPS.map((t) => [t.city, t]));
    expect(byCity.Sydney.phase).toBe("falling");
    expect(byCity.Melbourne.phase).toBe("falling");
    expect(byCity.Brisbane.phase).toBe("falling");
    expect(byCity.Adelaide.phase).toBe("falling");
    expect(byCity.Perth.phase).toBe("near peak");
    expect(byCity.Sydney.tip.toLowerCase()).toContain("decreased");
    expect(byCity.Melbourne.tip.toLowerCase()).toContain("shop around");
    expect(byCity.Perth.tip.toLowerCase()).toContain("high point");
    for (const tip of CITY_CYCLE_TIPS) {
      expect(tip.tip.toLowerCase()).not.toMatch(/tuesday|wednesday|buy today/);
      expect(tip.tip).not.toMatch(/\$\d/);
    }
  });

  it("states diesel has no phase", () => {
    expect(DIESEL_CYCLE_FACT.toLowerCase()).toContain("do not move in petrol price cycles");
    expect(DIESEL_CYCLE_FACT.toLowerCase()).not.toMatch(/climbing|falling|near peak|near low|plateau/);
  });
});

describe("cycle tip freshness", () => {
  it("defaults to a 7-day window from the oldest tipUpdated", () => {
    expect(DEFAULT_CYCLE_TIPS_STALE_AFTER_DAYS).toBe(7);
    expect(oldestTipUpdated()).toBe("2026-11-18");
    const now = new Date("2026-11-25T03:00:00.000Z");
    expect(daysSinceOldestTip(CITY_CYCLE_TIPS, now)).toBe(7);
    expect(isCycleTipsStale(CITY_CYCLE_TIPS, { now, staleAfterDays: 7 })).toBe(true);
    expect(
      isCycleTipsStale(CITY_CYCLE_TIPS, {
        now: new Date("2026-11-24T03:00:00.000Z"),
        staleAfterDays: 7,
      }),
    ).toBe(false);
  });

  it("reads CYCLE_TIPS_STALE_AFTER_DAYS and CYCLE_TIPS_ALLOW_STALE", () => {
    expect(cycleTipsStaleAfterDaysFromEnv({})).toBe(7);
    expect(cycleTipsStaleAfterDaysFromEnv({ CYCLE_TIPS_STALE_AFTER_DAYS: "5" })).toBe(5);
    expect(() => cycleTipsStaleAfterDaysFromEnv({ CYCLE_TIPS_STALE_AFTER_DAYS: "0" })).toThrow(
      /positive integer/,
    );
    expect(allowCycleTipsStaleFromEnv({})).toBe(false);
    expect(allowCycleTipsStaleFromEnv({ CYCLE_TIPS_ALLOW_STALE: "1" })).toBe(true);
    expect(allowCycleTipsStaleFromEnv({ CYCLE_TIPS_ALLOW_STALE: "yes" })).toBe(true);
  });
});

describe("phaseDecisionLine", () => {
  it("covers every phase without naming a forecast dollar or weekday", () => {
    for (const phase of CYCLE_PHASES) {
      const line = phaseDecisionLine(phase);
      expect(line.length).toBeGreaterThan(20);
      expect(line).not.toMatch(/\$\d/);
      expect(line.toLowerCase()).not.toMatch(/tuesday|wednesday/);
    }
  });
});
