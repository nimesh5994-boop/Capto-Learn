import "server-only";
import { allLessons } from "@/content";
import { lessonFlashcards } from "@/content/flashcards";
import { lessonPlainText } from "@/lib/learning/flashcards";
import type { ResearchAnswer } from "@/lib/research/types";
import { instantAnswer, type InstantAnswer, type InstantLesson } from "./instant";
import { understand, type Understanding } from "./understand";

/* Level 1 wiring: the lesson library and fact cards, prepared once per server instance. */

let cache: { lessons: InstantLesson[]; vocab: Set<string> } | null = null;
function library() {
  if (cache) return cache;
  const lessons = allLessons().map((r) => ({ id: r.id, title: r.lesson.title, track: r.track.slug, trackTitle: r.track.title, plain: lessonPlainText(r.lesson), level: r.lesson.level }));
  const vocab = new Set(lessons.flatMap((l) => l.plain.toLowerCase().match(/[a-z]{5,}/g) ?? []));
  return (cache = { lessons, vocab });
}

export function readQuestion(question: string): Understanding {
  return understand(question, library().vocab);
}

export function localAnswer(question: string): { u: Understanding; instant: InstantAnswer | null } {
  const { lessons } = library();
  const u = readQuestion(question);
  const cards = lessons.flatMap((l) => lessonFlashcards(l.id));
  return { u, instant: instantAnswer(u, lessons, cards) };
}

/** An instant answer in the same shape as a researched one, so it is stored and shown the same way. */
export function instantToResearch(a: InstantAnswer, u: Understanding): ResearchAnswer {
  const quotes = [a.answer, ...a.excerpt];
  return {
    shortAnswer: a.answer,
    steps: [],
    example: null,
    points: [
      {
        level: "essentials",
        heading: a.kind === "flashcard" ? "From Capto's checked fact cards" : `From the lesson: ${a.lesson.title}`,
        text: a.excerpt.length ? a.excerpt.join(" ") : a.answer,
        citations: quotes.slice(0, 3).map((q) => ({ sourceId: "L1", quote: q, verified: true })),
        verified: true,
      },
    ],
    caveats: [a.basis + ". Instant answers quote Capto's own material only — use “Full cited answer” for HMRC's wording or your client's specific facts."],
    followUps: [],
    confidence: "medium",
    taxYear: null,
    sources: [{ id: "L1", kind: "lesson", url: `/learn/${a.lesson.id}`, title: `${a.lesson.title} (${a.lesson.trackTitle})`, publisher: "Capto Learn lesson", updatedAt: null }],
    relatedLessons: [{ id: a.lesson.id, title: a.lesson.title, track: a.lesson.trackTitle }],
    route: { complexity: "simple", model: "capto-instant", escalated: false },
    tier: { level: 1, label: "Instant", reason: `${u.concepts[0]?.name ?? "Recognised topic"} · answered from Capto material with no AI` },
    model: "capto-instant",
    generatedAt: new Date().toISOString(),
  };
}
