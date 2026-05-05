import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ROASCalc from "./ROASCalc";
import MarketingAICTA from "@/components/MarketingAICTA";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "ROAS Calculator - Calculate Return on Ad Spend",
  description: "Free ROAS calculator. Calculate your Return on Ad Spend instantly. Includes ROAS benchmarks by platform and industry plus proven tips to improve ad performance.",
};

const relatedTools = [
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure total return on marketing investment." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from your ad budget." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Calculate ROI from social media campaigns." },
  { title: "Email Open Rate Calculator", slug: "email-open-rate-calculator", description: "Measure engagement with your email campaigns." },
];

const faqs = [
  { question: "What is a good ROAS?", answer: "A 4:1 ROAS (400%) is a commonly cited benchmark for eCommerce. In practice, your minimum viable ROAS depends on gross margin: divide 1 by your gross margin percentage. A business with 25% margins needs at least 4x ROAS to break even. High-margin products (50%+) can sustain profitability at 2x ROAS; thin-margin businesses may need 8x or higher." },
  { question: "How do you calculate ROAS?", answer: "ROAS = Revenue Generated ÷ Ad Spend. For example, if you earned $8,000 from $2,000 in ads, your ROAS is 4.0 (or 400%). This tells you that for every $1 spent on ads, you generated $4 in revenue." },
  { question: "What is the difference between ROAS and ROI?", answer: "ROAS measures revenue relative to ad spend only, ignoring product costs, agency fees, salaries, and other overheads. ROI factors in all costs to show true profitability. A campaign can have a strong ROAS but negative ROI if margins are thin. Use ROAS to optimise individual campaigns; use ROI to evaluate overall marketing profitability." },
  { question: "What is break-even ROAS?", answer: "Break-even ROAS = 1 ÷ Gross Margin. If your gross margin is 30%, you need a minimum ROAS of 3.33x (1 ÷ 0.30) just to cover the cost of goods sold. Any ROAS below break-even means you are losing money on every sale driven by ads." },
  { question: "How can I improve my ROAS?", answer: "Improve ad creative and copy to lift click-through rate, tighten audience targeting to reduce wasted impressions, optimise landing pages to increase conversion rate, increase average order value through upsells, and use revenue-aligned bid strategies (Target ROAS on Google, Advantage+ on Meta)." },
  { question: "Why is my ROAS declining over time?", answer: "Common causes: audience saturation (your target audience has seen your ads too many times), creative fatigue (same ad running too long), increased competition driving up CPCs, seasonal effects, or tracking gaps caused by iOS privacy changes reducing attributable conversions." },
];

const howToSteps = [
  { name: "Enter revenue from ads", text: "Input the total revenue directly attributed to your advertising campaign. Find this in your ad platform's conversion reporting or your e-commerce analytics." },
  { name: "Enter total ad spend", text: "Enter the total amount spent on ads for the campaign period you are measuring." },
  { name: "Read your ROAS", text: "The calculator instantly shows your ROAS as a ratio (e.g., 4.2x) and as a percentage (420%). A ROAS above your break-even point means your ads are profitable." },
  { name: "Calculate your break-even ROAS", text: "Divide 1 by your gross margin percentage (e.g., 1 ÷ 0.30 = 3.33x break-even for a 30% margin business). If your ROAS is above this, your ads are generating gross profit." },
];

export default function ROASPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="ROAS Calculator"
        description="Free ROAS calculator. Calculate your Return on Ad Spend instantly. Includes ROAS benchmarks by industry and tips to improve ad performance."
        url="https://calcfuel.com/calculators/roas-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial & ROI", url: "https://calcfuel.com/calculators/financial" },
          { name: "ROAS Calculator", url: "https://calcfuel.com/calculators/roas-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link><span className="mx-2">/</span>
        <span>ROAS Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">ROAS Calculator — Return on Ad Spend</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate your Return on Ad Spend. Enter revenue from ads and total ad spend to instantly see your ROAS ratio and percentage.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <ROASCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <EmailCapture />
      <MarketingAICTA />
      <article className="prose max-w-none mt-4">
        <h2>What Is ROAS?</h2>
        <p>ROAS stands for Return on Ad Spend. It measures how much revenue you earn for every dollar you spend on advertising. Unlike marketing ROI — which evaluates overall campaign profitability after all costs — ROAS specifically isolates the performance of your paid media spend, making it the primary optimisation metric for digital advertisers running campaigns on Google, Meta, TikTok, Amazon, LinkedIn, and other paid platforms.</p>
        <p>ROAS is expressed as a ratio. A ROAS of 4x means for every dollar spent on ads, you generated four dollars in revenue. It is one of the most widely referenced KPIs in performance marketing because it directly answers whether a given ad dollar is working or not. Agencies, in-house teams, and automated bidding algorithms all use ROAS as the north-star metric for paid channel management.</p>
        <p>Understanding your ROAS is particularly important because it changes across campaigns, audiences, ad sets, and time periods. An overall account ROAS of 3x might mask individual campaigns running at 1x (money-losing) and 7x (highly profitable). Breaking ROAS down by campaign, ad set, and product lets you cut the losers and scale the winners.</p>

        <h2>The ROAS Formula</h2>
        <p><strong>ROAS = Revenue Generated ÷ Ad Spend</strong></p>
        <p>This gives you a ratio. Multiply by 100 to express it as a percentage.</p>
        <p><strong>Example:</strong> Your Google Shopping campaign generated $20,000 in sales over a month. You spent $5,000 on ads during that period. ROAS = $20,000 ÷ $5,000 = <strong>4x (400%)</strong>.</p>
        <p><strong>What counts as revenue?</strong> For eCommerce, this is total order value attributed to the campaign. For lead generation, use the revenue from deals closed that originated from the campaign (requires CRM integration). For subscription businesses, consider whether you are using first-order revenue or lifetime value — LTV-adjusted ROAS changes the optimisation calculus significantly.</p>

        <h2>How to Calculate Your Break-Even ROAS</h2>
        <p>ROAS above break-even is the minimum threshold for profitability — below it, you are spending more on ads than you make in gross profit from those sales.</p>
        <p><strong>Break-Even ROAS = 1 ÷ Gross Margin</strong></p>
        <p>Examples by gross margin:</p>
        <ul>
          <li><strong>20% gross margin:</strong> Break-even ROAS = 5.0x (you need $5 in revenue for every $1 in ad spend just to cover costs)</li>
          <li><strong>30% gross margin:</strong> Break-even ROAS = 3.33x</li>
          <li><strong>40% gross margin:</strong> Break-even ROAS = 2.5x</li>
          <li><strong>50% gross margin:</strong> Break-even ROAS = 2.0x</li>
          <li><strong>70% gross margin:</strong> Break-even ROAS = 1.43x</li>
        </ul>
        <p>Your target ROAS for profitability should sit comfortably above break-even to also cover operating overheads beyond COGS. A business with 30% gross margin, $10,000 per month in fixed overheads, and $50,000 in ad-driven revenue needs ROAS well above 3.33x just to reach net profitability.</p>

        <h2>ROAS vs. ROI: Which Should You Use?</h2>
        <p>Both metrics matter, but they serve different purposes:</p>
        <p><strong>Use ROAS for:</strong> Day-to-day campaign optimisation, setting bid targets in Google and Meta, comparing ad sets and creatives, and understanding which campaigns are generating the most revenue per ad dollar. ROAS is fast and easy to calculate from platform data alone.</p>
        <p><strong>Use ROI for:</strong> Evaluating the overall profitability of a marketing channel, comparing different types of marketing investments (ads vs. content vs. email), and making budget allocation decisions at the board level. ROI requires full cost data — not just ad spend — and is typically calculated monthly or quarterly rather than in real time.</p>
        <p>A common trap: a campaign with a high ROAS (say 6x) can still be unprofitable if the product has thin margins and advertising is just one of many costs. Always stress-test ROAS against your margin structure before declaring a campaign successful.</p>

        <h2>ROAS Benchmarks by Platform and Industry</h2>
        <p>These benchmarks represent typical performance for well-managed accounts. Poorly structured campaigns often run at 1–2x or below:</p>
        <ul>
          <li><strong>Google Search Ads:</strong> 3–6x average; 8x+ is excellent for high-intent keywords.</li>
          <li><strong>Google Shopping:</strong> 4–8x for optimised product feeds with strong titles and images.</li>
          <li><strong>Meta Ads (Facebook & Instagram):</strong> 2–4x average; B2C consumer goods often see 3–5x with strong creative.</li>
          <li><strong>TikTok Ads:</strong> 2–4x; highly variable depending on creative quality and audience fit.</li>
          <li><strong>Amazon Sponsored Products:</strong> 3–6x depending on category and competition.</li>
          <li><strong>B2B LinkedIn Ads:</strong> 1.5–3x on closed deal revenue; CPCs are high but lead quality typically strong.</li>
          <li><strong>eCommerce (blended across channels):</strong> 3–5x minimum viable; 6x+ is a strong program.</li>
          <li><strong>SaaS (first-month revenue):</strong> 1.5–3x, with profitability reached on lifetime value after 3–6 months.</li>
        </ul>

        <h2>5 Proven Ways to Improve Your ROAS</h2>
        <ol>
          <li>
            <strong>Upgrade ad creative and copy.</strong> Ad creative is the single biggest driver of click-through rate (CTR) in most paid channels. Higher CTR at the same CPC means lower effective cost per click. Test video vs. static, benefit-led vs. feature-led headlines, and social proof (reviews, testimonials) vs. offer-led (discount, urgency). Rotate creative every 2–4 weeks to combat fatigue.
          </li>
          <li>
            <strong>Tighten audience targeting.</strong> Every impression served to someone who will never buy is wasted spend. Build exclusion audiences for existing customers (unless you are running retention campaigns), use in-market audience overlays on Google, and suppress users who visited your cart but bounced more than 30 days ago (they have cooled off). Narrower, higher-intent audiences convert at higher rates even when CPM increases.
          </li>
          <li>
            <strong>Optimise your landing pages for conversion.</strong> A landing page that converts at 5% produces 2.5× more revenue than the same ad driving to a page converting at 2%, from identical ad spend. Match landing page headline to ad promise, reduce friction (fewer form fields), add trust signals (reviews, security badges, guarantees), and ensure page load time is under 2 seconds on mobile.
          </li>
          <li>
            <strong>Use revenue-aligned bid strategies.</strong> Manual bidding is rarely optimal at scale. Target ROAS bidding on Google and Advantage+ Shopping on Meta use machine learning to find the combinations of audience, time, device, and creative most likely to produce a conversion at your target revenue-per-spend ratio. Set a target ROAS 10–20% above your break-even threshold and give the algorithm 2–3 weeks of data before adjusting.
          </li>
          <li>
            <strong>Increase average order value (AOV).</strong> ROAS improves when each conversion generates more revenue without changing ad spend. Introduce upsells at checkout (higher-tier product, extended warranty, bundle), cross-sells on the thank-you page (complementary products), and minimum order thresholds for free shipping. A 20% increase in AOV often produces a 20% improvement in ROAS from the same campaigns.
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
