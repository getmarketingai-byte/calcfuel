import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Best Time to Buy Petrol in Australia (2025 Price Cycle Guide)",
  description:
    "Australian petrol prices follow a predictable weekly cycle. Find out which day is cheapest to fill up in Sydney, Melbourne, Brisbane, Adelaide, and Perth — and which apps track prices in real time.",
  path: "/blog/best-time-to-buy-petrol-australia",
  type: "article",
});

const faqs = [
  {
    question: "What is the cheapest day to buy petrol in Australia?",
    answer: "In most Australian cities, Tuesday and Wednesday are consistently the cheapest days to buy petrol. The cycle typically bottoms out Monday night through Wednesday morning before rising sharply Thursday through Saturday. Sunday prices are usually on the way back down. Perth operates differently due to the Fuelwatch scheme — prices are set 24 hours in advance and posted publicly, making it easy to know tomorrow's prices today.",
  },
  {
    question: "How does the Australian petrol price cycle work?",
    answer: "Australian petrol prices follow a weekly cycle driven by wholesale market pricing and retail competition. Prices typically drop for several days after the weekend peak, reaching a low point mid-week (often Tuesday night to Wednesday), then rise again as retailers restore margins ahead of the high-demand weekend period. The typical swing between the weekly high and low is 12–22 cents per litre in major cities.",
  },
  {
    question: "What is Perth's petrol price system?",
    answer: "Western Australia runs a unique FuelWatch scheme administered by the WA Department of Mines, Industry Regulation and Safety. Every petrol station must submit its price for the following day by 2pm each day. These prices are locked in and published publicly that evening. This means Perth drivers can check FuelWatch the night before and know exactly which station will be cheapest the next day — eliminating price cycle guesswork.",
  },
  {
    question: "Which app shows the cheapest petrol near me in Australia?",
    answer: "The best apps for finding cheap petrol in Australia: GasBuddy (nationwide, crowd-sourced, very accurate); MotorMouth (nationwide, reliable real-time prices); Petrol Spy (nationwide, good coverage); FuelWatch app (Western Australia only, official government data); NRMA Fuel app (NSW focus); and RACQ Fuel Finder (Queensland focus). All are free. GasBuddy and MotorMouth have the broadest coverage outside of WA.",
  },
  {
    question: "How much cheaper is petrol at the cheapest point in the cycle?",
    answer: "In Sydney and Melbourne, the price difference between the weekly high and low is typically 12–22 cents per litre. On a 60-litre tank, that is a saving of $7–$13 per fill-up. For a driver who fills up weekly, timing fills to the cheap point saves $365–$675 per year. Brisbane and Adelaide have similar cycles; Darwin and Hobart have less pronounced swings due to smaller retail markets.",
  },
  {
    question: "Is it worth driving out of my way to find cheap petrol?",
    answer: "Usually not. Driving 5 km out of your way to save 10c/L on a 50-litre fill saves $5 but uses roughly 0.5 L of fuel (about $1). The net saving is around $4 — worthwhile if the cheaper station is on your regular route, but the maths rarely justify a dedicated trip. Use a price comparison app to find the cheapest station within 2–3 km of your normal route rather than making special trips.",
  },
  {
    question: "Does the type of petrol matter — should I use E10 instead of 91?",
    answer: "E10 (10% ethanol blend) is typically 4–8 cents per litre cheaper than 91 RON regular unleaded. However, E10 has about 3% lower energy density, so your fuel economy drops slightly. For most modern cars, the fuel economy penalty is small enough that E10 is still cheaper in total cost — but check your owner's manual. Some older vehicles and small engines (lawn mowers, motorcycles) are not compatible with E10.",
  },
  {
    question: "What causes petrol prices to spike in Australia?",
    answer: "The main drivers of Australian petrol price spikes are: Singapore Mogas 95 benchmark price (wholesale price set internationally); Australian dollar exchange rate (AUD weakens = higher import costs in AUD); crude oil price movements (Brent crude); and retail margin cycles (retailers restore margins after competitive price wars). Tax changes (fuel excise) and regional supply disruptions also cause spikes. Australian fuel excise is 48.8c/L as of 2025.",
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

export default function BestTimeToBuyPetrolPage() {
  return (
    <BlogArticleLayout
      title="Best Time to Buy Petrol in Australia (2025 Price Cycle Guide)"
      category="Fuel & Energy"
      readTime="7 min read"
      publishedDate="2026-07-01"
      slug="best-time-to-buy-petrol-australia"
      description="Australian petrol prices follow a predictable weekly cycle. Learn which day is cheapest in your city, which apps to use, and how much you can save by timing your fill-ups."
      authorName="CalcFuel Editorial Team"
      authorRole="Fuel & Energy Calculators"
      authorBio="Our team builds practical calculators and guides for drivers, fleet operators, and anyone tracking their fuel spend."
      relatedLinks={[
        { href: "/blog/how-to-reduce-commute-fuel-costs", label: "How to Reduce Your Commute Fuel Costs: 7 Proven Tips" },
        { href: "/blog/understanding-fuel-economy-mpg-vs-l100km", label: "Understanding Fuel Economy: MPG vs L/100km Explained" },
        { href: "/calculators/commute-fuel-cost-calculator", label: "Commute Fuel Cost Calculator" },
        { href: "/calculators/trip-fuel-cost-calculator", label: "Trip Fuel Cost Calculator" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your fuel costs</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Use our free calculators to see how much you spend on fuel — and how much you could save.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/commute-fuel-cost-calculator" className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-sm">
            Commute Cost Calculator →
          </Link>
          <Link href="/calculators/trip-fuel-cost-calculator" className="inline-block bg-white dark:bg-gray-800 text-orange-500 font-semibold px-4 py-2 rounded-xl border border-orange-300 hover:bg-orange-50 transition-colors text-sm">
            Trip Fuel Calculator →
          </Link>
        </div>
      </div>

      <h2>The Australian Petrol Price Cycle Explained</h2>
      <p>Australian petrol prices are not random. In most capital cities, they follow a predictable weekly cycle driven by wholesale pricing and retail competition. Understanding the cycle is the single easiest way to spend less on fuel — no behaviour change required, just timing.</p>
      <p>The typical pattern in Sydney, Melbourne, Brisbane, and Adelaide:</p>
      <ul>
        <li><strong>Monday–Tuesday:</strong> Prices begin dropping from the weekend high as retailers compete for mid-week customers</li>
        <li><strong>Tuesday night–Wednesday:</strong> The weekly price trough — usually the cheapest point of the cycle</li>
        <li><strong>Thursday–Friday:</strong> Prices rise sharply as retailers restore margins ahead of the weekend</li>
        <li><strong>Saturday–Sunday:</strong> Peak prices. Many drivers fill up on the weekend, paying more than necessary</li>
      </ul>
      <p>The gap between the weekly high and low is typically <strong>12–22 cents per litre</strong> in Sydney and Melbourne — a significant difference when you are putting 50–70 litres in the tank.</p>

      <h2>Cheapest Day to Buy Petrol: City by City</h2>
      <table>
        <thead>
          <tr><th>City</th><th>Cheapest day(s)</th><th>Most expensive</th><th>Typical price swing</th></tr>
        </thead>
        <tbody>
          <tr><td>Sydney</td><td>Tuesday–Wednesday</td><td>Friday–Saturday</td><td>12–20c/L</td></tr>
          <tr><td>Melbourne</td><td>Tuesday–Wednesday</td><td>Thursday–Friday</td><td>15–22c/L</td></tr>
          <tr><td>Brisbane</td><td>Wednesday</td><td>Friday–Saturday</td><td>10–18c/L</td></tr>
          <tr><td>Adelaide</td><td>Wednesday</td><td>Thursday–Saturday</td><td>12–20c/L</td></tr>
          <tr><td>Perth</td><td>Check FuelWatch</td><td>Check FuelWatch</td><td>8–15c/L (less predictable)</td></tr>
          <tr><td>Darwin</td><td>Less pronounced cycle</td><td>Less pronounced</td><td>5–10c/L</td></tr>
          <tr><td>Hobart</td><td>Tuesday–Wednesday</td><td>Weekend</td><td>8–12c/L</td></tr>
          <tr><td>Canberra</td><td>Tuesday–Wednesday</td><td>Weekend</td><td>10–16c/L</td></tr>
        </tbody>
      </table>
      <p>These are typical patterns. The cycle can shift by a day or two depending on when wholesale prices move. Always cross-check with a real-time app (see below) rather than relying purely on the day of the week.</p>

      <h2>Perth: The Fuelwatch Advantage</h2>
      <p>Perth drivers have an enormous advantage: the WA Government&apos;s <strong>FuelWatch</strong> scheme requires every petrol station to submit tomorrow&apos;s price by 2pm each day. These prices are locked in and published publicly each evening at 6pm.</p>
      <p>This means Perth drivers can:</p>
      <ul>
        <li>Check <strong>fuelwatch.wa.gov.au</strong> or the FuelWatch app tonight and know exactly which stations will be cheapest tomorrow</li>
        <li>Plan their fill-up day in advance with zero uncertainty</li>
        <li>Set up email alerts for prices below a chosen threshold</li>
      </ul>
      <p>No other Australian city has this level of price transparency. If you live in Perth and are not using FuelWatch, you are paying more than you need to.</p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>Best Apps to Find Cheap Petrol in Australia</h2>
      <table>
        <thead>
          <tr><th>App</th><th>Coverage</th><th>Best for</th><th>Free?</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>GasBuddy</strong></td><td>Nationwide</td><td>Crowd-sourced, very accurate real-time data</td><td>Yes (ads)</td></tr>
          <tr><td><strong>MotorMouth</strong></td><td>Nationwide</td><td>Clean interface, reliable prices</td><td>Yes</td></tr>
          <tr><td><strong>Petrol Spy</strong></td><td>Nationwide</td><td>Good regional coverage, price history charts</td><td>Yes</td></tr>
          <tr><td><strong>FuelWatch</strong></td><td>Perth (WA) only</td><td>Official government data, next-day prices</td><td>Yes</td></tr>
          <tr><td><strong>NRMA Fuel</strong></td><td>NSW/ACT focus</td><td>Integrated with NRMA membership</td><td>Yes</td></tr>
          <tr><td><strong>RACQ Fuel Finder</strong></td><td>Queensland focus</td><td>QLD prices, RACQ member integration</td><td>Yes</td></tr>
          <tr><td><strong>7-Eleven Fuel</strong></td><td>7-Eleven only</td><td>Lock in today&apos;s cheap price for up to 7 days</td><td>Yes</td></tr>
        </tbody>
      </table>
      <p><strong>Pro tip:</strong> The 7-Eleven Fuel Lock feature is underused. When prices are at the weekly low, you can lock in that price on the app and redeem it at any 7-Eleven for up to 7 days — even if prices have risen by the time you fill up.</p>

      <h2>How Much Can You Save by Timing Your Fill-Ups?</h2>
      <p>Let&apos;s put real numbers to it. A typical Australian driver uses around 1,300–1,500 litres per year (15,000 km at 8.5–10 L/100km):</p>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Annual litres</th><th>Price at cycle peak</th><th>Price at cycle low</th><th>Annual saving</th></tr>
        </thead>
        <tbody>
          <tr><td>Small car (7 L/100km, 12,000 km)</td><td>840 L</td><td>$2.08/L = $1,747</td><td>$1.91/L = $1,604</td><td><strong>$143</strong></td></tr>
          <tr><td>Average car (9 L/100km, 15,000 km)</td><td>1,350 L</td><td>$2.08/L = $2,808</td><td>$1.91/L = $2,579</td><td><strong>$229</strong></td></tr>
          <tr><td>SUV (12 L/100km, 18,000 km)</td><td>2,160 L</td><td>$2.08/L = $4,493</td><td>$1.91/L = $4,126</td><td><strong>$367</strong></td></tr>
          <tr><td>Dual-cab ute (13 L/100km, 20,000 km)</td><td>2,600 L</td><td>$2.08/L = $5,408</td><td>$1.91/L = $4,966</td><td><strong>$442</strong></td></tr>
        </tbody>
      </table>
      <p>Based on a 17c/L swing (typical Sydney/Melbourne), assuming you capture the full saving 80% of the time. Savings range from $115–$354/year in practice. Not life-changing, but a free saving that takes no effort — just fill up on Tuesday or Wednesday.</p>

      <h2>E10 vs 91 RON: Is the Cheaper Ethanol Blend Worth It?</h2>
      <p>E10 (10% ethanol, 90% petrol) is typically <strong>4–8 cents per litre cheaper</strong> than 91 RON regular unleaded. But E10 has about 3% lower energy density than straight petrol — so your fuel economy drops slightly.</p>
      <p>Whether E10 saves you money depends on the price gap at your local station:</p>
      <ul>
        <li><strong>Price gap &gt; 3%</strong> (typically 5c/L or more): E10 is cheaper overall, even accounting for the economy penalty</li>
        <li><strong>Price gap &lt; 3%</strong>: The economy penalty wipes out the price saving — stick with 91</li>
        <li><strong>Check your manual:</strong> Some older vehicles, small engines (motorcycles, lawn mowers, marine), and high-performance cars should not use E10</li>
      </ul>
      <p>For most modern Australian cars built after 2005, E10 is fine and usually cheaper in total cost when the price gap is 5c/L or more.</p>

      <h2>What Drives Petrol Prices Up in Australia?</h2>
      <p>Australian petrol prices are set by a combination of international and domestic factors:</p>
      <ul>
        <li><strong>Singapore Mogas 95 benchmark:</strong> Australia imports most of its refined petrol. The Singapore wholesale price is the main international input.</li>
        <li><strong>AUD/USD exchange rate:</strong> Petrol is priced in USD. When the AUD weakens, import costs rise in AUD terms.</li>
        <li><strong>Crude oil (Brent):</strong> The upstream input to refining. OPEC decisions and geopolitical events move this.</li>
        <li><strong>Fuel excise:</strong> Fixed at 48.8 cents per litre in 2025. This is passed directly to consumers on every litre sold.</li>
        <li><strong>Retail competition and margins:</strong> The weekly price cycle is driven by how aggressively retailers compete to attract customers mid-week.</li>
      </ul>
      <p>Understanding these drivers helps you interpret price news. A spike in crude oil prices will flow through to bowser prices 2–3 weeks later (the lag for shipping and refining). A sharp AUD fall often shows up in prices within days.</p>

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/commute-fuel-cost-calculator">Commute Fuel Cost Calculator</Link> — calculate your weekly and annual commute fuel spend</li>
        <li><Link href="/calculators/trip-fuel-cost-calculator">Trip Fuel Cost Calculator</Link> — plan your fuel cost for any trip</li>
        <li><Link href="/calculators/fuel-economy-savings-calculator">Fuel Economy Savings Calculator</Link> — see how much a more efficient car would save you</li>
        <li><Link href="/calculators/ev-vs-gas-calculator">EV vs Petrol Calculator</Link> — compare electric vs petrol running costs</li>
        <li><Link href="/calculators/fuel-budget-planner">Fuel Budget Planner</Link> — set a monthly fuel budget and track spend</li>
        <li><Link href="/calculators/carpool-fuel-split-calculator">Carpool Fuel Split Calculator</Link> — split fuel costs fairly with co-workers</li>
      </ul>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

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
        <strong>Disclaimer:</strong> Petrol price cycle patterns are based on historical trends in Australian capital cities and may vary by week, season, and market conditions. Always verify current prices using a real-time app before making a special trip. Fuel excise figures are as of 2025 — check the ATO for current rates.
      </aside>
    </BlogArticleLayout>
  );
}
