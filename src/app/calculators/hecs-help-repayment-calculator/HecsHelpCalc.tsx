"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

// FY2025-26 HECS-HELP repayment thresholds and rates
// Source: ATO — study and training loan repayment thresholds
const REPAYMENT_BRACKETS = [
  { min: 0,       max: 54435,  rate: 0.000 },
  { min: 54435,   max: 62850,  rate: 0.010 },
  { min: 62850,   max: 66620,  rate: 0.020 },
  { min: 66620,   max: 70618,  rate: 0.025 },
  { min: 70618,   max: 74855,  rate: 0.030 },
  { min: 74855,   max: 79346,  rate: 0.035 },
  { min: 79346,   max: 84107,  rate: 0.040 },
  { min: 84107,   max: 89154,  rate: 0.045 },
  { min: 89154,   max: 94503,  rate: 0.050 },
  { min: 94503,   max: 100174, rate: 0.055 },
  { min: 100174,  max: 106185, rate: 0.060 },
  { min: 106185,  max: 112556, rate: 0.065 },
  { min: 112556,  max: 119309, rate: 0.070 },
  { min: 119309,  max: 126467, rate: 0.075 },
  { min: 126467,  max: 134056, rate: 0.080 },
  { min: 134056,  max: 142100, rate: 0.085 },
  { min: 142100,  max: 150626, rate: 0.090 },
  { min: 150626,  max: 159663, rate: 0.095 },
  { min: 159663,  max: Infinity, rate: 0.100 },
];

// CPI indexation applied each June 1 (approximate recent rate)
const INDEXATION_RATE = 0.038; // 3.8% FY2025-26 estimate

function getRepaymentRate(income: number): number {
  const bracket = REPAYMENT_BRACKETS.find(b => income >= b.min && income < b.max);
  return bracket ? bracket.rate : 0;
}

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

export default function HecsHelpCalc() {
  const [debt, setDebt] = useState("25000");
  const [income, setIncome] = useState("85000");
  const [extraRepayments, setExtraRepayments] = useState("0");
  const [includeIndexation, setIncludeIndexation] = useState(true);

  const [result, setResult] = useState<null | {
    repaymentRate: number;
    mandatoryAnnual: number;
    mandatoryFortnightly: number;
    totalAnnual: number;
    yearsToRepay: number;
    totalIndexationCost: number;
    totalPaid: number;
    schedule: Array<{ year: number; openingBalance: number; indexation: number; repayment: number; closingBalance: number }>;
  }>(null);

  const calculate = useCallback(() => {
    const debtAmt = parseFloat(debt.replace(/,/g, "")) || 0;
    const incomeAmt = parseFloat(income.replace(/,/g, "")) || 0;
    const extra = parseFloat(extraRepayments.replace(/,/g, "")) || 0;

    const rate = getRepaymentRate(incomeAmt);
    const mandatoryAnnual = Math.round(incomeAmt * rate);
    const mandatoryFortnightly = Math.round(mandatoryAnnual / 26);
    const totalAnnual = mandatoryAnnual + extra;

    // Project repayment schedule
    const schedule: Array<{ year: number; openingBalance: number; indexation: number; repayment: number; closingBalance: number }> = [];
    let balance = debtAmt;
    let totalIndexation = 0;
    let totalRepaid = 0;
    let year = 1;
    const maxYears = 50;

    while (balance > 0 && year <= maxYears) {
      const opening = balance;
      const indexation = includeIndexation ? Math.round(balance * INDEXATION_RATE) : 0;
      balance += indexation;
      totalIndexation += indexation;

      const repayment = Math.min(totalAnnual, balance);
      balance = Math.max(0, balance - repayment);
      totalRepaid += repayment;

      schedule.push({ year, openingBalance: opening, indexation, repayment, closingBalance: balance });
      year++;

      if (totalAnnual <= 0 || mandatoryAnnual <= 0) break;
    }

    const yearsToRepay = balance <= 0 ? schedule.length : maxYears;

    setResult({
      repaymentRate: rate,
      mandatoryAnnual,
      mandatoryFortnightly,
      totalAnnual,
      yearsToRepay,
      totalIndexationCost: totalIndexation,
      totalPaid: totalRepaid,
      schedule: schedule.slice(0, 20), // show first 20 years
    });

    trackCalculation("hecs-help-repayment-calculator", {
      debt: debtAmt,
      income: incomeAmt,
      extra_repayments: extra,
      include_indexation: includeIndexation ? 1 : 0,
    });
  }, [debt, income, extraRepayments, includeIndexation]);

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Current HECS/HELP Debt Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={debt} onChange={e => setDebt(e.target.value)}
              className={inputClass + " pl-6"} placeholder="25000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Annual Taxable Income</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={income} onChange={e => setIncome(e.target.value)}
              className={inputClass + " pl-6"} placeholder="85000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Extra Voluntary Repayments (per year)</label>
          <p className="text-xs text-gray-500 mb-1">Optional — reduces repayment period</p>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={extraRepayments} onChange={e => setExtraRepayments(e.target.value)}
              className={inputClass + " pl-6"} placeholder="0" min="0" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input type="checkbox" id="indexation" checked={includeIndexation}
            onChange={e => setIncludeIndexation(e.target.checked)} className="w-4 h-4 accent-orange-500" />
          <label htmlFor="indexation" className="text-sm text-gray-700 dark:text-gray-300">
            Include CPI indexation <span className="text-gray-400">({(INDEXATION_RATE * 100).toFixed(1)}% estimate)</span>
          </label>
        </div>
      </div>

      <button onClick={calculate}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Calculate Repayment
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          {result.mandatoryAnnual === 0 ? (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl py-4 text-center">
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">Below Repayment Threshold</p>
              <p className="text-sm text-gray-500 mt-1">
                Your income is below the minimum threshold (${(54435).toLocaleString("en-AU")}). No compulsory repayment required this year.
                {includeIndexation && " Note: your debt will still be indexed by CPI each June 1."}
              </p>
            </div>
          ) : (
            <>
              {/* Key metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Repayment rate</p>
                  <p className="text-2xl font-bold text-orange-600">{(result.repaymentRate * 100).toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">of income</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Annual repayment</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.mandatoryAnnual)}</p>
                  <p className="text-xs text-gray-400">{fmt(result.mandatoryFortnightly)}/fortnight</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Years to repay</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {result.yearsToRepay >= 50 ? "50+" : result.yearsToRepay}
                  </p>
                  <p className="text-xs text-gray-400">estimated</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Total indexation</p>
                  <p className="text-xl font-bold text-red-500">{fmt(result.totalIndexationCost)}</p>
                  <p className="text-xs text-gray-400">added to debt</p>
                </div>
              </div>

              {/* Repayment schedule table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 text-gray-500 font-medium">Year</th>
                      <th className="text-right py-2 text-gray-500 font-medium">Opening</th>
                      {includeIndexation && <th className="text-right py-2 text-gray-500 font-medium">Indexation</th>}
                      <th className="text-right py-2 text-gray-500 font-medium">Repayment</th>
                      <th className="text-right py-2 text-gray-500 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map(row => (
                      <tr key={row.year} className={`border-b border-gray-100 dark:border-gray-800 ${row.closingBalance === 0 ? "bg-green-50 dark:bg-green-900/20 font-semibold" : ""}`}>
                        <td className="py-2 text-gray-700 dark:text-gray-300">Year {row.year}</td>
                        <td className="py-2 text-right text-gray-700 dark:text-gray-300">{fmt(row.openingBalance)}</td>
                        {includeIndexation && <td className="py-2 text-right text-red-500">{row.indexation > 0 ? `+${fmt(row.indexation)}` : "—"}</td>}
                        <td className="py-2 text-right text-green-600">−{fmt(row.repayment)}</td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-white">
                          {row.closingBalance === 0 ? "✓ Paid off" : fmt(row.closingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
            FY2025–26 repayment thresholds and rates. Indexation estimate only — actual CPI indexation is applied each 1 June by the ATO.
            Assumes income remains constant. Voluntary repayments to the ATO are no longer tax-deductible. Consult your tax accountant for advice specific to your situation.
          </p>
        </div>
      )}
    </div>
  );
}
