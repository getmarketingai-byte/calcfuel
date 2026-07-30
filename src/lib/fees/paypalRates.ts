/**
 * PayPal commercial transaction fee presets.
 * Sources: PayPal AU merchant fees (Feb 2026); PayPal US standard rates.
 * Last reviewed: 2026-07-30
 */
export type PayPalPreset = {
  id: string;
  label: string;
  currency: string;
  domesticPct: number;
  domesticFixed: number;
  internationalSurchargePct: number;
  currencyConversionPct: number;
};

export const PAYPAL_LAST_REVIEWED = "2026-07-30";

export const PAYPAL_PRESETS: PayPalPreset[] = [
  {
    id: "au",
    label: "Australia (AUD)",
    currency: "AUD",
    domesticPct: 2.9,
    domesticFixed: 0.3,
    internationalSurchargePct: 1.0,
    currencyConversionPct: 3.0,
  },
  {
    id: "us",
    label: "United States (USD)",
    currency: "USD",
    domesticPct: 2.99,
    domesticFixed: 0.49,
    internationalSurchargePct: 1.5,
    currencyConversionPct: 4.0,
  },
  {
    id: "uk",
    label: "United Kingdom (GBP)",
    currency: "GBP",
    domesticPct: 2.9,
    domesticFixed: 0.3,
    internationalSurchargePct: 1.29,
    currencyConversionPct: 4.0,
  },
];
