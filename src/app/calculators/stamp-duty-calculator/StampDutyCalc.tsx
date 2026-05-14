"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type StateCode = "NSW" | "VIC" | "QLD" | "WA" | "SA" | "ACT" | "TAS" | "NT";

function calcNSW(value: number, isFHB: boolean): number {
  if (isFHB && value <= 650000) return 0;
  let duty: number;
  if (value <= 16000) duty = value * 0.0125;
  else if (value <= 35000) duty = 200 + (value - 16000) * 0.015;
  else if (value <= 93000) duty = 485 + (value - 35000) * 0.0175;
  else if (value <= 351000) duty = 1500 + (value - 93000) * 0.035;
  else if (value <= 1168000) duty = 10530 + (value - 351000) * 0.045;
  else duty = 47295 + (value - 1168000) * 0.055;

  if (isFHB && value <= 800000) {
    const fullDuty = duty;
    const reduction = fullDuty * ((800000 - value) / 150000);
    duty = fullDuty - reduction;
  }
  return duty;
}

function calcVIC(value: number, isFHB: boolean): number {
  if (isFHB && value <= 600000) return 0;
  let duty: number;
  if (value <= 25000) duty = value * 0.014;
  else if (value <= 130000) duty = 350 + (value - 25000) * 0.024;
  else if (value <= 440000) duty = 2870 + (value - 130000) * 0.05;
  else if (value <= 550000) duty = 18370 + (value - 440000) * 0.06;
  else duty = 24970 + (value - 550000) * 0.065;

  if (isFHB && value <= 750000) {
    const fullDuty = duty;
    const reduction = fullDuty * ((750000 - value) / 150000);
    duty = fullDuty - reduction;
  }
  return duty;
}

function calcQLD(value: number, isFHB: boolean): number {
  let duty: number;
  if (value <= 5000) duty = value * 0.015;
  else if (value <= 75000) duty = 75 + (value - 5000) * 0.02;
  else if (value <= 540000) duty = 1475 + (value - 75000) * 0.035;
  else if (value <= 1000000) duty = 17750 + (value - 540000) * 0.045;
  else duty = 38450 + (value - 1000000) * 0.0575;

  // QLD FHB concession: homes under $500k get full concession; $500k-$550k partial
  if (isFHB) {
    if (value <= 500000) duty = 0;
    else if (value <= 550000) duty = duty * ((value - 500000) / 50000);
  }
  return duty;
}

function calcWA(value: number): number {
  if (value <= 120000) return value * 0.019;
  if (value <= 150000) return 2280 + (value - 120000) * 0.0285;
  if (value <= 360000) return 3135 + (value - 150000) * 0.038;
  if (value <= 725000) return 11115 + (value - 360000) * 0.0475;
  return 28453 + (value - 725000) * 0.0515;
}

function calcSA(value: number): number {
  if (value <= 12000) return value * 0.01;
  if (value <= 30000) return 120 + (value - 12000) * 0.02;
  if (value <= 50000) return 480 + (value - 30000) * 0.03;
  if (value <= 100000) return 1080 + (value - 50000) * 0.035;
  if (value <= 200000) return 2830 + (value - 100000) * 0.04;
  if (value <= 250000) return 6830 + (value - 200000) * 0.0425;
  if (value <= 300000) return 8955 + (value - 250000) * 0.0475;
  return 11330 + (value - 300000) * 0.055;
}

function calcACT(value: number): number {
  if (value <= 200000) return 0;
  if (value <= 500000) return (value - 200000) * 0.03;
  if (value <= 1000000) return 9000 + (value - 500000) * 0.0422;
  return 30100 + (value - 1000000) * 0.046;
}

function calcTAS(value: number): number {
  if (value <= 3000) return 50;
  if (value <= 25000) return 50 + (value - 3000) * 0.015;
  if (value <= 75000) return 380 + (value - 25000) * 0.0225;
  if (value <= 200000) return 1505 + (value - 75000) * 0.035;
  if (value <= 375000) return 5880 + (value - 200000) * 0.04;
  if (value <= 725000) return 12880 + (value - 375000) * 0.0425;
  return 27755 + (value - 725000) * 0.045;
}

function calcNT(value: number): number {
  // NT uses a unique duty calculation; simplified progressive
  if (value <= 525000) return value * 0.015;
  if (value <= 3000000) return value * 0.0495;
  return value * 0.0675;
}

function calcStampDuty(value: number, state: StateCode, isFHB: boolean): number {
  switch (state) {
    case "NSW": return calcNSW(value, isFHB);
    case "VIC": return calcVIC(value, isFHB);
    case "QLD": return calcQLD(value, isFHB);
    case "WA": return calcWA(value);
    case "SA": return calcSA(value);
    case "ACT": return calcACT(value);
    case "TAS": return calcTAS(value);
    case "NT": return calcNT(value);
    default: return 0;
  }
}

const STATES: { code: StateCode; name: string }[] = [
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "TAS", name: "Tasmania" },
  { code: "NT", name: "Northern Territory" },
];

export default function StampDutyCalc() {
  const [propertyValue, setPropertyValue] = useState("");
  const [state, setState] = useState<StateCode>("NSW");
  const [isFHB, setIsFHB] = useState(false);
  const [isPPR, setIsPPR] = useState(true);
  const [dutyAmount, setDutyAmount] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const val = parseFloat(propertyValue.replace(/,/g, ""));
      if (!propertyValue || isNaN(val) || val <= 0) {
        setDutyAmount(null);
        return;
      }
      const duty = calcStampDuty(val, state, isFHB);
      setDutyAmount(duty);
      trackCalculation("stamp_duty", {
        property_value: val,
        state,
        is_fhb: isFHB ? "yes" : "no",
        duty_amount: duty,
      });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [propertyValue, state, isFHB, isPPR]);

  const parsedValue = parseFloat(propertyValue.replace(/,/g, "")) || 0;
  const effectiveRate = parsedValue > 0 && dutyAmount !== null ? (dutyAmount / parsedValue) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Stamp Duty</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property value (AUD)</label>
          <input
            type="text"
            inputMode="decimal"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            placeholder="e.g. 750000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State / Territory</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as StateCode)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mb-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isFHB}
            onChange={(e) => setIsFHB(e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          First Home Buyer
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isPPR}
            onChange={(e) => setIsPPR(e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          Principal Place of Residence
        </label>
      </div>

      {dutyAmount !== null && (
        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Stamp Duty</p>
              <p className="text-2xl font-bold text-orange-500">{fmt(dutyAmount)}</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Effective Rate</p>
              <p className="text-2xl font-bold text-blue-600">{effectiveRate.toFixed(2)}%</p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total Purchase Cost</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(parsedValue + dutyAmount)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estimate only. Stamp duty rates are approximate and subject to change. Verify with your state revenue office before settlement. This estimate does not include mortgage registration fees, title transfer fees, or other government charges.
          </p>
        </div>
      )}
    </div>
  );
}
