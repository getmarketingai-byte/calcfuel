import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Marketplace Fee Calculators — Etsy, Amazon FBA, eBay, PayPal & Stripe",
  description:
    "Free marketplace and payment fee calculators: Etsy, Amazon FBA, eBay, PayPal, and Stripe. See take-home profit after fees — no sign-up.",
  path: "/calculators/marketplace-fees",
});

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://calcfuel.com" },
    { "@type": "ListItem", position: 2, name: "Calculators", item: "https://calcfuel.com/calculators" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Marketplace Fee Calculators",
      item: "https://calcfuel.com/calculators/marketplace-fees",
    },
  ],
};

const tools = [
  {
    title: "Etsy Fee Calculator",
    slug: "etsy-fee-calculator",
    description: "Estimate listing, transaction, payment processing, and Offsite Ads fees — plus net profit.",
  },
  {
    title: "Amazon FBA Fee Calculator",
    slug: "amazon-fba-fee-calculator",
    description: "Project referral fees, simplified FBA fulfillment, and per-unit profit after costs.",
  },
  {
    title: "eBay Fee Calculator",
    slug: "ebay-fee-calculator",
    description: "Calculate final value fees, per-order fees, and take-home after cost of goods.",
  },
  {
    title: "PayPal Fee Calculator",
    slug: "paypal-fee-calculator",
    description: "AU, US, and UK commercial rates — domestic, international, and reverse gross-up.",
  },
  {
    title: "Stripe Fee Calculator",
    slug: "stripe-fee-calculator",
    description: "Calculate Stripe processing fees, net payout, and the charge amount needed to net a target.",
  },
  {
    title: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    description: "Convert fee-adjusted revenue into gross and net profit margins.",
  },
  {
    title: "Markup vs Margin Calculator",
    slug: "markup-vs-margin-calculator",
    description: "Price from cost using markup or target margin — without confusing the two.",
  },
  {
    title: "Average Order Value Calculator",
    slug: "average-order-value-calculator",
    description: "Track AOV so marketplace fee % hits are easier to model.",
  },
];

export default function MarketplaceFeesHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span>Marketplace Fee Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Marketplace Fee Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Free calculators to estimate what Etsy, Amazon, eBay, PayPal, and Stripe keep — and what you actually take home.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950 hover:shadow-lg hover:border-orange-400 transition-all group"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>
      <article className="prose max-w-none mt-4">
        <h2>Why Marketplace Fee Calculators Matter</h2>
        <p>
          Listing a product at a price that looks profitable before fees is one of the most common seller mistakes. Etsy
          transaction fees apply to shipping, Amazon referral percentages vary by category, and payment processors add a
          percentage plus a fixed fee on every charge. These free marketplace fee calculators turn sticker price into
          take-home so you can price with confidence.
        </p>
        <h2>Marketplace vs Payment Fees</h2>
        <p>
          Marketplace tools like the <a href="/calculators/etsy-fee-calculator">Etsy Fee Calculator</a>,{" "}
          <a href="/calculators/amazon-fba-fee-calculator">Amazon FBA Fee Calculator</a>, and{" "}
          <a href="/calculators/ebay-fee-calculator">eBay Fee Calculator</a> model platform take rates. Payment tools like
          the <a href="/calculators/paypal-fee-calculator">PayPal Fee Calculator</a> and{" "}
          <a href="/calculators/stripe-fee-calculator">Stripe Fee Calculator</a> model card and wallet processing — often
          stacked on top of marketplace fees when you sell on your own site.
        </p>
        <h2>Price From Margin, Not Guesswork</h2>
        <p>
          After you know the fee stack, use the <a href="/calculators/markup-vs-margin-calculator">Markup vs Margin Calculator</a>{" "}
          and <a href="/calculators/profit-margin-calculator">Profit Margin Calculator</a> to set a selling price that
          still hits your target margin after costs and fees.
        </p>
        <p>
          <em>
            Disclaimer: Fee schedules change. These calculators provide planning estimates only — confirm live rates in
            each platform&apos;s seller or merchant dashboard before you list or invoice.
          </em>
        </p>
      </article>
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
