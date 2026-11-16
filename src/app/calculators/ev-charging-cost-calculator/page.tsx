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
import EvChargingCalc from "./EvChargingCalc";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { DMO_2026_27, DMO_RANGE, DMO_SOURCE, PUBLIC_DC_EXAMPLE, dmoCentsPerKwh } from "@/lib/electricity-prices";
import { aud, perLitre } from "@/lib/format";

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
/** 16 kWh/100km on the car's display, plus 10% charging losses at the wall. */
const WALL = 16 * 1.1;
const FULL = 60 * 1.1; // 60 kWh usable battery, 0→100%, wall energy
const DC = PUBLIC_DC_EXAMPLE.pricePerKwh;

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator (Australia)",
  description: "What an EV charge costs in Australia at home versus a public DC charger, including the 10-15% of energy that never reaches the battery.",
  alternates: { canonical: "/calculators/ev-charging-cost-calculator" },
};

const relatedTools = [
  { title: "EV vs Petrol Cost Calculator", slug: "ev-vs-gas-calculator", description: "Compare 5–10 year total cost of ownership: EV vs petrol." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "Find the break-even point where a hybrid's savings offset the price premium." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your monthly fuel budget across up to 3 vehicles." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by improving your fuel efficiency." },
];

const faqs = [
  {
    question: "How much does it cost to charge an electric car at home in Australia?",
    answer: `It is the kWh you put in times your price per kWh. A 60 kWh battery charged from empty to full draws about ${FULL.toFixed(0)} kWh at the wall with 10% losses — ${aud(FULL * DMO_RANGE.low, 2)} to ${aud(FULL * DMO_RANGE.high, 2)} at the AER's 2026–27 Default Market Offer all-in averages of ${(DMO_RANGE.low * 100).toFixed(1)}–${(DMO_RANGE.high * 100).toFixed(1)}c/kWh. An off-peak or EV plan usage rate will usually be lower; read it from your plan.`,
  },
  {
    question: "How much does it cost per 100 km to charge an EV?",
    answer: `An EV showing 16 kWh/100km needs about ${WALL.toFixed(1)} kWh from the wall once charging losses are added. That is ${aud(WALL * DMO_RANGE.low, 2)}–${aud(WALL * DMO_RANGE.high, 2)} per 100 km at Default Market Offer averages, and ${aud(WALL * DC, 2)} at a published $${DC.toFixed(2)}/kWh fast charger.`,
  },
  {
    question: "What electricity rate should I use for charging my EV at home?",
    answer: "The usage rate for the hours you charge — the off-peak rate if you charge overnight on a time-of-use plan, or the feed-in tariff you give up if you charge from solar. The daily supply charge does not change when you charge, so leave it out. Compare plans for your address on the AER's Energy Made Easy site, or Victorian Energy Compare in Victoria.",
  },
  {
    question: "How much does DC fast charging cost in Australia?",
    answer: `Each network sets its own price per kWh and some add idle fees, so check the app before you plug in. One published example is Viva Energy's 350 kW chargers at Geelong at $${DC.toFixed(2)}/kWh — several times typical home off-peak rates.`,
  },
  {
    question: "How does EV charging cost compare to petrol in Australia?",
    answer: `A petrol car using 8 L/100km costs ${aud(8 * PETROL, 2)} per 100 km at the ACCC five-city average of ${perLitre(PETROL)}/L. The 16 kWh/100km EV above costs ${aud(WALL * DMO_RANGE.high, 2)} per 100 km even at the highest Default Market Offer average — so home charging is cheaper on every reference price, while frequent fast charging narrows the gap.`,
  },
  {
    question: "What is the best time to charge an EV in Australia?",
    answer: "For most home chargers on time-of-use or off-peak tariffs, overnight charging between 11pm and 7am attracts the lowest rates. In states with significant solar penetration (SA, QLD, WA), solar feed-in tariffs during the middle of the day have declined, making midday charging from a home solar system increasingly attractive. If you have solar panels, charging during solar generation hours (10am–3pm) can be effectively free or near-free after the cost of the solar investment."
  },
  {
    question: "How long does it take to charge an EV at home?",
    answer: "Charging time depends on your charger type and car's onboard charger: A standard 10A/2.3kW wall socket charges at approximately 15–20 km of range per hour — slow but workable for overnight charging. A dedicated Level 2 home charger (7kW / 32A) charges at approximately 45 km of range per hour, fully charging most EVs in 8–12 hours. A 22kW three-phase charger (where available) charges at approximately 120–130 km/hour. Most Australian homes charge on 7kW single-phase chargers."
  },
  {
    question: "Do I need a special charger to charge an EV at home in Australia?",
    answer: "You can charge from a standard 10A powerpoint (slow, ~15 km/hour), but most EV owners install a dedicated 7kW wall charger (EVSE) for faster, safer overnight charging. A quality wall charger installation costs $800–$1,800 depending on charger brand, electrical panel distance, and your electrician. Brands available in Australia include Wallbox, Fronius, Zappi, Schneider Electric, and Tesla's own wall connector. Many electricity retailers and EV manufacturers offer charger incentives or subsidies."
  },
];

const howToSteps = [
  { name: "Choose Full Charge or Daily Commute mode", text: "Full / Partial Charge calculates the cost of a single charge session. Daily Commute calculates the ongoing cost of charging for your regular commute — daily, weekly, monthly, and annually." },
  { name: "Select your EV model", text: "Choose the closest match to your EV from the preset list, which uses real-world energy consumption figures. Select 'Enter my own' if you know your car's kWh/100km from your onboard computer or OBD data." },
  { name: "Select your electricity rate", text: "Choose your charging scenario — off-peak home, standard home, EV plan, or public charger. Select 'Enter my own' to use your actual tariff from your electricity bill." },
  { name: "Enter battery details (Full Charge mode)", text: "Enter your battery's usable capacity in kWh (in your car's specs or owner's manual), your current charge level, and your target charge level." },
  { name: "Enter commute distance (Commute mode)", text: "Enter your one-way distance in km or miles. The calculator doubles this for the round trip and calculates how much energy needs to be replenished each day." },
  { name: "Review your costs", text: "The calculator shows electricity used (from the wall, including charging losses), total charging cost, and a comparison to an equivalent petrol car cost for the same distance." },
];

export default function EvChargingCostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="EV Charging Cost Calculator Australia"
        description="Calculate EV home and public charging costs in Australia. Enter battery size and electricity rate to see cost per charge session or daily commute charging cost."
        url="https://calcfuel.com/calculators/ev-charging-cost-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "EV Charging Cost Calculator", url: "https://calcfuel.com/calculators/ev-charging-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
        datePublished="2026-07-01"
        dateModified={reviewIsoFor("/calculators/ev-charging-cost-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>EV Charging Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">EV Charging Cost Calculator Australia</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate how much it costs to charge your electric car at home or at a public charger. Choose your EV, electricity rate, and battery level — or use commute mode to see your weekly and annual charging bill.
      </p>
      <CalcReviewedBy path="/calculators/ev-charging-cost-calculator" />
      <EvChargingCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How Much Does It Cost to Charge an Electric Car in Australia?</h2>
        <p>Three numbers decide it: how much energy goes in, how much is lost on the way, and what each kWh costs at the time you charge. The calculator above takes all three. The tables below price them with published Australian figures so you can sanity-check the result.</p>

        <h2>What do Australian reference electricity prices imply?</h2>
        <p>The AER&rsquo;s Default Market Offer for 2026–27 caps standing-offer bills in NSW, south-east Queensland and South Australia. Dividing each annual reference bill by its benchmark usage gives an all-in price per kWh. Because it includes the daily supply charge, it overstates the true extra cost of charging, so read these as an upper bound for home charging.</p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr><th>Network area</th><th>All-in c/kWh</th><th>Per 100 km*</th><th>60 kWh full charge*</th></tr>
            </thead>
            <tbody>
              {DMO_2026_27.map((r) => (
                <tr key={r.network}>
                  <td>{r.network}</td>
                  <td>{dmoCentsPerKwh(r).toFixed(1)}c</td>
                  <td>{aud((WALL * dmoCentsPerKwh(r)) / 100, 2)}</td>
                  <td>{aud((FULL * dmoCentsPerKwh(r)) / 100, 2)}</td>
                </tr>
              ))}
              <tr><td>Public DC (Viva Energy Geelong, published)</td><td>{(DC * 100).toFixed(0)}c</td><td>{aud(WALL * DC, 2)}</td><td>{aud(FULL * DC, 2)}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">*16 kWh/100km shown on the car plus 10% charging losses ({WALL.toFixed(1)} kWh at the wall); 60 kWh battery from empty, {FULL.toFixed(0)} kWh at the wall. Source: <a href={DMO_SOURCE.url} target="_blank" rel="noopener noreferrer">{DMO_SOURCE.name}</a>, {DMO_SOURCE.published}.</p>

        <h2>How does it compare with petrol?</h2>
        <p>An 8 L/100km petrol car costs {aud(8 * PETROL, 2)} per 100 km at the ACCC five-city average of {perLitre(PETROL)}/L. For the EV to cost the same per 100 km, electricity would have to reach {((8 * PETROL) / WALL * 100).toFixed(0)}c per kWh at the wall — well above any Default Market Offer average, but within reach of public fast-charging prices.</p>

        <h2>Why do charging losses matter?</h2>
        <p>The kWh drawn from the wall is higher than the kWh the car reports, because some energy turns into heat in the charger, cables and battery. Losses are usually larger on slow charging from a standard power point. A smart wall charger reports the energy it delivers, which is the most accurate figure to use. Public chargers bill the energy they deliver, so you pay for their losses in the price.</p>

        <h2>How can you cut the cost of home charging?</h2>
        <h3>Time-of-use tariffs</h3>
        <p>Most retailers offer time-of-use plans with a cheaper overnight or midday rate. Scheduling charging into that window — most EVs and wall chargers can do it automatically — is the simplest saving available. Read the off-peak usage rate and its hours from the plan&rsquo;s fact sheet.</p>
        <h3>Solar</h3>
        <p>With rooftop solar, each kWh put into the car during the day costs the feed-in tariff you would otherwise have been paid, which is usually much lower than the grid price. Chargers that follow solar output make the most of it.</p>
        <h3>EV plans</h3>
        <p>Some retailers sell plans with a dedicated low-rate EV charging window. Compare them against ordinary time-of-use plans on Energy Made Easy using your own usage, since a cheap EV window can come with a higher supply charge or peak rate.</p>

        <h2>For a Full EV vs Petrol Comparison</h2>
        <p>This calculator focuses on charging costs only. For a full 5-year or 10-year total cost of ownership comparison — including purchase price difference, maintenance savings, registration, and insurance — use our <Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Cost Calculator</Link>.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["ev-charging-cost-calculator"]} />

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

      <CalcDisclaimer domain="electric" />

      <RelatedTools tools={relatedTools} />
      <RelatedGuides guides={[
        { title: "EV Charging Cost Australia: Home vs Public Charging", slug: "ev-charging-cost-australia", description: "Compare home, public, and fast charging costs for popular EVs." },
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing." },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly petrol price cycle — see what you save vs EV charging." },
        { title: "Understanding Fuel Economy: MPG vs L/100km", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Fuel economy maths explained for petrol vs electric comparison." },
      ]} />
    </div>
  );
}
