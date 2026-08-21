"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV = [
  { href: "/calculators", label: "Calculate" },
  { href: "/marine", label: "Marine" },
  { href: "/towing", label: "Towing & Caravans" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/trip-planning", label: "Trip Planning" },
  { href: "/blog", label: "Guides" },
  { href: "/data/australian-fuel-prices", label: "Fuel Prices" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt="CalcFuel" height={40} width={133} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700 dark:text-gray-200">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-orange-700 dark:hover:text-orange-400 transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden text-sm font-medium text-gray-700 dark:text-gray-200 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-orange-700 dark:hover:text-orange-400"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/about" className="hover:text-orange-700 dark:hover:text-orange-400" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="hover:text-orange-700 dark:hover:text-orange-400" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
