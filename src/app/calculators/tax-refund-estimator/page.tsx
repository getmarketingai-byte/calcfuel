import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import TaxRefundCalc from "./TaxRefundCalc";

export const metadata: Metadata = {
  title: "Tax Refund Estimator Australia 2025–26 | CalcFuel",
  description:
    "Estimate your Australian tax refund or tax bill for 2025–26. Enter income, PAYG withheld, and deductions for an instant ATO-based estimate.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Full income tax, Medicare levy, and take-home pay calculator for 2025–26." },
  { title: "Work From Home Tax Calculator", slug: "work-from-home-tax-calculator", description: "Calculate your WFH deduction using the ATO 70c/hour fixed rate." },
  { title: "HECS-HELP Calculator", slug: "hecs-help-calculator", description: "Calculate your HECS repayment rate and years to pay off your student debt." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Model the tax benefit of salary sacrificing into super or other benefits." },
  { title: "GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any amount in seconds." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the sales volume needed to cover fixed and variable costs." },
];

const faqs = [
  {
    question: "How do I get a tax refund in Australia?",
    answer: "Most Australians receive a refund because their employer withholds PAYG tax at a rate that slightly overestimates their tax liability — particularly if they have deductions the employer does not know about. To receive your refund, you must lodge a tax return with the ATO (via myTax at myGov, or through a registered tax agent). Once lodged, the ATO processes the return and issues a notice of assessment. Refunds are typically paid within 12 business days for online lodgements.",
  },
  {
    question: "When does the ATO pay tax refunds?",
    answer: "The ATO typically processes online tax returns and issues refunds within 2 weeks for straightforward returns. Paper returns take longer — up to 10 weeks. The ATO can take longer if your return is selected for review or if there are discrepancies with pre-filled data. The tax year runs from 1 July to 30 June, and the lodgement deadline for individuals is 31 October (or later if using a registered tax agent). The ATO does not pay interest on refunds, so there is little financial benefit to delaying lodgement.",
  },
  {
    question: "What deductions can I claim on my tax return?",
    answer: "Common deductions for Australian employees include: work-related expenses (vehicle, travel, uniform, tools, professional development), working from home expenses (70c/hour fixed rate), self-education expenses related to your current job, investment expenses (interest on investment loans, financial advice), charitable donations to deductible gift recipients (DGRs), income protection insurance premiums, and tax agent fees. You cannot claim private expenses, the cost of getting to and from work (ordinary commuting), or expenses your employer has already reimbursed.",
  },
  {
    question: "What is the average Australian tax refund?",
    answer: "The ATO reports that Australian individuals receive an average refund of approximately $2,800 per year. However, this varies widely based on income level, deductions claimed, and how accurately PAYG was withheld. Higher-income earners with significant investment deductions or rental losses may receive larger refunds, while those with accurate withholding and few deductions may receive little or owe a small amount.",
  },
  {
    question: "Do I need to lodge a tax return if I earned under $18,200?",
    answer: "You are not required to lodge a tax return if your taxable income is below the tax-free threshold ($18,200 for 2025–26) AND you have no tax withheld or other obligations. However, if your employer withheld any tax from your pay (which is common even on low incomes), you should lodge a return to get that money refunded. You may also need to lodge if you had foreign income, received government payments, or have a HECS-HELP debt. When in doubt, lodge — it costs nothing if you use myTax.",
  },
  {
    question: "What if I have multiple jobs?",
    answer: "If you have multiple employers, only one can use the tax-free threshold. The second (and subsequent) job must use the 'no tax-free threshold' withholding rate, which withholds more tax. If your combined income from all jobs is accurately reflected by your withholding, you should receive little refund or owe little at tax time. Problems arise when people apply the tax-free threshold to multiple employers — this typically results in a tax debt at lodgement. Declare your HECS debt to all employers to ensure adequate withholding.",
  },
];

const howToSteps = [
  { name: "Enter your gross income", text: "Enter your total gross income from all employers (before tax). This is shown on your income statement or payment summary in myGov." },
  { name: "Enter PAYG tax withheld", text: "Enter the total tax withheld by your employer(s) during the year. This is also on your income statement." },
  { name: "Enter your deductions", text: "Enter your total work-related deductions and any other deductions such as donations. Use the Work From Home Calculator to estimate your WFH deduction." },
  { name: "Read your estimate", text: "The calculator shows your taxable income, tax breakdown (income tax, LITO, Medicare levy), and whether you are due a refund or have tax owing." },
];

export default function TaxRefundEstimatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian Tax Refund Estimator 2025–26"
        description="Estimate your Australian tax refund or tax bill for 2025–26 based on income, PAYG withheld, and deductions."
        url="https://calcfuel.com/calculators/tax-refund-estimator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Tax Refund Estimator", url: "https://calcfuel.com/calculators/tax-refund-estimator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Tax Refund Estimator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian Tax Refund Estimator 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Enter your income, PAYG tax withheld, and deductions to instantly estimate your tax refund or tax bill for the 2025–26 financial year. Uses current ATO tax rates, LITO offset, and Medicare levy.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <TaxRefundCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. It does not account for all offsets, levies, or individual circumstances (e.g., HECS repayments, private health insurance rebate, SAPTO, foreign income). Consult a qualified tax professional or registered tax agent for advice specific to your situation. See{" "}
        <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">
          ATO — Your tax return
        </a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How Australian Income Tax Works in 2025–26</h2>
        <p>
          Australia uses a progressive income tax system for resident individuals. The more you earn, the higher the rate applied to each additional dollar. For 2025–26, the tax-free threshold is $18,200 — no income tax is payable on the first $18,200 of taxable income. Beyond that, rates escalate in brackets up to a top marginal rate of 45% for income exceeding $180,000.
        </p>
        <p>
          The 2025–26 resident individual tax rates (before offsets) are:
        </p>
        <table>
          <thead>
            <tr><th>Taxable Income</th><th>Tax on This Income</th></tr>
          </thead>
          <tbody>
            <tr><td>$0 – $18,200</td><td>Nil</td></tr>
            <tr><td>$18,201 – $45,000</td><td>19c for each $1 over $18,200</td></tr>
            <tr><td>$45,001 – $120,000</td><td>$5,092 + 32.5c for each $1 over $45,000</td></tr>
            <tr><td>$120,001 – $180,000</td><td>$29,467 + 37c for each $1 over $120,000</td></tr>
            <tr><td>Over $180,000</td><td>$51,667 + 45c for each $1 over $180,000</td></tr>
          </tbody>
        </table>
        <p>
          These rates reflect the Stage 3 tax cuts that took effect from 1 July 2024 (the 2024–25 year) and continue into 2025–26. The key changes from prior years were the reduction of the 32.5% rate and expansion of the 19% bracket, benefiting mid-income earners.
        </p>

        <h2>The Low Income Tax Offset (LITO)</h2>
        <p>
          The Low Income Tax Offset (LITO) is a tax offset that reduces the amount of tax payable by low-to-middle income earners. For 2025–26, the maximum LITO is <strong>$700</strong>, available to those with taxable incomes up to $37,500. The offset phases out:
        </p>
        <ul>
          <li>Full offset of $700 for taxable income up to $37,500</li>
          <li>Reduces by 5 cents per dollar for income between $37,501 and $45,000</li>
          <li>Reduces by 1.5 cents per dollar for income between $45,001 and $66,667</li>
          <li>No offset for income above $66,667</li>
        </ul>
        <p>
          The LITO is applied automatically — you do not need to claim it. Combined with the tax-free threshold, the effective tax-free income for most residents is $21,884 (when LITO fully offsets the tax on income between $18,200 and $21,884).
        </p>

        <h2>Medicare Levy</h2>
        <p>
          The Medicare levy is a 2% charge on taxable income that funds Australia&apos;s public health system. Most Australian residents pay the full 2% Medicare levy. Exemptions apply to low-income earners (full exemption up to a shade-in threshold of approximately $26,000 for singles; partial reduction between $26,000 and $32,500), foreign nationals, and certain other categories.
        </p>
        <p>
          An additional Medicare Levy Surcharge (MLS) of 1–1.5% applies to higher-income earners who do not hold an appropriate private hospital insurance policy. The MLS applies to income above $93,000 (singles) or $186,000 (families) for 2025–26. Our estimator does not include the MLS — if you are above these thresholds and do not hold private hospital cover, add 1–1.5% to your estimate.
        </p>

        <h2>PAYG Withholding and Why Refunds Occur</h2>
        <p>
          Pay As You Go (PAYG) withholding is the mechanism by which your employer deducts tax from each pay and remits it to the ATO on your behalf. At the end of the year, the ATO compares the tax withheld with your actual tax liability (based on your lodged tax return). If more was withheld than you owe, you receive a refund. If less was withheld, you pay the difference.
        </p>
        <p>
          Common reasons for a refund include:
        </p>
        <ul>
          <li>Work-related deductions (WFH, vehicle, tools, uniform) that reduce your taxable income below what the employer assumed</li>
          <li>Investment deductions (negative gearing losses from rental property) — see our <Link href="/calculators/negative-gearing-calculator" className="text-orange-500 underline">Negative Gearing Calculator</Link></li>
          <li>Charitable donations to DGRs</li>
          <li>Changing employment during the year and being over-withheld at one job</li>
          <li>Working part of the year only (the withholding tables assume you earn the same each period all year)</li>
        </ul>
        <p>
          Common reasons for a tax bill include: working multiple jobs (especially if you claimed the tax-free threshold at both), under-declaring income to your employer, significant investment income (interest, dividends, capital gains) not subject to withholding, or under-withholding due to incorrect TFN declaration.
        </p>

        <h2>Maximising Your Tax Refund Legally</h2>
        <p>
          The most reliable way to increase your tax refund is to ensure you claim all legitimate deductions. Key areas often missed:
        </p>
        <ul>
          <li><strong>Working from home:</strong> Use our <Link href="/calculators/work-from-home-tax-calculator" className="text-orange-500 underline">WFH Tax Calculator</Link> to estimate your 70c/hour deduction. Full-time remote workers can claim over $1,000.</li>
          <li><strong>Vehicle expenses:</strong> If you use your car for work (not ordinary commuting), you can claim using the cents per kilometre method (up to 5,000 km at 88c/km for 2025–26) or logbook method.</li>
          <li><strong>Work-related self-education:</strong> Courses, seminars, and textbooks related to your current role are deductible if they maintain or improve your current skills (not for a new career).</li>
          <li><strong>Union fees and professional subscriptions:</strong> Fully deductible if related to your income-earning activities.</li>
          <li><strong>Salary sacrifice:</strong> Contributing more to super via salary sacrifice reduces your taxable income. Use our <Link href="/calculators/salary-sacrifice-calculator" className="text-orange-500 underline">Salary Sacrifice Calculator</Link> to model the impact.</li>
        </ul>
        <p>
          For authoritative guidance on what you can and cannot deduct, refer to the{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return" target="_blank" rel="noopener noreferrer">
            ATO&apos;s tax return guide
          </a>.
        </p>

        <h2>Lodging Your Tax Return</h2>
        <p>
          Australians can lodge their tax return via:
        </p>
        <ul>
          <li><strong>myTax (myGov):</strong> Free, online, available from late July each year when your income statement is finalised. Suitable for most straightforward returns.</li>
          <li><strong>Registered tax agent:</strong> Professional preparation and lodgement — often extends the lodgement deadline (sometimes to May of the following year). Tax agent fees are deductible in the following year.</li>
          <li><strong>Paper lodgement:</strong> Still available but significantly slower for refunds. Not recommended for most taxpayers.</li>
        </ul>
        <p>
          The standard lodgement deadline is 31 October. If you use a registered tax agent, you generally have until 15 May or later of the following calendar year, depending on your circumstances.
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
