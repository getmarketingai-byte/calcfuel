"use client";

import { useEffect, useState } from "react";
import type { UnitSystem } from "@/domain/units";
import { loadPreferences, savePreferences } from "@/domain/preferences";

/** Persist metric/imperial preference across calculators (Phase 3 prefs). */
export function usePersistedUnit(fallback: UnitSystem = "metric"): [UnitSystem, (next: UnitSystem) => void] {
  const [unit, setUnitState] = useState<UnitSystem>(fallback);

  useEffect(() => {
    const prefs = loadPreferences();
    setUnitState(prefs.unitSystem);
  }, []);

  const setUnit = (next: UnitSystem) => {
    setUnitState(next);
    const prefs = loadPreferences();
    savePreferences({ ...prefs, unitSystem: next });
  };

  return [unit, setUnit];
}
