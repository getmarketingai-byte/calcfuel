import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import WFHTaxCalc from "./WFHTaxCalc";

export const metadata: Metadata = {
  title: "Work From Home Tax Deduction Calculator 2025–26 | CalcFuel",
  description:
    "Calculate your Australian WFH tax deduction using the ATO fixed rate (70c/hour) for 2025–26. Estimate annual deduction and tax saving instantly.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay for 2025–26." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Reduce your taxable income via salary sacrifice and see the combined savings." },
  { title: "Tax Refund Estimator", slug: "tax-refund-estimator", description: "Estimate your Australian tax refund or bill for the current financial year." },
  { title: "HECS-HELP Calculator", slug: "hecs-help-calculator", description: "Calculate your HECS-HELP repayment rate and years to pay off your debt." },
  { title: "GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any amount instantly." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross and net profit margins for any business scenario." },
];

const faqs = [
  {
    question: "What is the ATO fixed rate for working from home in 2025–26?",
    answer: "The ATO revised fixed rate is 70 cents per hour worked from home. This rate applies for the 2022–23, 2023–24, 2024–25, and 2025–26 income years. The 70c/hour rate covers electricity and gas (for heating, cooling, and lighting), internet expenses, phone usage, and the decline in value of computer consumables and stationery. It does not cover the decline in value of depreciating assets such as laptops and furniture — you can claim those separately.",
  },
  {
    question: "What records do I need to keep for WFH deductions?",
    answer: "Under the revised fixed rate method, you must keep a record of the number of hours you worked from home. The ATO accepts a diary, timesheet, roster, or similar document covering the whole income year (not just a representative 4-week period as was acceptable previously). You must also keep at least one document showing you incurred each of the expenses covered by the fixed rate — for example, a utility bill or phone account in your name.",
  },
  {
    question: "What is the actual cost method and when should I use it?",
    answer: "The actual cost method lets you claim the actual work-related proportion of each expense — electricity, internet, phone, depreciation of office furniture and equipment — based on a usage diary. It can result in a larger deduction than the fixed rate, particularly if you have a dedicated home office and incur high electricity costs. The tradeoff is significantly more record-keeping complexity. If your actual expenses exceed what the 70c/hour fixed rate would produce, it may be worth calculating both and choosing the higher figure. You cannot use both methods simultaneously.",
  },
  {
    question: "Can I still claim phone and internet costs on top of the 70c/hour rate?",
    answer: "No. Under the revised 70c/hour fixed rate (from 2022–23 onwards), phone and internet usage is already included in the rate. You cannot claim these separately on top. If you want to claim your actual phone and internet expenses separately, you must use the actual cost method for those items, which means you cannot use the fixed rate for the entire expense claim. Previously (under the 80c COVID shortcut rate and the old 52c rate), you could claim phone and internet separately — but that changed with the 2022 ATO revision.",
  },
  {
    question: "What if my employer reimburses my WFH expenses?",
    answer: "If your employer reimburses you for specific WFH expenses (e.g., pays for your internet or buys you office furniture), you cannot claim those expenses as a tax deduction — you have not incurred the cost yourself. If your employer provides a WFH allowance, you must include that allowance as assessable income, and can then claim the deduction against it. Keep records of any employer reimbursements and allowances as the ATO may request evidence that you actually incurred unreimbursed expenses.",
  },
  {
    question: "Does working from home affect the main residence CGT exemption?",
    answer: "Using part of your home for income-producing purposes (including working from home) can partially affect your main residence capital gains tax (CGT) exemption when you eventually sell. However, the ATO has confirmed that using a room as a home office does not affect the CGT main residence exemption as long as the room was not used exclusively for business purposes — i.e., you still used it for private purposes as well. Setting up a dedicated room used solely as a business office (without personal use) can reduce your CGT exemption on sale. For most employees working from home, the main residence exemption is unaffected. Consult a tax adviser if you are unsure.",
  },
];

const howToSteps = [
  { name: "Enter days worked from home", text: "Enter the number of days per year you worked from home. A typical 5-day remote worker clocks around 200–250 days annually." },
  { name: "Enter hours worked per day", text: "Enter the actual hours worked (not just time spent at home). Standard is 7–8 hours per day for full-time employees." },
  { name: "Select your marginal tax rate", text: "Choose the tax rate applicable to the top dollar of your income. This determines your estimated tax saving from the deduction." },
  { name: "Read your results", text: "The calculator shows total WFH hours, annual deduction at 70c/hour, monthly/weekly deduction, and estimated tax saving." },
];

export default function WFHTaxCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Work From Home Tax Deduction Calculator 2025–26"
        description="Calculate your Australian WFH tax deduction using the ATO fixed rate of 70 cents per hour for 2025–26."
        url="https://calcfuel.com/calculators/work-from-home-tax-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Work From Home Tax Calculator", url: "https://calcfuel.com/calculators/work-from-home-tax-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Work From Home Tax Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Work From Home Tax Deduction Calculator 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Estimate your WFH tax deduction using the ATO fixed rate of <strong>70 cents per hour</strong> for 2025–26. Enter your days and hours to instantly calculate your annual deduction and estimated tax saving.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <WFHTaxCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. Actual deductions depend on your individual circumstances, record-keeping, and which method you choose to use. Consult a qualified tax professional for advice specific to your situation, or refer to the{" "}
        <a
          href="https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/working-from-home-expenses"
          className="text-orange-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ATO — Working from home expenses
        </a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>The ATO Fixed Rate Method — 70 Cents Per Hour</h2>
        <p>
          The Australian Taxation Office introduced a revised fixed rate method effective from the 2022–23 income year. The rate is <strong>70 cents per work-from-home hour</strong>, replacing the previous 52 cents per hour rate (and the COVID-era 80 cents per hour shortcut). The 70c rate is available for 2022–23, 2023–24, 2024–25, and 2025–26 — it has not changed going into the current financial year.
        </p>
        <p>
          The fixed rate is designed to be simple. Rather than tracking every individual expense, you multiply your total WFH hours by 70 cents to arrive at your deduction. This covers the following bundled expenses:
        </p>
        <ul>
          <li>Electricity and gas used for heating, cooling, and lighting your workspace</li>
          <li>Internet expenses (the work-related proportion)</li>
          <li>Phone expenses (mobile and home phone, work-related portion)</li>
          <li>Decline in value of stationery and computer consumables (e.g., printer ink, paper)</li>
        </ul>
        <p>
          Importantly, the fixed rate <strong>does not</strong> cover the decline in value of depreciating assets such as laptops, monitors, office chairs, or desks. You can claim these separately using the ATO&apos;s depreciation rules, in addition to the fixed rate deduction.
        </p>

        <h2>How to Calculate Your WFH Deduction</h2>
        <p>
          The formula is straightforward:
        </p>
        <ol>
          <li><strong>Total WFH hours</strong> = days worked from home × hours worked per day</li>
          <li><strong>Annual deduction</strong> = total WFH hours × $0.70</li>
        </ol>
        <p>
          For example, an employee working from home 200 days a year, 8 hours each day, accumulates 1,600 WFH hours. Their deduction is 1,600 × $0.70 = <strong>$1,120</strong>. At the 32.5% marginal rate, this produces an estimated tax saving of approximately $364.
        </p>
        <p>
          Full-time remote workers (around 250 days, 8 hours/day = 2,000 hours) can claim up to $1,400 per year using the fixed rate. At the 37% marginal tax bracket, that translates to a tax saving of around $518.
        </p>

        <h2>Record-Keeping Requirements for 2025–26</h2>
        <p>
          A critical change introduced with the revised fixed rate (from 2022–23) is that you must maintain a <strong>full-year record</strong> of your WFH hours. The ATO no longer accepts a representative 4-week diary extrapolated across the year (as was allowed under the old 52c rate). You must have documentation covering the entire income year — 1 July to 30 June.
        </p>
        <p>
          Acceptable records include:
        </p>
        <ul>
          <li>Electronic timesheets submitted to your employer</li>
          <li>Employer records, rosters, or logs showing WFH days</li>
          <li>A calendar or diary (digital or paper) recording daily WFH hours</li>
          <li>Start and end time records for WFH periods</li>
        </ul>
        <p>
          You must also hold at least one document showing you incurred each type of expense covered by the rate — for example, an electricity bill showing your name and address, and a phone account. These documents do not need to show the work-related portion; they just need to confirm you incurred the expense.
        </p>
        <p>
          The ATO can disallow WFH deductions on audit if adequate records are not held. Given the ease of keeping digital records (calendar apps, employer timesheets), it is strongly recommended that you start tracking from 1 July and maintain records throughout the year rather than trying to reconstruct them at tax time.
        </p>

        <h2>Fixed Rate vs. Actual Cost Method</h2>
        <p>
          You can choose either the fixed rate method or the actual cost method for any given year — but not both simultaneously for the same expenses. The best choice depends on your circumstances:
        </p>
        <table>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Fixed Rate (70c/hr)</th>
              <th>Actual Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Simplicity</td>
              <td>High — just track hours</td>
              <td>Low — track every expense</td>
            </tr>
            <tr>
              <td>Record keeping</td>
              <td>Hours log + one bill per expense type</td>
              <td>Bills, receipts, usage diaries for all expenses</td>
            </tr>
            <tr>
              <td>Better for</td>
              <td>Most employees; modest WFH setups</td>
              <td>High electricity, dedicated home office</td>
            </tr>
            <tr>
              <td>Can claim depreciation separately?</td>
              <td>Yes (on top of the 70c rate)</td>
              <td>Yes (part of the actual cost claim)</td>
            </tr>
          </tbody>
        </table>
        <p>
          For most Australian employees — particularly those without a dedicated home office, or those on a shared internet plan — the 70c fixed rate is simpler and often comparable in value to the actual cost method. However, employees with high energy costs, a large dedicated workspace, or expensive equipment should calculate both and compare.
        </p>

        <h2>Claiming Depreciation on Equipment</h2>
        <p>
          As noted, the fixed rate does not include the decline in value of major assets. If you purchased work equipment for home use — such as a laptop, second monitor, ergonomic chair, standing desk, or printer — you may be able to claim the work-related proportion of the asset&apos;s decline in value (depreciation) as a separate deduction.
        </p>
        <p>
          For assets costing $300 or less (or $150 or less for assets used only partly for work, where the work portion is $300 or less), you can claim an immediate deduction for the full work-related cost. For assets over $300, you must depreciate over the asset&apos;s effective life, using the ATO&apos;s effective life determinations.
        </p>
        <p>
          If your employer provides and owns the equipment, you cannot claim depreciation yourself. Only equipment you purchased personally and use for work purposes qualifies.
        </p>

        <h2>Working From Home Deductions and Your Tax Return</h2>
        <p>
          WFH deductions are claimed in your individual tax return under <strong>Work-Related Expenses</strong> (labels D1–D5 and D15). Most tax agents and software (including myTax) will ask you to select the method and enter your total claim. The ATO pre-fills most income data but not WFH deduction amounts — you must enter these yourself.
        </p>
        <p>
          If you are unsure which method to use, or if you have a complex WFH setup (e.g., running a home-based business, renting part of your home), consult a registered tax agent. You can find a registered agent at the{" "}
          <a href="https://www.tpb.gov.au/search-register" target="_blank" rel="noopener noreferrer">Tax Practitioners Board register</a>.
        </p>
        <p>
          For a complete picture of your tax position, also check our{" "}
          <Link href="/calculators/australian-income-tax-calculator" className="text-orange-500 underline">Australian Income Tax Calculator</Link> and{" "}
          <Link href="/calculators/tax-refund-estimator" className="text-orange-500 underline">Tax Refund Estimator</Link>. If you salary sacrifice, use our{" "}
          <Link href="/calculators/salary-sacrifice-calculator" className="text-orange-500 underline">Salary Sacrifice Calculator</Link> to model the impact on your take-home pay and HECS repayments. See the{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim/working-from-home-expenses" target="_blank" rel="noopener noreferrer">ATO&apos;s working from home expenses guide</a> for the full authoritative detail.
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
