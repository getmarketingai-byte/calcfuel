interface AuthorInfoProps {
  date?: string;
}

/**
 * E-E-A-T trust signal: author attribution + last updated date.
 * Appears on all calculator pages to signal editorial review to Google.
 */
export default function AuthorInfo({ date = "May 2026" }: AuthorInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <span className="flex items-center gap-1.5">
        <svg
          className="w-4 h-4 text-orange-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <span>
          Reviewed by{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            CalcFuel Editorial Team
          </span>
        </span>
      </span>
      <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">
        ·
      </span>
      <span>Last updated: {date}</span>
    </div>
  );
}
