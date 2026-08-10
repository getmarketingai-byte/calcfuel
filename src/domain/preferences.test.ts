import { describe, expect, it } from "vitest";
import {
  DEFAULT_PREFERENCES,
  loadAssets,
  loadPreferences,
  saveAssets,
  savePreferences,
  type UserAsset,
} from "./preferences";
import { lPer100kmToMpg, mpgToLPer100km } from "./units";

function memoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
  };
}

describe("preferences", () => {
  it("returns defaults when empty", () => {
    expect(loadPreferences(memoryStorage())).toEqual(DEFAULT_PREFERENCES);
  });

  it("round-trips unit and currency", () => {
    const storage = memoryStorage();
    savePreferences({ unitSystem: "imperial", currency: "AUD" }, storage);
    expect(loadPreferences(storage)).toEqual({
      unitSystem: "imperial",
      currency: "AUD",
    });
  });

  it("round-trips UserAsset sketches", () => {
    const storage = memoryStorage();
    const assets: UserAsset[] = [
      { id: "1", name: "Tinnie", type: "boat", efficiency: 18, tankCapacity: 60 },
    ];
    saveAssets(assets, storage);
    expect(loadAssets(storage)).toEqual(assets);
  });
});

describe("efficiency conversions", () => {
  it("round-trips MPG ↔ L/100km approximately", () => {
    const mpg = 30;
    const l100 = mpgToLPer100km(mpg);
    expect(lPer100kmToMpg(l100)).toBeCloseTo(mpg, 5);
  });
});
