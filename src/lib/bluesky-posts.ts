// Bluesky post pool — 24 posts rotating every 4 hours (deterministic, no state needed)
// Post index = Math.floor(Date.now() / (4 * 3600 * 1000)) % posts.length

export interface BlueskyPost {
  text: string;
  link?: string; // URL to embed as facet
}

export const POSTS: BlueskyPost[] = [
  // --- CalcFuel free tool promos ---
  {
    text: "🧮 Stop guessing your mortgage repayments. Our free calculator shows monthly, fortnightly & weekly payments + total interest — instantly.\n\nNo sign-up. Just numbers.\n\ncalcfuel.com",
    link: "https://calcfuel.com/calculators/mortgage-repayment-calculator",
  },
  {
    text: "📈 How much will your savings grow? The compound interest calculator at CalcFuel shows you year-by-year — including extra contributions.\n\nFree. No ads distracting you.\n\ncalcfuel.com",
    link: "https://calcfuel.com/calculators/compound-interest-calculator",
  },
  {
    text: "🏠 Buying property in Australia? Stamp duty varies wildly by state. Our calculator shows all 8 states side-by-side so you can compare before you commit.\n\nFree at calcfuel.com",
    link: "https://calcfuel.com/calculators/stamp-duty-calculator",
  },
  {
    text: "🦘 How much super will you actually retire with? Most Aussies have no idea. Our super calculator shows balance projections year-by-year.\n\nFree at calcfuel.com",
    link: "https://calcfuel.com/calculators/superannuation-calculator",
  },
  {
    text: "📊 Are your ads actually making money? The Marketing ROI calculator at CalcFuel gives you a clear answer in 30 seconds.\n\nFree. No account needed.\n\ncalcfuel.com",
    link: "https://calcfuel.com/calculators/marketing-roi-calculator",
  },
  {
    text: "💸 ROAS vs ROI — do you know the difference? Marketers who confuse them waste budget.\n\nCalculate your ROAS free at CalcFuel and see exactly where your ad spend stands.\n\ncalcfuel.com",
    link: "https://calcfuel.com/calculators/roas-calculator",
  },
  {
    text: "🇦🇺 GST confusing you? Our GST calculator works both ways — add GST to a price or extract it. Simple and fast.\n\nFree at calcfuel.com",
    link: "https://calcfuel.com/calculators/gst-calculator",
  },
  {
    text: "📧 What's a good email open rate? Benchmark yours with our free calculator — enter your niche and list size to see where you stand.\n\nFree at calcfuel.com",
    link: "https://calcfuel.com/calculators/email-open-rate-calculator",
  },

  // --- AI tips / value content ---
  {
    text: "💡 The best AI agents aren't the smartest ones. They're the most constrained ones.\n\nClear boundaries + focused goals = reliable output. Vague prompts = hallucinations.\n\nLesson 1 from building MarketingAI.",
    link: "https://getmarketingai.com",
  },
  {
    text: "🤖 Most marketers use AI like a search engine.\n\nThe ones crushing it use it like a thinking partner — give it context, give it constraints, and iterate.\n\nThat's the shift.",
    link: "https://getmarketingai.com",
  },
  {
    text: "📝 Writing prompts that actually work:\n\n1. State the role (\"You are a...\")\n2. Give context (who, what, why)\n3. Set the format (length, tone, structure)\n4. Add constraints (what NOT to do)\n\nMost people skip 3 and 4. That's why their output is generic.",
    link: "https://getmarketingai.com",
  },
  {
    text: "🧠 AI won't replace marketers. It will replace marketers who don't use AI.\n\nThe gap between those who use it well and those who don't is widening fast.",
    link: "https://getmarketingai.com",
  },
  {
    text: "⚡ One prompt I use every week:\n\n\"Review this [email/page/post] as a skeptical customer. What objections would you have? What's unclear? What would stop you from buying?\"\n\nBest $0 copy review you'll ever get.",
    link: "https://buy.stripe.com/9B6dRbfrT9W9fTlg0absc0h",
  },
  {
    text: "🎯 Engagement question: What's the #1 thing you use AI for in your marketing right now?\n\nDrop it below — genuinely curious what's working for people.",
    link: "https://calcfuel.com",
  },
  {
    text: "📐 Data-driven marketing starts with knowing your numbers.\n\nROI. ROAS. CPL. LTV. CAC.\n\nIf you can't calculate them quickly, you can't make fast decisions. That's why we built calcfuel.com — free calculators for marketers.",
    link: "https://calcfuel.com",
  },

  // --- Product promos (soft sell) ---
  {
    text: "🚀 We packaged 10 of our best AI agent prompts — the ones we use to run actual marketing workflows.\n\n$5 AUD. Instant download. No fluff.\n\nDetails 👇",
    link: "https://buy.stripe.com/9B6dRbfrT9W9fTlg0absc0h",
  },
  {
    text: "📚 The AI Agent Playbook covers how to build marketing workflows with AI agents — from prompt structure to sequencing to quality checks.\n\n$15 AUD. Practical, not theoretical.\n\nDetails 👇",
    link: "https://buy.stripe.com/5kQeVfcfH0lzgXp01cbsc0f",
  },
  {
    text: "📣 50 done-for-you marketing prompts — for social, email, SEO, and ads.\n\nStop writing prompts from scratch. $19 AUD.\n\nDetails 👇",
    link: "https://buy.stripe.com/00wcN77Zr2tH36z15gbsc0c",
  },
  {
    text: "🎯 Everything Bundle: 10 AI Agent Prompts + AI Agent Playbook + 50 Marketing Prompts.\n\nAll three for $39 AUD — cheaper than buying separately.\n\nDetails 👇",
    link: "https://buy.stripe.com/9B6aEZ93v1pDdLddS2bsc0j",
  },
  {
    text: "🔧 Free tools + paid insights.\n\nCalcFuel.com = free marketing calculators (no sign-up)\nMarketingAI = AI prompts and playbooks for real workflows\n\nBoth worth bookmarking.",
    link: "https://calcfuel.com",
  },

  // --- More value / engagement ---
  {
    text: "📉 Most marketing budgets are wasted because people don't know their numbers.\n\nCPL too high? Check your targeting.\nROAS under 2x? Check your offer.\nOpen rate under 20%? Check your subject lines.\n\nFree calculators at calcfuel.com",
    link: "https://calcfuel.com",
  },
  {
    text: "🤔 Question for marketers: which metric do you obsess over most?\n\na) ROAS\nb) Email open rate\nc) CPL\nd) Something else?\n\nReply — I'm genuinely curious what drives decisions in your business.",
    link: "https://calcfuel.com",
  },
  {
    text: "💰 Australian small businesses leave money on the table by not understanding GST correctly.\n\nOur free GST calculator at CalcFuel handles both directions — add GST or extract it.\n\nBookmark it, you'll use it constantly.",
    link: "https://calcfuel.com/calculators/gst-calculator",
  },
  {
    text: "🏡 First home buyers: stamp duty concessions can save you thousands.\n\nOur calculator models FHB concessions for NSW, VIC, WA, TAS, and NT.\n\nFree at calcfuel.com — check before you sign anything.",
    link: "https://calcfuel.com/calculators/stamp-duty-calculator",
  },
];

/**
 * Returns the current post index based on current UTC time.
 * Posts cycle every 4 hours, deterministically — no KV/database needed.
 */
export function getCurrentPostIndex(): number {
  const fourHourWindows = Math.floor(Date.now() / (4 * 60 * 60 * 1000));
  return fourHourWindows % POSTS.length;
}

export function getCurrentPost(): BlueskyPost {
  return POSTS[getCurrentPostIndex()];
}
