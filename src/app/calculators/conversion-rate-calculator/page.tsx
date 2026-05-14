import type { Metadata } from "next";
import ConversionRateCalc from "./ConversionRateCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conversion Rate Calculator — Calculate & Benchmark Your CVR | CalcFuel",
  description: "Calculate your conversion rate instantly. Divide conversions by total visitors to benchmark your landing page or funnel performance against industry averages.",
  alternates: { canonical: "/calculators/conversion-rate-calculator" },
  openGraph: {
    title: "Conversion Rate Calculator - Measure Landing Page Performance",
    description: "Calculate your conversion rate instantly. Divide conversions by total visitors to benchmark your landing page or funnel performance against industry averages.",
    url: "https://calcfuel.com/calculators/conversion-rate-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is a conversion rate?", answer: "Conversion rate is the percentage of visitors who take a desired action — such as making a purchase, submitting a form, or signing up for a trial. It is calculated by dividing the number of conversions by the total number of visitors and multiplying by 100." },
  { question: "What is a good conversion rate?", answer: "Average landing page conversion rates range from 2–5%. Top-performing pages achieve 10%+. However, 'good' depends on your industry, traffic source, and what counts as a conversion — a free signup converts at higher rates than a direct purchase." },
  { question: "How do I improve my conversion rate?", answer: "Improve conversion rates through A/B testing headlines and CTAs, simplifying forms, adding social proof, improving page load speed, and aligning ad copy with landing page messaging to reduce cognitive dissonance." },
  { question: "What is the difference between macro and micro conversions?", answer: "Macro conversions are primary goals like purchases or demo bookings. Micro conversions are intermediate steps like newsletter signups or video views. Optimising micro conversions builds the pipeline that leads to macro conversions." },
  { question: "How does conversion rate affect my marketing ROI?", answer: "Conversion rate is a multiplier on your entire funnel. Doubling your conversion rate doubles revenue from the same traffic without spending more on acquisition, effectively halving your cost per acquisition." },
  { question: "What tools measure conversion rate?", answer: "Google Analytics 4, Meta Pixel, and platform-native analytics all track conversion events. For detailed A/B testing, use tools like VWO, Optimizely, or Google Optimize (or its replacements like GA4 experiments)." },
];

const howToSteps = [
  { name: "Count your conversions", text: "Enter the number of desired actions completed — purchases, form submissions, sign-ups, or any other goal event — in your measurement period." },
  { name: "Enter total visitors", text: "Input the total number of unique visitors (or sessions) in the same period from your analytics platform." },
  { name: "Calculate your rate", text: "The calculator divides conversions by visitors and multiplies by 100 to give your conversion rate percentage." },
  { name: "Benchmark and act", text: "Compare your result to industry benchmarks. If below average, prioritise A/B testing your CTA, headline, and form length." },
];

export default function ConversionRateCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Conversion Rate Calculator"
        description="Calculate your conversion rate by dividing conversions by total visitors to benchmark landing page and funnel performance."
        url="https://calcfuel.com/calculators/conversion-rate-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Conversion Rate Calculator", url: "https://calcfuel.com/calculators/conversion-rate-calculator" },
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
          <span>Conversion Rate Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Conversion Rate Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Measure how effectively your landing pages and campaigns turn visitors into customers — and identify where to focus your optimisation effort.</p>

        <ConversionRateCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Conversion Rate Is Your Most Powerful Lever</h2>
          <p>Of all the metrics in digital marketing, conversion rate has the most direct and immediate impact on revenue. Unlike traffic growth, which requires time and budget, improving conversion rate produces results from existing traffic — at no additional acquisition cost.</p>
          <p>A funnel converting at 2% that receives 10,000 visitors generates 200 customers. Increase the conversion rate to 4% and you generate 400 customers from the same traffic. That is a 100% revenue increase with zero additional spend on ads.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Conversion Rate Benchmarks by Industry</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Industry</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Avg. Conversion Rate</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Top Quartile</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["E-commerce", "1–3%", "5%+"],
                  ["SaaS (free trial)", "5–10%", "15%+"],
                  ["B2B lead gen", "2–5%", "8%+"],
                  ["Finance / insurance", "5–10%", "12%+"],
                  ["Education (lead gen)", "4–8%", "12%+"],
                  ["Travel", "2–4%", "6%+"],
                ].map(([ind, avg, top]) => (
                  <tr key={ind} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{ind}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{avg}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400 font-medium">{top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Improve Your Conversion Rate</h2>
          <p>Conversion rate optimisation (CRO) is the discipline of systematically testing and improving the elements of your funnel. The highest-impact areas to test:</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Headline clarity.</strong> Your headline has 3 seconds to communicate your value proposition. Test benefit-focused headlines against feature-focused ones.</li>
            <li><strong>CTA copy and placement.</strong> "Start free trial" typically outperforms "Submit". Place CTAs above the fold and after key benefit statements.</li>
            <li><strong>Form length.</strong> Every additional field reduces conversion rate by 5–10%. Remove any field you do not use in the first 30 days.</li>
            <li><strong>Social proof.</strong> Testimonials, case studies, client logos, and review counts reduce purchase anxiety at critical decision points.</li>
            <li><strong>Page load speed.</strong> Every 1-second delay reduces conversion rate by 7%. Optimise images, use a CDN, and minimise JavaScript.</li>
            <li><strong>Message match.</strong> Ensure your ad copy and landing page headline say the same thing. Mismatched messaging is the #1 cause of high bounce rates.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Conversion Rate Across the Full Funnel</h2>
          <p>Every stage of your funnel has its own conversion rate. Tracking them all reveals where you are losing the most value:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Ad CTR</strong> — visitors to landing page (typically 1–5%)</li>
            <li><strong>Landing page conversion</strong> — visitors to leads (typically 2–10%)</li>
            <li><strong>Lead to opportunity</strong> — qualified pipeline rate (typically 10–30%)</li>
            <li><strong>Close rate</strong> — opportunity to customer (typically 20–50%)</li>
          </ul>
          <p>Use the <Link href="/calculators/click-through-rate-calculator" className="text-orange-500 hover:underline">CTR Calculator</Link> to measure top-of-funnel performance and the <Link href="/calculators/cost-per-lead-calculator" className="text-orange-500 hover:underline">Cost Per Lead Calculator</Link> to measure acquisition efficiency.</p>
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
              { label: "Click-Through Rate", href: "/calculators/click-through-rate-calculator" },
              { label: "Cost Per Lead", href: "/calculators/cost-per-lead-calculator" },
              { label: "Customer Acquisition Cost", href: "/calculators/customer-acquisition-cost-calculator" },
              { label: "Marketing ROI", href: "/calculators/marketing-roi-calculator" },
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
