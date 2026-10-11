import "server-only";
import { createHash } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { kbDocuments, kbPassages } from "@/lib/db/schema";
import { LEGISLATION, type ActDef } from "./collections";
import { clmlToText, parseContents } from "./clml";
import { planSync, toPassages } from "./rules";

/*
 * Legislation sync — the core tax and company Acts and SIs from legislation.gov.uk (Open Government Licence).
 *
 * legislation.gov.uk currently puts bot protection in front of its API (automated requests get an empty
 * HTTP 202). We do NOT try to get round that. Each run makes one probe request; while it's refused, the
 * legislation step is skipped and reported as "awaiting access". Once access works (an allow-listed client or
 * the protection is lifted), syncing starts on its own with no code change.
 *
 * Change detection is per instrument: the contents document's dc:modified date. Only when it moves on are that
 * instrument's provisions re-fetched (and unchanged text is detected by hash, so passages aren't rewritten).
 */

const BASE = "https://www.legislation.gov.uk";
const UA = "CaptoLearn/1.0 (+https://learn.chitta.cloud; legislation re-use under OGL)";
const CONCURRENCY = 2;

type Fetched = { status: "ok"; xml: string } | { status: "blocked" } | { status: "error" };

async function getXml(url: string): Promise<Fetched> {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": UA, accept: "application/xml" }, signal: AbortSignal.timeout(30_000) });
      const body = await res.text();
      if (res.status === 200 && body.trim().startsWith("<")) return { status: "ok", xml: body };
      if (res.status === 202 || (res.status === 200 && !body.trim())) return { status: "blocked" };
      if (res.status === 404) return { status: "error" };
      if (res.status !== 429 && res.status < 500) return { status: "error" };
    } catch {
      /* network error — retry */
    }
    await new Promise((r) => setTimeout(r, 1500 * 2 ** i));
  }
  return { status: "error" };
}

const hash = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 32);

export interface LegislationResult {
  status: "synced" | "awaiting_access" | "partial";
  listed: number;
  added: number;
  updated: number;
  removed: number;
  failed: number;
  changedUrls: string[];
  note: string | null;
}

/** Is legislation.gov.uk letting us in? (One small request.) */
export async function legislationAccessible(): Promise<boolean> {
  return (await getXml(`${BASE}/${LEGISLATION[0].id}/contents/data.xml`)).status === "ok";
}

async function ingestProvision(url: string, act: ActDef, label: string, title: string, modified: string | null): Promise<"added" | "updated" | "unchanged" | "failed" | "blocked"> {
  const r = await getXml(`${url}/data.xml`);
  if (r.status !== "ok") return r.status === "blocked" ? "blocked" : "failed";
  const parsed = clmlToText(r.xml);
  const db = await getDb();
  const text = parsed.text;
  const contentHash = text ? hash(text) : "empty";
  const docTitle = `${act.label} ${label}${title || parsed.title ? ` — ${title || parsed.title.replace(/\.$/, "")}` : ""}`;
  const sourceUpdatedAt = parsed.modified ?? modified ? new Date((parsed.modified ?? modified)!) : null;
  const [existing] = await db.select({ contentHash: kbDocuments.contentHash, removedAt: kbDocuments.removedAt }).from(kbDocuments).where(eq(kbDocuments.url, url));
  const doc = { url, kind: "legislation" as const, collection: act.id, title: docTitle, publisher: "legislation.gov.uk", sourceUpdatedAt, contentHash, fetchedAt: new Date(), removedAt: null };
  if (existing && existing.contentHash === contentHash && !existing.removedAt) {
    await db.update(kbDocuments).set({ sourceUpdatedAt, fetchedAt: new Date() }).where(eq(kbDocuments.url, url));
    return "unchanged";
  }
  const passages = text ? toPassages(docTitle, text).map((p, ord) => ({ documentUrl: url, ord, heading: p.heading, body: p.body })) : [];
  await db.transaction(async (tx) => {
    await tx.insert(kbDocuments).values(doc).onConflictDoUpdate({ target: kbDocuments.url, set: doc });
    await tx.delete(kbPassages).where(eq(kbPassages.documentUrl, url));
    for (let i = 0; i < passages.length; i += 200) await tx.insert(kbPassages).values(passages.slice(i, i + 200));
  });
  return existing ? "updated" : "added";
}

export async function syncLegislation(deadline: number): Promise<LegislationResult> {
  const res: LegislationResult = { status: "synced", listed: 0, added: 0, updated: 0, removed: 0, failed: 0, changedUrls: [], note: null };
  const db = await getDb();
  for (const act of LEGISLATION) {
    if (Date.now() > deadline) {
      res.status = "partial";
      res.note = "Time budget reached during legislation.";
      return res;
    }
    const actUrl = `${BASE}/${act.id}`;
    const contents = await getXml(`${actUrl}/contents/data.xml`);
    if (contents.status === "blocked") {
      // Refused (bot protection). Stop here — never hammer a site that's saying no.
      return { ...res, status: res.listed ? "partial" : "awaiting_access", note: "legislation.gov.uk is not yet accepting automated requests (HTTP 202). Legislation will sync automatically once access is granted." };
    }
    if (contents.status !== "ok") {
      res.failed++;
      res.status = "partial";
      continue;
    }
    const parsed = parseContents(contents.xml, act.only);
    res.listed += parsed.provisions.length;
    const [marker] = await db.select().from(kbDocuments).where(eq(kbDocuments.url, actUrl));
    const stored = await db
      .select({ url: kbDocuments.url, sourceUpdatedAt: kbDocuments.sourceUpdatedAt, removedAt: kbDocuments.removedAt })
      .from(kbDocuments)
      .where(eq(kbDocuments.collection, act.id));
    const provisionsStored = stored.filter((s) => s.url !== actUrl);
    const unchangedAct = marker && parsed.modified && marker.contentHash === `act:${parsed.modified}` && provisionsStored.filter((s) => !s.removedAt).length >= parsed.provisions.length;
    if (unchangedAct) continue;

    const plan = planSync(
      parsed.provisions.map((p) => ({ url: p.url, updatedAt: parsed.modified })),
      provisionsStored,
      parsed.provisions.length > 0
    );
    if (plan.remove.length) {
      await db.update(kbDocuments).set({ removedAt: new Date() }).where(inArray(kbDocuments.url, plan.remove));
      res.removed += plan.remove.length;
      res.changedUrls.push(...plan.remove);
    }
    const byUrl = new Map(parsed.provisions.map((p) => [p.url, p]));
    const queue = [...plan.fetch];
    let blocked = false;
    const worker = async () => {
      while (queue.length && !blocked && Date.now() <= deadline) {
        const url = queue.shift()!;
        const p = byUrl.get(url)!;
        const r = await ingestProvision(url, act, p.label, p.title, parsed.modified);
        if (r === "blocked") blocked = true;
        else if (r === "added") res.added++;
        else if (r === "updated") (res.updated++, res.changedUrls.push(url));
        else if (r === "failed") res.failed++;
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    if (blocked || queue.length) {
      res.status = "partial";
      res.note = blocked ? "legislation.gov.uk started refusing requests part-way; will continue next run." : "Time budget reached during legislation.";
      return res;
    }
    // Record the instrument's version only once every provision is in, so an interrupted act is retried.
    const markerRow = { url: actUrl, kind: "legislation" as const, collection: act.id, title: parsed.title || act.label, publisher: "legislation.gov.uk", sourceUpdatedAt: parsed.modified ? new Date(parsed.modified) : null, contentHash: `act:${parsed.modified ?? "unknown"}`, fetchedAt: new Date(), removedAt: null };
    await db.insert(kbDocuments).values(markerRow).onConflictDoUpdate({ target: kbDocuments.url, set: markerRow });
  }
  return res;
}
