/**
 * Etsy seller fee presets — planning estimates only.
 * Sources: Etsy Help (listing, transaction, Offsite Ads); payment processing varies by country.
 * Last reviewed: 2026-07-30
 */
export type EtsyCountryPreset = {
  id: string;
  label: string;
  currency: string;
  listingFee: number;
  transactionPct: number;
  processingPct: number;
  processingFixed: number;
};

export const ETSY_LAST_REVIEWED = "2026-07-30";

export const ETSY_OFFSITE_ADS_RATES = [
  { id: "none", label: "No Offsite Ads", pct: 0 },
  { id: "15", label: "Offsite Ads 15% (< $10k trailing sales)", pct: 15 },
  { id: "12", label: "Offsite Ads 12% (≥ $10k trailing sales)", pct: 12 },
] as const;

export const ETSY_COUNTRY_PRESETS: EtsyCountryPreset[] = [
  {
    id: "us",
    label: "United States",
    currency: "USD",
    listingFee: 0.2,
    transactionPct: 6.5,
    processingPct: 3.0,
    processingFixed: 0.25,
  },
  {
    id: "au",
    label: "Australia",
    currency: "AUD",
    listingFee: 0.2,
    transactionPct: 6.5,
    processingPct: 4.0,
    processingFixed: 0.25,
  },
  {
    id: "uk",
    label: "United Kingdom",
    currency: "GBP",
    listingFee: 0.2,
    transactionPct: 6.5,
    processingPct: 4.0,
    processingFixed: 0.2,
  },
  {
    id: "ca",
    label: "Canada",
    currency: "CAD",
    listingFee: 0.2,
    transactionPct: 6.5,
    processingPct: 3.0,
    processingFixed: 0.25,
  },
];
