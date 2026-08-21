/**
 * One chart per guide, built from figures that already appear in that guide's body.
 *
 * These are not decoration. Each chart takes a table or a paragraph of numbers from the
 * article and makes the shape of the data visible — which is the part prose is worst at.
 * Nothing here introduces a figure the article does not already state and source.
 *
 * Rendered by BlogArticleLayout. Enforced by AC10 in the gate.
 */

import type { BarDatum } from "@/components/charts/BarChart";

export interface GuideChart {
  title: string;
  description: string;
  data: BarDatum[];
  unitSuffix?: string;
  seriesLabel?: string;
  compareLabel?: string;
  precision?: number;
  /** Shown under the chart to say where the numbers come from. */
  note?: string;
}

export const GUIDE_CHARTS: Record<string, GuideChart> = {
  "best-time-to-buy-petrol-australia": {
    title: "Size of the weekly petrol price cycle, by capital city",
    description:
      "Typical peak-to-trough movement within one price cycle, in cents per litre, for four Australian capital cities. Melbourne has the widest cycle at 15 to 22 cents; Brisbane the narrowest at 10 to 18.",
    data: [
      { label: "Melbourne", value: 18.5, highlight: true },
      { label: "Sydney", value: 16 },
      { label: "Adelaide", value: 16 },
      { label: "Brisbane", value: 14 },
    ],
    unitSuffix: " cpl",
    seriesLabel: "Midpoint of the typical cycle range",
    note: "Midpoints of the ranges in the table below. Perth runs a fixed weekly cycle published through FuelWatch and is excluded.",
  },

  "car-running-costs-australia": {
    title: "Annual running cost by vehicle class",
    description:
      "Midpoint of the typical annual running cost range for five Australian vehicle classes, covering fuel, registration, insurance, tyres, servicing and depreciation. A large SUV costs roughly double a small hatchback.",
    data: [
      { label: "Small hatch", value: 9500 },
      { label: "Small SUV", value: 11750 },
      { label: "Mid SUV", value: 14000 },
      { label: "Dual-cab ute", value: 15500 },
      { label: "Large 4WD", value: 18000, highlight: true },
    ],
    unitSuffix: "",
    precision: 0,
    seriesLabel: "Annual running cost, $ (range midpoint)",
    note: "Midpoints of the ranges in the breakdown below.",
  },

  "caravan-fuel-consumption-australia": {
    title: "Towing consumption against road speed",
    description:
      "Fuel consumption in litres per 100 km for a diesel ute towing a 2,000 kg caravan at three highway speeds. Dropping from 110 to 90 km/h cuts consumption by roughly 5 L/100km.",
    data: [
      { label: "90 km/h", value: 12.5 },
      { label: "100 km/h", value: 14.5 },
      { label: "110 km/h", value: 17.5, highlight: true },
    ],
    unitSuffix: " L/100km",
    seriesLabel: "Midpoint of the observed range",
    note: "Midpoints of the ranges given in the speed section below.",
  },

  "diesel-vs-petrol-car-australia": {
    title: "Fuel cost per kilometre, diesel against petrol SUV",
    description:
      "Cost per kilometre for a mid-size SUV in diesel and petrol form. Diesel is cheaper per kilometre despite the higher price per litre, because it uses 25 to 35 percent less fuel.",
    data: [
      { label: "Diesel SUV", value: 14, highlight: true },
      { label: "Petrol SUV", value: 17 },
    ],
    unitSuffix: "c/km",
    precision: 0,
    seriesLabel: "Fuel cost per km (range midpoint)",
    note: "Midpoints of the per-kilometre ranges in the comparison table below.",
  },

  "ev-charging-cost-australia": {
    title: "Off-peak home electricity rates by state",
    description:
      "Midpoint of typical off-peak or controlled-load electricity rates in cents per kilowatt-hour across five states. Queensland is cheapest on controlled load; Victoria the dearest.",
    data: [
      { label: "Queensland", value: 12 },
      { label: "WA", value: 11.5 },
      { label: "NSW", value: 13 },
      { label: "South Aus", value: 13 },
      { label: "Victoria", value: 15, highlight: true },
    ],
    unitSuffix: " c/kWh",
    seriesLabel: "Off-peak rate (range midpoint)",
    note: "Midpoints of the state ranges listed below. Rates vary by retailer and plan.",
  },

  "how-to-reduce-commute-fuel-costs": {
    title: "Annual saving by tactic",
    description:
      "Midpoint annual saving in dollars for five commute cost-reduction tactics. Carpooling two days a week and working from home one day a week save the most; tyre pressure the least, though it costs nothing.",
    data: [
      { label: "Carpool 2 d/wk", value: 550, highlight: true },
      { label: "WFH 1 d/wk", value: 550, highlight: true },
      { label: "Eco driving", value: 412 },
      { label: "Better route", value: 344 },
      { label: "Tyre pressure", value: 55 },
    ],
    unitSuffix: "",
    precision: 0,
    seriesLabel: "Annual saving, $ (range midpoint)",
    note: "Midpoints of the ranges in the tactics table below.",
  },

  "how-to-save-money-on-petrol-australia": {
    title: "Annual saving by tactic, and what it costs you to do it",
    description:
      "Midpoint annual saving in dollars for six ways to cut a petrol bill. Switching vehicle saves the most but is a one-off high-effort change; buying on the cheapest day and using a price app are low effort and together save several hundred dollars.",
    data: [
      { label: "Switch vehicle", value: 1250, highlight: true },
      { label: "Cheapest day", value: 325 },
      { label: "Smooth driving", value: 275 },
      { label: "Price app", value: 250 },
      { label: "Supermarket", value: 85 },
      { label: "Tyre pressure", value: 60 },
    ],
    unitSuffix: "",
    precision: 0,
    seriesLabel: "Annual saving, $ (range midpoint)",
    note: "Midpoints of the ranges in the summary table below.",
  },

  "hybrid-vs-petrol-australia": {
    title: "Consumption gap, hybrid against petrol",
    description:
      "Combined fuel consumption in litres per 100 km for five popular Australian models in hybrid and petrol form. The RAV4 shows the largest gap at 3.1 L/100km.",
    data: [
      { label: "RAV4", value: 5.0, compare: 8.1, highlight: true },
      { label: "Camry", value: 4.2, compare: 7.0 },
      { label: "Corolla", value: 4.2, compare: 6.6 },
      { label: "Tucson", value: 6.0, compare: 8.6 },
    ],
    unitSuffix: " L",
    seriesLabel: "Hybrid",
    compareLabel: "Petrol",
    note: "Manufacturer combined-cycle figures from the comparison table below.",
  },

  "most-fuel-efficient-cars-australia": {
    title: "Annual fuel cost, most efficient models",
    description:
      "Estimated annual fuel cost for four of the most efficient cars on sale in Australia. The Corolla Hybrid costs about $330 a year less to fuel than a petrol Corolla.",
    data: [
      { label: "Corolla Hybrid", value: 1260, highlight: true },
      { label: "Yaris", value: 1590 },
      { label: "Corolla petrol", value: 1890 },
      { label: "Mazda 3", value: 1950 },
    ],
    unitSuffix: "",
    precision: 0,
    seriesLabel: "Annual fuel cost, $",
    note: "From the ranked table below, at the annual distance and price stated there.",
  },

  "motorcycle-vs-car-running-costs-australia": {
    title: "Fuel consumption, benchmark motorcycle against benchmark car",
    description:
      "Combined consumption for a Honda CB500F at about 5 litres per 100 km against a Toyota Corolla at about 7.5. The gap drives roughly $1,760 a year in running cost savings.",
    data: [
      { label: "CB500F", value: 5.0, highlight: true },
      { label: "Corolla", value: 7.5 },
    ],
    unitSuffix: " L/100km",
    seriesLabel: "Combined consumption",
    note: "Benchmark vehicles used throughout this guide.",
  },

  "petrol-cost-per-km-australia": {
    title: "Petrol cost per kilometre by consumption",
    description:
      "Fuel cost in cents per kilometre for four consumption levels at a mid-range pump price. A vehicle at 11 litres per 100 km costs roughly double one at 6.",
    data: [
      { label: "6 L/100km", value: 12.0 },
      { label: "8 L/100km", value: 16.0 },
      { label: "10 L/100km", value: 20.0 },
      { label: "11 L/100km", value: 22.0, highlight: true },
    ],
    unitSuffix: "c/km",
    seriesLabel: "Cost per km at $2.00/L",
    note: "Column from the cost-per-kilometre table below, at a $2.00/L pump price.",
  },

  "understanding-fuel-economy-mpg-vs-l100km": {
    title: "Why the MPG scale misleads",
    description:
      "Litres per 100 km against miles per gallon. Going from 20 to 25 MPG saves 2.4 litres per 100 km; going from 35 to 40 MPG saves only 0.8. Equal steps in MPG are not equal savings in fuel.",
    data: [
      { label: "20 MPG", value: 11.8, highlight: true },
      { label: "25 MPG", value: 9.4 },
      { label: "30 MPG", value: 7.8 },
      { label: "35 MPG", value: 6.7 },
      { label: "40 MPG", value: 5.9 },
    ],
    unitSuffix: " L/100km",
    seriesLabel: "Consumption at each MPG figure",
    note: "From the conversion table below. The shrinking gaps between bars are the whole point.",
  },
};
