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
import IdlingFuelWasteCalc from "./IdlingFuelWasteCalc";
import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
/** The calculator's own default idle burn for a passenger car, L/h. */
const CAR_LH = 3.0;
const fleetLitres = (vehicles: number, minPerDay: number, lh = CAR_LH, days = 250) => vehicles * (minPerDay / 60) * lh * days;
const CO2_PER_L = 2.31; // kg CO2 per litre of petrol, as used by the calculator

export const metadata: Metadata = {
  title: "Idling Fuel Calculator: What Idling Costs You",
  description: `What engine idling costs in litres and dollars per day, week and year, for one car or a fleet, at ${perLitre(PETROL)}/L petrol (ACCC). 10 minutes a day ≈ ${aud(fleetLitres(1, 10) * PETROL)} a year.`,
  alternates: { canonical: "/calculators/idling-fuel-waste-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip using distance and MPG." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Find out your daily, weekly, and annual commute fuel costs." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by upgrading to a more fuel-efficient vehicle." },
  { title: "Fuel Surcharge Calculator", slug: "fuel-surcharge-calculator", description: "Calculate fuel surcharges for freight and delivery operations." },
  { title: "Carpool Fuel Split Calculator", slug: "carpool-fuel-split-calculator", description: "Split fuel costs fairly among carpool passengers." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total cost of driving vs flying." },
];

const faqs = [
  {
    question: "How much fuel does an idling car use per hour?",
    answer: `It depends on engine size, temperature and whether the air-conditioning is running — from under a litre an hour for a small, warm engine to several litres for a large engine with the A/C on. This calculator starts at ${CAR_LH} L/h as a cautious default; your trip computer's instant-consumption display at idle, or the manufacturer, will give a better figure for your car.`,
  },
  {
    question: "Is it better to turn the engine off than idle?",
    answer: "For anything more than a short wait, generally yes. A warm, modern fuel-injected engine uses very little fuel to restart, which is why many new cars switch off automatically at the lights. Long warm-up idling is also unnecessary for modern engines: driving off gently warms them faster. Exceptions are safety-related — keep the engine running in traffic and when you need demisting or cooling for a vulnerable passenger.",
  },
  {
    question: "How much does idling cost a fleet per year?",
    answer: `Ten vehicles each idling 15 minutes a working day at ${CAR_LH} L/h burn about ${Math.round(fleetLitres(10, 15)).toLocaleString("en-AU")} litres over 250 days — ${aud(fleetLitres(10, 15) * PETROL)} at the ACCC five-city petrol average of ${perLitre(PETROL)}/L. Measure your fleet's real idle time with telematics before building a business case; the time figure matters more than anything else.`,
  },
  {
    question: "Is idling illegal in Australia?",
    answer: "There is no general ban on idling in traffic, but the Australian Road Rules (rule 213, adopted by each state) require a driver who leaves a vehicle and moves more than 3 metres away to switch off the engine, among other steps to secure it. Councils and workplaces may have their own rules, for example near schools. Check your state road rules for the exact wording.",
  },
  {
    question: "How much CO2 does idling produce?",
    answer: `Burning a litre of petrol releases roughly ${CO2_PER_L} kg of CO2, the figure this calculator uses. A car idling 10 minutes a day at ${CAR_LH} L/h over 250 days burns about ${Math.round(fleetLitres(1, 10))} litres, or about ${Math.round(fleetLitres(1, 10) * CO2_PER_L)} kg of CO2, for no distance travelled.`,
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Litres are the default. Switch to gallons only if your burn-rate figure is in gallons per hour."
  },
  {
    name: "Enter daily idling time",
    text: "Type the average number of minutes per day each vehicle spends idling. Include warm-up time, loading/unloading waits, drive-through queues, and any other stationary running time."
  },
  {
    name: "Set the fuel burn rate",
    text: "Enter how much fuel your vehicle or fleet burns per hour while idling. Larger engines and air-conditioning increase it. Check your vehicle manual or use a fuel flow meter for precision."
  },
  {
    name: "Enter fuel price and fleet size",
    text: "Input your local fuel price per litre (it starts at the ACCC five-city petrol average), then enter the number of vehicles in your fleet. Use 1 for a single personal vehicle. The calculator will show both per-vehicle and total fleet figures."
  },
  {
    name: "Review results and CO2 savings",
    text: "The calculator shows daily, weekly, monthly, and annual waste per vehicle plus fleet totals. The CO2 panel shows the environmental benefit of eliminating the idling. Use these figures to build a business case for an idle-reduction programme."
  },
];

export default function IdlingFuelWastePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Idling Fuel Waste Calculator"
        description="Calculate how much fuel and money is wasted by engine idling every day, week, and year. Supports personal vehicles and commercial fleets with metric and imperial units."
        url="https://calcfuel.com/calculators/idling-fuel-waste-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Idling Fuel Waste Calculator", url: "https://calcfuel.com/calculators/idling-fuel-waste-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/idling-fuel-waste-calculator")}
      />

      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link>
        <span className="mx-2">/</span>
        <span>Idling Fuel Waste Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Idling Fuel Waste Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Find out how much fuel and money your vehicle or fleet uses idling — daily, weekly, monthly and annually, with the CO₂ impact. Litres and Australian prices by default.
      </p>
      <AnswerFirst
        question="what does idling cost?"
        points={[
          <>Cost = minutes idling ÷ 60 × idle burn (L/h) × price per litre.</>,
          <>10 min a day at {CAR_LH} L/h: about <strong>{Math.round(fleetLitres(1, 10))} L</strong> and <strong>{aud(fleetLitres(1, 10) * PETROL)}</strong> a year (250 days).</>,
          <>A fleet of 10 idling 15 min a day: about <strong>{aud(fleetLitres(10, 15) * PETROL)}</strong> a year.</>,
        ]}
      >
        <p>
          Prices use the ACCC five-city petrol average of {perLitre(PETROL)}/L. {CAR_LH} L/h is the
          calculator&rsquo;s cautious default — many small, warm engines use less, so check your trip computer.
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/idling-fuel-waste-calculator" />

      <IdlingFuelWasteCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>The Hidden Cost of Engine Idling</h2>
        <p>Engine idling — running a vehicle engine while stationary — is one of the most overlooked sources of wasted fuel in both personal and commercial transport. While idling feels free because the vehicle is not moving, the engine is still consuming fuel. At the calculator's default of {CAR_LH} L/h, just 10 minutes of daily idling adds up to about {Math.round(fleetLitres(1, 10))} litres a year — burned without moving a metre.</p>
        <p>The financial impact becomes most apparent in fleet operations. A business running 20 delivery vehicles, each idling 20 minutes a working day at {CAR_LH} L/h, burns about {Math.round(fleetLitres(20, 20)).toLocaleString("en-AU")} litres a year — {aud(fleetLitres(20, 20) * PETROL)} at {perLitre(PETROL)}/L — on idling alone.</p>

        <h2>Why Vehicles Idle — and When It Is Unnecessary</h2>
        <p>Common causes of unnecessary idling include:</p>
        <ul>
          <li><strong>Warm-up idling:</strong> Many drivers idle for 5–10 minutes to warm up their engine, particularly in winter. Modern fuel-injected engines do not need more than 30–60 seconds of warm-up in most conditions. Driving gently brings the engine to operating temperature faster than idling.</li>
          <li><strong>Drive-through queues:</strong> Fast food, coffee, and bank drive-throughs can add 3–8 minutes of idle time per visit. For daily commuters, this alone can account for significant annual waste.</li>
          <li><strong>Loading and unloading:</strong> Delivery drivers, tradespeople, and service technicians often leave vehicles running while attending to jobs — sometimes for 10–30 minutes at each stop.</li>
          <li><strong>Climate control:</strong> Keeping the cabin cool in summer or warm in winter is a primary reason for extended idling. Auxiliary power units (APUs) and battery-electric HVAC systems are available alternatives for commercial fleets.</li>
          <li><strong>Waiting in traffic or parking:</strong> School drop-offs, level crossing waits, and informal parking all contribute to cumulative idle time.</li>
        </ul>

        <h2>Fleet Management and Idle Reduction</h2>
        <p>For commercial fleet operators, reducing idle time is one of the fastest ways to cut fuel costs and meet sustainability targets. The first step is measurement: telematics systems integrated with GPS and engine control units (ECUs) can report idle time per vehicle, per driver, and per day in real time. This data makes it possible to identify the vehicles and routes with the worst idle behaviour and target interventions precisely.</p>
        <p>A structured idle reduction programme typically starts with a written policy — commonly a five-minute maximum idle rule — communicated to all drivers. Driver scorecards that include idle time as a metric create accountability. Telematics alerts that notify drivers when they exceed the idle limit make the policy enforceable; measure idle time before and after so the saving is real rather than assumed.</p>
        <p>For long-haul trucking and overnight cab-over operations, auxiliary power units (APUs) are the gold-standard solution. An APU runs a small secondary engine or battery system to power HVAC and electronics without running the main engine, burning a fraction of the fuel the main engine would at idle. Compare the unit's rated consumption with your measured main-engine idle burn to estimate the payback.</p>


        <h2>Environmental Impact of Idling</h2>
        <p>Beyond the financial cost, idling releases CO2 — about {CO2_PER_L} kg per litre of petrol — along with nitrogen oxides, particulates and other pollutants. Near schools, hospitals and loading docks, where idling is common, those emissions are concentrated where people wait.</p>
        <p>In Australia, the Australian Road Rules (rule 213) require a driver who leaves a vehicle and moves more than 3 metres away to switch off the engine as part of securing it. Some councils and workplaces add their own no-idling rules, for example in school pick-up zones. For fleets, a written idle policy is also a reputational matter.</p>
        <p>The calculator&rsquo;s CO2 readout lets you quantify the benefit of cutting idle time and include it in sustainability reporting.</p>

        <h2>Finding your idle burn rate</h2>
        <p>Idle fuel use varies widely with engine size, temperature, accessories and air-conditioning, so a measured figure beats any table. Most modern cars show instantaneous consumption on the trip computer — at idle it usually reads in litres per hour. For fleets, the engine control unit reports idle fuel through most telematics systems. Enter that figure in the calculator; the default of {CAR_LH} L/h is deliberately cautious.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["idling-fuel-waste-calculator"]} />

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
