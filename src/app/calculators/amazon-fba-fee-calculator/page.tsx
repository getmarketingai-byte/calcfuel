import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import { AMAZON_FBA_LAST_REVIEWED } from "@/lib/fees/amazonFbaRates";
import AmazonFbaFeeCalc from "./AmazonFbaFeeCalc";

export const metadata: Metadata = {
  title: "Amazon FBA Fee Calculator — Referral, Fulfillment & Profit | CalcFuel",
  description:
    "Free Amazon FBA fee calculator. Estimate referral fees, FBA fulfillment, storage, PPC, and per-unit profit for US, AU, and UK marketplaces. Simplified v1 — instant results.",
  alternates: { canonical: "/calculators/amazon-fba-fee-calculator" },
};

const relatedTools = [
  { title: "Etsy Fee Calculator", slug: "etsy-fee-calculator", description: "Estimate listing, transaction, and payment processing fees on Etsy." },
  { title: "eBay Fee Calculator", slug: "ebay-fee-calculator", description: "Calculate final value fees and take-home after cost of goods." },
  { title: "PayPal Fee Calculator", slug: "paypal-fee-calculator", description: "AU, US, and UK commercial rates — domestic and international." },
  { title: "Stripe Fee Calculator", slug: "stripe-fee-calculator", description: "Calculate Stripe processing fees and net payout amounts." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross profit and margin percentage from revenue and COGS." },
  { title: "Markup vs Margin Calculator", slug: "markup-vs-margin-calculator", description: "Price from cost using markup or target margin — without confusing the two." },
];

const faqs = [
  {
    question: "What fees does Amazon FBA charge sellers?",
    answer:
      "Amazon FBA sellers typically pay a referral fee (a percentage of the sale price, varying by category), an FBA fulfillment fee (based on product size and weight tier), monthly inventory storage fees, and optional costs like PPC advertising. This calculator models referral, fulfillment, storage, and ad spend per unit — a simplified view before you drill into Seller Central's full fee preview.",
  },
  {
    question: "How accurate is this Amazon FBA fee calculator?",
    answer:
      "This is a simplified v1 planning tool. It uses category referral presets and flat fulfillment fee estimates rather than Amazon's full size-tier tables, which change by marketplace, season, and product dimensions. Use it to sanity-check unit economics and compare scenarios — then confirm exact fees in Amazon Seller Central's Revenue Calculator or fee preview before listing.",
  },
  {
    question: "What is the Amazon referral fee?",
    answer:
      "The referral fee is Amazon's commission on each sale, expressed as a percentage of the item price (excluding tax in most cases). Most categories on Amazon.com are 15%, but electronics, computers, and grocery have lower rates. Clothing and accessories can be higher. Select a category preset above or enter your exact referral percentage from Seller Central.",
  },
  {
    question: "How do I calculate profit per unit on Amazon FBA?",
    answer:
      "Profit per unit = Sale price − Referral fee − FBA fulfillment fee − Storage (if applicable) − Ad spend per unit − Cost of goods sold (COGS). Margin % = (Profit ÷ Sale price) × 100. The calculator above does this instantly as you type.",
  },
  {
    question: "Should I include PPC ad spend in my FBA fee calculation?",
    answer:
      "Yes, if you run Sponsored Products or other Amazon ads. Many FBA sellers break even on organic sales but lose money once PPC is included. Enter your average ad spend per unit sold (total ad spend ÷ units sold) to see true per-unit profitability. If you are not advertising yet, leave it at zero and treat the result as a best-case margin.",
  },
  {
    question: "Does FBA fulfillment fee vary by product size?",
    answer:
      "Yes. Amazon charges different fulfillment fees for small standard, large standard, small oversize, and larger tiers — and rates differ between US, UK, and AU marketplaces. Peak-season storage and long-term storage surcharges also apply. This calculator uses indicative flat presets you can override with the exact fee from your Seller Central fee preview.",
  },
  {
    question: "How does Amazon FBA compare to FBM (Fulfilled by Merchant)?",
    answer:
      "With FBM you avoid FBA fulfillment and storage fees but still pay referral fees and handle shipping yourself. FBA gives Prime eligibility and outsourced logistics at a per-unit cost. Model both scenarios: use this calculator for FBA, then compare against your own pick-pack-ship cost plus referral fee only for FBM.",
  },
];

const howToSteps = [
  { name: "Select marketplace and category", text: "Choose your Amazon marketplace (US, AU, or UK) and a category preset to load the typical referral fee percentage." },
  { name: "Set fulfillment fee", text: "Pick a size-tier preset or paste the exact FBA fulfillment fee from Seller Central." },
  { name: "Enter sale price and COGS", text: "Type your sale price per unit and cost of goods sold. Add units sold to see totals." },
  { name: "Add optional costs", text: "Include monthly storage per unit and ad spend per unit if applicable." },
  { name: "Review profit and margin", text: "Read per-unit profit, margin percentage, and total fees instantly — no button to press." },
];

export default function AmazonFbaFeeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Amazon FBA Fee Calculator"
        description="Free Amazon FBA fee calculator. Estimate referral fees, fulfillment, storage, ads, and per-unit profit for US, AU, and UK marketplaces."
        url="https://calcfuel.com/calculators/amazon-fba-fee-calculator"
        datePublished="2026-07-30"
        dateModified={AMAZON_FBA_LAST_REVIEWED}
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Marketplace Fee Calculators", url: "https://calcfuel.com/calculators/marketplace-fees" },
          { name: "Amazon FBA Fee Calculator", url: "https://calcfuel.com/calculators/amazon-fba-fee-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/marketplace-fees" className="hover:text-orange-500">Marketplace Fee Calculators</Link>
        <span className="mx-2">/</span>
        <span>Amazon FBA Fee Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Amazon FBA Fee Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Estimate Amazon FBA referral fees, fulfillment costs, storage, PPC, and per-unit profit before you list. Select your marketplace, category, and size tier — then see margin instantly. Simplified v1 for planning; confirm exact fees in Seller Central.
      </p>
      <CalcReviewedBy lastUpdated="July 2026" />
      <AmazonFbaFeeCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Understanding Amazon FBA Fees</h2>
        <p>
          Selling on Amazon through Fulfillment by Amazon (FBA) means Amazon stores, picks, packs, and ships your products — and charges you for the privilege. Before you source inventory or set prices, you need a clear picture of what Amazon takes from each sale. A $30 item with $12 in COGS is not automatically profitable: a 15% referral fee ($4.50), a $3.22 fulfillment fee, and $2 in PPC can leave you with barely $8 gross margin before returns and inbound shipping.
        </p>
        <p>
          This calculator gives you a fast, simplified view of Amazon FBA unit economics. It combines referral fee (category-based percentage), FBA fulfillment fee (flat preset by size tier), optional monthly storage per unit, optional ad spend per unit, and your cost of goods sold. The output shows referral, fulfillment, storage, and ad costs separately, total Amazon fees, net revenue after fees, profit per unit, and margin percentage. Multiply by units sold to see batch totals.
        </p>
        <p>
          <strong>Important:</strong> Amazon&apos;s actual fee tables are more granular than this v1 tool. Fulfillment fees depend on exact dimensions, weight, and marketplace; referral fees have category-specific rules and minimums; storage varies by month and inventory age. Use this calculator for planning and scenario comparison — then validate with Amazon&apos;s Revenue Calculator in Seller Central before committing to inventory.
        </p>

        <h2>Amazon Referral Fees by Category</h2>
        <p>
          The referral fee is Amazon&apos;s sales commission. It is calculated as a percentage of the total sale price (typically the item price the customer pays, before shipping in many cases). Rates vary by category:
        </p>
        <ul>
          <li><strong>Most categories:</strong> 15% on Amazon.com — the default for many private-label and general merchandise SKUs.</li>
          <li><strong>Consumer electronics and computers:</strong> Often 8% — but check subcategory rules; some accessories are 15%.</li>
          <li><strong>Grocery and gourmet:</strong> Tiered rates; blended planning often uses 8–15%.</li>
          <li><strong>Clothing and accessories:</strong> Frequently 17% on Amazon.com.</li>
        </ul>
        <p>
          Referral fees also have per-item minimums (commonly $0.30 on US marketplace). On very low-priced items, the minimum can mean an effective rate higher than the category percentage. This calculator applies the percentage to your entered sale price — for items under a few dollars, check Seller Central for minimum fee impact.
        </p>

        <h2>FBA Fulfillment Fees Explained</h2>
        <p>
          FBA fulfillment fees cover picking, packing, shipping to the customer, and customer service for that order. Amazon groups products into size tiers: small standard, large standard, small oversize, medium oversize, and so on. Each tier has a base fee that increases with weight. US small standard items (under 16 oz, within dimension limits) might pay around $3.22; large standard items cost more; oversize items jump significantly.
        </p>
        <p>
          Fees also differ between marketplaces. A product fulfilled from Amazon.com.au incurs AUD-denominated fees at AU rates. UK sellers on Amazon.co.uk see GBP fees. Select your marketplace in the calculator and override the fulfillment preset with the exact figure from your fee preview if you have it.
        </p>

        <h2>Storage, PPC, and Hidden Costs</h2>
        <p>
          Monthly inventory storage fees are charged per cubic foot (or cubic metre) per month, with higher rates in Q4 (October–December) in the US. Long-term storage fees apply to inventory aged 271+ days. For quick planning, enter an average storage cost per unit per month if you know it — otherwise leave storage at zero and add it later when you have inventory reports.
        </p>
        <p>
          Pay-per-click (PPC) advertising is not an Amazon platform fee, but it behaves like one for unit economics. If you spend $500 on Sponsored Products and sell 250 units, your ad cost per unit is $2.00 — enter that in the ad spend field. Many sellers discover their organic margin looks healthy until PPC is included.
        </p>
        <p>
          Other costs this calculator does not model: inbound shipping to Amazon fulfilment centres, removal fees, returns processing, subscription ($39.99/month Professional plan in the US), and currency conversion. Build those into COGS or run separate spreadsheets for full P&amp;L.
        </p>

        <h2>Worked Example</h2>
        <p>
          You sell a kitchen gadget for <strong>$29.99</strong> on Amazon.com in a 15% referral category. COGS is <strong>$8.00</strong>. FBA small standard fulfillment is <strong>$3.22</strong>. You allocate <strong>$0.40</strong> storage and <strong>$2.50</strong> PPC per unit.
        </p>
        <ul>
          <li>Referral fee: $29.99 × 15% = <strong>$4.50</strong></li>
          <li>Fulfillment: <strong>$3.22</strong></li>
          <li>Storage: <strong>$0.40</strong></li>
          <li>PPC: <strong>$2.50</strong></li>
          <li>Total Amazon-related fees: <strong>$10.62</strong></li>
          <li>Net after fees: $29.99 − $10.62 = <strong>$19.37</strong></li>
          <li>Profit: $19.37 − $8.00 COGS = <strong>$11.37</strong></li>
          <li>Margin: $11.37 ÷ $29.99 = <strong>37.9%</strong></li>
        </ul>
        <p>
          At 500 units per month, that is $5,685 profit before fixed overhead — but one return rate spike or fee increase can compress margin fast. Model best, base, and worst cases by adjusting referral %, fulfillment, and ad spend sliders.
        </p>

        <h2>FBA vs Other Marketplaces</h2>
        <p>
          Amazon FBA fees are often higher than Etsy or eBay for comparable categories, but FBA buys you Prime badge exposure and outsourced logistics. Compare using our{" "}
          <Link href="/calculators/etsy-fee-calculator">Etsy Fee Calculator</Link>,{" "}
          <Link href="/calculators/ebay-fee-calculator">eBay Fee Calculator</Link>, and{" "}
          <Link href="/calculators/profit-margin-calculator">Profit Margin Calculator</Link> to see which channel fits your product economics. Payment processing on off-Amazon sales is modelled in our{" "}
          <Link href="/calculators/paypal-fee-calculator">PayPal</Link> and{" "}
          <Link href="/calculators/stripe-fee-calculator">Stripe</Link> calculators.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> This calculator provides simplified estimates only. Amazon fee schedules change frequently and vary by product dimensions, marketplace, and programme enrolment. Always confirm fees in Amazon Seller Central before making inventory or pricing decisions.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
