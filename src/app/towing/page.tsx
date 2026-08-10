import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Towing & Caravans — Extra Fuel Cost",
  "Calculate the fuel penalty and extra cost of towing a trailer, boat or caravan.",
  "/towing"
);

export default function TowingHub() {
  return (
    <HubPage
      title="Towing & Caravans"
      description="See how much extra fuel towing really costs before you hitch up."
      tools={[
        {
          href: "/calculators/towing-fuel-cost-calculator",
          label: "Towing Fuel Cost",
          blurb: "Compare unloaded vs towing fuel use and cost for any trip.",
        },
        {
          href: "/calculators/trip-fuel-cost-calculator",
          label: "Trip Fuel Cost",
          blurb: "Base road-trip fuel before applying a towing penalty.",
        },
      ]}
    />
  );
}
