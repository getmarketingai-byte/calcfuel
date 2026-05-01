import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-orange-500">⛽</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">CalcFuel</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/calculators/email-marketing" className="hover:text-orange-500 transition-colors">Email Marketing</Link>
          <Link href="/calculators/financial" className="hover:text-orange-500 transition-colors">Financial</Link>
          <Link href="/calculators/social-media" className="hover:text-orange-500 transition-colors">Social Media</Link>
          <a href="https://marketing-ai-psi-nine.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Get AI Marketing Help
          </a>
        </nav>
        <nav className="md:hidden flex items-center gap-3 text-sm">
          <Link href="/calculators/email-marketing" className="hover:text-orange-500">Email</Link>
          <Link href="/calculators/financial" className="hover:text-orange-500">Finance</Link>
          <Link href="/calculators/social-media" className="hover:text-orange-500">Social</Link>
        </nav>
      </div>
    </header>
  );
}
