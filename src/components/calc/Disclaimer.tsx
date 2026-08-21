interface DisclaimerProps {
  variant?: "planning" | "marine" | "financial" | "towing" | "electric" | "stationary" | "commute";
  children?: React.ReactNode;
}

const DEFAULTS: Record<NonNullable<DisclaimerProps["variant"]>, string> = {
  planning:
    "Planning estimate. Real consumption moves with traffic, terrain, load and how hard the car is driven — measure your own L/100km across a few full-tank fills for a figure you can rely on.",
  towing:
    "Planning estimate. The towing penalty is dominated by the trailer's frontal area and your road speed, not its mass, so treat the percentage as a starting point and refine it from a logged loaded trip.",
  electric:
    "Planning estimate. Your tariff, your charging mix between home and public DC, and roughly 10-15% of energy lost between the wall and the battery all change the real cost per kilometre.",
  stationary:
    "Planning estimate. Generator consumption tracks the load actually applied rather than the nameplate rating; check the manufacturer's table at your expected load before sizing a fuel supply.",
  commute:
    "Planning estimate. Short trips from cold run well above the rated consumption for the first few kilometres, so a stop-start commute usually costs more per kilometre than a highway run.",
  marine:
    "Marine range figures are estimated planning ranges only. Always apply the one-third fuel rule and verify with manufacturer data and local conditions.",
  financial:
    "Figures are illustrative. They are not financial, tax, or legal advice. Confirm costs with your own records and professional advice where needed.",
};

export default function Disclaimer({ variant = "planning", children }: DisclaimerProps) {
  return (
    <p data-boilerplate className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
      {children ?? DEFAULTS[variant]}
    </p>
  );
}
