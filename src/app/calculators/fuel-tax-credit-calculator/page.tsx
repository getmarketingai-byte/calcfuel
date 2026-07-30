import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import YMYLDisclaimer from "@/components/YMYLDisclaimer";
import { FTC_LAST_REVIEWED, FTC_PERIOD_LABEL } from "@/lib/fees/fuelTaxCreditRates";
import FuelTaxCreditCalc from "./FuelTaxCreditCalc";

export const metadata: Metadata = {
  title: "Fuel Tax Credit Calculator Australia — ATO FTC Estimate | CalcFuel",
  description:
    "Free Australian fuel tax credit calculator. Estimate FTC in dollars from litres (or kg) × cents per unit. Editable ATO rate presets — verify before BAS.",
  alternates: { canonical: "/calculators/fuel-tax-credit-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "See daily and annual commuting fuel costs." },
  { title: "IFTA Fuel Tax Calculator", slug: "ifta-fuel-tax-calculator", description: "Estimate quarterly IFTA fuel tax across US/Canada jurisdictions." },
  { title: "Australian GST Calculator", slug: "gst-calculator", description: "Add or remove 10% GST from any price instantly." },
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime and outage fuel requirements." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan monthly and annual household fuel spending." },
];

const faqs = [
  {
    question: "What is the fuel tax credit in Australia?",
    answer:
      "Fuel tax credits (FTC) let eligible businesses claim back some of the fuel excise included in the price of fuel used in business activities — machinery, heavy vehicles, and certain off-road uses. The credit is calculated in cents per litre (or per kilogram for gaseous fuels) and claimed on your Business Activity Statement (BAS). The ATO publishes rate tables that change periodically, typically in February and August.",
  },
  {
    question: "How do I calculate my fuel tax credit?",
    answer:
      "For each eligible fuel type: Fuel tax credit ($) = Quantity used (litres or kg) × Rate (cents per unit) ÷ 100. Example: 10,000 litres of eligible diesel at 51.6 cents per litre = 10,000 × 0.516 = $5,160. This calculator applies that formula with editable rate presets.",
  },
  {
    question: "Who is eligible for fuel tax credits?",
    answer:
      "Generally, businesses registered for GST that use fuel in eligible activities — such as off-road plant and equipment, agriculture, mining, marine, and heavy on-road vehicles (with road user charge adjustments) — may claim FTC. Private use, light vehicles on public roads, and some fuel types are excluded or reduced. Use the ATO's fuel tax credit eligibility tool to confirm your situation.",
  },
  {
    question: "When should I verify ATO rates before claiming?",
    answer:
      "Always verify rates for your specific BAS period before lodging. The ATO updates fuel tax credit rates — often twice a year — and different activities attract different rates (e.g. off-road machinery vs heavy vehicle on-road after road user charge). This calculator shows indicative mid-2026 presets; paste the exact rate from the ATO for your claim period.",
  },
  {
    question: "Can I claim fuel tax credits on petrol used in a company car?",
    answer:
      "Generally no for light vehicles travelling on public roads. Fuel used in cars, utes, and vans under 4.5 tonnes GVM on public roads is typically not eligible, unless an exception applies (e.g. certain auxiliary equipment). Heavy vehicles over 4.5 tonnes GVM may qualify for a reduced on-road rate after the road user charge component.",
  },
  {
    question: "How do fuel tax credits relate to GST on my BAS?",
    answer:
      "Fuel tax credits reduce your net tax position on the BAS — they are not GST credits. You report fuel tax credits in the appropriate BAS field (typically label 7D). GST on fuel purchases may still be claimable as input tax credits separately, subject to apportionment rules. Speak to your BAS agent if you are unsure how to report both.",
  },
  {
    question: "Is this calculator suitable for lodging my BAS?",
    answer:
      "No. This is a planning estimator only. A correct BAS claim requires eligible fuel volumes, the correct rate for each activity and fuel type for that period, apportionment for mixed use, and supporting records (invoices, logbooks, allocation). Verify all figures on the ATO website or with a registered tax agent before lodging.",
  },
];

const howToSteps = [
  { name: "Select fuel type preset", text: "Choose the preset closest to your use (off-road diesel, heavy vehicle on-road, LPG, or custom)." },
  { name: "Confirm or edit the rate", text: "Check the cents-per-litre (or kg) rate against the current ATO table for your BAS period." },
  { name: "Enter fuel quantity", text: "Type the litres or kilograms of eligible fuel used in the claim period." },
  { name: "Add a second fuel line if needed", text: "Use the optional second line for a different fuel type or rate." },
  { name: "Review estimated credit", text: "Read the total FTC in dollars — then verify with the ATO before lodging your BAS." },
];

export default function FuelTaxCreditCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Tax Credit Calculator (Australia)"
        description="Free Australian fuel tax credit calculator. Estimate FTC from litres × cents per unit with editable ATO rate presets."
        url="https://calcfuel.com/calculators/fuel-tax-credit-calculator"
        datePublished="2026-07-30"
        dateModified={FTC_LAST_REVIEWED}
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy Calculators", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Fuel Tax Credit Calculator", url: "https://calcfuel.com/calculators/fuel-tax-credit-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link>
        <span className="mx-2">/</span>
        <span>Fuel Tax Credit Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel Tax Credit Calculator (Australia)
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Estimate Australian fuel tax credits before your BAS. Enter litres (or kg) and the cents-per-unit rate from the ATO table — see your credit in dollars instantly. {FTC_PERIOD_LABEL}.
      </p>
      <CalcReviewedBy lastUpdated="July 2026" />
      <FuelTaxCreditCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Are Fuel Tax Credits?</h2>
        <p>
          When Australian businesses buy fuel, part of the price includes fuel excise — a tax collected at the pump. Eligible businesses can claim fuel tax credits (FTC) to recover some of that excise when the fuel is used in qualifying business activities. Unlike a tax deduction, which reduces taxable income, FTC is a direct offset that reduces the net amount you owe on your Business Activity Statement (BAS) — or increases your refund.
        </p>
        <p>
          FTC is administered by the Australian Taxation Office (ATO). Rates are expressed in cents per litre for liquid fuels and cents per kilogram for some gaseous fuels. Rates differ by activity: fuel used in off-road machinery, agriculture, mining, and marine operations typically attracts a higher credit rate than fuel used in heavy vehicles travelling on public roads (where a road user charge component reduces the credit).
        </p>
        <p>
          <strong>{FTC_PERIOD_LABEL}.</strong> The ATO publishes updated rate tables — check the{" "}
          <a href="https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/fuel-tax-credits" target="_blank" rel="noopener noreferrer">
            official fuel tax credits page
          </a>{" "}
          for the exact figures that apply to your BAS period before you lodge.
        </p>

        <h2>The Fuel Tax Credit Formula</h2>
        <p>The calculation itself is straightforward:</p>
        <ul>
          <li><strong>Fuel tax credit ($) = Quantity × Rate ÷ 100</strong></li>
          <li>Quantity = litres (or kg for LPG and some gaseous fuels) of eligible fuel</li>
          <li>Rate = ATO cents per litre (or per kg) for your activity and fuel type</li>
        </ul>
        <p>
          <strong>Example:</strong> A construction company uses 8,500 litres of diesel in off-road excavators and generators during a quarter. The ATO rate for that activity is 51.6 cents per litre. Credit = 8,500 × 51.6 ÷ 100 = <strong>$4,386</strong>. If they also used 2,000 litres of diesel in heavy on-road trucks at 20.5 cents per litre (after road user charge), that line adds 2,000 × 20.5 ÷ 100 = <strong>$410</strong>. Total FTC = <strong>$4,796</strong> for the period (subject to eligibility and apportionment).
        </p>

        <h2>Eligible Activities and Common Exclusions</h2>
        <p>FTC eligibility depends on <em>how</em> fuel is used, not just that you are a business. Broad categories include:</p>
        <ul>
          <li><strong>Off-road business use:</strong> Plant, equipment, generators, and machinery not travelling on public roads.</li>
          <li><strong>Agriculture, forestry, and fishing:</strong> Eligible activities on land, in vehicles on private property, or in marine operations.</li>
          <li><strong>Heavy on-road vehicles:</strong> Vehicles over 4.5 tonnes GVM travelling on public roads — at the reduced on-road rate.</li>
          <li><strong>Marine and rail:</strong> Specific rules apply; check ATO guidance.</li>
        </ul>
        <p>Common exclusions and reductions:</p>
        <ul>
          <li>Private or domestic use of fuel</li>
          <li>Light vehicles (cars, utes under 4.5 tonnes GVM) on public roads</li>
          <li>Fuel used in vehicles that do not meet environmental criteria (for some periods)</li>
          <li>Mixed use — you must apportion between eligible and ineligible use</li>
        </ul>

        <h2>Record-Keeping for BAS Claims</h2>
        <p>
          The ATO requires you to keep records that show you acquired the fuel, used it in an eligible activity, and applied the correct rate. Acceptable records include tax invoices, fuel card statements, logbooks, equipment hour meters, and allocation worksheets. For mixed-use fuel, document your apportionment method — for example, based on odometer readings, hour meters, or a reasonable estimate supported by evidence.
        </p>
        <p>
          Fuel tax credits are reported on your BAS. If you report quarterly, calculate FTC for each fuel type and activity in that quarter. Annual reporters aggregate annually. Mistakes can trigger amended BAS lodgements and interest — which is why this calculator emphasises verifying rates on the ATO site before you lodge.
        </p>

        <h2>FTC vs GST on Fuel Purchases</h2>
        <p>
          Fuel tax credits and GST input tax credits are separate. When you buy fuel for business, you may be able to claim GST on the purchase (if you are GST-registered and the acquisition is creditable) <em>and</em> claim FTC on the excise component — but the rules interact and apportionment applies. FTC reduces your BAS liability in the fuel tax credits field; GST credits reduce GST payable on purchases. Do not double-count. If you are unsure, consult a registered BAS or tax agent.
        </p>

        <h2>Planning with This Calculator</h2>
        <p>
          Use this tool to estimate quarterly or annual FTC before cash-flow planning — for example, forecasting how much excise you will recover on a harvest season&apos;s diesel consumption, or comparing off-road vs on-road fleet costs. Add a second fuel line when you use both diesel in machinery and LPG in forklifts, each at different rates. Override presets with the exact cents-per-unit from the ATO table for your claim period.
        </p>
        <p>
          For personal and fleet fuel <em>cost</em> estimates (not tax credits), see our{" "}
          <Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link>,{" "}
          <Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link>, and{" "}
          <Link href="/calculators/generator-fuel-calculator">Generator Fuel Calculator</Link>. US and Canadian interstate carriers should use the{" "}
          <Link href="/calculators/ifta-fuel-tax-calculator">IFTA Fuel Tax Calculator</Link> instead.
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

      <YMYLDisclaimer type="tax" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
