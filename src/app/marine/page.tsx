import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Marine — Boat Trip Fuel & Range",
  "Plan marine fuel burn, trip cost, travel time and safe range for recreational boats.",
  "/marine"
);

export default function MarineHub() {
  return (
    <HubPage
      title="Marine"
      description="Boat trip fuel planning for real passages — burn rate, cost, time, reserve and speed scenarios."
      tools={[
        {
          href: "/calculators/boat-fuel-calculator",
          label: "Boat Trip Fuel Planner",
          blurb: "Fuel required, cost, safe range and one-third rule guidance.",
        },
      ]}
    />
  );
}
