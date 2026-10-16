/*
 * "What's changed": groups recently updated official pages for the HMRC updates page, and links each one to the
 * lessons that cite it. Pure (no database), so it's unit-tested; the page does the querying.
 */
import { GUIDANCE_ORGS, LEGISLATION, MANUALS } from "./collections";

/** Same page whatever the link spelling: drops #fragment, ?query, trailing slash and the www/http variants. */
export function normaliseSourceUrl(u: string): string {
  return u
    .trim()
    .replace(/[#?].*$/, "")
    .replace(/\/$/, "")
    .replace(/^https?:\/\/(www\.)?gov\.uk/, "https://www.gov.uk")
    .replace(/^https?:\/\/(www\.)?legislation\.gov\.uk/, "https://www.legislation.gov.uk");
}

const LABELS = new Map<string, string>([...MANUALS.map((m) => [m.slug, m.label] as const), ...GUIDANCE_ORGS.map((g) => [g.slug, g.label] as const), ...LEGISLATION.map((a) => [a.id, a.label] as const)]);
export const collectionLabel = (slug: string): string => LABELS.get(slug) ?? slug;

export interface UpdatedDoc {
  url: string;
  title: string;
  collection: string;
  publisher: string;
  sourceUpdatedAt: Date;
}

export interface CitingLesson {
  id: string;
  title: string;
  trackTitle: string;
}

export interface UpdateGroup {
  collection: string;
  label: string;
  docs: (UpdatedDoc & { lessons: CitingLesson[] })[];
}

/**
 * Attaches citing lessons to each doc, then groups by collection: groups with pages our lessons cite first,
 * then the busiest, then alphabetical. Within a group the newest change comes first.
 */
export function groupUpdates(docs: UpdatedDoc[], lessons: { id: string; title: string; trackTitle: string; sourceUrls: string[] }[]): { cited: (UpdatedDoc & { lessons: CitingLesson[] })[]; groups: UpdateGroup[] } {
  const citing = new Map<string, CitingLesson[]>();
  for (const l of lessons) {
    for (const u of new Set(l.sourceUrls.map(normaliseSourceUrl))) {
      const list = citing.get(u) ?? [];
      list.push({ id: l.id, title: l.title, trackTitle: l.trackTitle });
      citing.set(u, list);
    }
  }
  const withLessons = [...docs]
    .sort((a, b) => b.sourceUpdatedAt.getTime() - a.sourceUpdatedAt.getTime())
    .map((d) => ({ ...d, lessons: citing.get(normaliseSourceUrl(d.url)) ?? [] }));

  const byCollection = new Map<string, UpdateGroup>();
  for (const d of withLessons) {
    const g = byCollection.get(d.collection) ?? { collection: d.collection, label: collectionLabel(d.collection), docs: [] };
    g.docs.push(d);
    byCollection.set(d.collection, g);
  }
  const citedCount = (g: UpdateGroup) => g.docs.filter((d) => d.lessons.length).length;
  const groups = [...byCollection.values()].sort((a, b) => citedCount(b) - citedCount(a) || b.docs.length - a.docs.length || a.label.localeCompare(b.label));
  return { cited: withLessons.filter((d) => d.lessons.length), groups };
}

/** Periods offered on the page, in days. Anything else falls back to the default (7). */
export const UPDATE_PERIODS = [7, 30, 90] as const;
export function parsePeriod(raw: string | undefined): (typeof UPDATE_PERIODS)[number] {
  const n = Number(raw);
  return (UPDATE_PERIODS as readonly number[]).includes(n) ? (n as (typeof UPDATE_PERIODS)[number]) : 7;
}
