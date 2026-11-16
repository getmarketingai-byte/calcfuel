import { reviewIsoFor } from "@/lib/editorial";
import WorkedExample from "@/components/calc/WorkedExample";
import { WORKED_EXAMPLES } from "@/content/worked-examples";
import CalcDisclaimer from "@/components/calc/CalcDisclaimer";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import { FIVE_CITY_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";
import EvVsGasCalc from "./EvVsGasCalc";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { DMO_RANGE, DMO_SOURCE, PUBLIC_DC_EXAMPLE } from "@/lib/electricity-prices";
import { aud, perLitre } from "@/lib/format";

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const EV100 = (rate: number) => 18 * rate;
const P100 = 8 * PETROL;

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "EV vs Petrol Cost Calculator (Australia)",
  description: "Compare EV and petrol total cost over 5 or 10 years — energy, servicing and insurance, not just cents per kilometre. Australian prices.",
  alternates: { canonical: "/calculators/ev-vs-gas-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "Payback on a more fuel-efficient car." },
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime and fuel needed for outages." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "Compare running costs of hybrid vs petrol vehicles." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate how much fuel you waste idling." },
];

const faqs = [
  {
    question: "Is an EV cheaper to run than a petrol car?",
    answer: `On energy, yes, if you charge mostly at home. At 18 kWh/100km an EV costs ${aud(EV100(DMO_RANGE.low), 2)}–${aud(EV100(DMO_RANGE.high), 2)} per 100 km at the AER's 2026–27 Default Market Offer all-in averages (${(DMO_RANGE.low * 100).toFixed(1)}–${(DMO_RANGE.high * 100).toFixed(1)}c/kWh, including supply charges), against ${aud(P100, 2)} for an 8 L/100km petrol car at the ACCC five-city average of ${perLitre(PETROL)}/L. Off-peak or solar charging costs less; public fast charging at a published $${PUBLIC_DC_EXAMPLE.pricePerKwh.toFixed(2)}/kWh costs ${aud(EV100(PUBLIC_DC_EXAMPLE.pricePerKwh), 2)}.`,
  },
  { question: "Is an EV cheaper than a petrol car over 5 years?", answer: "It depends on the purchase price gap, how far you drive and where you charge. The calculator adds energy, servicing and insurance year by year against the price difference. High-kilometre drivers who charge at home recover a price premium fastest; low-kilometre drivers who rely on public chargers may not recover it within five years." },
  { question: "Are there EV incentives in Australia?", answer: "Some, and they change. The federal FBT exemption for eligible electric cars provided through salary packaging, and state measures such as registration or stamp duty concessions, vary by vehicle price and state. This calculator does not include incentives — subtract any you are eligible for from the EV purchase price, after checking the current rules with the ATO and your state transport authority." },
  { question: "What electricity price should I use?", answer: "The usage rate on your bill for the hours you charge. If you charge overnight on a time-of-use plan, use the off-peak rate; with solar, the feed-in tariff you give up. The default here is the lowest AER Default Market Offer all-in average, which includes the daily supply charge and so is an upper reference for home charging." },
  { question: "Are EVs cheaper to service?", answer: "Usually. An EV has no engine oil, spark plugs or exhaust, and regenerative braking reduces brake wear, so scheduled servicing is typically simpler. Tyres can wear faster because EVs are heavy. Compare the capped-price servicing schedules manufacturers publish for the exact models you are considering and enter them in the calculator." },
];

const howToSteps = [
  { name: "Select unit system and time horizon", text: "The calculator opens in km and AUD; miles are available if your figures are imperial. Select 5 or 10 years for the comparison period — 10 years better reflects the full lifecycle advantage of an EV." },
  { name: "Enter annual distance driven", text: "Enter how many miles or km you drive annually. Higher annual distance increases the relative advantage of EVs due to lower per-km fuel costs." },
  { name: "Enter petrol vehicle details", text: "Enter the petrol car's purchase price, fuel economy (MPG or L/100km), current petrol price, and estimated annual maintenance and insurance costs." },
  { name: "Enter EV details", text: "Enter the EV's purchase price, efficiency in miles per kWh or kWh per 100km, your home electricity rate, and estimated annual maintenance and insurance." },
  { name: "Compare total costs and break-even", text: "The calculator shows the total cost of ownership for each vehicle and the break-even year when the EV becomes cheaper on a cumulative basis." },
];

export default function EvVsGasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="EV vs Petrol Cost Calculator"
        description="Compare electric vehicle vs petrol car total cost of ownership over 5 or 10 years including purchase, fuel/electricity, maintenance, and insurance."
        url="https://calcfuel.com/calculators/ev-vs-gas-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "EV vs Petrol Cost Calculator", url: "https://calcfuel.com/calculators/ev-vs-gas-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/ev-vs-gas-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>EV vs Petrol Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">EV vs Petrol Cost Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Compare the total 5-year or 10-year cost of owning an electric vehicle versus a petrol car, including purchase price, fuel, maintenance, and insurance.</p>
      <CalcReviewedBy path="/calculators/ev-vs-gas-calculator" />
      <EvVsGasCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>EV vs Petrol Car: Total Cost of Ownership Explained</h2>
        <p>When comparing electric vehicles to petrol cars, the sticker price tells only part of the story. Total Cost of Ownership (TCO) encompasses every dollar you spend on a vehicle over its life: purchase price, fuel or electricity, routine maintenance, insurance, and eventually depreciation and resale value. For most buyers making a 5–10 year ownership decision, TCO is the most financially rational comparison metric.</p>
        <p>EVs often cost more upfront than a comparable petrol car and try to recoup the difference through lower running costs. The key variables that determine whether an EV breaks even within your ownership period are: how many kilometres or miles you drive annually, the difference between your local electricity rate and petrol/petrol price, and the maintenance cost differential.</p>

        <p>The petrol price you compare against matters more than any other input here. Unleaded averaged {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl across the five largest capital cities on {SOURCE_REPORT.pricesToLabel} and diesel {FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl — see our <a href="/data/australian-fuel-prices">Australian fuel price data</a> for the per-city figures and the 2026 excise timeline. For manufacturer efficiency ratings, the <a href="https://www.energyrating.gov.au/" target="_blank" rel="noopener noreferrer">Australian Energy Rating database</a> is the primary source.</p>

        <h2>What goes into the five-year cost?</h2>
        <h3>Purchase price</h3>
        <p>Usually the largest single difference. Enter drive-away prices for the two exact vehicles you are comparing, after any incentive you are eligible for. EV prices in Australia have moved a lot as more brands have entered the market, so use current quotes rather than list prices from a review.</p>

        <h3>Energy: electricity vs petrol</h3>
        <p>At 18 kWh/100km an EV costs {aud(EV100(DMO_RANGE.low), 2)} per 100 km at {(DMO_RANGE.low * 100).toFixed(1)}c/kWh — the lowest of the AER&rsquo;s 2026–27 Default Market Offer all-in averages — and {aud(EV100(DMO_RANGE.high), 2)} at the highest. An 8 L/100km petrol car costs {aud(P100, 2)} at the ACCC five-city average of {perLitre(PETROL)}/L. Over 15,000 km that gap is {aud(150 * (P100 - EV100(DMO_RANGE.high)))}–{aud(150 * (P100 - EV100(DMO_RANGE.low)))} a year, and more on off-peak or solar charging. Relying on public fast chargers, priced at ${PUBLIC_DC_EXAMPLE.pricePerKwh.toFixed(2)}/kWh at one published Geelong site, narrows it sharply. Electricity source: <a href={DMO_SOURCE.url} target="_blank" rel="noopener noreferrer">{DMO_SOURCE.name}</a>.</p>

        <h3>Servicing</h3>
        <p>EVs skip oil changes, spark plugs and exhaust work, and regenerative braking eases brake wear, but they are heavy and can wear tyres faster. Use each manufacturer&rsquo;s published capped-price servicing for the exact models rather than a rule of thumb.</p>

        <h3>Insurance</h3>
        <p>Premiums depend on the vehicle&rsquo;s value, repair costs, your postcode and driving history. Get quotes for both cars and enter them; the pre-filled figures are placeholders only.</p>

        <h2>When Does an EV Break Even?</h2>
        <p>Break-even is the year cumulative savings on energy and servicing equal the purchase-price premium: premium ÷ annual saving. A $10,000 premium with $2,500 a year in combined savings breaks even in year four; the same premium with $1,000 a year of savings takes ten years. Lower-kilometre drivers, or those who charge mostly at public fast chargers, may not break even within a typical ownership period.</p>
        <p>The calculator shows break-even year automatically — use this to determine whether your driving profile makes an EV financially attractive within your intended ownership period.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["ev-vs-gas-calculator"]} />

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

      <CalcDisclaimer domain="electric" />
      <RelatedTools tools={relatedTools} />
      <RelatedGuides guides={[
        { title: "EV Charging Cost Australia: Home vs Public Charging", slug: "ev-charging-cost-australia", description: "Compare home, public, and fast charging costs for popular EVs in Australia." },
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly petrol price cycle explained — which day is cheapest." },
        { title: "MPG to L/100km: Converter and Explainer", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Convert MPG or km/L to L/100km." },
      ]} />
    </div>
  );
}
