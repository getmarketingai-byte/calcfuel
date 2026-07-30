"use client";

import { useMemo, useState } from "react";

type Mode = "cost-price" | "cost-margin" | "cost-markup";

export default function MarkupMarginCalc() {
  const [mode, setMode] = useState<Mode>("cost-price");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [markup, setMarkup] = useState("");

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(n);

  const pct = (n: number) => n.toLocaleString("en-AU", { maximumFractionDigits: 2 }) + "%";

  const result = useMemo(() => {
    const c = parseFloat(cost);
    if (!cost || isNaN(c) || c <= 0) return null;

    if (mode === "cost-price") {
      const p = parseFloat(price);
      if (!price || isNaN(p) || p <= 0) return null;
      const profit = p - c;
      const markupPct = (profit / c) * 100;
      const marginPct = (profit / p) * 100;
      return {
        price: fmt(p),
        markup: pct(markupPct),
        margin: pct(marginPct),
        profit: fmt(profit),
        explanation: `From cost ${fmt(c)} and price ${fmt(p)}`,
      };
    }

    if (mode === "cost-margin") {
      const m = parseFloat(margin);
      if (!margin || isNaN(m) || m <= 0 || m >= 100) return null;
      const p = c / (1 - m / 100);
      const profit = p - c;
      const markupPct = (profit / c) * 100;
      return {
        price: fmt(p),
        markup: pct(markupPct),
        margin: pct(m),
        profit: fmt(profit),
        explanation: `Price needed for ${pct(m)} margin on cost ${fmt(c)}`,
      };
    }

    const mk = parseFloat(markup);
    if (!markup || isNaN(mk) || mk < 0) return null;
    const p = c * (1 + mk / 100);
    const profit = p - c;
    const marginPct = (profit / p) * 100;
    return {
      price: fmt(p),
      markup: pct(mk),
      margin: pct(marginPct),
      profit: fmt(profit),
      explanation: `Price needed for ${pct(mk)} markup on cost ${fmt(c)}`,
    };
  }, [mode, cost, price, margin, markup]);

  const modes: { id: Mode; label: string }[] = [
    { id: "cost-price", label: "Cost + price" },
    { id: "cost-margin", label: "Cost + margin %" },
    { id: "cost-markup", label: "Cost + markup %" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Calculation mode</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors ${
                  mode === m.id
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Cost (AUD)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="e.g. 40"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          {mode === "cost-price" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Selling price (AUD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 80"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>
          )}
          {mode === "cost-margin" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Target margin (%)</label>
              <input
                type="number"
                min="0"
                max="99.99"
                step="0.1"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>
          )}
          {mode === "cost-markup" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Target markup (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
                placeholder="e.g. 100"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>
          )}
        </div>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-live="polite">
            {mode !== "cost-price" && (
              <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl text-center col-span-2 sm:col-span-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Selling price</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.price}</p>
              </div>
            )}
            <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Markup</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.markup}</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Margin</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.margin}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gross profit</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{result.profit}</p>
            </div>
          </div>
        )}
        {result && <p className="text-sm text-center text-gray-600 dark:text-gray-400">{result.explanation}</p>}
      </div>
    </div>
  );
}
