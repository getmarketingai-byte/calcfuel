import { NextResponse } from "next/server";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!;
const MAILERLITE_GROUP_ID = "185339792113796232";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const body: Record<string, unknown> = {
      email: email.trim().toLowerCase(),
      groups: [MAILERLITE_GROUP_ID],
    };
    if (name && typeof name === "string" && name.trim()) {
      body.fields = { name: name.trim() };
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[subscribe] MailerLite error:", res.status, err);
      // 409 = already subscribed, treat as success
      if (res.status === 409) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[subscribe] Error:", message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
