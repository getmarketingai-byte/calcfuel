"use client";

import { useState } from "react";

type Unit = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

function getBMICategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600 dark:text-blue-400" };
  if (bmi < 25) return { category: "Healthy weight", color: "text-green-600 dark:text-green-400" };
  if (bmi < 30) return { category: "Overweight", color: "text-yellow-600 dark:text-yellow-400" };
  return { category: "Obese", color: "text-red-600 dark:text-red-400" };
}

export default function BMICalc() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  let result: BMIResult | null = null;

  if (unit === "metric") {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      const { category, color } = getBMICategory(bmi);
      result = { bmi, category, color };
    }
  } else {
    const w = parseFloat(weightLbs);
    const ft = parseFloat(heightFt) || 0;
    const inches = parseFloat(heightIn) || 0;
    const totalInches = ft * 12 + inches;
    if (w > 0 && totalInches > 0) {
      const bmi = (w / (totalInches * totalInches)) * 703;
      const { category, color } = getBMICategory(bmi);
      result = { bmi, category, color };
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Units</label>
          <div className="grid grid-cols-2 gap-2">
            {(["metric", "imperial"] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`py-2.5 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                  unit === u
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
                }`}
              >
                {u === "metric" ? "Metric (kg / cm)" : "Imperial (lbs / ft)"}
              </button>
            ))}
          </div>
        </div>

        {unit === "metric" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                min="0"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="e.g. 75"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input
                type="number"
                min="0"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="e.g. 175"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Weight (lbs)</label>
              <input
                type="number"
                min="0"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                placeholder="e.g. 165"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Height (ft)</label>
              <input
                type="number"
                min="0"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                placeholder="e.g. 5"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Inches</label>
              <input
                type="number"
                min="0"
                max="11"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                placeholder="e.g. 9"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        )}

        {result && (
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
            <p className={`text-4xl font-bold mb-1 ${result.color}`}>{result.bmi.toFixed(1)}</p>
            <p className={`text-lg font-semibold ${result.color}`}>{result.category}</p>
            <div className="mt-4 grid grid-cols-4 gap-1 text-xs">
              {[
                { label: "Underweight", range: "< 18.5", bg: "bg-blue-100 dark:bg-blue-900" },
                { label: "Healthy", range: "18.5–24.9", bg: "bg-green-100 dark:bg-green-900" },
                { label: "Overweight", range: "25–29.9", bg: "bg-yellow-100 dark:bg-yellow-900" },
                { label: "Obese", range: "&ge; 30", bg: "bg-red-100 dark:bg-red-900" },
              ].map((c) => (
                <div key={c.label} className={`${c.bg} rounded p-2 text-center`}>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{c.label}</p>
                  <p className="text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: c.range }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
