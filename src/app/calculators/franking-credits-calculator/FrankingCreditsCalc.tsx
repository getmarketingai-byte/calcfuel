"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

// FY2025-26 income tax brackets (resident)
const BRACKETS = [
  { min: 0,       max: 18200,    base: 0,      rate: 0 },
  { min: 18200,   max: 45000,    base: 0,      rate: 0.19 },
  { min: 45000,   max: 120000,   base: 5092,   rate: 0.325 },
  { min: 120000,  max: 180000,   base: 29467,  rate: 0.37 },
  { min: 180000,  max: Infinity, base: 51667,  rate: 0.45 },
];
const COMPANY_TAX_RATE = 0.30; // standard Australian company tax rate
const SMALL_CO_TAX_RATE = 0.25; // base rate entity (turnover < $50M)

function calcIncomeTax(income: number): number {
  if (income <= 0) return 0;
  const b = BRACKETS.findLast((br) => income > br.min)!;
  return b.base + (income - b.min) * b.rate;
}

function lito(income: number): number {
  if (income <= 37500) return 700;
  if (income <= 45000) return 700 - (income - 37500) * 0.05;
  if (income <= 66667) return 325 - (income - 45000) * 0.015;
  return 0;
}

function fmt(n: number, decimals = 0): string {
  const abs = Math.abs(n);
  return (n < 0 ? "−" : "") + abs.toLocaleString("en-AU", {
    style: "currency", currency: "AUD", maximumFractionDigits: decimals,
  });
}
function pct(n: number) { return n.toFixed(1) + "%"; }

type Mode = "investor" | "company";

export default function FrankingCreditsCalc() {
  const [mode, setMode] = useState<Mode>("investor");

  // Investor mode
  const [cashDividend, setCashDividend] = useState("700");
  const [frankingPct, setFrankingPct] = useState("100");
  const [isSmallCo, setIsSmallCo] = useState(false);
  const [otherIncome, setOtherIncome] = useState("80000");

  // Company mode (calculate max franked dividend)
  const [retainedProfits, setRetainedProfits] = useState("50000");
  const [frankingAccountBalance, setFrankingAccountBalance] = useState("15000");

  const [result, setResult] = useState<null | {
    mode: Mode;
    // investor
    frankingCredit?: number;
    grossedUpDividend?: number;
    taxOnDividend?: number;
    netTaxAfterCredit?: number;
    refundableCredit?: number;
    effectiveDividendTax?: number;
    marginalRate?: number;
    // company
    maxFrankedDividend?: number;
    frankingCreditAttached?: number;
    frankingAccountRemaining?: number;
  }>(null);

  const calculate = useCallback(() => {
    if (mode === "investor") {
      const cash = parseFloat(cashDividend) || 0;
      const fPct = Math.min(100, Math.max(0, parseFloat(frankingPct) || 0));
      const corpRate = isSmallCo ? SMALL_CO_TAX_RATE : COMPANY_TAX_RATE;
      const other = parseFloat(otherIncome) || 0;

      // Franking credit = cash dividend × (franking %) × (corp rate / (1 - corp rate))
      const frankingCredit = cash * (fPct / 100) * (corpRate / (1 - corpRate));
      const grossedUpDividend = cash + frankingCredit;
      const taxableIncome = other + grossedUpDividend;

      // Marginal rate on the grossed-up dividend
      // Calculate tax with and without dividend
      const taxWithout = Math.max(0, calcIncomeTax(other) - lito(other));
      const taxWith = Math.max(0, calcIncomeTax(taxableIncome) - lito(taxableIncome));
      const taxOnDividend = taxWith - taxWithout;
      const netTaxAfterCredit = taxOnDividend - frankingCredit;
      const refundableCredit = netTaxAfterCredit < 0 ? Math.abs(netTaxAfterCredit) : 0;

      // Effective rate on cash dividend
      const effectiveTaxCost = Math.max(0, netTaxAfterCredit);
      const effectiveDividendTax = cash > 0 ? (effectiveTaxCost / cash) * 100 : 0;

      // Marginal rate at their total income level
      const marginalBracket = BRACKETS.findLast(b => taxableIncome > b.min);
      const marginalRate = marginalBracket ? marginalBracket.rate * 100 : 0;

      setResult({
        mode,
        frankingCredit,
        grossedUpDividend,
        taxOnDividend,
        netTaxAfterCredit,
        refundableCredit,
        effectiveDividendTax,
        marginalRate,
      });
    } else {
      const balance = parseFloat(frankingAccountBalance) || 0;
      const corpRate = isSmallCo ? SMALL_CO_TAX_RATE : COMPANY_TAX_RATE;
      // Max fully franked dividend = franking account balance × (1 - corpRate) / corpRate
      const maxFrankedDividend = balance * ((1 - corpRate) / corpRate);
      const frankingCreditAttached = Math.min(balance, maxFrankedDividend * (corpRate / (1 - corpRate)));
      const frankingAccountRemaining = balance - frankingCreditAttached;

      setResult({
        mode,
        maxFrankedDividend,
        frankingCreditAttached,
        frankingAccountRemaining,
      });
    }

    trackCalculation("franking-credits-calculator", {
      mode,
      cash_dividend: parseFloat(cashDividend) || 0,
      franking_pct: parseFloat(frankingPct) || 0,
    });
  }, [mode, cashDividend, frankingPct, isSmallCo, otherIncome, frankingAccountBalance, retainedProfits]);

  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
      {/* Mode selector */}
      <div className="flex gap-3">
        {([["investor", "Investor — calculate tax on dividends"], ["company", "Company — calculate max franked dividend"]] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${mode === m ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"}`}>
            {label}
          </button>
        ))}
      </div>

      {mode === "investor" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Cash dividend received ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
              <input type="number" value={cashDividend} onChange={e => setCashDividend(e.target.value)}
                className={inputClass + " pl-6"} placeholder="700" min="0" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Franking percentage</label>
            <div className="relative">
              <input type="number" value={frankingPct} onChange={e => setFrankingPct(e.target.value)}
                className={inputClass + " pr-6"} placeholder="100" min="0" max="100" />
              <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Check your dividend statement. Most large ASX companies pay 100% franked dividends.</p>
          </div>
          <div>
            <label className={labelClass}>Other taxable income (salary, etc.)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e => setOtherIncome(e.target.value)}
                className={inputClass + " pl-6"} placeholder="80000" min="0" />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <input type="checkbox" id="smallco" checked={isSmallCo} onChange={e => setIsSmallCo(e.target.checked)}
              className="w-4 h-4 accent-orange-500" />
            <label htmlFor="smallco" className="text-sm text-gray-700 dark:text-gray-300">
              Small company (25% tax rate, turnover &lt; $50M)
            </label>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Franking account balance ($)</label>
            <p className="text-xs text-gray-400 mb-1">From your company&apos;s franking account statement</p>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
              <input type="number" value={frankingAccountBalance} onChange={e => setFrankingAccountBalance(e.target.value)}
                className={inputClass + " pl-6"} placeholder="15000" min="0" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Retained profits ($)</label>
            <p className="text-xs text-gray-400 mb-1">Available for distribution</p>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
              <input type="number" value={retainedProfits} onChange={e => setRetainedProfits(e.target.value)}
                className={inputClass + " pl-6"} placeholder="50000" min="0" />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input type="checkbox" id="smallco2" checked={isSmallCo} onChange={e => setIsSmallCo(e.target.checked)}
              className="w-4 h-4 accent-orange-500" />
            <label htmlFor="smallco2" className="text-sm text-gray-700 dark:text-gray-300">
              Base rate entity / small company (25% tax rate)
            </label>
          </div>
        </div>
      )}

      <button onClick={calculate}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Calculate Franking Credits
      </button>

      {result && (
        <div className="space-y-4 mt-2">
          {result.mode === "investor" && result.frankingCredit !== undefined && (
            <>
              {/* Hero metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Franking credit</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{fmt(result.frankingCredit)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Grossed-up dividend</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.grossedUpDividend!)}</p>
                </div>
                {(result.refundableCredit ?? 0) > 0 ? (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Excess credit (refundable)</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(result.refundableCredit!)}</p>
                  </div>
                ) : (
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Additional tax on dividend</p>
                    <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{fmt(Math.max(0, result.netTaxAfterCredit!))}</p>
                  </div>
                )}
              </div>

              {/* Breakdown table */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">How dividend imputation works for you</h3>
                {[
                  ["Cash dividend received", fmt(parseFloat(cashDividend) || 0)],
                  ["Add: franking credit (" + pct((isSmallCo ? 25 : 30)) + " company tax rate)", fmt(result.frankingCredit)],
                  ["= Grossed-up dividend (assessable income)", fmt(result.grossedUpDividend!)],
                  ["Tax on grossed-up dividend (at " + pct(result.marginalRate!) + " marginal rate)", "−" + fmt(Math.abs(result.taxOnDividend!))],
                  ["Less: franking credit offset", fmt(result.frankingCredit)],
                  [(result.netTaxAfterCredit! >= 0 ? "Net tax payable on dividend" : "Excess credit — refundable via tax return"), (result.netTaxAfterCredit! >= 0 ? "−" + fmt(result.netTaxAfterCredit!) : fmt(Math.abs(result.netTaxAfterCredit!)))],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-600 last:border-0">
                    <span className="text-gray-600 dark:text-gray-400">{label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
                <strong>Effective tax rate on your dividend: {pct(result.effectiveDividendTax!)}.</strong>
                {(result.refundableCredit ?? 0) > 0
                  ? ` Your marginal rate (${pct(result.marginalRate!)}) is lower than the company tax rate, so you receive a ${fmt(result.refundableCredit!)} refund of excess franking credits when you lodge your tax return.`
                  : ` You pay an additional ${fmt(Math.max(0, result.netTaxAfterCredit!))} — the gap between your marginal rate (${pct(result.marginalRate!)}) and the company tax rate already paid.`
                }
              </div>
            </>
          )}

          {result.mode === "company" && result.maxFrankedDividend !== undefined && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Max fully franked dividend</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(result.maxFrankedDividend)}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Franking credit attached</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{fmt(result.frankingCreditAttached!)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Franking account balance remaining</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.frankingAccountRemaining!)}</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
                With a franking account balance of {fmt(parseFloat(frankingAccountBalance) || 0)}, your company can pay a fully franked dividend of up to {fmt(result.maxFrankedDividend)} and attach {fmt(result.frankingCreditAttached!)} in franking credits. Shareholders will receive the cash dividend and be entitled to offset the franking credit against their personal tax.
              </div>
            </>
          )}

          <p className="text-xs text-gray-400 text-center pt-1">
            FY2025–26 rates. Estimates only — consult your accountant or tax agent before making dividend decisions.
          </p>
        </div>
      )}
    </div>
  );
}
