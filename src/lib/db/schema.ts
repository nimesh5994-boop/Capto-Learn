import { sql } from "drizzle-orm";
import { boolean, customType, index, integer, jsonb, numeric, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import type { ResearchAnswer } from "@/lib/research/types";

export type Role = "owner" | "admin" | "manager" | "staff" | "viewer";
export type OrgStatus = "active" | "suspended";
/** "internal" = the Capto operator's own workspace: never billed, never on trial, excluded from customer metrics. */
export type OrgKind = "customer" | "internal";
export type UserStatus = "active" | "deactivated";

/** A firm — the tenant. Every other firm-scoped row hangs off one of these. */
export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  address: text("address"),
  brandColor: text("brand_color").notNull().default("#a01f62"),
  /** Small logo stored inline as a data: URL (capped at upload). */
  logoDataUrl: text("logo_data_url"),
  /** SaaS subscription — see lib/plans.ts. New firms start on a time-boxed trial. */
  plan: text("plan").notNull().default("trial"),
  kind: text("kind").$type<OrgKind>().notNull().default("customer"),
  trialEndsAt: timestamp("trial_ends_at", { withTimezone: true }),
  status: text("status").$type<OrgStatus>().notNull().default("active"),
  suspendedReason: text("suspended_reason"),
  /** Platform-set per-firm overrides (see orgHasFeature / orgLimits in lib/plans.ts). */
  featureOverrides: jsonb("feature_overrides").$type<Partial<Record<string, boolean>>>().notNull().default({}),
  /** Skills check: time allowed per subject, and how often staff are prompted to take a fresh check. */
  skillCheckMinutesPerSubject: integer("skill_check_minutes_per_subject").notNull().default(2),
  skillCheckRetakeMonths: integer("skill_check_retake_months").notNull().default(6),
  /** Firm join link (/join/<code>): on/off, the role new joiners get, and email domains let straight in. */
  joinCode: text("join_code").unique(),
  joinEnabled: boolean("join_enabled").notNull().default(false),
  joinRole: text("join_role").notNull().default("staff"),
  joinDomains: jsonb("join_domains").$type<string[]>().notNull().default([]),
  limitOverrides: jsonb("limit_overrides").$type<{ maxUsers?: number | null; maxResearchPerMonth?: number | null }>().notNull().default({}),
  /** Negotiated monthly price (ex VAT) replacing the plan's list price; null = list price. */
  customMonthlyPrice: numeric("custom_monthly_price", { mode: "number" }),
  billingEmail: text("billing_email"),
  /** Capto-only notes about the firm — never shown to the firm. */
  platformNotes: text("platform_notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  jobTitle: text("job_title"),
  phone: text("phone"),
  /** Professional qualifications, e.g. "CTA, ACA" — shown when this person signs off content. */
  qualifications: text("qualifications"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").$type<Role>().notNull().default("staff"),
  /** When set, this custom role's permissions replace the built-in role's. */
  customRoleId: uuid("custom_role_id").references(() => customRoles.id, { onDelete: "set null" }),
  status: text("status").$type<UserStatus>().notNull().default("active"),
  /** Software-operator role (see PLATFORM_ROLES in lib/rbac.ts). Only valid for users of the internal Capto workspace. */
  platformRole: text("platform_role"),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  /** Weekly "what changed" email: on by default; topics are course slugs (empty = the courses they've studied). */
  digestEnabled: boolean("digest_enabled").notNull().default(true),
  digestTopics: jsonb("digest_topics").$type<string[]>().notNull().default([]),
  digestSentAt: timestamp("digest_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const customRoles = pgTable(
  "custom_roles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    permissions: jsonb("permissions").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("custom_roles_org_idx").on(t.organizationId)]
);

export const invitations = pgTable(
  "invitations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role").$type<Role>().notNull(),
    customRoleId: uuid("custom_role_id").references(() => customRoles.id, { onDelete: "set null" }),
    /** Platform role granted on acceptance (internal Capto workspace only), e.g. "content_reviewer". */
    platformRole: text("platform_role"),
    /** sha256 of the token in the link — the raw token is only ever shown once. */
    tokenHash: text("token_hash").notNull().unique(),
    invitedBy: uuid("invited_by").references(() => users.id, { onDelete: "set null" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("invitations_org_idx").on(t.organizationId)]
);

/** Platform-issued invitation for a NEW firm to sign up — the only way in besides platform admins (signup is invite-only). */
export const firmInvitations = pgTable("firm_invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  firmName: text("firm_name").notNull(),
  plan: text("plan").notNull().default("trial"),
  tokenHash: text("token_hash").notNull().unique(),
  invitedByEmail: text("invited_by_email").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const passwordResets = pgTable("password_resets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Firm-level audit trail of security-relevant changes (roles, team, plan, assignments). */
export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),
    actorName: text("actor_name"),
    action: text("action").notNull(),
    summary: text("summary").notNull(),
    targetType: text("target_type"),
    targetId: text("target_id"),
    ip: text("ip"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("audit_log_org_idx").on(t.organizationId, t.createdAt)]
);

/* ───────────────────────────── Learning ───────────────────────────── */

export type LessonStatus = "started" | "completed";

/** One row per learner per lesson. `lessonId` is `${track}/${lessonSlug}` (content lives in code). */
export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    trackSlug: text("track_slug").notNull(),
    status: text("status").$type<LessonStatus>().notNull().default("started"),
    /** Exercise ids answered correctly at least once. */
    exercisesCorrect: jsonb("exercises_correct").$type<string[]>().notNull().default([]),
    lastQuizScore: integer("last_quiz_score"),
    bestQuizScore: integer("best_quiz_score"),
    quizAttempts: integer("quiz_attempts").notNull().default(0),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("lesson_progress_user_lesson_uq").on(t.userId, t.lessonId), index("lesson_progress_org_idx").on(t.organizationId)]
);

/** Every submitted answer — drives "questions people get wrong" insight for managers and content reviewers. */
export const exerciseAttempts = pgTable(
  "exercise_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    exerciseId: text("exercise_id").notNull(),
    correct: boolean("correct").notNull(),
    response: jsonb("response"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("exercise_attempts_lesson_idx").on(t.lessonId, t.exerciseId), index("exercise_attempts_user_idx").on(t.userId)]
);

/**
 * Daily 5 spaced review: one row per learner per quiz question they've met. Leitner boxes 1–5 — a right answer
 * moves the card up a box (seen again later), a wrong one sends it back to box 1 (seen again tomorrow).
 */
export const reviewItems = pgTable(
  "review_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull(),
    questionId: text("question_id").notNull(),
    box: integer("box").notNull().default(1),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
    reviews: integer("reviews").notNull().default(0),
    lapses: integer("lapses").notNull().default(0),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("review_items_user_q_uq").on(t.userId, t.lessonId, t.questionId), index("review_items_due_idx").on(t.userId, t.dueAt)]
);

/** A completed skills check (starting assessment): per-subject results and the suggested starting level. */
export const skillChecks = pgTable(
  "skill_checks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    results: jsonb("results").$type<Record<string, { right: number; total: number; start: "foundation" | "practitioner" | "advanced"; strong: boolean }>>().notNull(),
    /** Area chosen (see AREAS), or null for a custom set of subjects. */
    area: text("area"),
    /** Question keys asked, so the next check rotates to fresh ones. */
    asked: jsonb("asked").$type<string[]>().notNull().default([]),
    /** Subjects chosen but not reached before the time limit. */
    notReached: jsonb("not_reached").$type<string[]>().notNull().default([]),
    timedOut: boolean("timed_out").notNull().default(false),
    durationSeconds: integer("duration_seconds"),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("skill_checks_user_idx").on(t.userId, t.completedAt)]
);
export type SkillCheck = typeof skillChecks.$inferSelect;

export type AssignmentTarget = "track" | "module" | "lesson";

/** A manager assigning training to a team member, with an optional due date. Completion is derived from lesson_progress. */
export const assignments = pgTable(
  "assignments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    targetType: text("target_type").$type<AssignmentTarget>().notNull(),
    /** track slug, `${track}/${module}` or `${track}/${lesson}` */
    targetId: text("target_id").notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }),
    note: text("note"),
    assignedBy: uuid("assigned_by").references(() => users.id, { onDelete: "set null" }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("assignments_org_idx").on(t.organizationId), index("assignments_user_idx").on(t.userId)]
);

export type ReviewStatus = "draft" | "reviewed" | "needs_changes";

/**
 * Platform-level (not per-firm) technical review of a lesson. `contentHash` pins the exact lesson content
 * that was reviewed — if the lesson changes afterwards it shows as "changed since review" until re-reviewed.
 */
export const contentReviews = pgTable("content_reviews", {
  lessonId: text("lesson_id").primaryKey(),
  status: text("status").$type<ReviewStatus>().notNull().default("draft"),
  contentHash: text("content_hash"),
  reviewerUserId: uuid("reviewer_user_id").references(() => users.id, { onDelete: "set null" }),
  reviewerName: text("reviewer_name"),
  /** The reviewer's qualifications at the time of sign-off (e.g. "CTA, ACA"). */
  reviewerCredentials: text("reviewer_credentials"),
  notes: text("notes"),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Every review decision ever made (content_reviews keeps only the latest) — the approvals register. */
export const contentReviewEvents = pgTable(
  "content_review_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lessonId: text("lesson_id").notNull(),
    status: text("status").$type<ReviewStatus>().notNull(),
    contentHash: text("content_hash").notNull(),
    reviewerUserId: uuid("reviewer_user_id").references(() => users.id, { onDelete: "set null" }),
    reviewerName: text("reviewer_name"),
    reviewerCredentials: text("reviewer_credentials"),
    notes: text("notes"),
    /** Checklist items the reviewer confirmed (see REVIEW_CHECKLIST). */
    checklist: jsonb("checklist").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("content_review_events_lesson_idx").on(t.lessonId, t.createdAt), index("content_review_events_created_idx").on(t.createdAt)]
);
export type ContentReviewEvent = typeof contentReviewEvents.$inferSelect;

/** What the Level 1 question bot made of each free search, and how people rated it — the learning loop. */
export const botEvents = pgTable(
  "bot_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    question: text("question").notNull(),
    /** Concept, intent and course the bot understood (null concept = not recognised). */
    concept: text("concept"),
    intent: text("intent").notNull(),
    topic: text("topic"),
    /** The instant answer shown, if any. */
    answer: text("answer"),
    lessonId: text("lesson_id"),
    helpful: boolean("helpful"),
    note: text("note"),
    /** Set by a reviewer once dealt with (taught, added to the exam, or not needed). */
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("bot_events_created_idx").on(t.createdAt)]
);
export type BotEvent = typeof botEvents.$inferSelect;

/** Wording reviewers have taught the bot: "when people say X, they mean concept Y". Used on top of the glossary. */
export const botAliases = pgTable(
  "bot_aliases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    alias: text("alias").notNull(),
    concept: text("concept").notNull(),
    createdByName: text("created_by_name"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("bot_aliases_alias_uq").on(t.alias)]
);
export type BotAlias = typeof botAliases.$inferSelect;

/**
 * Answers the question bot has learned: verified, high-confidence Ask Capto answers it can serve again at
 * Level 1 for free (after re-checking that the official sources are unchanged). Retired on a 👎 or a source change.
 */
export const botKnowledge = pgTable(
  "bot_knowledge",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    concept: text("concept").notNull(),
    intent: text("intent").notNull(),
    question: text("question").notNull(),
    answer: jsonb("answer").$type<import("@/lib/research/types").ResearchAnswer>().notNull(),
    /** Official source URL → last-updated date when answered. */
    sourceVersions: jsonb("source_versions").$type<Record<string, string | null>>().notNull().default({}),
    researchQueryId: uuid("research_query_id"),
    uses: integer("uses").notNull().default(0),
    retiredAt: timestamp("retired_at", { withTimezone: true }),
    retiredReason: text("retired_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("bot_knowledge_concept_idx").on(t.concept, t.intent)]
);
export type BotKnowledge = typeof botKnowledge.$inferSelect;

/** Someone who used the firm's join link with an email outside its auto-approved domains: waits for an admin. */
export const joinRequests = pgTable(
  "join_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    status: text("status").$type<"pending" | "approved" | "declined">().notNull().default("pending"),
    decidedByName: text("decided_by_name"),
    decidedAt: timestamp("decided_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("join_requests_org_idx").on(t.organizationId, t.status)]
);
export type JoinRequest = typeof joinRequests.$inferSelect;

export type InterviewStatus = "ready" | "started" | "completed" | "revoked";

/**
 * A knowledge test for a job applicant. No account: the candidate opens a single-use link (or enters a short
 * code), signs a no-AI declaration, and sits a timed test. The browser is locked to the first device that starts
 * it; leaving the page, exiting full screen and paste attempts are logged for the integrity report.
 */
export const interviewTests = pgTable(
  "interview_tests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    createdById: uuid("created_by_id").references(() => users.id, { onDelete: "set null" }),
    createdByName: text("created_by_name"),
    candidateName: text("candidate_name").notNull(),
    candidateEmail: text("candidate_email"),
    role: text("role"),
    tracks: jsonb("tracks").$type<string[]>().notNull(),
    difficulty: text("difficulty").$type<"trainee" | "experienced" | "senior">().notNull().default("experienced"),
    questionCount: integer("question_count").notNull(),
    minutes: integer("minutes").notNull(),
    tokenHash: text("token_hash").notNull(),
    code: text("code").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    status: text("status").$type<InterviewStatus>().notNull().default("ready"),
    /** Hash of the cookie set on the device that started the test — only that device can continue it. */
    sessionHash: text("session_hash"),
    declaration: jsonb("declaration").$type<{ name: string; at: string; ip: string | null; userAgent: string | null; statements: string[] }>(),
    questions: jsonb("questions").$type<{ lessonId: string; questionId: string; track: string; level: "foundation" | "practitioner" | "advanced" }[]>().notNull().default([]),
    answers: jsonb("answers").$type<Record<string, { choice: number; at: string }>>().notNull().default({}),
    events: jsonb("events").$type<{ t: string; type: string; ms?: number }[]>().notNull().default([]),
    score: integer("score"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    deadlineAt: timestamp("deadline_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("interview_tests_org_idx").on(t.organizationId, t.createdAt), uniqueIndex("interview_tests_token_uq").on(t.tokenHash), index("interview_tests_code_idx").on(t.code)]
);
export type InterviewTest = typeof interviewTests.$inferSelect;

export type FeedbackKind = "error" | "out_of_date" | "unclear" | "suggestion";
export type FeedbackStatus = "open" | "fixed" | "dismissed";

/** Learners flagging a problem with a lesson — routed to platform content reviewers across all firms. */
export const lessonFeedback = pgTable(
  "lesson_feedback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    lessonId: text("lesson_id").notNull(),
    kind: text("kind").$type<FeedbackKind>().notNull(),
    message: text("message").notNull(),
    status: text("status").$type<FeedbackStatus>().notNull().default("open"),
    resolvedNote: text("resolved_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("lesson_feedback_lesson_idx").on(t.lessonId), index("lesson_feedback_status_idx").on(t.status)]
);

/* ───────────────────────────── Research ───────────────────────────── */

export type ResearchStatus = "answered" | "no_sources" | "failed";

export const researchQueries = pgTable(
  "research_queries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    question: text("question").notNull(),
    status: text("status").$type<ResearchStatus>().notNull(),
    answer: jsonb("answer").$type<ResearchAnswer>(),
    error: text("error"),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    /** Estimated Anthropic API cost of this question in millionths of a US dollar (per-model, cache-aware). */
    costMicros: integer("cost_micros").notNull().default(0),
    /** How the answer was produced: "library" (reused), "sonnet", "opus", or "sonnet>opus" (escalated). */
    route: text("route"),
    durationMs: integer("duration_ms"),
    /** Learner's rating of the answer: true = helpful, false = not. */
    helpful: boolean("helpful"),
    feedbackNote: text("feedback_note"),
    shared: boolean("shared").notNull().default(false),
    /** Firm review (research register): "approved" answers are reused first and visible firm-wide; "changes" stops reuse. */
    reviewStatus: text("review_status").$type<ResearchReviewStatus>(),
    reviewedById: uuid("reviewed_by_id").references(() => users.id, { onDelete: "set null" }),
    reviewedByName: text("reviewed_by_name"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewNote: text("review_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("research_queries_org_idx").on(t.organizationId, t.createdAt), index("research_queries_user_idx").on(t.userId, t.createdAt)]
);

export type ResearchReviewStatus = "approved" | "changes";

/** Every Word/PDF report issued from an answer: the research register's record of documents. */
export const researchExports = pgTable(
  "research_exports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    userName: text("user_name").notNull(),
    queryId: uuid("query_id").notNull().references(() => researchQueries.id, { onDelete: "cascade" }),
    docRef: text("doc_ref").notNull(),
    format: text("format").$type<"docx" | "pdf">().notNull(),
    /** Client / matter written on the document, as it was when issued. */
    reference: text("reference").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("research_exports_org_idx").on(t.organizationId, t.createdAt), index("research_exports_query_idx").on(t.queryId)]
);

export type BenchmarkVerdict = "correct" | "partial" | "wrong";

/**
 * Accuracy benchmark: real practice questions with model answers set by qualified reviewers. Ask Capto answers
 * them fresh and a reviewer grades each answer; the latest score is published on the editorial page.
 */
export const benchmarkQuestions = pgTable("benchmark_questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  modelAnswer: text("model_answer").notNull(),
  /** Course slug the question belongs to. */
  area: text("area").notNull(),
  createdByName: text("created_by_name").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const benchmarkResults = pgTable(
  "benchmark_results",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    questionId: uuid("question_id").notNull().references(() => benchmarkQuestions.id, { onDelete: "cascade" }),
    queryId: uuid("query_id").references(() => researchQueries.id, { onDelete: "set null" }),
    verdict: text("verdict").$type<BenchmarkVerdict>(),
    note: text("note"),
    gradedByName: text("graded_by_name"),
    gradedByCredentials: text("graded_by_credentials"),
    gradedAt: timestamp("graded_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("benchmark_results_question_idx").on(t.questionId, t.createdAt)]
);

/**
 * A learner's saved Ask Capto answers ("Saved research"): reopened free, titled and labelled for a client or job,
 * and exportable as a Word or PDF report. `sourceVersions` pins each official source's last-updated date at save
 * time, so the list can flag answers whose guidance has changed since.
 */
export const savedResearch = pgTable(
  "saved_research",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    queryId: uuid("query_id").notNull().references(() => researchQueries.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    /** Client name, job or file reference — free text, shown on the report. */
    reference: text("reference").notNull().default(""),
    note: text("note").notNull().default(""),
    sourceVersions: jsonb("source_versions").$type<Record<string, string | null>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("saved_research_user_query_idx").on(t.userId, t.queryId), index("saved_research_org_idx").on(t.organizationId, t.createdAt)]
);

/**
 * Ask Capto answer library — verified answers a firm can reuse instead of paying for fresh research.
 * Firm-scoped: questions can contain client facts, so answers are never shared across firms.
 * `sourceVersions` pins each cited page's GOV.UK last-updated date; if any page has changed since, the entry
 * is not reused (and is retired) — so a reused answer is never older than the guidance behind it.
 */
export const answerLibrary = pgTable(
  "answer_library",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
    question: text("question").notNull(),
    restatedQuestion: text("restated_question").notNull(),
    answer: jsonb("answer").$type<ResearchAnswer>().notNull(),
    sourceVersions: jsonb("source_versions").$type<Record<string, string | null>>().notNull(),
    originQueryId: uuid("origin_query_id").references(() => researchQueries.id, { onDelete: "set null" }),
    hits: integer("hits").notNull().default(0),
    lastHitAt: timestamp("last_hit_at", { withTimezone: true }),
    /** Set when a cited source changed or a learner rated a (re)used answer unhelpful. */
    retiredAt: timestamp("retired_at", { withTimezone: true }),
    retiredReason: text("retired_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("answer_library_org_idx").on(t.organizationId, t.createdAt)]
);

export type BriefStatus = "pending" | "published" | "failed" | "retired";

/**
 * Capto topic briefs — written overnight by the Librarian bot (Anthropic Message Batches, half price) for common,
 * fact-free practice questions, quote-verified like any answer, then served to every firm for free until one of
 * their official sources changes. Platform-wide: briefs contain only official guidance, never client data.
 */
export const topicBriefs = pgTable(
  "topic_briefs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    topicKey: text("topic_key").notNull(),
    area: text("area").notNull(),
    question: text("question").notNull(),
    restatedQuestion: text("restated_question").notNull().default(""),
    status: text("status").$type<BriefStatus>().notNull().default("pending"),
    answer: jsonb("answer").$type<ResearchAnswer>(),
    sourceVersions: jsonb("source_versions").$type<Record<string, string | null>>().notNull().default({}),
    /** Sources + full texts kept while the batch is running, for quote verification; cleared afterwards. */
    prepared: jsonb("prepared").$type<{ plan: unknown; sources: unknown[]; texts: Record<string, string> } | null>(),
    batchId: text("batch_id"),
    costMicros: integer("cost_micros").notNull().default(0),
    hits: integer("hits").notNull().default(0),
    failureReason: text("failure_reason"),
    retiredReason: text("retired_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (t) => [index("topic_briefs_topic_idx").on(t.topicKey), index("topic_briefs_status_idx").on(t.status)]
);

/* ───────────────────── Capto Knowledge Base (mirrored official guidance) ───────────────────── */

const tsvector = customType<{ data: string }>({ dataType: () => "tsvector" });

export type KbKind = "manual_section" | "guidance" | "legislation";

/**
 * One official page mirrored from GOV.UK (HMRC manuals, HMRC/Companies House guidance). Crown copyright,
 * reused under the Open Government Licence — always shown with its source link. Kept current by the sync bot,
 * which compares GOV.UK's public timestamp and only re-downloads changed pages.
 */
export const kbDocuments = pgTable(
  "kb_documents",
  {
    url: text("url").primaryKey(),
    kind: text("kind").$type<KbKind>().notNull(),
    /** Manual slug (e.g. "vat-input-tax") or publishing organisation (e.g. "hm-revenue-customs"). */
    collection: text("collection").notNull(),
    title: text("title").notNull(),
    publisher: text("publisher").notNull(),
    sourceUpdatedAt: timestamp("source_updated_at", { withTimezone: true }),
    contentHash: text("content_hash").notNull(),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
    /** Set when the page disappears from GOV.UK; kept for audit but never searched. */
    removedAt: timestamp("removed_at", { withTimezone: true }),
  },
  (t) => [index("kb_documents_collection_idx").on(t.collection)]
);

export const kbPassages = pgTable(
  "kb_passages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentUrl: text("document_url")
      .notNull()
      .references(() => kbDocuments.url, { onDelete: "cascade" }),
    ord: integer("ord").notNull(),
    heading: text("heading"),
    body: text("body").notNull(),
    /** Headings weigh more than body text in ranking. */
    tsv: tsvector("tsv")
      .notNull()
      .generatedAlwaysAs(sql`setweight(to_tsvector('english', coalesce(heading, '')), 'A') || setweight(to_tsvector('english', body), 'B')`),
  },
  (t) => [index("kb_passages_doc_idx").on(t.documentUrl), index("kb_passages_tsv_idx").using("gin", t.tsv)]
);

/**
 * How many passages each search term (Postgres lexeme) appears in — rebuilt after each sync that changes content.
 * Lets search skip ultra-common terms ("tax", "vat") when gathering candidates, which keeps queries fast.
 */
export const kbTerms = pgTable("kb_terms", {
  word: text("word").primaryKey(),
  ndoc: integer("ndoc").notNull(),
});

export type KbSyncStatus = "running" | "done" | "partial" | "failed";

/** Audit trail of the sync bot: what it checked, what changed, which lessons cite changed pages. */
export const kbSyncRuns = pgTable("kb_sync_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  trigger: text("trigger").notNull(),
  status: text("status").$type<KbSyncStatus>().notNull().default("running"),
  listed: integer("listed").notNull().default(0),
  added: integer("added").notNull().default(0),
  updated: integer("updated").notNull().default(0),
  removed: integer("removed").notNull().default(0),
  failed: integer("failed").notNull().default(0),
  /** Lesson ids whose cited sources changed in this run (for the content reviewers). */
  lessonsAffected: jsonb("lessons_affected").$type<string[]>().notNull().default([]),
  libraryRetired: integer("library_retired").notNull().default(0),
  note: text("note"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
});

/**
 * Case law index built from our own knowledge base: every court or tribunal decision the mirrored HMRC manuals
 * and GOV.UK guidance cite, with the pages that cite it. Rebuilt from kb_passages (rebuildCaseIndex) after a
 * sync that changes content. Judgments themselves are never fetched: `url` is a Find Case Law link built from
 * the citation, or a Find Case Law search link.
 */
export const caseRefs = pgTable(
  "case_refs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** Normalised primary citation, e.g. "[2016] ukut 69" or "43 tc 1". */
    key: text("key").notNull(),
    /** "X v Y", or the primary citation when no source names the case. */
    name: text("name").notNull(),
    citations: jsonb("citations").$type<string[]>().notNull().default([]),
    url: text("url").notNull(),
    linkKind: text("link_kind").$type<"judgment" | "search">().notNull(),
    year: integer("year"),
    /** Court code as in a neutral citation, e.g. "UKUT (TCC)" (see COURTS in lib/cases/caseRefs). */
    court: text("court"),
    /** Up to 50 citing pages. */
    mentions: jsonb("mentions").$type<{ url: string; title: string }[]>().notNull().default([]),
    /** Every citing page (may exceed the 50 listed). */
    mentionCount: integer("mention_count").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("case_refs_key_idx").on(t.key), index("case_refs_count_idx").on(t.mentionCount)]
);

/** Shared cache of fetched official pages (public, OGL content — not firm data). */
export const sourceCache = pgTable(
  "source_cache",
  {
    url: text("url").notNull(),
    title: text("title").notNull(),
    publisher: text("publisher").notNull(),
    /** Plain text, paragraph-separated, used for retrieval and quote verification. */
    text: text("text").notNull(),
    /** When the publisher says the page last changed (GOV.UK public_updated_at), if known. */
    sourceUpdatedAt: timestamp("source_updated_at", { withTimezone: true }),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.url] })]
);

export type Organization = typeof organizations.$inferSelect;
export type User = typeof users.$inferSelect;
export type CustomRole = typeof customRoles.$inferSelect;
export type Invitation = typeof invitations.$inferSelect;
export type FirmInvitation = typeof firmInvitations.$inferSelect;
export type AuditEntry = typeof auditLog.$inferSelect;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type Assignment = typeof assignments.$inferSelect;
export type ContentReview = typeof contentReviews.$inferSelect;
export type LessonFeedback = typeof lessonFeedback.$inferSelect;
export type ResearchQuery = typeof researchQueries.$inferSelect;
export type LibraryEntry = typeof answerLibrary.$inferSelect;
export type TopicBrief = typeof topicBriefs.$inferSelect;
