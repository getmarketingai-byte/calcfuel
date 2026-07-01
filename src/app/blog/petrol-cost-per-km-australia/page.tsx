import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Petrol Cost Per Km Australia 2025 — Calculator & Car Comparison",
  description:
    "Calculate your petrol cost per kilometre in Australia. Compare fuel costs across popular AU cars, petrol prices, and fuel economies. Free calculator + full guide.",
  path: "/blog/petrol-cost-per-km-australia",
  type: "article",
});

const faqs = [
  {
    question: "What is petrol cost per km in Australia?",
    answer:
      "Petrol cost per km is how much you spend on fuel for every kilometre you drive. It combines your car's fuel consumption (L/100km) with the current petrol price. For example, a car using 10 L/100km at $1.95/L costs $0.195 per km. The Australian average is roughly $0.15–$0.22/km for a typical petrol car at current fuel prices.",
  },
  {
    question: "How do I calculate petrol cost per km?",
    answer:
      "Use this formula: Cost per km = (Fuel consumption in L/100km × Petrol price per litre) ÷ 100. Example: 10 L/100km × $1.95/L ÷ 100 = $0.195/km. To find your annual fuel cost, multiply cost per km by your annual kilometres driven.",
  },
  {
    question: "What is the average petrol cost per km in Australia?",
    answer:
      "For a typical Australian car using around 10 L/100km and petrol at $1.90/L, the cost per km is approximately $0.19. For city driving (12 L/100km) at the same price, it rises to $0.228/km. Highway driving (8 L/100km) comes to about $0.152/km. Most Australians pay between $0.14 and $0.26 per km depending on their vehicle and driving style.",
  },
  {
    question: "How much does it cost to drive 100km in Australia?",
    answer:
      "At $1.95/L with average combined fuel economy of 10 L/100km, driving 100 km costs approximately $19.50. With a large SUV or ute at 13 L/100km it rises to about $25.35. A fuel-efficient small car at 6 L/100km costs around $11.70 per 100 km. These figures exclude tolls, tyres, and other running costs.",
  },
  {
    question: "How does an EV compare to petrol cost per km?",
    answer:
      "The average EV in Australia costs $0.03–$0.05 per km on home electricity (off-peak rate around $0.12–$0.15/kWh, 15–18 kWh/100km). Petrol cars typically cost $0.15–$0.25/km. That is a 3–5× difference. Over 15,000 km per year, switching from a 10 L/100km petrol car to an EV can save $1,800–$2,700 in fuel alone.",
  },
  {
    question: "Which Australian cars have the lowest petrol cost per km?",
    answer:
      "The most fuel-efficient popular cars in Australia include: Toyota Corolla Hybrid (~4.2 L/100km, ~$0.08/km), Mazda 3 petrol (~7.5 L/100km, ~$0.15/km), Toyota RAV4 Hybrid (~4.7 L/100km, ~$0.09/km), and Hyundai i30 (~7.2 L/100km, ~$0.14/km). Utes and large SUVs like the Toyota HiLux and Ford Ranger use 10–13 L/100km and cost $0.19–$0.25/km.",
  },
  {
    question: "How much can I save annually by improving fuel economy?",
    answer:
      "Driving 15,000 km/year, improving from 12 L/100km to 9 L/100km at $1.95/L saves you $877.50 per year. Going from 10 L/100km to 8 L/100km saves $585/year. Even simple habits — correct tyre pressure, smooth acceleration, removing roof racks — can cut fuel economy by 5–10%, saving $140–$350/year for the average driver.",
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

export default function PetrolCostPerKmAustraliaPage() {
  return (
    <BlogArticleLayout
      title="Petrol Cost Per Km Australia 2025 — Calculator & Car Comparison"
      category="Fuel & Energy"
      readTime="7 min read"
      publishedDate="2026-07-01"
      slug="petrol-cost-per-km-australia"
      description="Calculate your petrol cost per kilometre in Australia. Compare fuel costs across popular AU cars, petrol prices, and fuel economies. Free calculator + full guide."
      authorName="CalcFuel Editorial Team"
      authorRole="Fuel & Automotive Analysts"
      authorBio="The CalcFuel editorial team researches Australian fuel prices, vehicle running costs, and automotive data to help drivers make smarter financial decisions."
      relatedLinks={[
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
        { href: "/calculators/commute-fuel-cost-calculator", label: "Commute Fuel Cost Calculator" },
        { href: "/calculators/fuel-economy-savings-calculator", label: "Fuel Economy Savings Calculator" },
        { href: "/blog/best-time-to-buy-petrol-australia", label: "Best Time to Buy Petrol" },
        { href: "/blog/car-running-costs-australia", label: "Car Running Costs Australia" },
        { href: "/blog/most-fuel-efficient-cars-australia", label: "Most Fuel Efficient Cars Australia" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your fuel cost per km</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your fuel economy and local petrol price to find your exact cost per km — and how much you spend per year.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/trip-fuel-cost-calculator" className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-sm">
            Trip Fuel Calculator →
          </Link>
          <Link href="/calculators/commute-fuel-cost-calculator" className="inline-block bg-white dark:bg-gray-800 text-orange-500 font-semibold px-4 py-2 rounded-xl border border-orange-300 hover:bg-orange-50 transition-colors text-sm">
            Commute Cost Calculator →
          </Link>
        </div>
      </div>

      <h2>What Is Petrol Cost Per Km?</h2>
      <p>Petrol cost per km is the single most useful number for understanding what your car actually costs to drive. It answers the practical question: <em>how much do I spend on fuel every time I travel one kilometre?</em></p>
      <p>Unlike sticker price or insurance premiums, your cost per km changes constantly — it rises when petrol prices spike, falls when you drive more efficiently, and differs dramatically between vehicle types. A small hatchback and a diesel ute can have a 2× difference in fuel cost per km even when refuelling at the same bowser.</p>
      <p>Knowing your petrol cost per km lets you:</p>
      <ul>
        <li>Accurately calculate the true cost of any trip before you leave</li>
        <li>Compare the real operating cost of different vehicles</li>
        <li>Quantify how much a fuel price rise affects your weekly budget</li>
        <li>Decide whether an EV or hybrid makes financial sense for your situation</li>
        <li>Claim a correct vehicle allowance for work-related driving (the ATO cents-per-km rate for 2025–26 is $0.88/km, but your actual fuel cost is only a portion of that)</li>
      </ul>

      <h2>The Formula: How to Calculate Petrol Cost Per Km</h2>
      <p>The calculation is straightforward:</p>
      <p><strong>Cost per km = (L/100km × Price per litre) ÷ 100</strong></p>
      <p>Worked examples:</p>
      <ul>
        <li>Toyota Corolla (8.5 L/100km) at $1.95/L: (8.5 × 1.95) ÷ 100 = <strong>$0.166/km</strong></li>
        <li>Toyota HiLux (11.5 L/100km) at $2.05/L: (11.5 × 2.05) ÷ 100 = <strong>$0.236/km</strong></li>
        <li>Mazda 3 (7.5 L/100km) at $1.90/L: (7.5 × 1.90) ÷ 100 = <strong>$0.143/km</strong></li>
      </ul>
      <p>The formula scales linearly — a 10% rise in petrol price increases your cost per km by exactly 10%. A 10% improvement in fuel economy reduces your cost per km by 10%.</p>

      <h2>Australian Average Fuel Economy</h2>
      <p>The Bureau of Infrastructure and Transport Research Economics (BITRE) reports that the average new passenger car sold in Australia uses around <strong>7.5–9 L/100km</strong> under official test conditions. Real-world consumption is typically 10–20% higher. For planning purposes, these are reliable benchmarks:</p>
      <ul>
        <li><strong>City driving:</strong> 12 L/100km average (stop-start traffic, air conditioning, short trips)</li>
        <li><strong>Highway driving:</strong> 8 L/100km average (steady speed, minimal idling)</li>
        <li><strong>Combined cycle:</strong> 10 L/100km average (typical mixed use)</li>
      </ul>
      <p>These averages cover mainstream petrol sedans and hatchbacks. SUVs and utes consume significantly more; small city cars and hybrids significantly less.</p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>Petrol Cost Per Km Table: All Combinations</h2>
      <p>The table below shows cost per km (in cents) for common Australian petrol prices ($1.70–$2.20/L) across a range of fuel economies. Find your car&apos;s L/100km on the left and your local price across the top.</p>
      <table>
        <thead>
          <tr>
            <th>Fuel economy</th>
            <th>$1.70/L</th>
            <th>$1.80/L</th>
            <th>$1.90/L</th>
            <th>$2.00/L</th>
            <th>$2.10/L</th>
            <th>$2.20/L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>6 L/100km</strong></td>
            <td>10.2¢</td>
            <td>10.8¢</td>
            <td>11.4¢</td>
            <td>12.0¢</td>
            <td>12.6¢</td>
            <td>13.2¢</td>
          </tr>
          <tr>
            <td><strong>8 L/100km</strong></td>
            <td>13.6¢</td>
            <td>14.4¢</td>
            <td>15.2¢</td>
            <td>16.0¢</td>
            <td>16.8¢</td>
            <td>17.6¢</td>
          </tr>
          <tr>
            <td><strong>10 L/100km</strong></td>
            <td>17.0¢</td>
            <td>18.0¢</td>
            <td>19.0¢</td>
            <td>20.0¢</td>
            <td>21.0¢</td>
            <td>22.0¢</td>
          </tr>
          <tr>
            <td><strong>12 L/100km</strong></td>
            <td>20.4¢</td>
            <td>21.6¢</td>
            <td>22.8¢</td>
            <td>24.0¢</td>
            <td>25.2¢</td>
            <td>26.4¢</td>
          </tr>
          <tr>
            <td><strong>15 L/100km</strong></td>
            <td>25.5¢</td>
            <td>27.0¢</td>
            <td>28.5¢</td>
            <td>30.0¢</td>
            <td>31.5¢</td>
            <td>33.0¢</td>
          </tr>
        </tbody>
      </table>
      <p>To use this table: find your row (fuel economy), read across to your petrol price column. That cell is your fuel cost per km in cents. Multiply by 100 to get the cost per 100 km in dollars.</p>

      <h2>Popular Australian Cars: Petrol Cost Per Km Compared</h2>
      <p>Here is how Australia&apos;s best-selling cars compare on fuel cost per km, using a petrol price of $1.95/L as a baseline — close to the 2025 national average for 91 RON unleaded.</p>
      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Fuel economy</th>
            <th>Cost per km</th>
            <th>Annual cost (15,000 km)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mazda 3 (petrol)</td>
            <td>7.5 L/100km</td>
            <td>$0.146/km</td>
            <td>$2,194</td>
          </tr>
          <tr>
            <td>Toyota RAV4 (petrol)</td>
            <td>8.0 L/100km</td>
            <td>$0.156/km</td>
            <td>$2,340</td>
          </tr>
          <tr>
            <td>Toyota Corolla (petrol)</td>
            <td>8.5 L/100km</td>
            <td>$0.166/km</td>
            <td>$2,486</td>
          </tr>
          <tr>
            <td>Hyundai Tucson (petrol)</td>
            <td>8.5 L/100km</td>
            <td>$0.166/km</td>
            <td>$2,486</td>
          </tr>
          <tr>
            <td>Toyota Camry (petrol)</td>
            <td>9.0 L/100km</td>
            <td>$0.176/km</td>
            <td>$2,633</td>
          </tr>
          <tr>
            <td>Ford Ranger (petrol)</td>
            <td>10.5 L/100km</td>
            <td>$0.205/km</td>
            <td>$3,071</td>
          </tr>
          <tr>
            <td>Toyota HiLux (petrol)</td>
            <td>11.5 L/100km</td>
            <td>$0.224/km</td>
            <td>$3,364</td>
          </tr>
        </tbody>
      </table>
      <p>The difference between the most and least efficient vehicles here is significant: a Mazda 3 driver spends over $1,170 less per year on fuel than a HiLux driver covering the same distance. Over a 5-year ownership period, that gap exceeds $5,800 — a meaningful factor in total cost of ownership.</p>

      <h2>EV vs Petrol: Cost Per Km Comparison</h2>
      <p>Electric vehicles have transformed the cost-per-km equation for Australian drivers. While petrol cars typically cost $0.15–$0.25/km in fuel alone, EVs cost a fraction of that — especially when charged at home on off-peak electricity.</p>
      <table>
        <thead>
          <tr>
            <th>Vehicle type</th>
            <th>Energy use</th>
            <th>Energy cost</th>
            <th>Cost per km</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Petrol small car (7.5 L/100km)</td>
            <td>7.5 L/100km</td>
            <td>$1.95/L</td>
            <td>$0.146/km</td>
          </tr>
          <tr>
            <td>Petrol average car (10 L/100km)</td>
            <td>10 L/100km</td>
            <td>$1.95/L</td>
            <td>$0.195/km</td>
          </tr>
          <tr>
            <td>Petrol SUV/ute (12 L/100km)</td>
            <td>12 L/100km</td>
            <td>$1.95/L</td>
            <td>$0.234/km</td>
          </tr>
          <tr>
            <td>EV — home charging (off-peak)</td>
            <td>16 kWh/100km</td>
            <td>$0.12/kWh</td>
            <td>$0.019/km</td>
          </tr>
          <tr>
            <td>EV — home charging (standard)</td>
            <td>16 kWh/100km</td>
            <td>$0.28/kWh</td>
            <td>$0.045/km</td>
          </tr>
          <tr>
            <td>EV — public DC fast charger</td>
            <td>16 kWh/100km</td>
            <td>$0.55/kWh</td>
            <td>$0.088/km</td>
          </tr>
        </tbody>
      </table>
      <p>Even at standard home electricity rates, EVs cost roughly $0.04–$0.05/km — about 3–5× cheaper per km than the average petrol car. At off-peak rates with a solar system, EV fuel cost can fall below $0.02/km.</p>
      <p>For a driver covering 15,000 km/year, switching from a 10 L/100km petrol car to an EV charged mostly at home saves approximately <strong>$2,250–$2,625 per year</strong> in fuel costs alone. That saving needs to be weighed against the higher purchase price and depreciation of the EV.</p>

      <h2>Annual Fuel Cost: What Does 15,000 km Actually Cost You?</h2>
      <p>The average Australian driver travels approximately 13,000–15,000 km per year. Here is what that distance costs at various fuel efficiencies, calculated at $1.95/L:</p>
      <table>
        <thead>
          <tr>
            <th>Fuel economy</th>
            <th>Litres used (15,000 km)</th>
            <th>Annual fuel cost</th>
            <th>Cost per week</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>6 L/100km (very efficient)</td>
            <td>900 L</td>
            <td>$1,755</td>
            <td>$33.75</td>
          </tr>
          <tr>
            <td>8 L/100km (efficient)</td>
            <td>1,200 L</td>
            <td>$2,340</td>
            <td>$45.00</td>
          </tr>
          <tr>
            <td>10 L/100km (average)</td>
            <td>1,500 L</td>
            <td>$2,925</td>
            <td>$56.25</td>
          </tr>
          <tr>
            <td>12 L/100km (SUV/larger car)</td>
            <td>1,800 L</td>
            <td>$3,510</td>
            <td>$67.50</td>
          </tr>
          <tr>
            <td>15 L/100km (large ute/4WD)</td>
            <td>2,250 L</td>
            <td>$4,388</td>
            <td>$84.38</td>
          </tr>
        </tbody>
      </table>
      <p>These figures are fuel costs only — they do not include registration, insurance, tyres, servicing, or depreciation. A full picture of your annual running costs will be 3–4× higher than fuel alone. Use our <Link href="/blog/car-running-costs-australia">Car Running Costs Australia</Link> guide for a complete breakdown.</p>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <h2>7 Ways to Reduce Your Petrol Cost Per Km</h2>
      <p>You cannot control the price at the pump, but you can control how many litres your car needs per kilometre. Each of these measures has a meaningful, measurable effect on your fuel economy:</p>

      <h3>1. Maintain Correct Tyre Pressure</h3>
      <p>Under-inflated tyres increase rolling resistance, which directly raises fuel consumption. Driving on tyres 10 PSI below the recommended pressure increases fuel use by approximately 1–3%. Check your door jamb or owner&apos;s manual for the correct pressure, and check monthly — tyres naturally lose 1–2 PSI per month.</p>

      <h3>2. Accelerate and Decelerate Smoothly</h3>
      <p>Aggressive acceleration is the single biggest driver of excess fuel consumption in city driving. Anticipating traffic flow, accelerating gently, and coasting to a stop instead of braking hard can reduce fuel consumption by 10–20% in urban conditions. Modern fuel-injected cars use virtually zero fuel when decelerating with the engine in gear — so coasting down to a red light burns nothing.</p>

      <h3>3. Drive at the Optimal Speed on Highways</h3>
      <p>Aerodynamic drag increases with the square of speed. Most modern petrol cars are most efficient between 80–100 km/h. Driving at 110 km/h instead of 90 km/h typically increases fuel consumption by 15–20%. On a long highway trip, slowing down 10 km/h can save 1–2 L/100km — around $15–$25 per 1,000 km.</p>

      <h3>4. Remove Excess Weight and Roof Racks</h3>
      <p>Every extra 100 kg of weight increases fuel consumption by roughly 0.5 L/100km. Empty roof racks add aerodynamic drag equivalent to 0.2–0.5 L/100km at highway speeds. Remove roof boxes and racks when not in use — it is a free fuel saving.</p>

      <h3>5. Service Your Car Regularly</h3>
      <p>Fresh engine oil, a clean air filter, and properly functioning fuel injectors all contribute to optimal combustion efficiency. A clogged air filter alone can increase fuel consumption by 10%. Sticking to the manufacturer&apos;s service schedule is not just about reliability — it is also a direct fuel economy measure.</p>

      <h3>6. Use the Air Conditioning Strategically</h3>
      <p>Air conditioning increases fuel consumption by 1–2 L/100km in city conditions. At speeds below 60 km/h, opening windows is more fuel-efficient than running the A/C. At highway speeds above 80 km/h, the aerodynamic drag from open windows is worse than the A/C load — so close the windows and use A/C at motorway speeds.</p>

      <h3>7. Time Your Petrol Purchases</h3>
      <p>In most Australian capital cities, petrol prices follow a weekly cycle with lows typically mid-week (Tuesday–Wednesday) and peaks Thursday–Saturday. Filling up on the cheap day of the cycle can save $0.12–$0.22 per litre — a $6–$13 saving per 60-litre fill. Read our full guide: <Link href="/blog/best-time-to-buy-petrol-australia">Best Time to Buy Petrol in Australia</Link>.</p>

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — calculate fuel cost for any trip by distance and fuel economy</li>
        <li><Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link> — find your weekly and annual commute fuel spend</li>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</Link> — see exactly how much a more efficient car saves you</li>
        <li><Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Calculator</Link> — full lifetime cost comparison including purchase price</li>
        <li><Link href="/calculators/fuel-budget-planner">Fuel Budget Planner</Link> — set a monthly fuel budget and track your spend</li>
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
        <strong>Disclaimer:</strong> Fuel economy figures are real-world estimates based on published manufacturer data and independent testing. Actual consumption varies with driving conditions, load, terrain, and vehicle condition. Petrol prices used in examples are indicative only — check current prices with GasBuddy, MotorMouth, or your state fuel authority.
      </aside>
    </BlogArticleLayout>
  );
}
