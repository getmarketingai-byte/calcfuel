import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Caravan Fuel Consumption Australia: How Much Fuel Does Towing a Caravan Use?",
  description:
    "How much fuel does towing a caravan use in Australia? Real-world L/100km figures, diesel vs petrol comparisons, speed effects, and tips to reduce towing fuel costs on Australian roads.",
  path: "/blog/caravan-fuel-consumption-australia",
  type: "article",
});

const faqs = [
  {
    question: "How much fuel does towing a caravan use in Australia?",
    answer: "Towing a typical Australian caravan (1,500–2,200 kg) increases fuel consumption by 20–35% over normal driving. A diesel 4WD that normally uses 10 L/100km will typically see 12.5–14 L/100km when towing at 100 km/h on flat roads. On hilly terrain or at 110 km/h, figures of 15–18 L/100km are common. Lighter camper trailers (750–1,500 kg) add 15–22% to fuel use; heavy fifth-wheel caravans over 2,500 kg can push the penalty beyond 35–40%.",
  },
  {
    question: "What is a realistic towing fuel cost for a 1,000 km trip in Australia?",
    answer: "For a 1,000 km trip towing a mid-size caravan: at 13 L/100km towing consumption and $1.95/L fuel price, total fuel cost is (13/100) × 1,000 × $1.95 = $253.50. Without the caravan at 10 L/100km, the same trip costs $195 — so towing adds approximately $58.50 for every 1,000 km. Use our Towing Fuel Cost Calculator to get an exact figure based on your vehicle and caravan.",
  },
  {
    question: "Does driving slower really reduce caravan towing fuel use?",
    answer: "Yes — dramatically. Aerodynamic drag increases with the square of speed, and a caravan presents a large, flat frontal area. Going from 110 km/h to 90 km/h when towing typically reduces fuel consumption by 2–4 L/100km. Many experienced Australian caravanners report their towing figures drop from 16–18 L/100km at 110 km/h to 12–14 L/100km at 90–95 km/h. Speed is the single most impactful lever you can pull on towing fuel costs.",
  },
  {
    question: "Is diesel more fuel-efficient than petrol for towing a caravan in Australia?",
    answer: "Generally yes. Diesel engines produce peak torque at lower RPM, which suits sustained highway towing. Diesel fuel also contains about 12% more energy per litre than petrol. In practice, a diesel 4WD typically uses 12–15 L/100km towing a 2,000 kg caravan, while a comparable petrol V6 uses 15–20 L/100km. At similar pump prices, the diesel vehicle's lower consumption often translates to meaningfully lower trip fuel costs.",
  },
  {
    question: "How do I calculate my towing fuel cost for a caravan trip?",
    answer: "The formula is: Fuel cost = (towing L/100km ÷ 100) × distance × fuel price per litre. For example, towing at 13 L/100km for 500 km at $1.90/L: (13 ÷ 100) × 500 × $1.90 = $123.50. To find your towing L/100km, take your normal consumption and multiply by (1 + penalty%). A typical penalty is 25% for a standard van caravan. Our Towing Fuel Cost Calculator handles all this automatically.",
  },
  {
    question: "What vehicles are most fuel-efficient for towing a caravan in Australia?",
    answer: "The most fuel-efficient caravan tow vehicles in Australia are modern diesel utes and SUVs. The Toyota LandCruiser 300 Series (3.3L twin-turbo diesel) typically achieves 12–14 L/100km towing. The Ford Everest (3.0L V6 diesel) is known for efficient towing at 11–13 L/100km. The Isuzu MU-X and Toyota Fortuner diesel variants also return competitive figures around 12–15 L/100km. Diesel hybrid SUVs such as the Mitsubishi Outlander PHEV are efficient for lighter caravans under 1,500 kg.",
  },
  {
    question: "How does caravan weight affect fuel consumption?",
    answer: "Caravan weight affects fuel consumption in two main ways: aerodynamic drag (dominant at highway speeds) and rolling resistance/inertia (dominant during acceleration and on hills). A caravan that is 500 kg heavier typically adds 2–5% more fuel consumption on flat highway routes where aerodynamics dominate, and 5–10% more on hilly routes where the engine must work harder to maintain speed uphill. The caravan's frontal area and aerodynamic profile can be as important as total mass.",
  },
  {
    question: "Should I use cruise control when towing a caravan in Australia?",
    answer: "On flat to gently undulating roads, cruise control reduces fuel use by eliminating small speed fluctuations. However, on hilly terrain — common in much of inland Australia — cruise control can cause the vehicle to downshift aggressively to maintain speed on uphills, burning more fuel than gentle manual speed management. The general advice is: use cruise control on flat or mildly undulating roads, disengage on significant hills and let your speed drop slightly on the incline, recovering gradually on the descent.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function CaravanFuelConsumptionPage() {
  return (
    <BlogArticleLayout
      title="Caravan Fuel Consumption Australia: How Much Fuel Does Towing a Caravan Use?"
      description="How much fuel does towing a caravan really use in Australia? Real-world L/100km figures for common 4WDs, diesel vs petrol breakdown, speed impact data, and practical tips to cut your towing fuel bill."
      publishedDate="2026-06-30"
      readTime="9 min read"
      category="Fuel & Caravan"
      slug="caravan-fuel-consumption-australia"
      authorName="CalcFuel Editorial Team"
      authorRole="Fuel & Energy Calculators"
      authorBio="Our team builds practical calculators and guides for Australian drivers, caravanners, and anyone tracking their fuel spend."
      relatedLinks={[
        { href: "/calculators/towing-fuel-cost-calculator", label: "Towing Fuel Cost Calculator" },
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
        { href: "/calculators/fuel-budget-planner", label: "Fuel Budget Planner" },
        { href: "/calculators/boat-fuel-calculator", label: "Boat Fuel Calculator" },
        { href: "/blog/understanding-fuel-economy-mpg-vs-l100km", label: "Understanding Fuel Economy: MPG vs L/100km" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p>
        Australia has one of the highest rates of caravan ownership in the world — over 600,000 registered caravans hit the road each year, from weekend escapes on the coast to multi-month grey nomad circuits of the continent. And for every one of those caravans, the biggest variable cost is fuel.
      </p>
      <p>
        The problem is that most published fuel economy figures are for vehicles without a trailer attached. Once you hitch up a caravan, fuel consumption can increase by 20–40% or more. This guide gives you the real-world numbers, explains why towing burns so much more fuel, and shows you exactly how to calculate and reduce your own towing fuel cost.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="my-6" />

      <h2>How Much Does Towing a Caravan Actually Increase Fuel Use?</h2>
      <p>
        The short answer: expect <strong>20–35% more fuel</strong> for a typical Australian van-style caravan weighing 1,500–2,200 kg, towed at 90–110 km/h on sealed roads.
      </p>
      <p>
        Here are typical real-world towing fuel consumption figures for common Australian tow vehicles:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-orange-50 dark:bg-orange-950">
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Vehicle</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Normal L/100km</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Towing L/100km (van caravan)</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Penalty %</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Toyota LandCruiser 300 (diesel)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">9.5–10.5</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">13–16</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">25–35%</td></tr>
            <tr className="bg-gray-50 dark:bg-gray-800"><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Ford Ranger / Everest (diesel)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">8.5–10</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">12–15</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">22–32%</td></tr>
            <tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Toyota HiLux (diesel)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">8–9.5</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">12–15.5</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">25–35%</td></tr>
            <tr className="bg-gray-50 dark:bg-gray-800"><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Mitsubishi Triton (diesel)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">7.5–9</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">11–14</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">22–33%</td></tr>
            <tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Ford Territory / Kuga (petrol)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">9–11</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">14–18</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">30–40%</td></tr>
            <tr className="bg-gray-50 dark:bg-gray-800"><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Isuzu MU-X (diesel)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">8–9.5</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">11.5–14</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">20–30%</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 -mt-3 mb-4">Figures are real-world estimates from owner reports and caravan club data. Your results will vary with caravan type, weight, towing speed, and terrain.</p>

      <p>
        Want to calculate your exact towing fuel cost? Try our{" "}
        <Link href="/calculators/towing-fuel-cost-calculator" className="text-orange-500 underline font-medium">
          Towing Fuel Cost Calculator
        </Link>{" "}
        — enter your vehicle&apos;s normal L/100km, select your trailer type, and it applies the appropriate fuel penalty to show you total trip cost.
      </p>

      <h2>Why Does Towing a Caravan Use So Much More Fuel?</h2>

      <h3>1. Aerodynamic Drag (the biggest factor)</h3>
      <p>
        At highway speeds, aerodynamic drag is the dominant reason towing is so expensive in fuel. A caravan presents a large, flat frontal area — often 2.5–3 square metres — compared to the tapered rear of the tow vehicle. This creates a massive wall of air resistance at speed.
      </p>
      <p>
        Critically, aerodynamic drag increases with the <em>square</em> of speed. Going from 90 to 110 km/h doesn&apos;t just add a little more drag — it multiplies it significantly. This is why speed management is the single most powerful tool for cutting towing fuel costs, which we&apos;ll cover below.
      </p>

      <h3>2. Rolling Resistance</h3>
      <p>
        A typical twin-axle caravan adds four extra tyres to the road, each contributing friction. Combined, this rolling resistance is significant, particularly at lower speeds or on rough roads. Proper tyre inflation on both the tow vehicle and caravan is essential — a tyre 10 PSI under-inflated can increase rolling resistance by 5–10%.
      </p>

      <h3>3. Weight and Inertia</h3>
      <p>
        The combined weight of vehicle and caravan can reach 5,000–7,000 kg for a large rig. This weight matters most during acceleration (every time you accelerate from a stop or overtake) and on uphill grades. Flat terrain minimises the weight penalty; hilly routes in the Great Dividing Range, Tasmanian highlands, or the Snowy Mountains can dramatically increase towing fuel use.
      </p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <h2>The Biggest Factor: Speed</h2>
      <p>
        Speed deserves its own section because the impact is so large and so immediately actionable. Here is what real-world caravanners consistently find:
      </p>
      <ul>
        <li><strong>110 km/h towing:</strong> 16–19 L/100km (typical for a 2,000 kg caravan behind a diesel ute)</li>
        <li><strong>100 km/h towing:</strong> 13–16 L/100km — saving 2–3 L/100km</li>
        <li><strong>90 km/h towing:</strong> 11–14 L/100km — saving a further 2–3 L/100km</li>
      </ul>
      <p>
        The difference between 110 and 90 km/h on a 2,000 km trip (say, Sydney to Cairns one way) can easily be <strong>$100–$150 in fuel</strong> — and you only add an hour or two to the total drive time. Most speed-limited caravanning states have a maximum tow speed of 100 km/h or less anyway.
      </p>

      <h2>Diesel vs Petrol for Caravan Towing in Australia</h2>
      <p>
        The diesel vs petrol debate is a live one in Australian caravanning, but the practical reality for long-distance towing heavily favours diesel for most setups:
      </p>
      <ul>
        <li><strong>Torque curve:</strong> Diesel engines produce peak torque at 1,500–2,500 RPM, ideal for sustained highway towing. Petrol engines often need to rev higher to produce equivalent torque, burning more fuel in the process.</li>
        <li><strong>Energy density:</strong> Diesel contains approximately 38 MJ/L vs 34 MJ/L for petrol — roughly 12% more energy per litre. This partly explains lower L/100km figures for diesel despite similar-sized engines.</li>
        <li><strong>Towing range:</strong> Diesel 4WDs typically travel 600–900 km per tank when towing, versus 400–600 km for petrol equivalents. In remote Australia where fuel stops are 200–400 km apart, range matters.</li>
      </ul>
      <p>
        That said, petrol vehicles are not impractical. Many Australian families successfully tour with petrol-powered SUVs towing caravans up to 2,000 kg. The fuel cost is higher, but purchase and maintenance costs are often lower, and petrol availability is better at smaller regional outlets.
      </p>

      <h2>How to Calculate Your Caravan Towing Fuel Cost</h2>
      <p>The formula is straightforward:</p>
      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-4 font-mono text-sm">
        Towing L/100km = Normal L/100km × (1 + penalty%)<br />
        Fuel used (litres) = (Towing L/100km ÷ 100) × trip distance (km)<br />
        Total cost = Fuel used × price per litre
      </div>
      <p>
        <strong>Example:</strong> Toyota HiLux normally uses 9 L/100km. Towing a 2,000 kg caravan at 25% penalty = 9 × 1.25 = 11.25 L/100km. For a 1,200 km trip at $1.92/L: (11.25 ÷ 100) × 1,200 × $1.92 = <strong>$259.20</strong> in fuel.
      </p>
      <p>
        For an instant calculation with different trailer types and custom penalty inputs, use our{" "}
        <Link href="/calculators/towing-fuel-cost-calculator" className="text-orange-500 underline font-medium">
          Towing Fuel Cost Calculator
        </Link>.
      </p>

      <h2>8 Proven Ways to Reduce Caravan Towing Fuel Costs</h2>
      <ol>
        <li>
          <strong>Slow down.</strong> As covered above, reducing highway speed from 110 to 90–100 km/h can save 2–5 L/100km. This is the biggest single lever. Many states legally require caravans to stay under 100 km/h anyway.
        </li>
        <li>
          <strong>Check tyre pressures before every long trip.</strong> Both the tow vehicle and caravan tyres should be at the manufacturer&apos;s recommended towing pressure (often higher than everyday driving pressures). Correct pressures reduce rolling resistance and improve stability.
        </li>
        <li>
          <strong>Reduce caravan load.</strong> Every 100 kg removed from the caravan reduces fuel use, particularly on hilly routes. Audit what you actually use on trips — water tanks, spare gear, and heavy recreational equipment add up quickly.
        </li>
        <li>
          <strong>Use cruise control on flat roads only.</strong> On undulating or hilly terrain, cruise control can cause aggressive downshifting on uphills. Let the vehicle slow slightly on steep climbs and recover speed on descents rather than maintaining constant speed at all costs.
        </li>
        <li>
          <strong>Fit a weight distribution hitch.</strong> Distributing the tow ball weight across the front axle improves aerodynamics and vehicle attitude, with a modest fuel benefit in addition to improved handling.
        </li>
        <li>
          <strong>Service your vehicle before the trip.</strong> Fresh engine oil reduces internal friction. A clean air filter improves intake efficiency. Worn spark plugs (petrol) or injectors (diesel) reduce combustion efficiency. A pre-trip service pays for itself on a 3,000 km caravanning holiday.
        </li>
        <li>
          <strong>Adjust tow ball download.</strong> Having the tow ball weight within the manufacturer&apos;s recommended range (typically 8–12% of the trailer ATM) optimises the aerodynamic profile of the combination and reduces suspension loading.
        </li>
        <li>
          <strong>Plan fuel stops strategically.</strong> Regional fuel prices in Australia vary significantly. Filling up in major towns before remote stretches, and using apps like MotorMouth or GasBuddy, can save $0.10–$0.30/L compared to highway servos. On a 150-litre fill, that is $15–$45 saved from smart fuel timing alone.
        </li>
      </ol>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <h2>Towing Fuel Cost for Popular Australian Road Trips</h2>
      <p>
        Using a baseline of 13 L/100km towing consumption (diesel 4WD, 2,000 kg caravan, 100 km/h) and $1.95/L:
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-orange-50 dark:bg-orange-950">
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Route</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Distance (one way)</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left">Est. Towing Fuel Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Sydney → Melbourne (Hume Hwy)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">880 km</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">~$223</td></tr>
            <tr className="bg-gray-50 dark:bg-gray-800"><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Brisbane → Cairns (Bruce Hwy)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">1,720 km</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">~$436</td></tr>
            <tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Perth → Darwin (North West Coastal)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">4,030 km</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">~$1,022</td></tr>
            <tr className="bg-gray-50 dark:bg-gray-800"><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Melbourne → Adelaide (Western Ring)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">730 km</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">~$185</td></tr>
            <tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Sydney → Gold Coast (Pacific Mwy)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">910 km</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">~$231</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 -mt-3 mb-4">Estimates based on 13 L/100km towing consumption at $1.95/L. Actual costs will vary with vehicle, caravan weight, speed, and fuel prices along the route.</p>

      <p>
        For a round trip, double the one-way fuel cost and add 10–15% for detours, hill sections, and fuel price variations. Use our{" "}
        <Link href="/calculators/towing-fuel-cost-calculator" className="text-orange-500 underline font-medium">
          Towing Fuel Cost Calculator
        </Link>{" "}
        to enter your specific vehicle consumption and fuel price for a personalised estimate.
      </p>

      <h2>What About Camper Trailers and Boat Trailers?</h2>
      <p>
        Not all towing is caravan towing. Lighter trailers have smaller fuel penalties:
      </p>
      <ul>
        <li><strong>Camper trailer (750–1,500 kg):</strong> typically 15–22% fuel penalty. Camper trailers sit lower and are more aerodynamic than van caravans, reducing drag at speed.</li>
        <li><strong>Boat on trailer (500–1,200 kg):</strong> 12–18% penalty. Boats are narrower than caravans but can catch significant side-wind, particularly on exposed coastal routes.</li>
        <li><strong>Box/utility trailer (&lt;500 kg):</strong> 5–12% penalty. The fuel impact of a light empty trailer is relatively minor.</li>
      </ul>
      <p>
        For boat towing specifically, our{" "}
        <Link href="/calculators/boat-fuel-calculator" className="text-orange-500 underline font-medium">
          Boat Fuel Calculator
        </Link>{" "}
        handles on-water fuel planning once you&apos;re at your destination.
      </p>

      <h2>Planning Your Caravan Trip Fuel Budget</h2>
      <p>
        For a realistic caravan trip fuel budget, we recommend a three-step approach:
      </p>
      <ol>
        <li>Calculate your expected towing fuel cost using the{" "}<Link href="/calculators/towing-fuel-cost-calculator" className="text-orange-500 underline">Towing Fuel Cost Calculator</Link>{" "}with your real consumption figures (use a recent trip or fill-up record rather than the manufacturer&apos;s rated figures).</li>
        <li>Add a 15% buffer for fuel price variation, headwind days, unexpected detours, and any steep terrain not accounted for in your baseline estimate.</li>
        <li>Check regional fuel prices for your route before you leave using <a href="https://www.motormouth.com.au/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">MotorMouth</a> or <a href="https://www.fuelwatch.wa.gov.au/" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">FuelWatch (WA)</a>, and identify the cheapest fuel stops along the way.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <div className="space-y-4 not-prose mt-6">
        {faqs.map((faq, i) => (
          <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
          </details>
        ))}
      </div>

      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />

      <aside className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-800 dark:text-amber-200 not-prose">
        <strong>Disclaimer:</strong> Fuel consumption figures in this article are approximate estimates based on real-world owner data and caravan club reports. Actual consumption varies significantly with vehicle type, caravan weight and aerodynamics, towing speed, terrain, and load. These figures are for planning purposes only. Always carry sufficient fuel for remote Australian legs, and verify current regional fuel prices before departure.
      </aside>
    </BlogArticleLayout>
  );
}
