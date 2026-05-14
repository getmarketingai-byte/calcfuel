import type { Metadata } from "next";
import EmailListGrowthRateCalc from "./EmailListGrowthRateCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email List Growth Rate Calculator — Track Subscriber Growth | CalcFuel",
  description: "Calculate your email list growth rate instantly. Enter new subscribers, unsubscribes, and starting list size to measure list momentum and benchmark against industry averages.",
  alternates: { canonical: "/calculators/email-list-growth-rate-calculator" },
  openGraph: {
    title: "Email List Growth Rate Calculator - Track Subscriber Growth",
    description: "Calculate your email list growth rate instantly. Enter new subscribers, unsubscribes, and starting list size to measure list momentum and benchmark against industry averages.",
    url: "https://calcfuel.com/calculators/email-list-growth-rate-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is email list growth rate?", answer: "Email list growth rate measures the net increase in your subscriber list as a percentage of your starting list size. It accounts for both new subscribers gained and unsubscribes lost in the period." },
  { question: "What is a good email list growth rate?", answer: "A healthy email list growth rate is 5–10% per month. Above 10% indicates strong momentum. Below 2% per month means your list is stagnating, and a negative rate means you are losing more subscribers than you are gaining." },
  { question: "Why does email list growth rate matter?", answer: "Email lists naturally decay at 2–3% per month due to unsubscribes, bounces, and inactivity. Without consistent growth, your list shrinks over time. A healthy growth rate ensures your reach expands rather than contracts." },
  { question: "What are the best ways to grow an email list?", answer: "Effective list growth tactics include gated lead magnets (guides, templates, calculators), exit-intent popups, embedded forms in blog content, social media lead ads, webinar registrations, and referral programs with subscriber incentives." },
  { question: "How do I reduce my unsubscribe rate?", answer: "Reduce unsubscribes by segmenting your list and sending more relevant content, managing send frequency, setting expectations at signup, and sending re-engagement campaigns before removing inactive subscribers." },
  { question: "Should I remove inactive subscribers?", answer: "Yes. Inactive subscribers hurt deliverability by lowering engagement rates, which causes email providers to treat your mail as less relevant. Remove or re-engage subscribers who have not opened in 6–12 months to maintain list health." },
];

const howToSteps = [
  { name: "Enter new subscribers gained", text: "Input the number of new subscribers who joined your list in the measurement period." },
  { name: "Enter unsubscribes", text: "Input the number of people who unsubscribed in the same period. Leave blank or enter 0 if unknown." },
  { name: "Enter starting list size", text: "Input the total number of subscribers at the start of the measurement period." },
  { name: "Review your growth rate", text: "The calculator shows your net growth rate as a percentage. Aim for consistent positive growth month over month." },
];

export default function EmailListGrowthRateCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Email List Growth Rate Calculator"
        description="Calculate email list growth rate by accounting for new subscribers and unsubscribes relative to starting list size."
        url="https://calcfuel.com/calculators/email-list-growth-rate-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "email-marketing", url: "https://calcfuel.com/calculators/email-marketing" },
          { name: "Email List Growth Rate Calculator", url: "https://calcfuel.com/calculators/email-list-growth-rate-calculator" },
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
          <span>Email List Growth Rate Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Email List Growth Rate Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Track the health and momentum of your email list — and understand whether you are building an audience or watching it slowly erode.</p>

        <EmailListGrowthRateCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Email List Growth Rate Matters</h2>
          <p>Email is one of the highest-ROI marketing channels available — but only if your list is growing. Email lists naturally decay over time. Subscribers unsubscribe, change email addresses, become inactive, or bounce. Without active growth, your reachable audience shrinks every month.</p>
          <p>The average email list loses 2–3% of subscribers per month through natural decay. That means without adding new subscribers, a list of 10,000 shrinks to around 7,000 in just one year. Email list growth rate tracks whether your acquisition is outpacing this decay.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Email List Growth Rate Benchmarks</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Growth Rate</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Assessment</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["10%+ per month", "Excellent", "Scale your best-converting channels"],
                  ["5–10% per month", "Good", "Maintain and test new acquisition sources"],
                  ["2–5% per month", "Average", "Increase lead magnet value and form placement"],
                  ["0–2% per month", "Slow", "Audit acquisition channels and double down on top performers"],
                  ["Negative", "Shrinking", "Pause campaigns and fix retention before scaling"],
                ].map(([rate, assess, action]) => (
                  <tr key={rate} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{rate}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{assess}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Best Strategies to Grow Your Email List</h2>
          <p>Sustainable list growth comes from multiple acquisition channels working in parallel. Here are the highest-converting tactics:</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>High-value lead magnets.</strong> Offer something genuinely useful in exchange for an email: a free guide, template, calculator, audit, or mini-course. The more specific the pain solved, the higher the conversion rate.</li>
            <li><strong>Embedded forms in blog content.</strong> Place opt-in forms within high-traffic blog posts, especially at natural engagement points like after an actionable section.</li>
            <li><strong>Exit-intent popups.</strong> Well-timed exit-intent overlays can convert 3–5% of leaving visitors. Keep the copy specific and the ask minimal.</li>
            <li><strong>Social media lead ads.</strong> Meta and LinkedIn lead ads pre-fill contact information, removing friction and producing high volume at lower CPL than landing page routes.</li>
            <li><strong>Content upgrades.</strong> Offer a downloadable version or bonus resource within specific posts. Converts at 2–5× higher rates than generic newsletter CTAs.</li>
            <li><strong>Referral incentives.</strong> Reward existing subscribers for referring friends. Referred subscribers have higher open rates and longer retention.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Reducing Unsubscribes to Protect Growth Rate</h2>
          <p>Growth rate depends on both acquisition and retention. Cutting your unsubscribe rate has an equal effect on growth rate as adding new subscribers. Key retention tactics:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Set clear expectations at signup.</strong> Tell subscribers what they will receive, how often, and what topics. Expectation mismatch is the #1 driver of unsubscribes.</li>
            <li><strong>Segment by interest and behaviour.</strong> Send relevant content to relevant segments rather than blasting everyone with everything.</li>
            <li><strong>Let subscribers control frequency.</strong> Offer a "reduce frequency" option before an unsubscribe, capturing subscribers who want to hear from you less often but not never.</li>
            <li><strong>Run re-engagement campaigns.</strong> Before removing inactive subscribers, send a re-engagement sequence. You will retain 10–20% and clean out the rest to improve deliverability.</li>
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
              { label: "Email Open Rate", href: "/calculators/email-open-rate-calculator" },
              { label: "Click-Through Rate", href: "/calculators/click-through-rate-calculator" },
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
