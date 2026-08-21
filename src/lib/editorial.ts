/**
 * Single source of truth for publisher identity and page review attribution.
 *
 * There is exactly one byline on the site. Two competing "Reviewed by" lines with
 * different dates (the state before 2026-08-21) reads as unreviewed templating to
 * both readers and publisher-policy reviewers, so this file is the only place an
 * attribution may come from. Enforced by AC5 in `npm run audit:adsense`.
 */

export const OPERATOR_NAME = "neutrino.au";
export const OPERATOR_URL = "https://neutrino.au";

/** Shown next to "Reviewed by" on every calculator and guide. */
export const REVIEWER_NAME = OPERATOR_NAME;

/** Anchor on /about that explains who reviews the maths and how. */
export const REVIEWER_PROFILE_PATH = "/about#who-reviews-this";

/**
 * Review date per URL path. A component default would silently claim a review
 * that never happened, so pages that are not listed render no date at all.
 */
const REVIEW_DATES: Record<string, string> = {};

export function reviewDateFor(path: string): string | undefined {
  return REVIEW_DATES[path];
}
