"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_DIESEL_INPUT, DEFAULT_PETROL_INPUT } from "@/lib/fuel-prices";
import { trackCalculationPerformed } from "@/lib/analytics";

export interface ComparerPreset {
  label: string;
  /** Combined consumption in L/100km, as stated on the page that supplies it. */
  l100: number;
  fuel: "petrol" | "diesel";
}

type Scale = "l100" | "mpg_us" | "mpg_uk";

interface Side {
  label: string;
  value: string;
  scale: Scale;
  fuel: "petrol" | "diesel";
}

const toL100 = (v: number, scale: Scale) =>
  scale === "l100" ? v : scale === "mpg_us" ? 235.215 / v : 282.481 / v;

const money = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
const money2 = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const field =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

/**
 * Two-vehicle fuel cost comparison at the current ACCC five-city prices. Accepts
 * L/100km or MPG (US or UK) on either side, so a figure copied from anywhere can be
 * compared on the same basis.
 */
export default function FuelCostComparer({
  id,
  presets = [],
  initialA,
  initialB,
  title = "Compare two vehicles at today’s fuel prices",
}: {
  id: string;
  presets?: ComparerPreset[];
  initialA: ComparerPreset;
  initialB: ComparerPreset;
  title?: string;
}) {
  const [a, setA] = useState<Side>({ label: initialA.label, value: String(initialA.l100), scale: "l100", fuel: initialA.fuel });
  const [b, setB] = useState<Side>({ label: initialB.label, value: String(initialB.l100), scale: "l100", fuel: initialB.fuel });
  const [km, setKm] = useState("15000");
  const [petrol, setPetrol] = useState(DEFAULT_PETROL_INPUT);
  const [diesel, setDiesel] = useState(DEFAULT_DIESEL_INPUT);
  const tracked = useRef(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const price = (fuel: "petrol" | "diesel") => parseFloat(fuel === "diesel" ? diesel : petrol);
  const calc = (s: Side) => {
    const v = parseFloat(s.value);
    if (!(v > 0)) return null;
    const l100 = toL100(v, s.scale);
    const p = price(s.fuel);
    if (!(p > 0)) return null;
    const per100 = l100 * p;
    const annual = (per100 * (parseFloat(km) || 0)) / 100;
    return { l100, per100, annual };
  };
  const ra = calc(a);
  const rb = calc(b);
  const diff = ra && rb ? ra.annual - rb.annual : null;

  const interacted = useRef(false);
  useEffect(() => {
    if (!interacted.current || !ra || !rb) return;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      trackCalculationPerformed(id, {
        annual_km: parseFloat(km) || 0,
        a_l100: Number(ra.l100.toFixed(1)),
        b_l100: Number(rb.l100.toFixed(1)),
        annual_difference: Math.round(Math.abs(diff ?? 0)),
        first_interaction: !tracked.current,
      });
      tracked.current = true;
    }, 800);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [a, b, km, petrol, diesel]); // eslint-disable-line react-hooks/exhaustive-deps

  const touch = <T,>(fn: (v: T) => void) => (v: T) => {
    interacted.current = true;
    fn(v);
  };

  const sideEditor = (s: Side, set: (v: Side) => void, name: string) => (
    <fieldset className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
      <legend className="px-1 text-sm font-semibold text-gray-900 dark:text-white">{name}</legend>
      {presets.length > 0 ? (
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Pick from this page
          <select
            className={field + " mt-1"}
            value=""
            onChange={(e) => {
              const p = presets[Number(e.target.value)];
              if (p) touch(set)({ label: p.label, value: String(p.l100), scale: "l100", fuel: p.fuel });
            }}
          >
            <option value="">Choose a vehicle…</option>
            {presets.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label} — {p.l100} L/100km {p.fuel}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="block text-sm text-gray-700 dark:text-gray-300">
        Name
        <input className={field + " mt-1"} value={s.label} onChange={(e) => touch(set)({ ...s, label: e.target.value })} />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Fuel use
          <input
            className={field + " mt-1"}
            inputMode="decimal"
            value={s.value}
            onChange={(e) => touch(set)({ ...s, value: e.target.value })}
          />
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Unit
          <select className={field + " mt-1"} value={s.scale} onChange={(e) => touch(set)({ ...s, scale: e.target.value as Scale })}>
            <option value="l100">L/100km</option>
            <option value="mpg_us">MPG (US)</option>
            <option value="mpg_uk">MPG (UK)</option>
          </select>
        </label>
      </div>
      <label className="block text-sm text-gray-700 dark:text-gray-300">
        Fuel
        <select className={field + " mt-1"} value={s.fuel} onChange={(e) => touch(set)({ ...s, fuel: e.target.value as "petrol" | "diesel" })}>
          <option value="petrol">Petrol (unleaded)</option>
          <option value="diesel">Diesel</option>
        </select>
      </label>
    </fieldset>
  );

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="not-prose rounded-2xl border-2 border-orange-300 dark:border-orange-800 bg-white dark:bg-gray-900 p-5 my-8"
      data-calculator={id}
    >
      <h2 id={`${id}-title`} className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {title}
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Enter any two consumption figures — L/100km or MPG — and your yearly distance. Prices start at the
        latest ACCC five-city averages; change them to your local price.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {sideEditor(a, setA, "Vehicle A")}
        {sideEditor(b, setB, "Vehicle B")}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Km per year
          <input className={field + " mt-1"} inputMode="numeric" value={km} onChange={(e) => touch(setKm)(e.target.value)} />
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Petrol $/L
          <input className={field + " mt-1"} inputMode="decimal" value={petrol} onChange={(e) => touch(setPetrol)(e.target.value)} />
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Diesel $/L
          <input className={field + " mt-1"} inputMode="decimal" value={diesel} onChange={(e) => touch(setDiesel)(e.target.value)} />
        </label>
      </div>
      <div className="grid md:grid-cols-3 gap-3 mt-5" aria-live="polite">
        {[{ s: a, r: ra }, { s: b, r: rb }].map(({ s, r }, i) => (
          <div key={i} className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">{s.label || (i ? "Vehicle B" : "Vehicle A")}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{r ? money(r.annual) : "—"}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {r ? `${r.l100.toFixed(1)} L/100km · ${money2(r.per100)} per 100 km` : "Enter a figure"}
            </p>
          </div>
        ))}
        <div className="rounded-xl bg-orange-50 dark:bg-orange-950 p-4">
          <p className="text-xs text-gray-600 dark:text-gray-300">Difference per year</p>
          <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{diff !== null ? money(Math.abs(diff)) : "—"}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {diff !== null && ra && rb
              ? diff === 0
                ? "Same fuel cost"
                : `${(diff > 0 ? b : a).label || "The second"} is cheaper · ${money(Math.abs(diff) * 5)} over 5 years`
              : ""}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Fuel cost only — no servicing, rego, insurance or depreciation. MPG (US) converts with 235.215 ÷ MPG; MPG (UK)
        with 282.481 ÷ MPG.
      </p>
    </section>
  );
}
