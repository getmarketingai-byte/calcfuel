import Link from "next/link";

export default function CalcReviewedBy({ lastUpdated = "August 2026" }: { lastUpdated?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 mt-2 border-t border-b border-gray-100 dark:border-gray-800 py-2">
      <span>
        Reviewed by{" "}
        <strong className="text-gray-700 dark:text-gray-300">CalcFuel Technical Editor</strong>
      </span>
      <span className="text-gray-300 dark:text-gray-600">·</span>
      <span>
        Last updated: <time>{lastUpdated}</time>
      </span>
      <span className="text-gray-300 dark:text-gray-600">·</span>
      <Link href="/editorial-policy" className="text-orange-600 dark:text-orange-400 hover:underline">
        Editorial policy
      </Link>
    </div>
  );
}
