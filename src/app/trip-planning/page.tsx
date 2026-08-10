import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Trip Planning — Fuel Cost & Drive vs Fly",
  "Plan road-trip fuel, commute costs and drive-versus-fly decisions.",
  "/trip-planning"
);

export default function TripPlanningHub() {
  return (
    <HubPage
      title="Trip Planning"
      description="Decide what a trip will cost before you leave — fuel modes, budgets and drive vs fly."
      tools={[
        {
          href: "/calculators/trip-fuel-cost-calculator",
          label: "Trip Fuel Cost",
          blurb: "Road trip, return, commute or carpool modes.",
        },
        {
          href: "/calculators/drive-vs-fly-calculator",
          label: "Drive vs Fly",
          blurb: "Total cost comparison including time, tolls and tickets.",
        },
        {
          href: "/calculators/fuel-budget-planner",
          label: "Fuel Budget Planner",
          blurb: "Plan recurring fuel spend across vehicles.",
        },
        {
          href: "/calculators/commute-fuel-cost-calculator",
          label: "Commute Fuel Cost",
          blurb: "Daily and annual commute fuel (merging into Trip modes).",
        },
        {
          href: "/calculators/carpool-fuel-split-calculator",
          label: "Carpool Fuel Split",
          blurb: "Split trip fuel fairly (merging into Trip modes).",
        },
      ]}
    />
  );
}
