"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

interface CalcResult {
  repaymentIncome: number;
  rate: number;
  annualRepayment: number;
  weeklyRepayment: number;
  fortnightlyRepayment: number;
  monthlyRepayment: number;
  yearsToRepay: number;
}

// 2025-26 HECS repayment thresholds (ATO)
const THRESHOLDS = [
  { min: 0, max: 54435, rate: 0 },
  { min: 54435, max: 62849, rate: 1.0 },
  { min: 62849, max: 66000, rate: 2.0 },
  { min: 66000, max: 68674, rate: 2.5 },
  { min: 68674, max: 74999, rate: 3.0 },
  { min: 74999, max: 79999, rate: 3.5 },
  { min: 79999, max: 86000, rate: 4.0 },
  { min: 86000, max: 91999, rate: 4.5 },
  { min: 91999, max: 98999, rate: 5.0 },
  { min: 98999, max: 104999, rate: 5.5 },
  { min: 104999, max: 111999, rate: 6.0 },
  { min: 111999, max: 118999, max2: 119882, rate: 6.5 },
  { min: 119882, max: 124999, rate: 7.0 },
  { min: 124999, max: 131999, rate: 7.5 },
  { min: 131999, max: 138999, rate: 8.0 },
  { min: 138999, max: 146999, rate: 8.5 },
  { min: 146999, max: 154999, rate: 9.0 },
  { min: 154999, max: 162999, rate: 9.5 },
  { min: 162999, max: Infinity, rate: 10.0 },
];

function getRepaymentRate(income: number): number {
  for (const t of THRESHOLDS) {
    if (income <= (t.max || Infinity)) return t.rate;
  }
  return 10.0;
}

function calculate(income: number, debt: number): CalcResult {
  const rate = getRepaymentRate(income);
  const annualRepayment = Math.min(income * (rate / 100), debt > 0 ? debt : Infinity);
  const weeklyRepayment = annualRepayment / 52;
  const fortnightlyRepayment = annualRepayment / 26;
  const monthlyRepayment = annualRepayment / 12;
  const yearsToRepay = debt > 0 && annualRepayment > 0 ? Math.ceil(debt / annualRepayment) : 0;
  return { repaymentIncome: income, rate, annualRepayment, weeklyRepayment, fortnightlyRepayment, monthlyRepayment, yearsToRepay };
}

export default function HECSCalc() {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!income) { setResult(null); return; }
      const inc = parseFloat(income.replace(/,/g, ""));
      const d = debt ? parseFloat(debt.replace(/,/g, "")) : 0;
      if (isNaN(inc) || inc < 0) { setResult(null); return; }
      const r = calculate(inc, d);
      setResult(r);
      trackCalculation("hecs_help", { income: inc, debt: d, annual_repayment: r.annualRepayment });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [income, debt]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your HECS-HELP Repayment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Repayment Income (AUD)</label>
          <input type="text" inputMode="decimal" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 75000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">Taxable income + reportable super contributions + fringe benefits.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Outstanding HECS/HELP Debt (AUD)</label>
          <input type="text" inputMode="decimal" value={debt} onChange={(e) => setDebt(e.target.value)} placeholder="Optional — e.g. 25000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">Leave blank to see annual repayment only.</p>
        </div>
      </div>
      {result !== null && (
        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Repayment Rate</p>
              <p className="text-2xl font-bold text-orange-500">{result.rate.toFixed(1)}%</p>
            </div>
            <div className="p-5 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Annual Repayment</p>
              <p className="text-2xl font-bold text-red-500">{fmt(result.annualRepayment)}</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Monthly</p>
              <p className="text-2xl font-bold text-blue-600">{fmt(result.monthlyRepayment)}</p>
            </div>
            {result.yearsToRepay > 0 ? (
              <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Years to Repay</p>
                <p className="text-2xl font-bold text-green-600">{result.yearsToRepay} yr{result.yearsToRepay !== 1 ? "s" : ""}</p>
              </div>
            ) : (
              <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Fortnightly</p>
                <p className="text-2xl font-bold text-green-600">{fmt(result.fortnightlyRepayment)}</p>
              </div>
            )}
          </div>
          {result.rate === 0 && (
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-300">
              Your income is below the 2025–26 HECS repayment threshold (${(54435).toLocaleString()}). No repayment required this year.
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Based on 2025–26 ATO HECS-HELP repayment thresholds. Does not account for annual HELP indexation (CPI-linked, applied 1 June each year). See{" "}
            <a href="https://www.ato.gov.au/individuals-and-families/study-and-training-support-loans/higher-education-loan-program-help/repaying-your-help-debt" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ATO — Repaying your HELP debt</a>.
          </p>
        </div>
      )}
    </div>
  );
}
