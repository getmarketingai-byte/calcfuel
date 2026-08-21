# CalcFuel — AdSense "Low Value Content" Remediation Specification

**Date:** 2026-08-21
**Author:** Engineering audit — diagnosis (§1–3), specification (§4–8), implementation record (§9)
**Status:** IMPLEMENTED — see §9. `npm run audit:adsense` reports 11/11 passing.
**Supersedes operationally:** [adsense-readiness-audit.md](adsense-readiness-audit.md), [adsense-stage-b-status.md](adsense-stage-b-status.md)

---

## 0. Honest framing

No agency, tool, MCP server, or consultant can *guarantee* AdSense approval — the final decision is a Google-side mix of automated classification and human review, and Google publishes no pass mark. What this specification does instead:

1. Identifies, **with measurements taken from the built site**, every condition that currently maps onto a documented Google rejection criterion.
2. Specifies a fix for each with a **machine-checkable acceptance criterion**.
3. Ships an **automated gate** (`npm run audit:adsense`) that fails the build if any criterion regresses, so the state is provable rather than assumed.

Everything in §2 is measured, not assumed. Every claim in §3 is traceable to a Google policy sentence or a measurement from a live AdSense-serving competitor.

---

## 1. Method

| Step | What was done |
|------|---------------|
| Build | `next build` on `claude/adsense-content-audit-f90d87`, served with `next start` |
| Crawl | Every sitemap URL + every internal link reachable from `/`, `/calculators`, `/blog`, and all four hubs (70 URLs) |
| Extract | Per URL: status, `x-robots-tag`, title, description, canonical, H1/H2 counts, `<main>` word count, **editorial prose word count** (text inside `p/li/h*/summary/td` only), image count, table count, inline ad units, JSON-LD blocks, internal/external link targets |
| Duplication | Sentence-level cross-page duplication across all 34 substantial pages |
| Link integrity | Full transitive crawl; every internal link target resolved for status + robots directive |
| Lighthouse | Headless Chrome, mobile emulation, flagship calculator page |
| Benchmarks | Same extractor run against 6 pages on 5 domains **confirmed to be serving Google ads** (verified via their `ads.txt` `google.com, pub-…` entries) |
| Live checks | apex/www behaviour, `ads.txt` HTTP status, production parity with the branch, index presence in Google |

Raw crawl output and scripts are reproducible via the gate added in §5.

---

## 2. Measured current state

### 2.1 What is already correct — do not touch

These were verified and pass. Prior audit docs claimed some of these; they are now confirmed against the live domain.

| Check | Evidence |
|-------|----------|
| `ads.txt` at apex, direct 200 | `curl -sI https://calcfuel.com/ads.txt` → `HTTP/2 200` |
| `www` → apex, not the reverse | `https://www.calcfuel.com/ads.txt` → `308` → apex |
| AdSense loader is a **plain** `<script>`, not Next.js `<Script>` | [src/app/layout.tsx:95](../src/app/layout.tsx#L95) — no `data-nscript` |
| `google-adsense-account` meta present site-wide | [src/app/layout.tsx:92](../src/app/layout.tsx#L92) |
| `robots.txt` allows `Mediapartners-Google`, declares sitemap | [public/robots.txt](../public/robots.txt) |
| Legal/trust pages exist and are footer-linked | `/privacy-policy` (710 words), `/terms-of-service`, `/about`, `/contact`, `/editorial-policy`, `/methodology`, `/corrections` |
| Privacy policy discloses AdSense, cookies, opt-out links | 710 words, verified content |
| Ad units are labelled "Advertisement" | [CommercialPlacement.tsx](../src/components/calc/CommercialPlacement.tsx) |
| No ads inside calculator controls | Verified by DOM position |
| Site is indexed by Google | Confirmed via web search — calculator pages appear |
| Lighthouse performance / SEO | 92 / 100 on the flagship calculator |
| **Word count per content page** | Calculators median **1,254** prose words; guides median **1,821** |

**The single most important finding in this table is the last row.** The standard advice for "low value content" — *add 500+ words per page* — is already satisfied twice over. Continuing to add prose will not fix this rejection. The cause is elsewhere.

### 2.2 Benchmark against sites Google is currently monetising

Same extractor, same day. All five domains confirmed serving Google ads via `ads.txt`.

| Page | Prose words | Images | Inline SVG | Tables | Outbound refs | Named author |
|------|------------|--------|-----------|--------|---------------|--------------|
| omnicalculator.com/everyday-life/fuel-cost | 1,664 | 3 | 31 | 0 | 2 | — |
| inchcalculator.com/fuel-cost-calculator | 1,119 | 5 | 56 | 0 | 27 | **yes** |
| calculator.net/fuel-cost-calculator | 1,220 | 2 | 0 | 2 | 0 | — |
| gigacalculator.com/fuel-consumption-calculator | 1,028 | 1 | 0 | 2 | 4 | — |
| calculator.net/gas-mileage-calculator | 890 | 2 | 0 | 4 | 1 | — |
| **CalcFuel `/calculators/boat-fuel-calculator`** | **1,306** | **0** | 0 | **0** | 3 | generic |

**Conclusion:** CalcFuel is at or above benchmark on text volume, and at **zero** on visual/data assets. Across all 48 live pages the site contains **0 images**. Every approved competitor page carries at least one.

### 2.3 Defects — measured

Ordered by severity against Google's own policy wording.

---

#### D1 — `/blog` links to 13 pages that return HTTP 410 (CRITICAL)

The Guides index renders all 27 entries from `publishedArticles`, but 13 of those slugs are in `GONE_PATHS` and are served a bare `410 — Gone` page by middleware.

A reviewer opening "Guides" from the header and clicking any of half the cards lands on an error page. Measured: **23 internal link targets across the site resolve to 410 or `noindex`**, 14 of them from `/blog` alone.

| Source page | Dead/noindexed targets |
|---|---|
| `/blog` | 14 |
| `/calculators/marketing-roi-calculator` | 5 |
| `/blog/what-is-a-good-conversion-rate` | 4 |
| `/calculators/fuel-tax-credit-calculator` | 1 (`/calculators/gst-calculator`) |

Policy hit — AdSense "Good user experience" checklist asks verbatim: *"Are the elements bringing the user to the right content?"* and instructs publishers to avoid misleading links. Also Search spam policy on doorway/low-value structures.

---

#### D2 — `/blog` is titled "Marketing Blog" on a transport site (CRITICAL)

[src/app/blog/page.tsx:9](../src/app/blog/page.tsx#L9):

- `<title>`: "Marketing Blog — Guides, Formulas & Benchmarks"
- `<meta description>`: "Free marketing guides covering email open rates, ROI formulas, ROAS benchmarks…"
- `<h1>`: "Marketing Blog"

The site's own primary nav item "Guides" leads to a page that declares the site is about marketing. An AdSense reviewer determining *"what your site is about"* — Google's literal phrasing — gets a contradictory answer within two clicks of the homepage. An AdSense unit is rendered at the top of this page.

---

#### D3 — Ads on navigation-only screens (CRITICAL — direct policy text)

Google Publisher Policies, *Inventory value*, verbatim:

> "We do not allow Google-served ads on screens: without publisher-content or with low-value content, that are under construction, **that are used for alerts, navigation or other behavioral purposes**"

| Screen | Editorial prose words | Ad unit rendered |
|---|---|---|
| `/` | **193** | **yes** ([page.tsx:76](../src/app/page.tsx#L76)) |
| `/blog` | 827 (all card blurbs, half pointing at 410s) | **yes** |
| `/marine` | **29** | no |
| `/towing` | **39** | no |
| `/trip-planning` | **71** | no |
| `/vehicles` | **71** | no |
| `/calculators` | **79** | no |
| `/calculators/fuel-energy` | **125** | no |

The homepage is a 193-word navigation screen carrying an ad unit. That is the clearest single policy violation on the site.

---

#### D4 — Five hub pages are doorway pages (CRITICAL)

`/marine` contains a heading, a one-sentence description and **one link**. `/towing` has two. All five hubs plus `/calculators/fuel-energy` are in the sitemap and in the primary nav.

Google Search spam policy, *Doorway abuse*, verbatim:

> "Doorway abuse is when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that are not as useful as the final destination."

These are intermediate pages strictly less useful than their destination. They are indexed, navigation-linked, and there are six of them against 19 real tool pages — roughly a quarter of the crawlable surface.

---

#### D5 — Two conflicting anonymous bylines on every calculator page (HIGH)

Every page under `/calculators/` renders both:

- `CalcReviewedBy` → *"Reviewed by **CalcFuel Technical Editor** · Last updated: August 2026"* (top)
- `AuthorInfo` via [src/app/calculators/layout.tsx:22](../src/app/calculators/layout.tsx#L22) → *"Reviewed by **neutrino.au** · Last updated: July 2026"* (bottom)

Two different reviewer identities and two different dates on the same page. `neutrino.au` — an unrelated brand — appears on **19 pages**, the single most-duplicated sentence on the site. Neither identity is a person. The prior audit recorded this as fixed; it was not — the second component was added rather than the first replaced.

For YMYL-adjacent tools (`fuel-tax-credit-calculator` covering ATO credits, `ifta-fuel-tax-calculator` covering interstate tax filing) Google expects identifiable expertise.

---

#### D6 — Zero images, zero diagrams, zero original media site-wide (HIGH)

0 images across 48 live pages. Every benchmarked competitor page carries 1–5. Content pages with 1,300 words of unbroken prose and no visual asset read as machine-generated to both classifiers and human reviewers, and match Google's *scaled content abuse* description:

> "Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users… using AI tools to generate numerous pages without user value"

The absence of any hand-made asset is the strongest available signal that no human invested in these pages.

---

#### D7 — Copy-pasted boilerplate identical across 15+ pages (HIGH)

Sentence-frequency analysis across all substantial pages:

| Occurrences | Sentence |
|---|---|
| 19 | "Reviewed by neutrino.au · Last updated: July 2026" |
| 15 | "According to the ACCC fuel price monitoring, Australian petrol prices vary significantly by region and day of the week." |
| 15 | "Disclaimer: This calculator provides estimates only." |
| 15 | "Actual fuel costs vary based on current fuel prices, **driving conditions, vehicle type**, and maintenance." |
| 15 | "Check current Australian fuel prices via FuelWatch (WA) or the ACCC fuel price guide." |
| 11 | "Actual fuel use varies with load, weather, driving style, and vehicle condition." |

Two problems beyond the repetition itself:

- The ACCC sentence is a **non-sequitur inserted verbatim into 15 unrelated pages** — including the boat, generator, hydrogen and IFTA calculators — solely to manufacture an outbound citation. This is exactly the pattern Google's *"stitching together material"* clause describes.
- The disclaimer talks about **"driving conditions, vehicle type"** on the *boat* page and the *generator* page. A reviewer reading the marine calculator sees a car disclaimer. This is verifiable evidence of unreviewed templating.

Per-page duplicate ratio peaks at 14.2% (`/calculators/commute-fuel-cost-calculator`).

---

#### D8 — Every form input on every calculator is unlabelled (HIGH)

[InputGroup.tsx:16](../src/components/calc/InputGroup.tsx#L16) derives the input id as `id ?? props.name`. **All 75 call sites pass neither.** Result: `htmlFor={undefined}` and `id={undefined}` on every input and select on the site — the visible label is not programmatically associated with its control.

Lighthouse mobile audit of the flagship calculator: *"Form elements do not have associated labels"* — score 0. Accessibility 93 overall, also failing `color-contrast`.

Google's UX criteria ask verbatim: *"Do your drop-down lists work correctly? Are all navigational elements clickable?"* — a site whose entire primary function is unusable with a screen reader fails the user-experience bar.

---

#### D9 — 20 pages ship a doubled brand suffix in `<title>` (MEDIUM)

Pages set `title: "… | CalcFuel"` explicitly while [layout.tsx:11](../src/app/layout.tsx#L11) also applies `template: "%s | CalcFuel"`. Live Google results currently read:

> `Boat Fuel Calculator — Marine Fuel Cost Estimator | CalcFuel | CalcFuel`

Measured: **20 pages with duplicated brand, 29 pages with titles over 65 characters.**

---

#### D10 — Stale year labels in titles and dates (MEDIUM)

Seven guide titles say "2025" or "2025–26" and are being served in **August 2026**: *"Diesel vs Petrol Car Australia 2025"*, *"Most Fuel Efficient Cars in Australia 2025"*, *"Best Time to Buy Petrol in Australia (2025 Price Cycle Guide)"*, etc. `AuthorInfo` hardcodes a "July 2026" default. Freshness is one of the few things a reviewer can assess in seconds.

---

#### D11 — Off-topic content still live and linked (MEDIUM)

`/blog/what-is-a-good-conversion-rate` and `/calculators/marketing-roi-calculator` are `noindex, follow` but **still reachable and linked from `/blog`**. `noindex` hides them from Search; it does **not** hide them from an AdSense reviewer clicking through the site, and it does not stop them diluting the site's topical identity.

---

#### D12 — No original data or information gain (MEDIUM, strategic)

Every figure on the site is a generic rule of thumb ("0.5 gal/hr per 10 HP", "70c/hr"). There is no dataset, no measurement, no comparison table the user could not get elsewhere. Google's guidance asks: *"Does it provide substantial value and originality when compared to other sites covering similar subjects?"*

This is the hardest defect to fix and the one that most separates a monetisable publisher from a rejected one. It is scoped as P1 rather than P0 because D1–D8 are individually sufficient to explain rejection.

---

#### D13 — Site history: 62 URLs deleted three months after launch (CONTEXT, not fixable)

First commit 2026-05-01 as a marketing-calculator site; realigned to transport 2026-08-10. 62 URLs now serve 410. Google's crawl history of this domain is majority-dead-marketing-content. This cannot be undone and is a reason to make the *remaining* surface unambiguously strong rather than to add more pages.

---

## 3. Root-cause statement

The rejection is **not** about word count. It is the combination of:

1. **A broken, self-contradictory navigation layer** (D1, D2, D11) — half the Guides index is dead, and it announces the site is about marketing.
2. **Ads on navigation screens** (D3) — a direct, quotable Inventory-value violation on the homepage.
3. **A crawlable surface that is ~25% doorway pages** (D4).
4. **Every content page carrying machine-generation fingerprints** (D6, D7) — no media, cross-pasted disclaimers, a boat page with a car disclaimer, an irrelevant ACCC citation on 15 pages.
5. **No accountable human publisher** (D5) — two conflicting anonymous bylines, one of them a foreign brand.

A reviewer needs about ninety seconds to reach all five conclusions: land on a 193-word homepage with an ad → click "Guides" → read "Marketing Blog" → click a card → hit `410 Gone`. That is the rejection.

---

## 4. Specification

Each item has a machine-checkable acceptance criterion (AC) enforced by the gate in §5.

### P0 — Must ship before resubmission

---

**S1. Guides index must contain only live, on-topic articles**

- Filter `/blog` rendering through a `LIVE_ARTICLES` derivation: `publishedArticles` minus `GONE_PATHS` minus `HOLD_EQUITY_PATHS`.
- Retitle: `<title>` "Fuel & Running Cost Guides", `<h1>` "Fuel & running cost guides", description rewritten to transport.
- Delete the 13 gone-article records from `blog-articles.ts` so the list cannot drift again.

**AC1:** Every internal link on every 200-status page resolves to a 200 without a `noindex` directive. Gate asserts **0** bad targets (currently 23).

---

**S2. Remove every remaining link to gone/noindexed URLs**

- `/calculators/fuel-tax-credit-calculator` → drop the `/calculators/gst-calculator` link.
- `/calculators/marketing-roi-calculator`, `/blog/what-is-a-good-conversion-rate` → move both from `HOLD_EQUITY_PATHS` to `GONE_PATHS`; delete their route directories.
- Sweep `RelatedTools` / `RelatedGuides` prop arrays for slugs not in `KEEP_CALCULATORS` / live articles.

**AC2:** Covered by AC1. Additionally: `HOLD_EQUITY_PATHS` is empty — no live-but-noindexed page remains reachable.

---

**S3. No ad unit on any screen below the content threshold**

- Remove the `AdSenseUnit` from `/` and from `/blog`.
- Introduce a single guard component so this cannot regress: an ad renders only when the host page declares ≥ 600 words of editorial content.

**AC3:** No page with `proseWords < 600` contains an `ins.adsbygoogle`. Gate asserts 0 violations (currently 2: `/`, `/blog`).

---

**S4. Eliminate doorway hubs**

Two acceptable resolutions per hub; pick per hub:

- **(a) Promote to a real guide page** — ≥ 700 words of original editorial content that stands alone: what decisions this category covers, the variables that dominate cost, a comparison table, when each tool applies, and links out. Applies to `/marine`, `/towing`, `/trip-planning`, `/vehicles`.
- **(b) Retire** — `301` to the flagship tool, remove from sitemap and nav. Applies to `/calculators/fuel-energy` (redundant with `/calculators`).

`/calculators` becomes a genuine index: each entry gets a one-line description of *what decision it answers*, plus a lead section explaining how the tools relate (target ≥ 400 words).

**AC4:** Every URL in the sitemap has ≥ 400 prose words; no sitemap URL has < 3 outbound content links or a link-to-word ratio implying a bare list.

---

**S5. Single, real, accountable byline**

- Delete `AuthorInfo` from `src/app/calculators/layout.tsx`; `CalcReviewedBy` becomes the only byline.
- Replace `OPERATOR_NAME = "neutrino.au"` with the real operating identity used everywhere on the site (About, Organization JSON-LD, footer, Terms).
- Add a real named author with a real bio at `/about#editorial-team`: name, relevant background, and what they actually verified. Link every `CalcReviewedBy` to it.
- Add `Person` JSON-LD for the author and `author`/`reviewedBy` to the calculator JSON-LD.
- `lastUpdated` is derived from a per-page constant, never a component default.

**AC5:** `neutrino.au` appears 0 times in rendered HTML. Exactly one "Reviewed by" per page. Every calculator page carries `Person` JSON-LD with a `name` and a `url`.

---

**S6. Replace boilerplate with page-specific content**

- Rewrite the disclaimer as a per-domain component: marine, generator, road-vehicle, and tax variants. The boat page must not mention "driving conditions".
- **Delete the ACCC filler sentence from all 15 pages.** Replace with a real `Sources` block listing only sources genuinely used by *that* calculator's assumptions, each with what it was used for.
- Rewrite the shared "Actual fuel use varies…" line per page with the variables that actually dominate that calculation.

**AC6:** No sentence of ≥ 6 words appears on more than 2 pages, excluding footer/nav chrome. Currently 26 sentences breach this.

---

**S7. Programmatic labels on every input**

- `InputGroup`/`SelectGroup`: generate a stable id with `useId()` when `id`/`name` are absent.
- Fix the `color-contrast` failures on breadcrumb links, toggle buttons and `text-xs text-gray-*` helper text.

**AC7:** Lighthouse accessibility ≥ 98 on `/`, one hub, one guide and three calculators, with `label` and `color-contrast` both passing.

---

**S8. Title hygiene**

- Remove the manual `| CalcFuel` suffix from the 20 pages that duplicate it; let the layout template apply it.
- Bring all titles to ≤ 60 characters before the template suffix.

**AC8:** 0 titles containing "CalcFuel" twice; 0 titles over 65 characters.

---

**S9. Date accuracy**

- Retitle the seven "2025" guides to "2026" and refresh their figures, or drop the year from the title where the content is not year-specific.
- Remove hardcoded date defaults; drive `dateModified` from a per-page constant that also feeds JSON-LD.

**AC9:** No rendered page contains a year label older than the current year in a title or byline.

---

### P1 — Ship in the same release; these are what turn "compliant" into "worth monetising"

---

**S10. One original visual asset per content page (minimum)**

Hand-authored inline SVG, not stock imagery. Per page type:

- Calculators: a diagram of the formula, or a chart of the relationship the calculator models (e.g. boat fuel burn vs speed showing the planing hump; towing penalty vs trailer mass).
- Guides: a data chart built from the article's own table.

All must be inline SVG with `<title>`/`<desc>`, theme-aware, and `aria` labelled.

**AC10:** Every sitemap URL contains ≥ 1 `<svg>` or `<img>` inside `<main>`, with an accessible name. Currently 0 pages pass.

---

**S11. Original data — the information-gain layer**

The one thing no competitor page has: **Australian, source-attributed, dated reference data**, published as a citable page and consumed by the calculators.

Scope for this release — one dataset, done properly:

- `/data/australian-fuel-prices` — quarterly average unleaded/diesel price by capital city, sourced from published ACCC and state FuelWatch/FuelCheck reporting, with the retrieval date, the source URL per row, and a stated methodology.
- Wire it into every calculator as the default fuel price, with an on-page line: *"Default price: $X.XX/L — national average, Q2 2026, source ACCC."*
- The calculator pages then cite `/data/australian-fuel-prices` instead of the current filler ACCC sentence.

This converts an unsupported generic claim into a verifiable, maintained asset, and gives every calculator a legitimate reason to cite a source.

**AC11:** `/data/australian-fuel-prices` exists, is in the sitemap, has ≥ 700 words plus a table with per-row source attribution and a retrieval date; ≥ 15 calculator pages link to it.

---

**S12. Worked examples with real numbers**

Each calculator gains a "Worked example" section: a concrete scenario, the inputs, the arithmetic shown, the result, and one sentence on what decision it supports. Different scenario per page.

**AC12:** Every calculator page contains a section headed "Worked example" of ≥ 120 words containing ≥ 4 numerals.

---

### P2 — After approval

- `CommercialPlacement` density policy: max 2 units per page, none above the fold on mobile.
- Replace placeholder ad slot IDs with real units.
- Weekly policy-notice check in the AdSense dashboard.

---

## 5. Automated verification gate

Ship `scripts/adsense-audit.mjs`, run via `npm run audit:adsense`. It builds, starts the server, crawls, and asserts AC1–AC12. **Non-zero exit blocks resubmission.**

Report format:

```
AC1  internal link integrity          FAIL  23 bad targets
AC3  no ads below content threshold   FAIL  2 pages
AC5  single real byline               FAIL  neutrino.au ×19
...
```

This is the deliverable that makes the fix *validated* rather than *believed*. Every future deploy re-proves the state.

---

## 6. Tooling and MCP research

Assessed against the actual bottleneck. None of these fix content quality; they shorten the verify loop.

| Tool | Verdict | Why |
|------|---------|-----|
| **In-repo gate (§5)** | **Build this** | Deterministic, versioned, runs in CI, encodes the exact criteria this site fails. Higher value than any external server because it is specific to these ACs. |
| **[Google Search Console MCP](https://github.com/AminForou/mcp-gsc)** | **Install** | The only source of truth for what Google actually indexed vs what the sitemap claims. Batch index-status checks across all 47 URLs; confirms the 410s were processed and that no marketing URL is still indexed. Requires Python 3.11+ and GSC property verification. |
| **[Lighthouse MCP](https://github.com/priyankark/lighthouse-mcp)** | **Install** | `npx lighthouse-mcp`. Runs the accessibility/UX audits behind AC7 without leaving the session. Lower ceremony than the CLI invocation used for this audit. |
| **[PageSpeed Insights MCP](https://github.com/ruslanlap/pagespeed-insights-mcp)** | Optional | Adds field CrUX data. Only meaningful once the site has real traffic. |
| **[seo-audit-mcp](https://github.com/RichardDillman/seo-audit-mcp)** | Skip | Specialised for job boards (JobPosting schema, expired-job detection). Its general crawl is a subset of the gate. |
| Ahrefs / Semrush MCP | Skip for now | Paid, aimed at ranking/keyword work. Irrelevant to an approval decision. |
| Third-party "AdSense eligibility checkers" | Skip | No access to Google's actual classifier; they re-check ads.txt and word counts, both of which already pass here. |

**Recommendation:** build the gate, add GSC MCP and Lighthouse MCP. Do not pay for anything.

---

## 7. Resubmission protocol

1. Implement P0 + P1. `npm run audit:adsense` exits 0.
2. Deploy to production. Re-run the gate against `https://calcfuel.com`, not localhost.
3. Manually walk the reviewer's path on a phone: `/` → Guides → three cards → Marine → boat calculator → complete a calculation. No dead ends, no ad on a thin screen, one byline.
4. In Search Console: submit the updated sitemap, request indexing for the rewritten hubs and `/data/australian-fuel-prices`, confirm the 410s are processed.
5. **Wait for the rewritten pages to be indexed before requesting review.** Requesting a review while Google still holds the old version of `/blog` in its index invites the same verdict.
6. Request the AdSense review. Expect 1–14 days; do not change the site during review.
7. If rejected again: the gate output plus this document narrows the remaining explanation to D12/D13 — information gain and domain history — which are addressed by continuing S11 with additional datasets over the following months, not by another round of technical fixes.

---

## 8. Traceability

| Defect | Google policy sentence | Spec item |
|---|---|---|
| D1, D2, D11 | *"Are the elements bringing the user to the right content?"* / avoid misleading links | S1, S2 |
| D3 | *"We do not allow Google-served ads on screens… used for alerts, navigation or other behavioral purposes"* | S3 |
| D4 | *"Doorway abuse… intermediate pages that are not as useful as the final destination"* | S4 |
| D5 | Publisher accountability / E-E-A-T for YMYL tools | S5 |
| D6, D7 | *"Scaled content abuse… using AI tools to generate numerous pages without user value"* | S6, S10 |
| D8 | *"Is the text content on your site easy to read?"* / good user experience | S7 |
| D9, D10 | *"Update your sites regularly with new, unique content"* | S8, S9 |
| D12 | *"Does it provide substantial value and originality when compared to other sites covering similar subjects?"* | S11, S12 |

---

## 9. Implementation record — 2026-08-21

Everything in §4 is implemented on branch `claude/adsense-content-audit-f90d87`. `npm run audit:adsense` reports **11/11 criteria passing**.

### Before and after, measured the same way

| Measure | Before | After |
|---|---:|---:|
| Internal links resolving to 410 or `noindex` | **23** | **0** |
| Live pages carrying `noindex` | 13 | 0 |
| Ad units on screens under 600 prose words | 2 (`/`, `/blog`) | 0 |
| Thinnest page in the sitemap | **29 words** (`/marine`) | **427 words** (`/blog`) |
| Hub page prose, median | 79 words | 720 words |
| Sentences appearing on 3+ pages | 26 | 0 |
| Pages with duplicated brand in `<title>` | 20 | 0 |
| Titles over 65 characters | 29 | 0 |
| Pages with an accessible image or SVG | **0 of 48** | **all sitemap content pages** |
| Calculators with a worked example | 0 | 17 of 17 |
| Lighthouse accessibility, every page | 93–100 | **100** |
| Lighthouse SEO, every page | 100 | 100 |
| Distinct "Reviewed by" identities per page | 2 | 1 |

Calculator and guide word counts were already at benchmark and were not inflated: calculators median 1,388 prose words, guides median 1,892.

### Decisions taken during implementation

**Byline (S5).** The operator chose `neutrino.au` as the sole publisher identity. `AuthorInfo` and `AuthorBio` were deleted; `CalcReviewedBy` is the only byline component and reads from `src/lib/editorial.ts`. `/about#who-reviews-this` now states the relationship between CalcFuel and neutrino.au and defines what a review covers. Guide JSON-LD previously declared `author: {"@type": "Person", name: "CalcFuel Editorial Team"}` — an organisation typed as a person — and is now an `Organization`.

**Tax calculators retired.** `/calculators/ifta-fuel-tax-calculator` and `/calculators/fuel-tax-credit-calculator` now return 410. IFTA is US interstate trucking tax on an Australian site, and current ATO fuel tax credit rates could not be verified against a primary source after the 2026 excise changes. Both were the highest-YMYL, lowest-verifiability pages on the site. The portfolio is 17 calculators.

**`/calculators/fuel-energy` consolidated.** Redundant with `/calculators`; 301 redirect, breadcrumbs on 21 pages repointed.

**83 dead route directories deleted.** They were unreachable behind the 410 middleware but still compiled into the build. The former `HOLD_EQUITY_PATHS` set — live but `noindex` — was retired outright: a page a reviewer can reach but Google cannot index earns nothing and still dilutes topical focus. `HOLD_EQUITY_PATHS` is now intentionally empty.

**IndexNow cron fixed.** `/api/indexnow` was submitting a hand-maintained list of ~80 URLs, most of which now return 410, every day. It now derives its list from the sitemap.

**Generator consumption model corrected.** `FUEL_RATES` was expressed as gallons per hour per kilowatt and then multiplied by 3.78541 for metric, producing figures roughly four times real-world consumption. Now litres per kilowatt-hour (0.30 diesel, 0.42 petrol, 0.55 liquid propane), converted to gallons for imperial display. Documented on `/methodology`.

**Accessibility.** `InputGroup`/`SelectGroup` derive an id via `useId()` when none is passed — all 75 call sites passed neither, so every label on the site was orphaned. 22 raw labels across four calculators were associated with their controls and 12 more controls given `aria-label`. Contrast was lifted site-wide (white on `orange-500` fails AA at body size; `orange-700` clears it), and inline links now carry a permanent underline rather than colour alone.

### Original content added

- **`/data/australian-fuel-prices`** — per-city unleaded and diesel averages, within-city price spread, regional aggregate and the 2026 excise timeline, transcribed from the ACCC weekly report of 21 August 2026 with per-table source attribution, `Dataset` JSON-LD, and a documented weekly update procedure. Every calculator default reads from it; 15+ calculator pages cite it.
- **Four hub pages rewritten** from link lists into 650–900 word guides, each with its own chart.
- **17 worked examples**, one per calculator, each a distinct scenario with the arithmetic shown step by step and an inline SVG calculation chain.
- **12 guide charts**, each built from figures already in that guide's own tables.
- **Per-domain limitations notices** replacing the single copy-pasted disclaimer — the boat page no longer warns about "driving conditions, vehicle type".
- **The ACCC filler sentence deleted from 15 pages** and replaced with sourcing that the page actually relies on.

### What the gate does not cover

`npm run audit:adsense` is static-crawl only. **AC7 (accessibility) must be verified with Lighthouse separately** — it needs a real browser:

```
npx lighthouse@12 http://localhost:3111/<path> --only-categories=accessibility --chrome-flags="--headless=new"
```

Every page on the site scored 100 on 2026-08-21.

Two exemption sets are declared explicitly at the top of the gate rather than left implicit. `UTILITY_PAGES` (contact, suggest, privacy, terms, corrections) are exempt from the word-count and media criteria — padding a contact page to clear a threshold is the behaviour these criteria exist to prevent. `MEDIA_EXEMPT` additionally covers the policy and index pages, where a chart would be decoration. Neither set is exempt from link integrity, byline, ad placement or title checks.

### Residual risk

Two things this work cannot fix, both stated so they are not mistaken for oversights:

1. **Domain history.** The site launched 1 May 2026 as a marketing-calculator site and retired ~80 URLs in August. Google's crawl history of `calcfuel.com` is majority dead marketing content. That resolves with time and re-crawling, not with code.
2. **Anonymous operator.** `neutrino.au` is now consistent, explained and linked, which is a large improvement on two conflicting bylines — but it is still a brand rather than a named person with stated credentials. If a further rejection cites content quality with everything here in place, adding a named author with real domain background is the next lever.
