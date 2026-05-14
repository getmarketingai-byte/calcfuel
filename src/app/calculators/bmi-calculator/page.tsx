import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import BMICalc from "./BMICalc";
import CalcReviewedBy from "@/components/CalcReviewedBy";

export const metadata: Metadata = {
  title: "BMI Calculator Australia — Body Mass Index for Adults | CalcFuel",
  description: "Free BMI calculator for adults. Enter your weight and height in metric or imperial units to instantly calculate your Body Mass Index and weight category.",
  alternates: { canonical: "/calculators/bmi-calculator" },
};

const relatedTools = [
  { title: "Age Calculator", slug: "age-calculator", description: "Calculate your exact age in years, months, and days." },
  { title: "Percentage Calculator", slug: "percentage-calculator", description: "Calculate percentages, percentage change, and more." },
  { title: "Australian Income Tax Calculator", slug: "australian-income-tax-calculator", description: "Calculate your take-home pay for 2025–26." },
  { title: "Tip Calculator", slug: "tip-calculator", description: "Calculate tips and split restaurant bills easily." },
  { title: "Superannuation Calculator", slug: "superannuation-calculator", description: "Project your super balance at retirement." },
  { title: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "See how savings and investments grow over time." },
];

const faqs = [
  {
    question: "What is BMI?",
    answer: "BMI (Body Mass Index) is a simple numerical value calculated from your weight and height. It is commonly used as a screening tool to identify whether a person has a healthy body weight relative to their height. BMI is not a direct measure of body fat — it is a population-level screening metric.",
  },
  {
    question: "How is BMI calculated?",
    answer: "BMI = weight (kg) ÷ height (m)². For example, a person who is 75 kg and 1.75 m tall has a BMI of 75 ÷ (1.75 × 1.75) = 75 ÷ 3.0625 ≈ 24.5. In imperial units: BMI = (weight in lbs ÷ height in inches²) × 703.",
  },
  {
    question: "What are the BMI categories for adults?",
    answer: "The standard WHO BMI categories for adults are: Underweight (BMI below 18.5), Healthy weight (18.5–24.9), Overweight (25–29.9), and Obese (30 and above). Some health authorities use slightly different thresholds for different ethnic backgrounds.",
  },
  {
    question: "Is BMI accurate?",
    answer: "BMI is a useful population-level screening tool but has limitations for individuals. It does not directly measure body fat, and can misclassify muscular people as overweight (since muscle weighs more than fat). It also does not account for where fat is stored. For a full health assessment, speak with a healthcare professional.",
  },
  {
    question: "What is a healthy BMI for adults in Australia?",
    answer: "The Australian Department of Health classifies adult BMI as: Underweight (below 18.5), Normal weight (18.5–24.9), Overweight (25–29.9), and Obese (30 and above). For adults of Asian background, some guidelines lower the overweight threshold to 23.0.",
  },
  {
    question: "Can I use this BMI calculator for children?",
    answer: "No. This calculator is for adults only (aged 18 and over). BMI for children and teenagers is calculated differently — it uses age- and sex-specific percentile charts, since body fat naturally changes as children grow. Use a dedicated paediatric BMI tool for anyone under 18.",
  },
];

const howToSteps = [
  { name: "Choose your units", text: "Select metric (kg and cm) or imperial (lbs and feet/inches)." },
  { name: "Enter your weight and height", text: "Type in your current weight and height." },
  { name: "Read your BMI", text: "Your BMI and weight category appear instantly." },
];

export default function BMICalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="BMI Calculator"
        description="Free BMI calculator for adults. Calculate your Body Mass Index in metric or imperial units instantly."
        url="https://calcfuel.com/calculators/bmi-calculator"
        datePublished="2025-10-01"
        dateModified="2026-05-15"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "BMI Calculator", url: "https://calcfuel.com/calculators/bmi-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span className="mx-2">/</span>
        <span>BMI Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        BMI Calculator
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
        Calculate your Body Mass Index (BMI) instantly. Supports metric (kg/cm) and imperial (lbs/ft) units. Shows your BMI value and weight category based on WHO guidelines. For adults aged 18+.
      </p>
      <CalcReviewedBy />
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <BMICalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />

      <div className="my-8 p-5 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Running a health or wellness business?</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          If you offer health, fitness, or wellness services, our <strong>50 AI Marketing Prompts</strong> include prompts specifically for service businesses — social media, email, and website copy that converts.
        </p>
        <a
          href="https://marketgenius4.gumroad.com/l/crtwc"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Get 50 AI Marketing Prompts &rarr;
        </a>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none mt-4">
        <h2>What Is BMI and How Is It Calculated?</h2>
        <p>Body Mass Index (BMI) is a numerical value derived from an individual&apos;s weight and height. It was developed in the 1830s by Belgian mathematician Adolphe Quetelet and has been adopted worldwide as a simple, inexpensive screening tool for weight-related health risk.</p>
        <p>The formula is straightforward:</p>
        <ul>
          <li><strong>Metric:</strong> BMI = weight (kg) &divide; height (m)&sup2;</li>
          <li><strong>Imperial:</strong> BMI = (weight (lbs) &divide; height (inches)&sup2;) &times; 703</li>
        </ul>
        <p>For example, if you weigh 80 kg and are 1.78 m tall: BMI = 80 &divide; (1.78 &times; 1.78) = 80 &divide; 3.1684 &asymp; <strong>25.2</strong> (just into the overweight range).</p>

        <h2>BMI Categories for Adults (WHO Standards)</h2>
        <table>
          <thead>
            <tr><th>BMI Range</th><th>Category</th><th>Health Risk</th></tr>
          </thead>
          <tbody>
            <tr><td>Below 18.5</td><td>Underweight</td><td>Increased risk of nutritional deficiencies, osteoporosis</td></tr>
            <tr><td>18.5 &ndash; 24.9</td><td>Healthy weight</td><td>Lowest risk for weight-related health problems</td></tr>
            <tr><td>25.0 &ndash; 29.9</td><td>Overweight</td><td>Moderate increased risk of type 2 diabetes, heart disease</td></tr>
            <tr><td>30.0 and above</td><td>Obese</td><td>High increased risk of serious health conditions</td></tr>
          </tbody>
        </table>

        <h2>Limitations of BMI</h2>
        <p>BMI is a useful population-level screening metric, but it has well-documented limitations for individual health assessment:</p>
        <ul>
          <li><strong>Does not distinguish fat from muscle:</strong> Highly muscular athletes (such as rugby players or bodybuilders) may have a BMI in the overweight or obese range despite having low body fat.</li>
          <li><strong>Does not measure fat distribution:</strong> Abdominal fat (central or visceral obesity) carries higher health risks than fat stored elsewhere. BMI cannot capture this. Waist circumference is a better proxy for metabolic risk.</li>
          <li><strong>Ethnicity considerations:</strong> Research shows that people of South Asian, East Asian, and Aboriginal and Torres Strait Islander descent face higher cardiometabolic risk at lower BMI values. Some guidelines recommend a lower overweight threshold (BMI 23) for Asian populations.</li>
          <li><strong>Age and sex differences:</strong> Older adults may have more body fat at the same BMI as younger adults, and women typically have more body fat than men at the same BMI.</li>
        </ul>
        <p>For a comprehensive health assessment, consult a GP or healthcare professional who can consider your full clinical picture, including blood pressure, blood glucose, cholesterol, waist circumference, and lifestyle factors.</p>

        <h2>Ideal Weight by Height — Reference Table</h2>
        <p>The following table shows the healthy weight range (BMI 18.5&ndash;24.9) for common heights:</p>
        <table>
          <thead>
            <tr><th>Height (cm)</th><th>Healthy Weight Range (kg)</th><th>Height (ft/in)</th><th>Healthy Weight Range (lbs)</th></tr>
          </thead>
          <tbody>
            <tr><td>155 cm</td><td>44.4 &ndash; 59.9 kg</td><td>5&apos;1&quot;</td><td>98 &ndash; 132 lbs</td></tr>
            <tr><td>160 cm</td><td>47.4 &ndash; 63.7 kg</td><td>5&apos;3&quot;</td><td>105 &ndash; 141 lbs</td></tr>
            <tr><td>165 cm</td><td>50.3 &ndash; 67.8 kg</td><td>5&apos;5&quot;</td><td>111 &ndash; 149 lbs</td></tr>
            <tr><td>170 cm</td><td>53.5 &ndash; 72.0 kg</td><td>5&apos;7&quot;</td><td>118 &ndash; 159 lbs</td></tr>
            <tr><td>175 cm</td><td>56.7 &ndash; 76.3 kg</td><td>5&apos;9&quot;</td><td>125 &ndash; 168 lbs</td></tr>
            <tr><td>180 cm</td><td>59.9 &ndash; 80.8 kg</td><td>5&apos;11&quot;</td><td>132 &ndash; 178 lbs</td></tr>
            <tr><td>185 cm</td><td>63.3 &ndash; 85.3 kg</td><td>6&apos;1&quot;</td><td>140 &ndash; 188 lbs</td></tr>
            <tr><td>190 cm</td><td>66.8 &ndash; 89.9 kg</td><td>6&apos;3&quot;</td><td>147 &ndash; 198 lbs</td></tr>
          </tbody>
        </table>

        <h2>Healthy Weight Tips</h2>
        <p>If your BMI is outside the healthy range, small consistent changes are more effective than drastic interventions. The Australian Government&apos;s health guidelines recommend:</p>
        <ul>
          <li>150&ndash;300 minutes of moderate-intensity physical activity per week</li>
          <li>Eating a diet based on vegetables, fruits, wholegrains, and lean proteins</li>
          <li>Limiting processed foods, added sugars, and alcohol</li>
          <li>Staying adequately hydrated</li>
          <li>Prioritising sleep (7&ndash;9 hours per night for most adults)</li>
        </ul>
        <p>If you have concerns about your weight or general health, the first step is a conversation with your GP. They can arrange relevant health checks and refer you to a dietitian or exercise physiologist if needed.</p>
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

      <aside className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-200">
        <strong>Health Disclaimer:</strong> BMI is a screening tool, not a diagnostic measure. This calculator provides an estimate only and should not replace professional medical advice. Consult your GP or healthcare provider for a comprehensive health assessment. For health information, visit <a href="https://www.healthdirect.gov.au/" target="_blank" rel="noopener noreferrer" className="underline">healthdirect.gov.au</a>.
      </aside>

      <RelatedTools tools={relatedTools} />
      <AdSenseUnit slot="1949475717" format="autorelaxed" style={{ minHeight: 90 }} className="mt-8" />
    </div>
  );
}
