/*
 * The local question bot (Level 1). Reads a question with no AI call: fixes simple typos, works out what kind
 * of question it is, recognises the practice concepts it's about, routes it to a course, and builds focused
 * search queries. Pure and unit-tested.
 */
import { GLOSSARY, type Concept } from "./glossary";

export type Intent = "how_to" | "rate" | "deadline" | "definition" | "treatment" | "penalty" | "general";

export interface Understanding {
  /** The question with typos corrected. */
  text: string;
  intent: Intent;
  concepts: Concept[];
  /** Course slugs, most relevant first. */
  topics: string[];
  /** Meaningful words left after removing question words. */
  keywords: string[];
  /** The aliases the question actually used, longest first (e.g. "s455" rather than the concept name). */
  matched: string[];
  /** Words we corrected, e.g. { from: "joournal", to: "journal" }. */
  corrections: { from: string; to: string }[];
  /** Query for the official guidance: HMRC wording for the concepts, plus the keywords. */
  officialQuery: string;
  /** Query for our lessons: concept names and aliases, plus the keywords. */
  lessonQuery: string;
}

const QUESTION_WORDS = new Set(
  "a an the and or of to for in on at by with from into about is are was were be been being do does did can could should would will shall may might must how what when where which who whom why whether i we you my our your me us it its this that these those there their them they please tell explain show help need want know get got have has had if so as than then just also any some".split(
    " "
  )
);

const INTENTS: [Intent, RegExp][] = [
  ["penalty", /\b(penalt\w*|late filing|late payment|fines?|surcharge)\b/],
  ["deadline", /\b(deadline|due date|due by|by when|when (is|are|must|do|does|should)|time limit|how long (do|does|have))\b/],
  ["rate", /\b(rates?|threshold|limit|allowance|how much|percentage|band|amount of)\b/],
  ["how_to", /\b(how (do|to|should|can|would)|steps?|process|procedure|what do i do|set up|record|post|enter|book)\b/],
  ["treatment", /\b(treat|treatment|allowable|deductible|claim|recover|account for|taxable|vat on|liable)\b/],
  ["definition", /^(what('s| is| are| does| do you mean by)|whats|define|meaning of|explain|describe|difference between|what (goes|should go|is included|are included|should be included|should be) in|tell me (about|what)|(can|could) you (explain|tell me)|please explain|i want to know (about|what)|info(rmation)? (on|about)|what do (we|you|i) mean by)\b|\b(meaning|definition|defined)\b/],
];

/** Edit distance where swapping two neighbouring letters counts as one slip ("baalnce" → "balance"). Capped. */
function editDistance(a: string, b: string, cap = 3): number {
  if (Math.abs(a.length - b.length) > cap) return cap;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin >= cap) return cap;
  }
  return d[a.length][b.length];
}

const words = (s: string) => s.toLowerCase().replace(/[’']/g, "").match(/[a-z0-9&]+/g) ?? [];
const singular = (w: string) => (w.length > 4 && w.endsWith("ies") ? w.slice(0, -3) + "y" : w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);

/** Every word the glossary knows, for typo correction. */
const VOCAB = new Set(GLOSSARY.flatMap((c) => c.aliases.flatMap(words)).filter((w) => w.length > 3));

/** Corrects words within edit distance 1 (2 for long words) of a glossary word, if they aren't words we know already. */
export function correctTypos(question: string, extraVocab: Set<string> = new Set()): { text: string; corrections: { from: string; to: string }[] } {
  const corrections: { from: string; to: string }[] = [];
  const text = question.replace(/[A-Za-z]{5,}/g, (w) => {
    const lw = w.toLowerCase();
    if (VOCAB.has(lw) || VOCAB.has(singular(lw)) || extraVocab.has(lw) || QUESTION_WORDS.has(lw)) return w;
    let best: string | null = null;
    let bestD = lw.length >= 8 ? 2 : 1;
    for (const v of VOCAB) {
      if (Math.abs(v.length - lw.length) > 2) continue;
      const d = editDistance(lw, v, bestD + 1);
      if (d <= bestD && (d < bestD || !best)) {
        best = v;
        bestD = d;
      }
    }
    // An inflection of a known word ("partially" vs "partial") is not a typo.
    if (!best || lw.startsWith(best) || best.startsWith(lw)) return w;
    corrections.push({ from: lw, to: best });
    return best;
  });
  return { text, corrections };
}

/** True when `alias` appears in `text` as whole words (plurals tolerated). */
function hasPhrase(textWords: string[], alias: string): boolean {
  const a = words(alias).map(singular);
  const t = textWords.map(singular);
  outer: for (let i = 0; i + a.length <= t.length; i++) {
    for (let k = 0; k < a.length; k++) if (t[i + k] !== a[k]) continue outer;
    return true;
  }
  return false;
}

/** Wording a reviewer has taught the bot in the Review centre: `alias` means the glossary concept `concept`. */
export interface TaughtAlias {
  alias: string;
  concept: string;
}

export function understand(question: string, extraVocab?: Set<string>, taught: TaughtAlias[] = []): Understanding {
  const { text, corrections } = correctTypos(question.trim(), extraVocab);
  const taughtFor = (name: string) => taught.filter((t) => t.concept === name).map((t) => t.alias.toLowerCase());
  const lower = text.toLowerCase();
  const tw = words(lower);

  // Concepts: score by the longest alias matched, so "directors loan" beats "loan"; ties go to the longer phrase.
  const found = GLOSSARY.map((c) => {
    const hits = [...new Set([c.name.toLowerCase(), ...c.aliases, ...taughtFor(c.name)])].filter((a) => hasPhrase(tw, a)).sort((a, b) => words(b).length - words(a).length || b.length - a.length);
    return { c, hits, len: hits.length ? words(hits[0]).length : 0, chars: hits[0]?.length ?? 0 };
  })
    .filter((m) => m.len > 0)
    .sort((a, b) => b.len - a.len || b.chars - a.chars);
  const concepts = found.map((m) => m.c);
  const matched = found.flatMap((m) => m.hits);
  const bestMatch = found.map((m) => m.hits[0]);

  // Intent is read with the concept's own words taken out, so "flat RATE scheme" or "nil RATE band" isn't
  // mistaken for a question about a rate. A bare phrase like "corporation tax rate" still counts as one.
  let rest = ` ${lower.replace(/[’']/g, "")} `;
  for (const a of matched) rest = rest.replace(new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}s?\\b`, "g"), " ");
  let intent: Intent = INTENTS.find(([, re]) => re.test(rest.trim()))?.[0] ?? "general";
  // The concept's own words still decide when nothing else does: "late filing penalty", "corporation tax rate".
  // Only for a near-bare phrase — a fuller question ("is the AIA available on a car?") is about something else.
  const restWords = words(rest).filter((x) => !QUESTION_WORDS.has(x));
  if (intent === "general" && restWords.length <= 2) {
    // Only when the rate word ends the phrase ("corporation tax rate"), not when it's part of a name ("flat rate scheme").
    const own = bestMatch.filter((m) => /\b(rates?|threshold|limit|allowance|penalt\w*|deadline)$/.test(m)).join(" ");
    intent = (["penalty", "deadline", "rate"] as Intent[]).find((k) => INTENTS.find(([i]) => i === k)![1].test(own)) ?? "general";
  }
  if (intent === "general" && /^(what('s| is| are)|whats)\b/.test(lower)) intent = "definition";
  // Just the term on its own ("trial balance", "IR35?") is asking what it is.
  const aliasWords = new Set(matched.flatMap(words).map(singular));
  if (intent === "general" && matched.length && tw.filter((x) => !QUESTION_WORDS.has(x)).every((x) => aliasWords.has(singular(x)))) intent = "definition";
  const topicScore = new Map<string, number>();
  concepts.forEach((c, i) => c.topics.forEach((t, k) => topicScore.set(t, (topicScore.get(t) ?? 0) + (concepts.length - i) * (c.topics.length - k))));
  const topics = [...topicScore.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);

  const keywords = [...new Set(tw.filter((w) => w.length > 1 && !QUESTION_WORDS.has(w)))];
  const officialQuery = [...new Set([...concepts.slice(0, 2).flatMap((c) => c.official ?? [c.name]), ...keywords])].join(" ");
  const lessonQuery = [...new Set([...concepts.flatMap((c) => [c.name, ...c.aliases.slice(0, 2)]), ...keywords])].join(" ");
  return { text, intent, concepts, topics, keywords, matched, corrections, officialQuery, lessonQuery };
}

export const INTENT_LABEL: Record<Intent, string> = {
  how_to: "How-to",
  rate: "Rate or threshold",
  deadline: "Deadline",
  definition: "Definition",
  treatment: "Treatment",
  penalty: "Penalty",
  general: "General",
};
