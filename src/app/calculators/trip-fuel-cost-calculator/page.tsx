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
import TripFuelCalc from "./TripFuelCalc";

export const metadata: Metadata = {
  title: "Trip Fuel Cost Calculator",
  description:
    "Calculate fuel cost for a road trip, return trip, commute week, or carpool split. Supports miles/MPG and km/L/100km.",
  alternates: { canonical: "/calculators/trip-fuel-cost-calculator" },
};

const relatedTools = [
  { title: "Boat Trip Fuel Planner", slug: "boat-fuel-calculator", description: "Plan marine fuel, cost and safe range." },
  { title: "Towing Fuel Cost Calculator", slug: "towing-fuel-cost-calculator", description: "Extra fuel cost when towing a trailer or caravan." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan weekly and monthly fuel spend." },
  { title: "Drive vs Fly Calculator", slug: "drive-vs-fly-calculator", description: "Compare total trip cost of driving versus flying." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See savings from better fuel economy." },
  { title: "Motorcycle Fuel Cost Calculator", slug: "motorcycle-fuel-cost-calculator", description: "Fuel cost for motorcycle trips." },
];

const faqs = [
  { question: "How do I calculate fuel cost for a road trip?", answer: "Divide your trip distance by your vehicle's fuel efficiency to get fuel used, then multiply by the fuel price. Formula (imperial): Fuel Cost = (Distance ÷ MPG) × Price per Gallon. Formula (metric): Fuel Cost = (L/100km ÷ 100) × Distance × Price per Litre. This calculator does all the maths instantly." },
  { question: "What is the average MPG for a car?", answer: "The average fuel economy for new cars in the US is approximately 28 MPG (combined). SUVs average 24–27 MPG, while trucks average 20–24 MPG. Older vehicles typically return 18–25 MPG. Hybrid vehicles achieve 45–55 MPG, and plug-in hybrids can exceed 60 MPGe in combined operation." },
  { question: "How much does a 500-mile road trip cost in gas?", answer: "A 500-mile trip at 30 MPG and $3.50/gallon costs approximately $58. At 25 MPG the cost rises to $70, and at 20 MPG it reaches $87.50. Use this calculator to get an exact figure for your vehicle and local petrol prices." },
  { question: "How do I convert L/100km to MPG?", answer: "To convert L/100km to MPG: divide 235.21 by your L/100km figure. For example, 8 L/100km = 235.21 ÷ 8 = 29.4 MPG. To convert MPG to L/100km: divide 235.21 by your MPG. This calculator accepts both units directly — just toggle the unit switch." },
  { question: "Does driving speed affect fuel cost?", answer: "Yes — significantly. Most vehicles achieve peak fuel efficiency at 55–65 mph (88–104 km/h). Driving at 75 mph versus 55 mph can reduce fuel economy by 15–25%, directly increasing trip cost. Reducing highway speed by 10 mph typically improves fuel economy by 2–4 MPG." },
];

const howToSteps = [
  { name: "Choose your unit system", text: "Select Miles/MPG for US and imperial measurements, or km/L per 100km for metric countries including Australia, Canada, and Europe." },
  { name: "Enter trip distance", text: "Type the total one-way distance of your trip. For return trips, double the distance. Use your GPS app or maps estimate for accuracy." },
  { name: "Enter fuel efficiency", text: "Enter your vehicle's fuel economy. Find this in your owner's manual, on the window sticker, or check fueleconomy.gov for your make and model." },
  { name: "Enter fuel price", text: "Use your local service station price per gallon or per litre. Check GasBuddy or local price apps for current regional prices." },
  { name: "Review fuel cost breakdown", text: "The calculator shows total fuel used, total cost, and cost per mile or km. Use this to compare routes or vehicle choices." },
];

export default function TripFuelCostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Trip Fuel Cost Calculator"
        description="Free road trip fuel cost calculator. Calculate total fuel cost for any trip using distance, MPG or L/100km, and petrol price."
        url="https://calcfuel.com/calculators/trip-fuel-cost-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Trip Fuel Cost Calculator", url: "https://calcfuel.com/calculators/trip-fuel-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified="2026-08-10"
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Trip Fuel Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Trip Fuel Cost Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Decide what a road trip, commute, or carpool will cost in fuel. Modes cover one-way, return, weekly commute, and cost-per-person splits.
      </p>
      <CalcReviewedBy lastUpdated="August 2026" />
      <TripFuelCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>How to Calculate Road Trip Fuel Cost</h2>
        <p>Calculating road trip fuel cost is straightforward when you know three things: how far you are driving, how efficiently your vehicle uses fuel, and what fuel costs at the pump. The formula differs slightly depending on which unit system you use.</p>
        <p><strong>Imperial (miles and gallons):</strong> Divide your total distance in miles by your vehicle's fuel economy in miles per gallon (MPG). This gives you total gallons used. Multiply that by the price per gallon to get your total fuel cost.</p>
        <p><strong>Metric (kilometres and litres):</strong> Divide your fuel consumption rate in litres per 100 kilometres (L/100km) by 100, then multiply by your trip distance in kilometres. This gives litres used. Multiply by the price per litre.</p>
        <p>For example: a 600 km trip in a vehicle using 8 L/100km at $1.85/litre costs (8 ÷ 100) × 600 × $1.85 = $88.80 in fuel.</p>

        <h2>Factors That Affect Road Trip Fuel Cost</h2>
        <h3>Vehicle Fuel Economy</h3>
        <p>Your vehicle's rated fuel economy is measured under controlled conditions and rarely matches real-world driving. Expect 10–20% lower efficiency than the official rating in real road trip conditions, particularly at highway speeds above 65 mph (105 km/h), in mountainous terrain, or in extreme temperatures. Sedan and hatchback drivers typically see figures close to the rated MPG on flat highway routes at legal speeds.</p>

        <h3>Driving Speed</h3>
        <p>Aerodynamic drag increases exponentially with speed. At 75 mph versus 55 mph, a typical vehicle consumes 15–25% more fuel per mile. For a 500-mile trip at 30 MPG ($3.50/gallon), slowing from 75 mph to 65 mph can save $5–$8 in fuel and takes only 12–15 extra minutes for every 100 miles of highway driving.</p>

        <h3>Cargo and Passengers</h3>
        <p>Every 100 lbs (45 kg) of extra weight reduces fuel economy by approximately 1–2%. A fully loaded family SUV with luggage and passengers can return 10–15% less than its rated highway MPG. Remove unnecessary cargo from your vehicle before a long trip to trim costs.</p>

        <h3>Terrain and Climate</h3>
        <p>Mountain driving, stop-and-go traffic, and extreme temperatures all reduce fuel economy. Air conditioning in hot weather typically reduces MPG by 5–25% depending on conditions. Cold temperatures below 0°C (32°F) can reduce fuel economy by 15–24% for short trips until the engine reaches operating temperature.</p>


        <h2>Fuel Price by Country (2025 Reference)</h2>
        <ul>
          <li><strong>Australia:</strong> AUD $1.70–$2.10 per litre for unleaded 91 (varies significantly by region)</li>
          <li><strong>United States:</strong> USD $3.00–$4.00 per gallon for regular unleaded (state-dependent)</li>
          <li><strong>United Kingdom:</strong> GBP £1.40–£1.60 per litre</li>
          <li><strong>Canada:</strong> CAD $1.60–$2.00 per litre (higher in BC and Yukon)</li>
          <li><strong>New Zealand:</strong> NZD $2.50–$3.00 per litre</li>
          <li><strong>Germany:</strong> EUR €1.60–€1.90 per litre</li>
        </ul>

        <h2>Tips to Reduce Road Trip Fuel Costs</h2>
        <ol>
          <li><strong>Inflate tyres to the correct pressure.</strong> Under-inflated tyres increase rolling resistance and reduce fuel economy by up to 3%. Check pressure at the start of every long trip when tyres are cold.</li>
          <li><strong>Drive at constant speeds.</strong> Use cruise control on motorways to maintain steady speed and avoid the fuel-wasting cycle of acceleration and braking. Cruise control can improve highway fuel economy by 7–14%.</li>
          <li><strong>Plan fuel stops strategically.</strong> Use apps like GasBuddy or PetrolSpy to find cheaper fuel along your route. Fuel prices vary by up to 20–30% between stations even in the same city.</li>
          <li><strong>Avoid peak traffic times.</strong> Stop-and-go traffic is extremely fuel-inefficient. Idling for 10 minutes burns approximately 0.1–0.2 gallons (0.4–0.7 litres) of fuel with zero forward progress.</li>
          <li><strong>Reduce aerodynamic drag.</strong> Remove roof racks and cargo carriers when not in use — even an empty roof rack increases drag and reduces fuel economy by 2–8% at highway speeds.</li>
        </ol>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["trip-fuel-cost-calculator"]} />

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
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly price cycle explained — save $150–$440/year by timing your fill-ups." },
        { title: "Understanding Fuel Economy: MPG vs L/100km", slug: "understanding-fuel-economy-mpg-vs-l100km", description: "Convert between MPG and L/100km and calculate real fuel costs." },
        { title: "Caravan Fuel Consumption Australia", slug: "caravan-fuel-consumption-australia", description: "Real-world L/100km figures and tips for towing fuel costs." },
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual cost breakdown: fuel, rego, insurance, tyres, servicing." },
      ]} />
    </div>
  );
}
