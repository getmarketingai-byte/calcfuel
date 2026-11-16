"use client";

import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { DEFAULT_PETROL_INPUT } from "@/lib/fuel-prices";
import { trackCalculation } from "@/lib/analytics";

const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-AU");

/**
 * Upgrade payback: what a more fuel-efficient car saves each year, and how long the
 * saving takes to repay any extra purchase price.
 */
export default function UpgradePaybackCalc() {
  const [currentL, setCurrentL] = useState("9.8");
  const [newL, setNewL] = useState("6.5");
  const [km, setKm] = useState("15000");
  const [price, setPrice] = useState(DEFAULT_PETROL_INPUT);
  const [premium, setPremium] = useState("4000");
  const [years, setYears] = useState("5");
  const tracked = useRef<ReturnType<typeof setTimeout> | null>(null);

  const r = useMemo(() => {
    const a = parseFloat(currentL);
    const b = parseFloat(newL);
    const d = parseFloat(km);
    const p = parseFloat(price);
    const extra = parseFloat(premium) || 0;
    const y = parseFloat(years) || 0;
    if (!(a > 0) || !(b > 0) || !(d > 0) || !(p > 0)) return null;
    const litresSaved = (d / 100) * (a - b);
    const annual = litresSaved * p;
    const payback = annual > 0 && extra > 0 ? extra / annual : null;
    const net = annual * y - extra;
    return { litresSaved, annual, payback, net, perWeek: annual / 52 };
  }, [currentL, newL, km, price, premium, years]);

  useEffect(() => {
    if (!r) return;
    if (tracked.current) clearTimeout(tracked.current);
    tracked.current = setTimeout(() => {
      trackCalculation("fuel_economy_savings", {
        mode: "upgrade_payback",
        annual_saving: Math.round(r.annual),
        payback_years: r.payback ? parseFloat(r.payback.toFixed(1)) : 0,
      });
    }, 800);
    return () => {
      if (tracked.current) clearTimeout(tracked.current);
    };
  }, [r]);

  const field = (id: string, label: string, value: string, set: (v: string) => void, step = "0.1") => (
    <div>
      <label className={labelClass} htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode="decimal" min="0" step={step} value={value} onChange={(e) => set(e.target.value)} className={inputClass} />
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upgrade payback calculator</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
        Your current car&rsquo;s real fuel use against the car you are considering. Petrol starts at the latest ACCC five-city
        average.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {field("up-current", "Current car (L/100km)", currentL, setCurrentL)}
        {field("up-new", "Car you are considering (L/100km)", newL, setNewL)}
        {field("up-km", "Kilometres per year", km, setKm, "500")}
        {field("up-price", "Fuel price ($/L)", price, setPrice, "0.001")}
        {field("up-premium", "Extra you would pay for it ($, optional)", premium, setPremium, "100")}
        {field("up-years", "Years you will keep it", years, setYears, "1")}
      </div>
      {r && (
        <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Fuel saving per year</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{money(r.annual)}</p>
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{Math.round(r.litresSaved).toLocaleString("en-AU")} litres, about {money(r.perWeek)} a week</p>
          </div>
          <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Payback on the extra price</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {r.payback === null ? "—" : `${r.payback.toFixed(1)} years`}
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
              {r.annual <= 0 ? "The car you are considering uses more fuel." : r.payback === null ? "Enter a price difference to see payback." : "Fuel only, before finance, insurance or resale."}
            </p>
          </div>
          <div className="p-4 rounded-xl border bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 sm:col-span-2">
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">Net over {years || 0} years (fuel saved − extra price)</p>
            <p className={"text-2xl font-bold " + (r.net >= 0 ? "text-green-700 dark:text-green-300" : "text-red-600")}>{r.net >= 0 ? "" : "−"}{money(Math.abs(r.net))}</p>
          </div>
        </div>
      )}
    </div>
  );
}
