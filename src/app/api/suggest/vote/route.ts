import { NextResponse } from "next/server";
import { hashEmail, isValidEmail } from "@/lib/suggest/email";
import { getRedis, upvoteSuggestion } from "@/lib/suggest/redis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, website } = body as Record<string, unknown>;

    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ ok: true, votes: 0 });
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Suggestion id required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const redis = getRedis();
    const result = await upvoteSuggestion(redis, id, hashEmail(email));

    if ("notFound" in result) {
      return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
    }

    if ("alreadyVoted" in result) {
      return NextResponse.json({ error: "Already voted" }, { status: 409 });
    }

    return NextResponse.json({ ok: true, votes: result.votes });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[suggest/vote] Error:", message);
    return NextResponse.json({ error: "Unable to record vote" }, { status: 500 });
  }
}
