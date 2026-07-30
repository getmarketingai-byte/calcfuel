/**
 * Australian Fuel Tax Credit (FTC) rates — cents per litre / kg planning table.
 * Sources: ATO fuel tax credit rates (business). Rates change periodically (Feb/Aug indexing).
 * Last reviewed: 2026-07-30
 *
 * Note: Heavy vehicle on-road rates differ from off-road / machinery rates.
 * Users should verify current ATO rates before lodging a BAS claim.
 */
export type FuelTaxCreditPreset = {
  id: string;
  label: string;
  unit: "litre" | "kg";
  /** Credit rate in cents per unit */
  centsPerUnit: number;
  note: string;
};

export const FTC_LAST_REVIEWED = "2026-07-30";
export const FTC_PERIOD_LABEL = "Indicative mid-2026 rates — verify on ATO before claiming";

export const FTC_PRESETS: FuelTaxCreditPreset[] = [
  {
    id: "diesel-offroad",
    label: "Diesel / petrol — off-road / machinery",
    unit: "litre",
    centsPerUnit: 51.6,
    note: "Common off-road business use rate band — confirm current ATO table",
  },
  {
    id: "diesel-heavy-onroad",
    label: "Diesel — heavy vehicle on-road (after RUC)",
    unit: "litre",
    centsPerUnit: 20.5,
    note: "Net of road user charge component — confirm current ATO table",
  },
  {
    id: "petrol-offroad",
    label: "Petrol — eligible off-road use",
    unit: "litre",
    centsPerUnit: 51.6,
    note: "Eligibility depends on activity — use ATO eligibility tool",
  },
  {
    id: "lpg",
    label: "LPG — eligible business use",
    unit: "litre",
    centsPerUnit: 16.9,
    note: "Gaseous fuels use different units/rates — verify ATO",
  },
  {
    id: "custom",
    label: "Custom rate (cents per unit)",
    unit: "litre",
    centsPerUnit: 51.6,
    note: "Paste the exact rate from the ATO calculator for your BAS period",
  },
];
