"use client";

import { useState, useCallback } from "react";
import { trackCalculation } from "@/lib/analytics";

const TAX_BRACKETS = [
  { label: "Nil (income $0–$18,200)", value: 0, min: 0, max: 18200 },
  { label: "19% (income $18,201–$45,000)", value: 0.19, min: 18201, max: 45000 },
  { label: "32.5% (income $45,001–$120,000)", value: 0.325, min: 45001, max: 120000 },
  { label: "37% (income $120,001–$180,000)", value: 0.37, min: 120001, max: 180000 },
  { label: "45% (income $180,001+)", value: 0.45, min: 180001, max: Infinity },
];

function fmt(n: number) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

export default function CapitalGainsTaxCalc() {
  const [purchasePrice, setPurchasePrice] = useState("500000");
  const [salePrice, setSalePrice] = useState("750000");
  const [purchaseCosts, setPurchaseCosts] = useState("15000");
  const [saleCosts, setSaleCosts] = useState("20000");
  const [heldOver12, setHeldOver12] = useState(true);
  const [assetType, setAssetType] = useState<"property" | "shares" | "other">("property");
  const [taxRate, setTaxRate] = useState(0.325);
  const [result, setResult] = useState<null | {
    capitalGain: number;
    discountedGain: number;
    taxableGain: number;
    cgtPayable: number;
    effectiveRate: number;
    netProfit: number;
    discountApplied: boolean;
  }>(null);

  const calculate = useCallback(() => {
    const purchase = parseFloat(purchasePrice.replace(/,/g, "")) || 0;
    const sale = parseFloat(salePrice.replace(/,/g, "")) || 0;
    const buyCosts = parseFloat(purchaseCosts.replace(/,/g, "")) || 0;
    const sellCosts = parseFloat(saleCosts.replace(/,/g, "")) || 0;

    const costBase = purchase + buyCosts;
    const proceeds = sale - sellCosts;
    const capitalGain = proceeds - costBase;

    if (capitalGain <= 0) {
      setResult({
        capitalGain,
        discountedGain: 0,
        taxableGain: 0,
        cgtPayable: 0,
        effectiveRate: 0,
        netProfit: proceeds - costBase,
        discountApplied: false,
      });
      trackCalculation("capital-gains-tax-calculator", {
        purchase_price: purchase, sale_price: sale, held_over_12: heldOver12 ? 1 : 0, tax_rate: taxRate,
      });
      return;
    }

    // 50% CGT discount for individuals/trusts holding >12 months (not companies)
    const discountApplied = heldOver12 && assetType !== "other";
    const taxableGain = discountApplied ? capitalGain * 0.5 : capitalGain;
    const cgtPayable = taxableGain * taxRate;
    const effectiveRate = capitalGain > 0 ? (cgtPayable / capitalGain) * 100 : 0;
    const netProfit = capitalGain - cgtPayable;

    setResult({ capitalGain, discountedGain: capitalGain * 0.5, taxableGain, cgtPayable, effectiveRate, netProfit, discountApplied });
    trackCalculation("capital-gains-tax-calculator", {
      purchase_price: purchase, sale_price: sale, held_over_12: heldOver12 ? 1 : 0,
      asset_type: assetType, tax_rate: taxRate,
    });
  }, [purchasePrice, salePrice, purchaseCosts, saleCosts, heldOver12, assetType, taxRate]);

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Purchase Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)}
              className={inputClass + " pl-6"} placeholder="500000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Sale Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)}
              className={inputClass + " pl-6"} placeholder="750000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Acquisition Costs</label>
          <p className="text-xs text-gray-500 mb-1">Stamp duty, legal fees, inspection costs</p>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={purchaseCosts} onChange={e => setPurchaseCosts(e.target.value)}
              className={inputClass + " pl-6"} placeholder="15000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Disposal Costs</label>
          <p className="text-xs text-gray-500 mb-1">Agent fees, legal fees, advertising</p>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
            <input type="number" value={saleCosts} onChange={e => setSaleCosts(e.target.value)}
              className={inputClass + " pl-6"} placeholder="20000" min="0" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Asset Type</label>
          <select value={assetType} onChange={e => setAssetType(e.target.value as "property" | "shares" | "other")}
            className={inputClass}>
            <option value="property">Investment property</option>
            <option value="shares">Shares / ETFs</option>
            <option value="other">Other asset (held &lt;12 months)</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Your Marginal Tax Rate</label>
          <select value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))}
            className={inputClass}>
            {TAX_BRACKETS.map(b => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {assetType !== "other" && (
        <div className="mt-4 flex items-center gap-3">
          <input type="checkbox" id="held12" checked={heldOver12} onChange={e => setHeldOver12(e.target.checked)}
            className="w-4 h-4 accent-orange-500" />
          <label htmlFor="held12" className="text-sm text-gray-700 dark:text-gray-300">
            Held for more than 12 months <span className="text-gray-400">(50% CGT discount applies)</span>
          </label>
        </div>
      )}

      <button onClick={calculate}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
        Calculate CGT
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          {result.capitalGain <= 0 ? (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl py-4 text-center">
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">Capital Loss: {fmt(Math.abs(result.capitalGain))}</p>
              <p className="text-sm text-gray-500 mt-1">No CGT payable. You can carry this loss forward to offset future capital gains.</p>
            </div>
          ) : (
            <>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl py-3 text-center">
                <p className="text-sm text-gray-500">Estimated CGT Payable</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.cgtPayable)}</p>
                <p className="text-sm text-gray-400">Effective rate: {result.effectiveRate.toFixed(1)}% of capital gain</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2 text-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">CGT Breakdown</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Gross capital gain</span>
                  <span className="font-medium text-green-600">{fmt(result.capitalGain)}</span>
                </div>
                {result.discountApplied && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">50% CGT discount (held &gt;12 months)</span>
                    <span className="font-medium text-blue-600">−{fmt(result.discountedGain)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Taxable capital gain</span>
                  <span className="font-bold text-gray-900 dark:text-white">{fmt(result.taxableGain)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">CGT at {(taxRate * 100).toFixed(1)}% marginal rate</span>
                  <span className="font-medium text-red-500">−{fmt(result.cgtPayable)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Net profit after tax</span>
                  <span className="font-bold text-green-600">{fmt(result.netProfit)}</span>
                </div>
              </div>

              {result.discountApplied && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The 50% CGT discount saves you <strong className="text-green-700 dark:text-green-300">{fmt(result.discountedGain * taxRate)}</strong> in tax compared to selling before 12 months.
                  </p>
                </div>
              )}
            </>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
            Estimate only. Does not include Medicare levy, main residence exemption, or other offsets. Consult a registered tax agent for advice specific to your situation.
          </p>
        </div>
      )}
    </div>
  );
}
