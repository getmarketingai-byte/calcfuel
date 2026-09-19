/**
 * ACCC snapshot cadence helpers.
 *
 * The weekly report is published on Fridays and typically carries prices to the
 * preceding Wednesday. Default window is 14 days from `pricesTo` so one missed
 * Friday does not fail the build; tighten to 7 via ACCC_STALE_AFTER_DAYS if you
 * want same-week enforcement.
 */

export const DEFAULT_ACCC_STALE_AFTER_DAYS = 14;
export const ACCC_STALE_AFTER_DAYS_ENV = "ACCC_STALE_AFTER_DAYS";
export const ACCC_ALLOW_STALE_ENV = "ACCC_ALLOW_STALE";

const MS_PER_DAY = 86_400_000;

export function parseIsoDateUtc(isoDate: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    throw new Error(`Expected YYYY-MM-DD, got ${JSON.stringify(isoDate)}`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = Date.UTC(year, month - 1, day);
  const roundTrip = new Date(utc);
  if (
    roundTrip.getUTCFullYear() !== year ||
    roundTrip.getUTCMonth() !== month - 1 ||
    roundTrip.getUTCDate() !== day
  ) {
    throw new Error(`Invalid calendar date: ${isoDate}`);
  }
  return utc;
}

export function utcDayStart(now: Date): number {
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

/** Whole calendar days from `pricesTo` to `now` (UTC date). Negative if as_of is in the future. */
export function daysSincePricesTo(pricesTo: string, now: Date = new Date()): number {
  return Math.floor((utcDayStart(now) - parseIsoDateUtc(pricesTo)) / MS_PER_DAY);
}

type EnvLike = Record<string, string | undefined>;

export function staleAfterDaysFromEnv(
  env: EnvLike = process.env,
  fallback: number = DEFAULT_ACCC_STALE_AFTER_DAYS,
): number {
  const raw = env[ACCC_STALE_AFTER_DAYS_ENV];
  if (raw === undefined || raw === "") return fallback;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(
      `${ACCC_STALE_AFTER_DAYS_ENV} must be a positive integer, got ${JSON.stringify(raw)}`,
    );
  }
  return parsed;
}

export function allowStaleFromEnv(env: EnvLike = process.env): boolean {
  const raw = (env[ACCC_ALLOW_STALE_ENV] ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export function isAcccSnapshotStale(
  pricesTo: string,
  options: { now?: Date; staleAfterDays?: number } = {},
): boolean {
  const limit = options.staleAfterDays ?? staleAfterDaysFromEnv();
  return daysSincePricesTo(pricesTo, options.now) >= limit;
}

export function formatDaysAgo(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days > 1) return `${days} days ago`;
  if (days === -1) return "1 day in the future";
  return `${Math.abs(days)} days in the future`;
}
