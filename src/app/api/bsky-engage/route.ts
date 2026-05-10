import { NextResponse } from "next/server";

const BSKY_IDENTIFIER = "getmarketingai.bsky.social";
const BSKY_APP_PASSWORD = "i26z-tefz-zr3p-fo2i";
const BSKY_PDS = "https://bsky.social";
const CRON_SECRET = process.env.CRON_SECRET;

const MAX_REPLIES_PER_RUN = 5;
const MAX_POST_AGE_HOURS = 48;
const UTM = "?utm_source=bluesky&utm_medium=maker_thread";

// ── Reply templates keyed by topic ──────────────────────────────────────────

interface ReplyTemplate {
  keywords: string[];
  text: string;
  link: string;
  linkAnchor: string; // text that appears in post and gets the facet
}

const TEMPLATES: ReplyTemplate[] = [
  {
    keywords: ["marketing budget", "how much should i spend", "how much to spend on marketing", "marketing spend"],
    text: "Rule of thumb: B2B spends 2–5% of revenue, B2C up to 15%. But what matters is your CAC vs LTV ratio.\n\nFree calculator to get a suggested budget based on your revenue and stage 👇",
    link: `https://calcfuel.com/calculators/marketing-budget-calculator${UTM}`,
    linkAnchor: "👇",
  },
  {
    keywords: ["roi calculator", "marketing roi", "return on investment marketing", "measure marketing"],
    text: "Quick formula: (Revenue from campaign − Cost) ÷ Cost × 100. The tricky part is attributing revenue correctly.\n\nFree marketing ROI calculator 👇",
    link: `https://calcfuel.com/calculators/marketing-roi-calculator${UTM}`,
    linkAnchor: "👇",
  },
  {
    keywords: ["roas", "return on ad spend", "ad spend calculator", "google ads roi", "facebook ads roi", "meta ads roi"],
    text: "ROAS ≠ ROI. ROAS ignores your cost of goods — a 4x ROAS can still lose money on thin margins. Worth checking both.\n\nFree ROAS calculator 👇",
    link: `https://calcfuel.com/calculators/roas-calculator${UTM}`,
    linkAnchor: "👇",
  },
  {
    keywords: ["how much should i charge", "pricing strategy", "pricing my services", "what to charge", "freelance rates", "solopreneur pricing"],
    text: "Work backwards from your target revenue: annual income ÷ billable hours = minimum hourly rate. Then add overhead and profit margin.\n\nFree profit margin calculator to check your numbers 👇",
    link: `https://calcfuel.com/calculators/profit-margin-calculator${UTM}`,
    linkAnchor: "👇",
  },
  {
    keywords: ["marketing cost", "cost per lead", "cpl", "lead generation cost", "how much per lead"],
    text: "Benchmark CPL varies a lot by channel — B2B averages $50–200+. The number that matters more is CPL × close rate vs LTV.\n\nFree cost per lead calculator 👇",
    link: `https://calcfuel.com/calculators/cost-per-lead-calculator${UTM}`,
    linkAnchor: "👇",
  },
  {
    keywords: ["solopreneur budget", "small business marketing budget", "startup marketing budget", "bootstrap marketing"],
    text: "For bootstrapped businesses: start with 10% of monthly revenue on marketing until you find one channel that converts, then double down.\n\nFree marketing budget calculator 👇",
    link: `https://calcfuel.com/calculators/marketing-budget-calculator${UTM}`,
    linkAnchor: "👇",
  },
  {
    keywords: ["cac", "customer acquisition cost", "how much to acquire a customer", "acquisition cost"],
    text: "CAC should be at most 1/3 of customer LTV for a healthy unit economics. If it's higher, you're buying customers at a loss.\n\nFree CAC calculator 👇",
    link: `https://calcfuel.com/calculators/customer-acquisition-cost-calculator${UTM}`,
    linkAnchor: "👇",
  },
];

function matchTemplate(text: string): ReplyTemplate | null {
  const lower = text.toLowerCase();
  for (const t of TEMPLATES) {
    if (t.keywords.some((kw) => lower.includes(kw))) return t;
  }
  return null;
}

// ── Bluesky helpers ──────────────────────────────────────────────────────────

interface BskySession {
  accessJwt: string;
  did: string;
}

async function createSession(): Promise<BskySession> {
  const res = await fetch(`${BSKY_PDS}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: BSKY_IDENTIFIER, password: BSKY_APP_PASSWORD }),
  });
  if (!res.ok) throw new Error(`Bluesky auth failed: ${res.status}`);
  return res.json();
}

interface BskyPost {
  uri: string;
  cid: string;
  author: { did: string; handle: string };
  record: { text: string; createdAt: string };
  indexedAt: string;
}

async function searchPosts(session: BskySession, query: string, limit = 25): Promise<BskyPost[]> {
  const url = new URL(`${BSKY_PDS}/xrpc/app.bsky.feed.searchPosts`);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("sort", "latest");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${session.accessJwt}` },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.posts ?? []) as BskyPost[];
}

async function getMyRecentReplies(session: BskySession): Promise<Set<string>> {
  // Fetch my own feed to see who I've replied to in the last 48h
  const url = new URL(`${BSKY_PDS}/xrpc/app.bsky.feed.getAuthorFeed`);
  url.searchParams.set("actor", BSKY_IDENTIFIER);
  url.searchParams.set("limit", "50");
  url.searchParams.set("filter", "posts_with_replies");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${session.accessJwt}` },
  });
  if (!res.ok) return new Set();

  const data = await res.json();
  const cutoff = Date.now() - MAX_POST_AGE_HOURS * 3600 * 1000;
  const repliedDids = new Set<string>();

  for (const item of data.feed ?? []) {
    const post = item.post;
    const reply = item.reply;
    if (!reply) continue; // not a reply
    const createdAt = new Date(post?.record?.createdAt ?? 0).getTime();
    if (createdAt < cutoff) continue;
    // The parent author DID
    const parentDid = reply.parent?.author?.did;
    if (parentDid) repliedDids.add(parentDid);
  }
  return repliedDids;
}

interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: Array<{ $type: string; uri: string }>;
}

function buildReplyFacet(text: string, anchor: string, uri: string): Facet[] {
  const encoder = new TextEncoder();
  const idx = text.indexOf(anchor);
  if (idx === -1) return [];
  const before = encoder.encode(text.slice(0, idx));
  const anchorBytes = encoder.encode(anchor);
  return [
    {
      index: { byteStart: before.length, byteEnd: before.length + anchorBytes.length },
      features: [{ $type: "app.bsky.richtext.facet#link", uri }],
    },
  ];
}

async function postReply(
  session: BskySession,
  replyText: string,
  link: string,
  linkAnchor: string,
  parentUri: string,
  parentCid: string,
  rootUri: string,
  rootCid: string
) {
  const facets = buildReplyFacet(replyText, linkAnchor, link);
  const record: Record<string, unknown> = {
    $type: "app.bsky.feed.post",
    text: replyText,
    createdAt: new Date().toISOString(),
    langs: ["en"],
    reply: {
      root: { uri: rootUri, cid: rootCid },
      parent: { uri: parentUri, cid: parentCid },
    },
  };
  if (facets.length > 0) record.facets = facets;

  const res = await fetch(`${BSKY_PDS}/xrpc/com.atproto.repo.createRecord`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: "app.bsky.feed.post",
      record,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Reply failed: ${res.status} ${errText}`);
  }
  return res.json();
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = await createSession();

    // Get users I've already replied to (dedup)
    const repliedDids = await getMyRecentReplies(session);

    const cutoff = Date.now() - MAX_POST_AGE_HOURS * 3600 * 1000;
    const seenPostUris = new Set<string>(); // avoid double-replying to same post
    const seenAuthorDids = new Set<string>(repliedDids); // avoid same author

    const replies: Array<{ uri: string; handle: string; preview: string }> = [];
    let skipped = 0;

    // Deduplicated keyword list for search queries
    const searchQueries = [
      "marketing budget",
      "how much should I charge",
      "ROI calculator",
      "ad spend calculator",
      "solopreneur budget",
      "customer acquisition cost",
      "cost per lead",
    ];

    for (const query of searchQueries) {
      if (replies.length >= MAX_REPLIES_PER_RUN) break;

      const posts = await searchPosts(session, query, 20);

      for (const post of posts) {
        if (replies.length >= MAX_REPLIES_PER_RUN) break;

        // Skip own posts
        if (post.author.handle === BSKY_IDENTIFIER) continue;

        // Skip if too old
        const postAge = new Date(post.record.createdAt).getTime();
        if (postAge < cutoff) continue;

        // Skip already-seen posts or authors
        if (seenPostUris.has(post.uri)) continue;
        if (seenAuthorDids.has(post.author.did)) continue;

        // Match to a template
        const tmpl = matchTemplate(post.record.text);
        if (!tmpl) { skipped++; continue; }

        // Truncate reply to 300 graphemes (spec requirement)
        let replyText = tmpl.text;
        if ([...replyText].length > 300) {
          replyText = [...replyText].slice(0, 297).join("") + "...";
        }

        seenPostUris.add(post.uri);
        seenAuthorDids.add(post.author.did);

        try {
          await postReply(
            session,
            replyText,
            tmpl.link,
            tmpl.linkAnchor,
            post.uri,
            post.cid,
            post.uri, // root = parent for top-level posts
            post.cid
          );
          replies.push({
            uri: post.uri,
            handle: post.author.handle,
            preview: post.record.text.slice(0, 60),
          });

          // Small delay between replies to avoid rate limiting
          await new Promise((r) => setTimeout(r, 1500));
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("[bsky-engage] Reply error:", msg);
        }
      }
    }

    return NextResponse.json({
      ok: true,
      repliesSent: replies.length,
      skippedNoMatch: skipped,
      alreadyRepliedDids: repliedDids.size,
      replies,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[bsky-engage] Error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
