# ACCC cycle-tip refresh

Canonical data lives in [`src/lib/accc-cycle-tips.ts`](../src/lib/accc-cycle-tips.ts). The
`/when-to-buy-petrol` page reads only from that module. Tips are **transcribed by hand**
from the public ACCC cycle page. Do not scrape, infer a cheap day, or invent a city tip.

This is a separate freshness duty from the weekly cents-per-litre snapshot in
[`docs/accc-price-refresh.md`](./accc-price-refresh.md). Do not fold the two updates into
one habit: tips move Monday / Wednesday / Friday; the PDF moves on (or around) Friday.

## Source

| Field | Where it comes from |
| --- | --- |
| Buying tips | https://www.accc.gov.au/consumers/petrol-and-fuel/petrol-price-cycles-in-the-5-largest-cities |
| Cities | Sydney, Melbourne, Brisbane, Adelaide, Perth only |
| Fuel | Regular unleaded. ACCC says PULP95 / PULP98 / E10 often move similarly. **Diesel and LPG do not cycle** — never add a diesel phase. |
| `tip` | The current “Buying tip” bullets for that city, quoted or lightly paraphrased. Keep the ACCC sense. |
| `tipUpdated` | ISO date of the weekday ACCC currently prints (“updated on Monday / Wednesday / Friday”). Map that weekday to the most recent such calendar day at transcription time. |
| `phase` | CalcFuel mapping of the tip language (table below). Never override a tip with a conflicting phase. |
| Cycle-length notes | Optional ACCC 2025 averages on the same page. Attribution only — not a live forecast. |

ACCC updates tips on weekdays, at least Monday, Wednesday and Friday, around midday.
Operator cadence for this site: **three times a week after midday** on those days.

## Tip → phase mapping

| ACCC tip sense | Phase |
| --- | --- |
| prices are decreasing / may decrease further | `falling` |
| prices are near their low / good time to buy (only if ACCC says so) | `near low` |
| prices have increased / shopping around | `climbing` |
| prices near peak / expensive part of the cycle (only if ACCC says so) | `near peak` |
| little movement / cycles not occurring / disrupted | `plateau` |

When ACCC says cycles are disrupted, or the tip says “increased” without a classic fall,
use **`climbing` or `plateau`**. Never invent a trough day or “buy Tuesday”.

Since late February 2026 ACCC has noted that cycles have mostly not occurred in
Sydney, Melbourne, Brisbane and Adelaide. That note is methodology context. The live
`phase` still follows the current tip bullets, not the historical conflict paragraph.

## How to bump tips

1. Open the ACCC cycle page. Do not reuse an older explore snapshot.
2. For each of the five cities, copy the buying-tip sense into `tip`.
3. Map each tip to a `phase` using the table. If the mapping would contradict the tip
   text, stop and fix the mapping — do not “correct” ACCC.
4. Set `tipUpdated` / `CYCLE_TIPS_SOURCE.tipUpdated` to the ISO date of the ACCC
   weekday label (e.g. “updated on Friday” read on Saturday 26 September 2026 →
   `2026-09-25`).
5. Leave `sourceUrl` as the ACCC cycle page unless ACCC moves it.
6. Run `npm test` and `npm run check:cycle-tips`. Then `npm run build`.

## Cadence guard

Default window is **7 days** from the oldest city `tipUpdated`.

- **Build:** `scripts/check-cycle-tips-cadence.mjs` runs at the start of `npm run build`.
  It fails when the oldest tip is at least N days old.
- **Override:** `CYCLE_TIPS_ALLOW_STALE=1` prints the warning and continues. Use that
  only when a transcription was skipped on purpose (ACCC page unchanged or unreachable).
  Never invent a tip to silence the guard. `CYCLE_TIPS_STALE_AFTER_DAYS` tightens or
  loosens the window (must be a positive integer).
- **Pages:** `CycleTipsLastUpdated` always shows the dated ACCC source. It switches to a
  warning style when the snapshot is stale, even if the build was allowed through.

If tips cannot be kept inside 7 days, park or unpublish `/when-to-buy-petrol`. Do not
leave the page live green on a stale snapshot.

## What this is not

- Not a cents-per-litre forecast, cheap-day calendar, or news/NLP score.
- Not an auto-scrape. No crawler, no hidden fetch of the ACCC HTML at build or runtime.
- Not a Neutrino, AdSense, or affiliate surface. Do not add those as part of a tip bump.
- Not a substitute for the weekly price module. Diesel averages on the page come from
  `src/lib/fuel-prices.ts` and still have **no phase**.
