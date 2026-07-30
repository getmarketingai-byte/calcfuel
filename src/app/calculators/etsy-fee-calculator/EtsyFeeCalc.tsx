"use client";

import { useMemo, useState } from "react";
import {
  ETSY_COUNTRY_PRESETS,
  ETSY_OFFSITE_ADS_RATES,
  type EtsyCountryPreset,
} from "@/lib/fees/etsyRates";

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

export default function EtsyFeeCalc() {
  const [presetId, setPresetId] = useState(ETSY_COUNTRY_PRESETS[0].id);
  const [listingFee, setListingFee] = useState(String(ETSY_COUNTRY_PRESETS[0].listingFee));
  const [transactionPct, setTransactionPct] = useState(String(ETSY_COUNTRY_PRESETS[0].transactionPct));
  const [processingPct, setProcessingPct] = useState(String(ETSY_COUNTRY_PRESETS[0].processingPct));
  const [processingFixed, setProcessingFixed] = useState(String(ETSY_COUNTRY_PRESETS[0].processingFixed));
  const [itemPrice, setItemPrice] = useState("");
  const [shippingCharged, setShippingCharged] = useState("");
  const [giftWrap, setGiftWrap] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [cogs, setCogs] = useState("");
  const [offsiteEnabled, setOffsiteEnabled] = useState(false);
  const [offsitePct, setOffsitePct] = useState(String(ETSY_OFFSITE_ADS_RATES[1].pct));

  const preset = ETSY_COUNTRY_PRESETS.find((p) => p.id === presetId) ?? ETSY_COUNTRY_PRESETS[0];
  const currency = preset.currency;

  const applyPreset = (p: EtsyCountryPreset) => {
    setPresetId(p.id);
    setListingFee(String(p.listingFee));
    setTransactionPct(String(p.transactionPct));
    setProcessingPct(String(p.processingPct));
    setProcessingFixed(String(p.processingFixed));
  };

  const result = useMemo(() => {
    const price = parseFloat(itemPrice) || 0;
    const shipping = parseFloat(shippingCharged) || 0;
    const wrap = parseFloat(giftWrap) || 0;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const cost = parseFloat(cogs) || 0;
    const listFee = parseFloat(listingFee) || 0;
    const txnPct = parseFloat(transactionPct) || 0;
    const procPct = parseFloat(processingPct) || 0;
    const procFixed = parseFloat(processingFixed) || 0;
    const offPct = offsiteEnabled ? parseFloat(offsitePct) || 0 : 0;

    if (!price && !shipping && !wrap) return null;

    const orderSubtotal = (price + shipping + wrap) * qty;
    const listingFees = listFee * qty;
    const transactionFee = orderSubtotal * (txnPct / 100);
    const processingFee = orderSubtotal * (procPct / 100) + procFixed;
    const offsiteFee = orderSubtotal * (offPct / 100);
    const totalFees = listingFees + transactionFee + processingFee + offsiteFee;
    const netAfterFees = orderSubtotal - totalFees;
    const profitAfterCogs = netAfterFees - cost;
    const marginPct = orderSubtotal > 0 ? (profitAfterCogs / orderSubtotal) * 100 : 0;

    return {
      listingFees,
      transactionFee,
      processingFee,
      offsiteFee,
      totalFees,
      grossRevenue: orderSubtotal,
      netAfterFees,
      profitAfterCogs,
      marginPct,
    };
  }, [
    itemPrice,
    shippingCharged,
    giftWrap,
    quantity,
    cogs,
    listingFee,
    transactionPct,
    processingPct,
    processingFixed,
    offsiteEnabled,
    offsitePct,
  ]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Country / currency preset
          </label>
          <select
            value={presetId}
            onChange={(e) => {
              const p = ETSY_COUNTRY_PRESETS.find((x) => x.id === e.target.value);
              if (p) applyPreset(p);
            }}
            className={inputClass}
          >
            {ETSY_COUNTRY_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} ({p.currency})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Listing fee</label>
            <input type="number" step="0.01" value={listingFee} onChange={(e) => setListingFee(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Transaction %</label>
            <input type="number" step="0.01" value={transactionPct} onChange={(e) => setTransactionPct(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Processing %</label>
            <input type="number" step="0.01" value={processingPct} onChange={(e) => setProcessingPct(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Processing fixed</label>
            <input type="number" step="0.01" value={processingFixed} onChange={(e) => setProcessingFixed(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Item price ({currency})</label>
            <input type="number" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Shipping charged ({currency})</label>
            <input type="number" step="0.01" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gift wrap ({currency})</label>
            <input type="number" step="0.01" value={giftWrap} onChange={(e) => setGiftWrap(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Cost of goods ({currency})</label>
            <input type="number" step="0.01" value={cogs} onChange={(e) => setCogs(e.target.value)} placeholder="0" className={inputClass} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={offsiteEnabled}
              onChange={(e) => {
                setOffsiteEnabled(e.target.checked);
                if (e.target.checked && offsitePct === "0") setOffsitePct(String(ETSY_OFFSITE_ADS_RATES[1].pct));
              }}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Offsite Ads fee</span>
          </label>
          {offsiteEnabled && (
            <div className="flex items-center gap-2">
              <select
                value={offsitePct}
                onChange={(e) => setOffsitePct(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {ETSY_OFFSITE_ADS_RATES.filter((r) => r.pct > 0).map((r) => (
                  <option key={r.id} value={r.pct}>
                    {r.label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                step="0.1"
                value={offsitePct}
                onChange={(e) => setOffsitePct(e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net profit after fees &amp; COGS</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.profitAfterCogs, currency)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Margin: {result.marginPct.toFixed(1)}%</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Gross revenue</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.grossRevenue, currency)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Total Etsy fees</p>
                <p className="font-semibold text-red-600">{fmt(result.totalFees, currency)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Net after fees</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.netAfterFees, currency)}</p>
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
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Listing fee × qty</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(result.listingFees, currency)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Transaction fee (item + ship + gift)</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(result.transactionFee, currency)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Payment processing</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(result.processingFee, currency)}</td>
                  </tr>
                  {offsiteEnabled && (
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Offsite Ads ({offsitePct}%)</td>
                      <td className="px-4 py-2 text-right font-medium">{fmt(result.offsiteFee, currency)}</td>
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
