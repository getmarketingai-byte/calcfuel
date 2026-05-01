import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import CharacterCounter from "./CharacterCounter";

export const metadata: Metadata = {
  title: "Social Media Character Counter - Twitter, LinkedIn, Instagram, Facebook",
  description: "Free social media character counter. Instantly count characters for Twitter/X (280), LinkedIn (3000), Instagram (2200), and Facebook with a live visual indicator.",
};

export default function CharacterCounterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/social-media" className="hover:text-orange-500">Social Media</Link><span className="mx-2">/</span>
        <span>Character Counter</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Social Media Character Counter</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Write your post and see live character count against each platform&apos;s limit. Supports Twitter/X, LinkedIn, Instagram, and Facebook.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <CharacterCounter />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <section className="prose max-w-none">
        <h2>Platform Character Limits at a Glance</h2>
        <ul>
          <li><strong>Twitter / X:</strong> 280 characters (hard limit). Go over and you cannot post. For maximum engagement, studies show tweets between 71–100 characters receive the most retweets.</li>
          <li><strong>LinkedIn:</strong> 3,000 characters for posts. The &ldquo;see more&rdquo; truncation kicks in after ~210 characters on desktop and ~140 on mobile — front-load your key message. For maximum organic reach, research suggests 1,900–2,000 characters performs best.</li>
          <li><strong>Instagram:</strong> 2,200 characters for captions. Captions are truncated after the first few lines in the feed — the hook must work immediately. Studies show captions at 138–150 characters drive the highest engagement rates.</li>
          <li><strong>Facebook:</strong> Technical limit is 63,206 characters, but for maximum reach and engagement keep posts under 80 characters. Short, punchy posts consistently outperform long-form content on Facebook&apos;s algorithm.</li>
        </ul>

        <h2>Why Character Count Matters</h2>
        <p>Every platform has both a hard character limit and an optimal engagement range — and they&apos;re rarely the same number. Staying within the limit is the floor; optimising for the engagement sweet spot is the ceiling. Posts that ignore these nuances often receive a fraction of the reach they could achieve.</p>
        <p>On Twitter/X, going right up to the 280-character limit is rarely optimal — shorter, sharper tweets tend to get more replies and retweets. On LinkedIn, longer posts that provide genuine value are rewarded by the algorithm, but only if they hook the reader in the first two lines before the &ldquo;see more&rdquo; break. On Instagram, the visual does most of the work; the caption adds context and drives comments, but rarely benefits from being exhaustive.</p>
        <p>Use this tool to draft and refine posts before scheduling. Check your character count across all four platforms when you are cross-posting the same content — a post optimised for LinkedIn often needs significant editing before it works on Twitter/X.</p>
      </section>

      <div className="mt-8 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Related Tools</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/tools/social-media-post-length-optimizer" className="text-orange-500 hover:underline font-medium">
              Social Media Post Length Optimizer →
            </Link>
            <span className="text-gray-600 dark:text-gray-400 ml-2">Get platform-specific length recommendations for your post</span>
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
