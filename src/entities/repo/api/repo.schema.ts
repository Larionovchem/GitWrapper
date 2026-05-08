import { z } from 'zod';
import { userSummarySchema } from '@/entities/user/api/user.schema';

const licenseSchema = z
  .object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),
    url: z.string().url().nullable(),
  })
  .nullable();

export const repoSchema = z.object({
  id: z.number(),
  owner: userSummarySchema,
  license: licenseSchema,
  name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable(),
  languages: z.string().nullable(),
  watchers_count: z.number(),
  stargazers_count: z.number(),
  created_at: z
    .string()
    .datetime()
    .transform((s) => new Date(s)),
  updated_at: z
    .string()
    .datetime()
    .transform((s) => new Date(s)),
  pushed_at: z
    .string()
    .datetime()
    .nullable()
    .transform((s) => (s ? new Date(s) : null)),
});

export const reposSchema = z.array(repoSchema);

export type Repo = z.infer<typeof repoSchema>;
