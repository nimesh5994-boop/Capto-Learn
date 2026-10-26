/*
 * CPD record: merges a person's completed Capto lessons with CPD they logged themselves (webinars, courses elsewhere,
 * reading, conferences), groups it by calendar year with totals, and renders the CSV. Pure, so it's unit-tested.
 * No professional body's hours requirement is hard-coded: bodies differ and change, so the page shows totals only.
 */

export const CPD_KINDS = {
  course: "Course or training event",
  webinar: "Webinar or online learning",
  conference: "Conference or seminar",
  reading: "Reading or self-study",
  coaching: "Coaching, mentoring or on-the-job learning",
  other: "Other",
} as const;
export type CpdKind = keyof typeof CPD_KINDS;
export const isCpdKind = (v: string): v is CpdKind => v in CPD_KINDS;

export interface CpdRow {
  /** "lesson" rows come from completed Capto lessons; "manual" rows were logged by the person. */
  source: "lesson" | "manual";
  id: string;
  date: Date;
  title: string;
  provider: string;
  kind: CpdKind | "structured";
  minutes: number;
  reflection: string;
  link: string;
}

export interface ManualInput {
  date: string;
  title: string;
  provider: string;
  kind: string;
  hours: string;
  minutes: string;
  reflection: string;
}

export type ManualClean = { ok: true; value: { date: Date; title: string; provider: string; kind: CpdKind; minutes: number; reflection: string } } | { ok: false; error: string };

/** Validates a hand-typed CPD entry: a real, non-future date, a title, a sensible duration. */
export function cleanManualEntry(i: ManualInput, now = new Date()): ManualClean {
  const title = i.title.trim().slice(0, 200);
  if (title.length < 3) return { ok: false, error: "Give the activity a short title." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(i.date)) return { ok: false, error: "Choose the date of the activity." };
  const date = new Date(`${i.date}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return { ok: false, error: "That date isn't valid." };
  if (date.getTime() > now.getTime() + 86_400_000) return { ok: false, error: "The activity date can't be in the future." };
  const h = i.hours.trim() === "" ? 0 : Number(i.hours);
  const m = i.minutes.trim() === "" ? 0 : Number(i.minutes);
  if (!Number.isFinite(h) || !Number.isFinite(m) || h < 0 || m < 0) return { ok: false, error: "Enter the time as hours and/or minutes." };
  const minutes = Math.round(h * 60 + m);
  if (minutes < 5) return { ok: false, error: "Enter at least 5 minutes." };
  if (minutes > 24 * 60) return { ok: false, error: "A single activity can't be more than 24 hours; split it into days." };
  const kind = isCpdKind(i.kind) ? i.kind : "other";
  return { ok: true, value: { date, title, provider: i.provider.trim().slice(0, 200), kind, minutes, reflection: i.reflection.trim().slice(0, 2000) } };
}

export interface YearSummary {
  year: number;
  lessonMinutes: number;
  manualMinutes: number;
  totalMinutes: number;
  entries: number;
}

/** Calendar-year totals, newest year first. */
export function summariseByYear(rows: CpdRow[]): YearSummary[] {
  const by = new Map<number, YearSummary>();
  for (const r of rows) {
    const year = r.date.getUTCFullYear();
    const y = by.get(year) ?? { year, lessonMinutes: 0, manualMinutes: 0, totalMinutes: 0, entries: 0 };
    if (r.source === "lesson") y.lessonMinutes += r.minutes;
    else y.manualMinutes += r.minutes;
    y.totalMinutes += r.minutes;
    y.entries += 1;
    by.set(year, y);
  }
  return [...by.values()].sort((a, b) => b.year - a.year);
}

/** "12 h 30 min", "45 min", "3 h". */
export function formatMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (!h) return `${rest} min`;
  return rest ? `${h} h ${rest} min` : `${h} h`;
}

const cell = (v: string | number) => {
  const s = String(v);
  // A leading = + - @ would be run as a formula by a spreadsheet; keep the text but defuse it.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};

export function cpdCsv(rows: CpdRow[], baseUrl: string): string {
  const header = ["Date", "Activity", "Provider", "Type", "Hours", "Reflection / what I learned", "Evidence link"];
  const body = [...rows]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((r) => [r.date.toISOString().slice(0, 10), r.title, r.provider, r.kind === "structured" ? "Structured: Capto Learn e-learning" : CPD_KINDS[r.kind], (r.minutes / 60).toFixed(2), r.reflection, r.link ? `${baseUrl}${r.link}` : ""]);
  return `${[header, ...body].map((r) => r.map(cell).join(",")).join("\r\n")}\r\n`;
}
