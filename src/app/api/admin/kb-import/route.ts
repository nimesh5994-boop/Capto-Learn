import { inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { kbDocuments, kbPassages, topicBriefs } from "@/lib/db/schema";
import { refreshTermStats } from "@/lib/kb/sync";
import { rebuildCaseIndex } from "@/lib/cases";

/*
 * One-off bulk import of the knowledge base (public OGL content) into a fresh production database, so a new
 * deployment doesn't have to re-download ~44k GOV.UK pages through time-limited cron runs.
 * Disabled unless KB_IMPORT_SECRET is set; remove that env var after the import and this route returns 404.
 */
export const maxDuration = 300;

type DocRow = typeof kbDocuments.$inferInsert;
type PassageRow = { documentUrl: string; ord: number; heading: string | null; body: string };
type BriefRow = typeof topicBriefs.$inferInsert;

const revive = <T extends Record<string, unknown>>(row: T, dateKeys: string[]): T => {
  const out: Record<string, unknown> = { ...row };
  for (const k of dateKeys) if (typeof out[k] === "string") out[k] = new Date(out[k] as string);
  return out as T;
};

export async function POST(req: Request) {
  const secret = process.env.KB_IMPORT_SECRET;
  if (!secret) return new Response("Not found", { status: 404 });
  if (req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  const body = (await req.json()) as { op: "docs"; documents: DocRow[]; passages: PassageRow[] } | { op: "briefs"; briefs: BriefRow[] } | { op: "finish" };
  const db = await getDb();

  if (body.op === "docs") {
    const docs = body.documents.map((d) => revive(d, ["sourceUpdatedAt", "fetchedAt", "removedAt"]));
    const urls = docs.map((d) => d.url);
    await db.transaction(async (tx) => {
      for (const d of docs) await tx.insert(kbDocuments).values(d).onConflictDoUpdate({ target: kbDocuments.url, set: d });
      await tx.delete(kbPassages).where(inArray(kbPassages.documentUrl, urls));
      for (let i = 0; i < body.passages.length; i += 500) await tx.insert(kbPassages).values(body.passages.slice(i, i + 500));
    });
    return Response.json({ ok: true, documents: docs.length, passages: body.passages.length });
  }
  if (body.op === "briefs") {
    for (const b of body.briefs) {
      const row = revive(b, ["createdAt", "publishedAt"]);
      await db.insert(topicBriefs).values(row).onConflictDoUpdate({ target: topicBriefs.id, set: row });
    }
    return Response.json({ ok: true, briefs: body.briefs.length });
  }
  if (body.op === "finish") {
    await refreshTermStats();
    // The pushed guidance is what the case law index is built from.
    const cases = await rebuildCaseIndex().catch((err) => (console.error("[kb-import] case index", err), null));
    return Response.json({ ok: true, finished: true, cases });
  }
  return Response.json({ error: "unknown op" }, { status: 400 });
}
