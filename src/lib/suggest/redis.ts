import { Redis } from "@upstash/redis";
import type { PublicSuggestion, Suggestion } from "./types";

const SUGGESTIONS_BY_VOTES = "suggestions:by_votes";

function suggestionKey(id: string) {
  return `suggestion:${id}`;
}

function voteKey(id: string, emailHash: string) {
  return `vote:${id}:${emailHash}`;
}

export function getRedis(): Redis {
  // Vercel Marketplace (Upstash for Redis) provisions KV_* names; direct Upstash setups use UPSTASH_*
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("Upstash Redis is not configured");
  }
  return new Redis({ url, token });
}

function toPublic(raw: Record<string, string>, votes: number): PublicSuggestion {
  return {
    id: raw.id ?? "",
    title: raw.title ?? "",
    description: raw.description ?? "",
    category: raw.category ?? "",
    useCase: raw.useCase ?? "",
    createdAt: raw.createdAt ?? "",
    votes,
  };
}

export async function listSuggestions(redis: Redis): Promise<PublicSuggestion[]> {
  const ids = await redis.zrange<string[]>(SUGGESTIONS_BY_VOTES, 0, -1, { rev: true });
  if (!ids.length) return [];

  const pipeline = redis.pipeline();
  for (const id of ids) {
    pipeline.hgetall<Record<string, string>>(suggestionKey(id));
  }
  const results = await pipeline.exec();

  const suggestions: PublicSuggestion[] = [];
  for (let i = 0; i < ids.length; i++) {
    const raw = results[i] as Record<string, string> | null;
    if (!raw || !raw.id) continue;
    const votes = Number(raw.votes ?? 0) || 0;
    suggestions.push(toPublic(raw, votes));
  }
  return suggestions;
}

export async function createSuggestion(
  redis: Redis,
  data: Omit<Suggestion, "votes" | "githubIssueNumber"> & { githubIssueNumber?: string },
  emailHash: string
): Promise<PublicSuggestion> {
  const votes = 1;
  const record: Suggestion = {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.category,
    useCase: data.useCase,
    githubIssueNumber: data.githubIssueNumber ?? "",
    createdAt: data.createdAt,
    votes,
  };

  const pipeline = redis.pipeline();
  pipeline.hset(suggestionKey(record.id), {
    id: record.id,
    title: record.title,
    description: record.description,
    category: record.category,
    useCase: record.useCase,
    githubIssueNumber: record.githubIssueNumber,
    createdAt: record.createdAt,
    votes: String(record.votes),
  });
  pipeline.zadd(SUGGESTIONS_BY_VOTES, { score: votes, member: record.id });
  pipeline.set(voteKey(record.id, emailHash), "1");
  await pipeline.exec();

  return toPublic(
    {
      id: record.id,
      title: record.title,
      description: record.description,
      category: record.category,
      useCase: record.useCase,
      createdAt: record.createdAt,
    },
    votes
  );
}

export async function setGithubIssueNumber(
  redis: Redis,
  id: string,
  githubIssueNumber: number
): Promise<void> {
  await redis.hset(suggestionKey(id), { githubIssueNumber: String(githubIssueNumber) });
}

export async function upvoteSuggestion(
  redis: Redis,
  id: string,
  emailHash: string
): Promise<{ votes: number } | { alreadyVoted: true } | { notFound: true }> {
  const exists = await redis.exists(suggestionKey(id));
  if (!exists) return { notFound: true };

  const voted = await redis.set(voteKey(id, emailHash), "1", { nx: true });
  if (voted === null) return { alreadyVoted: true };

  const votes = await redis.hincrby(suggestionKey(id), "votes", 1);
  await redis.zincrby(SUGGESTIONS_BY_VOTES, 1, id);
  return { votes };
}
