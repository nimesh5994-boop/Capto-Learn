import "server-only";
import { and, asc, eq, gt, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { caseRefs, kbDocuments, kbPassages } from "@/lib/db/schema";
import { caseTitle, extractCaseMentions, mergeCaseMentions, type RawCaseRef } from "./caseRefs";

/*
 * The case law index: which court and tribunal decisions our mirrored HMRC manuals and GOV.UK guidance cite,
 * and where. Built only from our own knowledge base (Crown copyright, Open Government Licence). It never
 * touches Find Case Law: each case gets a link built from its citation (see caseRefs.ts).
 */

/** Cheap SQL prefilter: a bracketed year, or a tribunal decision number. Only these passages are parsed. */
const PREFILTER = String.raw`[[(](19|20)[0-9]{2}[])]|TC ?[0-9]{5}|VTD ?[0-9]{3}|S[Pp] ?C ?[0-9]{2}`;
const BATCH = 2000;
const MAX_MENTIONS = 50;

export interface CaseIndexResult {
  cases: number;
  /** Case mentions found (one per citation run in a passage). */
  mentions: number;
  /** Pages citing at least one case. */
  citingPages: number;
  passagesScanned: number;
  ms: number;
}

/**
 * Rebuilds case_refs from kb_passages. Reads in id-ordered batches (memory stays flat however large the
 * knowledge base grows), parses in memory, then replaces the table in one transaction, so readers never see
 * a half-built index and a run that dies early leaves the previous index in place.
 */
export async function rebuildCaseIndex(): Promise<CaseIndexResult> {
  const t0 = Date.now();
  const db = await getDb();
  const mentions: RawCaseRef[] = [];
  const mentionDoc: string[] = [];
  const titles = new Map<string, string>();
  let scanned = 0;
  let after: string | null = null;
  for (;;) {
    const rows: { id: string; url: string; title: string; body: string }[] = await db
      .select({ id: kbPassages.id, url: kbDocuments.url, title: kbDocuments.title, body: kbPassages.body })
      .from(kbPassages)
      .innerJoin(kbDocuments, eq(kbDocuments.url, kbPassages.documentUrl))
      .where(and(isNull(kbDocuments.removedAt), sql`${kbPassages.body} ~ ${PREFILTER}`, after ? gt(kbPassages.id, after) : undefined))
      .orderBy(asc(kbPassages.id))
      .limit(BATCH);
    if (!rows.length) break;
    scanned += rows.length;
    for (const r of rows) {
      const found = extractCaseMentions(r.body);
      if (!found.length) continue;
      titles.set(r.url, r.title);
      for (const m of found) {
        mentions.push(m);
        mentionDoc.push(r.url);
      }
    }
    after = rows[rows.length - 1].id;
    if (rows.length < BATCH) break;
  }

  const now = new Date();
  const groups = mergeCaseMentions(mentions);
  const values = groups.map(({ ref, members }) => {
    const urls = [...new Set(members.map((i) => mentionDoc[i]))].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
    return {
      key: ref.key,
      name: caseTitle(ref),
      citations: ref.citations,
      url: ref.url,
      linkKind: ref.linkKind,
      year: ref.year,
      court: ref.court,
      mentions: urls.slice(0, MAX_MENTIONS).map((url) => ({ url, title: titles.get(url) ?? url })),
      mentionCount: urls.length,
      updatedAt: now,
    };
  });

  await db.transaction(async (tx) => {
    await tx.delete(caseRefs);
    for (let i = 0; i < values.length; i += 500) await tx.insert(caseRefs).values(values.slice(i, i + 500));
  });
  return { cases: values.length, mentions: groups.reduce((n, g) => n + g.members.length, 0), citingPages: titles.size, passagesScanned: scanned, ms: Date.now() - t0 };
}
