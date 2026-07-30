import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import EtsyFeeCalc from "./EtsyFeeCalc";
import { ETSY_LAST_REVIEWED } from "@/lib/fees/etsyRates";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator — Listing, Transaction & Processing Fees | CalcFuel",
  description:
    "Free Etsy fee calculator. Estimate listing, transaction, payment processing, and Offsite Ads fees. See net profit and margin after cost of goods — instant results.",
  alternates: { canonical: "/calculators/etsy-fee-calculator" },
};

const relatedTools = [
  { title: "Amazon FBA Fee Calculator", slug: "amazon-fba-fee-calculator", description: "Project referral fees, FBA fulfillment, and per-unit profit." },
  { title: "eBay Fee Calculator", slug: "ebay-fee-calculator", description: "Calculate final value fees, per-order fees, and take-home profit." },
  { title: "PayPal Fee Calculator", slug: "paypal-fee-calculator", description: "AU, US, and UK commercial rates — domestic and international." },
  { title: "Stripe Fee Calculator", slug: "stripe-fee-calculator", description: "Calculate Stripe processing fees and net payout amounts." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Convert fee-adjusted revenue into gross and net profit margins." },
  { title: "Markup vs Margin Calculator", slug: "markup-vs-margin-calculator", description: "Price from cost using markup or target margin." },
];

const faqs = [
  {
    question: "What fees does Etsy charge sellers?",
    answer:
      "Etsy charges a listing fee per item listed, a transaction fee on the total sale amount (including shipping and gift wrap), payment processing fees on each order, and optionally an Offsite Ads fee when a sale is attributed to Etsy’s external advertising programme. Rates vary slightly by seller country and payment method.",
  },
  {
    question: "Does Etsy charge transaction fees on shipping?",
    answer:
      "Yes. Etsy’s transaction fee applies to the item price, shipping amount you charge the buyer, and any gift wrap fees. This calculator includes all three in the transaction fee base so you can see the true cost of offering free or discounted shipping.",
  },
  {
    question: "What are Etsy Offsite Ads fees?",
    answer:
      "Offsite Ads is Etsy’s optional programme that promotes your listings on search engines and partner sites. When a buyer clicks an offsite ad and purchases within 30 days, Etsy charges 15% of the order total if your trailing 12-month sales are under USD $10,000, or 12% if sales exceed that threshold. You can opt out only after reaching the higher sales tier.",
  },
  {
    question: "How is Etsy payment processing calculated?",
    answer:
      "Payment processing is a percentage of the order total plus a fixed fee per transaction. In the United States this is typically around 3% + $0.25; Australia and the UK often see slightly higher percentages. The exact rate depends on your country and whether the buyer pays through Etsy Payments.",
  },
  {
    question: "Is the listing fee charged once or per sale?",
    answer:
      "Etsy charges a listing fee when you publish or renew a listing (every four months). When an item sells, the listing auto-renews and incurs another listing fee. For planning purposes, many sellers model one listing fee per unit sold — which is what this calculator does when you multiply listing fee by quantity.",
  },
  {
    question: "Can I edit the fee rates in this calculator?",
    answer:
      "Yes. Select a country preset to load typical rates, then adjust listing fee, transaction percentage, processing percentage, and processing fixed fee to match your Etsy seller dashboard. Fee schedules change — always confirm live rates before you price a product.",
  },
  {
    question: "How do I calculate profit margin after Etsy fees?",
    answer:
      "Subtract total Etsy fees from gross revenue (item + shipping + gift wrap × quantity), then subtract your cost of goods. Divide the result by gross revenue and multiply by 100 for margin percentage. This calculator performs all steps automatically as you type.",
  },
];

const howToSteps = [
  { name: "Choose your country preset", text: "Select United States, Australia, UK, or Canada to load typical Etsy fee rates." },
  { name: "Adjust fee rates if needed", text: "Edit listing, transaction, and processing fees to match your seller dashboard." },
  { name: "Enter sale details", text: "Add item price, shipping charged, gift wrap, quantity, and cost of goods." },
  { name: "Toggle Offsite Ads", text: "Enable Offsite Ads and set the rate if the sale may be attributed to external ads." },
  { name: "Read your breakdown", text: "Review line-item fees, net after fees, profit after COGS, and margin percentage instantly." },
];

export default function EtsyFeeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Etsy Fee Calculator"
        description="Free Etsy fee calculator. Estimate listing, transaction, payment processing, and Offsite Ads fees plus net profit and margin."
        url="https://calcfuel.com/calculators/etsy-fee-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Marketplace Fee Calculators", url: "https://calcfuel.com/calculators/marketplace-fees" },
          { name: "Etsy Fee Calculator", url: "https://calcfuel.com/calculators/etsy-fee-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/marketplace-fees" className="hover:text-orange-500">Marketplace Fees</Link>
        <span className="mx-2">/</span>
        <span>Etsy Fee Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Etsy Fee Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Estimate Etsy listing, transaction, payment processing, and Offsite Ads fees in one place. Enter your sale price, shipping, and cost of goods to see net profit and margin — free, instant, and no sign-up required.
      </p>
      <CalcReviewedBy lastUpdated={`July 2026 (rates ${ETSY_LAST_REVIEWED})`} />
      <EtsyFeeCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Understanding Etsy Seller Fees</h2>
        <p>
          Selling on Etsy looks straightforward until you stack every fee against a single order. A handmade mug listed at $28 might feel profitable — until you account for the listing renewal, the 6.5% transaction fee on shipping, payment processing, and a possible Offsite Ads charge on the full order total. Etsy sellers who price without modelling fees routinely undercharge by 15–25%, especially when they offer &quot;free shipping&quot; bundled into the item price.
        </p>
        <p>
          This Etsy fee calculator breaks down each charge line by line so you can see gross revenue, total platform fees, net after fees, and profit after cost of goods (COGS). All rates are editable: start from a country preset (US, Australia, UK, or Canada), then tweak numbers to match your Etsy Payments dashboard. Results update instantly as you type.
        </p>

        <h2>Etsy Fee Components Explained</h2>
        <h3>Listing Fee</h3>
        <p>
          Etsy charges a small fee every time you publish a listing and again when it auto-renews after a sale or after four months. For most sellers this is USD $0.20 per listing (or the local equivalent). If you sell multiple units from one listing, you may only pay one renewal fee per sale event — but modelling listing fee × quantity is a conservative approach that helps you avoid surprises on multi-unit orders.
        </p>
        <h3>Transaction Fee</h3>
        <p>
          The transaction fee is currently 6.5% of your total order revenue: item price, shipping charged to the buyer, and gift wrap. This is the fee most sellers underestimate. Charging $6 shipping on a $24 item means Etsy takes 6.5% of $30, not just $24. If you absorb shipping into the item price instead, the transaction fee still applies to that higher item price — there is no loophole.
        </p>
        <h3>Payment Processing</h3>
        <p>
          When buyers pay through Etsy Payments, Etsy also deducts card-processing costs: a percentage of the order plus a fixed amount per transaction. US sellers typically see around 3% + $0.25; Australian and UK sellers often pay slightly higher percentages. Unlike the transaction fee, processing includes a per-order fixed component — so very low-value orders feel the fixed fee disproportionately.
        </p>
        <h3>Offsite Ads</h3>
        <p>
          Etsy&apos;s Offsite Ads programme promotes listings on Google, Facebook, Pinterest, and partner sites. If a buyer clicks an offsite ad and purchases within 30 days, Etsy charges 15% of the order total when your trailing 12-month sales are under $10,000 USD, or 12% above that threshold. This fee stacks on top of transaction and processing fees — a $50 sale with Offsite Ads at 15% can cost $7.50 before any other charges. Toggle it in the calculator to see the impact.
        </p>

        <h2>Worked Example</h2>
        <p>
          Suppose you sell two handmade candles at $22 each ($44 item total), charge $8 shipping, and your COGS is $18. Using US preset rates (6.5% transaction, 3% + $0.25 processing, $0.20 listing):
        </p>
        <ul>
          <li><strong>Gross revenue:</strong> ($22 × 2) + $8 = $52</li>
          <li><strong>Listing fees:</strong> $0.20 × 2 = $0.40</li>
          <li><strong>Transaction fee:</strong> $52 × 6.5% = $3.38</li>
          <li><strong>Processing:</strong> ($52 × 3%) + $0.25 = $1.81</li>
          <li><strong>Total fees (no Offsite Ads):</strong> $5.59</li>
          <li><strong>Net after fees:</strong> $46.41</li>
          <li><strong>Profit after COGS:</strong> $46.41 − $18 = $28.41</li>
          <li><strong>Margin:</strong> $28.41 ÷ $52 = 54.6%</li>
        </ul>
        <p>
          Add Offsite Ads at 15% and you lose another $7.80, dropping profit to $20.61 and margin to 39.6%. That single toggle can determine whether a product line is worth scaling.
        </p>

        <h2>Pricing Strategy for Etsy Sellers</h2>
        <p>
          The most reliable approach is to work backwards from your target margin. Decide the profit you need per order after COGS and all fees, then solve for the selling price. Use the editable rate fields to stress-test scenarios: what if Etsy raises transaction fees? What if you switch from paid shipping to free shipping? What if Offsite Ads attributes 30% of your sales?
        </p>
        <p>
          Pair this tool with the <Link href="/calculators/profit-margin-calculator">Profit Margin Calculator</Link> and <Link href="/calculators/markup-vs-margin-calculator">Markup vs Margin Calculator</Link> to set list prices that still hit your targets after Etsy&apos;s cut. For payment fees on sales outside Etsy, see the <Link href="/calculators/paypal-fee-calculator">PayPal Fee Calculator</Link> and <Link href="/calculators/stripe-fee-calculator">Stripe Fee Calculator</Link>.
        </p>

        <h2>Common Etsy Fee Mistakes</h2>
        <p>
          <strong>Ignoring shipping in fee calculations:</strong> Transaction fees apply to shipping income. &quot;Free shipping&quot; does not mean fee-free shipping — you still pay 6.5% on whatever shipping value is embedded in your price.
        </p>
        <p>
          <strong>Forgetting listing renewals:</strong> Each sale triggers a listing renewal fee. Budget for it per unit, especially on high-volume SKUs.
        </p>
        <p>
          <strong>Not tracking Offsite Ads attribution:</strong> Even if you never opted in consciously, Etsy may enrol you once you pass sales thresholds. Model the 12–15% charge on affected orders.
        </p>
        <p>
          <strong>Using stale rates:</strong> Etsy updates fee schedules periodically. Confirm current rates in your seller dashboard — this calculator&apos;s presets are planning estimates reviewed {ETSY_LAST_REVIEWED}.
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
        <strong>Disclaimer:</strong> Etsy fee schedules change by country, category, and programme enrolment. This calculator provides planning estimates only and should not be treated as tax or financial advice. Confirm live rates in your Etsy Seller Dashboard before listing or pricing products.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
