export default function CalcReviewedBy({ lastUpdated = "May 2026" }: { lastUpdated?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 mt-2 border-t border-b border-gray-100 dark:border-gray-800 py-2">
      <span>Reviewed by <strong className="text-gray-700 dark:text-gray-300">CalcFuel Editorial Team</strong></span>
      <span className="text-gray-300 dark:text-gray-600">·</span>
      <span>Last updated: <time dateTime="2026-05">{lastUpdated}</time></span>
    </div>
  );
}
