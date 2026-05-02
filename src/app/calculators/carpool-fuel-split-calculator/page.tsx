import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CarpoolFuelSplitCalc from "./CarpoolFuelSplitCalc";

export const metadata: Metadata = {
  title: "Carpool Fuel Cost Calculator — Split Gas Costs Fairly",
  description: "Free carpooling fuel cost calculator. Split gas costs fairly between driver and passengers. Supports miles/MPG and km/L per 100km, optional driver surcharge for vehicle wear.",
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip by distance, MPG, and gas price." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily, weekly, and annual commute fuel costs." },
  { title: "EV vs Gas Calculator", slug: "ev-vs-gas-calculator", description: "Compare 5-year and 10-year total cost of ownership for EVs and gas cars." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save annually by improving your vehicle's MPG." },
];

const faqs = [
  {
    question: "How do I split fuel costs fairly in a carpool?",
    answer: "The simplest fair split is to divide the total fuel cost equally by the number of people in the car, including the driver. For a 150-mile trip at 32 MPG with gas at $3.50/gallon (total cost: $16.41) split between 3 people, each person pays $5.47. If the driver wants a surcharge for vehicle wear and depreciation, passengers each pay a little more and the driver pays less — or even nothing — depending on the percentage agreed.",
  },
  {
    question: "Should the driver pay the same as passengers in a carpool?",
    answer: "That depends on the arrangement. In a pure cost-split carpool, the driver pays the same equal share as everyone else because the trip would have happened anyway. However, many carpools include a driver surcharge (commonly 10–20%) to compensate the driver for vehicle depreciation, insurance, tyre wear, and the extra time involved in coordinating pickups. A 10% surcharge on a $20 trip gives the driver back $2.00, shared across all passengers.",
  },
  {
    question: "What is a fair driver surcharge for a carpool?",
    answer: "A driver surcharge of 10–15% of total fuel cost is a common and widely accepted range. This accounts for vehicle wear, depreciation (typically $0.08–$0.12 per mile for an average car), and the admin of organising the carpool. Some arrangements go higher (20–25%) for longer trips or if the driver is significantly out of their way. For short commuting carpools, many drivers waive the surcharge entirely in exchange for camaraderie and reduced solo-driving stress.",
  },
  {
    question: "How does the carpool fuel split formula work?",
    answer: "Total fuel cost = (distance ÷ MPG) × price per gallon (imperial) or (L/100km ÷ 100 × km) × price per litre (metric). For an equal split, every person pays total ÷ number of people. When a driver surcharge is applied, each passenger pays (total × (1 + surcharge%)) ÷ number of people, and the driver pays total minus what all passengers pay combined. This ensures the extra surcharge amount is funded by passengers and credited back to the driver.",
  },
  {
    question: "Is it cheaper to carpool than drive alone?",
    answer: "Yes — significantly. A solo 150-mile trip at 30 MPG and $3.50/gallon costs $17.50. With 3 people sharing equally, each person pays just $5.83 — a 67% saving per person. Even with a 15% driver surcharge, passengers pay $6.70 each, still a 62% saving versus driving alone. Over a weekly commute, carpooling can save thousands of dollars per year per person and is one of the most effective ways to reduce personal transportation costs.",
  },
];

const howToSteps = [
  {
    name: "Choose your unit system",
    text: "Select Miles / MPG for US and imperial measurements, or km / L per 100km for metric countries. The calculator updates all labels and calculations automatically.",
  },
  {
    name: "Enter the trip distance",
    text: "Type the total one-way trip distance. For round trips, double the figure. Use your maps app or GPS navigation for an accurate distance before you depart.",
  },
  {
    name: "Select number of people",
    text: "Choose 2, 3, 4, or 5 from the preset buttons, or tap Custom to enter any number. Include the driver in your count — if there is 1 driver and 2 passengers, enter 3.",
  },
  {
    name: "Enter fuel economy and price",
    text: "Type your vehicle's fuel efficiency (MPG or L/100km) and the current fuel price at the pump. Check fueleconomy.gov or GasBuddy for accurate figures.",
  },
  {
    name: "Set an optional driver surcharge",
    text: "If the driver wants compensation for vehicle wear, enter a driver surcharge percentage (e.g. 10%). Leave it at 0 for a pure equal split. The calculator shows both the equal split and the surcharge split side-by-side so everyone can see the breakdown.",
  },
];

export default function CarpoolFuelSplitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Carpool Fuel Cost Calculator"
        description="Free carpooling fuel cost calculator. Split gas costs fairly between driver and passengers with optional driver surcharge."
        url="https://calcfuel.com/calculators/carpool-fuel-split-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Carpool Fuel Cost Calculator", url: "https://calcfuel.com/calculators/carpool-fuel-split-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link>
        <span className="mx-2">/</span>
        <span>Carpool Fuel Cost Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Carpool Fuel Cost Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Split gas costs fairly between driver and passengers. Enter trip distance, vehicle MPG or L/100km, fuel price, and number of people — with an optional driver surcharge for vehicle wear. Supports miles/MPG and km/L per 100km.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <CarpoolFuelSplitCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>The Economics of Carpooling: Why Splitting Fuel Costs Makes Sense</h2>
        <p>
          Carpooling is one of the most powerful yet underused tools for reducing personal transportation costs. When multiple people share a vehicle for a trip, the total fuel cost stays exactly the same — but the cost per person drops dramatically. A $40 tank of gas used for a group road trip costs just $10 per person in a four-person carpool. Over weeks and months, those savings compound into thousands of dollars.
        </p>
        <p>
          The challenge has always been figuring out a split that feels fair to everyone. Should the driver pay the same as passengers? Who covers the cost if someone drops out last minute? What happens when one person's destination is further than another's? This calculator focuses on the most common scenario: a shared trip from A to B where everyone agrees to split the fuel cost.
        </p>

        <h2>How Carpool Fuel Cost Splitting Works</h2>
        <p>
          The calculation has two components: the total fuel cost, and how to divide it.
        </p>
        <p>
          <strong>Total fuel cost (imperial):</strong> Divide trip distance (miles) by fuel economy (MPG) to get gallons used. Multiply by the price per gallon.
        </p>
        <p>
          <strong>Total fuel cost (metric):</strong> Multiply L/100km by distance (km), then divide by 100. That gives litres consumed. Multiply by the price per litre.
        </p>
        <p>
          <strong>Equal split:</strong> Divide total cost by the number of people in the car (including the driver). Everyone pays the same amount — fair when the driver has no extra expenses and the trip was happening regardless.
        </p>
        <p>
          <strong>With driver surcharge:</strong> The driver receives an extra percentage of the total fuel cost as compensation for vehicle depreciation, insurance, tyre wear, and the time cost of organising the carpool. Each passenger pays slightly more; the driver pays significantly less. The formula is: each passenger pays <em>(total cost × (1 + surcharge%)) ÷ number of people</em>. The driver pays the remainder.
        </p>

        <h2>The Driver Surcharge: Compensating for Vehicle Wear</h2>
        <p>
          Vehicle depreciation is real and often overlooked in informal carpool arrangements. Beyond the cost of fuel, every mile driven adds to tyre wear, brake pad consumption, oil degradation, and the gradual decline in resale value. The IRS business mileage rate (67 cents per mile in 2024) captures these costs and is used widely as a fair reimbursement benchmark.
        </p>
        <p>
          A driver surcharge in a fuel-split calculator is a simpler, more socially acceptable way to account for some of these costs without requiring a per-mile accounting. A 10% surcharge on a $25 fuel trip adds $2.50 to the pool — split across 3 passengers at $0.83 each — which goes a long way toward offsetting tyre wear on long trips. For regular commuting carpools that happen daily, even a modest 5–10% surcharge accumulates to meaningful annual compensation.
        </p>
        <p>
          Setting the surcharge percentage is a conversation best had upfront. Many carpool groups settle on 10–15% for occasional trips and waive it entirely for regular commutes where the driver genuinely values the company and the reduced toll on their own stress levels from highway driving.
        </p>

        <h2>Carpooling Savings: Real Numbers</h2>
        <p>
          Consider a daily commute of 40 miles round trip, 5 days per week, at 30 MPG and $3.50/gallon. Driving alone, fuel costs approximately $24.50 per week or $1,274 per year. In a 3-person carpool with an equal split, each person pays just $8.17 per week — a saving of $846 per year. For the driver adding a 15% surcharge, passengers pay $9.39 each and the driver pays $5.72 — still a $962 annual saving for passengers compared to driving solo.
        </p>
        <p>
          These numbers scale steeply for longer commutes and road trips. A 300-mile group road trip at 28 MPG and $3.60/gallon costs $38.57 in fuel. Equal split between 4 people is $9.64 each — about the cost of a fast-food lunch. Shared fuel costs are one of the few transportation savings that require no infrastructure investment, no special vehicle, and no change in behaviour beyond coordinating departure times.
        </p>

        <h2>Tips for Fair Carpool Arrangements</h2>
        <ul>
          <li>
            <strong>Agree on the split method before the trip.</strong> Discuss upfront whether you will use an equal split or a driver surcharge. Most disagreements happen when expectations differ rather than from bad intent.
          </li>
          <li>
            <strong>Use actual fuel price, not estimates.</strong> Gas prices fluctuate and can vary by 15–20% between stations. Use the price you actually paid at the pump for a precise calculation, not an assumed regional average.
          </li>
          <li>
            <strong>Account for detours and pickups.</strong> If the driver goes significantly out of their way to collect passengers, either increase the driver surcharge or calculate the total trip distance including the detour. A 10-mile detour on a 30 MPG car at $3.50/gallon adds $1.17 to the total cost.
          </li>
          <li>
            <strong>Track costs for recurring carpools.</strong> For regular commutes, run the calculator once and set up a recurring payment schedule. Apps like Venmo, PayPal, or Splitwise can automate weekly fuel-cost requests so nobody has to remember to ask.
          </li>
          <li>
            <strong>Consider tolls and parking separately.</strong> This calculator covers fuel only. For long trips, add toll and parking costs to the total and split them the same way as fuel — it keeps the accounting clean and transparent.
          </li>
          <li>
            <strong>Re-calculate when fuel prices change significantly.</strong> A 20-cent-per-gallon jump changes the split meaningfully on long trips. Recalculate at the pump and adjust the payment to avoid one party consistently subsidising another over time.
          </li>
        </ul>

        <h2>Carpool Fuel Cost Examples</h2>
        <p>
          <strong>Weekend road trip, 4 people, 200 miles, 28 MPG, $3.60/gallon:</strong> Total fuel = 7.14 gallons × $3.60 = $25.71. Equal split: $6.43 each. With 10% driver surcharge: passengers pay $7.07 each, driver pays $4.50.
        </p>
        <p>
          <strong>City carpool, 3 people, 45 km, 9 L/100km, $1.90/litre (metric):</strong> Total fuel = 4.05 L × $1.90 = $7.70. Equal split: $2.57 each. With 12% driver surcharge: passengers pay $2.87 each, driver pays $2.10.
        </p>
        <p>
          <strong>Interstate commute, 5 people, 120 miles, 35 MPG, $3.45/gallon:</strong> Total fuel = 3.43 gallons × $3.45 = $11.83. Equal split: $2.37 each. With 15% driver surcharge: passengers pay $2.72 each, driver pays $0.95.
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
