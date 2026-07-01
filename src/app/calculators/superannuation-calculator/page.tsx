import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import SuperannuationCalc from "./SuperannuationCalc";

export const metadata: Metadata = {
  title: "Superannuation Calculator Australia 2025–26 | CalcFuel",
  description:
    "Free Australian superannuation calculator. Project your super balance at retirement. Enter your salary, years to retirement, and return rate for an instant estimate.",
};

const relatedTools = [
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Calculate tax savings from salary sacrificing into super." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay." },
  { title: "HECS-HELP Calculator", slug: "hecs-help-calculator", description: "Estimate your annual HECS repayment and years to pay off." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "Calculate how investments grow with compound interest over time." },
  { title: "Mortgage Repayment Calculator", slug: "mortgage-repayment-calculator", description: "Calculate monthly repayments on an Australian home loan." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the revenue needed to cover your costs." },
];

const faqs = [
  {
    question: "How much super should I have at my age in Australia?",
    answer:
      "ASIC's MoneySmart provides indicative super balance benchmarks: approximately $75,000 by age 35, $140,000 by 40, $230,000 by 45, $330,000 by 50, $450,000 by 55, and $590,000 by 60. These are median estimates — your target depends on your expected retirement income needs and lifestyle. The Association of Superannuation Funds of Australia (ASFA) estimates comfortable retirement requires approximately $595,000 for singles and $690,000 for couples.",
  },
  {
    question: "What is the Superannuation Guarantee rate in 2025–26?",
    answer:
      "The Superannuation Guarantee (SG) rate is 11.5% of ordinary time earnings for 2025–26. It rises to 12% from 1 July 2025. The SG is the minimum your employer must contribute into your super fund. Some awards, enterprise agreements, or employer policies may require higher rates.",
  },
  {
    question: "What is the superannuation preservation age in Australia?",
    answer:
      "The superannuation preservation age — the earliest you can access your super — is 60 for anyone born after 1 July 1964. If you were born before that date, your preservation age ranges from 55 to 59 depending on your birth year. You can access super once you reach preservation age and retire, or turn 65 (regardless of employment status).",
  },
  {
    question: "How much can I contribute to super in 2025–26?",
    answer:
      "For 2025–26: the concessional (pre-tax) contributions cap is $30,000 per year (including employer SG). The non-concessional (after-tax) contributions cap is $120,000 per year. If your total super balance is under $500,000, you can carry forward unused concessional cap space from the previous 5 years. Non-concessional contributions are capped at nil once your total super balance reaches $1.9 million.",
  },
  {
    question: "What is the average super return in Australia?",
    answer:
      "Balanced super funds (the most common default) have historically returned approximately 7–8% per year over the long run, before tax. After accounting for the 15% super fund earnings tax, the net long-run return is approximately 6–7%. APRA publishes annual super fund performance data at apra.gov.au.",
  },
  {
    question: "How is superannuation taxed in Australia?",
    answer:
      "Superannuation is taxed at three stages: contributions tax (concessional contributions taxed at 15% entering the fund; non-concessional contributions already taxed at marginal rates), earnings tax (investment earnings within the fund taxed at up to 15%; capital gains held over 12 months taxed at 10%), and benefits tax (generally tax-free if you are over 60; various rules apply before 60 or to untaxed components). The tax advantages make super one of the most tax-effective long-term savings vehicles available to Australians.",
  },
  {
    question: "Can I make voluntary super contributions?",
    answer:
      "Yes. You can make additional concessional contributions (salary sacrifice or personal deductible contributions — taxed at 15% in the fund, up to the $30,000 cap) and non-concessional contributions (after-tax contributions — no additional tax in the fund, up to $120,000 per year). Voluntary contributions that are non-concessional can be withdrawn at any time once you reach preservation age, with no additional tax if you are over 60.",
  },
];

const howToSteps = [
  { name: "Enter your current super balance", text: "Find your current balance on your super fund's app or annual statement." },
  { name: "Enter your salary and SG rate", text: "Use your current gross annual salary and the applicable SG rate (11.5% for 2025–26)." },
  { name: "Add any extra contributions", text: "If you salary sacrifice or make voluntary contributions, add those here." },
  { name: "Set years to retirement and return rate", text: "Enter how many years until you plan to retire, and your expected annual investment return (7% is a common balanced fund assumption)." },
  { name: "Review your projected balance", text: "The calculator shows your projected balance, total contributions, investment growth, and estimated annual/monthly retirement income using a 4% drawdown rate." },
];

export default function SuperannuationCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Superannuation Calculator Australia 2025–26"
        description="Free Australian superannuation calculator. Project your super balance and retirement income based on your salary, contributions, and years to retirement."
        url="https://calcfuel.com/calculators/superannuation-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Superannuation Calculator", url: "https://calcfuel.com/calculators/superannuation-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Superannuation Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Superannuation Calculator Australia 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Project your superannuation balance at retirement. Enter your current balance, salary, and years to retirement for an instant estimate — based on 2025–26 ATO rates and realistic return assumptions.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <SuperannuationCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial advice. Superannuation outcomes depend on investment performance, fees, tax, insurance premiums, and personal circumstances. Past returns are not indicative of future performance. Consult a licensed financial adviser for retirement planning. For a government-approved projection, use the{" "}
        <a href="https://moneysmart.gov.au/retirement-income/superannuation-calculator" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ASIC MoneySmart superannuation calculator</a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How Superannuation Works in Australia</h2>
        <p>
          Superannuation is Australia&apos;s compulsory retirement savings system. Employers are required to contribute a percentage of each employee&apos;s ordinary time earnings (the Superannuation Guarantee) into a complying superannuation fund. Workers can also make voluntary contributions. Funds invest money in diversified portfolios and the money is generally locked away until you reach preservation age (60 for most Australians born after 1 July 1964).
        </p>
        <p>
          The combination of compulsory contributions, tax concessions, and long-run compound investment growth makes superannuation the primary vehicle for building retirement wealth in Australia. More than $3.5 trillion is held in Australian super funds, making it one of the largest pension systems in the world relative to GDP.
        </p>

        <h2>Superannuation Guarantee Rates 2025–26</h2>
        <p>
          The Superannuation Guarantee (SG) is the minimum percentage of ordinary time earnings your employer must contribute to your super. Rates are legislated to increase progressively:
        </p>
        <table>
          <thead>
            <tr><th>Financial Year</th><th>SG Rate</th></tr>
          </thead>
          <tbody>
            <tr><td>2024–25</td><td>11.5%</td></tr>
            <tr><td>2025–26 and beyond</td><td>12.0%</td></tr>
          </tbody>
        </table>
        <p>
          Source:{" "}
          <a href="https://www.ato.gov.au/businesses-and-organisations/super-for-employers/setting-up-super-for-your-business/choosing-the-right-fund-for-your-employees/super-contribution-calculator" target="_blank" rel="noopener noreferrer">ATO — Super contributions overview</a>.
          These are minimums — your employer, award, or enterprise agreement may require higher contributions.
        </p>

        <h2>Superannuation Contribution Caps 2025–26</h2>
        <p>
          The ATO limits how much you can contribute to super at concessional tax rates each year:
        </p>
        <ul>
          <li><strong>Concessional contributions cap:</strong> $30,000 per year (includes employer SG + salary sacrifice + personal deductible contributions)</li>
          <li><strong>Non-concessional contributions cap:</strong> $120,000 per year (after-tax contributions, subject to total super balance below $1.9 million)</li>
          <li><strong>Bring-forward rule:</strong> If your total super balance is below $1.66 million, you may be able to contribute up to $360,000 in non-concessional contributions over three years by triggering the bring-forward rule</li>
        </ul>
        <p>
          See{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/before-tax-contributions/concessional-contributions-cap" target="_blank" rel="noopener noreferrer">ATO concessional contributions cap</a>{" "}
          and{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/after-tax-contributions/non-concessional-contributions-cap" target="_blank" rel="noopener noreferrer">ATO non-concessional contributions cap</a>{" "}
          for the most current rules.
        </p>

        <h2>How Super Is Taxed</h2>
        <p>
          Superannuation&apos;s tax concessions are what make it so powerful as a savings vehicle:
        </p>
        <ul>
          <li><strong>Concessional contributions:</strong> Taxed at 15% when entering the fund (compared to marginal income tax rates of up to 47% for high earners)</li>
          <li><strong>Non-concessional contributions:</strong> Already taxed at your marginal rate — no additional tax in the fund</li>
          <li><strong>Investment earnings:</strong> Taxed at up to 15% within the fund (capital gains on assets held over 12 months: 10%)</li>
          <li><strong>Retirement income stream:</strong> Tax-free after age 60 (for most Australians). Between preservation age and 60, tax applies to the taxable component but is offset by a 15% tax offset</li>
        </ul>
        <p>
          Earnings in pension phase (retirement income stream) are tax-free up to the transfer balance cap ($1.9 million for 2025–26). Amounts above the cap remain in accumulation phase and continue to attract 15% earnings tax.
        </p>

        <h2>How to Grow Your Super Faster</h2>
        <p>
          Small changes now can make a significant difference over the long run due to compound growth:
        </p>
        <ul>
          <li><strong>Salary sacrifice:</strong> Use our <Link href="/calculators/salary-sacrifice-calculator" className="text-orange-500 underline">Salary Sacrifice Calculator</Link> to see how sacrificing pre-tax salary into super reduces your income tax</li>
          <li><strong>Consolidate funds:</strong> Multiple funds mean multiple sets of fees and insurance premiums eating into your returns. Consolidate via myGov if you have inactive funds</li>
          <li><strong>Choose the right investment option:</strong> For younger workers with 20+ years to retirement, a high-growth option (more equities, less fixed interest) has historically outperformed balanced and conservative options over the long run</li>
          <li><strong>Spouse contributions:</strong> If your spouse earns under $40,000, you may receive an 18% tax offset on contributions of up to $3,000 you make to their fund</li>
          <li><strong>Government co-contribution:</strong> If you earn under $58,445 (2024–25) and make a non-concessional contribution, the government may contribute up to $500 as a co-contribution</li>
          <li><strong>Carry-forward concessional contributions:</strong> If your total super balance is below $500,000, you can contribute up to five years&apos; worth of unused concessional cap space in a single year</li>
        </ul>

        <h2>What Is Enough Super for Retirement?</h2>
        <p>
          According to the{" "}
          <a href="https://www.superannuation.asn.au/resources/retirement-standard" target="_blank" rel="noopener noreferrer">ASFA Retirement Standard</a>{" "}
          (March 2025 update), Australians need approximately:
        </p>
        <ul>
          <li><strong>Comfortable retirement (single):</strong> ~$595,000 in super, targeting $51,630/year in spending</li>
          <li><strong>Comfortable retirement (couple):</strong> ~$690,000 in super, targeting $72,663/year in spending</li>
          <li><strong>Modest retirement (single):</strong> ~$100,000 — significantly supplemented by the Age Pension</li>
        </ul>
        <p>
          These figures assume you also receive the part Age Pension, own your home outright, and retire at 67. Your personal target depends on your expected spending, whether you will receive the Age Pension, and how long you plan to work. For an in-depth retirement projection, consult a{" "}
          <a href="https://moneysmart.gov.au/financial-advice/financial-advisers-register" target="_blank" rel="noopener noreferrer">licensed financial adviser</a>.
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

      <RelatedTools tools={relatedTools} />
      <RelatedGuides guides={[
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing, and depreciation." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "Save $150–$440/year by timing your fuel fill-ups to the weekly price cycle low." },
        { title: "Motorcycle vs Car Running Costs Australia", slug: "motorcycle-vs-car-running-costs-australia", description: "Is a motorbike cheaper to run than a car? Full cost comparison for AU commuters." },
        { title: "EV Charging Cost Australia", slug: "ev-charging-cost-australia", description: "Home vs public charging costs, best tariffs, and solar EV charging in 2026." },
      ]} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
