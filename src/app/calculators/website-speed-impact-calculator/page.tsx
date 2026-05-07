import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import RelatedTools from "@/components/RelatedTools";
import CalculatorJsonLd from "@/components/CalculatorJsonLd";
import WebsiteSpeedCalc from "./WebsiteSpeedCalc";

export const metadata: Metadata = {
  title: "Website Speed Impact Calculator - How Page Speed Affects Conversions",
  description: "Free website speed impact calculator. See how improving your page load time increases conversion rates, adds more conversions per month, and drives revenue.",
};

const relatedTools = [
  { title: "Conversion Rate Calculator", slug: "conversion-rate-calculator", description: "Calculate your site's overall conversion rate." },
  { title: "Marketing ROI Calculator", slug: "marketing-roi-calculator", description: "Measure the return on your marketing investment." },
  { title: "Revenue Per Lead Calculator", slug: "revenue-per-lead-calculator", description: "Find the revenue value of each marketing lead." },
  { title: "Cost Per Acquisition Calculator", slug: "cost-per-acquisition-calculator", description: "Calculate the cost to acquire each new customer." },
];

const faqs = [
  { question: "How does page speed affect conversion rate?", answer: "Google research shows that for every 1-second delay in page load time, conversion rates can drop by approximately 7%. For mobile users, the impact is even greater — a 3-second load time can increase bounce rates by over 50% compared to a 1-second load. Faster pages reduce friction, keep users engaged, and make it easier for them to complete a purchase or sign-up." },
  { question: "What is a good website load time?", answer: "Google recommends a Time to First Byte (TTFB) under 600ms and a Largest Contentful Paint (LCP) under 2.5 seconds for a good user experience. For e-commerce, load times under 2 seconds are strongly associated with higher conversion rates. Studies by Akamai and Shopify consistently show pages loading in under 1 second outperform those over 3 seconds by 2–3× in conversion rate." },
  { question: "How do I measure my current page load time?", answer: "Use Google PageSpeed Insights (free) to measure your Core Web Vitals including LCP, FCP, and CLS. Chrome DevTools' Network tab shows raw load timing. GTmetrix and WebPageTest provide detailed waterfall charts showing which resources are slowest. For ongoing monitoring, Google Search Console reports Core Web Vitals data from real users." },
  { question: "What are the quickest ways to speed up a website?", answer: "The highest-impact improvements are: (1) Enable image compression and use next-gen formats like WebP; (2) Implement lazy loading for images below the fold; (3) Use a CDN to serve assets from servers geographically close to your visitors; (4) Enable browser caching with appropriate cache-control headers; (5) Minify CSS, JavaScript, and HTML; (6) Remove unused third-party scripts. These changes alone can often halve load times." },
  { question: "Does page speed affect SEO?", answer: "Yes. Google officially confirmed page speed as a ranking factor in 2010 for desktop and 2018 for mobile. Since the 2021 Core Web Vitals update, LCP, FID, and CLS scores directly influence search rankings. Slow pages are less likely to rank in competitive search results, reducing organic traffic independently of the conversion rate impact. Speed improvements compound: faster pages rank better, attract more traffic, and convert that traffic at a higher rate." },
  { question: "What is the 7% rule used in this calculator?", answer: "The 7% per second figure comes from a widely cited Google/Deloitte study on mobile performance. It represents the average conversion rate improvement observed when load time is reduced by one second. Individual results vary by industry, audience, and starting load time — slower pages tend to see larger improvements per second reduced. This calculator uses this figure as a conservative baseline estimate." },
];

const howToSteps = [
  { name: "Enter your current load time", text: "Input your current page load time in seconds. Find this with Google PageSpeed Insights or GTmetrix." },
  { name: "Enter your target load time", text: "Input the target load time you aim to achieve after optimisation. Must be lower than your current time." },
  { name: "Enter monthly visitors and conversion rate", text: "Add your monthly visitor count and current conversion rate percentage. Find these in Google Analytics." },
  { name: "Add average revenue per conversion (optional)", text: "Enter your average order value or revenue per lead to see the projected monthly revenue impact." },
];

export default function WebsiteSpeedImpactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <CalculatorJsonLd
        name="Website Speed Impact Calculator"
        description="Calculate how improving your page load time increases conversion rates and monthly revenue."
        url="https://calcfuel.com/calculators/website-speed-impact-calculator"
        breadcrumbs={[
          { name: "Home", url: "https://calcfuel.com" },
          { name: "SEO Tools", url: "https://calcfuel.com/calculators/seo-tools" },
          { name: "Website Speed Impact Calculator", url: "https://calcfuel.com/calculators/website-speed-impact-calculator" },
        ]}
        faqs={faqs}
        howToSteps={howToSteps}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators/seo-tools" className="hover:text-orange-500">SEO Tools</Link><span className="mx-2">/</span>
        <span>Website Speed Impact Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Website Speed Impact Calculator</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        See exactly how faster page load times translate into higher conversion rates, more monthly conversions, and measurable revenue — backed by Google research.
      </p>
      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />
      <WebsiteSpeedCalc />
      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8" />


      <article className="prose max-w-none mt-4">
        <h2>Why Page Speed Directly Impacts Your Conversion Rate</h2>
        <p>Page speed is not just a technical metric — it is a revenue lever. Every second of delay in page load time costs you conversions. Google's landmark study with Deloitte found that improving mobile site speed by as little as one-tenth of a second increased conversions by 8.4% for retail and 10.1% for travel sites. For high-traffic websites, this translates directly into thousands of additional conversions and significant monthly revenue without spending a single additional dollar on advertising.</p>
        <p>The mechanism is straightforward: slow pages frustrate users, increase bounce rates, and reduce the likelihood that a visitor completes their intended action — whether that's purchasing a product, signing up for a service, or submitting a lead form. Research consistently shows that users expect pages to load in under two seconds, and 40% will abandon a page that takes more than three seconds to load.</p>
        <p>The compounding effect is particularly significant. Slow pages rank lower in Google search results (page speed is a confirmed ranking factor since 2018's Core Web Vitals update), meaning they also receive less organic traffic. Speed improvements therefore deliver a double benefit: more traffic from better rankings, and higher conversion of that traffic.</p>

        <h2>Understanding the Calculation: The 7% Rule</h2>
        <p>This calculator uses the widely-cited 7% per second figure drawn from Google and Deloitte performance research. It represents the average increase in conversion rate observed when a page's load time is reduced by one second. The formula is:</p>
        <p><strong>Potential Conversion Rate = Current CR × (1 + 0.07 × Seconds Improved)</strong></p>
        <p>For example: if your current load time is 4 seconds, your target is 1.5 seconds (an improvement of 2.5 seconds), and your current conversion rate is 2%:</p>
        <ul>
          <li>Potential CR = 2% × (1 + 0.07 × 2.5) = 2% × 1.175 = <strong>2.35%</strong></li>
          <li>If you have 10,000 monthly visitors, that's 350 additional conversions per month</li>
          <li>At $150 average revenue per conversion, that's $52,500 additional monthly revenue</li>
        </ul>
        <p>This is a conservative model. Slower pages often see larger improvements per second reduced because they have more friction to eliminate. Your actual results may be higher or lower depending on your audience, device mix, and the nature of the conversion action.</p>

        <h2>What Causes Slow Page Load Times?</h2>
        <p>The most common culprits behind slow websites are: unoptimised images (the single biggest factor on most sites), excessive JavaScript payloads that block rendering, too many third-party scripts (tracking pixels, chat widgets, analytics tags), no content delivery network (CDN), poor server response times, and no browser caching. A single uncompressed hero image can add 2–3 seconds to load time on its own.</p>
        <p>Tools like Google PageSpeed Insights provide a free audit of your specific page with actionable recommendations ranked by impact. GTmetrix and WebPageTest offer more detailed waterfall analysis showing exactly which resources are causing delays. Most development teams can address the top 3–5 recommendations within a sprint and achieve meaningful improvements in load time.</p>

        <h2>How to Reduce Page Load Time: Priority Actions</h2>
        <ol>
          <li><strong>Compress and resize images:</strong> Use WebP format and compress all images before upload. Tools like Squoosh, TinyPNG, or server-side solutions like Cloudinary do this automatically. A typical unoptimised image can be reduced from 500KB to 50KB with no visible quality loss.</li>
          <li><strong>Implement lazy loading:</strong> Load images only when they're about to enter the viewport. Modern browsers support native lazy loading via the <code>loading="lazy"</code> attribute. This can dramatically reduce initial page weight on image-heavy pages.</li>
          <li><strong>Use a CDN:</strong> A Content Delivery Network serves your assets from servers geographically close to your visitors. For a global audience, a CDN can reduce load times by 50–80% for static assets. Cloudflare, AWS CloudFront, and Vercel's Edge Network all offer this.</li>
          <li><strong>Eliminate render-blocking resources:</strong> JavaScript and CSS that block the browser from rendering the page can add seconds to perceived load time. Defer non-critical JavaScript, inline critical CSS, and remove unused styles.</li>
          <li><strong>Minimise third-party scripts:</strong> Each tracking pixel, chat widget, and analytics tag adds HTTP requests and JavaScript execution time. Audit your tag manager and remove scripts that don't directly contribute to revenue or compliance.</li>
        </ol>

        <h2>Core Web Vitals and SEO</h2>
        <p>Google's Core Web Vitals measure three specific aspects of page performance: Largest Contentful Paint (LCP) — how long the largest visible element takes to load, should be under 2.5 seconds; First Input Delay (FID) / Interaction to Next Paint (INP) — how quickly the page responds to user interaction, should be under 200ms; and Cumulative Layout Shift (CLS) — how much the page visually shifts during load, should be under 0.1. Pages that meet these thresholds across all three metrics receive a positive ranking signal from Google. Failing them can suppress rankings even for otherwise well-optimised pages.</p>
        <p>The combination of improved rankings and higher conversion rates makes speed optimisation one of the highest-ROI technical investments a marketing team can make. Unlike paid advertising, the gains compound over time: a faster page continues to rank better and convert better for as long as the optimisations remain in place.</p>
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
