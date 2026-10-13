/*
 * Skills check — a short starting assessment for new staff. One quiz question per level (Foundation,
 * Practitioner, Advanced) from each chosen subject, drawn from the lessons' own quizzes, so it costs nothing to run.
 * The result suggests where to start in each subject. Pure and unit-tested.
 */
import { createHash } from "node:crypto";

export type Level = "foundation" | "practitioner" | "advanced";
export const PLACEMENT_LEVELS: Level[] = ["foundation", "practitioner", "advanced"];

export interface PlacementPoolTrack {
  slug: string;
  lessons: { id: string; level: Level; questionIds: string[] }[];
}

export interface PlacementQuestion {
  track: string;
  level: Level;
  lessonId: string;
  questionId: string;
}

const rank = (seed: string, key: string) => createHash("sha256").update(`${seed}|${key}`).digest("hex");

/** The questions for a check: per subject, one per level, chosen pseudo-randomly but repeatably from `seed`. */
export function pickPlacement(pool: PlacementPoolTrack[], slugs: string[], seed: string): PlacementQuestion[] {
  const out: PlacementQuestion[] = [];
  for (const t of pool.filter((p) => slugs.includes(p.slug))) {
    for (const level of PLACEMENT_LEVELS) {
      const candidates = t.lessons.filter((l) => l.level === level).flatMap((l) => l.questionIds.map((q) => ({ lessonId: l.id, questionId: q })));
      if (!candidates.length) continue;
      const best = candidates.reduce((a, b) => (rank(seed, `${b.lessonId}#${b.questionId}`) < rank(seed, `${a.lessonId}#${a.questionId}`) ? b : a));
      out.push({ track: t.slug, level, ...best });
    }
  }
  return out;
}

export interface SubjectResult {
  right: number;
  total: number;
  /** Where to start: the first level answered wrongly, working up from Foundation. */
  start: Level;
  /** Every level answered correctly — could go straight to the advanced lessons. */
  strong: boolean;
}

export function placeSubject(answers: { level: Level; correct: boolean }[]): SubjectResult {
  const byLevel = new Map(answers.map((a) => [a.level, a.correct]));
  let start: Level = "foundation";
  let strong = true;
  for (const lv of PLACEMENT_LEVELS) {
    if (!byLevel.has(lv)) continue;
    start = lv;
    if (!byLevel.get(lv)) {
      strong = false;
      break;
    }
  }
  return { right: answers.filter((a) => a.correct).length, total: answers.length, start, strong };
}

/** Subjects in the order to tackle them: weakest first, then alphabetical. */
export function suggestedOrder(results: Record<string, SubjectResult>): string[] {
  return Object.keys(results).sort((a, b) => results[a].right / results[a].total - results[b].right / results[b].total || a.localeCompare(b));
}

/* ───────────── Adaptive skills check ─────────────
 * Each subject starts with a Practitioner question. Right → an Advanced one; wrong → a Foundation one. A third
 * question is asked only when the result is borderline (Practitioner right, Advanced wrong), to confirm it.
 * Questions rotate: anything the person saw in an earlier check is skipped while fresh questions remain.
 */

export interface Area {
  key: string;
  label: string;
  blurb: string;
  /** Course slugs; empty = every course. */
  tracks: string[];
}

export const AREAS: Area[] = [
  { key: "accounts", label: "Accounts & bookkeeping", blurb: "Double entry, bookkeeping, year end and accounts production", tracks: ["foundations", "bookkeeping", "accounts-production"] },
  { key: "business-tax", label: "Business tax", blurb: "Corporation tax, VAT, directors, R&D, CIS and IR35", tracks: ["corporation-tax", "vat", "directors", "rd", "cis", "ir35"] },
  { key: "personal-tax", label: "Personal & capital taxes", blurb: "Self Assessment, income tax, CGT and IHT", tracks: ["personal-tax", "capital-taxes"] },
  { key: "payroll", label: "Payroll & pensions", blurb: "PAYE, RTI, statutory pay, benefits and auto-enrolment", tracks: ["payroll", "pensions"] },
  { key: "cosec-practice", label: "Company secretarial & practice", blurb: "Companies House filings, AML, ethics and engagement", tracks: ["cosec", "practice"] },
  { key: "all", label: "Everything", blurb: "A full check across all 15 subjects", tracks: [] },
];

export interface AskedAnswer {
  key: string;
  track: string;
  level: Level;
  correct: boolean;
}

export interface NextQuestion extends PlacementQuestion {
  key: string;
}

/** The level to ask next in one subject, or null when the subject is settled. */
export function nextLevel(answers: { level: Level; correct: boolean }[], available: Set<Level>): Level | null {
  const has = (l: Level) => available.has(l);
  if (!answers.length) return has("practitioner") ? "practitioner" : has("foundation") ? "foundation" : has("advanced") ? "advanced" : null;
  const [a1, a2] = answers;
  if (answers.length === 1) {
    if (a1.level === "practitioner") return a1.correct ? (has("advanced") ? "advanced" : null) : has("foundation") ? "foundation" : null;
    if (a1.level === "foundation") return a1.correct && has("practitioner") ? "practitioner" : null;
    return null;
  }
  // Borderline: right at Practitioner, wrong at Advanced — one more Practitioner question to confirm.
  if (answers.length === 2 && a1.level === "practitioner" && a1.correct && a2.level === "advanced" && !a2.correct) return "practitioner";
  return null;
}

/** Where to start, from an adaptive set of answers in one subject. */
export function placeAdaptive(answers: { level: Level; correct: boolean }[]): SubjectResult {
  const right = answers.filter((a) => a.correct).length;
  const base = { right, total: answers.length };
  const [a1, a2, a3] = answers;
  if (!a1) return { ...base, start: "foundation", strong: false };
  if (a1.level === "practitioner") {
    if (a1.correct) {
      if (!a2) return { ...base, start: "advanced", strong: false };
      if (a2.correct) return { ...base, start: "advanced", strong: true };
      return { ...base, start: a3 && !a3.correct ? "practitioner" : "advanced", strong: false };
    }
    return { ...base, start: a2?.correct ? "practitioner" : "foundation", strong: false };
  }
  return placeSubject(answers);
}

const hashRank = (seed: string, key: string) => createHash("sha256").update(`${seed}|${key}`).digest("hex");

/**
 * The next question in an adaptive check, or null when every subject is settled. Subjects are taken in order;
 * `seen` holds question keys from the person's earlier checks (skipped while fresh ones remain).
 */
export function adaptiveNext(pool: PlacementPoolTrack[], slugs: string[], seed: string, answered: AskedAnswer[], seen: Set<string>): NextQuestion | null {
  const askedNow = new Set(answered.map((a) => a.key));
  for (const slug of slugs) {
    const t = pool.find((p) => p.slug === slug);
    if (!t) continue;
    const available = new Set(t.lessons.filter((l) => l.questionIds.length).map((l) => l.level));
    const level = nextLevel(
      answered.filter((a) => a.track === slug),
      available
    );
    if (!level) continue;
    const candidates = t.lessons.filter((l) => l.level === level).flatMap((l) => l.questionIds.map((q) => ({ lessonId: l.id, questionId: q, key: `${l.id}#${q}` })));
    const unasked = candidates.filter((c) => !askedNow.has(c.key));
    const fresh = unasked.filter((c) => !seen.has(c.key));
    const from = fresh.length ? fresh : unasked;
    if (!from.length) continue;
    const pick = from.reduce((a, b) => (hashRank(seed, b.key) < hashRank(seed, a.key) ? b : a));
    return { track: slug, level, ...pick };
  }
  return null;
}
