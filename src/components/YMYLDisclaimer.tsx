export default function YMYLDisclaimer({ type = "financial" }: { type?: "financial" | "tax" | "health" | "legal" }) {
  const labels: Record<string, string> = {
    financial: "financial",
    tax: "tax or financial",
    health: "health or medical",
    legal: "legal or financial",
  };
  const label = labels[type] ?? "financial";

  return (
    <aside className="mt-8 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
      <strong>Disclaimer:</strong> This calculator provides estimates only and should not be
      treated as {label} advice. Results may vary based on your individual circumstances.
      Consult a qualified {label === "financial" ? "financial adviser or accountant" : label + " professional"} for
      advice specific to your situation.
    </aside>
  );
}
