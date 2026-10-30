import type { TaxEvent } from "./types";
import { autumnBudget2026 } from "./autumn-budget-2026";

export * from "./types";

/** Every event, newest first. Add a new event file and list it here; older ones stay as the archive. */
export const EVENTS: TaxEvent[] = [autumnBudget2026].sort((a, b) => b.date.localeCompare(a.date));

export const eventBySlug = (slug: string): TaxEvent | undefined => EVENTS.find((e) => e.slug === slug);

export const latestEvent = (): TaxEvent | undefined => EVENTS[0];

/** True while an event is recent enough to feature on the dashboard (default 60 days). */
export function isFeatured(e: TaxEvent, now: Date = new Date(), days = 60): boolean {
  return now.getTime() - new Date(e.date).getTime() <= days * 86_400_000;
}
