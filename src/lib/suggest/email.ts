import { createHash } from "crypto";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  return normalized.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export function hashEmail(email: string): string {
  const salt = process.env.SUGGEST_EMAIL_SALT;
  if (!salt) {
    throw new Error("SUGGEST_EMAIL_SALT is not configured");
  }
  return createHash("sha256").update(`${salt}:${normalizeEmail(email)}`).digest("hex");
}
