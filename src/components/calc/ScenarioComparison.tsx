"use client";

interface ScenarioRow {
  id: string;
  label: string;
  primary: string;
  secondary?: string;
  highlight?: boolean;
}

interface ScenarioComparisonProps {
  title?: string;
  scenarios: ScenarioRow[];
  cheaperId?: string | "tie";
  savingsLabel?: string;
}

export default function ScenarioComparison({
  title = "Scenario comparison",
  scenarios,
  cheaperId,
  savingsLabel,
}: ScenarioComparisonProps) {
  if (scenarios.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        {cheaperId && cheaperId !== "tie" && savingsLabel ? (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
            Better option: <span className="font-medium text-orange-600 dark:text-orange-400">{cheaperId}</span>
            {" · "}
            {savingsLabel}
          </p>
        ) : null}
        {cheaperId === "tie" ? (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Scenarios are effectively tied.</p>
        ) : null}
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {scenarios.map((s) => (
          <li
            key={s.id}
            className={
              "flex items-center justify-between gap-4 px-4 py-3 " +
              (s.highlight || s.id === cheaperId
                ? "bg-orange-50/60 dark:bg-orange-950/40"
                : "bg-white dark:bg-gray-800")
            }
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{s.label}</p>
              {s.secondary ? (
                <p className="text-xs text-gray-700 dark:text-gray-300">{s.secondary}</p>
              ) : null}
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">{s.primary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
