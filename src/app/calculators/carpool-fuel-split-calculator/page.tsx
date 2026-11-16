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
import CarpoolFuelSplitCalc from "./CarpoolFuelSplitCalc";
import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const total = (km: number, l100: number) => (km / 100) * l100 * PETROL;
const split = (km: number, l100: number, people: number, surcharge = 0) => {
  const t = total(km, l100);
  const passenger = (t / people) * (1 + surcharge / 100);
  return { t, equal: t / people, passenger, driver: t - passenger * (people - 1) };
};
const EX = split(320, 8, 4, 10);

export const metadata: Metadata = {
  title: "Carpool Calculator: Split Petrol Costs Fairly",
  description: `Split petrol costs between driver and passengers, with an optional driver share. 320 km at 8 L/100km is ${aud(EX.t, 2)} at ${perLitre(PETROL)}/L (ACCC) — ${aud(EX.equal, 2)} each for four.`,
  alternates: { canonical: "/calculators/carpool-fuel-split-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Fuel cost for any road trip by distance, L/100km and price." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily, weekly, and annual commute fuel costs." },
  { title: "EV vs Petrol Cost Calculator", slug: "ev-vs-gas-calculator", description: "Compare 5-year and 10-year total cost of ownership for EVs and petrol cars." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "What a more efficient vehicle saves you each year." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate how much fuel you waste idling." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your weekly and monthly fuel budget." },
];

const faqs = [
  {
    question: "How do you split petrol costs in a carpool?",
    answer: `Work out the trip's fuel cost — km ÷ 100 × L/100km × price per litre — and divide by everyone in the car, driver included. A 150 km trip at 8 L/100km costs ${aud(split(150, 8, 3).t, 2)} at ${perLitre(PETROL)}/L, or ${aud(split(150, 8, 3).equal, 2)} each for three people.`,
  },
  {
    question: "Should the driver pay a share of the petrol?",
    answer: "In a straight cost-share, yes — everyone pays an equal share because the car would make the trip anyway. Many groups add a driver share on top, so passengers pay a little more and the driver less, to recognise wear, tyres, servicing and the driver's time. Agree which before you leave.",
  },
  {
    question: "What is a fair driver surcharge?",
    answer: `There is no official figure; it is whatever the group agrees. For reference, a 10% surcharge on a ${aud(EX.t, 2)} four-person trip means each passenger pays ${aud(EX.passenger, 2)} instead of ${aud(EX.equal, 2)} and the driver pays ${aud(EX.driver, 2)}. If you want a benchmark for the full cost of running a car, the ATO's cents-per-kilometre rate covers fuel, servicing, insurance and depreciation — far more than fuel alone.`,
  },
  {
    question: "How is the surcharge split calculated?",
    answer: "Each passenger pays (total ÷ number of people) × (1 + surcharge %). The driver pays whatever is left: total − passengers × their share. The calculator shows the equal split and the surcharge split side by side.",
  },
  {
    question: "How much does carpooling save?",
    answer: `A commuter driving 40 km a day, five days a week at 8 L/100km spends about ${aud(total(200, 8) * 48)} a year on fuel over 48 working weeks at ${perLitre(PETROL)}/L. Sharing equally with two colleagues cuts that to about ${aud((total(200, 8) * 48) / 3)} each.`,
  },
];

const howToSteps = [
  {
    name: "Choose your unit system",
    text: "Kilometres and L/100km are the default. Switch to miles and MPG only if your figures are in those units.",
  },
  {
    name: "Enter the trip distance",
    text: "Type the total one-way trip distance. For round trips, double the figure. Use your maps app or GPS navigation for an accurate distance before you depart.",
  },
  {
    name: "Select number of people",
    text: "Choose 2, 3, 4, or 5 from the preset buttons, or tap Custom to enter any number. Include the driver in your count — if there is 1 driver and 2 passengers, enter 3.",
  },
  {
    name: "Enter fuel economy and price",
    text: "Type your car's fuel use in L/100km and the price at the pump. The price starts at the ACCC five-city average; your state fuel price app has local prices.",
  },
  {
    name: "Set an optional driver surcharge",
    text: "If the driver wants compensation for vehicle wear, enter a driver surcharge percentage (e.g. 10%). Leave it at 0 for a pure equal split. The calculator shows both the equal split and the surcharge split side-by-side so everyone can see the breakdown.",
  },
];

export default function CarpoolFuelSplitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Carpool Fuel Cost Calculator"
        description="Free carpooling fuel cost calculator. Split petrol costs fairly between driver and passengers with optional driver surcharge."
        url="https://calcfuel.com/calculators/carpool-fuel-split-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Carpool Fuel Cost Calculator", url: "https://calcfuel.com/calculators/carpool-fuel-split-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/carpool-fuel-split-calculator")}
      />

      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link>
        <span className="mx-2">/</span>
        <span>Carpool Fuel Cost Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Carpool Fuel Cost Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Split petrol costs fairly between driver and passengers. Enter the trip distance, your car&rsquo;s L/100km, the fuel price and the number of people — with an optional driver share for wear.
      </p>
      <AnswerFirst
        question="how much does each person pay?"
        points={[
          <>Total = km ÷ 100 × L/100km × $/L; equal share = total ÷ people (driver included).</>,
          <>320 km at 8 L/100km: <strong>{aud(EX.t, 2)}</strong> total, <strong>{aud(EX.equal, 2)}</strong> each for four.</>,
          <>With a 10% driver share: passengers {aud(EX.passenger, 2)} each, driver {aud(EX.driver, 2)}.</>,
        ]}
      >
        <p>Petrol is priced at the ACCC five-city average, {perLitre(PETROL)}/L; use the price you actually paid for an exact split.</p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/carpool-fuel-split-calculator" />

      <CarpoolFuelSplitCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>The Economics of Carpooling: Why Splitting Fuel Costs Makes Sense</h2>
        <p>
          Carpooling is one of the most powerful yet underused tools for reducing personal transportation costs. When multiple people share a vehicle for a trip, the total fuel cost stays exactly the same — but the cost per person drops dramatically. A $100 tank of petrol shared on a group road trip is $25 each for four people. Over weeks and months, those savings compound into thousands of dollars.
        </p>
        <p>
          The challenge has always been figuring out a split that feels fair to everyone. Should the driver pay the same as passengers? Who covers the cost if someone drops out last minute? What happens when one person's destination is further than another's? This calculator focuses on the most common scenario: a shared trip from A to B where everyone agrees to split the fuel cost.
        </p>

        <h2>How Carpool Fuel Cost Splitting Works</h2>
        <p>
          The calculation has two components: the total fuel cost, and how to divide it.
        </p>
        <p>
          <strong>Total fuel cost:</strong> Multiply L/100km by distance (km), then divide by 100. That gives litres consumed. Multiply by the price per litre. (If your figures are in miles and MPG, switch the unit toggle.)
        </p>
        <p>
          <strong>Equal split:</strong> Divide total cost by the number of people in the car (including the driver). Everyone pays the same amount — fair when the driver has no extra expenses and the trip was happening regardless.
        </p>
        <p>
          <strong>With driver surcharge:</strong> The driver receives an extra percentage of the total fuel cost as compensation for vehicle depreciation, insurance, tyre wear, and the time cost of organising the carpool. Each passenger pays slightly more; the driver pays significantly less. The formula is: each passenger pays <em>(total cost × (1 + surcharge%)) ÷ number of people</em>. The driver pays the remainder.
        </p>

        <h2>The Driver Surcharge: Compensating for Vehicle Wear</h2>
        <p>
          Running a car costs more than fuel. Every kilometre adds tyre and brake wear, servicing and depreciation. The ATO&rsquo;s cents-per-kilometre rate — used for work-related car claims — is a useful reminder of how much more than fuel a car costs to run, although it is a tax rate rather than a carpooling rule.
        </p>
        <p>
          A driver share is a simpler, more socially acceptable way to account for some of those costs without per-kilometre accounting. On the {aud(EX.t, 2)} trip above, a 10% share moves about {aud(EX.equal * 0.1 * 3, 2)} from the driver to the three passengers.
        </p>
        <p>
          Setting the surcharge percentage is a conversation best had upfront. Some groups use a share for occasional long trips and waive it for regular commutes; what matters is that everyone agrees before the trip.
        </p>

        <h2>Carpooling Savings: Real Numbers</h2>
        <p>
          Consider a commute of 40 km a day, five days a week, at 8 L/100km. Driving alone, fuel costs about {aud(total(200, 8), 2)} a week, or {aud(total(200, 8) * 48)} over 48 working weeks at {perLitre(PETROL)}/L. In a three-person carpool with an equal split, each person pays {aud(total(200, 8) / 3, 2)} a week.
        </p>
        <p>
          The numbers grow with distance. An 880 km drive at 8 L/100km uses 70.4 litres, about {aud(total(880, 8))} — {aud(total(880, 8) / 4)} each for four people, before tolls.
        </p>

        <h2>Tips for Fair Carpool Arrangements</h2>
        <ul>
          <li>
            <strong>Agree on the split method before the trip.</strong> Discuss upfront whether you will use an equal split or a driver surcharge. Most disagreements happen when expectations differ rather than from bad intent.
          </li>
          <li>
            <strong>Use actual fuel price, not estimates.</strong> Prices move weekly in the big cities and differ between stations. Use the price you actually paid at the pump for a precise calculation, not an assumed regional average.
          </li>
          <li>
            <strong>Account for detours and pickups.</strong> If the driver goes significantly out of their way to collect passengers, either increase the driver surcharge or calculate the total trip distance including the detour. A 15 km detour at 8 L/100km adds about {aud(total(15, 8), 2)} to the total.
          </li>
          <li>
            <strong>Track costs for recurring carpools.</strong> For regular commutes, run the calculator once and set up a recurring payment schedule. A bank transfer, PayID or a bill-splitting app saves anyone having to ask each week.
          </li>
          <li>
            <strong>Consider tolls and parking separately.</strong> This calculator covers fuel only. For long trips, add toll and parking costs to the total and split them the same way as fuel — it keeps the accounting clean and transparent.
          </li>
          <li>
            <strong>Re-calculate when fuel prices change significantly.</strong> A 20c/L jump changes the split meaningfully on long trips. Recalculate at the pump and adjust the payment to avoid one party consistently subsidising another over time.
          </li>
        </ul>


        <h2>Carpool fuel cost examples</h2>
        <p>
          <strong>Weekend road trip, 4 people, 320 km, 8 L/100km, 10% driver share:</strong> total fuel {((320 / 100) * 8).toFixed(2)} L × {perLitre(PETROL)} = {aud(split(320, 8, 4).t, 2)}. Equal split: {aud(split(320, 8, 4).equal, 2)} each. With the driver share: passengers pay {aud(split(320, 8, 4, 10).passenger, 2)} each, driver pays {aud(split(320, 8, 4, 10).driver, 2)}.
        </p>
        <p>
          <strong>City carpool, 3 people, 45 km, 9 L/100km, 12% driver share:</strong> total fuel {((45 / 100) * 9).toFixed(2)} L × {perLitre(PETROL)} = {aud(split(45, 9, 3).t, 2)}. Equal split: {aud(split(45, 9, 3).equal, 2)} each. With the driver share: passengers pay {aud(split(45, 9, 3, 12).passenger, 2)} each, driver pays {aud(split(45, 9, 3, 12).driver, 2)}.
        </p>
        <p>
          <strong>Regional commute, 5 people, 190 km, 7 L/100km, 15% driver share:</strong> total fuel {((190 / 100) * 7).toFixed(2)} L × {perLitre(PETROL)} = {aud(split(190, 7, 5).t, 2)}. Equal split: {aud(split(190, 7, 5).equal, 2)} each. With the driver share: passengers pay {aud(split(190, 7, 5, 15).passenger, 2)} each, driver pays {aud(split(190, 7, 5, 15).driver, 2)}.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["carpool-fuel-split-calculator"]} />

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
    </div>
  );
}
