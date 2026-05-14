"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type ResidencyType = "resident" | "non-resident" | "working-holiday";

interface TaxResult {
  grossIncome: number;
  incomeTax: number;
  medicareLevyAmount: number;
  litoOffset: number;
  totalTax: number;
  netIncome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
}

// 2025–26 resident tax brackets (Stage 3 cuts, effective 1 July 2024)
function calcResidentTax(income: number): number {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.16;
  if (income <= 135000) return 4288 + (income - 45000) * 0.30;
  if (income <= 190000) return 31288 + (income - 135000) * 0.37;
  return 51638 + (income - 190000) * 0.45;
}

// 2025–26 non-resident tax brackets
function calcNonResidentTax(income: number): number {
  if (income <= 135000) return income * 0.30;
  if (income <= 190000) return 40500 + (income - 135000) * 0.37;
  return 60850 + (income - 190000) * 0.45;
}

// 2025–26 working holiday maker tax brackets
function calcWorkingHolidayTax(income: number): number {
  if (income <= 45000) return income * 0.15;
  if (income <= 135000) return 6750 + (income - 45000) * 0.30;
  if (income <= 190000) return 33750 + (income - 135000) * 0.37;
  return 54100 + (income - 190000) * 0.45;
}

function calcLITO(income: number): number {
  if (income <= 37500) return 700;
  if (income <= 45000) return 700 - (income - 37500) * 0.05;
  if (income <= 66667) return 325 - (income - 45000) * 0.015;
  return 0;
}

function calcMedicareLevy(income: number, residency: ResidencyType): number {
  if (residency !== "resident") return 0;
  const threshold = 26000;
  const shadeInEnd = 32500;
  if (income <= threshold) return 0;
  if (income <= shadeInEnd) return Math.min(income * 0.02, (income - threshold) * 0.1);
  return income * 0.02;
}

function getMarginalRate(income: number, residency: ResidencyType): number {
  if (residency === "non-resident") {
    if (income <= 135000) return 30;
    if (income <= 190000) return 37;
    return 45;
  }
  if (residency === "working-holiday") {
    if (income <= 45000) return 15;
    if (income <= 135000) return 30;
    if (income <= 190000) return 37;
    return 45;
  }
  if (income <= 18200) return 0;
  if (income <= 45000) return 16;
  if (income <= 135000) return 30;
  if (income <= 190000) return 37;
  return 45;
}

function calculate(income: number, residency: ResidencyType): TaxResult {
  let incomeTax = 0;
  if (residency === "resident") incomeTax = calcResidentTax(income);
  else if (residency === "non-resident") incomeTax = calcNonResidentTax(income);
  else incomeTax = calcWorkingHolidayTax(income);

  const litoOffset = residency === "resident" ? Math.min(calcLITO(income), incomeTax) : 0;
  const taxAfterLITO = Math.max(0, incomeTax - litoOffset);
  const medicareLevyAmount = calcMedicareLevy(income, residency);
  const totalTax = taxAfterLITO + medicareLevyAmount;
  const netIncome = income - totalTax;
  const effectiveTaxRate = income > 0 ? (totalTax / income) * 100 : 0;
  const marginalTaxRate = getMarginalRate(income, residency);

  return { grossIncome: income, incomeTax: taxAfterLITO, medicareLevyAmount, litoOffset, totalTax, netIncome, effectiveTaxRate, marginalTaxRate };
}

export default function AustralianIncomeTaxCalc() {
  const [income, setIncome] = useState("");
  const [residency, setResidency] = useState<ResidencyType>("resident");
  const [result, setResult] = useState<TaxResult | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
  const fmtPct = (n: number) => n.toFixed(1) + "%";

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!income) { setResult(null); setError(""); return; }
      const inc = parseFloat(income.replace(/,/g, ""));
      if (isNaN(inc) || inc < 0) { setError("Please enter a valid income amount."); setResult(null); return; }
      if (inc > 10000000) { setError("Income seems too high. Please check the value."); setResult(null); return; }
      setError("");
      const r = calculate(inc, residency);
      setResult(r);
      trackCalculation("australian_income_tax", { gross_income: inc, residency, total_tax: r.totalTax, effective_rate: r.effectiveTaxRate });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [income, residency]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Australian Income Tax</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Annual Gross Income (AUD)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="e.g. 85000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Residency Status
          </label>
          <select
            value={residency}
            onChange={(e) => setResidency(e.target.value as ResidencyType)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="resident">Australian Resident</option>
            <option value="non-resident">Non-Resident</option>
            <option value="working-holiday">Working Holiday Maker</option>
          </select>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800 col-span-2 sm:col-span-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Tax Payable</p>
              <p className="text-3xl font-bold text-orange-500">{fmt(result.totalTax)}</p>
            </div>
            <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800 col-span-2 sm:col-span-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Net Take-Home Pay</p>
              <p className="text-3xl font-bold text-green-600">{fmt(result.netIncome)}</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Effective Tax Rate</p>
              <p className="text-3xl font-bold text-blue-600">{fmtPct(result.effectiveTaxRate)}</p>
            </div>
            <div className="p-5 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Marginal Tax Rate</p>
              <p className="text-3xl font-bold text-purple-600">{fmtPct(result.marginalTaxRate)}</p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Tax Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Gross Income</span>
                <span className="font-medium text-gray-900 dark:text-white">{fmt(result.grossIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Income Tax (before offsets)</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {fmt(result.incomeTax + result.litoOffset)}
                </span>
              </div>
              {result.litoOffset > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Low Income Tax Offset (LITO)</span>
                  <span>−{fmt(result.litoOffset)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Income Tax (after offsets)</span>
                <span className="font-medium text-gray-900 dark:text-white">{fmt(result.incomeTax)}</span>
              </div>
              {result.medicareLevyAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Medicare Levy (2%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">{fmt(result.medicareLevyAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-semibold">
                <span className="text-gray-900 dark:text-white">Total Tax Payable</span>
                <span className="text-orange-500">{fmt(result.totalTax)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900 dark:text-white">Net Take-Home Pay</span>
                <span className="text-green-600">{fmt(result.netIncome)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 pt-1">
                <span>Monthly take-home</span>
                <span>{fmt(result.netIncome / 12)} / month</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Fortnightly take-home</span>
                <span>{fmt(result.netIncome / 26)} / fortnight</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Based on 2025–26 ATO tax rates. Includes LITO for Australian residents. Does not include LMITO, HELP/HECS debt, private health insurance rebate, or other individual offsets. For personal tax advice, consult a registered tax agent.
          </p>
        </div>
      )}
    </div>
  );
}
