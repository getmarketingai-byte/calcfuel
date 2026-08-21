#!/usr/bin/env node
/**
 * AdSense readiness gate.
 *
 * Crawls a running build and asserts the acceptance criteria in
 * docs/adsense-remediation-spec.md. Exits non-zero if any criterion fails, so a
 * regression that would re-trigger a "low value content" rejection blocks the deploy
 * rather than being discovered weeks later in the AdSense dashboard.
 *
 *   npm run audit:adsense                    # against http://localhost:3111
 *   npm run audit:adsense -- https://calcfuel.com
 *
 * Start the server first (`npm run build && npx next start -p 3111`) unless auditing
 * a deployed origin.
 */

const BASE = (process.argv[2] || "http://localhost:3111").replace(/\/$/, "");
const UA = "CalcFuel-AdSense-Audit/1.0";

// ---------------------------------------------------------------- thresholds

const MIN_PROSE_WORDS_SITEMAP = 400; // AC4 — no sitemap URL may be a bare link list
const MIN_PROSE_WORDS_FOR_ADS = 600; // AC3 — Inventory value: no ads on thin screens
const MAX_SHARED_SENTENCE_PAGES = 2; // AC6 — boilerplate ceiling
const MAX_TITLE_LENGTH = 65; // AC8
const MIN_WORKED_EXAMPLE_WORDS = 120; // AC12
const MIN_DESC = 110; // AC16 — below this wastes SERP space
const MAX_DESC = 160; // AC16 — above this is truncated
const MIN_GUIDE_QUESTION_RATIO = 0.4; // AC21 — share of guide H2s that are questions

/**
 * Legal and utility pages. Exempt from the content-depth and media criteria: a
 * contact form or a corrections policy is legitimately short and legitimately
 * text-only, and padding one to clear a word count is the behaviour these criteria
 * exist to prevent. They are NOT exempt from link integrity, byline, ad-placement or
 * title checks.
 */
const UTILITY_PAGES = new Set([
  "/contact",
  "/suggest",
  "/privacy-policy",
  "/terms-of-service",
  "/corrections",
]);

/**
 * Pages exempt from AC10 (original media) on top of UTILITY_PAGES: policy and index
 * pages, where a chart would be decoration rather than information. Every page that
 * can carry an advertisement is in scope.
 */
const MEDIA_EXEMPT = new Set([
  ...UTILITY_PAGES,
  "/about",
  "/editorial-policy",
  "/methodology",
  "/calculators",
  "/blog",
]);

// ---------------------------------------------------------------- extraction

const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

const textOf = (h) =>
  strip(h)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const words = (t) => (t ? t.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length : 0);

function mainOf(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return m ? m[1] : html;
}

/** Editorial prose only — excludes chrome, buttons and bare link text. */
function prose(mainHtml) {
  const out = [];
  const re = /<(p|li|h1|h2|h3|h4|blockquote|summary|td|dt|dd|figcaption|caption)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const s = strip(mainHtml);
  let m;
  while ((m = re.exec(s))) out.push(textOf(m[2]));
  return out.join(" ");
}

/**
 * Strip regions marked data-boilerplate before duplication analysis. Disclaimers,
 * related-tool cards and legal chrome are expected to repeat; what must not repeat is
 * editorial body copy, which is the pattern AC6 exists to catch.
 */
function editorialOnly(mainHtml) {
  return mainHtml.replace(
    /<([a-z]+)\b[^>]*\bdata-boilerplate\b[\s\S]*?<\/\1>/gi,
    " ",
  );
}

function sentences(mainHtml) {
  return textOf(editorialOnly(mainHtml))
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 6);
}

const attr = (h, re) => {
  const m = h.match(re);
  return m ? m[1] : null;
};

const normalise = (p) => {
  const bare = p.split("?")[0].split("#")[0];
  return bare.length > 1 && bare.endsWith("/") ? bare.slice(0, -1) : bare || "/";
};

const isAsset = (p) => p.startsWith("/_next") || /\.(svg|png|jpe?g|webp|ico|txt|xml|pdf|json)$/i.test(p);

// ---------------------------------------------------------------- crawl

async function get(path) {
  const res = await fetch(BASE + path, { headers: { "user-agent": UA }, redirect: "manual" });
  const html = res.status < 400 && res.status >= 200 ? await res.text() : "";
  return {
    status: res.status,
    xrobots: res.headers.get("x-robots-tag") || "",
    location: res.headers.get("location") || "",
    html,
  };
}

async function crawl() {
  const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`, { headers: { "user-agent": UA } })).text();
  const sitemapPaths = new Set(
    [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => normalise(new URL(m[1]).pathname)),
  );

  const pages = new Map();
  const queue = ["/", ...sitemapPaths];
  const seen = new Set();

  while (queue.length) {
    const path = normalise(queue.shift());
    if (seen.has(path) || isAsset(path)) continue;
    seen.add(path);

    const r = await get(path);
    const main = mainOf(r.html);
    const title = (attr(r.html, /<title>([^<]*)<\/title>/i) || "").trim();
    const outbound = new Set(
      [...r.html.matchAll(/href="(\/[^"?#]*)"/g)].map((m) => normalise(m[1])).filter((p) => !isAsset(p)),
    );

    pages.set(path, {
      path,
      status: r.status,
      xrobots: r.xrobots,
      inSitemap: sitemapPaths.has(path),
      title,
      main,
      prose: prose(main),
      proseWords: words(prose(main)),
      sentences: sentences(main),
      adUnits: (r.html.match(/class="[^"]*\badsbygoogle\b/g) || []).length,
      media: (main.match(/<svg\b/gi) || []).length + (main.match(/<img\b/gi) || []).length,
      accessibleMedia:
        (main.match(/<svg\b[^>]*(role="img"|aria-label)/gi) || []).length +
        (main.match(/<img\b[^>]*alt="[^"]+"/gi) || []).length,
      bylines: (strip(main).match(/Reviewed by/g) || []).length,
      namesRetiredEditor: /CalcFuel Technical Editor/.test(strip(main)),
      outbound,
      raw: r.html,
      desc: attr(r.html, /<meta name="description" content="([^"]*)"/i) || "",
      ogImage: attr(r.html, /<meta property="og:image" content="([^"]*)"/i) || "",
      twImage: attr(r.html, /<meta name="twitter:image" content="([^"]*)"/i) || "",
      robotsMeta: `${attr(r.html, /<meta name="robots" content="([^"]*)"/i) || ""} ${attr(r.html, /<meta name="googlebot" content="([^"]*)"/i) || ""}`,
      h1: (attr(r.html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || "").replace(/<[^>]+>/g, " ").trim(),
      h2s: [...r.html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/gi)].map((m) => m[1].trim()),
      jsonTypes: [
        ...new Set([
          ...[...r.html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]),
          ...[...r.html.matchAll(/"@type":\[([^\]]*)\]/g)].flatMap((m) =>
            [...m[1].matchAll(/"([A-Za-z]+)"/g)].map((x) => x[1]),
          ),
        ]),
      ],
    });

    if (r.status === 200) for (const o of outbound) if (!seen.has(o)) queue.push(o);
  }

  return { pages, sitemapPaths, sitemapXml };
}

// ---------------------------------------------------------------- criteria

const results = [];
const record = (id, name, failures, detail) =>
  results.push({ id, name, failures, detail: detail || "" });

function run({ pages, sitemapPaths, sitemapXml }) {
  const live = [...pages.values()].filter((p) => p.status === 200);
  const indexable = live.filter((p) => !p.xrobots.includes("noindex"));

  // AC1 — every internal link resolves to an indexable 200
  {
    const bad = [];
    for (const p of live) {
      for (const target of p.outbound) {
        const t = pages.get(target);
        if (!t) continue;
        if (t.status !== 200 || t.xrobots.includes("noindex")) {
          bad.push(`${target} (${t.status}${t.xrobots ? ` ${t.xrobots}` : ""}) ← ${p.path}`);
        }
      }
    }
    record("AC1", "internal link integrity", bad);
  }

  // AC2 — nothing live-but-noindexed remains reachable
  {
    const bad = live.filter((p) => p.xrobots.includes("noindex")).map((p) => p.path);
    record("AC2", "no live noindexed pages", bad);
  }

  // AC3 — no ads on screens below the content threshold
  {
    const bad = live
      .filter((p) => p.adUnits > 0 && p.proseWords < MIN_PROSE_WORDS_FOR_ADS)
      .map((p) => `${p.path} (${p.proseWords} words, ${p.adUnits} units)`);
    record("AC3", `no ad units below ${MIN_PROSE_WORDS_FOR_ADS} words`, bad);
  }

  // AC4 — no doorway pages in the sitemap
  {
    const bad = [...sitemapPaths]
      .map((p) => pages.get(p))
      .filter((p) => p && p.status === 200 && !UTILITY_PAGES.has(p.path))
      .filter((p) => p.proseWords < MIN_PROSE_WORDS_SITEMAP)
      .map((p) => `${p.path} (${p.proseWords} words)`);
    record("AC4", `every sitemap URL ≥ ${MIN_PROSE_WORDS_SITEMAP} words`, bad);
  }

  // AC5 — exactly one byline, and no stale operator name
  {
    const bad = [];
    for (const p of live) {
      if (p.bylines > 1) bad.push(`${p.path} has ${p.bylines} "Reviewed by" bylines`);
      if (p.namesRetiredEditor)
        bad.push(`${p.path} still names the retired "CalcFuel Technical Editor"`);
    }
    record("AC5", "single consistent byline", bad);
  }

  // AC6 — boilerplate ceiling
  {
    const freq = new Map();
    for (const p of indexable) {
      for (const s of new Set(p.sentences)) {
        if (!freq.has(s)) freq.set(s, []);
        freq.get(s).push(p.path);
      }
    }
    const bad = [...freq.entries()]
      .filter(([, ps]) => ps.length > MAX_SHARED_SENTENCE_PAGES)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([s, ps]) => `${ps.length}× "${s.slice(0, 90)}…"`);
    record("AC6", `no sentence on more than ${MAX_SHARED_SENTENCE_PAGES} pages`, bad);
  }

  // AC8 — title hygiene
  {
    const bad = [];
    for (const p of live) {
      if ((p.title.match(/CalcFuel/g) || []).length > 1) bad.push(`${p.path} duplicated brand`);
      if (p.title.length > MAX_TITLE_LENGTH)
        bad.push(`${p.path} title ${p.title.length} chars`);
    }
    record("AC8", `titles unique-branded and ≤ ${MAX_TITLE_LENGTH} chars`, bad);
  }

  // AC9 — no stale year labels in titles or bylines
  {
    const year = new Date().getFullYear();
    const stale = new RegExp(`\\b(20(?:1\\d|2[0-${String(year - 2001).slice(-1)}]))\\b`);
    const bad = live
      .filter((p) => {
        const m = p.title.match(/\b20\d{2}\b/g) || [];
        return m.some((y) => Number(y) < year);
      })
      .map((p) => `${p.path} — "${p.title}"`);
    void stale;
    record("AC9", "no stale year in page titles", bad);
  }

  // AC10 — original media on every indexable content page
  {
    const bad = [...sitemapPaths]
      .map((p) => pages.get(p))
      .filter((p) => p && p.status === 200 && !MEDIA_EXEMPT.has(p.path))
      .filter((p) => p.accessibleMedia === 0)
      .map((p) => p.path);
    record("AC10", "≥ 1 accessible image or SVG per sitemap URL", bad);
  }

  // AC11 — the reference dataset exists and is cited
  {
    const bad = [];
    const data = pages.get("/data/australian-fuel-prices");
    if (!data || data.status !== 200) bad.push("/data/australian-fuel-prices missing");
    else {
      if (data.proseWords < 700) bad.push(`data page only ${data.proseWords} words`);
      if (!/<table/i.test(data.main)) bad.push("data page has no table");
      const citing = live.filter(
        (p) => p.path.startsWith("/calculators/") && p.outbound.has("/data/australian-fuel-prices"),
      ).length;
      if (citing < 15) bad.push(`only ${citing} calculator pages cite the dataset (need 15)`);
    }
    record("AC11", "sourced reference dataset published and cited", bad);
  }

  // AC12 — worked examples
  {
    const bad = [];
    for (const p of live) {
      if (!p.path.startsWith("/calculators/") || p.path === "/calculators") continue;
      const m = p.main.match(/<h2[^>]*>\s*Worked example\s*<\/h2>([\s\S]*?)(?=<h2|$)/i);
      if (!m) {
        bad.push(`${p.path} has no "Worked example" section`);
        continue;
      }
      const body = textOf(m[1]);
      const numerals = (body.match(/\d/g) || []).length;
      if (words(body) < MIN_WORKED_EXAMPLE_WORDS || numerals < 4)
        bad.push(`${p.path} worked example too thin (${words(body)} words, ${numerals} digits)`);
    }
    record("AC12", "worked example on every calculator", bad);
  }

  // ---- search & click-through -------------------------------------------

  // AC13 — social cards must be real raster images
  {
    const bad = [];
    for (const p of live) {
      for (const [k, v] of [["og:image", p.ogImage], ["twitter:image", p.twImage]]) {
        if (!v) bad.push(`${p.path} has no ${k}`);
        else if (/\.svg(\?|$)/i.test(v)) bad.push(`${p.path} ${k} is an SVG`);
      }
    }
    record("AC13", "real PNG social card on every page", bad);
  }

  // AC14 — favicon Google will actually use
  {
    const home = pages.get("/");
    const bad = [];
    const icons = [...(home?.raw.matchAll(/<link rel="icon"[^>]*>/g) || [])].map((m) => m[0]);
    const big = icons.some((t) => /image\/png/.test(t) && /sizes="(\d+)x\1"/.test(t) && Number(t.match(/sizes="(\d+)x/)[1]) >= 48);
    if (!big) bad.push("no PNG icon of at least 48x48 declared on the home page");
    if (/<link rel="apple-touch-icon"[^>]*image\/svg/.test(home?.raw || ""))
      bad.push("apple-touch-icon is an SVG, which iOS does not render");
    record("AC14", "favicon meets Google's stated requirements", bad);
  }

  // AC15 — snippet and thumbnail directives
  {
    const bad = live
      .filter((p) => !/max-image-preview:large/.test(p.robotsMeta))
      .map((p) => p.path);
    record("AC15", "max-image-preview:large site-wide", bad);
  }

  // AC16 — descriptions that display in full
  {
    const bad = live
      .filter((p) => p.desc.length < MIN_DESC || p.desc.length > MAX_DESC)
      .map((p) => `${p.path} (${p.desc.length} chars)`);
    record("AC16", `descriptions ${MIN_DESC}-${MAX_DESC} chars`, bad);
  }

  // AC17 — Australian vocabulary in titles and headings
  {
    const us = /\b(gas|gasoline|mph)\b/i;
    const bad = [];
    for (const p of live) {
      if (us.test(p.title)) bad.push(`${p.path} title: "${p.title}"`);
      if (us.test(p.h1)) bad.push(`${p.path} h1: "${p.h1}"`);
    }
    record("AC17", "no US fuel vocabulary in titles or H1s", bad);
  }

  // AC18 — structured data that Google still supports, and no contradictory typing
  {
    const bad = [];
    for (const p of live) {
      const t = p.jsonTypes;
      if (t.includes("HowTo")) bad.push(`${p.path} emits deprecated HowTo`);
      if (t.includes("Article") && t.includes("SoftwareApplication"))
        bad.push(`${p.path} declares both Article and SoftwareApplication`);
      if (p.path !== "/" && !t.includes("BreadcrumbList"))
        bad.push(`${p.path} has no BreadcrumbList`);
    }
    record("AC18", "supported, non-contradictory structured data", bad);
  }

  // AC19 — a sitemap whose lastmod means something
  {
    const bad = [];
    const stamps = [...sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    if (new Set(stamps).size <= 1)
      bad.push("every URL shares one lastmod — the build timestamp, not a content date");
    const future = stamps.filter((s) => new Date(s) > new Date());
    if (future.length) bad.push(`${future.length} lastmod values are in the future`);
    record("AC19", "sitemap lastmod reflects real edits", bad);
  }

  // AC20 — locale and entity signals
  {
    const home = pages.get("/");
    const bad = [];
    if (!/<html[^>]*lang="en-AU"/.test(home?.raw || "")) bad.push('root element is not lang="en-AU"');
    for (const k of ["logo", "areaServed"]) {
      if (!new RegExp(`"${k}"`).test(home?.raw || "")) bad.push(`Organization JSON-LD has no ${k}`);
    }
    record("AC20", "Australian locale and entity signals", bad);
  }

  // AC21 — extractable, question-shaped structure on guides
  {
    const guides = live.filter((p) => p.path.startsWith("/blog/"));
    let q = 0;
    let total = 0;
    const bad = [];
    for (const p of guides) {
      const qs = p.h2s.filter((h) => h.trim().endsWith("?")).length;
      q += qs;
      total += p.h2s.length;
      if (qs < 1) bad.push(`${p.path} has no question-shaped H2`);
    }
    const ratio = total ? q / total : 0;
    if (ratio < MIN_GUIDE_QUESTION_RATIO)
      bad.push(`site-wide guide question ratio ${(ratio * 100).toFixed(0)}% (need ${MIN_GUIDE_QUESTION_RATIO * 100}%)`);
    record("AC21", "question-shaped headings on guides", bad);
  }

}
// ---------------------------------------------------------------- report

const { pages, sitemapPaths, sitemapXml } = await crawl();
run({ pages, sitemapPaths, sitemapXml });

const pad = (s, n) => String(s).padEnd(n);
let failed = 0;

console.log(`\nAdSense readiness gate — ${BASE}`);
console.log(`${pages.size} URLs crawled, ${sitemapPaths.size} in sitemap\n`);

for (const r of results) {
  const ok = r.failures.length === 0;
  if (!ok) failed++;
  console.log(`${pad(r.id, 6)}${pad(r.name, 46)}${ok ? "PASS" : `FAIL  ${r.failures.length}`}`);
  if (!ok) for (const f of r.failures.slice(0, 12)) console.log(`         · ${f}`);
  if (!ok && r.failures.length > 12) console.log(`         · …and ${r.failures.length - 12} more`);
}

console.log(
  `\n${results.length - failed}/${results.length} criteria pass.` +
    (failed ? " Not ready to resubmit.\n" : " Ready to resubmit.\n"),
);

process.exit(failed ? 1 : 0);
