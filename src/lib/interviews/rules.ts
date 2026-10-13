/*
 * Interview tests — the pure rules: which questions a candidate gets, how they're marked, and how the
 * integrity log is judged. No I/O; unit-tested.
 */
import { createHash, randomBytes } from "node:crypto";

export type Level = "foundation" | "practitioner" | "advanced";
export type Difficulty = "trainee" | "experienced" | "senior";

export const DIFFICULTIES: Record<Difficulty, { label: string; blurb: string; mix: Record<Level, number> }> = {
  trainee: { label: "Trainee / junior", blurb: "Mostly Foundation, some Practitioner", mix: { foundation: 0.7, practitioner: 0.3, advanced: 0 } },
  experienced: { label: "Experienced", blurb: "Mostly Practitioner, with Foundation and Advanced", mix: { foundation: 0.25, practitioner: 0.5, advanced: 0.25 } },
  senior: { label: "Senior / manager", blurb: "Mostly Advanced and Practitioner", mix: { foundation: 0, practitioner: 0.4, advanced: 0.6 } },
};

/** What the candidate confirms before starting. Stored word for word with their typed name. */
export const DECLARATION = [
  "I will not use AI tools (such as ChatGPT, Copilot or Gemini), search engines, notes, books or anyone else's help during this test.",
  "I will stay on this page, in full screen, until I finish. I understand that leaving the page, switching tabs or apps, and pasting are recorded and shared with the firm.",
  "The answers I give are entirely my own work.",
];

export interface PoolTrack {
  slug: string;
  lessons: { id: string; level: Level; questionIds: string[] }[];
}

export interface PickedQuestion {
  lessonId: string;
  questionId: string;
  track: string;
  level: Level;
}

const rank = (seed: string, key: string) => createHash("sha256").update(`${seed}|${key}`).digest("hex");

/** How many questions of each level, rounded so the total is exactly `count`. */
export function levelQuota(count: number, difficulty: Difficulty): Record<Level, number> {
  const mix = DIFFICULTIES[difficulty].mix;
  const levels: Level[] = ["foundation", "practitioner", "advanced"];
  const raw = levels.map((l) => count * mix[l]);
  const out = raw.map(Math.floor);
  let left = count - out.reduce((a, b) => a + b, 0);
  // Hand out the remainder to the largest fractional parts.
  for (const i of raw.map((r, i) => ({ i, f: r - Math.floor(r) })).sort((a, b) => b.f - a.f).map((x) => x.i)) {
    if (left <= 0) break;
    if (mix[levels[i]] > 0) {
      out[i]++;
      left--;
    }
  }
  return { foundation: out[0], practitioner: out[1], advanced: out[2] };
}

/**
 * The candidate's questions: spread evenly across the chosen subjects, at the difficulty's mix of levels,
 * one question per lesson where possible, in a shuffled order unique to this test.
 */
export function pickInterviewQuestions(pool: PoolTrack[], tracks: string[], count: number, difficulty: Difficulty, seed: string): PickedQuestion[] {
  const chosen = pool.filter((t) => tracks.includes(t.slug));
  const quota = levelQuota(count, difficulty);
  const picked: PickedQuestion[] = [];
  const usedLessons = new Set<string>();
  for (const level of ["foundation", "practitioner", "advanced"] as Level[]) {
    // Candidate questions at this level, per subject, each subject's list in this test's own random order.
    const perTrack = chosen.map((t) =>
      t.lessons
        .filter((l) => l.level === level)
        .flatMap((l) => l.questionIds.map((q) => ({ lessonId: l.id, questionId: q, track: t.slug, level })))
        .sort((a, b) => rank(seed, `${a.lessonId}#${a.questionId}`).localeCompare(rank(seed, `${b.lessonId}#${b.questionId}`)))
    );
    let need = quota[level];
    const countOf = (slug: string) => picked.filter((p) => p.track === slug).length;
    // Round-robin across subjects, the subject with fewest questions so far going first; prefer unused lessons.
    for (let pass = 0; pass < 2 && need > 0; pass++) {
      let progress = true;
      while (need > 0 && progress) {
        progress = false;
        const order = perTrack.map((list, i) => ({ list, slug: chosen[i].slug })).sort((a, b) => countOf(a.slug) - countOf(b.slug));
        for (const { list } of order) {
          if (need <= 0) break;
          const idx = list.findIndex((q) => (pass === 0 ? !usedLessons.has(q.lessonId) : true) && !picked.some((p) => p.lessonId === q.lessonId && p.questionId === q.questionId));
          if (idx < 0) continue;
          const [q] = list.splice(idx, 1);
          picked.push(q);
          usedLessons.add(q.lessonId);
          need--;
          progress = true;
        }
      }
    }
  }
  return picked.sort((a, b) => rank(seed, `order|${a.lessonId}#${a.questionId}`).localeCompare(rank(seed, `order|${b.lessonId}#${b.questionId}`)));
}

export interface Marked {
  score: number;
  right: number;
  total: number;
  bySubject: Record<string, { right: number; total: number }>;
  byLevel: Record<Level, { right: number; total: number }>;
}

export function markInterview(questions: PickedQuestion[], answers: Record<string, { choice: number }>, key: (q: PickedQuestion) => number | undefined): Marked {
  const bySubject: Marked["bySubject"] = {};
  const byLevel: Marked["byLevel"] = { foundation: { right: 0, total: 0 }, practitioner: { right: 0, total: 0 }, advanced: { right: 0, total: 0 } };
  let right = 0;
  for (const q of questions) {
    const ok = answers[`${q.lessonId}#${q.questionId}`]?.choice === key(q);
    if (ok) right++;
    (bySubject[q.track] ??= { right: 0, total: 0 }).total++;
    if (ok) bySubject[q.track].right++;
    byLevel[q.level].total++;
    if (ok) byLevel[q.level].right++;
  }
  return { score: questions.length ? Math.round((right / questions.length) * 100) : 0, right, total: questions.length, bySubject, byLevel };
}

export type IntegrityEvent = { t: string; type: string; ms?: number };
export type IntegrityFlag = "clear" | "review" | "concern";

export interface Integrity {
  leftPage: number;
  awaySeconds: number;
  fullscreenExits: number;
  pasteAttempts: number;
  copyAttempts: number;
  flag: IntegrityFlag;
  reasons: string[];
}

/**
 * Judges the event log. "clear": nothing notable. "review": a brief, isolated lapse worth asking about.
 * "concern": repeated or long absences, or paste attempts — the result should not be relied on without a re-test.
 */
export function judgeIntegrity(events: IntegrityEvent[]): Integrity {
  const leftPage = events.filter((e) => e.type === "left").length;
  const awaySeconds = Math.round(events.filter((e) => e.type === "returned").reduce((n, e) => n + (e.ms ?? 0), 0) / 1000);
  const fullscreenExits = events.filter((e) => e.type === "fullscreen-exit").length;
  const pasteAttempts = events.filter((e) => e.type === "paste").length;
  const copyAttempts = events.filter((e) => e.type === "copy").length;
  const reasons: string[] = [];
  if (leftPage) reasons.push(`Left the test ${leftPage} time${leftPage === 1 ? "" : "s"} (${awaySeconds}s away in total)`);
  if (fullscreenExits) reasons.push(`Exited full screen ${fullscreenExits} time${fullscreenExits === 1 ? "" : "s"}`);
  if (pasteAttempts) reasons.push(`Tried to paste ${pasteAttempts} time${pasteAttempts === 1 ? "" : "s"}`);
  if (copyAttempts) reasons.push(`Tried to copy ${copyAttempts} time${copyAttempts === 1 ? "" : "s"}`);
  const flag: IntegrityFlag = pasteAttempts > 0 || leftPage >= 3 || awaySeconds > 30 ? "concern" : leftPage > 0 || fullscreenExits > 0 || copyAttempts > 0 ? "review" : "clear";
  return { leftPage, awaySeconds, fullscreenExits, pasteAttempts, copyAttempts, flag, reasons };
}

/** A link token (secret, in the URL) and a short code for typing in (no look-alike characters). */
export function newCredentials(): { token: string; code: string } {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(8);
  const code = Array.from({ length: 8 }, (_, i) => alphabet[bytes[i] % alphabet.length]).join("");
  return { token: randomBytes(24).toString("base64url"), code: `${code.slice(0, 4)}-${code.slice(4)}` };
}

export const hashSecret = (s: string) => createHash("sha256").update(s).digest("hex");
