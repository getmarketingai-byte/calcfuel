import type { Metadata } from "next";
import CPLCalc from "./CPLCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cost Per Lead Calculator (CPL) — Benchmark Lead Generation Costs | CalcFuel",
  description: "Calculate your cost per lead (CPL) instantly. Divide total marketing spend by leads generated to benchmark your campaigns against B2B and B2C industry averages.",
  alternates: { canonical: "/calculators/cost-per-lead-calculator" },
  openGraph: {
    title: "Cost Per Lead Calculator - Measure CPL by Channel",
    description: "Calculate your cost per lead (CPL) instantly. Divide total marketing spend by leads generated to benchmark your campaigns against B2B and B2C industry averages.",
    url: "https://calcfuel.com/calculators/cost-per-lead-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is Cost Per Lead (CPL)?", answer: "Cost Per Lead measures how much you spend in marketing to acquire a single lead — a prospect who has expressed interest in your product or service. It is calculated by dividing total marketing spend by the number of leads generated." },
  { question: "What is a good CPL?", answer: "CPL varies widely by industry and channel. B2C CPL typically ranges from $10–$80, while B2B CPL can range from $50–$500+. A 'good' CPL is one where the value of a converted lead justifies the acquisition cost, which depends on your close rate and average deal size." },
  { question: "How does CPL differ from CAC?", answer: "CPL measures the cost to generate a lead (someone who expressed interest), while CAC measures the cost to convert that lead into a paying customer. CPL × (1 ÷ close rate) approximates your CAC from a given channel." },
  { question: "Which marketing channels produce the lowest CPL?", answer: "Organic SEO and content marketing typically have the lowest long-run CPL once established. Paid social (Meta) often has lower CPL than paid search (Google Ads) for B2C, while for B2B, LinkedIn and Google tend to produce higher-quality leads despite higher CPL." },
  { question: "Should I optimise for CPL or lead quality?", answer: "Both matter. A channel with $20 CPL but 2% close rate can be worse than one with $60 CPL but 15% close rate. Always track CPL alongside lead-to-customer conversion rate and average deal size to measure true acquisition efficiency." },
  { question: "How do I reduce my CPL?", answer: "Reduce CPL by improving ad targeting to reach higher-intent audiences, optimising landing page conversion rates, testing different lead magnets, and improving ad creative and copy to increase CTR and Quality Score." },
];

const howToSteps = [
  { name: "Enter total marketing spend", text: "Input all marketing costs for the campaign or period: ad spend, agency fees, software, and content costs." },
  { name: "Enter leads generated", text: "Input the total number of leads (form submissions, demo requests, trial signups) generated in the same period." },
  { name: "Review your CPL", text: "The calculator divides spend by leads to show your cost per lead. Compare to your close rate to estimate effective CAC." },
  { name: "Break down by channel", text: "Repeat for each marketing channel separately to identify which sources produce the lowest CPL and highest lead quality." },
];

export default function CostPerLeadCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Cost Per Lead Calculator"
        description="Calculate cost per lead (CPL) by dividing total marketing spend by leads generated to measure campaign efficiency."
        url="https://calcfuel.com/calculators/cost-per-lead-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Cost Per Lead Calculator", url: "https://calcfuel.com/calculators/cost-per-lead-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified="2026-05-15"
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">›</span>
          <span>Cost Per Lead Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Cost Per Lead Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Calculate how efficiently your marketing generates leads — and compare your CPL against channel and industry benchmarks to optimise budget allocation.</p>

        <CPLCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What Is Cost Per Lead?</h2>
          <p>Cost Per Lead (CPL) is a fundamental digital marketing metric that measures the efficiency of your lead generation activity. It is calculated by dividing total marketing spend by the number of leads generated in the same period.</p>
          <p>Unlike Cost Per Click (CPC), which measures traffic efficiency, CPL measures actual business interest. A lead has voluntarily raised their hand — submitted a form, booked a demo, or requested a callback. CPL tells you how much that expression of interest costs.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CPL Benchmarks by Channel</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Channel</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">B2C CPL Range</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">B2B CPL Range</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Google Search (Paid)", "$30–$100", "$75–$300"],
                  ["Meta Ads (FB/Instagram)", "$15–$60", "$50–$200"],
                  ["LinkedIn Ads", "$50–$150", "$100–$600"],
                  ["Email Marketing", "$5–$30", "$20–$80"],
                  ["Organic SEO / Content", "$10–$40", "$25–$120"],
                  ["Webinars / Events", "$30–$80", "$75–$250"],
                ].map(([ch, b2c, b2b]) => (
                  <tr key={ch} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{ch}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{b2c}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{b2b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CPL vs. CAC — Know the Difference</h2>
          <p>CPL measures the top-of-funnel cost. CAC measures the full-funnel cost. The bridge between them is your lead-to-customer conversion rate:</p>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 font-mono text-sm">
            CAC = CPL ÷ Lead-to-Customer Conversion Rate
          </div>
          <p>If your CPL is $50 and 10% of leads become customers, your CAC is $500. Understanding this relationship prevents the trap of celebrating a low CPL from a channel that produces low-quality leads with poor close rates.</p>
          <p>Use the <Link href="/calculators/customer-acquisition-cost-calculator" className="text-orange-500 hover:underline">CAC Calculator</Link> to measure full-funnel acquisition cost and compare channels properly.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Reduce CPL Without Sacrificing Quality</h2>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Improve landing page conversion rate.</strong> Better copy, clearer CTAs, and reduced form friction directly lower CPL from existing traffic.</li>
            <li><strong>Improve audience targeting.</strong> Exclude low-intent audiences, use lookalikes based on converted customers, and test intent-based keyword targeting in search.</li>
            <li><strong>Test lead magnets.</strong> A higher-value lead magnet (e.g. ROI calculator, audit, or tool) often converts at 2–5× the rate of a generic newsletter signup.</li>
            <li><strong>Optimise ad creative.</strong> Higher CTR lowers CPL by improving your Google Ads Quality Score or reducing Meta CPM through positive engagement signals.</li>
            <li><strong>Use retargeting.</strong> Warm audiences convert at 3–5× the rate of cold audiences, dramatically reducing CPL for mid-funnel campaigns.</li>
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
              { label: "Customer Acquisition Cost", href: "/calculators/customer-acquisition-cost-calculator" },
              { label: "Conversion Rate", href: "/calculators/conversion-rate-calculator" },
              { label: "Click-Through Rate", href: "/calculators/click-through-rate-calculator" },
              { label: "ROAS Calculator", href: "/calculators/roas-calculator" },
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
