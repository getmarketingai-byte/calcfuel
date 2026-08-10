import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How CalcFuel calculates fuel use, cost, range, duration and vehicle running-cost comparisons.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <LegalPageLayout title="Methodology" lastUpdated="10 August 2026">
      <p>
        CalcFuel calculation logic lives in a shared domain layer so tools stay consistent. This page
        summarises the main methods. Individual calculators also include an on-page methodology note.
      </p>

      <h2>Fuel used</h2>
      <ul>
        <li>
          <strong>Imperial:</strong> gallons = distance (miles) ÷ MPG.
        </li>
        <li>
          <strong>Metric:</strong> litres = (L/100km ÷ 100) × distance (km).
        </li>
      </ul>
      <p>Fuel cost = fuel volume × price per unit.</p>

      <h2>MPG ↔ L/100km</h2>
      <p>
        We use the standard conversion factor ≈ 235.215 (based on US gallons and kilometres). km/L =
        100 ÷ L/100km.
      </p>

      <h2>Marine trips</h2>
      <p>
        Primary path: burn rate × travel time (distance ÷ speed). Safe range uses usable tank capacity
        after a reserve fraction (default 15%). HP-derived burn is an optional rule of thumb only.
      </p>

      <h2>Towing</h2>
      <p>
        A percentage penalty worsens efficiency (higher L/100km or lower MPG). Extra cost is towing
        fuel cost minus unloaded fuel cost for the same distance.
      </p>

      <h2>Vehicle running cost</h2>
      <p>
        Hybrid comparisons use annual fuel savings plus optional maintenance advantage versus purchase
        premium. EV comparisons add electricity (mi/kWh or kWh/100km), maintenance and insurance over a
        chosen horizon.
      </p>

      <h2>Limitations</h2>
      <p>
        Real-world fuel use varies with load, weather, traffic, driving style and vehicle condition.
        Figures are for planning. See also our{" "}
        <Link href="/editorial-policy">editorial policy</Link>.
      </p>
    </LegalPageLayout>
  );
}
