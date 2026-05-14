"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

// FY2025-26 income tax brackets — Stage 3 cuts (effective 1 July 2024)
const BRACKETS = [
  { min: 0,       max: 18200,    base: 0,      rate: 0 },
  { min: 18200,   max: 45000,    base: 0,      rate: 0.16 },
  { min: 45000,   max: 135000,   base: 4288,   rate: 0.30 },
  { min: 135000,  max: 190000,   base: 31288,  rate: 0.37 },
  { min: 190000,  max: Infinity, base: 51638,  rate: 0.45 },
];

// Low Income Tax Offset (LITO) FY2025-26
function lito(income: number): number {
  if (income <= 37500) return 700;
  if (income <= 45000) return 700 - (income - 37500) * 0.05;
  if (income <= 66667) return 325 - (income - 45000) * 0.015;
  return 0;
}

// Low and Middle Income Tax Offset (LMITO) — removed from FY2022-23 onwards
// Medicare levy (2%) with low-income threshold
function medicarLevy(income: number, hasPHI: boolean, dependants = 0): number {
  // Medicare levy surcharge for high earners without PHI
  const MLS_THRESHOLD = 93000; // FY2025-26 singles threshold (approx)
  // Standard Medicare levy
  const ML_SHADEOUT_LOWER = 26000;
  const ML_SHADEOUT_UPPER = 32500;
  let ml = 0;
  if (income >= ML_SHADEOUT_UPPER) {
    ml = income * 0.02;
  } else if (income > ML_SHADEOUT_LOWER) {
    ml = Math.min(income * 0.02, (income - ML_SHADEOUT_LOWER) * 0.1);
  }
  // Medicare Levy Surcharge (if no PHI and income > threshold)
  let mls = 0;
  if (!hasPHI && income > MLS_THRESHOLD) {
    if (income <= 108000) mls = income * 0.01;
    else if (income <= 144000) mls = income * 0.0125;
    else mls = income * 0.015;
  }
  return ml + mls;
}

function calcIncomeTax(income: number): number {
  if (income <= 0) return 0;
  const b = BRACKETS.findLast((br) => income > br.min)!;
  return b.base + (income - b.min) * b.rate;
}

function fmt(n: number): string {
  const abs = Math.abs(n);
  return (n < 0 ? "−" : "") + abs.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

type IncomeSource = { label: string; amount: string; withholding: string };

export default function TaxRefundCalc() {
  const [sources, setSources] = useState<IncomeSource[]>([
    { label: "Primary employer", amount: "", withholding: "" },
  ]);
  const [otherIncome, setOtherIncome] = useState("");
  const [workDeductions, setWorkDeductions] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [hasPHI, setHasPHI] = useState(false);
  const [residentStatus, setResidentStatus] = useState<"resident" | "nonresident">("resident");

  const [result, setResult] = useState<null | {
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    grossTax: number;
    litoOffset: number;
    medicareLevy: number;
    netTaxPayable: number;
    totalWithheld: number;
    outcome: number; // positive = refund, negative = amount owed
    effectiveRate: number;
    breakdown: { label: string; value: number; type: "income" | "deduction" | "tax" | "offset" | "withheld" | "result" }[];
  }>(null);

  const addSource = () =>
    setSources((s) => [...s, { label: `Income source ${s.length + 1}`, amount: "", withholding: "" }]);
  const removeSource = (i: number) => setSources((s) => s.filter((_, idx) => idx !== i));
  const updateSource = (i: number, field: keyof IncomeSource, val: string) =>
    setSources((s) => s.map((src, idx) => (idx === i ? { ...src, [field]: val } : src)));

  const calculate = useCallback(() => {
    const employmentIncome = sources.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    const totalWithheld = sources.reduce((sum, s) => sum + (parseFloat(s.withholding) || 0), 0);
    const other = parseFloat(otherIncome) || 0;
    const grossIncome = employmentIncome + other;
    const deductions = (parseFloat(workDeductions) || 0) + (parseFloat(otherDeductions) || 0);
    const taxableIncome = Math.max(0, grossIncome - deductions);

    const grossTax = calcIncomeTax(taxableIncome);
    const litoAmt = residentStatus === "resident" ? lito(taxableIncome) : 0;
    const ml = residentStatus === "resident" ? medicarLevy(taxableIncome, hasPHI) : 0;
    const netTaxPayable = Math.max(0, grossTax - litoAmt + ml);
    const outcome = totalWithheld - netTaxPayable;
    const effectiveRate = grossIncome > 0 ? (netTaxPayable / grossIncome) * 100 : 0;

    setResult({
      grossIncome,
      totalDeductions: deductions,
      taxableIncome,
      grossTax,
      litoOffset: litoAmt,
      medicareLevy: ml,
      netTaxPayable,
      totalWithheld,
      outcome,
      effectiveRate,
      breakdown: [
        { label: "Gross income", value: grossIncome, type: "income" },
        { label: "Work-related deductions", value: -deductions, type: "deduction" },
        { label: "Taxable income", value: taxableIncome, type: "income" },
        { label: "Income tax (gross)", value: -grossTax, type: "tax" },
        { label: "Low Income Tax Offset (LITO)", value: litoAmt, type: "offset" },
        { label: "Medicare levy (2%)", value: -ml, type: "tax" },
        { label: "Net tax payable", value: -netTaxPayable, type: "tax" },
        { label: "Total tax withheld (PAYG)", value: totalWithheld, type: "withheld" },
        { label: outcome >= 0 ? "Estimated refund" : "Estimated amount owed", value: outcome, type: "result" },
      ],
    });

    trackCalculation("tax-refund-estimator", {
      gross_income: grossIncome,
      taxable_income: taxableIncome,
      outcome_sign: outcome >= 0 ? "refund" : "owed",
    });
  }, [sources, otherIncome, workDeductions, otherDeductions, hasPHI, residentStatus]);

  const inputClass = "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-6">
      {/* Residency */}
      <div className="flex gap-3">
        {(["resident", "nonresident"] as const).map((r) => (
          <button key={r} onClick={() => setResidentStatus(r)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${residentStatus === r ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"}`}>
            {r === "resident" ? "Australian Resident" : "Non-Resident"}
          </button>
        ))}
      </div>

      {/* Income sources */}
      <div>
        <p className={labelClass}>Income sources & PAYG withholding</p>
        <div className="space-y-3">
          {sources.map((src, i) => (
            <div key={i} className="grid grid-cols-5 gap-2 items-end">
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">Source name</label>
                <input value={src.label} onChange={(e) => updateSource(i, "label", e.target.value)}
                  className={inputClass} placeholder="Employer / ABN income" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Gross income ($)</label>
                <input type="number" value={src.amount} onChange={(e) => updateSource(i, "amount", e.target.value)}
                  className={inputClass} placeholder="75000" min="0" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Tax withheld ($)</label>
                <input type="number" value={src.withholding} onChange={(e) => updateSource(i, "withholding", e.target.value)}
                  className={inputClass} placeholder="17000" min="0" />
              </div>
              <div className="flex items-end pb-0.5">
                {sources.length > 1 && (
                  <button onClick={() => removeSource(i)} className="text-xs text-red-400 hover:text-red-500 px-2 py-2">
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button onClick={addSource} className="mt-2 text-sm text-orange-500 hover:text-orange-600">
          + Add another income source
        </button>
      </div>

      {/* Other income & deductions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Other income (interest, dividends, rental, etc.)</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)}
              className={inputClass + " pl-6"} placeholder="0" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Work-related deductions</label>
          <p className="text-xs text-gray-400 mb-1">Car, WFH, tools, professional memberships</p>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={workDeductions} onChange={(e) => setWorkDeductions(e.target.value)}
              className={inputClass + " pl-6"} placeholder="0" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Other deductions</label>
          <p className="text-xs text-gray-400 mb-1">Donations, income protection insurance, investment expenses</p>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)}
              className={inputClass + " pl-6"} placeholder="0" min="0" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input type="checkbox" id="phi" checked={hasPHI} onChange={(e) => setHasPHI(e.target.checked)}
            className="w-4 h-4 accent-orange-500" />
          <label htmlFor="phi" className="text-sm text-gray-700 dark:text-gray-300">
            I have private hospital cover (avoids Medicare Levy Surcharge)
          </label>
        </div>
      </div>

      <button onClick={calculate}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Estimate My Tax Refund
      </button>

      {result && (
        <div className="mt-2 space-y-4">
          {/* Hero result */}
          <div className={`rounded-2xl p-6 text-center ${result.outcome >= 0 ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`}>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {result.outcome >= 0 ? "Estimated tax refund" : "Estimated tax to pay"}
            </p>
            <p className={`text-5xl font-bold ${result.outcome >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {fmt(Math.abs(result.outcome))}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Effective tax rate: {result.effectiveRate.toFixed(1)}% of gross income
            </p>
          </div>

          {/* Key figures */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Taxable income", val: result.taxableIncome },
              { label: "Tax payable", val: result.netTaxPayable },
              { label: "Tax withheld", val: result.totalWithheld },
            ].map(({ label, val }) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{fmt(val)}</p>
              </div>
            ))}
          </div>

          {/* Full breakdown */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Full breakdown</h3>
            <div className="space-y-1">
              {result.breakdown.filter(r => r.value !== 0).map(({ label, value, type }) => (
                <div key={label} className={`flex justify-between py-1.5 border-b border-gray-200 dark:border-gray-600 last:border-0 last:pt-2 last:font-bold ${type === "result" ? "text-base" : "text-sm"}`}>
                  <span className={type === "result" ? "text-gray-900 dark:text-white font-bold" : "text-gray-600 dark:text-gray-400"}>{label}</span>
                  <span className={
                    type === "result" ? (value >= 0 ? "text-green-600 dark:text-green-400 font-bold" : "text-red-600 dark:text-red-400 font-bold")
                    : type === "offset" || type === "withheld" ? "text-green-600 dark:text-green-400"
                    : type === "deduction" ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-900 dark:text-white"
                  }>
                    {value < 0 ? `−${fmt(Math.abs(value))}` : fmt(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {result.outcome < 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-sm text-amber-800 dark:text-amber-300">
              <strong>Tax debt note:</strong> If you owe tax, the ATO typically sends a notice of assessment after you lodge. You can pay via your myGov account, BPAY, or by contacting the ATO to arrange a payment plan.
            </div>
          )}

          <p className="text-xs text-gray-400 text-center pt-1">
            FY2025–26 rates. Estimate only — does not account for all offsets, levies, or individual circumstances.
            Lodge your return via myTax or a registered tax agent.
          </p>
        </div>
      )}
    </div>
  );
}
