import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";

export const metadata: Metadata = {
  title: "Email Marketing Calculators",
  description: "Free email marketing calculators: open rate, list growth rate, and more. Measure and improve your email marketing performance.",
};

const tools = [
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Calculate your email open rate." },
];

export default function EmailMarketingHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Email Marketing Calculators</span>
      </nav>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Email Marketing Calculators</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free calculators to measure your email marketing performance.</p>
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

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-8" />
      <article className="prose max-w-none">
        <h2>Why Email Marketing Metrics Matter</h2>
        <p>Email marketing consistently delivers the highest ROI of any digital channel — with industry averages of $36 to $42 returned for every dollar spent. But to maximise that return, you need to measure the right metrics. Sending emails without tracking performance is like running a business without looking at your bank balance.</p>
        <p>The most important email marketing metrics tell you three things: how many people are opening your emails, how many are clicking through to take action, and how your numbers compare to industry benchmarks. Without this data, you cannot identify what is working, what needs improvement, or which segments of your list deserve more attention.</p>

        <h2>Key Email Marketing Metrics Explained</h2>
        <h3>Open Rate</h3>
        <p>Open rate measures the percentage of delivered emails that were opened by recipients. It is calculated by dividing the number of opens by the number of emails delivered, then multiplying by 100. Industry average open rates sit between 20 and 25% depending on sector. Above 25% is excellent; below 15% indicates problems with subject lines, sender reputation, or list health.</p>
        <h3>Click-Through Rate (CTR)</h3>
        <p>CTR measures how many recipients clicked a link inside your email, expressed as a percentage of delivered emails. Average CTR across industries is 2 to 5%. A strong open rate paired with a weak CTR signals compelling subject lines but poor email body copy or offers.</p>
        <h3>List Growth Rate</h3>
        <p>List growth rate tracks how quickly your subscriber base is growing net of unsubscribes. A healthy list grows by at least 5% per month. Stagnant or shrinking lists are a warning sign — you need stronger lead magnets, more entry points, or better retention strategies.</p>

        <h2>Email Marketing Benchmarks by Industry</h2>
        <ul>
          <li><strong>Government and Nonprofits:</strong> Open rate 25–40%, CTR 3–6%</li>
          <li><strong>Education:</strong> Open rate 22–28%, CTR 3–5%</li>
          <li><strong>Finance and Insurance:</strong> Open rate 20–25%, CTR 2–4%</li>
          <li><strong>Healthcare:</strong> Open rate 20–25%, CTR 2–4%</li>
          <li><strong>B2B Software/SaaS:</strong> Open rate 18–22%, CTR 2–5%</li>
          <li><strong>eCommerce and Retail:</strong> Open rate 15–20%, CTR 2–4%</li>
        </ul>

        <h2>How to Improve Your Email Marketing Performance</h2>
        <ol>
          <li><strong>Clean your list regularly.</strong> Remove subscribers who have not opened an email in 6 months. A smaller, engaged list outperforms a large, disengaged one in both metrics and deliverability.</li>
          <li><strong>Segment by behaviour.</strong> Send different content to new subscribers, active buyers, and lapsed contacts. Segmented campaigns produce 14% higher open rates and 100% higher click rates than unsegmented sends.</li>
          <li><strong>Test subject lines.</strong> A/B test two subject lines on 20% of your list, then send the winner to the remaining 80%. Small improvements in open rate compound significantly over thousands of emails.</li>
          <li><strong>Optimise send timing.</strong> Tuesday through Thursday mornings (8–10am in your audience's time zone) typically see the highest open rates. Test your specific audience — results vary.</li>
          <li><strong>Improve email body copy.</strong> One clear call-to-action per email outperforms multiple competing CTAs. Make the desired next step obvious and frictionless.</li>
        </ol>
      </article>
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
