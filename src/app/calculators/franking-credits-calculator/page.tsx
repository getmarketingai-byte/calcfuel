import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import FrankingCreditsCalc from "./FrankingCreditsCalc";

export const metadata: Metadata = {
  title: "Franking Credits Calculator Australia 2025–26 | CalcFuel",
  description:
    "Calculate Australian franking credits on dividends. Find your grossed-up dividend, franking credit amount, and net tax position based on your marginal rate.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay for 2025–26." },
  { title: "Capital Gains Tax Calculator", slug: "capital-gains-tax-calculator", description: "Estimate capital gains tax on shares or property sales for Australian residents." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Model the benefit of salary sacrificing into super and how it affects your tax." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance at retirement based on contributions and growth." },
  { title: "GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any amount instantly." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "Project investment growth using compound interest over time." },
];

const faqs = [
  {
    question: "What are franking credits?",
    answer: "Franking credits (also called imputation credits) are a tax credit attached to dividends paid by Australian companies. When a company earns profit, it pays corporate income tax on that profit. When it then distributes those after-tax profits as dividends, it attaches franking credits representing the tax already paid at the company level. The shareholder can then use these credits to offset their personal income tax on the dividend, preventing the same profit from being taxed twice — once in the hands of the company and again in the hands of the investor.",
  },
  {
    question: "Who can claim franking credits in Australia?",
    answer: "Australian resident individuals, trusts, partnerships, and complying superannuation funds can claim franking credits. Foreign investors generally cannot claim Australian franking credits (with limited exceptions under tax treaties). To claim credits, you must satisfy the 45-day holding rule: you must have held the shares at risk for at least 45 days (90 days for preference shares) around the ex-dividend date, not counting the day of acquisition or disposal. Small shareholders with a total franking credit amount of $5,000 or less in a year are exempt from the holding rule.",
  },
  {
    question: "Are franking credits refundable?",
    answer: "Yes — since 2000, franking credits have been fully refundable in Australia. This means that if your franking credits exceed your total income tax liability, you receive the excess as a cash refund from the ATO. This is particularly valuable for low-income investors, retirees, and superannuation funds in pension phase (which have a 0% tax rate and therefore receive the full franking credit as a cash refund). The refundability of franking credits was the subject of political debate in 2019, when the Opposition proposed to restrict refundability — but this policy was not implemented following the 2019 federal election.",
  },
  {
    question: "What corporate tax rate applies for calculating franking credits?",
    answer: "The franking credit attached to a dividend is calculated based on the company's tax rate. Large companies (generally those with aggregated turnover of $50 million or more) pay a 30% corporate tax rate and can attach a maximum 30% franking credit. Small companies (base rate entities with turnover below $50 million that meet other conditions) pay a 25% corporate tax rate and can attach a maximum 25% franking credit. The franking credit formula is: franking credit = (cash dividend ÷ (1 − corporate tax rate)) × corporate tax rate × (franking percentage ÷ 100).",
  },
  {
    question: "Do ETFs and managed funds pass on franking credits?",
    answer: "Yes. Australian equity ETFs and managed funds that hold ASX-listed shares pass through franking credits attached to the underlying dividends they receive. The fund distributes both the cash income and the associated franking credits to unit holders, who include both in their tax return. The distribution statement from the fund (or ETF provider) will itemise the cash distribution and the attached franking credits for each distribution period. For internationally focused funds that hold foreign shares, franking credits will generally be minimal or zero, as foreign dividends are not subject to the Australian imputation system.",
  },
  {
    question: "What is dividend imputation and how does it reduce double taxation?",
    answer: "The Australian dividend imputation system was introduced in 1987 to eliminate double taxation of corporate profits. Before imputation, company profits were taxed at the corporate rate, and then dividends paid from those profits were taxed again in the hands of shareholders at their marginal rate. The imputation system attaches a tax credit (franking credit) to dividends, representing the corporate tax already paid. When a shareholder receives a fully franked dividend from a 30%-tax company, they gross up the dividend by the credit, include the full amount as income, but offset the credit against their tax liability — resulting in a net tax rate equal to their marginal rate (rather than corporate rate + marginal rate).",
  },
];

const howToSteps = [
  { name: "Enter the cash dividend amount", text: "Enter the actual cash dividend you received — this is the amount deposited into your account, before adding the franking credit." },
  { name: "Set the franking percentage", text: "Enter the franking percentage shown on your dividend statement. Most large Australian companies pay fully franked (100%) dividends." },
  { name: "Select the company tax rate", text: "Choose 30% for large companies or 25% for base rate entities (small companies). Check the dividend statement if unsure." },
  { name: "Select your marginal rate", text: "Choose your marginal tax rate including the 2% Medicare levy. The calculator shows your net tax position and a comparison across all brackets." },
];

export default function FrankingCreditsCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Franking Credits Calculator Australia 2025–26"
        description="Calculate Australian franking credits on dividends, grossed-up dividend amounts, and net tax position based on your marginal rate."
        url="https://calcfuel.com/calculators/franking-credits-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Franking Credits Calculator", url: "https://calcfuel.com/calculators/franking-credits-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Franking Credits Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Franking Credits Calculator Australia 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate the franking credit on any Australian dividend, the grossed-up dividend amount, and your net tax position based on your marginal tax rate. Covers fully franked and partially franked dividends from large and small companies.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <FrankingCreditsCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. Franking credit calculations depend on the company&apos;s tax rate, your personal tax circumstances, whether you satisfy the holding rule, and whether offsets such as LITO apply. Consult a qualified tax professional for advice specific to your situation. See the{" "}
        <a
          href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/dividends-and-deductions/franking-credits"
          className="text-orange-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          ATO — Franking credits
        </a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Are Franking Credits?</h2>
        <p>
          Franking credits are a uniquely Australian tax mechanism that forms part of the <strong>dividend imputation system</strong> — first introduced in 1987 by then-Treasurer Paul Keating. The system was designed to eliminate the double taxation of corporate profits: once when earned by the company, and again when distributed to shareholders.
        </p>
        <p>
          When an Australian company pays corporate tax on its profits and then distributes those profits as dividends, it attaches a tax credit (the franking credit) representing the tax already paid. Shareholders receiving franked dividends include both the cash dividend and the franking credit in their assessable income (the &quot;grossed-up&quot; dividend), but then offset the credit against their own income tax liability.
        </p>
        <p>
          The practical result is that shareholders are taxed on the dividend at their marginal rate — no more, no less. If a shareholder&apos;s marginal rate is lower than the corporate rate, they receive a refund of the excess. If their marginal rate is higher, they pay additional tax on the top-up.
        </p>

        <h2>The Franking Credit Formula</h2>
        <p>
          The formula to calculate the franking credit on a dividend is:
        </p>
        <p>
          <strong>Franking credit = (Cash dividend ÷ (1 − corporate tax rate)) × corporate tax rate × (franking percentage ÷ 100)</strong>
        </p>
        <p>
          For a fully franked dividend of $700 from a large company (30% tax rate):
        </p>
        <ul>
          <li>Grossed-up dividend = $700 ÷ 0.70 = $1,000</li>
          <li>Franking credit = $1,000 × 0.30 = $300</li>
          <li>Total assessable income = $700 + $300 = $1,000</li>
        </ul>
        <p>
          The $300 franking credit is then offset against the investor&apos;s tax liability on the $1,000 grossed-up dividend. At a 34.5% marginal rate (including Medicare), the tax on $1,000 is $345, less the $300 credit = $45 additional tax. At 21% (19% + Medicare), the tax is $210, less the $300 credit = <strong>$90 refund</strong>.
        </p>

        <h2>Fully Franked vs. Partially Franked vs. Unfranked Dividends</h2>
        <p>
          The degree of franking reflects how much of the company&apos;s profit pool has already had corporate tax paid on it:
        </p>
        <ul>
          <li><strong>Fully franked (100%):</strong> All of the dividend has been funded from company profits on which the full corporate tax rate has been paid. The shareholder receives the maximum possible franking credit. Most large ASX companies (banks, miners, retailers) pay fully franked dividends.</li>
          <li><strong>Partially franked:</strong> Only part of the dividend comes from taxed profits. This might occur if the company has some tax losses, some foreign-sourced income, or has paid tax at a reduced rate on part of its income. The franking credit is proportionally reduced.</li>
          <li><strong>Unfranked (0%):</strong> No corporate tax has been paid on the profits distributed, so no franking credit is attached. Unfranked dividends typically arise from foreign-sourced income, tax-exempt entities, or companies with tax losses. The full dividend is taxable income with no offsetting credit.</li>
        </ul>

        <h2>Franking Credits for Superannuation Funds</h2>
        <p>
          Australia&apos;s superannuation system interacts particularly well with franking credits. Superannuation funds in the accumulation phase pay a 15% tax rate on investment income. When they receive a fully franked dividend from a 30%-rate company, the franking credit exceeds the fund&apos;s tax liability on that income — the excess is refunded by the ATO.
        </p>
        <p>
          For funds in <strong>pension phase</strong> (a Self-Managed Super Fund or similar where members are drawing a pension), the tax rate is 0%. This means all franking credits received are fully refunded by the ATO in cash. For a retiree with an SMSF drawing a pension and holding a concentrated portfolio of high-yielding Australian shares, franking credit refunds can represent tens of thousands of dollars per year in cash receipts.
        </p>
        <p>
          This is why the proposed removal of refundable franking credits in 2019 caused such significant concern among retired investors — the change would have effectively increased the tax burden on self-funded retirees substantially.
        </p>

        <h2>The 45-Day Holding Rule</h2>
        <p>
          To prevent investors from buying shares shortly before a dividend to capture the franking credit and then selling immediately afterwards, the ATO imposes a <strong>45-day holding rule</strong>. To be eligible to claim the franking credit, you must have held the shares <em>at risk</em> for at least 45 continuous days (90 days for certain preference shares) in the period beginning the day after acquisition and ending 45 days after the ex-dividend date.
        </p>
        <p>
          &quot;At risk&quot; means you have not hedged or reduced your economic exposure to the shares using options, futures, or similar instruments. The rule does not count the day of acquisition or the day of disposal.
        </p>
        <p>
          An exception applies to small investors: if your total franking credits from all sources in a year are $5,000 or less, the 45-day rule does not apply. This exception covers most ordinary retail dividend investors who hold shares passively.
        </p>

        <h2>Franking Credits and Your Tax Return</h2>
        <p>
          When lodging your individual tax return, you must include the grossed-up dividend (cash + franking credit) in your assessable income and claim the franking credit as a tax offset. Your share registry or broker will issue a <strong>dividend statement</strong> for each payment received, showing the cash dividend amount, the franking credit, and the franking percentage.
        </p>
        <p>
          If you use myTax via myGov, most dividend information for listed shares is pre-filled from ATO data provided by registries. However, you should still verify the figures against your own records, as timing differences and unlisted investments will not be pre-filled.
        </p>
        <p>
          For a complete picture of your investment tax position, use our{" "}
          <Link href="/calculators/australian-income-tax-calculator" className="text-orange-500 underline">Australian Income Tax Calculator</Link> to model your overall tax liability, and our{" "}
          <Link href="/calculators/capital-gains-tax-calculator" className="text-orange-500 underline">Capital Gains Tax Calculator</Link> if you also have share or property gains to report. For guidance on superannuation contributions and their tax advantages, see our{" "}
          <Link href="/calculators/superannuation-calculator" className="text-orange-500 underline">Superannuation Calculator</Link>. The ATO&apos;s authoritative guide on{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/dividends-and-deductions/franking-credits" target="_blank" rel="noopener noreferrer">franking credits</a>{" "}
          explains all rules in detail.
        </p>

        <h2>Strategies for Maximising Franking Credit Benefits</h2>
        <p>
          For investors in lower tax brackets or retirement, franking credits represent a significant source of after-tax income. Strategies to consider (with appropriate financial advice) include:
        </p>
        <ul>
          <li><strong>Holding through retirement:</strong> As your tax rate drops in retirement, the benefit from franking credits increases. A 0% tax rate in pension phase turns every franking credit into a cash refund.</li>
          <li><strong>Directing dividend income to lower-income family members:</strong> By holding Australian shares in the name of a lower-income spouse or beneficiary, franking credit refunds are larger. This requires genuine ownership and compliance with tax rules around income splitting.</li>
          <li><strong>Franking credit yield comparison:</strong> When comparing investment options, factor in the franking credit yield alongside the cash dividend yield. A 4% fully franked dividend from a 30%-rate company has a grossed-up yield of approximately 5.71% before personal tax — significantly higher than an unfranked 4% dividend.</li>
          <li><strong>SMSF in pension phase:</strong> This is the most tax-effective environment for Australian share dividend income — both the income and the franking credit refund are tax-free. However, running an SMSF involves compliance obligations and costs.</li>
        </ul>
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
