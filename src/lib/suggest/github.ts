const DEFAULT_REPO = "getmarketingai-byte/calcfuel";

type CreateIssueInput = {
  title: string;
  body: string;
  labels?: string[];
};

export async function createSuggestionIssue(
  input: CreateIssueInput
): Promise<{ number: number } | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("[suggest] GITHUB_TOKEN is not configured");
    return null;
  }

  const repo = process.env.GITHUB_REPO || DEFAULT_REPO;
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "calcfuel-suggest",
    },
    body: JSON.stringify({
      title: input.title,
      body: input.body,
      labels: input.labels ?? ["calculator-suggestion"],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[suggest] GitHub issue error:", res.status, err);
    return null;
  }

  const data = (await res.json()) as { number: number };
  return { number: data.number };
}

export function buildIssueBody(fields: {
  id: string;
  title: string;
  description: string;
  category: string;
  useCase: string;
  createdAt: string;
}): string {
  const lines = [
    `**Suggestion ID:** \`${fields.id}\``,
    `**Category:** ${fields.category || "Not specified"}`,
    "",
    "## What should it calculate?",
    fields.description,
  ];

  if (fields.useCase.trim()) {
    lines.push("", "## Use case", fields.useCase);
  }

  lines.push(
    "",
    "---",
    `Submitted via [calcfuel.com/suggest](https://calcfuel.com/suggest) at ${fields.createdAt}`
  );

  return lines.join("\n");
}
