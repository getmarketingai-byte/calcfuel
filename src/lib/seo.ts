import type { Metadata } from "next";

export const SITE_URL = "https://calcfuel.com";

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) {
    return `${SITE_URL}/${path}`;
  }
  return `${SITE_URL}${path}`;
}

/** Route segments that generate their own opengraph-image.tsx card. */
const OG_SEGMENTS = ["/calculators", "/blog", "/data"];

function ogCardFor(path: string): string {
  const segment = OG_SEGMENTS.find((s) => path === s || path.startsWith(`${s}/`));
  return absoluteUrl(`${segment ?? ""}/opengraph-image`);
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  // A page that declares `openGraph` inherits the opengraph-image file only from its
  // own segment, not from an ancestor — so the segment card is resolved explicitly.
  // The previous value was an SVG, which no major social platform renders.
  const card = ogCardFor(path);
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: "CalcFuel",
      locale: "en_AU",
      images: [{ url: card, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [card],
    },
  };
}
