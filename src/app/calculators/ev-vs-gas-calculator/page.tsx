import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import EvVsGasCalc from "./EvVsGasCalc";
import MarketingAICTA from "@/components/MarketingAICTA";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "EV vs Gas Calculator — Electric Car Total Cost of Ownership",
  description: "Compare EV vs gas car total cost over 5 or 10 years. Includes purchase price, fuel vs electricity, maintenance, and insurance. No federal EV credit assumed post-2026.",
};

const relatedTools = [
  { title: "Commute Fuel Cost Calculator", slug: "commute-fuel-cost-calculator", description: "Calculate your daily and annual commute fuel costs." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "See how much you save by improving your MPG." },
  { title: "Generator Fuel Calculator", slug: "generator-fuel-calculator", description: "Calculate generator runtime and fuel needed for outages." },
];

const faqs = [
  { question: "Is an EV cheaper than a gas car over 5 years?", answer: "It depends on your driving patterns, electricity rates, and vehicle purchase prices. EVs have higher purchase prices but significantly lower fuel and maintenance costs. For high-mileage drivers (15,000+ miles/year) with access to cheap home charging (under $0.15/kWh), an EV often breaks even within 4–6 years. Lower-mileage drivers may find a gas car cheaper over a 5-year period." },
  { question: "Does the federal EV tax credit apply?", answer: "The US federal EV tax credit situation is uncertain post-2025. This calculator does not include any federal EV tax credit by default, reflecting the post-2026 reality. If you are purchasing an EV in 2024–2025 and qualify for the $7,500 credit, subtract that amount from your EV purchase price in the calculator for a more accurate comparison." },
  { question: "How much does it cost to charge an EV per km or mile?", answer: "At $0.13/kWh and 4 miles per kWh (a typical EV efficiency), charging costs approximately $0.0325/mile. At $0.25/kWh (average Australian rate) and 5.5 km/kWh, charging costs about $0.045/km. Compare this to petrol at $1.85/litre and 8.5 L/100km = $0.157/km — EVs typically cost 60–75% less per kilometre in fuel." },
  { question: "Are EVs really cheaper to maintain?", answer: "Yes — EVs have significantly fewer moving parts than internal combustion engines. No oil changes, no transmission fluid, no spark plugs, no exhaust system maintenance. EV owners typically save $800–$1,200 per year in maintenance costs compared to equivalent gas vehicles. The main EV-specific cost is eventual battery replacement (typically 150,000–200,000 miles / 240,000–320,000 km), though most owners sell before needing this." },
  { question: "What electricity rate should I use?", answer: "Use your home charging rate — typically the off-peak tariff if you charge overnight. In Australia, off-peak rates range from $0.10–$0.20/kWh. In the US, average residential rates are $0.12–$0.18/kWh. If you charge primarily at public DC fast chargers, use a higher rate of $0.35–$0.60/kWh as public charging costs significantly more than home charging." },
];

const howToSteps = [
  { name: "Select unit system and time horizon", text: "Choose miles or km depending on your country. Select 5 or 10 years for the comparison period — 10 years better reflects the full lifecycle advantage of an EV." },
  { name: "Enter annual distance driven", text: "Enter how many miles or km you drive annually. Higher annual mileage increases the relative advantage of EVs due to lower per-km fuel costs." },
  { name: "Enter gas vehicle details", text: "Enter the gas car's purchase price, fuel economy (MPG or L/100km), current gas price, and estimated annual maintenance and insurance costs." },
  { name: "Enter EV details", text: "Enter the EV's purchase price, efficiency in miles per kWh or kWh per 100km, your home electricity rate, and estimated annual maintenance and insurance." },
  { name: "Compare total costs and break-even", text: "The calculator shows the total cost of ownership for each vehicle and the break-even year when the EV becomes cheaper on a cumulative basis." },
];

export default function EvVsGasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="EV vs Gas Calculator"
        description="Compare electric vehicle vs gas car total cost of ownership over 5 or 10 years including purchase, fuel/electricity, maintenance, and insurance."
        url="https://calcfuel.com/calculators/ev-vs-gas-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Fuel & Energy", url: "https://calcfuel.com/calculators/fuel-energy" },
          { name: "EV vs Gas Calculator", url: "https://calcfuel.com/calculators/ev-vs-gas-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/fuel-energy" className="hover:text-orange-500">Fuel & Energy</Link><span className="mx-2">/</span>
        <span>EV vs Gas Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">EV vs Gas Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Compare the total 5-year or 10-year cost of owning an electric vehicle versus a gas car, including purchase price, fuel, maintenance, and insurance.</p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <EvVsGasCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <EmailCapture />
      <MarketingAICTA />
      <article className="prose max-w-none mt-4">
        <h2>EV vs Gas Car: Total Cost of Ownership Explained</h2>
        <p>When comparing electric vehicles to gas cars, the sticker price tells only part of the story. Total Cost of Ownership (TCO) encompasses every dollar you spend on a vehicle over its life: purchase price, fuel or electricity, routine maintenance, insurance, and eventually depreciation and resale value. For most buyers making a 5–10 year ownership decision, TCO is the most financially rational comparison metric.</p>
        <p>EVs typically cost 15–30% more upfront than equivalent gas vehicles, but recoup this premium through lower running costs. The key variables that determine whether an EV breaks even within your ownership period are: how many kilometres or miles you drive annually, the difference between your local electricity rate and petrol/gas price, and the maintenance cost differential.</p>

        <h2>The Four Cost Components</h2>
        <h3>Purchase Price</h3>
        <p>The most visible cost, but often not the most significant over a 10-year ownership period for high-mileage drivers. In Australia in 2025, popular EVs like the BYD Atto 3 and MG4 have reached price parity with mid-range petrol vehicles. In the US, the removal or reduction of federal EV tax credits post-2025 increases the effective purchase price premium. This calculator does not include tax credits — subtract any applicable credits from the EV purchase price manually.</p>

        <h3>Fuel vs Electricity Cost</h3>
        <p>This is where EVs typically recoup their premium. An EV consuming 18 kWh/100km at $0.25/kWh costs $4.50 per 100 km. A petrol vehicle at 9 L/100km and $1.90/litre costs $17.10 per 100 km — nearly four times more. Over 20,000 km annually, that is $2,520/year in fuel savings. The gap narrows when EV owners rely heavily on public DC fast chargers (which cost $0.40–$0.60/kWh) rather than home charging.</p>

        <h3>Maintenance</h3>
        <p>EVs eliminate most scheduled maintenance: no oil and filter changes (saving $150–$300/year), no spark plug replacement, no timing belt service, no transmission fluid changes, and no exhaust system repairs. EV-specific maintenance includes tyre rotation (at higher frequency due to heavier weight and instant torque), cabin air filter replacement, and brake fluid checks. Regenerative braking significantly reduces brake pad wear — many EV owners report brake pads lasting 100,000+ km. Consumer Reports consistently finds EV owners spend 40–50% less on maintenance than gas car owners.</p>

        <h3>Insurance</h3>
        <p>EVs typically cost 15–25% more to insure than equivalent gas vehicles due to higher repair costs (specialised technicians, expensive battery packs) and higher vehicle values. This cost disadvantage narrows as EV repair infrastructure expands. Use your actual insurance quotes in this calculator for the most accurate comparison — the pre-filled estimates are averages only.</p>

        <h2>When Does an EV Break Even?</h2>
        <p>Break-even typically occurs when cumulative EV savings on fuel and maintenance equal the upfront purchase price premium. For a $15,000 premium and $3,000/year in combined savings, break-even occurs at year 5. For a $10,000 premium and $4,000/year savings (high-mileage urban driver with cheap home charging), break-even arrives at year 2.5. For lower-mileage drivers in areas with expensive electricity, break-even may never occur within a typical ownership period.</p>
        <p>The calculator shows break-even year automatically — use this to determine whether your driving profile makes an EV financially attractive within your intended ownership period.</p>
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
