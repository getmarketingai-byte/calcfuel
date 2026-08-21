import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">404</p>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        That URL isn&apos;t available. CalcFuel focuses on transport and trip-cost decisions.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-orange-700 hover:bg-orange-800 text-white font-semibold px-5 py-2.5 text-sm"
        >
          Home
        </Link>
        <Link
          href="/calculators"
          className="rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white"
        >
          Calculators
        </Link>
      </div>
    </div>
  );
}
