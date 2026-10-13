/*
 * The bot exam: every question in the bank (examQuestions.ts), simple to hard, run against the real lessons.
 * When someone reports a bad result, add the question to the bank first, then fix the bot until the whole
 * exam passes again — so it only ever gets more sensible. `npx tsx scripts/bot-report.mts` shows the answers.
 */
import { describe, expect, it } from "vitest";
import { allLessons } from "@/content";
import { lessonPlainText } from "@/lib/learning/flashcards";
import { EXAM_QUESTIONS } from "./examQuestions";
import { gradeCase } from "./grade";
import type { InstantLesson } from "./instant";

const lessons: InstantLesson[] = allLessons().map((r) => ({ id: r.id, title: r.lesson.title, track: r.track.slug, trackTitle: r.track.title, plain: lessonPlainText(r.lesson), level: r.lesson.level }));
const vocab = new Set(lessons.flatMap((l) => l.plain.toLowerCase().match(/[a-z]{5,}/g) ?? []));

describe("bot exam", () => {
  for (const c of EXAM_QUESTIONS)
    it(`[${c.level}] ${c.q}`, () => {
      const { a, miss } = gradeCase(c, lessons, vocab);
      expect(miss, a ? `answered: ${a.answer}` : "passed up").toEqual([]);
      // Whatever it shows must be verbatim from the lesson it cites.
      if (a) {
        const plain = lessons.find((l) => l.id === a.lesson.id)!.plain.replace(/\s+/g, " ");
        for (const s of [a.answer, ...a.excerpt]) expect(plain).toContain(s);
      }
    });
});
