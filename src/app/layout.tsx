import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleCmp from "@/components/GoogleCmp";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import { OPERATOR_NAME, OPERATOR_URL } from "@/lib/editorial";
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-7076137753154472";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-2Q8MGZ47BC";

export const metadata: Metadata = {
  title: {
    default: "CalcFuel — Transport & Trip Cost Decisions",
    template: "%s | CalcFuel",
  },
  description:
    "Make better real-world transport and trip-cost decisions. Calculate fuel, range, time and operating costs for boats, towing, vehicles and trips.",
  metadataBase: new URL(SITE_URL),
  // Google's favicon documentation asks for a square icon larger than 48x48 and does
  // not list SVG among supported formats, so a real PNG leads. The SVG stays as an
  // additional hint for browsers that prefer it. apple-touch-icon must be a PNG —
  // iOS does not render SVG there.
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  robots: {
    index: true,
    follow: true,
    // Duplicated onto the generic `robots` tag as well as `googlebot`: Bing reads the
    // generic one and ignores the Google-specific tag.
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "CalcFuel",
    url: SITE_URL,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcFuel — Transport & Trip Cost Decisions",
    description:
      "Calculate fuel, range, time and operating costs for boats, towing, vehicles and trips.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
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
              "inLanguage": "en-AU",
              "description": "Decision tools for real-world transport and trip costs — fuel, range, time and operating costs.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${SITE_URL}/calculators?q={search_term_string}`,
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
              "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/icon-192.png`,
                "width": 192,
                "height": 192,
              },
              "areaServed": { "@type": "Country", "name": "Australia" },
              "knowsLanguage": "en-AU",
              "parentOrganization": { "@type": "Organization", "name": OPERATOR_NAME, "url": OPERATOR_URL },
              "description": "Decision tools for real-world transport and trip costs.",
              "email": CONTACT_EMAIL,
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": CONTACT_EMAIL,
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
        <main id="main-content" className="flex-1 pb-12">{children}</main>
        <Footer />
        <GoogleCmp />
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
