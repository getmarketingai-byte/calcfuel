import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "How Much Does It Cost to Run a Car in Australia? (2025 Guide)",
  description:
    "Full breakdown of Australian car running costs: fuel, registration, insurance, tyres, servicing, and depreciation. Real 2025 figures for common vehicle types. Average total: $8,000–$16,000/year.",
  path: "/blog/car-running-costs-australia",
  type: "article",
});

const faqs = [
  {
    question: "How much does it cost to run a car per year in Australia?",
    answer: "The total annual cost of running a car in Australia typically ranges from $7,000–$16,000 depending on vehicle type, fuel efficiency, and usage. A small fuel-efficient car (e.g. Toyota Corolla) costs approximately $8,000–$11,000/year including all costs. A mid-size SUV runs $11,000–$15,000/year. A large 4WD or dual-cab ute can reach $14,000–$18,000/year. The biggest cost components are depreciation (often 40–50% of total), fuel, and insurance.",
  },
  {
    question: "How much does it cost to run a car per km in Australia?",
    answer: "The NRMA and RAA estimate the total cost per kilometre for Australian motorists at 60–120 cents per kilometre depending on the vehicle. A small car costs approximately 60–80 cents/km all-in. A mid-size SUV costs 80–110 cents/km. A large 4WD costs 100–130+ cents/km. Fuel alone is typically 15–25 cents/km. These figures assume 15,000 km/year — lower annual km increases the cost per km significantly because fixed costs (rego, insurance, depreciation) are spread across fewer kilometres.",
  },
  {
    question: "How much does car registration cost in Australia?",
    answer: "Registration costs vary significantly by state and vehicle type. In NSW: approximately $400–$700/year for a standard passenger vehicle plus CTP insurance ($450–$900). In Victoria: approximately $900–$1,200/year (rego includes TAC levy and CTP). In Queensland: approximately $300–$500/year plus CTP ($350–$600). South Australia and Western Australia are similar to Queensland. Budget $800–$1,500/year nationally for rego and CTP combined.",
  },
  {
    question: "How much does comprehensive car insurance cost in Australia?",
    answer: "Comprehensive car insurance averages $1,200–$2,000/year for most Australians, but varies enormously by age, location, vehicle value, and driving history. Young drivers (under 25) typically pay $2,000–$4,000+ for comprehensive cover. Regional drivers often pay less than metropolitan drivers. High-theft postcodes (some Melbourne and Sydney suburbs) attract significant surcharges. Shopping around at renewal saves an average of $400–$600 per year.",
  },
  {
    question: "How much does fuel cost per year for an average Australian?",
    answer: "The average Australian drives approximately 13,000–15,000 km per year. At a typical fuel efficiency of 9 L/100km and fuel at $2.00/L, annual fuel spend is approximately $2,340–$2,700. A small car at 6.5 L/100km costs around $1,690–$1,950/year in fuel. A large SUV at 12 L/100km costs $3,120–$3,600/year. A diesel ute at 10 L/100km (with diesel at $2.20/L) costs $2,860–$3,300/year.",
  },
  {
    question: "How much does car depreciation cost per year in Australia?",
    answer: "Depreciation is typically the single largest cost of car ownership, but most drivers don't count it. A new $35,000 car loses approximately $5,000–$7,000 in value in the first year (15–20%), $3,500–$5,000 in year 2, and $2,500–$4,000 in year 3. Japanese brands (Toyota, Honda, Mazda) hold value better than European brands. Buying a 3–5 year old used car avoids the steepest depreciation curve while still getting a reliable vehicle.",
  },
  {
    question: "How much should I budget for car servicing per year?",
    answer: "Annual car servicing costs in Australia average $500–$1,200/year for a petrol car, including a minor service ($250–$400) and a major service every 2–3 years ($600–$1,200). Japanese brands tend to have lower service costs than European brands. EVs have significantly lower servicing costs (no oil changes, fewer brake pad replacements due to regenerative braking) — typically $200–$500/year. Always factor in a buffer for unexpected repairs: $300–$600/year is prudent.",
  },
  {
    question: "Is it cheaper to own an EV than a petrol car in Australia?",
    answer: "Over 5 years of ownership, an EV is typically cheaper to run than an equivalent petrol car in Australia, but the comparison depends on purchase price, km driven, electricity tariff, and whether you have solar. EV fuel costs are 3–5c/km (home charging at ~30c/kWh) versus 15–25c/km for petrol. Servicing is 40–60% cheaper. The gap is closing as EV purchase prices fall — particularly for the BYD Seal, MG4, and Tesla Model 3. Use the EV vs Petrol Calculator for a personalised comparison.",
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

export default function CarRunningCostsPage() {
  return (
    <BlogArticleLayout
      title="How Much Does It Cost to Run a Car in Australia? (2025 Guide)"
      category="Fuel & Energy"
      readTime="10 min read"
      publishedDate="2026-07-01"
      slug="car-running-costs-australia"
      description="A complete breakdown of what Australians actually spend on car ownership: fuel, rego, insurance, tyres, servicing, and depreciation — with real 2025 figures by vehicle type."
      authorName="CalcFuel Editorial Team"
      authorRole="Fuel & Energy Calculators"
      authorBio="Our team builds practical calculators and guides for drivers, fleet operators, and anyone tracking their fuel spend."
      relatedLinks={[
        { href: "/blog/best-time-to-buy-petrol-australia", label: "Best Time to Buy Petrol in Australia" },
        { href: "/blog/motorcycle-vs-car-running-costs-australia", label: "Motorcycle vs Car Running Costs Australia" },
        { href: "/calculators/fuel-economy-savings-calculator", label: "Fuel Economy Savings Calculator" },
        { href: "/calculators/ev-vs-gas-calculator", label: "EV vs Petrol Calculator" },
        { href: "/calculators/commute-fuel-cost-calculator", label: "Commute Fuel Cost Calculator" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your fuel costs</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">See exactly what you spend on fuel each week, month, and year — and how much you could save with a more efficient vehicle.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/commute-fuel-cost-calculator" className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-sm">
            Commute Fuel Calculator →
          </Link>
          <Link href="/calculators/fuel-economy-savings-calculator" className="inline-block bg-white dark:bg-gray-800 text-orange-500 font-semibold px-4 py-2 rounded-xl border border-orange-300 hover:bg-orange-50 transition-colors text-sm">
            Fuel Economy Savings →
          </Link>
        </div>
      </div>

      <h2>The True Cost of Running a Car in Australia</h2>
      <p>Most Australians dramatically underestimate what their car actually costs. When asked, drivers typically quote fuel and rego — and forget about insurance, tyres, servicing, and the largest cost of all: depreciation. Add it all up and the real number surprises people.</p>
      <p>The NRMA, RAA, and RACQ all publish annual car cost studies. The consistent finding: the average Australian spends <strong>$9,000–$14,000 per year</strong> on car ownership, depending on vehicle type and usage — roughly $750–$1,170 per month.</p>

      <h2>Annual Car Running Cost by Vehicle Type (2025)</h2>
      <p>Assuming 15,000 km/year, fuel at $2.00/L, and typical insurance for a 35-year-old driver in a metropolitan area:</p>
      <table>
        <thead>
          <tr><th>Vehicle type</th><th>Example</th><th>Annual cost range</th><th>Cost per km</th></tr>
        </thead>
        <tbody>
          <tr><td>Small hatchback</td><td>Toyota Corolla, Mazda 3</td><td>$8,000–$11,000</td><td>53–73c/km</td></tr>
          <tr><td>Small SUV</td><td>Toyota C-HR, Mazda CX-3</td><td>$10,000–$13,500</td><td>67–90c/km</td></tr>
          <tr><td>Mid-size SUV</td><td>Toyota RAV4, Mazda CX-5</td><td>$12,000–$16,000</td><td>80–107c/km</td></tr>
          <tr><td>Large SUV / 4WD</td><td>LandCruiser 200, Prado</td><td>$15,000–$21,000</td><td>100–140c/km</td></tr>
          <tr><td>Dual-cab ute</td><td>HiLux, Ford Ranger</td><td>$13,000–$18,000</td><td>87–120c/km</td></tr>
          <tr><td>Hybrid SUV</td><td>Toyota RAV4 Hybrid</td><td>$10,500–$14,000</td><td>70–93c/km</td></tr>
          <tr><td>Electric vehicle</td><td>Tesla Model 3, BYD Seal</td><td>$9,000–$13,500</td><td>60–90c/km</td></tr>
          <tr><td>Luxury sedan</td><td>BMW 3 Series, Audi A4</td><td>$18,000–$28,000</td><td>120–187c/km</td></tr>
        </tbody>
      </table>
      <p>The cost per km figures assume 15,000 km/year. If you drive significantly less — say 8,000 km/year — fixed costs (rego, insurance, depreciation) are spread over fewer kilometres, pushing cost per km up by 30–50%.</p>

      <h2>Breaking Down the Costs: What You Actually Pay</h2>

      <h3>1. Fuel</h3>
      <p>Fuel is the most visible cost and typically the second-largest (after depreciation). At 15,000 km/year:</p>
      <table>
        <thead>
          <tr><th>Vehicle type</th><th>L/100km</th><th>Annual litres</th><th>Annual fuel cost ($2.00/L)</th></tr>
        </thead>
        <tbody>
          <tr><td>Small car (Corolla)</td><td>6.5</td><td>975</td><td>$1,950</td></tr>
          <tr><td>Mid-size SUV (RAV4)</td><td>8.5</td><td>1,275</td><td>$2,550</td></tr>
          <tr><td>Hybrid (RAV4 Hybrid)</td><td>4.8</td><td>720</td><td>$1,440</td></tr>
          <tr><td>Large 4WD (LandCruiser)</td><td>13.0</td><td>1,950</td><td>$3,900</td></tr>
          <tr><td>Diesel ute (HiLux)</td><td>9.5 (diesel)</td><td>1,425</td><td>$3,135 ($2.20/L diesel)</td></tr>
          <tr><td>Electric (home charging)</td><td>18 kWh/100km</td><td>2,700 kWh</td><td>$810 (30c/kWh)</td></tr>
        </tbody>
      </table>
      <p>Use the <Link href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</Link> to see how much switching to a more efficient vehicle would save you annually.</p>

      <h3>2. Registration and CTP Insurance</h3>
      <p>Registration costs include the vehicle registration fee and Compulsory Third Party (CTP) insurance. These vary substantially by state:</p>
      <table>
        <thead>
          <tr><th>State</th><th>Annual rego fee</th><th>CTP insurance</th><th>Total annual</th></tr>
        </thead>
        <tbody>
          <tr><td>NSW</td><td>$175–$350</td><td>$450–$900</td><td>$625–$1,250</td></tr>
          <tr><td>Victoria</td><td>Combined with TAC/CTP</td><td>—</td><td>$900–$1,300</td></tr>
          <tr><td>Queensland</td><td>$300–$500</td><td>$350–$600</td><td>$650–$1,100</td></tr>
          <tr><td>Western Australia</td><td>$320–$480</td><td>Included</td><td>$500–$800</td></tr>
          <tr><td>South Australia</td><td>$300–$500</td><td>$350–$650</td><td>$650–$1,150</td></tr>
          <tr><td>ACT</td><td>Combined</td><td>—</td><td>$700–$1,100</td></tr>
        </tbody>
      </table>

      <h3>3. Comprehensive Car Insurance</h3>
      <p>Third-party property and CTP are mandatory, but comprehensive insurance is optional — though highly recommended for any vehicle worth more than $10,000. National averages by driver profile:</p>
      <ul>
        <li><strong>Under-25 driver:</strong> $2,000–$4,500/year (significantly more for sports cars or at-fault history)</li>
        <li><strong>25–45 driver (metropolitan):</strong> $1,100–$2,000/year</li>
        <li><strong>45–65 driver (experienced):</strong> $800–$1,500/year</li>
        <li><strong>Regional driver:</strong> Typically 15–25% cheaper than equivalent metro rates</li>
      </ul>
      <p>Shopping around at renewal saves an average of $400–$600 per year. Never auto-renew without comparing at least 3 quotes.</p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h3>4. Tyres</h3>
      <p>Tyre replacement cost depends on vehicle size and how many kilometres you drive:</p>
      <ul>
        <li><strong>Small car (195/65R15):</strong> $120–$180 per tyre, full set $480–$720 every 40,000–50,000 km</li>
        <li><strong>SUV (225/65R17):</strong> $180–$280 per tyre, full set $720–$1,120 every 40,000 km</li>
        <li><strong>Large 4WD (265/65R17):</strong> $250–$400 per tyre, full set $1,000–$1,600 every 35,000 km</li>
      </ul>
      <p>Annualised, tyres cost <strong>$300–$600/year</strong> for a small car and <strong>$700–$1,400/year</strong> for a large SUV or 4WD at 15,000 km/year.</p>

      <h3>5. Servicing and Maintenance</h3>
      <p>Annual servicing costs for petrol and diesel vehicles average $500–$1,200/year:</p>
      <table>
        <thead>
          <tr><th>Vehicle type</th><th>Annual service cost</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>Japanese small car (Corolla, Mazda 3)</td><td>$400–$700</td><td>Low-cost parts, good dealer network</td></tr>
          <tr><td>Japanese SUV (RAV4, CX-5)</td><td>$550–$900</td><td>Reliable, reasonable service intervals</td></tr>
          <tr><td>European (VW, BMW, Audi, Mercedes)</td><td>$900–$2,500</td><td>Higher parts cost, more complex systems</td></tr>
          <tr><td>American/Korean (Kia, Hyundai)</td><td>$450–$800</td><td>Good value, long warranty periods</td></tr>
          <tr><td>Electric vehicle</td><td>$200–$500</td><td>No oil changes; fewer moving parts</td></tr>
        </tbody>
      </table>
      <p>Budget an additional <strong>$300–$600/year</strong> for unexpected repairs, especially on vehicles older than 5 years. Older or high-kilometre vehicles can easily exceed $1,000/year in unplanned repairs.</p>

      <h3>6. Depreciation (The Hidden Largest Cost)</h3>
      <p>Depreciation is the amount your car loses in value over time. Most drivers ignore it — but it is typically the single biggest cost of ownership, often exceeding fuel and insurance combined.</p>
      <table>
        <thead>
          <tr><th>Year</th><th>$30,000 Japanese SUV</th><th>$55,000 European sedan</th><th>$25,000 small car</th></tr>
        </thead>
        <tbody>
          <tr><td>Year 1 loss</td><td>~$5,500 (18%)</td><td>~$11,000 (20%)</td><td>~$4,000 (16%)</td></tr>
          <tr><td>Year 2 loss</td><td>~$3,600 (12%)</td><td>~$7,700 (14%)</td><td>~$2,500 (10%)</td></tr>
          <tr><td>Year 3 loss</td><td>~$3,000 (10%)</td><td>~$6,100 (11%)</td><td>~$2,000 (8%)</td></tr>
          <tr><td>5-year total</td><td>~$18,000 (60%)</td><td>~$38,500 (70%)</td><td>~$14,000 (56%)</td></tr>
        </tbody>
      </table>
      <p><strong>The smart money move:</strong> Buying a 3–5 year old Japanese or Korean vehicle lets someone else absorb the steepest depreciation years. A 3-year-old Toyota Corolla at $18,000 costs significantly less to own over the next 5 years than a new Corolla at $30,000, even accounting for slightly higher servicing costs.</p>

      <h2>Total Annual Running Cost Summary</h2>
      <table>
        <thead>
          <tr><th>Cost component</th><th>Small car</th><th>Mid-size SUV</th><th>Large 4WD</th><th>EV (mid-size)</th></tr>
        </thead>
        <tbody>
          <tr><td>Fuel / electricity</td><td>$1,950</td><td>$2,550</td><td>$3,900</td><td>$810</td></tr>
          <tr><td>Registration + CTP</td><td>$750</td><td>$900</td><td>$1,100</td><td>$750</td></tr>
          <tr><td>Comprehensive insurance</td><td>$1,200</td><td>$1,500</td><td>$1,800</td><td>$1,400</td></tr>
          <tr><td>Tyres (annualised)</td><td>$400</td><td>$650</td><td>$1,000</td><td>$600</td></tr>
          <tr><td>Servicing + maintenance</td><td>$600</td><td>$800</td><td>$1,100</td><td>$400</td></tr>
          <tr><td>Depreciation (annualised)</td><td>$2,800</td><td>$4,000</td><td>$6,500</td><td>$4,500</td></tr>
          <tr><td><strong>Total per year</strong></td><td><strong>$7,700</strong></td><td><strong>$10,400</strong></td><td><strong>$15,400</strong></td><td><strong>$8,460</strong></td></tr>
          <tr><td><strong>Per month</strong></td><td><strong>$642</strong></td><td><strong>$867</strong></td><td><strong>$1,283</strong></td><td><strong>$705</strong></td></tr>
          <tr><td><strong>Per km (15,000 km/yr)</strong></td><td><strong>51c</strong></td><td><strong>69c</strong></td><td><strong>103c</strong></td><td><strong>56c</strong></td></tr>
        </tbody>
      </table>
      <p><em>Assumes 15,000 km/year, fuel at $2.00/L, metro insurance rates for a 35-year-old driver with a clean record. Depreciation excludes loan interest.</em></p>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <h2>How to Reduce Your Car Running Costs</h2>
      <p><strong>On fuel:</strong> Fill up on Tuesday or Wednesday when prices are at their weekly low (saves $150–$440/year). Keep tyres at the correct pressure — underinflation increases fuel use by 2–4%. Consider a more fuel-efficient vehicle if yours uses more than 10 L/100km.</p>
      <p><strong>On insurance:</strong> Get 3+ quotes every year at renewal — loyalty rarely pays. Increasing your excess can reduce premiums 15–25%. Parking off-street (if possible) reduces theft and weather claim risk.</p>
      <p><strong>On depreciation:</strong> Buy a 3–5 year old vehicle rather than new. Choose brands with strong resale values (Toyota, Mazda, Honda rank highest in Australia). Keep the car well-maintained — a full service history adds $1,000–$3,000 to resale value.</p>
      <p><strong>On servicing:</strong> Follow the manufacturer's service schedule but don't pay for services you don't need. Get annual quotes from independent mechanics — dealer servicing is typically 30–50% more expensive for out-of-warranty vehicles.</p>

      <h2>Is It Cheaper to Lease, Finance, or Buy Outright?</h2>
      <p>This depends on your situation:</p>
      <ul>
        <li><strong>Buying outright (used car):</strong> Lowest total cost if you can afford the upfront capital. No interest, no residual risk.</li>
        <li><strong>Novated lease (via employer):</strong> Can save significant tax for higher-income employees, especially on EVs. Salary-sacrifice arrangements cover fuel, insurance, tyres, and servicing pre-tax.</li>
        <li><strong>Car loan:</strong> Standard car finance at 7–12% adds $2,000–$5,000/year in interest on a typical $25,000–$40,000 vehicle. Factor this into total cost comparisons.</li>
        <li><strong>Operating lease (business):</strong> Off-balance-sheet, tax-deductible, fixed monthly cost — suitable for businesses that need fleet certainty.</li>
      </ul>

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link> — weekly and annual commute spend</li>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</Link> — savings from switching to a more efficient car</li>
        <li><Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Calculator</Link> — total 5-year ownership cost comparison</li>
        <li><Link href="/calculators/hybrid-vs-gas-calculator">Hybrid vs Petrol Calculator</Link> — is a hybrid worth the premium?</li>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — road trip fuel cost planner</li>
        <li><Link href="/calculators/towing-fuel-cost-calculator">Towing Fuel Cost Calculator</Link> — extra cost when towing a caravan or trailer</li>
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
        <strong>Disclaimer:</strong> Cost figures are estimates based on 2025 Australian market data from industry sources including NRMA, RAA, RACQ, and ABS. Actual costs vary significantly by location, driving pattern, vehicle condition, and individual insurance and financing arrangements. Depreciation figures are indicative — actual resale values vary by make, model, condition, and market timing.
      </aside>
    </BlogArticleLayout>
  );
}
