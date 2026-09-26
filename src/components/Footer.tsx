import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-3">
              <Image src="/logo.svg" alt="CalcFuel" height={28} width={93} />
            </Link>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Transport and trip-cost decisions — fuel, range, time and operating costs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Marine</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/calculators/boat-fuel-calculator" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Boat Trip Fuel Planner
                </Link>
              </li>
              <li>
                <Link href="/marine" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Marine hub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Towing &amp; trips</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/calculators/towing-fuel-cost-calculator" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Towing Fuel Cost
                </Link>
              </li>
              <li>
                <Link href="/calculators/trip-fuel-cost-calculator" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Trip Fuel Cost
                </Link>
              </li>
              <li>
                <Link href="/calculators/drive-vs-fly-calculator" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Drive vs Fly
                </Link>
              </li>
              <li>
                <Link href="/trip-planning" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Trip Planning
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Vehicles</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/calculators/motorcycle-fuel-cost-calculator" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Motorcycle Fuel
                </Link>
              </li>
              <li>
                <Link href="/calculators/hybrid-vs-gas-calculator" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Hybrid vs Petrol
                </Link>
              </li>
              <li>
                <Link href="/calculators/fuel-budget-planner" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Fuel Budget
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Vehicles hub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <Link href="/calculators" className="hover:text-orange-700 dark:hover:text-orange-400">
                  All calculators
                </Link>
              </li>
              <li>
                <Link href="/fuel-efficiency-comparison" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Fuel efficiency comparison
                </Link>
              </li>
              <li>
                <Link href="/when-to-buy-petrol" className="hover:text-orange-700 dark:hover:text-orange-400">
                  When to buy petrol
                </Link>
              </li>
              <li>
                <Link href="/data/australian-fuel-prices" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Fuel price data
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-700 dark:hover:text-orange-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Editorial policy
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Corrections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-orange-700 dark:hover:text-orange-400">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} CalcFuel. All rights reserved.</p>
          <p className="text-xs text-gray-700 dark:text-gray-300 text-center md:text-right max-w-md">
            Some pages may include advertising. Affiliate or sponsor links, when present, are labelled.
          </p>
        </div>
      </div>
    </footer>
  );
}
