"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function SocialMediaEngagementRateCalc() {
  const [engagements, setEngagements] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!engagements && !followers) { setResult(null); setError(""); return; }
      const e = parseFloat(engagements), f = parseFloat(followers);
      if (!e || !f || f <= 0) { setError("Please enter valid numbers. Followers must be > 0."); setResult(null); return; }
      if (e > f * 10) { setError("Engagements seem unusually high relative to followers. Please check your inputs."); setResult(null); return; }
      const r = (e / f) * 100;
      setError("");
      setResult(r);
      trackCalculation("social_media_engagement_rate", { total_engagements: e, total_followers: f, engagement_rate: parseFloat(r.toFixed(2)) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [engagements, followers]);

  const getRating = (r: number) => r >= 6 ? { label: "Excellent — highly engaged audience", color: "text-green-600" }
    : r >= 3 ? { label: "Good — above average engagement", color: "text-blue-600" }
    : r >= 1 ? { label: "Average — typical for most accounts", color: "text-yellow-600" }
    : { label: "Low — focus on content quality and posting times", color: "text-red-600" };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Calculate Your Social Media Engagement Rate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Total Engagements (#)", value: engagements, set: setEngagements, placeholder: "e.g. 1200" },
          { label: "Total Followers (#)", value: followers, set: setFollowers, placeholder: "e.g. 15000" },
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
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Engagements include likes, comments, shares, saves, and reactions.</p>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800" aria-live="polite">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your Engagement Rate</p>
          <p className="text-4xl font-bold text-orange-500">{result.toFixed(2)}%</p>
          <p className={`mt-2 text-sm font-medium ${getRating(result).color}`}>{getRating(result).label}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Formula: ({engagements} ÷ {followers}) × 100 = {result.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
