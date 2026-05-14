import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Income Tax Calculator Australia 2025–26 | CalcFuel",
  description:
    "Free Australian income tax calculator for 2025–26. Calculate your income tax, Medicare levy, LITO, and take-home pay. Based on ATO rates.",
};

// Redirect to the full Australian income tax calculator
export default function IncomeTaxCalculatorPage() {
  redirect("/calculators/australian-income-tax-calculator");
}
