import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import { publishedArticles } from "@/content/blog-articles";

export const metadata: Metadata = createPageMetadata({
  title: "Marketing Blog — Guides, Formulas & Benchmarks",
  description:
    "Free marketing guides covering email open rates, ROI formulas, ROAS benchmarks, and more. Learn how to measure and improve your marketing performance.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const featuredArticle = publishedArticles[0];
  const regularArticles = publishedArticles.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Blog</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Marketing Blog
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Practical guides on measuring marketing performance — formulas,
        benchmarks, and free calculators.
      </p>

      <AdSenseUnit
        slot="6564431580"
        format="auto"
        style={{ minHeight: 90 }}
        className="mb-8"
      />

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Featured article
        </h2>
        <article className="border border-orange-200 dark:border-orange-800 rounded-2xl p-6 bg-orange-50 dark:bg-orange-950">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
            {featuredArticle.category}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <Link href={`/blog/${featuredArticle.slug}`} className="hover:text-orange-500">
              {featuredArticle.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
            {featuredArticle.description}
          </p>
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Read featured guide →
          </Link>
        </article>
      </section>

      <div className="grid gap-6">
        {regularArticles.map((article) => (
          <article
            key={article.slug}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{article.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              <Link
                href={`/blog/${article.slug}`}
                className="hover:text-orange-500 transition-colors"
              >
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {article.description}
            </p>
            <div className="flex items-center justify-between">
              <time
                dateTime={article.date}
                className="text-xs text-gray-400"
              >
                {new Date(article.date).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <Link
                href={`/blog/${article.slug}`}
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdSenseUnit
        slot="3651327789"
        format="auto"
        style={{ minHeight: 250 }}
        className="my-8"
      />

    </div>
  );
}
