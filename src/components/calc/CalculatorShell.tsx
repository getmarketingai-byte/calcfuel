"use client";

import type { ReactNode } from "react";

interface CalculatorShellProps {
  title: string;
  description?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  results?: ReactNode;
  footer?: ReactNode;
}

/**
 * Shared chrome for decision calculators.
 * Keeps inputs, results, and methodology in a consistent composition.
 */
export default function CalculatorShell({
  title,
  description,
  toolbar,
  children,
  results,
  footer,
}: CalculatorShellProps) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">{description}</p>
          ) : null}
        </div>
        {toolbar ? <div className="shrink-0">{toolbar}</div> : null}
      </div>
      <div className="space-y-6">
        {children}
        {results}
        {footer}
      </div>
    </section>
  );
}
