import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import AustralianIncomeTaxCalc from "./AustralianIncomeTaxCalc";

export const metadata: Metadata = {
  title: "Australian Income Tax Calculator 2025–26 | calcfuel.com",
  description: "Free Australian income tax calculator for 2025–26. Calculate your income tax, Medicare levy, LITO offset, take-home pay, and effective tax rate instantly. Based on ATO rates.",
};

const relatedTools = [
  { title: "Break-Even Calculator", slug: "break-even-calculator", description: "Find the revenue you need to cover all your costs." },
  { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Calculate gross profit margin from revenue and COGS." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure return on your marketing investment." },
  { title: "Customer Acquisition Cost Calculator", slug: "customer-acquisition-cost-calculator", description: "Calculate how much you spend to acquire each new customer." },
];

const faqs = [
  {
    question: "What are the Australian income tax rates for 2025–26?",
    answer: "For Australian residents in 2025–26: $0–$18,200 = nil; $18,201–$45,000 = 19c per $1 over $18,200; $45,001–$120,000 = $5,092 + 32.5c per $1 over $45,000; $120,001–$180,000 = $29,467 + 37c per $1 over $120,000; $180,001+ = $51,667 + 45c per $1 over $180,000. These are the Stage 3 tax cuts rates that came into effect on 1 July 2024.",
  },
  {
    question: "What is the tax-free threshold in Australia?",
    answer: "The tax-free threshold for Australian residents is $18,200. You do not pay income tax on the first $18,200 of your taxable income. If you earn under $18,200 per year, your income tax is nil (though you may still owe Medicare levy if you earn above the Medicare levy low-income threshold of around $26,000).",
  },
  {
    question: "What is the Medicare levy?",
    answer: "The Medicare levy is an additional 2% of your taxable income, charged to fund the public healthcare system (Medicare). Australian residents generally pay the Medicare levy. You may be exempt if your income is below the low-income threshold (approximately $26,000 for singles in 2024–25). An additional Medicare levy surcharge of 1–1.5% applies if you earn over $93,000 and do not have private hospital cover.",
  },
  {
    question: "What is the Low Income Tax Offset (LITO)?",
    answer: "The Low Income Tax Offset (LITO) is a tax offset that reduces the income tax payable for Australian resident taxpayers on lower incomes. For 2025–26: the maximum offset is $700 for income up to $37,500; it phases out between $37,500 and $66,667. It cannot create a refund — it can only reduce tax to zero. The LITO reduces the effective tax-free threshold to around $21,884.",
  },
  {
    question: "How is tax calculated on a salary in Australia?",
    answer: "Australian income tax is calculated progressively — each income band is taxed at a different rate. You do not pay the top marginal rate on all your income; you only pay it on the income within that bracket. Add the Medicare levy (2% for residents above the low-income threshold) and deduct the LITO offset. The result is your total tax payable. Your employer withholds tax through PAYG (Pay As You Go) withholding throughout the year.",
  },
  {
    question: "Do non-residents pay different tax rates in Australia?",
    answer: "Yes. Non-residents for tax purposes do not have a tax-free threshold and pay a flat 32.5% on income up to $120,000, 37% from $120,001–$180,000, and 45% above $180,000. Non-residents do not pay the Medicare levy and are not eligible for the Low Income Tax Offset. Whether you are a resident for tax purposes depends on your circumstances — it is not the same as your visa status.",
  },
  {
    question: "What tax do working holiday makers pay in Australia?",
    answer: "Working holiday makers (holders of subclass 417 or 462 visas) are taxed at 15% on their first $45,000 of Australian income, then at ordinary non-resident rates above that. They are not eligible for the tax-free threshold or the LITO, and do not pay the Medicare levy.",
  },
];

const howToSteps = [
  { name: "Enter your gross income", text: "Enter your total annual salary or income before tax in Australian dollars." },
  { name: "Select your residency status", text: "Choose whether you are an Australian resident, non-resident, or working holiday maker. This determines which tax rates apply." },
  { name: "Review the tax breakdown", text: "The calculator shows your income tax, Medicare levy, LITO offset, total tax payable, and net take-home pay." },
  { name: "Check your effective rate", text: "See your effective tax rate (total tax ÷ gross income) and marginal tax rate (the rate on your next dollar of income)." },
];

export default function AustralianIncomeTaxPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian Income Tax Calculator 2025–26"
        description="Free Australian income tax calculator. Calculate income tax, Medicare levy, LITO, take-home pay, and effective tax rate for 2025–26."
        url="https://calcfuel.com/calculators/australian-income-tax-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Australian Income Tax Calculator", url: "https://calcfuel.com/calculators/australian-income-tax-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Australian Income Tax Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian Income Tax Calculator 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your Australian income tax, Medicare levy, Low Income Tax Offset (LITO), and net take-home pay for the 2025–26 tax year. Based on current ATO rates — instant results, no sign-up required.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <AustralianIncomeTaxCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Running a small business?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          Understanding your tax position is just one piece of the puzzle. If your marketing isn&apos;t generating enough taxable income to worry about, a <strong>$49 Marketing Audit</strong> could be the highest-ROI investment you make this year.
        </p>
        <a
          href="https://buy.stripe.com/aFa6oJgvX7O10YrdS2bsc02"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get a $49 Marketing Audit →
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>Australian Income Tax Explained</h2>
        <p>Australia uses a progressive tax system — the more you earn, the higher the rate you pay on the top portion of your income. Critically, you only pay each rate on income within that bracket, not on your entire salary. Understanding how your tax is calculated helps you plan your finances, negotiate your salary, and estimate after-tax returns on investments.</p>

        <h2>2025–26 Tax Rates for Australian Residents</h2>
        <p>The 2025–26 tax year rates reflect the Stage 3 tax cuts, which came into effect on 1 July 2024. These were a significant restructure compared to prior years.</p>
        <table>
          <thead>
            <tr><th>Taxable Income</th><th>Tax on This Income</th></tr>
          </thead>
          <tbody>
            <tr><td>$0 – $18,200</td><td>Nil</td></tr>
            <tr><td>$18,201 – $45,000</td><td>19c for each $1 over $18,200</td></tr>
            <tr><td>$45,001 – $120,000</td><td>$5,092 + 32.5c for each $1 over $45,000</td></tr>
            <tr><td>$120,001 – $180,000</td><td>$29,467 + 37c for each $1 over $120,000</td></tr>
            <tr><td>$180,001+</td><td>$51,667 + 45c for each $1 over $180,000</td></tr>
          </tbody>
        </table>
        <p>These rates do not include the Medicare levy or tax offsets.</p>

        <h2>Medicare Levy</h2>
        <p>Most Australian residents pay the Medicare levy on top of income tax. The standard rate is <strong>2% of taxable income</strong>. There is a low-income threshold — for the 2024–25 year, individuals with taxable income below approximately $26,000 are exempt. A reduced levy applies between the threshold and approximately $32,500.</p>
        <p>The Medicare levy surcharge (MLS) — a separate 1%–1.5% charge — applies to higher-income earners who do not hold an appropriate level of private hospital cover. The MLS applies at incomes above $93,000 (singles) or $186,000 (families). This calculator does not include MLS — check with your insurer or tax agent if this applies to you.</p>

        <h2>Low Income Tax Offset (LITO)</h2>
        <p>The LITO reduces the income tax payable for Australian residents on lower to middle incomes. For 2025–26:</p>
        <ul>
          <li>Income up to $37,500: maximum offset of $700</li>
          <li>$37,501–$45,000: offset reduces by 5 cents per dollar above $37,500</li>
          <li>$45,001–$66,667: offset reduces by 1.5 cents per dollar above $45,000</li>
          <li>Over $66,667: no offset</li>
        </ul>
        <p>The LITO is applied against tax payable — it cannot generate a refund. Combined with the tax-free threshold, the LITO effectively raises the no-tax threshold to approximately $21,884 for residents.</p>

        <h2>How to Calculate Your Take-Home Pay</h2>
        <ol>
          <li>Calculate gross income tax using the bracket rates above</li>
          <li>Deduct the LITO (if applicable)</li>
          <li>Add the Medicare levy (2% of income, minus any low-income reduction)</li>
          <li>Total tax = income tax after LITO + Medicare levy</li>
          <li>Net take-home pay = gross income − total tax</li>
        </ol>
        <p><strong>Example — $85,000 salary, Australian resident:</strong></p>
        <ul>
          <li>Income tax: $5,092 + ($85,000 − $45,000) × 32.5% = $5,092 + $13,000 = $18,092</li>
          <li>LITO: $0 (income exceeds $66,667 phase-out)</li>
          <li>Medicare levy: $85,000 × 2% = $1,700</li>
          <li>Total tax: $18,092 + $1,700 = <strong>$19,792</strong></li>
          <li>Net take-home: $85,000 − $19,792 = <strong>$65,208</strong> ($5,434/month)</li>
          <li>Effective tax rate: $19,792 ÷ $85,000 = <strong>23.3%</strong></li>
        </ul>

        <h2>Marginal Rate vs. Effective Rate</h2>
        <p>Your <strong>marginal rate</strong> is the rate applied to your next dollar of income — it tells you how much of any pay rise you actually keep. At $85,000, the marginal rate is 34.5% (32.5% income tax + 2% Medicare levy).</p>
        <p>Your <strong>effective rate</strong> is your total tax as a percentage of gross income — it reflects your actual average tax burden. Someone earning $85,000 pays an effective rate of about 23.3%, even though their marginal rate is 34.5%. This distinction matters for decisions like salary sacrifice into superannuation.</p>

        <h2>Salary Sacrifice and Superannuation</h2>
        <p>Concessional (pre-tax) superannuation contributions are taxed at 15% within the fund — below most workers&apos; marginal income tax rate. Salary-sacrificing the difference between your marginal rate and 15% can meaningfully reduce your tax bill. The concessional contributions cap for 2025–26 is $30,000 (including employer contributions). Consult a financial adviser before adjusting your super strategy.</p>
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
