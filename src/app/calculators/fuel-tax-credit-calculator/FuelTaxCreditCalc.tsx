"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { FTC_PERIOD_LABEL, FTC_PRESETS } from "@/lib/fees/fuelTaxCreditRates";

type FuelLine = {
  presetId: string;
  centsPerUnit: string;
  quantity: string;
  unit: "litre" | "kg";
};

const defaultLine = (presetId = "diesel-offroad"): FuelLine => {
  const preset = FTC_PRESETS.find((p) => p.id === presetId) ?? FTC_PRESETS[0];
  return {
    presetId,
    centsPerUnit: String(preset.centsPerUnit),
    quantity: "",
    unit: preset.unit,
  };
};

export default function FuelTaxCreditCalc() {
  const [line1, setLine1] = useState<FuelLine>(defaultLine());
  const [showLine2, setShowLine2] = useState(false);
  const [line2, setLine2] = useState<FuelLine>(defaultLine("lpg"));

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2 }).format(n);

  const calcLine = (line: FuelLine) => {
    const qty = parseFloat(line.quantity) || 0;
    const cents = parseFloat(line.centsPerUnit) || 0;
    const credit = qty * (cents / 100);
    return { qty, cents, credit };
  };

  const handlePresetChange = (lineNum: 1 | 2, presetId: string) => {
    const preset = FTC_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const updater = (prev: FuelLine) => ({
      ...prev,
      presetId,
      centsPerUnit: String(preset.centsPerUnit),
      unit: preset.unit,
    });
    if (lineNum === 1) setLine1(updater);
    else setLine2(updater);
  };

  const result = useMemo(() => {
    const r1 = calcLine(line1);
    const r2 = showLine2 ? calcLine(line2) : { qty: 0, cents: 0, credit: 0 };
    const totalCredit = r1.credit + r2.credit;
    if (r1.qty <= 0 && r2.qty <= 0) return null;
    return { r1, r2, totalCredit };
  }, [line1, line2, showLine2]);

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400";

  const renderLine = (
    line: FuelLine,
    lineNum: 1 | 2,
    setLine: Dispatch<SetStateAction<FuelLine>>,
    label: string
  ) => (
    <div className="space-y-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{label}</h3>
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Fuel type preset</label>
        <select
          value={line.presetId}
          onChange={(e) => handlePresetChange(lineNum, e.target.value)}
          className={inputClass}
        >
          {FTC_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {FTC_PRESETS.find((p) => p.id === line.presetId)?.note}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Credit rate (cents per {line.unit})
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={line.centsPerUnit}
            onChange={(e) => setLine((prev) => ({ ...prev, centsPerUnit: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Quantity ({line.unit === "litre" ? "litres" : "kg"})
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={line.quantity}
            onChange={(e) => setLine((prev) => ({ ...prev, quantity: e.target.value }))}
            placeholder="e.g. 5000"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-sm text-amber-900 dark:text-amber-200">
        <strong>Rate period:</strong> {FTC_PERIOD_LABEL}. Always confirm current rates on the{" "}
        <a
          href="https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/fuel-tax-credits"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-orange-600 dark:text-orange-400"
        >
          ATO fuel tax credits page
        </a>{" "}
        before lodging your BAS.
      </div>

      <div className="space-y-5">
        {renderLine(line1, 1, setLine1, "Primary fuel line")}

        {!showLine2 ? (
          <button
            type="button"
            onClick={() => setShowLine2(true)}
            className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline"
          >
            + Add second fuel type
          </button>
        ) : (
          <>
            {renderLine(line2, 2, setLine2, "Second fuel line (optional)")}
            <button
              type="button"
              onClick={() => {
                setShowLine2(false);
                setLine2(defaultLine("lpg"));
              }}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Remove second line
            </button>
          </>
        )}

        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated fuel tax credit</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.totalCredit)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Formula: litres (or kg) × (cents ÷ 100) per eligible fuel line
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {result.r1.qty > 0 && (
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">Line 1 credit</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.r1.credit)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.r1.qty.toLocaleString()} × {result.r1.cents}¢
                  </p>
                </div>
              )}
              {showLine2 && result.r2.qty > 0 && (
                <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">Line 2 credit</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{fmt(result.r2.credit)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.r2.qty.toLocaleString()} × {result.r2.cents}¢
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
