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
  passwordHash: text("password_hash").notNull(),
  role: text("role").$type<Role>().notNull().default("staff"),
  /** When set, this custom role's permissions replace the built-in role's. */
  customRoleId: uuid("custom_role_id").references(() => customRoles.id, { onDelete: "set null" }),
  status: text("status").$type<UserStatus>().notNull().default("active"),
  /** Software-operator role (see PLATFORM_ROLES in lib/rbac.ts). Only valid for users of the internal Capto workspace. */
  platformRole: text("platform_role"),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
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
    notes: text("notes"),
    /** Checklist items the reviewer confirmed (see REVIEW_CHECKLIST). */
    checklist: jsonb("checklist").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("content_review_events_lesson_idx").on(t.lessonId, t.createdAt), index("content_review_events_created_idx").on(t.createdAt)]
);
export type ContentReviewEvent = typeof contentReviewEvents.$inferSelect;

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
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("research_queries_org_idx").on(t.organizationId, t.createdAt), index("research_queries_user_idx").on(t.userId, t.createdAt)]
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
