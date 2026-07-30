/**
 * Amazon FBA planning presets — simplified v1 (referral + flat fulfillment).
 * Full size-tier FBA tables vary by marketplace and season; users can override.
 * Sources: Amazon Seller Central fee schedules (indicative).
 * Last reviewed: 2026-07-30
 */
export type AmazonCategoryPreset = {
  id: string;
  label: string;
  referralPct: number;
};

export type AmazonFulfillmentPreset = {
  id: string;
  label: string;
  fee: number;
};

export const AMAZON_FBA_LAST_REVIEWED = "2026-07-30";

export const AMAZON_MARKETPLACES = [
  { id: "us", label: "Amazon.com (USD)", currency: "USD" },
  { id: "au", label: "Amazon.com.au (AUD)", currency: "AUD" },
  { id: "uk", label: "Amazon.co.uk (GBP)", currency: "GBP" },
] as const;

export const AMAZON_CATEGORY_PRESETS: AmazonCategoryPreset[] = [
  { id: "most", label: "Most categories (15%)", referralPct: 15 },
  { id: "electronics", label: "Consumer electronics (8%)", referralPct: 8 },
  { id: "computers", label: "Computers (8%)", referralPct: 8 },
  { id: "grocery", label: "Grocery (8–15% blended → 12%)", referralPct: 12 },
  { id: "clothing", label: "Clothing & accessories (17%)", referralPct: 17 },
  { id: "custom", label: "Custom / override", referralPct: 15 },
];

/** Indicative US small/standard fulfillment fees — editable in UI */
export const AMAZON_FULFILLMENT_PRESETS: AmazonFulfillmentPreset[] = [
  { id: "small-standard", label: "Small standard (light)", fee: 3.22 },
  { id: "large-standard", label: "Large standard", fee: 5.4 },
  { id: "small-oversize", label: "Small oversize", fee: 9.73 },
  { id: "custom", label: "Custom / paste from Seller Central", fee: 4.0 },
];
