import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CalcFuel, our mission, editorial standards, and approach to practical calculator tools.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | CalcFuel",
    description:
      "CalcFuel mission, standards, and how we build practical calculator tools for marketers and operators.",
    url: "https://calcfuel.com/about",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "About Us | CalcFuel",
    description:
      "CalcFuel mission, standards, and how we build practical calculator tools for marketers and operators.",
  },
};

export default function AboutPage() {
  return (
    <LegalPageLayout title="About Us" lastUpdated="8 May 2026">
      <p>
        CalcFuel is built for people who need reliable answers fast. We publish free
        calculators and practical guides for marketing, finance, growth, and business
        decision-making.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to turn everyday business maths into clear, useful decisions.
        We design tools that are quick to use, transparent in logic, and practical in
        real-world workflows.
      </p>

      <h2>How We Build Content</h2>
      <ul>
        <li>we prioritize original, experience-informed content</li>
        <li>we link formulas to practical examples and assumptions</li>
        <li>we keep pages updated as benchmarks and platforms change</li>
      </ul>

      <h2>Editorial Standards</h2>
      <p>
        We focus on clarity, source-aware benchmarking, and actionable frameworks.
        Our goal is to help users make better decisions, not overwhelm them with
        jargon.
      </p>

      <h2>Important Disclaimer</h2>
      <p>
        Calculator results are estimates and should not be treated as financial,
        legal, or professional advice.
      </p>

      <h2>Contact</h2>
      <p>
        Questions or feedback are always welcome at{" "}
        <a href="mailto:getmarketingai@gmail.com">getmarketingai@gmail.com</a>. You
        can also use our <Link href="/contact">Contact Us</Link> page.
      </p>
    </LegalPageLayout>
  );
}
