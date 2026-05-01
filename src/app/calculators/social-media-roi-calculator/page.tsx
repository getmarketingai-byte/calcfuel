import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import SocialROICalc from "./SocialROICalc";

export const metadata: Metadata = {
  title: "Social Media ROI Calculator",
  description: "Free social media ROI calculator. Measure the return on your social media ad spend. Includes benchmarks, formula, and tips to improve social media performance.",
};

const relatedTools = [
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Calculate Return on Ad Spend for any campaign." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure total marketing investment return." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Plan your ad budget and project revenue." },
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Measure email campaign engagement." },
];

const faqs = [
  { question: "What is a good social media ROI?", answer: "A positive ROI means you're generating more revenue than you spend. For paid social, 3:1 (300% ROI) is a common baseline. Organic social ROI is harder to measure but should be evaluated against time and resource cost." },
  { question: "How do you calculate social media ROI?", answer: "Social Media ROI = ((Revenue from Social - Social Media Costs) ÷ Social Media Costs) × 100. Include ad spend, content creation costs, and staff time in your costs." },
  { question: "What revenue should I attribute to social media?", answer: "Use UTM parameters in all social media links to track conversions in Google Analytics. Revenue from social-attributed sessions can then be pulled from your analytics platform." },
  { question: "How can I improve social media ROI?", answer: "Narrow your target audience, test different ad formats (video typically outperforms static), retarget website visitors, improve your landing page conversion rate, and focus on the platforms where your audience is most active." },
];

export default function SocialMediaROIPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Social Media ROI Calculator"
        description="Free social media ROI calculator. Measure the return on your social media ad spend. Includes benchmarks, formula, and tips to improve social media performance."
        url="https://calcfuel.com/calculators/social-media-roi-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Social Media", url: "https://calcfuel.com/calculators/social-media" },
          { name: "Social Media ROI Calculator", url: "https://calcfuel.com/calculators/social-media-roi-calculator" },
        ]}
        faqs={faqs}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/social-media" className="hover:text-orange-500">Social Media</Link><span className="mx-2">/</span>
        <span>Social Media ROI Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Social Media ROI Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate the return on your social media advertising investment. Enter your ad spend and revenue to instantly measure your social media ROI.</p>
      <AdSenseUnit format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <SocialROICalc />
      <AdSenseUnit format="rectangle" style={{ minHeight: 250 }} className="my-8" />
      <article className="prose max-w-none mt-4">
        <h2>What Is Social Media ROI?</h2>
        <p>Social media ROI measures the financial return generated from your social media advertising investment, expressed as a percentage. It answers the question: for every dollar spent on social media ads, how much did you earn in return?</p>
        <p>While social media also generates organic value such as brand awareness and community, this calculator focuses on paid social media advertising ROI — the most directly measurable component of social media spend.</p>
        <h2>Social Media ROI Formula</h2>
        <p><strong>Social Media ROI (%) = ((Revenue minus Ad Spend) divided by Ad Spend) multiplied by 100</strong></p>
        <p>Example: if you spent $3,000 on Facebook Ads and generated $12,000 in attributed revenue, your social media ROI = (($12,000 minus $3,000) divided by $3,000) multiplied by 100 = <strong>300%</strong>. That is a 4x ROAS — every dollar in ad spend returned four dollars in revenue.</p>
        <h2>Why Social Media ROI Is Hard to Measure</h2>
        <p>Social media ROI suffers from attribution challenges that include:</p>
        <ul>
          <li><strong>Multi-touch journeys.</strong> A customer might see a Facebook ad, click a Google search result, and then convert via email — attribution is complex.</li>
          <li><strong>View-through conversions.</strong> Platforms like Meta count conversions from people who saw but did not click your ad within a 1-day window by default. This can inflate reported ROI.</li>
          <li><strong>iOS signal loss.</strong> Apple App Tracking Transparency significantly reduced the accuracy of Meta conversion tracking, leading to undercounting on some accounts.</li>
        </ul>
        <p>Best practice: use UTM parameters and Google Analytics alongside platform reporting to cross-reference results.</p>
        <h2>Social Media ROI Benchmarks</h2>
        <ul>
          <li><strong>eCommerce:</strong> 100 to 300% ROI (ROAS 2 to 4x) is typical; 400%+ is strong</li>
          <li><strong>B2B SaaS:</strong> 50 to 200% ROI evaluated on lifetime value basis</li>
          <li><strong>Local services (trades, healthcare, hospitality):</strong> 200 to 500% ROI on paid social</li>
          <li><strong>Lead generation campaigns:</strong> Measured as cost per qualified lead ($20 to $200 typical)</li>
        </ul>
        <h2>How to Improve Your Social Media ROI</h2>
        <ol>
          <li><strong>Test creative aggressively.</strong> Creative fatigue is the number one killer of social media ad performance. Refresh creative every 2 to 4 weeks and test video versus image, different hooks, and varying CTAs.</li>
          <li><strong>Use conversion-optimised campaigns.</strong> Always run Conversions or Purchase objective campaigns, not Traffic or Reach. The algorithm needs conversion data to optimise toward buyers.</li>
          <li><strong>Build a retargeting funnel.</strong> Retarget website visitors, video viewers, and email subscribers. Retargeted audiences convert 3 to 10 times better than cold audiences at lower CPCs.</li>
          <li><strong>Optimise landing pages.</strong> A landing page that converts at 4% versus 1% quadruples your effective ROI from the same ad spend.</li>
          <li><strong>Track full-funnel attribution.</strong> Use UTM parameters, connect your CRM to your ad platform, and measure revenue attributed to social media — not just clicks or leads.</li>
        </ol>
      </article>
      <AdSenseUnit format="auto" style={{ minHeight: 100 }} className="my-8" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
