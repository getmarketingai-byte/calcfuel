import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="CalcFuel" height={40} width={133} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/calculators/email-marketing" className="hover:text-orange-500 transition-colors">Email Marketing</Link>
          <Link href="/calculators/financial" className="hover:text-orange-500 transition-colors">Financial</Link>
          <Link href="/calculators/social-media" className="hover:text-orange-500 transition-colors">Social Media</Link>
          <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
        </nav>
        <nav className="md:hidden flex items-center gap-3 text-sm">
          <Link href="/calculators/email-marketing" className="hover:text-orange-500">Email</Link>
          <Link href="/calculators/financial" className="hover:text-orange-500">Finance</Link>
          <Link href="/blog" className="hover:text-orange-500">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
