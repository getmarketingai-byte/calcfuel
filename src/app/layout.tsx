import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://calcfuel.com";
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-7076137753154472";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-2Q8MGZ47BC";

export const metadata: Metadata = {
  title: {
    default: "CalcFuel — Free Online Calculators",
    template: "%s | CalcFuel",
  },
  description:
    "Free online calculators for finance, marketing, email, social media, and more. Get instant answers with no sign-up required.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  openGraph: {
    type: "website",
    siteName: "CalcFuel",
    url: SITE_URL,
    images: [
      {
        url: "/social-card.svg",
        width: 1200,
        height: 630,
        alt: "CalcFuel - Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcFuel — Free Online Calculators",
    description:
      "Free online calculators for finance, marketing, email, social media, and more.",
    images: ["/social-card.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CalcFuel",
              "url": SITE_URL,
              "description": "Free online calculators for marketing, finance, email, and social media. No sign-up required.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Schema.org JSON-LD — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CalcFuel",
              "url": SITE_URL,
              "logo": `${SITE_URL}/logo.svg`,
              "description": "Free online calculators for marketing, finance, and business decisions.",
              "email": "getmarketingai@gmail.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "getmarketingai@gmail.com",
                "url": `${SITE_URL}/contact`,
              },
            }),
          }}
        />
        {/* Google AdSense account meta tag (required for verification) */}
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        {/* Google AdSense — raw script tag avoids Next.js data-nscript attribute rejection */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        {/* Google Analytics — placed in body so Next.js App Router executes them client-side */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
