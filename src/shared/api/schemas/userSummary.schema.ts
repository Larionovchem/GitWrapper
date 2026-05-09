import { z } from 'zod';

export const userSummarySchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  type: z.enum(['User', 'Organization', 'Bot']),
});
