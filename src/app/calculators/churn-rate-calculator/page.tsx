import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ChurnRateCalc from "./ChurnRateCalc";

export const metadata: Metadata = {
  title: "Churn Rate Calculator - Calculate Customer Churn & Retention",
  description: "Free churn rate calculator. Calculate your monthly or annual churn rate and retention rate instantly. Includes SaaS benchmarks and proven retention strategies.",
};

const relatedTools = [
  { title: "Customer Lifetime Value Calculator", slug: "customer-lifetime-value-calculator", description: "Calculate the total value of each customer relationship." },
  { title: "NPS Calculator", slug: "net-promoter-score-calculator", description: "Measure customer loyalty and satisfaction." },
  { title: "CPA Calculator", slug: "cost-per-acquisition-calculator", description: "Calculate your cost per customer acquisition." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure return on your total marketing investment." },
];

const faqs = [
  { question: "What is churn rate?", answer: "Churn rate is the percentage of customers who stop doing business with you in a given period. For subscription businesses, it is the percentage of subscribers who cancel. High churn is one of the most dangerous threats to business growth — it creates a 'leaky bucket' where new customer acquisition is constantly offset by customer losses." },
  { question: "How do you calculate churn rate?", answer: "Churn Rate (%) = (Customers Lost ÷ Starting Customer Count) × 100. For example, if you started the month with 500 customers and lost 25, your monthly churn rate is (25 ÷ 500) × 100 = 5%. Retention rate = 100% − Churn Rate = 95%." },
  { question: "What is a good churn rate?", answer: "For SaaS businesses: 1–2% monthly churn is considered excellent (12–22% annually). 3–5% is average for SMB-focused SaaS. Above 5% monthly is a warning sign. Enterprise SaaS typically targets below 1% monthly. For eCommerce, annual churn is measured differently — retention rates of 30–40% (i.e. 60–70% churn) can be acceptable depending on the category." },
  { question: "What is the difference between customer churn and revenue churn?", answer: "Customer churn measures the percentage of customers lost. Revenue churn (or MRR churn) measures the percentage of monthly recurring revenue lost. These can differ if churning customers pay different amounts than retained customers. If high-paying customers churn at a higher rate, your revenue churn will exceed your customer churn — and vice versa." },
  { question: "How does churn rate affect business growth?", answer: "Churn creates a compounding drag on growth. At 5% monthly churn, you lose roughly 46% of your customer base annually — meaning you must acquire almost half your customers each year just to stay flat. At 1% monthly churn, annual attrition is 11%. Reducing churn from 5% to 2% monthly roughly doubles the effective growth rate from the same new customer acquisition." },
  { question: "What is negative churn?", answer: "Negative churn (or net negative churn) occurs when revenue expansion from existing customers (upsells, cross-sells, seat additions) exceeds revenue lost from churn. Negative churn means your existing customer base grows revenue over time even without new customers — the holy grail for SaaS businesses." },
];

const howToSteps = [
  { name: "Count customers lost", text: "Count the number of customers who cancelled, lapsed, or did not renew during the period. Use your CRM or subscription platform for accurate data." },
  { name: "Enter starting customer count", text: "Enter the number of customers at the start of the period. Use the period-start count, not the average or end count." },
  { name: "Read your churn and retention rate", text: "The calculator shows your churn rate and retention rate for the period." },
  { name: "Track monthly and annually", text: "Run this calculation monthly. Convert monthly churn to annual by: 1 − (1 − Monthly Churn Rate)^12." },
];

export default function ChurnRatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Churn Rate Calculator"
        description="Free churn rate calculator. Calculate your customer churn rate and retention rate for any period."
        url="https://calcfuel.com/calculators/churn-rate-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Churn Rate Calculator", url: "https://calcfuel.com/calculators/churn-rate-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>Churn Rate Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Churn Rate Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate your customer churn rate and retention rate instantly. Enter the number of customers lost and your starting count to see your churn percentage and what it means for your growth.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <ChurnRateCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>What Is Churn Rate?</h2>
        <p>Churn rate is the percentage of your customers who stop being customers in a given time period. For subscription businesses — SaaS, membership services, telcos, streaming platforms — churn is one of the most critical metrics to track because it directly determines how much of your acquisition investment is retained versus lost each month.</p>
        <p>The insidious nature of churn is compounding. A 5% monthly churn rate sounds manageable — just 5 customers out of every 100. But compounded annually, that is a 46% customer loss. A business starting January with 1,000 customers at 5% monthly churn ends December with 540 customers — despite never stopping acquisition. To grow, they must replace all 460 lost customers and then add more on top. This is the "leaky bucket" problem that kills subscription businesses quietly over time.</p>
        <p>Reducing churn has a multiplicative effect on growth. Lowering monthly churn from 5% to 2% increases annual retention from 54% to 79% — a 25-point improvement that dramatically changes the economics of growth. Fewer customers need to be replaced, more revenue compounds, and customer lifetime value increases significantly.</p>

        <h2>The Churn Rate Formula</h2>
        <p><strong>Churn Rate (%) = (Customers Lost ÷ Starting Customer Count) × 100</strong></p>
        <p><strong>Retention Rate (%) = 100 − Churn Rate</strong></p>
        <p><strong>Annual Churn from Monthly:</strong> 1 − (1 − Monthly Churn Rate)^12</p>
        <p><strong>Example:</strong> A SaaS business starts Q1 with 800 subscribers. By end of Q1, they have 728 — a loss of 72 customers. Quarterly Churn = (72 ÷ 800) × 100 = <strong>9%</strong>. Monthly equivalent = 1 − (1 − 0.09)^(1/3) ≈ <strong>3.1% per month</strong>. Annual equivalent = 1 − (1 − 0.031)^12 ≈ <strong>31%</strong>. This business loses nearly a third of its customer base annually — a significant drag on growth.</p>

        <h2>Customer Churn vs. Revenue Churn</h2>
        <p>Customer churn and revenue churn (MRR churn) are related but distinct metrics. Customer churn counts the percentage of customers lost. Revenue churn counts the percentage of monthly recurring revenue lost.</p>
        <p>The difference matters when customers have different plan sizes. If your $500/month plan customers churn at 2% but your $50/month plan customers churn at 8%, your customer churn might average 5% but your revenue churn could be much lower — because you are retaining the high-value customers. Conversely, if enterprise customers churn at higher rates, revenue churn exceeds customer churn.</p>
        <p>Track both. Customer churn tells you about engagement breadth; revenue churn tells you about the financial impact. For investors and financial modeling, revenue churn is the more important metric.</p>

        <h2>Root Causes of High Churn</h2>
        <p><strong>Poor product-market fit at the segment level.</strong> Customers who were never right for your product churn early and at high rates. Review which customer segments have the highest churn and look for patterns: industry, company size, use case, or sales channel. If free trial or freemium customers churn massively in month 1, the issue is often acquisition of poor-fit users rather than product quality.</p>
        <p><strong>Weak onboarding.</strong> Most SaaS churn happens in the first 90 days because customers never reach their "aha moment" — the point where they experience the core value of the product. Customers who don't activate churn before they even form a habit. Investing in proactive onboarding — guided setup, success milestones, early check-ins — is one of the highest-leverage retention investments.</p>
        <p><strong>Competitive displacement.</strong> Customers switch to competitors when a competitor offers better features, better pricing, or a better experience. Track lost customer win/loss data to identify competitive threats driving churn and prioritise product roadmap accordingly.</p>
        <p><strong>Pricing misalignment.</strong> Customers who feel they are overpaying relative to perceived value cancel at higher rates. This often presents as price objections in cancellation surveys but the root cause is value delivery. If customers consistently cite price, investigate whether the product is delivering measurable ROI.</p>

        <h2>5 Strategies to Reduce Churn</h2>
        <ol>
          <li><strong>Invest in customer onboarding.</strong> The first 30–90 days are make-or-break. Build a structured onboarding journey that guides customers to key activation milestones. Use in-app messaging, email sequences, and proactive success check-ins to ensure customers reach value quickly. Businesses with strong onboarding typically see 30–50% lower 90-day churn.</li>
          <li><strong>Identify and proactively engage at-risk customers.</strong> Monitor usage signals that predict churn: declining login frequency, reduced feature usage, support ticket spikes, or billing failures. Create automated alerts or customer success workflows that trigger proactive outreach when customers show churn risk signals — before they decide to leave.</li>
          <li><strong>Implement a cancellation flow.</strong> A well-designed cancellation flow that offers pauses, downgrades, or incentives can save 10–20% of customers who intend to cancel. Understanding cancellation reasons in real-time also gives you product and service improvement data.</li>
          <li><strong>Build switching costs.</strong> Customers who have integrated your product deeply into their workflow, imported significant data, or built processes around your tool are much harder to churn. Features that increase depth of integration — API connections, data imports, workflow automation — reduce churn by raising switching costs.</li>
          <li><strong>Gather and act on churn feedback.</strong> Survey every churned customer within 48 hours of cancellation. Keep it short (2–3 questions). Identify the top 3 churn reasons and dedicate product and support resources to addressing them. Systematic churn feedback loops are one of the most reliable ways to reduce churn over 6–12 months.</li>
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
