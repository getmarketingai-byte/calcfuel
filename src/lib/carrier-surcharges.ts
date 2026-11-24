/**
 * Published Australian carrier fuel surcharges, transcribed from each carrier's own page.
 * Carriers publish these as a percentage added to the freight charge (before GST), refreshed
 * weekly (TGE) or monthly (Australia Post, StarTrack). Re-transcribe when a period rolls over.
 */
export interface CarrierSurcharge {
  id: string;
  carrier: string;
  service: string;
  percent: number;
  period: string;
  basis: string;
  url: string;
}

export const CARRIER_SURCHARGES_CHECKED = "25 November 2026";

export const CARRIER_SURCHARGES: CarrierSurcharge[] = [
  {
    id: "tge-pallet",
    carrier: "Team Global Express",
    service: "Palletised Express",
    percent: 40.27,
    period: "from 23 November 2026 (weekly)",
    basis: "Diesel, AIP national average",
    url: "https://teamglobalexp.com/fuel-surcharge",
  },
  {
    id: "tge-road",
    carrier: "Team Global Express",
    service: "Express Parcels Road",
    percent: 28.40,
    period: "from 23 November 2026 (weekly)",
    basis: "Diesel, AIP national average",
    url: "https://teamglobalexp.com/fuel-surcharge",
  },
  {
    id: "tge-air",
    carrier: "Team Global Express",
    service: "Express Parcels Air",
    percent: 28.97,
    period: "from 23 November 2026 (weekly)",
    basis: "Diesel and jet fuel blend",
    url: "https://teamglobalexp.com/fuel-surcharge",
  },
  {
    id: "startrack",
    carrier: "StarTrack",
    service: "Express and Premium",
    percent: 24.7,
    period: "December 2026 (25 Nov – 29 Dec)",
    basis: "StarTrack's estimate of its direct and indirect fuel costs",
    url: "https://auspost.com.au/business/shipping/parcels/startrack/pricing-updates",
  },
  {
    id: "auspost",
    carrier: "Australia Post",
    service: "Parcel services (business contracts)",
    percent: 13.5,
    period: "November 2026; 14.0% in December",
    basis: "Australia Post's estimate of its direct and indirect fuel costs",
    url: "https://auspost.com.au/business/shipping/postage-costs/fuel-surcharge",
  },
];
