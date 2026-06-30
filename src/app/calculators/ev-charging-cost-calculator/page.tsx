import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import EvChargingCalc from "./EvChargingCalc";

export const metadata: Metadata = {
  title: "EV Charging Cost Calculator Australia — Home & Public Charging | CalcFuel",
  description: "Calculate how much it costs to charge an electric car in Australia. Enter battery size, electricity rate, and charging level to see cost per charge — with home vs public charger comparison.",
  alternates: { canonical: "/calculators/ev-charging-cost-calculator" },
};

const relatedTools = [
  { title: "EV vs Petrol Cost Calculator", slug: "ev-vs-gas-calculator", description: "Compare 5–10 year total cost of ownership: EV vs petrol." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "Find the break-even point where a hybrid's savings offset the price premium." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your petrol commute cost — weekly, monthly, and annually." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Fuel Budget Planner", slug: "fuel-budget-planner", description: "Plan your monthly fuel budget across up to 3 vehicles." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by improving your fuel efficiency." },
];

const faqs = [
  {
    question: "How much does it cost to charge an electric car at home in Australia?",
    answer: "At Australia's average residential electricity rate of around $0.26/kWh (standard tariff), charging a typical 75 kWh EV from 20% to 80% costs approximately: 75 × 0.60 × $0.26 × 1.10 (charging losses) = $12.87. On a dedicated EV off-peak tariff of $0.10–$0.14/kWh, the same charge costs $4.95–$6.93. Home charging is 3–5× cheaper than DC fast charging at public stations."
  },
  {
    question: "How much does it cost to fully charge an EV in Australia?",
    answer: "A full charge from 0–100% (rarely recommended — most owners charge to 80%) on a 75 kWh battery at $0.26/kWh including charging losses: 75 × 1.10 × $0.26 = $21.45 at standard tariff, or $8.25 at $0.10/kWh EV off-peak rate. A smaller 40 kWh battery (e.g. Nissan Leaf, base BYD Dolphin) costs $11.44 at standard tariff, or $4.40 at EV rates."
  },
  {
    question: "What electricity rate should I use for charging my EV at home?",
    answer: "Use your off-peak or controlled load rate if you charge overnight — typically $0.10–$0.18/kWh in Australia. If you charge during the day at your standard flat tariff, use $0.22–$0.30/kWh depending on your retailer and state. Time-of-use plans designed for EV charging (Amber Electric, Powershop EV plans, AGL EV plan) can offer overnight rates as low as $0.08–$0.12/kWh. Check your electricity bill for your actual rates."
  },
  {
    question: "How much does DC fast charging cost in Australia?",
    answer: "Public DC fast charging in Australia typically costs $0.45–$0.65/kWh. Tesla Supercharger rates in 2024–2026 were approximately $0.48–$0.58/kWh for non-Tesla vehicles (some plans for Tesla owners are lower). ChargePoint, Evie Networks, and BP Pulse typically charge $0.45–$0.65/kWh for DC charging. At $0.55/kWh, charging a 75 kWh Tesla Model 3 from 20–80% costs approximately $27.23 — compared to $8.60 at home on an EV tariff."
  },
  {
    question: "How does EV charging cost compare to petrol in Australia?",
    answer: "At home charging rates of $0.14/kWh, a Tesla Model 3 using 16 kWh/100km costs: (16 × $0.14) × 1.10 = $2.46/100km in electricity. A petrol car using 9 L/100km at $1.92/L costs $17.28/100km. The EV costs approximately 86% less per 100km — a saving of $14.82/100km. For a 15,000 km annual commute, that is approximately $2,220/year saved in fuel alone (home charging vs petrol)."
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
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "EV Charging Cost Calculator", url: "https://calcfuel.com/calculators/ev-charging-cost-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
        datePublished="2026-07-01"
        dateModified="2026-07-01"
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link><span className="mx-2">/</span>
        <span>EV Charging Cost Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">EV Charging Cost Calculator Australia</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate how much it costs to charge your electric car at home or at a public charger. Choose your EV, electricity rate, and battery level — or use commute mode to see your weekly and annual charging bill.
      </p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <EvChargingCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>How Much Does It Cost to Charge an Electric Car in Australia?</h2>
        <p>The cost of charging an EV in Australia depends on three things: your electricity rate, your EV&apos;s energy consumption (kWh/100km), and how much charge you need to add. At Australia&apos;s average residential tariff of around $0.26/kWh, charging a mid-size 75 kWh EV from 20% to 80% costs approximately $12–$13. On a dedicated EV off-peak tariff of $0.10–$0.14/kWh, the same charge costs $5–$7.</p>
        <p>These figures are 3–5× cheaper per kilometre than the equivalent petrol cost — which is why EV running costs in Australia are so compelling for high-mileage commuters.</p>

        <h2>Home Charging vs Public Charging Costs</h2>
        <table>
          <thead>
            <tr>
              <th>Charging type</th>
              <th>Typical rate (AU)</th>
              <th>Cost per 100km*</th>
              <th>Full charge (75 kWh)*</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Home — EV off-peak plan</td><td>$0.10–$0.14/kWh</td><td>$1.76–$2.46</td><td>$8.25–$11.55</td></tr>
            <tr><td>Home — standard flat tariff</td><td>$0.22–$0.28/kWh</td><td>$3.87–$4.93</td><td>$18.15–$23.10</td></tr>
            <tr><td>Solar self-consumption</td><td>~$0.00–$0.08/kWh</td><td>$0–$1.41</td><td>$0–$6.60</td></tr>
            <tr><td>Public Level 2 AC charger</td><td>$0.35–$0.45/kWh</td><td>$6.16–$7.92</td><td>$28.88–$37.13</td></tr>
            <tr><td>DC fast charger (50–350 kW)</td><td>$0.45–$0.65/kWh</td><td>$7.92–$11.44</td><td>$37.13–$53.63</td></tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-500">*Assumes 16 kWh/100km (mid-size EV) and 10% charging losses for home; 5% for public chargers. 75 kWh charged from 0–100%.</p>

        <h2>EV Charging Cost vs Petrol: The Real Comparison</h2>
        <p>The fairest comparison is cost per 100 km of driving. Here&apos;s how home-charged EVs compare to petrol vehicles at different distances:</p>
        <table>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Consumption</th>
              <th>Cost/100km</th>
              <th>Annual cost (15,000 km)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>EV (home off-peak $0.12/kWh)</td><td>16 kWh/100km</td><td>$2.11</td><td>$317</td></tr>
            <tr><td>EV (standard tariff $0.26/kWh)</td><td>16 kWh/100km</td><td>$4.57</td><td>$686</td></tr>
            <tr><td>Small petrol car</td><td>7.5 L/100km</td><td>$14.40</td><td>$2,160</td></tr>
            <tr><td>Mid-size petrol car / SUV</td><td>10 L/100km</td><td>$19.20</td><td>$2,880</td></tr>
            <tr><td>Petrol hybrid</td><td>4.8 L/100km</td><td>$9.22</td><td>$1,382</td></tr>
          </tbody>
        </table>
        <p>At $1.92/L petrol. EV off-peak charging saves approximately $1,843–$2,563/year in fuel versus a comparable petrol car.</p>

        <h2>Understanding Charging Losses</h2>
        <p>Not all electricity drawn from your wall goes into the battery. Home AC chargers typically have a round-trip charging efficiency of 85–92%, meaning 8–15% of the electricity you draw is lost as heat in the charger, cable, and battery management system. This calculator includes a 10% charging loss factor for home charging, meaning you pay for 10% more electricity than actually ends up in your battery.</p>
        <p>DC fast chargers operate at higher voltages with different loss profiles. Public charger pricing (per kWh) typically already accounts for the charger&apos;s operating costs and efficiency, so the price you pay reflects the delivered energy.</p>

        <h2>Getting the Most from EV Home Charging in Australia</h2>
        <h3>Time-of-Use Tariffs</h3>
        <p>If your electricity retailer offers a time-of-use tariff (most do), switching and scheduling overnight charging is the single most impactful way to reduce your charging cost. Off-peak rates of $0.08–$0.14/kWh are available from multiple retailers in most Australian states. Set your car&apos;s scheduled charging time to begin at midnight and finish before 7am for maximum off-peak exposure.</p>

        <h3>Solar Integration</h3>
        <p>If you have solar panels, charging during solar generation hours (10am–3pm on weekdays) can effectively eliminate your charging cost after accounting for the solar system investment. Most modern EVs and home chargers support scheduled or solar-excess charging modes. The Zappi charger, for example, automatically diverts solar surplus to the car before exporting to the grid. With solar feed-in tariffs now as low as $0.04–$0.08/kWh in some states, keeping that energy for EV charging rather than exporting it is financially sensible.</p>

        <h3>EV-Specific Electricity Plans</h3>
        <p>Several Australian retailers now offer EV-specific plans with heavily discounted overnight rates. AGL&apos;s EV plan, Amber Electric (real-time pricing), Powershop EV rates, and Origin Energy&apos;s EV tariffs all offer pathways to sub-$0.15/kWh overnight charging. These plans typically require a smart meter and may have higher peak rates, so evaluate your overall household usage before switching.</p>

        <h2>For a Full EV vs Petrol Comparison</h2>
        <p>This calculator focuses on charging costs only. For a full 5-year or 10-year total cost of ownership comparison — including purchase price difference, maintenance savings, registration, and insurance — use our <Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Cost Calculator</Link>.</p>
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
        <strong>Disclaimer:</strong> Electricity rates, EV consumption figures, and charging costs are approximate estimates for planning purposes. Actual costs depend on your specific electricity tariff, EV model, driving conditions, temperature, and charger efficiency. Electricity rates change frequently — check your current bill for accurate pricing. This is not financial or energy advice.
      </aside>

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
