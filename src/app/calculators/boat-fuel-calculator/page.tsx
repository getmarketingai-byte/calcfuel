import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { aud, perLitre } from "@/lib/format";
import { reviewIsoFor } from "@/lib/editorial";
import WorkedExample from "@/components/calc/WorkedExample";
import { WORKED_EXAMPLES } from "@/content/worked-examples";
import CalcDisclaimer from "@/components/calc/CalcDisclaimer";
import type { Metadata } from "next";
import Link from "next/link";
import { CommercialPlacement } from "@/components/calc";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import BoatFuelCalc from "./BoatFuelCalc";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
/** Same rule of thumb the calculator uses: 0.05 US gal/h per HP at full throttle. */
const L_PER_HP_HOUR = 0.05 * 3.785411784;
const wot = (hp: number) => hp * L_PER_HP_HOUR;

export const metadata: Metadata = {
  title: "Boat Fuel Calculator: Litres per Hour, Cost & Range",
  description: `Boat fuel usage calculator: litres per hour from HP or your burn rate, trip cost at ${perLitre(PETROL)}/L petrol (ACCC), NM per litre and a safe one-third range.`,
  alternates: { canonical: "/calculators/boat-fuel-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Road-trip fuel cost with distance and economy." },
  { title: "Towing Fuel Cost Calculator", slug: "towing-fuel-cost-calculator", description: "Extra fuel cost when towing a trailer or caravan." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan weekly or monthly fuel spend." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total trip cost of driving versus flying." },
  { title: "Motorcycle Fuel Cost Calculator", slug: "motorcycle-fuel-cost-calculator", description: "Fuel cost for motorcycle trips." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Fuel wasted while idling." },
];

const faqs = [
  {
    question: "How much fuel does a boat use per hour?",
    answer: `It depends on engine power, throttle, hull and load. A common rule of thumb for four-stroke petrol outboards is about 0.19 litres per hour per horsepower at full throttle (0.05 US gallons per hp): roughly ${wot(20).toFixed(1)} L/h for a 20 hp, ${wot(90).toFixed(0)} L/h for a 90 hp and ${wot(150).toFixed(0)} L/h for a 150 hp flat out. At cruise you use much less, because fuel burn falls steeply as you come off the throttle. Your engine maker's fuel curve, or a fuel-flow meter, beats any rule of thumb.`,
  },
  {
    question: "What is the one-third rule for boat fuel?",
    answer: "Use a third of your fuel going out, a third coming back, and keep a third in reserve for weather, current, detours or helping someone else. This calculator also applies an 85% usable-fuel factor to range, because the last of the tank is rarely reachable in a seaway.",
  },
  {
    question: "How do I work out nautical miles per litre?",
    answer: "Divide your speed in knots by your burn rate in litres per hour. At 24 knots burning 55 L/h, you cover 0.44 NM per litre. Planing hulls usually return well under 1 NM per litre at cruise; displacement hulls at low speed do much better. Speed matters most: on a planing hull, a few knots below your usual cruise often saves a surprising share of fuel.",
  },
  {
    question: "How much does it cost to fill a boat?",
    answer: `Multiply tank size by the price at your fuel dock. At the ACCC five-city petrol average of ${perLitre(PETROL)}/L, a 100 L tank is ${aud(100 * PETROL)}, 200 L is ${aud(200 * PETROL)} and 400 L is ${aud(400 * PETROL)}. Marina pumps set their own prices and are often not the same as the roadside average, so enter your marina's price for trip budgets.`,
  },
  {
    question: "What does a 20 hp outboard use per hour?",
    answer: `By the rule of thumb above, about ${wot(20).toFixed(1)} litres an hour at full throttle, or ${aud(wot(20) * PETROL, 2)} an hour at ${perLitre(PETROL)}/L. Trolling or cruising at part throttle typically uses a fraction of that. Check your engine manual for the maker's figures.`,
  },
];

const howToSteps = [
  {
    name: "Enter burn rate or estimate from HP",
    text: "Prefer a known burn rate from your engine display or logged trips. If you do not have one, use the labelled HP estimate with hull type and throttle — treat it as approximate only.",
  },
  {
    name: "Set cruising speed and trip distance",
    text: "Enter speed in knots and distance in nautical miles (fuel in litres by default). Optionally enable return trip and a second comparison speed to see fuel and time trade-offs.",
  },
  {
    name: "Add fuel price and tank capacity",
    text: "Marina price gives trip cost. Tank capacity produces safe range (85% usable) and one-third-rule outbound guidance.",
  },
  {
    name: "Review fuel, cost, time and range",
    text: "Use results for planning only. Always verify against manufacturer data and local conditions, and keep reserve fuel.",
  },
];

export default function BoatFuelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Boat Trip Fuel Planner"
        description="Plan marine trip fuel, cost, travel time and safe range using burn rate or an HP estimate."
        url="https://calcfuel.com/calculators/boat-fuel-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Boat Trip Fuel Planner", url: "https://calcfuel.com/calculators/boat-fuel-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/boat-fuel-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Boat Trip Fuel Planner</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Boat Trip Fuel Planner</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Decide what a boat trip will cost in fuel, how long it will take, and how far you can go — with reserve margin and speed scenarios.
      </p>
      <AnswerFirst
        question="how much fuel will my boat use?"
        points={[
          <>Rule of thumb, four-stroke petrol outboard at full throttle: <strong>~0.19 L/h per hp</strong> — {wot(20).toFixed(1)} L/h for 20 hp, {wot(150).toFixed(0)} L/h for 150 hp.</>,
          <>Fuel cost per hour = L/h × price. A 150 hp flat out at {perLitre(PETROL)}/L: about <strong>{aud(wot(150) * PETROL)}/h</strong>.</>,
          <>Plan with the one-third rule: a third out, a third back, a third in reserve.</>,
        ]}
      >
        <p>
          Example: 80 NM return at 24 knots burning 55 L/h takes 3 h 20 m and about <strong>183 litres</strong>
          — <strong>{aud(183 * PETROL)}</strong> at the ACCC five-city petrol average of {perLitre(PETROL)}/L. Use
          your marina&rsquo;s price if it differs.
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/boat-fuel-calculator" />
      <BoatFuelCalc />
      <CommercialPlacement kind="adsense" slot="3651327789" className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How Marine Fuel Consumption Works</h2>
        <p>Unlike car fuel economy, which is relatively predictable at highway speeds, boat fuel consumption varies dramatically based on hull design, engine configuration, throttle position, and sea conditions. Understanding these variables is essential for safe trip planning — running out of fuel on water is far more dangerous than on land.</p>
        <p>The most important principle in marine fuel planning is the <strong>one-third rule</strong>: allocate one-third of your fuel for the outbound leg, one-third for the return, and keep one-third as an emergency reserve. This calculator applies a conservative 85% factor to range estimates, reflecting this safety margin.</p>

        <h2>Hull Type and Its Effect on Fuel Burn</h2>
        <h3>Planing Hulls</h3>
        <p>Planing hulls (speedboats, bowriders, centre consoles) ride on top of the water at speed, which is efficient at high speeds but inefficient at low speeds when the hull is pushing through water. Fuel consumption rises steeply as you accelerate through the &ldquo;hump&rdquo; — the point where the boat transitions from displacement to planing mode — but then levels off at cruise. Cruise burn is set mostly by how much power it takes to hold the hull on the plane, which is why the same boat can use very different amounts at 20 and 30 knots.</p>

        <h3>Displacement Hulls</h3>
        <p>Displacement hulls (trawlers, full-keel sailboats, lobster-style cruisers) push through water rather than riding on top of it. Speed is limited by hull length (hull speed = 1.34 × √(waterline length in feet) in knots), but fuel efficiency is excellent. A displacement cruiser at its hull speed can cover more nautical miles per litre than a planing boat of similar size going twice as fast.</p>

        <h3>Pontoon Boats</h3>
        <p>Pontoon boats and party pontoons create a lot of drag from their tubes at higher speed, so their fuel burn climbs quickly above a moderate cruise. They are usually most economical well below full throttle — use the comparison-speed option in the calculator to see the difference.</p>

        <h2>The HP-Based Fuel Consumption Formula</h2>
        <p>Marine engineers use a simplified rule of thumb: <strong>about 0.19 litres per hour per horsepower at full throttle</strong> (0.05 US gallons per hp) for typical four-stroke petrol outboards. This calculator implements that figure, adjusted for throttle position using a cubic throttle-to-load relationship (since fuel consumption does not scale linearly with throttle) and a hull efficiency factor.</p>
        <p>For exact fuel consumption data, consult your engine manufacturer's fuel consumption curves, which are included in most owner's manuals and are published for popular engines like Yamaha, Mercury, Honda, and Evinrude/BRP. These curves show actual litres (or gallons) per hour at each RPM, which you can cross-reference with your tachometer.</p>


        <h2>Fuel Planning for Overnight and Offshore Passages</h2>
        <p>For passages beyond day-trip range, fuel planning becomes critical. Key considerations:</p>
        <ul>
          <li><strong>Headwinds and current:</strong> Fighting a 15-knot headwind or 2-knot adverse current can increase fuel consumption by 20–40%. Plan for worst-case conditions.</li>
          <li><strong>Load:</strong> A heavily loaded boat — full water tanks, guests, dive gear — requires more power and burns more fuel. Add 10–15% for heavy loads.</li>
          <li><strong>Sea state:</strong> Rough conditions (a 0.5–1 m chop) significantly increase fuel consumption as the engine works harder to maintain speed.</li>
          <li><strong>Jerrycan reserves:</strong> For offshore passages, many experienced cruisers carry additional fuel in portable jerrycans — in approved containers, within the limits your state marine authority sets for carrying fuel.</li>
          <li><strong>Fuel availability:</strong> Research fuel dock availability at your destination and along your route. Remote anchorages and small island marinas may not have fuel or may charge significant premiums.</li>
        </ul>

        <h2>Marine fuel types and prices in Australia</h2>
        <p>Most outboards run on regular unleaded (91 RON) or premium, as the engine manual specifies. Check the manual before using E10: many marine engine makers advise against ethanol blends, because ethanol absorbs water and can separate in a tank that sits for weeks between trips. Diesel inboards, common on larger cruisers, use ordinary diesel.</p>
        <p>This calculator starts with the ACCC&rsquo;s five-city average retail petrol price — {perLitre(PETROL)}/L on the latest report — because it is the only regularly published, dated Australian fuel price. Marina fuel docks set their own prices, which can differ from the roadside average, so replace it with your marina&rsquo;s price per litre when you plan a trip. See our <Link href="/data/australian-fuel-prices">Australian fuel price data</Link> for petrol and diesel by city.</p>
      </article>

      <CommercialPlacement kind="adsense" slot="6514347197" className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["boat-fuel-calculator"]} />

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

      <CalcDisclaimer domain="marine" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
