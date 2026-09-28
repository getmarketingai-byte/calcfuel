import Link from "next/link";
import { formatDaysAgo } from "@/lib/fuel-price-cadence";
import {
  CYCLE_TIPS_SOURCE,
  cycleTipsStaleAfterDaysFromEnv,
  daysSinceOldestTip,
  isCycleTipsStale,
} from "@/lib/accc-cycle-tips";

interface CycleTipsLastUpdatedProps {
  className?: string;
}

/**
 * Visible ACCC tip freshness. Warning colours when the oldest city tipUpdated
 * is at least CYCLE_TIPS_STALE_AFTER_DAYS (default 7) old.
 */
export default function CycleTipsLastUpdated({ className = "" }: CycleTipsLastUpdatedProps) {
  const days = daysSinceOldestTip();
  const stale = isCycleTipsStale();
  const windowDays = cycleTipsStaleAfterDaysFromEnv();

  const tone = stale
    ? "border-amber-400 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-100"
    : "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100";

  return (
    <p
      role="status"
      data-cycle-tips-cadence={stale ? "stale" : "current"}
      className={`rounded-lg border px-3 py-2 text-sm ${tone} ${className}`.trim()}
    >
      <span className="font-semibold">Buying tips last updated </span>
      <time dateTime={CYCLE_TIPS_SOURCE.tipUpdated}>{CYCLE_TIPS_SOURCE.tipUpdatedLabel}</time>
      <span>
        {" "}
        ({formatDaysAgo(days)}) — ACCC weekday label “{CYCLE_TIPS_SOURCE.weekdayLabel}”,
        transcribed {CYCLE_TIPS_SOURCE.transcribedOn}.
      </span>
      {stale ? (
        <span>
          {" "}
          This snapshot is older than the {windowDays}-day tip cadence. Treat the phase labels as
          out of date until the next transcription.
        </span>
      ) : null}{" "}
      <Link
        href={CYCLE_TIPS_SOURCE.url}
        className="underline underline-offset-2"
        rel="noopener noreferrer"
      >
        ACCC petrol price cycles
      </Link>
      .
    </p>
  );
}
