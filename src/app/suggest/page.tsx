import type { Metadata } from "next";
import Link from "next/link";
import SuggestCalculatorBoard from "@/components/SuggestCalculatorBoard";

export const metadata: Metadata = {
  title: "Suggest a Calculator",
  description:
    "Suggest a free calculator for CalcFuel and upvote ideas from the community. We build the tools people ask for most.",
  alternates: {
    canonical: "/suggest",
  },
  openGraph: {
    title: "Suggest a Calculator | CalcFuel",
    description:
      "Request a new calculator or upvote community suggestions. Help shape what CalcFuel builds next.",
    url: "https://calcfuel.com/suggest",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Suggest a Calculator | CalcFuel",
    description:
      "Request a new calculator or upvote community suggestions on CalcFuel.",
  },
};

export default function SuggestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-orange-500">
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
