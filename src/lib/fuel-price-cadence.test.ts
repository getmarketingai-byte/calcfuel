import { describe, expect, it } from "vitest";
import {
  ACCC_CALENDAR_TIME_ZONE,
  DEFAULT_ACCC_STALE_AFTER_DAYS,
  allowStaleFromEnv,
  daysSincePricesTo,
  formatDaysAgo,
  isAcccSnapshotStale,
  parseIsoDateUtc,
  staleAfterDaysFromEnv,
} from "./fuel-price-cadence";

describe("parseIsoDateUtc", () => {
  it("accepts a real calendar date", () => {
    expect(parseIsoDateUtc("2026-09-16")).toBe(Date.UTC(2026, 8, 16));
  });

  it("rejects malformed and impossible dates", () => {
    expect(() => parseIsoDateUtc("16 September 2026")).toThrow(/YYYY-MM-DD/);
    expect(() => parseIsoDateUtc("2026-02-30")).toThrow(/Invalid calendar date/);
  });
});

describe("daysSincePricesTo", () => {
  it("counts whole Australia/Sydney calendar days", () => {
    expect(ACCC_CALENDAR_TIME_ZONE).toBe("Australia/Sydney");
    const now = new Date("2026-09-19T08:00:00.000Z");
    expect(daysSincePricesTo("2026-09-16", now)).toBe(3);
    expect(daysSincePricesTo("2026-09-19", now)).toBe(0);
    expect(daysSincePricesTo("2026-09-20", now)).toBe(-1);
  });

  it("counts 30 Sep to 6 Oct 2026 as 6 days", () => {
    // 01:00 on 6 Oct AEDT is still 5 Oct in UTC. A UTC count would be 5.
    expect(daysSincePricesTo("2026-09-30", new Date("2026-10-05T14:00:00.000Z"))).toBe(6);
    expect(daysSincePricesTo("2026-09-30", new Date("2026-10-06T02:00:00.000Z"))).toBe(6);
  });

  it("counts whole days across the 4–5 Oct 2026 DST boundary", () => {
    // Clocks jump 02:00 AEST to 03:00 AEDT on Sunday 4 Oct 2026.
    expect(daysSincePricesTo("2026-10-04", new Date("2026-10-03T15:30:00.000Z"))).toBe(0);
    expect(daysSincePricesTo("2026-10-04", new Date("2026-10-03T16:30:00.000Z"))).toBe(0);
    // 00:30 on 5 Oct Sydney is still 4 Oct UTC.
    expect(daysSincePricesTo("2026-10-04", new Date("2026-10-04T13:30:00.000Z"))).toBe(1);
    expect(daysSincePricesTo("2026-10-04", new Date("2026-10-04T12:30:00.000Z"))).toBe(0);
  });

  it("keeps future dates negative", () => {
    const now = new Date("2026-10-06T02:00:00.000Z");
    expect(daysSincePricesTo("2026-10-07", now)).toBe(-1);
    expect(formatDaysAgo(daysSincePricesTo("2026-10-07", now))).toBe("1 day in the future");
    expect(formatDaysAgo(-2)).toBe("2 days in the future");
  });
});

describe("isAcccSnapshotStale", () => {
  const now = new Date("2026-09-30T12:00:00.000Z");

  it("is stale at N days old, using the 14-day default", () => {
    expect(DEFAULT_ACCC_STALE_AFTER_DAYS).toBe(14);
    expect(isAcccSnapshotStale("2026-09-16", { now, staleAfterDays: 14 })).toBe(true);
    expect(isAcccSnapshotStale("2026-09-17", { now, staleAfterDays: 14 })).toBe(false);
  });

  it("honours a 7-day window", () => {
    expect(isAcccSnapshotStale("2026-09-23", { now, staleAfterDays: 7 })).toBe(true);
    expect(isAcccSnapshotStale("2026-09-24", { now, staleAfterDays: 7 })).toBe(false);
  });
});

describe("env helpers", () => {
  it("reads ACCC_STALE_AFTER_DAYS and ACCC_ALLOW_STALE", () => {
    expect(staleAfterDaysFromEnv({})).toBe(14);
    expect(staleAfterDaysFromEnv({ ACCC_STALE_AFTER_DAYS: "7" })).toBe(7);
    expect(() => staleAfterDaysFromEnv({ ACCC_STALE_AFTER_DAYS: "0" })).toThrow(/positive integer/);
    expect(allowStaleFromEnv({})).toBe(false);
    expect(allowStaleFromEnv({ ACCC_ALLOW_STALE: "1" })).toBe(true);
    expect(allowStaleFromEnv({ ACCC_ALLOW_STALE: "true" })).toBe(true);
  });
});

describe("formatDaysAgo", () => {
  it("labels today, past, and future", () => {
    expect(formatDaysAgo(0)).toBe("today");
    expect(formatDaysAgo(1)).toBe("1 day ago");
    expect(formatDaysAgo(3)).toBe("3 days ago");
    expect(formatDaysAgo(-2)).toBe("2 days in the future");
  });
});
