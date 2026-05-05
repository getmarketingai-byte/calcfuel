import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CPACalc from "./CPACalc";
import MarketingAICTA from "@/components/MarketingAICTA";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "CPA Calculator - Calculate Cost Per Acquisition",
  description: "Free cost per acquisition (CPA) calculator. Calculate your CPA from campaign costs and conversions. Includes target CPA formulas and strategies to reduce acquisition costs.",
};

const relatedTools = [
  { title: "Cost Per Lead Calculator", slug: "cost-per-lead-calculator", description: "Calculate how much you spend to generate each lead." },
  { title: "Customer Acquisition Cost Calculator", slug: "customer-acquisition-cost-calculator", description: "Calculate your full customer acquisition cost." },
  { title: "Revenue Per Lead Calculator", slug: "revenue-per-lead-calculator", description: "Measure how much revenue each lead generates." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure total return on marketing investment." },
];

const faqs = [
  { question: "What is cost per acquisition (CPA)?", answer: "Cost per acquisition (CPA) is the total cost of marketing and advertising required to acquire one new customer. It is calculated by dividing total campaign cost by the number of customers acquired. CPA is the definitive measure of marketing efficiency — it tells you exactly how much it costs to bring in each new customer." },
  { question: "How do you calculate CPA?", answer: "CPA = Total Campaign Cost ÷ Number of Acquisitions. For example, if you spent $10,000 on a campaign that resulted in 80 new customers, your CPA is $125. This means it cost $125 in marketing spend to acquire each new customer." },
  { question: "What is the difference between CPA and CPL?", answer: "CPL (Cost Per Lead) measures the cost to generate a lead — someone who has expressed interest but hasn't bought yet. CPA (Cost Per Acquisition) measures the cost to acquire an actual paying customer. CPA is always higher than CPL because not all leads convert. CPA = CPL ÷ Lead-to-Customer Conversion Rate." },
  { question: "What is a good CPA?", answer: "A good CPA is one where CPA < Customer Lifetime Value × Target Payback Percentage. If your CLV is $1,200 and you target a 12-month payback, an acceptable CPA is anything under $1,200. CPA benchmarks vary dramatically: eCommerce CPAs might be $20–$80; B2B SaaS $200–$2,000; financial services $100–$500. Always measure CPA relative to CLV, not in isolation." },
  { question: "How is CPA different from CAC?", answer: "They are often used interchangeably, but technically: CPA refers to the cost to acquire a customer via a specific campaign or channel. CAC (Customer Acquisition Cost) is broader — the total blended cost of all sales and marketing activities divided by total customers acquired. CAC includes salaries, tools, and overhead; CPA typically refers to campaign-level media spend." },
  { question: "How can I reduce my CPA?", answer: "Key strategies: improve conversion rate at every funnel stage (a higher landing page conversion rate means lower CPA), tighten audience targeting to reach higher-intent prospects, test ad creative to improve click-through rates, optimise your offer to increase sales page conversion, and invest in retention to reduce the cost of revenue (keeping existing customers is cheaper than acquiring new ones)." },
];

const howToSteps = [
  { name: "Enter total campaign cost", text: "Input the total amount spent on the campaign — including ad spend, creative production costs, agency fees, and any other direct campaign expenses." },
  { name: "Enter number of acquisitions", text: "Enter the number of customers acquired as a direct result of this campaign. Use your CRM or analytics platform for accurate attribution." },
  { name: "Read your CPA", text: "The calculator shows your cost per acquisition — how much you spent per new customer." },
  { name: "Compare to your CLV", text: "Compare your CPA to your customer lifetime value to determine if the acquisition is profitable and sustainable." },
];

export default function CPAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="CPA Calculator"
        description="Free cost per acquisition (CPA) calculator. Calculate how much you spend to acquire each new customer."
        url="https://calcfuel.com/calculators/cost-per-acquisition-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "CPA Calculator", url: "https://calcfuel.com/calculators/cost-per-acquisition-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <span>CPA Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">CPA Calculator — Cost Per Acquisition</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Calculate your cost per acquisition (CPA) instantly. Enter your campaign spend and number of new customers acquired to see exactly how much each customer costs to acquire.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <CPACalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <EmailCapture />
      <MarketingAICTA />
      <article className="prose max-w-none mt-4">
        <h2>What Is Cost Per Acquisition (CPA)?</h2>
        <p>Cost per acquisition (CPA) measures how much you spend in marketing and advertising to acquire one paying customer. It is the definitive efficiency metric for any marketing activity — it collapses all the complexity of impressions, clicks, leads, and funnel stages into a single number: how much did it cost to bring in a new customer?</p>
        <p>CPA is important because it creates a direct link between marketing spend and business outcomes. Instead of optimising for clicks or even leads, CPA-focused marketing optimises for what actually matters — customers. A campaign generating 10,000 clicks but no customers has an infinite CPA. A campaign generating 1,000 clicks and 50 customers at $100 CPA is worth evaluating against your CLV.</p>
        <p>The most important rule in CPA-based marketing: your CPA must be less than your Customer Lifetime Value (CLV) for acquisition to be sustainable. Once you know your CLV, you have a hard ceiling for what you can afford to pay per acquisition. Many businesses fail because they scale marketing channels with CPAs above their CLV, burning cash on unprofitable growth.</p>

        <h2>The CPA Formula</h2>
        <p><strong>CPA = Total Campaign Cost ÷ Number of Acquisitions</strong></p>
        <p>Or expressed through the funnel: <strong>CPA = CPL ÷ Lead-to-Customer Conversion Rate</strong></p>
        <p><strong>Example:</strong> An online subscription business ran a paid search campaign, spending $15,000 over 30 days. The campaign generated 300 trial signups, of which 75 converted to paying subscribers. CPA = $15,000 ÷ 75 = <strong>$200 per customer</strong>. If their average subscription revenue is $50/month and customers stay for an average of 18 months, CLV = $900. CPA of $200 is 22% of CLV — an excellent result for most business models.</p>

        <h2>Setting Your Target CPA</h2>
        <p>Your target CPA should be derived from your CLV and your acceptable payback period, not from industry benchmarks alone. The formula:</p>
        <p><strong>Target CPA = CLV × (Acceptable Payback Period ÷ Customer Lifespan)</strong></p>
        <p>For example, if CLV = $1,500 over 24 months and you want to recoup acquisition costs within 12 months, target CPA = $1,500 × (12 ÷ 24) = $750. Any campaign delivering customers at below $750 CPA is profitable at your target payback period.</p>
        <p>Early-stage businesses often accept higher CPA-to-CLV ratios (50–100% of CLV) to build scale. Mature businesses with strong unit economics target 20–40% CPA-to-CLV ratios to generate cash flow for reinvestment.</p>

        <h2>CPA vs. CAC: What Is the Difference?</h2>
        <p>CPA (Cost Per Acquisition) and CAC (Customer Acquisition Cost) are related but different. CPA is typically a campaign-level metric — how much a specific paid channel or campaign spent to acquire customers. CAC is a company-level metric that includes all sales and marketing costs divided by total customers acquired in the period.</p>
        <p>CAC = (Total Sales + Marketing Costs including salaries, tools, events, agencies) ÷ New Customers Acquired</p>
        <p>CAC is always higher than your best-performing channel's CPA because it includes the cost of channels that are less efficient (or even unprofitable) as well as overhead. Tracking both lets you understand the efficiency of individual channels (CPA) versus the health of your overall go-to-market investment (CAC).</p>

        <h2>5 Ways to Reduce Your CPA</h2>
        <ol>
          <li><strong>Improve landing page conversion rate.</strong> If your landing page converts at 2% and you improve it to 4%, you halve your CPA. Landing page optimisation — headline testing, social proof, form length, page speed — is the highest-leverage CPA reduction lever because it applies to every visit.</li>
          <li><strong>Tighten audience targeting.</strong> Narrower, more qualified audiences have higher intent and convert at higher rates, reducing CPA. In Google Ads, use keyword exclusions, audience exclusions (existing customers), and device bid adjustments. In paid social, use Lookalike audiences based on high-LTV customers rather than broad interest targeting.</li>
          <li><strong>Improve offer-to-market fit.</strong> A free trial, demo, or low-friction entry point reduces CPA by lowering the commitment required at first conversion. Test different offers to find which generates the lowest downstream CPA (not just the most leads).</li>
          <li><strong>Use retargeting aggressively.</strong> Visitors who have seen your product but didn't convert cost 2–5x less to acquire via retargeting than cold audiences. Implement retargeting sequences that re-engage high-intent visitors with social proof, urgency, and personalised messaging.</li>
          <li><strong>Increase sales close rate.</strong> If leads from paid channels close at 10% and your sales process improvement lifts that to 15%, your effective CPA drops by 33% with no change in ad spend. Sales process investment — better demos, faster follow-up, stronger objection handling — directly reduces CPA on existing media spend.</li>
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
