import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ─── Tool Definitions ─────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "marketing_roi",
    description:
      "Calculate Marketing Return on Investment (ROI). Returns ROI percentage and interpretation.",
    inputSchema: {
      type: "object",
      properties: {
        revenue: {
          type: "number",
          description: "Total revenue generated from the campaign (in dollars)",
        },
        cost: {
          type: "number",
          description: "Total cost of the campaign (in dollars)",
        },
      },
      required: ["revenue", "cost"],
    },
  },
  {
    name: "customer_lifetime_value",
    description:
      "Calculate Customer Lifetime Value (CLV/LTV). Returns the predicted total value a customer will generate.",
    inputSchema: {
      type: "object",
      properties: {
        avg_purchase_value: {
          type: "number",
          description: "Average value of a single purchase (in dollars)",
        },
        purchase_frequency: {
          type: "number",
          description: "Average number of purchases per year",
        },
        customer_lifespan: {
          type: "number",
          description: "Average number of years a customer stays active",
        },
      },
      required: ["avg_purchase_value", "purchase_frequency", "customer_lifespan"],
    },
  },
  {
    name: "click_through_rate",
    description:
      "Calculate Click-Through Rate (CTR) for ads, emails, or other content.",
    inputSchema: {
      type: "object",
      properties: {
        clicks: {
          type: "number",
          description: "Number of clicks received",
        },
        impressions: {
          type: "number",
          description: "Number of times the content was shown",
        },
      },
      required: ["clicks", "impressions"],
    },
  },
  {
    name: "cost_per_acquisition",
    description:
      "Calculate Cost Per Acquisition (CPA) — how much you spend to acquire one customer.",
    inputSchema: {
      type: "object",
      properties: {
        total_spend: {
          type: "number",
          description: "Total marketing spend (in dollars)",
        },
        conversions: {
          type: "number",
          description: "Number of customers acquired",
        },
      },
      required: ["total_spend", "conversions"],
    },
  },
  {
    name: "cost_per_lead",
    description: "Calculate Cost Per Lead (CPL) — how much you spend to generate one lead.",
    inputSchema: {
      type: "object",
      properties: {
        total_spend: {
          type: "number",
          description: "Total marketing spend (in dollars)",
        },
        leads: {
          type: "number",
          description: "Number of leads generated",
        },
      },
      required: ["total_spend", "leads"],
    },
  },
  {
    name: "net_promoter_score",
    description:
      "Calculate Net Promoter Score (NPS) from survey responses. Promoters score 9-10, Detractors score 0-6.",
    inputSchema: {
      type: "object",
      properties: {
        promoters: {
          type: "number",
          description: "Number of respondents who scored 9 or 10",
        },
        detractors: {
          type: "number",
          description: "Number of respondents who scored 0-6",
        },
        total_respondents: {
          type: "number",
          description: "Total number of survey respondents",
        },
      },
      required: ["promoters", "detractors", "total_respondents"],
    },
  },
  {
    name: "conversion_rate",
    description:
      "Calculate Conversion Rate — the percentage of visitors who complete a desired action.",
    inputSchema: {
      type: "object",
      properties: {
        conversions: {
          type: "number",
          description: "Number of completed conversions (purchases, sign-ups, etc.)",
        },
        visitors: {
          type: "number",
          description: "Total number of visitors",
        },
      },
      required: ["conversions", "visitors"],
    },
  },
  {
    name: "engagement_rate",
    description:
      "Calculate Social Media Engagement Rate — the percentage of followers who interact with content.",
    inputSchema: {
      type: "object",
      properties: {
        engagements: {
          type: "number",
          description: "Total engagements (likes + comments + shares + reactions)",
        },
        followers: {
          type: "number",
          description: "Number of followers or reach",
        },
      },
      required: ["engagements", "followers"],
    },
  },
  {
    name: "profit_margin",
    description:
      "Calculate Profit Margin — the percentage of revenue that is profit after costs.",
    inputSchema: {
      type: "object",
      properties: {
        revenue: {
          type: "number",
          description: "Total revenue (in dollars)",
        },
        cost: {
          type: "number",
          description: "Total costs (in dollars)",
        },
      },
      required: ["revenue", "cost"],
    },
  },
  {
    name: "break_even_point",
    description:
      "Calculate Break-Even Point — the number of units you need to sell to cover all costs.",
    inputSchema: {
      type: "object",
      properties: {
        fixed_costs: {
          type: "number",
          description: "Total fixed costs (rent, salaries, software, etc.) in dollars",
        },
        price_per_unit: {
          type: "number",
          description: "Selling price per unit (in dollars)",
        },
        variable_cost_per_unit: {
          type: "number",
          description: "Variable cost per unit (materials, shipping, etc.) in dollars",
        },
      },
      required: ["fixed_costs", "price_per_unit", "variable_cost_per_unit"],
    },
  },
  {
    name: "revenue_per_lead",
    description:
      "Calculate Revenue Per Lead (RPL) — the average revenue generated per lead.",
    inputSchema: {
      type: "object",
      properties: {
        total_revenue: {
          type: "number",
          description: "Total revenue generated (in dollars)",
        },
        total_leads: {
          type: "number",
          description: "Total number of leads",
        },
      },
      required: ["total_revenue", "total_leads"],
    },
  },
  {
    name: "email_list_growth_rate",
    description:
      "Calculate Email List Growth Rate — how fast your email list is growing.",
    inputSchema: {
      type: "object",
      properties: {
        new_subscribers: {
          type: "number",
          description: "Number of new subscribers in the period",
        },
        unsubscribes: {
          type: "number",
          description: "Number of unsubscribes in the period",
        },
        starting_list_size: {
          type: "number",
          description: "Total list size at the start of the period",
        },
      },
      required: ["new_subscribers", "unsubscribes", "starting_list_size"],
    },
  },
  {
    name: "character_count",
    description:
      "Count characters in text for social media platforms. Returns character counts and whether text fits each platform's limit.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The text to count characters for",
        },
      },
      required: ["text"],
    },
  },
  {
    name: "email_open_rate",
    description:
      "Calculate Email Open Rate — the percentage of recipients who opened your email.",
    inputSchema: {
      type: "object",
      properties: {
        emails_opened: {
          type: "number",
          description: "Number of emails that were opened",
        },
        emails_sent: {
          type: "number",
          description: "Total number of emails sent",
        },
      },
      required: ["emails_opened", "emails_sent"],
    },
  },
];

// ─── Calculator Logic ─────────────────────────────────────────────────────────

function round(n: number, decimals = 2): number {
  return Math.round(n * 10 ** decimals) / 10 ** decimals;
}

function interpretROI(roi: number): string {
  if (roi >= 400) return "Exceptional — top-tier campaign performance.";
  if (roi >= 200) return "Strong — well above average marketing ROI.";
  if (roi >= 100) return "Good — doubling your investment.";
  if (roi >= 0) return "Positive — profitable but room for improvement.";
  return "Negative — campaign is losing money.";
}

function interpretNPS(nps: number): string {
  if (nps >= 70) return "World-class — exceptional customer loyalty.";
  if (nps >= 50) return "Excellent — strong promoter base.";
  if (nps >= 30) return "Good — healthy but improvable.";
  if (nps >= 0) return "Neutral — more work needed to delight customers.";
  return "Poor — significant dissatisfaction; take action immediately.";
}

function callTool(
  name: string,
  args: Record<string, number | string>
): string {
  switch (name) {
    case "marketing_roi": {
      const { revenue, cost } = args as { revenue: number; cost: number };
      if (cost === 0) return "Error: Cost cannot be zero.";
      const roi = round(((revenue - cost) / cost) * 100);
      const profit = round(revenue - cost);
      return `Marketing ROI: ${roi}%\nProfit: $${profit}\nRevenue: $${revenue} | Cost: $${cost}\nInterpretation: ${interpretROI(roi)}`;
    }

    case "customer_lifetime_value": {
      const { avg_purchase_value, purchase_frequency, customer_lifespan } =
        args as {
          avg_purchase_value: number;
          purchase_frequency: number;
          customer_lifespan: number;
        };
      const clv = round(avg_purchase_value * purchase_frequency * customer_lifespan);
      const annualValue = round(avg_purchase_value * purchase_frequency);
      return `Customer Lifetime Value (CLV): $${clv}\nAnnual Value: $${annualValue}\nAvg Purchase: $${avg_purchase_value} | Frequency: ${purchase_frequency}x/year | Lifespan: ${customer_lifespan} years`;
    }

    case "click_through_rate": {
      const { clicks, impressions } = args as {
        clicks: number;
        impressions: number;
      };
      if (impressions === 0) return "Error: Impressions cannot be zero.";
      const ctr = round((clicks / impressions) * 100);
      const benchmark =
        ctr >= 3
          ? "Above average CTR (industry avg ~2%)."
          : ctr >= 1
          ? "Average CTR — typical for display/search ads."
          : "Below average CTR — consider improving creative or targeting.";
      return `Click-Through Rate (CTR): ${ctr}%\nClicks: ${clicks} | Impressions: ${impressions}\n${benchmark}`;
    }

    case "cost_per_acquisition": {
      const { total_spend, conversions } = args as {
        total_spend: number;
        conversions: number;
      };
      if (conversions === 0) return "Error: Conversions cannot be zero.";
      const cpa = round(total_spend / conversions);
      return `Cost Per Acquisition (CPA): $${cpa}\nTotal Spend: $${total_spend} | Conversions: ${conversions}\nTip: A good CPA depends on your product margin — ensure CPA < average order value.`;
    }

    case "cost_per_lead": {
      const { total_spend, leads } = args as {
        total_spend: number;
        leads: number;
      };
      if (leads === 0) return "Error: Leads cannot be zero.";
      const cpl = round(total_spend / leads);
      return `Cost Per Lead (CPL): $${cpl}\nTotal Spend: $${total_spend} | Leads: ${leads}`;
    }

    case "net_promoter_score": {
      const { promoters, detractors, total_respondents } = args as {
        promoters: number;
        detractors: number;
        total_respondents: number;
      };
      if (total_respondents === 0) return "Error: Total respondents cannot be zero.";
      const promoterPct = (promoters / total_respondents) * 100;
      const detractorPct = (detractors / total_respondents) * 100;
      const nps = round(promoterPct - detractorPct);
      const passives = total_respondents - promoters - detractors;
      return `Net Promoter Score (NPS): ${nps}\nPromoters: ${promoters} (${round(promoterPct)}%) | Passives: ${passives} | Detractors: ${detractors} (${round(detractorPct)}%)\nInterpretation: ${interpretNPS(nps)}`;
    }

    case "conversion_rate": {
      const { conversions, visitors } = args as {
        conversions: number;
        visitors: number;
      };
      if (visitors === 0) return "Error: Visitors cannot be zero.";
      const cr = round((conversions / visitors) * 100);
      const benchmark =
        cr >= 5
          ? "Strong conversion rate (industry avg 2–5%)."
          : cr >= 2
          ? "Average — typical for most industries."
          : "Below average — optimise landing page, CTA, and offer.";
      return `Conversion Rate: ${cr}%\nConversions: ${conversions} | Visitors: ${visitors}\n${benchmark}`;
    }

    case "engagement_rate": {
      const { engagements, followers } = args as {
        engagements: number;
        followers: number;
      };
      if (followers === 0) return "Error: Followers cannot be zero.";
      const er = round((engagements / followers) * 100);
      const benchmark =
        er >= 6
          ? "Excellent engagement (top 10% of accounts)."
          : er >= 3
          ? "Good engagement — above industry average (~1–3%)."
          : er >= 1
          ? "Average engagement — typical for most accounts."
          : "Low engagement — focus on content quality and posting frequency.";
      return `Engagement Rate: ${er}%\nEngagements: ${engagements} | Followers: ${followers}\n${benchmark}`;
    }

    case "profit_margin": {
      const { revenue, cost } = args as { revenue: number; cost: number };
      if (revenue === 0) return "Error: Revenue cannot be zero.";
      const profit = revenue - cost;
      const margin = round((profit / revenue) * 100);
      const benchmark =
        margin >= 30
          ? "High margin — excellent profitability."
          : margin >= 15
          ? "Healthy margin — industry average for most businesses."
          : margin >= 0
          ? "Thin margin — review costs to improve profitability."
          : "Negative margin — selling below cost.";
      return `Profit Margin: ${margin}%\nProfit: $${round(profit)} | Revenue: $${revenue} | Cost: $${cost}\n${benchmark}`;
    }

    case "break_even_point": {
      const { fixed_costs, price_per_unit, variable_cost_per_unit } = args as {
        fixed_costs: number;
        price_per_unit: number;
        variable_cost_per_unit: number;
      };
      const contributionMargin = price_per_unit - variable_cost_per_unit;
      if (contributionMargin <= 0)
        return "Error: Price per unit must be greater than variable cost per unit.";
      const bep = Math.ceil(fixed_costs / contributionMargin);
      const bepRevenue = round(bep * price_per_unit);
      return `Break-Even Point: ${bep} units\nBreak-Even Revenue: $${bepRevenue}\nContribution Margin per Unit: $${round(contributionMargin)}\nFixed Costs: $${fixed_costs} | Price: $${price_per_unit} | Variable Cost: $${variable_cost_per_unit}`;
    }

    case "revenue_per_lead": {
      const { total_revenue, total_leads } = args as {
        total_revenue: number;
        total_leads: number;
      };
      if (total_leads === 0) return "Error: Total leads cannot be zero.";
      const rpl = round(total_revenue / total_leads);
      return `Revenue Per Lead (RPL): $${rpl}\nTotal Revenue: $${total_revenue} | Total Leads: ${total_leads}\nTip: Compare RPL against CPL to assess profitability of lead gen spend.`;
    }

    case "email_list_growth_rate": {
      const { new_subscribers, unsubscribes, starting_list_size } = args as {
        new_subscribers: number;
        unsubscribes: number;
        starting_list_size: number;
      };
      if (starting_list_size === 0) return "Error: Starting list size cannot be zero.";
      const netNew = new_subscribers - unsubscribes;
      const growthRate = round((netNew / starting_list_size) * 100);
      const endingSize = starting_list_size + netNew;
      return `Email List Growth Rate: ${growthRate}%\nEnding List Size: ${endingSize}\nNet New Subscribers: ${netNew} (${new_subscribers} new − ${unsubscribes} unsubs)\nStarting Size: ${starting_list_size}`;
    }

    case "character_count": {
      const { text } = args as { text: string };
      const len = text.length;
      const limits: Record<string, number> = {
        "Twitter/X": 280,
        Instagram: 2200,
        LinkedIn: 3000,
        Facebook: 63206,
      };
      const results = Object.entries(limits)
        .map(
          ([platform, limit]) =>
            `${platform}: ${len}/${limit} chars — ${len <= limit ? "✓ fits" : `✗ ${len - limit} over limit`}`
        )
        .join("\n");
      return `Character Count: ${len}\n\n${results}`;
    }

    case "email_open_rate": {
      const { emails_opened, emails_sent } = args as {
        emails_opened: number;
        emails_sent: number;
      };
      if (emails_sent === 0) return "Error: Emails sent cannot be zero.";
      const openRate = round((emails_opened / emails_sent) * 100);
      const benchmark =
        openRate >= 35
          ? "Exceptional open rate — top-performing campaign."
          : openRate >= 25
          ? "Strong open rate — above industry average (~20–25%)."
          : openRate >= 15
          ? "Average open rate — typical across industries."
          : "Below average — test subject lines, sender name, and send time.";
      return `Email Open Rate: ${openRate}%\nOpened: ${emails_opened} | Sent: ${emails_sent}\n${benchmark}`;
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ─── MCP JSON-RPC Handler ─────────────────────────────────────────────────────

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

function mcpResponse(id: string | number | null, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function mcpError(
  id: string | number | null,
  code: number,
  message: string
) {
  return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } });
}

export async function POST(req: NextRequest) {
  let body: JsonRpcRequest;
  try {
    body = await req.json();
  } catch {
    return mcpError(null, -32700, "Parse error");
  }

  const { id, method, params } = body;

  if (method === "initialize") {
    return mcpResponse(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: {
        name: "marketingai-calculators",
        version: "1.0.0",
      },
    });
  }

  if (method === "notifications/initialized") {
    return new NextResponse(null, { status: 204 });
  }

  if (method === "tools/list") {
    return mcpResponse(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const { name, arguments: toolArgs } = (params ?? {}) as {
      name: string;
      arguments: Record<string, number | string>;
    };
    try {
      const text = callTool(name, toolArgs ?? {});
      return mcpResponse(id, {
        content: [{ type: "text", text }],
      });
    } catch (err) {
      return mcpError(id, -32602, (err as Error).message);
    }
  }

  return mcpError(id, -32601, `Method not found: ${method}`);
}

export async function GET() {
  return NextResponse.json({
    name: "MarketingAI Calculators MCP Server",
    version: "1.0.0",
    description:
      "MCP server exposing 14 marketing calculators as AI-callable tools.",
    tools: TOOLS.map((t) => t.name),
    endpoint: "/api/mcp",
    protocol: "MCP JSON-RPC 2.0 (Streamable HTTP)",
  });
}
