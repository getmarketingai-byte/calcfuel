import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import MarketingScore from "./MarketingScore";

export const metadata: Metadata = {
  title: "Marketing Health Score — Rate Your Marketing in 2 Minutes",
  description:
    "Free marketing health score quiz. Answer 7 questions and get your score out of 100 with a letter grade and 3 personalised recommendations. Share your result.",
  openGraph: {
    title: "Marketing Health Score — Rate Your Marketing in 2 Minutes",
    description:
      "Answer 7 quick questions and find out your marketing health score out of 100. Free, instant, shareable.",
    url: "https://calcfuel.com/tools/marketing-score",
    type: "website",
  },
  alternates: {
    canonical: "/tools/marketing-score",
  },
};

export default function MarketingScorePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Marketing Health Score Quiz"
        description="Free 7-question marketing health score quiz. Get your score out of 100 with a letter grade and personalised recommendations."
        url="https://calcfuel.com/tools/marketing-score"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Tools", url: "https://calcfuel.com/tools" },
          { name: "Marketing Health Score", url: "https://calcfuel.com/tools/marketing-score" },
        ]}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Marketing Health Score</span>
      </nav>

      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          What&rsquo;s Your Marketing Health Score?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Answer 7 quick questions. Get your score out of 100, a letter grade, and your top 3 improvements.
          Takes about 2 minutes.
        </p>
      </div>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <MarketingScore />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-10" />

      <section className="prose dark:prose-invert max-w-none mt-4">
        <h2>What is a marketing health score?</h2>
        <p>
          A marketing health score is a quick diagnostic that measures how strong your marketing fundamentals are
          across the seven core disciplines that drive business growth: social media consistency, email marketing,
          search visibility, content production, analytics and tracking, paid advertising efficiency, and customer
          retention.
        </p>
        <p>
          The score is calculated from 7 questions, each assessing a specific marketing pillar. Your total points
          are converted to a score out of 100 with a letter grade from A (80-100, excellent) to F (below 35, needs
          significant work). Most small businesses score between 30 and 60 on their first attempt.
        </p>

        <h2>Why these 7 pillars?</h2>
        <p>
          These seven pillars represent the minimum viable marketing system for an Australian small or medium business.
          Missing even one can significantly limit your ability to generate leads and revenue:
        </p>
        <ul>
          <li><strong>Social media</strong> &mdash; builds visibility and keeps your brand top of mind with potential customers.</li>
          <li><strong>Email marketing</strong> &mdash; the highest-ROI channel for most businesses; you own the list.</li>
          <li><strong>SEO &amp; search visibility</strong> &mdash; captures high-intent customers actively searching for what you offer.</li>
          <li><strong>Content marketing</strong> &mdash; builds trust and authority, supports every other channel.</li>
          <li><strong>Analytics &amp; tracking</strong> &mdash; without data, you cannot improve or allocate budget efficiently.</li>
          <li><strong>Paid advertising</strong> &mdash; the most reliable way to scale lead volume quickly when the fundamentals are in place.</li>
          <li><strong>Customer retention</strong> &mdash; retaining a customer costs 5-7x less than acquiring a new one.</li>
        </ul>

        <h2>How to improve your marketing health score</h2>
        <p>
          The quiz gives you your top 3 gaps based on your specific answers. The most effective improvement
          strategy is to focus on your lowest-scoring pillars first &mdash; fixing a zero-score area has a bigger
          impact than improving a 75% area to 100%.
        </p>
        <p>
          For most small businesses, the fastest wins are: (1) building an email list with a simple lead magnet,
          (2) publishing one educational piece of content per week consistently, and (3) setting up basic
          Google Analytics 4 to understand where your traffic comes from.
        </p>
        <p>
          Share your result with your team, marketing agency, or fellow business owners &mdash; comparing scores can
          reveal which pillar deserves the most attention and opens up valuable conversations about marketing strategy.
        </p>
      </section>
    </div>
  );
}
