"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

// ATO fixed rate method: 70c/hr from FY2024-25 onwards (updated from 67c)
const FIXED_RATE_PER_HOUR = 0.70;

// 2025–26 marginal tax rates — Stage 3 cuts (effective 1 July 2024)
const TAX_BRACKETS = [
  { label: "Nil (income $0–$18,200)", value: 0 },
  { label: "16% (income $18,201–$45,000)", value: 0.16 },
  { label: "30% (income $45,001–$135,000)", value: 0.30 },
  { label: "37% (income $135,001–$190,000)", value: 0.37 },
  { label: "45% (income $190,001+)", value: 0.45 },
];

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: decimals });
}

export default function WfhTaxCalc() {
  const [method, setMethod] = useState<"fixed" | "actual">("fixed");
  const [hoursPerWeek, setHoursPerWeek] = useState("3");
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [taxRate, setTaxRate] = useState(0.30);

  // Actual cost method inputs
  const [homeOfficeArea, setHomeOfficeArea] = useState("12");
  const [totalHomeArea, setTotalHomeArea] = useState("120");
  const [annualRentOrMortgage, setAnnualRentOrMortgage] = useState("24000");
  const [annualUtilities, setAnnualUtilities] = useState("3000");
  const [annualInternet, setAnnualInternet] = useState("1200");
  const [annualCleaning, setAnnualCleaning] = useState("0");

  const [result, setResult] = useState<null | {
    method: "fixed" | "actual";
    totalHours: number;
    deduction: number;
    taxSaving: number;
    breakdown: Record<string, number>;
  }>(null);

  const calculate = useCallback(() => {
    const hours = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;
    const totalHours = hours * weeks;

    if (method === "fixed") {
      const deduction = totalHours * FIXED_RATE_PER_HOUR;
      setResult({
        method: "fixed",
        totalHours,
        deduction,
        taxSaving: deduction * taxRate,
        breakdown: { "Fixed rate (70c/hr)": deduction },
      });
      trackCalculation("work-from-home-tax-calculator", {
        method: "fixed", hours_per_week: hours, weeks_per_year: weeks, tax_rate: taxRate,
      });
    } else {
      // Actual cost method
      const floorArea = parseFloat(homeOfficeArea) || 0;
      const totalArea = parseFloat(totalHomeArea) || 0;
      const areaFraction = totalArea > 0 ? floorArea / totalArea : 0;

      const timeFraction = 52 > 0 ? (hours * weeks) / (24 * 7 * 52) : 0;

      const rent = parseFloat(annualRentOrMortgage) || 0;
      const utilities = parseFloat(annualUtilities) || 0;
      const internet = parseFloat(annualInternet) || 0;
      const cleaning = parseFloat(annualCleaning) || 0;

      // Rent/mortgage: area fraction × time fraction (occupancy and usage)
      const rentDeduction = rent * areaFraction * timeFraction;
      // Utilities: area fraction × time fraction
      const utilitiesDeduction = utilities * areaFraction * timeFraction;
      // Internet: proportional to work usage — assume 50% work use
      const internetDeduction = internet * 0.5;
      // Cleaning: area fraction
      const cleaningDeduction = cleaning * areaFraction;

      const deduction = rentDeduction + utilitiesDeduction + internetDeduction + cleaningDeduction;

      setResult({
        method: "actual",
        totalHours,
        deduction,
        taxSaving: deduction * taxRate,
        breakdown: {
          "Rent / mortgage interest": rentDeduction,
          "Utilities (power, gas)": utilitiesDeduction,
          "Internet (50% work use)": internetDeduction,
          "Cleaning": cleaningDeduction,
        },
      });
      trackCalculation("work-from-home-tax-calculator", {
        method: "actual", hours_per_week: hours, weeks_per_year: weeks, tax_rate: taxRate,
      });
    }
  }, [method, hoursPerWeek, weeksPerYear, taxRate, homeOfficeArea, totalHomeArea,
    annualRentOrMortgage, annualUtilities, annualInternet, annualCleaning]);

  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      {/* Method selector */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMethod("fixed")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${method === "fixed" ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
        >
          Fixed Rate Method (70c/hr)
        </button>
        <button
          onClick={() => setMethod("actual")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${method === "actual" ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
        >
          Actual Cost Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Hours Working From Home Per Week</label>
          <input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)}
            className={inputClass} placeholder="3" min="0" max="80" step="0.5" />
        </div>
        <div>
          <label className={labelClass}>Weeks Worked From Home This FY</label>
          <p className="text-xs text-gray-500 mb-1">Max 52. Use 48 if you took 4 weeks off.</p>
          <input type="number" value={weeksPerYear} onChange={e => setWeeksPerYear(e.target.value)}
            className={inputClass} placeholder="48" min="0" max="52" />
        </div>
        <div>
          <label className={labelClass}>Your Marginal Tax Rate</label>
          <select value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))} className={inputClass}>
            {TAX_BRACKETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
      </div>

      {method === "actual" && (
        <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Home Office Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Home Office Floor Area (m²)</label>
              <input type="number" value={homeOfficeArea} onChange={e => setHomeOfficeArea(e.target.value)}
                className={inputClass} placeholder="12" min="0" />
            </div>
            <div>
              <label className={labelClass}>Total Home Floor Area (m²)</label>
              <input type="number" value={totalHomeArea} onChange={e => setTotalHomeArea(e.target.value)}
                className={inputClass} placeholder="120" min="0" />
            </div>
            <div>
              <label className={labelClass}>Annual Rent or Mortgage Interest</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input type="number" value={annualRentOrMortgage} onChange={e => setAnnualRentOrMortgage(e.target.value)}
                  className={inputClass + " pl-6"} placeholder="24000" min="0" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Annual Utilities (electricity, gas)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input type="number" value={annualUtilities} onChange={e => setAnnualUtilities(e.target.value)}
                  className={inputClass + " pl-6"} placeholder="3000" min="0" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Annual Internet Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input type="number" value={annualInternet} onChange={e => setAnnualInternet(e.target.value)}
                  className={inputClass + " pl-6"} placeholder="1200" min="0" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Annual Cleaning Costs</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                <input type="number" value={annualCleaning} onChange={e => setAnnualCleaning(e.target.value)}
                  className={inputClass + " pl-6"} placeholder="0" min="0" />
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={calculate}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Calculate Deduction
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Total WFH hours</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.round(result.totalHours).toLocaleString()}</p>
              <p className="text-xs text-gray-400">this financial year</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Total deduction</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.deduction)}</p>
              <p className="text-xs text-gray-400">claimed in tax return</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Tax saving</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{fmt(result.taxSaving)}</p>
              <p className="text-xs text-gray-400">at {(taxRate * 100).toFixed(1)}% rate</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Deduction Breakdown</h3>
            {Object.entries(result.breakdown).map(([label, value]) => (
              <div key={label} className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-600 last:border-0">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{fmt(value)}</span>
              </div>
            ))}
          </div>

          {result.method === "fixed" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
              <strong>Fixed rate method requirement:</strong> You must keep a record of the number of hours worked from home for the entire year — either a timesheet, diary, or roster. From 1 March 2023, a representative 4-week sample is no longer sufficient.
            </div>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
            Estimate only. Fixed rate: 70c/hr covers electricity, gas, internet, phone and stationery. Depreciation on equipment is claimed separately.
            Actual cost method figures are approximate — consult a registered tax agent for your specific situation.
          </p>
        </div>
      )}
    </div>
  );
}
