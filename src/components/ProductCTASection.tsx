"use client";
import { trackProductCTAClick } from "@/lib/analytics";
import Link from "next/link";

type Product = {
  emoji: string;
  title: string;
  price: string;
  description: string;
  href: string;
  ctaLabel: string;
  highlight?: boolean;
  badge?: string;
};

const ALL_PRODUCTS: Product[] = [
  {
    emoji: "⚡",
    title: "10 AI Agent Prompts",
    price: "$5 AUD",
    description: "10 ready-made prompts for building and working with AI agents. Copy, paste, launch.",
    href: "https://buy.stripe.com/9B6dRbfrT9W9fTlg0absc0h",
    ctaLabel: "Get prompts →",
    badge: "Best value",
  },
  {
    emoji: "📚",
    title: "AI Agent Playbook",
    price: "$15 AUD",
    description: "15-page guide: archetypes, prompts, tool config, model selection, and a 30-day launch plan.",
    href: "https://buy.stripe.com/5kQeVfcfH0lzgXp01cbsc0f",
    ctaLabel: "Get the playbook →",
    highlight: true,
    badge: "Most popular",
  },
  {
    emoji: "🚀",
    title: "50 Marketing Prompts",
    price: "$19 AUD",
    description: "50 AI marketing prompts across 7 categories — email, social, SEO, ads, content, and more.",
    href: "https://buy.stripe.com/00wcN77Zr2tH36z15gbsc0c",
    ctaLabel: "Get the pack →",
  },
  {
    emoji: "🎯",
    title: "Everything Bundle",
    price: "$39 AUD",
    description: "All three products in one: AI Agent Prompts, AI Agent Playbook, and 50 Marketing Prompts.",
    href: "https://buy.stripe.com/9B6aEZ93v1pDdLddS2bsc0j",
    ctaLabel: "Get everything →",
    badge: "Save $0",
  },
];

const AI_DEV_PRODUCTS = ALL_PRODUCTS.filter(
  (p) => p.title.includes("AI Agent Prompts") || p.title.includes("AI Agent Playbook")
);

const MARKETING_PRODUCTS = ALL_PRODUCTS.filter(
  (p) => p.title.includes("50 Marketing") || p.title.includes("Everything Bundle")
);

interface Props {
  variant?: "showcase" | "ai_dev" | "email_social_seo";
}

export default function ProductCTASection({ variant = "showcase" }: Props) {
  const products =
    variant === "ai_dev"
      ? AI_DEV_PRODUCTS
      : variant === "email_social_seo"
      ? MARKETING_PRODUCTS
      : ALL_PRODUCTS;

  const headingMap = {
    showcase: {
      title: "AI Marketing Tools — From $5",
      subtitle:
        "Prompts, playbooks, and bundles for marketers and builders. Instant digital download.",
    },
    ai_dev: {
      title: "Take Your AI Skills Further",
      subtitle: "Prompts and playbooks for developers building with AI agents.",
    },
    email_social_seo: {
      title: "Level Up Your Marketing",
      subtitle: "Prompt packs for email, social, SEO, ads, and more.",
    },
  };

  const { title, subtitle } = headingMap[variant];

  return (
    <section className="my-12 rounded-2xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{subtitle}</p>
      </div>
      <div
        className={`grid gap-4 ${
          products.length === 2
            ? "sm:grid-cols-2"
            : products.length === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProductCTAClick(p.title, p.price)}
            className={`relative flex flex-col gap-2 p-4 rounded-xl border transition-all hover:shadow-md ${
              p.highlight
                ? "border-orange-400 bg-white dark:bg-gray-900 shadow-sm"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-orange-300"
            }`}
          >
            {p.badge && (
              <span className="absolute -top-2 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {p.badge}
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{p.price}</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
              {p.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex-1">{p.description}</p>
            <span className="mt-1 text-xs font-semibold text-orange-500 hover:text-orange-600">
              {p.ctaLabel}
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">
        Secure checkout via Stripe · Instant digital download
      </p>
    </section>
  );
}
