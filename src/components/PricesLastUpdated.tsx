import Link from "next/link";
import {
  daysSincePricesTo,
  formatDaysAgo,
  isAcccSnapshotStale,
  staleAfterDaysFromEnv,
} from "@/lib/fuel-price-cadence";
import { SOURCE_REPORT } from "@/lib/fuel-prices";

interface PricesLastUpdatedProps {
  className?: string;
  /** Compact one-liner for calculator footers. */
  compact?: boolean;
}

/**
 * Dated ACCC provenance. Always visible. Warning colours when `pricesTo` is at
 * least ACCC_STALE_AFTER_DAYS (default 14) old.
 */
export default function PricesLastUpdated({ className = "", compact = false }: PricesLastUpdatedProps) {
  const days = daysSincePricesTo(SOURCE_REPORT.pricesTo);
  const stale = isAcccSnapshotStale(SOURCE_REPORT.pricesTo);
  const windowDays = staleAfterDaysFromEnv();

  const tone = stale
    ? "border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-100"
    : "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100";

  return (
    <p
      role="status"
      data-accc-cadence={stale ? "stale" : "current"}
      className={`rounded-lg border px-3 py-2 text-sm ${tone} ${className}`.trim()}
    >
      <span className="font-semibold">Prices last updated </span>
      <time dateTime={SOURCE_REPORT.pricesTo}>{SOURCE_REPORT.pricesToLabel}</time>
      <span>
        {" "}
        ({formatDaysAgo(days)}) — ACCC {SOURCE_REPORT.edition}, published{" "}
        {SOURCE_REPORT.reportDateLabel}.
      </span>
      {stale ? (
        <span>
          {" "}
          This snapshot is older than the {windowDays}-day cadence.
        </span>
      ) : null}
      {compact ? (
        <>
          {" "}
          <Link href="/data/australian-fuel-prices" className="underline underline-offset-2">
            Source
          </Link>
        </>
      ) : (
        <>
          {" "}
          <Link href="/data/australian-fuel-prices" className="underline underline-offset-2">
            Per-city figures and methodology
          </Link>
          .
        </>
      )}
    </p>
  );
}
