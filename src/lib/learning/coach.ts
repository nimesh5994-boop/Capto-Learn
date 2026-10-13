/*
 * The coach bot. Reviews a learner's own answers (lessons, quizzes and Daily 5) and writes a personal report:
 * where they are strong and weak, the questions they keep getting wrong, the *kind* of mistake they tend to
 * make, and what to do next. Runs locally — no AI. Pure and unit-tested; the caller supplies the attempts and
 * a way to look questions up.
 */
import type { Exercise, JournalLine, Level } from "@/content/types";
import { netByAccount } from "./marking";

export interface Attempt {
  lessonId: string;
  exerciseId: string;
  correct: boolean;
  response: unknown;
  createdAt: Date;
}

export interface QuestionInfo {
  ex: Exercise;
  lessonTitle: string;
  track: string;
  trackTitle: string;
  level: Level;
}

export type MistakeKind = "vat_inclusive" | "decimal_slip" | "percentage_slip" | "rounding" | "sides_reversed" | "unbalanced" | "missing_account" | "same_wrong_option";

export const MISTAKE_ADVICE: Record<MistakeKind, { title: string; advice: string }> = {
  vat_inclusive: { title: "VAT-inclusive vs VAT-exclusive", advice: "Check whether the figure you're given includes VAT before you start. To take VAT out of a gross amount at 20%, use 1/6 of the gross (not 20% of it)." },
  decimal_slip: { title: "Decimal-place slips", advice: "Your answers were out by a factor of 10, 100 or 1,000. Write the units down (£, £000) and sense-check the size of the answer before submitting." },
  percentage_slip: { title: "Applying the wrong percentage", advice: "You used a percentage but not the right one for the situation. Re-read which rate applies — and to which part of the amount — before calculating." },
  rounding: { title: "Rounding too early", advice: "Your answers were very close. Keep full figures through the working and round only at the end, to the nearest pound unless told otherwise." },
  sides_reversed: { title: "Debits and credits the wrong way round", advice: "Say the entry as a sentence: 'Debit the expense (it goes up), credit the bank (it goes down).' Assets and expenses increase on the debit side; liabilities, income and capital on the credit side." },
  unbalanced: { title: "Journals that don't balance", advice: "Add up both columns before you submit. Every journal needs total debits equal to total credits." },
  missing_account: { title: "Missing one side of the entry", advice: "List every account the transaction touches before writing the journal — VAT and the bank are the ones most often forgotten." },
  same_wrong_option: { title: "A recurring misconception", advice: "You've picked the same wrong option more than once. Read the explanation for that question carefully — it's usually a rule that sounds right but isn't." },
};

export interface CoachReport {
  attempts: number;
  accuracy: number | null;
  /** Accuracy in the last 30 days minus the 30 days before (percentage points), when both have enough data. */
  trend: number | null;
  subjects: { track: string; title: string; attempts: number; accuracy: number }[];
  levels: { level: Level; attempts: number; accuracy: number }[];
  byKind: { kind: Exercise["kind"]; attempts: number; accuracy: number }[];
  /** Questions still not got right, worst first. */
  stuck: { lessonId: string; exerciseId: string; lessonTitle: string; trackTitle: string; prompt: string; explain: string; wrong: number; everRight: boolean }[];
  mistakes: { kind: MistakeKind; count: number; example: string }[];
  suggestions: { text: string; href?: string }[];
}

const pct = (right: number, total: number) => (total ? Math.round((right / total) * 100) : 0);
const near = (a: number, b: number, tol = 0.02) => b !== 0 && Math.abs(a - b) / Math.abs(b) <= tol;

/** What sort of slip a wrong numeric answer looks like, if any. */
export function numericMistake(given: number, answer: number): MistakeKind | null {
  if (!Number.isFinite(given) || answer === 0 || given === answer) return null;
  if (near(given, answer * 1.2) || near(given, answer / 1.2) || near(given, answer * 6) || near(given, answer * 1.25) || near(given, answer / 1.25) || near(given, answer * 5 / 6)) return "vat_inclusive";
  for (const f of [10, 100, 1000]) if (near(given, answer * f, 0.001) || near(given, answer / f, 0.001)) return "decimal_slip";
  if (Math.abs(given - answer) <= Math.max(2, Math.abs(answer) * 0.005)) return "rounding";
  return null;
}

/** What sort of mistake a wrong journal looks like. */
export function journalMistake(given: JournalLine[], expected: JournalLine[]): MistakeKind | null {
  const dr = given.reduce((s, l) => s + (Number(l.dr) || 0), 0);
  const cr = given.reduce((s, l) => s + (Number(l.cr) || 0), 0);
  if (Math.abs(dr - cr) > 0.005) return "unbalanced";
  const want = netByAccount(expected);
  const got = netByAccount(given);
  const norm = (m: Map<string, number>) => new Map([...m].map(([k, v]) => [k.toLowerCase(), v]));
  const w = norm(want);
  const g = norm(got);
  if ([...w.keys()].some((k) => !g.has(k))) return "missing_account";
  if ([...w].some(([k, v]) => Math.sign(g.get(k) ?? 0) === -Math.sign(v))) return "sides_reversed";
  return null;
}

export function coachReport(attempts: Attempt[], lookup: (lessonId: string, exerciseId: string) => QuestionInfo | undefined, now = new Date()): CoachReport {
  const known = attempts.map((a) => ({ a, q: lookup(a.lessonId, a.exerciseId) })).filter((x): x is { a: Attempt; q: QuestionInfo } => !!x.q);
  const right = known.filter((x) => x.a.correct).length;

  const group = <K extends string>(key: (x: (typeof known)[number]) => K) => {
    const m = new Map<K, { right: number; total: number }>();
    for (const x of known) {
      const k = key(x);
      const g = m.get(k) ?? { right: 0, total: 0 };
      g.total++;
      if (x.a.correct) g.right++;
      m.set(k, g);
    }
    return m;
  };
  const titles = new Map(known.map((x) => [x.q.track, x.q.trackTitle]));
  const subjects = [...group((x) => x.q.track)].map(([track, g]) => ({ track, title: titles.get(track) ?? track, attempts: g.total, accuracy: pct(g.right, g.total) })).sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
  const levels = (["foundation", "practitioner", "advanced"] as Level[]).map((level) => {
    const g = group((x) => x.q.level).get(level) ?? { right: 0, total: 0 };
    return { level, attempts: g.total, accuracy: pct(g.right, g.total) };
  });
  const byKind = [...group((x) => x.q.ex.kind)].map(([kind, g]) => ({ kind, attempts: g.total, accuracy: pct(g.right, g.total) })).sort((a, b) => a.accuracy - b.accuracy);

  const day = 86_400_000;
  const recent = known.filter((x) => now.getTime() - x.a.createdAt.getTime() <= 30 * day);
  const before = known.filter((x) => now.getTime() - x.a.createdAt.getTime() > 30 * day && now.getTime() - x.a.createdAt.getTime() <= 60 * day);
  const acc = (xs: typeof known) => pct(xs.filter((x) => x.a.correct).length, xs.length);
  const trend = recent.length >= 10 && before.length >= 10 ? acc(recent) - acc(before) : null;

  // Per question: wrong count, and whether the latest attempt was right.
  const perQ = new Map<string, { x: (typeof known)[number]; wrong: number; everRight: boolean; lastRight: boolean; lastAt: number; choices: Map<number, number> }>();
  for (const x of [...known].sort((a, b) => a.a.createdAt.getTime() - b.a.createdAt.getTime())) {
    const k = `${x.a.lessonId}#${x.a.exerciseId}`;
    const s = perQ.get(k) ?? { x, wrong: 0, everRight: false, lastRight: false, lastAt: 0, choices: new Map() };
    if (!x.a.correct) s.wrong++;
    s.everRight ||= x.a.correct;
    s.lastRight = x.a.correct;
    s.lastAt = x.a.createdAt.getTime();
    const r = x.a.response as { kind?: string; choice?: number } | null;
    if (!x.a.correct && r?.kind === "mcq" && typeof r.choice === "number") s.choices.set(r.choice, (s.choices.get(r.choice) ?? 0) + 1);
    perQ.set(k, s);
  }
  const stuck = [...perQ.values()]
    .filter((s) => s.wrong > 0 && !s.lastRight)
    .sort((a, b) => b.wrong - a.wrong || b.lastAt - a.lastAt)
    .slice(0, 8)
    .map((s) => ({ lessonId: s.x.a.lessonId, exerciseId: s.x.a.exerciseId, lessonTitle: s.x.q.lessonTitle, trackTitle: s.x.q.trackTitle, prompt: s.x.q.ex.prompt, explain: s.x.q.ex.explain, wrong: s.wrong, everRight: s.everRight }));

  // Mistake patterns, from what was actually answered.
  const mistakes = new Map<MistakeKind, { count: number; example: string }>();
  const note = (k: MistakeKind, example: string) => {
    const m = mistakes.get(k) ?? { count: 0, example };
    m.count++;
    mistakes.set(k, m);
  };
  for (const x of known) {
    if (x.a.correct) continue;
    const r = x.a.response as { kind?: string; value?: number; lines?: JournalLine[] } | null;
    if (x.q.ex.kind === "numeric" && r?.kind === "numeric" && typeof r.value === "number") {
      const k = numericMistake(r.value, x.q.ex.answer);
      if (k) note(k, x.q.lessonTitle);
    }
    if (x.q.ex.kind === "journal" && r?.kind === "journal" && Array.isArray(r.lines)) {
      const k = journalMistake(r.lines, x.q.ex.answer);
      if (k) note(k, x.q.lessonTitle);
    }
  }
  for (const s of perQ.values()) if ([...s.choices.values()].some((n) => n >= 2)) note("same_wrong_option", s.x.q.lessonTitle);
  const mistakeList = [...mistakes].map(([kind, m]) => ({ kind, ...m })).sort((a, b) => b.count - a.count);

  // Suggestions, most useful first.
  const suggestions: { text: string; href?: string }[] = [];
  const weak = subjects.filter((s) => s.attempts >= 5 && s.accuracy < 70);
  if (weak[0]) suggestions.push({ text: `Focus on ${weak[0].title}: ${weak[0].accuracy}% right over ${weak[0].attempts} answers. Start with the flashcards, then retake the lessons below.`, href: `/flashcards?course=${weak[0].track}` });
  if (stuck[0]) suggestions.push({ text: `Revisit “${stuck[0].lessonTitle}” — you've missed one of its questions ${stuck[0].wrong} time${stuck[0].wrong === 1 ? "" : "s"}.`, href: `/learn/${stuck[0].lessonId}` });
  if (mistakeList[0]) suggestions.push({ text: `${MISTAKE_ADVICE[mistakeList[0].kind].title}: ${MISTAKE_ADVICE[mistakeList[0].kind].advice}` });
  const calc = byKind.find((k) => k.kind === "numeric");
  if (calc && calc.attempts >= 4 && calc.accuracy < 60) suggestions.push({ text: `Calculations are your weakest question type (${calc.accuracy}% right). Write out each step before entering the final figure — the worked answers show the layout.` });
  const lv = levels.find((l) => l.level === "practitioner");
  const fd = levels.find((l) => l.level === "foundation");
  if (fd && lv && fd.attempts >= 5 && lv.attempts >= 5 && fd.accuracy - lv.accuracy >= 25) suggestions.push({ text: `You're solid at Foundation (${fd.accuracy}%) but find Practitioner harder (${lv.accuracy}%). Take the Practitioner lessons slowly and use the worked scenarios.` });
  if (trend !== null) suggestions.push({ text: trend >= 0 ? `You're improving: ${trend} points better than the previous month. Keep the Daily 5 going.` : `Accuracy has dipped ${-trend} points on last month — a few Daily 5 sessions will help it stick.`, href: "/review" });
  if (!suggestions.length && known.length) suggestions.push({ text: "No weak spots yet — keep going, and try the Practitioner and Advanced lessons in your strongest subject." });

  return { attempts: known.length, accuracy: known.length ? pct(right, known.length) : null, trend, subjects, levels, byKind, stuck, mistakes: mistakeList, suggestions };
}

/** The report as a short personal note from the coach, in plain words. */
export function coachMessage(firstName: string, r: CoachReport): string[] {
  if (!r.attempts)
    return [`Hi ${firstName} — I'm your Capto coach. Once you've answered a few lesson questions I'll look over them and tell you what's going well and where to focus next.`];
  const out: string[] = [];
  const best = [...r.subjects].filter((s) => s.attempts >= 3).sort((a, b) => b.accuracy - a.accuracy)[0];
  const weak = r.subjects.find((s) => s.attempts >= 5 && s.accuracy < 70);
  const opener =
    r.accuracy! >= 85 ? "you're doing really well" : r.accuracy! >= 70 ? "you're making solid progress" : r.accuracy! >= 50 ? "you're getting there" : "you've made a start, and that's the hardest part";
  out.push(`Hi ${firstName} — I've been through all ${r.attempts} answers you've given so far, and ${opener}: ${r.accuracy}% right overall.`);
  if (r.trend !== null && r.trend >= 5) out.push(`You're also ${r.trend} points sharper than the month before, so whatever you're doing, keep doing it.`);
  else if (r.trend !== null && r.trend <= -5) out.push(`Your accuracy has slipped ${-r.trend} points on last month — nothing to worry about, but a few Daily 5 sessions will help it stick again.`);
  if (best && (!weak || best.track !== weak.track) && best.accuracy >= 75) out.push(`${best.title} is your strongest subject at ${best.accuracy}% — nice work.`);
  if (weak) out.push(`The one I'd focus on next is ${weak.title}, where you're at ${weak.accuracy}%. That's very fixable — I've listed exactly which questions are tripping you up below.`);
  const m = r.mistakes[0];
  if (m && m.count >= 2) out.push(`One pattern I noticed: ${MISTAKE_ADVICE[m.kind].title.toLowerCase()} came up ${m.count} times. ${MISTAKE_ADVICE[m.kind].advice}`);
  else if (r.stuck.length) out.push(`There ${r.stuck.length === 1 ? "is one question" : `are ${r.stuck.length} questions`} you haven't cracked yet — have a look at the ${r.stuck.length === 1 ? "explanation below, then try it" : "explanations below, then try them"} again.`);
  else out.push("You've gone back and fixed everything you got wrong, which is exactly how to learn this stuff.");
  return out;
}
