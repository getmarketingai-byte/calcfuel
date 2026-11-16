/**
 * Australian hydrogen refuelling facts, each with its source. Re-check when CSIRO HyResource
 * publishes a new station list (it notes the update date on the page).
 */
export const H2_AU = {
  /** Viva Energy Hub, Geelong: roll-up price $30/kg + GST. */
  vivaPricePerKg: 33,
  vivaSource: {
    name: "Viva Energy, FAQs – Viva Energy Hub Hydrogen Refuelling Station",
    url: "https://www.vivaenergy.com.au/ArticleDocuments/1218/425_108855_27Jun2025113950_FAQs%20for%20Energy%20Hub%20Hydrogen%20Refuelling%20Station.pdf.aspx",
  },
  /** Viva: a passenger car (Mirai, Nexo) takes up to 5 kg and travels 450–500 km on it. */
  passengerFillKg: 5,
  rangeKmLow: 450,
  rangeKmHigh: 500,
  kmPerKgTypical: 95,
  /** CSIRO HyResource station list, current as of 13 October 2026. */
  hyresource: {
    name: "CSIRO HyResource, Hydrogen Refuelling Stations (map and spreadsheet)",
    current: "13 October 2026",
    url: "https://research.csiro.au/hyresource/projects/hydrogen-refuelling-stations/",
    operating: 8,
    underConstruction: 2,
    /** Sites the list describes as open to the public or other fuel-cell vehicles. */
    publicCarAccess: ["bp Lytton truckstop, Brisbane (QLD)", "Viva Energy Hub, Geelong (VIC)"],
    restricted: [
      "Toyota Australia, Altona (Mirai lease customers)",
      "ATCO Jandakot, Perth (ATCO and Fortescue fleets, approved third parties)",
      "Hyundai Australia headquarters, Sydney",
    ],
    closedSince2025: ["Canberra (ActewAGL fleet, decommissioned)", "CSIRO Clayton, Melbourne (decommissioned 2026)"],
  },
} as const;

export const h2PerKm = (pricePerKg: number, kmPerKg: number = H2_AU.kmPerKgTypical) => pricePerKg / kmPerKg;
