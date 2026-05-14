"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

interface CalcResult {
  currentBalance: number;
  annualContribution: number;
  years: number;
  returnRate: number;
  projectedBalance: number;
  totalContributions: number;
  totalGrowth: number;
  annualRetirementIncome: number;
  monthlyRetirementIncome: number;
}

function calcSuperBalance(
  currentBalance: number,
  annualSalary: number,
  sgRate: number,
  extraContribution: number,
  years: number,
  returnRate: number
): CalcResult {
  const annualSGContribution = annualSalary * (sgRate / 100);
  const annualContribution = annualSGContribution + extraContribution;
  const netReturnRate = returnRate / 100 - 0.01; // approximate 1% for super fund fees/taxes on earnings
  let balance = currentBalance;
  for (let y = 0; y < years; y++) {
    balance = balance * (1 + netReturnRate) + annualContribution;
  }
  const totalContributions = annualContribution * years;
  const totalGrowth = balance - currentBalance - totalContributions;
  // Safe withdrawal rate: 4% per year (broadly used in retirement planning)
  const annualRetirementIncome = balance * 0.04;
  const monthlyRetirementIncome = annualRetirementIncome / 12;
  return {
    currentBalance,
    annualContribution,
    years,
    returnRate,
    projectedBalance: balance,
    totalContributions,
    totalGrowth,
    annualRetirementIncome,
    monthlyRetirementIncome,
  };
}

export default function SuperannuationCalc() {
  const [currentBalance, setCurrentBalance] = useState("50000");
  const [salary, setSalary] = useState("80000");
  const [sgRate, setSgRate] = useState("11.5");
  const [extraContrib, setExtraContrib] = useState("0");
  const [years, setYears] = useState("25");
  const [returnRate, setReturnRate] = useState("7");
  const [result, setResult] = useState<CalcResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const bal = parseFloat(currentBalance.replace(/,/g, "")) || 0;
      const sal = parseFloat(salary.replace(/,/g, "")) || 0;
      const sg = parseFloat(sgRate) || 11.5;
      const extra = parseFloat(extraContrib.replace(/,/g, "")) || 0;
      const yrs = parseInt(years) || 25;
      const ret = parseFloat(returnRate) || 7;
      if (sal < 0 || yrs < 1 || yrs > 50 || ret < 0 || ret > 20) return;
      const r = calcSuperBalance(bal, sal, sg, extra, yrs, ret);
      setResult(r);
      trackCalculation("superannuation", { current_balance: bal, salary: sal, years: yrs, projected_balance: r.projectedBalance });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [currentBalance, salary, sgRate, extraContrib, years, returnRate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Project Your Super Balance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Super Balance (AUD)</label>
          <input type="text" inputMode="decimal" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Salary (AUD)</label>
          <input type="text" inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Super Guarantee Rate (%)</label>
          <input type="number" min="0" max="20" step="0.5" value={sgRate} onChange={(e) => setSgRate(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">2025–26: 11.5%. Rising to 12% from 1 Jul 2025.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Extra Contributions / Year (AUD)</label>
          <input type="text" inputMode="decimal" value={extraContrib} onChange={(e) => setExtraContrib(e.target.value)} placeholder="0" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years Until Retirement</label>
          <input type="number" min="1" max="50" value={years} onChange={(e) => setYears(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Annual Return (%)</label>
          <input type="number" min="0" max="20" step="0.5" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">Long-run median balanced fund return: ~7–8% p.a. (gross, APRA data).</p>
        </div>
      </div>
      {result !== null && (
        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800 col-span-2 sm:col-span-1">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Projected Balance</p>
              <p className="text-2xl font-bold text-orange-500">{fmt(result.projectedBalance)}</p>
            </div>
            <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Annual Retirement Income</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.annualRetirementIncome)}</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold text-blue-600">{fmt(result.monthlyRetirementIncome)}</p>
            </div>
            <div className="p-5 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Total Investment Growth</p>
              <p className="text-2xl font-bold text-purple-600">{fmt(result.totalGrowth)}</p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Balance Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Starting balance</span><span className="font-medium">{fmt(result.currentBalance)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Total contributions ({result.years} yrs × {fmt(result.annualContribution)}/yr)</span><span className="font-medium">{fmt(result.totalContributions)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Investment growth</span><span className="font-medium text-green-600">+{fmt(result.totalGrowth)}</span></div>
              <div className="flex justify-between border-t pt-2 border-gray-200 dark:border-gray-700 font-semibold"><span>Projected balance at retirement</span><span className="text-orange-500">{fmt(result.projectedBalance)}</span></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Projections use a simplified compound growth model with approximate fund fees/taxes. Retirement income uses a 4% annual drawdown rate. Results are estimates only — actual outcomes depend on fund performance, fees, tax, and personal circumstances. This is not financial advice. Consult a licensed financial adviser for retirement planning. See{" "}
            <a href="https://moneysmart.gov.au/retirement-income/superannuation-calculator" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ASIC MoneySmart super calculator</a>{" "}
            for an APRA-verified projection.
          </p>
        </div>
      )}
    </div>
  );
}
