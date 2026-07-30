/**
 * Stripe card payment fee presets (standard online rates).
 * Sources: Stripe pricing pages for AU, US, UK.
 * Last reviewed: 2026-07-30
 */
export type StripePreset = {
  id: string;
  label: string;
  currency: string;
  pct: number;
  fixed: number;
  internationalPct: number;
};

export const STRIPE_LAST_REVIEWED = "2026-07-30";

export const STRIPE_PRESETS: StripePreset[] = [
  {
    id: "au",
    label: "Australia (AUD)",
    currency: "AUD",
    pct: 1.75,
    fixed: 0.3,
    internationalPct: 3.5,
  },
  {
    id: "us",
    label: "United States (USD)",
    currency: "USD",
    pct: 2.9,
    fixed: 0.3,
    internationalPct: 3.9,
  },
  {
    id: "uk",
    label: "United Kingdom (GBP)",
    currency: "GBP",
    pct: 1.5,
    fixed: 0.2,
    internationalPct: 3.25,
  },
];
