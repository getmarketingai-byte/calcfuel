import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import FuelBudgetPlannerCalc from "./FuelBudgetPlannerCalc";

export const metadata: Metadata = {
  title: "Fuel Budget Planner — Monthly & Annual Household Gas Cost Calculator",
  description: "Free household fuel budget planner. Calculate monthly and annual fuel costs for up to 3 vehicles. Supports miles/MPG and km/L per 100km. Compare against your fuel budget instantly.",
};

const relatedTools = [
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip by distance, MPG, and gas price." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily, weekly, and annual commute fuel costs." },
  { title: "Hybrid vs Gas Calculator", slug: "hybrid-vs-gas-calculator", description: "Compare 5-year total ownership cost between hybrid and petrol vehicles." },
  { title: "Carpool Fuel Split Calculator", slug: "carpool-fuel-split-calculator", description: "Split fuel costs fairly among carpool passengers." },
];

const faqs = [
  {
    question: "How do I calculate my monthly household fuel budget?",
    answer: "Multiply each vehicle's weekly fuel cost by 52 to get the annual cost, then divide by 12 for the monthly figure. Weekly fuel cost (imperial) = (weekly miles ÷ MPG) × price per gallon. Weekly fuel cost (metric) = (weekly km × L/100km ÷ 100) × price per litre. This planner does all calculations live as you type, covering up to three vehicles simultaneously.",
  },
  {
    question: "What is the average American household fuel spend per year?",
    answer: "According to the U.S. Bureau of Labor Statistics Consumer Expenditure Survey, the average American household spends approximately $2,500–$3,500 per year on gasoline and motor fuel. Two-vehicle households with higher commute distances can easily exceed $5,000 annually. Use this planner to find your exact figure based on your vehicles' efficiency and local fuel prices.",
  },
  {
    question: "How much does fuel economy affect the annual household budget?",
    answer: "Fuel economy has a dramatic impact. A household running two vehicles at 20 MPG versus 30 MPG, each driving 200 miles per week at $3.50/gallon, would spend approximately $1,820 more per year on fuel. Improving combined fleet economy by even 5 MPG across two vehicles can save $500–$900 annually at typical US fuel prices.",
  },
  {
    question: "Should I use the same fuel price for all vehicles?",
    answer: "You can enter a different fuel price per vehicle if your vehicles use different fuel grades (e.g. regular, premium, or diesel). Premium unleaded typically costs $0.20–$0.50 more per gallon than regular. Diesel prices vary independently of petrol. Entering accurate per-vehicle fuel prices gives a more precise household total.",
  },
  {
    question: "How accurate is the monthly fuel cost estimate?",
    answer: "The calculator assumes consistent weekly driving throughout the year and uses the exact efficiency and price figures you enter. Real-world costs vary due to seasonal driving changes, fluctuating fuel prices, and engine warm-up losses in winter. For best accuracy, use your actual average weekly mileage from the past 3 months and check current local fuel prices rather than relying on memory.",
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Choose Miles/MPG if you are in the US or UK, or km/L per 100km for Australia, Canada, New Zealand, or Europe. The labels on every input will update automatically.",
  },
  {
    name: "Enter your first vehicle's details",
    text: "Optionally name the vehicle (e.g. Family SUV), then enter its average weekly distance, fuel economy rating, and your current local fuel price. Results appear instantly.",
  },
  {
    name: "Add additional vehicles",
    text: "Click 'Add Vehicle' to include a second or third household vehicle. Each vehicle shows its own weekly, monthly, and annual cost. The household total updates automatically.",
  },
  {
    name: "Set a monthly budget target",
    text: "Enter your desired monthly household fuel budget in the optional field. The planner will show whether you are under or over budget and by how much.",
  },
  {
    name: "Review and adjust",
    text: "Tweak weekly distances or fuel economy figures to model scenarios — for example, switching to a more fuel-efficient vehicle, reducing discretionary driving, or comparing different fuel price scenarios.",
  },
];

export default function FuelBudgetPlannerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Fuel Budget Planner"
        description="Free household fuel budget planner. Calculate monthly and annual fuel costs for up to 3 vehicles. Supports miles/MPG and km/L per 100km."
        url="https://calcfuel.com/calculators/fuel-budget-planner"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Fuel Budget Planner", url: "https://calcfuel.com/calculators/fuel-budget-planner" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel & Energy</Link>
        <span className="mx-2">/</span>
        <span>Fuel Budget Planner</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Fuel Budget Planner
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your household's monthly and annual fuel costs across up to 3 vehicles. Enter each vehicle's weekly distance, fuel economy, and gas price — results update instantly. Supports miles/MPG and km/L per 100km.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <FuelBudgetPlannerCalc />

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Why You Need a Household Fuel Budget</h2>
        <p>
          Fuel is one of the largest recurring household expenses most families never actively track. Unlike a mortgage or rent payment that arrives as a single monthly bill, fuel costs accumulate in small, frequent transactions that feel invisible — a tank here, a top-up there — until you look at your bank statement and realise you have spent several hundred dollars that month without a clear picture of where it went.
        </p>
        <p>
          For a two-vehicle household in the United States with both adults commuting to work, annual fuel expenditure of $3,000–$6,000 is entirely normal. At the higher end, that is equivalent to a car payment, a family holiday, or months of grocery spending. Understanding exactly what your household spends on fuel — broken down by vehicle and time period — is the first step toward making smarter decisions about driving habits, vehicle purchases, and route planning.
        </p>

        <h2>How the Fuel Budget Calculation Works</h2>
        <p>
          The planner uses straightforward arithmetic based on your weekly driving distance, fuel economy, and local price at the pump.
        </p>
        <p>
          <strong>Imperial (miles and gallons):</strong> Weekly fuel cost = (weekly miles ÷ MPG) × price per gallon. For example: a vehicle driven 250 miles per week at 27 MPG with gas at $3.40/gallon costs (250 ÷ 27) × $3.40 = $31.48 per week, $136.91 per month, and $1,637 per year.
        </p>
        <p>
          <strong>Metric (kilometres and litres):</strong> Weekly fuel cost = (weekly km × L/100km ÷ 100) × price per litre. For example: 400 km/week at 9.5 L/100km at $1.90/litre costs (400 × 9.5 ÷ 100) × $1.90 = $72.20 per week, $314.20 per month, and $3,754 per year.
        </p>
        <p>
          Monthly figures use the formula <em>weekly cost × 52 ÷ 12</em> (4.333 weeks per month) for accuracy rather than simply multiplying by 4, which would understate costs by 8%.
        </p>

        <h2>Tips to Reduce Your Household Fuel Bill</h2>

        <h3>1. Consolidate Trips</h3>
        <p>
          Cold engine starts burn significantly more fuel per kilometre than a warm engine. Combining several short errands into one trip — rather than making separate journeys throughout the day — can reduce fuel consumption by 10–15% for urban driving patterns. Plan shopping, school pickup, and appointments into a single loop where possible.
        </p>

        <h3>2. Match the Right Vehicle to Each Trip</h3>
        <p>
          In a multi-vehicle household, use the most fuel-efficient vehicle for high-mileage commuting and reserve the larger or less efficient vehicle for specific needs (towing, large loads, weekend trips). If one vehicle returns 35 MPG and another 22 MPG, ensuring the higher-mileage driver uses the efficient car can save $600–$1,200 per year at typical US fuel prices.
        </p>

        <h3>3. Monitor Tyre Pressure Monthly</h3>
        <p>
          Under-inflated tyres are one of the most overlooked sources of fuel waste. A tyre at 25 PSI versus the recommended 35 PSI increases rolling resistance and reduces fuel economy by 2–4%. Check all four tyres — including the spare — on the first of each month when tyres are cold for the most accurate reading.
        </p>

        <h3>4. Track Local Fuel Price Cycles</h3>
        <p>
          In many regions, fuel prices follow weekly cycles, often dipping mid-week (Tuesday/Wednesday in Australia, Monday/Thursday in many US regions) before rising towards the weekend. Consistently fuelling on low-price days can save $100–$250 per year for a two-vehicle household. Apps like GasBuddy (US/Canada) and PetrolSpy (Australia) show live local prices across all nearby stations.
        </p>

        <h3>5. Use Cruise Control on Motorways</h3>
        <p>
          Human drivers naturally speed up and slow down more than necessary, especially on long highway sections. Cruise control maintains steady speed and eliminates this micro-variation, improving highway fuel economy by 7–14% depending on terrain. For a household where one or both adults drive 30+ minutes on motorways each day, this translates to a meaningful annual saving.
        </p>

        <h3>6. Re-evaluate at Every Fuel Price Change</h3>
        <p>
          Household fuel budgets should be treated as living numbers. When the price at the pump changes by $0.20/gallon or $0.15/litre, revisit this planner to recalculate your monthly and annual spend. A $0.30/gallon increase on a two-vehicle household each driving 200 miles/week at 25 MPG adds $499 to annual fuel costs — a meaningful enough change to warrant adjusting your budget or driving behaviour.
        </p>

        <h2>Multi-Vehicle Household Strategy</h2>
        <p>
          Households with two or three vehicles often find that one vehicle dominates fuel costs due to higher weekly mileage or lower fuel economy. The per-vehicle breakdown in this planner makes it easy to identify which vehicle contributes the most to your annual fuel bill. This is particularly valuable when considering a vehicle upgrade: replacing a 22 MPG SUV driven 300 miles/week with a 35 MPG crossover saves approximately $1,560 per year at $3.50/gallon — a figure that directly informs how quickly a newer, more efficient vehicle pays for itself in fuel savings alone.
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
