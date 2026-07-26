import { NextResponse } from "next/server";
import { hashEmail, isValidEmail } from "@/lib/suggest/email";
import { buildIssueBody, createSuggestionIssue } from "@/lib/suggest/github";
import {
  createSuggestion,
  getRedis,
  listSuggestions,
  setGithubIssueNumber,
} from "@/lib/suggest/redis";
import { SUGGEST_CATEGORIES } from "@/lib/suggest/types";

const MAX_TITLE = 120;
const MAX_DESCRIPTION = 2000;
const MAX_USE_CASE = 1000;

export async function GET() {
  try {
    const redis = getRedis();
    const suggestions = await listSuggestions(redis);
    return NextResponse.json({ suggestions });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[suggest] GET error:", message);
    return NextResponse.json({ error: "Unable to load suggestions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      title,
      description,
      category,
      useCase,
      website,
    } = body as Record<string, unknown>;

    // Honeypot — bots fill this; return success without creating anything
    if (typeof website === "string" && website.trim()) {
      return NextResponse.json({ ok: true });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Calculator name required" }, { status: 400 });
    }

    if (!description || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ error: "Description required" }, { status: 400 });
    }

    const cleanTitle = title.trim().slice(0, MAX_TITLE);
    const cleanDescription = description.trim().slice(0, MAX_DESCRIPTION);
    const cleanUseCase =
      typeof useCase === "string" ? useCase.trim().slice(0, MAX_USE_CASE) : "";
    const cleanCategory =
      typeof category === "string" &&
      (SUGGEST_CATEGORIES as readonly string[]).includes(category)
        ? category
        : "";

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const emailHash = hashEmail(email);
    const redis = getRedis();

    await createSuggestion(
      redis,
      {
        id,
        title: cleanTitle,
        description: cleanDescription,
        category: cleanCategory,
        useCase: cleanUseCase,
        createdAt,
      },
      emailHash
    );

    const issue = await createSuggestionIssue({
      title: `[Suggestion] ${cleanTitle}`,
      body: buildIssueBody({
        id,
        title: cleanTitle,
        description: cleanDescription,
        category: cleanCategory,
        useCase: cleanUseCase,
        createdAt,
      }),
    });

    if (issue) {
      await setGithubIssueNumber(redis, id, issue.number);
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[suggest] POST error:", message);
    return NextResponse.json({ error: "Unable to submit suggestion" }, { status: 500 });
  }
}
