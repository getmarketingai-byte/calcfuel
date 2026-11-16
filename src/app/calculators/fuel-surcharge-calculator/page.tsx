import { reviewIsoFor } from "@/lib/editorial";
import WorkedExample from "@/components/calc/WorkedExample";
import { WORKED_EXAMPLES } from "@/content/worked-examples";
import CalcDisclaimer from "@/components/calc/CalcDisclaimer";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import FuelSurchargeCalc from "./FuelSurchargeCalc";
import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_DIESEL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";
import BarChart from "@/components/charts/BarChart";
import { CARRIER_SURCHARGES, CARRIER_SURCHARGES_CHECKED } from "@/lib/carrier-surcharges";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
/** Example contract terms used throughout the page — not an industry standard. */
const EX = { base: 1.5, l100: 36, km: 880, linehaul: 2500 };
const exPerKm = ((DIESEL - EX.base) * EX.l100) / 100;
const ST = CARRIER_SURCHARGES.find((c) => c.id === "startrack")!;
const TGE_PAL = CARRIER_SURCHARGES.find((c) => c.id === "tge-pallet")!;
const AP = CARRIER_SURCHARGES.find((c) => c.id === "auspost")!;

export const metadata: Metadata = {
  title: "Fuel Surcharge Calculator: Freight, Courier Levy",
  description: `Check a freight fuel levy in AU terms: (diesel − contract base price) × L/100km. At ${perLitre(DIESEL)}/L diesel (ACCC) a 36 L/100km truck on a $1.50 base adds ${aud(exPerKm, 2)}/km.`,
  alternates: { canonical: "/calculators/fuel-surcharge-calculator" },
};

const relatedTools = [
  {
    title: "Trip Fuel Cost Calculator",
    slug: "trip-fuel-cost-calculator",
    description: "Fuel cost for any road trip by distance, L/100km and price.",
  },
  {
    title: "Generator Fuel Calculator",
    slug: "generator-fuel-calculator",
    description: "Calculate generator runtime and fuel consumption for any wattage and fuel type.",
  },
  {
    title: "Fuel Economy Savings Calculator",
    slug: "fuel-economy-savings-calculator",
    description: "What a more efficient vehicle saves you each year.",
  },
  {
    title: "Idling Fuel Waste Calculator",
    slug: "idling-fuel-waste-calculator",
    description: "Find out how much fuel and money is wasted by engine idling each day.",
  },
  {
    title: "Fuel Budget Planner",
    slug: "fuel-budget-planner",
    description: "Plan your weekly and monthly fuel budget.",
  },
];

const faqs = [
  {
    question: "How is a fuel surcharge calculated?",
    answer: `The common distance-based method: subtract the contract's base diesel price from the current price, multiply by the truck's fuel use in litres per kilometre, and multiply by the distance. With a $1.50/L base, a truck using 36 L/100km and diesel at the ACCC five-city average of ${perLitre(DIESEL)}/L, the levy is ${aud(exPerKm, 3)} per km — ${aud(exPerKm * EX.km)} on an ${EX.km} km run. Your contract may use a different method; it should say which.`,
  },
  {
    question: "Why do freight carriers charge a fuel levy?",
    answer: "Diesel is one of a road carrier's largest costs and its price moves every week, while freight rates are often agreed months in advance. A fuel levy linked to a published diesel price lets the rate follow fuel up and down without renegotiating the whole contract.",
  },
  {
    question: "Which diesel price should a fuel levy use?",
    answer: "Whatever the contract names, and it should name one precisely: the source, the fuel (retail or terminal gate price), the location or average, and the date or week it is read. The ACCC publishes weekly retail averages for the five largest cities, which is what this calculator starts from; many freight contracts instead reference terminal gate prices or the carrier's own published schedule.",
  },
  {
    question: "Is a fuel surcharge a percentage or a rate per km?",
    answer: "Both are common. Courier and parcel carriers — Team Global Express, StarTrack, Australia Post — publish a percentage of the freight charge that they revise weekly or monthly. Line-haul contracts more often use a per-km levy tied to the diesel price, which is easier to check because each input is visible. This calculator handles both, plus contracts that fix the levy in dollars per kilometre.",
  },
  {
    question: "What are courier fuel surcharges in Australia right now?",
    answer: `As published on ${CARRIER_SURCHARGES_CHECKED}: Team Global Express ${TGE_PAL.percent}% on Palletised Express and ${CARRIER_SURCHARGES[1].percent}% on Express Parcels Road (${TGE_PAL.period}); StarTrack Express and Premium ${ST.percent}% (${ST.period}); Australia Post ${AP.percent}% (${AP.period}). Each is a percentage added to the freight charge, and each carrier revises it weekly or monthly as diesel moves.`,
  },
  {
    question: "What does a 24% fuel surcharge add to a courier bill?",
    answer: "Multiply the freight charge by the percentage. A $40 consignment at 24.2% carries a $9.68 fuel surcharge, so $49.68 before GST. Use the Carrier % levy mode above with your own freight charge or contract rate.",
  },
  {
    question: "Is this the same as the trip fuel cost calculator?",
    answer: "No. The trip calculator answers what fuel will cost you to drive somewhere. This calculator answers what a carrier may charge — or what you should charge a customer — on top of an agreed freight rate when diesel moves above the contract's base price, or what a courier's published percentage adds to an invoice.",
  },
  {
    question: "What fuel use should I enter for a truck?",
    answer: "Use the vehicle's measured average from fuel records if you have it — litres purchased divided by kilometres travelled, times 100. A heavy truck's consumption varies a great deal with load, combination, terrain and speed, so a contract figure that is even a few L/100km off the real number shifts every invoice.",
  },
];

const howToSteps = [
  { name: "Enter the base freight rate", text: "The freight charge before any fuel levy, as agreed in the contract or quote." },
  { name: "Choose the method", text: "Per-km formula if the levy follows the diesel price; flat rate per km if the contract fixes it; carrier % levy for courier and parcel invoices." },
  { name: "Enter diesel prices", text: "The current diesel price ($/L) — it starts at the ACCC five-city average — and the base price written in the contract." },
  { name: "Enter fuel use and distance", text: "The truck's fuel use in L/100km and the trip distance in kilometres." },
  { name: "Check the breakdown", text: "The calculator shows levy per km, total levy, invoice total and the levy as a percentage of the base rate." },
];

export default function FuelSurchargePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Surcharge Calculator"
        description="Freight fuel levy calculator in Australian units: levy per km from the diesel price, a contract base price and L/100km, or a flat rate per km."
        url="https://calcfuel.com/calculators/fuel-surcharge-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Fuel Surcharge Calculator", url: "https://calcfuel.com/calculators/fuel-surcharge-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/fuel-surcharge-calculator")}
      />

      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link>
        <span className="mx-2">/</span>
        <span>Fuel Surcharge Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel Surcharge Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        For businesses that send or carry freight: check the fuel levy on an invoice, or set one for your own customers. Use the per-km diesel formula, a flat rate per km, or a courier&rsquo;s published percentage. (Working out what your own car trip will cost in fuel? That is the <Link href="/calculators/trip-fuel-cost-calculator" className="underline">trip fuel cost calculator</Link>.)
      </p>
      <AnswerFirst
        question="how much is a fuel levy per km?"
        points={[
          <>Levy per km = (current diesel − base price) × L/100km ÷ 100.</>,
          <>Example: base {aud(EX.base, 2)}/L, {EX.l100} L/100km, diesel {perLitre(DIESEL)}/L → <strong>{aud(exPerKm, 3)}/km</strong>.</>,
          <>On an {EX.km} km run with a {aud(EX.linehaul)} base rate: <strong>{aud(exPerKm * EX.km)}</strong> levy, {((exPerKm * EX.km) / EX.linehaul * 100).toFixed(1)}% of the base.</>,
        ]}
      >
        <p>
          The base price and fuel figure here are examples only — use the ones in your contract. Diesel is the ACCC
          five-city retail average; many freight contracts reference a different published price.
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/fuel-surcharge-calculator" />

      <FuelSurchargeCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>What Australian carriers are charging now</h2>
        <p>Courier and parcel carriers publish their fuel surcharge as a percentage of the freight charge. These are the current published rates, checked {CARRIER_SURCHARGES_CHECKED}. Each carrier sets its own method, so the numbers are not directly comparable — palletised freight carries a much higher fuel share than parcels.</p>
        <BarChart
          title="Published carrier fuel surcharges, November 2026"
          description={`Fuel surcharge percentages published by Team Global Express, StarTrack and Australia Post, checked ${CARRIER_SURCHARGES_CHECKED}.`}
          data={CARRIER_SURCHARGES.map((c) => ({ label: `${c.carrier} ${c.service}`, value: c.percent }))}
          unitSuffix="%"
          precision={2}
          seriesLabel="Fuel surcharge"
        />
        <div className="overflow-x-auto not-prose my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">Published fuel surcharges, checked {CARRIER_SURCHARGES_CHECKED}. Rates change weekly or monthly — confirm on the carrier&rsquo;s page before invoicing.</caption>
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
                <th className="py-2 pr-3">Carrier and service</th>
                <th className="py-2 pr-3">Surcharge</th>
                <th className="py-2 pr-3">Period</th>
                <th className="py-2">Linked to</th>
              </tr>
            </thead>
            <tbody>
              {CARRIER_SURCHARGES.map((c) => (
                <tr key={c.id} className="border-b border-gray-200 dark:border-gray-700 align-top">
                  <td className="py-2 pr-3"><a href={c.url} target="_blank" rel="noopener noreferrer" className="underline">{c.carrier} — {c.service}</a></td>
                  <td className="py-2 pr-3 font-semibold">{c.percent}%</td>
                  <td className="py-2 pr-3">{c.period}</td>
                  <td className="py-2">{c.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>On a {aud(EX.linehaul)} palletised consignment, the Team Global Express rate adds {aud((EX.linehaul * TGE_PAL.percent) / 100)}. The per-km formula on the same {EX.km} km run, with the example contract terms above, adds {aud(exPerKm * EX.km)} — a reminder that a percentage levy and a diesel-linked per-km levy can land a long way apart, so check which one your agreement uses.</p>

        <h2>How freight fuel levies work</h2>
        <p>
          A fuel levy (or fuel surcharge) is a separate line on a freight invoice that moves with the price of
          diesel. Carriers use it because fuel is one of their largest and most volatile costs, while base rates
          are often fixed for months. Linking part of the charge to a published diesel price keeps the base rate
          stable and shares fuel price risk transparently.
        </p>
        <p>
          The levy only works if both sides can reproduce it. That means the contract has to name the method, the
          diesel price series and when it is read, the base price, and — for distance-based levies — the fuel
          consumption figure.
        </p>

        <h2>The per-km formula</h2>
        <p>
          <strong>Levy per km = (current diesel $/L − base diesel $/L) × L/100km ÷ 100.</strong> The first part is
          how much more each litre costs than the price the base rate was set at; the second converts litres to
          kilometres. With the example terms above — a {aud(EX.base, 2)}/L base and {EX.l100} L/100km — every 10c/L
          rise in diesel adds {aud((0.1 * EX.l100) / 100, 3)} per km, or {aud(((0.1 * EX.l100) / 100) * EX.km)} on an{" "}
          {EX.km} km run.
        </p>
        <p>
          If diesel falls to or below the base price, the levy is zero. Some contracts also allow a negative
          adjustment (a credit) in that case; the calculator shows zero, so check your terms.
        </p>

        <h2>Percentage levies and published schedules</h2>
        <p>
          Many carriers publish a fuel levy as a percentage of the freight charge, updated weekly or monthly from
          a diesel index. Percentage levies are simpler to apply to mixed consignments but harder to audit,
          because the link to fuel use per kilometre is hidden in the schedule. To check one, work out the per-km
          levy with this calculator, convert it to a percentage of a typical linehaul rate, and compare.
        </p>

        <h2>Which diesel price?</h2>
        <p>
          The ACCC publishes weekly average retail diesel prices for Sydney, Melbourne, Brisbane, Adelaide and
          Perth — currently {perLitre(DIESEL)}/L across the five cities. Fleet operators often pay less than
          retail through fuel cards or bulk supply, and many freight contracts reference terminal gate prices
          instead. The levy is only as fair as the price series behind it, so agree on one in writing. See our{" "}
          <Link href="/data/australian-fuel-prices">Australian fuel price data</Link> for the current figures.
        </p>

        <h2>Getting the fuel figure right</h2>
        <p>
          The consumption figure matters as much as the price. In the formula, a truck recorded at 40 L/100km
          instead of 36 increases every levy by about 11%. Use the vehicle&rsquo;s measured average from fuel
          records — litres bought divided by kilometres travelled, times 100 — over a representative period, and
          review it when the fleet, loads or routes change.
        </p>

        <h2>Checking an invoice</h2>
        <ul>
          <li>Confirm the diesel price used matches the series and week the contract names.</li>
          <li>Confirm the base price has not drifted from the one in the signed agreement.</li>
          <li>Check that the distance is the agreed distance, not the driven distance including deadhead, unless the contract says otherwise.</li>
          <li>Recalculate the levy and compare with the line on the invoice.</li>
        </ul>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                {faq.question}
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <WorkedExample {...WORKED_EXAMPLES["fuel-surcharge-calculator"]} />

      <CalcDisclaimer domain="logistics" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
