import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import FrankingCreditsCalc from "./FrankingCreditsCalc";

export const metadata: Metadata = {
  title: "Franking Credits Calculator Australia 2025–26 | Dividend Imputation",
  description:
    "Free Australian franking credits calculator. Calculate the franking credit on any dividend, your grossed-up income, tax offset, and whether you receive a refund. Updated for FY2025-26.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/franking-credits-calculator",
  },
  openGraph: {
    title: "Franking Credits Calculator Australia 2025–26 | Dividend Imputation",
    description:
      "Calculate franking credits, grossed-up dividends, and your net tax on Australian shares. Includes refund calculator for low-income investors.",
    url: "https://calcfuel.com/calculators/franking-credits-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "Capital Gains Tax Calculator",
    slug: "capital-gains-tax-calculator",
    description: "Estimate your CGT on shares, property, or other assets. Includes 50% CGT discount for assets held over 12 months.",
  },
  {
    title: "Tax Refund Estimator",
    slug: "tax-refund-estimator",
    description: "Estimate your total tax refund or bill for FY2025-26, including franking credits from dividends.",
  },
  {
    title: "Australian Income Tax Calculator",
    slug: "australian-income-tax-calculator",
    description: "Calculate your income tax, Medicare levy, and take-home pay for FY2025-26.",
  },
  {
    title: "Negative Gearing Calculator",
    slug: "negative-gearing-calculator",
    description: "Calculate tax savings and after-tax return on an investment property.",
  },
];

const faqs = [
  {
    question: "What is a franking credit?",
    answer:
      "A franking credit (also called an imputation credit) represents the tax an Australian company has already paid on its profits before distributing dividends. Australia's dividend imputation system aims to prevent double taxation: when a company pays corporate tax (30% for large companies, 25% for small companies) and then distributes dividends, shareholders receive a tax credit for the company tax already paid. When you include the grossed-up dividend in your tax return, you receive an offset for the franking credit, which reduces your personal tax liability. If your personal tax rate is lower than the company tax rate, you can receive the excess as a cash refund.",
  },
  {
    question: "How do I find the franking credit amount on my dividend statement?",
    answer:
      "Your annual dividend statement (or dividend advice) from the company or your share registry (Link Market Services, Computershare) will show: the cash dividend amount, the franking percentage (0%–100%), and the franking credit amount already calculated. For shares held via a broker, your annual tax statement will summarise all dividends received and the total franking credits for the financial year. These amounts are pre-filled in myTax if you use myGov to lodge, as companies report to the ATO via Single Touch Payroll and dividend reporting systems.",
  },
  {
    question: "Can I get a refund of franking credits even if I pay no tax?",
    answer:
      "Yes — this is one of the most important features of Australia's dividend imputation system. If your personal tax liability is zero (for example, your total taxable income is below $18,200) but you received fully franked dividends, you can claim the entire franking credit as a cash refund when you lodge your tax return. This particularly benefits retirees and low-income investors holding Australian shares in a self-managed super fund (SMSF) in pension phase, where the tax rate is 0% — the fund is entitled to a full refund of franking credits, which was a major policy debate in 2019.",
  },
  {
    question: "What is the difference between a fully franked and partly franked dividend?",
    answer:
      "A fully franked dividend (100% franked) has the maximum possible franking credit attached — meaning the company paid full corporate tax on all the profits distributed. A partly franked dividend has a smaller credit attached because some of the profit was earned in a lower-tax or tax-exempt jurisdiction, or the company had insufficient franking credits in its franking account. For example, a 50% franked dividend on a $1,000 cash payment from a large company means the franking credit is $1,000 × 50% × (30/70) = $214.29. An unfranked dividend has no credit attached and is taxed entirely at your marginal rate.",
  },
  {
    question: "How does franking affect my capital gains tax on shares?",
    answer:
      "Franking credits and capital gains tax are separate calculations, but both appear on your tax return. Franking credits reduce your tax on dividend income, while CGT applies when you sell shares at a profit. If you hold shares for more than 12 months before selling, you're entitled to a 50% CGT discount on any capital gain. You can use the CalcFuel Capital Gains Tax Calculator to estimate your CGT separately. At EOFY, some investors choose to realise capital losses before 30 June to offset capital gains from the same year, reducing their overall tax bill. This strategy doesn't directly affect franking credits, which are tied to dividend events rather than disposal events.",
  },
  {
    question: "Do I need to report franking credits in my tax return?",
    answer:
      "Yes. Franked dividends and their associated credits must be included in your individual tax return. The process is: (1) You add the cash dividend and the franking credit together to get the grossed-up dividend, which is your assessable income. (2) You then claim the franking credit as a tax offset against your income tax payable. If using myTax, this is largely automated — the ATO pre-fills dividend data from share registries and brokers. You should verify the pre-filled data against your own records, as not all providers report in real-time and some amounts may be missing or incorrect.",
  },
  {
    question: "How does franking work for SMSFs?",
    answer:
      "Self-managed super funds in accumulation phase pay 15% tax on investment income including dividends. Because the standard company tax rate (30%) exceeds the SMSF tax rate, SMSFs in accumulation phase typically receive a partial refund of excess franking credits. In pension phase, an SMSF pays 0% tax on investment income, making it entitled to a full refund of all franking credits — this is a significant advantage of holding Australian shares inside a pension-phase SMSF. Note: there were legislative proposals to limit this refund for SMSFs, but as of FY2025-26 the full refund remains available. Always confirm current rules with your SMSF auditor or adviser.",
  },
];

export default function FrankingCreditsPage() {
  return (
    <>
      <CalculatorJsonLd
        name="Franking Credits Calculator Australia"
        description="Calculate the franking credit on Australian dividends, your grossed-up income, and whether you receive a tax refund or owe additional tax."
        url="https://calcfuel.com/calculators/franking-credits-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Franking Credits Calculator", url: "https://calcfuel.com/calculators/franking-credits-calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/calculators" className="hover:text-orange-500">Calculators</Link>
          <span className="mx-2">/</span>
          <Link href="/calculators/financial" className="hover:text-orange-500">Financial</Link>
          <span className="mx-2">/</span>
          <span>Franking Credits Calculator</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Franking Credits Calculator Australia (FY2025–26)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          Calculate the franking credit on your dividend, your grossed-up income, and whether you receive a refund or owe additional tax.
        </p>
        <div className="inline-block bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium px-3 py-1 rounded-full mb-8">
          Updated for FY2025–26 — EOFY 30 June 2026
        </div>

        <FrankingCreditsCalc />

        <AdSenseUnit slot="6564431580" className="my-8" />

        <ProductCTASection />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Investor mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enter your cash dividend, the franking percentage (from your dividend statement), and your other taxable income. The calculator shows your grossed-up dividend, tax offset, and whether you receive a refund or owe additional tax.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Company mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">For company directors and accountants: enter your franking account balance to calculate the maximum fully franked dividend you can distribute without going into a franking deficit.</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">The franking credit formula</h3>
            <div className="font-mono text-sm bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
              <p className="text-orange-600 dark:text-orange-400 font-bold mb-1">Franking credit = Cash dividend × Franking % × (Tax rate ÷ (1 − Tax rate))</p>
              <p className="text-gray-500 text-xs mt-2">Example: $700 dividend, 100% franked, 30% company rate</p>
              <p className="text-gray-700 dark:text-gray-300 text-xs">= $700 × 1.0 × (0.30 ÷ 0.70) = $700 × 0.4286 = <strong>$300 franking credit</strong></p>
              <p className="text-gray-500 text-xs mt-1">Grossed-up dividend = $700 + $300 = $1,000</p>
            </div>
          </div>
        </section>

        <AdSenseUnit slot="3651327789" className="my-8" />

        <section className="mt-8 prose prose-gray dark:prose-invert max-w-none">
          <h2>Understanding Dividend Imputation in Australia</h2>
          <p>
            Australia&apos;s dividend imputation system is one of the most investor-friendly tax structures
            in the world. Unlike most countries where shareholders pay full personal income tax on dividends
            regardless of how much company tax was already paid, Australia prevents this double-taxation
            by attaching franking credits to dividends.
          </p>
          <p>
            When an Australian company pays 30% corporate tax on its profits and then distributes those
            profits as dividends, it can &quot;frank&quot; those dividends by attaching credits representing the
            tax already paid. Shareholders then gross up the dividend (add the credit back), include the
            larger amount as taxable income, and receive a tax offset equal to the credit.
          </p>
          <p>
            The net result: shareholders pay tax at their personal marginal rate on the full pre-tax
            company profit, with the corporate tax already paid counting as a credit toward that liability.
            If your marginal rate is below the company rate, you get the difference back as a cash refund.
          </p>

          <h3>Franking Credits at EOFY: What Investors Need to Know</h3>
          <p>
            At the end of each financial year (30 June), Australian investors who hold shares and receive
            dividends need to include all franked and unfranked dividends in their tax return, along with
            the associated franking credits.
          </p>
          <ul>
            <li>
              <strong>ATO pre-fill:</strong> From early July, myTax pre-fills dividend and franking credit
              data reported by share registries and brokers. Always verify these figures against your own
              statements — processing delays mean some data may not appear until August or September.
            </li>
            <li>
              <strong>Eligible to claim if you pass the 45-day rule:</strong> To be entitled to a franking
              offset, you must hold the shares &quot;at risk&quot; for at least 45 days (90 days for preference shares)
              around the ex-dividend date. Short-term traders who buy and sell around the dividend date may
              not qualify.
            </li>
            <li>
              <strong>Refundable excess credits:</strong> If your total franking credits exceed your income
              tax liability (including Medicare levy), the excess is refunded in cash when you lodge. This
              benefit is particularly valuable for retirees, low-income earners, and super funds.
            </li>
            <li>
              <strong>Portfolio tracking:</strong> Keep a record of ex-dividend dates and dividend reinvestment
              plan (DRP) amounts — DRP shares are treated as income at their market value on the allotment date
              and can include franking credits, even though no cash is received.
            </li>
          </ul>

          <h3>Worked Example: Fully Franked Dividend</h3>
          <p>
            An investor with a $80,000 salary receives a $700 fully franked dividend from a large ASX company
            (30% company tax rate).
          </p>
          <ul>
            <li>Cash dividend: $700</li>
            <li>Franking credit: $700 × (30/70) = $300</li>
            <li>Grossed-up dividend (assessable income): $1,000</li>
            <li>Marginal tax rate at $80,000 income: 32.5%</li>
            <li>Tax on grossed-up dividend: $1,000 × 32.5% = $325</li>
            <li>Less franking credit offset: −$300</li>
            <li>Additional tax owed: $25</li>
            <li>Effective tax rate on the $700 cash dividend: 3.6%</li>
          </ul>
          <p>
            Compare this to an investor with $20,000 in salary receiving the same dividend:
          </p>
          <ul>
            <li>Marginal rate at $20,700 income: 19% (on amounts above $18,200)</li>
            <li>Tax on grossed-up dividend: approximately $56</li>
            <li>Less franking credit: −$300</li>
            <li>Excess credit refundable: $244 refund</li>
          </ul>
          <p>
            The low-income investor not only pays no tax on the dividend — they receive a $244 cash refund,
            making fully franked Australian shares extremely tax-efficient at lower income levels.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <YMYLDisclaimer type="financial" />
        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
