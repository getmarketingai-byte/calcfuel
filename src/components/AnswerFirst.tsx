import Link from "next/link";
import type { ReactNode } from "react";
import { SOURCE_REPORT } from "@/lib/fuel-prices";

/**
 * Answer-first summary for the top of a page: the direct answer and one worked
 * number, before the calculator and the long explanation. Search snippets and AI
 * answer engines quote this block, so every figure in it must come from the page's
 * own maths and the dated ACCC snapshot — never a round illustrative number.
 */
export default function AnswerFirst({
  question,
  children,
  points,
  showPriceSource = true,
}: {
  question: string;
  children: ReactNode;
  points?: ReactNode[];
  showPriceSource?: boolean;
}) {
  return (
    <section
      aria-labelledby="quick-answer"
      className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/40 p-5 mb-8"
    >
      <h2 id="quick-answer" className="text-base font-semibold text-gray-900 dark:text-white mb-2">
        Quick answer: {question}
      </h2>
      <div className="text-sm text-gray-800 dark:text-gray-200 space-y-2">{children}</div>
      {points && points.length > 0 ? (
        <ul className="mt-3 text-sm text-gray-800 dark:text-gray-200 list-disc pl-5 space-y-1">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      ) : null}
      {showPriceSource ? (
        <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
          Fuel prices: ACCC five-city average on {SOURCE_REPORT.pricesToLabel} (
          <a href={SOURCE_REPORT.url} className="underline" rel="noopener noreferrer" target="_blank">
            ACCC report, {SOURCE_REPORT.reportDateLabel}
          </a>
          ; <Link href="/data/australian-fuel-prices" className="underline">all cities</Link>).
        </p>
      ) : null}
    </section>
  );
}
