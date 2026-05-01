import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Social Media Calculators",
  description: "Free social media calculators: ROI, engagement rate, follower growth rate, and more.",
};

const tools = [
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Calculate the ROI of your social media ad campaigns." },
];

export default function SocialMediaHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Social Media Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Social Media Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Measure your social media performance with these free calculators.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <article className="prose max-w-none">
        <h2>Measuring Social Media Performance</h2>
        <p>Social media is one of the most measurable channels in modern marketing — yet many businesses still rely on vanity metrics like follower counts and likes instead of metrics that tie directly to business outcomes. The most important question is not how many people follow you; it is how much revenue, lead generation, and brand equity your social media investment is producing.</p>
        <p>These free social media calculators help you cut through vanity metrics and calculate the numbers that actually matter: ROI on your social media ad spend, engagement rates that benchmark against industry standards, and follower growth trends that indicate whether your organic strategy is working.</p>

        <h2>Core Social Media Metrics</h2>
        <h3>Social Media ROI</h3>
        <p>Social media ROI measures the financial return on your social media advertising investment. It is calculated as: ((Revenue minus Ad Spend) divided by Ad Spend) multiplied by 100. A positive ROI means your social ads are profitable; a negative ROI means you are spending more than you are earning. Most businesses should target a minimum 200% social media ROI — meaning every dollar in ad spend generates at least three dollars in attributed revenue.</p>
        <h3>Engagement Rate</h3>
        <p>Engagement rate measures how actively your audience interacts with your content — likes, comments, shares, and saves — as a percentage of your total followers or reach. Average engagement rates vary by platform: Instagram averages 1–3%, Facebook 0.5–1%, LinkedIn 2–5%, and TikTok 5–9%. Above-average engagement signals content resonance and drives organic reach through platform algorithms.</p>
        <h3>Follower Growth Rate</h3>
        <p>Follower growth rate tracks how quickly your audience is expanding, net of unfollows. A healthy growth rate is typically 5–15% per month depending on your stage. Stagnant follower growth despite posting consistently indicates either content quality issues, targeting problems, or insufficient promotion of your social profiles across other channels.</p>

        <h2>Social Media Benchmarks by Platform</h2>
        <ul>
          <li><strong>Facebook Ads:</strong> Average CPC $0.50–$3.00, average conversion rate 1–3%</li>
          <li><strong>Instagram Ads:</strong> Average CPC $0.70–$1.50, engagement rate 1–3%</li>
          <li><strong>LinkedIn Ads:</strong> Average CPC $5–$15 (higher quality B2B leads), engagement rate 2–5%</li>
          <li><strong>TikTok Ads:</strong> Average CPC $0.20–$1.00, engagement rate 5–9%</li>
          <li><strong>Target social media ROI:</strong> 200%+ (3:1 revenue-to-spend ratio)</li>
        </ul>

        <h2>How to Improve Your Social Media Performance</h2>
        <ol>
          <li><strong>Focus budget on proven formats.</strong> Video consistently outperforms static images on every major platform. Before scaling ad spend, test creative formats and double down on what drives the lowest cost per acquisition.</li>
          <li><strong>Use retargeting aggressively.</strong> Website visitors and video viewers convert 3–5 times better than cold audiences. Allocate at least 20–30% of your social ad budget to retargeting warm audiences.</li>
          <li><strong>Align content to the buyer journey.</strong> Top-of-funnel content should educate and build awareness (broad targeting, low bid). Bottom-of-funnel content should convert (narrow targeting, stronger CTA). Mixing these up is the most common social media advertising mistake.</li>
          <li><strong>Post consistently for organic growth.</strong> Platforms reward consistent posting schedules. Aim for at least 3–5 posts per week on your primary platform. Quality matters more than quantity — one strong post outperforms five mediocre ones.</li>
          <li><strong>Track attribution properly.</strong> Use UTM parameters on all social media links, connect your ad platforms to Google Analytics, and review which social channels drive closed revenue — not just top-of-funnel clicks.</li>
        </ol>
      </article>
    </div>
  );
}
