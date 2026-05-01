"use client";
import { useState, useEffect, useRef } from "react";
import { trackCalculation } from "@/lib/analytics";

export default function NPSCalc() {
  const [promoters, setPromoters] = useState("");
  const [passives, setPassives] = useState("");
  const [detractors, setDetractors] = useState("");
  const [result, setResult] = useState<{ nps: number; promoterPct: number; detractorPct: number; passivePct: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const p = parseFloat(promoters) || 0;
      const pa = parseFloat(passives) || 0;
      const d = parseFloat(detractors) || 0;
      if (!promoters && !passives && !detractors) { setResult(null); setError(""); return; }
      if (p < 0 || pa < 0 || d < 0) { setError("All values must be 0 or greater."); setResult(null); return; }
      const total = p + pa + d;
      if (total === 0) { setError("Total respondents must be greater than 0."); setResult(null); return; }
      const promoterPct = (p / total) * 100;
      const detractorPct = (d / total) * 100;
      const passivePct = (pa / total) * 100;
      const nps = promoterPct - detractorPct;
      setError("");
      setResult({ nps, promoterPct, detractorPct, passivePct, total });
      trackCalculation("nps", { promoters: p, passives: pa, detractors: d, total, nps: Math.round(nps) });
    }, 150);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [promoters, passives, detractors]);

  const getRating = (nps: number) =>
    nps >= 70 ? { label: "World-class NPS", color: "text-green-600" }
    : nps >= 50 ? { label: "Excellent", color: "text-green-500" }
    : nps >= 30 ? { label: "Great", color: "text-blue-600" }
    : nps >= 0 ? { label: "Good — room to improve", color: "text-yellow-600" }
    : { label: "Needs urgent attention", color: "text-red-600" };

  const npsColor = result
    ? result.nps >= 50 ? "text-green-600" : result.nps >= 30 ? "text-blue-600" : result.nps >= 0 ? "text-yellow-600" : "text-red-600"
    : "text-orange-500";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Calculate Your NPS</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter respondent counts: Promoters (scored 9–10), Passives (7–8), Detractors (0–6)</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Promoters (9–10) 😊</label>
          <input type="number" inputMode="numeric" min="0" value={promoters} onChange={e => setPromoters(e.target.value)} placeholder="e.g. 65"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Passives (7–8) 😐</label>
          <input type="number" inputMode="numeric" min="0" value={passives} onChange={e => setPassives(e.target.value)} placeholder="e.g. 25"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detractors (0–6) 😞</label>
          <input type="number" inputMode="numeric" min="0" value={detractors} onChange={e => setDetractors(e.target.value)} placeholder="e.g. 10"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>}
      {result !== null && (
        <div className="mt-2 space-y-4" aria-live="polite">
          <div className="p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Net Promoter Score</p>
            <p className={"text-5xl font-bold " + npsColor}>{Math.round(result.nps)}</p>
            <p className={"mt-2 text-sm font-medium " + getRating(result.nps).color}>{getRating(result.nps).label}</p>
            <p className="mt-1 text-xs text-gray-400">from {result.total.toLocaleString()} respondents</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800 text-center">
              <p className="text-xs text-gray-500 mb-1">Promoters</p>
              <p className="text-xl font-bold text-green-600">{result.promoterPct.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 mb-1">Passives</p>
              <p className="text-xl font-bold text-gray-600 dark:text-gray-300">{result.passivePct.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800 text-center">
              <p className="text-xs text-gray-500 mb-1">Detractors</p>
              <p className="text-xl font-bold text-red-500">{result.detractorPct.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
