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
import TripFuelCalc from "./TripFuelCalc";
import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_PETROL_PRICE_AUD_PER_L, DIESEL_BY_CITY, PETROL_BY_CITY, REGIONAL_AVERAGE, SOURCE_REPORT } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";
import { ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT } from "./estimateFuelCostTool";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const REGIONAL = REGIONAL_AVERAGE.petrol / 100;
const tripCost = (km: number, l100: number, price = PETROL) => (km / 100) * l100 * price;

export const metadata: Metadata = {
  title: "Trip Fuel Cost Calculator: Road Trip Petrol Cost",
  description: `Road trip fuel cost calculator for Australia: litres and dollars for any trip, return or carpool split. 880 km at 8 L/100km costs ${aud(tripCost(880, 8))} at ${perLitre(PETROL)}/L (ACCC average).`,
  alternates: { canonical: "/calculators/trip-fuel-cost-calculator" },
};

const relatedTools = [
  { title: "Boat Trip Fuel Planner", slug: "boat-fuel-calculator", description: "Plan marine fuel, cost and safe range." },
  { title: "Towing Fuel Cost Calculator", slug: "towing-fuel-cost-calculator", description: "Extra fuel cost when towing a trailer or caravan." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan weekly and monthly fuel spend." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total trip cost of driving versus flying." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See savings from better fuel economy." },
  { title: "Motorcycle Fuel Cost Calculator", slug: "motorcycle-fuel-cost-calculator", description: "Fuel cost for motorcycle trips." },
];

const faqs = [
  { question: "How do I calculate fuel cost for a road trip?", answer: `Litres = distance ÷ 100 × L/100km; cost = litres × price per litre. An 880 km drive in a car using 8 L/100km uses 70.4 litres — ${aud(tripCost(880, 8))} at the ACCC five-city petrol average of ${perLitre(PETROL)}/L. This calculator does the maths and adds return trips and splitting between passengers.` },
  { question: "How much does it cost to drive 100 km?", answer: `Your L/100km times the price per litre. At ${perLitre(PETROL)}/L: ${aud(tripCost(100, 6), 2)} in a 6 L/100km small car, ${aud(tripCost(100, 8), 2)} at 8 L/100km and ${aud(tripCost(100, 11), 2)} in an 11 L/100km large SUV.` },
  { question: "Is petrol more expensive in the country?", answer: `Usually. The ACCC's regional average across the 190+ regional locations it monitors was ${REGIONAL_AVERAGE.petrol.toFixed(1)} cpl for petrol in the latest report, against ${(PETROL * 100).toFixed(1)} cpl in the five largest cities. For long trips through regional areas, pricing the whole trip at the regional average (${perLitre(REGIONAL)}/L) is a sensible buffer.` },
  { question: "How do I convert MPG to L/100km?", answer: "Divide 235.21 by US MPG (or 282.48 by UK MPG). For example, 30 US MPG = 235.21 ÷ 30 = 7.8 L/100km. The calculator also accepts miles and MPG directly — switch the unit toggle." },
  { question: "Does driving speed affect fuel cost?", answer: "Yes. Aerodynamic drag rises with the square of speed, so highway consumption climbs noticeably between 90 and 110 km/h. On a long trip, sitting a little below the limit is one of the cheapest ways to cut the fuel bill — at the cost of some extra time." },
];

const howToSteps = [
  { name: "Units", text: "Kilometres and L/100km are the default. Switch to miles and MPG only if your figures are in those units." },
  { name: "Enter trip distance", text: "Type the one-way distance from your maps app. Choose return to double it." },
  { name: "Enter fuel use", text: "Use your car's real-world L/100km from the trip computer or a few full-tank fills; the official Green Vehicle Guide figure is a fair starting point." },
  { name: "Enter fuel price", text: "The price starts at the ACCC five-city average. Use your state's fuel price app for local prices, and allow more for regional areas." },
  { name: "Review the breakdown", text: "The calculator shows litres used, total cost and cost per km, and can split the cost between passengers." },
];

export default function TripFuelCostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Trip Fuel Cost Calculator"
        description="Road trip fuel cost calculator for Australia: litres and dollars for any trip from distance, L/100km and the petrol price, with return and carpool options."
        url="https://calcfuel.com/calculators/trip-fuel-cost-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Trip Fuel Cost Calculator", url: "https://calcfuel.com/calculators/trip-fuel-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/trip-fuel-cost-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Trip Fuel Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Trip Fuel Cost Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Decide what a road trip, commute, or carpool will cost in fuel. Modes cover one-way, return, weekly commute, and cost-per-person splits.
      </p>
      <AnswerFirst
        question="how much fuel will my trip cost?"
        points={[
          <>Cost = km ÷ 100 × L/100km × price per litre.</>,
          <>880 km at 8 L/100km: <strong>70.4 L</strong>, about <strong>{aud(tripCost(880, 8))}</strong> one way at {perLitre(PETROL)}/L.</>,
          <>Through regional areas, budget at the ACCC regional average of {perLitre(REGIONAL)}/L: {aud(tripCost(880, 8, REGIONAL))}.</>,
        ]}
      >
        <p>
          Every 100 km costs about <strong>{aud(tripCost(100, 8), 2)}</strong> in a car using 8 L/100km at the
          five-city petrol average.
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/trip-fuel-cost-calculator" />
      <TripFuelCalc />
      <script
        id="estimate-fuel-cost-webmcp"
        dangerouslySetInnerHTML={{ __html: ESTIMATE_FUEL_COST_BOOTSTRAP_SCRIPT }}
      />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>How to calculate road trip fuel cost</h2>
        <p>You need three numbers: how far you are driving, how much fuel your vehicle uses, and what fuel costs. In Australia that means kilometres, litres per 100 km (L/100km) and dollars per litre.</p>
        <p><strong>Litres used = distance ÷ 100 × L/100km. Cost = litres × price per litre.</strong> For example, a 600 km trip in a car using 8 L/100km uses 48 litres, which costs {aud(tripCost(600, 8), 2)} at {perLitre(PETROL)}/L.</p>
        <p>If your figures are in miles per gallon, switch the calculator to miles/MPG, or convert: L/100km = 235.21 ÷ US MPG.</p>

        <h2>What changes the fuel bill</h2>
        <h3>Your real fuel use</h3>
        <p>Official figures come from a laboratory test and are usually lower than what you will see on a loaded road trip. Your trip computer, or litres bought divided by kilometres driven over a few full-tank fills, gives a better number.</p>
        <h3>Speed</h3>
        <p>Aerodynamic drag rises with the square of speed, so consumption climbs quickly between 90 and 110 km/h — and faster still with a roof box, bikes or a trailer. Sitting a little under the limit is the cheapest saving on a long trip.</p>
        <h3>Load, terrain and air-conditioning</h3>
        <p>Passengers, luggage, hills and air-conditioning all add to consumption. Remove an empty roof rack before a long trip, and check tyre pressures cold against the placard for the load you are carrying. If you are towing, use the <Link href="/calculators/towing-fuel-cost-calculator">towing fuel calculator</Link> instead.</p>

        <h2>Petrol and diesel prices by city</h2>
        <p>Average retail prices on {SOURCE_REPORT.pricesToLabel}, from the ACCC&rsquo;s weekly fuel price report. Regional prices are usually higher: the ACCC regional average was {REGIONAL_AVERAGE.petrol.toFixed(1)} cpl for petrol and {REGIONAL_AVERAGE.diesel.toFixed(1)} cpl for diesel.</p>
        <table>
          <thead><tr><th>City</th><th>Petrol (ULP 91), cpl</th><th>Diesel, cpl</th></tr></thead>
          <tbody>
            {PETROL_BY_CITY.map((p) => (
              <tr key={p.city}><td>{p.city}</td><td>{p.average.toFixed(1)}</td><td>{DIESEL_BY_CITY.find((d) => d.city === p.city)?.average.toFixed(1) ?? "—"}</td></tr>
            ))}
          </tbody>
        </table>
        <p>More detail, including the excise timeline, is on our <Link href="/data/australian-fuel-prices">Australian fuel price data</Link> page.</p>

        <h2>Tips to cut road trip fuel costs</h2>
        <ol>
          <li><strong>Check tyre pressures</strong> cold, at the placard pressure for a loaded car.</li>
          <li><strong>Use cruise control</strong> on flat highways to hold a steady speed.</li>
          <li><strong>Plan fuel stops.</strong> Use your state&rsquo;s fuel price app (FuelCheck in NSW, FuelWatch in WA, and the equivalents in other states) and fill up in larger towns before remote stretches.</li>
          <li><strong>Time city fill-ups.</strong> In the five largest cities prices move in a weekly cycle — see <Link href="/blog/best-time-to-buy-petrol-australia">the best time to buy petrol</Link>.</li>
          <li><strong>Reduce drag.</strong> Take off roof racks and carriers you do not need.</li>
        </ol>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["trip-fuel-cost-calculator"]} />

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

      <CalcDisclaimer domain="road" />
      <RelatedTools tools={relatedTools} />
      <RelatedGuides guides={[
        { title: "Australia road trip fuel cost FAQ", slug: "australia-road-trip-fuel-cost-faq", href: "/guides/australia-road-trip-fuel-cost-faq", description: "Plain answers to real planning questions — Brisbane to Cairns, campervans, Highway 1." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly price cycle explained — save $150–$440/year by timing your fill-ups." },
        { title: "Understanding Fuel Economy: MPG vs L/100km", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Convert between MPG and L/100km and calculate real fuel costs." },
        { title: "Caravan Fuel Consumption Australia", slug: "caravan-fuel-consumption-australia", description: "Real-world L/100km figures and tips for towing fuel costs." },
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing." },
      ]} />
    </div>
  );
}
