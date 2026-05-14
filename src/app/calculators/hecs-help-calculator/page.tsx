import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import HECSCalc from "./HECSCalc";

export const metadata: Metadata = {
  title: "HECS-HELP Repayment Calculator 2025–26 | CalcFuel",
  description:
    "Free HECS-HELP repayment calculator for 2025–26. Find your repayment rate, annual amount, and years to pay off your student debt based on current ATO thresholds.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Reduce your taxable income and HECS repayments via salary sacrifice." },
  { title: "Tax Refund Estimator", slug: "tax-refund-estimator", description: "Estimate your Australian tax refund for the current financial year." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance at retirement." },
  { title: "Work From Home Tax Calculator", slug: "work-from-home-tax-calculator", description: "Calculate your WFH tax deduction using the ATO fixed rate method." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross and net profit margins." },
];

const faqs = [
  {
    question: "What income triggers HECS-HELP repayments?",
    answer: "For 2025–26, the minimum repayment income is $54,435. Below this threshold, no HECS-HELP repayment is required. The repayment rate starts at 1% and increases progressively to 10% for those earning over $162,999. The threshold is adjusted annually for inflation (CPI).",
  },
  {
    question: "What income is used to calculate HECS repayments?",
    answer: "HECS-HELP repayments are based on your 'repayment income', which includes: your taxable income, reportable fringe benefits total, total net investment losses, and reportable employer super contributions (RESC — salary sacrificed super above the SG minimum). This means salary sacrificing into super reduces your taxable income but is partially clawed back through RESC for HECS purposes.",
  },
  {
    question: "Is HECS-HELP debt indexed?",
    answer: "Yes. HECS-HELP debt is indexed annually on 1 June each year using the Consumer Price Index (CPI). In recent years, high inflation has caused significant indexation increases — 7.1% in June 2023 and 4.7% in June 2024. If your annual repayment is less than the indexation applied to your balance, your debt can grow even while making repayments. Check your current balance at myGov or the ATO online services.",
  },
  {
    question: "Can I make voluntary HECS-HELP repayments?",
    answer: "Yes. You can make voluntary HECS-HELP repayments at any time through the ATO. There is no early repayment bonus (the government removed the 5% voluntary repayment bonus in 2017). However, voluntary repayments reduce your debt before the 1 June indexation date, saving you from paying CPI on that amount. There is a minimum voluntary repayment of $500.",
  },
  {
    question: "Does HECS-HELP affect my credit rating?",
    answer: "HECS-HELP debt is not listed on your credit report and does not directly affect your credit score. However, it does reduce your take-home pay (via mandatory repayments withheld by your employer), which can affect your borrowing capacity assessment by mortgage lenders. Lenders typically include HECS repayments in their serviceability calculations.",
  },
  {
    question: "What happens to HECS-HELP debt if I move overseas?",
    answer: "Since 2017, Australians living overseas with HECS-HELP debt must declare their worldwide income to the ATO and make repayments if their income exceeds the threshold. This applies even if you are no longer an Australian tax resident. Repayments are due on the same timeline as Australian tax returns. Failing to notify the ATO of overseas income can result in penalties.",
  },
];

const howToSteps = [
  { name: "Enter your repayment income", text: "Enter your total repayment income — taxable income plus reportable super contributions and fringe benefits. This is higher than just your salary." },
  { name: "Enter your outstanding HECS debt (optional)", text: "If you know your current balance, enter it to calculate years to repay. Leave blank to see the repayment rate and annual amount only." },
  { name: "Read your results", text: "The calculator shows your repayment rate, annual and monthly repayment amounts, and (if debt is entered) estimated years to pay off." },
];

export default function HECSCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="HECS-HELP Repayment Calculator 2025–26"
        description="Calculate your HECS-HELP repayment rate, annual amount, and years to pay off based on 2025–26 ATO thresholds."
        url="https://calcfuel.com/calculators/hecs-help-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "HECS-HELP Calculator", url: "https://calcfuel.com/calculators/hecs-help-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>HECS-HELP Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        HECS-HELP Repayment Calculator 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Find your HECS-HELP repayment rate and annual amount based on your income. Uses the 2025–26 ATO repayment thresholds — instant results, no sign-up required.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <HECSCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. HECS-HELP repayment amounts depend on your exact repayment income, which may differ from your taxable income. Consult a registered tax agent for advice specific to your situation, or see the{" "}
        <a href="https://www.ato.gov.au/individuals-and-families/study-and-training-support-loans/higher-education-loan-program-help/repaying-your-help-debt/repayment-thresholds-and-rates" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ATO HECS repayment thresholds</a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Is HECS-HELP?</h2>
        <p>
          HECS-HELP (Higher Education Contribution Scheme — Higher Education Loan Program) is Australia&apos;s income-contingent student loan scheme that allows eligible students to defer tuition fees for approved higher education courses. Instead of paying upfront, you accumulate a HECS-HELP debt that is repaid through the tax system once your income exceeds the minimum repayment threshold.
        </p>
        <p>
          HECS-HELP replaced the original HECS scheme in 2005 and is administered by the ATO. More than 3 million Australians hold HECS-HELP or related study loan debts, making it one of the most widespread financial obligations for working-age Australians. As of 2024, total HECS-HELP debt outstanding exceeds $80 billion.
        </p>

        <h2>2025–26 HECS-HELP Repayment Rates</h2>
        <p>
          HECS repayments are calculated as a percentage of your repayment income. The rates for 2025–26 are:
        </p>
        <table>
          <thead>
            <tr><th>Repayment Income</th><th>Repayment Rate</th></tr>
          </thead>
          <tbody>
            <tr><td>Below $54,435</td><td>Nil</td></tr>
            <tr><td>$54,435 – $62,849</td><td>1.0%</td></tr>
            <tr><td>$62,850 – $66,000</td><td>2.0%</td></tr>
            <tr><td>$66,001 – $68,674</td><td>2.5%</td></tr>
            <tr><td>$68,675 – $74,999</td><td>3.0%</td></tr>
            <tr><td>$75,000 – $79,999</td><td>3.5%</td></tr>
            <tr><td>$80,000 – $85,999</td><td>4.0%</td></tr>
            <tr><td>$86,000 – $91,999</td><td>4.5%</td></tr>
            <tr><td>$92,000 – $98,999</td><td>5.0%</td></tr>
            <tr><td>$99,000 – $104,999</td><td>5.5%</td></tr>
            <tr><td>$105,000 – $111,999</td><td>6.0%</td></tr>
            <tr><td>$112,000 – $119,882</td><td>6.5%</td></tr>
            <tr><td>$119,883 – $124,999</td><td>7.0%</td></tr>
            <tr><td>$125,000 – $131,999</td><td>7.5%</td></tr>
            <tr><td>$132,000 – $138,999</td><td>8.0%</td></tr>
            <tr><td>$139,000 – $146,999</td><td>8.5%</td></tr>
            <tr><td>$147,000 – $154,999</td><td>9.0%</td></tr>
            <tr><td>$155,000 – $162,999</td><td>9.5%</td></tr>
            <tr><td>$163,000+</td><td>10.0%</td></tr>
          </tbody>
        </table>
        <p>
          Source:{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/study-and-training-support-loans/higher-education-loan-program-help/repaying-your-help-debt/repayment-thresholds-and-rates" target="_blank" rel="noopener noreferrer">ATO — HECS-HELP repayment thresholds 2025–26</a>.
          Thresholds are updated annually.
        </p>

        <h2>Repayment Income vs. Taxable Income</h2>
        <p>
          Your HECS repayment is not based on your taxable income alone. The ATO uses a broader measure called <strong>repayment income</strong>, which adds back certain amounts that may have reduced your taxable income:
        </p>
        <ul>
          <li><strong>Taxable income:</strong> Base figure from your tax return</li>
          <li><strong>Reportable fringe benefits:</strong> FBT grossed-up value of benefits from your employer (e.g., novated lease, hospital FBT exemption)</li>
          <li><strong>Reportable employer super contributions (RESC):</strong> Salary sacrificed super contributions above the SG minimum</li>
          <li><strong>Total net investment losses:</strong> Net rental or investment losses added back to income</li>
        </ul>
        <p>
          If you salary sacrifice into super, this reduces your taxable income — but the sacrificed amount (as RESC) is added back to your repayment income. So salary sacrifice does reduce your HECS repayment obligation, but not by as much as it reduces your income tax. Use our <Link href="/calculators/salary-sacrifice-calculator" className="text-orange-500 underline">Salary Sacrifice Calculator</Link> to model the combined effect.
        </p>

        <h2>HECS-HELP Indexation</h2>
        <p>
          Outstanding HECS-HELP debt is indexed to the Consumer Price Index (CPI) on 1 June each year. This means your debt balance grows with inflation. With CPI running at high levels in 2022–2024, many borrowers saw their balances increase significantly:
        </p>
        <ul>
          <li>June 2023: +7.1% indexation — the highest increase since the system began</li>
          <li>June 2024: +4.7% indexation</li>
          <li>June 2025: to be confirmed (based on March 2025 CPI data)</li>
        </ul>
        <p>
          If your mandatory repayment in a given year is less than the indexation applied to your balance, your net debt can actually grow. For example, with a $30,000 debt and 5% indexation ($1,500), a mandatory repayment of $1,200 would leave your balance $300 higher than the year before.
        </p>
        <p>
          Voluntary repayments made before 1 June reduce the indexation base and can save significant amounts on high-debt balances. There is no early repayment discount, but the CPI saving can be substantial when indexation is elevated.
        </p>

        <h2>How HECS Repayments Are Collected</h2>
        <p>
          Mandatory HECS repayments are collected through the income tax system:
        </p>
        <ol>
          <li>You advise your employer that you have a HECS-HELP debt (by ticking the box on your tax file number declaration)</li>
          <li>Your employer withholds additional tax from your pay based on the ATO&apos;s withholding tables</li>
          <li>The withheld amount is remitted to the ATO along with your regular PAYG withholding</li>
          <li>When you lodge your tax return, the ATO calculates your actual repayment obligation and adjusts for over- or under-withholding</li>
        </ol>
        <p>
          If you forget to declare your HECS debt to a new employer, the ATO will still assess the repayment when you lodge your tax return — and you may face a large amount owing at tax time. Always update your TFN declaration when starting a new job.
        </p>

        <h2>Should You Pay Off HECS Early?</h2>
        <p>
          The decision to pay off HECS early versus investing or paying down other debt depends on the relative returns:
        </p>
        <ul>
          <li><strong>HECS is indexed to CPI (not a fixed interest rate):</strong> When inflation is low (1–2%), the real cost of HECS is low. When inflation is high (5–7%), HECS grows faster.</li>
          <li><strong>Investing alternatives:</strong> If you can earn more investing (e.g., in diversified equities or paying down a mortgage with a higher interest rate), investing or paying down the mortgage may be smarter than voluntary HECS repayments.</li>
          <li><strong>Peace of mind:</strong> Eliminating HECS debt removes a perpetual obligation and frees up cash flow. For many Australians, this peace of mind has real value.</li>
          <li><strong>Borrowing capacity:</strong> Paying off HECS debt can improve your home loan borrowing capacity, as lenders add projected HECS repayments to your existing debt obligations.</li>
        </ul>
        <p>
          For personalised advice on HECS strategy, consult a registered tax agent or financial adviser. See also the{" "}
          <a href="https://moneysmart.gov.au/student-loan/hecs-help" target="_blank" rel="noopener noreferrer">ASIC MoneySmart HECS-HELP guide</a>.
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
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
