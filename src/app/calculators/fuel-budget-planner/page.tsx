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
import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_DIESEL_PRICE_AUD_PER_L, DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";
import FuelBudgetPlannerCalc from "./FuelBudgetPlannerCalc";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
const weekly = (km: number, l100: number, price = PETROL) => (km / 100) * l100 * price;
const monthly = (w: number) => (w * 52) / 12;

export const metadata: Metadata = {
  title: "Fuel Budget Calculator: Weekly & Monthly Petrol",
  description: `Plan your household fuel budget for up to three vehicles at ${perLitre(PETROL)}/L petrol (ACCC). 300 km a week at 8 L/100km is about ${aud(monthly(weekly(300, 8)))} a month — see yours.`,
  alternates: { canonical: "/calculators/fuel-budget-planner" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Road-trip fuel with commute and carpool modes." },
  { title: "Boat Trip Fuel Planner", slug: "boat-fuel-calculator", description: "Plan marine fuel, cost and safe range." },
  { title: "Towing Fuel Cost Calculator", slug: "towing-fuel-cost-calculator", description: "Extra fuel cost when towing." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total trip cost of driving versus flying." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "Compare hybrid vs petrol running costs." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Fuel wasted while idling." },
];

const faqs = [
  {
    question: "How do I calculate my monthly fuel budget?",
    answer: `Weekly cost = weekly km ÷ 100 × L/100km × price per litre; monthly = weekly × 52 ÷ 12. A car driven 300 km a week at 8 L/100km costs ${aud(weekly(300, 8), 2)} a week at ${perLitre(PETROL)}/L — ${aud(monthly(weekly(300, 8)))} a month and ${aud(weekly(300, 8) * 52)} a year. The planner does this for up to three vehicles at once.`,
  },
  {
    question: "How much does a 10c/L price rise add to my budget?",
    answer: `It scales with litres: 300 km a week at 8 L/100km uses 24 litres, so each 10c/L adds $2.40 a week, about ${aud(monthly(2.4), 2)} a month or ${aud(2.4 * 52)} a year. Two cars doing the same driving double it.`,
  },
  {
    question: "Should I use the same fuel price for every vehicle?",
    answer: `Only if they use the same fuel. Diesel currently averages ${perLitre(DIESEL)}/L across the five largest cities against ${perLitre(PETROL)}/L for regular unleaded (ACCC), and premium unleaded costs more again. Enter the right price for each vehicle.`,
  },
  {
    question: "Why multiply by 52 ÷ 12 and not 4?",
    answer: "There are about 4.33 weeks in a month. Multiplying a weekly figure by 4 understates the monthly cost by about 8%, which adds up over a year.",
  },
  {
    question: "How accurate is the estimate?",
    answer: "It is as accurate as the inputs. Use your real weekly distance (the odometer over a few normal weeks), your real L/100km (from the trip computer or full-tank fills) and current local prices. Prices move weekly in the big cities, so revisit the plan when they change.",
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Kilometres and L/100km are the default. Switch to miles and MPG only if your figures are in those units.",
  },
  {
    name: "Enter your first vehicle's details",
    text: "Optionally name the vehicle (e.g. Family SUV), then enter its average weekly distance, fuel economy rating, and your current local fuel price. Results appear instantly.",
  },
  {
    name: "Add additional vehicles",
    text: "Click 'Add Vehicle' to include a second or third household vehicle. Each vehicle shows its own weekly, monthly, and annual cost. The household total updates automatically.",
  },
  {
    name: "Set a monthly budget target",
    text: "Enter your desired monthly household fuel budget in the optional field. The planner will show whether you are under or over budget and by how much.",
  },
  {
    name: "Review and adjust",
    text: "Tweak weekly distances or fuel economy figures to model scenarios — for example, switching to a more fuel-efficient vehicle, reducing discretionary driving, or comparing different fuel price scenarios.",
  },
];

export default function FuelBudgetPlannerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Budget Planner"
        description="Household fuel budget planner for Australia: weekly, monthly and annual fuel cost for up to three vehicles in L/100km, priced at the ACCC average."
        url="https://calcfuel.com/calculators/fuel-budget-planner"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Fuel Budget Planner", url: "https://calcfuel.com/calculators/fuel-budget-planner" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/fuel-budget-planner")}
      />

      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link>
        <span className="mx-2">/</span>
        <span>Fuel Budget Planner</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel Budget Planner
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Plan weekly, monthly and annual fuel spend across up to three vehicles — and check against a monthly budget target.
      </p>
      <AnswerFirst
        question="how much should I budget for fuel?"
        points={[
          <>Weekly = km ÷ 100 × L/100km × $/L; monthly = weekly × 52 ÷ 12.</>,
          <>300 km/week at 8 L/100km: <strong>{aud(weekly(300, 8), 2)}/week</strong>, <strong>{aud(monthly(weekly(300, 8)))}/month</strong>.</>,
          <>Add a second car doing 200 km/week at 10 L/100km: another {aud(monthly(weekly(200, 10)))}/month.</>,
        ]}
      >
        <p>Prices use the ACCC five-city petrol average of {perLitre(PETROL)}/L. Enter your own distances and figures below.</p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/fuel-budget-planner" />

      <FuelBudgetPlannerCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How do you work out your monthly fuel bill?</h2>
        <p>
          Fuel is one of the largest recurring household costs that most families never actively track. Unlike rent or a mortgage, it arrives in small, frequent transactions — a tank here, a top-up there — until the bank statement shows several hundred dollars without a clear picture of where it went.
        </p>
        <p>
          The planner turns that into a number you can budget for. For a household with one car doing 300 km a week at 8 L/100km and a second doing 200 km at 10 L/100km, fuel comes to about {aud(monthly(weekly(300, 8) + weekly(200, 10)))} a month, or {aud((weekly(300, 8) + weekly(200, 10)) * 52)} a year at {perLitre(PETROL)}/L.
        </p>

        <h2>How is the fuel budget calculated?</h2>
        <p>
          <strong>Weekly cost = weekly km ÷ 100 × L/100km × price per litre.</strong> For example, 400 km a week at 9.5 L/100km uses 38 litres — {aud(weekly(400, 9.5), 2)} a week at {perLitre(PETROL)}/L, {aud(monthly(weekly(400, 9.5)))} a month and {aud(weekly(400, 9.5) * 52)} a year.
        </p>
        <p>
          Monthly figures use <em>weekly cost × 52 ÷ 12</em> (4.33 weeks per month) rather than multiplying by 4, which would understate costs by about 8%. If your figures are in miles and MPG, switch the unit toggle.
        </p>

        <h2>How can you cut your household fuel bill?</h2>
        <h3>1. Combine trips</h3>
        <p>A cold engine uses noticeably more fuel for the first few kilometres. Combining errands into one loop, rather than several short trips from a cold start, cuts the most expensive kilometres of the week.</p>
        <h3>2. Match the car to the trip</h3>
        <p>
          In a two-car household, put the most kilometres on the most efficient car. If the 6 L/100km car takes a 300 km weekly commute instead of the 10 L/100km car, the household saves about {aud(((300 / 100) * 4 * PETROL) * 52)} a year.
        </p>
        <h3>3. Check tyre pressures monthly</h3>
        <p>Under-inflated tyres increase rolling resistance. Check them cold against the placard on the driver&rsquo;s door pillar.</p>
        <h3>4. Time your fill-ups</h3>
        <p>
          In Sydney, Melbourne, Brisbane, Adelaide and Perth, petrol prices follow a weekly cycle, and filling up near the bottom of it saves money with no change to how you drive. See <Link href="/blog/best-time-to-buy-petrol-australia">the best time to buy petrol in Australia</Link>, and use your state fuel price app (FuelCheck in NSW, FuelWatch in WA, or the equivalent in your state) to find the cheapest nearby station.
        </p>
        <h3>5. Re-check when prices move</h3>
        <p>
          Treat the budget as a living number. Every 10c/L change on 300 km a week at 8 L/100km moves the bill by $2.40 a week, about {aud(2.4 * 52)} a year per car. Current prices by city are on our <Link href="/data/australian-fuel-prices">Australian fuel price data</Link> page.
        </p>

        <h2>How do you budget fuel across two or more vehicles?</h2>
        <p>
          One vehicle often dominates the household fuel bill, because it does more kilometres or uses more fuel. The per-vehicle breakdown shows which. That is useful when you are thinking about replacing a car: the gap between two vehicles&rsquo; annual costs is the fuel saving, which you can compare with the price difference using the <Link href="/calculators/fuel-economy-savings-calculator">fuel economy savings calculator</Link>.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["fuel-budget-planner"]} />

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
