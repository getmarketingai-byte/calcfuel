import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

const KEY = "4ffeb175-8807-4752-b2a9-2055590b5586";
const HOST = "calcfuel.com";
const BASE_URL = `https://${HOST}`;

/**
 * The URL list is derived from the sitemap rather than maintained by hand.
 *
 * The previous hardcoded list had drifted to ~80 entries, most of which now return
 * 410, so the daily cron was submitting dead URLs to IndexNow. Reading the sitemap
 * means the crawl surface we advertise and the one we ask to be indexed cannot
 * disagree.
 */
function urlList(): string[] {
  return sitemap().map((entry) => String(entry.url));
}

export async function GET() {
  return submitToIndexNow();
}

export async function POST() {
  return submitToIndexNow();
}

async function submitToIndexNow() {
  const urls = urlList();
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    status: res.status,
    ok: res.ok,
    urlsSubmitted: urls.length,
    message: res.ok
      ? `Submitted ${urls.length} URLs to IndexNow`
      : `IndexNow returned ${res.status}`,
  });
}
