import type { Metadata } from "next";
import SocialMediaEngagementRateCalc from "./SocialMediaEngagementRateCalc";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Social Media Engagement Rate Calculator - Measure Post Performance",
  description: "Calculate social media engagement rate instantly. Divide total engagements by followers to benchmark your Instagram, LinkedIn, TikTok, or Facebook performance.",
  alternates: { canonical: "/calculators/social-media-engagement-rate-calculator" },
  openGraph: {
    title: "Social Media Engagement Rate Calculator - Measure Post Performance",
    description: "Calculate social media engagement rate instantly. Divide total engagements by followers to benchmark your Instagram, LinkedIn, TikTok, or Facebook performance.",
    url: "https://calcfuel.com/calculators/social-media-engagement-rate-calculator",
    siteName: "CalcFuel",
    type: "website",
  },
};

const faqs = [
  { question: "What is social media engagement rate?", answer: "Engagement rate measures the percentage of your followers who interact with your content through likes, comments, shares, saves, and reactions. It is calculated by dividing total engagements by total followers and multiplying by 100." },
  { question: "What is a good engagement rate on Instagram?", answer: "On Instagram, 1–3% is average, 3–6% is good, and 6%+ is excellent. Micro-influencers (1,000–50,000 followers) typically see higher engagement rates of 4–8% compared to mega-influencers who often see 1–2%." },
  { question: "What counts as an engagement?", answer: "Engagements typically include likes, comments, shares, saves, reactions, and link clicks. The specific definition varies by platform. For branded content tracking, saves and comments are generally more valuable than passive likes." },
  { question: "Why does engagement rate decline as follower count grows?", answer: "As accounts grow, a smaller percentage of followers are highly loyal early adopters. Algorithm reach also varies — larger accounts may not get proportionally more reach than smaller ones, so engagement rate naturally dilutes with scale." },
  { question: "How do I improve social media engagement rate?", answer: "Improve engagement by posting consistently, asking questions in captions, creating content that prompts saves (educational or reference posts), responding to every comment to signal activity to the algorithm, and using polls and interactive stories." },
  { question: "Should I track engagement rate per post or per account?", answer: "Both. Per-account engagement rate tracks overall audience health. Per-post engagement rate reveals which content types, topics, and formats resonate most, allowing you to double down on high-performing content types." },
];

const howToSteps = [
  { name: "Count total engagements", text: "Add up all likes, comments, shares, saves, and reactions across the posts in your measurement period." },
  { name: "Enter total followers", text: "Input your current follower count at the time of measurement." },
  { name: "Calculate engagement rate", text: "The calculator divides engagements by followers and multiplies by 100 to give your engagement rate percentage." },
  { name: "Benchmark by platform", text: "Compare to platform-specific benchmarks — engagement rate standards differ significantly between Instagram, LinkedIn, TikTok, and Facebook." },
];

export default function SocialMediaEngagementRateCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalculatorJsonLd
        name="Social Media Engagement Rate Calculator"
        description="Calculate social media engagement rate by dividing total engagements by followers to benchmark content performance across platforms."
        url="https://calcfuel.com/calculators/social-media-engagement-rate-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "social-media", url: "https://calcfuel.com/calculators/social-media" },
          { name: "Social Media Engagement Rate Calculator", url: "https://calcfuel.com/calculators/social-media-engagement-rate-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">›</span>
          <span>Social Media Engagement Rate Calculator</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">Social Media Engagement Rate Calculator</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Measure how actively your audience interacts with your content — and benchmark your performance against platform-specific standards.</p>

        <SocialMediaEngagementRateCalc />

        <section className="mt-10 prose dark:prose-invert max-w-none">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Engagement Rate Matters More Than Follower Count</h2>
          <p>Follower count is a vanity metric. Engagement rate is a signal of audience quality. An account with 5,000 highly engaged followers is more valuable than one with 50,000 passive followers — both for organic reach and for influencer marketing ROI.</p>
          <p>Social media algorithms on Instagram, TikTok, and LinkedIn all use engagement signals to determine distribution. High engagement on a post signals relevance, which triggers broader algorithmic reach — amplifying your content to non-followers organically.</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Engagement Rate Benchmarks by Platform</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-4 mb-6">
              <thead>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Platform</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Low</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Average</th>
                  <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">Excellent</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Instagram", "<0.5%", "1–3%", "6%+"],
                  ["TikTok", "<3%", "5–9%", "15%+"],
                  ["LinkedIn", "<0.5%", "1–2%", "4%+"],
                  ["Facebook", "<0.1%", "0.2–0.5%", "1%+"],
                  ["Twitter / X", "<0.05%", "0.1–0.3%", "0.5%+"],
                  ["YouTube", "<0.5%", "1–3%", "5%+"],
                ].map(([platform, low, avg, exc]) => (
                  <tr key={platform} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900">
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">{platform}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-red-600 dark:text-red-400">{low}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">{avg}</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400">{exc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Improve Social Media Engagement Rate</h2>
          <p>Engagement rate can be improved through both content strategy and tactical execution:</p>
          <ol className="list-decimal pl-6 mt-3 mb-4 space-y-2">
            <li><strong>Create save-worthy content.</strong> Educational posts, frameworks, templates, and reference guides get saved — which is the highest-value engagement signal on most platforms.</li>
            <li><strong>Ask genuine questions.</strong> A specific, relevant question in the caption drives comments. Avoid generic "What do you think?" prompts — they are overused and ignored.</li>
            <li><strong>Reply to every comment quickly.</strong> Fast replies within the first hour signal engagement to algorithms and encourage further commenting from your audience.</li>
            <li><strong>Post consistently at peak times.</strong> Use platform analytics to identify when your specific audience is most active and post within those windows.</li>
            <li><strong>Use video natively.</strong> Reels, TikToks, and LinkedIn videos consistently outperform static images in both reach and engagement across all platforms.</li>
            <li><strong>Prune your follower base.</strong> Remove clearly fake or bot followers to improve your engagement rate ratio and ensure your metrics accurately reflect real audience behaviour.</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Engagement Rate vs. Reach Rate vs. Impression Rate</h2>
          <p>There are three engagement rate variants worth tracking:</p>
          <ul className="list-disc pl-6 mt-3 mb-4 space-y-1">
            <li><strong>Engagement Rate by Followers</strong> (used by this calculator) — best for comparing accounts of different sizes.</li>
            <li><strong>Engagement Rate by Reach</strong> — divides engagements by accounts reached, not followers. More accurate for measuring content quality on platforms with variable reach.</li>
            <li><strong>Engagement Rate by Impressions</strong> — useful for ads and paid content where impression data is precise.</li>
          </ul>
          <p>For overall account health, use follower-based engagement rate. For individual post analysis, use reach-based rate.</p>
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
              { label: "Social Media ROI", href: "/calculators/social-media-roi-calculator" },
              { label: "Click-Through Rate", href: "/calculators/click-through-rate-calculator" },
              { label: "Conversion Rate", href: "/calculators/conversion-rate-calculator" },
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
