"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type Frequency = "monthly" | "fortnightly" | "weekly";

const FREQ_CONFIG: Record<Frequency, { label: string; perYear: number }> = {
  monthly:     { label: "Monthly",     perYear: 12 },
  fortnightly: { label: "Fortnightly", perYear: 26 },
  weekly:      { label: "Weekly",      perYear: 52 },
};

function calcMortgage(principal: number, annualRate: number, termYears: number, freq: Frequency) {
  const perYear = FREQ_CONFIG[freq].perYear;
  const r = annualRate / 100 / perYear;
  const n = termYears * perYear;
  if (r === 0) {
    const payment = principal / n;
    return { payment, totalRepayments: principal, totalInterest: 0 };
  }
  const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalRepayments = payment * n;
  const totalInterest = totalRepayments - principal;
  return { payment, totalRepayments, totalInterest };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

const fmtPrecise = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export default function MortgageCalc() {
  const [loanAmount, setLoanAmount] = useState("600000");
  const [interestRate, setInterestRate] = useState("6.50");
  const [loanTerm, setLoanTerm] = useState("30");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [results, setResults] = useState<{
    monthly: ReturnType<typeof calcMortgage>;
    fortnightly: ReturnType<typeof calcMortgage>;
    weekly: ReturnType<typeof calcMortgage>;
    selected: ReturnType<typeof calcMortgage>;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate);
      const term = parseInt(loanTerm, 10);

      if (!loanAmount || !interestRate || !loanTerm) { setResults(null); setError(""); return; }
      if (isNaN(principal) || principal <= 0) { setError("Enter a valid loan amount."); setResults(null); return; }
      if (isNaN(rate) || rate < 0 || rate > 30) { setError("Enter an interest rate between 0% and 30%."); setResults(null); return; }
      if (isNaN(term) || term < 1 || term > 40) { setError("Enter a loan term between 1 and 40 years."); setResults(null); return; }

      setError("");
      const monthly = calcMortgage(principal, rate, term, "monthly");
      const fortnightly = calcMortgage(principal, rate, term, "fortnightly");
      const weekly = calcMortgage(principal, rate, term, "weekly");
      const selected = frequency === "monthly" ? monthly : frequency === "fortnightly" ? fortnightly : weekly;

      setResults({ monthly, fortnightly, weekly, selected });
      trackCalculation("mortgage_repayment_calculator", {
        principal,
        rate,
        term,
        frequency,
        payment: selected.payment,
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [loanAmount, interestRate, loanTerm, frequency]);

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Mortgage Repayment Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className={labelClass}>Loan Amount (AUD)</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="1"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g. 600000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Annual Interest Rate (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="30"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g. 6.50"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium">%</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Loan Term (Years)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="40"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="e.g. 30"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium">yrs</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Repayment Frequency</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full">
            {(["monthly", "fortnightly", "weekly"] as Frequency[]).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={
                  "flex-1 py-2.5 text-xs font-medium transition-colors " +
                  (frequency === f
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")
                }
              >
                {FREQ_CONFIG[f].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {results && (
        <div aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Repayment
              </p>
              <p className="text-3xl font-bold text-orange-500">{fmtPrecise(results.selected.payment)}</p>
              <p className="mt-2 text-xs text-gray-500">
                per{" "}
                {frequency === "monthly"
                  ? "month"
                  : frequency === "fortnightly"
                  ? "fortnight"
                  : "week"}
              </p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Repayments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {fmt(results.selected.totalRepayments)}
              </p>
              <p className="mt-2 text-xs text-gray-500">over {loanTerm} years</p>
            </div>
            <div className="p-5 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Interest Paid</p>
              <p className="text-2xl font-bold text-red-600">{fmt(results.selected.totalInterest)}</p>
              <p className="mt-2 text-xs text-gray-500">
                {results.selected.totalRepayments > 0
                  ? (
                      (results.selected.totalInterest / results.selected.totalRepayments) *
                      100
                    ).toFixed(0)
                  : 0}
                % of total repayments
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Repayment Frequency Comparison
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Frequency
                  </th>
                  <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    Repayment
                  </th>
                  <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    Total Interest
                  </th>
                  <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    vs Monthly
                  </th>
                </tr>
              </thead>
              <tbody>
                {(["monthly", "fortnightly", "weekly"] as Frequency[]).map((f, i) => {
                  const r =
                    f === "monthly"
                      ? results.monthly
                      : f === "fortnightly"
                      ? results.fortnightly
                      : results.weekly;
                  const saving = results.monthly.totalInterest - r.totalInterest;
                  return (
                    <tr
                      key={f}
                      className={
                        (i < 2 ? "border-b border-gray-100 dark:border-gray-700 " : "") +
                        (frequency === f ? "bg-orange-50/50 dark:bg-orange-950/30" : "")
                      }
                    >
                      <td className="px-5 py-3 font-medium text-gray-900 dark:text-white capitalize">
                        {FREQ_CONFIG[f].label}
                        {frequency === f && (
                          <span className="ml-2 text-xs text-orange-500 font-normal">selected</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">
                        {fmtPrecise(r.payment)}
                      </td>
                      <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">
                        {fmt(r.totalInterest)}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold">
                        {saving > 1 ? (
                          <span className="text-green-600">Save {fmt(saving)}</span>
                        ) : (
                          <span className="text-gray-400 text-xs">baseline</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Calculations assume a principal-and-interest loan at a fixed rate over the full term.
            Does not account for offset accounts, redraw facilities, lender fees, or rate changes.
            For personalised advice, speak to a licensed mortgage broker or financial adviser.
          </p>
        </div>
      )}
    </div>
  );
}
