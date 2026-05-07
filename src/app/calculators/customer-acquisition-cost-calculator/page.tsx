import type { Metadata } from "next";
import CACCalc from "./CACCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Acquisition Cost Calculator - Measure CAC",
  description: "Calculate your customer acquisition cost (CAC) instantly. Enter total sales and marketing spend plus new customers to benchmark your CAC against industry averages.",
  openGraph: {
    title: "Customer Acquisition Cost Calculator - Measure CAC",
    description: "Calculate your customer acquisition cost (CAC) instantly. Enter total sales and marketing spend plus new customers to benchmark your CAC against industry averages.",
    url: "https://calcfuel.com/calculators/customer-acquisition-cost-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is Customer Acquisition Cost (CAC)?", answer: "CAC is the total cost of sales and marketing required to acquire one new customer. It is calculated by dividing your total sales and marketing spend by the number of new customers acquired in the same period." },
  { question: "What is a good CAC?", answer: "A good CAC depends heavily on your average customer value. Generally, a CAC below $50 is excellent for low-ticket consumer products, while B2B SaaS companies may sustain a CAC of $500–$5,000 if customer lifetime value is high enough." },
  { question: "How does CAC relate to CLV?", answer: "The CLV:CAC ratio measures acquisition efficiency. A ratio of 3:1 (CLV three times higher than CAC) is generally considered the minimum healthy benchmark. Ratios below 1:1 mean you are losing money on every customer." },
  { question: "What costs should I include in CAC?", answer: "Include all sales and marketing costs: advertising spend, agency fees, salaries of sales and marketing staff, software subscriptions (CRM, marketing automation), and events or sponsorships." },
  { question: "How can I reduce my CAC?", answer: "Reduce CAC by improving conversion rates at each stage of your funnel, investing in organic channels (SEO, content), increasing referral programs, and improving lead quality through better targeting and qualification." },
  { question: "Should I calculate CAC by channel?", answer: "Yes. Blended CAC hides which channels are efficient. Calculate CAC per channel (paid search, social, email, organic) to reallocate budget away from expensive channels toward cost-efficient ones." },
];

const howToSteps = [
  { name: "Add your total marketing and sales spend", text: "Enter the total amount spent on all sales and marketing activities in the measurement period, including ad spend, salaries, tools, and agency fees." },
  { name: "Enter new customers acquired", text: "Input the number of net new customers acquired in the same period. Do not include returning or reactivated customers." },
  { name: "Review your CAC result", text: "The calculator divides total spend by new customers to give your CAC. Compare this to your industry benchmark." },
  { name: "Compare to your CLV", text: "Divide your Customer Lifetime Value by CAC. Aim for a ratio of 3:1 or higher to ensure profitable acquisition." },
];

export default function CustomerAcquisitionCostPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Customer Acquisition Cost Calculator"
        description="Calculate your CAC by dividing total sales and marketing spend by the number of new customers acquired."
        url="https://calcfuel.com/calculators/customer-acquisition-cost-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "financial", url: "https://calcfuel.com/calculators/financial" },
          { name: "Customer Acquisition Cost Calculator", url: "https://calcfuel.com/calculators/customer-acquisition-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">›</span>
          <span>Customer Acquisition Cost Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Customer Acquisition Cost Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Know exactly how much you are paying to win each new customer — and whether that number is sustainable.</p>

        <CACCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What Is Customer Acquisition Cost?</h2>
          <p>Customer Acquisition Cost (CAC) is one of the most important financial metrics in marketing. It tells you the average cost required to turn a prospect into a paying customer. Every dollar spent on ads, sales staff, tools, and agencies contributes to your CAC.</p>
          <p>The formula is straightforward: <strong>CAC = Total Sales &amp; Marketing Spend ÷ New Customers Acquired</strong>. For example, if you spent $10,000 and acquired 50 customers, your CAC is $200.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CAC by Industry — Benchmarks</h2>
          <p>CAC varies enormously by business model, industry, and sales cycle length. Use these benchmarks as a guide:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Industry</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Typical CAC Range</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["E-commerce (B2C)", "$10–$50", "High volume, low margin"],
                  ["SaaS (SMB)", "$200–$800", "Short sales cycles"],
                  ["SaaS (Enterprise)", "$3,000–$15,000", "Long cycles, high CLV"],
                  ["Financial Services", "$100–$500", "Trust-based, regulated"],
                  ["Healthcare", "$150–$600", "Compliance-heavy acquisition"],
                  ["Education / EdTech", "$50–$300", "Enrolment-driven"],
                ].map(([ind, range, note]) => (
                  <tr key={ind} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{ind}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{range}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The CLV:CAC Ratio — The Real Test</h2>
          <p>CAC alone is not enough. A $500 CAC can be perfectly healthy if each customer generates $3,000 in lifetime value. The CLV:CAC ratio tells you whether your acquisition economics are sustainable:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Below 1:1</strong> — You are losing money on every customer. Halt paid acquisition and fix the funnel.</li>
            <li><strong>1:1 to 2:1</strong> — You break even but have no room for payback period or churn.</li>
            <li><strong>3:1</strong> — Industry standard healthy minimum.</li>
            <li><strong>5:1+</strong> — You may be underinvesting. There is room to scale spend aggressively.</li>
          </ul>
          <p>Pair this calculator with the <Link href="/calculators/customer-lifetime-value-calculator" className="text-orange-500 hover:underline">Customer Lifetime Value Calculator</Link> to compute your ratio instantly.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Reduce Your CAC</h2>
          <p>Reducing CAC without hurting growth is the holy grail of marketing efficiency. Here are the highest-leverage levers:</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Improve conversion rate at each funnel stage.</strong> Doubling your landing page conversion rate halves your CAC from paid traffic instantly.</li>
            <li><strong>Invest in organic channels.</strong> SEO and content marketing have near-zero marginal CAC once rankings are established.</li>
            <li><strong>Build a referral engine.</strong> Referred customers cost far less than paid-acquired customers and often have higher retention.</li>
            <li><strong>Improve lead quality.</strong> Filtering low-intent leads earlier saves sales time and reduces blended CAC.</li>
            <li><strong>Retain customers longer.</strong> Higher retention increases CLV, improving the ratio even without reducing CAC.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Calculate CAC Step by Step</h2>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li>Choose a measurement period (month, quarter, or year).</li>
            <li>Sum all sales and marketing costs: ad spend, salaries, software, agency fees, events.</li>
            <li>Count only net new customers acquired in that same period.</li>
            <li>Divide total spend by new customers to get blended CAC.</li>
            <li>Repeat by channel to identify your most efficient acquisition sources.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <summary className="px-4 py-3 font-medium text-gray-900 dark:text-white cursor-pointer hover:text-orange-500">{question}</summary>
                <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Related Calculators</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Customer Lifetime Value", href: "/calculators/customer-lifetime-value-calculator" },
              { label: "Marketing ROI", href: "/calculators/marketing-roi-calculator" },
              { label: "Cost Per Lead", href: "/calculators/cost-per-lead-calculator" },
              { label: "Conversion Rate", href: "/calculators/conversion-rate-calculator" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-lg text-sm hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
