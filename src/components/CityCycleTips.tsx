import RelativeAge from "@/components/RelativeAge";
import {
  CITY_CYCLE_TIPS,
  CYCLE_TIPS_SOURCE,
  type CyclePhase,
  cycleTipsStaleAfterDaysFromEnv,
  daysSinceOldestTip,
  isCycleTipsStale,
  phaseDecisionLine,
} from "@/lib/accc-cycle-tips";

const PHASE_TONE: Record<CyclePhase, string> = {
  climbing:
    "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/70 dark:text-amber-100 dark:border-amber-700",
  "near peak":
    "bg-red-100 text-red-950 border-red-300 dark:bg-red-950/70 dark:text-red-100 dark:border-red-700",
  falling:
    "bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-100 dark:border-emerald-700",
  "near low":
    "bg-green-100 text-green-950 border-green-300 dark:bg-green-950/70 dark:text-green-100 dark:border-green-700",
  plateau:
    "bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600",
};

interface CityCycleTipsProps {
  /** Request time. Tests pass a fixed instant; the page uses the ISR render clock. */
  now?: Date;
}

/**
 * Five city phase cards, or an honest pause when the oldest transcribed tip is
 * at least the 7-day limit old. Diesel and the page-level ACCC link stay outside.
 */
export default function CityCycleTips({ now = new Date() }: CityCycleTipsProps) {
  const days = daysSinceOldestTip(CITY_CYCLE_TIPS, now);
  const parked = isCycleTipsStale(CITY_CYCLE_TIPS, { now });
  const windowDays = cycleTipsStaleAfterDaysFromEnv();

  if (parked) {
    return (
      <p
        role="status"
        data-cycle-tips-state="parked"
        className="rounded-lg border border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-100"
      >
        Buying tips paused: the last ACCC tip we transcribed is from{" "}
        <time dateTime={CYCLE_TIPS_SOURCE.tipUpdated}>{CYCLE_TIPS_SOURCE.tipUpdatedLabel}</time> (
        <RelativeAge iso={CYCLE_TIPS_SOURCE.tipUpdated} initialDays={days} />
        ), older than our {windowDays}-day limit. See the{" "}
        <a
          href={CYCLE_TIPS_SOURCE.url}
          className="underline underline-offset-2"
          rel="noopener noreferrer"
        >
          ACCC page
        </a>{" "}
        for today&rsquo;s tip.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4" data-cycle-tips-state="live">
      {CITY_CYCLE_TIPS.map((city) => (
        <article
          key={city.city}
          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{city.city}</h2>
            <p
              className={`inline-flex min-h-11 items-center rounded-full border px-3 py-2 text-sm font-semibold capitalize ${PHASE_TONE[city.phase]}`}
            >
              Phase: {city.phase}
            </p>
          </div>
          <p className="text-gray-800 dark:text-gray-200 mb-3">{city.tip}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {phaseDecisionLine(city.phase)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            ACCC buying tip, last updated{" "}
            <time dateTime={city.tipUpdated}>{CYCLE_TIPS_SOURCE.tipUpdatedLabel}</time>
            {" · "}
            <a
              href={city.sourceUrl}
              className="text-orange-700 dark:text-orange-400 underline underline-offset-2"
              rel="noopener noreferrer"
            >
              ACCC petrol price cycles in the 5 largest cities
            </a>
            . {city.cycleLengthNote}
          </p>
        </article>
      ))}
    </div>
  );
}
