import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import DriveVsFlyCalc from "./DriveVsFlyCalc";

export const metadata: Metadata = {
  title: "Drive vs Fly Calculator — Road Trip vs Flight Cost Comparison",
  description:
    "Compare the true total cost of driving versus flying for your next trip. Includes fuel, tolls, parking, rental car, airport fees, and cost per person.",
  alternates: { canonical: "/calculators/drive-vs-fly-calculator" },
};

const relatedTools = [
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily and annual commute fuel costs." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Carpool Fuel Split Calculator", slug: "carpool-fuel-split-calculator", description: "Split trip fuel costs fairly between passengers." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan and track your monthly fuel spending." },
];

const faqs = [
  {
    question: "Is it cheaper to drive or fly?",
    answer:
      "It depends heavily on the number of passengers, trip distance, and extra costs like airport parking and rental cars. Driving often wins for families of 3–4 travelling 300–600 miles, where the per-person cost of flying (ticket + airport parking + rental car) significantly exceeds the shared fuel and toll costs. For solo travellers on distances over 500 miles, flying is usually cheaper once you account for vehicle wear and the time cost of driving.",
  },
  {
    question: "What hidden costs should I include when comparing driving vs flying?",
    answer:
      "For driving: fuel, tolls, parking at your destination, and vehicle wear and tear (typically 10–20 cents per mile). For flying: airport parking (or rideshare to/from airport), baggage fees, rental car at destination, and potential overnight stays if connecting. Both modes also carry a time cost — factor in your hourly value and the total travel time for each option.",
  },
  {
    question: "How does number of passengers affect the drive vs fly decision?",
    answer:
      "Driving costs are mostly fixed per trip — fuel, tolls, and wear are the same whether one person or four ride along. Flying costs scale linearly: four tickets cost four times as much. This is why driving typically becomes the clear winner for families. The break-even is often around 2 passengers for mid-range distances (400–700 miles), where shared driving costs undercut two round-trip tickets plus airport expenses.",
  },
  {
    question: "Should I include vehicle wear and tear in the calculation?",
    answer:
      "Yes — vehicle wear is a real cost often overlooked. The IRS standard mileage rate for 2024 is 67 cents/mile, which includes fuel, maintenance, and depreciation. If you enter just fuel costs, add a separate wear rate of 8–12 cents/mile to account for tyre wear, oil, and mechanical depreciation. This calculator lets you enter a custom wear rate so you can include it or leave it at zero if you prefer to calculate fuel-only driving costs.",
  },
];

const howToSteps = [
  {
    name: "Select unit system",
    text: "Choose imperial (miles, USD) or metric (km, local currency). Imperial is pre-selected for US travellers; metric suits Australian, Canadian, and European trips.",
  },
  {
    name: "Enter driving details",
    text: "Enter the one-way trip distance, your vehicle's fuel economy (MPG or L/100km), current fuel price, number of passengers, toll costs, destination parking, and optionally your hourly time value and hours driving.",
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
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Drive vs Fly Calculator", url: "https://calcfuel.com/calculators/drive-vs-fly-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link><span className="mx-2">/</span>
        <span>Drive vs Fly Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Drive vs Fly Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Compare the true total cost of driving versus flying for your next trip — including fuel, tolls, parking, rental cars, and cost per person.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <DriveVsFlyCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Drive vs Fly: Which Is Actually Cheaper?</h2>
        <p>
          The question of whether to drive or fly is one of the most common travel dilemmas. At first glance, a $79 flight seems far cheaper than a
          full tank of gas. But once you layer in airport parking, checked baggage, a rental car at your destination, and the hidden cost of driving
          to and from two airports, the math often flips. This calculator helps you see the full picture by comparing every dollar each mode of
          travel actually costs you.
        </p>
        <p>
          The single biggest variable is the number of passengers. Because driving costs (fuel, tolls, wear) are largely shared across everyone in
          the vehicle, each additional passenger dramatically reduces the per-person driving cost. Flying has no such economy of scale — five tickets
          cost five times as much. For families of three or four, driving often costs half what flying does, even on trips of 600–800 miles.
        </p>

        <h2>The True Cost of Driving</h2>
        <p>
          Most people underestimate the cost of driving by only accounting for fuel. A complete driving cost calculation includes:
        </p>
        <ul>
          <li>
            <strong>Fuel:</strong> Distance divided by fuel economy, multiplied by the current pump price. For a 600-mile round trip at 28 MPG and
            $3.50/gallon, that is approximately $75 in fuel.
          </li>
          <li>
            <strong>Tolls:</strong> Toll roads on major routes can add $15–$60 each way, depending on the state and route. Always check the actual
            toll costs for your planned route using a tool like TollGuru or Google Maps toll estimates.
          </li>
          <li>
            <strong>Parking at destination:</strong> Hotel and attraction parking in major cities often costs $25–$50 per night, which adds up
            quickly over a multi-day trip.
          </li>
          <li>
            <strong>Vehicle wear and tear:</strong> The IRS standard mileage rate (67 cents/mile in 2024) captures the full cost of operating a
            vehicle, including depreciation. If you only account for fuel, add at least 8–12 cents per mile for mechanical wear.
          </li>
          <li>
            <strong>Time value:</strong> If driving takes 8 hours and flying takes 2 hours, and you value your time at $30/hour, the extra 6 hours
            of driving costs $180 in opportunity cost. This is subjective but worth quantifying.
          </li>
        </ul>

        <h2>The True Cost of Flying</h2>
        <p>
          Airfare is the most visible flying cost, but rarely the only one. A complete flying cost includes:
        </p>
        <ul>
          <li>
            <strong>Airfare:</strong> The advertised ticket price is the base. Add seat selection fees ($15–$60 per person per flight), checked
            baggage ($35–$70 per bag each way), and any change or cancellation fees.
          </li>
          <li>
            <strong>Airport parking:</strong> Most major US airports charge $25–$45 per day for on-site parking. A 5-day trip can cost $125–$225 in
            parking alone, which is often more than the fuel cost of driving.
          </li>
          <li>
            <strong>Ground transport:</strong> Getting to and from the airport — rideshare, taxi, or long-term parking — at both the departure and
            arrival airports. A round-trip rideshare to a major airport can cost $60–$120.
          </li>
          <li>
            <strong>Rental car at destination:</strong> If you fly into a city and need a car to get around, rental car costs ($50–$120 per day
            plus fuel and insurance) often eliminate most of the airfare savings versus driving your own vehicle.
          </li>
        </ul>

        <h2>When Driving Wins</h2>
        <p>Driving is usually the better financial choice when:</p>
        <ul>
          <li>You are travelling with 3 or more people</li>
          <li>The round-trip distance is under 800 miles (1,300 km)</li>
          <li>You need a car at your destination (avoiding a rental car entirely)</li>
          <li>Airport parking costs are high and no convenient alternative exists</li>
          <li>You are travelling with significant luggage that would incur baggage fees</li>
          <li>Flights are expensive or inconveniently routed with long layovers</li>
        </ul>

        <h2>When Flying Wins</h2>
        <p>Flying is usually the better financial choice when:</p>
        <ul>
          <li>You are travelling solo or as a couple</li>
          <li>The trip distance exceeds 1,000 miles (1,600 km) — driving time becomes prohibitive</li>
          <li>Flight prices are low and you have no checked baggage</li>
          <li>You do not need a rental car at the destination (walkable city, public transport, or ride-share)</li>
          <li>You value time highly — flying frees hours that driving cannot</li>
        </ul>

        <h2>The Break-Even Distance</h2>
        <p>
          As a general rule of thumb, driving and flying cost roughly the same for a solo traveller at around 400–600 miles round-trip (640–960 km),
          assuming average US prices and no rental car at the destination. Below that distance, driving is often cheaper even for one person. Above
          that distance, the time cost of driving starts to outweigh the financial savings unless you are travelling with multiple passengers.
        </p>
        <p>
          For Australian travellers, the calculus differs because domestic airfares are higher relative to fuel costs. The break-even for a solo
          driver using the metric settings of this calculator typically falls around 600–900 km round-trip.
        </p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

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

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
