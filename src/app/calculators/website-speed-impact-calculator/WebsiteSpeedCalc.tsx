"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function WebsiteSpeedCalc() {
  const [currentLoad, setCurrentLoad] = useState("");
  const [targetLoad, setTargetLoad] = useState("");
  const [visitors, setVisitors] = useState("");
  const [currentCR, setCurrentCR] = useState("");
  const [avgRevenue, setAvgRevenue] = useState("");
  const [result, setResult] = useState<{
    potentialCR: number;
    additionalConversions: number;
    revenueImpact: number | null;
  } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!currentLoad && !targetLoad && !visitors && !currentCR) {
        setResult(null); setError(""); return;
      }
      const cl = parseFloat(currentLoad);
      const tl = parseFloat(targetLoad);
      const v = parseFloat(visitors);
      const cr = parseFloat(currentCR);
      const rev = avgRevenue ? parseFloat(avgRevenue) : null;

      if (!cl || !tl || !v || !cr) {
        setError("Please fill in all required fields with valid numbers.");
        setResult(null); return;
      }
      if (cl <= 0 || tl <= 0 || v <= 0 || cr <= 0) {
        setError("All values must be greater than zero."); setResult(null); return;
      }
      if (tl >= cl) {
        setError("Target load time must be less than current load time to show an improvement."); setResult(null); return;
      }
      if (cr > 100) {
        setError("Conversion rate cannot exceed 100%."); setResult(null); return;
      }
      // Google research: each 1s delay reduces conversions ~7%
      const secondsImproved = cl - tl;
      const potentialCR = Math.min(cr * (1 + 0.07 * secondsImproved), cr * 3);
      const additionalConversions = Math.round(((potentialCR - cr) / 100) * v);
      const revenueImpact = rev !== null ? additionalConversions * rev : null;

      setError("");
      setResult({ potentialCR, additionalConversions, revenueImpact });
      trackCalculation("website_speed_impact", {
        current_load: cl, target_load: tl, monthly_visitors: v,
        current_cr: cr, potential_cr: parseFloat(potentialCR.toFixed(2)),
        additional_conversions: additionalConversions,
      });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [currentLoad, targetLoad, visitors, currentCR, avgRevenue]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Speed Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: "Current Load Time (seconds)", value: currentLoad, set: setCurrentLoad, placeholder: "e.g. 4.5" },
          { label: "Target Load Time (seconds)", value: targetLoad, set: setTargetLoad, placeholder: "e.g. 1.5" },
          { label: "Monthly Visitors", value: visitors, set: setVisitors, placeholder: "e.g. 10000" },
          { label: "Current Conversion Rate (%)", value: currentCR, set: setCurrentCR, placeholder: "e.g. 2.5" },
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Average Revenue per Conversion ($) <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="number" inputMode="decimal" min="0" value={avgRevenue}
          onChange={e => setAvgRevenue(e.target.value)} placeholder="e.g. 150"
          className="w-full sm:w-1/2 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
        />
        <p className="text-xs text-gray-400 mt-1">Add this to see projected revenue impact.</p>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800" aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Potential Conversion Rate</p>
              <p className="text-3xl font-bold text-orange-500">{result.potentialCR.toFixed(2)}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Up from {currentCR}% (+{(result.potentialCR - parseFloat(currentCR)).toFixed(2)}pp)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Additional Conversions/Month</p>
              <p className="text-3xl font-bold text-orange-500">{result.additionalConversions.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Extra conversions from faster load</p>
            </div>
            {result.revenueImpact !== null && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Monthly Revenue Impact</p>
                <p className="text-3xl font-bold text-green-600">${result.revenueImpact.toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">At ${avgRevenue} per conversion</p>
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Based on Google research: each 1-second improvement can increase conversions by ~7%.
          </p>
        </div>
      )}
    </div>
  );
}
