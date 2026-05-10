"use client";

import { useState } from "react";

export default function LoanCalc() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [termYears, setTermYears] = useState("");
  const [termMonths, setTermMonths] = useState("");

  const P = parseFloat(principal.replace(/,/g, "")) || 0;
  const annualRate = parseFloat(rate) || 0;
  const years = parseInt(termYears) || 0;
  const extraMonths = parseInt(termMonths) || 0;
  const n = years * 12 + extraMonths;
  const r = annualRate / 100 / 12;

  let monthlyPayment = 0;
  let totalRepayment = 0;
  let totalInterest = 0;

  if (P > 0 && n > 0) {
    if (r === 0) {
      monthlyPayment = P / n;
    } else {
      monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    totalRepayment = monthlyPayment * n;
    totalInterest = totalRepayment - P;
  }

  const fmt = (v: number) =>
    v.toLocaleString("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const interestPct = totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Loan amount ($)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">$</span>
            <input
              type="number"
              min="0"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 20000"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Annual interest rate (%)</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 7.5"
              className="w-full pr-8 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Loan term</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="number"
                min="0"
                value={termYears}
                onChange={(e) => setTermYears(e.target.value)}
                placeholder="Years"
                className="w-full pr-14 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">years</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="11"
                value={termMonths}
                onChange={(e) => setTermMonths(e.target.value)}
                placeholder="Months"
                className="w-full pr-16 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">months</span>
            </div>
          </div>
        </div>

        {monthlyPayment > 0 && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly repayment</p>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{fmt(monthlyPayment)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total repayment</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(totalRepayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total interest</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">{fmt(totalInterest)}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Principal ({(100 - interestPct).toFixed(0)}%)</span>
                <span>Interest ({interestPct.toFixed(0)}%)</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${100 - interestPct}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
