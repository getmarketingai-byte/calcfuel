import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import StripeFeeCalc from "./StripeFeeCalc";

export const metadata: Metadata = {
  title: "Stripe Fee Calculator — Processing Fees & Net Payout | CalcFuel",
  description:
    "Free Stripe fee calculator for Australia, US, and UK. Calculate processing fees, net payout, or gross-up the charge needed to receive a target amount. Domestic and international rates.",
  alternates: { canonical: "/calculators/stripe-fee-calculator" },
};

const relatedTools = [
  { title: "PayPal Fee Calculator", slug: "paypal-fee-calculator", description: "Calculate PayPal commercial fees and reverse gross-up." },
  { title: "Etsy Fee Calculator", slug: "etsy-fee-calculator", description: "Estimate Etsy listing, transaction, and payment fees." },
  { title: "eBay Fee Calculator", slug: "ebay-fee-calculator", description: "Calculate final value fees and take-home profit." },
  { title: "Amazon FBA Fee Calculator", slug: "amazon-fba-fee-calculator", description: "Project referral and FBA fulfillment fees." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross and net profit margins after fees." },
  { title: "Markup vs Margin Calculator", slug: "markup-vs-margin-calculator", description: "Set price from cost using markup or target margin." },
];

const faqs = [
  {
    question: "How are Stripe fees calculated?",
    answer:
      "For standard online card payments, Stripe charges a percentage of the transaction amount plus a fixed fee per charge. In Australia this is typically 1.75% + $0.30 for domestic cards. The fee is deducted before payout — if a customer pays $100, Stripe takes their cut and deposits the remainder to your connected bank account.",
  },
  {
    question: "What is the Stripe fee in Australia?",
    answer:
      "As of our last review, Stripe's standard domestic online rate in Australia is 1.75% + $0.30 AUD per successful card charge. International cards are charged at a higher percentage (currently 3.5% + $0.30). Always confirm live rates on stripe.com/au/pricing as they can change.",
  },
  {
    question: "How do I gross up a Stripe charge to receive a target net amount?",
    answer:
      "Use reverse mode: Charge Amount = (Target Net + Fixed Fee) ÷ (1 − Percentage ÷ 100). If you need to receive $500 net and Stripe charges 1.75% + $0.30, charge = ($500 + $0.30) ÷ 0.9825 ≈ $509.21.",
  },
  {
    question: "Are Stripe fees tax deductible in Australia?",
    answer:
      "Payment processing fees are generally a deductible business expense for Australian businesses. Keep Stripe invoices and payout reports for your BAS and tax return. This calculator does not provide tax advice — confirm with your accountant.",
  },
  {
    question: "Do Stripe fees include GST?",
    answer:
      "Stripe's Australian pricing is typically quoted GST-inclusive for local merchants. If you are GST-registered, you may be able to claim GST credits on Stripe fees — check your Stripe tax invoice. International Stripe entities may quote fees differently.",
  },
  {
    question: "Why is the international card rate higher?",
    answer:
      "Cross-border card payments incur additional interchange and scheme fees from card networks. Stripe passes these through via a higher percentage rate when the customer's card was issued outside your country. Toggle international in the calculator to model those charges.",
  },
];

const howToSteps = [
  { name: "Select your region", text: "Choose Australia, United States, or United Kingdom preset rates — or edit the percentage and fixed fee manually." },
  { name: "Choose forward or reverse", text: "Forward mode calculates fee from a charge amount. Reverse mode finds the charge needed to net a target payout." },
  { name: "Set domestic or international", text: "Toggle international if the customer's card was issued overseas." },
  { name: "Enter the amount", text: "Type the charge amount (forward) or desired net payout (reverse)." },
  { name: "Read fee and net", text: "Stripe fee, net payout, and charge amount appear instantly." },
];

export default function StripeFeeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Stripe Fee Calculator"
        description="Free Stripe fee calculator. Calculate processing fees, net payout, and gross-up charge amounts for AU, US, and UK."
        url="https://calcfuel.com/calculators/stripe-fee-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Marketplace Fee Calculators", url: "https://calcfuel.com/calculators/marketplace-fees" },
          { name: "Stripe Fee Calculator", url: "https://calcfuel.com/calculators/stripe-fee-calculator" },
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
        <span>Stripe Fee Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Stripe Fee Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate Stripe processing fees and net payout for Australia, the US, and the UK. Forward mode shows what you
        keep after a charge; reverse mode grosses up so you receive your target amount.
      </p>
      <CalcReviewedBy />
      <StripeFeeCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Understanding Stripe Processing Fees</h2>
        <p>
          Stripe is one of the most widely used payment processors for online businesses, SaaS subscriptions, marketplaces,
          and in-person Tap to Pay. Unlike flat monthly merchant accounts of the past, Stripe charges per successful
          transaction — a percentage of the charge amount plus a small fixed fee. That model is predictable for low
          volume and scales with revenue, but it means every invoice, checkout, and subscription renewal has a
          processing cost you should bake into pricing.
        </p>
        <p>
          This Stripe fee calculator helps Australian, American, and British merchants estimate take-home amounts before
          money hits the bank. Use forward mode when a customer pays a known price; use reverse mode when you need to
          invoice a gross amount that nets to a specific figure after Stripe&apos;s cut.
        </p>

        <h2>Forward Fee Calculation</h2>
        <p>When you know the charge amount your customer pays:</p>
        <ul>
          <li>
            <strong>Stripe Fee</strong> = (Charge × Percentage ÷ 100) + Fixed Fee
          </li>
          <li>
            <strong>Net Payout</strong> = Charge − Stripe Fee
          </li>
        </ul>
        <p>
          <strong>Example (Australia, domestic):</strong> Customer pays $250.00. Fee = ($250 × 1.75%) + $0.30 = $4.38 +
          $0.30 = <strong>$4.68</strong>. You receive <strong>$245.32</strong>.
        </p>
        <p>
          The fixed fee matters most on small transactions. On a $5 charge, $0.30 alone is 6% before the percentage
          applies — micro-payments are disproportionately expensive on percentage-plus-fixed pricing.
        </p>

        <h2>Reverse Gross-Up Calculation</h2>
        <p>When you need to receive exactly $X after fees:</p>
        <ul>
          <li>
            <strong>Charge Amount</strong> = (Target Net + Fixed Fee) ÷ (1 − Percentage ÷ 100)
          </li>
        </ul>
        <p>
          <strong>Example:</strong> You want $1,000 net. With 1.75% + $0.30 AUD: Charge = ($1,000 + $0.30) ÷ 0.9825 ≈{" "}
          <strong>$1,018.12</strong>. Stripe fee ≈ $18.12; you net $1,000.
        </p>
        <p>
          Freelancers invoicing clients, charities collecting donations, and sellers on their own Shopify stores use
          gross-up regularly. Do not simply add 1.75% to your target — the percentage applies to the gross amount, so
          the correction must be algebraic.
        </p>

        <h2>Domestic vs International Cards</h2>
        <p>
          Stripe charges a higher rate when the customer&apos;s card was issued in a different country than your Stripe
          account. For Australian merchants, domestic cards are typically 1.75% + $0.30; international cards are 3.5% +
          $0.30. If a meaningful share of your customers are overseas, model international rates or blend both in your
          margin planning.
        </p>
        <p>
          Compare with the <Link href="/calculators/paypal-fee-calculator">PayPal Fee Calculator</Link> if you offer
          both payment methods — PayPal&apos;s international and currency conversion surcharges differ from Stripe&apos;s
          structure.
        </p>

        <h2>Stripe Fees vs Marketplace Fees</h2>
        <p>
          Stripe fees apply when you run your own checkout — Shopify, WooCommerce, custom apps, invoicing tools. Selling
          on Etsy, eBay, or Amazon adds platform fees <em>on top of</em> payment processing (though some marketplaces
          bundle processing into their rate). Stack both when modelling true profit:
        </p>
        <ol>
          <li>Calculate marketplace fee with the <Link href="/calculators/etsy-fee-calculator">Etsy</Link>,{" "}
            <Link href="/calculators/ebay-fee-calculator">eBay</Link>, or{" "}
            <Link href="/calculators/amazon-fba-fee-calculator">Amazon FBA</Link> calculator.</li>
          <li>If you also use Stripe on your own site, model processing separately.</li>
          <li>Feed net revenue into the <Link href="/calculators/profit-margin-calculator">Profit Margin Calculator</Link>{" "}
            and <Link href="/calculators/markup-vs-margin-calculator">Markup vs Margin Calculator</Link>.</li>
        </ol>

        <h2>Regional Rate Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Domestic rate</th>
              <th>International rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Australia (AUD)</td>
              <td>1.75% + $0.30</td>
              <td>3.5% + $0.30</td>
            </tr>
            <tr>
              <td>United States (USD)</td>
              <td>2.9% + $0.30</td>
              <td>3.9% + $0.30</td>
            </tr>
            <tr>
              <td>United Kingdom (GBP)</td>
              <td>1.5% + £0.20</td>
              <td>3.25% + £0.20</td>
            </tr>
          </tbody>
        </table>
        <p>
          Stripe offers volume discounts, custom pricing for large merchants, and different rates for in-person Terminal,
          BNPL, and international payment methods. These presets reflect standard online card rates — edit the fields in
          the calculator if your dashboard shows negotiated pricing.
        </p>

        <h2>Pricing Products to Absorb Stripe Fees</h2>
        <p>
          Two approaches: absorb fees into your margin (simpler checkout, you earn slightly less) or pass fees to
          customers via surcharging where legally permitted. In Australia, surcharging is allowed up to the reasonable
          cost of acceptance — typically the Stripe fee itself. Either way, model the net you actually receive before
          setting prices; a 30% gross margin on paper becomes 28% after 1.75% + fixed on every card sale.
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
        <strong>Disclaimer:</strong> Stripe fee schedules change. This calculator provides planning estimates only —
        confirm current rates in your Stripe dashboard before invoicing or setting prices.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
