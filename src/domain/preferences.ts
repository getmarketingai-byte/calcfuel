import type { CurrencyCode, UnitSystem } from "./units";

export interface UserPreferences {
  unitSystem: UnitSystem;
  currency: CurrencyCode;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  unitSystem: "metric",
  currency: "USD",
};

export const PREFS_STORAGE_KEY = "calcfuel.prefs.v1";

export function loadPreferences(
  storage: Pick<Storage, "getItem"> | null | undefined = typeof window !== "undefined" ? window.localStorage : null
): UserPreferences {
  if (!storage) return { ...DEFAULT_PREFERENCES };
  try {
    const raw = storage.getItem(PREFS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    return {
      unitSystem: parsed.unitSystem === "imperial" ? "imperial" : "metric",
      currency: isCurrency(parsed.currency) ? parsed.currency : DEFAULT_PREFERENCES.currency,
    };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(
  prefs: UserPreferences,
  storage: Pick<Storage, "setItem"> | null | undefined = typeof window !== "undefined" ? window.localStorage : null
): void {
  if (!storage) return;
  storage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
}

function isCurrency(value: unknown): value is CurrencyCode {
  return (
    value === "USD" ||
    value === "AUD" ||
    value === "CAD" ||
    value === "GBP" ||
    value === "EUR" ||
    value === "NZD"
  );
}

/**
 * Sketch of a user-owned vehicle/boat/trailer asset (local-only, no auth).
 * Used later for prefilling decision models; not wired to UI in Phase 3.
 */
export type AssetType = "boat" | "vehicle" | "motorcycle" | "caravan" | "trailer";

export interface UserAsset {
  id: string;
  name: string;
  type: AssetType;
  /** Efficiency in L/100km (road) or L/h burn (marine), depending on type. */
  efficiency?: number;
  tankCapacity?: number;
  notes?: string;
}

export const ASSETS_STORAGE_KEY = "calcfuel.assets.v1";

export function loadAssets(
  storage: Pick<Storage, "getItem"> | null | undefined = typeof window !== "undefined" ? window.localStorage : null
): UserAsset[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(ASSETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UserAsset[]) : [];
  } catch {
    return [];
  }
}

export function saveAssets(
  assets: UserAsset[],
  storage: Pick<Storage, "setItem"> | null | undefined = typeof window !== "undefined" ? window.localStorage : null
): void {
  if (!storage) return;
  storage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(assets));
}
