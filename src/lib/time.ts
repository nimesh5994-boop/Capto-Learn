const DAY_MS = 86_400_000;

export function olderThanDays(d: Date | string | null | undefined, days: number, now = Date.now()): boolean {
  return d ? now - new Date(d).getTime() > days * DAY_MS : false;
}

export function daysAgo(days: number, now = Date.now()): Date {
  return new Date(now - days * DAY_MS);
}
