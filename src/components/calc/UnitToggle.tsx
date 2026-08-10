"use client";

import type { UnitSystem } from "@/domain/units";

interface UnitToggleProps {
  value: UnitSystem;
  onChange: (next: UnitSystem) => void;
  metricLabel?: string;
  imperialLabel?: string;
}

export default function UnitToggle({
  value,
  onChange,
  metricLabel = "Metric",
  imperialLabel = "Imperial",
}: UnitToggleProps) {
  return (
    <div
      className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-sm"
      role="group"
      aria-label="Unit system"
    >
      <button
        type="button"
        onClick={() => onChange("metric")}
        className={
          "px-3 py-1.5 font-medium transition-colors " +
          (value === "metric"
            ? "bg-orange-500 text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
        }
        aria-pressed={value === "metric"}
      >
        {metricLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("imperial")}
        className={
          "px-3 py-1.5 font-medium transition-colors " +
          (value === "imperial"
            ? "bg-orange-500 text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700")
        }
        aria-pressed={value === "imperial"}
      >
        {imperialLabel}
      </button>
    </div>
  );
}
