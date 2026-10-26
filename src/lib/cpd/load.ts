import "server-only";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { cpdEntries } from "@/lib/db/schema";
import { getLesson } from "@/content";
import { myProgress } from "@/lib/learning/progress";
import { isCpdKind, type CpdRow } from "./log";

/** Everything a person has done for CPD: completed Capto lessons plus activity they logged themselves, newest first. */
export async function loadCpdRows(orgId: string, userId: string): Promise<CpdRow[]> {
  const db = await getDb();
  const [progress, manual] = await Promise.all([myProgress(userId), db.select().from(cpdEntries).where(and(eq(cpdEntries.organizationId, orgId), eq(cpdEntries.userId, userId)))]);
  const lessons: CpdRow[] = [...progress.values()]
    .filter((p) => p.status === "completed" && p.completedAt)
    .flatMap((p) => {
      const ref = getLesson(p.lessonId);
      if (!ref) return [];
      return [{ source: "lesson" as const, id: p.lessonId, date: p.completedAt!, title: ref.lesson.title, provider: `Capto Learn · ${ref.track.title}`, kind: "structured" as const, minutes: ref.lesson.minutes, reflection: "", link: `/learn/${p.lessonId}` }];
    });
  const own: CpdRow[] = manual.map((m) => ({ source: "manual", id: m.id, date: m.activityDate, title: m.title, provider: m.provider, kind: isCpdKind(m.kind) ? m.kind : "other", minutes: m.minutes, reflection: m.reflection, link: "" }));
  return [...lessons, ...own].sort((a, b) => b.date.getTime() - a.date.getTime());
}
