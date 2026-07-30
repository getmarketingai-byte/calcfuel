/**
 * eBay final value fee presets (simplified planning rates).
 * Sources: eBay seller fees help — category rates vary; presets are editable.
 * Last reviewed: 2026-07-30
 */
export type EbayPreset = {
  id: string;
  label: string;
  currency: string;
  finalValuePct: number;
  /** Cap on final value fee when applicable (0 = no cap modelled) */
  finalValueCap: number;
  perOrderFee: number;
  insertionFee: number;
};

export const EBAY_LAST_REVIEWED = "2026-07-30";

export const EBAY_PRESETS: EbayPreset[] = [
  {
    id: "au-most",
    label: "Australia — most categories",
    currency: "AUD",
    finalValuePct: 12.9,
    finalValueCap: 0,
    perOrderFee: 0.3,
    insertionFee: 0,
  },
  {
    id: "us-most",
    label: "United States — most categories",
    currency: "USD",
    finalValuePct: 13.25,
    finalValueCap: 750,
    perOrderFee: 0.3,
    insertionFee: 0,
  },
  {
    id: "uk-most",
    label: "United Kingdom — most categories",
    currency: "GBP",
    finalValuePct: 12.8,
    finalValueCap: 0,
    perOrderFee: 0.3,
    insertionFee: 0,
  },
];
