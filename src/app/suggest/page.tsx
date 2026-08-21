import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Link from "next/link";
import SuggestCalculatorBoard from "@/components/SuggestCalculatorBoard";

export const metadata: Metadata = createPageMetadata({
  title: "Suggest a Calculator",
  description:
    "Tell us which fuel or trip-cost calculation you need and cannot find. Suggestions are public, votable, and reviewed against our editorial standards.",
  path: "/suggest",
});

export default function SuggestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Suggest a calculator", path: "/suggest" },
        ]}
      />
      <nav className="text-sm text-gray-700 dark:text-gray-300 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-orange-700 dark:hover:text-orange-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span>Suggest</span>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Suggest a Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Browse community ideas, upvote the ones you need, or submit your own. We use this board
          to decide what to build next.
        </p>
      </header>

      <SuggestCalculatorBoard />
    </div>
  );
}
