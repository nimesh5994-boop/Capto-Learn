import type { ExamCase } from "./examQuestions";
import { instantAnswer, type InstantLesson } from "./instant";
import { understand } from "./understand";

/** Marks one exam question: what the bot understood and answered, and every way it missed the expectation. */
export function gradeCase(c: ExamCase, lessons: InstantLesson[], vocab: Set<string>) {
  const u = understand(c.q, vocab);
  const a = instantAnswer(u, lessons, []);
  const e = c.expect;
  const miss: string[] = [];
  if (e.concept && u.concepts[0]?.name !== e.concept) miss.push(`concept ${u.concepts[0]?.name ?? "none"} ≠ ${e.concept}`);
  if (e.topic && u.topics[0] !== e.topic) miss.push(`topic ${u.topics[0] ?? "none"} ≠ ${e.topic}`);
  if (e.intent && u.intent !== e.intent) miss.push(`intent ${u.intent} ≠ ${e.intent}`);
  if (e.instant === "none" && a) miss.push("answered instantly but should pass up");
  if (e.instant === "lesson" && !a) miss.push("no instant answer");
  if (a && e.from && a.lesson.id.split("/")[0] !== e.from) miss.push(`answered from ${a.lesson.id.split("/")[0]} ≠ ${e.from}`);
  if (a && e.lead && !e.lead.some((m) => a.answer.toLowerCase().includes(m))) miss.push(`lead doesn't mention ${e.lead.join("/")}`);
  if (e.entry) {
    const shown = [a?.answer ?? "", ...(a?.excerpt ?? [])].join(" ");
    if (!/\bDr\b/.test(shown) || !/\bCr\b/.test(shown)) miss.push("no Dr/Cr entry shown");
    if (a && e.entryMentions && !e.entryMentions.some((m) => shown.toLowerCase().includes(m))) miss.push(`entry isn't about ${e.entryMentions.join("/")}`);
  }
  return { u, a, miss };
}
