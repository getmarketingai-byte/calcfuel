import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalcReviewedBy from "@/components/CalcReviewedBy";

export function hubMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  };
}

export interface HubTool {
  href: string;
  label: string;
  /** What decision this tool answers — not a restatement of its name. */
  blurb: string;
}

/**
 * Category page shell.
 *
 * `children` is required: a hub that is only a heading and a list of links is an
 * intermediate page less useful than its destination, which is what Google's doorway
 * policy describes. Enforced by AC4 in `npm run audit:adsense`.
 */
export default function HubPage({
  title,
  description,
  tools,
  lastUpdated,
  children,
}: {
  title: string;
  description: string;
  tools: HubTool[];
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      <CalcReviewedBy lastUpdated={lastUpdated} />

      <section aria-labelledby="hub-tools" className="mb-10">
        <h2 id="hub-tools" className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Tools in this section
        </h2>
        <ul className="space-y-4">
          {tools.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="block rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-orange-500 transition-colors"
              >
                <span className="block text-lg font-semibold text-gray-900 dark:text-white">
                  {t.label}
                </span>
                <span className="mt-1 block text-sm text-gray-700 dark:text-gray-300">
                  {t.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-orange-700 dark:prose-a:text-orange-400">
        {children}
      </div>
    </div>
  );
}

export function HubShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
