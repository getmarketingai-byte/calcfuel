"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

// 2025-26 Australian resident tax rates
function calcResidentTax(taxableIncome: number): number {
  if (taxableIncome <= 18200) return 0;
  if (taxableIncome <= 45000) return (taxableIncome - 18200) * 0.19;
  if (taxableIncome <= 120000) return 5092 + (taxableIncome - 45000) * 0.325;
  if (taxableIncome <= 180000) return 29467 + (taxableIncome - 120000) * 0.37;
  return 51667 + (taxableIncome - 180000) * 0.45;
}

// LITO 2025-26
function calcLITO(taxableIncome: number): number {
  if (taxableIncome <= 37500) return 700;
  if (taxableIncome <= 45000) return 700 - (taxableIncome - 37500) * 0.05;
  if (taxableIncome <= 66667) return 325 - (taxableIncome - 45000) * 0.015;
  return 0;
}

// Medicare levy (2%)
function calcMedicare(taxableIncome: number): number {
  const threshold = 26000; // approx 2025-26 shade-in threshold
  if (taxableIncome <= threshold) return 0;
  if (taxableIncome <= 32500) return (taxableIncome - threshold) * 0.10;
  return taxableIncome * 0.02;
}

interface RefundResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  incomeTax: number;
  litoOffset: number;
  medicareLevy: number;
  totalTaxPayable: number;
  taxWithheld: number;
  refundOrOwing: number;
}

function calculate(grossIncome: number, taxWithheld: number, workDeductions: number, otherDeductions: number): RefundResult {
  const totalDeductions = workDeductions + otherDeductions;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);
  const incomeTax = calcResidentTax(taxableIncome);
  const litoOffset = calcLITO(taxableIncome);
  const medicareLevy = calcMedicare(taxableIncome);
  const totalTaxPayable = Math.max(0, incomeTax - litoOffset + medicareLevy);
  const refundOrOwing = taxWithheld - totalTaxPayable;
  return {
    grossIncome,
    totalDeductions,
    taxableIncome,
    incomeTax,
    litoOffset,
    medicareLevy,
    totalTaxPayable,
    taxWithheld,
    refundOrOwing,
  };
}

export default function TaxRefundCalc() {
  const [grossIncome, setGrossIncome] = useState("");
  const [taxWithheld, setTaxWithheld] = useState("");
  const [workDeductions, setWorkDeductions] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<RefundResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);

  const parseVal = (s: string) => parseFloat(s.replace(/,/g, "")) || 0;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const gi = parseVal(grossIncome);
      const tw = parseVal(taxWithheld);
      if (!grossIncome || isNaN(gi) || gi < 0) {
        setResult(null);
        return;
      }
      const r = calculate(gi, tw, parseVal(workDeductions), parseVal(otherDeductions));
      setResult(r);
      trackCalculation("tax_refund", {
        gross_income: gi,
        taxable_income: r.taxableIncome,
        refund_amount: r.refundOrOwing,
      });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [grossIncome, taxWithheld, workDeductions, otherDeductions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Estimate Your Tax Refund or Bill</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual gross income (AUD)</label>
          <input
            type="text"
            inputMode="decimal"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            placeholder="e.g. 85000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Total salary and wages before tax</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tax already withheld — PAYG (AUD)</label>
          <input
            type="text"
            inputMode="decimal"
            value={taxWithheld}
            onChange={(e) => setTaxWithheld(e.target.value)}
            placeholder="e.g. 22000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">From your payment summary or income statement</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total work-related deductions (AUD)</label>
          <input
            type="text"
            inputMode="decimal"
            value={workDeductions}
            onChange={(e) => setWorkDeductions(e.target.value)}
            placeholder="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">WFH, uniform, tools, vehicle etc.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Other deductions (AUD)</label>
          <input
            type="text"
            inputMode="decimal"
            value={otherDeductions}
            onChange={(e) => setOtherDeductions(e.target.value)}
            placeholder="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Charitable donations, investment expenses etc.</p>
        </div>
      </div>

      {result !== null && (
        <div className="space-y-4" aria-live="polite">
          <div
            className={`p-5 rounded-xl border ${
              result.refundOrOwing >= 0
                ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
            }`}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              {result.refundOrOwing >= 0 ? "Estimated Tax Refund" : "Estimated Tax Owing"}
            </p>
            <p
              className={`text-3xl font-bold ${
                result.refundOrOwing >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {fmt(Math.abs(result.refundOrOwing))}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Tax Breakdown</h3>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Gross income</span><span>{fmt(result.grossIncome)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Total deductions</span><span>({fmt(result.totalDeductions)})</span>
            </div>
            <div className="flex justify-between font-medium text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>Taxable income</span><span>{fmt(result.taxableIncome)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Income tax</span><span>{fmt(result.incomeTax)}</span>
            </div>
            <div className="flex justify-between text-green-700 dark:text-green-400">
              <span>LITO offset</span><span>({fmt(result.litoOffset)})</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Medicare levy (2%)</span><span>{fmt(result.medicareLevy)}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>Total tax payable</span><span>{fmt(result.totalTaxPayable)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Tax withheld (PAYG)</span><span>{fmt(result.taxWithheld)}</span>
            </div>
            <div className={`flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-2 ${result.refundOrOwing >= 0 ? "text-green-600" : "text-red-600"}`}>
              <span>{result.refundOrOwing >= 0 ? "Refund" : "Tax owing"}</span>
              <span>{fmt(Math.abs(result.refundOrOwing))}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Uses 2025–26 resident tax rates, LITO, and 2% Medicare levy. Does not include LMITO, SAPTO, private health rebate, HECS repayments, or offsets for foreign income. For HECS obligations, see our{" "}
            <a href="/calculators/hecs-help-calculator" className="text-orange-500 underline">HECS-HELP Calculator</a>.
          </p>
        </div>
      )}
    </div>
  );
}
