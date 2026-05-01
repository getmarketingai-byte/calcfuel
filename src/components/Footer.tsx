import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-xl text-orange-500">⛽</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">CalcFuel</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">Free calculators for data-driven decisions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Email Marketing</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/calculators/email-open-rate-calculator" className="hover:text-orange-500">Email Open Rate</Link></li>
              <li><Link href="/calculators/email-marketing" className="hover:text-orange-500">All Email Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Financial</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/calculators/marketing-roi-calculator" className="hover:text-orange-500">Marketing ROI</Link></li>
              <li><Link href="/calculators/roas-calculator" className="hover:text-orange-500">ROAS</Link></li>
              <li><Link href="/calculators/ad-spend-calculator" className="hover:text-orange-500">Ad Spend</Link></li>
              <li><Link href="/calculators/financial" className="hover:text-orange-500">All Financial Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Social Media</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/calculators/social-media-roi-calculator" className="hover:text-orange-500">Social Media ROI</Link></li>
              <li><Link href="/calculators/social-media" className="hover:text-orange-500">All Social Tools</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} CalcFuel. All rights reserved.</p>
          <p className="text-sm text-gray-400">Powered by <a href="https://marketing-ai-psi-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">MarketingAI</a></p>
        </div>
      </div>
    </footer>
  );
}
