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
import DriveVsFlyCalc from "./DriveVsFlyCalc";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
/** Brisbane–Sydney return by road, as in the worked example below. */
const EX_KM = 1830;
const EX_L100 = 8.5;
const EX_TOLLS = 30;
const exFuel = (EX_KM / 100) * EX_L100 * PETROL;
const exDrive = exFuel + EX_TOLLS;

export const metadata: Metadata = {
  title: "Drive vs Fly Calculator: Cheaper for Your Group?",
  description: `Is it cheaper to drive or fly in Australia? Fuel at ${perLitre(PETROL)}/L (ACCC), tolls and wear vs fares, airport parking and car hire — per person.`,
  alternates: { canonical: "/calculators/drive-vs-fly-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Road-trip fuel with commute and carpool modes." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan weekly and monthly fuel spend." },
  { title: "Boat Trip Fuel Planner", slug: "boat-fuel-calculator", description: "Plan marine fuel, cost and safe range." },
  { title: "Towing Fuel Cost Calculator", slug: "towing-fuel-cost-calculator", description: "Extra fuel cost when towing." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "Compare hybrid vs petrol running costs." },
  { title: "Motorcycle Fuel Cost Calculator", slug: "motorcycle-fuel-cost-calculator", description: "Fuel cost for motorcycle trips." },
];

const faqs = [
  {
    question: "Is it cheaper to drive or fly in Australia?",
    answer: `Usually driving, once there are two or more of you and the trip is under a day's drive. Fuel is a per-car cost: a ${EX_KM.toLocaleString("en-AU")} km Brisbane–Sydney return at ${EX_L100} L/100km costs about ${aud(exFuel)} in petrol at today's ${perLitre(PETROL)}/L ACCC average, whoever is in the car. Fares, bags and airport transfers are per person. Flying wins for solo travellers, very long distances, and trips where a day of driving each way costs you more than the fare difference.`,
  },
  {
    question: "How do I work out the break-even airfare?",
    answer: `Add up the drive (fuel, tolls, parking, and wear if you count it), then divide by the number of travellers. For the Brisbane–Sydney example that is ${aud(exDrive)} ÷ 4 = ${aud(exDrive / 4)} each. If a return fare plus your share of bags, airport parking or transfers and any hire car comes to less than that, flying is cheaper. The calculator does this split for you.`,
  },
  {
    question: "What costs do people forget when comparing driving and flying?",
    answer: "On the driving side: tolls, parking at the destination, an overnight stop on long runs, and wear (tyres, servicing, depreciation). On the flying side: checked bags, seat selection, getting to and from both airports, airport parking, and a hire car if you need one at the other end. Time is a real cost on both sides; the calculator lets you put a dollar value on it or leave it out.",
  },
  {
    question: "Should I include wear and tear on my car?",
    answer: "If you want the true cost, yes. Fuel is only part of what each kilometre costs you — tyres, servicing and depreciation scale with distance too. A per-kilometre wear allowance in cents captures that; the ATO's cents-per-kilometre method rate is one published benchmark for the all-in cost of running a car, though it is a tax rate, not a measurement of your car. Set wear to zero for a fuel-only comparison.",
  },
  {
    question: "How does the number of passengers change the answer?",
    answer: `Driving costs barely move with passengers, so the per-head cost falls with every seat filled: ${aud(exDrive)} for the example drive is ${aud(exDrive)} for one, ${aud(exDrive / 2)} each for two and ${aud(exDrive / 4)} each for four. Flying costs scale almost linearly with people. That is why families of three or more almost always find driving cheaper on trips up to around 1,000 km each way.`,
  },
];

const howToSteps = [
  {
    name: "Select unit system",
    text: "Kilometres, litres per 100 km and dollars are the default. Switch to miles and MPG only if your figures are in those units.",
  },
  {
    name: "Enter driving details",
    text: "Enter the one-way trip distance, your car's fuel use in L/100km (or MPG), the fuel price — it starts at the latest ACCC five-city average — number of passengers, toll costs, destination parking, and optionally your hourly time value and hours driving.",
  },
  {
    name: "Enter flying details",
    text: "Enter the number of passengers and the round-trip ticket price per person. Add airport parking days and daily rate. If you need a rental car at your destination, enter the daily rate and number of rental days.",
  },
  {
    name: "Review cost breakdown",
    text: "The calculator shows total driving cost and total flying cost side by side, with a per-person breakdown for each. The cheaper option is highlighted in green.",
  },
  {
    name: "Factor in time value",
    text: "If you entered a time value per hour, the results include an optional time-adjusted comparison. This helps you weigh the financial trade-off against the hours saved or spent on each travel mode.",
  },
];

export default function DriveVsFlyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Drive vs Fly Calculator"
        description="Compare the total cost of driving versus flying for your trip, including fuel, tolls, parking, rental cars, and cost per person."
        url="https://calcfuel.com/calculators/drive-vs-fly-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Drive vs Fly Calculator", url: "https://calcfuel.com/calculators/drive-vs-fly-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/drive-vs-fly-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Drive vs Fly Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Drive vs Fly Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Is it cheaper to drive or fly? Compare the whole trip — fuel at today&rsquo;s Australian prices, tolls,
        wear and time against fares, bags, airport parking and car hire — and see the cost per person.
      </p>
      <AnswerFirst
        question="is it cheaper to drive or fly?"
        points={[
          <>Driving cost is per car; flying cost is per person. Every extra traveller makes driving cheaper per head.</>,
          <>Break-even fare = (fuel + tolls + parking + wear) ÷ travellers. If fare plus bags, transfers and car hire per person is below that, fly.</>,
          <>Solo, or more than a long day&rsquo;s drive each way, flying usually wins once you value your time.</>,
        ]}
      >
        <p>
          Driving Brisbane to Sydney and back ({EX_KM.toLocaleString("en-AU")} km) in a car using {EX_L100} L/100km
          costs about <strong>{aud(exFuel)}</strong> in petrol at {perLitre(PETROL)}/L, or{" "}
          <strong>{aud(exDrive)}</strong> with ${EX_TOLLS} of tolls. With four people that is{" "}
          <strong>{aud(exDrive / 4)} each</strong> — flying is only cheaper if a return fare plus bags, airport
          transfers and a share of any hire car comes in under that.
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/drive-vs-fly-calculator" />
      <DriveVsFlyCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Drive or fly: which is actually cheaper?</h2>
        <p>
          A cheap fare looks like it beats a tank of fuel until you add everything that comes with it: checked bags,
          getting to and from two airports, parking or a rideshare at home, and a hire car at the other end if you
          need one. Driving has its own hidden costs — tolls, an overnight stop, wear on the car — but most of them
          are shared by everyone in the vehicle. This calculator puts both sides on one screen so you can compare the
          whole trip, not just the headline numbers.
        </p>
        <p>
          The biggest single variable is the number of travellers. Fuel, tolls and wear are a per-car cost, so the
          per-person cost of driving halves when a second person comes along and quarters with four. Flying has no
          such economy of scale. That is why a family of four on a trip of 800–1,000 km each way almost always finds
          driving cheaper, while a solo traveller on the same route often does not.
        </p>

        <h2>What driving really costs</h2>
        <ul>
          <li>
            <strong>Fuel:</strong> distance ÷ 100 × L/100km × price per litre. At today&rsquo;s ACCC five-city
            average of {perLitre(PETROL)}/L, every 100 km in a car using 8.5 L/100km costs{" "}
            {aud(8.5 * PETROL, 2)}. Use your car&rsquo;s measured highway figure, not the brochure number.
          </li>
          <li>
            <strong>Tolls:</strong> most intercity routes in Australia are toll-free outside the big cities, but
            Sydney, Melbourne and Brisbane motorways add up quickly at each end. Check your route with the state toll
            operator or a maps app before you go.
          </li>
          <li>
            <strong>Parking at the destination:</strong> hotel and city parking can be a real daily cost; it is
            often free in regional towns.
          </li>
          <li>
            <strong>Wear:</strong> tyres, servicing and depreciation all scale with kilometres. Add a cents-per-km
            allowance if you want the full cost, or leave it at zero for fuel only.
          </li>
          <li>
            <strong>Time and overnight stops:</strong> a drive of more than about nine or ten hours usually needs a
            night on the road, which belongs on the driving side of the comparison.
          </li>
        </ul>

        <h2>What flying really costs</h2>
        <ul>
          <li>
            <strong>Fares:</strong> multiply by the number of travellers, and use the return fare you would actually
            book, not the sale price.
          </li>
          <li>
            <strong>Bags and seats:</strong> budget fares often exclude checked bags; for a family these can add a
            meaningful amount each way.
          </li>
          <li>
            <strong>Airport transfers and parking:</strong> parking at a capital-city airport for several days, or a
            rideshare each way, is a cost driving does not have.
          </li>
          <li>
            <strong>Hire car:</strong> if you need a car at the destination, the daily rate plus its fuel usually
            removes most of the advantage of flying.
          </li>
        </ul>

        <h2>When driving wins</h2>
        <ul>
          <li>Three or more people travelling together</li>
          <li>Up to roughly a day&rsquo;s drive each way (around 1,000 km)</li>
          <li>You need a car at the other end anyway</li>
          <li>Lots of luggage, sporting gear, pets or a caravan</li>
        </ul>

        <h2>When flying wins</h2>
        <ul>
          <li>One or two travellers on a long route</li>
          <li>More than a day&rsquo;s drive each way — Sydney to Perth or Melbourne to Darwin territory</li>
          <li>Hand luggage only, and no hire car needed at the destination</li>
          <li>You put a high value on your time: the gap is often a full day each way</li>
        </ul>

        <h2>How to find your break-even fare</h2>
        <p>
          Work out the driving total (fuel, tolls, parking, wear), divide by the number of travellers, and compare
          that with what each person would pay to fly including bags and transfers. For the Brisbane–Sydney example
          above, the driving total of {aud(exDrive)} means flying has to cost less than {aud(exDrive / 2)} each for a
          couple, or {aud(exDrive / 4)} each for four. Enter your own figures above and the calculator shows both
          totals and the per-person split.
        </p>
        <p>
          Want the fuel side in more detail? The <Link href="/calculators/trip-fuel-cost-calculator">trip fuel cost
          calculator</Link> handles return trips and carpools, and our{" "}
          <Link href="/guides/australia-road-trip-fuel-cost-faq">road trip fuel cost FAQ</Link> answers the common
          questions for Australian routes.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["drive-vs-fly-calculator"]} />

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
