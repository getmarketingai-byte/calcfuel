import { describe, expect, it } from "vitest";
import {
  DEFAULT_DIESEL_PRICE_AUD_PER_L,
  DEFAULT_PETROL_PRICE_AUD_PER_L,
  DIESEL_BY_CITY,
  FIVE_CITY_AVERAGE,
  FIVE_LARGEST_CITIES,
  PETROL_BY_CITY,
  SOURCE_REPORT,
  datasetHasSiteRange,
} from "./fuel-prices";
import { parseIsoDateUtc } from "./fuel-price-cadence";

const FIVE = new Set(FIVE_LARGEST_CITIES);

function meanOfFive(rows: { city: string; average: number }[]): number {
  const values = rows.filter((r) => FIVE.has(r.city)).map((r) => r.average);
  expect(values).toHaveLength(5);
  return values.reduce((sum, n) => sum + n, 0) / values.length;
}

describe("ACCC snapshot integrity", () => {
  it("has parseable as_of and report dates", () => {
    expect(parseIsoDateUtc(SOURCE_REPORT.pricesTo)).toBe(Date.UTC(2026, 8, 16));
    expect(parseIsoDateUtc(SOURCE_REPORT.reportDate)).toBe(Date.UTC(2026, 8, 18));
    expect(SOURCE_REPORT.pricesTo <= SOURCE_REPORT.reportDate).toBe(true);
  });

  it("keeps five-city averages within 0.05 cpl of the five capital means", () => {
    // ACCC publishes the five-city figure; we do not substitute our own average.
    // The check is a transcription guard against a swapped digit.
    expect(meanOfFive(PETROL_BY_CITY)).toBeCloseTo(FIVE_CITY_AVERAGE.petrol, 1);
    expect(meanOfFive(DIESEL_BY_CITY)).toBeCloseTo(FIVE_CITY_AVERAGE.diesel, 1);
  });

  it("derives dollar defaults from the published cpl figures", () => {
    expect(DEFAULT_PETROL_PRICE_AUD_PER_L).toBeCloseTo(2.242, 5);
    expect(DEFAULT_DIESEL_PRICE_AUD_PER_L).toBeCloseTo(2.679, 5);
  });

  it("does not invent intra-city site ranges when the report omitted them", () => {
    expect(datasetHasSiteRange(PETROL_BY_CITY)).toBe(false);
    expect(datasetHasSiteRange(DIESEL_BY_CITY)).toBe(false);
    for (const row of [...PETROL_BY_CITY, ...DIESEL_BY_CITY]) {
      expect(row.lowestSite).toBeUndefined();
      expect(row.highestSite).toBeUndefined();
    }
  });

  it("points at the matching public PDF", () => {
    expect(SOURCE_REPORT.url).toContain("18-september-2026");
    expect(SOURCE_REPORT.indexUrl).toContain("weekly-fuel-price-monitoring-update");
  });
});
