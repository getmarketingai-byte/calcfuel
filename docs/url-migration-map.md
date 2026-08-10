# CalcFuel URL Migration Map

**Status:** PROVISIONAL — awaiting Human Approval Gate  
**Generated:** 2026-08-10  
**Rule:** Strategic portfolio A–E is a *target disposition*, not permission to delete. No irreversible 410 / major redirect / large-scale noindex until cross-checked with GSC + Bing + GA4 + backlinks.

## Thesis (locked)

> CalcFuel helps people make better real-world transport and trip-cost decisions by calculating fuel, range, time and operating costs.

## How to read this document

| Column | Meaning |
|--------|---------|
| Group | A Flagship · B Keep · C Merge · D Demote · E Retire |
| Proposed | KEEP / REBUILD / MERGE / 301 / NOINDEX / 410 / DEMOTE |
| Score | Provisional Strategic Score /100 (Search opportunity 20 + Existing perf 15 + Fit 25 + Commercial 20 + Quality 10 + Expansion 10 − Maintenance 5). **Re-score after GSC/Bing import.** |
| Utility | Answers to Page Utility Test #1–#6 as Y/N/? |
| Final | **Blank** until human approval |

### Search metrics note

- Sitewide GSC (snapshot): **1,407 impressions / 1 click** — immature; do not use as sole 410 authority.
- Sitewide Bing (snapshot): **5,439 impressions / 89 clicks**; marine/transport queries often positions 1–8.
- Per-URL GSC/Bing cells are `PENDING_EXPORT` until full Search Console / Bing Webmaster exports are attached.
- Known GA4 landing sessions seeded where available from the evidence snapshot.

### Interpretation rules

- High impressions + low CTR → opportunity, not auto-retire
- Low clicks + strong position → optimisation candidate
- Low traffic + strong strategic fit → rebuild candidate
- High traffic + poor strategic fit → migration/repurposing; evidence required
- No traffic + no impressions + poor fit → strong retirement candidate

---

## Evidence snapshot (sitewide)

| Source | Signal |
|--------|--------|
| GA4 | ~1,122 sessions / 932 users; 332 organic; ~63% organic engagement; 1,554 calculation_performed / 155 users |
| Geo | US 534 · AU 40 · CA 39 · UK 32 |
| Top landings | Boat 94/59s · Surcharge 70/60s · Drive vs Fly 53/47s · Hybrid 31/**86s** · Hydrogen 27 · Generator 22 · Budget 18/**93s** |
| GSC | 1,407 impr / 1 click |
| Bing | 5,439 impr / 89 clicks |

---

## Summary counts (calculators + hubs)


- Calculator/hub routes inventoried: **83**
- By group: {'E': 63, 'A': 5, 'B': 9, 'D': 6}
- By proposed disposition: {'410': 61, 'REBUILD': 7, 'MERGE': 3, 'DEMOTE': 7, '301': 2, 'KEEP': 3}
- Blog posts: **26**
- Tools: **4**
- Contradiction flags (all types): **23**


---

## Explicit contradiction list (data vs strategy)

URLs where available behavioural/content signals argue against blind retirement or require commercial review:


- `/calculators/australian-income-tax-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/compound-interest-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/franking-credits-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/fuel-surcharge-calculator` — proposed **DEMOTE** — FLAG: B-KEEP/DEMOTE with 70 sessions — commercial review required
- `/calculators/hecs-help-repayment-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/hydrogen-vs-gas-calculator` — proposed **DEMOTE** — FLAG: DEMOTE but 27 GA sessions — confirm Bing/GSC before 410
- `/calculators/mortgage-repayment-calculator` — proposed **410** — FLAG: Prior successful calc volume historically — equity check before 410
- `/calculators/negative-gearing-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/salary-sacrifice-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/stamp-duty-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/superannuation-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/tax-refund-estimator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/calculators/work-from-home-tax-calculator` — proposed **410** — FLAG: RETIRE candidate with substantial on-page content — equity check required
- `/blog/cac-vs-ltv-for-startups` — proposed **410** — FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks
- `/blog/how-to-build-a-marketing-forecast-model` — proposed **410** — FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks
- `/blog/roas-vs-profitability` — proposed **410** — FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks
- `/blog/tax-deductions-australia-2025` — proposed **410** — FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks
- `/blog/what-is-a-good-conversion-rate` — proposed **410** — FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks
- `/blog/what-is-a-good-roas` — proposed **410** — FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks
- `/tools/marketing-health-check` — proposed **410** — FLAG: equity check before 410
- `/tools/marketing-score` — proposed **410** — FLAG: equity check before 410
- `/tools/social-media-character-counter` — proposed **410** — FLAG: equity check before 410
- `/tools/social-media-post-length-optimizer` — proposed **410** — FLAG: equity check before 410


---

## A — Flagship / REBUILD


| URL | Title | Words | Group | Proposed | Score | GA sessions | GSC | Bing | Utility | SEO | Contradiction | Final |
|-----|-------|------:|-------|----------|------:|------------:|-----|------|---------|-----|---------------|-------|
| `/calculators/boat-fuel-calculator` | Boat Fuel Calculator — Marine Fuel Cost Estimator  | 1545 | A | **REBUILD** | 89 | 94 | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/calculators/drive-vs-fly-calculator` | Drive vs Fly Calculator — Compare Travel Costs / C | 1581 | A | **REBUILD** | 89 | 53 | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/calculators/fuel-budget-planner` | Fuel Budget Planner — Plan Your Monthly Fuel Spend | 1653 | A | **REBUILD** | 81 | 18 | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/calculators/towing-fuel-cost-calculator` | Towing Fuel Cost Calculator — Caravan & Trailer Fu | 1948 | A | **REBUILD** | 84 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/calculators/trip-fuel-cost-calculator` | Fuel Cost Calculator — Calculate Trip Fuel Costs A | 1384 | A | **REBUILD** | 84 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |


### Boat Trip Fuel Planner (target product for boat-fuel-calculator)

**Inputs:** distance, speed, fuel burn (primary), tank, price, reserve, return trip; HP burn as labelled estimate only.  
**Outputs:** fuel required, cost, time, range, remaining fuel, reserve margin, cost/hour, cost/distance.  
**Scenarios:** e.g. 15 vs 20 knots. Planning-estimate language only (not "safe cruising range").

---

## B — KEEP / IMPROVE (and MERGE candidates living in B)


| URL | Title | Words | Group | Proposed | Score | GA sessions | GSC | Bing | Utility | SEO | Contradiction | Final |
|-----|-------|------:|-------|----------|------:|------------:|-----|------|---------|-----|---------------|-------|
| `/calculators/carpool-fuel-split-calculator` | Carpool Fuel Cost Calculator — Split Costs Fairly  | 1978 | B | **MERGE** | 63 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/commute-fuel-cost-calculator` | Commute Fuel Cost Calculator — Daily & Monthly Cos | 1317 | B | **MERGE** | 63 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/ev-vs-gas-calculator` | EV vs Petrol Cost Calculator Australia — Electric  | 1436 | B | **REBUILD** | 65 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/fuel-economy-savings-calculator` | Fuel Economy Calculator — L/100km & Fuel Savings / | 1434 | B | **MERGE** | 63 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/fuel-energy` | Fuel & Energy Calculators — Gas, EV, Hybrid, Fleet | 1220 | B | **REBUILD** | 65 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/fuel-surcharge-calculator` | Fuel Surcharge Calculator — Calculate Delivery Sur | 1990 | B | **DEMOTE** | 79 | 70 | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | FLAG: B-KEEP/DEMOTE with 70 sessions — commercial review required |  |
| `/calculators/hybrid-vs-gas-calculator` | Hybrid vs Petrol Calculator — Compare Running Cost | 1781 | B | **KEEP** | 73 | 31 | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/idling-fuel-waste-calculator` | Idling Fuel Waste Calculator — Cut Idle Fuel Costs | 1884 | B | **KEEP** | 65 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |
| `/calculators/motorcycle-fuel-cost-calculator` | Motorcycle Fuel Cost Calculator — Trip & Commute C | 1870 | B | **KEEP** | 65 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | — |  |


### MERGE notes (first-class disposition)

| Cluster | Canonical direction | Candidates |
|---------|---------------------|------------|
| Fuel economy | **Fuel Economy & Consumption Calculator** (MPG ↔ L/100km ↔ km/L + cost/distance + savings) | `fuel-economy-savings-calculator` (+ any near-duplicate economy intents) |
| Trip/road modes | **Trip Fuel Cost** with modes Road / Commute / Carpool / Return | `commute-fuel-cost-calculator`, `carpool-fuel-split-calculator` → evaluate MERGE into trip modes |
| Vehicle comparison | Future **Vehicle Running Cost** decision model | `hybrid-vs-gas-calculator`, `ev-vs-gas-calculator` feed in; keep URLs while repositioning |

Prefer one excellent page over multiple near-duplicates. Do not create keyword-swapped clones.

---

## D — KEEP BUT DEMOTE


| URL | Title | Words | Group | Proposed | Score | GA sessions | GSC | Bing | Utility | SEO | Contradiction | Final |
|-----|-------|------:|-------|----------|------:|------------:|-----|------|---------|-----|---------------|-------|
| `/calculators/emergency-fuel-rationing-calculator` | Emergency Fuel Rationing Calculator — Plan Fuel Su | 1500 | D | **DEMOTE** | 43 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/?/Y/?/?/? | index | — |  |
| `/calculators/ev-charging-cost-calculator` | EV Charging Cost Calculator Australia — Home & Pub | 2024 | D | **DEMOTE** | 43 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/?/Y/?/?/? | index | — |  |
| `/calculators/fuel-surcharge-calculator` | Fuel Surcharge Calculator — Calculate Delivery Sur | 1990 | B | **DEMOTE** | 79 | 70 | PENDING_EXPORT | PENDING_EXPORT | Y/Y/?/Y/Y/Y | index | FLAG: B-KEEP/DEMOTE with 70 sessions — commercial review required |  |
| `/calculators/fuel-tax-credit-calculator` | Fuel Tax Credit Calculator Australia — ATO FTC Est | 1602 | D | **DEMOTE** | 43 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/?/Y/?/?/? | index | — |  |
| `/calculators/generator-fuel-calculator` | Generator Fuel Calculator — Estimate Running Costs | 1386 | D | **DEMOTE** | 53 | 22 | PENDING_EXPORT | PENDING_EXPORT | Y/?/Y/?/?/? | index | — |  |
| `/calculators/hydrogen-vs-gas-calculator` | Hydrogen vs Petrol Calculator — Compare Fuel Costs | 1398 | D | **DEMOTE** | 53 | 27 | PENDING_EXPORT | PENDING_EXPORT | Y/?/Y/?/?/? | index | FLAG: DEMOTE but 27 GA sessions — confirm Bing/GSC before 410 |  |
| `/calculators/ifta-fuel-tax-calculator` | IFTA Fuel Tax Calculator — Interstate Tax Filing / | 1485 | D | **DEMOTE** | 43 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/?/Y/?/?/? | index | — |  |


---

## E — RETIRE candidates (subject to equity cross-check)

**Do not 410 automatically.** Import GSC/Bing; if impressions/position/backlinks are meaningful → human review (preserve temporarily or MERGE/301 to genuine replacement only — never fake topical 301s).


| URL | Title | Words | Group | Proposed | Score | GA sessions | GSC | Bing | Utility | SEO | Contradiction | Final |
|-----|-------|------:|-------|----------|------:|------------:|-----|------|---------|-----|---------------|-------|
| `/calculators/ad-spend-calculator` | Ad Spend Calculator — Budget, Clicks & Revenue Pro | 1827 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/age-calculator` | Age Calculator — Exact Age in Years, Months & Days | 1101 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/ai-developer-tools` | AI Developer Tools & Calculators | 434 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/ai-model-router-savings-calculator` | AI Model Router Savings Calculator — Reduce LLM AP | 2054 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/amazon-fba-fee-calculator` | Amazon FBA Fee Calculator — Referral, Fulfillment  | 1712 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/australian-income-tax-calculator` | Australian Income Tax Calculator 2025–26 / calcfue | 1643 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/average-order-value-calculator` | Average Order Value Calculator — Calculate AOV & B | 1468 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/bmi-calculator` | BMI Calculator Australia — Body Mass Index for Adu | 1255 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/break-even-calculator` | Break-Even Calculator Australia — Units & Revenue  | 1393 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/capital-gains-tax-calculator` | Capital Gains Tax Calculator Australia 2025–26 / C | 1432 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/churn-rate-calculator` | Churn Rate Calculator — Customer Retention & MRR I | 1603 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/click-through-rate-calculator` | Click-Through Rate Calculator — Email & Ad CTR Ben | 986 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/compound-interest-calculator` | Compound Interest Calculator Australia — Savings & | 2036 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/conversion` | Conversion & Lead Calculators — CAC, CLV, CPA & Mo | 833 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/conversion-rate-calculator` | Conversion Rate Calculator — Calculate & Benchmark | 923 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/cost-per-acquisition-calculator` | Cost Per Acquisition Calculator (CPA) — Ad Spend E | 1122 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/cost-per-lead-calculator` | Cost Per Lead Calculator (CPL) — Benchmark Lead Ge | 938 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/cpm-calculator` | CPM Calculator — Cost Per Thousand Impressions / C | 1359 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/customer-acquisition-cost-calculator` | Customer Acquisition Cost Calculator (CAC) — Lower | 980 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/customer-lifetime-value-calculator` | Customer Lifetime Value Calculator (CLV/LTV) Austr | 974 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/ebay-fee-calculator` | eBay Fee Calculator — Final Value & Take-Home Prof | 1565 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/email-list-growth-rate-calculator` | Email List Growth Rate Calculator — Track Subscrib | 1014 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/email-marketing` | Email Marketing Calculators — Open Rate, List Grow | 718 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/email-open-rate-calculator` | Email Open Rate Calculator — Benchmark Your Email  | 1786 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/etsy-fee-calculator` | Etsy Fee Calculator — Listing, Transaction & Proce | 1597 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/financial` | Free Australian Financial Calculators 2025–26 — Ta | 1382 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/franking-credits-calculator` | Franking Credits Calculator Australia 2025–26 / Ca | 2185 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/freelance-rate-calculator` | Freelance Rate Calculator Australia — Hourly & Dai | 1570 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/gst-calculator` | GST Calculator Australia 2025 — Add or Remove 10%  | 1490 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/hecs-help-calculator` | HECS-HELP Repayment Calculator 2025–26 / CalcFuel | 1634 | E | **301** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | redirect | — |  |
| `/calculators/hecs-help-repayment-calculator` | HECS-HELP Repayment Calculator — Schedule & Payoff | 1745 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/income-tax-calculator` | Income Tax Calculator Australia 2025–26 / CalcFuel | 69 | E | **301** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | redirect | — |  |
| `/calculators/influencer-rate-calculator` | Influencer Rate Calculator — Sponsored Post Pricin | 1554 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/loan-repayment-calculator` | Loan Repayment Calculator — Monthly Payments & Tot | 1220 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/marketing-budget-calculator` | Marketing Budget Calculator — Plan Your Marketing  | 1014 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/marketing-roi-calculator` | Marketing ROI Calculator — Measure Campaign Return | 1681 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/marketplace-fees` | Marketplace Fee Calculators — Etsy, Amazon FBA, eB | 506 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/markup-vs-margin-calculator` | Markup vs Margin Calculator — Convert & Price From | 1265 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/mortgage-repayment-calculator` | Mortgage Repayment Calculator Australia — Monthly, | 2043 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: Prior successful calc volume historically — equity check before 410 |  |
| `/calculators/multimodal-payload-estimator` | Multimodal Payload Estimator — Image & Video Token | 1289 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/negative-gearing-calculator` | Negative Gearing Calculator Australia 2025–26 / Ca | 1999 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/net-promoter-score-calculator` | NPS Calculator — Net Promoter Score Calculator / C | 1569 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/paypal-fee-calculator` | PayPal Fee Calculator — Commercial Fees & Net Payo | 1322 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/percentage-calculator` | Percentage Calculator — Fast, Free & Accurate / Ca | 1144 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/profit-margin-calculator` | Profit Margin Calculator Australia — Gross & Net M | 1519 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/prompt-caching-discount-estimator` | Prompt Caching Savings Calculator — Save Up to 90% | 1841 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/rag-storage-cost-calculator` | RAG Storage Cost Calculator — Vector DB & Embeddin | 2477 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/revenue-per-lead-calculator` | Revenue Per Lead Calculator — Maximise Lead Value  | 1431 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/roas-calculator` | ROAS Calculator — Return on Ad Spend Calculator /  | 1740 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/salary-sacrifice-calculator` | Salary Sacrifice Calculator Australia 2025–26 / Ca | 2122 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/seo-tools` | SEO Tools & Calculators — Website Traffic, Speed I | 821 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/social-media` | Social Media Calculators — Engagement Rate, Follow | 891 | E | **410** | 11 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/social-media-engagement-rate-calculator` | Social Media Engagement Rate Calculator — Benchmar | 961 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/social-media-follower-growth-rate-calculator` | Follower Growth Rate Calculator — Track Social Med | 1542 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/social-media-roi-calculator` | Social Media ROI Calculator — Measure Social Campa | 1929 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/stamp-duty-calculator` | Stamp Duty Calculator Australia 2025 — All States  | 1964 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/stripe-fee-calculator` | Stripe Fee Calculator — Processing Fees & Net Payo | 1298 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/superannuation-calculator` | Superannuation Calculator Australia 2025–26 / Calc | 1655 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/tax-refund-estimator` | Tax Refund Estimator Australia 2025–26 / CalcFuel | 1903 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |
| `/calculators/tip-calculator` | Tip Calculator — Split Bills & Calculate Tips Inst | 1119 | E | **410** | 13 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/website-speed-impact-calculator` | Website Speed Impact Calculator — Page Speed & Rev | 1671 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/website-traffic-calculator` | Website Traffic Calculator — Estimate Monthly Visi | 1754 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | — |  |
| `/calculators/work-from-home-tax-calculator` | Work From Home Tax Deduction Calculator 2025–26 /  | 2012 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: RETIRE candidate with substantial on-page content — equity check required |  |


---

## Blog / Guides inventory

Transport-adjacent posts: provisional KEEP (rehome under Guides later; preserve `/blog/...` canonical initially). Marketing/tax posts: RETIRE candidates pending equity check.


| URL | Title | Words | Group | Proposed | Score | GA sessions | GSC | Bing | Utility | SEO | Contradiction | Final |
|-----|-------|------:|-------|----------|------:|------------:|-----|------|---------|-----|---------------|-------|
| `/blog/beginners-guide-to-marketing-roi` | A Beginner | 672 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/best-time-to-buy-petrol-australia` | Best Time to Buy Petrol in Australia (2025 Price C | 1916 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/cac-vs-ltv-for-startups` | CAC vs LTV for Startups: The Ratio That Predicts S | 1400 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks |  |
| `/blog/car-running-costs-australia` | How Much Does It Cost to Run a Car in Australia? ( | 2321 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/caravan-fuel-consumption-australia` | Caravan Fuel Consumption Australia: How Much Fuel  | 2543 | B | **KEEP** | 82 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/diesel-vs-petrol-car-australia` | Diesel vs Petrol Car Australia 2025 — Which Should | 2560 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/ev-charging-cost-australia` | EV Charging Cost Australia 2026: How Much Does It  | 2282 | D | **DEMOTE** | 55 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | index | — |  |
| `/blog/how-to-build-a-marketing-forecast-model` | How to Build a Marketing Forecast Model in 60 Minu | 1291 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks |  |
| `/blog/how-to-calculate-ad-spend-roi` | How to Calculate Ad Spend ROI: A Complete Guide | 528 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/how-to-calculate-break-even-point` | How to Calculate Break-Even Point for Your Busines | 512 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/how-to-calculate-conversion-rate` | How to Calculate Conversion Rate (+ Industry Bench | 551 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/how-to-calculate-customer-acquisition-cost` | How to Calculate Customer Acquisition Cost (CAC) | 555 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/how-to-calculate-customer-lifetime-value` | How to Calculate Customer Lifetime Value (CLV) | 477 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/how-to-calculate-email-open-rate` | How to Calculate Email Open Rate (+ Free Calculato | 891 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/how-to-reduce-commute-fuel-costs` | How to Reduce Your Commute Fuel Costs: 7 Proven Ti | 1666 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/how-to-save-money-on-petrol-australia` | How to Save Money on Petrol in Australia (2025 Gui | 3417 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/hybrid-vs-petrol-australia` | Hybrid vs Petrol Australia 2025 — Is It Worth the  | 2815 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/marketing-roi-formula` | Marketing ROI Formula: How to Measure Your Marketi | 957 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | — |  |
| `/blog/most-fuel-efficient-cars-australia` | Most Fuel Efficient Cars in Australia 2025 (Cheape | 1955 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/motorcycle-vs-car-running-costs-australia` | Motorcycle vs Car Running Costs Australia: Is a Mo | 2361 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/petrol-cost-per-km-australia` | Petrol Cost Per Km Australia 2025 — Calculator & C | 2407 | B | **KEEP** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/roas-vs-profitability` | ROAS vs Profitability: When Good Campaigns Still L | 1155 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks |  |
| `/blog/tax-deductions-australia-2025` | What Can I Claim on Tax in Australia 2025–26? (Com | 2610 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks |  |
| `/blog/understanding-fuel-economy-mpg-vs-l100km` | Understanding Fuel Economy: MPG vs L/100km Explain | 1856 | B | **MERGE** | 70 | PENDING | PENDING_EXPORT | PENDING_EXPORT | Y/Y/Y/Y/Y/Y | index | — |  |
| `/blog/what-is-a-good-conversion-rate` | What Is a Good Conversion Rate? Benchmarks by Indu | 1549 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks |  |
| `/blog/what-is-a-good-roas` | What Is a Good ROAS? Calculator + Industry Benchma | 1060 | E | **410** | 15 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/?/?/N/N | 410 | FLAG: RETIRE blog with substantial content — check GSC/Bing/backlinks |  |


---

## Tools inventory


| URL | Title | Words | Group | Proposed | Score | GA sessions | GSC | Bing | Utility | SEO | Contradiction | Final |
|-----|-------|------:|-------|----------|------:|------------:|-----|------|---------|-----|---------------|-------|
| `/tools/marketing-health-check` | Marketing Health Check — 10-Question Marketing Fou | 438 | E | **410** | 12 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: equity check before 410 |  |
| `/tools/marketing-score` | Marketing Health Score — Rate Your Marketing in 2  | 552 | E | **410** | 12 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: equity check before 410 |  |
| `/tools/social-media-character-counter` | Social Media Character Counter — Twitter, LinkedIn | 749 | E | **410** | 12 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: equity check before 410 |  |
| `/tools/social-media-post-length-optimizer` | Social Media Post Length Optimizer — Optimal Post  | 598 | E | **410** | 12 | PENDING | PENDING_EXPORT | PENDING_EXPORT | N/?/Y/?/N/N | 410 | FLAG: equity check before 410 |  |


---

## Static / trust / misc URLs

| URL | Proposed | Group | Reason | Final |
|-----|----------|-------|--------|-------|

| `/` | **REBUILD** | B | Reposition to trip-cost thesis |  |
| `/calculators` | **REBUILD** | B | Rebuild as focused catalog of remaining tools |  |
| `/about` | **REBUILD** | B | Rewrite for transport decision thesis |  |
| `/contact` | **KEEP** | B | Trust page |  |
| `/privacy-policy` | **KEEP** | B | Required for AdSense; expand affiliate/retention/APP |  |
| `/terms-of-service` | **KEEP** | B | Trust page |  |
| `/privacy` | **301** | E | Already redirects to /privacy-policy |  |
| `/terms` | **301** | E | Already redirects to /terms-of-service |  |
| `/suggest` | **DEMOTE** | D | Keep or retire after IA change — not core |  |
| `/blog` | **REBUILD** | B | Become /guides-oriented index |  |


### New IA routes to add (after approval — Phase 6)

`/marine` · `/towing` · `/vehicles` · `/motorcycles` · `/trip-planning` · `/guides` · `/editorial-policy` · `/methodology` · `/corrections`

### Existing redirects (next.config.ts)

| Source | Destination |
|--------|-------------|
| `/privacy` | `/privacy-policy` |
| `/terms` | `/terms-of-service` |
| `/ph` | `/` |
| `/calculators/work-from-home-tax-deduction-calculator` | `/calculators/work-from-home-tax-calculator` |
| `/calculators/hecs-help-calculator` | `/calculators/hecs-help-repayment-calculator` |

---

## Full calculator content inventory (compact)

| URL | Topic/Category | Intent | Words | Methodology unique? | Sources? | Reviewer | Calc events | Strategic fit | Commercial | Expansion | Decision |
|-----|----------------|--------|------:|---------------------|----------|----------|-------------|---------------|------------|-----------|----------|

| `/calculators/ad-spend-calculator` | Retire cluster | trip/fuel or other | 1827 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/age-calculator` | Retire cluster | trip/fuel or other | 1101 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/ai-developer-tools` | Retire cluster | trip/fuel or other | 434 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/ai-model-router-savings-calculator` | Retire cluster | trip/fuel or other | 2054 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/amazon-fba-fee-calculator` | Retire cluster | trip/fuel or other | 1712 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/australian-income-tax-calculator` | Retire cluster | trip/fuel or other | 1643 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/average-order-value-calculator` | Retire cluster | trip/fuel or other | 1468 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/bmi-calculator` | Retire cluster | trip/fuel or other | 1255 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/boat-fuel-calculator` | Transport flagship | trip/fuel or other | 1545 | Y | ? | neutrino.au (generic) | PENDING | A | see score | see score | **REBUILD** |
| `/calculators/break-even-calculator` | Retire cluster | trip/fuel or other | 1393 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/capital-gains-tax-calculator` | Retire cluster | trip/fuel or other | 1432 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/carpool-fuel-split-calculator` | Transport keep | trip/fuel or other | 1978 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **MERGE** |
| `/calculators/churn-rate-calculator` | Retire cluster | trip/fuel or other | 1603 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/click-through-rate-calculator` | Retire cluster | trip/fuel or other | 986 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/commute-fuel-cost-calculator` | Transport keep | trip/fuel or other | 1317 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **MERGE** |
| `/calculators/compound-interest-calculator` | Retire cluster | trip/fuel or other | 2036 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/conversion` | Retire cluster | trip/fuel or other | 833 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/conversion-rate-calculator` | Retire cluster | trip/fuel or other | 923 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/cost-per-acquisition-calculator` | Retire cluster | trip/fuel or other | 1122 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/cost-per-lead-calculator` | Retire cluster | trip/fuel or other | 938 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/cpm-calculator` | Retire cluster | trip/fuel or other | 1359 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/customer-acquisition-cost-calculator` | Retire cluster | trip/fuel or other | 980 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/customer-lifetime-value-calculator` | Retire cluster | trip/fuel or other | 974 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/drive-vs-fly-calculator` | Transport flagship | trip/fuel or other | 1581 | Y | ? | neutrino.au (generic) | PENDING | A | see score | see score | **REBUILD** |
| `/calculators/ebay-fee-calculator` | Retire cluster | trip/fuel or other | 1565 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/email-list-growth-rate-calculator` | Retire cluster | trip/fuel or other | 1014 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/email-marketing` | Retire cluster | trip/fuel or other | 718 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/email-open-rate-calculator` | Retire cluster | trip/fuel or other | 1786 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/emergency-fuel-rationing-calculator` | Transport demote | trip/fuel or other | 1500 | Y | ? | neutrino.au (generic) | PENDING | D | see score | see score | **DEMOTE** |
| `/calculators/etsy-fee-calculator` | Retire cluster | trip/fuel or other | 1597 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/ev-charging-cost-calculator` | Transport demote | trip/fuel or other | 2024 | Y | ? | neutrino.au (generic) | PENDING | D | see score | see score | **DEMOTE** |
| `/calculators/ev-vs-gas-calculator` | Transport keep | trip/fuel or other | 1436 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **REBUILD** |
| `/calculators/financial` | Retire cluster | trip/fuel or other | 1382 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/franking-credits-calculator` | Retire cluster | trip/fuel or other | 2185 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/freelance-rate-calculator` | Retire cluster | trip/fuel or other | 1570 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/fuel-budget-planner` | Transport flagship | trip/fuel or other | 1653 | Y | ? | neutrino.au (generic) | PENDING | A | see score | see score | **REBUILD** |
| `/calculators/fuel-economy-savings-calculator` | Transport keep | trip/fuel or other | 1434 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **MERGE** |
| `/calculators/fuel-energy` | Transport keep | trip/fuel or other | 1220 | Hub | ? | neutrino.au (generic) | PENDING | B | see score | see score | **REBUILD** |
| `/calculators/fuel-surcharge-calculator` | Transport keep | trip/fuel or other | 1990 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **DEMOTE** |
| `/calculators/fuel-tax-credit-calculator` | Transport demote | trip/fuel or other | 1602 | Y | ? | neutrino.au (generic) | PENDING | D | see score | see score | **DEMOTE** |
| `/calculators/generator-fuel-calculator` | Transport demote | trip/fuel or other | 1386 | Y | ? | neutrino.au (generic) | PENDING | D | see score | see score | **DEMOTE** |
| `/calculators/gst-calculator` | Retire cluster | trip/fuel or other | 1490 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/hecs-help-calculator` | Retire cluster | trip/fuel or other | 1634 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **301** |
| `/calculators/hecs-help-repayment-calculator` | Retire cluster | trip/fuel or other | 1745 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/hybrid-vs-gas-calculator` | Transport keep | trip/fuel or other | 1781 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **KEEP** |
| `/calculators/hydrogen-vs-gas-calculator` | Transport demote | trip/fuel or other | 1398 | Y | ? | neutrino.au (generic) | PENDING | D | see score | see score | **DEMOTE** |
| `/calculators/idling-fuel-waste-calculator` | Transport keep | trip/fuel or other | 1884 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **KEEP** |
| `/calculators/ifta-fuel-tax-calculator` | Transport demote | trip/fuel or other | 1485 | Y | ? | neutrino.au (generic) | PENDING | D | see score | see score | **DEMOTE** |
| `/calculators/income-tax-calculator` | Retire cluster | trip/fuel or other | 69 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **301** |
| `/calculators/influencer-rate-calculator` | Retire cluster | trip/fuel or other | 1554 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/loan-repayment-calculator` | Retire cluster | trip/fuel or other | 1220 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/marketing-budget-calculator` | Retire cluster | trip/fuel or other | 1014 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/marketing-roi-calculator` | Retire cluster | trip/fuel or other | 1681 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/marketplace-fees` | Retire cluster | trip/fuel or other | 506 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/markup-vs-margin-calculator` | Retire cluster | trip/fuel or other | 1265 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/mortgage-repayment-calculator` | Retire cluster | trip/fuel or other | 2043 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/motorcycle-fuel-cost-calculator` | Transport keep | trip/fuel or other | 1870 | Y | ? | neutrino.au (generic) | PENDING | B | see score | see score | **KEEP** |
| `/calculators/multimodal-payload-estimator` | Retire cluster | trip/fuel or other | 1289 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/negative-gearing-calculator` | Retire cluster | trip/fuel or other | 1999 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/net-promoter-score-calculator` | Retire cluster | trip/fuel or other | 1569 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/paypal-fee-calculator` | Retire cluster | trip/fuel or other | 1322 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/percentage-calculator` | Retire cluster | trip/fuel or other | 1144 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/profit-margin-calculator` | Retire cluster | trip/fuel or other | 1519 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/prompt-caching-discount-estimator` | Retire cluster | trip/fuel or other | 1841 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/rag-storage-cost-calculator` | Retire cluster | trip/fuel or other | 2477 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/revenue-per-lead-calculator` | Retire cluster | trip/fuel or other | 1431 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/roas-calculator` | Retire cluster | trip/fuel or other | 1740 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/salary-sacrifice-calculator` | Retire cluster | trip/fuel or other | 2122 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/seo-tools` | Retire cluster | trip/fuel or other | 821 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/social-media` | Retire cluster | trip/fuel or other | 891 | Hub | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/social-media-engagement-rate-calculator` | Retire cluster | trip/fuel or other | 961 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/social-media-follower-growth-rate-calculator` | Retire cluster | trip/fuel or other | 1542 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/social-media-roi-calculator` | Retire cluster | trip/fuel or other | 1929 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/stamp-duty-calculator` | Retire cluster | trip/fuel or other | 1964 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/stripe-fee-calculator` | Retire cluster | trip/fuel or other | 1298 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/superannuation-calculator` | Retire cluster | trip/fuel or other | 1655 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/tax-refund-estimator` | Retire cluster | trip/fuel or other | 1903 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/tip-calculator` | Retire cluster | trip/fuel or other | 1119 | ? | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/towing-fuel-cost-calculator` | Transport flagship | trip/fuel or other | 1948 | Y | ? | neutrino.au (generic) | PENDING | A | see score | see score | **REBUILD** |
| `/calculators/trip-fuel-cost-calculator` | Transport flagship | trip/fuel or other | 1384 | Y | ? | neutrino.au (generic) | PENDING | A | see score | see score | **REBUILD** |
| `/calculators/website-speed-impact-calculator` | Retire cluster | trip/fuel or other | 1671 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/website-traffic-calculator` | Retire cluster | trip/fuel or other | 1754 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |
| `/calculators/work-from-home-tax-calculator` | Retire cluster | trip/fuel or other | 2012 | Y | ? | neutrino.au (generic) | PENDING | E | see score | see score | **410** |


---

## Indexation control (proposed)

| SEO status | Meaning |
|------------|---------|
| index | Meets content quality standard; in sitemap |
| noindex | Useful but not search inventory |
| redirect | 301 after MERGE or genuine replacement |
| 410 | No equity + no fit (only after approval) |

Only quality-standard pages enter XML sitemap after migration.

---

## Human approval checklist

- [ ] Attach full GSC export (last 3 months + prior 3 months) per URL
- [ ] Attach Bing Webmaster export per URL
- [ ] Review contradiction flags
- [ ] Run Search Opportunity assessment
- [ ] Fill **Final** column for every URL
- [ ] Approve Phase 3+ only after Final column complete

**STOP — Phase 3+ blocked until this gate clears.**
