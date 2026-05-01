"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function EmailListGrowthRateCalc() {
  const [newSubs, setNewSubs] = useState("");
  const [unsubscribes, setUnsubscribes] = useState("");
  const [startingSize, setStartingSize] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!newSubs && !unsubscribes && !startingSize) { setResult(null); setError(""); return; }
      const n = parseFloat(newSubs), u = parseFloat(unsubscribes) || 0, s = parseFloat(startingSize);
      if (!n || !s || s <= 0) { setError("Please enter valid numbers. New subscribers and starting list size are required."); setResult(null); return; }
      if (n < 0 || u < 0) { setError("Subscriber counts cannot be negative."); setResult(null); return; }
      const r = ((n - u) / s) * 100;
      setError("");
      setResult(r);
      trackCalculation("email_list_growth_rate", { new_subscribers: n, unsubscribes: u, starting_list_size: s, growth_rate: parseFloat(r.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [newSubs, unsubscribes, startingSize]);

  const getRating = (r: number) => r >= 10 ? { label: "Excellent — strong list momentum", color: "text-green-600" }
    : r >= 5 ? { label: "Good — healthy growth rate", color: "text-blue-600" }
    : r >= 2 ? { label: "Average — room to improve acquisition", color: "text-yellow-600" }
    : r >= 0 ? { label: "Slow — focus on subscriber acquisition", color: "text-orange-600" }
    : { label: "Shrinking — list churn exceeds new subscribers", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Email List Growth Rate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "New Subscribers (#)", value: newSubs, set: setNewSubs, placeholder: "e.g. 500" },
          { label: "Unsubscribes (#)", value: unsubscribes, set: setUnsubscribes, placeholder: "e.g. 50" },
          { label: "Starting List Size (#)", value: startingSize, set: setStartingSize, placeholder: "e.g. 4500" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input
              type="number" inputMode="decimal" min="0" value={value}
              onChange={e => set(e.target.value)} placeholder={placeholder}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800" aria-live="polite">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your Email List Growth Rate</p>
          <p className="text-4xl font-bold text-orange-500">{result.toFixed(2)}%</p>
          <p className={`mt-2 text-sm font-medium ${getRating(result).color}`}>{getRating(result).label}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Formula: ({newSubs} − {unsubscribes || "0"}) ÷ {startingSize} × 100 = {result.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
