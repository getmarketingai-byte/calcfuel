import { reviewIsoFor } from "@/lib/editorial";
import WorkedExample from "@/components/calc/WorkedExample";
import { WORKED_EXAMPLES } from "@/content/worked-examples";
import CalcDisclaimer from "@/components/calc/CalcDisclaimer";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import CalcReviewedBy from "@/components/CalcReviewedBy";
import HydrogenVsGasCalc from "./HydrogenVsGasCalc";
import AnswerFirst from "@/components/AnswerFirst";
import { DEFAULT_PETROL_PRICE_AUD_PER_L } from "@/lib/fuel-prices";
import { DMO_2026_27, DMO_RANGE, DMO_SOURCE, dmoCentsPerKwh } from "@/lib/electricity-prices";
import { H2_AU, h2PerKm } from "@/lib/hydrogen-au";
import { aud, perLitre } from "@/lib/format";

/** Hourly ISR so curl-visible ages and stale flags stay within an hour of request time. */
export const revalidate = 3600;

const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const H2_100 = h2PerKm(H2_AU.vivaPricePerKg) * 100;
const H2_100_LOW = (H2_AU.vivaPricePerKg / (H2_AU.rangeKmHigh / H2_AU.passengerFillKg)) * 100;
const H2_100_HIGH = (H2_AU.vivaPricePerKg / (H2_AU.rangeKmLow / H2_AU.passengerFillKg)) * 100;
const PETROL_100 = 7.5 * PETROL;
const EV_100 = 17 * DMO_RANGE.low;
const HY = H2_AU.hyresource;

export const metadata: Metadata = {
  title: "Hydrogen vs Petrol Cost Calculator (Australia)",
  description: `Hydrogen at $${H2_AU.vivaPricePerKg}/kg (Viva Energy Geelong) costs about ${aud(H2_100)} per 100 km in a Mirai or Nexo, vs ${aud(PETROL_100)} for petrol at ACCC prices. Compare with EV too.`,
  alternates: { canonical: "/calculators/hydrogen-vs-gas-calculator" },
};

const relatedTools = [
  { title: "EV vs Petrol Cost Calculator", slug: "ev-vs-gas-calculator", description: "Compare total cost of ownership between electric and petrol vehicles." },
  { title: "Hybrid vs Petrol Calculator", slug: "hybrid-vs-gas-calculator", description: "See how much a hybrid saves vs a standard petrol car." },
  { title: "Fuel Economy Savings Calculator", slug: "fuel-economy-savings-calculator", description: "Calculate annual savings from improving your MPG or L/100km." },
  { title: "Trip Fuel Cost Calculator", slug: "trip-fuel-cost-calculator", description: "Calculate total fuel cost for any road trip." },
  { title: "Idling Fuel Waste Calculator", slug: "idling-fuel-waste-calculator", description: "Calculate how much fuel you waste idling." },
];

const faqs = [
  {
    question: "How much does hydrogen cost in Australia?",
    answer: `Viva Energy's public station at Geelong charges $30/kg plus GST — $${H2_AU.vivaPricePerKg}/kg — on a walk-up basis, with volume pricing for commercial Shell card customers. A passenger fuel-cell car takes up to ${H2_AU.passengerFillKg} kg there, so a fill costs about ${aud(H2_AU.vivaPricePerKg * H2_AU.passengerFillKg)}. Other sites do not publish a retail price.`,
  },
  {
    question: "How much does a hydrogen car cost per 100 km?",
    answer: `On Viva Energy's figures — up to ${H2_AU.passengerFillKg} kg per fill and ${H2_AU.rangeKmLow}–${H2_AU.rangeKmHigh} km of range for a Toyota Mirai or Hyundai Nexo — hydrogen at $${H2_AU.vivaPricePerKg}/kg costs about ${aud(H2_100_LOW)}–${aud(H2_100_HIGH)} per 100 km. A petrol car using 7.5 L/100km costs ${aud(PETROL_100)} at the ACCC five-city average of ${perLitre(PETROL)}/L, and an EV using 17 kWh/100km costs about ${aud(EV_100)} at the lowest all-in Default Market Offer rate.`,
  },
  {
    question: "How many hydrogen stations are there in Australia?",
    answer: `CSIRO's HyResource list, current as of ${HY.current}, shows ${HY.operating} operating hydrogen refuelling sites and ${HY.underConstruction} under construction. Most serve buses, trucks or a single company's fleet; only ${HY.publicCarAccess.length} — ${HY.publicCarAccess.join(" and ")} — are described as open to the public or other fuel-cell vehicles. Canberra's and CSIRO Clayton's stations have closed.`,
  },
  {
    question: "Can I buy a hydrogen car in Australia?",
    answer: "Availability is very limited. Toyota's Mirai has been offered in Australia mainly through fleet and lease programs, and Toyota's Altona refueller is restricted to its lease customers. Before considering a fuel-cell car, confirm a station you can use is within comfortable range of where you live and drive — there is no home refuelling option.",
  },
  {
    question: "Why is hydrogen so expensive compared with electricity?",
    answer: "Making hydrogen by electrolysis uses electricity, then the gas must be compressed to 350 or 700 bar, stored and dispensed — each step loses energy and adds cost. With so few stations, there is also no retail competition. Viva Energy's own FAQ says filling a tank costs over twice the price of diesel at its early-stage site.",
  },
];

const howToSteps = [
  {
    name: "Select your unit system",
    text: "The calculator opens in km and AUD with Australian defaults: hydrogen at Viva Energy Geelong's published price, petrol at the ACCC average and electricity at the AER Default Market Offer rate.",
  },
  {
    name: "Enter hydrogen fuel details",
    text: `Enter the hydrogen price per kg and your car's km per kg. The default of ${H2_AU.kmPerKgTypical} km/kg comes from Viva Energy's figure of ${H2_AU.rangeKmLow}–${H2_AU.rangeKmHigh} km on a ${H2_AU.passengerFillKg} kg passenger-car fill.`,
  },
  {
    name: "Enter petrol and electric vehicle details",
    text: "Fill in your local petrol price and vehicle fuel economy, then enter your electricity rate and EV efficiency. Use your home charging tariff for the electricity rate — not the public fast-charger rate.",
  },
  {
    name: "Set your annual distance",
    text: "Enter how many km you drive per year. This sets the total annual energy cost for each vehicle type.",
  },
];

export default function HydrogenVsGasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Hydrogen vs Petrol Cost Calculator"
        description="Compare cost per km for hydrogen fuel-cell, petrol and electric cars at Australian prices, with annual costs side by side."
        url="https://calcfuel.com/calculators/hydrogen-vs-gas-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Calculators", url: "https://calcfuel.com/calculators" },
          { name: "Hydrogen vs Petrol Calculator", url: "https://calcfuel.com/calculators/hydrogen-vs-gas-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      datePublished="2025-10-01"
      dateModified={reviewIsoFor("/calculators/hydrogen-vs-gas-calculator")}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">Calculators</Link><span className="mx-2">/</span>
        <span>Hydrogen vs Petrol Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Hydrogen vs Petrol Cost Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        What a hydrogen fuel-cell car costs to run in Australia, per 100 km and per year, against petrol and an electric car — using the one published Australian retail hydrogen price and current petrol and electricity prices.
      </p>
      <AnswerFirst
        question="is hydrogen cheaper than petrol in Australia?"
        points={[
          <>No. At ${H2_AU.vivaPricePerKg}/kg (Viva Energy Geelong) a Mirai or Nexo costs about <strong>{aud(H2_100)} per 100 km</strong>.</>,
          <>A 7.5 L/100km petrol car: <strong>{aud(PETROL_100)}</strong> at {perLitre(PETROL)}/L. An EV at 17 kWh/100km: about <strong>{aud(EV_100)}</strong>.</>,
          <>CSIRO lists {HY.operating} operating hydrogen sites; only {HY.publicCarAccess.length} are open to the public.</>,
        ]}
      >
        <p>Hydrogen prices are not published by most Australian sites; Viva&rsquo;s is the one walk-up retail price we could verify. The station count is from CSIRO HyResource ({HY.current}).</p>
      </AnswerFirst>
      <CalcReviewedBy path="/calculators/hydrogen-vs-gas-calculator" />
      <HydrogenVsGasCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <article className="prose max-w-none mt-4">
        <h2>Where you can refuel a hydrogen car in Australia</h2>
        <p>CSIRO&rsquo;s HyResource keeps the national list of hydrogen refuelling stations. As of {HY.current} it shows {HY.operating} operating sites and {HY.underConstruction} under construction — but most exist to fuel a bus trial, a truck fleet or one company&rsquo;s vehicles. The sites the list describes as open to the public or other fuel-cell cars are:</p>
        <ul>
          {HY.publicCarAccess.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <p>Restricted-access sites include {HY.restricted.join("; ")}. Two stations that once served passenger cars — {HY.closedSince2025.join(" and ")} — have closed. If you do not live near Brisbane or Geelong, a fuel-cell car is not practical today regardless of price. Source: <a href={HY.url} target="_blank" rel="noopener noreferrer">{HY.name}</a>.</p>

        <h2>What hydrogen costs per fill and per 100 km</h2>
        <p>Viva Energy&rsquo;s Geelong station publishes a walk-up price of $30/kg plus GST, or ${H2_AU.vivaPricePerKg}/kg. Its FAQ says a passenger car such as a Toyota Mirai or Hyundai Nexo takes up to {H2_AU.passengerFillKg} kg and travels {H2_AU.rangeKmLow}–{H2_AU.rangeKmHigh} km on it. That puts a fill at about {aud(H2_AU.vivaPricePerKg * H2_AU.passengerFillKg)} and the running cost at {aud(H2_100_LOW)}–{aud(H2_100_HIGH)} per 100 km. Source: <a href={H2_AU.vivaSource.url} target="_blank" rel="noopener noreferrer">{H2_AU.vivaSource.name}</a>.</p>
        <p>For comparison, a petrol car using 7.5 L/100km costs {aud(PETROL_100)} per 100 km at the ACCC five-city average of {perLitre(PETROL)}/L — less than half. An EV&rsquo;s cost depends heavily on tariff; the table below uses the AER&rsquo;s Default Market Offer.</p>

        <h2>Electricity prices used for the EV comparison</h2>
        <p>The AER sets a Default Market Offer each year for NSW, south-east Queensland and South Australia. Dividing each annual reference bill by its benchmark usage gives an all-in average price per kWh, including the daily supply charge. That overstates the cost of the extra kWh an EV uses, and off-peak or solar charging can be far cheaper, so treat these as an upper reference.</p>
        <div className="overflow-x-auto not-prose my-4">
          <table className="w-full text-sm border-collapse">
            <caption className="text-left text-xs text-gray-700 dark:text-gray-300 mb-2">AER Default Market Offer 2026–27, residential flat rate. Published {DMO_SOURCE.published}.</caption>
            <thead><tr className="border-b border-gray-300 dark:border-gray-600 text-left"><th className="py-2 pr-3">Network</th><th className="py-2 pr-3">Annual bill</th><th className="py-2 pr-3">Usage</th><th className="py-2 pr-3">All-in c/kWh</th><th className="py-2">EV per 100 km (17 kWh)</th></tr></thead>
            <tbody>
              {DMO_2026_27.map((r) => (
                <tr key={r.network} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 pr-3">{r.network} — {r.region}</td>
                  <td className="py-2 pr-3">{aud(r.annualBill)}</td>
                  <td className="py-2 pr-3">{r.usageKwh.toLocaleString("en-AU")} kWh</td>
                  <td className="py-2 pr-3">{dmoCentsPerKwh(r).toFixed(1)}c</td>
                  <td className="py-2">{aud((17 * dmoCentsPerKwh(r)) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Source: <a href={DMO_SOURCE.url} target="_blank" rel="noopener noreferrer">{DMO_SOURCE.name}</a>. Victoria sets its own Victorian Default Offer.</p>

        <h2>Why hydrogen costs more to run</h2>
        <p>A fuel-cell car is an electric car that makes its electricity on board from hydrogen. Producing that hydrogen by electrolysis, compressing it to 700 bar and converting it back to electricity loses much of the original energy, so each kilometre needs considerably more electricity upstream than charging a battery directly. Add a tiny refuelling network with no price competition and the result is a running cost well above petrol. Viva Energy&rsquo;s own FAQ notes that filling a tank costs over twice the price of diesel at its first-of-a-kind site.</p>

        <h2>Where hydrogen is being used in Australia</h2>
        <p>Almost every operating site on CSIRO&rsquo;s list serves heavy vehicles: bus trials in Hobart and previously Adelaide and Melbourne, trucks at Port Kembla and Townsville, coaches at Fortescue&rsquo;s Christmas Creek mine. Viva Energy&rsquo;s Geelong station was built mainly for heavy vehicles and can produce up to 1,000 kg a day. Heavy transport, where long range and fast refuelling matter more, is where Australian hydrogen projects are concentrated.</p>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <WorkedExample {...WORKED_EXAMPLES["hydrogen-vs-gas-calculator"]} />

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

      <CalcDisclaimer domain="road" />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
