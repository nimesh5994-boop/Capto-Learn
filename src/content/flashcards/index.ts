import { lessonTextHash, type Flashcard } from "@/lib/learning/flashcards";
import { getLesson, trackLessons } from "../index";
import data from "./cards.json";

/*
 * Flashcards drafted by scripts/flashcards.mts and checked word-for-word against their lessons.
 * Cards for a lesson whose text has changed since are hidden until the script is re-run.
 */
const FILE = data as { generatedAt: string; lessons: Record<string, { hash: string; cards: Flashcard[] }> };

export const flashcardsGeneratedAt = (): string => FILE.generatedAt;

export function lessonFlashcards(lessonId: string): Flashcard[] {
  const ref = getLesson(lessonId);
  const entry = FILE.lessons[lessonId];
  return ref && entry && entry.hash === lessonTextHash(ref.lesson) ? entry.cards : [];
}

export function trackFlashcards(slug: string): Flashcard[] {
  return trackLessons(slug).flatMap((r) => lessonFlashcards(r.id));
}
