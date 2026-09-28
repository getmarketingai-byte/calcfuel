#!/usr/bin/env node
/**
 * Fail the build when src/lib/accc-cycle-tips.ts `tipUpdated` is older than N days.
 *
 *   CYCLE_TIPS_STALE_AFTER_DAYS  default 7
 *   CYCLE_TIPS_ALLOW_STALE=1     print the warning but exit 0
 *
 * Does not fetch or invent tips — it only reads the committed dates.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "src/lib/accc-cycle-tips.ts");
const source = readFileSync(sourcePath, "utf8");

const dates = [...source.matchAll(/tipUpdated:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);
if (dates.length === 0) {
  console.error('Cycle tips cadence: could not find tipUpdated: "YYYY-MM-DD" in src/lib/accc-cycle-tips.ts');
  process.exit(1);
}

const rawWindow = process.env.CYCLE_TIPS_STALE_AFTER_DAYS;
const windowDays = rawWindow === undefined || rawWindow === "" ? 7 : Number(rawWindow);
if (!Number.isInteger(windowDays) || windowDays < 1) {
  console.error(
    `Cycle tips cadence: CYCLE_TIPS_STALE_AFTER_DAYS must be a positive integer, got ${JSON.stringify(rawWindow)}`,
  );
  process.exit(1);
}

const allowStale = /^(1|true|yes)$/i.test((process.env.CYCLE_TIPS_ALLOW_STALE ?? "").trim());

const now = new Date();
const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

function daysOld(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.floor((todayUtc - Date.UTC(y, m - 1, d)) / 86_400_000);
}

const oldest = dates.reduce((a, b) => (daysOld(b) > daysOld(a) ? b : a));
const days = daysOld(oldest);
const stale = days >= windowDays;

const summary = `Cycle tips oldest tipUpdated=${oldest} is ${days} day(s) old (window ${windowDays} days).`;

if (!stale) {
  console.log(`Cycle tips cadence OK: ${summary}`);
  process.exit(0);
}

const hint =
  "Refresh from https://www.accc.gov.au/consumers/petrol-and-fuel/petrol-price-cycles-in-the-5-largest-cities " +
  "using docs/accc-cycle-tips-refresh.md, or set CYCLE_TIPS_ALLOW_STALE=1 if the skip is intentional.";

if (allowStale) {
  console.warn(`Cycle tips cadence STALE (allowed): ${summary}\n${hint}`);
  process.exit(0);
}

console.error(`Cycle tips cadence FAILED: ${summary}\n${hint}`);
process.exit(1);
