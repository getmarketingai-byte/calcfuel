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
import { FIVE_CITY_AVERAGE, SOURCE_REPORT, DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import AnswerFirst from "@/components/AnswerFirst";
import { aud, perLitre } from "@/lib/format";
import HybridVsGasCalc from "./HybridVsGasCalc";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const KM = 16_000;
const PETROL_L100 = 6.5;
const HYBRID_L100 = 4.7;
const annualFuel = (l100: number, km = KM) => (km / 100) * l100 * PETROL;
const saving = (km = KM) => annualFuel(PETROL_L100, km) - annualFuel(HYBRID_L100, km);
const payback = (premium: number, km = KM) => premium / saving(km);

export const metadata: Metadata = {
  title: "Hybrid vs Petrol Calculator: Payback in Years (AU)",
  description: `Are hybrids worth it? At 16,000 km a year and ${perLitre(PETROL)}/L petrol, a 4.7 vs 6.5 L/100km hybrid saves ${aud(saving())} a year — a $3,000 premium pays back in ${payback(3000).toFixed(1)} years.`,
  alternates: { canonical: "/calculators/hybrid-vs-gas-calculator" },
};

const relatedTools = [
  {
    title: "EV vs Petrol Cost Calculator",
    slug: "ev-vs-gas-calculator",
    description: "Compare electric vehicle vs petrol car total cost of ownership over 5 or 10 years.",
  },
  {
    title: "Fuel Economy Savings Calculator",
    slug: "fuel-economy-savings-calculator",
    description: "See how much you save annually by improving your vehicle's MPG.",
  },
  {
    title: "Trip Fuel Cost Calculator",
    slug: "trip-fuel-cost-calculator",
    description: "Calculate total fuel cost for any road trip.",
  },
  {
    title: "Idling Fuel Waste Calculator",
    slug: "idling-fuel-waste-calculator",
    description: "Calculate how much fuel you waste idling.",
  },
  {
    title: "Carpool Fuel Split Calculator",
    slug: "carpool-fuel-split-calculator",
    description: "Split fuel costs fairly among carpool passengers.",
  },
];

const faqs = [
  {
    question: "Is a hybrid cheaper to run than a petrol car in Australia?",
    answer: `On fuel, yes. A hybrid rated ${HYBRID_L100} L/100km against a petrol version at ${PETROL_L100} uses ${Math.round((1 - HYBRID_L100 / PETROL_L100) * 100)}% less fuel; at ${KM.toLocaleString("en-AU")} km a year and the ACCC five-city petrol average of ${perLitre(PETROL)}/L that is ${aud(annualFuel(HYBRID_L100))} a year against ${aud(annualFuel(PETROL_L100))}. Whether it is cheaper overall depends on the purchase premium and your distance — the saving has to repay the premium first. ("Gas" in the URL is the American word for petrol; it is the same fuel.)`,
  },
  {
    question: "How long does a hybrid take to pay for itself?",
    answer: `Premium ÷ annual saving. With the ${aud(saving())} a year from the example above, a $3,000 premium pays back in ${payback(3000).toFixed(1)} years, $5,000 in ${payback(5000).toFixed(1)} and $8,000 in ${payback(8000).toFixed(1)}. Drive 25,000 km a year and the $3,000 case drops to ${payback(3000, 25_000).toFixed(1)} years; at 8,000 km it stretches to ${payback(3000, 8_000).toFixed(1)}.`,
  },
  {
    question: "Are hybrids worth the extra cost?",
    answer: "They are when the premium is small relative to your annual saving — which means higher distances, lots of stop-start city driving (where hybrids gain most over their official figure) and a premium of a few thousand dollars. They are rarely worth it on fuel alone for low-distance drivers. Compare the actual on-road prices of the two variants you are considering, not list prices, and enter both into the calculator.",
  },
  {
    question: "Where do I find official fuel consumption figures?",
    answer: "The Australian Government's Green Vehicle Guide (greenvehicleguide.gov.au) lists the official combined, urban and extra-urban L/100km for new cars sold in Australia. Official figures come from a laboratory test, so real-world use is usually higher — use your own measured figure if you have one.",
  },
  {
    question: "Should I include maintenance and resale value?",
    answer: "The calculator has an optional annual maintenance difference, which defaults to a conservative figure; set it to zero if you would rather compare fuel only. Regenerative braking usually reduces brake wear, but servicing costs vary by brand and capped-price schedule, so check the manufacturer's service pricing for both variants. Resale value is hard to predict; if you expect the hybrid to resell for more, reduce its effective price by that amount.",
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Kilometres and L/100km are the default. Switch to miles and MPG only if your figures are in those units.",
  },
  {
    name: "Enter annual distance driven",
    text: "Input how many kilometres you drive per year. This is the single biggest driver of hybrid break-even time — higher mileage means faster payback.",
  },
  {
    name: "Enter purchase prices for both vehicles",
    text: "Enter the out-the-door (on-road) prices for the hybrid and petrol car you are comparing. Use the actual prices for the models you are considering, not the manufacturer's list price, if possible.",
  },
  {
    name: "Enter fuel economy and current fuel price",
    text: "Enter L/100km for both vehicles and the price per litre (it starts at the ACCC five-city average). Official Green Vehicle Guide figures are a fair starting point, but real-world use is usually higher.",
  },
  {
    name: "Review break-even, annual savings, and 5/10-year totals",
    text: "The calculator instantly shows the break-even point in months and years, your annual fuel and maintenance savings, and the net savings after 5 and 10 years once the price premium is accounted for.",
  },
];

export default function HybridVsGasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Hybrid vs Petrol Break-Even Calculator"
        description="Calculate how many months or years it takes for a hybrid car's fuel savings to pay off its price premium over an equivalent petrol car."
        url="https://calcfuel.com/calculators/hybrid-vs-gas-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Hybrid vs Petrol Calculator", url: "https://calcfuel.com/calculators/hybrid-vs-gas-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/hybrid-vs-gas-calculator")}
      />

      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link>
        <span className="mx-2">/</span>
        <span>Hybrid vs Petrol Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Hybrid vs Petrol Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Find out exactly how many months or years it takes for a hybrid car&apos;s fuel savings to recoup its price premium over an equivalent petrol car — then see your total savings at 5 and 10 years.
      </p>
      <AnswerFirst
        question="how long does a hybrid take to pay back?"
        points={[
          <>Payback = price premium ÷ annual fuel saving.</>,
          <>At {KM.toLocaleString("en-AU")} km/yr: $3,000 premium → <strong>{payback(3000).toFixed(1)} yrs</strong>; $5,000 → {payback(5000).toFixed(1)} yrs; $8,000 → {payback(8000).toFixed(1)} yrs.</>,
          <>Distance matters most: at 25,000 km/yr the $3,000 case pays back in {payback(3000, 25_000).toFixed(1)} years.</>,
        ]}
      >
        <p>
          A hybrid rated {HYBRID_L100} L/100km against a {PETROL_L100} L/100km petrol version, driven{" "}
          {KM.toLocaleString("en-AU")} km a year at {perLitre(PETROL)}/L, saves <strong>{aud(saving())} a year</strong>{" "}
          on fuel ({aud(annualFuel(HYBRID_L100))} vs {aud(annualFuel(PETROL_L100))}).
        </p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/hybrid-vs-gas-calculator" />

      <HybridVsGasCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Hybrid vs Petrol Economics: How the Break-Even Calculation Works</h2>
        <p>
          When you buy a hybrid vehicle, you are making a financial bet: that the fuel savings accumulated over your ownership period will exceed the extra money you paid upfront compared to the equivalent petrol model. The break-even point is the moment that cumulative savings equals the price premium — after which every month of ownership puts money back in your pocket.
        </p>
        <p>
          The calculation is straightforward in principle. Start with the hybrid price premium (hybrid purchase price minus petrol car price). Divide that by your annual total savings (annual fuel savings plus any maintenance savings). The result is the break-even period in years. If the premium is $3,000 and you save $600 a year in fuel and maintenance, you break even in exactly 5 years.
        </p>

        <h2>The Four Variables That Drive Your Break-Even</h2>

        <h3>1. Price Premium</h3>
        <p>
          The single largest variable, and it varies a lot by model: some hybrid variants cost only a few thousand dollars more than the petrol version, others much more. Get the on-road price of both variants from the dealer or the manufacturer's Australian site and use the actual difference.
        </p>

        <h3>2. Fuel Economy Gap</h3>
        <p>
          The larger the efficiency difference between the hybrid and petrol versions, the faster you save. A hybrid at 4.7 L/100km against a petrol car at 6.5 uses about 28% less fuel; at 20,000 km a year and {perLitre(PETROL)}/L that is {aud(saving(20_000))} a year. Wider gaps — common in city driving where hybrid regenerative braking is most effective — accelerate break-even considerably.
        </p>

        <h3>3. Annual Mileage</h3>
        <p>
          This is the factor most within your control when deciding whether a hybrid makes financial sense. Every extra kilometre you drive amplifies the hybrid&apos;s per-kilometre fuel cost advantage. A driver covering 30,000 km/year will break even roughly twice as fast as one covering 16,000 km/year, all else being equal. If you commute long distances or drive for work, a hybrid is almost always the financially superior choice versus an equivalent petrol car.
        </p>

        <h3>4. Fuel Price</h3>
        <p>
          Higher fuel prices accelerate break-even by increasing the absolute annual savings from the hybrid&apos;s superior efficiency. Each 10c/L rise in petrol adds about {aud((saving() / PETROL) * 0.1)} a year to the saving in the example above; if prices fall, break-even extends. The calculator uses whatever current fuel price you enter, so update it regularly for accurate projections.
        </p>

        <h2>Maintenance: The Often-Overlooked Savings</h2>
        <p>
          Hybrid vehicles sit between petrol cars and fully electric vehicles on the maintenance cost spectrum. They still require oil changes (though less frequently than petrol cars in stop-start driving due to automatic engine shutoff), but regenerative braking dramatically reduces brake pad and rotor wear. Servicing costs vary by brand and capped-price schedule, so compare the published service prices for both variants rather than relying on a rule of thumb.
        </p>

        <h2>When a Hybrid May Not Break Even</h2>
        <p>
          The calculator will flag scenarios where break-even is unlikely within a standard ownership period. This typically occurs when annual distance is very low (under 11,000 km), the price premium is unusually high, or fuel prices are very low. In these cases, a petrol car or a fully electric vehicle (with its larger running cost advantage) may be more financially rational depending on your situation. The &quot;Hybrid may not break even&quot; warning is a prompt to reconsider the comparison, not a final verdict — resale value, government incentives, and the environmental value of reduced emissions are legitimate factors beyond the financial analysis this calculator provides.
        </p>

        <p>The petrol price you compare against matters more than any other input here. Unleaded averaged {FIVE_CITY_AVERAGE.petrol.toFixed(1)} cpl across the five largest capital cities on {SOURCE_REPORT.pricesToLabel} and diesel {FIVE_CITY_AVERAGE.diesel.toFixed(1)} cpl — see our <a href="/data/australian-fuel-prices">Australian fuel price data</a> for the per-city figures and the 2026 excise timeline. For official fuel consumption figures, use the Australian Government&rsquo;s <a href="https://www.greenvehicleguide.gov.au/" target="_blank" rel="noopener noreferrer">Green Vehicle Guide</a>.</p>

        <h2>L/100km and MPG</h2>
        <p>
          Australian fuel figures are quoted in litres per 100 kilometres, where lower is better. If you have figures from a US or UK source in MPG, switch the toggle to miles and MPG — or convert with our <Link href="/blog/understanding-fuel-economy-mpg-vs-l100km">MPG vs L/100km guide</Link>; see also our <Link href="/blog/hybrid-vs-petrol-australia">hybrid vs petrol guide</Link>. For L/100km, annual fuel cost = (efficiency ÷ 100) × annual km × price per litre.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["hybrid-vs-gas-calculator"]} />

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
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown including fuel, insurance, and depreciation." },
        { title: "EV Charging Cost Australia", slug: "ev-charging-cost-australia", description: "Compare home, public, and fast charging costs for popular EVs." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly petrol price cycle explained — which day is cheapest." },
        { title: "Understanding Fuel Economy: MPG vs L/100km", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Convert between MPG and L/100km and calculate real fuel costs." },
      ]} />
    </div>
  );
}
