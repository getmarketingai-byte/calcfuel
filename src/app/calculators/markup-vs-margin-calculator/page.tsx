import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import MarkupMarginCalc from "./MarkupMarginCalc";

export const metadata: Metadata = {
  title: "Markup vs Margin Calculator — Convert & Price From Cost | CalcFuel",
  description:
    "Free markup vs margin calculator. Convert between markup and margin, or set selling price from cost and your target margin or markup. Instant results for retailers and freelancers.",
  alternates: { canonical: "/calculators/markup-vs-margin-calculator" },
};

const relatedTools = [
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross, net, and operating profit margins." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover all costs." },
  { title: "Average Order Value Calculator", slug: "average-order-value-calculator", description: "Track and improve your average transaction value." },
  { title: "Etsy Fee Calculator", slug: "etsy-fee-calculator", description: "Estimate Etsy listing, transaction, and payment fees." },
  { title: "Stripe Fee Calculator", slug: "stripe-fee-calculator", description: "Calculate Stripe processing fees and net payout." },
  { title: "Freelance Rate Calculator", slug: "freelance-rate-calculator", description: "Derive an hourly rate from income goals and expenses." },
];

const faqs = [
  {
    question: "What is the difference between markup and margin?",
    answer:
      "Markup is profit as a percentage of cost: (Price − Cost) ÷ Cost × 100. Margin is profit as a percentage of selling price: (Price − Cost) ÷ Price × 100. A 100% markup equals a 50% margin — they use different denominators, so the same dollar profit produces different percentages.",
  },
  {
    question: "How do I convert markup to margin?",
    answer:
      "Margin% = Markup% ÷ (100 + Markup%) × 100. Example: 100% markup → 100 ÷ 200 × 100 = 50% margin. Or use cost and price directly: margin = (price − cost) ÷ price × 100.",
  },
  {
    question: "How do I set price from a target margin?",
    answer:
      "Price = Cost ÷ (1 − Margin% ÷ 100). For $40 cost and 60% target margin: Price = 40 ÷ 0.40 = $100. Margin is always relative to selling price, so you divide cost by the complement of your margin percentage.",
  },
  {
    question: "How do I set price from a target markup?",
    answer:
      "Price = Cost × (1 + Markup% ÷ 100). For $40 cost and 100% markup: Price = 40 × 2 = $80. Markup is added on top of cost, which is why retailers often think in markup terms when sourcing products.",
  },
  {
    question: "Which should I use — markup or margin?",
    answer:
      "Use margin when evaluating profitability (P&L, investor reports, break-even analysis) because revenue is the base. Use markup when pricing from wholesale cost (retail, manufacturing, restaurants). Always clarify which term your supplier or accountant means — mixing them causes costly pricing errors.",
  },
  {
    question: "Does margin include payment processing fees?",
    answer:
      "Gross margin typically uses revenue minus cost of goods sold only. Net margin subtracts operating expenses including marketplace and payment fees. After calculating price with this tool, model Stripe or Etsy fees with our fee calculators to see true take-home margin.",
  },
  {
    question: "Can margin exceed 100%?",
    answer:
      "No. Margin is profit divided by selling price, so it approaches but never reaches 100% (that would mean zero cost). Markup has no upper bound — 200% markup means price is triple the cost, which equals a 66.7% margin.",
  },
];

const howToSteps = [
  { name: "Choose a mode", text: "Select whether you have cost + price, cost + target margin, or cost + target markup." },
  { name: "Enter your cost", text: "Input your unit cost, COGS, or wholesale price in AUD." },
  { name: "Enter the second value", text: "Add selling price, margin %, or markup % depending on your mode." },
  { name: "Read markup and margin", text: "Both percentages and gross profit appear instantly — compare against your fee-adjusted targets." },
];

export default function MarkupVsMarginCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Markup vs Margin Calculator"
        description="Free markup vs margin calculator. Convert between markup and margin, or price from cost and target margin or markup."
        url="https://calcfuel.com/calculators/markup-vs-margin-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Markup vs Margin Calculator", url: "https://calcfuel.com/calculators/markup-vs-margin-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">
          Financial Calculators
        </Link>
        <span className="mx-2">/</span>
        <span>Markup vs Margin Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Markup vs Margin Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Convert between markup and margin, or set your selling price from cost and a target margin or markup percentage.
        Stop confusing the two — get instant, accurate results.
      </p>
      <CalcReviewedBy />
      <MarkupMarginCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Why Markup and Margin Get Confused</h2>
        <p>
          Markup and margin both describe how much you earn above cost, but they use different denominators. That single
          difference causes some of the most expensive pricing mistakes in retail, eCommerce, food service, and
          freelancing. A buyer who asks for &quot;50% margin&quot; and a supplier who quotes &quot;50% markup&quot; are
          talking about radically different prices — yet both numbers sound reasonable in conversation.
        </p>
        <p>
          This calculator shows both figures side by side so you can price confidently, negotiate with clarity, and
          align your sticker price with the profitability targets in your business plan.
        </p>

        <h2>Markup Formula</h2>
        <p>Markup expresses profit as a percentage of what you paid (cost):</p>
        <ul>
          <li>
            <strong>Markup %</strong> = (Selling Price − Cost) ÷ Cost × 100
          </li>
          <li>
            <strong>Price from markup</strong> = Cost × (1 + Markup% ÷ 100)
          </li>
        </ul>
        <p>
          <strong>Example:</strong> You buy wholesale stock for $50 and apply a 80% markup. Price = $50 × 1.80 ={" "}
          <strong>$90</strong>. Gross profit is $40.
        </p>
        <p>
          Retailers and distributors often think in markup because cost is the known input when goods arrive from a
          supplier. A &quot;keystone&quot; markup in jewellery traditionally means doubling cost — 100% markup.
        </p>

        <h2>Margin Formula</h2>
        <p>Margin expresses profit as a percentage of what you charge (revenue):</p>
        <ul>
          <li>
            <strong>Margin %</strong> = (Selling Price − Cost) ÷ Selling Price × 100
          </li>
          <li>
            <strong>Price from margin</strong> = Cost ÷ (1 − Margin% ÷ 100)
          </li>
        </ul>
        <p>
          <strong>Example:</strong> Same $50 cost, but you want a 60% margin. Price = $50 ÷ 0.40 = <strong>$125</strong>.
          Gross profit is still measured against revenue — $75 profit on $125 sales = 60% margin.
        </p>
        <p>
          Investors, accountants, and the{" "}
          <Link href="/calculators/profit-margin-calculator">Profit Margin Calculator</Link> use margin because financial
          statements report profit relative to revenue, not cost.
        </p>

        <h2>Markup vs Margin: Side-by-Side Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Cost</th>
              <th>Markup %</th>
              <th>Price</th>
              <th>Margin %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$40</td>
              <td>25%</td>
              <td>$50</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>$40</td>
              <td>50%</td>
              <td>$60</td>
              <td>33.3%</td>
            </tr>
            <tr>
              <td>$40</td>
              <td>100%</td>
              <td>$80</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>$40</td>
              <td>150%</td>
              <td>$100</td>
              <td>60%</td>
            </tr>
          </tbody>
        </table>
        <p>
          Notice how 100% markup — often described as &quot;double the cost&quot; — is only a 50% margin. If your
          business plan requires 50% margin, you need 100% markup, not 50% markup.
        </p>

        <h2>Pricing After Marketplace and Payment Fees</h2>
        <p>
          Gross margin on the price tag is not the same as what lands in your bank account. Etsy, Amazon, eBay, Stripe,
          and PayPal all take a cut before you see revenue. A product priced for 40% gross margin can drop to 25% net
          margin after a 6.5% marketplace fee and 1.75% card processing.
        </p>
        <p>
          Workflow: set your target <em>net</em> margin, use this calculator to find a list price from cost, then
          verify with the <Link href="/calculators/etsy-fee-calculator">Etsy Fee Calculator</Link> or{" "}
          <Link href="/calculators/stripe-fee-calculator">Stripe Fee Calculator</Link>. Adjust price until true
          take-home margin matches your goal.
        </p>

        <h2>Margin in Break-Even and AOV Planning</h2>
        <p>
          Your margin percentage directly determines how many units you must sell to cover fixed costs. The{" "}
          <Link href="/calculators/break-even-calculator">Break-Even Calculator</Link> uses contribution margin per
          unit — which comes from the same cost and price relationship modelled here.
        </p>
        <p>
          Raising average order value (AOV) improves margin dollars per transaction without changing unit economics. Use
          the <Link href="/calculators/average-order-value-calculator">Average Order Value Calculator</Link> to track
          whether bundling and upsells are lifting profitability alongside your margin targets.
        </p>

        <h2>Industry Norms</h2>
        <p>
          Acceptable margins vary by sector. Grocery retailers may run 2–5% net margins; SaaS businesses often target
          70–80% gross margins; handmade goods on Etsy commonly aim for 50–60% gross margin after fees. Freelancers
          pricing project work should translate desired annual income into an hourly rate with the{" "}
          <Link href="/calculators/freelance-rate-calculator">Freelance Rate Calculator</Link>, then sanity-check
          that project quotes deliver the margin they need after tax and expenses.
        </p>

        <h2>Quick Conversion Reference</h2>
        <p>To convert markup (M) to margin: Margin = M ÷ (100 + M) × 100. To convert margin (G) to markup: Markup = G ÷ (100 − G) × 100. Bookmark this page or use the calculator above — mental arithmetic on these conversions is where pricing errors hide.</p>
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
        <strong>Disclaimer:</strong> This calculator provides estimates only and should not be treated as financial or
        tax advice. Consult a qualified accountant for pricing and profitability decisions specific to your business.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
