import { z } from 'zod';
import { userSummarySchema } from '@/shared/api/schemas/userSummary.schema';

export const userSchema = userSummarySchema.extend({
  name: z.string().nullable(),
  company: z.string().nullable(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  email: z.union([z.string().email(), z.literal(''), z.null()]),
  public_repos: z.number(),
  created_at: z
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
