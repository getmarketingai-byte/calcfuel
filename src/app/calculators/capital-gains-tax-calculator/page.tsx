import type { Metadata } from "next";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import CapitalGainsTaxCalc from "./CapitalGainsTaxCalc";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator Australia (2025–26) — CGT Estimator",
  description:
    "Free Australian Capital Gains Tax calculator. Enter your purchase price, sale price, and holding period to estimate your CGT liability and net profit after tax. Includes the 50% CGT discount for assets held over 12 months.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/capital-gains-tax-calculator",
  },
  openGraph: {
    title: "Capital Gains Tax Calculator Australia (2025–26)",
    description:
      "Estimate your Australian CGT liability instantly. See your gross capital gain, 50% discount saving, taxable amount, and net profit after tax. For property, shares, and other assets.",
    url: "https://calcfuel.com/calculators/capital-gains-tax-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "Negative Gearing Calculator",
    slug: "negative-gearing-calculator",
    description: "Calculate your annual rental loss, tax deduction, and true after-tax weekly cash flow for investment properties.",
  },
  {
    title: "Australian Income Tax Calculator",
    slug: "australian-income-tax-calculator",
    description: "Calculate your Australian income tax, Medicare levy, and take-home pay for FY2025-26.",
  },
  {
    title: "Stamp Duty Calculator",
    slug: "stamp-duty-calculator",
    description: "Calculate stamp duty costs by state for residential and investment properties across Australia.",
  },
  {
    title: "Superannuation Calculator",
    slug: "superannuation-calculator",
    description: "Project your super balance at retirement with employer contributions and voluntary top-ups.",
  },
];

const faqs = [
  {
    question: "What is Capital Gains Tax (CGT) in Australia?",
    answer:
      "Capital Gains Tax (CGT) is the tax you pay on the profit from selling a capital asset — such as an investment property, shares, or cryptocurrency — that you purchased after 19 September 1985. CGT is not a separate tax in Australia; rather, capital gains are included in your assessable income and taxed at your marginal income tax rate. The ATO applies CGT when you 'dispose' of an asset, which includes selling, gifting, or transferring ownership. Your primary residence is generally exempt from CGT under the main residence exemption.",
  },
  {
    question: "What is the 50% CGT discount and who qualifies?",
    answer:
      "If you are an Australian individual or trust (not a company or superannuation fund) and you have held a capital asset for more than 12 months before selling it, you are entitled to the 50% CGT discount. This means only 50% of your capital gain is included in your assessable income — effectively halving the tax you pay. For example, if your capital gain is $100,000 and you held the asset for more than 12 months, only $50,000 is added to your taxable income. Self-managed super funds receive a one-third discount (33.3%) rather than 50%.",
  },
  {
    question: "How is CGT calculated on investment property in Australia?",
    answer:
      "To calculate your capital gain on an investment property: (1) Determine your cost base — this is the purchase price plus acquisition costs (stamp duty, legal fees, building inspections) and any capital improvements made during ownership. (2) Calculate your capital proceeds — the sale price minus disposal costs (agent's commission, legal fees, advertising). (3) Subtract the cost base from the capital proceeds to get your gross capital gain. (4) If you held the property for more than 12 months, apply the 50% discount to get your taxable capital gain. (5) Add the taxable capital gain to your other assessable income and apply your marginal tax rate.",
  },
  {
    question: "What costs are included in the cost base?",
    answer:
      "The cost base of a capital asset includes: the original purchase price; incidental acquisition costs (stamp duty, conveyancing fees, legal fees, valuation fees, buyer's agent fees); costs of owning the asset that weren't deductible (interest, rates, and insurance are generally deductible for investment properties and cannot be added to the cost base); capital expenditure that adds to or improves the asset (not repairs/maintenance which are deductible); and incidental disposal costs (conveyancing, agent's commission, advertising). Getting the cost base right is critical — a higher cost base reduces your CGT. Keep all receipts and settlement statements.",
  },
  {
    question: "Do I pay CGT on shares and ETFs in Australia?",
    answer:
      "Yes. Capital gains on Australian and international shares and ETFs are taxed as ordinary income at your marginal rate. The 50% CGT discount applies if you held the shares for more than 12 months. For shares, your cost base is typically the purchase price plus brokerage. Your capital proceeds are the sale price minus brokerage. Dividend reinvestment plan (DRP) shares each have a separate cost base equal to the reinvested dividend amount and their own 12-month holding period clock. If you have multiple parcels of the same share purchased at different times, you can choose which parcel to sell (usually the highest-cost parcel) to minimise CGT.",
  },
  {
    question: "Can I offset a capital gain with a capital loss?",
    answer:
      "Yes. Capital losses are used to reduce capital gains in the same income year. If your losses exceed your gains in a year, the net capital loss is carried forward (not back) to offset future capital gains. You cannot use capital losses to reduce your ordinary income. The order of operations matters: first, apply current-year capital losses against current-year capital gains; then, apply carried-forward losses. Importantly, the 50% CGT discount is applied after capital losses are netted against gains — not before — which can affect your strategy for timing asset sales.",
  },
  {
    question: "What is the main residence exemption?",
    answer:
      "Your main residence (family home) is generally fully exempt from CGT in Australia, provided you: lived in the property for the entire ownership period; the property was never used to produce income; and the land is 2 hectares or less. Partial exemptions apply if you rented part of the property, used part for a home business, or initially rented it before moving in. A key rule: if you move out of your home and rent it out, you can choose to treat it as your main residence for up to 6 years under the '6-year rule' — but only if you don't nominate another property as your main residence during that time.",
  },
];

const howToSteps = [
  "Enter your original purchase price (the amount you paid for the asset).",
  "Enter the sale price (the amount you received or will receive).",
  "Enter acquisition costs (stamp duty, legal fees, buyer's agent). These add to your cost base and reduce CGT.",
  "Enter disposal costs (agent's commission, legal fees). These reduce your capital proceeds.",
  "Select the asset type and whether you held the asset for more than 12 months to determine if the 50% discount applies.",
  "Choose your marginal tax rate — the rate that applies to the top slice of your income for the year of sale.",
  "Click Calculate to see your estimated CGT liability, effective tax rate, and net profit after tax.",
];

export default function CapitalGainsTaxPage() {
  return (
    <>
      <CalculatorJsonLd
        name="Capital Gains Tax Calculator Australia"
        description="Estimate your Australian CGT liability for investment property, shares, or other assets. Includes 50% CGT discount for assets held over 12 months."
        url="https://calcfuel.com/calculators/capital-gains-tax-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Capital Gains Tax Calculator", url: "https://calcfuel.com/calculators/capital-gains-tax-calculator" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Capital Gains Tax Calculator Australia (2025–26)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Estimate your CGT liability for property, shares, or other assets. The 50% discount is applied automatically for assets held over 12 months.
        </p>

        <CapitalGainsTaxCalc />

        <AdSenseUnit slot="6564431580" className="my-8" />

        <ProductCTASection />

        {/* How it works */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <ol className="space-y-3">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <AdSenseUnit slot="3651327789" className="my-8" />

        {/* Article */}
        <section className="mt-8 prose prose-gray dark:prose-invert max-w-none">
          <h2>Understanding Capital Gains Tax in Australia</h2>
          <p>
            Capital Gains Tax (CGT) is one of the most significant tax considerations for Australian investors. Whether you are selling an investment property in Sydney, offloading a parcel of shares, or disposing of a business asset, understanding how CGT works — and how to legitimately minimise it — can save you thousands of dollars.
          </p>
          <p>
            This guide covers the key rules that apply to individual Australian taxpayers (not companies or self-managed super funds, which have different rules). Always consult a registered tax agent or accountant for advice specific to your situation.
          </p>

          <h3>The 50% CGT Discount: Australia's Most Valuable Tax Break for Investors</h3>
          <p>
            The single most important CGT rule for long-term investors is the <strong>50% discount</strong>. If you are an individual or trust and you hold a capital asset for <strong>more than 12 months</strong> before selling it, you only include 50% of the net capital gain in your assessable income. The other 50% is permanently excluded — you never pay tax on it.
          </p>
          <p>
            To illustrate: suppose you bought an investment property for $600,000 (including acquisition costs) and sell it five years later for $900,000 (net of disposal costs). Your gross capital gain is $300,000. Because you held it for more than 12 months, you apply the 50% discount: only $150,000 is added to your taxable income. At the 32.5% marginal rate, your CGT liability is $48,750 — a saving of $48,750 compared with selling before the 12-month mark.
          </p>
          <p>
            This is why experienced property and share investors plan their sale timing carefully around the 12-month threshold.
          </p>

          <h3>What Goes Into the Cost Base?</h3>
          <p>
            Your cost base determines your capital gain: a higher cost base means a smaller gain and less tax. Many investors pay more CGT than necessary because they forget to include all allowable costs. The five elements of the cost base under Australian tax law are:
          </p>
          <ul>
            <li><strong>Purchase price</strong> — the amount you paid for the asset.</li>
            <li><strong>Incidental costs of acquisition</strong> — stamp duty, conveyancing fees, legal fees, building and pest inspections, buyer's agent fees, and valuation costs paid when buying.</li>
            <li><strong>Non-deductible ownership costs</strong> — for investment properties, costs like interest, rates, insurance, and repairs are deductible and cannot be added to the cost base. But if you use the property partly for private purposes (or it's vacant land), some costs may be non-deductible and therefore can be added.</li>
            <li><strong>Capital expenditure</strong> — money spent to add to or improve the value of the asset (e.g. adding a bedroom, renovating a kitchen) rather than maintaining it. Repairs and maintenance are deductible expenses, not capital.</li>
            <li><strong>Incidental costs of disposal</strong> — agent's commission, advertising, conveyancing fees, and legal costs paid when selling. These reduce your capital proceeds rather than increasing your cost base, but the net effect on your CGT calculation is the same.</li>
          </ul>

          <h3>CGT on Investment Property</h3>
          <p>
            Investment properties are the most common CGT asset for Australian investors. Key points to understand:
          </p>
          <ul>
            <li><strong>No main residence exemption</strong> — if the property was never your primary place of residence, there is no exemption. The full capital gain (less the 50% discount if held &gt;12 months) is taxable.</li>
            <li><strong>Partial main residence exemption</strong> — if you lived in the property for part of your ownership period and rented it for part, you can apportion the gain. The formula is based on the number of days it was your main residence divided by the total days of ownership.</li>
            <li><strong>The 6-year rule</strong> — if you move out of your home and rent it, you can continue to treat it as your main residence for up to 6 years (the "absence rule"). No CGT will apply to any gain arising during those 6 years, provided you don't treat another property as your main residence simultaneously.</li>
            <li><strong>Depreciation recapture</strong> — if you have claimed building depreciation (Division 43) on the property, the ATO may add back those amounts to reduce your cost base, increasing your capital gain. Your accountant should calculate this.</li>
          </ul>

          <h3>CGT on Shares and ETFs</h3>
          <p>
            The same CGT rules apply to Australian and international shares, managed funds, and ETFs. A few nuances:
          </p>
          <ul>
            <li><strong>Parcel tracking</strong> — if you own multiple parcels of the same share (bought at different times and prices), you can choose which parcel to sell. Selling higher-cost parcels first minimises your CGT.</li>
            <li><strong>Dividend reinvestment plans</strong> — each set of shares acquired through a DRP has its own purchase date and cost base equal to the market value on the date of reinvestment. The 12-month clock starts from that DRP acquisition date.</li>
            <li><strong>Wash sales</strong> — the ATO has specific rules against "wash sale" arrangements where you sell a loss-making parcel to crystallise the loss, then immediately repurchase it. The ATO can treat such arrangements as tax avoidance.</li>
            <li><strong>AMIT and ETF distributions</strong> — some ETFs pass through capital gains as attributed managed investment trust (AMIT) distributions. These may already have the 50% discount applied by the fund, which is reflected in your annual tax statement.</li>
          </ul>

          <h3>CGT Strategies for Australian Investors</h3>
          <p>
            While the calculator gives you an estimate, there are legitimate strategies that can reduce your CGT:
          </p>
          <ul>
            <li><strong>Hold for 12 months</strong> — the simplest and most powerful. If you are close to the 12-month threshold, waiting a few weeks can halve your tax bill.</li>
            <li><strong>Time the sale for a low-income year</strong> — capital gains are taxed at your marginal rate. If you know you will be on a lower income next year (career break, retirement, parental leave), selling in that year can significantly reduce your CGT.</li>
            <li><strong>Offset with capital losses</strong> — if you have unrealised losses in other investments, you might crystallise those losses to offset the gain. Be careful of wash sale rules.</li>
            <li><strong>Superannuation</strong> — selling assets inside superannuation is taxed at 10% (not your marginal rate), and 15% on assets held less than 12 months. Assets held until retirement and sold in pension phase are generally tax-free.</li>
            <li><strong>Maximise the cost base</strong> — ensure all allowable costs are included. Keep receipts for every capital improvement over the ownership period.</li>
          </ul>

          <h3>When to See a Tax Accountant</h3>
          <p>
            This calculator provides an estimate for educational purposes. It does not account for: the Medicare levy surcharge; main residence exemptions and apportionments; depreciation recapture on rental properties; foreign resident CGT withholding; small business CGT concessions; or complex trust and company structures. For any significant asset sale, the fee for professional tax advice is almost certainly worth it.
          </p>
        </section>

        {/* FAQs */}
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

        <RelatedTools tools={relatedTools} />
      </div>
    </>
  );
}
