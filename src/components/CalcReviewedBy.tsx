import Link from "next/link";
import { REVIEWER_NAME, REVIEWER_PROFILE_PATH } from "@/lib/editorial";

/**
 * The site's only byline. See src/lib/editorial.ts for why there is exactly one.
 *
 * `lastUpdated` is deliberately optional and has no default — a hardcoded fallback
 * date claims a review that may not have happened.
 */
export default function CalcReviewedBy({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-6 mt-2 border-t border-b border-gray-200 dark:border-gray-700 py-2">
      <span>
        Reviewed by{" "}
        <Link href={REVIEWER_PROFILE_PATH} className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
          {REVIEWER_NAME}
        </Link>
      </span>
      {lastUpdated ? (
        <>
          <span className="text-gray-400 dark:text-gray-500">·</span>
          <span>
            Last updated: <time>{lastUpdated}</time>
          </span>
        </>
      ) : null}
      <span className="text-gray-400 dark:text-gray-500">·</span>
      <Link href="/editorial-policy" className="text-orange-700 dark:text-orange-400 underline underline-offset-2">
        Editorial policy
      </Link>
    </div>
  );
}
