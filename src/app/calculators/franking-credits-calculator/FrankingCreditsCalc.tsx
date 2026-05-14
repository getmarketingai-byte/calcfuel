"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

const CORP_RATES = [
  { label: "30% — Large companies", value: 0.30 },
  { label: "25% — Base rate entities (small companies)", value: 0.25 },
];

// Marginal rates including Medicare levy (2%)
const INVESTOR_RATES = [
  { label: "0% — Tax-free / super accumulation", incl: 0, base: 0 },
  { label: "21% — 19% + 2% Medicare", incl: 0.21, base: 0.19 },
  { label: "34.5% — 32.5% + 2% Medicare", incl: 0.345, base: 0.325 },
  { label: "39% — 37% + 2% Medicare", incl: 0.39, base: 0.37 },
  { label: "47% — 45% + 2% Medicare", incl: 0.47, base: 0.45 },
];

interface FCResult {
  cashDividend: number;
  frankingCredit: number;
  grossedUpDividend: number;
  taxOnGrossed: number;
  netTaxPosition: number; // positive = additional tax; negative = refund
}

function calculate(cashDividend: number, frankingPct: number, corpRate: number, marginalRateIncl: number): FCResult {
  const frankingCredit = (cashDividend / (1 - corpRate)) * corpRate * (frankingPct / 100);
  const grossedUpDividend = cashDividend + frankingCredit;
  const taxOnGrossed = grossedUpDividend * marginalRateIncl;
  const netTaxPosition = taxOnGrossed - frankingCredit;
  return { cashDividend, frankingCredit, grossedUpDividend, taxOnGrossed, netTaxPosition };
}

export default function FrankingCreditsCalc() {
  const [cashDividend, setCashDividend] = useState("");
  const [frankingPct, setFrankingPct] = useState("100");
  const [corpRate, setCorpRate] = useState(0.30);
  const [marginalRateIncl, setMarginalRateIncl] = useState(0.345);
  const [result, setResult] = useState<FCResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(n);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const cd = parseFloat(cashDividend.replace(/,/g, ""));
      const fp = parseFloat(frankingPct);
      if (!cashDividend || isNaN(cd) || cd <= 0 || isNaN(fp) || fp < 0 || fp > 100) {
        setResult(null);
        return;
      }
      const r = calculate(cd, fp, corpRate, marginalRateIncl);
      setResult(r);
      trackCalculation("franking_credits", {
        cash_dividend: cd,
        franking_credit: r.frankingCredit,
        grossed_up: r.grossedUpDividend,
      });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [cashDividend, frankingPct, corpRate, marginalRateIncl]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Franking Credits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cash dividend amount (AUD)</label>
          <input
            type="text"
            inputMode="decimal"
            value={cashDividend}
            onChange={(e) => setCashDividend(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">The cash amount received (before grossing up)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Franking percentage (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={frankingPct}
            onChange={(e) => setFrankingPct(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">100% = fully franked; 0% = unfranked</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company tax rate</label>
          <select
            value={corpRate}
            onChange={(e) => setCorpRate(parseFloat(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {CORP_RATES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your marginal rate (incl. Medicare)</label>
          <select
            value={marginalRateIncl}
            onChange={(e) => setMarginalRateIncl(parseFloat(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {INVESTOR_RATES.map((r) => (
              <option key={r.incl} value={r.incl}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Franking Credit</p>
              <p className="text-xl font-bold text-blue-600">{fmt(result.frankingCredit)}</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Grossed-Up Dividend</p>
              <p className="text-xl font-bold text-orange-500">{fmt(result.grossedUpDividend)}</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Tax on Grossed-Up</p>
              <p className="text-xl font-bold text-red-600">{fmt(result.taxOnGrossed)}</p>
            </div>
            <div className={`p-4 rounded-xl border ${result.netTaxPosition <= 0 ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800" : "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800"}`}>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                {result.netTaxPosition <= 0 ? "Tax Refund / Saving" : "Additional Tax Owing"}
              </p>
              <p className={`text-xl font-bold ${result.netTaxPosition <= 0 ? "text-green-600" : "text-purple-600"}`}>
                {fmt(Math.abs(result.netTaxPosition))}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm space-y-1">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Full Breakdown</h3>
            <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>Cash dividend received</span><span>{fmt(result.cashDividend)}</span></div>
            <div className="flex justify-between text-blue-700 dark:text-blue-300"><span>+ Franking credit ({frankingPct}% franked @ {(corpRate * 100).toFixed(0)}% tax rate)</span><span>{fmt(result.frankingCredit)}</span></div>
            <div className="flex justify-between font-medium text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 pt-2"><span>= Grossed-up dividend</span><span>{fmt(result.grossedUpDividend)}</span></div>
            <div className="flex justify-between text-red-700 dark:text-red-300"><span>Tax on grossed-up ({(marginalRateIncl * 100).toFixed(1)}%)</span><span>({fmt(result.taxOnGrossed)})</span></div>
            <div className="flex justify-between text-blue-700 dark:text-blue-300"><span>Less: franking credit offset</span><span>{fmt(result.frankingCredit)}</span></div>
            <div className={`flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-2 ${result.netTaxPosition <= 0 ? "text-green-600" : "text-purple-600"}`}>
              <span>{result.netTaxPosition <= 0 ? "Net benefit (refund/saving)" : "Net additional tax"}</span>
              <span>{fmt(Math.abs(result.netTaxPosition))}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="text-left px-3 py-2 text-gray-700 dark:text-gray-300">Marginal Rate</th>
                  <th className="text-right px-3 py-2 text-gray-700 dark:text-gray-300">Tax on Grossed-Up</th>
                  <th className="text-right px-3 py-2 text-gray-700 dark:text-gray-300">Net Position</th>
                </tr>
              </thead>
              <tbody>
                {INVESTOR_RATES.map((r) => {
                  const res = calculate(result.cashDividend, parseFloat(frankingPct), corpRate, r.incl);
                  return (
                    <tr key={r.incl} className={`border-t border-gray-200 dark:border-gray-700 ${r.incl === marginalRateIncl ? "bg-orange-50 dark:bg-orange-950 font-semibold" : ""}`}>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{r.label}</td>
                      <td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">{fmt(res.taxOnGrossed)}</td>
                      <td className={`px-3 py-2 text-right font-medium ${res.netTaxPosition <= 0 ? "text-green-600" : "text-red-600"}`}>
                        {res.netTaxPosition <= 0 ? `Saving ${fmt(Math.abs(res.netTaxPosition))}` : `Owing ${fmt(res.netTaxPosition)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Source:{" "}
            <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/dividends-and-deductions/franking-credits" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">
              ATO — Franking credits
            </a>. Estimates only. Does not account for tax-free thresholds, offsets, or superannuation fund tax treatment in detail.
          </p>
        </div>
      )}
    </div>
  );
}
