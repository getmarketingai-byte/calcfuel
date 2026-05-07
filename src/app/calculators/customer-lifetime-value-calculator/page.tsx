import type { Metadata } from "next";
import CLVCalc from "./CLVCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Lifetime Value Calculator - Calculate CLV / LTV",
  description: "Calculate customer lifetime value (CLV) using average purchase value, purchase frequency, and customer lifespan. Understand what each customer is really worth to your business.",
  openGraph: {
    title: "Customer Lifetime Value Calculator - Calculate CLV / LTV",
    description: "Calculate customer lifetime value (CLV) using average purchase value, purchase frequency, and customer lifespan. Understand what each customer is really worth to your business.",
    url: "https://calcfuel.com/calculators/customer-lifetime-value-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is Customer Lifetime Value (CLV)?", answer: "CLV (also called LTV or CLTV) is the total revenue a business can expect from a single customer account throughout the entire business relationship. It helps you understand the long-term value of customer relationships beyond a single transaction." },
  { question: "What is the CLV formula?", answer: "The basic CLV formula is: Average Purchase Value × Purchase Frequency per Year × Customer Lifespan in Years. For example, a customer who spends $150 per visit, shops 4 times a year, and remains a customer for 3 years has a CLV of $1,800." },
  { question: "What is a good CLV:CAC ratio?", answer: "A healthy CLV:CAC ratio is 3:1 or higher — meaning each customer is worth at least three times what you paid to acquire them. Ratios below 1:1 indicate you are spending more to acquire customers than they are worth." },
  { question: "How do I increase CLV?", answer: "Increase CLV by improving retention (reducing churn), increasing average order value through upsells and bundles, increasing purchase frequency through email marketing and loyalty programs, and expanding into complementary product lines." },
  { question: "What is the difference between CLV and LTV?", answer: "CLV (Customer Lifetime Value) and LTV (Lifetime Value) refer to the same metric. Some industries prefer LTV, while others use CLV. Both describe the total expected revenue from a customer relationship." },
  { question: "Should I use gross or net revenue for CLV?", answer: "For strategic decisions, use gross profit rather than revenue in your CLV calculation. This gives you the true economic value of a customer after cost of goods sold, which is more useful when comparing CLV to your CAC." },
];

const howToSteps = [
  { name: "Enter average purchase value", text: "Input the average dollar value of each transaction. Calculate this by dividing total revenue by the number of orders in a period." },
  { name: "Enter purchase frequency", text: "Input how many times the average customer purchases per year. Divide total annual orders by total unique customers." },
  { name: "Enter customer lifespan", text: "Input the average number of years a customer stays active. Calculate by dividing 1 by your annual churn rate." },
  { name: "Review your CLV", text: "The calculator multiplies all three inputs to show total lifetime value. Use this to benchmark your CAC and guide retention investment." },
];

export default function CustomerLifetimeValuePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Customer Lifetime Value Calculator"
        description="Calculate CLV by multiplying average purchase value, purchase frequency, and customer lifespan to understand the total value of each customer relationship."
        url="https://calcfuel.com/calculators/customer-lifetime-value-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "financial", url: "https://calcfuel.com/calculators/financial" },
          { name: "Customer Lifetime Value Calculator", url: "https://calcfuel.com/calculators/customer-lifetime-value-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">›</span>
          <span>Customer Lifetime Value Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Customer Lifetime Value Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Calculate the total revenue each customer relationship is worth — and use that number to guide every acquisition and retention decision.</p>

        <CLVCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why CLV Is the Most Important Marketing Metric</h2>
          <p>Most marketers obsess over CAC (Customer Acquisition Cost) without understanding what makes a CAC acceptable. CLV provides the answer. Without knowing how much a customer is worth over their lifetime, you cannot know how much you should be willing to spend to acquire them.</p>
          <p>CLV reframes marketing from a cost centre to a growth investment. If your CLV is $2,400, spending $800 to acquire a customer is rational. Spending $50 might actually be underinvesting and leaving growth on the table.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The CLV Formula Explained</h2>
          <p>The formula used by this calculator is:</p>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 font-mono text-sm">
            CLV = Average Purchase Value × Purchase Frequency (per year) × Customer Lifespan (years)
          </div>
          <p>Each variable has a compounding effect. Increasing any one of them by 20% increases CLV by 20%. Increasing all three by 20% increases CLV by 73%. This is why retention and frequency are such powerful levers — they multiply the impact of each improvement.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CLV Benchmarks by Business Model</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Business Model</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Typical CLV Range</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Key Driver</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["E-commerce subscription", "$400–$2,000", "Repeat purchase frequency"],
                  ["SaaS (SMB)", "$2,000–$10,000", "Churn rate reduction"],
                  ["SaaS (Enterprise)", "$20,000–$200,000+", "Expansion revenue"],
                  ["Retail (brick & mortar)", "$200–$800", "Loyalty and upsell"],
                  ["Professional services", "$5,000–$50,000", "Retainer length"],
                  ["Healthcare / dental", "$1,500–$8,000", "Ongoing treatment plans"],
                ].map(([model, range, driver]) => (
                  <tr key={model} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{model}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{range}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Increase Customer Lifetime Value</h2>
          <p>Improving CLV is one of the highest-ROI activities any marketing team can pursue. Here are the four main levers:</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Reduce churn.</strong> Every additional month a customer stays active increases CLV linearly. Even a 5% reduction in monthly churn can increase CLV by 15–30% over a year.</li>
            <li><strong>Increase average order value.</strong> Use upsells, cross-sells, and bundling at checkout. A 10% increase in AOV directly increases CLV by 10%.</li>
            <li><strong>Increase purchase frequency.</strong> Email nurture, loyalty programs, and replenishment reminders pull customers back sooner and more often.</li>
            <li><strong>Expand into adjacent products.</strong> Customers who buy two product lines have 2–3× higher CLV than single-product buyers.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CLV:CAC Ratio — Setting Your Acquisition Budget</h2>
          <p>The CLV:CAC ratio is the gold-standard benchmark for sustainable growth:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Below 1:1</strong> — Unsustainable. Fix retention or reduce spend.</li>
            <li><strong>1:1 – 2:1</strong> — Marginal. No buffer for payback period or unexpected churn.</li>
            <li><strong>3:1</strong> — Healthy. Industry-standard minimum for funded startups.</li>
            <li><strong>5:1+</strong> — May be underinvesting. Scale acquisition spend.</li>
          </ul>
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
              { label: "Customer Acquisition Cost", href: "/calculators/customer-acquisition-cost-calculator" },
              { label: "Marketing ROI", href: "/calculators/marketing-roi-calculator" },
              { label: "Conversion Rate", href: "/calculators/conversion-rate-calculator" },
              { label: "Cost Per Lead", href: "/calculators/cost-per-lead-calculator" },
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
