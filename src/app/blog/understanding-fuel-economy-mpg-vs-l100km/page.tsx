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
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
      ]}
    >
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your trip fuel cost</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your distance, fuel efficiency (L/100km or MPG), and price per litre to get your exact trip cost.</p>
        <Link href="/calculators/trip-fuel-cost-calculator" className="inline-block bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
          Open the Trip Fuel Cost Calculator →
        </Link>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2>MPG vs L/100km: What Is the Difference?</h2>
        <p><strong>Miles per gallon (MPG)</strong> tells you how far your vehicle can travel on one gallon of fuel. Higher is better — a car that gets 40 MPG is more efficient than one that gets 25 MPG.</p>
        <p><strong>Litres per 100 kilometres (L/100km)</strong> tells you how many litres of fuel your vehicle consumes to travel 100 km. Lower is better — a car that uses 6 L/100km is more efficient than one that uses 10 L/100km.</p>
        <p>The key difference is direction. MPG is a distance-per-fuel measure (more is better). L/100km is a fuel-per-distance measure (less is better). MPG is standard in the United States; L/100km is standard in Australia, Canada, Europe, and most of the rest of the world.</p>

        <h2>How to Convert Between MPG and L/100km</h2>
        <p>The conversion formula between MPG (US) and L/100km is:</p>
        <blockquote><strong>L/100km = 235.214 ÷ MPG</strong></blockquote>
        <blockquote><strong>MPG = 235.214 ÷ L/100km</strong></blockquote>
        <p>Common conversions:</p>
        <ul>
          <li>25 MPG = 9.4 L/100km</li>
          <li>30 MPG = 7.8 L/100km</li>
          <li>35 MPG = 6.7 L/100km</li>
          <li>40 MPG = 5.9 L/100km</li>
          <li>50 MPG = 4.7 L/100km</li>
        </ul>

        <h2>Why L/100km Is More Intuitive for Budgeting</h2>
        <p>With L/100km, fuel cost calculations are direct. Multiply your consumption rate by the distance in hundreds of kilometres, then by the price per litre:</p>
        <blockquote><strong>Fuel cost = (Distance ÷ 100) × L/100km × Price per litre</strong></blockquote>
        <p>Example: a 500 km trip in a car using 8 L/100km, with fuel at $2.10/L:<br />
        (500 ÷ 100) × 8 × $2.10 = 5 × 8 × $2.10 = <strong>$84.00</strong></p>

        <h2>What Is a Good Fuel Economy Rating in Australia?</h2>
        <p>Typical fuel consumption for common vehicle types:</p>
        <ul>
          <li><strong>Small cars (e.g. Toyota Corolla, Mazda 3)</strong> — 5.5–7.5 L/100km</li>
          <li><strong>Medium cars (e.g. Toyota Camry)</strong> — 6.5–9.0 L/100km</li>
          <li><strong>SUVs and 4WDs</strong> — 8.0–14.0 L/100km</li>
          <li><strong>Utes (e.g. HiLux, Ranger)</strong> — 8.5–12.0 L/100km</li>
          <li><strong>Hybrids (e.g. Toyota RAV4 Hybrid)</strong> — 4.5–6.5 L/100km</li>
        </ul>
        <p>These are combined cycle figures. Real-world consumption is typically 10–20% higher than manufacturer-rated figures depending on driving conditions.</p>

        <h2>How to Calculate Your Actual Fuel Economy</h2>
        <ol>
          <li>Fill your tank to full. Note the odometer reading.</li>
          <li>Drive normally until the tank is low.</li>
          <li>Fill the tank again. Note the litres added and the new odometer reading.</li>
          <li>Calculate: L/100km = (Litres added ÷ Distance driven) × 100</li>
        </ol>
        <p>Example: you fill up with 55 litres after driving 620 km:<br />
        (55 ÷ 620) × 100 = <strong>8.9 L/100km</strong></p>

        <h2>What Affects Fuel Economy?</h2>
        <ul>
          <li><strong>Speed</strong> — fuel consumption increases significantly above 100 km/h. Most vehicles are most efficient between 80–100 km/h</li>
          <li><strong>City vs highway</strong> — stop-start city driving uses significantly more fuel than steady highway speeds</li>
          <li><strong>Air conditioning</strong> — A/C adds 5–15% to fuel consumption</li>
          <li><strong>Tyre pressure</strong> — underinflated tyres increase rolling resistance and fuel use</li>
          <li><strong>Vehicle load</strong> — carrying heavy loads and towing increases consumption. A roof rack adds aerodynamic drag even when empty</li>
        </ul>

        <h2>Related Calculators</h2>
        <ul>
          <li><Link href="/calculators/trip-fuel-cost-calculator" className="text-orange-500 hover:text-orange-600">Trip Fuel Cost Calculator</Link></li>
          <li><Link href="/calculators/commute-fuel-cost-calculator" className="text-orange-500 hover:text-orange-600">Commute Fuel Cost Calculator</Link></li>
          <li><Link href="/calculators/ev-vs-gas-calculator" className="text-orange-500 hover:text-orange-600">EV vs Gas Calculator</Link></li>
          <li><Link href="/calculators/fuel-economy-savings-calculator" className="text-orange-500 hover:text-orange-600">Fuel Economy Savings Calculator</Link></li>
        </ul>
      </article>
    </BlogArticleLayout>
  );
}
