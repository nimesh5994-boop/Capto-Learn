/*
 * The basics exam: every core concept with a checked (pinned) answer is asked from every angle a person might
 * use — "what is X", "what's X", "define X", "X meaning", "explain X", "tell me about X", the bare term,
 * capitals, a question mark, a typo. Every phrasing must reach the same checked answer. Must be 100%.
 * Also proves every pinned sentence still exists word-for-word in a lesson.
 */
import { describe, expect, it } from "vitest";
import { allLessons } from "@/content";
import { lessonPlainText } from "@/lib/learning/flashcards";
import { GLOSSARY } from "./glossary";
import { findLine, instantAnswer, type InstantLesson } from "./instant";
import { understand } from "./understand";

const lessons: InstantLesson[] = allLessons().map((r) => ({ id: r.id, title: r.lesson.title, track: r.track.slug, trackTitle: r.track.title, plain: lessonPlainText(r.lesson), level: r.lesson.level }));
const vocab = new Set(lessons.flatMap((l) => l.plain.toLowerCase().match(/[a-z]{5,}/g) ?? []));
const pinned = GLOSSARY.filter((c) => c.pin);

/** One typo: swap two letters in the middle of the longest word (if it's long enough to stay recognisable). */
function typo(term: string): string | null {
  const words = term.split(" ");
  const i = words.reduce((best, w, k) => (w.length > words[best].length ? k : best), 0);
  const w = words[i];
  if (w.length < 7 || !/^[a-z]+$/i.test(w)) return null;
  const m = Math.floor(w.length / 2);
  words[i] = w.slice(0, m - 1) + w[m] + w[m - 1] + w.slice(m + 1);
  return words.join(" ");
}

export function angles(term: string): string[] {
  const t = term.toLowerCase();
  const out = [
    `what is ${t}`,
    `What is ${term}?`,
    `what's ${t}`,
    `whats ${t}`,
    `define ${t}`,
    `${t} meaning`,
    `meaning of ${t}`,
    `explain ${t}`,
    `can you explain ${t}`,
    `tell me about ${t}`,
    `${t}`,
    `${term.toUpperCase()}?`,
  ];
  const ty = typo(t);
  if (ty) out.push(`what is ${ty}`);
  return out;
}

describe("pinned answers still exist word-for-word", () => {
  for (const c of pinned)
    it(c.name, () => {
      const holder = lessons.find((l) => findLine(l.plain, c.pin!.lead));
      expect(holder, `no lesson line starts with “${c.pin!.lead}”`).toBeTruthy();
      for (const a of c.pin!.also ?? []) expect(findLine(holder!.plain, a), `follow-on “${a}” missing`).toBeTruthy();
    });
});

describe("basics from every angle", () => {
  for (const c of pinned) {
    // Ask with the concept's name and with the first everyday alias, if different.
    const terms = [...new Set([c.name, c.aliases[0]])].filter((t) => !/[/()]/.test(t));
    for (const term of terms)
      for (const q of angles(term))
        it(`${c.name} ← “${q}”`, () => {
          const u = understand(q, vocab);
          expect(u.concepts[0]?.name, `understood as ${u.concepts[0]?.name ?? "nothing"}`).toBe(c.name);
          const a = instantAnswer(u, lessons, []);
          expect(a?.answer.startsWith(c.pin!.lead), `answered: ${a?.answer ?? "nothing (passed up)"}`).toBe(true);
        });
  }
});
