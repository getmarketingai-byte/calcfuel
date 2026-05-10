import { NextResponse } from "next/server";
import { getCurrentPost, getCurrentPostIndex, POSTS } from "@/lib/bluesky-posts";

const BSKY_IDENTIFIER = "getmarketingai.bsky.social";
const BSKY_APP_PASSWORD = "i26z-tefz-zr3p-fo2i";
const BSKY_PDS = "https://bsky.social";

const MASTODON_INSTANCE = "https://techhub.social";
const MASTODON_TOKEN = process.env.MASTODON_ACCESS_TOKEN;

const CRON_SECRET = process.env.CRON_SECRET;

// ── Bluesky ──────────────────────────────────────────────────────────────────

interface BskySession {
  accessJwt: string;
  did: string;
}

async function createBskySession(): Promise<BskySession> {
  const res = await fetch(`${BSKY_PDS}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: BSKY_IDENTIFIER, password: BSKY_APP_PASSWORD }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bluesky auth failed: ${res.status} ${text}`);
  }
  return res.json();
}

interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: Array<{ $type: string; uri: string }>;
}

function buildFacets(text: string, link: string): Facet[] {
  const encoder = new TextEncoder();
  const fullText = text;

  let startByte = -1;
  let endByte = -1;

  const linkIndex = fullText.indexOf(link);
  if (linkIndex !== -1) {
    const before = encoder.encode(fullText.slice(0, linkIndex));
    startByte = before.length;
    endByte = startByte + encoder.encode(link).length;
  } else {
    const detailsMatch = fullText.indexOf("Details 👇");
    if (detailsMatch !== -1) {
      const before = encoder.encode(fullText.slice(0, detailsMatch));
      startByte = before.length;
      endByte = startByte + encoder.encode("Details 👇").length;
    } else {
      return [];
    }
  }

  if (startByte === -1) return [];

  return [
    {
      index: { byteStart: startByte, byteEnd: endByte },
      features: [{ $type: "app.bsky.richtext.facet#link", uri: link }],
    },
  ];
}

async function publishBskyPost(session: BskySession, text: string, link?: string) {
  const now = new Date().toISOString();
  const record: Record<string, unknown> = {
    $type: "app.bsky.feed.post",
    text,
    createdAt: now,
    langs: ["en"],
  };

  if (link) {
    const facets = buildFacets(text, link);
    if (facets.length > 0) record.facets = facets;
    record.embed = {
      $type: "app.bsky.embed.external",
      external: { uri: link, title: "", description: "" },
    };
  }

  const res = await fetch(`${BSKY_PDS}/xrpc/com.atproto.repo.createRecord`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({ repo: session.did, collection: "app.bsky.feed.post", record }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bluesky post failed: ${res.status} ${text}`);
  }
  return res.json();
}

// ── Mastodon ─────────────────────────────────────────────────────────────────

function addHashtags(text: string): string {
  return `${text}\n\n#FreeTools #Marketing #SmallBusiness`;
}

async function publishMastodonPost(text: string, link?: string) {
  if (!MASTODON_TOKEN) throw new Error("MASTODON_ACCESS_TOKEN not set");

  // Mastodon has a 500-char limit; include link in status text if not already present
  let status = addHashtags(text);
  if (link && !status.includes(link)) {
    status = `${status}\n${link}`;
  }
  // Trim to 500 chars if needed (rare, but safe)
  if (status.length > 500) {
    status = status.slice(0, 497) + "...";
  }

  const body = new URLSearchParams({ status, visibility: "public" });

  const res = await fetch(`${MASTODON_INSTANCE}/api/v1/statuses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MASTODON_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Mastodon post failed: ${res.status} ${errText}`);
  }
  return res.json();
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = getCurrentPost();
  const postIndex = getCurrentPostIndex();
  const results: Record<string, unknown> = { postIndex, totalPosts: POSTS.length };

  // Bluesky
  try {
    const session = await createBskySession();
    const bskyResult = await publishBskyPost(session, post.text, post.link);
    results.bluesky = { ok: true, uri: bskyResult.uri };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[social-post] Bluesky error:", message);
    results.bluesky = { ok: false, error: message };
  }

  // Mastodon
  try {
    const mastoResult = await publishMastodonPost(post.text, post.link);
    results.mastodon = { ok: true, id: mastoResult.id, url: mastoResult.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[social-post] Mastodon error:", message);
    results.mastodon = { ok: false, error: message };
  }

  const anyOk = (results.bluesky as { ok: boolean }).ok || (results.mastodon as { ok: boolean }).ok;
  return NextResponse.json({ ok: anyOk, ...results }, { status: anyOk ? 200 : 500 });
}
