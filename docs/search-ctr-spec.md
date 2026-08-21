# CalcFuel — Search & Click-Through Specification

**Date:** 2026-08-21
**Scope:** second AdSense pass, then Google and Bing organic performance with click-through rate as the target metric
**Companion:** [adsense-remediation-spec.md](adsense-remediation-spec.md) — that document fixed *eligibility*; this one is about *being found and clicked*

---

## 0. Constraint to state up front

The `gsc` and `pagespeed` MCP servers were installed at user scope but their tools are **not loaded into this session** — MCP servers attach at session start, and both were added afterwards. `gsc` also has no credentials yet ([mcp-setup.md](mcp-setup.md)), and `pagespeed` needs an API key.

So nothing here is based on CalcFuel's own Search Console impressions or CTR data. Everything is measured from the built site plus current Google and Bing documentation. Once Search Console is connected, the highest-value follow-up is the one thing this pass cannot do: find pages with high impressions and low CTR and rewrite *those* titles first, in impression order.

Lighthouse ran locally against a real headless Chrome, so the performance numbers here are measured.

---

## 1. What is already maxed out

Measured, not assumed. Do not spend effort here.

| Signal | State |
|---|---|
| Core Web Vitals (mobile emulation) | **Performance 98–99**, LCP 2.1–2.3 s, CLS **0**, TBT 0–10 ms across home, calculator, guide and data pages |
| Lighthouse SEO | **100** on all 45 pages |
| Lighthouse accessibility | **100** on all 45 pages |
| Canonicals | Present and correct on every page |
| H1 | Exactly one per page, all 45 |
| Meta descriptions | Unique on every page — zero duplicates |
| Internal link integrity | Zero broken or `noindex` targets |
| `robots.txt` | Allows all major crawlers incl. AI crawlers; sitemap declared |
| IndexNow | Key file present, daily cron, now derived from the sitemap |
| Content depth | Calculators median 1,388 prose words; guides 1,892 |

CWV is a real Google ranking signal and it is already at the ceiling. There is no performance work to do.

---

## 2. Findings

### Part A — second AdSense pass

The gate passes 11/11, so these are the residual quality signals a human reviewer could still act on.

---

**A1 — Calculator pages declare two contradictory page types, plus two dead schema types**

Every page under `/calculators/` emits, for the same URL:

```
SoftwareApplication   ← the page is a tool
Article               ← the page is an article
HowTo                 ← dead: no Google surface since Sept 2023
FAQPage               ← dead in Google since 7 May 2026
```

A page cannot be both a `SoftwareApplication` and an `Article`. `HowTo` was fully deprecated on desktop in September 2023 and has no rich result on any surface as of May 2026. Google added a deprecation notice to the FAQ documentation on **7 May 2026**; FAQ rich results no longer appear, the Search Console report is being removed, and the API data was dropped in August 2026.

`FAQPage` markup remains valid Schema.org and is still read by Bing and by AI answer engines for extraction, so it stays. `HowTo` and the duplicate `Article` do not.

Also: `CalculatorJsonLd` defaults `datePublished` to `2026-05-01` and `dateModified` to `2026-05-15` — the same class of invented-date problem the byline fix removed.

---

**A2 — 560+ instances of US vocabulary on an Australian site**

| Occurrences of `gas` / `gasoline` / `miles per gallon` / `mph` | Page |
|---:|---|
| 122 | `/calculators/generator-fuel-calculator` |
| 93 | `/calculators/hybrid-vs-gas-calculator` |
| 73 | `/calculators/ev-vs-gas-calculator` |
| 68 | `/calculators/hydrogen-vs-gas-calculator` |
| 46 | `/calculators/trip-fuel-cost-calculator` |
| 46 | `/calculators/fuel-economy-savings-calculator` |
| … | 11 further pages |

Three of the H1s still read **"EV vs Gas Calculator"**, **"Hybrid vs Gas Calculator"**, **"Hydrogen vs Gas Cost Calculator"** — on a site whose homepage headline, price dataset, default currency and every guide are explicitly Australian, and whose titles were already corrected to "Petrol".

This is the same defect class as the boat page carrying a car disclaimer: evidence that pages were templated from a US source and not read afterwards. It is simultaneously an AdSense quality signal and a keyword-targeting miss, since Australians search *petrol*, not *gas*.

**Important boundary:** the calculators have imperial/metric toggles. Gallons, MPG and miles are correct *inside imperial mode* and must not be stripped. Only prose, headings and metadata are in scope.

---

**A3 — The Open Graph image is an SVG, so no page has a social preview**

```
og:image → https://calcfuel.com/social-card.svg
```

Facebook, X, LinkedIn, Slack, Discord and iMessage do not render SVG Open Graph images. Every share of every CalcFuel page — including any a reviewer generates — shows a bare link with no card.

---

**A4 — Open Graph titles still carry the doubled brand**

`createPageMetadata` appends `| CalcFuel` to the OG and Twitter titles. The `<title>` duplication was fixed; the social one was not. The homepage currently shares as *"CalcFuel — Transport & Trip Cost Decisions | CalcFuel"*.

---

### Part B — search and click-through

---

**B1 — 26 of 45 meta descriptions are too long to display in full**

| Length | Pages |
|---|---|
| Over 165 chars (truncated in SERP) | **26** |
| Under 110 chars (wasting the space) | **6** |
| In the 110–165 target band | 13 |

Worst case is `/data/australian-fuel-prices` at **253 characters** — over a third of it will never be seen. Google rewrites 60–70% of descriptions, but it keeps one that closely matches query intent, and a truncated description cannot make its pitch. This is the single cheapest CTR lever available.

---

**B2 — No favicon that meets Google's stated requirements**

The layout declares `favicon.svg` for both `icon` and `apple-touch-icon`. Google's documentation asks for a square favicon of at least 8×8 and **recommends larger than 48×48**; SVG is not listed among supported formats, and `apple-touch-icon` as SVG is not supported by iOS either. The repo already contains `apple-touch-icon.png` (50 KB) and `favicon-32x32.png`, and neither is referenced.

The favicon is one of only three visual elements in a mobile Google result. Getting it wrong costs clicks on every impression.

---

**B3 — No `max-image-preview:large`**

No `robots` meta tag is emitted at all, so the default `max-image-preview:standard` applies. `max-image-preview:large` is a documented, zero-risk way to get a larger thumbnail in results and is a prerequisite for image-rich SERP treatments. `max-snippet:-1` similarly removes the snippet length cap.

---

**B4 — `<title>` and `<h1>` disagree on 8 pages**

Both should target the same query. Divergences found:

| Page | `<title>` | `<h1>` |
|---|---|---|
| `/calculators/ev-vs-gas-calculator` | EV vs Petrol Cost Calculator (Australia) | EV vs Gas Calculator |
| `/calculators/hybrid-vs-gas-calculator` | Hybrid vs Petrol Calculator | Hybrid vs Gas Calculator |
| `/calculators/hydrogen-vs-gas-calculator` | Hydrogen vs Petrol Calculator | Hydrogen vs Gas Cost Calculator |
| `/calculators/fuel-economy-savings-calculator` | Fuel Economy Calculator — MPG & L/100km | Fuel Economy & Consumption Calculator |
| `/calculators/generator-fuel-calculator` | Generator Fuel Calculator | Generator Fuel Consumption & Runtime |
| `/blog/hybrid-vs-petrol-australia` | Hybrid vs Petrol in Australia (2026) | Hybrid vs Petrol Cars in Australia: Is the Price Premium Worth It? |
| `/about` | About us | About CalcFuel |
| `/` | CalcFuel — Transport & Trip Cost Decisions | What will this trip actually cost? |

The homepage divergence is deliberate and fine — a question headline earns the click on-page while the title carries the brand. The three "Gas" ones are defects.

---

**B5 — Hub pages and the data page have no `BreadcrumbList`**

Breadcrumb is one of the structured data types Google still actively supports, and it replaces the raw URL in the result with a readable trail. Calculators and guides have it; `/marine`, `/towing`, `/vehicles`, `/trip-planning`, `/calculators` and `/data/australian-fuel-prices` do not — and those are exactly the pages with the deepest-looking URLs.

---

**B6 — Sitemap `lastmod` is the build timestamp on every URL**

```xml
<lastmod>2026-08-21T12:07:29.762Z</lastmod>
```

Identical to the millisecond across all 45 URLs, and it changes on every deploy whether or not the page changed. Google's documentation is explicit that it uses `lastmod` only when it is consistently accurate, and ignores the signal for sites that stamp everything with the current date. Bing weights `lastmod` more heavily than Google does, so this costs more on Bing.

`priority` is ignored by both engines and adds noise.

---

**B7 — Weak entity and locale signals**

- `<html lang="en">`, not `en-AU`, on a site whose entire dataset, currency and audience are Australian.
- The `Organization` JSON-LD has no `logo` as an `ImageObject` with dimensions, no `sameAs`, no `areaServed`, and no link to the operator entity.
- No `publisher`/`isAccessibleForFree`/`inLanguage` on the tool schema.

Entity signals are one of the stronger inputs to AI Overview and Copilot citation, where brand mentions predict citation roughly three times better than backlinks.

---

**B8 — Bing is not set up**

IndexNow is wired and now derives from the sitemap, which is the single most valuable Bing signal — Bing pioneered the protocol and indexes submitted URLs within minutes. But:

- No Bing Webmaster Tools verification (`BingSiteAuth.xml` or `msvalidate.01` meta) — so no access to Bing's crawl data, and since **February 2026** no access to the **AI Performance report**, the only tool from a major engine showing how often pages are cited in Copilot and Bing AI answers.
- Bing weights exact-match keywords, meta tags and social signals more heavily than Google, and Core Web Vitals less. The description and title work in B1/B4 therefore pays off more on Bing than on Google.

Verification requires an ID only the account owner can generate.

---

**B9 — Content structure is not optimised for AI answer extraction**

Content cited in AI Overviews and Copilot skews towards question-shaped headings with a self-contained answer in the first sentence or two beneath them, plus tables and lists. CalcFuel's H2s are mostly topic labels ("Hull Type and Its Effect on Fuel Burn") rather than the question a person asks ("How much does hull type change fuel burn?"), and answers unfold across paragraphs rather than leading with the answer.

Google has stated no special schema and no `llms.txt` is needed for AI Overview inclusion, and large-scale studies find no relationship between `llms.txt` and citation — so the existing `llms.txt` stays as-is and gets no further investment. Extractable structure is the lever that measurably works.

---

## 3. Specification

Acceptance criteria are added to the existing gate (`npm run audit:adsense`) unless noted.

### P0 — direct CTR and eligibility

**S1. Real Open Graph images.** Generate per-page PNG cards with Next.js `ImageResponse` (`opengraph-image.tsx`), using the page title and a CalcFuel identity. Replace every `og:image` and `twitter:image` reference to `social-card.svg`.
**AC13:** no `og:image` or `twitter:image` on any page resolves to an SVG; every one returns `image/png` with 1200×630 declared.

**S2. Correct favicon set.** Declare a ≥48×48 PNG plus the existing `.ico`, keep the SVG as an additional `icon` only, and point `apple-touch-icon` at the real PNG.
**AC14:** the home page declares at least one `rel="icon"` PNG of ≥48×48, and no `apple-touch-icon` of type `image/svg+xml`.

**S3. Robots directives.** Add `max-image-preview:large, max-snippet:-1, max-video-preview:-1` site-wide via the root layout metadata.
**AC15:** every 200 page carries `max-image-preview:large`.

**S4. Meta descriptions to 110–160 characters**, front-loaded with the query term and carrying one concrete differentiator — a number, a date, or the thing only CalcFuel has. 32 pages to rewrite.
**AC16:** every indexable page's description is 110–160 characters.

**S5. Remove US vocabulary from prose, headings and metadata.** Fix the three "Gas" H1s. Leave imperial-mode unit labels alone.
**AC17:** no `<h1>` or `<title>` on an indexable page contains `gas`, `gasoline` or `mph` as a standalone word.

**S6. Structured data correction.**
- Drop `HowTo` entirely.
- Drop `Article` from calculator pages; keep `SoftwareApplication`, and add `WebApplication` typing with `browserRequirements`, `isAccessibleForFree`, `inLanguage: en-AU`.
- Keep `FAQPage` — dead in Google, live in Bing and AI extraction.
- Add `BreadcrumbList` to hubs, `/calculators` and the data page.
- Replace invented date defaults with per-page dates; omit rather than invent.
**AC18:** zero `HowTo` on any page; no page declares both `Article` and `SoftwareApplication`; every indexable page except the home page has a `BreadcrumbList`.

### P1 — ranking and entity signals

**S7. Honest sitemap.** Per-page `lastmod` from a real content-change date; drop `priority`.
**AC19:** no two sitemap URLs share an identical `lastmod` timestamp to the millisecond, and no `lastmod` is in the future.

**S8. Locale and entity.** `<html lang="en-AU">`; `Organization` gains `logo` as `ImageObject` with dimensions, `areaServed: AU`, `sameAs`, and `parentOrganization` naming the operator.
**AC20:** root element is `en-AU`; `Organization` JSON-LD includes `logo`, `areaServed` and `sameAs`.

**S9. Bing Webmaster Tools.** Add `BingSiteAuth.xml` scaffolding and document the verification step. Requires an ID from the account owner — cannot be completed here.

**S10. Question-shaped headings and lead answers.** On the twelve guides and the four hubs, convert topic-label H2s into the question a reader would type, and make the first sentence beneath each a self-contained answer.
**AC21:** at least 40% of H2s on guide pages end in a question mark, and each is followed by a paragraph of ≥25 words.

### P2 — after Search Console is connected

Not implementable now, listed so it is not lost:

1. Pull impressions and CTR by page. Rewrite titles and descriptions for the worst CTR-at-high-impression pages first — real data beats the heuristics in S4.
2. Use `inspect_url_enhanced` / `batch_url_inspection` to confirm all ~80 retired URLs are processed as 410 and no marketing URL remains indexed.
3. Connect Bing Webmaster Tools and read the AI Performance report to see which pages Copilot actually cites.

---

## 4. Traceability

| Finding | Source | Spec |
|---|---|---|
| A1 | Google FAQ deprecation notice 7 May 2026; HowTo deprecated Sept 2023 | S6 |
| A2 | Measured: 560+ US-vocabulary instances across 17 pages | S5 |
| A3 | OG spec — SVG unsupported by all major social renderers | S1 |
| A4 | Measured: OG title double brand | S1 |
| B1 | Measured: 26 of 45 descriptions over 165 chars | S4 |
| B2 | Google favicon documentation — square, >48×48 recommended | S2 |
| B3 | Google robots meta documentation | S3 |
| B4 | Measured: 8 title/H1 divergences | S5 |
| B5 | Google structured data gallery — Breadcrumb actively supported | S6 |
| B6 | Google sitemap documentation on `lastmod` accuracy | S7 |
| B7 | AI citation research — entity signals, brand mentions | S8 |
| B8 | Bing Webmaster Tools, AI Performance report Feb 2026 | S9 |
| B9 | AI citation research — extractable structure, question-shaped headings | S10 |

---

## 5. Implementation record — 2026-08-21

All P0 and P1 items implemented. `npm run audit:adsense` now asserts **20 criteria** (11 AdSense + 9 search/CTR) and reports **20/20 passing**.

### Measured before and after

| Measure | Before | After |
|---|---:|---:|
| Pages with a working social card | **0 of 45** | **45 of 45** (generated PNG, 83 KB) |
| `og:image` pointing at an SVG | 45 | 0 |
| OG titles with doubled brand | 45 | 0 |
| Descriptions outside 110–160 chars | **32** | **0** |
| Longest description | 253 chars | 160 |
| Pages missing `max-image-preview:large` | 45 | 0 |
| `<h1>`/`<title>` containing US "gas" | 3 | 0 |
| US vocabulary in calculator prose | **560+** | only *natural gas* / *LP Gas*, which are correct |
| Pages emitting deprecated `HowTo` | 17 | 0 |
| Pages declaring both `Article` and `SoftwareApplication` | 17 | 0 |
| Pages without `BreadcrumbList` | 13 | 0 (home excepted by design) |
| Distinct sitemap `lastmod` values | **1** (build timestamp) | 3 real content dates |
| Guide H2s that are questions | 21% | **43%** |
| JSON-LD blocks / invalid | 193 / — | **193 / 0 invalid** |
| Lighthouse a11y · SEO · perf | 100 · 100 · 98–99 | **100 · 100 · 98–99** |

`npm test` — 33 passing.

### Notes on specific decisions

**Social cards** are generated by `opengraph-image.tsx` at four levels — root, `/calculators`, `/blog`, `/data` — using Next's `ImageResponse`. Per-page cards would need one file per route; segment cards cover all 45 pages with four files and carry the current fuel prices in the footer, so the card refreshes when the dataset does. A page that declares `openGraph` in its metadata does **not** inherit an ancestor segment's card, only its own segment's — so `createPageMetadata` resolves the correct card explicitly via `ogCardFor()`.

**`FAQPage` was kept** despite earning nothing in Google since 7 May 2026. It is still valid Schema.org, Bing reads it, and it is one of the structures AI answer engines extract from. `HowTo` was removed outright — dead on every surface since 2023, and "how to use this calculator" was never a HowTo task.

**Robots directives are emitted on both tags.** Next puts `max-image-preview:large` on the `googlebot` meta by default; Bing reads the generic `robots` tag and ignores the Google-specific one, so the directives are set at both levels.

**Question-shaped headings** were applied where the section genuinely answers that question — 41 headings across 10 guides. The numbered-tip guides (`how-to-save-money-on-petrol-australia`, `how-to-reduce-commute-fuel-costs`) keep their numbering, because there the sequence is real structure. That is why AC21 tests a site-wide ratio plus a per-guide minimum of one, rather than a flat per-page percentage that would force bad edits.

**Australian vocabulary.** 116 replacements across 18 files. Imperial-mode unit labels — gallons, MPG, miles — are untouched: they are correct inside the imperial toggle. "Natural gas" and "LP Gas" are correct terminology and were preserved.

**URL slugs were not changed.** `/calculators/ev-vs-gas-calculator`, `hybrid-vs-gas-calculator` and `hydrogen-vs-gas-calculator` keep "gas" in the path. They carry index history, and a rename means another round of 301s on a domain that has already retired ~80 URLs this month. The on-page language is now Australian throughout; revisit the slugs only if Search Console shows them ranking for US queries.

### Still outstanding — needs the operator

**Bing Webmaster Tools verification.** `public/BingSiteAuth.xml` is scaffolded with a placeholder. Sign in at [bing.com/webmasters](https://www.bing.com/webmasters), add `calcfuel.com`, copy the `<User>` value it issues into that file, and deploy. Without it there is no access to Bing's crawl data or to the **AI Performance report** (launched February 2026), which is the only report from a major engine showing how often pages are cited in Copilot and Bing AI answers.

**Search Console-driven title and description work.** Everything in S4 was written to heuristics because no impression data was available. Once `gsc` has credentials, pull impressions and CTR by page and rewrite the worst CTR-at-high-impression pages first. That is a materially better signal than any rule of thumb, and it is the single highest-value follow-up.

---

## 6. Correction and re-prioritisation from Bing AI citation data — 2026-08-21

**Correction to §0 and S9.** Bing Webmaster Tools is already verified for calcfuel.com and the AI Performance report is live. The operator supplied `AISearchQueriesReport_8_21_2026.csv`. `public/BingSiteAuth.xml` is redundant and the S9 action item is closed.

This is the first real citation data available, and it changes priorities.

### What the data says

**2,505 citations across 76 grounding queries.**

| Cluster | Citations | Share of all | Serving page |
|---|---:|---:|---|
| "fuel efficiency comparison" (16 variants) | **1,115** | **44.5%** | **none existed** |
| Retired marketing/finance calculators | 712 | 28.4% | now 410 |
| Generator fuel | 179 | 7.1% | `/calculators/generator-fuel-calculator` |
| Hybrid comparisons | 152 | 6.1% | `/calculators/hybrid-vs-gas-calculator` |
| Trip and fuel-bill queries | 128 | 5.1% | trip cost / budget planner |
| Idling | 88 | 3.5% | `/calculators/idling-fuel-waste-calculator` |
| Efficient cars | 45 | 1.8% | `/blog/most-fuel-efficient-cars-australia` |

Three findings worth acting on, and one worth not acting on.

**F1 — The single largest citation cluster had no page.** "fuel efficiency comparison" and its variants drew 1,115 citations, 44.5% of everything, at a citation share of only **15.6%** on the head query. Bing was grounding on CalcFuel for a query the site never addressed directly, and losing that grounding to competitors five times out of six.

Caveat worth recording: the variant list — *trending*, *popular*, *amazing*, *incredible*, *breaking*, *exclusive*, *latest*, *this year*, plus punctuation variants — looks like Bing's own query fan-out rather than distinct human searches. The head term is real; the adjective variants probably are not. They all ground on the same content need either way.

**F2 — 28.4% of current citations point at pages that now return 410.** "cac" (114), "calculate social media advertising ROI" (98), "cac calculation" (81), "compound interest table" (36), "calculate repayments on mortgage" (35). Several had high citation share — "customer acquisition cost calculation" at 60%, "how to calculate customer acquisition cost" at 39.78%. Those citations will disappear as Bing recrawls.

This is the measured cost of the AdSense retirement, and it was still the right call: that inventory was the topical sprawl that made the site look like a content farm. Recording it so the drop is understood rather than mistaken for a penalty.

**F3 — "gas" is the searcher's word more often than assumed.** 158 citations across 11 queries use *gas*, not *petrol* — including **"hybrid vs gas calculator" at 54 citations and 32.14% share**, the best-performing tool query on the site. Also "electric vs gas cars australia", an Australian query using the American term.

This partially contradicts S5. Stripping "gas" from body copy risked losing matches on the site's strongest tool query. The correction: titles and H1s stay Australian (AC17 unchanged), and *gas* is reintroduced as an explicit synonym in body copy and FAQs, phrased the way people actually search.

**F4 — do not chase the US queries.** "hybrid car payback period vs gas car United States 2025", "cost comparison flying vs driving Atlanta to Nashville", "fuel surcharge calculation US trucking". Real citations, but serving them properly means US pricing and US units, which is the incoherence that caused the original problem. Left alone deliberately.

### Actions taken

**New page: `/fuel-efficiency-comparison`.** Nine vehicle classes compared on L/100km, MPG and cost per 100 km at current Australian prices, with two charts, a sourced comparison table, and five question-shaped H2s matching the grounding queries — including "How does fuel efficiency compare across vehicle types?", "Why does comparing MPG mislead you?" and "What is a good fuel efficiency figure in Australia?". In the sitemap, header nav ("Compare") and footer. Lighthouse 100 a11y / 100 SEO / 98 perf.

**Generator page retargeted.** "how do you calculate domestic fuel consumption on a generator?" drew 138 citations at 25.32% share, but appeared nowhere on the page. It is now both an H2 and the lead FAQ, with a self-contained answer giving the arithmetic in the first two sentences. Other headings converted to questions.

**Fuel budget planner retargeted** at the "fuel bill" / "fuel bills" / "monthly fuel" cluster (91 citations) — all four H2s rewritten as the questions those searchers ask.

**"gas" synonym FAQs** added to the hybrid and EV comparison pages: "Is a hybrid cheaper to run than a gas car?" and "Is an EV cheaper to run than a gas car?", each stating plainly that gas and petrol are the same fuel.

**Two content defects found while doing this**, both from the earlier vocabulary pass and unrelated to citations:
- A mangled string on the hybrid page — `"fuel at $2.01/Llon"` — where a substitution clipped "gallon". Fixed.
- Illustrative distance bands still in miles on Australian pages (`12,000 miles/year`, `800 miles`). Converted to kilometres across 9 files, and "annual mileage" to "annual distance".

Gate: **20/20 passing**, 46 URLs. 33 tests passing.

### Next, once there is more data

1. Re-export the AI Performance report in four weeks. The retired-content citations should fall to near zero and `/fuel-efficiency-comparison` should start appearing — if it does not, the page is not being grounded on and needs a different angle.
2. Watch citation share on "fuel efficiency comparison" specifically. 15.6% is the baseline to beat.
3. Search Console is still not connected, so organic CTR remains unmeasured. That is now the only major blind spot.

---

## 7. Google Search Console data — 2026-08-21

The operator supplied a full GSC export (Queries, Pages, Countries, Devices, Chart). This closes the last blind spot, and it requires a correction to the framing of §3.

### The numbers

**5 clicks and 1,910 impressions over the reporting window (11 May – 19 Aug 2026). Site-wide average position 81.**

| | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| All queries | 1 | 1,531 | 0.07% | 81.3 |
| All pages | 5 | 1,910 | 0.26% | — |
| Australia | 2 | 325 | 0.62% | 73.7 |
| United States | 1 | 838 | 0.12% | 72.8 |
| Desktop | 2 | 1,344 | 0.15% | 72.7 |
| Mobile | 2 | 372 | 0.54% | 80.6 |

### Correction: CTR was the wrong target

The previous task was framed as "maximise the user click rate". **At an average position of 81, click-through optimisation cannot produce traffic** — position 81 is page 8, and expected CTR there is indistinguishable from zero no matter how good the title is.

The work in §3 is not wasted: descriptions, favicons, social cards, breadcrumbs and structured data are all prerequisites that pay off the moment a page reaches page one, and several are AdSense-relevant in their own right. But the binding constraint is **ranking at all**, not click-through, and no amount of metadata work changes that. Saying otherwise would misrepresent what the data shows.

### What the impressions were actually for

**88% of impressions were off-thesis.** 1,343 of 1,531 query impressions came from marketing and web-analytics queries against pages that now return 410:

| Impressions | Position | Query |
|---:|---:|---|
| 178 | 81.3 | what is a good conversion rate |
| 151 | 83.4 | website views per month |
| 101 | 77.3 | average website visitors per month |
| 98 | 93.9 | website traffic per month |
| 95 | 90.8 | website visits per month |

A single retired URL, `/calculators/website-traffic-calculator`, accounted for **846 impressions at position 83 with zero clicks**. That is the clearest possible vindication of the retirement decision: 44% of the site's total impressions were an off-topic page ranking on page 9 and converting nothing.

**On-thesis: 188 impressions across 95 queries. Zero of them in positions 1–10.**

| Position band | On-thesis impressions |
|---|---:|
| 1–10 | **0** |
| 11–20 | 11 |
| 21–50 | 19 |
| 51–80 | 78 |
| 81+ | 80 |

### Two winnable clusters the data revealed

**C1 — "is N litres per 100km good?"** A coherent question cluster at positions 47–77, which is close enough to move:

| Impressions | Position | Query |
|---:|---:|---|
| 6 | 76.8 | what is good fuel economy l 100km |
| 5 | 70.8 | what is good fuel economy l/100km |
| 4 | 67.5 | how many litres per 100km is good |
| 3 | 53.7 | is 12 litres per 100km good |
| 2–3 each | 47–63 | is 7 / 8 / 9 / 10 l/100km good |

The site had no page answering "is this figure good?" with a per-value verdict. Added to `/fuel-efficiency-comparison`: a verdict table from 5 to 14 L/100km giving a plain judgement, what class it is typical of, the MPG equivalent and the annual cost, plus the two caveats that make the judgement honest (read it against your class, and against how you drive).

**C2 — MPG conversion at specific values.** "54 mpg to l 100km" sits at **position 14 and produced the only click the site has ever had from a query**; "64mpg to l/100km" is also at 14. Added a full MPG↔L/100km conversion table with the constant explained in both directions, and the UK-gallon caveat.

**C3 — "fuel efficient family cars"** is the largest single on-thesis query at 32 impressions, sitting at position 85 with no family angle anywhere on the site. Added a family-car section to `/blog/most-fuel-efficient-cars-australia` covering the five-seat hybrid choices, the cost of a third row, and why hybrids widen their advantage on school-run driving.

Also added a self-contained lead answer to that guide for "what is the most fuel efficient car in Australia" (position 16), "cars with lowest fuel consumption" (19) and "lowest fuel consumption cars" (20) — all near page two with no direct answer on the page.

### Cross-reference with the Bing data

The two datasets agree on where the opportunity is, which is reassuring:

- Bing: "fuel efficiency comparison" is the largest citation cluster (1,115 citations) with no serving page → `/fuel-efficiency-comparison` built.
- Google: "compare vehicle fuel economy" at position 16, and the whole "is N L/100km good" cluster → same page, now extended to answer both.
- Both show substantial traffic still attached to retired marketing content: 28.4% of Bing citations, 88% of Google impressions. Both will decay.

### Honest expectation-setting

The site is three and a half months old, has just retired 80 URLs, and ranks nowhere for its topic. What the data supports:

1. **Impressions will fall before they rise.** 88% of Google impressions and 28% of Bing citations are attached to pages now returning 410. Expect the totals to drop sharply over the next 4–8 weeks. That is the retirement working, not a penalty.
2. **Nothing in this codebase produces rankings on its own.** Everything technical is now at or near ceiling — CWV 98–99, accessibility 100, SEO 100, valid structured data, honest sitemap, clean internal linking. What is missing is authority: age, and other sites linking to this one. No code change substitutes for that.
3. **The realistic near-term target is the striking-distance clusters**, C1 to C3 above — roughly 60 impressions currently sitting at positions 14–85 on queries the site now answers directly. Moving those to page one is achievable; competing for "fuel calculator" head terms is not, yet.
4. **Re-export both reports in four weeks** and compare against these baselines. The specific things to check: whether `/fuel-efficiency-comparison` picks up impressions, whether the L/100km cluster moves off page five, and whether the retired-URL impressions have decayed as expected.
