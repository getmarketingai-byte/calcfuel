# CalcFuel URL Migration Map

**Status:** DATA-ENRICHED — ready for Human Approval Gate finals  
**Updated:** 2026-08-10 (GSC + Bing + GA4 imports applied)  
**Sources:**
- GSC export folder `calcfuel-3` (Pages.csv, Queries.csv) — ~1678 page impressions / 5 clicks in export
- Bing `SearchPerformanceOverview_All_8_10_2026` — **5439 impressions / 89 clicks**
- Bing `KeywordReport_8_10_2026` — keyword→URL heuristic mapping (not official page report)
- GA4 Landing page + Pages & screens + Events + Country (2025-07-12 → 2026-08-08)

**Rule:** Strategy sets direction. Data gates irreversible 410s. `Final` column is the **recommended** disposition after data; human still signs off.

## Thesis (locked)

> CalcFuel helps people make better real-world transport and trip-cost decisions by calculating fuel, range, time and operating costs.

## Evidence snapshot (updated)

| Source | Signal |
|--------|--------|
| GA4 | 1,554 `calculation_performed` / 155 users; 1,112 session_start; US 534 · AU 40 · CA 39 · UK 32 |
| Top landings | Boat 94/59s · Surcharge 70/60s · Social hub 65/4 users · Drive vs Fly 53 · Follower growth 33/**161s** · Hybrid 31/**86s** · Franking 24 · Hydrogen 27 · Generator 22 · Budget 18/**93s** · Mortgage 13 |
| GSC pages | Immature clicks; **website-traffic 816 impr @83** (0 CTR); fuel-economy blog 93 impr/1c; salary-sacrifice 44 impr/1c; boat 1c@pos1 |
| Bing | **5,439 impr / 89 clicks**; boat fuel, surcharge, drive vs fly, fuel budget, hybrid, hydrogen, follower growth query demand in positions ~1–8 |

### Interpretation highlights

- **Bing > GSC** for transport intent validation right now.
- High impressions + deep position (website traffic @83) = opportunity *if* kept — **not** a reason to keep against strategy; use **HOLD-EQUITY** / staged exit.
- High engagement on Hybrid + Fuel Budget + Follower growth = behavioural proof of decision-tool demand (Hybrid/Budget keep; Follower = staged exit).

---

## Recommended Final disposition summary (calculators)

| Final | Count |
|-------|------:|
| REBUILD | 7 |
| KEEP | 3 |
| MERGE | 3 |
| DEMOTE | 7 |
| HOLD-EQUITY | 12 |
| 301 | 2 |
| 410 | 49 |

### HOLD-EQUITY (do not 410 yet)

- `/calculators/capital-gains-tax-calculator` — Residual signals — confirm before 410
- `/calculators/franking-credits-calculator` — GA 24 + Bing franking — temporary preserve
- `/calculators/marketing-roi-calculator` — Bing advertising ROI impressions
- `/calculators/mortgage-repayment-calculator` — GA 13 — temporary preserve
- `/calculators/profit-margin-calculator` — Residual signals — confirm before 410
- `/calculators/rag-storage-cost-calculator` — Residual signals — confirm before 410
- `/calculators/salary-sacrifice-calculator` — GSC click + 44 impr
- `/calculators/social-media` — Residual signals — confirm before 410
- `/calculators/social-media-follower-growth-rate-calculator` — GA 33/161s + Bing follower queries — plan exit (noindex→410) not instant 410
- `/calculators/tax-refund-estimator` — Residual signals — confirm before 410
- `/calculators/website-traffic-calculator` — GSC 816 impr @~83 — high-impr/low-CTR; strategy retire but delay 410 / consider noindex first
- `/calculators/work-from-home-tax-calculator` — Residual signals — confirm before 410

---

## A — REBUILD (Final = REBUILD)

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/calculators/boat-fuel-calculator` | **REBUILD** | A | 89 | 94 (59.5s) | 1c/1i @1.0 | 26c/255i @5.7 | 1545 | — |
| `/calculators/drive-vs-fly-calculator` | **REBUILD** | A | 87 | 53 (46.7s) | 0c/2i @48.5 | 2c/32i @6.4 | 1581 | — |
| `/calculators/ev-vs-gas-calculator` | **REBUILD** | B | 64 | 5 | 0c/2i @7.5 | 0c/3i @19.3 | 1436 | — |
| `/calculators/fuel-budget-planner` | **REBUILD** | A | 86 | 18 (92.6s) | 0c/1i @4.0 | 6c/14i @4.1 | 1653 | — |
| `/calculators/fuel-energy` | **REBUILD** | B | 58 | 2 (2.5s) | 0c/4i @6.0 | 0 | 1220 | — |
| `/calculators/towing-fuel-cost-calculator` | **REBUILD** | A | 67 | 2 (11.5s) | 0 | 0 | 1948 | — |
| `/calculators/trip-fuel-cost-calculator` | **REBUILD** | A | 73 | 3 | 0c/2i @5.5 | 0 | 1384 | — |

## B — KEEP / MERGE

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/calculators/carpool-fuel-split-calculator` | **MERGE** | B | 62 | 9 (6.7s) | 0c/3i @9.0 | 0 | 1978 | — |
| `/calculators/commute-fuel-cost-calculator` | **MERGE** | B | 65 | 4 | 0 | 0c/16i @2.5 | 1317 | — |
| `/calculators/fuel-economy-savings-calculator` | **MERGE** | B | 51 | 0 | 0 | 0 | 1434 | — |
| `/calculators/hybrid-vs-gas-calculator` | **KEEP** | B | 78 | 31 (85.9s) | 0c/1i @10.0 | 2c/24i @4.0 | 1781 | — |
| `/calculators/idling-fuel-waste-calculator` | **KEEP** | B | 71 | 12 (32.9s) | 0c/1i @12.0 | 3c/40i @5.5 | 1884 | — |
| `/calculators/motorcycle-fuel-cost-calculator` | **KEEP** | B | 69 | 2 (85.0s) | 0 | 1c/12i @4.2 | 1870 | — |

## D — DEMOTE (keep live, remove from primary nav)

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/calculators/emergency-fuel-rationing-calculator` | **DEMOTE** | D | 44 | 1 (16.0s) | 0c/2i @8.0 | 0 | 1500 | — |
| `/calculators/ev-charging-cost-calculator` | **DEMOTE** | D | 35 | 0 | 0 | 0 | 2024 | — |
| `/calculators/fuel-surcharge-calculator` | **DEMOTE** | B | 80 | 70 (59.6s) | 0c/5i @7.8 | 0c/58i @7.4 | 1990 | High GA + Bing surcharge demand — demote/keep |
| `/calculators/fuel-tax-credit-calculator` | **DEMOTE** | D | 35 | 0 | 0 | 0 | 1602 | — |
| `/calculators/generator-fuel-calculator` | **DEMOTE** | D | 55 | 22 (59.9s) | 0c/10i @46.9 | 1c/50i @6.5 | 1386 | — |
| `/calculators/hydrogen-vs-gas-calculator` | **DEMOTE** | D | 58 | 27 (38.3s) | 0 | 4c/33i @4.1 | 1398 | — |
| `/calculators/ifta-fuel-tax-calculator` | **DEMOTE** | D | 38 | 1 | 0 | 0 | 1485 | — |

## HOLD-EQUITY (staged exit)

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/calculators/capital-gains-tax-calculator` | **HOLD-EQUITY** | E | 20 | 9 (1.6s) | 0 | 0 | 1432 | DATA vs blind 410: Residual signals — confirm before 410 |
| `/calculators/franking-credits-calculator` | **HOLD-EQUITY** | E | 33 | 24 (19.8s) | 0c/1i @34.0 | 3c/26i @8.1 | 2185 | DATA vs blind 410: GA 24 + Bing franking — temporary preserve |
| `/calculators/marketing-roi-calculator` | **HOLD-EQUITY** | E | 35 | 7 (4.7s) | 0c/11i @42.7 | 1c/152i @3.9 | 1681 | DATA vs blind 410: Bing advertising ROI impressions |
| `/calculators/mortgage-repayment-calculator` | **HOLD-EQUITY** | E | 23 | 13 (8.5s) | 0 | 0 | 2043 | DATA vs blind 410: GA 13 — temporary preserve |
| `/calculators/profit-margin-calculator` | **HOLD-EQUITY** | E | 25 | 0 | 0c/62i @61.9 | 0c/2i @8.0 | 1519 | DATA vs blind 410: Residual signals — confirm before 410 |
| `/calculators/rag-storage-cost-calculator` | **HOLD-EQUITY** | E | 26 | 8 (30.8s) | 0c/4i @5.5 | 0 | 2477 | DATA vs blind 410: Residual signals — confirm before 410 |
| `/calculators/salary-sacrifice-calculator` | **HOLD-EQUITY** | E | 25 | 0 | 1c/44i @94.8 | 0 | 2122 | DATA vs blind 410: GSC click + 44 impr |
| `/calculators/social-media` | **HOLD-EQUITY** | E | 29 | 65 (8.1s) | 0c/1i @2.0 | 0 | 891 | DATA vs blind 410: Residual signals — confirm before 410 |
| `/calculators/social-media-follower-growth-rate-calculator` | **HOLD-EQUITY** | E | 39 | 33 (160.8s) | 0c/5i @9.8 | 2c/75i @5.4 | 1542 | DATA vs blind 410: GA 33/161s + Bing follower queries — plan exit (noindex→410) not instant 410 |
| `/calculators/tax-refund-estimator` | **HOLD-EQUITY** | E | 23 | 0 | 0c/26i @70.4 | 0 | 1903 | DATA vs blind 410: Residual signals — confirm before 410 |
| `/calculators/website-traffic-calculator` | **HOLD-EQUITY** | E | 39 | 10 (42.1s) | 0c/816i @83.0 | 1c/28i @4.1 | 1754 | Largest GSC impressions (816@83) — opportunity vs retire |
| `/calculators/work-from-home-tax-calculator` | **HOLD-EQUITY** | E | 28 | 1 (15.0s) | 0 | 0c/22i @8.0 | 2012 | DATA vs blind 410: Residual signals — confirm before 410 |

## E — 410 recommended (weak equity + poor fit)

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/calculators/ad-spend-calculator` | **410** | E | 24 | 4 (9.0s) | 0c/8i @26.8 | 0 | 1827 | — |
| `/calculators/age-calculator` | **410** | E | 18 | 5 (4.4s) | 0 | 0 | 1101 | — |
| `/calculators/ai-developer-tools` | **410** | E | 11 | 0 | 0 | 0 | 434 | — |
| `/calculators/ai-model-router-savings-calculator` | **410** | E | 18 | 1 | 0 | 0 | 2054 | — |
| `/calculators/amazon-fba-fee-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1712 | — |
| `/calculators/australian-income-tax-calculator` | **410** | E | 21 | 0 | 0c/2i @52.0 | 0 | 1643 | — |
| `/calculators/average-order-value-calculator` | **410** | E | 21 | 0 | 0c/1i @7.0 | 0 | 1468 | — |
| `/calculators/bmi-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1255 | — |
| `/calculators/break-even-calculator` | **410** | E | 18 | 3 (2.7s) | 0 | 0 | 1393 | — |
| `/calculators/churn-rate-calculator` | **410** | E | 26 | 2 (3.0s) | 0c/13i @77.9 | 0 | 1603 | — |
| `/calculators/click-through-rate-calculator` | **410** | E | 19 | 0 | 0c/3i @15.7 | 0 | 986 | — |
| `/calculators/compound-interest-calculator` | **410** | E | 15 | 0 | 0 | 0 | 2036 | — |
| `/calculators/conversion` | **410** | E | 20 | 1 (5.0s) | 0c/7i @14.1 | 0 | 833 | — |
| `/calculators/conversion-rate-calculator` | **410** | E | 19 | 0 | 0c/2i @92.0 | 0 | 923 | — |
| `/calculators/cost-per-acquisition-calculator` | **410** | E | 22 | 1 | 0c/2i @57.5 | 0 | 1122 | — |
| `/calculators/cost-per-lead-calculator` | **410** | E | 22 | 1 | 0 | 0c/7i @5.1 | 938 | — |
| `/calculators/cpm-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1359 | — |
| `/calculators/customer-acquisition-cost-calculator` | **410** | E | 16 | 3 | 0 | 0 | 980 | — |
| `/calculators/customer-lifetime-value-calculator` | **410** | E | 21 | 0 | 0c/12i @77.9 | 0 | 974 | — |
| `/calculators/ebay-fee-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1565 | — |
| `/calculators/email-list-growth-rate-calculator` | **410** | E | 21 | 0 | 0c/18i @50.0 | 0 | 1014 | — |
| `/calculators/email-marketing` | **410** | E | 22 | 5 (12.0s) | 0c/6i @6.7 | 0 | 718 | — |
| `/calculators/email-open-rate-calculator` | **410** | E | 24 | 3 (6.3s) | 0c/3i @15.0 | 0 | 1786 | — |
| `/calculators/etsy-fee-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1597 | — |
| `/calculators/financial` | **410** | E | 22 | 4 (83.5s) | 0c/9i @21.6 | 0 | 1382 | — |
| `/calculators/freelance-rate-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1570 | — |
| `/calculators/gst-calculator` | **410** | E | 18 | 1 | 0 | 0 | 1490 | — |
| `/calculators/hecs-help-repayment-calculator` | **410** | E | 18 | 1 | 0 | 0 | 1745 | — |
| `/calculators/influencer-rate-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1554 | — |
| `/calculators/loan-repayment-calculator` | **410** | E | 20 | 1 (96.0s) | 0 | 0 | 1220 | — |
| `/calculators/marketing-budget-calculator` | **410** | E | 22 | 3 (8.7s) | 0c/4i @55.8 | 0 | 1014 | — |
| `/calculators/marketplace-fees` | **410** | E | 11 | 0 | 0 | 0 | 506 | — |
| `/calculators/markup-vs-margin-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1265 | — |
| `/calculators/multimodal-payload-estimator` | **410** | E | 24 | 4 (12.8s) | 0c/9i @3.9 | 0 | 1289 | — |
| `/calculators/negative-gearing-calculator` | **410** | E | 24 | 2 (1.0s) | 0c/1i @1.0 | 0 | 1999 | — |
| `/calculators/net-promoter-score-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1569 | — |
| `/calculators/paypal-fee-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1322 | — |
| `/calculators/percentage-calculator` | **410** | E | 22 | 1 | 0c/2i @8.5 | 0 | 1144 | — |
| `/calculators/prompt-caching-discount-estimator` | **410** | E | 18 | 1 (17.0s) | 0 | 0 | 1841 | — |
| `/calculators/revenue-per-lead-calculator` | **410** | E | 21 | 0 | 0c/2i @55.5 | 0 | 1431 | — |
| `/calculators/roas-calculator` | **410** | E | 18 | 4 (0.5s) | 0 | 0 | 1740 | — |
| `/calculators/seo-tools` | **410** | E | 20 | 1 (1.0s) | 0c/4i @9.5 | 0 | 821 | — |
| `/calculators/social-media-engagement-rate-calculator` | **410** | E | 16 | 1 (34.0s) | 0 | 0 | 961 | — |
| `/calculators/social-media-roi-calculator` | **410** | E | 26 | 1 (124.0s) | 0c/2i @7.5 | 0 | 1929 | — |
| `/calculators/stamp-duty-calculator` | **410** | E | 18 | 2 | 0 | 0 | 1964 | — |
| `/calculators/stripe-fee-calculator` | **410** | E | 15 | 0 | 0 | 0 | 1298 | — |
| `/calculators/superannuation-calculator` | **410** | E | 21 | 0 | 0c/1i @98.0 | 0 | 1655 | — |
| `/calculators/tip-calculator` | **410** | E | 13 | 0 | 0 | 0 | 1119 | — |
| `/calculators/website-speed-impact-calculator` | **410** | E | 21 | 0 | 0c/1i @94.0 | 0 | 1671 | — |

## 301 aliases

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/calculators/hecs-help-calculator` | **301** | E | 24 | 1 | 0c/3i @4.7 | 0 | 1634 | — |
| `/calculators/income-tax-calculator` | **301** | E | 11 | 0 | 0 | 0 | 69 | — |

---

## Blog / Guides

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/blog/beginners-guide-to-marketing-roi` | **410** | E | 16 | 0 | 0c/1i @9.0 | 0 | 672 | — |
| `/blog/best-time-to-buy-petrol-australia` | **KEEP** | B | 56 | 1 | 0 | 0 | 1916 | — |
| `/blog/cac-vs-ltv-for-startups` | **410** | E | 24 | 2 | 0c/1i @8.0 | 0 | 1400 | — |
| `/blog/car-running-costs-australia` | **KEEP** | B | 67 | 2 | 0c/1i @65.0 | 0c/5i @3.6 | 2321 | — |
| `/blog/caravan-fuel-consumption-australia` | **KEEP** | B | 71 | 8 | 0c/23i @18.2 | 5c/24i @2.4 | 2543 | — |
| `/blog/diesel-vs-petrol-car-australia` | **KEEP** | B | 56 | 2 | 0 | 0 | 2560 | — |
| `/blog/ev-charging-cost-australia` | **DEMOTE** | D | 44 | 1 | 0c/1i @48.0 | 0 | 2282 | — |
| `/blog/how-to-build-a-marketing-forecast-model` | **410** | E | 18 | 1 | 0 | 0 | 1291 | — |
| `/blog/how-to-calculate-ad-spend-roi` | **410** | E | 13 | 1 | 0 | 0 | 528 | — |
| `/blog/how-to-calculate-break-even-point` | **410** | E | 19 | 1 | 0c/3i @21.7 | 0 | 512 | — |
| `/blog/how-to-calculate-conversion-rate` | **410** | E | 13 | 1 | 0 | 0 | 551 | — |
| `/blog/how-to-calculate-customer-acquisition-cost` | **410** | E | 13 | 1 | 0 | 0 | 555 | — |
| `/blog/how-to-calculate-customer-lifetime-value` | **410** | E | 13 | 1 | 0 | 0 | 477 | — |
| `/blog/how-to-calculate-email-open-rate` | **410** | E | 16 | 1 | 0 | 0 | 891 | — |
| `/blog/how-to-reduce-commute-fuel-costs` | **KEEP** | B | 62 | 1 | 0c/2i @33.0 | 0 | 1666 | — |
| `/blog/how-to-save-money-on-petrol-australia` | **KEEP** | B | 56 | 1 | 0 | 0 | 3417 | — |
| `/blog/hybrid-vs-petrol-australia` | **KEEP** | B | 56 | 1 | 0 | 0 | 2815 | — |
| `/blog/marketing-roi-formula` | **410** | E | 22 | 1 | 0c/1i @9.0 | 0 | 957 | — |
| `/blog/most-fuel-efficient-cars-australia` | **KEEP** | B | 66 | 3 | 0c/43i @56.2 | 0 | 1955 | — |
| `/blog/motorcycle-vs-car-running-costs-australia` | **KEEP** | B | 62 | 2 | 0c/1i @8.0 | 0 | 2361 | — |
| `/blog/petrol-cost-per-km-australia` | **KEEP** | B | 56 | 1 | 0 | 0 | 2407 | — |
| `/blog/roas-vs-profitability` | **410** | E | 16 | 1 | 0 | 0 | 1155 | — |
| `/blog/tax-deductions-australia-2025` | **410** | E | 18 | 1 | 0 | 0 | 2610 | — |
| `/blog/understanding-fuel-economy-mpg-vs-l100km` | **MERGE** | B | 68 | 2 | 1c/93i @53.0 | 0c/58i @5.6 | 1856 | Fuel-economy GSC demand |
| `/blog/what-is-a-good-conversion-rate` | **HOLD-EQUITY** | E | 34 | 1 | 0c/277i @80.7 | 0c/6i @4.5 | 1549 | GSC 277i GA 1 |
| `/blog/what-is-a-good-roas` | **410** | E | 22 | 1 | 0c/2i @51.5 | 0 | 1060 | — |

## Tools

| URL | Final | Group | Score | GA sess (eng) | GSC | Bing | Words | Contradiction |
|-----|-------|-------|------:|--------------:|-----|------|------:|---------------|
| `/tools/marketing-health-check` | **410** | E | 12 | 0 | 0 | 0 | 438 | — |
| `/tools/marketing-score` | **410** | E | 12 | 0 | 0 | 0 | 552 | — |
| `/tools/social-media-character-counter` | **410** | E | 12 | 2 | 0c/2i | 0 | 749 | — |
| `/tools/social-media-post-length-optimizer` | **410** | E | 12 | 2 | 0 | 0 | 598 | — |

---

## Top GSC queries (sitewide — often off-strategy)

- `54 mpg to l 100km` — 1 impr / 1c @ 14
- `what is a good conversion rate` — 163 impr / 0c @ 80
- `website views per month` — 128 impr / 0c @ 82
- `average website visitors per month` — 101 impr / 0c @ 77
- `website traffic per month` — 98 impr / 0c @ 94
- `website visits per month` — 95 impr / 0c @ 91
- `average website visits per month` — 90 impr / 0c @ 72
- `good conversion rate` — 72 impr / 0c @ 85
- `unique visitors per month calculator` — 65 impr / 0c @ 82
- `monthly visitors to website` — 53 impr / 0c @ 95
- `website visitors per month` — 46 impr / 0c @ 95
- `how many monthly visitors to a website` — 34 impr / 0c @ 93
- `monthly web traffic` — 21 impr / 0c @ 95
- `job margin` — 15 impr / 0c @ 97
- `visitors per month website` — 13 impr / 0c @ 97
- `cvc calculator` — 12 impr / 0c @ 78
- `monthly website visitors` — 12 impr / 0c @ 97
- `list growth rate` — 11 impr / 0c @ 71
- `car salary sacrifice calculator` — 9 impr / 0c @ 97
- `grocery store profit margin calculator` — 8 impr / 0c @ 30


Note: GSC query demand is currently dominated by **website traffic** and **conversion rate** commodity queries at deep positions — reinforcing that Google inventory is immature and skewed to pages we strategically want to leave.

---

## Bing keyword → URL mapping notes

Bing page metrics above are **aggregated from KeywordReport via heuristic query→URL mapping**, not Bing’s official Pages report. Treat as directional. Unmapped keywords remain in export for manual review.

Notable mapped demand:
- Boat / marine fuel — strong clicks
- Fuel surcharge — impressions, weak CTR (opportunity on title/intent)
- Drive vs fly — clicks
- Fuel budget — high CTR
- Hybrid vs petrol — high CTR at strong position
- Follower growth — impressions + click (HOLD-EQUITY exit)

---

## MERGE plan (approved direction)

| Canonical | Absorb / mode-merge | Notes |
|-----------|---------------------|-------|
| Fuel Economy & Consumption Calculator | `fuel-economy-savings-calculator` + economy blog content | Preserve GSC economy query equity |
| Trip Fuel Cost (modes) | commute + carpool as modes | Don’t 410 until modes ship |
| Vehicle Running Cost (later) | hybrid + EV feed | Keep URLs while repositioning |

---

## Human approval checklist

- [x] GSC export attached
- [x] Bing export attached
- [x] GA4 landing/events/country attached
- [ ] Confirm **HOLD-EQUITY** list (approve staged noindex→410 vs temporary preserve)
- [ ] Confirm **DEMOTE** list stays indexable
- [ ] Confirm **410** list (49 calculators) for implementation in Phase 8
- [ ] Sign off Phase 3+ (domain engine) start

**Phase 3+ still blocked until HOLD-EQUITY and 410 lists are explicitly approved.**
