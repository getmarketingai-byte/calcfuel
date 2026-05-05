import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import AdSpendCalc from "./AdSpendCalc";
import MarketingAICTA from "@/components/MarketingAICTA";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Ad Spend Calculator - Project Clicks, Leads & Revenue",
  description: "Free ad spend calculator. Enter your budget, CPC, conversion rate, and deal value to project clicks, leads, revenue, ROI, and ROAS. Plan ad campaigns with confidence.",
};

const relatedTools = [
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Calculate your Return on Ad Spend." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure total return on marketing investment." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Calculate ROI from social media advertising." },
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Measure email campaign engagement." },
];

const faqs = [
  { question: "How do I calculate how much to spend on ads?", answer: "Work backwards from your revenue goal. Decide how many customers you need, determine your average lead-to-customer conversion rate, then calculate how many clicks you need (leads ÷ conversion rate). Multiply clicks by your expected CPC to get your budget. Example: 10 customers needed, 20% lead-to-customer rate = 50 leads. At 3% landing page conversion rate = 1,667 clicks. At $2 CPC = $3,333 budget." },
  { question: "What is CPC in advertising?", answer: "CPC (Cost Per Click) is the amount you pay each time someone clicks your ad. Google Ads average CPC ranges from $1–$5 for most industries, rising to $10–$50+ for competitive sectors like finance, legal, and SaaS. Meta Ads typically run $0.50–$3.00 CPC. LinkedIn is the most expensive platform at $5–$15+ CPC, but often delivers higher-quality B2B leads." },
  { question: "What is a good conversion rate for paid ads?", answer: "Average landing page conversion rates for paid traffic are 2–5%. Top-performing pages achieve 10–20% through strong offer clarity, social proof, fast load times, and minimal friction. Conversion rate varies significantly by industry: B2B SaaS lead gen typically converts at 2–4%, while eCommerce can range from 1–8% depending on product and price point." },
  { question: "How does this ad spend calculator work?", answer: "Enter your budget, average CPC, landing page conversion rate, and deal value. The calculator projects total clicks, leads generated, estimated revenue, ROI percentage, and ROAS — giving you a complete picture of expected campaign performance before you spend a dollar." },
  { question: "What should I include in my ad budget?", answer: "Your ad budget should cover the actual media spend — the amount paid to the platform for clicks or impressions. Agency management fees, creative production, and landing page costs are separate and should be factored into your overall marketing ROI calculation, but excluded from ROAS calculations which compare revenue only to paid media spend." },
  { question: "How do I know if my ad spend is too high or too low?", answer: "Calculate your target ROAS (1 ÷ gross margin) and compare it to your projected ROAS in this calculator. If your projected ROAS is below break-even, reduce budget or improve CPC and conversion rate. If your projected ROAS is strong (2x+ above break-even), you may be underinvesting — more budget could generate proportionally more revenue." },
];

const howToSteps = [
  { name: "Enter your ad budget", text: "Input your total planned ad spend for the campaign period — monthly budget for ongoing campaigns or a fixed amount for one-off promotions." },
  { name: "Enter your expected CPC", text: "Enter the average cost per click for your platform and industry. Use Google Keyword Planner or your platform's estimate tool if you do not have historical data." },
  { name: "Enter your conversion rate", text: "Input the percentage of ad clicks that convert to leads or customers on your landing page. Use historical data if available, or start with a conservative 2–3% estimate." },
  { name: "Enter average deal value", text: "For eCommerce, enter your average order value. For B2B, enter your average contract or deal size." },
  { name: "Review projected outcomes", text: "The calculator shows projected clicks, leads, revenue, ROI, and ROAS. If results are below target, adjust budget, improve conversion rate, or reduce CPC through better Quality Scores and targeting." },
];

export default function AdSpendPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Ad Spend Calculator"
        description="Free ad spend calculator. Enter your budget, CPC, conversion rate, and deal value to project clicks, leads, revenue, ROI, and ROAS."
        url="https://calcfuel.com/calculators/ad-spend-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial & ROI", url: "https://calcfuel.com/calculators/financial" },
          { name: "Ad Spend Calculator", url: "https://calcfuel.com/calculators/ad-spend-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link><span className="mx-2">/</span>
        <span>Ad Spend Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Ad Spend Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Enter your ad budget, CPC, conversion rate, and deal value to project your expected clicks, leads, revenue, ROI, and ROAS before you spend a dollar.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <AdSpendCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <EmailCapture />
      <MarketingAICTA />
      <article className="prose max-w-none mt-4">
        <h2>What Is an Ad Spend Calculator?</h2>
        <p>An ad spend calculator is a planning tool that projects the expected outcomes of a paid advertising campaign before you commit your budget. By entering four key inputs — ad budget, cost per click (CPC), landing page conversion rate, and average deal value — you can forecast how many clicks you will receive, how many leads or customers those clicks will generate, how much revenue you can expect, and whether the campaign will be profitable based on your ROAS and ROI targets.</p>
        <p>Planning without projections is one of the most common and costly mistakes in digital advertising. Many marketers set a budget based on gut feel or "what we spent last year," without modelling whether the math actually works. This calculator forces the discipline of working backwards from revenue goals to determine what your campaign must achieve at every stage of the funnel.</p>

        <h2>How to Use This Calculator</h2>
        <ol>
          <li><strong>Enter your ad budget:</strong> Your total planned spend for the campaign period. For ongoing campaigns, use monthly budget. For project-based campaigns, use the full campaign budget.</li>
          <li><strong>Enter expected CPC:</strong> Use Google Keyword Planner, Meta Ads Manager estimates, or your platform's forecasting tool to get a realistic CPC range. If you have historical data, use your actual average CPC.</li>
          <li><strong>Enter conversion rate:</strong> The percentage of ad clicks that convert to leads or purchases on your landing page. Use historical data if available; if launching a new campaign, start with a conservative 2–3% estimate.</li>
          <li><strong>Enter average deal value:</strong> For eCommerce, use average order value. For B2B services, use average contract value. For subscription businesses, consider whether to use first-month revenue or lifetime value.</li>
          <li><strong>Review projected outcomes:</strong> Compare projected ROAS against your break-even ROAS (1 ÷ gross margin). If results are below target, identify which input to improve: CPC, conversion rate, or deal value.</li>
        </ol>

        <h2>Understanding the Four Key Inputs</h2>
        <p><strong>Ad Budget</strong> determines how many clicks you can buy at a given CPC. It is your primary lever for scaling volume, but volume without conversion is just expensive traffic. Do not increase budget until your CPC and conversion rate benchmarks are established.</p>
        <p><strong>Cost Per Click (CPC)</strong> is what you pay for each visitor. CPC is influenced by competition (more advertisers bidding on the same keywords = higher CPC), Quality Score on Google (better relevance = lower CPC), audience targeting on social platforms, and time of day and device. Improving Quality Score is often the fastest way to reduce CPC without losing volume.</p>
        <p><strong>Conversion Rate</strong> is arguably the highest-leverage variable in this calculator. A 1% improvement in conversion rate has the same impact as a 50% increase in budget (assuming a 2% starting rate). Conversion rate is determined by landing page quality, offer strength, audience match, page load speed, and trust signals. A well-optimised landing page can convert 10–20% of paid traffic; a poor one might convert under 1%.</p>
        <p><strong>Average Deal Value</strong> is how much revenue each conversion generates. This is often the most under-appreciated lever. Increasing average order value by 20% through upsells improves your ROI by 20% without changing any advertising variable.</p>

        <h2>CPC Benchmarks by Platform (2024–2025)</h2>
        <ul>
          <li><strong>Google Search Ads:</strong> $1–$5 average for most industries; $10–$50+ for legal, finance, SaaS, and insurance.</li>
          <li><strong>Google Shopping:</strong> $0.50–$2.00 for product ads; competitive categories like electronics can be higher.</li>
          <li><strong>Facebook and Instagram:</strong> $0.50–$3.00 CPC; varies significantly by audience, creative quality, and objective.</li>
          <li><strong>LinkedIn Ads:</strong> $5–$15+ per click; expensive but delivers qualified B2B decision-maker audiences.</li>
          <li><strong>TikTok Ads:</strong> $0.20–$1.50 per click; lower CPC but conversion rates vary for older demographics.</li>
          <li><strong>YouTube Ads:</strong> $0.05–$0.30 per view (TrueView); $1–$5 for click-through campaigns.</li>
          <li><strong>Display and Programmatic:</strong> $0.10–$0.80 per click; best for retargeting, not cold acquisition.</li>
        </ul>

        <h2>What Is a Good Ad Spend to Revenue Ratio?</h2>
        <p>The minimum viable ROAS (revenue divided by ad spend) depends entirely on your gross margin. The formula is simple: <strong>Break-Even ROAS = 1 ÷ Gross Margin Percentage</strong>.</p>
        <p>A business with 30% gross margin needs at least 3.33x ROAS just to cover the cost of goods sold from ad-driven revenue. A business with 50% margins can break even at 2x ROAS. Any ROAS below break-even means you are losing money on every ad-driven sale — and spending more will accelerate losses, not fix them.</p>
        <p>For a target (not just break-even) ROAS, factor in your operating overhead. If your monthly fixed costs are $20,000 and your ad-driven revenue is $60,000, you need your gross profit from that revenue to exceed $20,000 — which requires a ROAS that generates enough gross profit after COGS to cover overheads.</p>

        <h2>5 Ways to Improve Your Ad Spend Efficiency</h2>
        <ol>
          <li>
            <strong>Lower your effective CPC with better Quality Scores.</strong> On Google, Quality Score (1–10) is determined by expected CTR, ad relevance, and landing page experience. A Quality Score of 8+ can reduce your CPC by 30–50% compared to a score of 4. Write ads that tightly match the keyword intent, use ad extensions, and send traffic to landing pages that directly address the search query.
          </li>
          <li>
            <strong>Optimise your landing page for conversion.</strong> Even a 1% improvement in conversion rate significantly changes the economics. Test: (1) headline clarity — does the visitor immediately understand what they will get? (2) social proof — reviews, logos, case studies reduce risk perception; (3) CTA prominence — one clear action, above the fold; (4) page speed — every 1-second delay reduces conversion rate by approximately 7%.
          </li>
          <li>
            <strong>Increase average deal value through smart pricing.</strong> Upsells at checkout ("add X for $29 more"), order minimums for free shipping, and product bundles all increase average order value without touching your ad account. A 25% increase in AOV improves ROAS by a proportional amount — often more impactful than the same effort spent on ad optimisation.
          </li>
          <li>
            <strong>Use retargeting to reduce waste.</strong> Cold traffic from paid search or social converts at 2–5%. Retargeted visitors — people who already visited your site — convert at 5–20× higher rates at significantly lower CPCs. Allocate 20–30% of your budget to retargeting campaigns targeting visitors who viewed product pages or initiated checkout without completing.
          </li>
          <li>
            <strong>Pause underperforming ad sets aggressively.</strong> The Pareto principle applies to paid advertising: typically 20% of your ad sets drive 80% of your results. Review performance weekly, pause any ad set with a CPA (cost per acquisition) more than 50% above target after sufficient volume (50–100+ clicks), and reinvest that budget into your top performers.
          </li>
        </ol>
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

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
