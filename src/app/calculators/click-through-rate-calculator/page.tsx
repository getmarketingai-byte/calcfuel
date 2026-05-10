import type { Metadata } from "next";
import CTRCalc from "./CTRCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Click-Through Rate Calculator - Calculate CTR for Ads & Email",
  description: "Calculate click-through rate (CTR) instantly. Divide total clicks by impressions to benchmark your ad, email, or organic search performance against industry averages.",
  alternates: { canonical: "/calculators/click-through-rate-calculator" },
  openGraph: {
    title: "Click-Through Rate Calculator - Calculate CTR for Ads & Email",
    description: "Calculate click-through rate (CTR) instantly. Divide total clicks by impressions to benchmark your ad, email, or organic search performance against industry averages.",
    url: "https://calcfuel.com/calculators/click-through-rate-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is Click-Through Rate (CTR)?", answer: "CTR is the percentage of people who click on a link, ad, or email out of all those who saw it (impressions). It is calculated by dividing clicks by impressions and multiplying by 100. CTR measures how compelling your creative, copy, or listing is at driving action." },
  { question: "What is a good CTR for Google Ads?", answer: "The average Google Search Ads CTR is 3–5%. Top-performing ads achieve 8–10%+. Display network ads have lower average CTRs of 0.1–0.3%. A 'good' CTR varies by industry, keyword type, and ad position." },
  { question: "What is a good CTR for email campaigns?", answer: "Email CTR averages 2–5% across industries. B2B emails often see 3–6%, while promotional B2C emails average 1–3%. Top performers with highly segmented lists can achieve 10%+. Note that email CTR is calculated against delivered emails, not opens." },
  { question: "Does a higher CTR always mean better performance?", answer: "Not necessarily. A high CTR on a poorly targeted audience drives traffic that does not convert. Always pair CTR with conversion rate and ROI to measure true campaign effectiveness. A lower CTR from a highly targeted audience can deliver better results than a high CTR from a broad audience." },
  { question: "How does CTR affect Google Ads Quality Score?", answer: "CTR is a major factor in Google Ads Quality Score, which directly affects your cost-per-click and ad position. Higher CTR signals that your ad is relevant to the search query, improving Quality Score and lowering your effective CPC." },
  { question: "What is the difference between CTR and open rate for email?", answer: "Email open rate measures the percentage of recipients who opened the email. CTR (or click-to-open rate, CTOR) measures clicks as a percentage of opens. CTOR is often more useful as it measures how compelling your email body content is, independent of subject line performance." },
];

const howToSteps = [
  { name: "Enter total clicks", text: "Input the number of clicks your ad, email, or listing received in the measurement period." },
  { name: "Enter total impressions", text: "Input the number of times your ad or content was shown (impressions or sends for email)." },
  { name: "Calculate your CTR", text: "The calculator divides clicks by impressions and multiplies by 100 to give your CTR percentage." },
  { name: "Benchmark against your channel", text: "Compare to the benchmarks for your specific channel — search, display, email, or social — as averages vary significantly." },
];

export default function ClickThroughRateCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Click-Through Rate Calculator"
        description="Calculate CTR by dividing clicks by impressions to benchmark ad, email, and organic search performance."
        url="https://calcfuel.com/calculators/click-through-rate-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "email-marketing", url: "https://calcfuel.com/calculators/email-marketing" },
          { name: "Click-Through Rate Calculator", url: "https://calcfuel.com/calculators/click-through-rate-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">›</span>
          <span>Click-Through Rate Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Click-Through Rate Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Measure the pull of your ads, emails, and listings — and compare your CTR against industry benchmarks for every major channel.</p>

        <CTRCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What Is Click-Through Rate?</h2>
          <p>Click-Through Rate (CTR) is one of the most widely used metrics in digital marketing. It measures how many people who saw your content actually clicked on it. A high CTR means your messaging is resonating with your audience and compelling them to take the next step.</p>
          <p>CTR is relevant across every digital channel: paid search, display, email, social, and organic search (where Google Search Console reports position and CTR for your pages).</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CTR Benchmarks by Channel</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Channel</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Average CTR</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Top Performer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Google Search Ads", "3–5%", "8–10%+"],
                  ["Google Display Ads", "0.1–0.3%", "0.5%+"],
                  ["Meta Ads (Feed)", "0.9–1.5%", "3%+"],
                  ["Email Campaigns", "2–5%", "10%+"],
                  ["Organic Search (Position 1)", "25–35%", "40%+"],
                  ["LinkedIn Ads", "0.4–0.6%", "1%+"],
                ].map(([ch, avg, top]) => (
                  <tr key={ch} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{ch}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{avg}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400 font-medium">{top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Improve CTR</h2>
          <p>CTR is one of the most testable metrics in marketing. Small improvements compound quickly across large impression volumes.</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Write benefit-driven headlines.</strong> Focus on the outcome, not the feature. "Double your leads in 30 days" outperforms "Lead generation software".</li>
            <li><strong>Use numbers and specifics.</strong> "7 ways to reduce CAC" typically outperforms "Ways to reduce CAC".</li>
            <li><strong>Add urgency or scarcity.</strong> "Limited spots", "ends Friday", and countdown timers improve CTR in both ads and email subject lines.</li>
            <li><strong>Test ad extensions.</strong> Sitelinks, callouts, and structured snippets in Google Ads increase real estate and improve CTR with no additional cost per click.</li>
            <li><strong>Segment your email list.</strong> Highly targeted emails to small, relevant segments consistently outperform broad blasts in CTR and conversion.</li>
            <li><strong>Test subject lines relentlessly.</strong> Subject line is the biggest driver of email CTR. Use A/B tests in every send above 5,000 subscribers.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CTR Downstream Effects</h2>
          <p>A higher CTR has compounding effects beyond the click itself:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Lower CPC in Google Ads</strong> — Higher Quality Score from better CTR reduces your cost per click by 15–30%.</li>
            <li><strong>More budget efficiency</strong> — If you are sending email, higher CTR means more revenue from the same list without additional send cost.</li>
            <li><strong>Better organic rankings</strong> — Google uses organic CTR as a ranking signal. Improving CTR from position 5 can help push pages higher over time.</li>
          </ul>
          <p>Pair CTR analysis with the <Link href="/calculators/conversion-rate-calculator" className="text-orange-500 hover:underline">Conversion Rate Calculator</Link> to measure the full funnel from impression to customer.</p>
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
              { label: "Conversion Rate", href: "/calculators/conversion-rate-calculator" },
              { label: "Cost Per Lead", href: "/calculators/cost-per-lead-calculator" },
              { label: "Email Open Rate", href: "/calculators/email-open-rate-calculator" },
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
