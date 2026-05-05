import type { Metadata } from "next";
import MarketingBudgetCalc from "./MarketingBudgetCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import Link from "next/link";
import MarketingAICTA from "@/components/MarketingAICTA";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Marketing Budget Calculator - Recommended Budget by Industry",
  description: "Calculate your recommended marketing budget based on annual revenue and industry benchmarks. Get instant guidance for B2B, B2C, SaaS, e-commerce, and more.",
  openGraph: {
    title: "Marketing Budget Calculator - Recommended Budget by Industry",
    description: "Calculate your recommended marketing budget based on annual revenue and industry benchmarks. Get instant guidance for B2B, B2C, SaaS, e-commerce, and more.",
    url: "https://calcfuel.com/calculators/marketing-budget-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What percentage of revenue should be spent on marketing?", answer: "The most widely cited benchmark is 7–12% of gross revenue for established B2C businesses, and 2–5% for B2B. However, growth-stage companies and startups often invest 15–25% to establish presence. The right percentage depends on your industry, growth stage, and competitive intensity." },
  { question: "What should I include in my marketing budget?", answer: "A marketing budget should include paid advertising (search, social, display), content creation, SEO tools and services, email marketing platforms, agency or freelance fees, events and sponsorships, marketing software (CRM, automation), and staff salaries for marketing roles." },
  { question: "How do I allocate my marketing budget across channels?", answer: "Allocate based on where your customers are and which channels have historically delivered the best ROI. A common starting split for digital-first businesses is 40% paid search, 30% paid social, 20% content/SEO, and 10% email/retention — then adjust based on performance data." },
  { question: "Should startups spend more or less on marketing?", answer: "Early-stage startups typically need to invest more aggressively — 15–25% of revenue — to build brand awareness and acquire initial customers. As you gain market position and organic channels develop, the effective percentage can decrease." },
  { question: "How often should I review my marketing budget?", answer: "Review your marketing budget quarterly at minimum. Monthly reviews are recommended for high-growth companies with significant paid media spend. Adjust allocations based on channel performance, not just at annual planning cycles." },
  { question: "What is the difference between a marketing budget and marketing spend?", answer: "A marketing budget is the planned allocation approved in advance. Marketing spend is the actual amount spent. Tracking variance between the two helps identify over- or under-performing periods and ensures financial accountability." },
];

const howToSteps = [
  { name: "Enter your annual revenue", text: "Input your annual revenue (or projected revenue for budget planning). This becomes the base for the percentage-based recommendation." },
  { name: "Select your industry or stage", text: "Choose the option that best matches your business type. Each industry has different competitive dynamics that drive different recommended marketing investment levels." },
  { name: "Review the benchmark recommendation", text: "The calculator shows the industry benchmark percentage and recommended annual budget. Use this as a starting point for planning." },
  { name: "Adjust with custom percentage", text: "If your growth goals, competitive intensity, or past performance suggest a different rate, use the custom percentage option to model alternative scenarios." },
];

export default function MarketingBudgetCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Marketing Budget Calculator"
        description="Calculate recommended marketing budget based on annual revenue and industry-specific benchmarks."
        url="https://calcfuel.com/calculators/marketing-budget-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "financial", url: "https://calcfuel.com/calculators/financial" },
          { name: "Marketing Budget Calculator", url: "https://calcfuel.com/calculators/marketing-budget-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">›</span>
          <span>Marketing Budget Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Marketing Budget Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Set your marketing budget with confidence using industry benchmarks — then break it down by channel for maximum ROI.</p>

        <MarketingBudgetCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

      <EmailCapture />
      <MarketingAICTA />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How Much Should You Spend on Marketing?</h2>
          <p>The most common question in marketing planning is also the hardest to answer in the abstract: how much is the right amount to spend? The answer depends on three key factors: your industry, your growth stage, and your historical marketing ROI.</p>
          <p>The percentage-of-revenue model is the most widely used framework because it scales marketing investment with business size. As revenue grows, the budget grows proportionally — ensuring marketing continues to drive growth without overextending in early stages.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Marketing Budget Benchmarks by Industry</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Industry / Stage</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">% of Revenue</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Early-Stage Startup", "15–25%", "Brand building and customer acquisition"],
                  ["B2C E-commerce", "10–15%", "Competitive paid channels required"],
                  ["B2B SaaS", "12–20%", "High CLV justifies aggressive acquisition"],
                  ["B2B Professional Services", "5–10%", "Relationship-driven, lower ad dependence"],
                  ["Retail (Physical)", "2–5%", "Low margin limits spend"],
                  ["Healthcare / Wellness", "7–12%", "Digital shift accelerating spend"],
                  ["Financial Services", "6–10%", "Trust-building content focus"],
                  ["Education / Training", "8–12%", "Enrolment cycles drive paid campaigns"],
                ].map(([ind, pct, note]) => (
                  <tr key={ind} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{ind}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-orange-600 dark:text-orange-400 font-semibold">{pct}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Allocate Your Marketing Budget</h2>
          <p>Once you have your total budget, the next decision is how to allocate it across channels. There is no universal formula — the right allocation depends on your customer acquisition channels and where your audience spends their time.</p>
          <p>A starting framework for digital-first businesses:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Paid Acquisition (40–60%)</strong> — Search ads, social ads, display. Direct, measurable, scalable.</li>
            <li><strong>Content and SEO (20–30%)</strong> — Blog, video, case studies. Long-term compounding asset.</li>
            <li><strong>Email and Retention (10–15%)</strong> — Nurture sequences, re-engagement, loyalty. Highest ROI channel.</li>
            <li><strong>Brand and Experiential (5–15%)</strong> — Events, PR, partnerships. Builds trust at scale.</li>
          </ul>
          <p>The most important principle: <strong>track ROI by channel</strong> and rebalance quarterly. Allocate more to what is working, less to what is not. Use the <Link href="/calculators/marketing-roi-calculator" className="text-orange-500 hover:underline">Marketing ROI Calculator</Link> to measure each channel.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">When to Spend More Than the Benchmark</h2>
          <p>The benchmark percentage is a starting point, not a ceiling. There are situations where investing above the benchmark is the rational choice:</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Your CLV:CAC ratio is 5:1 or higher.</strong> You are leaving growth on the table. Scale spend until the ratio approaches 3:1.</li>
            <li><strong>You are entering a new market.</strong> Brand establishment requires front-loaded investment before organic channels can take over.</li>
            <li><strong>A competitor is scaling rapidly.</strong> Defensive spend during competitive pressure can protect market position that is expensive to recover once lost.</li>
            <li><strong>You have proven product-market fit.</strong> Once you know what works, the risk of scaling is lower. Underspending on a proven channel is a missed opportunity.</li>
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
              { label: "Marketing ROI", href: "/calculators/marketing-roi-calculator" },
              { label: "Customer Acquisition Cost", href: "/calculators/customer-acquisition-cost-calculator" },
              { label: "ROAS Calculator", href: "/calculators/roas-calculator" },
              { label: "Ad Spend Calculator", href: "/calculators/ad-spend-calculator" },
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
