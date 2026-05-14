"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

// 2025–26 marginal tax rates — Stage 3 cuts (effective 1 July 2024)
const TAX_RATES = [
  { label: "16% (income $18,201–$45,000)", value: 0.16 },
  { label: "30% (income $45,001–$135,000)", value: 0.30 },
  { label: "37% (income $135,001–$190,000)", value: 0.37 },
  { label: "45% (income $190,001+)", value: 0.45 },
];

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

function fmtSigned(n: number) {
  const abs = Math.abs(n).toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
  return n < 0 ? `−${abs}` : abs;
}

export default function NegativeGearingCalc() {
  const [purchasePrice, setPurchasePrice] = useState("650000");
  const [loanAmount, setLoanAmount] = useState("520000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [weeklyRent, setWeeklyRent] = useState("600");
  const [annualCosts, setAnnualCosts] = useState("8000");
  const [taxRate, setTaxRate] = useState(0.30);
  const [result, setResult] = useState<null | {
    annualRent: number;
    annualInterest: number;
    annualCosts: number;
    netRentalIncome: number;
    isNegativelyGeared: boolean;
    taxBenefit: number;
    afterTaxCashFlow: number;
    weeklyAfterTax: number;
    grossYield: number;
    netYield: number;
  }>(null);

  const calculate = useCallback(() => {
    const price = parseFloat(purchasePrice.replace(/,/g, "")) || 0;
    const loan = parseFloat(loanAmount.replace(/,/g, "")) || 0;
    const rate = parseFloat(interestRate) / 100;
    const rent = parseFloat(weeklyRent) * 52;
    const costs = parseFloat(annualCosts.replace(/,/g, "")) || 0;

    const interest = loan * rate;
    const totalExpenses = interest + costs;
    const netIncome = rent - totalExpenses;
    const isNeg = netIncome < 0;
    const taxBenefit = isNeg ? Math.abs(netIncome) * taxRate : 0;
    const afterTaxCashFlow = netIncome + taxBenefit; // net cash out-of-pocket after tax saving
    const weeklyAfterTax = afterTaxCashFlow / 52;
    const grossYield = price > 0 ? (rent / price) * 100 : 0;
    const netYield = price > 0 ? (netIncome / price) * 100 : 0;

    const r = {
      annualRent: rent,
      annualInterest: interest,
      annualCosts: costs,
      netRentalIncome: netIncome,
      isNegativelyGeared: isNeg,
      taxBenefit,
      afterTaxCashFlow,
      weeklyAfterTax,
      grossYield,
      netYield,
    };
    setResult(r);
    trackCalculation("negative-gearing-calculator", {
      purchase_price: price,
      loan_amount: loan,
      interest_rate: rate,
      weekly_rent: parseFloat(weeklyRent),
      annual_costs: costs,
      tax_rate: taxRate,
    });
  }, [purchasePrice, loanAmount, interestRate, weeklyRent, annualCosts, taxRate]);

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Property Purchase Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)}
              className={inputClass + " pl-6"} placeholder="650000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Loan Amount (interest only)</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)}
              className={inputClass + " pl-6"} placeholder="520000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Annual Interest Rate (%)</label>
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)}
            className={inputClass} placeholder="6.5" min="0" max="30" step="0.1" />
        </div>
        <div>
          <label className={labelClass}>Weekly Rental Income</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={weeklyRent} onChange={e => setWeeklyRent(e.target.value)}
              className={inputClass + " pl-6"} placeholder="600" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Annual Property Costs</label>
          <p className="text-xs text-gray-500 mb-1">Rates, insurance, maintenance, strata, property management</p>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={annualCosts} onChange={e => setAnnualCosts(e.target.value)}
              className={inputClass + " pl-6"} placeholder="8000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Your Marginal Tax Rate</label>
          <select value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))}
            className={inputClass}>
            {TAX_RATES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={calculate}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Calculate
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Gearing status badge */}
          <div className={`text-center rounded-xl py-3 font-bold text-lg ${result.isNegativelyGeared
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            : "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"}`}>
            {result.isNegativelyGeared
              ? `Negatively Geared — ${fmt(Math.abs(result.netRentalIncome))} annual loss`
              : `Positively Geared — ${fmt(result.netRentalIncome)} annual surplus`}
          </div>

          {/* Income vs Expenses breakdown */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Annual Breakdown</h3>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Rental income</span>
              <span className="font-medium text-green-600">{fmt(result.annualRent)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Mortgage interest</span>
              <span className="font-medium text-red-500">−{fmt(result.annualInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Property costs</span>
              <span className="font-medium text-red-500">−{fmt(result.annualCosts)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="font-semibold text-gray-900 dark:text-white">Net rental income</span>
              <span className={`font-bold ${result.netRentalIncome < 0 ? "text-red-500" : "text-green-600"}`}>
                {fmtSigned(result.netRentalIncome)}
              </span>
            </div>
          </div>

          {/* Tax benefit and cash flow */}
          <div className="grid grid-cols-2 gap-3">
            {result.isNegativelyGeared && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Annual tax saving</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{fmt(result.taxBenefit)}</p>
                <p className="text-xs text-gray-400">at {(taxRate * 100).toFixed(1)}% marginal rate</p>
              </div>
            )}
            <div className={`${result.isNegativelyGeared ? "" : "col-span-2"} rounded-xl p-4 text-center ${result.afterTaxCashFlow >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-orange-50 dark:bg-orange-900/20"}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">After-tax annual cash flow</p>
              <p className={`text-xl font-bold ${result.afterTaxCashFlow >= 0 ? "text-green-600" : "text-orange-600"}`}>
                {fmtSigned(result.afterTaxCashFlow)}
              </p>
              <p className="text-xs text-gray-400">{fmtSigned(result.weeklyAfterTax)}/week out of pocket</p>
            </div>
          </div>

          {/* Yield */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Gross rental yield</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{result.grossYield.toFixed(2)}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Net rental yield</p>
              <p className={`text-lg font-bold ${result.netYield >= 0 ? "text-green-600" : "text-red-500"}`}>
                {result.netYield.toFixed(2)}%
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
            Interest-only loan assumed. Tax saving calculated as: loss × marginal tax rate. Consult a tax accountant for advice specific to your situation.
          </p>
        </div>
      )}
    </div>
  );
}
