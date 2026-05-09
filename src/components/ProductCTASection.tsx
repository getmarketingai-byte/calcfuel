import Link from "next/link";

type Product = {
  emoji: string;
  title: string;
  price: string;
  description: string;
  href: string;
  ctaLabel: string;
  highlight?: boolean;
};

const ALL_PRODUCTS: Product[] = [
  {
    emoji: "⚡",
    title: "AI Agent Prompts",
    price: "$5 AUD",
    description: "Ready-made prompts for building and working with AI agents. Copy, paste, launch.",
    href: "https://buy.stripe.com/9B6dRbfrT9W9fTlg0absc0h",
    ctaLabel: "Get prompts →",
  },
  {
    emoji: "📋",
    title: "Marketing Quick-Start Guide",
    price: "$9 AUD",
    description: "A personalised AI marketing action plan for your small business. 15 pages, instant download.",
    href: "https://marketgenius4.gumroad.com/l/cbkzsl",
    ctaLabel: "Download guide →",
  },
  {
    emoji: "📚",
    title: "AI Agent Playbook",
    price: "$15 AUD",
    description: "15-page guide: archetypes, prompts, tool config, model selection, and a 30-day launch plan.",
    href: "https://marketing-ai-psi-nine.vercel.app/playbook/download",
    ctaLabel: "Get the playbook →",
    highlight: true,
  },
  {
    emoji: "🚀",
    title: "AI Marketing Prompt Pack",
    price: "$19 AUD",
    description: "50 AI marketing prompts for Australian SMBs across 7 categories. Copy. Paste. Grow.",
    href: "https://marketgenius4.gumroad.com/l/crtwc?utm_source=calcfuel&utm_medium=cta-section",
    ctaLabel: "Get the pack →",
  },
  {
    emoji: "🔍",
    title: "Marketing Audit",
    price: "$49 AUD",
    description: "A full AI-powered marketing audit with 3 custom growth systems delivered to your inbox.",
    href: "https://buy.stripe.com/aFa6oJgvX7O10YrdS2bsc02",
    ctaLabel: "Book audit →",
  },
];

const AI_DEV_PRODUCTS = ALL_PRODUCTS.filter(p =>
  p.title.includes("AI Agent Prompts") || p.title.includes("AI Agent Playbook")
);

const EMAIL_SOCIAL_SEO_PRODUCTS = ALL_PRODUCTS.filter(p =>
  p.title.includes("Quick-Start") || p.title.includes("Prompt Pack")
);

interface Props {
  variant?: "showcase" | "ai_dev" | "email_social_seo";
}

export default function ProductCTASection({ variant = "showcase" }: Props) {
  const products =
    variant === "ai_dev"
      ? AI_DEV_PRODUCTS
      : variant === "email_social_seo"
      ? EMAIL_SOCIAL_SEO_PRODUCTS
      : ALL_PRODUCTS;

  const headingMap = {
    showcase: { title: "Tools for Marketers Who Want Results", subtitle: "From free calculators to AI-powered guides — everything you need to measure, plan, and grow." },
    ai_dev: { title: "Take Your AI Skills Further", subtitle: "Prompts and playbooks for developers building with AI agents." },
    email_social_seo: { title: "Level Up Your Marketing", subtitle: "Practical guides and prompt packs for email, social, and SEO marketers." },
  };

  const { title, subtitle } = headingMap[variant];

  return (
    <section className="my-12 rounded-2xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{subtitle}</p>
      </div>
      <div className={`grid gap-4 ${products.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col gap-2 p-4 rounded-xl border transition-all hover:shadow-md ${
              p.highlight
                ? "border-orange-400 bg-white dark:bg-gray-900 shadow-sm"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-orange-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{p.price}</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{p.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex-1">{p.description}</p>
            <span className="mt-1 text-xs font-semibold text-orange-500 hover:text-orange-600">{p.ctaLabel}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
