import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import PostLengthOptimizer from "./PostLengthOptimizer";

export const metadata: Metadata = {
  title: "Social Media Post Length Optimizer - Twitter, LinkedIn, Instagram, TikTok",
  description: "Free social media post length optimizer. Paste your post and instantly see if it hits the optimal length for Twitter/X, LinkedIn, Instagram, Facebook, and TikTok.",
};

export default function PostLengthOptimizerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/social-media" className="hover:text-orange-500">Social Media</Link><span className="mx-2">/</span>
        <span>Post Length Optimizer</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Social Media Post Length Optimizer</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Paste your post and get instant feedback on whether it hits the optimal length for each platform — with guidance on how to adjust it for maximum engagement.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <PostLengthOptimizer />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <section className="prose max-w-none">
        <h2>Optimal Post Length by Platform (Research-Backed)</h2>
        <p>Every social media platform has a different algorithm and audience behaviour pattern, and the optimal post length reflects these differences:</p>
        <ul>
          <li><strong>Twitter / X (71–100 characters):</strong> Shorter tweets earn more retweets and replies. The character limit is 280, but the most engaging tweets use roughly one-third of that budget. Save extra characters for links and hashtags if needed.</li>
          <li><strong>LinkedIn (1,900–2,000 characters):</strong> The LinkedIn algorithm rewards long-form value-driven content. Posts that approach the optimal length — and stop short of feeling padded — consistently outperform short posts in reach. The first 210 characters before the &ldquo;see more&rdquo; break are critical for stopping the scroll.</li>
          <li><strong>Instagram (138–150 characters):</strong> Instagram is a visual platform. The caption supports the image but rarely drives the engagement on its own. Keep captions concise and punchy. Hashtags add discoverable length without hurting readability when placed at the end.</li>
          <li><strong>Facebook (40–80 characters):</strong> Despite having a technical limit in the tens of thousands, Facebook&apos;s algorithm strongly favours short posts. Studies consistently show posts at 40–80 characters receive the highest organic reach and engagement rates.</li>
          <li><strong>TikTok (300–500 characters):</strong> TikTok captions influence search discoverability within the app. Keyword-rich captions at 300–500 characters help the algorithm categorise and distribute your content to interested viewers.</li>
        </ul>

        <h2>Why Post Length Affects Engagement</h2>
        <p>Platform algorithms are designed to maximise user time and engagement. They reward content formats that their users historically engage with most. On platforms like Twitter/X where brevity is the norm, short punchy posts match user expectations — long posts feel out of place and are scrolled past. On LinkedIn, users expect professional depth; a two-sentence post signals low effort and receives less algorithmic amplification.</p>
        <p>Understanding the optimal length for each platform is not about gaming the algorithm — it is about matching your content to the context in which it will be consumed. When your post length aligns with user expectations for that platform, more users stop, read, and engage. That engagement signal tells the algorithm the content is valuable, driving further organic distribution.</p>
        <p>When cross-posting content across platforms, always rewrite for each destination rather than copying the same text. A LinkedIn article that works beautifully at 1,900 characters will be completely ignored as a Facebook post at the same length. This tool makes it easy to see at a glance which platforms need editing.</p>
      </section>

      <div className="mt-8 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Related Tools</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/tools/social-media-character-counter" className="text-orange-500 hover:underline font-medium">
              Social Media Character Counter →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Count characters against hard platform limits</span>
          </li>
          <li>
            <Link href="/calculators/social-media-engagement-rate-calculator" className="text-orange-500 hover:underline font-medium">
              Engagement Rate Calculator →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Measure how your posts are performing</span>
          </li>
          <li>
            <Link href="/calculators/social-media-follower-growth-rate-calculator" className="text-orange-500 hover:underline font-medium">
              Follower Growth Rate Calculator →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Track your audience growth over time</span>
          </li>
        </ul>
      </div>

      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
