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
  ["definition", /^(what (is|are|does)|define|meaning of|explain|difference between)\b/],
];

/** Damerau-free edit distance, capped (we only care about 0–2). */
function editDistance(a: string, b: string, cap = 3): number {
  if (Math.abs(a.length - b.length) > cap) return cap;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin >= cap) return cap;
    prev = cur;
  }
  return prev[b.length];
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
    if (!best) return w;
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

export function understand(question: string, extraVocab?: Set<string>): Understanding {
  const { text, corrections } = correctTypos(question.trim(), extraVocab);
  const lower = text.toLowerCase();
  const tw = words(lower);
  const intent = INTENTS.find(([, re]) => re.test(lower))?.[0] ?? "general";

  // Concepts: score by the longest alias matched, so "directors loan" beats "loan".
  const matched = GLOSSARY.map((c) => ({ c, len: Math.max(0, ...c.aliases.filter((a) => hasPhrase(tw, a)).map((a) => words(a).length)) }))
    .filter((m) => m.len > 0)
    .sort((a, b) => b.len - a.len);
  const concepts = matched.map((m) => m.c);
  const topicScore = new Map<string, number>();
  concepts.forEach((c, i) => c.topics.forEach((t, k) => topicScore.set(t, (topicScore.get(t) ?? 0) + (concepts.length - i) * (c.topics.length - k))));
  const topics = [...topicScore.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);

  const keywords = [...new Set(tw.filter((w) => w.length > 1 && !QUESTION_WORDS.has(w)))];
  const officialQuery = [...new Set([...concepts.flatMap((c) => c.official ?? [c.name]), ...keywords])].join(" ");
  const lessonQuery = [...new Set([...concepts.flatMap((c) => [c.name, ...c.aliases.slice(0, 2)]), ...keywords])].join(" ");
  return { text, intent, concepts, topics, keywords, corrections, officialQuery, lessonQuery };
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
