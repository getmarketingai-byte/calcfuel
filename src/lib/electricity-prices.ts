/**
 * Australian household electricity reference prices: the AER Default Market Offer (DMO)
 * 2026–27, final determination published 26 May 2026, applying from 1 July 2026.
 *
 * The DMO is a cap on standing-offer prices and a reference point for market offers, set
 * as an annual bill at a benchmark usage. Dividing the bill by the usage gives an all-in
 * average cents per kWh — including the daily supply charge — which overstates the marginal
 * cost of an extra kWh (for example, charging an EV). Off-peak, EV and solar-export tariffs
 * can be far lower. Victoria sets its own Victorian Default Offer and is not included.
 */
export const DMO_SOURCE = {
  name: "AER, Default market offer prices 2026–27: Final determination",
  published: "26 May 2026",
  url: "https://www.aer.gov.au/system/files/2026-05/AER%20-%20Final%20determination%20-%20Default%20market%20offer%202026%E2%80%9327.pdf",
} as const;

export interface DmoRegion {
  network: string;
  region: string;
  annualBill: number;
  usageKwh: number;
}

export const DMO_2026_27: DmoRegion[] = [
  { network: "Ausgrid", region: "Sydney, Central Coast, Hunter (NSW)", annualBill: 1899, usageKwh: 3900 },
  { network: "Energex", region: "South-east Queensland", annualBill: 1988, usageKwh: 4600 },
  { network: "SA Power Networks", region: "South Australia", annualBill: 2334, usageKwh: 4000 },
];

export const dmoCentsPerKwh = (r: DmoRegion) => (r.annualBill / r.usageKwh) * 100;

/** Lowest and highest all-in DMO average, in $/kWh. */
export const DMO_RANGE = {
  low: Math.min(...DMO_2026_27.map(dmoCentsPerKwh)) / 100,
  high: Math.max(...DMO_2026_27.map(dmoCentsPerKwh)) / 100,
};

/** Published public fast-charging price used for comparison: Viva Energy Hub Geelong, 350 kW. */
export const PUBLIC_DC_EXAMPLE = {
  pricePerKwh: 0.7,
  where: "Viva Energy Hub, Geelong (350 kW CCS2)",
  url: "https://www.vivaenergy.com.au/ArticleDocuments/1218/425_108855_27Jun2025113950_FAQs%20for%20Energy%20Hub%20Hydrogen%20Refuelling%20Station.pdf.aspx",
} as const;
