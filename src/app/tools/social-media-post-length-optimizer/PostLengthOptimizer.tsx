"use client";
import { useState } from "react";

const PLATFORMS = [
  {
    id: "twitter",
    name: "Twitter / X",
    limit: 280,
    optimal: { min: 71, max: 100 },
    tip: "Keep it sharp. Tweets at 71–100 characters receive the most retweets. Front-load your key point.",
    unit: "chars",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    limit: 3000,
    optimal: { min: 1900, max: 2000 },
    tip: "Long-form works here. Aim for 1,900–2,000 characters for maximum organic reach. Hook in the first 2 lines (before 'see more').",
    unit: "chars",
  },
  {
    id: "instagram",
    name: "Instagram",
    limit: 2200,
    optimal: { min: 138, max: 150 },
    tip: "Short captions drive higher engagement. 138–150 characters is the engagement sweet spot. Let the image do the heavy lifting.",
    unit: "chars",
  },
  {
    id: "facebook",
    name: "Facebook",
    limit: 63206,
    optimal: { min: 40, max: 80 },
    tip: "Shorter is dramatically better on Facebook. Posts at 40–80 characters receive the highest engagement rates on average.",
    unit: "chars",
  },
  {
    id: "tiktok",
    name: "TikTok",
    limit: 2200,
    optimal: { min: 300, max: 500 },
    tip: "TikTok captions benefit from keywords for discoverability. 300–500 characters is optimal — include relevant hashtags.",
    unit: "chars",
  },
] as const;

type PlatformId = (typeof PLATFORMS)[number]["id"];

function getStatus(count: number, platform: (typeof PLATFORMS)[number]) {
  if (count > platform.limit) return { label: "Over limit — will be cut off", color: "text-red-600", barColor: "bg-red-500" };
  if (count >= platform.optimal.min && count <= platform.optimal.max) return { label: "Optimal length for this platform", color: "text-green-600", barColor: "bg-green-500" };
  if (count < platform.optimal.min) return { label: count === 0 ? "" : "Too short — add more content for best results", color: "text-yellow-600", barColor: "bg-yellow-400" };
  return { label: "Good — slightly long but still effective", color: "text-blue-600", barColor: "bg-blue-500" };
}

export default function PostLengthOptimizer() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<PlatformId>("twitter");

  const count = text.length;
  const activePlatform = PLATFORMS.find(p => p.id === selected)!;
  const status = getStatus(count, activePlatform);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Media Post Length Optimizer</h2>

      {/* Platform tabs */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                selected === p.id
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your post</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Paste or write your ${activePlatform.name} post here...`}
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y text-sm leading-relaxed"
        />
      </div>

      {/* Live feedback */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{count}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/ {activePlatform.limit.toLocaleString()} chars max</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Optimal: {activePlatform.optimal.min}–{activePlatform.optimal.max} chars
            </span>
          </div>
        </div>

        {/* Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all duration-150 ${status.barColor}`}
            style={{ width: `${Math.min((count / activePlatform.limit) * 100, 100)}%` }}
          />
        </div>

        {/* Optimal zone indicator */}
        <div className="relative w-full h-4 mb-3">
          <div className="absolute h-1 bg-green-300 dark:bg-green-700 rounded-full top-1.5"
            style={{
              left: `${(activePlatform.optimal.min / activePlatform.limit) * 100}%`,
              width: `${((activePlatform.optimal.max - activePlatform.optimal.min) / activePlatform.limit) * 100}%`,
            }}
          />
          <span className="absolute text-xs text-green-600 dark:text-green-400" style={{ left: `${(activePlatform.optimal.min / activePlatform.limit) * 100}%`, top: 0 }}>
            ↑ optimal zone
          </span>
        </div>

        {count > 0 && (
          <p className={`text-sm font-semibold mb-2 ${status.color}`}>{status.label}</p>
        )}
        <p className="text-xs text-gray-600 dark:text-gray-400">{activePlatform.tip}</p>
      </div>

      {/* All platforms at a glance */}
      {count > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">All platforms at a glance</h3>
          <div className="space-y-2">
            {PLATFORMS.map(p => {
              const s = getStatus(count, p);
              return (
                <div key={p.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white w-28">{p.name}</span>
                  <span className={`text-xs font-semibold flex-1 ${s.color}`}>
                    {count === 0 ? "" : s.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {count}/{p.limit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
