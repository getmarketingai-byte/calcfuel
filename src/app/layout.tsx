import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "CalcFuel — Free Online Calculators",
    template: "%s | CalcFuel",
  },
  description:
    "Free online calculators for finance, marketing, email, social media, and more. Get instant answers with no sign-up required.",
  metadataBase: new URL("https://calcfuel.com"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    siteName: "CalcFuel",
    images: [
      {
        url: "/images/social-card.png",
        width: 1200,
        height: 630,
        alt: "CalcFuel - Free Online Calculators",
      },
    ],
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
              "url": "https://calcfuel.com",
              "description": "Free online calculators for marketing, finance, email, and social media. No sign-up required.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://calcfuel.com/?q={search_term_string}",
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
              "url": "https://calcfuel.com",
              "description": "Free online calculators for marketing, finance, and business decisions.",
            }),
          }}
        />
        {/* Google AdSense account meta tag (required for verification) */}
        <meta name="google-adsense-account" content="ca-pub-7076137753154472" />
        {/* Google AdSense — raw script tag avoids Next.js data-nscript attribute rejection */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7076137753154472"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Google Analytics — placed in body so Next.js App Router executes them client-side */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2Q8MGZ47BC"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2Q8MGZ47BC');
            `,
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
