import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import NPSCalc from "./NPSCalc";

export const metadata: Metadata = {
  title: "NPS Calculator - Calculate Net Promoter Score",
  description: "Free NPS calculator. Calculate your Net Promoter Score from promoters, passives, and detractors. Includes NPS benchmarks by industry and strategies to improve customer loyalty.",
  alternates: { canonical: "/calculators/net-promoter-score-calculator" },
};

const relatedTools = [
  { title: "Churn Rate Calculator", slug: "churn-rate-calculator", description: "Calculate your customer churn and retention rate." },
  { title: "Customer Lifetime Value Calculator", slug: "customer-lifetime-value-calculator", description: "Calculate the total value of each customer relationship." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure return on your total marketing investment." },
  { title: "Conversion Rate Calculator", slug: "conversion-rate-calculator", description: "Calculate your website or funnel conversion rate." },
];

const faqs = [
  { question: "What is Net Promoter Score (NPS)?", answer: "Net Promoter Score (NPS) is a customer loyalty metric that measures how likely customers are to recommend your product or service to others. It is calculated from a single survey question: 'How likely are you to recommend us to a friend or colleague?' scored 0–10. Respondents are split into Promoters (9–10), Passives (7–8), and Detractors (0–6). NPS ranges from -100 to +100." },
  { question: "How do you calculate NPS?", answer: "NPS = % Promoters − % Detractors. Passives are excluded from the calculation. For example: 65 Promoters, 25 Passives, 10 Detractors (100 total). Promoter % = 65%, Detractor % = 10%. NPS = 65 − 10 = 55." },
  { question: "What is a good NPS score?", answer: "NPS benchmarks vary by industry. Generally: below 0 is negative (more detractors than promoters). 0–30 is good. 30–70 is great. 70+ is world-class. Industry-specific benchmarks: consumer tech averages 35–45. SaaS averages 30–40. Financial services averages 20–30. Retail averages 40–50. Healthcare averages 25–35. Compare your NPS to industry benchmarks rather than the absolute number." },
  { question: "Who are Promoters, Passives, and Detractors?", answer: "Promoters (score 9–10) are loyal enthusiasts who actively recommend your business. They fuel growth through word-of-mouth, referrals, and positive reviews. Passives (7–8) are satisfied but not enthusiastic — they won't refer and may switch if a competitor offers a better deal. Detractors (0–6) are unhappy customers who may share negative word-of-mouth and damage your brand reputation." },
  { question: "How often should I run NPS surveys?", answer: "For transactional NPS (measuring a specific interaction), survey immediately after the interaction. For relationship NPS (measuring overall satisfaction), survey quarterly or semi-annually. Avoid surveying the same customers more than once per quarter. Monthly NPS is common in SaaS but can lead to survey fatigue — quarterly is the safer default." },
  { question: "What is the difference between transactional and relationship NPS?", answer: "Transactional NPS measures satisfaction with a specific interaction — a support ticket, a purchase, an onboarding call. Relationship NPS measures overall loyalty and satisfaction with your company. Use transactional NPS to improve specific touchpoints; use relationship NPS to track long-term loyalty trends and predict churn." },
];

const howToSteps = [
  { name: "Run your NPS survey", text: "Ask customers: 'How likely are you to recommend us to a friend or colleague?' on a 0–10 scale. Collect responses for at least 2–3 weeks to get a representative sample." },
  { name: "Categorise respondents", text: "Count your Promoters (scored 9–10), Passives (scored 7–8), and Detractors (scored 0–6)." },
  { name: "Enter counts into the calculator", text: "Input your Promoter, Passive, and Detractor counts. The calculator automatically calculates percentages and NPS." },
  { name: "Benchmark and act on feedback", text: "Compare your NPS to industry benchmarks. Read open-ended feedback from Detractors to identify the top issues driving dissatisfaction." },
];

export default function NPSPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="NPS Calculator"
        description="Free Net Promoter Score (NPS) calculator. Calculate NPS from promoters, passives, and detractors instantly."
        url="https://calcfuel.com/calculators/net-promoter-score-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "NPS Calculator", url: "https://calcfuel.com/calculators/net-promoter-score-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>NPS Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">NPS Calculator — Net Promoter Score</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate your Net Promoter Score (NPS) instantly. Enter your Promoter, Passive, and Detractor counts to get your NPS score and see how it benchmarks against your industry.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <NPSCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>What Is Net Promoter Score (NPS)?</h2>
        <p>Net Promoter Score (NPS) is the most widely used customer loyalty and satisfaction metric in business. Developed by Fred Reichheld at Bain &amp; Company and introduced in 2003, NPS asks one simple question: <em>"How likely are you to recommend us to a friend or colleague?"</em> Customers respond on a 0–10 scale, and the NPS is calculated from the difference between the percentage of Promoters and Detractors.</p>
        <p>NPS has become ubiquitous in business because it is simple, predictive, and comparable across industries. Research by Bain &amp; Company found that NPS is correlated with revenue growth in most industries — companies with higher NPS tend to grow faster than competitors. This makes NPS a useful leading indicator of future business performance, not just a lagging measure of past satisfaction.</p>
        <p>Despite its simplicity, NPS is a powerful diagnostic tool. When combined with open-ended follow-up questions ("What is the primary reason for your score?"), NPS reveals the specific drivers of loyalty and dissatisfaction that management can act on.</p>

        <h2>The NPS Formula</h2>
        <p><strong>NPS = % Promoters − % Detractors</strong></p>
        <p>Respondents are categorised based on their score:</p>
        <ul>
          <li><strong>Promoters (9–10):</strong> Loyal enthusiasts who will keep buying and refer others, fuelling growth.</li>
          <li><strong>Passives (7–8):</strong> Satisfied but not enthusiastic — vulnerable to competitive offers.</li>
          <li><strong>Detractors (0–6):</strong> Unhappy customers who may spread negative word-of-mouth.</li>
        </ul>
        <p><strong>Example:</strong> 200 survey responses: 120 Promoters (60%), 50 Passives (25%), 30 Detractors (15%). NPS = 60 − 15 = <strong>45</strong>. This is a "great" NPS by general benchmarks and strong for most industries.</p>
        <p><strong>Important:</strong> NPS is always a whole number between -100 and +100. Passives count toward the denominator (total respondents) but are excluded from the NPS calculation itself — they are not promoters or detractors.</p>

        <h2>NPS Benchmarks by Industry</h2>
        <p>Comparing your NPS against your industry is more meaningful than comparing against a generic scale. Different industries have structurally different NPS ranges due to customer expectations, service complexity, and switching costs.</p>
        <ul>
          <li><strong>Consumer technology:</strong> 35–50. Apple NPS historically 60+. Top-quartile SaaS: 50+.</li>
          <li><strong>Retail and eCommerce:</strong> 35–55. Amazon historically 55–65 in peak periods.</li>
          <li><strong>Financial services:</strong> 15–35. Banks average 15–30; fintech disruptions often 40–60.</li>
          <li><strong>Healthcare:</strong> 25–40. Significant variation between primary care and specialist services.</li>
          <li><strong>Telecommunications:</strong> −10 to 20. One of the lowest NPS industries globally.</li>
          <li><strong>B2B software / SaaS:</strong> 30–50. Enterprise buyers have higher expectations and complex needs.</li>
          <li><strong>Professional services:</strong> 40–60. Strong personal relationships drive high promoter rates.</li>
        </ul>

        <h2>Transactional vs. Relationship NPS</h2>
        <p>There are two ways to deploy NPS surveys, each serving a different purpose:</p>
        <p><strong>Transactional NPS</strong> is triggered by a specific customer interaction: completing a purchase, closing a support ticket, finishing an onboarding session, or attending a training. It measures satisfaction with that specific touchpoint and allows you to identify friction points in your customer journey. Response rates are typically higher because the survey is contextually relevant.</p>
        <p><strong>Relationship NPS</strong> is sent on a time-based schedule (quarterly or semi-annually) to measure overall loyalty and satisfaction independent of any specific interaction. It provides a pulse check on the health of your customer relationships and is the version typically reported to leadership as a company-level KPI.</p>
        <p>Best practice is to run both: relationship NPS for strategic tracking, transactional NPS for operational improvement of specific touchpoints.</p>

        <h2>How to Improve Your NPS</h2>
        <p><strong>Close the loop with Detractors.</strong> Contact every Detractor within 24–48 hours of their survey response. A personalised outreach acknowledging their feedback and offering to resolve their issue converts a surprising number of Detractors into Passives or even Promoters — and prevents negative word-of-mouth from escalating. This is the single highest-impact NPS improvement action available to most businesses.</p>
        <p><strong>Identify the top detractor drivers.</strong> Analyse open-ended feedback from Detractors to find the top 3 themes driving low scores. Often, 60–70% of Detractor feedback clusters around 2–3 root causes: a product gap, a support experience, or a billing issue. Fix these systematically rather than case-by-case.</p>
        <p><strong>Activate your Promoters.</strong> Promoters are your best marketing asset — they just need a prompt. Ask Promoters for reviews on Google, G2, or Capterra. Invite them to referral programs, case study interviews, or community ambassador roles. Promoters who are engaged and asked tend to refer far more than those who are left to act spontaneously.</p>
        <p><strong>Improve onboarding.</strong> Many Detractors in SaaS are customers who never successfully activated the product. A structured, milestone-based onboarding that ensures every customer reaches their first key value moment within 14–30 days significantly reduces early-stage Detractor rates.</p>
        <p><strong>Track NPS cohorts over time.</strong> Rather than a single blended NPS, track NPS by customer cohort (month acquired), customer segment, and product plan. This reveals whether specific cohorts or segments have structurally lower loyalty — and points to root causes in acquisition quality, product fit, or service delivery for those segments.</p>
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
