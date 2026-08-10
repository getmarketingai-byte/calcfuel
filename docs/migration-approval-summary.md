# Migration Approval Summary (Data-Backed)

**Date:** 2026-08-10  
**Input:** GSC `calcfuel-3`, Bing Keyword + Performance Overview 8/10/2026, GA4 exports Jul 2025–Aug 2026  
**Full matrix:** [url-migration-map.md](url-migration-map.md)

## Verdict

The data **confirms** the strategic portfolio. Transport/trip-cost tools dominate real engagement and Bing intent. GSC remains immature and skewed to off-strategy commodity queries (website traffic, conversion rate) at deep positions.

**Do not delete HOLD-EQUITY URLs in the first migration wave.**

## Approve for Phase 3+ rebuild (Final = REBUILD)

| URL | GA | Bing (mapped) | Why |
|-----|-----|---------------|-----|
| `/calculators/boat-fuel-calculator` | 94 sess | 26c/255i @5.7 | Boat Trip Fuel Planner — GA 94 + Bing marine demand (255 impr / 26 clicks mapped |
| `/calculators/drive-vs-fly-calculator` | 53 sess | 2c/32i @6.4 | GA 53; Bing drive/fly demand |
| `/calculators/ev-vs-gas-calculator` | 5 sess | 0c/3i @19.3 | Reposition; calculation-based claims |
| `/calculators/fuel-budget-planner` | 18 sess | 6c/14i @4.1 | GA 18 / 93s; Bing fuel budget CTR strong @~1.5 |
| `/calculators/fuel-energy` | 2 sess | 0 | Restructure into topical hubs |
| `/calculators/towing-fuel-cost-calculator` | 2 sess | 0 | Towing/caravan flagship |
| `/calculators/trip-fuel-cost-calculator` | 3 sess | 0 | Road-trip decision engine |

## Keep / Merge (ship with rebuild wave)

- **MERGE** `/calculators/carpool-fuel-split-calculator` — GA 9; Bing 0; Mode-merge into Trip Fuel
- **MERGE** `/calculators/commute-fuel-cost-calculator` — GA 4; Bing 0c/16i @2.5; Mode-merge into Trip Fuel
- **MERGE** `/calculators/fuel-economy-savings-calculator` — GA 0; Bing 0; Into Fuel Economy & Consumption; GSC economy queries on related blog
- **KEEP** `/calculators/hybrid-vs-gas-calculator` — GA 31; Bing 2c/24i @4.0; GA 31 / 86s; Bing hybrid vs petrol clicks @1.2
- **KEEP** `/calculators/idling-fuel-waste-calculator` — GA 12; Bing 3c/40i @5.5; GA 12; Bing idling queries
- **KEEP** `/calculators/motorcycle-fuel-cost-calculator` — GA 2; Bing 1c/12i @4.2; Motorcycle vertical; Bing moto fuel queries

## Demote (stay live + indexable; off primary nav)

- `/calculators/emergency-fuel-rationing-calculator` — GA 1; Bing 0
- `/calculators/ev-charging-cost-calculator` — GA 0; Bing 0
- `/calculators/fuel-surcharge-calculator` — GA 70; Bing 0c/58i @7.4
- `/calculators/fuel-tax-credit-calculator` — GA 0; Bing 0
- `/calculators/generator-fuel-calculator` — GA 22; Bing 1c/50i @6.5
- `/calculators/hydrogen-vs-gas-calculator` — GA 27; Bing 4c/33i @4.1
- `/calculators/ifta-fuel-tax-calculator` — GA 1; Bing 0

## HOLD-EQUITY (12 URLs) — staged exit only

These contradict *instant* 410. Recommended pattern: remove from nav/sitemap → `noindex` → monitor 30–60 days → 410 if no rebound.

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

### Priority HOLD cases

1. **`/calculators/website-traffic-calculator`** — 816 GSC impressions @ position ~83, 0 CTR. Classic high-impr/low-CTR. Strategy says retire; data says don’t orphan equity overnight.
2. **`/calculators/social-media-follower-growth-rate-calculator`** — 33 sessions / **161s** engagement + Bing follower queries. Strong product signal on wrong vertical — staged exit, optional one-time “moved” content only if needed (no fake topical 301 to marine).
3. **`/calculators/franking-credits-calculator`** — 24 sessions + Bing franking queries.
4. **`/calculators/mortgage-repayment-calculator`** — 13 sessions (historically successful calc pattern).
5. **`/calculators/salary-sacrifice-calculator`** — GSC click + 44 impressions.

## 410 candidates (49 calculators)

Weak GA + weak GSC + weak Bing + poor strategic fit. Safe for Phase 8 after HOLD list is handled separately.

## What this means commercially

Bing already associates CalcFuel with **boat fuel, fuel surcharge, drive vs fly, fuel budget, hybrid vs petrol**. That is the wedge. GSC’s largest impression pool is **off-strategy** and low-CTR — do not let that pull the product back into a generic calculator directory.

## Ask from you

Reply with:
1. Approve REBUILD/KEEP/MERGE/DEMOTE lists as-is? (Y/N + edits)
2. For each HOLD-EQUITY URL: `staged-exit` | `temporary-preserve-6mo` | `force-410`
3. OK to start **Phase 3** (domain engine) once (1) is Yes?
