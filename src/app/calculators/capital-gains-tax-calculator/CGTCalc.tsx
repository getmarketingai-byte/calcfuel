"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

interface CalcResult {
  capitalGain: number;
  discountedGain: number;
  taxableGain: number;
  cgTax: number;
  effectiveCGTRate: number;
  marginalRate: number;
  discountApplied: boolean;
}

function calcResidentTax(income: number): number {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.19;
  if (income <= 120000) return 5092 + (income - 45000) * 0.325;
  if (income <= 180000) return 29467 + (income - 120000) * 0.37;
  return 51667 + (income - 180000) * 0.45;
}

function getMarginalRate(income: number): number {
  if (income <= 18200) return 0;
  if (income <= 45000) return 0.19;
  if (income <= 120000) return 0.325;
  if (income <= 180000) return 0.37;
  return 0.45;
}

function calcLITO(income: number): number {
  if (income <= 37500) return 700;
  if (income <= 45000) return 700 - (income - 37500) * 0.05;
  if (income <= 66667) return 325 - (income - 45000) * 0.015;
  return 0;
}

function calcMedicare(income: number): number {
  if (income <= 26000) return 0;
  if (income <= 32500) return Math.min(income * 0.02, (income - 26000) * 0.1);
  return income * 0.02;
}

export default function CGTCalc() {
  const [costBase, setCostBase] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [heldOver12, setHeldOver12] = useState(true);
  const [result, setResult] = useState<CalcResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fmt = (n: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n);
  const fmtPct = (n: number) => n.toFixed(1) + "%";

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!costBase || !salePrice) { setResult(null); return; }
      const cost = parseFloat(costBase.replace(/,/g, ""));
      const sale = parseFloat(salePrice.replace(/,/g, ""));
      const other = parseFloat(otherIncome.replace(/,/g, "")) || 0;
      if (isNaN(cost) || isNaN(sale)) { setResult(null); return; }
      const capitalGain = Math.max(0, sale - cost);
      const discountApplied = heldOver12 && capitalGain > 0;
      const discountedGain = discountApplied ? capitalGain * 0.5 : capitalGain;
      const totalIncome = other + discountedGain;
      const taxOnTotal = Math.max(0, calcResidentTax(totalIncome) - Math.min(calcLITO(totalIncome), calcResidentTax(totalIncome))) + calcMedicare(totalIncome);
      const taxWithoutGain = Math.max(0, calcResidentTax(other) - Math.min(calcLITO(other), calcResidentTax(other))) + calcMedicare(other);
      const cgTax = Math.max(0, taxOnTotal - taxWithoutGain);
      const marginalRate = getMarginalRate(other + discountedGain) * 100;
      const effectiveCGTRate = capitalGain > 0 ? (cgTax / capitalGain) * 100 : 0;
      setResult({ capitalGain, discountedGain, taxableGain: discountedGain, cgTax, effectiveCGTRate, marginalRate, discountApplied });
      trackCalculation("cgt", { capital_gain: capitalGain, cgt_tax: cgTax });
    }, 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [costBase, salePrice, otherIncome, heldOver12]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Capital Gains Tax</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost Base (AUD)</label>
          <input type="text" inputMode="decimal" value={costBase} onChange={(e) => setCostBase(e.target.value)} placeholder="e.g. 50000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">Purchase price + buying costs + improvements.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sale Price (AUD)</label>
          <input type="text" inputMode="decimal" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="e.g. 85000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
          <p className="text-xs text-gray-500 mt-1">Sale proceeds minus selling costs.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Other Taxable Income (AUD)</label>
          <input type="text" inputMode="decimal" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} placeholder="e.g. 80000"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={heldOver12} onChange={(e) => setHeldOver12(e.target.checked)}
              className="w-4 h-4 accent-orange-500" />
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Asset held over 12 months?</span>
              <p className="text-xs text-gray-500">50% CGT discount applies for Australian residents.</p>
            </div>
          </label>
        </div>
      </div>
      {result !== null && (
        <div className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-gray-500 mb-1">Capital Gain</p>
              <p className="text-xl font-bold text-blue-600">{fmt(result.capitalGain)}</p>
            </div>
            {result.discountApplied && (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-500 mb-1">After 50% Discount</p>
                <p className="text-xl font-bold text-green-600">{fmt(result.discountedGain)}</p>
              </div>
            )}
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-500 mb-1">CGT Payable</p>
              <p className="text-xl font-bold text-orange-500">{fmt(result.cgTax)}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-xs text-gray-500 mb-1">Effective CGT Rate</p>
              <p className="text-xl font-bold text-purple-600">{fmtPct(result.effectiveCGTRate)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estimate only. Does not account for capital losses, HECS debt, or other offsets. See{" "}
            <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ATO — Capital gains tax</a>.
          </p>
        </div>
      )}
    </div>
  );
}
