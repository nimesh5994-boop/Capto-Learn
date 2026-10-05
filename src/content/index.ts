import type { Lesson, Module, Track } from "./types";
import accounts_production from "./tracks/accounts-production";
import bookkeeping from "./tracks/bookkeeping";
import capital_taxes from "./tracks/capital-taxes";
import cis from "./tracks/cis";
import corporation_tax from "./tracks/corporation-tax";
import cosec from "./tracks/cosec";
import directors from "./tracks/directors";
import foundations from "./tracks/foundations";
import ir35 from "./tracks/ir35";
import payroll from "./tracks/payroll";
import pensions from "./tracks/pensions";
import personal_tax from "./tracks/personal-tax";
import practice from "./tracks/practice";
import rd from "./tracks/rd";
import vat from "./tracks/vat";

/*
 * The curriculum registry. Tracks are plain modules in code; add a new one by importing it here.
 * Everything else (catalogue, lesson pages, search, assignments) reads through these helpers.
 */
const TRACKS: Track[] = [accounts_production, bookkeeping, capital_taxes, cis, corporation_tax, cosec, directors, foundations, ir35, payroll, pensions, personal_tax, practice, rd, vat].sort((a, b) => a.order - b.order);

export interface LessonRef {
  id: string;
  track: Track;
  module: Module;
  lesson: Lesson;
  /** Position in the track's reading order (0-based). */
  index: number;
}

const BY_ID = new Map<string, LessonRef>();
const BY_TRACK = new Map<string, LessonRef[]>();
for (const track of TRACKS) {
  const refs: LessonRef[] = [];
  for (const mod of track.modules)
    for (const lesson of mod.lessons) {
      const ref = { id: `${track.slug}/${lesson.slug}`, track, module: mod, lesson, index: refs.length };
      refs.push(ref);
      BY_ID.set(ref.id, ref);
    }
  BY_TRACK.set(track.slug, refs);
}

export const tracks = (): Track[] => TRACKS;
export const getTrack = (slug: string): Track | undefined => TRACKS.find((t) => t.slug === slug);
export const getLesson = (id: string): LessonRef | undefined => BY_ID.get(id);
export const trackLessons = (slug: string): LessonRef[] => BY_TRACK.get(slug) ?? [];
export const allLessons = (): LessonRef[] => [...BY_ID.values()];

export function moduleLessons(trackSlug: string, moduleSlug: string): LessonRef[] {
  return trackLessons(trackSlug).filter((r) => r.module.slug === moduleSlug);
}

/** Lesson ids covered by an assignment target (track slug, `track/module`, or `track/lesson`). */
export function lessonsForTarget(type: "track" | "module" | "lesson", targetId: string): LessonRef[] {
  if (type === "track") return trackLessons(targetId);
  const [trackSlug, rest] = targetId.split("/");
  if (type === "module") return moduleLessons(trackSlug, rest);
  const ref = getLesson(targetId);
  return ref ? [ref] : [];
}

export function targetTitle(type: "track" | "module" | "lesson", targetId: string): string {
  const [trackSlug, rest] = targetId.split("/");
  const track = getTrack(trackSlug);
  if (!track) return targetId;
  if (type === "track") return track.title;
  if (type === "module") return `${track.title} · ${track.modules.find((m) => m.slug === rest)?.title ?? rest}`;
  return getLesson(targetId)?.lesson.title ?? targetId;
}

export function neighbours(id: string): { prev?: LessonRef; next?: LessonRef } {
  const ref = BY_ID.get(id);
  if (!ref) return {};
  const list = trackLessons(ref.track.slug);
  return { prev: list[ref.index - 1], next: list[ref.index + 1] };
}

/** Plain text of a lesson, for search ranking. */
export function lessonText(l: Lesson): string {
  const blocks = [...l.body, ...(l.scenario?.walkthrough ?? [])]
    .map((b) => (b.kind === "md" || b.kind === "callout" ? b.md : b.kind === "table" ? [b.caption ?? "", ...b.head, ...b.rows.flat()].join(" ") : (b.title ?? "")))
    .join("\n\n");
  return [l.title, l.summary, l.objectives.join(" "), l.scenario?.title ?? "", blocks].join("\n\n");
}
