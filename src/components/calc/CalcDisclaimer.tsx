import Link from "next/link";
import { SOURCE_REPORT } from "@/lib/fuel-prices";

/**
 * Per-domain limitations notice.
 *
 * Replaces the single copy-pasted paragraph that previously ran on 15 pages and told
 * boat and generator users that their results depended on "driving conditions, vehicle
 * type". Each variant names the variables that actually dominate that calculation.
 */
export type CalcDomain =
  | "marine"
  | "road"
  | "towing"
  | "stationary"
  | "electric"
  | "tax"
  | "logistics";

const BODY: Record<CalcDomain, string> = {
  marine:
    "Marine fuel figures are planning estimates. Burn rate on the water is dominated by throttle position, hull loading, sea state and current, and a headwind or an adverse tide can add 20–40% to the fuel a passage needs. Verify against your engine manufacturer's fuel consumption curves and your own logged trips, and always keep reserve fuel — the one-third rule assumes you never plan to arrive on empty.",
  road:
    "Road fuel figures are planning estimates. Real consumption varies with traffic, terrain, load, tyre pressure, air-conditioning use and how hard the car is driven; manufacturer WLTP economy figures are typically 10–20% optimistic against real-world use. Use your own measured litres-per-100km from a few full-tank fills where you can.",
  towing:
    "Towing figures are planning estimates. The fuel penalty a trailer adds depends far more on its frontal area and how it sits in the tow vehicle's slipstream than on its mass alone, and it rises steeply with speed. Treat the percentage penalty as a starting point and refine it from your own logged fills on a loaded trip.",
  stationary:
    "Generator fuel figures are planning estimates. Consumption depends on the load actually applied rather than the nameplate rating — a generator run at a quarter load burns far more per kilowatt-hour than one run near its rated output. Check the manufacturer's consumption table at your expected load before sizing a fuel supply for an outage.",
  electric:
    "Charging cost figures are planning estimates. What you actually pay depends on your electricity tariff and time of use at home, on the operator's per-kWh rate and any session fee in public, and on charging losses of roughly 10–15% that meter at the wall but never reach the battery. Cold weather and high state-of-charge both slow charging and change the effective cost.",
  tax: "This is a general estimate, not tax advice. Rates, eligibility and record-keeping requirements change, and entitlement depends on your specific vehicle, fuel type and the activity the fuel was used in. Confirm your position against current ATO guidance or with a registered tax agent before you lodge anything based on a figure from this page.",
  logistics:
    "Surcharge figures are planning estimates. Commercial surcharge schedules differ by carrier, contract and review period, and most use a lagged reference price rather than the current pump price. Use this to sanity-check an invoice or model a schedule, not as a substitute for the terms in your own contract.",
};

export default function CalcDisclaimer({
  domain,
  children,
}: {
  domain: CalcDomain;
  children?: React.ReactNode;
}) {
  return (
    <aside data-boilerplate className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8 text-sm text-amber-900 dark:text-amber-100">
      <strong>Limitations:</strong> {children ?? BODY[domain]}{" "}
      {domain !== "tax" ? (
        <>
          Default fuel prices come from our{" "}
          <Link href="/data/australian-fuel-prices" className="underline">
            Australian fuel price data
          </Link>{" "}
          page ({SOURCE_REPORT.pricesToLabel}) — replace them with your local price for a result
          you can act on.
        </>
      ) : null}
    </aside>
  );
}
