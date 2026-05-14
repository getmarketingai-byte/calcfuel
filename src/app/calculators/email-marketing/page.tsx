import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import ProductCTASection from "@/components/ProductCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Email Marketing Calculators — Open Rate, List Growth & CTR",
  description: "Free email marketing calculators for open rate, list growth rate, click-through rate, and more. Instant results for email marketers and campaign managers.",
  path: "/calculators/email-marketing",
});

const tools = [
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Calculate your email open rate and benchmark against industry averages." },
  { title: "Email List Growth Rate Calculator", slug: "email-list-growth-rate-calculator", description: "Track how fast your email list is growing month over month." },
  { title: "Click-Through Rate (CTR) Calculator", slug: "click-through-rate-calculator", description: "Measure the percentage of recipients who clicked your email links." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calcfuel.com" },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": "https://calcfuel.com/calculators" },
    { "@type": "ListItem", "position": 3, "name": "Email Marketing Calculators", "item": "https://calcfuel.com/calculators/email-marketing" },
  ],
};

export default function EmailMarketingHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">Calculators</Link><span className="mx-2">/</span>
        <span>Email Marketing Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Email Marketing Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free calculators to measure your email marketing performance — open rate, list growth, and click-through rate.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(tool => (
          <Link key={tool.slug} href={"/calculators/" + tool.slug}
            className="block p-5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 hover:shadow-lg hover:border-orange-400 transition-all group">
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">{tool.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        ))}
      </div>

      <article className="prose max-w-none mt-12 mb-8">
        <h2>Email Marketing Performance Metrics</h2>
        <p>Email marketing remains one of the highest-ROI channels available to Australian small businesses. But raw subscriber numbers tell only part of the story — the real performance indicators are the metrics that reveal how your audience engages with your campaigns. Our free email marketing calculators help you benchmark, analyse, and improve the metrics that matter most.</p>

        <h3>Why Email Open Rate Matters</h3>
        <p>Your email open rate is the percentage of delivered emails that recipients actually opened. Industry benchmarks vary significantly: B2B email averages 21-25% open rates, while eCommerce typically sees 15-20%. A strong open rate signals a healthy sender reputation, relevant subject lines, and an engaged subscriber list. Use our <a href="/calculators/email-open-rate-calculator">Email Open Rate Calculator</a> to calculate your rate instantly and compare it to industry norms.</p>

        <h3>List Growth: The Long-Term Asset</h3>
        <p>An email list that isn&rsquo;t growing is shrinking — industry attrition rates average 22-25% annually as subscribers change jobs, change interests, or unsubscribe. Your list growth rate measures whether new sign-ups are outpacing churn. A healthy monthly growth rate of 2-5% indicates your lead generation is working. Track your progress with our <a href="/calculators/email-list-growth-rate-calculator">Email List Growth Rate Calculator</a>.</p>

        <h3>Click-Through Rate: The Engagement Signal</h3>
        <p>Click-through rate (CTR) measures the percentage of recipients who clicked a link in your email. Average CTR across industries is 2-5%. CTR depends on your offer relevance, CTA placement, and audience segmentation. Our <a href="/calculators/click-through-rate-calculator">CTR Calculator</a> lets you benchmark your campaigns instantly.</p>

        <h2>Email Marketing Benchmarks by Industry</h2>
        <ul>
          <li><strong>Government and Nonprofits:</strong> Open rate 25–40%, CTR 3–6%</li>
          <li><strong>Education:</strong> Open rate 22–28%, CTR 3–5%</li>
          <li><strong>Finance and Insurance:</strong> Open rate 20–25%, CTR 2–4%</li>
          <li><strong>Healthcare:</strong> Open rate 20–25%, CTR 2–4%</li>
          <li><strong>B2B Software/SaaS:</strong> Open rate 18–22%, CTR 2–5%</li>
          <li><strong>eCommerce and Retail:</strong> Open rate 15–20%, CTR 2–4%</li>
        </ul>

        <h2>How to Use These Calculators</h2>
        <p>Each calculator takes just seconds to use — enter your campaign data and get your metric instantly. Use the results to identify underperforming campaigns, set targets for your next send, and prioritise what to optimise first. All calculators are free with no sign-up required.</p>

        <h2>How to Improve Your Email Marketing Performance</h2>
        <ol>
          <li><strong>Clean your list regularly.</strong> Remove subscribers who have not opened an email in 6 months. A smaller, engaged list outperforms a large, disengaged one in both metrics and deliverability.</li>
          <li><strong>Segment by behaviour.</strong> Send different content to new subscribers, active buyers, and lapsed contacts. Segmented campaigns produce 14% higher open rates and 100% higher click rates than unsegmented sends.</li>
          <li><strong>Test subject lines.</strong> A/B test two subject lines on 20% of your list, then send the winner to the remaining 80%. Small improvements in open rate compound significantly over thousands of emails.</li>
          <li><strong>Optimise send timing.</strong> Tuesday through Thursday mornings (8–10am in your audience&rsquo;s time zone) typically see the highest open rates. Test your specific audience — results vary.</li>
          <li><strong>Improve email body copy.</strong> One clear call-to-action per email outperforms multiple competing CTAs. Make the desired next step obvious and frictionless.</li>
        </ol>
      </article>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />

      <ProductCTASection variant="email_social_seo" />
    </div>
  );
}
