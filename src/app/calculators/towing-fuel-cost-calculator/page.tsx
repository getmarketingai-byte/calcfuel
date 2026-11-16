import AnswerFirst from "@/components/AnswerFirst";
import TowingEvidence from "@/components/TowingEvidence";
import { DEFAULT_DIESEL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { TRAILER_PENALTIES } from "@/domain/models/towingTrip";
import { aud, perLitre } from "@/lib/format";
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
import TowingFuelCalc from "./TowingFuelCalc";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;
const pen = (id: string) => TRAILER_PENALTIES.find((t) => t.id === id)!.penaltyPercent;
const CARAVAN = pen("caravan");
const LARGE = pen("large");
const BOAT = pen("boat");
const BASE_L100 = 10.5;
const towL100 = (pct: number) => BASE_L100 * (1 + pct / 100);
const extraPer1000 = (pct: number) => (1000 / 100) * (towL100(pct) - BASE_L100) * DIESEL;

export const metadata: Metadata = {
  title: "Towing Fuel Calculator: Caravan & Trailer (AU)",
  description: `Caravan towing fuel calculator: extra litres and dollars vs unloaded at ${perLitre(DIESEL)}/L diesel (ACCC). A 10.5 L/100km ute + van adds about ${aud(extraPer1000(CARAVAN))} per 1,000 km.`,
  alternates: { canonical: "/calculators/towing-fuel-cost-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Road-trip fuel with commute and carpool modes." },
  { title: "Boat Trip Fuel Planner", slug: "boat-fuel-calculator", description: "Plan marine fuel, cost and safe range." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan weekly and monthly fuel spend." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total trip cost of driving versus flying." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See savings from better fuel economy." },
  { title: "Motorcycle Fuel Cost Calculator", slug: "motorcycle-fuel-cost-calculator", description: "Fuel cost for motorcycle trips." },
];

const faqs = [
  {
    question: "How much does it cost per km to tow a caravan?",
    answer: `In a diesel ute that uses ${BASE_L100} L/100km unloaded, the calculator's caravan preset (+${CARAVAN}%) gives ${towL100(CARAVAN).toFixed(1)} L/100km, or about ${aud((towL100(CARAVAN) / 100) * DIESEL, 2)} per km at the ACCC five-city diesel average of ${perLitre(DIESEL)}/L. Published tow tests of heavy vans at highway speed have measured consumption roughly doubling — about ${aud((towL100(LARGE) / 100) * DIESEL, 2)} per km in the same ute.`,
  },
  {
    question: "How much extra fuel does towing a caravan use?",
    answer: "Published Australian sources range widely. Practical Motoring says towing consumption can be more than 30% above solo; Austrack Campers puts a caravan at 30–50%. Measured magazine tow tests of 1,600–2,400 kg vans at highway speed found roughly double: a Subaru Outback 3.6R settled around 19 L/100km (about twice its solo figure) and a Mitsubishi Pajero diesel ran 21–24 L/100km against 10–11 unhitched. The calculator's caravan preset is +40%, with +100% for heavy vans at highway speed.",
  },
  {
    question: "How do I calculate towing fuel consumption?",
    answer: "Multiply your unloaded L/100km by (1 + penalty). For example, 10 L/100km with a 40% penalty is 14 L/100km. Then litres = distance ÷ 100 × that figure, and cost = litres × price per litre. The most accurate penalty is your own: divide litres bought by kilometres towed over a few full-tank fills and compare with your solo figure.",
  },
  {
    question: "Does towing speed affect fuel consumption?",
    answer: "Yes. RACV notes that dropping from 110 km/h to 90 km/h can save several litres per 100 km when towing, because aerodynamic drag rises with the square of speed. The Outback test above used about 22 L/100km at higher speed and settled near 19 L/100km once slowed to 80–90 km/h.",
  },
  {
    question: "Does a pop-top use less fuel than a full-height caravan?",
    answer: "A little. Caravan World towed otherwise-identical 5.95 m Coronet vans over the same route: the full-height van averaged 15.07 L/100km and the pop-top 14.37 L/100km — about 0.7 L/100km, or 5%, apart. The tow vehicle made a bigger difference than the roof.",
  },
  {
    question: "Can I reduce towing fuel consumption?",
    answer: "The biggest lever is speed. After that: run tyres on the car and van at the pressures specified for the load, keep the van sitting level, leave unnecessary weight and water at home, use cruise control on flat roads, and service the tow vehicle before a long trip.",
  },
  {
    question: "Is diesel or petrol better for towing a caravan in Australia?",
    answer: "Most long-distance caravanners choose diesel, and RACV notes diesel engines typically perform better under load. Diesel has more energy per litre than petrol, and diesels make their torque at lower revs, which suits sustained towing. Diesel currently costs more per litre than petrol, so compare the actual consumption of the vehicles you are considering.",
  },
];

const howToSteps = [
  { name: "Units", text: "Kilometres and L/100km are the default. Switch to miles and MPG only if your figures are in those units." },
  { name: "Enter trip distance", text: "Enter the total one-way distance of your towing trip in kilometres or miles. For a return trip, double this figure." },
  { name: "Enter your vehicle's unloaded fuel use", text: "Enter your vehicle's normal fuel consumption without a trailer attached. Check your owner's manual or previous fuel stops for an accurate figure." },
  { name: "Enter the current fuel price", text: "Enter the pump price per litre — it starts at the ACCC five-city diesel average. Check your state fuel price app, or your local servo, for today's price." },
  { name: "Select what you are towing", text: "Choose the closest match to your trailer type from the dropdown. Each option uses a fuel penalty drawn from the published sources listed on this page. Or enter a custom penalty if you know your vehicle's actual towing fuel use from experience." },
  { name: "Review your results", text: "The calculator shows your normal fuel cost, towing fuel cost, and the extra cost and litres from the towing penalty — so you can plan your fuel budget accurately." },
];

export default function TowingFuelCostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Towing Fuel Cost Calculator"
        description="Calculate how much extra fuel towing a caravan, boat, or trailer costs. Enter trip distance, vehicle fuel use, and fuel price to compare normal vs towing fuel costs."
        url="https://calcfuel.com/calculators/towing-fuel-cost-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Towing Fuel Cost Calculator", url: "https://calcfuel.com/calculators/towing-fuel-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
        datePublished="2026-06-30"
        dateModified={reviewIsoFor("/calculators/towing-fuel-cost-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Towing Fuel Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Towing Fuel Cost Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        What your caravan, boat trailer or camper adds to the fuel bill: enter the trip, your vehicle&rsquo;s
        unloaded L/100km and the trailer type to see the extra litres and dollars at today&rsquo;s diesel price.
      </p>
      <AnswerFirst
        question="how much extra fuel does towing use?"
        points={[
          <>Calculator presets: box trailer +{pen("light")}%, boat +{BOAT}%, camper +{pen("camper")}%, caravan or pop-top +{CARAVAN}%, large van or fifth-wheel +{pen("large")}%.</>,
          <>Per 1,000 km in a {BASE_L100} L/100km diesel ute: a boat adds about <strong>{aud(extraPer1000(BOAT))}</strong>, a caravan about <strong>{aud(extraPer1000(CARAVAN))}</strong>.</>,
          <>Published sources range from about +20% (small box trailer) to roughly +100% (heavy vans at highway speed) — see the sources below.</>,
        ]}
      >
        <p>
          A ute using {BASE_L100} L/100km unloaded uses about <strong>{towL100(CARAVAN).toFixed(1)} L/100km</strong>{" "}
          towing a typical caravan (+{CARAVAN}%) — roughly <strong>{aud((towL100(CARAVAN) / 100) * DIESEL, 2)} per km</strong>{" "}
          at the ACCC five-city diesel average of {perLitre(DIESEL)}/L. Tall full-height vans at 100–110 km/h
          can sit well above that; the worked example below uses +55% for one.
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/towing-fuel-cost-calculator" />
      <TowingFuelCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>The Real Cost of Towing in Australia</h2>
        <p>For Australians who tow on holidays, weekends or for work, fuel is usually the biggest variable cost of the trip — and towing pushes it up sharply. A long lap with a van can burn hundreds of extra litres of diesel compared with the same route unloaded.</p>
        <p>The fuel penalty from towing a caravan is not a fixed number. It depends on the weight of the trailer, its aerodynamic profile, your towing speed, and the mechanical efficiency of your tow vehicle. Understanding and calculating this penalty before you leave is the difference between a holiday that stays on budget and one that blows out at the servo.</p>

        <h2>Why Towing Increases Fuel Consumption</h2>
        <h3>Aerodynamic Drag</h3>
        <p>The dominant factor in towing fuel penalty at highway speeds is aerodynamic drag. A caravan presents a large, flat frontal area that creates significantly more air resistance than the tow vehicle alone. Aerodynamic drag increases with the square of speed — which means driving at 110 km/h instead of 90 km/h does not just increase drag linearly, it multiplies it. RACV notes that dropping from 110 km/h to 90 km/h can save several litres per 100 km.</p>

        <h3>Rolling Resistance</h3>
        <p>Beyond aerodynamics, the trailer's wheels and tyres add rolling resistance. A twin-axle caravan with four additional tyres means four additional points of friction on the road surface. Keeping trailer tyre pressures at the manufacturer's recommended level (not just inflated to the car's door placard) reduces rolling resistance. Trailer bearing condition also matters — a poorly maintained trailer with dry wheel bearings can create surprising drag.</p>

        <h3>Increased Vehicle Weight</h3>
        <p>Towing also increases the effective weight the engine must move, particularly during acceleration and on hills. For flat-terrain cruising on the highway, the aerodynamic penalty dominates. For hilly routes — common in the Great Dividing Range and across much of regional Australia — the weight penalty becomes significant as the vehicle must work harder on every uphill stretch.</p>

        <h2>How much does each trailer type add?</h2>
        <p>These are the presets the calculator uses, with the published source behind each. Where the sources disagree, the preset sits inside their range — and the range is wide.</p>
        <TowingEvidence />

        <h2>Tips to Reduce Towing Fuel Costs</h2>
        <ol>
          <li><strong>Slow down.</strong> This is the single most impactful change. RACV says dropping from 110 to 90 km/h can save several litres per 100 km.</li>
          <li><strong>Check tyre pressures on both vehicle and trailer.</strong> Under-inflated tyres significantly increase rolling resistance and heat buildup.</li>
          <li><strong>Use cruise control on flat roads.</strong> Eliminates the small speed variations that add fuel consumption over long distances.</li>
          <li><strong>Reduce caravan weight.</strong> Every 100 kg of unnecessary gear adds fuel cost. Leave non-essentials at home.</li>
          <li><strong>Fit a weight distribution hitch.</strong> A level van presents less frontal area to the airstream and handles better.</li>
          <li><strong>Buy fuel strategically.</strong> In Australia, fuel prices vary significantly by location. Regional servo prices are often higher. Fill up in major towns before remote stretches, and use your state fuel price app (FuelCheck in NSW, FuelWatch in WA and the equivalents in other states) to find the cheapest nearby price.</li>
          <li><strong>Service your vehicle before a long tow.</strong> A clean air filter and fresh engine oil improve efficiency. Have the tow ball weight and suspension checked — overloaded rear suspension can force the engine to work harder.</li>
        </ol>

        <h2>Diesel vs Petrol for Towing</h2>
        <p>For long-distance caravan towing in Australia, diesel is generally the preferred choice for three reasons. First, diesel engines produce their peak torque at lower RPM, which suits the sustained medium-speed load of highway towing. Second, diesel fuel contains more energy per litre than petrol (approximately 38 MJ/L vs 34 MJ/L), so a diesel vehicle inherently travels further per litre. Third, diesel engines in modern 4WDs and utes are tuned for exactly the high-torque, sustained-load scenarios that towing demands.</p>
        <p>That said, petrol engines are not impractical for towing. Many families successfully tow caravans up to 2,000 kg with petrol V6 or V8 engines. The fuel consumption penalty is higher in absolute litres, but petrol vehicles often have lower purchase prices and service costs.</p>

        <h2>Planning Your Caravan Trip Fuel Budget</h2>
        <p>For a realistic caravan trip fuel budget, use this calculator with three inputs: your actual towing fuel consumption (not the manufacturer's rated figure), the average fuel price along your route, and your planned trip distance. Add a 10–15% buffer for unexpected detours, hilly terrain, or headwinds. For remote Australian routes where fuel prices can reach $2.50+/litre, accurate pre-trip planning can mean the difference between a comfortable budget and a financial surprise.</p>

        <p>For more fuel planning tools, try our <Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> for general road trip planning, or the <Link href="/calculators/fuel-budget-planner">Fuel Budget Planner</Link> to set a weekly or monthly fuel budget across multiple vehicle uses.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["towing-fuel-cost-calculator"]} />

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

      <CalcDisclaimer domain="towing" />

      <RelatedTools tools={relatedTools} />
      <RelatedGuides guides={[
        { title: "Caravan Fuel Consumption Australia", slug: "caravan-fuel-consumption-australia", description: "Real-world L/100km figures and tips for towing fuel costs." },
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "Save $150–$440/year by timing your fill-ups to the weekly low." },
        { title: "Understanding Fuel Economy: MPG vs L/100km", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Convert between MPG and L/100km and understand fuel cost maths." },
      ]} />
    </div>
  );
}
