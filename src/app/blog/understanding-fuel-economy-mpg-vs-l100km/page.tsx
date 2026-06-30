import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Understanding Fuel Economy: MPG vs L/100km Explained",
  description:
    "MPG and L/100km measure the same thing in opposite directions. Learn how to convert between them, calculate your real fuel costs, and what affects fuel economy.",
  path: "/blog/understanding-fuel-economy-mpg-vs-l100km",
  type: "article",
});

const faqs = [
  {
    question: "What is the difference between MPG and L/100km?",
    answer: "Miles per gallon (MPG) measures how far your vehicle travels on one gallon of fuel — higher is better. Litres per 100 kilometres (L/100km) measures how many litres of fuel your vehicle consumes to travel 100 km — lower is better. MPG is standard in the United States; L/100km is standard in Australia, Canada, Europe, and most other countries.",
  },
  {
    question: "How do you convert between MPG and L/100km?",
    answer: "Use the formula: L/100km = 235.214 ÷ MPG, or MPG = 235.214 ÷ L/100km. Common conversions: 25 MPG = 9.4 L/100km, 30 MPG = 7.8 L/100km, 35 MPG = 6.7 L/100km, 40 MPG = 5.9 L/100km, 50 MPG = 4.7 L/100km.",
  },
  {
    question: "What is a good fuel economy rating in Australia?",
    answer: "Typical fuel consumption for common vehicle types in Australia: Small cars (Toyota Corolla, Mazda 3) 5.5–7.5 L/100km; Medium cars (Toyota Camry) 6.5–9.0 L/100km; SUVs and 4WDs 8.0–14.0 L/100km; Utes (HiLux, Ranger) 8.5–12.0 L/100km; Hybrids (Toyota RAV4 Hybrid) 4.5–6.5 L/100km.",
  },
  {
    question: "What factors affect fuel economy?",
    answer: "Key factors affecting fuel economy include: speed (most vehicles are most efficient at 80–100 km/h); city vs highway driving (stop-start city driving uses significantly more fuel); air conditioning (adds 5–15% to fuel consumption); tyre pressure (underinflated tyres increase rolling resistance); and vehicle load (carrying heavy loads and towing increases consumption).",
  },
  {
    question: "What is the difference between US MPG and UK MPG?",
    answer: "US gallons and UK (imperial) gallons are different sizes. A US gallon is 3.785 litres; a UK gallon is 4.546 litres. This means 30 US MPG = 36 UK MPG. The conversion factor is UK MPG = US MPG × 1.201. When using online converters, always check which gallon they assume — using the wrong one gives a 20% error.",
  },
  {
    question: "Why does my real-world fuel economy differ from the manufacturer rating?",
    answer: "Manufacturer fuel economy figures are measured under standardised laboratory conditions (WLTP or NEDC cycles) that don't fully reflect real-world driving. Typical real-world consumption is 10–20% higher than the rated figure. Cold weather, short trips (engine doesn't reach optimal temperature), heavy traffic, aggressive driving, roof racks, and underinflated tyres all increase real consumption above the lab figure.",
  },
  {
    question: "How much does speed affect fuel consumption?",
    answer: "Aerodynamic drag increases with the square of speed, so fuel consumption rises sharply above 80–100 km/h. Driving at 130 km/h uses roughly 20–25% more fuel than driving at 110 km/h. On a 500 km highway trip, slowing from 120 km/h to 100 km/h can save 8–12 litres of fuel (roughly $17–$25 at $2.10/L), while adding only about 30 minutes to the trip.",
  },
  {
    question: "How do I calculate my actual fuel economy?",
    answer: "Use the fill-to-fill method: (1) Fill your tank completely and note the odometer reading. (2) Drive normally until the tank is low. (3) Fill the tank again and note the litres added and the new odometer reading. (4) Calculate: L/100km = (Litres added ÷ Distance driven) × 100. For example, 55 litres over 620 km = (55 ÷ 620) × 100 = 8.9 L/100km. Repeat over 3–4 fill-ups for a reliable average.",
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

export default function FuelEconomyArticlePage() {
  return (
    <BlogArticleLayout
      title="Understanding Fuel Economy: MPG vs L/100km Explained"
      category="Fuel & Energy"
      readTime="8 min read"
      publishedDate="2026-05-12"
      slug="understanding-fuel-economy-mpg-vs-l100km"
      description="MPG and L/100km measure the same thing in opposite directions. Here is how to convert between them, calculate your real fuel costs, and why L/100km is more intuitive for budgeting."
      authorName="CalcFuel Editorial Team"
      authorRole="Fuel & Energy Calculators"
      authorBio="Our team builds practical calculators and guides for drivers, fleet operators, and anyone tracking their fuel spend."
      relatedLinks={[
        { href: "/blog/how-to-reduce-commute-fuel-costs", label: "How to Reduce Your Commute Fuel Costs: 7 Proven Tips" },
        { href: "/blog/caravan-fuel-consumption-australia", label: "Caravan Fuel Consumption Australia" },
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
        { href: "/calculators/fuel-economy-savings-calculator", label: "Fuel Economy Savings Calculator" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8 not-prose">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your trip fuel cost</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your distance, fuel efficiency (L/100km or MPG), and price per litre to get your exact trip cost.</p>
        <Link href="/calculators/trip-fuel-cost-calculator" className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
          Open the Trip Fuel Cost Calculator →
        </Link>
      </div>

      <h2>MPG vs L/100km: What Is the Difference?</h2>
      <p><strong>Miles per gallon (MPG)</strong> tells you how far your vehicle can travel on one gallon of fuel. Higher is better — a car that gets 40 MPG is more efficient than one that gets 25 MPG.</p>
      <p><strong>Litres per 100 kilometres (L/100km)</strong> tells you how many litres of fuel your vehicle consumes to travel 100 km. Lower is better — a car that uses 6 L/100km is more efficient than one that uses 10 L/100km.</p>
      <p>The key difference is direction. MPG is a distance-per-fuel measure (more is better). L/100km is a fuel-per-distance measure (less is better). MPG is standard in the United States; L/100km is standard in Australia, Canada, Europe, and most of the rest of the world.</p>

      <h2>How to Convert Between MPG and L/100km</h2>
      <p>The conversion formula between MPG (US) and L/100km is:</p>
      <p><strong>L/100km = 235.214 &divide; MPG</strong></p>
      <p><strong>MPG = 235.214 &divide; L/100km</strong></p>

      <h3>Quick Reference Conversion Table</h3>
      <table>
        <thead>
          <tr><th>US MPG</th><th>L/100km</th><th>UK MPG</th><th>Typical vehicle</th></tr>
        </thead>
        <tbody>
          <tr><td>20</td><td>11.8</td><td>24.0</td><td>Large SUV, V8 ute</td></tr>
          <tr><td>25</td><td>9.4</td><td>30.0</td><td>Mid-size SUV, dual-cab ute</td></tr>
          <tr><td>30</td><td>7.8</td><td>36.0</td><td>Mid-size sedan</td></tr>
          <tr><td>35</td><td>6.7</td><td>42.1</td><td>Small sedan, hatchback</td></tr>
          <tr><td>40</td><td>5.9</td><td>48.1</td><td>Efficient small car</td></tr>
          <tr><td>50</td><td>4.7</td><td>60.1</td><td>Hybrid vehicle</td></tr>
          <tr><td>60</td><td>3.9</td><td>72.1</td><td>Plug-in hybrid (engine only)</td></tr>
        </tbody>
      </table>
      <p><strong>US vs UK gallons:</strong> A US gallon is 3.785 litres; a UK (imperial) gallon is 4.546 litres. This means UK MPG figures are always ~20% higher than US MPG for the same vehicle. When using online converters, always check which gallon they assume.</p>

      <h2>Why L/100km Is More Intuitive for Budgeting</h2>
      <p>With L/100km, fuel cost calculations are direct. Multiply your consumption rate by the distance in hundreds of kilometres, then by the price per litre:</p>
      <p><strong>Fuel cost = (Distance &divide; 100) &times; L/100km &times; Price per litre</strong></p>
      <p>Example: a 500 km trip in a car using 8 L/100km, with fuel at $2.10/L:<br />
      (500 &divide; 100) &times; 8 &times; $2.10 = 5 &times; 8 &times; $2.10 = <strong>$84.00</strong></p>

      <h3>Annual Fuel Cost by Vehicle Type</h3>
      <p>Assuming 15,000 km per year (average Australian driver) and fuel at $2.10/L:</p>
      <table>
        <thead>
          <tr><th>Vehicle type</th><th>L/100km</th><th>Annual litres</th><th>Annual cost</th></tr>
        </thead>
        <tbody>
          <tr><td>Small car (Corolla)</td><td>6.5</td><td>975</td><td>$2,048</td></tr>
          <tr><td>Medium sedan (Camry)</td><td>7.8</td><td>1,170</td><td>$2,457</td></tr>
          <tr><td>SUV (RAV4 petrol)</td><td>8.5</td><td>1,275</td><td>$2,678</td></tr>
          <tr><td>Hybrid (RAV4 Hybrid)</td><td>4.8</td><td>720</td><td>$1,512</td></tr>
          <tr><td>Dual-cab ute (HiLux)</td><td>9.5</td><td>1,425</td><td>$2,993</td></tr>
          <tr><td>Large SUV (LandCruiser)</td><td>12.5</td><td>1,875</td><td>$3,938</td></tr>
        </tbody>
      </table>
      <p>The difference between a hybrid at 4.8 L/100km and a large SUV at 12.5 L/100km is <strong>$2,426 per year</strong> — or $12,130 over five years. Use the <Link href="/calculators/fuel-economy-savings-calculator">fuel economy savings calculator</Link> to model your specific scenario.</p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>What Is a Good Fuel Economy Rating in Australia?</h2>
      <table>
        <thead>
          <tr><th>Vehicle type</th><th>L/100km range</th><th>Rating</th></tr>
        </thead>
        <tbody>
          <tr><td>Small cars (Corolla, Mazda 3)</td><td>5.5–7.5</td><td>Good</td></tr>
          <tr><td>Medium cars (Camry, Accord)</td><td>6.5–9.0</td><td>Average</td></tr>
          <tr><td>SUVs and 4WDs</td><td>8.0–14.0</td><td>Varies widely</td></tr>
          <tr><td>Utes (HiLux, Ranger)</td><td>8.5–12.0</td><td>Expected for class</td></tr>
          <tr><td>Hybrids (RAV4 Hybrid, Corolla Hybrid)</td><td>4.5–6.5</td><td>Excellent</td></tr>
          <tr><td>PHEVs (charge-sustaining mode)</td><td>3.0–5.0</td><td>Excellent</td></tr>
        </tbody>
      </table>
      <p>These are combined cycle figures. Real-world consumption is typically 10–20% higher than manufacturer-rated figures depending on driving conditions, speed, load, and climate.</p>

      <h2>How to Calculate Your Actual Fuel Economy</h2>
      <p>The fill-to-fill method gives you an accurate real-world figure:</p>
      <ol>
        <li>Fill your tank to full. Note the odometer reading.</li>
        <li>Drive normally until the tank is low.</li>
        <li>Fill the tank again. Note the litres added and the new odometer reading.</li>
        <li>Calculate: <strong>L/100km = (Litres added &divide; Distance driven) &times; 100</strong></li>
      </ol>
      <p>Example: you fill up with 55 litres after driving 620 km:<br />
      (55 &divide; 620) &times; 100 = <strong>8.9 L/100km</strong></p>
      <p>For a reliable average, repeat over 3–4 fill-ups. A single tank can be skewed by traffic, weather, or an unusually hilly route.</p>

      <h2>What Affects Fuel Economy?</h2>
      <p><strong>Speed:</strong> Aerodynamic drag increases with the square of speed. Most vehicles are most efficient between 80–100 km/h. Driving at 130 km/h uses roughly 20–25% more fuel than 110 km/h. On a 500 km highway trip, slowing from 120 km/h to 100 km/h saves 8–12 litres ($17–$25 at $2.10/L) while adding about 30 minutes.</p>
      <p><strong>City vs highway:</strong> Stop-start city driving can use 30–50% more fuel than steady highway cruising. Hybrids flip this pattern — regenerative braking makes them most efficient in city driving.</p>
      <p><strong>Air conditioning:</strong> A/C adds 5–15% to fuel consumption depending on the outside temperature and system efficiency. At highway speed, A/C is usually more efficient than open windows (which create aerodynamic drag).</p>
      <p><strong>Tyre pressure:</strong> Underinflated tyres increase rolling resistance and fuel consumption by 2–4%. Check pressures monthly — they drop approximately 1 psi per month naturally.</p>
      <p><strong>Vehicle load:</strong> Every extra 50 kg increases fuel consumption by approximately 1–2%. A roof rack adds aerodynamic drag even when empty — remove it when not in use. Towing a caravan or trailer can increase consumption by 30–70% depending on the trailer weight and aerodynamics.</p>
      <p><strong>Driving style:</strong> Aggressive acceleration and hard braking can increase fuel consumption by 15–30% compared to smooth, anticipatory driving. Cruise control on highways helps maintain a consistent, efficient speed.</p>

      <h3>Impact of Speed on a 500 km Highway Trip</h3>
      <p>Based on a vehicle rated at 8 L/100km at 100 km/h, with fuel at $2.10/L:</p>
      <table>
        <thead>
          <tr><th>Speed</th><th>Approx L/100km</th><th>Fuel used</th><th>Fuel cost</th><th>Trip time</th></tr>
        </thead>
        <tbody>
          <tr><td>80 km/h</td><td>6.8</td><td>34.0 L</td><td>$71</td><td>6h 15m</td></tr>
          <tr><td>100 km/h</td><td>8.0</td><td>40.0 L</td><td>$84</td><td>5h 00m</td></tr>
          <tr><td>110 km/h</td><td>9.0</td><td>45.0 L</td><td>$95</td><td>4h 33m</td></tr>
          <tr><td>120 km/h</td><td>10.2</td><td>51.0 L</td><td>$107</td><td>4h 10m</td></tr>
          <tr><td>130 km/h</td><td>11.5</td><td>57.5 L</td><td>$121</td><td>3h 51m</td></tr>
        </tbody>
      </table>
      <p>Driving at 130 km/h instead of 100 km/h costs an extra <strong>$37 in fuel</strong> to save 69 minutes. Whether that trade-off is worth it depends on the trip.</p>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — calculate fuel cost for any journey</li>
        <li><Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link> — weekly and annual commute costs</li>
        <li><Link href="/calculators/ev-vs-gas-calculator">EV vs Gas Calculator</Link> — compare running costs</li>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</Link> — model the savings from a more efficient vehicle</li>
        <li><Link href="/calculators/towing-fuel-cost-calculator">Towing Fuel Cost Calculator</Link> — fuel costs when towing a caravan or trailer</li>
        <li><Link href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Gas Calculator</Link> — compare hybrid and petrol running costs</li>
      </ul>

      <section className="not-prose mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="not-prose mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> Fuel consumption figures are indicative averages based on manufacturer data and industry sources. Your actual fuel economy depends on driving conditions, vehicle condition, load, speed, and driving style. The conversion constant 235.214 applies to US gallons; for UK (imperial) gallons, use 282.481.
      </aside>
    </BlogArticleLayout>
  );
}
