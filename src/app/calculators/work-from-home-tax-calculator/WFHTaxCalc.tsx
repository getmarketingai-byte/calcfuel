"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

const MARGINAL_RATES = [
  { label: "19% (taxable income $18,201–$45,000)", value: 0.19 },
  { label: "32.5% (taxable income $45,001–$120,000)", value: 0.325 },
  { label: "37% (taxable income $120,001–$180,000)", value: 0.37 },
  { label: "45% (taxable income over $180,000)", value: 0.45 },
];

interface WFHResult {
  totalHours: number;
  annualDeduction: number;
  weeklyDeduction: number;
  monthlyDeduction: number;
  taxSaving: number;
  marginalRate: number;
}

function calculate(days: number, hoursPerDay: number, marginalRate: number): WFHResult {
  const totalHours = days * hoursPerDay;
  const annualDeduction = totalHours * 0.70;
  const weeklyDeduction = annualDeduction / 52;
  const monthlyDeduction = annualDeduction / 12;
  const taxSaving = annualDeduction * marginalRate;
  return { totalHours, annualDeduction, weeklyDeduction, monthlyDeduction, taxSaving, marginalRate };
}

export default function WFHTaxCalc() {
  const [days, setDays] = useState("200");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [marginalRate, setMarginalRate] = useState(0.325);
  const [result, setResult] = useState<WFHResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const d = parseFloat(days);
      const h = parseFloat(hoursPerDay);
      if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) {
        setResult(null);
        return;
      }
      const r = calculate(d, h, marginalRate);
      setResult(r);
      trackCalculation("work_from_home_tax", {
        hours: r.totalHours,
        deduction: r.annualDeduction,
        tax_saving: r.taxSaving,
      });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [days, hoursPerDay, marginalRate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your WFH Tax Deduction</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Days worked from home per year
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">5 days/week, 40 weeks ≈ 200 days</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hours worked per day
          </label>
          <input
            type="number"
            min="1"
            max="24"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Actual hours worked, not time at home</p>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Your marginal tax rate
        </label>
        <select
          value={marginalRate}
          onChange={(e) => setMarginalRate(parseFloat(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          {MARGINAL_RATES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {result !== null && (
        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total WFH Hours</p>
              <p className="text-2xl font-bold text-orange-500">{result.totalHours.toLocaleString()}</p>
            </div>
            <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Annual Deduction</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.annualDeduction)}</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Monthly Deduction</p>
              <p className="text-2xl font-bold text-blue-600">{fmt(result.monthlyDeduction)}</p>
            </div>
            <div className="p-5 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Est. Tax Saving</p>
              <p className="text-2xl font-bold text-purple-600">{fmt(result.taxSaving)}</p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm space-y-1">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Formula:</span> {result.totalHours.toLocaleString()} hours × $0.70 = {fmt(result.annualDeduction)} deduction
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Weekly deduction:</span> {fmt(result.weeklyDeduction)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Marginal rate applied:</span> {(result.marginalRate * 100).toFixed(1)}%
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Based on the ATO fixed rate of 70 cents per hour for 2024–25 and 2025–26.{" "}
            <a
              href="https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/working-from-home-expenses"
              className="text-orange-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ATO — Working from home expenses
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
