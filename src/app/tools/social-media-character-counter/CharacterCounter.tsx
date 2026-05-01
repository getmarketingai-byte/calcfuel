"use client";
import { useState } from "react";

const PLATFORMS = [
  { id: "twitter", name: "Twitter / X", limit: 280, note: "Hard limit — tweets over 280 characters are truncated." },
  { id: "linkedin", name: "LinkedIn", limit: 3000, note: "Post character limit. Optimal for reach: 1,900–2,000 characters." },
  { id: "instagram", name: "Instagram", limit: 2200, note: "Caption limit. High engagement peaks at 138–150 characters." },
  { id: "facebook", name: "Facebook", limit: 63206, note: "Technical limit is 63,206. Best engagement: under 80 characters." },
] as const;

type PlatformId = (typeof PLATFORMS)[number]["id"];

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState<PlatformId>("twitter");

  const selected = PLATFORMS.find(p => p.id === platform)!;
  const count = text.length;
  const remaining = selected.limit - count;
  const pct = Math.min((count / selected.limit) * 100, 100);

  const getColor = () => {
    if (remaining < 0) return { bar: "bg-red-500", text: "text-red-600", label: "Over limit" };
    if (pct >= 90) return { bar: "bg-red-500", text: "text-red-600", label: "Almost full" };
    if (pct >= 70) return { bar: "bg-yellow-400", text: "text-yellow-600", label: "Getting long" };
    return { bar: "bg-green-500", text: "text-green-600", label: "Good length" };
  };

  const { bar, text: textColor, label } = getColor();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Media Character Counter</h2>

      {/* Platform selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                platform === p.id
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-400"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Text area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your post text
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Write your ${selected.name} post here...`}
          rows={6}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-y text-sm leading-relaxed"
        />
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-150 ${bar}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>

      {/* Count display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-3xl font-bold ${textColor}`}>{count.toLocaleString()}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            / {selected.limit.toLocaleString()} characters
          </span>
        </div>
        <div className="text-right">
          <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
          <p className={`text-sm ${remaining < 0 ? "text-red-600" : "text-gray-500 dark:text-gray-400"}`}>
            {remaining < 0
              ? `${Math.abs(remaining).toLocaleString()} over limit`
              : `${remaining.toLocaleString()} characters remaining`}
          </p>
        </div>
      </div>

      {/* Platform note */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-300">
          <span className="font-semibold">{selected.name}:</span> {selected.note}
        </p>
      </div>

      {/* Word count bonus */}
      {text.length > 0 && (
        <div className="mt-4 flex gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span><strong className="text-gray-900 dark:text-white">{text.trim().split(/\s+/).filter(Boolean).length}</strong> words</span>
          <span><strong className="text-gray-900 dark:text-white">{text.split("\n").length}</strong> lines</span>
        </div>
      )}
    </div>
  );
}
