import { describe, expect, it } from "vitest";
import {
  DEFAULT_DIESEL_PRICE_AUD_PER_L,
  DEFAULT_PETROL_PRICE_AUD_PER_L,
  DIESEL_BY_CITY,
  FIVE_CITY_AVERAGE,
  FIVE_LARGEST_CITIES,
  PETROL_BY_CITY,
  REGIONAL_AVERAGE,
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
    expect(parseIsoDateUtc(SOURCE_REPORT.pricesTo)).toBe(Date.UTC(2026, 10, 11));
    expect(parseIsoDateUtc(SOURCE_REPORT.reportDate)).toBe(Date.UTC(2026, 10, 13));
    expect(SOURCE_REPORT.pricesTo <= SOURCE_REPORT.reportDate).toBe(true);
    expect(SOURCE_REPORT.edition).toBe("thirty-sixth weekly report");
    expect(SOURCE_REPORT.reportDateLabel).toBe("Friday 13 November 2026");
    expect(SOURCE_REPORT.pricesToLabel).toBe("11 November 2026");
  });

  it("keeps five-city averages within 0.05 cpl of the five capital means", () => {
    // ACCC publishes the five-city figure; we do not substitute our own average.
    // The check is a transcription guard against a swapped digit.
    expect(meanOfFive(PETROL_BY_CITY)).toBeCloseTo(FIVE_CITY_AVERAGE.petrol, 1);
    expect(meanOfFive(DIESEL_BY_CITY)).toBeCloseTo(FIVE_CITY_AVERAGE.diesel, 1);
  });

  it("derives dollar defaults from the published cpl figures", () => {
    expect(DEFAULT_PETROL_PRICE_AUD_PER_L).toBeCloseTo(2.192, 5);
    expect(DEFAULT_DIESEL_PRICE_AUD_PER_L).toBeCloseTo(2.664, 5);
    expect(FIVE_CITY_AVERAGE.petrol).toBe(219.2);
    expect(FIVE_CITY_AVERAGE.diesel).toBe(266.4);
    expect(FIVE_CITY_AVERAGE.petrolPreConflict).toBe(170.9);
    expect(FIVE_CITY_AVERAGE.dieselPreConflict).toBe(176.6);
    expect(REGIONAL_AVERAGE.petrol).toBe(236.9);
    expect(REGIONAL_AVERAGE.diesel).toBe(276);
    expect(REGIONAL_AVERAGE.petrol - FIVE_CITY_AVERAGE.petrol).toBeCloseTo(17.7, 5);
    expect(REGIONAL_AVERAGE.diesel - FIVE_CITY_AVERAGE.diesel).toBeCloseTo(9.6, 5);
  });

  it("does not invent intra-city site ranges when the report omitted them", () => {
    expect(datasetHasSiteRange(PETROL_BY_CITY)).toBe(false);
    expect(datasetHasSiteRange(DIESEL_BY_CITY)).toBe(false);
    for (const row of [...PETROL_BY_CITY, ...DIESEL_BY_CITY]) {
      expect(row.lowestSite).toBeUndefined();
      expect(row.highestSite).toBeUndefined();
    }
  });

  it("transcribes the 11 November city table without swapping a digit", () => {
    expect(PETROL_BY_CITY.map((row) => [row.city, row.average, row.preConflict])).toEqual([
      ["Sydney", 221.7, 165.2],
      ["Melbourne", 221.8, 176.1],
      ["Brisbane", 223.3, 188.8],
      ["Adelaide", 214.5, 161.3],
      ["Perth", 214.6, 163.3],
      ["Canberra", 237.4, 181.2],
      ["Hobart", 235.7, 165],
      ["Darwin", 239.7, 177.1],
    ]);
    expect(DIESEL_BY_CITY.map((row) => [row.city, row.average, row.preConflict])).toEqual([
      ["Sydney", 268.7, 174.3],
      ["Melbourne", 269.2, 178.9],
      ["Brisbane", 271, 179.7],
      ["Adelaide", 262.6, 174.7],
      ["Perth", 260.4, 175.6],
      ["Canberra", 280.6, 187.6],
      ["Hobart", 276.3, 184.7],
      ["Darwin", 280.3, 180.5],
    ]);
    const petrol = Object.fromEntries(PETROL_BY_CITY.map((row) => [row.city, row.average]));
    const diesel = Object.fromEntries(DIESEL_BY_CITY.map((row) => [row.city, row.average]));
    expect(petrol.Canberra - petrol.Adelaide).toBeCloseTo(22.9, 5);
    expect(diesel.Canberra).toBe(280.6);
    expect(diesel.Perth).toBe(260.4);
  });

  it("points at the matching public PDF", () => {
    expect(SOURCE_REPORT.url).toContain("13-november-2026");
    expect(SOURCE_REPORT.indexUrl).toContain("weekly-fuel-price-monitoring-update");
  });
});
