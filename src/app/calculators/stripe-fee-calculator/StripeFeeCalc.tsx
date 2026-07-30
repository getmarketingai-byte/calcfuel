"use client";

import { useMemo, useState } from "react";
import { STRIPE_PRESETS, STRIPE_LAST_REVIEWED } from "@/lib/fees/stripeRates";

type CalcMode = "forward" | "reverse";

export default function StripeFeeCalc() {
  const [presetId, setPresetId] = useState("au");
  const [pct, setPct] = useState(String(STRIPE_PRESETS[0].pct));
  const [fixed, setFixed] = useState(String(STRIPE_PRESETS[0].fixed));
  const [international, setInternational] = useState(false);
  const [calcMode, setCalcMode] = useState<CalcMode>("forward");
  const [amount, setAmount] = useState("");

  const preset = STRIPE_PRESETS.find((p) => p.id === presetId) ?? STRIPE_PRESETS[0];

  const handlePresetChange = (id: string) => {
    const p = STRIPE_PRESETS.find((x) => x.id === id);
    if (!p) return;
    setPresetId(id);
    setPct(String(p.pct));
    setFixed(String(p.fixed));
  };

  const effectivePct = international ? preset.internationalPct : parseFloat(pct) || 0;
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

    if (calcMode === "forward") {
      const fee = (a * effectivePct) / 100 + effectiveFixed;
      const net = a - fee;
      return { charge: a, fee, net };
    }

    const charge = (a + effectiveFixed) / (1 - effectivePct / 100);
    const fee = charge - a;
    return { charge, fee, net: a };
  }, [amount, calcMode, effectivePct, effectiveFixed]);

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
              {STRIPE_PRESETS.map((p) => (
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
                  { id: "forward" as const, label: "Fee from charge" },
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
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Percentage fee (%){international ? " — international" : ""}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={international ? preset.internationalPct : pct}
              onChange={(e) => setPct(e.target.value)}
              disabled={international}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60"
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
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={international}
            onChange={(e) => setInternational(e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
          />
          International card (uses preset international rate)
        </label>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {calcMode === "forward" ? `Charge amount (${preset.currency})` : `Target net payout (${preset.currency})`}
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stripe fee</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.fee)}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">You receive (net)</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(result.net)}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {calcMode === "forward" ? "Charge amount" : "Charge needed"}
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{fmt(result.charge)}</p>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Rates last reviewed: <time dateTime={STRIPE_LAST_REVIEWED}>{STRIPE_LAST_REVIEWED}</time>. Confirm current
          pricing on Stripe&apos;s website before invoicing.
        </p>
      </div>
    </div>
  );
}
