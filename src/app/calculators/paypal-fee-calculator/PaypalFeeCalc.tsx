"use client";

import { useMemo, useState } from "react";
import { PAYPAL_PRESETS, PAYPAL_LAST_REVIEWED } from "@/lib/fees/paypalRates";

type CalcMode = "forward" | "reverse";

export default function PaypalFeeCalc() {
  const [presetId, setPresetId] = useState("au");
  const [domesticPct, setDomesticPct] = useState(String(PAYPAL_PRESETS[0].domesticPct));
  const [fixed, setFixed] = useState(String(PAYPAL_PRESETS[0].domesticFixed));
  const [intlSurcharge, setIntlSurcharge] = useState(String(PAYPAL_PRESETS[0].internationalSurchargePct));
  const [fxPct, setFxPct] = useState(String(PAYPAL_PRESETS[0].currencyConversionPct));
  const [applyIntl, setApplyIntl] = useState(false);
  const [applyFx, setApplyFx] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("forward");
  const [amount, setAmount] = useState("");

  const preset = PAYPAL_PRESETS.find((p) => p.id === presetId) ?? PAYPAL_PRESETS[0];

  const handlePresetChange = (id: string) => {
    const p = PAYPAL_PRESETS.find((x) => x.id === id);
    if (!p) return;
    setPresetId(id);
    setDomesticPct(String(p.domesticPct));
    setFixed(String(p.domesticFixed));
    setIntlSurcharge(String(p.internationalSurchargePct));
    setFxPct(String(p.currencyConversionPct));
  };

  const totalPct =
    (parseFloat(domesticPct) || 0) +
    (applyIntl ? parseFloat(intlSurcharge) || 0 : 0) +
    (applyFx ? parseFloat(fxPct) || 0 : 0);
  const effectiveFixed = parseFloat(fixed) || 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: preset.currency,
      maximumFractionDigits: 2,
    }).format(n);

  const result = useMemo(() => {
    const a = parseFloat(amount);
    if (!amount || isNaN(a) || a <= 0) return null;
    if (totalPct >= 100) return null;

    if (calcMode === "forward") {
      const fee = (a * totalPct) / 100 + effectiveFixed;
      const net = a - fee;
      return { charge: a, fee, net };
    }

    const charge = (a + effectiveFixed) / (1 - totalPct / 100);
    const fee = charge - a;
    return { charge, fee, net: a };
  }, [amount, calcMode, totalPct, effectiveFixed]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Region preset</label>
            <select
              value={presetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {PAYPAL_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Calculation mode</label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "forward" as const, label: "Fee from payment" },
                  { id: "reverse" as const, label: "Gross-up to net" },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCalcMode(m.id)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors ${
                    calcMode === m.id
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Domestic rate (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={domesticPct}
              onChange={(e) => setDomesticPct(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Fixed fee ({preset.currency})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={fixed}
              onChange={(e) => setFixed(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              International surcharge (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={intlSurcharge}
              onChange={(e) => setIntlSurcharge(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Currency conversion (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={fxPct}
              onChange={(e) => setFxPct(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={applyIntl}
              onChange={(e) => setApplyIntl(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            International payer surcharge
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={applyFx}
              onChange={(e) => setApplyFx(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            Currency conversion fee
          </label>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Effective rate: <strong>{totalPct.toLocaleString("en-AU", { maximumFractionDigits: 2 })}%</strong> +{" "}
          {fmt(effectiveFixed)} fixed
        </p>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {calcMode === "forward" ? `Payment amount (${preset.currency})` : `Target net received (${preset.currency})`}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={calcMode === "forward" ? "e.g. 100" : "e.g. 95"}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
          />
        </div>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-live="polite">
            <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">PayPal fee</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.fee)}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You receive (net)</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(result.net)}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {calcMode === "forward" ? "Payment amount" : "Payment needed"}
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{fmt(result.charge)}</p>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Rates last reviewed: <time dateTime={PAYPAL_LAST_REVIEWED}>{PAYPAL_LAST_REVIEWED}</time>. Confirm current
          pricing on PayPal&apos;s merchant fee page before invoicing.
        </p>
      </div>
    </div>
  );
}
