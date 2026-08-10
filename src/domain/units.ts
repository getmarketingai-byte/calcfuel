/**
 * Unit and currency primitives for CalcFuel transport/trip calculations.
 * All decision models accept either metric or imperial inputs; conversions
 * are explicit so UI can persist preferences without baking units into formulas.
 */

export type UnitSystem = "metric" | "imperial";

export type CurrencyCode = "USD" | "AUD" | "CAD" | "GBP" | "EUR" | "NZD";

/** Litres per US gallon (exact regulatory conversion used across US fuel retail). */
export const LITRES_PER_US_GALLON = 3.785411784;

export const KM_PER_MILE = 1.609344;

export const NM_PER_KM = 1 / 1.852;

/** MPG ↔ L/100km constant: 235.215 ≈ 100 * LITRES_PER_US_GALLON / KM_PER_MILE */
export const MPG_L100_FACTOR = 235.214583;

export function milesToKm(miles: number): number {
  return miles * KM_PER_MILE;
}

export function kmToMiles(km: number): number {
  return km / KM_PER_MILE;
}

export function gallonsToLitres(gallons: number): number {
  return gallons * LITRES_PER_US_GALLON;
}

export function litresToGallons(litres: number): number {
  return litres / LITRES_PER_US_GALLON;
}

/** Convert L/100km → MPG (US). */
export function lPer100kmToMpg(lPer100km: number): number {
  if (lPer100km <= 0) return 0;
  return MPG_L100_FACTOR / lPer100km;
}

/** Convert MPG (US) → L/100km. */
export function mpgToLPer100km(mpg: number): number {
  if (mpg <= 0) return 0;
  return MPG_L100_FACTOR / mpg;
}

/** Nautical miles → km. */
export function nmToKm(nm: number): number {
  return nm * 1.852;
}

/** km → nautical miles. */
export function kmToNm(km: number): number {
  return km * NM_PER_KM;
}

export function knotsToKmh(knots: number): number {
  return knots * 1.852;
}

export function kmhToKnots(kmh: number): number {
  return kmh / 1.852;
}
