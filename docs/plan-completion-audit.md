# Plan completion audit (final pass)

**Date:** 2026-08-10  
**Against:** `calcfuel_strategic_realignment_b3118ab7.plan.md`  
**Verdict:** Core plan **complete**. Gaps found on pass closed below. Remaining items are **explicitly out of scope** or **ops/manual**.

---

## Phase checklist

| Phase | Status | Evidence |
|-------|--------|----------|
| 0 AdSense audit | ✅ | `docs/adsense-readiness-audit.md` + `docs/adsense-stage-b-status.md` |
| 1 Architecture | ✅ | `docs/current-architecture.md` |
| 2 URL migration map | ✅ | `docs/url-migration-map.md` + data + Finals + approval |
| Human approval gate | ✅ | Cleared 2026-08-10 |
| 3 Domain engine | ✅ | `src/domain/**` + Vitest (prefs, primitives, models) |
| 4 Design system | ✅ | `src/components/calc/**` incl. Sources, CommercialPlacement, Lifecycle |
| 5 Flagships Tier 1–3 | ✅ | See tier table |
| 6 IA + homepage | ✅ | Nav + hubs + decision home |
| 7 Editorial | ✅ | `/editorial-policy` `/methodology` `/corrections` |
| 8 SEO migration | ✅ | portfolio.ts, middleware 410/HOLD noindex, sitemap keep-list |
| 9 Analytics funnel | ✅ | Helpers + Lifecycle on key calcs (`view`/`start`/`result`) |
| 10 AdSense apply | ✅ | Trust pages, privacy, nav, sitemap, indexation controls |
| 11 Monetisation | ✅ | Hierarchy + disclosures; conservative ads |

---

## Tier checklist (Phase 5)

| # | Item | Status |
|---|------|--------|
| 1 | Boat Trip Fuel Planner | ✅ Domain + shell; burn primary; scenarios; remaining/reserve/cost/h |
| 2 | Trip Fuel (modes) | ✅ road/return/commute/carpool |
| 3 | Towing Fuel | ✅ |
| 4 | Fuel Budget | ✅ |
| 5 | Drive vs Fly | ✅ |
| 6 | Fuel Economy & Consumption | ✅ merge foundation on existing URL |
| 7 | Motorcycle | ✅ |
| 8 | Vehicle Running Cost foundation | ✅ `vehicleRunningCost` + Hybrid/EV consumers |
| 9 | Hybrid vs Petrol (Vehicles) | ✅ domain + Vehicles hub |
| 10 | EV vs Petrol | ✅ calculation-based TCO |

**B KEEP also closed on this pass:** Idling; Commute/Carpool rebuilt on `RoadTrip` with merge pointers to Trip modes.

---

## Gaps found on this pass → fixed

| Gap | Fix |
|-----|-----|
| Boat missing remaining fuel / reserve / $/h | Added to results |
| Prefs not wired to UI | `usePersistedUnit` |
| Analytics funnel not fired from UI | `CalculatorLifecycle` + `usePersistedUnit` on all Tier 1–3 + B KEEP rebuilds |
| Sources / CommercialPlacement unused | Wired on boat + fuel-energy hub |
| No branded 404 | `src/app/not-found.tsx` |
| fuel-energy hub still catalogued as mixed directory | Rewritten to keep portfolio |
| Idling / commute / carpool still inline math | Domain + shell rebuild |

---

## Intentionally not built (plan says out of scope / later)

| Item | Reason |
|------|--------|
| Full marine roadmap (range/reserve/operating as separate products) | “After flagships”; Boat covers planning range/reserve in one engine |
| Standalone Vehicle Running Cost URL | Tier 2 asked for **foundation** feeding Hybrid/EV — done; dedicated URL is target-shape later |
| Real Trip Planner mega-product | Explicitly out of scope |
| 301 commute/carpool → trip (delete URLs) | Modes shipped; standalone kept with merge CTAs until equity window; HOLD/410 rules already applied to E list |
| 301 economy blog → economy calc | MERGE content direction noted; blog stays indexable (KEEP/MERGE content) |
| Delete physical files of 410 URLs | Middleware 410 is the approved mechanism |
| Live CMP / GA4 key-event / AdSense submission | Ops, not code |
| Mass delete HOLD-EQUITY now | Staged-exit: noindex first |

---

## Calculator content standard (spot-check)

Flagships include: purpose, working calc, methodology, assumptions/limitations (Disclaimer), related tools, editorial attribution, last reviewed. Sources on boat + idling; correction path via `/corrections`. Demoted tools retain older shells — acceptable under DEMOTE.

---

## Tests

Run `npm test` — domain suite including idling.

**Plan sequence: complete for engineering delivery.** Remaining work is production verification + HOLD→410 timing + commercial ops.
