import type { Exercise, JournalLine } from "@/content/types";

/*
 * Exercise marking. Pure, and server-side only in practice: the browser receives exercises with the
 * answers stripped (see publicExercise) and posts the learner's response; the server marks it and only
 * then reveals the explanation.
 */

export type ExerciseResponse =
  | { kind: "mcq"; choice: number }
  | { kind: "multi"; choices: number[] }
  | { kind: "numeric"; value: number }
  | { kind: "journal"; lines: JournalLine[] }
  | { kind: "classify"; choices: number[] };

export interface MarkResult {
  correct: boolean;
  /** For classify: which items were right; for journal: per-account feedback. */
  detail?: { itemsCorrect?: boolean[]; journalFeedback?: string[] };
  explain: string;
  working?: string;
  /** What the right answer was, in display form. */
  reveal: RevealedAnswer;
}

export type RevealedAnswer =
  | { kind: "mcq"; answer: number }
  | { kind: "multi"; answers: number[] }
  | { kind: "numeric"; answer: number; unit?: string }
  | { kind: "journal"; lines: JournalLine[] }
  | { kind: "classify"; answers: number[]; why: (string | undefined)[] };

/** Net debit (positive) or credit (negative) per account, rounded to pence. */
export function netByAccount(lines: JournalLine[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const l of lines) {
    const acc = l.account.trim();
    if (!acc) continue;
    const v = (Number(l.dr) || 0) - (Number(l.cr) || 0);
    m.set(acc, Math.round(((m.get(acc) ?? 0) + v) * 100) / 100);
  }
  for (const [k, v] of m) if (Math.abs(v) < 0.005) m.delete(k);
  return m;
}

export function markJournal(expected: JournalLine[], given: JournalLine[]): { correct: boolean; feedback: string[] } {
  const want = netByAccount(expected);
  const got = netByAccount(given);
  const feedback: string[] = [];
  const dr = given.reduce((s, l) => s + (Number(l.dr) || 0), 0);
  const cr = given.reduce((s, l) => s + (Number(l.cr) || 0), 0);
  if (Math.abs(dr - cr) > 0.005) feedback.push(`Your entry doesn't balance: debits £${dr.toFixed(2)}, credits £${cr.toFixed(2)}.`);
  for (const [acc, v] of want) {
    const g = got.get(acc);
    if (g === undefined) feedback.push(`Missing: ${acc}.`);
    else if (Math.sign(g) !== Math.sign(v)) feedback.push(`${acc} should be a ${v > 0 ? "debit" : "credit"}.`);
    else if (Math.abs(g - v) > 0.5) feedback.push(`${acc}: amount isn't right.`);
  }
  for (const acc of got.keys()) if (!want.has(acc)) feedback.push(`${acc} shouldn't be in this entry.`);
  return { correct: feedback.length === 0, feedback };
}

export function mark(ex: Exercise, res: ExerciseResponse): MarkResult {
  const base = { explain: ex.explain };
  switch (ex.kind) {
    case "mcq":
      return { ...base, correct: res.kind === "mcq" && res.choice === ex.answer, reveal: { kind: "mcq", answer: ex.answer } };
    case "multi": {
      const chosen = res.kind === "multi" ? [...new Set(res.choices)].sort() : [];
      const want = [...ex.answers].sort();
      return { ...base, correct: chosen.length === want.length && chosen.every((c, i) => c === want[i]), reveal: { kind: "multi", answers: ex.answers } };
    }
    case "numeric": {
      const tol = ex.tolerance ?? 0.5;
      const ok = res.kind === "numeric" && Number.isFinite(res.value) && Math.abs(res.value - ex.answer) <= tol + 1e-9;
      return { ...base, working: ex.working, correct: ok, reveal: { kind: "numeric", answer: ex.answer, unit: ex.unit } };
    }
    case "journal": {
      const { correct, feedback } = markJournal(ex.answer, res.kind === "journal" ? res.lines : []);
      return { ...base, correct, detail: { journalFeedback: feedback }, reveal: { kind: "journal", lines: ex.answer } };
    }
    case "classify": {
      const choices = res.kind === "classify" ? res.choices : [];
      const itemsCorrect = ex.items.map((it, i) => choices[i] === it.answer);
      return {
        ...base,
        correct: itemsCorrect.every(Boolean),
        detail: { itemsCorrect },
        reveal: { kind: "classify", answers: ex.items.map((i) => i.answer), why: ex.items.map((i) => i.why) },
      };
    }
  }
}

/** The exercise as the browser may see it — no answers, explanations or working. */
export type PublicExercise =
  | { kind: "mcq"; id: string; prompt: string; options: string[] }
  | { kind: "multi"; id: string; prompt: string; options: string[]; count: number }
  | { kind: "numeric"; id: string; prompt: string; unit?: string }
  | { kind: "journal"; id: string; prompt: string; accounts: string[]; rows: number }
  | { kind: "classify"; id: string; prompt: string; categories: string[]; items: string[] };

export function publicExercise(ex: Exercise): PublicExercise {
  switch (ex.kind) {
    case "mcq":
      return { kind: "mcq", id: ex.id, prompt: ex.prompt, options: ex.options };
    case "multi":
      return { kind: "multi", id: ex.id, prompt: ex.prompt, options: ex.options, count: ex.answers.length };
    case "numeric":
      return { kind: "numeric", id: ex.id, prompt: ex.prompt, unit: ex.unit };
    case "journal":
      // Accounts sorted so the picker order doesn't hint at the answer.
      return { kind: "journal", id: ex.id, prompt: ex.prompt, accounts: [...ex.accounts].sort((a, b) => a.localeCompare(b)), rows: Math.max(ex.answer.length + 1, 3) };
    case "classify":
      return { kind: "classify", id: ex.id, prompt: ex.prompt, categories: ex.categories, items: ex.items.map((i) => i.text) };
  }
}

export const QUIZ_PASS_MARK = 70;

export function quizScore(answers: number[], key: number[]): number {
  if (!key.length) return 0;
  const right = key.filter((k, i) => answers[i] === k).length;
  return Math.round((right / key.length) * 100);
}
