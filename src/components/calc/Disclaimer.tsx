interface DisclaimerProps {
  variant?: "planning" | "marine" | "financial";
  children?: React.ReactNode;
}

const DEFAULTS: Record<NonNullable<DisclaimerProps["variant"]>, string> = {
  planning:
    "Estimates are for planning only. Actual fuel use varies with load, weather, driving style, and vehicle condition.",
  marine:
    "Marine range figures are estimated planning ranges only. Always apply the one-third fuel rule and verify with manufacturer data and local conditions.",
  financial:
    "Figures are illustrative. They are not financial, tax, or legal advice. Confirm costs with your own records and professional advice where needed.",
};

export default function Disclaimer({ variant = "planning", children }: DisclaimerProps) {
  return (
    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
      {children ?? DEFAULTS[variant]}
    </p>
  );
}
