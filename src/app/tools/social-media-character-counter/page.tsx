import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import CharacterCounter from "./CharacterCounter";

export const metadata: Metadata = {
  title: "Social Media Character Counter — Twitter, LinkedIn, Instagram & Facebook | CalcFuel",
  description: "Free social media character counter. Instantly count characters for Twitter/X (280), LinkedIn (3000), Instagram (2200), and Facebook with a live visual indicator.",
  alternates: {
    canonical: "/tools/social-media-character-counter",
  },
  openGraph: {
    title: "Social Media Character Counter — Twitter, LinkedIn, Instagram & Facebook",
    description: "Instantly count characters for Twitter/X, LinkedIn, Instagram, and Facebook with a live visual indicator.",
    url: "https://calcfuel.com/tools/social-media-character-counter",
    type: "website",
  },
};

export default function CharacterCounterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Social Media Character Counter"
        description="Free social media character counter. Instantly count characters for Twitter/X (280), LinkedIn (3000), Instagram (2200), and Facebook with a live visual indicator."
        url="https://calcfuel.com/tools/social-media-character-counter"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Social Media", url: "https://calcfuel.com/calculators/social-media" },
          { name: "Character Counter", url: "https://calcfuel.com/tools/social-media-character-counter" },
        ]}
      datePublished="2025-10-01"
      dateModified="2026-05-15"
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/social-media" className="hover:text-orange-500">Social Media</Link><span className="mx-2">/</span>
        <span>Character Counter</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Social Media Character Counter</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Write your post and see live character count against each platform&apos;s limit. Supports Twitter/X, LinkedIn, Instagram, and Facebook.
      </p>
      <CalcReviewedBy />
      <CharacterCounter />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="mt-[150px] mb-8" />

      <section className="prose max-w-none">
        <h2>What Is a Social Media Character Counter?</h2>
        <p>
          A character counter shows how many characters your post uses compared to each platform&apos;s
          limit. Hard limits block publishing — X caps posts at 280 characters, while LinkedIn allows
          up to 3,000. But the best-performing posts are often much shorter than the maximum. This tool
          updates in real time as you type so you can trim, expand, or rewrite before you schedule.
        </p>

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

        <h2>Frequently Asked Questions</h2>
        <h3>Do emojis and hashtags count toward the character limit?</h3>
        <p>Yes on X, LinkedIn, Instagram, and Facebook — emojis typically count as one or two characters depending on the Unicode code point. Hashtags and @mentions count as regular characters. URLs may be shortened by the platform (especially on X), but it is safest to count the full URL length when drafting.</p>
        <h3>What is the ideal tweet length?</h3>
        <p>Although X allows 280 characters, tweets between 71 and 100 characters historically earn the highest engagement. Leave room for a link (23 characters on X when shortened) and one or two hashtags if you use them.</p>
        <h3>How long should a LinkedIn post be?</h3>
        <p>LinkedIn rewards depth: posts around 1,900–2,000 characters often perform well for thought leadership. The first ~210 characters appear before &ldquo;see more&rdquo; on desktop — put your hook there.</p>
        <h3>Should I use the same caption on every platform?</h3>
        <p>No. Repurposing is fine, but rewrite for each network&apos;s norms. A concise Instagram caption and a long-form LinkedIn post can share the same idea with different lengths and tone.</p>
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
    </div>
  );
}
