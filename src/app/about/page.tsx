import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "About CalcFuel — Free Australian Calculators & Marketing Tools",
  description:
    "CalcFuel is a free calculator platform for Australian small business owners, marketers, and investors. Learn about our editorial standards, how we verify our calculators, and who we build for.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About CalcFuel — Free Australian Calculators & Marketing Tools",
    description:
      "CalcFuel mission, editorial standards, calculator verification methodology, and how we build practical tools for Australian businesses.",
    url: "https://calcfuel.com/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <LegalPageLayout title="About CalcFuel" lastUpdated="12 May 2026">
      <p>
        CalcFuel is a free collection of calculators and practical guides built for Australian
        small business owners, marketers, investors, and anyone who needs reliable numbers fast —
        without a spreadsheet, an accountant on speed dial, or a paywalled tool.
      </p>
      <p>
        We publish tools across Australian tax and finance (income tax, HECS-HELP, capital gains,
        GST, superannuation), marketing analytics (ROI, ROAS, CAC, CLV), fuel and energy, and more.
        Every tool runs entirely in your browser. Nothing is stored. No sign-up required.
      </p>

      <h2>Our Mission</h2>
      <p>
        Most business decisions start with a number: &ldquo;What will this cost me in tax?&rdquo; &ldquo;Am I better off
        leasing or buying?&rdquo; &ldquo;What ROAS do I need to break even on this campaign?&rdquo; When those
        numbers are hard to get — buried in spreadsheets, behind a consultant&apos;s hourly rate, or
        scattered across confusing ATO documentation — people either guess or don&apos;t decide at all.
      </p>
      <p>
        CalcFuel&apos;s mission is to make those numbers accessible in under 60 seconds, every time.
        We turn everyday business maths into clear, decision-ready answers with no sign-up, no
        paywall, and no sales pitch.
      </p>

      <h2>Who We Build For</h2>
      <p>
        Our typical users are Australian business owners and professionals who need quick,
        reliable estimates to inform a decision — not a substitute for professional advice.
        That includes:
      </p>
      <ul>
        <li>Small business owners preparing for EOFY and wanting to model their tax position</li>
        <li>Employees considering salary sacrifice or novated lease arrangements</li>
        <li>Property investors running negative gearing and CGT scenarios</li>
        <li>Marketing teams calculating ROI, ROAS, and CAC across campaigns</li>
        <li>Graduates tracking their HECS-HELP repayment and indexation impact</li>
        <li>Tradespeople, freelancers, and service businesses estimating GST and BAS obligations</li>
      </ul>

      <h2>How We Build and Verify Our Calculators</h2>
      <p>
        Every CalcFuel calculator follows a consistent development and verification process
        before it goes live:
      </p>
      <ol>
        <li>
          <strong>Primary source research:</strong> We start from the authoritative source for
          each calculation type. For Australian tax tools, this means the ATO&apos;s published tax
          tables, threshold schedules, and legislative instruments. For marketing calculators, we
          reference established industry frameworks and benchmark reports.
        </li>
        <li>
          <strong>Formula implementation:</strong> Calculations are coded in TypeScript with
          explicit formulas — no black boxes. Key variables (tax brackets, levy thresholds,
          statutory rates) are defined as named constants so they can be audited and updated when
          legislation changes.
        </li>
        <li>
          <strong>Spot-check verification:</strong> Before publishing, each calculator is
          cross-checked against known correct answers from the ATO&apos;s own tools (where available),
          published ATO examples, or worked examples from accountants&apos; and financial advisers&apos;
          guides. We test edge cases: zero income, high income, threshold boundaries, and
          combinations that surface rounding errors.
        </li>
        <li>
          <strong>Annual rate updates:</strong> Australian tax rates, HECS-HELP brackets,
          superannuation guarantee rates, and stamp duty schedules change each financial year.
          We update calculators each July (or earlier when rates are announced by the government)
          to reflect the current financial year&apos;s parameters.
        </li>
      </ol>
      <p>
        Despite this process, calculator outputs are estimates based on the parameters you provide.
        They do not account for all individual circumstances, and they are not a substitute for
        advice from a registered tax agent, financial planner, or other qualified professional.
        See our disclaimer below.
      </p>

      <h2>Editorial Standards</h2>
      <p>
        Our content — both calculator landing pages and blog articles — is written to explain
        the underlying maths, not just produce a number. We follow these standards on every page:
      </p>
      <ul>
        <li>
          <strong>Show the formula.</strong> Every calculator displays the formula it uses, so
          users can verify the logic and understand what they&apos;re calculating.
        </li>
        <li>
          <strong>Cite the source.</strong> When we reference a rate, threshold, or benchmark,
          we name the source (ATO, ASIC, RBA, etc.) and link to it where possible.
        </li>
        <li>
          <strong>Acknowledge limitations.</strong> We include disclaimers on all financial,
          tax, and health-adjacent tools because estimates based on incomplete inputs can be
          misleading if taken as definitive. We flag these prominently, not in fine print.
        </li>
        <li>
          <strong>Avoid thin content.</strong> Our calculator pages include worked examples,
          FAQs, and explanatory articles because a calculator without context serves the number
          but not the decision. A user who understands why their CGT bill is what it is makes
          better decisions than one who just sees the output.
        </li>
        <li>
          <strong>Plain language.</strong> We write for the business owner doing their own
          research, not the tax professional who already knows the answer. Jargon is explained
          on first use. Formulas are accompanied by plain-English descriptions.
        </li>
      </ul>

      <h2>What Makes CalcFuel Different</h2>
      <p>
        Most calculator sites either show a bare widget with no explanation, or bury the
        calculation in an article-length post that takes 10 minutes to read before you can use it.
        CalcFuel puts the calculator first, the explanation second, and makes both available
        on the same page so you can go as deep as you need without switching tabs.
      </p>
      <p>
        Our Australian focus also means we don&apos;t surface US-centric rates and rules.
        The ATO, ASIC, and state revenue offices set the rules for Australian taxpayers — and
        that&apos;s what our tools reflect, with state-specific variations (like stamp duty, which
        varies significantly by jurisdiction) handled per-state where the complexity warrants it.
      </p>

      <h2>Important Disclaimer</h2>
      <p>
        Calculator results are estimates only. They are provided for informational purposes and
        should not be treated as financial, tax, legal, or professional advice. Individual
        circumstances vary, and your actual tax liability, investment return, or other outcome
        may differ from the estimate provided. Always consult a qualified professional —
        such as a registered tax agent, financial adviser, mortgage broker, or relevant
        specialist — before making decisions based on calculator outputs.
      </p>

      <h2>Contact</h2>
      <p>
        For questions, feedback, errors in our calculators, or partnership enquiries, contact us
        at{" "}
        <a href="mailto:getmarketingai@gmail.com">getmarketingai@gmail.com</a> or visit our{" "}
        <Link href="/contact">Contact Us</Link> page. We take calculator accuracy seriously —
        if you find an error, please let us know and we will investigate and correct it promptly.
      </p>
    </LegalPageLayout>
  );
}
