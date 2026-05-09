"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

type CompoundFreq = "daily" | "monthly" | "quarterly" | "yearly";
type ContribFreq = "monthly" | "yearly" | "none";

const COMPOUND_PERIODS: Record<CompoundFreq, { label: string; n: number }> = {
  daily:     { label: "Daily",     n: 365 },
  monthly:   { label: "Monthly",   n: 12 },
  quarterly: { label: "Quarterly", n: 4 },
  yearly:    { label: "Yearly",    n: 1 },
};

interface YearRow {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

function calcCompound(
  principal: number,
  annualRate: number,
  years: number,
  compoundFreq: CompoundFreq,
  contribFreq: ContribFreq,
  contribAmount: number
): { finalBalance: number; totalContributions: number; totalInterest: number; yearRows: YearRow[] } {
  const n = COMPOUND_PERIODS[compoundFreq].n;
  const r = annualRate / 100 / n;
  const yearRows: YearRow[] = [];

  let balance = principal;
  let totalContributions = principal;

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    const contribsThisYear =
      contribFreq === "monthly"
        ? contribAmount * 12
        : contribFreq === "yearly"
        ? contribAmount
        : 0;

    // Compound each period within the year
    const periodsPerYear = n;
    const contribsPerPeriod =
      contribFreq === "monthly"
        ? contribAmount * (12 / periodsPerYear)
        : contribFreq === "yearly"
        ? contribAmount / periodsPerYear
        : 0;

    for (let p = 0; p < periodsPerYear; p++) {
      balance = balance * (1 + r) + contribsPerPeriod;
    }

    totalContributions += contribsThisYear;
    const interestThisYear = balance - startBalance - contribsThisYear;

    yearRows.push({
      year,
      balance,
      contributions: totalContributions,
      interest: balance - totalContributions,
    });
  }

  return {
    finalBalance: balance,
    totalContributions,
    totalInterest: balance - totalContributions,
    yearRows,
  };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

export default function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7.00");
  const [years, setYears] = useState("10");
  const [compoundFreq, setCompoundFreq] = useState<CompoundFreq>("monthly");
  const [contribFreq, setContribFreq] = useState<ContribFreq>("monthly");
  const [contribAmount, setContribAmount] = useState("200");
  const [result, setResult] = useState<ReturnType<typeof calcCompound> | null>(null);
  const [error, setError] = useState("");
  const [showAllYears, setShowAllYears] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const p = parseFloat(principal);
      const r = parseFloat(rate);
      const y = parseInt(years, 10);
      const c = parseFloat(contribAmount) || 0;

      if (!principal || !rate || !years) { setResult(null); setError(""); return; }
      if (isNaN(p) || p < 0) { setError("Enter a valid starting amount."); setResult(null); return; }
      if (isNaN(r) || r < 0 || r > 50) { setError("Enter an interest rate between 0% and 50%."); setResult(null); return; }
      if (isNaN(y) || y < 1 || y > 50) { setError("Enter a period between 1 and 50 years."); setResult(null); return; }
      if (contribFreq !== "none" && (isNaN(c) || c < 0)) { setError("Enter a valid contribution amount."); setResult(null); return; }

      setError("");
      const res = calcCompound(p, r, y, compoundFreq, contribFreq, c);
      setResult(res);
      trackCalculation("compound_interest_calculator", {
        principal: p,
        rate: r,
        years: y,
        compoundFreq,
        contribFreq,
        finalBalance: res.finalBalance,
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [principal, rate, years, compoundFreq, contribFreq, contribAmount]);

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const displayYears = showAllYears ? result?.yearRows : result?.yearRows.slice(0, 10);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Compound Interest Calculator</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className={labelClass}>Starting Amount (AUD)</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 10000"
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
              max="50"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 7.00"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium">%</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Investment Period (Years)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 10"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium">yrs</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Compound Frequency</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full">
            {(["daily", "monthly", "quarterly", "yearly"] as CompoundFreq[]).map((f) => (
              <button
                key={f}
                onClick={() => setCompoundFreq(f)}
                className={
                  "flex-1 py-2.5 text-xs font-medium transition-colors " +
                  (compoundFreq === f
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")
                }
              >
                {COMPOUND_PERIODS[f].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Regular Contributions</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full">
            {(["monthly", "yearly", "none"] as ContribFreq[]).map((f) => (
              <button
                key={f}
                onClick={() => setContribFreq(f)}
                className={
                  "flex-1 py-2.5 text-xs font-medium transition-colors capitalize " +
                  (contribFreq === f
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {contribFreq !== "none" && (
          <div>
            <label className={labelClass}>
              {contribFreq === "monthly" ? "Monthly" : "Yearly"} Contribution (AUD)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-medium">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                value={contribAmount}
                onChange={(e) => setContribAmount(e.target.value)}
                placeholder="e.g. 200"
                className={inputClass}
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div aria-live="polite">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Final Balance</p>
              <p className="text-3xl font-bold text-orange-500">{fmt(result.finalBalance)}</p>
              <p className="mt-2 text-xs text-gray-500">after {years} years</p>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Contributed</p>
              <p className="text-2xl font-bold text-blue-600">{fmt(result.totalContributions)}</p>
              <p className="mt-2 text-xs text-gray-500">your money in</p>
            </div>
            <div className="p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Interest Earned</p>
              <p className="text-2xl font-bold text-green-600">{fmt(result.totalInterest)}</p>
              <p className="mt-2 text-xs text-gray-500">
                {result.finalBalance > 0
                  ? ((result.totalInterest / result.finalBalance) * 100).toFixed(0)
                  : 0}
                % of final balance
              </p>
            </div>
          </div>

          {/* Growth bar */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Balance Breakdown</p>
            <div className="flex rounded-full overflow-hidden h-6">
              <div
                className="bg-blue-400 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${(result.totalContributions / result.finalBalance) * 100}%` }}
              >
                {result.finalBalance > 0
                  ? ((result.totalContributions / result.finalBalance) * 100).toFixed(0) + "%"
                  : ""}
              </div>
              <div
                className="bg-green-400 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${(result.totalInterest / result.finalBalance) * 100}%` }}
              >
                {result.finalBalance > 0
                  ? ((result.totalInterest / result.finalBalance) * 100).toFixed(0) + "%"
                  : ""}
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" />
                Contributions
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm bg-green-400 inline-block" />
                Interest
              </span>
            </div>
          </div>

          {/* Year-by-year table */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Year-by-Year Growth</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-500">Year</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Balance</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Contributions</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {displayYears?.map((row) => (
                    <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <td className="px-5 py-2.5 font-medium text-gray-900 dark:text-white">Year {row.year}</td>
                      <td className="px-5 py-2.5 text-right font-semibold text-orange-500">{fmt(row.balance)}</td>
                      <td className="px-5 py-2.5 text-right text-gray-600 dark:text-gray-400">
                        {fmt(row.contributions)}
                      </td>
                      <td className="px-5 py-2.5 text-right text-green-600">{fmt(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.yearRows.length > 10 && (
              <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={() => setShowAllYears(!showAllYears)}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  {showAllYears
                    ? "Show less"
                    : `Show all ${result.yearRows.length} years`}
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Calculations assume a fixed annual interest rate compounded at the selected frequency. Does not account for tax on investment returns, inflation, or fees. For personalised advice, speak to a licensed financial adviser.
          </p>
        </div>
      )}
    </div>
  );
}
