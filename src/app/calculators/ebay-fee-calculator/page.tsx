import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import EbayFeeCalc from "./EbayFeeCalc";
import { EBAY_LAST_REVIEWED } from "@/lib/fees/ebayRates";

export const metadata: Metadata = {
  title: "eBay Fee Calculator — Final Value & Take-Home Profit | CalcFuel",
  description:
    "Free eBay fee calculator. Estimate final value fees, per-order fees, insertion fees, and promoted listing costs. See take-home profit and margin after COGS.",
  alternates: { canonical: "/calculators/ebay-fee-calculator" },
};

const relatedTools = [
  { title: "Etsy Fee Calculator", slug: "etsy-fee-calculator", description: "Estimate Etsy listing, transaction, and processing fees." },
  { title: "Amazon FBA Fee Calculator", slug: "amazon-fba-fee-calculator", description: "Project referral fees, FBA fulfillment, and per-unit profit." },
  { title: "PayPal Fee Calculator", slug: "paypal-fee-calculator", description: "AU, US, and UK commercial rates — domestic and international." },
  { title: "Stripe Fee Calculator", slug: "stripe-fee-calculator", description: "Calculate Stripe processing fees and net payout amounts." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Track AOV so marketplace fee impacts are easier to model." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover all your costs." },
];

const faqs = [
  {
    question: "What is eBay's final value fee?",
    answer:
      "The final value fee is eBay's commission on completed sales. It is calculated as a percentage of the total amount the buyer pays — typically including the item price and shipping you charge. The exact percentage depends on your category, seller account type, and country. Many general categories in Australia are around 12.9%; US sellers often see 13.25% with a per-order cap.",
  },
  {
    question: "Does eBay charge fees on shipping?",
    answer:
      "Yes, in most categories the final value fee applies to both the item sale price and the shipping amount charged to the buyer. If you offer free shipping, the fee still applies to the full item price since shipping is embedded in your listing price.",
  },
  {
    question: "What is the final value fee cap?",
    answer:
      "In some eBay marketplaces, the final value fee is capped at a maximum amount per order. For example, US sellers in many categories have a $750 cap per order. Set the cap to 0 in this calculator if your category or marketplace has no cap. When a cap applies, the calculator uses the lower of the calculated fee or the cap.",
  },
  {
    question: "What are eBay per-order and insertion fees?",
    answer:
      "Per-order fees are flat charges applied to each completed transaction on top of the percentage-based final value fee. Insertion fees are charged when you create a listing (many sellers receive free monthly listings). Both are editable in this calculator so you can match your seller account.",
  },
  {
    question: "How do Promoted Listings affect eBay fees?",
    answer:
      "Promoted Listings is eBay's advertising programme. You set an ad rate (percentage of the sale price) and pay only when a promoted listing results in a sale. Enter your ad rate in the optional promoted listings field to see how much of your take-home goes to advertising.",
  },
  {
    question: "How do I calculate take-home profit on eBay?",
    answer:
      "Subtract all eBay fees (final value, per-order, insertion, and promoted listing) from gross revenue (item price × quantity + shipping), then subtract your cost of goods. The result is your take-home profit. Margin percentage is take-home divided by gross revenue × 100.",
  },
  {
    question: "Can I use this calculator for different eBay countries?",
    answer:
      "Yes. Select a preset for Australia, United States, or United Kingdom to load typical rates, then edit every fee field to match your seller dashboard. eBay fee schedules vary by category — these presets are planning estimates, not legal quotes.",
  },
];

const howToSteps = [
  { name: "Select a marketplace preset", text: "Choose Australia, US, or UK to load typical final value fee rates and caps." },
  { name: "Adjust fee fields", text: "Edit final value percentage, cap, per-order fee, and insertion fee to match your account." },
  { name: "Enter sale details", text: "Add sale price, shipping charged to the buyer, quantity, and cost of goods." },
  { name: "Add promoted listing rate", text: "Optionally enter your Promoted Listings ad rate percentage." },
  { name: "Review your breakdown", text: "See line-item fees, take-home profit, and margin percentage instantly." },
];

export default function EbayFeeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="eBay Fee Calculator"
        description="Free eBay fee calculator. Estimate final value fees, per-order fees, insertion fees, and promoted listing costs plus take-home profit."
        url="https://calcfuel.com/calculators/ebay-fee-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Marketplace Fee Calculators", url: "https://calcfuel.com/calculators/marketplace-fees" },
          { name: "eBay Fee Calculator", url: "https://calcfuel.com/calculators/ebay-fee-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/marketplace-fees" className="hover:text-orange-500">Marketplace Fees</Link>
        <span className="mx-2">/</span>
        <span>eBay Fee Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        eBay Fee Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate eBay final value fees, per-order charges, and optional Promoted Listings costs. Enter your sale price, shipping, and COGS to see take-home profit and margin — instant results, no sign-up.
      </p>
      <CalcReviewedBy lastUpdated={`July 2026 (rates ${EBAY_LAST_REVIEWED})`} />
      <EbayFeeCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How eBay Seller Fees Work</h2>
        <p>
          eBay&apos;s fee structure centres on the final value fee — a percentage of what the buyer pays when your item sells. Unlike a flat marketplace subscription, eBay takes a slice of every transaction, and that slice often includes shipping. Sellers who list a $45 vintage jacket with $12 postage pay final value fees on $57, not just $45. Add per-order fees, insertion costs, and optional Promoted Listings advertising, and a sale that looked profitable on paper can leave thin margins or a loss.
        </p>
        <p>
          This eBay fee calculator models the full fee stack for a single order. Pick a country preset, adjust rates to match your seller dashboard, and enter your sale details. You get a line-item breakdown, total fees, take-home after COGS, and margin percentage — all updating instantly as you type.
        </p>

        <h2>Final Value Fee: The Core Charge</h2>
        <p>
          The final value fee is eBay&apos;s primary revenue from third-party sellers. The rate depends on your category, account type (private vs commercial), and marketplace. Australian sellers in most general categories currently pay around 12.9% with no per-order cap in many cases. US sellers often see 13.25% with a $750 cap per order — meaning very high-value sales hit a ceiling on the percentage fee.
        </p>
        <p>
          The fee base is the total amount of the sale: item price multiplied by quantity, plus shipping charged to the buyer. Sales tax collected and remitted by eBay may be excluded in some jurisdictions, but for planning purposes it is safest to model fees on the full buyer payment excluding tax you do not keep.
        </p>

        <h2>Per-Order and Insertion Fees</h2>
        <p>
          Beyond the percentage fee, eBay charges a small per-order fee on many transactions — typically around $0.30 in the US and Australia. This flat fee disproportionately affects low-value items: on a $8 sale, $0.30 is nearly 4% extra on top of the final value percentage.
        </p>
        <p>
          Insertion fees apply when you create a listing. Most sellers receive a monthly allowance of free listings (often 250+ on a basic store subscription). If you exceed free listings or use premium listing upgrades, add the insertion fee per listing. For a single-sale estimate, enter your actual insertion cost or leave it at zero if the listing was free.
        </p>

        <h2>Promoted Listings Advertising</h2>
        <p>
          eBay Promoted Listings lets you boost visibility by paying an ad rate — a percentage of the sale price — only when a buyer purchases through your promoted placement. A 5% ad rate on a $60 sale costs $3 in advertising on top of standard fees. High ad rates can make sense for competitive categories with strong conversion, but they compress margins fast. Use the optional promoted listings field to see the impact before you commit budget.
        </p>

        <h2>Worked Example</h2>
        <p>
          You sell three units of a phone case at $18 each ($54 item total), charge $6 shipping, and your COGS is $22. Using the Australia preset (12.9% final value, $0.30 per-order, no cap):
        </p>
        <ul>
          <li><strong>Gross revenue:</strong> $54 + $6 = $60</li>
          <li><strong>Final value fee:</strong> $60 × 12.9% = $7.74</li>
          <li><strong>Per-order fee:</strong> $0.30</li>
          <li><strong>Total fees:</strong> $8.04</li>
          <li><strong>Net before COGS:</strong> $51.96</li>
          <li><strong>Take-home:</strong> $51.96 − $22 = $29.96</li>
          <li><strong>Margin:</strong> 49.9%</li>
        </ul>
        <p>
          Add a 8% Promoted Listings rate and you pay another $4.32 ($54 × 8%), dropping take-home to $25.64 and margin to 42.7%.
        </p>

        <h2>eBay vs Other Marketplaces</h2>
        <p>
          Compared to <Link href="/calculators/etsy-fee-calculator">Etsy</Link>, eBay generally has a higher final value percentage but no separate payment processing line item when buyers pay through eBay-managed payments — processing is bundled into the final value fee structure. Compared to <Link href="/calculators/amazon-fba-fee-calculator">Amazon FBA</Link>, eBay gives you more control over shipping and storage costs but requires you to manage fulfilment yourself.
        </p>
        <p>
          For break-even analysis on volume, pair this calculator with the <Link href="/calculators/break-even-calculator">Break-Even Calculator</Link> and <Link href="/calculators/average-order-value-calculator">Average Order Value Calculator</Link>. For payment processing on sales outside eBay, see the <Link href="/calculators/paypal-fee-calculator">PayPal</Link> and <Link href="/calculators/stripe-fee-calculator">Stripe</Link> fee calculators.
        </p>

        <h2>Pricing Tips for eBay Sellers</h2>
        <p>
          <strong>Model fees before you list:</strong> Run every new SKU through the calculator at your intended price point. If margin falls below your target, raise price, reduce COGS, or reconsider the listing.
        </p>
        <p>
          <strong>Watch the per-order fee on cheap items:</strong> Sub-$15 products often need higher markup percentages just to cover flat fees.
        </p>
        <p>
          <strong>Test promoted ad rates:</strong> Start with a low ad rate and increase only when data shows improved sell-through that justifies the cost.
        </p>
        <p>
          <strong>Keep rates current:</strong> eBay updates fee schedules by category and region. Presets in this tool were last reviewed {EBAY_LAST_REVIEWED} — confirm live rates in your seller hub.
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
        <strong>Disclaimer:</strong> eBay fee schedules vary by category, seller level, and marketplace. This calculator provides planning estimates only and should not be treated as tax or financial advice. Confirm live rates in your eBay Seller Hub before listing or pricing products.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
