import type { Metadata } from "next";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { createPageMetadata } from "@/lib/seo";
import BlogArticleLayout from "@/components/BlogArticleLayout";

export const metadata: Metadata = createPageMetadata({
  title: "What Can I Claim on Tax in Australia 2025–26? (Complete Guide)",
  description:
    "Everything you can claim on your 2025–26 Australian tax return: work-related deductions, working from home, car expenses, self-education, investments, and more. Updated for July 2026.",
  path: "/blog/tax-deductions-australia-2025",
  type: "article",
});

const faqs = [
  {
    question: "What can I claim on my tax return in Australia 2025–26?",
    answer:
      "You can claim work-related expenses, working-from-home costs (using the fixed-rate or actual cost method), vehicle and travel expenses for work, self-education costs, investment expenses (rental property, shares), union fees, income protection insurance premiums, and charitable donations to DGRs. You cannot claim private or domestic expenses, clothing (unless a uniform or protective gear), or commuting costs between home and work unless carrying bulky equipment.",
  },
  {
    question: "How much can I claim without receipts in Australia?",
    answer:
      "For work-related expenses, you can claim up to $300 without receipts — but you must have actually spent the money and it must relate directly to earning your income. For laundry of work clothing, you can claim $1 per load (up to $150 per year) without receipts. For everything over $300, you need written evidence (receipts, invoices, bank statements, or logbooks).",
  },
  {
    question: "What is the working from home tax deduction for 2025–26?",
    answer:
      "The ATO's fixed-rate method for 2025–26 is 70 cents per hour worked from home (updated from the previous 67 cents). This covers electricity, internet, phone, stationery, and computer consumables. You must keep a record of actual hours worked from home (a diary, timesheet, or similar). Alternatively, use the actual cost method if your actual expenses are higher — but you need detailed records for every cost.",
  },
  {
    question: "Can I claim my home internet on tax?",
    answer:
      "Yes, but only the work-related portion. If you use your home internet 40% for work, you can claim 40% of your annual internet bill. If you use the fixed-rate working-from-home method (70c/hr), internet is already included in that rate and cannot be claimed separately. Only use the actual cost method if your work internet use is high and your total actual costs exceed what the fixed rate gives you.",
  },
  {
    question: "Can I claim my phone on tax in Australia?",
    answer:
      "Yes — the work-related portion of your phone bill. If you use your mobile 60% for work calls and texts, you can claim 60% of your bill. You need a representative 4-week diary showing your usage pattern. If using the fixed-rate WFH method, phone calls and data from home are included in the 70c/hr rate.",
  },
  {
    question: "What clothing can I claim on tax?",
    answer:
      "You can claim protective clothing required for your work (hard hats, safety boots, high-vis vests, steel-capped boots), occupation-specific clothing (a nurse's uniform, chef's whites, a branded uniform your employer requires and that isn't suitable for everyday use). You cannot claim conventional clothing even if you only wear it for work (office suits, black trousers, non-logoed work shirts). You can also claim laundry for eligible work clothing at $1/load.",
  },
  {
    question: "Can I claim car expenses for work travel?",
    answer:
      "Yes, for work-related travel — but not ordinary commuting (home to your regular workplace). Claimable car use includes: travelling between two workplaces, carrying bulky equipment essential to your job with no secure storage at work, and travel to a client's site or different office. The two methods are: cents per km (92c/km for 2025–26, up to 5,000 km) or logbook method (requires 12-week logbook showing business use percentage, then claims that % of all car costs).",
  },
  {
    question: "What self-education expenses can I claim?",
    answer:
      "Self-education that leads to a formal qualification and directly relates to your current employment — maintaining or improving skills, or potentially increasing your income. You can claim course fees, textbooks, stationery, student union fees, and a portion of your home office costs during study time. You cannot claim the first $250 of self-education costs (a non-deductible threshold applies) or courses that qualify you for a new career you don't yet work in.",
  },
  {
    question: "Can I claim donations on my tax return?",
    answer:
      "Yes — gifts of $2 or more to an ATO-approved Deductible Gift Recipient (DGR). The charity must be endorsed as a DGR; you can check at the ABN Lookup or ATO website. You need a receipt. No benefit (raffle tickets, charity dinners above nominal cost) can be received in return, or the deduction is reduced. Political party donations are generally not deductible.",
  },
  {
    question: "How do I claim investment property expenses on tax?",
    answer:
      "Rental property deductions include: interest on your investment loan, property management fees, council rates and water charges, landlord insurance, repairs and maintenance, body corporate fees, advertising for tenants, and depreciation on assets. Keep all receipts. Capital works (structural improvements) are deducted at 2.5% per year over 40 years. A tax depreciation schedule (from a quantity surveyor, around $400–$700 once) maximises your depreciation claim.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function TaxDeductionsPage() {
  return (
    <BlogArticleLayout
      title="What Can I Claim on Tax in Australia 2025–26? (Complete Guide)"
      category="Tax & Finance"
      readTime="12 min read"
      publishedDate="2026-07-17"
      slug="tax-deductions-australia-2025"
      description="Complete guide to Australian tax deductions for 2025–26 — work expenses, WFH, car costs, investments, and what you can't claim."
      authorName="CalcFuel Editorial Team"
      authorRole="Tax & Finance Calculators"
      authorBio="Our team builds practical calculators and guides for Australians managing their taxes, finances, and everyday costs."
      relatedLinks={[
        { href: "/calculators/australian-income-tax-calculator", label: "Australian Income Tax Calculator 2025–26" },
        { href: "/calculators/work-from-home-tax-calculator", label: "Working From Home Tax Deduction Calculator" },
        { href: "/calculators/hecs-help-repayment-calculator", label: "HECS-HELP Repayment Calculator" },
        { href: "/calculators/tax-refund-estimator", label: "Tax Refund Estimator" },
        { href: "/calculators/salary-sacrifice-calculator", label: "Salary Sacrifice Calculator" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AdSenseUnit slot="6564431580" format="auto" style={{ minHeight: 90 }} className="mb-6" />

      <div className="not-prose bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Calculate your 2025–26 tax refund</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your income, deductions, and offsets for an instant estimate of what you owe — or what you&apos;ll get back.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/tax-refund-estimator" className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-sm">
            Tax Refund Estimator →
          </Link>
          <Link href="/calculators/australian-income-tax-calculator" className="inline-block bg-white dark:bg-gray-800 text-orange-500 font-semibold px-4 py-2 rounded-xl border border-orange-300 hover:bg-orange-50 transition-colors text-sm">
            Income Tax Calculator →
          </Link>
        </div>
      </div>

      <p>
        Tax return season is here. The ATO opens online lodgement from 1 July, and most Australians
        leave significant money on the table because they miss deductions they are legally entitled to.
        This guide covers everything claimable on your 2025–26 tax return — with the amounts, conditions,
        and record-keeping requirements you need to know.
      </p>

      <p>
        <strong>Important:</strong> Tax rules are complex and your situation is individual. This guide
        covers general principles. For your own return, verify with the <a href="https://www.ato.gov.au" target="_blank" rel="noopener noreferrer">ATO website</a> or a registered tax agent.
      </p>

      <h2>1. Work-Related Expenses — The Biggest Category</h2>
      <p>
        Work-related deductions are the most common and most valuable. To claim, you must:
      </p>
      <ul>
        <li>Have spent the money yourself (not reimbursed by your employer)</li>
        <li>The expense must directly relate to earning your income</li>
        <li>You must have a record (receipt, bank statement, or written evidence)</li>
      </ul>

      <h3>The $300 Rule</h3>
      <p>
        You can claim up to <strong>$300 in total work-related expenses without receipts</strong> — but you must
        have genuinely spent the money and it must be work-related. Above $300, you need written evidence for
        every dollar. Many people claim exactly $300 without evidence; many more have legitimate claims over
        $300 and miss them.
      </p>

      <h3>Tools and Equipment</h3>
      <p>Items you buy and use for work:</p>
      <ul>
        <li><strong>Under $300:</strong> Claim the full cost immediately.</li>
        <li><strong>$300 or more:</strong> Claim depreciation over the item&apos;s effective life (e.g. a $1,500 laptop for a teacher with 3-year effective life = $500/year, proportioned for business use %).</li>
        <li>Items used both for work and privately: only the work-use percentage is deductible.</li>
      </ul>

      <h3>Professional Memberships and Union Fees</h3>
      <p>
        Union dues, professional association fees, and subscriptions to trade or professional journals directly
        related to your occupation are fully deductible. Keep the receipt or member statement.
      </p>

      <h3>Income Protection Insurance</h3>
      <p>
        Premiums for income protection insurance are fully deductible — but only if the policy covers lost
        income (not TPD or life insurance). If your income protection is bundled into superannuation, you
        generally cannot claim the premiums directly (the super fund handles the tax treatment instead).
      </p>

      <AdSenseUnit slot="3651327789" format="auto" style={{ minHeight: 250 }} className="my-8 not-prose" />

      <h2>2. Working From Home Deductions 2025–26</h2>
      <p>
        The ATO offers two methods for claiming home-office costs. You choose one method per year — you
        cannot mix and match.
      </p>

      <h3>Fixed Rate Method: 70 Cents Per Hour</h3>
      <p>
        For 2025–26, the revised fixed rate is <strong>70 cents per hour</strong> worked from home
        (up from 67c/hr in 2023–24). This covers:
      </p>
      <ul>
        <li>Electricity and gas for heating, cooling, and lighting your home office</li>
        <li>Internet (home portion used for work)</li>
        <li>Phone (data and calls used for work)</li>
        <li>Stationery and computer consumables</li>
      </ul>
      <p>
        <strong>What you still need to claim separately:</strong> Depreciation of office furniture and equipment
        (desk, chair, monitor, laptop) can be claimed in addition to the fixed rate.
      </p>
      <p>
        <strong>Records required:</strong> A diary, timesheet, or electronic log showing your actual hours
        worked from home during the income year. The ATO no longer accepts a &quot;representative four-week period&quot;
        for the fixed-rate method — you need a full-year record.
      </p>

      <div className="not-prose bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-4 my-6">
        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Working From Home Calculator</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Enter your WFH hours and equipment costs for an instant deduction estimate.</p>
        <Link href="/calculators/work-from-home-tax-calculator" className="inline-block bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm">
          WFH Tax Calculator →
        </Link>
      </div>

      <h3>Actual Cost Method</h3>
      <p>
        Claim the actual work-related portion of each expense. Suitable if your actual costs exceed
        what the fixed rate gives you — typically for people with a dedicated home office used exclusively
        for work.
      </p>
      <table>
        <thead>
          <tr><th>Expense</th><th>What you can claim</th><th>Evidence needed</th></tr>
        </thead>
        <tbody>
          <tr><td>Electricity / gas</td><td>Work-use % of home energy bill</td><td>Bills + floor area calculation</td></tr>
          <tr><td>Internet</td><td>Work-use % of internet plan</td><td>Bills + usage diary</td></tr>
          <tr><td>Phone</td><td>Work-use % of mobile/home plan</td><td>Bills + 4-week diary</td></tr>
          <tr><td>Desk, chair, shelving</td><td>Depreciation over effective life</td><td>Receipts</td></tr>
          <tr><td>Computer / laptop</td><td>Depreciation × work-use %</td><td>Receipts</td></tr>
          <tr><td>Stationery</td><td>Full cost if used for work</td><td>Receipts</td></tr>
          <tr><td>Cleaning (dedicated room)</td><td>Work-use % of cleaning costs</td><td>Receipts</td></tr>
          <tr><td>Rent / mortgage interest</td><td>❌ Generally not deductible (unless exclusively commercial office in home)</td><td>—</td></tr>
        </tbody>
      </table>

      <h2>3. Car and Vehicle Expenses</h2>
      <p>
        You can claim work-related car use — but <strong>not</strong> ordinary commuting between home and
        your regular workplace.
      </p>

      <h3>What Work-Related Car Use Is</h3>
      <ul>
        <li>Travelling between two separate workplaces in the same day</li>
        <li>Travelling from your workplace to a client or supplier</li>
        <li>Carrying bulky equipment essential to your job (no secure storage at workplace)</li>
        <li>Attending a work conference or training course at a different location</li>
      </ul>

      <h3>Two Methods</h3>
      <table>
        <thead>
          <tr><th>Method</th><th>2025–26 rate</th><th>Limit</th><th>Records</th></tr>
        </thead>
        <tbody>
          <tr><td>Cents per km</td><td>92c per km</td><td>5,000 km maximum (= $4,600 max)</td><td>Odometer records, diary</td></tr>
          <tr><td>Logbook method</td><td>Actual car costs × business %</td><td>No km limit</td><td>12-week ATO logbook, all receipts, odometer</td></tr>
        </tbody>
      </table>
      <p>
        The <strong>logbook method</strong> is better if you drive more than 5,000 km for work per year or
        if your car costs are high. The cents-per-km method is simpler for occasional work travel.
      </p>

      <h2>4. Self-Education and Training Expenses</h2>
      <p>
        Self-education is deductible when it directly relates to your <em>current</em> employment — either
        to maintain your skills or improve your income-earning capacity in the same occupation.
      </p>
      <ul>
        <li>Course fees (TAFE, university, private provider)</li>
        <li>Textbooks, course materials, stationery</li>
        <li>Computer depreciation if used for study</li>
        <li>Travel to and from education institution</li>
        <li>Student services and amenity fees</li>
      </ul>
      <p>
        <strong>Non-deductible:</strong> Courses for a new career you don&apos;t yet work in. A plumber studying
        to become an accountant cannot deduct accounting course fees.
      </p>
      <p>
        <strong>HECS-HELP repayments are not deductible.</strong> Only the ATO study and training loan
        balance itself is governed by compulsory repayment thresholds — not a deduction. See the{" "}
        <Link href="/calculators/hecs-help-repayment-calculator">HECS-HELP Repayment Calculator</Link> for
        your repayment schedule.
      </p>

      <AdSenseUnit slot="6514347197" format="fluid" layout="in-article" style={{ minHeight: 100 }} className="my-8 not-prose" />

      <h2>5. Investment and Rental Property Deductions</h2>

      <h3>Rental Property</h3>
      <p>
        If you own an investment property, deductible expenses include:
      </p>
      <table>
        <thead>
          <tr><th>Deductible</th><th>Not deductible</th></tr>
        </thead>
        <tbody>
          <tr><td>Loan interest (investment portion only)</td><td>Loan principal repayments</td></tr>
          <tr><td>Property management fees</td><td>Your own labour/time</td></tr>
          <tr><td>Council rates, water rates</td><td>Capital improvements (claimed as capital works at 2.5%/yr)</td></tr>
          <tr><td>Landlord insurance</td><td>Private use periods (holiday rental)</td></tr>
          <tr><td>Repairs and maintenance</td><td>Initial repairs on a newly acquired property</td></tr>
          <tr><td>Body corporate / strata fees</td><td>Borrowing costs &gt;$100 (spread over loan term)</td></tr>
          <tr><td>Depreciation (plant and equipment)</td><td>—</td></tr>
          <tr><td>Capital works (structural: 2.5%/yr)</td><td>—</td></tr>
          <tr><td>Advertising for tenants</td><td>—</td></tr>
        </tbody>
      </table>
      <p>
        A tax depreciation schedule from a quantity surveyor (typically $400–$700 once) can identify
        thousands in annual depreciation claims that most landlords miss. It usually pays back in the
        first year.
      </p>

      <h3>Shares and Investments</h3>
      <ul>
        <li>Interest on money borrowed to purchase income-producing shares or managed funds</li>
        <li>Brokerage fees (on disposal — added to cost base; on purchase — deductible)</li>
        <li>Investment-related subscriptions (financial publications, portfolio tracking tools)</li>
        <li>Accountant fees for investment-related tax advice</li>
      </ul>

      <h2>6. Charitable Donations</h2>
      <p>
        Gifts of $2 or more to an ATO-endorsed <strong>Deductible Gift Recipient (DGR)</strong> are fully
        deductible. Rules:
      </p>
      <ul>
        <li>Must be a genuine gift — no benefit returned (raffle tickets, gala dinner tickets are not fully deductible)</li>
        <li>The organisation must be a DGR (check at <a href="https://abr.business.gov.au" target="_blank" rel="noopener noreferrer">ABR Lookup</a>)</li>
        <li>You need a receipt for $2+</li>
        <li>Workplace giving through payroll: your employer&apos;s payment summary (income statement) shows the total donated — claim it in full</li>
      </ul>

      <h2>7. Tax Agent and Accounting Fees</h2>
      <p>
        Fees paid to a registered tax agent to prepare your tax return are deductible — but in the year
        you pay them, not the year the return relates to. If you paid a tax agent in 2026 to prepare your
        2024–25 return, that fee is deductible in 2025–26.
      </p>

      <h2>8. Common Deductions by Occupation</h2>
      <table>
        <thead>
          <tr><th>Occupation</th><th>Common deductions</th></tr>
        </thead>
        <tbody>
          <tr><td>Teachers / educators</td><td>Classroom supplies (up to $20,000 cap), self-education, union fees, laptop depreciation</td></tr>
          <tr><td>Nurses / healthcare</td><td>Nursing uniforms, stethoscope, AHPRA fees, professional indemnity, self-education</td></tr>
          <tr><td>Tradies</td><td>Tools under $300 (immediately), tool insurance, work boots/protective gear, safety glasses, union fees, logbook car expenses</td></tr>
          <tr><td>IT / tech workers</td><td>Home office (WFH), laptop/monitor, professional subscriptions, self-education, conference fees</td></tr>
          <tr><td>Sales / field workers</td><td>Car logbook (often the biggest claim), client entertainment (50% limit), phone, laptop</td></tr>
          <tr><td>Managers / office workers</td><td>WFH fixed rate, professional memberships, self-education, income protection insurance</td></tr>
          <tr><td>Rental property owners</td><td>All costs above; depreciation schedule strongly recommended</td></tr>
        </tbody>
      </table>

      <h2>9. What You Cannot Claim</h2>
      <ul>
        <li><strong>Ordinary commuting:</strong> Home-to-work travel (even if far or you use public transport). Only claimable if carrying bulky equipment or going to a different workplace.</li>
        <li><strong>Private expenses:</strong> Groceries, gym, childcare, mortgage repayments, personal clothing.</li>
        <li><strong>Conventional clothing:</strong> A suit bought for work, a pair of black trousers. If you could wear it outside work, it&apos;s not deductible.</li>
        <li><strong>Meals:</strong> Meals while working (unless travelling overnight away from home for work).</li>
        <li><strong>Fines:</strong> Traffic infringements, parking fines (even if incurred while working).</li>
        <li><strong>HECS-HELP repayments:</strong> Compulsory repayments are not deductible.</li>
      </ul>

      <h2>10. Maximising Your 2025–26 Refund — Practical Tips</h2>
      <ul>
        <li><strong>Lodge through myTax in July:</strong> Most pre-fill data (income, interest, dividends, private health insurance) loads automatically after mid-August. Waiting a few weeks often means fewer corrections.</li>
        <li><strong>Gather your receipts now:</strong> Use the ATO&apos;s myDeductions app to photograph receipts year-round — it exports directly to myTax.</li>
        <li><strong>Check your income statement is finalised:</strong> Employers must finalise Single Touch Payroll by 14 July. Wait for the &quot;Tax ready&quot; label before lodging.</li>
        <li><strong>Don&apos;t miss the WFH hours log:</strong> This is the most common reason the ATO disallows WFH claims. A simple spreadsheet or calendar record of days and hours worked from home is sufficient.</li>
        <li><strong>Consider a tax agent if complex:</strong> Investment property, side income, shares, and multiple employers add complexity. Tax agent fees are deductible next year.</li>
      </ul>

      <div className="not-prose bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-5 my-6">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Estimate your 2025–26 refund</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Our income tax calculator uses the 2025–26 ATO tax rates, LMITO, and LITO to estimate your tax and refund position.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/australian-income-tax-calculator" className="inline-block bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm">
            Income Tax Calculator →
          </Link>
          <Link href="/calculators/tax-refund-estimator" className="inline-block bg-white dark:bg-gray-800 text-blue-600 font-semibold px-4 py-2 rounded-xl border border-blue-300 hover:bg-blue-50 transition-colors text-sm">
            Tax Refund Estimator →
          </Link>
        </div>
      </div>

      <h2>Related Calculators</h2>
      <ul>
        <li><Link href="/calculators/australian-income-tax-calculator">Australian Income Tax Calculator 2025–26</Link> — income tax, Medicare levy, LITO, and take-home pay</li>
        <li><Link href="/calculators/tax-refund-estimator">Tax Refund Estimator</Link> — enter your income and deductions for a refund estimate</li>
        <li><Link href="/calculators/work-from-home-tax-calculator">Working From Home Tax Deduction Calculator</Link> — fixed rate or actual cost WFH deduction</li>
        <li><Link href="/calculators/hecs-help-repayment-calculator">HECS-HELP Repayment Calculator</Link> — compulsory repayment amount by income</li>
        <li><Link href="/calculators/salary-sacrifice-calculator">Salary Sacrifice Calculator</Link> — pre-tax super contributions and their tax impact</li>
        <li><Link href="/calculators/superannuation-calculator">Superannuation Calculator</Link> — project your super balance to retirement</li>
      </ul>

      <section className="not-prose mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer">{faq.question}</summary>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="not-prose mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-200">
        <strong>Disclaimer:</strong> This guide is for general information only and does not constitute tax advice. Tax laws change regularly and your individual circumstances will affect what you can claim. Always verify with the <a href="https://www.ato.gov.au" target="_blank" rel="noopener noreferrer" className="underline">Australian Taxation Office (ATO)</a> or a registered tax agent before lodging your return. AI estimate — review with your accountant.
      </aside>
    </BlogArticleLayout>
  );
}
