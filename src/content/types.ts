/*
 * The Capto Learn content model. Pure types — every track under src/content/tracks/<slug>/ exports a
 * `Track` built from these, and scripts/validate-content.ts checks it (ids unique, answers in range,
 * journals balance, sources on the official allowlist).
 *
 * Markdown fields (`md`, `prompt`, `explain`, `narrative`) are GitHub-flavoured markdown. Content is
 * authored in code, so it is version-controlled; the review state that platform admins set in the app
 * lives in the database and overrides `review` here.
 */

export type Level = "foundation" | "practitioner" | "advanced";

export const LEVELS: Record<Level, { label: string; blurb: string }> = {
  foundation: { label: "Foundation", blurb: "New starters and trainees — the core concepts and day-to-day tasks." },
  practitioner: { label: "Practitioner", blurb: "Semi-senior — preparing work end to end with light review." },
  advanced: { label: "Advanced", blurb: "Senior / manager — complex technical areas, planning and judgement calls." },
};

/** One line of a double-entry journal. Exactly one of dr / cr is set, in pounds. */
export interface JournalLine {
  account: string;
  dr?: number;
  cr?: number;
}

export type Block =
  | { kind: "md"; md: string }
  /** tip = practical hint; warning = common mistake / risk; rule = the law or standard itself; example = short worked example */
  | { kind: "callout"; tone: "tip" | "warning" | "rule" | "example"; title?: string; md: string }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "journal"; title?: string; narrative?: string; lines: JournalLine[] };

export interface Source {
  label: string;
  /** Must be on an official / professional-body domain — see SOURCE_DOMAINS. Prefer the most specific page (e.g. the HMRC manual paragraph). */
  url: string;
}

interface ExerciseBase {
  /** Unique within the lesson, kebab-case. Progress is stored against `${lessonId}#${id}`. */
  id: string;
  prompt: string;
  /** Shown after the learner answers — why the answer is right and why the tempting wrong answers are wrong. */
  explain: string;
}

export type Exercise =
  | (ExerciseBase & { kind: "mcq"; options: string[]; /** index into options */ answer: number })
  | (ExerciseBase & { kind: "multi"; options: string[]; /** every correct index */ answers: number[] })
  | (ExerciseBase & {
      kind: "numeric";
      answer: number;
      /** Absolute tolerance; default 0.5 (i.e. to the nearest pound). */
      tolerance?: number;
      unit?: "£" | "%" | "days" | "months" | "";
      /** Optional markdown showing the full working, revealed with the explanation. */
      working?: string;
    })
  | (ExerciseBase & {
      kind: "journal";
      /** Accounts offered in the picker — include the right ones plus plausible distractors. */
      accounts: string[];
      /** The expected entry. Marked as a set: order doesn't matter; each account's net Dr/Cr must match. */
      answer: JournalLine[];
    })
  | (ExerciseBase & {
      kind: "classify";
      categories: string[];
      items: { text: string; /** index into categories */ answer: number; why?: string }[];
    });

export type McqQuestion = Extract<Exercise, { kind: "mcq" }>;

export interface Scenario {
  title: string;
  /** Who the client is and what happened — realistic, UK, with figures. */
  narrative: string;
  /** How a good accountant works through it, step by step. */
  walkthrough: Block[];
}

export interface Lesson {
  /** kebab-case, unique within its track. Full id is `${track}/${slug}`. */
  slug: string;
  title: string;
  level: Level;
  minutes: number;
  summary: string;
  objectives: string[];
  /** Tax year the figures in this lesson use, e.g. "2026/27". Omit if the lesson has no year-specific figures. */
  taxYear?: string;
  body: Block[];
  scenario?: Scenario;
  exercises: Exercise[];
  /** End-of-lesson check. 4–8 questions; 70% passes the lesson. */
  quiz: McqQuestion[];
  sources: Source[];
  /** Everything in code starts as an AI draft; the database records human review. */
  review?: { status: "draft" };
}

export interface Module {
  slug: string;
  title: string;
  level: Level;
  summary: string;
  lessons: Lesson[];
}

export interface Track {
  slug: string;
  title: string;
  /** lucide-react icon name, e.g. "Receipt", "Calculator", "Landmark". */
  icon: string;
  summary: string;
  /** Sort order on the catalogue. */
  order: number;
  modules: Module[];
}

/** Domains a lesson may cite. Official sources first; professional bodies are allowed but should not be the only source for a rule. */
export const SOURCE_DOMAINS = [
  "gov.uk",
  "www.gov.uk",
  "legislation.gov.uk",
  "www.legislation.gov.uk",
  "find-and-update.company-information.service.gov.uk",
  "frc.org.uk",
  "www.frc.org.uk",
  "accaglobal.com",
  "www.accaglobal.com",
  "icaew.com",
  "www.icaew.com",
  "att.org.uk",
  "www.att.org.uk",
  "tax.org.uk",
  "www.tax.org.uk",
  "thepensionsregulator.gov.uk",
  "www.thepensionsregulator.gov.uk",
  "bailii.org",
  "www.bailii.org",
  "financeandtaxtribunals.gov.uk",
] as const;
