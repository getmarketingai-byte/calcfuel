import Link from "next/link";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated}
        </p>
      </header>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        {children}
      </article>

      <section className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Legal & Trust Pages
        </h2>
        <ul className="flex flex-wrap gap-4 text-sm">
          {legalLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-orange-500 hover:text-orange-600">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
