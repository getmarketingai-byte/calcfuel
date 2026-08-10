import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isGonePath, isHoldEquityPath } from "@/lib/portfolio";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isGonePath(path)) {
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>410 Gone — CalcFuel</title>
<meta name="robots" content="noindex"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1.5rem;line-height:1.5;color:#1f2937}
a{color:#ea580c}</style></head><body>
<h1>410 — Gone</h1>
<p>This page has been permanently removed. CalcFuel now focuses on transport and trip-cost decisions.</p>
<p><a href="/">Go to CalcFuel home</a> · <a href="/calculators">Browse calculators</a></p>
</body></html>`;
    return new NextResponse(html, {
      status: 410,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-robots-tag": "noindex, nofollow",
      },
    });
  }

  if (isHoldEquityPath(path)) {
    const response = NextResponse.next();
    response.headers.set("x-robots-tag", "noindex, follow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/calculators/:path*", "/blog/:path*", "/tools/:path*"],
};
