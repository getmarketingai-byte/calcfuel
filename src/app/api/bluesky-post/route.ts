import { NextResponse } from "next/server";
import { getCurrentPost, getCurrentPostIndex, POSTS } from "@/lib/bluesky-posts";

const BSKY_IDENTIFIER = "getmarketingai.bsky.social";
const BSKY_APP_PASSWORD = "i26z-tefz-zr3p-fo2i";
const BSKY_PDS = "https://bsky.social";

// Cron secret to prevent unauthorized calls
const CRON_SECRET = process.env.CRON_SECRET;

interface BskySession {
  accessJwt: string;
  did: string;
}

async function createSession(): Promise<BskySession> {
  const res = await fetch(`${BSKY_PDS}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: BSKY_IDENTIFIER,
      password: BSKY_APP_PASSWORD,
    }),
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
  // Encode text to bytes to get correct byte offsets
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const fullText = text;

  // Find the link URL in the text if it appears directly, otherwise
  // find the last line which is typically the URL
  let linkText = link;
  let startByte = -1;
  let endByte = -1;

  // Check if the link appears verbatim in the text
  const linkIndex = fullText.indexOf(link);
  if (linkIndex !== -1) {
    const before = encoder.encode(fullText.slice(0, linkIndex));
    startByte = before.length;
    endByte = startByte + encoder.encode(link).length;
    linkText = link;
  } else {
    // Use "Details 👇" or the last URL-like token as anchor
    // For posts that don't embed the URL in text, add it as a facet
    // pointing at the end of the text (last token or "Details 👇")
    const detailsMatch = fullText.indexOf("Details 👇");
    if (detailsMatch !== -1) {
      const before = encoder.encode(fullText.slice(0, detailsMatch));
      startByte = before.length;
      endByte = startByte + encoder.encode("Details 👇").length;
    } else {
      // Link not in text — skip facet (still a valid post)
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

async function publishPost(session: BskySession, text: string, link?: string) {
  const now = new Date().toISOString();
  const record: Record<string, unknown> = {
    $type: "app.bsky.feed.post",
    text,
    createdAt: now,
    langs: ["en"],
  };

  if (link) {
    const facets = buildFacets(text, link);
    if (facets.length > 0) {
      record.facets = facets;
    }
    // Add external embed for link card
    record.embed = {
      $type: "app.bsky.embed.external",
      external: {
        uri: link,
        title: "",
        description: "",
      },
    };
  }

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
    const text = await res.text();
    throw new Error(`Bluesky post failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function GET(request: Request) {
  // Verify cron secret (Vercel sends it as Authorization header)
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = getCurrentPost();
    const postIndex = getCurrentPostIndex();

    const session = await createSession();
    const result = await publishPost(session, post.text, post.link);

    return NextResponse.json({
      ok: true,
      postIndex,
      totalPosts: POSTS.length,
      uri: result.uri,
      text: post.text.slice(0, 80) + "...",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[bluesky-post] Error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
