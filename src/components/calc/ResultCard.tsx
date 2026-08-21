"use client";

type ResultTone = "primary" | "info" | "success" | "neutral";

const toneClass: Record<ResultTone, { box: string; value: string }> = {
  primary: {
    box: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
    value: "text-orange-600 dark:text-orange-400",
  },
  info: {
    box: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    value: "text-blue-600 dark:text-blue-400",
  },
  success: {
    box: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    value: "text-green-600 dark:text-green-400",
  },
  neutral: {
    box: "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700",
    value: "text-gray-900 dark:text-white",
  },
};

interface ResultCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: ResultTone;
}

export default function ResultCard({ label, value, hint, tone = "primary" }: ResultCardProps) {
  const styles = toneClass[tone];
  return (
    <div className={`p-4 rounded-xl border text-center ${styles.box}`}>
      <p className={`text-2xl font-bold ${styles.value}`}>{value}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{label}</p>
      {hint ? <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5">{hint}</p> : null}
    </div>
  );
}

interface ResultGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function ResultGrid({ children, columns = 3 }: ResultGridProps) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-3";
  return (
    <div className={`mt-2 grid grid-cols-1 ${cols} gap-4`} aria-live="polite">
      {children}
    </div>
  );
}
