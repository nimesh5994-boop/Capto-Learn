/*
 * Eyeball report for the Level 1 question bot: runs every question in the exam bank and prints what the bot
 * understood and the instant answer it would give, marking anything that misses its expectations.
 *
 *   npx tsx scripts/bot-report.mts            all questions
 *   npx tsx scripts/bot-report.mts --fails    only the ones that miss
 */
import { allLessons } from "../src/content/index.ts";
import { lessonPlainText } from "../src/lib/learning/flashcards.ts";
import type { InstantLesson } from "../src/lib/search/instant.ts";
import { gradeCase } from "../src/lib/search/grade.ts";
import { EXAM_QUESTIONS } from "../src/lib/search/examQuestions.ts";

const lessons: InstantLesson[] = allLessons().map((r) => ({ id: r.id, title: r.lesson.title, track: r.track.slug, trackTitle: r.track.title, plain: lessonPlainText(r.lesson), level: r.lesson.level }));
const vocab = new Set(lessons.flatMap((l) => l.plain.toLowerCase().match(/[a-z]{5,}/g) ?? []));
const failsOnly = process.argv.includes("--fails");

let pass = 0;
for (const c of EXAM_QUESTIONS) {
  const { u, a, miss } = gradeCase(c, lessons, vocab);
  if (!miss.length) pass++;
  if (failsOnly && !miss.length) continue;
  console.log(`\n${miss.length ? "✗" : "✓"} [${c.level}] ${c.q}`);
  console.log(`   understood: ${u.concepts.map((x) => x.name).join(" + ") || "—"} · ${u.intent} · ${u.topics.slice(0, 2).join(", ") || "—"}${u.corrections.length ? ` · fixed ${u.corrections.map((x) => `${x.from}→${x.to}`).join(", ")}` : ""}`);
  if (a) console.log(`   instant (${a.lesson.id}): ${a.answer.slice(0, 180)}`);
  else console.log("   instant: — (passes up to Ask Capto)");
  if (miss.length) console.log(`   MISS: ${miss.join("; ")}`);
}
console.log(`\n${pass}/${EXAM_QUESTIONS.length} sensible.`);
