"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

interface YearRow {
  age: number;
  balance: number;
  employerContribs: number;
  voluntaryContribs: number;
  investmentReturns: number;
}

function calcSuper(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  annualSalary: number,
  sgRate: number,
  voluntaryContrib: number,
  returnRate: number
): {
  finalBalance: number;
  totalEmployer: number;
  totalVoluntary: number;
  totalReturns: number;
  years: number;
  yearRows: YearRow[];
} {
  const years = retirementAge - currentAge;
  const r = returnRate / 100;
  let balance = currentBalance;
  let totalEmployer = 0;
  let totalVoluntary = 0;
  const yearRows: YearRow[] = [];

  for (let y = 0; y < years; y++) {
    const age = currentAge + y + 1;
    const employer = annualSalary * (sgRate / 100);
    const voluntary = voluntaryContrib * 12;

    // Apply return on start balance + half year of contributions (mid-year approximation)
    const midYearContribs = (employer + voluntary) / 2;
    const investReturns = (balance + midYearContribs) * r;

    balance = balance + employer + voluntary + investReturns;
    totalEmployer += employer;
    totalVoluntary += voluntary;

    yearRows.push({
      age,
      balance,
      employerContribs: totalEmployer,
      voluntaryContribs: totalVoluntary,
      investmentReturns: balance - currentBalance - totalEmployer - totalVoluntary,
    });
  }

  return {
    finalBalance: balance,
    totalEmployer,
    totalVoluntary,
    totalReturns: balance - currentBalance - totalEmployer - totalVoluntary,
    years,
    yearRows,
  };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

export default function SuperCalc() {
  const [currentAge, setCurrentAge] = useState("35");
  const [retirementAge, setRetirementAge] = useState("67");
  const [currentBalance, setCurrentBalance] = useState("80000");
  const [annualSalary, setAnnualSalary] = useState("80000");
  const [sgRate, setSgRate] = useState("11.5");
  const [voluntaryContrib, setVoluntaryContrib] = useState("200");
  const [returnRate, setReturnRate] = useState("7.0");
  const [result, setResult] = useState<ReturnType<typeof calcSuper> | null>(null);
  const [error, setError] = useState("");
  const [showAllYears, setShowAllYears] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const ca = parseInt(currentAge, 10);
      const ra = parseInt(retirementAge, 10);
      const cb = parseFloat(currentBalance);
      const sal = parseFloat(annualSalary);
      const sg = parseFloat(sgRate);
      const vc = parseFloat(voluntaryContrib) || 0;
      const rr = parseFloat(returnRate);

      if (!currentAge || !retirementAge || !annualSalary) {
        setResult(null);
        setError("");
        return;
      }
      if (isNaN(ca) || ca < 18 || ca > 65) {
        setError("Enter a current age between 18 and 65.");
        setResult(null);
        return;
      }
      if (isNaN(ra) || ra <= ca || ra > 75) {
        setError("Retirement age must be greater than your current age (max 75).");
        setResult(null);
        return;
      }
      if (isNaN(cb) || cb < 0) {
        setError("Enter a valid current super balance.");
        setResult(null);
        return;
      }
      if (isNaN(sal) || sal <= 0) {
        setError("Enter a valid annual salary.");
        setResult(null);
        return;
      }
      if (isNaN(sg) || sg < 0 || sg > 30) {
        setError("Enter a valid SG rate (0–30%).");
        setResult(null);
        return;
      }
      if (isNaN(rr) || rr < 0 || rr > 30) {
        setError("Enter a return rate between 0% and 30%.");
        setResult(null);
        return;
      }

      setError("");
      const res = calcSuper(ca, ra, cb, sal, sg, vc, rr);
      setResult(res);
      trackCalculation("superannuation_calculator", {
        currentAge: ca,
        retirementAge: ra,
        finalBalance: res.finalBalance,
        years: res.years,
      });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [currentAge, retirementAge, currentBalance, annualSalary, sgRate, voluntaryContrib, returnRate]);

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const displayYears = showAllYears ? result?.yearRows : result?.yearRows.slice(0, 10);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Superannuation Calculator
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className={labelClass}>Current Age</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min="18"
              max="65"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="e.g. 35"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium shrink-0">yrs</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>Retirement Age</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min="55"
              max="75"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="e.g. 67"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium shrink-0">yrs</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Preservation age: 60. Age Pension: 67.</p>
        </div>

        <div>
          <label className={labelClass}>Current Super Balance (AUD)</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(e.target.value)}
              placeholder="e.g. 80000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Annual Salary (AUD, before tax)</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
              placeholder="e.g. 80000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Employer SG Rate (%)
            <span className="ml-1 font-normal text-xs text-gray-400">FY2025: 11.5%</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="30"
              step="0.5"
              value={sgRate}
              onChange={(e) => setSgRate(e.target.value)}
              placeholder="11.5"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium">%</span>
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Monthly Voluntary Contribution (AUD)
            <span className="ml-1 font-normal text-xs text-gray-400">optional</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={voluntaryContrib}
              onChange={(e) => setVoluntaryContrib(e.target.value)}
              placeholder="e.g. 200"
              className={inputClass}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>
            Annual Investment Return Rate (%)
            <span className="ml-1 font-normal text-xs text-gray-400">long-term balanced fund avg: 7%</span>
          </label>
          <div className="flex items-center gap-2 max-w-xs">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="30"
              step="0.5"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              placeholder="7.0"
              className={inputClass}
            />
            <span className="text-gray-500 text-sm font-medium">%</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div aria-live="polite">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="col-span-2 sm:col-span-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Projected Balance at {retirementAge}
              </p>
              <p className="text-3xl font-bold text-orange-500">{fmt(result.finalBalance)}</p>
              <p className="mt-2 text-xs text-gray-500">in {result.years} years</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Employer Contribs</p>
              <p className="text-xl font-bold text-blue-600">{fmt(result.totalEmployer)}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Your Contribs</p>
              <p className="text-xl font-bold text-purple-600">{fmt(result.totalVoluntary)}</p>
            </div>
          </div>

          {/* Balance breakdown bar */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Balance Breakdown
            </p>
            <div className="flex rounded-full overflow-hidden h-6">
              {[
                { value: currentBalance, color: "bg-gray-400", label: "Opening" },
                { value: result.totalEmployer, color: "bg-blue-400", label: "Employer" },
                { value: result.totalVoluntary, color: "bg-purple-400", label: "Voluntary" },
                { value: Math.max(0, result.totalReturns), color: "bg-green-400", label: "Growth" },
              ]
                .filter((s) => s.value > 0)
                .map((s) => (
                  <div
                    key={s.label}
                    className={`${s.color} flex items-center justify-center text-xs text-white font-medium`}
                    style={{ width: `${(s.value / result.finalBalance) * 100}%` }}
                    title={`${s.label}: ${fmt(s.value)}`}
                  />
                ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { color: "bg-gray-400", label: "Opening balance", value: currentBalance },
                { color: "bg-blue-400", label: "Employer SG", value: result.totalEmployer },
                { color: "bg-purple-400", label: "Voluntary", value: result.totalVoluntary },
                { color: "bg-green-400", label: "Investment growth", value: result.totalReturns },
              ]
                .filter((s) => s.value > 0)
                .map((s) => (
                  <span key={s.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`w-3 h-3 rounded-sm ${s.color} inline-block`} />
                    {s.label}: {fmt(s.value)}
                  </span>
                ))}
            </div>
          </div>

          {/* Year-by-year table */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Year-by-Year Super Growth
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-500">Age</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Balance</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Total Employer</th>
                    <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-500">Total Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {displayYears?.map((row) => (
                    <tr
                      key={row.age}
                      className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <td className="px-5 py-2.5 font-medium text-gray-900 dark:text-white">
                        Age {row.age}
                      </td>
                      <td className="px-5 py-2.5 text-right font-semibold text-orange-500">
                        {fmt(row.balance)}
                      </td>
                      <td className="px-5 py-2.5 text-right text-blue-600">
                        {fmt(row.employerContribs)}
                      </td>
                      <td className="px-5 py-2.5 text-right text-green-600">
                        {fmt(row.investmentReturns)}
                      </td>
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
                  {showAllYears ? "Show less" : `Show all ${result.yearRows.length} years`}
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Projections assume constant salary, SG rate, and investment returns. Does not account
            for super tax (15% on contributions and earnings), insurance premiums, fund fees, salary
            increases, or government co-contributions. For personalised retirement advice, speak to
            a licensed financial adviser.
          </p>
        </div>
      )}
    </div>
  );
}
