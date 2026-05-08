import type { Metadata } from "next";

export const SITE_URL = "https://calcfuel.com";

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) {
    return `${SITE_URL}/${path}`;
  }
  return `${SITE_URL}${path}`;
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
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | CalcFuel`,
      description,
      url,
      type,
      images: [
        {
          url: absoluteUrl("/social-card.svg"),
          width: 1200,
          height: 630,
          alt: "CalcFuel",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CalcFuel`,
      description,
      images: [absoluteUrl("/social-card.svg")],
    },
  };
}
