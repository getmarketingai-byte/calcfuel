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
import UpgradePaybackCalc from "./UpgradePaybackCalc";
import AnswerFirst from "@/components/AnswerFirst";
import EconomyPagesNav from "@/components/EconomyPagesNav";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const save = (from: number, to: number, km = 15000) => (km / 100) * (from - to) * PETROL;
const EX = { from: 9.8, to: 6.5, km: 15000, premium: 4000 };
const EX_SAVE = save(EX.from, EX.to, EX.km);

export const metadata: Metadata = {
  title: "Fuel Economy Savings Calculator: Upgrade Payback",
  description: `Will a more fuel-efficient car pay for itself? Going from ${EX.from} to ${EX.to} L/100km over ${EX.km.toLocaleString("en-AU")} km saves ${aud(EX_SAVE)} a year at ${perLitre(PETROL)}/L (ACCC).`,
  alternates: { canonical: "/calculators/fuel-economy-savings-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Road-trip fuel with commute and carpool modes." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan weekly and monthly fuel spend." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "Hybrid vs petrol running-cost break-even." },
  { title: "EV vs Petrol Cost Calculator", slug: "ev-vs-gas-calculator", description: "EV vs petrol total cost over 5–10 years." },
  { title: "Motorcycle Fuel Cost Calculator", slug: "motorcycle-fuel-cost-calculator", description: "Fuel cost for motorcycle trips." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Fuel wasted while idling." },
];

const faqs = [
  { question: "How much will a more fuel-efficient car save me?", answer: `Litres saved = km per year ÷ 100 × (old L/100km − new L/100km); multiply by the fuel price. Going from ${EX.from} to ${EX.to} L/100km over ${EX.km.toLocaleString("en-AU")} km saves ${((EX.km / 100) * (EX.from - EX.to)).toFixed(0)} litres — ${aud(EX_SAVE)} a year at the ACCC five-city average of ${perLitre(PETROL)}/L.` },
  { question: "How long does it take for a fuel-efficient car to pay for itself?", answer: `Divide the extra purchase price by the annual fuel saving. A car costing ${aud(EX.premium)} more that saves ${aud(EX_SAVE)} a year pays back in about ${(EX.premium / EX_SAVE).toFixed(1)} years on fuel alone. Finance, insurance, servicing and resale value can move that either way, so treat fuel payback as one input, not the answer.` },
  { question: "How much does 1 L/100km save per year?", answer: `Every 1 L/100km saved is 1 litre per 100 km. At 15,000 km a year that is 150 litres — ${aud(150 * PETROL)} at ${perLitre(PETROL)}/L. At 25,000 km it is ${aud(250 * PETROL)}. The more you drive, the faster any efficiency upgrade pays back.` },
  { question: "Should I use the official fuel figure or my real one?", answer: "Use your real one for your current car: litres bought ÷ km driven × 100 over a few full-tank fills. For the car you are considering, the official combined figure on the Green Vehicle Guide or the windscreen label is a laboratory test and real-world use is usually higher, so add a margin — or use owner-reported figures for the model." },
  { question: "Is it worth replacing a car that still runs just to save fuel?", answer: "Rarely on fuel alone. Changing cars costs stamp duty, dealer margin and the depreciation of the new car, which usually dwarf a few hundred dollars a year of fuel. The saving matters most when you are replacing a car anyway and choosing between two options — that is when the payback figure is worth running." },
];

const howToSteps = [
  { name: "Enter your current car's real fuel use", text: "Litres bought ÷ km driven × 100 over a few full-tank fills gives your real L/100km." },
  { name: "Enter the car you are considering", text: "Its official combined L/100km, plus a margin for real-world driving." },
  { name: "Enter kilometres and fuel price", text: "Your annual km and the fuel price; it starts at the ACCC five-city average." },
  { name: "Add the price difference", text: "What the more efficient car costs over the alternative, and how many years you will keep it." },
  { name: "Read the payback", text: "The calculator shows the annual saving, payback years, and the net result over your ownership period." },
];

export default function FuelEconomySavingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Economy Savings Calculator"
        description="Annual fuel saving and payback period for switching to a more fuel-efficient car, in L/100km and Australian dollars."
        url="https://calcfuel.com/calculators/fuel-economy-savings-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Fuel Economy Savings Calculator", url: "https://calcfuel.com/calculators/fuel-economy-savings-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/fuel-economy-savings-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Fuel Economy Savings Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Fuel Economy Savings Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Thinking of paying more for a more fuel-efficient car — a hybrid, a smaller engine, a newer model? See what it saves in fuel each year and how long it takes to repay the extra price.
      </p>
      <AnswerFirst
        question="will a more fuel-efficient car pay for itself?"
        points={[
          <>{EX.from} → {EX.to} L/100km over {EX.km.toLocaleString("en-AU")} km saves <strong>{aud(EX_SAVE)} a year</strong> at {perLitre(PETROL)}/L.</>,
          <>A {aud(EX.premium)} price premium pays back in about <strong>{(EX.premium / EX_SAVE).toFixed(1)} years</strong> on fuel alone.</>,
          <>Each 1 L/100km saved is worth {aud(150 * PETROL)} a year at 15,000 km.</>,
        ]}
      >
        <p>Uses the ACCC five-city petrol average; enter your own figures below.</p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/fuel-economy-savings-calculator" />
      <UpgradePaybackCalc />
      <EconomyPagesNav current="/calculators/fuel-economy-savings-calculator" />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>How the payback is worked out</h2>
        <p><strong>Annual saving = km per year ÷ 100 × (current L/100km − new L/100km) × fuel price.</strong> <strong>Payback = extra purchase price ÷ annual saving.</strong> Over the years you keep the car, the net result is the total fuel saved minus the extra you paid. Everything is in L/100km because that is how Australian fuel labels and the Green Vehicle Guide report consumption, and because litres saved scale directly with it.</p>

        <h2>Why the same improvement is worth more in a thirsty car</h2>
        <p>Cutting consumption by 2 L/100km saves the same litres whether you go from 12 to 10 or from 7 to 5 — but the first is a much smaller percentage change, so it is often cheaper to achieve. That is why replacing a large, thirsty car tends to pay back faster than trading a small car for a slightly more efficient one. At {perLitre(PETROL)}/L and 15,000 km a year:</p>
        <ul>
          <li>12.0 → 10.0 L/100km saves {aud(save(12, 10))} a year</li>
          <li>9.8 → 6.5 L/100km saves {aud(save(9.8, 6.5))} a year</li>
          <li>7.0 → 5.0 L/100km saves {aud(save(7, 5))} a year</li>
          <li>6.5 → 4.5 L/100km (a typical petrol-to-hybrid step) saves {aud(save(6.5, 4.5))} a year</li>
        </ul>

        <h2>What the payback leaves out</h2>
        <p>Fuel is only one running cost. A more expensive car usually costs more to insure and finance, may hold its value better or worse, and can have different servicing costs and intervals. Rego in most states does not depend on fuel use. Use the fuel payback to rule an option in or out, then compare the full ownership cost. For a straight cost comparison of two specific cars, the <Link href="/fuel-efficiency-comparison">two-car fuel cost comparison</Link> is quicker; for hybrids specifically, the <Link href="/calculators/hybrid-vs-gas-calculator">hybrid vs petrol calculator</Link> adds break-even distance.</p>

        <h2>Getting the inputs right</h2>
        <p>The biggest error is the fuel figure. Official combined figures come from a laboratory test and real-world use is usually higher, often more so for hybrids driven mainly on highways. For your current car, measure it: fill the tank, reset the trip meter, and at the next fill divide litres by kilometres and multiply by 100. For the car you are considering, add a margin to the label figure or use owner-reported numbers.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["fuel-economy-savings-calculator"]} />

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
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly price cycle explained — save $150–$440/year by timing fill-ups." },
        { title: "Understanding Fuel Economy: MPG vs L/100km", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Convert MPG or km/L to L/100km with the converter." },
        { title: "How to Reduce Your Commute Fuel Costs", slug: "how-to-reduce-commute-fuel-costs", description: "Seven practical strategies to cut your daily commute fuel costs." },
      ]} />
    </div>
  );
}
