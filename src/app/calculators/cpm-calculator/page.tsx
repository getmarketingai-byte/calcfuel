import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import CpmCalc from "./CpmCalc";

export const metadata: Metadata = {
  title: "CPM Calculator — Cost Per Thousand Impressions | CalcFuel",
  description:
    "Free CPM calculator. Solve for campaign cost, CPM, or impressions — enter any two values and get instant results. Plan social and display ad budgets with confidence.",
  alternates: { canonical: "/calculators/cpm-calculator" },
};

const relatedTools = [
  { title: "Click-Through Rate Calculator", slug: "click-through-rate-calculator", description: "Measure CTR for social posts, ads, and emails." },
  { title: "ROAS Calculator", slug: "roas-calculator", description: "Calculate return on ad spend for paid campaigns." },
  { title: "Ad Spend Calculator", slug: "ad-spend-calculator", description: "Project clicks, leads, and revenue from your ad budget." },
  { title: "Influencer Rate Calculator", slug: "influencer-rate-calculator", description: "Estimate fair sponsored-post rates by platform and niche." },
  { title: "Social Media ROI Calculator", slug: "social-media-roi-calculator", description: "Measure ROI from social media campaigns." },
  { title: "Cost Per Acquisition Calculator", slug: "cost-per-acquisition-calculator", description: "Calculate CPA from ad spend and conversions." },
];

const faqs = [
  {
    question: "What does CPM stand for?",
    answer:
      "CPM stands for Cost Per Mille — mille is Latin for thousand. In advertising, CPM is the price you pay for one thousand ad impressions. If your CPM is $10, you pay $10 every time your ad is shown one thousand times, regardless of whether anyone clicks.",
  },
  {
    question: "How do you calculate CPM?",
    answer:
      "CPM = (Total Campaign Cost ÷ Impressions) × 1,000. For example, if you spent $500 and received 100,000 impressions, your CPM is ($500 ÷ 100,000) × 1,000 = $5.00.",
  },
  {
    question: "How many impressions will my budget buy?",
    answer:
      "Impressions = (Total Cost ÷ CPM) × 1,000. With a $2,000 budget and a $8 CPM, you can expect roughly (2,000 ÷ 8) × 1,000 = 250,000 impressions before clicks or conversions are considered.",
  },
  {
    question: "What is a good CPM for social media ads?",
    answer:
      "CPM varies widely by platform, audience, and season. Meta (Facebook/Instagram) often ranges from $5–$15 AUD in Australia; LinkedIn can exceed $30; TikTok may run $4–$10. Brand awareness campaigns on premium placements cost more than retargeting. Compare CPM alongside CTR and CPA — a low CPM with zero clicks is not a bargain.",
  },
  {
    question: "Is CPM the same as CPC?",
    answer:
      "No. CPM charges per thousand impressions (views). CPC (Cost Per Click) charges only when someone clicks. CPM suits brand awareness and reach goals; CPC suits performance campaigns optimising for traffic or conversions. Many platforms let you choose the billing model in campaign setup.",
  },
  {
    question: "Should I optimise for CPM or ROAS?",
    answer:
      "Use CPM when reach and frequency matter — product launches, video views, or top-of-funnel awareness. Use ROAS when revenue attribution is clear and you need profitable sales. Mature eCommerce accounts often blend both: CPM for prospecting audiences and ROAS-targeted campaigns for retargeting.",
  },
];

const howToSteps = [
  { name: "Enter two known values", text: "Type in any two of: total campaign cost, CPM, or impressions." },
  { name: "Leave the third blank", text: "The calculator detects which value is missing and solves for it automatically." },
  { name: "Read your result", text: "The computed value appears instantly with the formula shown below." },
  { name: "Plan your next campaign", text: "Use the result to compare platforms, negotiate influencer packages, or set budget caps in your ad manager." },
];

export default function CpmCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="CPM Calculator"
        description="Free CPM calculator. Solve for campaign cost, CPM, or impressions — enter any two values for instant results."
        url="https://calcfuel.com/calculators/cpm-calculator"
        datePublished="2026-07-30"
        dateModified="2026-07-30"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Social Media Calculators", url: "https://calcfuel.com/calculators/social-media" },
          { name: "CPM Calculator", url: "https://calcfuel.com/calculators/cpm-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/social-media" className="hover:text-orange-500">
          Social Media Calculators
        </Link>
        <span className="mx-2">/</span>
        <span>CPM Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">CPM Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate cost per thousand impressions, total campaign spend, or expected reach. Enter any two values — the
        third is solved instantly. Free, no sign-up.
      </p>
      <CalcReviewedBy />
      <CpmCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Is CPM in Advertising?</h2>
        <p>
          CPM — cost per mille (thousand impressions) — is one of the oldest and most widely quoted metrics in digital
          advertising. When you buy display ads, social media reach campaigns, podcast sponsorships priced per download,
          or programmatic inventory, the seller often quotes a CPM. It answers a simple question: how much does it cost
          to put your message in front of one thousand people?
        </p>
        <p>
          Unlike cost-per-click (CPC) or cost-per-acquisition (CPA), CPM does not require anyone to take action. You
          pay for delivery — the ad being served and counted as an impression. That makes CPM the natural currency for
          brand awareness, video view campaigns, and any objective where reach and frequency matter more than immediate
          clicks.
        </p>

        <h2>The Three CPM Formulas</h2>
        <p>Every CPM problem involves three variables. Know any two and you can solve the third:</p>
        <ul>
          <li>
            <strong>CPM</strong> = (Total Cost ÷ Impressions) × 1,000
          </li>
          <li>
            <strong>Total Cost</strong> = CPM × Impressions ÷ 1,000
          </li>
          <li>
            <strong>Impressions</strong> = Total Cost ÷ CPM × 1,000
          </li>
        </ul>
        <p>
          <strong>Example:</strong> You spent $3,000 on a Meta awareness campaign and received 400,000 impressions. CPM
          = ($3,000 ÷ 400,000) × 1,000 = <strong>$7.50</strong>. Conversely, if a publisher quotes $12 CPM and you
          have $1,200 to spend, you can expect roughly 100,000 impressions before any platform fees or GST.
        </p>

        <h2>When to Use CPM vs Other Metrics</h2>
        <p>
          CPM is best when your goal is visibility. Launching a new product, building recall before a sale, or warming
          a cold audience for later retargeting are classic CPM use cases. Performance marketers often ignore CPM in
          favour of ROAS or CPA once conversion tracking is reliable — but ignoring CPM entirely can hide expensive
          reach problems. A campaign with stellar ROAS but a CPM three times the industry average may not scale
          profitably when you exhaust your retargeting pool.
        </p>
        <p>
          Pair CPM with our{" "}
          <Link href="/calculators/click-through-rate-calculator">Click-Through Rate Calculator</Link> to see whether
          cheap impressions actually drive traffic, and with the{" "}
          <Link href="/calculators/roas-calculator">ROAS Calculator</Link> to tie spend back to revenue.
        </p>

        <h2>CPM Benchmarks by Channel</h2>
        <p>
          Benchmarks shift by country, season, and audience quality. The figures below are typical planning ranges for
          Australian advertisers in 2026 — treat them as starting points, not guarantees.
        </p>
        <table>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Typical CPM range (AUD)</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meta (Facebook/Instagram)</td>
              <td>$5 – $15</td>
              <td>Higher in Q4; lower for broad audiences</td>
            </tr>
            <tr>
              <td>TikTok</td>
              <td>$4 – $12</td>
              <td>Video-first; strong for younger demographics</td>
            </tr>
            <tr>
              <td>LinkedIn</td>
              <td>$25 – $50+</td>
              <td>B2B targeting commands premium CPMs</td>
            </tr>
            <tr>
              <td>Google Display</td>
              <td>$3 – $10</td>
              <td>Wide variance by placement and topic</td>
            </tr>
            <tr>
              <td>YouTube (TrueView)</td>
              <td>$8 – $20</td>
              <td>Skippable in-stream and discovery ads</td>
            </tr>
            <tr>
              <td>Programmatic display</td>
              <td>$2 – $8</td>
              <td>Premium publishers cost more</td>
            </tr>
          </tbody>
        </table>

        <h2>Planning Campaign Budgets With CPM</h2>
        <p>
          Before you commit budget in an ad manager, work backwards from your reach goal. If you need 500,000
          impressions and expect a $9 CPM, set aside at least $4,500 in media spend. Add platform fees, agency
          markups, creative production, and GST where applicable — the CPM quoted in your dashboard is rarely the
          all-in cost of getting in front of your audience.
        </p>
        <p>
          For influencer partnerships priced on estimated impressions (e.g. &quot;$15 CPM based on average post
          views&quot;), use this calculator to sanity-check whether the quoted package fits your budget. Our{" "}
          <Link href="/calculators/influencer-rate-calculator">Influencer Rate Calculator</Link> complements CPM
          planning by estimating fair rates from follower count and engagement.
        </p>

        <h2>CPM and Frequency</h2>
        <p>
          Impressions are not unique viewers. If your CPM buys 100,000 impressions but your audience is only 20,000
          people, average frequency is five — each person saw your ad five times on average. High frequency can lift
          recall but also cause ad fatigue. Monitor frequency alongside CPM when running sustained awareness flights.
        </p>
        <p>
          To connect impressions to outcomes, estimate clicks using CTR, then conversions using your landing page rate,
          then cost per acquisition. The{" "}
          <Link href="/calculators/ad-spend-calculator">Ad Spend Calculator</Link> and{" "}
          <Link href="/calculators/cost-per-acquisition-calculator">CPA Calculator</Link> help close that loop from
          reach to revenue.
        </p>

        <h2>Common CPM Mistakes</h2>
        <p>
          <strong>Comparing CPM across platforms without context:</strong> A $6 CPM on TikTok and a $6 CPM on LinkedIn
          do not deliver the same audience quality or intent. Always judge CPM alongside audience fit and downstream
          metrics.
        </p>
        <p>
          <strong>Ignoring viewability:</strong> An impression counted below the fold or for less than one second may not
          be worth the same as a full in-view video play. Some buys quote eCPM (effective CPM) after viewability
          filters — clarify with your rep.
        </p>
        <p>
          <strong>Forgetting GST:</strong> Australian advertisers often see GST-exclusive CPMs in US-based platforms.
          Add 10% when comparing to local invoices quoted inclusive of GST.
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
        <strong>Disclaimer:</strong> This calculator provides planning estimates only. Ad platform rates, auction
        dynamics, and impression definitions vary. Confirm live CPMs in your ad account before committing budget.
      </aside>

      <RelatedTools tools={relatedTools} />
    </div>
  );
}
