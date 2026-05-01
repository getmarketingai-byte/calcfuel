"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function FollowerGrowthCalc() {
  const [startFollowers, setStartFollowers] = useState("");
  const [endFollowers, setEndFollowers] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [result, setResult] = useState<{
    growthRate: number;
    netGrowth: number;
    dailyGrowth: number;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!startFollowers && !endFollowers && !timePeriod) {
        setResult(null); setError(""); return;
      }
      const start = parseFloat(startFollowers);
      const end = parseFloat(endFollowers);
      const days = parseFloat(timePeriod);

      if (!start || !end || !days) {
        setError("Please fill in all fields with valid numbers.");
        setResult(null); return;
      }
      if (start <= 0 || days <= 0) {
        setError("Starting followers and time period must be greater than zero.");
        setResult(null); return;
      }
      const netGrowth = end - start;
      const growthRate = ((end - start) / start) * 100;
      const dailyGrowth = netGrowth / days;

      setError("");
      setResult({ growthRate, netGrowth, dailyGrowth });
      trackCalculation("follower_growth_rate", {
        start_followers: start, end_followers: end, days,
        growth_rate: parseFloat(growthRate.toFixed(2)), daily_growth: parseFloat(dailyGrowth.toFixed(1)),
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [startFollowers, endFollowers, timePeriod]);

  const getRating = (rate: number) => {
    if (rate >= 5) return { label: "Excellent growth — viral or highly effective content strategy", color: "text-green-600" };
    if (rate >= 2) return { label: "Strong growth — above average for organic accounts", color: "text-blue-600" };
    if (rate >= 0.5) return { label: "Steady growth — typical for consistent posting", color: "text-yellow-600" };
    if (rate >= 0) return { label: "Slow growth — consider boosting content or engagement strategy", color: "text-orange-600" };
    return { label: "Declining — audience is shrinking, review content quality and posting frequency", color: "text-red-600" };
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Follower Growth Rate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Starting Followers", value: startFollowers, set: setStartFollowers, placeholder: "e.g. 5000" },
          { label: "Ending Followers", value: endFollowers, set: setEndFollowers, placeholder: "e.g. 5750" },
          { label: "Time Period (days)", value: timePeriod, set: setTimePeriod, placeholder: "e.g. 30" },
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Growth Rate</p>
              <p className="text-3xl font-bold text-orange-500">{result.growthRate.toFixed(2)}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Over {timePeriod} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Net New Followers</p>
              <p className="text-3xl font-bold text-orange-500">
                {result.netGrowth >= 0 ? "+" : ""}{result.netGrowth.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total gained (or lost)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Daily Growth</p>
              <p className="text-3xl font-bold text-orange-500">
                {result.dailyGrowth >= 0 ? "+" : ""}{result.dailyGrowth.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Followers per day on average</p>
            </div>
          </div>
          <p className={`text-sm font-medium ${getRating(result.growthRate).color}`}>
            {getRating(result.growthRate).label}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Formula: (({endFollowers} − {startFollowers}) ÷ {startFollowers}) × 100 = {result.growthRate.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
