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

export const CARRIER_SURCHARGES_CHECKED = "17 November 2026";

export const CARRIER_SURCHARGES: CarrierSurcharge[] = [
  {
    id: "tge-pallet",
    carrier: "Team Global Express",
    service: "Palletised Express",
    percent: 41.45,
    period: "from 16 November 2026 (weekly)",
    basis: "Diesel, AIP national average",
    url: "https://teamglobalexp.com/fuel-surcharge",
  },
  {
    id: "tge-road",
    carrier: "Team Global Express",
    service: "Express Parcels Road",
    percent: 29.23,
    period: "from 16 November 2026 (weekly)",
    basis: "Diesel, AIP national average",
    url: "https://teamglobalexp.com/fuel-surcharge",
  },
  {
    id: "tge-air",
    carrier: "Team Global Express",
    service: "Express Parcels Air",
    percent: 28.61,
    period: "from 16 November 2026 (weekly)",
    basis: "Diesel and jet fuel blend",
    url: "https://teamglobalexp.com/fuel-surcharge",
  },
  {
    id: "startrack",
    carrier: "StarTrack",
    service: "Express and Premium",
    percent: 24.2,
    period: "November 2026 (28 Oct – 24 Nov); 24.7% from 25 Nov",
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
