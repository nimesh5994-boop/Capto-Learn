import "server-only";
import { and, desc, eq, gte, isNotNull, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { kbDocuments, kbSyncRuns, lessonProgress, researchQueries, savedResearch } from "@/lib/db/schema";
import { getLesson } from "@/content";
import { storedVersions } from "@/lib/kb/search";
import { topicsForDoc } from "@/lib/kb/topics";
import { changedSince, pinnedVersions } from "@/lib/research/saved";
import { DIGEST_GUIDANCE_CAP, digestTopics, type Digest } from "./digestRules";

/** Most changed pages read for one person's digest (a busy week can touch a few hundred). */
const MAX_PAGES = 2000;

/**
 * Builds one person's "what changed" digest since `since`. Free: database only, no AI and no network.
 * Used by the weekly email and the dashboard card.
 */
export async function buildDigest(p: { userId: string; orgId: string; chosenTopics: string[]; canRegister: boolean }, since: Date): Promise<Digest> {
  const db = await getDb();
  const [saved, approved, studied, pages, runs] = await Promise.all([
    db
      .select({ queryId: savedResearch.queryId, title: savedResearch.title, sourceVersions: savedResearch.sourceVersions })
      .from(savedResearch)
      .where(and(eq(savedResearch.userId, p.userId), eq(savedResearch.organizationId, p.orgId))),
    p.canRegister
      ? db
          .select({ id: researchQueries.id, question: researchQueries.question, answer: researchQueries.answer })
          .from(researchQueries)
          .where(and(eq(researchQueries.organizationId, p.orgId), eq(researchQueries.reviewStatus, "approved"), isNotNull(researchQueries.answer)))
      : Promise.resolve([]),
    db.selectDistinct({ track: lessonProgress.trackSlug }).from(lessonProgress).where(eq(lessonProgress.userId, p.userId)),
    db
      .select({ url: kbDocuments.url, title: kbDocuments.title, collection: kbDocuments.collection, updatedAt: kbDocuments.sourceUpdatedAt })
      .from(kbDocuments)
      .where(and(isNull(kbDocuments.removedAt), gte(kbDocuments.sourceUpdatedAt, since)))
      .orderBy(desc(kbDocuments.sourceUpdatedAt))
      .limit(MAX_PAGES),
    db.select({ lessons: kbSyncRuns.lessonsAffected }).from(kbSyncRuns).where(and(isNotNull(kbSyncRuns.finishedAt), gte(kbSyncRuns.finishedAt, since))),
  ]);

  // Saved and approved answers: compare each source's pinned date with the knowledge base now.
  const pinnedApproved = approved.map((a) => ({ ...a, pinned: pinnedVersions(a.answer!) }));
  const current = await storedVersions([...new Set([...saved.flatMap((s) => Object.keys(s.sourceVersions)), ...pinnedApproved.flatMap((a) => Object.keys(a.pinned))])]);
  const savedChanged = saved.map((s) => ({ queryId: s.queryId, title: s.title, changed: changedSince(s.sourceVersions, current).length })).filter((s) => s.changed > 0);
  const approvedChanged = pinnedApproved.map((a) => ({ queryId: a.id, question: a.question, changed: changedSince(a.pinned, current).length })).filter((a) => a.changed > 0);

  const topics = new Set(digestTopics(p.chosenTopics, studied.map((s) => s.track)));
  const inTopics = pages
    .map((g) => ({ title: g.title, url: g.url, topics: topicsForDoc(g.collection, g.title).filter((t) => topics.has(t)), updatedAt: g.updatedAt!.toISOString() }))
    .filter((g) => g.topics.length > 0);

  const lessonIds = [...new Set(runs.flatMap((r) => r.lessons))];
  const lessons = lessonIds
    .map((id) => getLesson(id))
    .filter((l): l is NonNullable<typeof l> => !!l && topics.has(l.track.slug))
    .map((l) => ({ id: l.id, title: l.lesson.title, trackTitle: l.track.title }));

  return { saved: savedChanged, approved: approvedChanged, guidance: inTopics.slice(0, DIGEST_GUIDANCE_CAP), guidanceTotal: inTopics.length, lessons };
}
