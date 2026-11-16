"use client";

import { useState } from "react";

const US_GAL_L = 3.785411784;
const UK_GAL_L = 4.54609;
const KM_PER_MILE = 1.609344;
/** L/100km = K ÷ MPG */
const K_US = (100 * US_GAL_L) / KM_PER_MILE; // 235.215
const K_UK = (100 * UK_GAL_L) / KM_PER_MILE; // 282.481

type Field = "l100" | "usMpg" | "ukMpg" | "kmL";

function fromL100(l100: number): Record<Field, number> {
  return { l100, usMpg: K_US / l100, ukMpg: K_UK / l100, kmL: 100 / l100 };
}

function toL100(field: Field, v: number): number {
  switch (field) {
    case "l100":
      return v;
    case "usMpg":
      return K_US / v;
    case "ukMpg":
      return K_UK / v;
    case "kmL":
      return 100 / v;
  }
}

const LABELS: Record<Field, string> = {
  l100: "L/100km",
  usMpg: "US MPG",
  ukMpg: "UK (imperial) MPG",
  kmL: "km per litre",
};

/** Four-way fuel economy converter: edit any box and the others follow. */
export default function EconomyConverter() {
  const [values, setValues] = useState<Record<Field, string>>(() => {
    const v = fromL100(7.5);
    return { l100: "7.5", usMpg: v.usMpg.toFixed(1), ukMpg: v.ukMpg.toFixed(1), kmL: v.kmL.toFixed(2) };
  });

  const onChange = (field: Field, raw: string) => {
    const n = parseFloat(raw);
    if (!(n > 0)) {
      setValues((prev) => ({ ...prev, [field]: raw }));
      return;
    }
    const all = fromL100(toL100(field, n));
    setValues({
      l100: field === "l100" ? raw : all.l100.toFixed(2),
      usMpg: field === "usMpg" ? raw : all.usMpg.toFixed(1),
      ukMpg: field === "ukMpg" ? raw : all.ukMpg.toFixed(1),
      kmL: field === "kmL" ? raw : all.kmL.toFixed(2),
    });
  };

  return (
    <div className="not-prose my-8 rounded-2xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950 p-5">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Fuel economy converter</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Type in any box — the other three update.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(LABELS) as Field[]).map((f) => (
          <div key={f}>
            <label htmlFor={`conv-${f}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {LABELS[f]}
            </label>
            <input
              id={`conv-${f}`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              value={values[f]}
              onChange={(e) => onChange(f, e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-700 dark:text-gray-300 mt-3">
        L/100km = 235.215 ÷ US MPG = 282.481 ÷ UK MPG = 100 ÷ km/L.
      </p>
    </div>
  );
}
