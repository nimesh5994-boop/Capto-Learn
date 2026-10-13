/*
 * Level 1 — the instant answer. Uses only Capto's own checked material (fact cards and lesson text), no AI.
 * It answers only when it is confident; otherwise it returns null and the question goes up to Level 2.
 * Every sentence it shows is verbatim from a lesson. Pure: the caller passes in the lessons and cards.
 * Measured by the bot exam (botExam.test.ts / scripts/bot-report.mts).
 */
import type { Flashcard } from "@/lib/learning/flashcards";
import { tokenize } from "@/lib/research/passages";
import type { Understanding } from "./understand";

export interface InstantLesson {
  id: string;
  title: string;
  track: string;
  trackTitle: string;
  plain: string;
  level?: "foundation" | "practitioner" | "advanced";
}

export interface InstantAnswer {
  kind: "flashcard" | "lesson";
  /** The direct answer, verbatim from Capto material. */
  answer: string;
  /** Supporting sentences, verbatim from the lesson. */
  excerpt: string[];
  lesson: { id: string; title: string; trackTitle: string };
  /** Why the bot was confident enough, shown to the user. */
  basis: string;
}

/** Sentences of a lesson, line by line — never joined across lines, so every sentence is verbatim. Headings are dropped. */
export function sentences(s: string): string[] {
  return s
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => /[.!?:]$/.test(line) || line.length > 80)
    .flatMap((line) => line.split(/(?<=[.!?])\s+(?=[A-Z£0-9"“(])/))
    .map((x) => x.replace(/^[-*•]\s+|^\d+\.\s+/, "").trim())
    .filter((x) => x.length > 25 && x.length < 400);
}

// Hyphens and spaces are interchangeable: "strike off" matches "Strike-off", "auto enrolment" matches "auto-enrolment".
const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s-]+/g, "[\\s-]+");
const hasAny = (text: string, list: string[]) => list.some((t) => new RegExp(`(^|[^a-z0-9])${esc(t)}`, "i").test(text));
const countOf = (text: string, list: string[]) => list.reduce((n, t) => n + (text.match(new RegExp(`(^|[^a-z0-9])${esc(t)}`, "gi"))?.length ?? 0), 0);

const DEFINING = /\b(is|are|means|refers? to|is called|are called|shows?|records?|turns?|covers?|measures?|represents?)\b/i;
const PROCEDURAL = /\b(first|then|next|finally|start|check|compare|tick|match|post|record|enter|list|identify|agree|reconcile|clear|correct|file|submit|complete|send|apply|close|investigate|prepare|calculate|work out|debit|credit)\b/i;
const STOP_ROOT = new Set(["the", "and", "for", "account", "accounts", "scheme", "relief", "rates", "return"]);

/** A lesson sentence (or, failing that, a whole line) starting with `prefix` — always verbatim. */
export function findLine(plain: string, prefix: string): string | null {
  return sentences(plain).find((x) => x.startsWith(prefix)) ?? plain.split("\n").map((x) => x.replace(/\s+/g, " ").trim()).find((x) => x.startsWith(prefix)) ?? null;
}

/** The checked answer pinned to a concept (see Concept.pin), from whichever lesson holds it. */
export function pinnedAnswer(u: Understanding, lessons: InstantLesson[]): InstantAnswer | null {
  const pin = u.concepts[0]?.pin;
  if (!pin) return null;
  const order = [...lessons].sort((a, b) => Number(u.topics.includes(b.track)) - Number(u.topics.includes(a.track)));
  for (const l of order) {
    const lead = findLine(l.plain, pin.lead);
    if (!lead) continue;
    const also = (pin.also ?? []).map((p) => findLine(l.plain, p)).filter((x): x is string => !!x && x !== lead);
    return { kind: "lesson", answer: lead, excerpt: also, lesson: { id: l.id, title: l.title, trackTitle: l.trackTitle }, basis: `Checked definition from the lesson “${l.title}”` };
  }
  return null;
}

/** Share of the card's meaningful words that the question also uses. */
function cardMatch(questionTerms: Set<string>, front: string): number {
  const t = [...new Set(tokenize(front))];
  return t.length ? t.filter((w) => questionTerms.has(w)).length / t.length : 0;
}

/**
 * The lesson that best explains (definition) or walks through (how-to) the concept, and the best sentences in it.
 * Lesson choice rewards lessons that *explain* the concept, in the question's own words, in its main course,
 * at the most basic level — not lessons that merely mention it.
 */
function fromLessons(u: Understanding, lessons: InstantLesson[], mode: "define" | "how_to"): InstantAnswer | null {
  const c = u.concepts[0];
  const used = u.matched.filter((m) => c.aliases.includes(m));
  const terms = [...new Set([c.name, ...c.aliases].map((t) => t.toLowerCase()))];
  const roots = c.name
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 3 && !STOP_ROOT.has(w))
    .map((w) => w.slice(0, Math.max(5, w.length - 3)));
  const cue = mode === "define" ? DEFINING : PROCEDURAL;
  const pinHome = c.pin ? lessons.find((l) => findLine(l.plain, c.pin!.lead)) : undefined;
  const inCourse = mode === "how_to" && pinHome ? [pinHome] : lessons.filter((l) => u.topics.slice(0, 2).includes(l.track));
  const saying = used.length ? inCourse.filter((l) => hasAny(l.plain, used)) : [];
  const pool = saying.length ? saying : inCourse;

  const best = pool
    .map((l) => {
      const ss = sentences(l.plain);
      const explaining = ss.filter((x) => hasAny(x, terms) && cue.test(x)).length;
      const score =
        (hasAny(l.title, used) ? 5 : hasAny(l.title, terms) ? 3 : hasAny(l.title, roots) ? 1 : 0) +
        Math.min(6, countOf(l.plain, used)) +
        Math.min(4, countOf(l.plain, terms)) +
        2 * Math.min(3, explaining) +
        (l.track === u.topics[0] ? 3 : 0) +
        (mode === "define" ? (l.level === "foundation" ? 2 : l.level === "practitioner" ? 1 : 0) : 0);
      return { l, ss, score };
    })
    .sort((a, b) => b.score - a.score)[0];
  if (!best || best.score < 5) return null;

  const titleIsConcept = hasAny(best.l.title, terms);
  const scored = best.ss.map((x, i) => {
    const said = hasAny(x, used);
    const term = said || hasAny(x, terms);
    const root = term || hasAny(x, roots);
    const score =
      (said ? 6 : term ? 4 : root ? 2 : 0) +
      (cue.test(x) ? 2 : 0) +
      (i < 6 ? 1.5 : i < 15 ? 0.5 : 0) +
      // The lesson summary (sentence 0–1) is a fair definition when the lesson is about the concept.
      (mode === "define" && titleIsConcept && i <= 1 ? 2 : 0) -
      (x.length > 260 ? 1 : 0) -
      (/^[a-z]/.test(x) ? 1 : 0);
    return { x, i, root, score };
  });
  const relevant = scored.filter((s) => s.root || (mode === "how_to" && cue.test(s.x)));
  // In a lesson that is itself about the task ("Strike-off, liquidation…"), any real step can open the answer.
  const lessonIsTask = mode === "how_to" && hasAny(best.l.title, used.length ? used : terms);
  const opener = (s: { x: string; root: boolean }) => !/:$/.test(s.x) && (s.root || (lessonIsTask && cue.test(s.x)));
  const inWords = relevant.filter((s) => opener(s) && (!used.length || !saying.length || lessonIsTask || hasAny(s.x, used)));
  const leads = inWords.length ? inWords : relevant.filter(opener);
  const preferred = mode === "how_to" ? leads.filter((s) => cue.test(s.x) && !/;\s*\w[^;]*:/.test(s.x)) : leads;
  // A how-to on a concept with a checked definition opens with that definition, then the steps.
  const pinnedLead = mode === "how_to" && pinHome && c.pin ? relevant.find((s) => s.x === findLine(pinHome.plain, c.pin!.lead)) : undefined;
  const lead = pinnedLead ?? [...(preferred.length ? preferred : leads)].sort((a, b) => b.score - a.score || a.i - b.i)[0];
  if (!lead || lead.score < 5) return null;
  const rest = relevant
    .filter((s) => s !== lead && s.score >= 3)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, mode === "how_to" ? 4 : 3)
    .sort((a, b) => a.i - b.i)
    .map((s) => s.x);
  if (mode === "how_to" && rest.length < 2) return null;
  if (mode === "how_to" && !pinHome && used.length && !hasAny(lead.x, used) && !hasAny(best.l.title, used)) return null;
  // Technical (non-bookkeeping) how-tos: open with a real step or the lesson's own summary, or let Level 2 write cited steps.
  if (mode === "how_to" && !c.general && !pinnedLead && lead.i > 1 && !/^(File|Check|Send|Submit|Complete|Register|Apply|Calculate|Work out|Prepare|Record|Enter|Post|Tell|Notify|Pay|Claim|Report|Verify|Confirm|Keep|Start|Make)\b/.test(lead.x)) return null;
  return {
    kind: "lesson",
    answer: lead.x,
    excerpt: rest,
    lesson: { id: best.l.id, title: best.l.title, trackTitle: best.l.trackTitle },
    basis: mode === "define" ? `Explained in the lesson “${best.l.title}”` : `Steps from the lesson “${best.l.title}”`,
  };
}

/**
 * "What's the journal for X?" / "double entry for X" / "Dr Cr for X" — the worked Dr/Cr entry for X, taken
 * from X's own lesson (a worked journal titled for X, or failing that a line that gives X's Dr and Cr).
 */
export function journalFor(u: Understanding, lessons: InstantLesson[]): InstantAnswer | null {
  const isJournal = (name: string) => name === "journal entry" || name === "double entry";
  const asksForEntry = u.concepts.some((c) => isJournal(c.name)) || /\b(dr|cr|debits?|credits?)\b/i.test(u.text);
  const topic = u.concepts.find((c) => !isJournal(c.name));
  if (!asksForEntry || !topic) return null;
  const terms = [...new Set([topic.name, ...topic.aliases])];
  const home = topic.pin ? lessons.find((l) => findLine(l.plain, topic.pin!.lead)) : undefined;
  const pool = [...(home ? [home] : []), ...lessons.filter((l) => topic.topics.includes(l.track) && l !== home)];
  const linesOf = (l: InstantLesson) => l.plain.split("\n").map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean);
  // Lesson by lesson (X's own lesson first): 1. a worked journal — a title line ("The annual depreciation
  // journal:") followed by its Dr/Cr lines; 2. otherwise a line that states X's double entry.
  for (const l of pool) {
    const lines = linesOf(l);
    for (let i = 0; i < lines.length; i++) {
      if (!/:$/.test(lines[i]) || !hasAny(lines[i], terms)) continue;
      const entry: string[] = [];
      let j = i + 1;
      while (j < lines.length && /^(Dr|Cr) /.test(lines[j])) entry.push(lines[j++]);
      if (entry.length < 2) continue;
      const note = lines[j] && !/:$/.test(lines[j]) && lines[j].length > 25 ? [lines[j]] : [];
      return { kind: "lesson", answer: lines[i], excerpt: [...entry, ...note], lesson: { id: l.id, title: l.title, trackTitle: l.trackTitle }, basis: `Worked journal from the lesson “${l.title}”` };
    }
    const line = lines.find((x) => hasAny(x, terms) && /\bDr\b/.test(x) && /\bCr\b/.test(x) && x.length < 400);
    if (line) return { kind: "lesson", answer: line, excerpt: [], lesson: { id: l.id, title: l.title, trackTitle: l.trackTitle }, basis: `Double entry from the lesson “${l.title}”` };
  }
  return null;
}

export function instantAnswer(u: Understanding, lessons: InstantLesson[], cards: Flashcard[]): InstantAnswer | null {
  if (!u.concepts.length) return null; // the bot only answers what it recognises
  const c = u.concepts[0];
  const aliases = c.aliases.map((a) => a.toLowerCase());
  const mentions = (s: string) => aliases.some((a) => s.toLowerCase().includes(a));
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const inTopic = (id: string) => u.topics.slice(0, 2).includes(id.split("/")[0]);
  // Questions carrying the client's own facts (figures, "my client", long scenarios) need the rule applied: pass up.
  const scenario = /£\s?\d|\b\d+(\.\d+)?k\b|\b\d{1,3}(,\d{3})+\b|\b\d{4,}\b(?! to \d)|\b(my|our|a|the) client\b|\bcan (we|i|they)\b|\bshould (we|i)\b|\bdo i have to\b/i.test(u.text) || u.text.length > 110;

  // 1. Facts (rates, deadlines, definitions): a checked flashcard whose question matches closely.
  if (!scenario && (u.intent === "rate" || u.intent === "deadline" || u.intent === "definition")) {
    const qTerms = new Set(tokenize(`${u.text} ${c.name}`));
    const best = cards
      .filter((card) => inTopic(card.lessonId) && mentions(`${card.front} ${card.back} ${card.evidence}`))
      .map((card) => ({ card, score: cardMatch(qTerms, card.front) }))
      .sort((a, b) => b.score - a.score)[0];
    if (best && best.score >= 0.6) {
      const l = byId.get(best.card.lessonId);
      if (l) return { kind: "flashcard", answer: best.card.back, excerpt: [best.card.evidence], lesson: { id: l.id, title: l.title, trackTitle: l.trackTitle }, basis: `Matched a checked fact card: “${best.card.front}”` };
    }
  }
  if (scenario) return null;

  // "Journal for X": the Dr/Cr entry, whatever the question type.
  const entry = journalFor(u, lessons);
  if (entry) return entry;

  // 2. "What is …?" — the lesson that explains it. A bare general term ("trial balance") is read the same way.
  if (u.intent === "definition" && /\b(difference|differ|vs\.?|versus|compare|or)\b/i.test(u.text) && u.concepts.length >= 2 && u.concepts[1].pin) {
    const first = pinnedAnswer(u, lessons);
    const second = pinnedAnswer({ ...u, concepts: [u.concepts[1]] }, lessons);
    if (first && second && first.answer !== second.answer) return { ...first, excerpt: [second.answer, ...first.excerpt].slice(0, 3), basis: `Checked definitions of ${c.name} and ${u.concepts[1].name}` };
  }
  if (u.intent === "definition" || (u.intent === "general" && c.general && u.keywords.length <= 3)) return pinnedAnswer(u, lessons) ?? fromLessons(u, lessons, "define");

  // 3. "How do I …?" — process sentences from the lesson that walks through it.
  if (u.intent === "how_to") return fromLessons(u, lessons, "how_to");

  // Rates, deadlines, treatment, penalties and broad questions need the rule applied properly: Level 2.
  return null;
}
