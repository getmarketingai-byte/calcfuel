# ACCC weekly fuel price refresh

Canonical data lives in [`src/lib/fuel-prices.ts`](../src/lib/fuel-prices.ts). Every calculator
default, homepage figure, and `/data/australian-fuel-prices` table reads from that module.
Nothing in it is estimated or carried forward from an older week.

## Source

| Field | Where it comes from |
| --- | --- |
| Index (new PDF each Friday) | https://www.accc.gov.au/about-us/publications/weekly-fuel-price-monitoring-update |
| Current PDF | `SOURCE_REPORT.url` — currently the 2 October 2026 report |
| `pricesTo` / `pricesToLabel` | Key messages: “with prices to &lt;date&gt;” |
| `reportDate` / `reportDateLabel` | Cover: “Friday &lt;date&gt;” |
| `edition` | Key messages: “This is our Nth weekly report” |
| Five-city unleaded / diesel | Key messages **and** Table 6 / Table 7 “5 largest cities” row. Use the published figure, do not average the five cities yourself. |
| Per-city unleaded | Table 3 (and Table 6 city rows) — 30 September column in the current edition |
| Per-city diesel | Table 5 (and Table 7 city rows) |
| Regional aggregates | Key messages / regional section. If those two disagree, use the figure that matches last week plus the stated weekly move, and leave a one-line comment. The 2 October key-messages bullet says regional petrol 243.2; the Regional petrol section says 243.3 (last week 242.7 + 0.6). The module uses 243.3. |
| `preConflict` | 20 February column — should be unchanged week to week |
| Intra-city cheapest / dearest site | Only if the report publishes them. The 2 October 2026 edition does **not**. Leave `lowestSite` / `highestSite` unset rather than inventing or recycling last week’s range. |
| City footnote | If the PDF marks a city (Perth petrol was 226.3 cpl on Tue 29 Sep before the weekly-cycle rise), record it as a code comment. Do not add a data field the page does not already have. |

The 2 October key messages and Table 6 both say the five-city petrol average was
**236.0 cpl**, which matches the five capital arithmetic
(237.2 + 234.5 + 236.5 + 233.1 + 238.7) / 5. Transcribe 236.0. Diesel’s published
five-city figure is **283.3 cpl**. Do not invent a compromise. Recompute any
“X cpl above the five-city average” sentence from the new regional and five-city
figures (currently petrol 7.3, diesel 4.2).

## How to bump a week

1. Open the index URL. Confirm a newer Friday PDF exists. Download it; do not guess prices
   from news write-ups.
2. Replace `SOURCE_REPORT` (dates, edition, PDF `url`). Keep `indexUrl` unless the ACCC moves
   the index.
3. Replace `PETROL_BY_CITY`, `DIESEL_BY_CITY`, `FIVE_CITY_AVERAGE`, `REGIONAL_AVERAGE`.
   Include `lowestSite` / `highestSite` only when the PDF has those columns.
4. Worked examples import `DEFAULT_*_AUD_PER_L` from this module — recalculate any
   dollar results that no longer match the new price.
5. Pages that interpolate `SOURCE_REPORT` / `FIVE_CITY_AVERAGE` update themselves. Search
   for leftover hardcoded dates (`19 August 2026`) or cpl figures before merging.
6. Set `CalcReviewedBy` / methodology `lastUpdated` on pages you actually reviewed.
7. Run `npm test` and `npm run check:accc`. Then `npm run build`.

## Cadence guard

Default window is **14 days** from `pricesTo` (not from publication date). ACCC reports are
weekly, so 14 days allows one missed Friday; set `ACCC_STALE_AFTER_DAYS=7` for same-week
enforcement.

- **Build:** `scripts/check-accc-cadence.mjs` runs at the start of `npm run build`. It fails
  when the snapshot is at least N days old.
- **Override:** `ACCC_ALLOW_STALE=1` prints the warning and continues. Use that only when a
  refresh was skipped on purpose (PDF not out yet, transcription blocked). Never invent
  prices to silence the guard.
- **Pages:** `PricesLastUpdated` always shows the dated ACCC source. It switches to a warning
  style when the snapshot is stale, even if the build was allowed through. The age and the
  stale flag are evaluated when the page renders (hourly ISR, `export const revalidate = 3600`
  on every route that shows them). The parenthetical age is Australia/Sydney calendar days,
  then recomputed in the browser by `RelativeAge`, so a cached HTML file cannot keep claiming
  the snapshot is newer than it is. Do not switch those routes to fully dynamic rendering.
  `scripts/check-accc-cadence.mjs` stays a separate UTC build check; do not fold it into the
  Sydney helper.

## What this is not

Do not add AdSense units, affiliate slots, or Neutrino brand/CTAs as part of a price refresh.
Calculator input chrome stays as-is; only the shared ACCC module and the pages that cite it
move.
