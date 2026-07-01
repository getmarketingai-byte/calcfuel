import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import MotorcycleFuelCalc from "./MotorcycleFuelCalc";

export const metadata: Metadata = {
  title: "Motorcycle Fuel Cost Calculator — Trip & Commute Costs | CalcFuel",
  description: "Free motorcycle fuel cost calculator. Calculate fuel cost per trip or daily commute — choose your bike type or enter your own L/100km or MPG. Supports metric and imperial.",
  alternates: { canonical: "/calculators/motorcycle-fuel-cost-calculator" },
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip in a car or truck." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily commute fuel costs — weekly, monthly, and annually." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by improving your fuel efficiency." },
  { title: "EV vs Gas Calculator", slug: "ev-vs-gas-calculator", description: "Compare total cost of ownership: electric vs petrol over 5–10 years." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your weekly and monthly fuel budget across multiple vehicles." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate the fuel cost of engine idling." },
];

const faqs = [
  {
    question: "How many litres per 100km does a motorcycle use?",
    answer: "Motorcycle fuel consumption varies widely by engine size and type. Small commuter bikes and scooters (125–250cc) typically use 2.5–4 L/100km. Naked and standard bikes (300–650cc) average 4–6 L/100km. Sports bikes (600–1000cc) use 6–8 L/100km, particularly at higher speeds. Large cruisers and tourers use 7–9 L/100km. Adventure bikes typically sit at 5–7 L/100km depending on riding style and terrain."
  },
  {
    question: "How do I calculate motorcycle fuel cost for a trip?",
    answer: "The formula is: Fuel cost = (L/100km ÷ 100) × distance × fuel price per litre. For example, a 200 km trip on a bike using 5 L/100km at $1.92/L costs (5 ÷ 100) × 200 × $1.92 = $19.20. In imperial: divide distance by MPG to get gallons used, then multiply by price per gallon. This calculator does all the maths automatically for both unit systems."
  },
  {
    question: "How much cheaper is a motorcycle to run than a car?",
    answer: "For fuel alone, a motorcycle is typically 40–65% cheaper per kilometre than a comparable car. A car using 10 L/100km at $1.90/L costs $0.19/km; a motorcycle using 5 L/100km costs $0.095/km — roughly half. Over a 15,000 km annual commute, that is a saving of approximately $1,400/year in fuel. Registration, insurance, and servicing costs for motorcycles are also generally lower, though purchase prices for newer bikes can be comparable to small cars."
  },
  {
    question: "Does riding style affect motorcycle fuel economy?",
    answer: "Significantly. Aggressive acceleration, high-speed riding, and frequent hard braking can increase fuel consumption by 30–50% versus smooth, steady-speed riding. At highway speeds above 130 km/h, aerodynamic drag on most upright motorcycle postures dramatically increases fuel use. Eco-conscious motorcyclists can achieve the lower end of their bike's consumption range by using smooth throttle inputs, anticipating traffic, and keeping steady speed on highways."
  },
  {
    question: "How does motorcycle tyre pressure affect fuel economy?",
    answer: "Tyre pressure has a meaningful effect on motorcycle fuel consumption. A tyre 10 PSI under-inflated increases rolling resistance by roughly 5–10%, which translates directly to higher fuel use and increased tyre wear. Check tyre pressures when cold (not ridden for at least 3 hours) against the manufacturer's recommended pressure in your owner's manual — not the maximum pressure stamped on the tyre sidewall."
  },
  {
    question: "Are motorcycles more fuel-efficient than cars?",
    answer: "In terms of fuel used per kilometre, most motorcycles are more efficient than cars: 4–7 L/100km for bikes vs 8–12 L/100km for typical cars. However, some large motorcycle engines (1800cc+ V-twins) can use as much fuel per km as a small car, especially at highway speeds. In terms of fuel used per passenger, motorcycles carry one or two people and use less fuel, making them very efficient for solo commuting."
  },
  {
    question: "How much does it cost to fill a motorcycle tank?",
    answer: "Motorcycle fuel tanks range from about 10 litres (small scooters) to 22 litres (large tourers). At $1.92/L, a 15-litre tank fill costs approximately $28.80. A 20-litre tank costs $38.40. Because motorcycles are fuel-efficient and tanks are small, most riders fill up more frequently but spend less per fill than car drivers. A typical mid-range motorcycle might spend $25–$40 per fill and travel 250–400 km between fills."
  },
];

const howToSteps = [
  { name: "Choose your unit system", text: "Select km/L per 100km for Australia and metric countries, or Miles/MPG for US measurements." },
  { name: "Select Single Trip or Daily Commute", text: "Single Trip calculates fuel cost for one journey. Daily Commute automatically doubles the distance for a round trip and calculates weekly, monthly, and annual costs." },
  { name: "Enter your distance", text: "For single trips, enter the total trip distance. For commutes, enter your one-way distance — the calculator handles the return leg automatically." },
  { name: "Select your motorcycle type", text: "Choose the closest match from the preset list. Each preset uses a typical real-world fuel consumption figure for that category. Select 'Enter my own' if you know your bike's actual figures from fill-up records." },
  { name: "Enter the fuel price", text: "Enter the current pump price per litre or per gallon. Check your local servo, MotorMouth, or GasBuddy for current prices." },
  { name: "Read your results", text: "For single trips: total fuel cost and cost per km. For commutes: daily, weekly, monthly, and annual fuel cost based on your riding days." },
];

export default function MotorcycleFuelCostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Motorcycle Fuel Cost Calculator"
        description="Calculate motorcycle fuel cost per trip or daily commute. Choose from bike type presets or enter your own L/100km or MPG. Supports metric and imperial."
        url="https://calcfuel.com/calculators/motorcycle-fuel-cost-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Motorcycle Fuel Cost Calculator", url: "https://calcfuel.com/calculators/motorcycle-fuel-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
        datePublished="2026-07-01"
        dateModified="2026-07-01"
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link><span className="mx-2">/</span>
        <span>Motorcycle Fuel Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Motorcycle Fuel Cost Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate how much your motorcycle costs to run — per trip or as a daily commute. Choose your bike type or enter your own fuel use. Supports L/100km and MPG.
      </p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <MotorcycleFuelCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How Much Does a Motorcycle Cost to Run in Fuel?</h2>
        <p>Motorcycles are one of the most fuel-efficient ways to travel on Australian roads. Most mid-range bikes use 4–7 L/100km, compared to 8–12 L/100km for the average car. For a commuter riding 30 km each way, five days a week, that translates to approximately $35–$60/month in fuel at current prices — versus $80–$130/month for a typical family car making the same run.</p>
        <p>That said, fuel cost varies considerably by motorcycle type. A 125cc commuter scooter at 3 L/100km has a very different cost profile than a 1,800cc cruiser at 9 L/100km. This calculator uses research-based preset figures for six major motorcycle categories, so you can get an accurate estimate without needing to track your own fill-ups first.</p>

        <h2>Fuel Consumption by Motorcycle Type</h2>
        <p>The following figures are typical real-world fuel consumption for each category, under mixed riding conditions:</p>
        <table>
          <thead>
            <tr>
              <th>Motorcycle Type</th>
              <th>Engine Size</th>
              <th>Typical L/100km</th>
              <th>Typical MPG</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Small commuter / scooter</td><td>125–250cc</td><td>2.5–4.5</td><td>52–94</td></tr>
            <tr><td>Naked / standard</td><td>300–650cc</td><td>4–6</td><td>39–59</td></tr>
            <tr><td>Sport / supersport</td><td>600–1000cc</td><td>5.5–8</td><td>29–43</td></tr>
            <tr><td>Adventure / dual-sport</td><td>650–1200cc</td><td>5–7</td><td>34–47</td></tr>
            <tr><td>Cruiser / touring</td><td>800–1800cc</td><td>6.5–9</td><td>26–36</td></tr>
            <tr><td>Large tourer</td><td>1200cc+</td><td>7–10</td><td>23–34</td></tr>
          </tbody>
        </table>
        <p>These figures represent mixed urban/highway riding. Pure highway riding at legal speeds is generally more efficient; urban stop-start riding increases consumption. Hard acceleration and speeds above 130 km/h increase fuel use markedly across all categories.</p>

        <h2>Motorcycle vs Car: Fuel Cost Comparison</h2>
        <p>For commuters choosing between a motorcycle and a car, fuel cost is one of the most significant ongoing differences:</p>
        <ul>
          <li><strong>Typical car:</strong> 10 L/100km at $1.92/L = $0.192/km</li>
          <li><strong>Mid-range motorcycle:</strong> 5.5 L/100km at $1.92/L = $0.1056/km</li>
          <li><strong>Small scooter:</strong> 3.5 L/100km at $1.92/L = $0.0672/km</li>
        </ul>
        <p>For a 25 km one-way commute (50 km round trip), 5 days per week, 48 working weeks per year:</p>
        <ul>
          <li>Car: $0.192 × 12,000 km = <strong>$2,304/year</strong></li>
          <li>Mid-range motorcycle: $0.1056 × 12,000 km = <strong>$1,267/year</strong> — saving $1,037</li>
          <li>Small scooter: $0.0672 × 12,000 km = <strong>$806/year</strong> — saving $1,498</li>
        </ul>
        <p>These figures are fuel only. When you add in motorcycle registration (lower than most cars in Australian states), insurance, and servicing, commuter motorcycles and scooters remain significantly cheaper to operate annually than equivalent cars for urban commuting.</p>

        <h2>Tips to Improve Motorcycle Fuel Economy</h2>
        <ol>
          <li><strong>Smooth throttle inputs.</strong> Aggressive acceleration from stops is the single largest consumer of fuel on urban routes. Gentle, progressive acceleration followed by engine braking at deceleration significantly reduces consumption.</li>
          <li><strong>Maintain correct tyre pressure.</strong> Check pressures monthly when cold. Under-inflated tyres increase rolling resistance and fuel use by 5–10%. Use the pressure from your owner's manual, not the maximum marked on the tyre.</li>
          <li><strong>Ride at moderate highway speeds.</strong> Aerodynamic drag increases with the square of speed. A naked bike at 110 km/h faces much more drag than at 90 km/h. Many riders find their consumption improves by 1–2 L/100km by reducing cruise speed from 110 to 95–100 km/h.</li>
          <li><strong>Service your chain.</strong> A dry or stretched chain can reduce drive efficiency by 1–3%. Clean and lubricate regularly according to your manufacturer's schedule.</li>
          <li><strong>Use the correct engine oil grade.</strong> Modern engines are tuned for specific oil viscosities. Using a heavier-than-recommended oil increases internal friction and fuel consumption slightly.</li>
          <li><strong>Keep the air filter clean.</strong> A clogged air filter restricts airflow, richening the fuel mixture and increasing consumption. Check your manufacturer's service interval.</li>
          <li><strong>Time fuel purchases.</strong> In Australia, petrol prices follow a weekly cycle, typically peaking mid-week and bottoming out on weekends in major cities. Apps like MotorMouth or GasBuddy show current prices at nearby servos.</li>
        </ol>

        <h2>Is a Motorcycle Worth It for Commuting?</h2>
        <p>For urban commuters in Australian cities, motorcycles offer compelling economics beyond just fuel. Lane filtering (legal in all Australian states and territories) reduces effective commute time by 20–40% in heavy traffic. Parking in cities is often free or significantly cheaper for motorcycles. Registration and insurance are typically lower than equivalent cars.</p>
        <p>The trade-off is exposure risk — motorcyclists are statistically over-represented in road casualty data, and all-weather commuting is less comfortable than a car. But for fair-weather or mild-climate commuters, the combination of fuel savings, faster commutes, and lower running costs makes motorcycles a financially compelling option.</p>
        <p>Use the commute mode in this calculator to see your annual fuel saving compared to your current vehicle. Compare with our <Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link> to see what your car commute costs, then evaluate the difference.</p>
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

      <aside className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> Fuel consumption presets are approximate typical figures based on real-world data. Actual consumption depends on engine condition, riding style, tyre pressure, load, terrain, and weather. Use these as planning estimates only. Check current Australian fuel prices via <a href="https://www.motormouth.com.au/" className="underline" target="_blank" rel="noopener noreferrer">MotorMouth</a> or <a href="https://www.accc.gov.au/consumers/petrol-and-fuel" className="underline" target="_blank" rel="noopener noreferrer">ACCC fuel guide</a>.
      </aside>

      <RelatedTools tools={relatedTools} />
      <RelatedGuides guides={[
        { title: "Motorcycle vs Car Running Costs Australia", slug: "motorcycle-vs-car-running-costs-australia", description: "Full cost breakdown: is a motorbike actually cheaper than a car?" },
        { title: "Best Time to Buy Petrol in Australia", slug: "best-time-to-buy-petrol-australia", description: "The weekly petrol price cycle — cheapest day to fill up by city." },
        { title: "How Much Does It Cost to Run a Car in Australia?", slug: "car-running-costs-australia", description: "Full annual car cost breakdown for comparison." },
        { title: "How to Reduce Your Commute Fuel Costs", slug: "how-to-reduce-commute-fuel-costs", description: "Seven practical strategies to cut your daily commute fuel costs." },
      ]} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
