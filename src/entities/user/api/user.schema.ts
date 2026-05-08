import { z } from 'zod';

export const userSummarySchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  type: z.enum(['User', 'Organization', 'Bot']),
});

export const userSchema = userSummarySchema.extend({
  name: z.string().nullable(),
  company: z.string().nullable(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  email: z.string().email().nullable(),
  public_repos: z.number(),
  create_at: z
    .string()
    .datetime()
    .transform((s) => new Date(s)),
  updated_at: z
    .string()
    .datetime()
    .transform((s) => new Date(s)),
});

export type User = z.infer<typeof userSchema>;
export type UserSummary = z.infer<typeof userSummarySchema>;
