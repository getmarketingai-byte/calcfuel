import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Social Media Calculators — Engagement Rate, Follower Growth & ROI",
  description: "Free social media calculators for engagement rate, follower growth, ROI, and more. Benchmark your social media performance instantly.",
  path: "/calculators/social-media",
});

const tools = [
  { title: "Social Media Engagement Rate Calculator", slug: "social-media-engagement-rate-calculator", description: "Calculate engagement rate by reach, impressions, or followers." },
  { title: "Social Media Follower Growth Rate Calculator", slug: "social-media-follower-growth-rate-calculator", description: "Track how fast your social media following is growing." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Measure the return on investment from your social media campaigns." },
  { title: "Social Media Character Counter", slug: "social-media-character-counter", description: "Count characters for Twitter/X, LinkedIn, Instagram, and more.", path: "/tools/social-media-character-counter" },
  { title: "Social Media Post Length Optimizer", slug: "social-media-post-length-optimizer", description: "Find the optimal post length for maximum engagement on each platform.", path: "/tools/social-media-post-length-optimizer" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calcfuel.com" },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://calcfuel.com/calculators" },
    { "@type": "ListItem", "position": 3, "name": "Social Media Calculators", "item": "https://calcfuel.com/calculators/social-media" },
  ],
};

export default function SocialMediaHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculators</Link><span className="mx-2">/</span>
        <span>Social Media Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Social Media Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free calculators to benchmark and improve your social media performance — engagement, follower growth, ROI, and more.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link key={tool.slug} href={tool.path ?? "/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <article className="prose max-w-none mt-12 mb-8">
        <h2>Social Media Performance Metrics That Drive Revenue</h2>
        <p>Social media is one of the most measurable channels in modern marketing — yet many businesses still rely on vanity metrics like follower counts and likes instead of metrics that tie directly to business outcomes. The most important question is not how many people follow you; it is how much revenue, lead generation, and brand equity your social media investment is producing.</p>
        <p>These free social media calculators help you cut through vanity metrics and calculate the numbers that actually matter: ROI on your social media ad spend, engagement rates that benchmark against industry standards, and follower growth trends that indicate whether your organic strategy is working.</p>

        <h3>Engagement Rate: The Quality Signal</h3>
        <p>Engagement rate measures how actively your audience interacts with your content — likes, comments, shares, and saves — as a percentage of your total followers or reach. Average engagement rates vary by platform: Instagram averages 1–3%, Facebook 0.5–1%, LinkedIn 2–5%, and TikTok 5–9%. Above-average engagement signals content resonance and drives organic reach through platform algorithms. Use the <a href="/calculators/social-media-engagement-rate-calculator">Social Media Engagement Rate Calculator</a> to benchmark your content instantly.</p>

        <h3>Follower Growth Rate: The Long-Term Indicator</h3>
        <p>Follower growth rate tracks how quickly your audience is expanding, net of unfollows. A healthy growth rate is typically 5–15% per month depending on your stage. Stagnant follower growth despite posting consistently indicates either content quality issues, targeting problems, or insufficient promotion of your social profiles across other channels. Track your trajectory with the <a href="/calculators/social-media-follower-growth-rate-calculator">Social Media Follower Growth Rate Calculator</a>.</p>

        <h3>Social Media ROI: The Revenue Measure</h3>
        <p>Social media ROI measures the financial return on your social media advertising investment. It is calculated as: ((Revenue minus Ad Spend) divided by Ad Spend) multiplied by 100. A positive ROI means your social ads are profitable; a negative ROI means you are spending more than you are earning. Most businesses should target a minimum 200% social media ROI — meaning every dollar in ad spend generates at least three dollars in attributed revenue. Calculate yours with the <a href="/calculators/social-media-roi-calculator">Social Media ROI Calculator</a>.</p>

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
          <li><strong>Align content to the buyer journey.</strong> Top-of-funnel content should educate and build awareness. Bottom-of-funnel content should convert. Mixing these up is the most common social media advertising mistake.</li>
          <li><strong>Post consistently for organic growth.</strong> Platforms reward consistent posting schedules. Aim for at least 3–5 posts per week on your primary platform.</li>
          <li><strong>Track attribution properly.</strong> Use UTM parameters on all social media links, connect your ad platforms to Google Analytics, and review which social channels drive closed revenue — not just top-of-funnel clicks.</li>
        </ol>
      </article>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />

      <ProductCTASection variant="email_social_seo" />
    </div>
  );
}
