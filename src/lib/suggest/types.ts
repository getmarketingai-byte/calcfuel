export const SUGGEST_CATEGORIES = [
  "Social Media",
  "Marketing & Email",
  "Financial",
  "Fuel & Energy",
  "SEO",
  "AI & Developer",
  "Other",
] as const;

export type SuggestCategory = (typeof SUGGEST_CATEGORIES)[number];

export type Suggestion = {
  id: string;
  title: string;
  description: string;
  category: string;
  useCase: string;
  githubIssueNumber: string;
  createdAt: string;
  votes: number;
};

export type PublicSuggestion = {
  id: string;
  title: string;
  description: string;
  category: string;
  useCase: string;
  createdAt: string;
  votes: number;
};
