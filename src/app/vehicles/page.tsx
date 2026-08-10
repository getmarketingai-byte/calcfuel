import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Vehicles — Running Cost & Economy",
  "Motorcycle fuel, hybrid and EV running cost, economy improvements and fuel budgets.",
  "/vehicles"
);

export default function VehiclesHub() {
  return (
    <HubPage
      title="Vehicles"
      description="Running-cost decisions for cars, hybrids, EVs and motorcycles."
      tools={[
        {
          href: "/calculators/motorcycle-fuel-cost-calculator",
          label: "Motorcycle Fuel Cost",
          blurb: "Trip or commute fuel with bike-class presets.",
        },
        {
          href: "/calculators/hybrid-vs-gas-calculator",
          label: "Hybrid vs Petrol",
          blurb: "Break-even on purchase premium vs fuel savings.",
        },
        {
          href: "/calculators/ev-vs-gas-calculator",
          label: "EV vs Petrol",
          blurb: "5- and 10-year total cost with energy, maintenance and insurance.",
        },
        {
          href: "/calculators/fuel-economy-savings-calculator",
          label: "Fuel Economy & Consumption",
          blurb: "MPG ↔ L/100km and annual savings from improvements.",
        },
        {
          href: "/calculators/fuel-budget-planner",
          label: "Fuel Budget Planner",
          blurb: "Household weekly, monthly and annual fuel spend.",
        },
        {
          href: "/calculators/idling-fuel-waste-calculator",
          label: "Idling Fuel Waste",
          blurb: "What idle time costs in fuel.",
        },
      ]}
    />
  );
}
