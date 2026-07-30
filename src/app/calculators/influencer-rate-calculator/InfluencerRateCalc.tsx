"use client";

import { useMemo, useState } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", cpm: 10 },
  { id: "tiktok", label: "TikTok", cpm: 8 },
  { id: "youtube", label: "YouTube", cpm: 25 },
  { id: "linkedin", label: "LinkedIn", cpm: 35 },
  { id: "x", label: "X (Twitter)", cpm: 6 },
] as const;

const NICHES = [
  { id: "lifestyle", label: "Lifestyle", mult: 1.0 },
  { id: "beauty", label: "Beauty", mult: 1.1 },
  { id: "finance", label: "Finance / B2B", mult: 1.5 },
  { id: "tech", label: "Tech", mult: 1.2 },
  { id: "memes", label: "Memes / Entertainment", mult: 0.7 },
] as const;

function engagementMult(rate: number): number {
  if (rate < 1) return 0.7;
  if (rate <= 3) return 1.0;
  if (rate <= 8) return 1.2;
  return 1.35;
}

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400";

function fmt(n: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function InfluencerRateCalc() {
  const [platformId, setPlatformId] = useState<string>(PLATFORMS[0].id);
  const [platformCpm, setPlatformCpm] = useState(String(PLATFORMS[0].cpm));
  const [followers, setFollowers] = useState("");
  const [engagementPct, setEngagementPct] = useState("");
  const [nicheId, setNicheId] = useState<string>(NICHES[0].id);
  const [usageUplift, setUsageUplift] = useState("0");
  const [exclusivityUplift, setExclusivityUplift] = useState("0");

  const niche = NICHES.find((n) => n.id === nicheId) ?? NICHES[0];

  const result = useMemo(() => {
    const fol = parseFloat(followers) || 0;
    const eng = parseFloat(engagementPct) || 0;
    const cpm = parseFloat(platformCpm) || 0;
    const usage = Math.min(100, Math.max(0, parseFloat(usageUplift) || 0));
    const exclusivity = Math.min(100, Math.max(0, parseFloat(exclusivityUplift) || 0));

    if (!fol) return null;

    const engMult = engagementMult(eng);
    const base = (fol / 1000) * cpm * niche.mult * engMult;
    const mid = base * (1 + usage / 100 + exclusivity / 100);
    const low = mid * 0.8;
    const high = mid * 1.2;

    return { base, mid, low, high, engMult };
  }, [followers, engagementPct, platformCpm, niche, usageUplift, exclusivityUplift]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Platform</label>
            <select
              value={platformId}
              onChange={(e) => {
                const p = PLATFORMS.find((x) => x.id === e.target.value);
                if (p) {
                  setPlatformId(p.id);
                  setPlatformCpm(String(p.cpm));
                }
              }}
              className={inputClass}
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Base CPM per 1k followers (AUD)</label>
            <input type="number" step="0.5" value={platformCpm} onChange={(e) => setPlatformCpm(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Followers</label>
            <input type="number" min="0" value={followers} onChange={(e) => setFollowers(e.target.value)} placeholder="e.g. 50000" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Engagement rate (%)</label>
            <input type="number" step="0.1" value={engagementPct} onChange={(e) => setEngagementPct(e.target.value)} placeholder="e.g. 3.5" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Niche multiplier</label>
            <select value={nicheId} onChange={(e) => setNicheId(e.target.value)} className={inputClass}>
              {NICHES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label} (×{n.mult})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Usage rights uplift (%)</label>
            <input type="number" min="0" max="100" value={usageUplift} onChange={(e) => setUsageUplift(e.target.value)} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Exclusivity uplift (%)</label>
            <input type="number" min="0" max="100" value={exclusivityUplift} onChange={(e) => setExclusivityUplift(e.target.value)} placeholder="0" className={inputClass} />
          </div>
        </div>

        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recommended rate (mid estimate)</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.mid)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Range: {fmt(result.low)} – {fmt(result.high)} per post
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm text-center">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Low (−20%)</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.low)}</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/30">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Mid</p>
                <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{fmt(result.mid)}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">High (+20%)</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.high)}</p>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              Base: ({followers} ÷ 1,000) × {platformCpm} CPM × {niche.mult} niche × {result.engMult} engagement
              {parseFloat(usageUplift) > 0 || parseFloat(exclusivityUplift) > 0
                ? ` + ${usageUplift}% usage + ${exclusivityUplift}% exclusivity`
                : ""}{" "}
              = {fmt(result.base)} base → {fmt(result.mid)} mid
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
