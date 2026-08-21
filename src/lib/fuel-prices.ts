/**
 * Australian retail fuel price reference data.
 *
 * Every figure here is transcribed from a single published ACCC weekly fuel price
 * monitoring report. Nothing is estimated, interpolated or averaged by us — if a
 * number is not in the source report it does not appear here.
 *
 * Update procedure: the ACCC publishes a new report each Friday at
 * https://www.accc.gov.au/about-us/publications/weekly-fuel-price-monitoring-update
 * Replace the tables below, bump `SOURCE_REPORT`, and record the change on
 * /corrections if a previously published figure turns out to have been wrong.
 */

export interface CityFuelPrice {
  city: string;
  /** Daily average retail price, cents per litre, on SOURCE_REPORT.pricesTo. */
  average: number;
  /** Cheapest monitored site in that city at 11am on the same day, cpl. */
  lowestSite: number;
  /** Dearest monitored site in that city at 11am on the same day, cpl. */
  highestSite: number;
  /** Daily average on 20 February 2026, before the Middle East conflict escalated. */
  preConflict: number;
}

export const SOURCE_REPORT = {
  publisher: "ACCC",
  title: "Weekly fuel price monitoring report",
  reportDate: "2026-08-21",
  reportDateLabel: "Friday 21 August 2026",
  /** The report carries prices up to this date, not to its publication date. */
  pricesTo: "2026-08-19",
  pricesToLabel: "19 August 2026",
  edition: "twenty-fourth weekly report",
  url: "https://www.accc.gov.au/system/files/weekly-fuel-price-monitoring-report-21-august-2026.pdf",
  indexUrl:
    "https://www.accc.gov.au/about-us/publications/weekly-fuel-price-monitoring-update",
  /** Named by the ACCC as the underlying price feeds for the tables below. */
  underlyingSources:
    "Informed Sources, FuelCheck NSW, WA FuelWatch, FuelCheck TAS, MyFuelNT and PetrolSpy. Sites requiring membership are excluded.",
} as const;

export const PETROL_BY_CITY: CityFuelPrice[] = [
  { city: "Sydney", average: 197.2, lowestSite: 184.5, highestSite: 222.9, preConflict: 165.2 },
  { city: "Melbourne", average: 200.2, lowestSite: 179.9, highestSite: 239.9, preConflict: 176.1 },
  { city: "Brisbane", average: 199.4, lowestSite: 185.5, highestSite: 214.9, preConflict: 188.8 },
  { city: "Adelaide", average: 199.9, lowestSite: 193.5, highestSite: 202.9, preConflict: 161.3 },
  { city: "Perth", average: 206.9, lowestSite: 184.7, highestSite: 219.9, preConflict: 163.3 },
  { city: "Canberra", average: 202.6, lowestSite: 194.7, highestSite: 205.9, preConflict: 181.2 },
  { city: "Hobart", average: 202.5, lowestSite: 183.9, highestSite: 220.9, preConflict: 165.0 },
  { city: "Darwin", average: 208.2, lowestSite: 204.5, highestSite: 215.5, preConflict: 177.1 },
];

export const DIESEL_BY_CITY: CityFuelPrice[] = [
  { city: "Sydney", average: 241.8, lowestSite: 228.5, highestSite: 256.9, preConflict: 174.3 },
  { city: "Melbourne", average: 246.6, lowestSite: 225.9, highestSite: 329.9, preConflict: 178.9 },
  { city: "Brisbane", average: 246.3, lowestSite: 226.5, highestSite: 268.9, preConflict: 179.7 },
  { city: "Adelaide", average: 243.5, lowestSite: 236.9, highestSite: 246.9, preConflict: 174.7 },
  { city: "Perth", average: 241.5, lowestSite: 228.7, highestSite: 253.9, preConflict: 175.6 },
  { city: "Canberra", average: 248.5, lowestSite: 240.9, highestSite: 250.9, preConflict: 187.6 },
  { city: "Hobart", average: 248.0, lowestSite: 225.3, highestSite: 260.7, preConflict: 184.7 },
  { city: "Darwin", average: 248.6, lowestSite: 244.5, highestSite: 256.9, preConflict: 180.5 },
];

/** Aggregate across Sydney, Melbourne, Brisbane, Adelaide and Perth. */
export const FIVE_CITY_AVERAGE = {
  petrol: 200.7,
  diesel: 243.9,
  petrolPreConflict: 170.9,
  dieselPreConflict: 176.6,
} as const;

/** Aggregate across the 190+ regional locations the ACCC monitors. */
export const REGIONAL_AVERAGE = {
  petrol: 208.7,
  diesel: 250.3,
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

/** One-line provenance string for use under a default value or a table. */
export const PRICE_PROVENANCE = `Five-city average, ${SOURCE_REPORT.pricesToLabel}. Source: ACCC ${SOURCE_REPORT.title}, ${SOURCE_REPORT.reportDateLabel}.`;
