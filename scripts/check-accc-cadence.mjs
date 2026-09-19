#!/usr/bin/env node
/**
 * Fail the build when src/lib/fuel-prices.ts `pricesTo` is older than N days.
 *
 *   ACCC_STALE_AFTER_DAYS  default 14 (use 7 for same-week enforcement)
 *   ACCC_ALLOW_STALE=1     print the warning but exit 0
 *
 * Does not invent or fetch prices — it only reads the committed as_of date.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(root, "src/lib/fuel-prices.ts");
const source = readFileSync(sourcePath, "utf8");

const pricesTo = source.match(/pricesTo:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
if (!pricesTo) {
  console.error("ACCC cadence: could not find pricesTo: \"YYYY-MM-DD\" in src/lib/fuel-prices.ts");
  process.exit(1);
}

const rawWindow = process.env.ACCC_STALE_AFTER_DAYS;
const windowDays = rawWindow === undefined || rawWindow === "" ? 14 : Number(rawWindow);
if (!Number.isInteger(windowDays) || windowDays < 1) {
  console.error(`ACCC cadence: ACCC_STALE_AFTER_DAYS must be a positive integer, got ${JSON.stringify(rawWindow)}`);
  process.exit(1);
}

const allowStale = /^(1|true|yes)$/i.test((process.env.ACCC_ALLOW_STALE ?? "").trim());

const now = new Date();
const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
const [y, m, d] = pricesTo.split("-").map(Number);
const asOfUtc = Date.UTC(y, m - 1, d);
const days = Math.floor((todayUtc - asOfUtc) / 86_400_000);
const stale = days >= windowDays;

const summary =
  `ACCC snapshot pricesTo=${pricesTo} is ${days} day(s) old (window ${windowDays} days).`;

if (!stale) {
  console.log(`ACCC cadence OK: ${summary}`);
  process.exit(0);
}

const hint =
  `Refresh from ${"https://www.accc.gov.au/about-us/publications/weekly-fuel-price-monitoring-update"} ` +
  `using docs/accc-price-refresh.md, or set ACCC_ALLOW_STALE=1 if the skip is intentional.`;

if (allowStale) {
  console.warn(`ACCC cadence STALE (allowed): ${summary}\n${hint}`);
  process.exit(0);
}

console.error(`ACCC cadence FAILED: ${summary}\n${hint}`);
process.exit(1);
