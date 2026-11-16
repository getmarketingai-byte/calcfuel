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
import GeneratorFuelCalc from "./GeneratorFuelCalc";
import AnswerFirst from "@/components/AnswerFirst";
import BarChart from "@/components/charts/BarChart";
import { DEFAULT_DIESEL_PRICE_AUD_PER_L, DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";
import { coeffsFromSpec, generatorLitresPerHour, GENERATOR_SOURCES, HONDA_SPECS } from "@/domain/models/generatorFuel";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
const EU22 = HONDA_SPECS.find((g) => g.model === "Honda EU22i")!;
const EU22_Q = generatorLitresPerHour(EU22.ratedKw, 0.25, "petrol", coeffsFromSpec(EU22));
const EU22_R = EU22.tankL / EU22.hoursRated;
const CAMP_L = EU22_Q * 4 * 7;
const EU70 = HONDA_SPECS.find((g) => g.model === "Honda EU70is")!;
const EU70_H = generatorLitresPerHour(EU70.ratedKw, 0.5, "petrol", coeffsFromSpec(EU70));
const BACKUP_L = EU70_H * 12 * 3;
const DSL8_H = generatorLitresPerHour(8, 0.5, "diesel");

export const metadata: Metadata = {
  title: "Generator Fuel Calculator: Litres per Hour (AU)",
  description: `Generator fuel use in L/hr for camping, caravans and home backup. A Honda EU22i at ¼ load uses about ${EU22_Q.toFixed(2)} L/hr — ${aud(EU22_Q * PETROL, 2)} an hour at ACCC prices.`,
  alternates: { canonical: "/calculators/generator-fuel-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by improving your MPG." },
  { title: "EV vs Petrol Cost Calculator", slug: "ev-vs-gas-calculator", description: "Compare electric vehicle vs petrol car total cost of ownership." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your weekly and monthly fuel budget." },
];

const faqs = [
  { question: "How much fuel does a generator use per hour?", answer: `It depends far more on load than on size. Honda's published figures for its EU22i inverter generator (1,800 W rated, 3.6 L tank) are ${EU22.hoursRated} hours at rated load and ${EU22.hoursQuarter} hours at a quarter load — about ${EU22_R.toFixed(2)} L/hr flat out and ${EU22_Q.toFixed(2)} L/hr lightly loaded. At the ACCC five-city petrol average of ${perLitre(PETROL)}/L that is ${aud(EU22_R * PETROL, 2)} and ${aud(EU22_Q * PETROL, 2)} an hour.` },
  { question: "How long will a generator run on 20 litres of petrol?", answer: `A Honda EU22i at a quarter load uses about ${EU22_Q.toFixed(2)} L/hr, so 20 litres lasts about ${(20 / EU22_Q).toFixed(0)} hours; at full rated load about ${(20 / EU22_R).toFixed(0)} hours. Larger generators burn more even at the same output, so match the generator to the load.` },
  { question: "How much fuel do I need for a week of camping?", answer: `Running a Honda EU22i four hours a day at a quarter load — a fridge top-up, lights, charging — uses about ${CAMP_L.toFixed(0)} litres over seven days, roughly ${aud(CAMP_L * PETROL)} at ${perLitre(PETROL)}/L. One 20-litre jerry can covers it with a margin.` },
  { question: "How much fuel does a generator need for a 3-day power outage?", answer: `A Honda EU70is (5,500 W rated) at half load for 12 hours a day uses about ${EU70_H.toFixed(2)} L/hr, or ${BACKUP_L.toFixed(0)} litres over three days — about ${aud(BACKUP_L * PETROL)}. An 8 kW diesel genset at half load uses about ${DSL8_H.toFixed(2)} L/hr on Able Power's published chart. Most households run a backup generator in blocks for the fridge and essentials rather than continuously.` },
  { question: "Is diesel or petrol better for a generator?", answer: "Diesel gensets use less fuel per kWh — about 0.3 L/kWh at full load on Able Power's chart, against roughly 0.55–0.8 L/kWh for Honda's petrol inverters — and diesel stores more safely. But small portable and inverter generators for camping are almost all petrol, and diesel units are heavier, louder and dearer. Diesel makes sense for fixed or long-running backup power." },
  { question: "Can I run a generator at a campsite in Australia?", answer: "Rules vary by park and state. Many national parks and caravan parks restrict generator hours or noise, or ban them in some areas; check the booking conditions or the park authority's website before you go. Inverter generators are much quieter, which is why they dominate camping use." },
];

const howToSteps = [
  { name: "Pick your generator", text: "Choose a Honda inverter model to use its published run times exactly, or enter the rated (continuous) output in watts of another generator — not its peak or surge figure." },
  { name: "Choose a typical use", text: "Camping, home backup and worksite buttons set a typical load and hours. Adjust the load to what you actually run: a camping fridge and lights might be 300–500 W." },
  { name: "Enter hours, days and fuel", text: "Hours per day and number of days give the total fuel needed; fuel on hand gives the run time. The fuel price starts at the ACCC average." },
  { name: "Read the results", text: "Litres per hour, litres per kWh delivered, run time, total litres (and jerry cans) and cost." },
];

export default function GeneratorFuelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Generator Fuel Consumption Calculator"
        description="Generator fuel use in litres per hour, run time and fuel cost for camping, caravans and home backup, fitted to published Australian specifications."
        url="https://calcfuel.com/calculators/generator-fuel-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Generator Fuel Calculator", url: "https://calcfuel.com/calculators/generator-fuel-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/generator-fuel-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Generator Fuel Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Generator Fuel Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">How many litres an hour your generator burns, how long a jerry can lasts, and what a camping trip or a power outage costs in fuel — in litres and dollars, using published Australian specifications.</p>
      <AnswerFirst
        question="how much fuel does a generator use?"
        points={[
          <>Honda EU22i (1,800 W): about <strong>{EU22_Q.toFixed(2)} L/hr</strong> at ¼ load, {EU22_R.toFixed(2)} L/hr flat out.</>,
          <>A week of camping, 4 hours a day: about <strong>{CAMP_L.toFixed(0)} L</strong>, {aud(CAMP_L * PETROL)} at {perLitre(PETROL)}/L.</>,
          <>Load matters more than size: light loads burn more fuel per kWh.</>,
        ]}
      >
        <p>Figures from Honda Australia&rsquo;s published run times; petrol price is the ACCC five-city average.</p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/generator-fuel-calculator" />
      <GeneratorFuelCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>What published specifications say</h2>
        <p>Honda Australia publishes a tank size and continuous run time at rated load and at a quarter load for each inverter generator. Dividing one by the other gives litres per hour. The pattern is the same across the range: at a quarter of the load, a generator still burns about 40% of the fuel it uses flat out, because a large share goes into keeping the engine turning.</p>
        <BarChart
          title="Honda inverter generators: petrol use at rated and quarter load"
          description="Litres per hour at rated load for five Honda inverter generators, calculated from Honda Australia's published tank capacity and continuous operating hours."
          data={HONDA_SPECS.map((g) => ({ label: `${g.model} (${Math.round(g.ratedKw * 1000)} W)`, value: g.tankL / g.hoursRated }))}
          unitSuffix=" L/hr"
          precision={2}
          seriesLabel="Litres per hour at rated load"
        />
        <div className="overflow-x-auto not-prose my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">Calculated from Honda Australia&rsquo;s published tank capacity and continuous operating hours (Eco-Throttle on). Cost per hour at {perLitre(PETROL)}/L.</caption>
            <thead><tr className="border-b border-gray-300 dark:border-gray-600 text-left"><th className="py-2 pr-3">Model</th><th className="py-2 pr-3">Rated</th><th className="py-2 pr-3">Tank</th><th className="py-2 pr-3">L/hr rated</th><th className="py-2 pr-3">L/hr at ¼</th><th className="py-2">$/hr at ¼</th></tr></thead>
            <tbody>
              {HONDA_SPECS.map((g) => (
                <tr key={g.model} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 pr-3">{g.model}</td>
                  <td className="py-2 pr-3">{Math.round(g.ratedKw * 1000).toLocaleString("en-AU")} W</td>
                  <td className="py-2 pr-3">{g.tankL} L</td>
                  <td className="py-2 pr-3">{(g.tankL / g.hoursRated).toFixed(2)}</td>
                  <td className="py-2 pr-3">{(g.tankL / g.hoursQuarter).toFixed(2)}</td>
                  <td className="py-2">{aud((g.tankL / g.hoursQuarter) * PETROL, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Sources: <a href={GENERATOR_SOURCES.honda.url} target="_blank" rel="noopener noreferrer">{GENERATOR_SOURCES.honda.name}</a>; <a href={GENERATOR_SOURCES.ablePower.url} target="_blank" rel="noopener noreferrer">{GENERATOR_SOURCES.ablePower.name}</a>.</p>

        <h2>Camping and caravan use</h2>
        <p>Most campers run a small inverter generator for a few hours a day to top up a 12 V battery, run a compressor fridge or charge devices — often well under a quarter of its rating. Size the generator to what you run: a 1,800–2,200 W unit at a light load uses about half a litre an hour, while a larger 3,000 W unit doing the same job uses more. Running a caravan air conditioner is the exception; it can need most of a 2,000–3,000 W generator&rsquo;s output, and fuel use climbs towards the rated-load figure.</p>

        <h2>Home backup during an outage</h2>
        <p>For a blackout, decide what you will actually power — fridge, freezer, lights, phone and modem charging, perhaps a medical device — and run the generator in blocks rather than around the clock. At 12 hours a day, a Honda EU70is at half load uses about {BACKUP_L.toFixed(0)} litres over three days. Never run a generator indoors, in a garage or near windows: exhaust carbon monoxide can kill. Connecting a generator to house wiring needs a licensed electrician and a proper changeover switch.</p>

        <h2>Petrol or diesel</h2>
        <p>Diesel gensets use roughly 0.3 L per kWh at full load on Able Power&rsquo;s published chart (an 8 kW unit uses about {DSL8_H.toFixed(2)} L/hr at half load, costing {aud(DSL8_H * DIESEL, 2)} an hour at {perLitre(DIESEL)}/L diesel). Honda&rsquo;s petrol inverters use about 0.55–0.8 L per kWh at rated load. For a small camping generator that difference rarely justifies the weight and noise of diesel; for long-running backup power it can.</p>

        <h2>Storing generator fuel</h2>
        <p>Store petrol only in containers marked as meeting AS/NZS 2906, the standard for portable fuel containers, away from the house and out of the sun. Petrol goes stale over months, so rotate stored fuel through the car and run the generator dry or use a stabiliser before long storage.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["generator-fuel-calculator"]} />

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

      <CalcDisclaimer domain="stationary" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
