import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import ProductCTASection from "@/components/ProductCTASection";
import StampDutyCalc from "./StampDutyCalc";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator Australia — All States & Territories 2024–2025",
  description:
    "Free Australian stamp duty calculator covering NSW, VIC, QLD, WA, SA, ACT, NT, and TAS. Calculate transfer duty for owner-occupiers, investors, and first home buyers. Includes FHB concessions and all-state comparison.",
  alternates: {
    canonical: "https://calcfuel.com/calculators/stamp-duty-calculator",
  },
  openGraph: {
    title: "Stamp Duty Calculator — All Australian States & Territories",
    description:
      "Calculate stamp duty (transfer duty) for any Australian state. Covers NSW, VIC, QLD, WA, SA, ACT, NT, and TAS. Includes first home buyer concessions and an all-state comparison.",
    url: "https://calcfuel.com/calculators/stamp-duty-calculator",
    siteName: "CalcFuel",
    locale: "en_AU",
    type: "website",
  },
};

const relatedTools = [
  {
    title: "Mortgage Repayment Calculator",
    slug: "mortgage-repayment-calculator",
    description: "Calculate Australian home loan repayments and compare frequencies.",
  },
  {
    title: "Superannuation Calculator",
    slug: "superannuation-calculator",
    description: "Project your super balance at retirement.",
  },
  {
    title: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "See how savings or investments grow over time.",
  },
  {
    title: "Australian GST Calculator",
    slug: "gst-calculator",
    description: "Add or remove 10% GST instantly.",
  },
];

const faqs = [
  {
    question: "What is stamp duty in Australia?",
    answer:
      "Stamp duty — officially called transfer duty in most states — is a state and territory government tax on property transactions. It applies when you purchase real estate, and in some states on other dutiable transactions like vehicle purchases and business transfers. Stamp duty is calculated as a percentage of the property's purchase price or market value (whichever is higher) and is paid before or at settlement. It is one of the largest upfront costs of buying property in Australia, often adding tens of thousands of dollars to the purchase cost.",
  },
  {
    question: "Which state has the lowest stamp duty?",
    answer:
      "Stamp duty rates vary significantly between states. For a $750,000 property purchased by an owner-occupier in 2024–2025: NSW and VIC tend to have the highest effective rates at that price point, while WA and QLD are typically lower. The ACT has been progressively abolishing stamp duty for eligible buyers under its Home Buyer Concession Scheme. Use the all-state comparison table in the calculator above to compare duty across all eight states and territories for your specific property value.",
  },
  {
    question: "Do first home buyers pay stamp duty in Australia?",
    answer:
      "Most states offer stamp duty concessions or full exemptions for eligible first home buyers. Key rules: NSW — full exemption for properties up to $800,000, tapered concession to $1 million. VIC — full exemption up to $600,000, tapered to $750,000 (established homes); waived for new builds up to $1 million. WA — full exemption up to $430,000, tapered to $530,000. QLD — first home concession on principal place of residence. TAS — 50% concession on properties up to $600,000. NT — 50% discount up to $549,000. ACT — income-tested scheme that can eliminate duty entirely. SA — no specific stamp duty concession, but a First Home Owner Grant ($15,000 for new builds) is available.",
  },
  {
    question: "When is stamp duty paid?",
    answer:
      "Stamp duty is typically due at settlement — the day you take legal ownership of the property. In most states, you have 30 days from the date of the contract to lodge and pay stamp duty (though some states allow longer). Your conveyancer or solicitor will usually calculate the amount and arrange payment as part of the settlement process. Most lenders require stamp duty to be paid from your own savings — it cannot generally be added to your home loan.",
  },
  {
    question: "Can stamp duty be added to a home loan?",
    answer:
      "In most cases, no — stamp duty must be paid from your own funds (savings) at settlement. It cannot be added to your home loan, which is why it is critical to account for it in your savings plan before buying. Some lenders may include stamp duty in a construction loan or in specific products for first home buyers, but this is not standard. If you are planning a property purchase, you need to save your deposit plus stamp duty (and other purchase costs such as conveyancing, building inspection, and lender fees).",
  },
  {
    question: "What is the foreign purchaser surcharge?",
    answer:
      "Foreign purchasers (non-Australian citizens or permanent residents) pay an additional surcharge on top of standard stamp duty in NSW (8%), VIC (8%), QLD (7%), WA (7%), SA (7%), and ACT (no surcharge). The surcharge applies to residential land, not just improvements. This calculator does not include the foreign purchaser surcharge — if this applies to your purchase, add the relevant percentage to the duty shown.",
  },
  {
    question: "Is stamp duty tax deductible?",
    answer:
      "For investment properties, stamp duty forms part of the cost base of the asset and can reduce your capital gains tax (CGT) when you eventually sell — but it is not deductible in the year of purchase as an ongoing expense. For owner-occupied homes, stamp duty is not deductible at all, as there is no CGT or rental income to offset it against. If you are purchasing a property for business purposes, stamp duty treatment may differ — consult your accountant.",
  },
  {
    question: "What other costs should I budget for when buying property?",
    answer:
      "Beyond stamp duty, typical property purchase costs in Australia include: conveyancing fees ($1,500–$3,000), building and pest inspection ($500–$1,200), loan establishment fees ($300–$700), Lenders Mortgage Insurance (LMI) if your deposit is less than 20% — potentially $10,000–$30,000 on a typical first home purchase, mortgage registration fees ($100–$200), title search fees ($100–$200), and moving costs ($500–$3,000). Budget at least 2–4% of the property price for total purchase costs on top of your deposit.",
  },
];

const howToSteps = [
  {
    name: "Enter the property value",
    text: "Type the purchase price (or market value if higher). Use the contract price for a standard purchase.",
  },
  {
    name: "Select your state or territory",
    text: "Choose the state where the property is located. Stamp duty is a state tax — rates and thresholds differ significantly between NSW, VIC, QLD, and other states.",
  },
  {
    name: "Choose your buyer type",
    text: "Select Owner-Occupier, Investor, or First Home Buyer. First home buyers may qualify for a full exemption or reduced duty depending on the property price and state.",
  },
  {
    name: "Read your results",
    text: "The calculator shows stamp duty payable, the effective rate, your total upfront cost (20% deposit + stamp duty), and an all-state comparison table so you can see how duty varies by location.",
  },
];

export default function StampDutyCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian Stamp Duty Calculator"
        description="Free Australian stamp duty calculator for all states and territories. Calculate transfer duty for owner-occupiers, investors, and first home buyers. Includes FHB concessions and all-state comparison."
        url="https://calcfuel.com/calculators/stamp-duty-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          {
            name: "Stamp Duty Calculator",
            url: "https://calcfuel.com/calculators/stamp-duty-calculator",
          },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-orange-500">Financial Calculators</Link>
        <span className="mx-2">/</span>
        <span>Stamp Duty Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Australian Stamp Duty Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate stamp duty (transfer duty) for any Australian state or territory. Covers NSW,
        VIC, QLD, WA, SA, ACT, NT, and TAS — including first home buyer concessions and an
        all-state comparison.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Rates current for 2024–2025. Always verify with your state revenue office before settlement.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <StampDutyCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>What Is Stamp Duty and How Is It Calculated?</h2>
        <p>
          Stamp duty — formally known as transfer duty in most Australian states — is a state
          government tax levied on property transactions. When you buy residential or commercial
          real estate, you pay stamp duty to the state government where the property is located.
          The amount depends on three factors: the purchase price, the state, and whether you
          qualify for any concessions (particularly for first home buyers).
        </p>
        <p>
          Stamp duty is calculated using a tiered bracket system, similar to income tax. You pay
          progressively higher rates on higher portions of the purchase price. On a $750,000
          property in NSW, for example, you pay nothing on the first $14,000, then escalating
          rates up to 4.5% on amounts between $351,000 and $1,168,000. The result is an effective
          rate of around 2.9% — meaning approximately $21,500 in stamp duty.
        </p>

        <h2>Stamp Duty by State: 2024–2025 Rates</h2>
        <p>
          Stamp duty rates vary dramatically between states. Understanding the differences is
          particularly important for investors who may have flexibility in which state to purchase,
          and for interstate movers who need to budget accurately.
        </p>

        <h3>NSW — New South Wales</h3>
        <p>
          NSW has a seven-bracket system with rates from 1.25% (under $17,000) to 7% (above
          $3.5M). For properties between $351,000 and $1,168,000 — the range covering most Sydney
          transactions — the marginal rate is 4.5%. First home buyers receive a full exemption
          below $800,000 and a tapered concession to $1,000,000. NSW Revenue administers duty
          through the OSR portal. Payment is due within 3 months of settlement.
        </p>

        <h3>VIC — Victoria</h3>
        <p>
          Victoria uses a four-bracket system with a principal rate of 6% on properties between
          $130,000 and $960,000, dropping to 5.5% above that. First home buyers receive a full
          exemption on established homes up to $600,000 and a tapered concession to $750,000.
          New builds by first home buyers are exempt up to $1,000,000. The State Revenue Office
          Victoria (SRO) assesses duty based on the greater of purchase price or market value.
        </p>

        <h3>QLD — Queensland</h3>
        <p>
          Queensland&apos;s rates are generally lower than NSW and VIC. Properties below $5,000 pay
          no duty. The main residential bracket ($75,000–$540,000) attracts a 3.5% marginal rate.
          QLD offers a first home concession that effectively reduces duty on properties used as
          a principal place of residence — check the Queensland Revenue Office for current
          thresholds and eligibility conditions.
        </p>

        <h3>WA — Western Australia</h3>
        <p>
          WA has a six-bracket system with relatively competitive rates for mid-range properties.
          The 4.15% marginal rate applies from $250,000 to $500,000. First home buyers receive a
          full exemption below $430,000 and a tapered concession to $530,000 — the lowest
          exemption threshold of the major states.
        </p>

        <h3>SA — South Australia</h3>
        <p>
          SA uses a nine-bracket system. The 5% marginal rate applies from $300,000 to $500,000,
          rising to 5.5% above $500,000. Unlike other states, SA does not offer a dedicated
          stamp duty concession for first home buyers, though the $15,000 First Home Owner Grant
          applies to new builds.
        </p>

        <h3>ACT — Australian Capital Territory</h3>
        <p>
          The ACT is progressively transitioning away from stamp duty toward a broad-based land
          tax. For standard buyers, the ACT uses a seven-bracket system. The Home Buyer
          Concession Scheme can reduce or eliminate duty for eligible first home buyers
          (income-tested, with a household income cap). The ACT Revenue Office administers the
          scheme.
        </p>

        <h2>First Home Buyer Stamp Duty Concessions</h2>
        <p>
          Every state and territory offers some form of support for first home buyers, though the
          generosity and structure vary significantly:
        </p>
        <ul>
          <li>
            <strong>NSW:</strong> Full exemption below $800K, tapered concession to $1M. No duty
            applies on vacant land below $400K (tapered to $500K).
          </li>
          <li>
            <strong>VIC:</strong> Full exemption on established homes below $600K, tapered to
            $750K. For new builds, full exemption below $1M.
          </li>
          <li>
            <strong>QLD:</strong> First home concession — significant reduction on principal place
            of residence purchases. Verify current threshold with QLD Revenue.
          </li>
          <li>
            <strong>WA:</strong> Full exemption below $430K, tapered to $530K.
          </li>
          <li>
            <strong>TAS:</strong> 50% concession on established homes up to $600K.
          </li>
          <li>
            <strong>NT:</strong> 50% discount on duty for eligible FHBs up to $549K.
          </li>
          <li>
            <strong>ACT:</strong> Income-tested Home Buyer Concession Scheme — can eliminate
            duty entirely for qualifying buyers.
          </li>
          <li>
            <strong>SA:</strong> No specific stamp duty concession, but $15K First Home Owner
            Grant for new builds.
          </li>
        </ul>

        <h2>Budgeting for Property Purchase Costs</h2>
        <p>
          Stamp duty is often the largest single purchase cost after your deposit, but it is not
          the only upfront cost to budget for. A full budget for a $750,000 property in NSW for
          an owner-occupier would include:
        </p>
        <ul>
          <li>20% deposit: $150,000</li>
          <li>Stamp duty: ~$29,000</li>
          <li>Conveyancing: $2,000</li>
          <li>Building and pest inspection: $800</li>
          <li>Loan establishment fee: $500</li>
          <li>Other (title search, mortgage registration, moving): ~$1,000</li>
          <li><strong>Total funds needed: ~$183,300</strong></li>
        </ul>
        <p>
          If your deposit is less than 20%, you will likely also pay Lenders Mortgage Insurance
          (LMI), which can add $10,000–$30,000 depending on your loan amount and LVR.
        </p>
      </article>

      <ProductCTASection variant="showcase" />

      
      <YMYLDisclaimer type="tax" />
      <RelatedTools tools={relatedTools} />

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white text-sm list-none flex items-center justify-between">
                {faq.question}
                <span className="ml-4 text-orange-500 shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-6">
        Stamp duty rates are based on published schedules for 2024–2025 and may change. This
        calculator is for general guidance only and does not constitute legal or financial advice.
        Does not include foreign purchaser surcharges, landholder duty, or other levies. Always
        verify the duty payable with your state or territory revenue office, conveyancer, or
        solicitor before settlement.
      </p>
    </div>
  );
}
