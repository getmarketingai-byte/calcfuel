"use client";

import Link from "next/link";
import { trackHubToolClick } from "@/lib/analytics";

export type HubTool = {
  title: string;
  slug: string;
  description: string;
  path?: string;
  href?: string;
};

type Props = {
  hub: string;
  tools: HubTool[];
  cardClassName?: string;
};

export default function HubToolGrid({ hub, tools, cardClassName }: Props) {
  const defaultCard =
    "block p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 hover:shadow-lg hover:border-orange-400 transition-all group";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
      {tools.map((tool) => {
        const href = tool.href ?? tool.path ?? `/calculators/${tool.slug}`;
        return (
          <Link
            key={tool.slug}
            href={href}
            onClick={() => trackHubToolClick(hub, tool.slug, href)}
            className={cardClassName ?? defaultCard}
          >
            <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{tool.description}</p>
            <span className="mt-3 inline-block text-xs font-medium text-orange-500">Calculate now →</span>
          </Link>
        );
      })}
    </div>
  );
}
