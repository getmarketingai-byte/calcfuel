import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CGTCalc from "./CGTCalc";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator Australia 2025–26 | CalcFuel",
  description:
    "Free Australian capital gains tax calculator. Calculate CGT on shares, property, or crypto. Includes the 50% CGT discount for assets held over 12 months. Based on ATO rates.",
};

const relatedTools = [
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, LITO, and take-home pay." },
  { title: "Negative Gearing Calculator", slug: "negative-gearing-calculator", description: "Calculate your rental property loss and potential tax benefit." },
  { title: "Stamp Duty Calculator", slug: "stamp-duty-calculator", description: "Estimate stamp duty on a property purchase by state." },
  { title: "Salary Sacrifice Calculator", slug: "salary-sacrifice-calculator", description: "Reduce tax through pre-tax super contributions." },
  { title: "Franking Credits Calculator", slug: "franking-credits-calculator", description: "Calculate franking credits on Australian dividends." },
  { title: "GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any price." },
];

const faqs = [
  {
    question: "What is capital gains tax in Australia?",
    answer: "Capital gains tax (CGT) is not a separate tax — it is the tax you pay on the net capital gain you include in your assessable income in the year you dispose of an asset. Your net capital gain is added to your other income and taxed at your marginal income tax rate. Australia introduced CGT on 20 September 1985; assets acquired before that date are generally exempt.",
  },
  {
    question: "What is the 50% CGT discount in Australia?",
    answer: "If you are an Australian resident individual or trust and you have held a CGT asset for more than 12 months before disposing of it, you can reduce the capital gain by 50% before including it in your assessable income. This effectively halves the tax you pay on long-term capital gains. Companies do not get the 50% discount but can apply an indexation method for assets held before 21 September 1999.",
  },
  {
    question: "What assets are subject to CGT in Australia?",
    answer: "CGT applies to most assets including shares, units in managed funds, investment properties (not your primary residence in most cases), cryptocurrency, collectibles and personal use assets over $500 (or $10,000 for collectibles), business assets, and goodwill. Your main residence is generally exempt from CGT under the main residence exemption, subject to conditions.",
  },
  {
    question: "Can I offset capital gains with capital losses?",
    answer: "Yes. Capital losses can be offset against capital gains in the same income year. If your capital losses exceed your capital gains, you have a net capital loss which you can carry forward to offset future capital gains — but you cannot use capital losses to reduce other income (salary, rent, etc.). Net capital losses do not expire and carry forward indefinitely.",
  },
  {
    question: "Is cryptocurrency subject to CGT in Australia?",
    answer: "Yes. The ATO treats cryptocurrency as a CGT asset, not foreign currency. Each disposal of crypto — including selling for AUD, trading one crypto for another, or using crypto to purchase goods — is a CGT event. The 50% discount applies if you held the crypto for over 12 months. Crypto used as a personal use asset (bought and used within short periods for personal consumption) may be exempt, but the ATO applies this narrowly.",
  },
];

const howToSteps = [
  { name: "Enter the cost base", text: "Enter the purchase price plus all acquisition costs: brokerage, stamp duty, legal fees, and any capital improvements." },
  { name: "Enter the sale price", text: "Enter the sale proceeds minus selling costs (brokerage, agent fees, etc.)." },
  { name: "Enter other income", text: "Enter your other taxable income for the year so the calculator can determine the marginal rate applied to the capital gain." },
  { name: "Select the holding period", text: "Tick the box if you held the asset for over 12 months to apply the 50% CGT discount." },
];

export default function CGTCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Capital Gains Tax Calculator Australia 2025–26"
        description="Calculate Australian CGT on shares, property, or crypto with the 50% discount for assets held over 12 months."
        url="https://calcfuel.com/calculators/capital-gains-tax-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Capital Gains Tax Calculator", url: "https://calcfuel.com/calculators/capital-gains-tax-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Capital Gains Tax Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Capital Gains Tax (CGT) Calculator Australia 2025–26
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate the capital gains tax on your shares, investment property, or cryptocurrency. Includes the 50% CGT discount for assets held over 12 months — based on 2025–26 ATO rates.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <CGTCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or tax advice. Capital gains tax outcomes depend on your individual circumstances including capital losses, other income, residency status, and the nature of the asset. Consult a registered tax agent for advice specific to your situation. See{" "}
        <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax" className="text-orange-500 underline" target="_blank" rel="noopener noreferrer">ATO — Capital gains tax</a>.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How Capital Gains Tax Works in Australia</h2>
        <p>
          Capital gains tax (CGT) is the tax payable when you make a capital gain from the disposal of a CGT asset. In Australia, CGT is not a separate tax — it is included in your assessable income for the year and taxed at your marginal income tax rate. Australia introduced CGT on 20 September 1985; assets acquired before this date (pre-CGT assets) are generally exempt.
        </p>
        <p>
          A <strong>capital gain</strong> arises when the sale proceeds exceed the asset&apos;s cost base. A <strong>capital loss</strong> occurs when the sale proceeds are less than the cost base. Capital losses can only offset capital gains, not other income. Unused losses carry forward indefinitely.
        </p>

        <h2>The 50% CGT Discount</h2>
        <p>
          For CGT assets held for more than 12 months, Australian resident individuals and trusts are entitled to a 50% CGT discount. This means only half of the net capital gain is included in your assessable income. For example, if you made a $40,000 capital gain on shares held for 18 months, only $20,000 is added to your taxable income.
        </p>
        <p>
          The discount significantly reduces the effective CGT rate. At a 32.5% marginal rate, the effective CGT rate on a discounted gain is just 16.25%. At 45%, it&apos;s 22.5% — still well below the marginal rate on regular income.
        </p>
        <p>
          <strong>Who gets the discount:</strong> Australian resident individuals and trusts. Companies do not receive the 50% discount (but can apply indexation for pre-September 1999 assets). Non-residents are generally not entitled to the 50% discount.
        </p>

        <h2>What Is the Cost Base?</h2>
        <p>
          The cost base of a CGT asset includes:
        </p>
        <ol>
          <li><strong>Money paid to acquire the asset</strong> — the purchase price</li>
          <li><strong>Incidental costs of acquisition</strong> — brokerage, stamp duty, legal fees, title transfer costs</li>
          <li><strong>Costs related to owning the asset</strong> — only certain costs (repairs not deductible elsewhere, rates on investment property)</li>
          <li><strong>Capital improvements</strong> — building extensions, major renovations</li>
          <li><strong>Incidental costs of disposal</strong> — selling brokerage, agent fees, legal fees on sale</li>
        </ol>
        <p>
          For investment properties, the cost base can be complex — ongoing deductible expenses (interest, depreciation) generally cannot be added to the cost base. See{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax/calculating-your-cgt/cost-base-and-reduced-cost-base" target="_blank" rel="noopener noreferrer">ATO — Cost base and reduced cost base</a>{" "}
          for detailed rules.
        </p>

        <h2>CGT on Shares</h2>
        <p>
          Shares are the most common CGT asset for Australian investors. Key points:
        </p>
        <ul>
          <li>Each parcel of shares has its own cost base (purchase price + brokerage)</li>
          <li>When selling multiple parcels, you can choose which parcel you are selling to optimise CGT outcomes (e.g., sell parcels held over 12 months to access the 50% discount)</li>
          <li>Share splits and consolidations typically do not trigger a CGT event</li>
          <li>Dividend reinvestment plans (DRPs) create new CGT assets each time, with the reinvested amount as the cost base</li>
          <li>Franked dividends do not affect CGT — the franking credit is a separate income item (see our <Link href="/calculators/franking-credits-calculator" className="text-orange-500 underline">Franking Credits Calculator</Link>)</li>
        </ul>

        <h2>CGT on Property</h2>
        <p>
          Your <strong>main residence</strong> (the home you live in) is generally exempt from CGT. The main residence exemption applies if you have lived in the property the entire time you owned it and did not use it to produce income. Partial exemptions apply if you rented it out for part of the time or if you used part of the home for business.
        </p>
        <p>
          <strong>Investment properties</strong> are fully subject to CGT. The 50% discount applies if held over 12 months. Many investors use <Link href="/calculators/negative-gearing-calculator" className="text-orange-500 underline">negative gearing</Link> strategies that interact with CGT planning — the rental losses you claimed over the years do not increase the cost base.
        </p>

        <h2>CGT on Cryptocurrency</h2>
        <p>
          The ATO treats cryptocurrency as property (a CGT asset), not currency. Every disposal is a CGT event — this includes selling crypto for AUD, trading one cryptocurrency for another (e.g., BTC to ETH), and using crypto to pay for goods or services. The 50% discount applies if you held the crypto for over 12 months before disposal.
        </p>
        <p>
          Mining, staking, and DeFi rewards are generally treated as ordinary income (not CGT) when received. If you later sell those coins, any further gain is subject to CGT from the date they were received. See the{" "}
          <a href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/crypto-asset-investments" target="_blank" rel="noopener noreferrer">ATO cryptocurrency guide</a>{" "}
          for the latest rules.
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
