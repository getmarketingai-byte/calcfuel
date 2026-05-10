"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type State = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "ACT" | "NT" | "TAS";
type BuyerType = "owner" | "investor" | "first_home";

interface Bracket {
  min: number;
  max: number;
  base: number;
  rate: number; // per dollar over min
}

// Stamp duty schedules (2024–2025, residential property)
// rate = cents per dollar over the bracket minimum
const SCHEDULES: Record<State, { brackets: Bracket[]; name: string }> = {
  NSW: {
    name: "New South Wales",
    brackets: [
      { min: 0,       max: 17000,   base: 0,      rate: 0.0125 },
      { min: 17000,   max: 35000,   base: 212,    rate: 0.015 },
      { min: 35000,   max: 93000,   base: 482,    rate: 0.0175 },
      { min: 93000,   max: 351000,  base: 1497,   rate: 0.035 },
      { min: 351000,  max: 1168000, base: 10530,  rate: 0.045 },
      { min: 1168000, max: 3505000, base: 47295,  rate: 0.055 },
      { min: 3505000, max: Infinity,base: 175560, rate: 0.07 },
    ],
  },
  VIC: {
    name: "Victoria",
    brackets: [
      { min: 0,      max: 25000,  base: 0,     rate: 0.014 },
      { min: 25000,  max: 130000, base: 350,   rate: 0.024 },
      { min: 130000, max: 960000, base: 2870,  rate: 0.06 },
      { min: 960000, max: Infinity, base: 52670, rate: 0.055 },
    ],
  },
  QLD: {
    name: "Queensland",
    brackets: [
      { min: 0,      max: 5000,   base: 0,    rate: 0 },
      { min: 5000,   max: 75000,  base: 0,    rate: 0.015 },
      { min: 75000,  max: 540000, base: 1050, rate: 0.035 },
      { min: 540000, max: 1000000,base: 17325,rate: 0.045 },
      { min: 1000000,max: Infinity,base: 38025,rate: 0.0575 },
    ],
  },
  WA: {
    name: "Western Australia",
    brackets: [
      { min: 0,      max: 80000,  base: 0,    rate: 0.019 },
      { min: 80000,  max: 100000, base: 1520, rate: 0.0285 },
      { min: 100000, max: 250000, base: 2090, rate: 0.03 },
      { min: 250000, max: 500000, base: 6590, rate: 0.0415 },
      { min: 500000, max: 1000000,base: 16965,rate: 0.0490 },
      { min: 1000000,max: Infinity,base: 41465,rate: 0.0515 },
    ],
  },
  SA: {
    name: "South Australia",
    brackets: [
      { min: 0,      max: 12000,  base: 0,    rate: 0.01 },
      { min: 12000,  max: 30000,  base: 120,  rate: 0.02 },
      { min: 30000,  max: 50000,  base: 480,  rate: 0.03 },
      { min: 50000,  max: 100000, base: 1080, rate: 0.035 },
      { min: 100000, max: 200000, base: 2830, rate: 0.04 },
      { min: 200000, max: 250000, base: 6830, rate: 0.0425 },
      { min: 250000, max: 300000, base: 8955, rate: 0.0450 },
      { min: 300000, max: 500000, base: 11205,rate: 0.0500 },
      { min: 500000, max: Infinity,base: 21205,rate: 0.0550 },
    ],
  },
  ACT: {
    name: "Australian Capital Territory",
    brackets: [
      { min: 0,      max: 260000, base: 0,    rate: 0.0120 },
      { min: 260000, max: 300000, base: 3120, rate: 0.0229 },
      { min: 300000, max: 500000, base: 4036, rate: 0.0314 },
      { min: 500000, max: 750000, base: 10316,rate: 0.0382 },
      { min: 750000, max: 1000000,base: 19866,rate: 0.0439 },
      { min: 1000000,max: 1455000,base: 30841,rate: 0.0549 },
      { min: 1455000,max: Infinity,base: 55810,rate: 0.0470 },
    ],
  },
  NT: {
    name: "Northern Territory",
    brackets: [
      { min: 0,       max: 525000,  base: 0,     rate: 0 }, // handled by formula
      { min: 525000,  max: Infinity, base: 0,    rate: 0 }, // handled by formula
    ],
  },
  TAS: {
    name: "Tasmania",
    brackets: [
      { min: 0,      max: 3000,   base: 50,   rate: 0 },
      { min: 3000,   max: 25000,  base: 50,   rate: 0.0175 },
      { min: 25000,  max: 75000,  base: 435,  rate: 0.0225 },
      { min: 75000,  max: 200000, base: 1560, rate: 0.035 },
      { min: 200000, max: 375000, base: 5935, rate: 0.04 },
      { min: 375000, max: 725000, base: 12935,rate: 0.0425 },
      { min: 725000, max: Infinity,base: 27810,rate: 0.045 },
    ],
  },
};

// NT uses a formula: duty = (0.06571441 * V + 15) * V / 1000  where V = value/1000
function calcNT(value: number): number {
  if (value <= 525000) {
    const v = value / 1000;
    return Math.round((0.06571441 * v + 15) * v / 1000 * 100) / 100;
  }
  // Above $525k: flat rate ~4.95%
  const v = value / 1000;
  return Math.round((0.06571441 * v + 15) * v / 1000 * 100) / 100;
}

function calcBrackets(value: number, brackets: Bracket[]): number {
  for (let i = brackets.length - 1; i >= 0; i--) {
    const b = brackets[i];
    if (value > b.min) {
      return b.base + (value - b.min) * b.rate;
    }
  }
  return 0;
}

// First home buyer concessions (simplified — thresholds as of 2024–2025)
const FHB_RULES: Record<State, { exemptBelow?: number; concessionBelow?: number; concessionNote: string }> = {
  NSW: { exemptBelow: 800000,  concessionBelow: 1000000, concessionNote: "Full exemption below $800K; tapered concession $800K–$1M (new builds or vacant land may differ)" },
  VIC: { exemptBelow: 600000,  concessionBelow: 750000,  concessionNote: "Full exemption below $600K; tapered concession $600K–$750K for established homes. Waived for new builds ≤ $1M." },
  QLD: { exemptBelow: 700000,  concessionBelow: undefined, concessionNote: "First home concession: principal place of residence rate applies (≈ full duty saved on first $700K). Conditions apply." },
  WA:  { exemptBelow: 430000,  concessionBelow: 530000,  concessionNote: "Full exemption below $430K; tapered concession $430K–$530K." },
  SA:  { concessionNote: "No specific first home buyer stamp duty concession in SA as of 2025. First Home Owner Grant ($15K for new builds) available separately." },
  ACT: { concessionNote: "ACT abolished stamp duty for eligible FHBs in the Home Buyer Concession Scheme (income-tested). Conditions apply." },
  NT:  { concessionNote: "NT First Home Owner Discount: 50% concession on duty up to $549K for eligible FHBs. Conditions apply." },
  TAS: { concessionNote: "50% concession on stamp duty for FHBs purchasing an established home for $600K or less." },
};

function calcStampDuty(value: number, state: State, buyerType: BuyerType): {
  duty: number;
  effectiveRate: number;
  concessionApplied: boolean;
  concessionNote: string;
  savings: number;
} {
  let duty: number;

  if (state === "NT") {
    duty = calcNT(value);
  } else {
    duty = calcBrackets(value, SCHEDULES[state].brackets);
  }

  let baseDuty = duty;
  let concessionApplied = false;
  let savings = 0;
  const rules = FHB_RULES[state];

  if (buyerType === "first_home") {
    if (state === "NSW") {
      if (value <= 800000) {
        duty = 0;
        concessionApplied = true;
        savings = baseDuty;
      } else if (value <= 1000000) {
        const reduction = baseDuty * ((1000000 - value) / 200000);
        duty = baseDuty - reduction;
        concessionApplied = true;
        savings = reduction;
      }
    } else if (state === "VIC") {
      if (value <= 600000) {
        duty = 0;
        concessionApplied = true;
        savings = baseDuty;
      } else if (value <= 750000) {
        const reduction = baseDuty * ((750000 - value) / 150000);
        duty = baseDuty - reduction;
        concessionApplied = true;
        savings = reduction;
      }
    } else if (state === "WA") {
      if (value <= 430000) {
        duty = 0;
        concessionApplied = true;
        savings = baseDuty;
      } else if (value <= 530000) {
        const reduction = baseDuty * ((530000 - value) / 100000);
        duty = baseDuty - reduction;
        concessionApplied = true;
        savings = reduction;
      }
    } else if (state === "TAS") {
      if (value <= 600000) {
        duty = baseDuty * 0.5;
        concessionApplied = true;
        savings = baseDuty * 0.5;
      }
    } else if (state === "NT") {
      if (value <= 549000) {
        duty = baseDuty * 0.5;
        concessionApplied = true;
        savings = baseDuty * 0.5;
      }
    }
  }

  duty = Math.max(0, Math.round(duty));
  savings = Math.round(savings);

  return {
    duty,
    effectiveRate: value > 0 ? duty / value : 0,
    concessionApplied,
    concessionNote: rules.concessionNote,
    savings,
  };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

const pct = (n: number) => (n * 100).toFixed(2) + "%";

const STATES: State[] = ["NSW", "VIC", "QLD", "WA", "SA", "ACT", "NT", "TAS"];

export default function StampDutyCalc() {
  const [propertyValue, setPropertyValue] = useState("750000");
  const [state, setState] = useState<State>("NSW");
  const [buyerType, setBuyerType] = useState<BuyerType>("owner");
  const [result, setResult] = useState<ReturnType<typeof calcStampDuty> | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const val = parseFloat(propertyValue);
      if (!propertyValue) { setResult(null); setError(""); return; }
      if (isNaN(val) || val <= 0) { setError("Enter a valid property value."); setResult(null); return; }
      if (val > 50000000) { setError("Enter a property value under $50 million."); setResult(null); return; }
      setError("");
      const res = calcStampDuty(val, state, buyerType);
      setResult(res);
      trackCalculation("stamp_duty_calculator", { propertyValue: val, state, buyerType, duty: res.duty });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [propertyValue, state, buyerType]);

  const inputClass = "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const val = parseFloat(propertyValue) || 0;
  const totalUpfront = val * 0.2 + (result?.duty ?? 0); // 20% deposit + stamp duty

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Stamp Duty Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div className="sm:col-span-2">
          <label className={labelClass}>Property Value (AUD)</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="1"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="e.g. 750000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>State / Territory</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as State)}
            className={inputClass}
          >
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s} — {SCHEDULES[s].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Buyer Type</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full">
            {([
              { value: "owner", label: "Owner-Occupier" },
              { value: "investor", label: "Investor" },
              { value: "first_home", label: "First Home Buyer" },
            ] as { value: BuyerType; label: string }[]).map((bt) => (
              <button
                key={bt.value}
                onClick={() => setBuyerType(bt.value)}
                className={
                  "flex-1 py-2.5 text-xs font-medium transition-colors " +
                  (buyerType === bt.value
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")
                }
              >
                {bt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

      {result && (
        <div aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="col-span-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Stamp Duty Payable</p>
              <p className="text-3xl font-bold text-orange-500">{fmt(result.duty)}</p>
              <p className="mt-2 text-xs text-gray-500">Effective rate: {pct(result.effectiveRate)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">20% Deposit</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(val * 0.2)}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total Upfront</p>
              <p className="text-xl font-bold text-blue-600">{fmt(totalUpfront)}</p>
              <p className="mt-1 text-xs text-gray-400">deposit + duty</p>
            </div>
          </div>

          {result.concessionApplied && result.savings > 0 && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                First Home Buyer Concession Applied — You save {fmt(result.savings)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{result.concessionNote}</p>
            </div>
          )}

          {buyerType === "first_home" && !result.concessionApplied && (
            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                First Home Buyer — {state}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{result.concessionNote}</p>
            </div>
          )}

          {/* All-state comparison */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Stamp Duty Comparison — All States (same property value, {buyerType === "first_home" ? "First Home Buyer" : buyerType === "investor" ? "Investor" : "Owner-Occupier"})
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-500">State</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Stamp Duty</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Rate</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Total Upfront</th>
                  </tr>
                </thead>
                <tbody>
                  {STATES.map((s, i) => {
                    const r = calcStampDuty(val, s, buyerType);
                    const upfront = val * 0.2 + r.duty;
                    return (
                      <tr
                        key={s}
                        className={(i < STATES.length - 1 ? "border-b border-gray-100 dark:border-gray-700 " : "") + (s === state ? "bg-orange-50/50 dark:bg-orange-950/30" : "")}
                      >
                        <td className="px-5 py-2.5 font-medium text-gray-900 dark:text-white">
                          {s}
                          {s === state && <span className="ml-2 text-xs text-orange-500 font-normal">selected</span>}
                          {r.concessionApplied && <span className="ml-1 text-xs text-green-600">FHB ✓</span>}
                        </td>
                        <td className="px-5 py-2.5 text-right font-semibold text-orange-500">{fmt(r.duty)}</td>
                        <td className="px-5 py-2.5 text-right text-gray-600 dark:text-gray-400">{pct(r.effectiveRate)}</td>
                        <td className="px-5 py-2.5 text-right text-blue-600">{fmt(upfront)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Stamp duty rates are based on published schedules for 2024–2025. Rates change periodically — always verify with your state revenue office before settlement. Additional charges (e.g. foreign purchaser surcharge, mortgage registration fees) are not included. For first home buyer concessions, eligibility conditions apply — confirm with a conveyancer or solicitor.
          </p>
        </div>
      )}
    </div>
  );
}
