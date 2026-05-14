"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

interface CalcResult {
  grossSalary: number;
  sacrificeAmount: number;
  taxableSalary: number;
  taxBefore: number;
  taxAfter: number;
  taxSaved: number;
  netBenefitAfterConcessionalTax: number;
  takeHomeBefore: number;
  takeHomeAfter: number;
  takeHomeChange: number;
  superBalance: number;
  effectiveRateBefore: number;
  effectiveRateAfter: number;
}

function calcResidentTax(income: number): number {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.19;
  if (income <= 120000) return 5092 + (income - 45000) * 0.325;
  if (income <= 180000) return 29467 + (income - 120000) * 0.37;
  return 51667 + (income - 180000) * 0.45;
}

function calcLITO(income: number): number {
  if (income <= 37500) return 700;
  if (income <= 45000) return 700 - (income - 37500) * 0.05;
  if (income <= 66667) return 325 - (income - 45000) * 0.015;
  return 0;
}

function calcMedicareLevy(income: number): number {
  const threshold = 26000;
  const shadeInEnd = 32500;
  if (income <= threshold) return 0;
  if (income <= shadeInEnd) return Math.min(income * 0.02, (income - threshold) * 0.1);
  return income * 0.02;
}

function calcNetTax(income: number): number {
  const tax = calcResidentTax(income);
  const lito = Math.min(calcLITO(income), tax);
  const medicare = calcMedicareLevy(income);
  return Math.max(0, tax - lito) + medicare;
}

function calculate(grossSalary: number, sacrificeAmount: number): CalcResult {
  const taxableSalary = Math.max(0, grossSalary - sacrificeAmount);
  const taxBefore = calcNetTax(grossSalary);
  const taxAfter = calcNetTax(taxableSalary);
  const taxSaved = taxBefore - taxAfter;
  const superFundTax = sacrificeAmount * 0.15; // 15% concessional tax in super fund
  const netBenefitAfterConcessionalTax = taxSaved - superFundTax;
  const takeHomeBefore = grossSalary - taxBefore;
  const takeHomeAfter = taxableSalary - taxAfter;
  const takeHomeChange = takeHomeAfter - takeHomeBefore;
  const superBalance = sacrificeAmount * (1 - 0.15);
  const effectiveRateBefore = grossSalary > 0 ? (taxBefore / grossSalary) * 100 : 0;
  const effectiveRateAfter = grossSalary > 0 ? (taxAfter / taxableSalary) * 100 : 0;

  return {
    grossSalary,
    sacrificeAmount,
    taxableSalary,
    taxBefore,
    taxAfter,
    taxSaved,
    netBenefitAfterConcessionalTax,
    takeHomeBefore,
    takeHomeAfter,
    takeHomeChange,
    superBalance,
    effectiveRateBefore,
    effectiveRateAfter,
  };
}

export default function SalarySacrificeCalc() {
  const [salary, setSalary] = useState("");
  const [sacrifice, setSacrifice] = useState("");
  const [mode, setMode] = useState<"amount" | "percent">("amount");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
  const fmtPct = (n: number) => n.toFixed(1) + "%";

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!salary || !sacrifice) { setResult(null); setError(""); return; }
      const s = parseFloat(salary.replace(/,/g, ""));
      const sacVal = parseFloat(sacrifice.replace(/,/g, ""));
      if (isNaN(s) || s <= 0) { setError("Please enter a valid gross salary."); setResult(null); return; }
      if (isNaN(sacVal) || sacVal < 0) { setError("Please enter a valid sacrifice amount."); setResult(null); return; }
      const sacrificeAmount = mode === "percent" ? (s * sacVal) / 100 : sacVal;
      if (sacrificeAmount >= s) { setError("Sacrifice amount cannot exceed your gross salary."); setResult(null); return; }
      // Check concessional cap: $30,000 - $11,500 employer SG = ~$18,500 typical personal cap
      if (sacrificeAmount > 30000) { setError("Note: The total concessional contributions cap is $30,000 for 2025–26 (including employer super). Contributions above this are taxed at your marginal rate."); }
      else { setError(""); }
      const r = calculate(s, sacrificeAmount);
      setResult(r);
      trackCalculation("salary_sacrifice", { gross_salary: s, sacrifice_amount: sacrificeAmount, tax_saved: r.taxSaved });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [salary, sacrifice, mode]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Salary Sacrifice Benefit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gross Annual Salary (AUD)
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g. 90000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Salary Sacrifice Amount
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={sacrifice}
              onChange={(e) => setSacrifice(e.target.value)}
              placeholder={mode === "amount" ? "e.g. 10000" : "e.g. 10"}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as "amount" | "percent")}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="amount">$ AUD</option>
              <option value="percent">%</option>
            </select>
          </div>
        </div>
      </div>
      {error && <p className="text-amber-600 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-4 space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Tax Saved</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.taxSaved)}</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Super Contribution (after 15% tax)</p>
              <p className="text-2xl font-bold text-blue-600">{fmt(result.superBalance)}</p>
            </div>
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Net Benefit</p>
              <p className="text-2xl font-bold text-orange-500">{fmt(result.netBenefitAfterConcessionalTax)}</p>
            </div>
            <div className="p-5 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Take-Home Change</p>
              <p className={`text-2xl font-bold ${result.takeHomeChange < 0 ? "text-red-500" : "text-green-600"}`}>
                {result.takeHomeChange >= 0 ? "+" : ""}{fmt(result.takeHomeChange)}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Before vs. After Salary Sacrifice</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-gray-700 dark:text-gray-300">Without Sacrifice</p>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Salary</span>
                  <span className="font-medium">{fmt(result.grossSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Tax</span>
                  <span className="font-medium text-red-500">{fmt(result.taxBefore)}</span>
                </div>
                <div className="flex justify-between border-t pt-1 border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Take-Home Pay</span>
                  <span className="font-bold">{fmt(result.takeHomeBefore)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Per month</span>
                  <span>{fmt(result.takeHomeBefore / 12)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700 dark:text-gray-300">With Sacrifice ({fmt(result.sacrificeAmount)}/yr)</p>
                <div className="flex justify-between">
                  <span className="text-gray-500">Taxable Salary</span>
                  <span className="font-medium">{fmt(result.taxableSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Tax</span>
                  <span className="font-medium text-green-600">{fmt(result.taxAfter)}</span>
                </div>
                <div className="flex justify-between border-t pt-1 border-gray-200 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Take-Home Pay</span>
                  <span className="font-bold">{fmt(result.takeHomeAfter)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Per month</span>
                  <span>{fmt(result.takeHomeAfter / 12)}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Effective rate before / after</span>
              <span className="font-medium">{fmtPct(result.effectiveRateBefore)} → {fmtPct(result.effectiveRateAfter)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Based on 2025–26 ATO income tax rates, LITO, and Medicare levy for Australian residents. Super contributions taxed at 15% concessional rate. Concessional cap: $30,000 (including employer SG). Does not account for division 293 tax (applies to incomes over $250,000), HECS/HELP debt, private health insurance rebate, or other individual offsets. This is an estimate only — consult a registered tax agent or financial adviser for personalised advice.
          </p>
        </div>
      )}
    </div>
  );
}
