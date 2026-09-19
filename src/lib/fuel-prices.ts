/**
 * Australian retail fuel price reference data.
 *
 * Every figure here is transcribed from a single published ACCC weekly fuel price
 * monitoring report. Nothing is estimated, interpolated or averaged by us — if a
 * number is not in the source report it does not appear here.
 *
 * Refresh procedure: docs/accc-price-refresh.md
 */

export interface CityFuelPrice {
  city: string;
  /** Daily average retail price, cents per litre, on SOURCE_REPORT.pricesTo. */
  average: number;
  /**
   * Cheapest monitored site in that city at a named clock time on the same day, cpl.
   * Omitted when the current ACCC report does not publish intra-city site range.
   */
  lowestSite?: number;
  /**
   * Dearest monitored site in that city at a named clock time on the same day, cpl.
   * Omitted when the current ACCC report does not publish intra-city site range.
   */
  highestSite?: number;
  /** Daily average on 20 February 2026, before the Middle East conflict escalated. */
  preConflict: number;
}

export const SOURCE_REPORT = {
  publisher: "ACCC",
  title: "Weekly fuel price monitoring report",
  reportDate: "2026-09-18",
  reportDateLabel: "Friday 18 September 2026",
  /** The report carries prices up to this date, not to its publication date. */
  pricesTo: "2026-09-16",
  pricesToLabel: "16 September 2026",
  edition: "twenty-eighth weekly report",
  url: "https://www.accc.gov.au/system/files/weekly-fuel-price-monitoring-report-18-september-2026.pdf",
  indexUrl:
    "https://www.accc.gov.au/about-us/publications/weekly-fuel-price-monitoring-update",
  /** Named by the ACCC as the underlying price feeds for the tables below. */
  underlyingSources:
    "Informed Sources, FuelCheck NSW, WA FuelWatch, FuelCheck TAS, MyFuelNT and PetrolSpy. Sites requiring membership are excluded.",
  /**
   * Table numbers in this edition (the August 2026 reports used different numbering):
   * key messages + Table 6 five-city / regional aggregates; Table 3 city petrol;
   * Table 5 city diesel; Table 6 / Table 7 location lists. Intra-city cheapest /
   * dearest site columns were not published in this edition.
   */
  tablesUsed: "key messages; tables 3, 5, 6 and 7",
} as const;

export const PETROL_BY_CITY: CityFuelPrice[] = [
  { city: "Sydney", average: 224.8, preConflict: 165.2 },
  { city: "Melbourne", average: 223.7, preConflict: 176.1 },
  { city: "Brisbane", average: 224.0, preConflict: 188.8 },
  { city: "Adelaide", average: 218.3, preConflict: 161.3 },
  { city: "Perth", average: 230.0, preConflict: 163.3 },
  { city: "Canberra", average: 234.3, preConflict: 181.2 },
  { city: "Hobart", average: 229.1, preConflict: 165.0 },
  { city: "Darwin", average: 230.1, preConflict: 177.1 },
];

export const DIESEL_BY_CITY: CityFuelPrice[] = [
  { city: "Sydney", average: 268.2, preConflict: 174.3 },
  { city: "Melbourne", average: 269.5, preConflict: 178.9 },
  { city: "Brisbane", average: 271.9, preConflict: 179.7 },
  { city: "Adelaide", average: 268.3, preConflict: 174.7 },
  { city: "Perth", average: 261.7, preConflict: 175.6 },
  { city: "Canberra", average: 285.9, preConflict: 187.6 },
  { city: "Hobart", average: 273.3, preConflict: 184.7 },
  { city: "Darwin", average: 272.9, preConflict: 180.5 },
];

const FIVE_LARGEST = ["Sydney", "Melbourne", "Brisbane", "Adelaide", "Perth"] as const;

/** Aggregate across Sydney, Melbourne, Brisbane, Adelaide and Perth, as published. */
export const FIVE_CITY_AVERAGE = {
  petrol: 224.2,
  diesel: 267.9,
  petrolPreConflict: 170.9,
  dieselPreConflict: 176.6,
} as const;

/** Aggregate across the 190+ regional locations the ACCC monitors. */
export const REGIONAL_AVERAGE = {
  petrol: 228.6,
  diesel: 270.9,
} as const;

/**
 * Fuel excise timeline. Excise is a flat cents-per-litre tax charged on top of the
 * wholesale price, so a change to it moves pump prices almost one-for-one — which is
 * why every default price on this site has to be dated.
 */
export const EXCISE_TIMELINE = [
  {
    from: "2026-03-30",
    rateCpl: 18.7,
    label: "Temporary cut announced — 32 cpl off the standard rate, to 30 June 2026",
  },
  {
    from: "2026-07-01",
    rateCpl: 34.7,
    label: "Relief reduced to a 16 cpl discount, extended to 2 August 2026",
  },
  {
    from: "2026-08-03",
    rateCpl: 53.7,
    label:
      "Full restoration — remaining 16 cpl restored plus a 1.1 cpl CPI indexation (2% factor)",
  },
] as const;

export const CURRENT_EXCISE_CPL = 53.7;

/**
 * Combined tax effect of the 3 August restoration on pump prices, as stated by the
 * ACCC (excise change plus the GST charged on it).
 */
export const EXCISE_RESTORATION_PUMP_IMPACT_CPL = 18.8;

/** Default unleaded price for calculators, in dollars per litre. */
export const DEFAULT_PETROL_PRICE_AUD_PER_L = FIVE_CITY_AVERAGE.petrol / 100;

/** Default diesel price for calculators, in dollars per litre. */
export const DEFAULT_DIESEL_PRICE_AUD_PER_L = FIVE_CITY_AVERAGE.diesel / 100;

export function formatCpl(cpl: number): string {
  return `${cpl.toFixed(1)} cpl`;
}

export function formatAudPerLitre(cpl: number): string {
  return `$${(cpl / 100).toFixed(2)}/L`;
}

export function cityHasSiteRange(
  city: CityFuelPrice,
): city is CityFuelPrice & { lowestSite: number; highestSite: number } {
  return city.lowestSite !== undefined && city.highestSite !== undefined;
}

export function datasetHasSiteRange(cities: readonly CityFuelPrice[]): boolean {
  return cities.length > 0 && cities.every(cityHasSiteRange);
}

export const FIVE_LARGEST_CITIES: readonly string[] = FIVE_LARGEST;

/** One-line provenance string for use under a default value or a table. */
export const PRICE_PROVENANCE = `Five-city average, ${SOURCE_REPORT.pricesToLabel}. Source: ACCC ${SOURCE_REPORT.title}, ${SOURCE_REPORT.reportDateLabel}.`;
