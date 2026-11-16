import Link from "next/link";

const PAGES = [
  {
    href: "/calculators/fuel-economy-savings-calculator",
    label: "Upgrade payback",
    q: "Will a more fuel-efficient car pay for itself?",
  },
  {
    href: "/fuel-efficiency-comparison",
    label: "Two-car cost comparison",
    q: "Which of two cars costs less to fuel each year?",
  },
  {
    href: "/blog/understanding-fuel-economy-mpg-vs-l100km",
    label: "MPG ↔ L/100km converter",
    q: "What is this MPG or km/L figure in L/100km?",
  },
] as const;

/** Signposts the three fuel-economy pages so each keeps one job. Shared copy, so boilerplate. */
export default function EconomyPagesNav({ current }: { current: (typeof PAGES)[number]["href"] }) {
  return (
    <nav aria-label="Fuel economy tools" data-boilerplate className="not-prose my-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Fuel economy: pick the question you have</p>
      <ul className="grid gap-2 sm:grid-cols-3 text-sm">
        {PAGES.map((p) => (
          <li key={p.href}>
            {p.href === current ? (
              <span className="block rounded-lg bg-orange-50 dark:bg-orange-950 p-3" aria-current="page">
                <span className="font-semibold text-gray-900 dark:text-white">{p.label}</span>
                <span className="block text-gray-700 dark:text-gray-300">{p.q} (this page)</span>
              </span>
            ) : (
              <Link href={p.href} className="block rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:border-orange-500">
                <span className="font-semibold text-gray-900 dark:text-white">{p.label}</span>
                <span className="block text-gray-700 dark:text-gray-300">{p.q}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
