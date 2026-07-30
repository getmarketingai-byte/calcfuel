"use client";

import { useMemo, useState } from "react";
import { EBAY_PRESETS, type EbayPreset } from "@/lib/fees/ebayRates";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400";

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function EbayFeeCalc() {
  const [presetId, setPresetId] = useState(EBAY_PRESETS[0].id);
  const [finalValuePct, setFinalValuePct] = useState(String(EBAY_PRESETS[0].finalValuePct));
  const [finalValueCap, setFinalValueCap] = useState(String(EBAY_PRESETS[0].finalValueCap));
  const [perOrderFee, setPerOrderFee] = useState(String(EBAY_PRESETS[0].perOrderFee));
  const [insertionFee, setInsertionFee] = useState(String(EBAY_PRESETS[0].insertionFee));
  const [salePrice, setSalePrice] = useState("");
  const [shippingCharged, setShippingCharged] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [cogs, setCogs] = useState("");
  const [promotedPct, setPromotedPct] = useState("");

  const preset = EBAY_PRESETS.find((p) => p.id === presetId) ?? EBAY_PRESETS[0];
  const currency = preset.currency;

  const applyPreset = (p: EbayPreset) => {
    setPresetId(p.id);
    setFinalValuePct(String(p.finalValuePct));
    setFinalValueCap(String(p.finalValueCap));
    setPerOrderFee(String(p.perOrderFee));
    setInsertionFee(String(p.insertionFee));
  };

  const result = useMemo(() => {
    const price = parseFloat(salePrice) || 0;
    const shipping = parseFloat(shippingCharged) || 0;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const cost = parseFloat(cogs) || 0;
    const fvPct = parseFloat(finalValuePct) || 0;
    const fvCap = parseFloat(finalValueCap) || 0;
    const orderFee = parseFloat(perOrderFee) || 0;
    const insertFee = parseFloat(insertionFee) || 0;
    const promoPct = parseFloat(promotedPct) || 0;

    if (!price && !shipping) return null;

    const itemTotal = price * qty;
    const grossRevenue = itemTotal + shipping;
    const finalValueBase = grossRevenue;

    let finalValueFee = finalValueBase * (fvPct / 100);
    if (fvCap > 0) finalValueFee = Math.min(finalValueFee, fvCap);

    const promotedFee = promoPct > 0 ? itemTotal * (promoPct / 100) : 0;
    const totalFees = finalValueFee + orderFee + insertFee + promotedFee;
    const takeHome = grossRevenue - totalFees - cost;
    const marginPct = grossRevenue > 0 ? (takeHome / grossRevenue) * 100 : 0;

    return {
      finalValueFee,
      perOrderFee: orderFee,
      insertionFee: insertFee,
      promotedFee,
      totalFees,
      grossRevenue,
      takeHome,
      marginPct,
      netBeforeCogs: grossRevenue - totalFees,
    };
  }, [
    salePrice,
    shippingCharged,
    quantity,
    cogs,
    finalValuePct,
    finalValueCap,
    perOrderFee,
    insertionFee,
    promotedPct,
  ]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Marketplace preset
          </label>
          <select
            value={presetId}
            onChange={(e) => {
              const p = EBAY_PRESETS.find((x) => x.id === e.target.value);
              if (p) applyPreset(p);
            }}
            className={inputClass}
          >
            {EBAY_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} ({p.currency})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Final value %</label>
            <input type="number" step="0.01" value={finalValuePct} onChange={(e) => setFinalValuePct(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">FV cap (0 = none)</label>
            <input type="number" step="0.01" value={finalValueCap} onChange={(e) => setFinalValueCap(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Per-order fee</label>
            <input type="number" step="0.01" value={perOrderFee} onChange={(e) => setPerOrderFee(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Insertion fee</label>
            <input type="number" step="0.01" value={insertionFee} onChange={(e) => setInsertionFee(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sale price ({currency})</label>
            <input type="number" step="0.01" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Shipping charged ({currency})</label>
            <input type="number" step="0.01" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Cost of goods ({currency})</label>
            <input type="number" step="0.01" value={cogs} onChange={(e) => setCogs(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Promoted listings % (optional)</label>
            <input type="number" step="0.1" value={promotedPct} onChange={(e) => setPromotedPct(e.target.value)} placeholder="0" className={inputClass} />
          </div>
        </div>

        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Take-home after fees &amp; COGS</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.takeHome, currency)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Margin: {result.marginPct.toFixed(1)}%</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Gross revenue</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.grossRevenue, currency)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Total eBay fees</p>
                <p className="font-semibold text-red-600">{fmt(result.totalFees, currency)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Net before COGS</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.netBeforeCogs, currency)}</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Fee line item</th>
                    <th className="text-right px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Final value fee ({finalValuePct}% on item + shipping)</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(result.finalValueFee, currency)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Per-order fee</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(result.perOrderFee, currency)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Insertion fee</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(result.insertionFee, currency)}</td>
                  </tr>
                  {parseFloat(promotedPct) > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Promoted listings ({promotedPct}%)</td>
                      <td className="px-4 py-2 text-right font-medium">{fmt(result.promotedFee, currency)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
