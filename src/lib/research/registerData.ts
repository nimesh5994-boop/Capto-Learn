import "server-only";
import { and, desc, eq, gte, inArray, isNull, lt, type SQL } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { researchExports, researchQueries, users } from "@/lib/db/schema";
import { matchesRegister, type ReviewFilter } from "./register";

export interface RegisterFilters {
  review: ReviewFilter;
  userId?: string | null;
  from?: Date | null;
  /** Inclusive day: everything before the start of the next day. */
  to?: Date | null;
  q?: string;
}

/** Hard cap on one view or download (a firm asks a few hundred questions a month at most). */
export const REGISTER_MAX = 5000;

export async function loadRegister(orgId: string, f: RegisterFilters) {
  const db = await getDb();
  const where: SQL[] = [eq(researchQueries.organizationId, orgId)];
  if (f.review === "none") where.push(isNull(researchQueries.reviewStatus));
  else if (f.review !== "all") where.push(eq(researchQueries.reviewStatus, f.review));
  if (f.userId) where.push(eq(researchQueries.userId, f.userId));
  if (f.from) where.push(gte(researchQueries.createdAt, f.from));
  if (f.to) where.push(lt(researchQueries.createdAt, new Date(f.to.getTime() + 86_400_000)));

  const rows = await db
    .select({
      id: researchQueries.id,
      question: researchQueries.question,
      status: researchQueries.status,
      answer: researchQueries.answer,
      route: researchQueries.route,
      costMicros: researchQueries.costMicros,
      helpful: researchQueries.helpful,
      shared: researchQueries.shared,
      reviewStatus: researchQueries.reviewStatus,
      reviewedByName: researchQueries.reviewedByName,
      reviewedAt: researchQueries.reviewedAt,
      reviewNote: researchQueries.reviewNote,
      createdAt: researchQueries.createdAt,
      userId: researchQueries.userId,
      askedBy: users.name,
    })
    .from(researchQueries)
    .leftJoin(users, eq(users.id, researchQueries.userId))
    .where(and(...where))
    .orderBy(desc(researchQueries.createdAt))
    .limit(REGISTER_MAX);

  const ids = rows.map((r) => r.id);
  const exports = ids.length
    ? await db.select().from(researchExports).where(and(eq(researchExports.organizationId, orgId), inArray(researchExports.queryId, ids))).orderBy(desc(researchExports.createdAt))
    : [];
  const byQuery = new Map<string, typeof exports>();
  for (const e of exports) byQuery.set(e.queryId, [...(byQuery.get(e.queryId) ?? []), e]);

  const list = rows
    .map((r) => {
      const docs = byQuery.get(r.id) ?? [];
      const checked = r.answer ? [...r.answer.points, ...(r.answer.steps ?? [])] : [];
      return {
        ...r,
        askedBy: r.askedBy ?? "Former member",
        verified: checked.filter((p) => p.verified).length,
        checked: checked.length,
        confidence: r.answer?.confidence ?? null,
        taxYear: r.answer?.taxYear ?? null,
        reused: !!r.answer?.reuse,
        docs,
      };
    })
    .filter((r) => !f.q || matchesRegister(f.q, { question: r.question, askedBy: r.askedBy, docRefs: r.docs.map((d) => d.docRef) }));
  return { rows: list, documents: list.flatMap((r) => r.docs.map((d) => ({ ...d, question: r.question }))), capped: rows.length >= REGISTER_MAX };
}

/** People who have asked at least one question, for the "asked by" filter. */
export async function registerPeople(orgId: string) {
  const db = await getDb();
  return db.selectDistinct({ id: users.id, name: users.name }).from(researchQueries).innerJoin(users, eq(users.id, researchQueries.userId)).where(eq(researchQueries.organizationId, orgId)).orderBy(users.name);
}
