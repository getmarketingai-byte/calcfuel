import Link from "next/link";
import AuthorBio from "@/components/AuthorBio";

type RelatedLink = {
  href: string;
  label: string;
};

type BlogArticleLayoutProps = {
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  slug: string;
  description: string;
  authorName: string;
  authorRole: string;
  authorBio: string;
  relatedLinks: RelatedLink[];
  children: React.ReactNode;
};

export default function BlogArticleLayout({
  title,
  category,
  readTime,
  publishedDate,
  slug,
  description,
  authorName,
  authorRole,
  authorBio,
  relatedLinks,
  children,
}: BlogArticleLayoutProps) {
  const articleUrl = `https://calcfuel.com/blog/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "CalcFuel",
      url: "https://calcfuel.com",
      logo: {
        "@type": "ImageObject",
        url: "https://calcfuel.com/logo.svg",
      },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://calcfuel.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://calcfuel.com/blog" },
      { "@type": "ListItem", position: 3, name: title, item: articleUrl },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-orange-500">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
          {category}
        </span>
        <span className="text-xs text-gray-400">
          · {readTime} ·{" "}
          {new Date(publishedDate).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{description}</p>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        {children}
      </div>

      <AuthorBio name={authorName} role={authorRole} bio={authorBio} />

      <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Related articles
        </h2>
        <ul className="space-y-2 text-sm">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-orange-500 hover:text-orange-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link href="/blog" className="text-sm text-orange-500 hover:text-orange-600">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
