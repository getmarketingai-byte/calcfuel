import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export function hubMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  };
}

export default function HubPage({
  title,
  description,
  tools,
}: {
  title: string;
  description: string;
  tools: { href: string; label: string; blurb: string }[];
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">{description}</p>
      <ul className="space-y-4">
        {tools.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-orange-400 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.label}</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HubShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
