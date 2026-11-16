/**
 * Single source of truth for publisher identity and page review attribution.
 *
 * There is exactly one byline on the site. Two competing "Reviewed by" lines with
 * different dates (the state before 2026-08-21) reads as unreviewed templating to
 * both readers and publisher-policy reviewers, so this file is the only place an
 * attribution may come from. Enforced by AC5 in `npm run audit:adsense`.
 */

/**
 * CalcFuel publishes under its own name. It is an independent site, not a
 * product of another brand or studio, so the publisher and the reviewer are the
 * same entity. Do not point this at a third-party brand.
 */
export const OPERATOR_NAME = "CalcFuel";
export const OPERATOR_URL = "https://calcfuel.com";

/** Shown next to "Reviewed by" on every calculator and guide. */
export const REVIEWER_NAME = OPERATOR_NAME;

/** Anchor on /about that explains who reviews the maths and how. */
export const REVIEWER_PROFILE_PATH = "/about#who-reviews-this";

/**
 * Date of the last substantive review, per URL path (ISO yyyy-mm-dd).
 *
 * A component default would silently claim a review that never happened, so pages
 * that are not listed render no date at all. Every byline date, calculator
 * `dateModified` and sitemap `lastmod` for these paths reads from here, so the three
 * cannot drift apart. Bump a date only when the page content was actually reviewed
 * or rewritten — not for a mechanical change such as an ISR setting.
 */
const AUG_REMEDIATION = "2026-08-21"; // worked examples, single byline, disclaimers
const PHASE1_REWRITE = "2026-11-17"; // CTR rewrites, answer-first summaries, AU copy

const REVIEW_DATES: Record<string, string> = {
  // Rewritten 17 Nov 2026
  "/calculators/drive-vs-fly-calculator": PHASE1_REWRITE,
  "/calculators/motorcycle-fuel-cost-calculator": PHASE1_REWRITE,
  "/calculators/boat-fuel-calculator": PHASE1_REWRITE,
  "/calculators/towing-fuel-cost-calculator": PHASE1_REWRITE,
  "/calculators/hybrid-vs-gas-calculator": PHASE1_REWRITE,
  "/calculators/fuel-budget-planner": PHASE1_REWRITE,
  "/calculators/trip-fuel-cost-calculator": PHASE1_REWRITE,
  "/calculators/carpool-fuel-split-calculator": PHASE1_REWRITE,
  "/calculators/fuel-surcharge-calculator": PHASE1_REWRITE,
  "/calculators/idling-fuel-waste-calculator": PHASE1_REWRITE,
  "/fuel-efficiency-comparison": PHASE1_REWRITE,
  "/blog/most-fuel-efficient-cars-australia": PHASE1_REWRITE,
  "/calculators/fuel-economy-savings-calculator": PHASE1_REWRITE,
  "/calculators/generator-fuel-calculator": PHASE1_REWRITE,
  "/calculators/hydrogen-vs-gas-calculator": PHASE1_REWRITE,
  "/blog/diesel-vs-petrol-car-australia": PHASE1_REWRITE,
  "/blog/ev-charging-cost-australia": PHASE1_REWRITE,
  "/blog/understanding-fuel-economy-mpg-vs-l100km": PHASE1_REWRITE,
  "/blog/caravan-fuel-consumption-australia": PHASE1_REWRITE,
  // Section hubs, reviewed in the same pass
  "/vehicles": PHASE1_REWRITE,
  "/marine": PHASE1_REWRITE,
  "/towing": PHASE1_REWRITE,
  "/trip-planning": PHASE1_REWRITE,
  // Last reviewed in the 21 Aug 2026 remediation pass
  "/calculators/ev-vs-gas-calculator": AUG_REMEDIATION,
  "/calculators/ev-charging-cost-calculator": AUG_REMEDIATION,
  "/blog/car-running-costs-australia": AUG_REMEDIATION,
  "/blog/how-to-reduce-commute-fuel-costs": AUG_REMEDIATION,
  "/blog/how-to-save-money-on-petrol-australia": AUG_REMEDIATION,
  "/blog/hybrid-vs-petrol-australia": AUG_REMEDIATION,
  "/blog/motorcycle-vs-car-running-costs-australia": AUG_REMEDIATION,
  "/blog/petrol-cost-per-km-australia": AUG_REMEDIATION,
  "/blog/best-time-to-buy-petrol-australia": AUG_REMEDIATION,
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-11-17" → "17 November 2026". */
export function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** ISO date of the last substantive review, or undefined if none is recorded. */
export function reviewIsoFor(path: string): string | undefined {
  return REVIEW_DATES[path];
}

/** Human label for the byline, e.g. "17 November 2026". */
export function reviewDateFor(path: string): string | undefined {
  const iso = REVIEW_DATES[path];
  return iso ? formatIsoDate(iso) : undefined;
}

/**
 * Most recent review date across a set of paths — used by hubs and the /calculators index,
 * whose "Last updated" should move whenever any page they present is reviewed.
 */
export function latestReviewIsoFor(paths: string[]): string | undefined {
  const isos = paths.map((p) => REVIEW_DATES[p]).filter((d): d is string => Boolean(d));
  return isos.length ? isos.sort().at(-1) : undefined;
}

export function latestReviewDateFor(paths: string[]): string | undefined {
  const iso = latestReviewIsoFor(paths);
  return iso ? formatIsoDate(iso) : undefined;
}

/** Every reviewed path under a prefix, e.g. "/calculators/". */
export function reviewedPathsUnder(prefix: string): string[] {
  return Object.keys(REVIEW_DATES).filter((p) => p.startsWith(prefix));
}
