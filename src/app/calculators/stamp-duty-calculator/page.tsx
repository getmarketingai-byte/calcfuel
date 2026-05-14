import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import StampDutyCalc from "./StampDutyCalc";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator Australia 2025 — All States | CalcFuel",
  description:
    "Free Australian stamp duty calculator covering NSW, VIC, QLD, WA, SA, ACT, TAS and NT. Includes first home buyer concessions. Instant estimates.",
};

const relatedTools = [
  { title: "Mortgage Repayment Calculator", slug: "mortgage-repayment-calculator", description: "Calculate monthly repayments and total interest on any home loan." },
  { title: "Capital Gains Tax Calculator", slug: "capital-gains-tax-calculator", description: "Estimate CGT on property or share sales for Australian residents." },
  { title: "Negative Gearing Calculator", slug: "negative-gearing-calculator", description: "Calculate your rental loss and tax benefit from negative gearing." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your income tax, Medicare levy, and take-home pay for 2025–26." },
  { title: "GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any amount instantly." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "Project investment growth using compound interest over time." },
];

const faqs = [
  {
    question: "How is stamp duty calculated in Australia?",
    answer: "Stamp duty (also called transfer duty) is calculated on the purchase price or market value of the property, whichever is higher. Each state and territory has its own progressive rate table — lower rates apply to the first portion of the property value, with higher rates applying to each successive bracket. For example, in NSW a $750,000 property attracts approximately $28,800 in stamp duty under the general rate. The exact calculation depends on your state, whether you are a first home buyer, whether the property is your principal residence, and whether it is residential or commercial property.",
  },
  {
    question: "What first home buyer stamp duty exemptions exist?",
    answer: "Most states offer first home buyer concessions or exemptions on stamp duty: NSW provides a full exemption for properties up to $650,000 and a partial concession to $800,000. Victoria exempts properties up to $600,000 with a partial concession to $750,000. Queensland offers a full concession for homes under $500,000. Western Australia has a concessional rate for first home buyers on properties under certain thresholds. South Australia and Tasmania offer separate first home grants rather than stamp duty concessions. The ACT has a complex duty structure with a broad duty-free threshold for eligible buyers. Always check the current eligibility rules with your state revenue office as thresholds and rules change frequently.",
  },
  {
    question: "Can stamp duty be added to my mortgage?",
    answer: "Technically yes, lenders can allow you to capitalise stamp duty into your loan amount — but this increases the loan principal and total interest paid. Most lenders and financial advisers recommend paying stamp duty from savings rather than borrowing it. Adding stamp duty to your mortgage means you pay interest on it for the life of the loan. If you are unable to cover stamp duty from savings, it may indicate that your deposit is below the minimum required for the property you are targeting. Some lenders may also decline to capitalise stamp duty if doing so increases the loan-to-value ratio (LVR) above 80% or 90%.",
  },
  {
    question: "When do I have to pay stamp duty?",
    answer: "Stamp duty is generally due at settlement — the day you formally take ownership of the property. In most states, your solicitor or conveyancer will arrange payment as part of the settlement process. In some states (including NSW and VIC), you may pay stamp duty at the time of signing the contract of sale or within 30 days of signing. The exact due date varies by state: NSW requires payment within 3 months of the dutiable transaction; VIC within 30 days of liability arising. Failure to pay stamp duty by the due date attracts interest and penalty charges.",
  },
  {
    question: "Is stamp duty tax deductible?",
    answer: "For owner-occupiers buying their primary residence, stamp duty is not tax deductible. For investment properties, stamp duty is not immediately deductible as an expense — instead, it forms part of the cost base of the property for capital gains tax (CGT) purposes. This means it effectively reduces your capital gain (and therefore your CGT liability) when you eventually sell. For properties used partly for business or income production, the proportion of stamp duty attributable to the income-producing use may be deductible — consult a tax adviser for your specific situation.",
  },
  {
    question: "Why are stamp duty rates different in each state?",
    answer: "Stamp duty is a state and territory tax — each jurisdiction sets its own rates, brackets, and concessions. Revenue from stamp duty funds state government services including hospitals, schools, and infrastructure. Over time, state governments have periodically adjusted rates, brackets, and concessions in response to housing affordability concerns, revenue pressures, and policy priorities. This means rates can change from year to year. Always verify the current rates with the relevant state revenue office — for NSW, see Revenue NSW; for VIC, the State Revenue Office Victoria; for QLD, the Queensland Office of State Revenue; and so on.",
  },
];

const howToSteps = [
  { name: "Enter the property value", text: "Type the purchase price or market value of the property you are buying." },
  { name: "Select your state or territory", text: "Choose the state or territory where the property is located — each has different stamp duty rates." },
  { name: "Indicate first home buyer status", text: "Check the first home buyer box if you are eligible — many states offer significant concessions or full exemptions." },
  { name: "Read your estimate", text: "The calculator shows the estimated stamp duty, effective rate, and total purchase cost including duty." },
];

export default function StampDutyCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Australian Stamp Duty Calculator 2025"
        description="Calculate stamp duty for property purchases across all Australian states and territories, including first home buyer concessions."
        url="https://calcfuel.com/calculators/stamp-duty-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Financial Calculators", url: "https://calcfuel.com/calculators/financial" },
          { name: "Stamp Duty Calculator", url: "https://calcfuel.com/calculators/stamp-duty-calculator" },
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
        Australian Stamp Duty Calculator 2025
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Estimate stamp duty (transfer duty) for property purchases across all Australian states and territories. Covers NSW, VIC, QLD, WA, SA, ACT, TAS, and NT — including first home buyer concessions.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <StampDutyCalc />

      <div className="my-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm">
        <strong className="text-gray-900 dark:text-white">Disclaimer:</strong>{" "}
        This calculator provides estimates only and should not be treated as financial or legal advice. Stamp duty rates are approximate, change frequently, and vary based on buyer type, property use, and state-specific rules. Consult a qualified conveyancer, solicitor, or your state revenue office to confirm the duty payable on your specific transaction before exchange of contracts or settlement.
      </div>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Is Stamp Duty?</h2>
        <p>
          Stamp duty — formally known as <strong>transfer duty</strong> or <strong>land transfer duty</strong> in most states — is a tax levied by state and territory governments on the transfer of property. It applies to all real estate transactions including residential homes, investment properties, commercial property, and vacant land. In some states it also applies to vehicles and insurance.
        </p>
        <p>
          Stamp duty is typically the largest upfront cost of buying property beyond the purchase price itself, often totalling tens of thousands of dollars on a median-priced home. At the Australian median house price of around $750,000 (2025), a NSW buyer pays approximately $28,800 in stamp duty — equivalent to more than 12 months of a typical home loan&apos;s monthly repayments. Understanding stamp duty is essential when budgeting for a property purchase.
        </p>

        <h2>Stamp Duty Rates by State (Approximate — 2025)</h2>
        <p>
          The following is a summary of approximate stamp duty on a $500,000 residential property for an owner-occupier (non-FHB) in each state. These figures are estimates only and should be verified with the relevant state revenue office.
        </p>
        <table>
          <thead>
            <tr><th>State</th><th>Approx. Duty on $500,000</th><th>FHB Concession?</th></tr>
          </thead>
          <tbody>
            <tr><td>NSW</td><td>~$17,990</td><td>Exempt ≤$650,000</td></tr>
            <tr><td>VIC</td><td>~$21,970</td><td>Exempt ≤$600,000</td></tr>
            <tr><td>QLD</td><td>~$15,925</td><td>Exempt ≤$500,000</td></tr>
            <tr><td>WA</td><td>~$17,765</td><td>Concessional rates apply</td></tr>
            <tr><td>SA</td><td>~$21,330</td><td>Grant (not duty concession)</td></tr>
            <tr><td>ACT</td><td>~$9,000</td><td>Broad duty-free threshold</td></tr>
            <tr><td>TAS</td><td>~$14,255</td><td>Grant available</td></tr>
            <tr><td>NT</td><td>~$7,500</td><td>Concessional for owner-occupiers</td></tr>
          </tbody>
        </table>
        <p>
          Note: ACT has a unique duty structure that is progressively shifting toward a broader land tax model. NT uses a concessional rate for homes under $525,000. All figures are approximations — use the calculator above and verify with official sources.
        </p>

        <h2>Important Rate Caveats — Check Official Sources</h2>
        <p>
          Stamp duty rates are set by state legislation and can change with each state budget. Our calculator uses simplified approximate brackets designed for rough estimates. They may not reflect recent legislative changes, special concessions for seniors, off-the-plan duty concessions, or investment property surcharges. Before signing a contract of sale, always verify the actual duty payable using:
        </p>
        <ul>
          <li>
            <strong>NSW:</strong>{" "}
            <a href="https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty" target="_blank" rel="noopener noreferrer">Revenue NSW</a>
          </li>
          <li>
            <strong>VIC:</strong>{" "}
            <a href="https://www.sro.vic.gov.au/land-transfer-duty" target="_blank" rel="noopener noreferrer">State Revenue Office Victoria</a>
          </li>
          <li>
            <strong>QLD:</strong>{" "}
            <a href="https://www.qro.qld.gov.au/duties/transfer-duty/" target="_blank" rel="noopener noreferrer">Queensland Revenue Office</a>
          </li>
          <li>
            <strong>WA:</strong>{" "}
            <a href="https://www.wa.gov.au/service/financial-management/personal-finance/pay-transfer-duty" target="_blank" rel="noopener noreferrer">Revenue WA</a>
          </li>
          <li>
            <strong>SA:</strong>{" "}
            <a href="https://www.revenuesa.sa.gov.au/taxes-and-duties/stamp-duties/real-property" target="_blank" rel="noopener noreferrer">Revenue SA</a>
          </li>
          <li>
            <strong>ACT:</strong>{" "}
            <a href="https://www.revenue.act.gov.au/duties/conveyance-duty" target="_blank" rel="noopener noreferrer">ACT Revenue Office</a>
          </li>
          <li>
            <strong>TAS:</strong>{" "}
            <a href="https://www.sro.tas.gov.au/" target="_blank" rel="noopener noreferrer">State Revenue Office Tasmania</a>
          </li>
          <li>
            <strong>NT:</strong>{" "}
            <a href="https://ntrevenue.nt.gov.au/duties/" target="_blank" rel="noopener noreferrer">Territory Revenue Office NT</a>
          </li>
        </ul>

        <h2>First Home Buyer Concessions and Grants</h2>
        <p>
          Most states offer substantial stamp duty reductions or full exemptions for first home buyers purchasing below certain price thresholds. These concessions are designed to help first-time buyers offset the upfront cost of entering the property market. Key points:
        </p>
        <ul>
          <li><strong>NSW:</strong> Full exemption up to $650,000; partial relief $650,001–$800,000. Must be a new or existing home; must move in within 12 months and live there for at least 6 months.</li>
          <li><strong>VIC:</strong> Full exemption up to $600,000; partial reduction $600,001–$750,000. For new builds, additional off-the-plan concessions may apply.</li>
          <li><strong>QLD:</strong> Full concession for homes under $500,000; partial concession $500,001–$550,000. Applies to homes and land packages.</li>
          <li><strong>WA:</strong> Reduced transfer duty on a sliding scale for first home buyers on properties under specific thresholds.</li>
          <li><strong>SA &amp; TAS:</strong> First home owner grants rather than stamp duty concessions — check the relevant state for current grant amounts.</li>
          <li><strong>ACT:</strong> A broad concessional duty framework applies; the ACT First Home Owner Grant scheme also provides cash assistance.</li>
        </ul>
        <p>
          In addition to state-based concessions, the federal government offers the{" "}
          <a href="https://www.nhfic.gov.au/what-we-do/support-to-buy" target="_blank" rel="noopener noreferrer">First Home Guarantee</a> and{" "}
          <a href="https://www.nhfic.gov.au/what-we-do/regional-first-home-buyer-guarantee" target="_blank" rel="noopener noreferrer">Regional First Home Buyer Guarantee</a>, which allow eligible first buyers to purchase with as little as 5% deposit without Lenders Mortgage Insurance (LMI). The First Home Super Saver Scheme (FHSSS) allows you to save a deposit inside your super fund on a concessional tax basis.
        </p>

        <h2>Stamp Duty and Property Investment</h2>
        <p>
          For investment property buyers, stamp duty is not immediately tax deductible. It is instead added to the <strong>cost base</strong> of the property, which reduces the capital gain (and therefore CGT) when the property is eventually sold. This deferred tax benefit is real but can take years to realise.
        </p>
        <p>
          When modelling the financial case for an investment property, factor stamp duty into your upfront capital outlay. Our{" "}
          <Link href="/calculators/negative-gearing-calculator" className="text-orange-500 underline">Negative Gearing Calculator</Link> helps you calculate the ongoing holding costs and tax benefit of an investment property, and our{" "}
          <Link href="/calculators/capital-gains-tax-calculator" className="text-orange-500 underline">Capital Gains Tax Calculator</Link> helps model the eventual CGT on sale.
        </p>
        <p>
          Note that several states have introduced additional land tax surcharges for foreign investors. If you are purchasing as a foreign person or entity, additional foreign duty surcharges of 7–8% may apply in NSW, VIC, and QLD — well above the standard rates. Always seek specific legal and tax advice if investing as a non-resident.
        </p>

        <h2>Budgeting for Stamp Duty</h2>
        <p>
          When setting a property budget, ensure you have separate savings for stamp duty in addition to your deposit, legal fees, building and pest inspection costs, and moving expenses. A rough total transaction cost budget for a $750,000 property (NSW, non-FHB) would include:
        </p>
        <ul>
          <li>Stamp duty: ~$28,800</li>
          <li>Conveyancing / legal fees: $1,500–$3,000</li>
          <li>Building and pest inspection: $400–$800</li>
          <li>Loan application / establishment fee: $0–$600</li>
          <li>Lenders mortgage insurance (if LVR above 80%): $5,000–$15,000</li>
          <li>Moving costs: $500–$3,000</li>
        </ul>
        <p>
          Total upfront costs excluding the deposit are typically $30,000–$50,000 on a median-priced property. Having a clear picture of these costs is essential before making an offer. Use our{" "}
          <Link href="/calculators/mortgage-repayment-calculator" className="text-orange-500 underline">Mortgage Repayment Calculator</Link> to model ongoing loan costs, and our{" "}
          <Link href="/calculators/compound-interest-calculator" className="text-orange-500 underline">Compound Interest Calculator</Link> to see how long it takes to save your deposit.
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
