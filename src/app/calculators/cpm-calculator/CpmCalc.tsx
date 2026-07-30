"use client";

import { useMemo, useState } from "react";

type Field = "cost" | "cpm" | "impressions";

export default function CpmCalc() {
  const [cost, setCost] = useState("");
  const [cpm, setCpm] = useState("");
  const [impressions, setImpressions] = useState("");

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(n);

  const fmtNum = (n: number, decimals = 2) =>
    n.toLocaleString("en-AU", { maximumFractionDigits: decimals, minimumFractionDigits: decimals > 0 ? decimals : undefined });

  const result = useMemo(() => {
    const c = cost !== "" ? parseFloat(cost) : NaN;
    const r = cpm !== "" ? parseFloat(cpm) : NaN;
    const i = impressions !== "" ? parseFloat(impressions) : NaN;

    const hasCost = !isNaN(c) && c > 0;
    const hasCpm = !isNaN(r) && r > 0;
    const hasImpressions = !isNaN(i) && i > 0;

    const filled = [hasCost, hasCpm, hasImpressions].filter(Boolean).length;
    if (filled !== 2) return null;

    let field: Field;
    let value: number;

    if (!hasCost) {
      field = "cost";
      value = (r * i) / 1000;
    } else if (!hasCpm) {
      field = "cpm";
      value = (c / i) * 1000;
    } else {
      field = "impressions";
      value = (c / r) * 1000;
    }

    if (!isFinite(value) || value <= 0) return null;

    const labels: Record<Field, string> = {
      cost: "Total campaign cost",
      cpm: "CPM",
      impressions: "Impressions",
    };

    const display =
      field === "cost"
        ? fmtCurrency(value)
        : field === "cpm"
          ? fmtCurrency(value)
          : fmtNum(value, 0);

    const formula =
      field === "cost"
        ? `Cost = CPM × Impressions ÷ 1000 = ${fmtCurrency(r)} × ${fmtNum(i, 0)} ÷ 1000`
        : field === "cpm"
          ? `CPM = (Cost ÷ Impressions) × 1000 = (${fmtCurrency(c)} ÷ ${fmtNum(i, 0)}) × 1000`
          : `Impressions = (Cost ÷ CPM) × 1000 = (${fmtCurrency(c)} ÷ ${fmtCurrency(r)}) × 1000`;

    return { field, value, display, formula, label: labels[field] };
  }, [cost, cpm, impressions]);

  const filledCount = [cost, cpm, impressions].filter((v) => v !== "" && !isNaN(parseFloat(v)) && parseFloat(v) > 0).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter any <strong>two</strong> values below — the third is calculated instantly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Total cost (AUD)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="e.g. 2500"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">CPM (AUD)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              placeholder="e.g. 12.50"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Impressions</label>
            <input
              type="number"
              min="0"
              step="1"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              placeholder="e.g. 200000"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
        </div>

        {filledCount === 1 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter one more value to see the result.</p>
        )}
        {filledCount >= 3 && (
          <p className="text-sm text-amber-600 dark:text-amber-400">Clear one field to solve for it — enter exactly two values.</p>
        )}

        {result && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center" aria-live="polite">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{result.label}</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{result.display}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{result.formula}</p>
          </div>
        )}
      </div>
    </div>
  );
}
