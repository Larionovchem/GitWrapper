import { z } from 'zod';
import { userSummarySchema } from '@/entities/user/api/user.schema';

const eventActorSchema = z.object({
  id: z.number(),
  display_login: z.string(),
  avatar_url: z.string().url(),
});

const eventRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const baseRepoSchema = z.object({
  id: z.number(),
  repo: eventRepoSchema,
  actor: eventActorSchema,
  created_at: z
    .string()
    .datetime()
    .transform((s) => new Date(s)),
});

const pushEventSchema = z.object({
  ...baseRepoSchema,
  type: z.literal('PushEvent'),
  payload: z.object({
    repository_id: z.number(),
    push_id: z.number(),
    ref: z.string(),
  }),
});
const createEventSchema = z.object({
  ...baseRepoSchema,
  type: z.literal('CreateEvent'),
  payload: z.object({
    ref_type: z.enum(['branch', 'tag', 'repository']),
    master_branch: z.string(),
    description: z.string().nullable(),
    ref: z.string().nullable(),
  }),
});
const pullRequestSchema = z.object({
  ...baseRepoSchema,
  type: z.literal('PullRequestEvent'),
  payload: z.object({
    action: z.enum([
      'opened',
      'closed',
      'merged',
      'reopened',
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
    ]),
    pull_request: z.object({
      url: z.string().url(),
      id: z.number(),
      number: z.number(),
    }),
  }),
});

const issuesSchema = z.object({
  ...baseRepoSchema,
  type: z.literal('IssuesEvent'),
  payload: z.object({
    action: z.enum(['opened', 'closed', 'reopened']),
    issues: z.object({
      id: z.number(),
      title: z.string(),
      user: userSummarySchema,
      created_at: z
        .string()
        .datetime()
        .transform((s) => new Date(s)),
      updated_at: z
        .string()
        .datetime()
        .transform((s) => new Date(s)),
    }),
    state: z.enum(['opened', 'closed']),
  }),
});

const issuesCommentSchema = z.object({
  ...baseRepoSchema,
  type: z.literal('IssueCommentEvent'),
  payload: z.object({
    action: z.string(),
    comment: z.object({
      html_url: z.string().url(),
      user: userSummarySchema,
      created_at: z
        .string()
        .datetime()
        .transform((s) => new Date(s)),
      updated_at: z
        .string()
        .datetime()
        .transform((s) => new Date(s)),
      id: z.number(),
      issue_url: z.string().url(),
    }),
  }),
});

const pullRequestReviewEvent = z.object({
  ...baseRepoSchema,
  type: z.literal('PullRequestReviewEvent'),
  action: z.string(),
  pull_request: z.object({
    url: z.string().url(),
    id: z.number(),
    number: z.number(),
  }),
  review: z.object({
    id: z.number(),
    user: userSummarySchema,
    html_url: z.string().url(),
    pull_request_url: z.string().url(),
    submited_at: z
      .string()
      .datetime()
      .transform((s) => new Date(s)),
    updated_at: z
      .string()
      .datetime()
      .transform((s) => new Date(s)),
    commit_id: z.string(),
  }),
});

const pullRequestReviewCommentEvent = z.object({
  ...baseRepoSchema,
  type: z.literal('PullRequestReviewCommentEvent'),
  action: z.string(),
  comment: z.object({
    html_url: z.string().url(),
    user: userSummarySchema,
    created_at: z
      .string()
      .datetime()
      .transform((s) => new Date(s)),
    updated_at: z
      .string()
      .datetime()
      .transform((s) => new Date(s)),
    id: z.number(),
    path: z.string(),
    pull_request_review_id: z.number(),
    diff_hunk: z.string(),
  }),
});
export const eventSchema = z.discriminatedUnion('type', [
  pushEventSchema,
  pullRequestReviewEvent,
  createEventSchema,
  pullRequestSchema,
  issuesSchema,
  issuesCommentSchema,
  pullRequestReviewCommentEvent,
]);

export const eventsSchema = z.array(eventSchema);

export type Event = z.infer<typeof eventSchema>;
