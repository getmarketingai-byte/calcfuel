import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import HydrogenVsGasCalc from "./HydrogenVsGasCalc";

export const metadata: Metadata = {
  title: "Hydrogen vs Gas Cost Calculator — Fuel Cell vs Gasoline vs Electric",
  description: "Compare cost per mile/km for hydrogen fuel cell vehicles vs gasoline vs electric. Enter H₂ price, fuel economy, and annual mileage to see which powertrain is cheapest.",
};

const relatedTools = [
  { title: "EV vs Gas Calculator", slug: "ev-vs-gas-calculator", description: "Compare total cost of ownership between electric and gas vehicles." },
  { title: "Hybrid vs Gas Calculator", slug: "hybrid-vs-gas-calculator", description: "See how much a hybrid saves vs a standard petrol car." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "Calculate annual savings from improving your MPG or L/100km." },
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Work out your daily and annual commute fuel spend." },
];

const faqs = [
  {
    question: "How much does hydrogen fuel cost per mile?",
    answer: "In the US, hydrogen typically costs $14–$20 per kg at retail stations. A Toyota Mirai achieves about 66 miles per kg, making the fuel cost approximately $0.21–$0.30 per mile. Compare this to gasoline at $3.50/gallon and 30 MPG = $0.117/mile, or an EV at $0.13/kWh and 3.5 miles/kWh = $0.037/mile. At current retail prices, hydrogen fuel is the most expensive of the three options on a per-mile basis.",
  },
  {
    question: "Why is hydrogen so expensive compared to electricity?",
    answer: "Most commercial hydrogen is produced via steam methane reforming (SMR) from natural gas — an energy-intensive process. Green hydrogen (from electrolysis powered by renewables) is even more expensive today, though costs are falling rapidly. Additionally, the hydrogen refuelling infrastructure is sparse, so there is no competitive pressure on retail prices. By contrast, electricity is already widely distributed and priced competitively. Analysts expect hydrogen costs to fall significantly by 2030–2035 as electrolysis scales.",
  },
  {
    question: "Where can I refuel a hydrogen car?",
    answer: "As of 2025, hydrogen refuelling stations are concentrated in California (over 50 stations), parts of Europe (especially Germany, the UK, and the Netherlands), Japan, and South Korea. Australia has very limited public hydrogen refuelling infrastructure. Toyota, Hyundai, and Honda are the primary manufacturers of consumer hydrogen fuel cell vehicles. Before purchasing an FCEV, confirm that stations exist within your daily driving range — unlike EVs, home hydrogen refuelling is not available.",
  },
  {
    question: "Will hydrogen vehicles become cheaper than EVs?",
    answer: "Most industry analysts expect hydrogen FCEVs to remain more expensive than BEVs for personal vehicle use through at least 2030. However, hydrogen has significant advantages for heavy transport (trucks, buses, ships, trains) where battery weight and recharging time are prohibitive. For passenger cars, the consensus view is that battery EVs will continue to dominate due to their established infrastructure, home charging convenience, and falling battery costs. Hydrogen's future in personal transport depends heavily on government subsidies and green hydrogen production costs.",
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "Choose miles/USD for US users or km/AUD for Australian users. Defaults are pre-filled with typical values for each region — adjust them to match your local fuel prices.",
  },
  {
    name: "Enter hydrogen fuel details",
    text: "Input the current hydrogen price per kg at your nearest station and your vehicle's fuel economy in miles/kg or km/kg. The Toyota Mirai achieves approximately 66 miles/kg (106 km/kg) under EPA testing.",
  },
  {
    name: "Enter gasoline and electric vehicle details",
    text: "Fill in your local petrol price and vehicle fuel economy, then enter your electricity rate and EV efficiency. Use your home charging tariff for the electricity rate — not the public fast-charger rate.",
  },
  {
    name: "Set your annual mileage",
    text: "Enter how many miles or km you drive per year. This determines the total annual fuel cost for each vehicle type and reveals which powertrain is cheapest for your specific driving pattern.",
  },
];

export default function HydrogenVsGasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Hydrogen vs Gas Cost Calculator"
        description="Compare cost per mile or km for hydrogen fuel cell vehicles vs gasoline vs electric. See annual fuel costs and per-mile costs side by side."
        url="https://calcfuel.com/calculators/hydrogen-vs-gas-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "Hydrogen vs Gas Calculator", url: "https://calcfuel.com/calculators/hydrogen-vs-gas-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel &amp; Energy</Link><span className="mx-2">/</span>
        <span>Hydrogen vs Gas Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Hydrogen vs Gas Cost Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Compare the real cost per mile (or km) for hydrogen fuel cell, gasoline, and electric vehicles. Enter your local fuel prices and annual mileage to find out which powertrain is cheapest for you.
      </p>

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <HydrogenVsGasCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Hydrogen Fuel Cell Vehicles: The Third Powertrain Option</h2>
        <p>
          Alongside battery electric vehicles (BEVs) and conventional internal combustion engine (ICE) cars, hydrogen fuel cell electric vehicles (FCEVs) represent a third pathway to low-emission personal transport. FCEVs carry hydrogen in a high-pressure tank and combine it with oxygen in a fuel cell stack to generate electricity on-board — effectively making them EVs that refuel in 3–5 minutes rather than charging over hours.
        </p>
        <p>
          The Toyota Mirai, Hyundai Nexo, and Honda CR-V e:FCEV are the main consumer FCEVs available in markets with hydrogen infrastructure. All offer 500–650 km (310–400 miles) of range per fill and produce only water vapour from the tailpipe.
        </p>

        <h2>Current Hydrogen Pricing: The Main Barrier</h2>
        <p>
          The critical disadvantage of FCEVs today is hydrogen cost. In California — the world's most developed consumer hydrogen market — retail hydrogen prices ranged from $14 to $36 per kg in 2024, with an average around $16–$20/kg. At 66 miles/kg for a Mirai, that translates to roughly $0.24–$0.30 per mile in fuel costs alone.
        </p>
        <p>
          By contrast, an EV using home electricity at $0.13/kWh and achieving 3.5 miles/kWh costs just $0.037/mile — roughly 6–8 times cheaper than hydrogen at current retail prices. Gasoline at $3.50/gallon and 30 MPG costs $0.117/mile — still significantly cheaper than hydrogen.
        </p>
        <p>
          In Australia, hydrogen is even scarcer and more expensive. The handful of operational stations charge $25–$35/kg AUD, making FCEVs economically uncompetitive for everyday personal transport in 2025.
        </p>

        <h2>Green vs Grey Hydrogen</h2>
        <p>
          Most hydrogen produced today is "grey hydrogen" — made from natural gas via steam methane reforming, which produces significant CO₂ emissions. "Blue hydrogen" captures those emissions with carbon capture and storage (CCS). "Green hydrogen" uses renewable electricity to split water via electrolysis — producing no direct emissions but currently costing $5–$10/kg to produce at scale, with retail markups bringing it to $15–$35/kg at the pump.
        </p>
        <p>
          The environmental case for FCEVs is strongest when running on green hydrogen. However, the well-to-wheel energy efficiency of green hydrogen (approximately 25–35%) compares unfavourably to battery EVs (approximately 70–80%), meaning more renewable electricity is required per kilometre driven.
        </p>

        <h2>Where Hydrogen Makes Sense</h2>
        <p>
          Most analysts agree hydrogen has a stronger case in heavy transport — long-haul trucking, shipping, aviation, and rail — where battery energy density and recharge time constraints are most acute. For personal passenger vehicles, the convenience of home EV charging, the falling cost of batteries, and the established electricity grid give BEVs a structural advantage.
        </p>
        <p>
          If you live in California, parts of Europe, Japan, or South Korea where hydrogen stations are accessible, and you value fast refuelling and long range without the need for home charging infrastructure, an FCEV may be worth considering — particularly with manufacturer incentives and subsidised hydrogen that bring effective costs closer to EV parity.
        </p>

        <h2>Future Outlook</h2>
        <p>
          Green hydrogen production costs are projected to fall to $2–$4/kg by 2030 as electrolyser capacity scales and renewable electricity costs continue declining. If retail hydrogen reaches $8–$10/kg, FCEV fuel costs would approach EV parity. Several governments — including the EU, Japan, South Korea, and Australia — have committed to hydrogen economy roadmaps with billions in subsidised infrastructure investment. The 2030s may see hydrogen become genuinely cost-competitive for personal transport, particularly in regions where electricity grids remain carbon-intensive.
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
