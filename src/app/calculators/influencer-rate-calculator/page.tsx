import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import InfluencerRateCalc from "./InfluencerRateCalc";

export const metadata: Metadata = {
  title: "Influencer Rate Calculator — Sponsored Post Pricing | CalcFuel",
  description:
    "Free influencer rate calculator. Estimate fair sponsored-post rates by platform, followers, engagement, niche, usage rights, and exclusivity. Low, mid, and high range.",
  alternates: { canonical: "/calculators/influencer-rate-calculator" },
};

const relatedTools = [
  { title: "CPM Calculator", slug: "cpm-calculator", description: "Solve campaign cost, CPM, or impressions — enter any two values." },
  { title: "Social Media Engagement Rate Calculator", slug: "social-media-engagement-rate-calculator", description: "Calculate engagement rate by reach, impressions, or followers." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Measure the return on investment from your social media campaigns." },
  { title: "Social Media Follower Growth Rate Calculator", slug: "social-media-follower-growth-rate-calculator", description: "Track how fast your social media following is growing." },
  { title: "Click-Through Rate Calculator", slug: "click-through-rate-calculator", description: "Calculate CTR from clicks and impressions for ad campaigns." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure return on your overall marketing investment." },
];

const faqs = [
  {
    question: "How much should I charge for a sponsored post?",
    answer:
      "A common starting point is (followers ÷ 1,000) × platform CPM × niche multiplier × engagement multiplier, then add uplifts for usage rights and exclusivity. This calculator applies that formula and shows a low–mid–high range (±20% of mid) so you can negotiate with confidence.",
  },
  {
    question: "What CPM should I use per 1,000 followers?",
    answer:
      "Platform presets provide starting CPMs: Instagram around $10, TikTok $8, YouTube $25, LinkedIn $35, and X around $6 per 1,000 followers. These are planning benchmarks in AUD — edit the CPM field to reflect your market, audience quality, and past campaign results.",
  },
  {
    question: "How does engagement rate affect influencer pricing?",
    answer:
      "Higher engagement signals an active, responsive audience and commands premium rates. This calculator applies multipliers: below 1% engagement uses 0.7×, 1–3% uses 1.0×, 3–8% uses 1.2×, and above 8% uses 1.35×. Calculate your engagement rate with our Social Media Engagement Rate Calculator.",
  },
  {
    question: "What is a niche multiplier?",
    answer:
      "Niche multipliers adjust rates based on advertiser demand and audience value. Finance and B2B audiences (1.5×) typically command more than lifestyle (1.0×) or meme/entertainment accounts (0.7×). Beauty sits at 1.1× and tech at 1.2× in this calculator.",
  },
  {
    question: "What are usage rights and exclusivity uplifts?",
    answer:
      "Usage rights uplift compensates you when a brand wants to reuse your content in ads, on their website, or in email campaigns beyond the original post. Exclusivity uplift applies when you agree not to promote competing brands for a period. Both are modelled as additive percentages of the base rate.",
  },
  {
    question: "Why does the calculator show a rate range?",
    answer:
      "Influencer pricing is negotiated, not fixed. The mid estimate is your anchor; the low and high values (±20%) give you a realistic negotiation band. Factors like deliverable type (Reel vs Story), production quality, and brand budget can push quotes outside this range.",
  },
  {
    question: "Is this calculator for brands or creators?",
    answer:
      "Both. Creators use it to set fair minimum rates; brands and agencies use it to sanity-check quotes before committing budget. Pair it with the CPM Calculator and Social Media ROI Calculator to connect influencer spend to campaign outcomes.",
  },
];

const howToSteps = [
  { name: "Select your platform", text: "Choose Instagram, TikTok, YouTube, LinkedIn, or X to load a base CPM per 1,000 followers." },
  { name: "Enter audience metrics", text: "Add your follower count and average engagement rate percentage." },
  { name: "Choose your niche", text: "Select a niche multiplier that reflects your content category and advertiser demand." },
  { name: "Add usage and exclusivity", text: "Enter uplift percentages if the brand wants extended usage rights or category exclusivity." },
  { name: "Review your rate range", text: "See low, mid, and high per-post estimates instantly — use mid as your negotiation anchor." },
];

export default function InfluencerRateCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Influencer Rate Calculator"
        description="Free influencer rate calculator. Estimate fair sponsored-post rates by platform, followers, engagement, niche, usage rights, and exclusivity."
        url="https://calcfuel.com/calculators/influencer-rate-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Social Media Calculators", url: "https://calcfuel.com/calculators/social-media" },
          { name: "Influencer Rate Calculator", url: "https://calcfuel.com/calculators/influencer-rate-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/social-media" className="hover:text-orange-500">Social Media</Link>
        <span className="mx-2">/</span>
        <span>Influencer Rate Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Influencer Rate Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Estimate fair sponsored-post rates based on your platform, followers, engagement, niche, and deal terms. Get low, mid, and high pricing ranges instantly — free for creators and brands.
      </p>
      <CalcReviewedBy lastUpdated="July 2026" />
      <InfluencerRateCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How to Price Influencer Sponsored Posts</h2>
        <p>
          &quot;What should I charge for a sponsored post?&quot; is one of the most common questions in the creator economy — and one of the hardest to answer without data. Charge too little and you leave money on the table; charge too much and brands go to the next creator in their spreadsheet. The sweet spot depends on your platform, audience size, engagement quality, content niche, and the specific deliverables a brand wants.
        </p>
        <p>
          This influencer rate calculator uses a transparent formula built on industry-standard inputs: a base CPM per 1,000 followers, adjusted for engagement and niche, with optional uplifts for usage rights and exclusivity. It outputs a mid estimate plus a ±20% range so you have a negotiation band, not just a single number that may not fit every deal.
        </p>

        <h2>The Influencer Pricing Formula</h2>
        <p>
          The core calculation is:
        </p>
        <ul>
          <li><strong>Base rate</strong> = (followers ÷ 1,000) × platform CPM × niche multiplier × engagement multiplier</li>
          <li><strong>Mid rate</strong> = base × (1 + usage rights uplift% + exclusivity uplift%)</li>
          <li><strong>Range</strong> = mid × 0.8 (low) to mid × 1.2 (high)</li>
        </ul>
        <p>
          Engagement multipliers reward creators whose audiences actually interact: below 1% engagement applies a 0.7× discount, 1–3% is neutral at 1.0×, 3–8% earns a 1.2× premium, and above 8% earns 1.35×. A creator with 50,000 followers and 5% engagement is worth more per post than one with 100,000 followers at 0.5% engagement — and this formula reflects that.
        </p>

        <h2>Platform CPM Benchmarks</h2>
        <p>
          Each platform has different advertiser demand, content production costs, and audience expectations. Default CPM values in this calculator (per 1,000 followers, in AUD):
        </p>
        <ul>
          <li><strong>Instagram:</strong> $10 — strong for lifestyle, beauty, and product-focused campaigns</li>
          <li><strong>TikTok:</strong> $8 — high reach potential but younger demographics and shorter content lifespan</li>
          <li><strong>YouTube:</strong> $25 — long-form integration and higher production effort justify premium rates</li>
          <li><strong>LinkedIn:</strong> $35 — B2B audiences command the highest CPMs due to professional targeting value</li>
          <li><strong>X (Twitter):</strong> $6 — lower CPMs reflect shorter content and declining organic reach for many accounts</li>
        </ul>
        <p>
          These are editable starting points. If you have historical campaign data, replace the CPM with your actual average revenue per 1,000 followers.
        </p>

        <h2>Niche Multipliers Explained</h2>
        <p>
          Not all followers are equal in advertiser value. Finance and B2B creators (1.5× multiplier) attract brands willing to pay premium rates because their audiences have high lifetime value. Tech creators (1.2×) sit in a growing category with strong SaaS and hardware ad spend. Beauty (1.1×) benefits from repeat-purchase product categories. Lifestyle (1.0×) is the baseline. Meme and entertainment accounts (0.7×) often have large but less purchase-intent audiences, which compresses rates despite high follower counts.
        </p>

        <h2>Usage Rights and Exclusivity</h2>
        <p>
          A standard sponsored post rate typically covers one piece of content published on your channel for an agreed period. When brands want more, you should charge more:
        </p>
        <ul>
          <li><strong>Usage rights uplift:</strong> The brand wants to run your content in paid ads, on their website, in email newsletters, or in retail displays. A 25–50% uplift is common for 6–12 month usage rights.</li>
          <li><strong>Exclusivity uplift:</strong> You agree not to promote competing brands in the same category for a defined period. A 15–30% uplift is typical for 30-day category exclusivity; longer or broader exclusivity warrants more.</li>
        </ul>
        <p>
          Both uplifts are additive percentages of the base rate in this calculator. A $1,000 base with 30% usage rights and 20% exclusivity becomes $1,500 mid.
        </p>

        <h2>Worked Example</h2>
        <p>
          A tech creator on Instagram with 80,000 followers, 4.2% engagement, offering standard usage (no uplift) and no exclusivity:
        </p>
        <ul>
          <li>Base = (80,000 ÷ 1,000) × $10 × 1.2 tech × 1.2 engagement = <strong>$1,152</strong></li>
          <li>Low = $1,152 × 0.8 = <strong>$922</strong></li>
          <li>Mid = <strong>$1,152</strong></li>
          <li>High = $1,152 × 1.2 = <strong>$1,382</strong></li>
        </ul>
        <p>
          Add 40% usage rights uplift for the brand to use the Reel in paid ads for 12 months: mid becomes $1,152 × 1.4 = <strong>$1,613</strong>.
        </p>

        <h2>For Brands: Budgeting Influencer Campaigns</h2>
        <p>
          Brands should use this calculator to sanity-check creator quotes before signing contracts. If a creator with 20,000 followers and 2% engagement quotes $5,000 for a single Instagram Story, the mid estimate here might be $200–$300 — a significant gap worth discussing. Conversely, a LinkedIn creator with 15,000 highly engaged B2B followers may be underpricing at $500 when the calculator suggests $800+.
        </p>
        <p>
          Connect influencer spend to outcomes using the <Link href="/calculators/cpm-calculator">CPM Calculator</Link>, <Link href="/calculators/social-media-roi-calculator">Social Media ROI Calculator</Link>, and <Link href="/calculators/marketing-roi-calculator">Marketing ROI Calculator</Link>. Track audience quality with the <Link href="/calculators/social-media-engagement-rate-calculator">Engagement Rate Calculator</Link> and <Link href="/calculators/click-through-rate-calculator">CTR Calculator</Link>.
        </p>

        <h2>What This Calculator Does Not Include</h2>
        <p>
          Production costs (photography, video editing, studio time), travel, product seeding, whitelisting fees, affiliate commission structures, and multi-post package discounts are not modelled here. Bundle pricing, long-term ambassador deals, and performance-based bonuses require custom negotiation beyond any formula. Use this tool as a starting anchor, not a contract rate.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> Influencer rates vary widely by market, deliverable type, and individual creator value. This calculator provides planning estimates only and should not be treated as financial or contractual advice. Negotiate final rates based on your specific campaign requirements.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
