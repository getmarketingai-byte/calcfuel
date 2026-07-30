"use client";

import { useMemo, useState } from "react";
import {
  AMAZON_CATEGORY_PRESETS,
  AMAZON_FULFILLMENT_PRESETS,
  AMAZON_MARKETPLACES,
} from "@/lib/fees/amazonFbaRates";

export default function AmazonFbaFeeCalc() {
  const [marketplaceId, setMarketplaceId] = useState("us");
  const [categoryId, setCategoryId] = useState("most");
  const [referralPct, setReferralPct] = useState("15");
  const [fulfillmentId, setFulfillmentId] = useState("small-standard");
  const [fulfillmentFee, setFulfillmentFee] = useState("3.22");
  const [salePrice, setSalePrice] = useState("");
  const [units, setUnits] = useState("1");
  const [cogs, setCogs] = useState("");
  const [storagePerUnit, setStoragePerUnit] = useState("");
  const [adSpendPerUnit, setAdSpendPerUnit] = useState("");

  const marketplace = AMAZON_MARKETPLACES.find((m) => m.id === marketplaceId) ?? AMAZON_MARKETPLACES[0];

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: marketplace.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
    const preset = AMAZON_CATEGORY_PRESETS.find((c) => c.id === id);
    if (preset) setReferralPct(String(preset.referralPct));
  };

  const handleFulfillmentChange = (id: string) => {
    setFulfillmentId(id);
    const preset = AMAZON_FULFILLMENT_PRESETS.find((f) => f.id === id);
    if (preset) setFulfillmentFee(String(preset.fee));
  };

  const result = useMemo(() => {
    const price = parseFloat(salePrice) || 0;
    const qty = Math.max(parseFloat(units) || 1, 1);
    const referral = parseFloat(referralPct) || 0;
    const fulfillment = parseFloat(fulfillmentFee) || 0;
    const cost = parseFloat(cogs) || 0;
    const storage = parseFloat(storagePerUnit) || 0;
    const ads = parseFloat(adSpendPerUnit) || 0;

    if (price <= 0) return null;

    const referralFee = price * (referral / 100);
    const totalFeesPerUnit = referralFee + fulfillment + storage + ads;
    const netAfterFees = price - totalFeesPerUnit;
    const profitPerUnit = netAfterFees - cost;
    const marginPct = price > 0 ? (profitPerUnit / price) * 100 : 0;

    return {
      referralFee,
      fulfillment,
      storage,
      ads,
      totalFeesPerUnit,
      netAfterFees,
      profitPerUnit,
      marginPct,
      qty,
      totalRevenue: price * qty,
      totalFees: totalFeesPerUnit * qty,
      totalProfit: profitPerUnit * qty,
    };
  }, [salePrice, units, referralPct, fulfillmentFee, cogs, storagePerUnit, adSpendPerUnit]);

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400";

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Marketplace</label>
            <select
              value={marketplaceId}
              onChange={(e) => setMarketplaceId(e.target.value)}
              className={inputClass}
            >
              {AMAZON_MARKETPLACES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category preset</label>
            <select value={categoryId} onChange={(e) => handleCategoryChange(e.target.value)} className={inputClass}>
              {AMAZON_CATEGORY_PRESETS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Referral fee (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={referralPct}
              onChange={(e) => setReferralPct(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Fulfillment preset</label>
            <select
              value={fulfillmentId}
              onChange={(e) => handleFulfillmentChange(e.target.value)}
              className={inputClass}
            >
              {AMAZON_FULFILLMENT_PRESETS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              FBA fulfillment fee per unit ({marketplace.currency})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={fulfillmentFee}
              onChange={(e) => setFulfillmentFee(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Sale price per unit ({marketplace.currency})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              placeholder="29.99"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Units sold</label>
            <input
              type="number"
              min="1"
              step="1"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              COGS per unit ({marketplace.currency})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              placeholder="8.00"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Monthly storage per unit ({marketplace.currency}, optional)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={storagePerUnit}
              onChange={(e) => setStoragePerUnit(e.target.value)}
              placeholder="0.00"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Ad spend per unit ({marketplace.currency}, optional)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={adSpendPerUnit}
              onChange={(e) => setAdSpendPerUnit(e.target.value)}
              placeholder="0.00"
              className={inputClass}
            />
          </div>
        </div>

        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Profit per unit</p>
              <p className={`text-3xl font-bold ${result.profitPerUnit >= 0 ? "text-orange-600 dark:text-orange-400" : "text-red-600"}`}>
                {fmt(result.profitPerUnit)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Margin: {result.marginPct.toFixed(1)}% · Net after fees: {fmt(result.netAfterFees)}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Referral</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.referralFee)}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Fulfillment</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.fulfillment)}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Storage</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.storage)}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Ads</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.ads)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Total Amazon fees / unit</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.totalFeesPerUnit)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Total fees ({result.qty} units)</p>
                <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.totalFees)}</p>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Total profit ({result.qty} units)</p>
                <p className={`font-semibold ${result.totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {fmt(result.totalProfit)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
