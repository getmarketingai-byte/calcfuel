/**
 * TowingTrip decision model — towing / caravan fuel cost.
 */

import type { UnitSystem } from "../units";
import {
  applyTowingPenalty,
  fuelCost,
  fuelUsed,
} from "../calculations/primitives";
import { mpgToLPer100km } from "../units";

/**
 * Published Australian sources for towing fuel increases. Every preset below cites one of
 * these; when the sources disagree, the preset sits inside their range and the page says so.
 */
export const TOWING_SOURCES = {
  autospeed: {
    name: "AutoSpeed (Julian Edgar), \"Trailers that drink fuel\"",
    date: "22 January 2008",
    url: "https://blog.autospeed.com/2008/01/22/trailers-that-drink-fuel/",
    finding: "Empty 6×4 box trailer behind a Peugeot 405 diesel: consumption up 20–30%.",
  },
  practicalMotoring: {
    name: "Practical Motoring (Dean Mellor), \"How to calculate fuel consumption the right way\"",
    date: "29 January 2019",
    url: "https://practicalmotoring.com.au/car-advice/how-to-calculate-fuel-consumption-the-right-way/",
    finding: "Depending on vehicle, trailer and conditions, towing consumption can be more than 30% higher than solo.",
  },
  austrack: {
    name: "Austrack Campers, \"How to save fuel when travelling with a caravan or camper trailer\"",
    date: "accessed 17 November 2026",
    url: "https://www.austrackcampers.com.au/how-to-save-fuel-when-travelling-with-a-caravan-or-camper-trailer-in-australia/",
    finding: "Towing a caravan can increase fuel use by 30–50%.",
  },
  ccsOutback: {
    name: "caravancampingsales.com.au, \"Tow Test Subaru Outback 2015\"",
    date: "18 June 2015",
    url: "https://www.caravancampingsales.com.au/editorial/details/tow-test-subaru-outback-2015-51947/",
    finding: "Outback 3.6R towing a ~1,600 kg caravan settled around 19 L/100km at 80–90 km/h — \"around double\" its solo figure.",
  },
  cwPajero: {
    name: "Caravan World, \"Tow Test: NW Mitsubishi Pajero Exceed Di-D\"",
    date: "17 December 2013",
    url: "https://caravanworld.com.au/blogs/reviews/tow-test-nw-mitubishi-pajero-exceed-di-d-review",
    finding: "Towing a 2,400 kg van on the Stuart Highway: 21–24 L/100km, against 10–11 L/100km unhitched.",
  },
  cwPopTop: {
    name: "Caravan World, \"Caravan vs pop-top fuel test\"",
    date: "3 December 2014",
    url: "https://caravanworld.com.au/blogs/reviews/caravan-vs-pop-top-fuel-test",
    finding: "Otherwise-identical 5.95 m Coronet vans: full-height averaged 15.07 L/100km, pop-top 14.37 — about 0.7 L/100km (5%) more.",
  },
  racv: {
    name: "RACV, \"How to tow a caravan: a beginner's guide\"",
    date: "accessed 17 November 2026",
    url: "https://www.racv.com.au/royalauto/transport/caravans-trailers/towing-for-beginners-what-to-know.html",
    finding: "Size and shape, speed, weight, terrain and wind all affect towing fuel use; dropping from 110 to 90 km/h can save several L/100km. No single percentage is given.",
  },
} as const;

export type TowingSourceId = keyof typeof TOWING_SOURCES;

export const TRAILER_PENALTIES = [
  {
    id: "light",
    label: "Box / utility trailer",
    penaltyPercent: 25,
    sources: ["autospeed"] as TowingSourceId[],
    basis: "Middle of the 20–30% AutoSpeed measured with an empty 6×4 trailer.",
  },
  {
    id: "boat",
    label: "Boat on trailer",
    penaltyPercent: 25,
    sources: ["autospeed"] as TowingSourceId[],
    basis: "No published Australian boat-trailer test found; starts at the box-trailer figure. Measure your own.",
  },
  {
    id: "camper",
    label: "Camper trailer",
    penaltyPercent: 30,
    sources: ["practicalMotoring", "austrack"] as TowingSourceId[],
    basis: "Low end of the 30–50% published guidance.",
  },
  {
    id: "caravan",
    label: "Caravan (pop-top or full-height)",
    penaltyPercent: 40,
    sources: ["practicalMotoring", "austrack", "cwPopTop"] as TowingSourceId[],
    basis: "Middle of the 30–50% published guidance; pop-top vs full-height measured only ~5% apart.",
  },
  {
    id: "large",
    label: "Heavy van at highway speed (measured tests)",
    penaltyPercent: 100,
    sources: ["ccsOutback", "cwPajero"] as TowingSourceId[],
    basis: "Two published tow tests of 1,600–2,400 kg vans found consumption roughly doubled.",
  },
] as const;

export interface TowingTripInput {
  unit: UnitSystem;
  distance: number;
  /** Solo (untowed) efficiency: MPG or L/100km. */
  baseEfficiency: number;
  fuelPrice: number;
  /** Percentage penalty (e.g. 24 for typical caravan). */
  penaltyPercent: number;
}

export interface TowingTripResult {
  penaltyPercent: number;
  effectiveEfficiency: number;
  /** Effective L/100km for display (always computed). */
  effectiveLPer100km: number;
  normalFuel: number;
  normalCost: number;
  towingFuel: number;
  towingCost: number;
  extraFuel: number;
  extraCost: number;
}

export function calculateTowingTrip(input: TowingTripInput): TowingTripResult | null {
  const { unit, distance, baseEfficiency, fuelPrice, penaltyPercent } = input;

  if (distance <= 0 || baseEfficiency <= 0 || fuelPrice < 0 || penaltyPercent < 0) {
    return null;
  }

  const effectiveEfficiency = applyTowingPenalty(baseEfficiency, penaltyPercent, unit);
  const normalFuel = fuelUsed(distance, baseEfficiency, unit);
  const towingFuel = fuelUsed(distance, effectiveEfficiency, unit);
  const normalCost = fuelCost(normalFuel, fuelPrice);
  const towingCost = fuelCost(towingFuel, fuelPrice);

  const effectiveLPer100km =
    unit === "metric" ? effectiveEfficiency : mpgToLPer100km(effectiveEfficiency);

  return {
    penaltyPercent,
    effectiveEfficiency,
    effectiveLPer100km,
    normalFuel,
    normalCost,
    towingFuel,
    towingCost,
    extraFuel: towingFuel - normalFuel,
    extraCost: towingCost - normalCost,
  };
}
