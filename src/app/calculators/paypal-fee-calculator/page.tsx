import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import PaypalFeeCalc from "./PaypalFeeCalc";

export const metadata: Metadata = {
  title: "PayPal Fee Calculator — Commercial Fees & Net Payout | CalcFuel",
  description:
    "Free PayPal fee calculator for Australia, US, and UK. Model domestic, international, and currency conversion fees. Forward and reverse gross-up modes.",
  alternates: { canonical: "/calculators/paypal-fee-calculator" },
};

const relatedTools = [
  { title: "Stripe Fee Calculator", slug: "stripe-fee-calculator", description: "Calculate Stripe processing fees and net payout." },
  { title: "Etsy Fee Calculator", slug: "etsy-fee-calculator", description: "Estimate Etsy listing, transaction, and payment fees." },
  { title: "eBay Fee Calculator", slug: "ebay-fee-calculator", description: "Calculate final value fees and take-home profit." },
  { title: "GST Calculator Australia", slug: "gst-calculator", description: "Add or remove 10% GST from any price." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross and net profit margins after fees." },
  { title: "Freelance Rate Calculator", slug: "freelance-rate-calculator", description: "Derive an hourly rate from income goals and expenses." },
];

const faqs = [
  {
    question: "How much does PayPal charge per transaction in Australia?",
    answer:
      "For standard Australian commercial transactions, PayPal typically charges 2.9% + $0.30 AUD per domestic payment. International payers incur an additional surcharge (around 1.0%), and currency conversion adds roughly 3.0% when funds are converted. Rates vary by account type and volume — confirm on PayPal's merchant fee page.",
  },
  {
    question: "How do I calculate PayPal fees?",
    answer:
      "PayPal Fee = (Payment Amount × Total Percentage ÷ 100) + Fixed Fee. Total percentage includes domestic rate plus any international surcharge and currency conversion fee toggled on. Net = Payment − Fee.",
  },
  {
    question: "How do I gross up a PayPal invoice to receive a target net amount?",
    answer:
      "Payment Needed = (Target Net + Fixed Fee) ÷ (1 − Total Percentage ÷ 100). Example: need $200 net with 2.9% + $0.30 domestic only: ($200 + $0.30) ÷ 0.971 ≈ $206.28.",
  },
  {
    question: "What is the PayPal international fee surcharge?",
    answer:
      "When the payer's PayPal account or card is registered outside your country, PayPal adds an international surcharge on top of the domestic percentage. In Australia this is typically an extra 1.0%. It stacks with currency conversion fees if the payment crosses currencies.",
  },
  {
    question: "Is PayPal or Stripe cheaper?",
    answer:
      "For domestic Australian online card payments, Stripe (1.75% + $0.30) is often lower than PayPal (2.9% + $0.30). PayPal can be competitive for micro-transactions in some regions or when buyers strongly prefer PayPal checkout. Model both with our Stripe and PayPal calculators using your typical transaction size and international mix.",
  },
  {
    question: "Are PayPal fees GST-inclusive in Australia?",
    answer:
      "PayPal's Australian commercial fees are generally quoted GST-inclusive for local merchants. GST-registered businesses may claim input tax credits on fees — retain PayPal statements and speak to your accountant.",
  },
  {
    question: "Do PayPal friends and family payments have fees?",
    answer:
      "Domestic friends and family transfers funded from a PayPal balance or linked bank account are usually free in Australia. International personal transfers and card-funded payments may incur fees. This calculator models commercial (goods and services) rates, not personal transfers.",
  },
];

const howToSteps = [
  { name: "Select region preset", text: "Choose Australia, United States, or United Kingdom to load typical commercial rates." },
  { name: "Adjust rates if needed", text: "Edit domestic percentage, fixed fee, international surcharge, and FX conversion rate to match your PayPal dashboard." },
  { name: "Toggle surcharges", text: "Enable international payer surcharge and/or currency conversion when applicable." },
  { name: "Choose forward or reverse", text: "Forward calculates fee from payment amount; reverse finds the payment needed to net your target." },
  { name: "Enter amount", text: "Type the payment or target net — fee, net payout, and gross amount update instantly." },
];

export default function PaypalFeeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="PayPal Fee Calculator"
        description="Free PayPal fee calculator. Model domestic, international, and currency conversion fees with forward and reverse gross-up modes."
        url="https://calcfuel.com/calculators/paypal-fee-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Marketplace Fee Calculators", url: "https://calcfuel.com/calculators/marketplace-fees" },
          { name: "PayPal Fee Calculator", url: "https://calcfuel.com/calculators/paypal-fee-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/marketplace-fees" className="hover:text-orange-500">
          Marketplace Fees
        </Link>
        <span className="mx-2">/</span>
        <span>PayPal Fee Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">PayPal Fee Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate PayPal commercial transaction fees for Australia, the US, and the UK. Model domestic rates,
        international surcharges, and currency conversion — forward or reverse gross-up.
      </p>
      <CalcReviewedBy />
      <PaypalFeeCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How PayPal Commercial Fees Work</h2>
        <p>
          PayPal remains one of the most recognised checkout options worldwide. Buyers trust the brand; sellers accept
          the trade-off of per-transaction fees on goods-and-services payments. Unlike a simple flat rate, PayPal&apos;s
          effective cost depends on where your customer is, which currency they pay in, and whether conversion happens
          inside PayPal — stacking domestic percentage, international surcharge, currency conversion, and a fixed fee
          per payment.
        </p>
        <p>
          This PayPal fee calculator lets you model those layers for Australian, American, and British merchants. Toggle
          international and FX fees to match real-world scenarios, then use forward mode to see net payout or reverse
          mode to invoice the gross amount that leaves you with your target after PayPal&apos;s cut.
        </p>

        <h2>Forward Fee Formula</h2>
        <ul>
          <li>
            <strong>Total %</strong> = Domestic % + International Surcharge % (if applicable) + Currency Conversion % (if
            applicable)
          </li>
          <li>
            <strong>PayPal Fee</strong> = (Payment × Total % ÷ 100) + Fixed Fee
          </li>
          <li>
            <strong>Net Received</strong> = Payment − PayPal Fee
          </li>
        </ul>
        <p>
          <strong>Example (AU domestic only):</strong> Customer pays $150 via PayPal. Fee = ($150 × 2.9%) + $0.30 = $4.35
          + $0.30 = <strong>$4.65</strong>. You receive <strong>$145.35</strong>.
        </p>
        <p>
          <strong>Example (AU + international + FX):</strong> Same $150 but payer is overseas with conversion. Total %
          ≈ 2.9% + 1.0% + 3.0% = 6.9%. Fee = ($150 × 6.9%) + $0.30 = $10.35 + $0.30 = <strong>$10.65</strong>. Net ={" "}
          <strong>$139.35</strong> — nearly $6 more than domestic-only.
        </p>

        <h2>Reverse Gross-Up Formula</h2>
        <p>When you need a specific net amount after all PayPal fees:</p>
        <ul>
          <li>
            <strong>Payment Required</strong> = (Target Net + Fixed Fee) ÷ (1 − Total % ÷ 100)
          </li>
        </ul>
        <p>
          Freelancers sending PayPal invoices, eBay sellers, and small businesses collecting deposits use gross-up to
          avoid absorbing fees on every job. The <Link href="/calculators/freelance-rate-calculator">Freelance Rate
          Calculator</Link> helps set hourly rates that still work after payment processing and tax.
        </p>

        <h2>International and Currency Conversion</h2>
        <p>
          PayPal&apos;s international surcharge applies when the payer&apos;s account or funding source is outside your
          country. Currency conversion fees apply when PayPal converts between currencies — either because the buyer pays
          in USD and you withdraw AUD, or because you hold balances in multiple currencies. These fees are easy to
          overlook when quoting fixed project prices to overseas clients.
        </p>
        <p>
          If you can steer international buyers to pay in your home currency or use Stripe for card checkout, compare
          outcomes with the <Link href="/calculators/stripe-fee-calculator">Stripe Fee Calculator</Link>. The cheaper
          option depends on transaction size, domestic vs international mix, and whether FX is involved.
        </p>

        <h2>PayPal on Marketplaces vs Your Own Site</h2>
        <p>
          eBay and some other platforms integrate PayPal (or managed payments with similar economics). Etsy sellers in
          some regions use PayPal for off-platform sales. Marketplace listing fees are separate — model those with the{" "}
          <Link href="/calculators/ebay-fee-calculator">eBay Fee Calculator</Link> or{" "}
          <Link href="/calculators/etsy-fee-calculator">Etsy Fee Calculator</Link>, then add PayPal only where it applies
          to your own checkout flow.
        </p>

        <h2>GST and Invoicing</h2>
        <p>
          Australian GST-registered businesses charging 10% GST on invoices should separate GST from the goods/services
          amount before modelling PayPal fees — PayPal charges on the total payment including GST. Use the{" "}
          <Link href="/calculators/gst-calculator">GST Calculator</Link> to split tax-inclusive amounts, then run the
          net goods value through this tool.
        </p>
        <p>
          After fees, feed true net revenue into the{" "}
          <Link href="/calculators/profit-margin-calculator">Profit Margin Calculator</Link> to see whether your prices
          still hit margin targets.
        </p>

        <h2>Regional Commercial Rate Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Domestic</th>
              <th>Intl. surcharge</th>
              <th>FX conversion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Australia (AUD)</td>
              <td>2.9% + $0.30</td>
              <td>+1.0%</td>
              <td>+3.0%</td>
            </tr>
            <tr>
              <td>United States (USD)</td>
              <td>2.99% + $0.49</td>
              <td>+1.5%</td>
              <td>+4.0%</td>
            </tr>
            <tr>
              <td>United Kingdom (GBP)</td>
              <td>2.9% + £0.30</td>
              <td>+1.29%</td>
              <td>+4.0%</td>
            </tr>
          </tbody>
        </table>
        <p>
          PayPal offers micropayment pricing, charity rates, and volume discounts not reflected in these defaults. Edit
          the calculator fields to match your merchant agreement.
        </p>

        <h2>Tips to Reduce PayPal Costs</h2>
        <p>
          Encourage bank-funded domestic payments where fees are lowest. Invoice in your settlement currency to avoid FX
          when possible. For recurring revenue, compare PayPal subscriptions against Stripe Billing. On high-ticket B2B
          sales, bank transfer may beat card-based PayPal — but factor in buyer friction and slower settlement.
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
        <strong>Disclaimer:</strong> PayPal fee schedules change by country, account type, and product. This calculator
        provides planning estimates only — confirm live rates in your PayPal merchant dashboard before invoicing.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
