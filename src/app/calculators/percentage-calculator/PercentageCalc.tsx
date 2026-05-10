"use client";

import { useState } from "react";

type Mode = "what-percent" | "percent-of" | "percent-change" | "percent-diff";

export default function PercentageCalc() {
  const [mode, setMode] = useState<Mode>("percent-of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const pa = parseFloat(a) || 0;
  const pb = parseFloat(b) || 0;

  let result = "";
  let explanation = "";

  if (mode === "percent-of") {
    const r = (pa / 100) * pb;
    result = r.toLocaleString("en-AU", { maximumFractionDigits: 6 });
    explanation = `${pa}% of ${pb} = ${result}`;
  } else if (mode === "what-percent") {
    const r = pb !== 0 ? (pa / pb) * 100 : 0;
    result = r.toLocaleString("en-AU", { maximumFractionDigits: 4 }) + "%";
    explanation = `${pa} is ${result} of ${pb}`;
  } else if (mode === "percent-change") {
    const r = pa !== 0 ? ((pb - pa) / Math.abs(pa)) * 100 : 0;
    const sign = r >= 0 ? "+" : "";
    result = sign + r.toLocaleString("en-AU", { maximumFractionDigits: 4 }) + "%";
    explanation = `Change from ${pa} to ${pb} is ${result}`;
  } else {
    const avg = (pa + pb) / 2;
    const r = avg !== 0 ? (Math.abs(pa - pb) / avg) * 100 : 0;
    result = r.toLocaleString("en-AU", { maximumFractionDigits: 4 }) + "%";
    explanation = `Percentage difference between ${pa} and ${pb} is ${result}`;
  }

  const modes: { id: Mode; label: string; aLabel: string; bLabel: string }[] = [
    { id: "percent-of", label: "% of a number", aLabel: "Percentage (%)", bLabel: "Of what number" },
    { id: "what-percent", label: "What % is X of Y?", aLabel: "X (the part)", bLabel: "Y (the whole)" },
    { id: "percent-change", label: "% change", aLabel: "From value", bLabel: "To value" },
    { id: "percent-diff", label: "% difference", aLabel: "Value A", bLabel: "Value B" },
  ];

  const current = modes.find((m) => m.id === mode)!;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Calculation type</label>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{current.aLabel}</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{current.bLabel}</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
            />
          </div>
        </div>
        {(a || b) && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">{result}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
