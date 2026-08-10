# CalcFuel Current Architecture

**Status:** Phase 1 deliverable  
**Date:** 2026-08-10  
**Site:** https://calcfuel.com  
**Operator:** neutrino.au (`src/lib/site.ts`)

## 1. Stack

| Item | Detail |
|------|--------|
| Framework | Next.js App Router (`src/app`) |
| Next.js | ^16.2.4 |
| React | ^19 |
| Styling | Tailwind CSS v4 |
| Package manager | npm (`package-lock.json`) |
| Language | TypeScript ^5 |
| Hosting | Vercel |
| Analytics | GA4 (`G-2Q8MGZ47BC`), `@vercel/analytics`, `@vercel/speed-insights` |
| Ads | Google AdSense (`ca-pub-7076137753154472`), Funding Choices CMP |
| Other deps | `@upstash/redis` (suggest votes) |
| Scripts | `dev` / `build` / `start` / `lint` only — **no test runner** |

## 2. App Router structure

```text
src/app/
  page.tsx                 # Homepage — marketing-first category grids
  layout.tsx               # Header/Footer, GA, AdSense, CMP, JSON-LD
  sitemap.ts
  about/ contact/
  privacy-policy/ terms-of-service/
  privacy/ terms/          # Redirect sources (also duplicate pages)
  blog/                    # Index + ~26 articles
  calculators/             # Hub + ~75 tools + category hubs
  tools/                   # 4 marketing/social tools
  suggest/                 # Suggest-a-calculator
  api/                     # suggest, subscribe, indexnow, bluesky, mcp, og
```

**Category hubs:** `social-media`, `email-marketing`, `financial`, `conversion`, `seo-tools`, `fuel-energy`, `marketplace-fees`, `ai-developer-tools`  
Listed in `CALCULATOR_HUB_PATHS` ([`src/lib/analytics.ts`](../src/lib/analytics.ts)).

## 3. Calculator architecture

**Pattern:** Duplicated page shell + colocated client component (no shared `CalculatorShell`).

Typical tool:

1. `page.tsx` (server) — metadata, breadcrumbs, FAQs, long SEO prose, `CalculatorJsonLd`, `CalcReviewedBy`, `AdSenseUnit`, `RelatedTools` / `RelatedGuides`
2. `*Calc.tsx` (client) — inputs, inline math, `trackCalculation`

**Shared layout:** [`src/app/calculators/layout.tsx`](../src/app/calculators/layout.tsx) appends `AuthorInfo`.

**Hubs:** tool cards via [`HubToolGrid`](../src/components/HubToolGrid.tsx) + `hub_tool_click`.

**Implication:** High duplication; formula changes require editing many files; no shared domain layer.

## 4. Domain / calculation logic

| Finding | Detail |
|---------|--------|
| Shared fuel math | **None** — formulae live inside each `*Calc.tsx` |
| Shared data | `src/lib/fees/*` (marketplace + `fuelTaxCreditRates`) |
| Units/currency | Per-component toggles; not a global preference system |
| Decision models | Not present |
| Tests | **Zero** automated unit/UI tests |

Target (Phase 3+, blocked): `src/domain/calculations` primitives + decision models (`BoatTrip`, `TowingTrip`, etc.).

## 5. SEO

| Piece | Location / notes |
|-------|------------------|
| `createPageMetadata` | [`src/lib/seo.ts`](../src/lib/seo.ts) — used on a subset of pages |
| Inline Metadata | Most calculators set title/description/canonical manually |
| Sitemap | [`src/app/sitemap.ts`](../src/app/sitemap.ts) — static lists; includes off-topic tools |
| robots.txt | [`public/robots.txt`](../public/robots.txt) |
| ads.txt | [`public/ads.txt`](../public/ads.txt) |
| Root JSON-LD | WebSite + Organization in root layout (marketing-skewed copy) |
| Per-calc JSON-LD | `CalculatorJsonLd` → SoftwareApplication, FAQ, HowTo, Breadcrumb |
| IndexNow | Cron → `/api/indexnow` |
| llms.txt | [`public/llms.txt`](../public/llms.txt) — marketing-first; fuel underrepresented |

## 6. Analytics

[`src/lib/analytics.ts`](../src/lib/analytics.ts):

| Event | Status |
|-------|--------|
| `calculation_performed` (`trackCalculation`) | Used by most fuel/marketing calcs |
| `calculator_view` | **Defined, unused** |
| `hub_tool_click` | Used by HubToolGrid |
| `product_cta_click`, `quiz_complete`, `trackEvent` | Sparse use |

Gaps vs plan: no `calculator_start`, `result_view`, scenario/commercial funnel events; Key Event must be set in GA4 UI.

## 7. Navigation & positioning

**Header:** Social Media → Marketing → Calculators → Blog → About → Contact  

**Footer:** Social / Marketing / Cost & Fuel / Company — tagline still marketing-oriented  

**Homepage:** Category grids lead with social/marketing; fuel is one of several blocks  

Mismatch with brand name and locked thesis (transport/trip-cost decisions).

## 8. Shared components (calculator-related)

| Component | Role |
|-----------|------|
| `CalculatorJsonLd` | Schema |
| `CalcReviewedBy` | “Reviewed by neutrino.au” |
| `RelatedTools` / `RelatedGuides` | Cross-links (not always intent-based) |
| `AdSenseUnit` | Ad slots |
| `HubToolGrid` | Hub cards + analytics |
| `YMYLDisclaimer` | Sparse tax/finance use |
| `AuthorInfo` / `AuthorBio` | E-E-A-T |
| `BlogArticleLayout` | Blog chrome |
| `LegalPageLayout` | Trust pages |
| `GoogleCmp` | Funding Choices CMP |

Missing vs plan: `CalculatorShell`, `UnitToggle` (shared), `ResultCard`, `ScenarioComparison`, `Methodology`, `Sources`, `CommercialPlacement`, editorial routes.

## 9. Content

| Type | Count (approx.) |
|------|----------------:|
| Calculator pages (incl. hubs/aliases) | 83 |
| Fuel-energy hub tools | 19 |
| Blog posts | 26 |
| Tools | 4 |
| Transport-adjacent blogs | ~12 |

Strongest behavioural landings (GA4 snapshot): Boat Fuel, Fuel Surcharge, Drive vs Fly, Hybrid vs Gas, Fuel Budget.

## 10. Legal / trust

| Route | Notes |
|-------|--------|
| `/privacy-policy` | Canonical; AdSense + GA + CMP language |
| `/terms-of-service` | Canonical |
| `/about` | Editorial standards section exists; positioning outdated |
| `/contact` | Present |
| `/privacy`, `/terms` | 301 to canonicals |
| `/editorial-policy`, `/methodology`, `/corrections` | **Missing** |

## 11. Redirects (`next.config.ts`)

- `/privacy` → `/privacy-policy`
- `/terms` → `/terms-of-service`
- `/ph` → `/`
- `/calculators/work-from-home-tax-deduction-calculator` → `work-from-home-tax-calculator`
- `/calculators/hecs-help-calculator` → `hecs-help-repayment-calculator`

Soft: `income-tax-calculator` page redirects to `australian-income-tax-calculator`.

## 12. Commercial / ads

- Global AdSense script + account meta in root layout
- Per-page `AdSenseUnit` typically **below** calculator (good)
- No affiliate system; no `CommercialPlacement` abstraction yet
- Monetisation hierarchy (plan): high-intent → affiliate → sponsorship → premium → AdSense last

## 13. Known gaps (for Phase 3+)

1. No shared calculation kernel / decision models / tests  
2. Marketing-first chrome vs transport thesis  
3. Topical sprawl (~75 tools) vs 5–10 decision engines  
4. Incomplete analytics funnel  
5. Missing editorial/methodology/corrections routes  
6. Sitemap includes low-strategic-fit inventory  
7. Generic reviewer attribution  
8. README still create-next-app stub; docs now live under `docs/`

## 14. Fuel vertical inventory (rebuild base)

Present under `/calculators/fuel-energy` and related:

boat · trip · towing · motorcycle · drive-vs-fly · fuel-budget · hybrid · ev-vs-gas · fuel-economy · carpool · commute · idling · fuel-surcharge · generator · hydrogen · ifta · emergency · ev-charging · fuel-tax-credit

These are the primary assets for the locked portfolio (A–D), not greenfield invention.

---

**Next:** Human review of [`url-migration-map.md`](url-migration-map.md) + [`adsense-readiness-audit.md`](adsense-readiness-audit.md). Phase 3+ blocked.
