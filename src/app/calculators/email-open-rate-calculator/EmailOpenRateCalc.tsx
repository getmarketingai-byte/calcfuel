"use client";
import { useState } from "react";

export default function EmailOpenRateCalc() {
  const [opened, setOpened] = useState("");
  const [delivered, setDelivered] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const o = parseFloat(opened), d = parseFloat(delivered);
    if (!o || !d || d <= 0) { setError("Please enter valid numbers. Delivered must be > 0."); setResult(null); return; }
    if (o > d) { setError("Emails Opened cannot exceed Emails Delivered."); setResult(null); return; }
    setError(""); setResult((o / d) * 100);
  };

  const getRating = (r: number) => r >= 30 ? { label: "Excellent", color: "text-green-600" }
    : r >= 20 ? { label: "Good", color: "text-blue-600" }
    : r >= 15 ? { label: "Average", color: "text-yellow-600" }
    : { label: "Below Average — needs improvement", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Email Open Rate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Emails Opened", value: opened, set: setOpened, placeholder: "e.g. 450" },
          { label: "Emails Delivered", value: delivered, set: setDelivered, placeholder: "e.g. 2000" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input type="number" min="0" value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">Calculate Open Rate</button>
      {result !== null && (
        <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your Email Open Rate</p>
          <p className="text-4xl font-bold text-orange-500">{result.toFixed(2)}%</p>
          <p className={`mt-2 text-sm font-medium ${getRating(result).color}`}>{getRating(result).label}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Formula: ({opened} ÷ {delivered}) × 100 = {result.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
