/*
 * Uploads the local knowledge base (PGlite, .data/) to a deployed Capto Learn via /api/admin/kb-import.
 * Stop the local dev server first (PGlite is single-process).
 *
 *   KB_IMPORT_URL=https://<deployment>/api/admin/kb-import KB_IMPORT_SECRET=... npx tsx scripts/kb-push.mts
 *
 * Content is public GOV.UK guidance (Open Government Licence) plus published platform topic briefs.
 */
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

const url = process.env.KB_IMPORT_URL;
const secret = process.env.KB_IMPORT_SECRET;
if (!url || !secret) {
  console.error("Set KB_IMPORT_URL and KB_IMPORT_SECRET.");
  process.exit(1);
}
const MAX_BYTES = 3_000_000; // stay well under Vercel's 4.5 MB request limit

const db = new PGlite(path.join(process.cwd(), ".data", "pglite"));

async function post(payload: unknown): Promise<unknown> {
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url!, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${secret}` }, body: JSON.stringify(payload) });
    if (res.ok) return res.json();
    const text = await res.text();
    if (res.status < 500 && res.status !== 429) throw new Error(`${res.status} ${text.slice(0, 200)}`);
    await new Promise((r) => setTimeout(r, 2000 * 2 ** i));
  }
  throw new Error("Upload failed after retries");
}

const docs = (
  await db.query<{ url: string; kind: string; collection: string; title: string; publisher: string; source_updated_at: Date | null; content_hash: string; fetched_at: Date; removed_at: Date | null }>(
    "select * from kb_documents order by url"
  )
).rows;
console.log(`${docs.length} documents to upload`);

let batchDocs: unknown[] = [];
let batchPassages: unknown[] = [];
let size = 0;
let sentDocs = 0;
let sentPassages = 0;
const t0 = Date.now();

async function flush() {
  if (!batchDocs.length) return;
  await post({ op: "docs", documents: batchDocs, passages: batchPassages });
  sentDocs += batchDocs.length;
  sentPassages += batchPassages.length;
  process.stdout.write(`\r  ${sentDocs}/${docs.length} documents, ${sentPassages} passages, ${Math.round((Date.now() - t0) / 1000)}s`);
  batchDocs = [];
  batchPassages = [];
  size = 0;
}

// Passages fetched per chunk of documents to keep memory modest.
for (let i = 0; i < docs.length; i += 500) {
  const chunk = docs.slice(i, i + 500);
  const ps = (
    await db.query<{ document_url: string; ord: number; heading: string | null; body: string }>(
      `select document_url, ord, heading, body from kb_passages where document_url = any($1) order by document_url, ord`,
      [chunk.map((d) => d.url)]
    )
  ).rows;
  const byDoc = new Map<string, typeof ps>();
  for (const p of ps) byDoc.set(p.document_url, [...(byDoc.get(p.document_url) ?? []), p]);
  for (const d of chunk) {
    const doc = { url: d.url, kind: d.kind, collection: d.collection, title: d.title, publisher: d.publisher, sourceUpdatedAt: d.source_updated_at, contentHash: d.content_hash, fetchedAt: d.fetched_at, removedAt: d.removed_at };
    const passages = (byDoc.get(d.url) ?? []).map((p) => ({ documentUrl: p.document_url, ord: p.ord, heading: p.heading, body: p.body }));
    const bytes = JSON.stringify(doc).length + passages.reduce((n, p) => n + p.body.length + (p.heading?.length ?? 0) + 80, 0);
    if (size + bytes > MAX_BYTES) await flush();
    batchDocs.push(doc);
    batchPassages.push(...passages);
    size += bytes;
  }
}
await flush();
console.log("\nDocuments done.");

const briefs = (await db.query<Record<string, unknown>>("select * from topic_briefs where status = 'published'")).rows.map((b) => ({
  id: b.id,
  topicKey: b.topic_key,
  area: b.area,
  question: b.question,
  restatedQuestion: b.restated_question,
  status: b.status,
  answer: b.answer,
  sourceVersions: b.source_versions,
  prepared: null,
  batchId: b.batch_id,
  costMicros: b.cost_micros,
  hits: 0,
  createdAt: b.created_at,
  publishedAt: b.published_at,
}));
if (briefs.length) console.log("Briefs:", await post({ op: "briefs", briefs }));
console.log("Finishing (term statistics + ANALYZE):", await post({ op: "finish" }));
await db.close();
