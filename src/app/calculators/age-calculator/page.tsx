import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import AgeCalc from "./AgeCalc";

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Your Exact Age in Years, Months & Days | calcfuel.com",
  description: "Free age calculator. Enter your date of birth to instantly find your exact age in years, months, and days. Also shows total days lived and days until your next birthday.",
  alternates: { canonical: "/calculators/age-calculator" },
};

const relatedTools = [
  { title: "BMI Calculator", slug: "bmi-calculator", description: "Calculate your Body Mass Index in metric or imperial units." },
  { title: "Percentage Calculator", slug: "percentage-calculator", description: "Calculate any percentage instantly." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your take-home pay for 2025–26." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance at retirement." },
];

const faqs = [
  {
    question: "How is age calculated exactly?",
    answer: "Age is calculated by finding the difference between your date of birth and today (or any reference date). The years component counts full years since birth. The months component counts full months since your last birthday. The days component counts remaining days after the last full month.",
  },
  {
    question: "Why might my age calculation differ slightly between tools?",
    answer: "Slight differences can occur in how tools handle partial months and the edge cases around month-end dates. Our calculator uses the most common convention: counting backward from the reference date to your last birthday, then counting months and days forward from there.",
  },
  {
    question: "Can I calculate someone else's age or an age on a past or future date?",
    answer: "Yes. Enter the person's date of birth in the first field, then optionally enter a specific date in the 'Age as of' field. Leave the second field blank to calculate age as of today. You can use a past or future date to find what age someone was or will be on any given day.",
  },
  {
    question: "How many days have I been alive?",
    answer: "The calculator shows your total days lived. As a rough guide: at age 20 you have lived approximately 7,305 days; at 30, roughly 10,958 days; at 40, approximately 14,610 days; at 50, about 18,263 days; at 65, approximately 23,741 days.",
  },
  {
    question: "What age is considered a senior citizen in Australia?",
    answer: "In Australia, 65 is the most commonly used threshold for senior citizen status, aligning with the Age Pension eligibility age (which is being phased up to 67 by 2023). However, different programs use different thresholds — some concession cards start at age 60, while others start at 65.",
  },
  {
    question: "How do I calculate a child's age for school enrolment?",
    answer: "In Australia, children must be 5 years old by a date that varies by state. In NSW and VIC, children must turn 5 by 30 April of the year they start school. In QLD, children must turn 5 by 30 June. In WA, SA, and TAS, the cutoff is 30 April. Enter the child's date of birth and check the result against your state's cutoff.",
  },
];

const howToSteps = [
  { name: "Enter your date of birth", text: "Select or type your date of birth using the date picker." },
  { name: "Optionally set a reference date", text: "Leave blank for today, or enter any past or future date to calculate age on that specific day." },
  { name: "Read your results", text: "See your exact age in years, months, and days, plus total days lived and days to your next birthday." },
];

export default function AgeCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Age Calculator"
        description="Free age calculator. Calculate your exact age in years, months, and days from your date of birth."
        url="https://calcfuel.com/calculators/age-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "Age Calculator", url: "https://calcfuel.com/calculators/age-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>Age Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        Age Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Calculate your exact age in years, months, and days. Enter your date of birth and optionally a reference date to find out how old you are — or were, or will be — on any given day. Also shows total days lived and days until your next birthday.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <AgeCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Marking a milestone birthday?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          If you are marketing an event, service, or product around milestone ages, our <strong>50 AI Marketing Prompts</strong> include prompts for occasion-based marketing, email campaigns, and local business promotions.
        </p>
        <a
          href="https://marketgenius4.gumroad.com/l/crtwc"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get 50 AI Marketing Prompts &rarr;
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>How to Calculate Your Exact Age</h2>
        <p>Calculating your age sounds simple, but the exact figure in years, months, and days requires careful handling of calendar differences. Here is the step-by-step method:</p>
        <ol>
          <li><strong>Calculate full years:</strong> Subtract your birth year from the current year. If you have not yet had your birthday this year, subtract one.</li>
          <li><strong>Calculate remaining months:</strong> Count full months since your last birthday.</li>
          <li><strong>Calculate remaining days:</strong> Count the days since the start of the current partial month.</li>
        </ol>
        <p><strong>Example:</strong> Born on 15 March 1990, calculating age on 10 May 2026.</p>
        <ul>
          <li>Full years: 2026 &minus; 1990 = 36 (birthday has passed in 2026)</li>
          <li>Months since last birthday (15 March 2026 to 10 May 2026): 1 full month (to 15 April), then 25 days</li>
          <li>Result: <strong>36 years, 1 month, 25 days</strong></li>
        </ul>

        <h2>Age-Related Milestones in Australia</h2>
        <table>
          <thead>
            <tr><th>Age</th><th>Milestone</th></tr>
          </thead>
          <tbody>
            <tr><td>5</td><td>School enrolment (varies by state cutoff date)</td></tr>
            <tr><td>15&ndash;16</td><td>Can obtain a learner&apos;s driving permit (varies by state)</td></tr>
            <tr><td>17</td><td>Can apply for provisional licence in most states</td></tr>
            <tr><td>18</td><td>Legal adult — can vote, drink alcohol, sign contracts</td></tr>
            <tr><td>25</td><td>Car insurance typically decreases significantly</td></tr>
            <tr><td>60</td><td>Some pensioner concession cards available</td></tr>
            <tr><td>65&ndash;67</td><td>Age Pension eligibility (phased to 67)</td></tr>
            <tr><td>70</td><td>Must renew driving licence every year in some states</td></tr>
          </tbody>
        </table>

        <h2>How Many Days Have You Been Alive?</h2>
        <p>The total number of days you have lived is a surprisingly large number. Here is a rough guide by age:</p>
        <table>
          <thead>
            <tr><th>Age</th><th>Approximate Days Lived</th><th>Weeks</th></tr>
          </thead>
          <tbody>
            <tr><td>10</td><td>~3,652</td><td>~522</td></tr>
            <tr><td>18</td><td>~6,575</td><td>~940</td></tr>
            <tr><td>25</td><td>~9,131</td><td>~1,304</td></tr>
            <tr><td>30</td><td>~10,957</td><td>~1,565</td></tr>
            <tr><td>40</td><td>~14,610</td><td>~2,087</td></tr>
            <tr><td>50</td><td>~18,263</td><td>~2,609</td></tr>
            <tr><td>65</td><td>~23,741</td><td>~3,392</td></tr>
          </tbody>
        </table>
        <p>Leap years add an extra day approximately every 4 years, so the exact count depends on how many leap years fall within your lifespan. Our calculator accounts for this precisely.</p>

        <h2>Age Calculation for Official Purposes</h2>
        <p>For legal and official purposes in Australia, age is typically calculated as at the date of the relevant event or application. This matters for:</p>
        <ul>
          <li><strong>School enrolment:</strong> Children must reach the required age by the state cutoff date, not just by the end of the calendar year.</li>
          <li><strong>Government benefits:</strong> Eligibility dates are usually calculated to the day — not just the year.</li>
          <li><strong>Sporting competitions:</strong> Age-group cutoffs in many Australian sports use a specific date (often 1 January) to determine the age group for the upcoming season.</li>
          <li><strong>Superannuation access:</strong> The preservation age (currently 60 for most Australians) is calculated from your date of birth, not just your birth year.</li>
        </ul>
      </article>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8" />

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
