import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import SalarySacrificeCalc from "./SalarySacrificeCalc";

export const metadata: Metadata = {
  title: "Salary Sacrifice Calculator Australia 2025–26 | CalcFuel",
  description:
    "Free Australian salary sacrifice calculator. See how much tax you save by sacrificing salary to super. Instant results with before/after comparison for 2025–26.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance at retirement." },
  { title: "HECS-HELP Repayment Calculator", slug: "hecs-help-calculator", description: "Estimate your annual HECS/HELP repayment and years to pay off debt." },
  { title: "GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any price instantly." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross, net, and operating profit margins." },
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the revenue needed to cover all your costs." },
];

const faqs = [
  {
    question: "What is salary sacrifice in Australia?",
    answer:
      "Salary sacrifice (also called salary packaging) is an arrangement where you agree with your employer to forgo part of your gross salary in exchange for non-cash benefits or superannuation contributions. The sacrificed amount is paid before income tax is calculated, reducing your taxable income and therefore your income tax bill. The most common use is additional concessional super contributions, but salary sacrifice can also cover novated car leases, laptops, and other approved fringe benefits.",
  },
  {
    question: "How much tax do I save with salary sacrifice into super?",
    answer:
      "Your tax saving equals the difference between your marginal income tax rate and the 15% concessional tax rate in the super fund. For example, if you earn $90,000 (marginal rate ~34.5% including Medicare levy), each $1 you sacrifice into super saves approximately 34.5¢ − 15¢ = 19.5¢ in tax. On a $10,000 salary sacrifice contribution, you would save approximately $1,950 in net tax. Use the calculator above to see your exact saving.",
  },
  {
    question: "What is the salary sacrifice super contribution cap for 2025–26?",
    answer:
      "The total concessional contributions cap for 2025–26 is $30,000 per year. This includes your employer's Superannuation Guarantee (SG) contributions (currently 11.5% of ordinary time earnings) plus any salary sacrifice contributions you make. To find your remaining cap, subtract your employer SG contributions from $30,000. Contributions above the cap are included in your assessable income and taxed at your marginal rate (with a 15% tax offset to avoid double-counting). See the ATO website (ato.gov.au) for the latest cap amounts.",
  },
  {
    question: "Does salary sacrifice reduce my take-home pay?",
    answer:
      "Yes — salary sacrifice reduces your taxable income, so your take-home pay decreases by less than the sacrifice amount. For example, sacrificing $10,000 at a 34.5% marginal rate reduces your take-home pay by approximately $6,550 (because you save $3,450 in tax). The remaining $10,000 goes into your super fund, where it is taxed at 15%, leaving $8,500 in your fund. So you give up $6,550 in take-home pay and gain $8,500 in super — a net benefit of $1,950.",
  },
  {
    question: "What is Division 293 tax?",
    answer:
      "Division 293 tax is an additional 15% tax on concessional super contributions for high-income earners — those with income (including super contributions) over $250,000 per year. It effectively means high earners pay 30% tax on concessional contributions instead of 15%, reducing — but not eliminating — the benefit of salary sacrifice into super. The ATO assesses Division 293 tax after you lodge your tax return.",
  },
  {
    question: "Can I salary sacrifice a novated car lease in Australia?",
    answer:
      "Yes. A novated lease is a three-way arrangement between you, your employer, and a finance company, where lease and running costs are paid from your pre-tax salary. Under the Electric Car Discount Act, eligible battery electric vehicles under the luxury car tax threshold ($89,332 for 2024–25) are exempt from fringe benefits tax (FBT), making EV novated leases especially tax-effective. For petrol vehicles, FBT applies, which partially offsets the pre-tax benefit. Compare the total cost carefully before committing.",
  },
  {
    question: "Does salary sacrifice affect my employer super contributions?",
    answer:
      "From 1 January 2020, employers must calculate Superannuation Guarantee contributions based on your ordinary time earnings before salary sacrifice (under the 'ordinary time earnings' rules), not on your reduced salary. This means salary sacrifice should not reduce your employer SG contributions. However, always confirm this with your employer, as some older or incorrectly structured arrangements may differ.",
  },
  {
    question: "Does salary sacrifice affect my HECS-HELP repayment?",
    answer:
      "Yes. HECS-HELP repayment is based on your 'repayment income', which includes your taxable income plus reportable fringe benefits and reportable employer super contributions. Salary sacrifice into super reduces your taxable income, which reduces your annual HECS repayment. However, the ATO adds your 'reportable employer super contributions' (RESC — the amount above the SG minimum) back into your repayment income, so the HECS saving may be smaller than expected. Salary sacrifice fringe benefits (e.g., novated leases) work differently.",
  },
];

const howToSteps = [
  { name: "Enter your gross annual salary", text: "Type your total gross salary before any deductions, in Australian dollars. Do not include employer super contributions." },
  { name: "Enter your salary sacrifice amount", text: "Enter how much you want to sacrifice as a dollar amount or a percentage of your salary. Switch between modes using the $ / % selector." },
  { name: "Review your tax saving", text: "The calculator shows your tax saved, the after-tax reduction in take-home pay, and the net super contribution after the 15% concessional tax." },
  { name: "Compare before vs. after", text: "Use the side-by-side comparison to see your tax liability and take-home pay with and without salary sacrifice." },
];

export default function SalarySacrificeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Salary Sacrifice Calculator Australia 2025–26"
        description="Free Australian salary sacrifice calculator. Calculate your tax saving and super benefit from salary sacrifice contributions."
        url="https://calcfuel.com/calculators/salary-sacrifice-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Salary Sacrifice Calculator", url: "https://calcfuel.com/calculators/salary-sacrifice-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Salary Sacrifice Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Salary Sacrifice Calculator Australia 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        See exactly how much tax you save by sacrificing salary into superannuation. Enter your gross salary and sacrifice amount for an instant before-and-after comparison — based on current ATO rates.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <SalarySacrificeCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. Tax outcomes depend on your individual circumstances including other income, deductions, offsets, and fringe benefits. Consult a registered tax agent or financial adviser for advice specific to your situation. See{" "}
        <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/salary-sacrificing-into-super" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ATO — Salary sacrificing into super</a>{" "}
        for official guidance.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Is Salary Sacrifice in Australia?</h2>
        <p>
          Salary sacrifice (also called salary packaging) is a pre-tax arrangement where you agree with your employer to receive less take-home pay in exchange for non-cash benefits or additional superannuation contributions. Because the sacrificed amount is deducted before income tax is calculated, you pay less income tax — and potentially less Medicare levy too.
        </p>
        <p>
          The most popular form of salary sacrifice in Australia is voluntary concessional super contributions. Instead of earning money, paying income tax at your marginal rate, and then contributing to super from after-tax dollars, you contribute from pre-tax salary. The super fund taxes the contribution at just 15% (the concessional tax rate) — well below most workers&apos; marginal income tax rates.
        </p>

        <h2>How Salary Sacrifice into Super Works</h2>
        <p>
          When you set up a salary sacrifice arrangement with your employer:
        </p>
        <ol>
          <li>Your gross salary is reduced by the sacrifice amount before PAYG withholding is calculated</li>
          <li>Your employer pays the sacrificed amount directly to your nominated super fund</li>
          <li>The super fund taxes the contribution at 15% (the concessional tax rate)</li>
          <li>The remaining 85% is invested in your super account</li>
        </ol>
        <p>
          The result: you pay less income tax, and your super balance grows faster. For most workers earning above $45,000, the marginal income tax rate (32.5%–45%) significantly exceeds the 15% super tax — making salary sacrifice a compelling strategy.
        </p>

        <h2>2025–26 Tax Rates and Salary Sacrifice Benefit</h2>
        <p>
          The benefit of salary sacrifice depends on the difference between your marginal income tax rate and the 15% concessional super tax. Here are the approximate net savings per $1 sacrificed at each tax bracket (2025–26 ATO rates, including 2% Medicare levy):
        </p>
        <table>
          <thead>
            <tr>
              <th>Income Range</th>
              <th>Marginal Rate (inc. Medicare)</th>
              <th>Super Tax Rate</th>
              <th>Net Saving per $1 Sacrificed</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>$18,201 – $45,000</td><td>21%</td><td>15%</td><td>~6¢</td></tr>
            <tr><td>$45,001 – $120,000</td><td>34.5%</td><td>15%</td><td>~19.5¢</td></tr>
            <tr><td>$120,001 – $180,000</td><td>39%</td><td>15%</td><td>~24¢</td></tr>
            <tr><td>$180,001+</td><td>47%</td><td>15%</td><td>~32¢</td></tr>
          </tbody>
        </table>
        <p>
          Source:{" "}
          <a href="https://www.ato.gov.au/tax-rates-and-codes/tax-rates-for-individuals" target="_blank" rel="noopener noreferrer">ATO — Tax rates for individuals 2025–26</a>. The low-income earner saving is modest; the benefit scales significantly with income.
        </p>

        <h2>Concessional Contributions Cap</h2>
        <p>
          The concessional contributions cap for 2025–26 is <strong>$30,000 per year</strong>, as set by the ATO. This cap includes:
        </p>
        <ul>
          <li>Your employer&apos;s mandatory Superannuation Guarantee (SG) contributions (11.5% in 2025–26)</li>
          <li>Any voluntary salary sacrifice contributions you make</li>
          <li>Any personal deductible contributions you claim under section 290-180</li>
        </ul>
        <p>
          If your employer pays SG on a $90,000 salary (11.5% × $90,000 = $10,350), you have approximately $19,650 of remaining concessional cap to use via salary sacrifice. Contributions above the cap are included in your assessable income and taxed at your marginal rate — minus a 15% tax offset to avoid double taxation. See{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/before-tax-contributions/concessional-contributions-cap" target="_blank" rel="noopener noreferrer">ATO — Concessional contributions cap</a>.
        </p>

        <h2>Carry-Forward Concessional Contributions</h2>
        <p>
          Since 1 July 2018, if your total super balance is below $500,000, you can carry forward unused concessional cap space from the previous five years. This allows you to make larger concessional contributions in high-income years (for example, when you sell a business or receive a bonus) and maximise your super tax benefit in a single year. Check your available carry-forward balance in your myGov account or via your super fund.
        </p>

        <h2>Salary Sacrifice vs. Personal Deductible Contributions</h2>
        <p>
          If your employer does not offer a salary sacrifice arrangement, you can achieve a similar outcome through a <strong>personal deductible contribution</strong> (also called an after-tax contribution claimed as a deduction). You contribute from your bank account, notify your super fund using a Notice of Intent to Claim a Deduction form (NAT 71121), and then claim the contribution as a tax deduction on your income tax return. The contribution is then treated as a concessional contribution and taxed at 15% in the fund.
        </p>
        <p>
          The tax saving is identical — both strategies use the same concessional cap and both attract 15% super tax. Salary sacrifice is simpler because it reduces PAYG withholding throughout the year (fewer tax surprises at return time), while personal deductible contributions improve cash flow during the year but require you to fund the contribution upfront.
        </p>

        <h2>Salary Sacrifice for Fringe Benefits</h2>
        <p>
          Beyond super, salary sacrifice can also cover:
        </p>
        <ul>
          <li><strong>Novated car leases:</strong> A three-way arrangement between you, your employer, and a finance company. Running costs (fuel, registration, insurance, servicing) can also be included. Battery electric vehicles under the luxury car tax threshold are currently FBT-exempt — making EV novated leases highly tax-effective.</li>
          <li><strong>Portable electronic devices:</strong> Laptops, tablets, and mobile phones used primarily for work are exempt from FBT.</li>
          <li><strong>Work-related expenses:</strong> Some employers can salary package self-education expenses, work uniforms, and other approved items.</li>
          <li><strong>Public hospital and public sector FBT exemptions:</strong> Some public hospitals, charities, and public benevolent institutions (PBIs) have a $9,010 or $17,000 FBT exemption cap, making salary packaging of living expenses and mortgage payments tax-effective for employees in those sectors.</li>
        </ul>

        <h2>Impact on Other Entitlements</h2>
        <p>
          Salary sacrifice reduces your reportable income for several purposes. Check the implications before setting up an arrangement:
        </p>
        <ul>
          <li><strong>HECS-HELP repayments:</strong> Repayments are based on repayment income, which adds reportable employer super contributions (RESC) back to your taxable income — partially offsetting the reduction from super sacrifice.</li>
          <li><strong>Child care subsidy and family payments:</strong> These are income-tested using family income, which may include reportable super contributions or fringe benefits. Salary sacrifice could affect your entitlements.</li>
          <li><strong>Centrelink payments:</strong> If you receive any income-tested benefits, sacrificing salary can change your assessed income.</li>
          <li><strong>Borrowing capacity:</strong> Lenders assess serviceability on gross income — check with your broker whether salary sacrifice affects your home loan application.</li>
        </ul>

        <h2>How to Set Up Salary Sacrifice</h2>
        <ol>
          <li>Check with your employer or HR team that salary sacrifice arrangements are available and that they offer the specific benefit you want (super contributions, novated lease, etc.)</li>
          <li>Confirm how much concessional cap space you have remaining (gross salary × 11.5% employer SG already uses part of the $30,000 cap)</li>
          <li>Complete your employer&apos;s salary sacrifice form and nominate the amount or percentage</li>
          <li>Review the impact on your PAYG withholding — your employer should adjust your tax withheld</li>
          <li>Confirm the arrangement in writing before it takes effect</li>
        </ol>
        <p>
          For personalised guidance, see the{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/how-to-save-more-in-your-super/salary-sacrificing-into-super" target="_blank" rel="noopener noreferrer">ATO salary sacrifice guide</a>{" "}
          or consult a registered tax agent.
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
