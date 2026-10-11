import "server-only";
import { createHash } from "node:crypto";
import { and, desc, eq, gt, inArray, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { answerLibrary, kbDocuments, kbPassages, kbSyncRuns, kbTerms, topicBriefs, type KbKind } from "@/lib/db/schema";
import { allLessons } from "@/content";
import { fetchGovUkDocument, govUkFetch } from "@/lib/research/govuk";
import { FULL_SYNC_EVERY_DAYS, GUIDANCE_ORGS, MANUALS } from "./collections";
import { planSync, toPassages, type Listed } from "./rules";
import { syncLegislation, type LegislationResult } from "./legislation";

/*
 * The sync bot. Mirrors the core set of HMRC manuals and HMRC / Companies House guidance into our own database
 * and keeps it current with no AI cost:
 *  1. list every page in each collection with GOV.UK's public timestamp (a few dozen Search API calls);
 *  2. download only pages that are new or whose timestamp moved on; retire pages no longer published;
 *  3. retire answer-library entries built on a changed page, and record which lessons cite it.
 * Resumable: a run that hits its time budget stops cleanly ("partial") and the next run carries on.
 */

const BASE = "https://www.gov.uk";
// Polite to GOV.UK: a handful of parallel requests, with retries/back-off in govUkFetch.
const CONCURRENCY = 4;

interface Collection {
  kind: KbKind;
  slug: string;
  label: string;
  query?: string;
}

const COLLECTIONS: Collection[] = [...MANUALS.map((m) => ({ kind: "manual_section" as const, ...m })), ...GUIDANCE_ORGS.map((g) => ({ kind: "guidance" as const, ...g }))];

async function searchPage(params: string, start: number): Promise<{ total: number; results: { link: string; public_timestamp?: string }[] }> {
  const res = await govUkFetch(`${BASE}/api/search.json?${params}&count=1000&start=${start}&order=-public_timestamp&fields=link,public_timestamp`, 25_000);
  if (!res || !res.ok) throw new Error(`GOV.UK search ${res?.status ?? "network error"}`);
  return res.json();
}

/** Every page in a collection with its last-updated time. `complete` is false if the listing was cut short. */
async function listCollection(c: Collection): Promise<{ listed: Listed[]; complete: boolean }> {
  const params =
    c.kind === "manual_section" ? `filter_manual=/hmrc-internal-manuals/${c.slug}` : (c.query ?? `filter_organisations=${c.slug}&filter_content_purpose_supergroup=guidance_and_regulation`);
  const out = new Map<string, Listed>();
  let total = Infinity;
  for (let start = 0; start < total && start < 20_000; start += 1000) {
    const page = await searchPage(params, start);
    total = page.total;
    for (const r of page.results) {
      if (!r.link?.startsWith("/")) continue;
      if (c.kind === "guidance" && r.link.startsWith("/hmrc-internal-manuals")) continue;
      out.set(`${BASE}${r.link}`, { url: `${BASE}${r.link}`, updatedAt: r.public_timestamp ?? null });
    }
    if (!page.results.length) break;
  }
  return { listed: [...out.values()], complete: c.kind === "guidance" || out.size >= total };
}

const hash = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 32);
const norm = (u: string) => u.replace(/[#?].*$/, "").replace(/\/$/, "").replace(/^https?:\/\/(www\.)?gov\.uk/, BASE);

/** Downloads one page and replaces its stored passages. Returns false if the page couldn't be fetched. */
async function ingest(url: string, c: Collection, listedUpdatedAt: string | null): Promise<"added" | "updated" | "unchanged" | "failed"> {
  const r = await fetchGovUkDocument(url.slice(BASE.length));
  if (r.status === "error") return "failed";
  const db = await getDb();
  if (r.status === "empty") {
    // A contents-only page: record it (so it isn't re-fetched every run) with no searchable passages.
    const doc = { url, kind: c.kind, collection: c.slug, title: r.title, publisher: c.kind === "manual_section" ? "HMRC internal manual" : "GOV.UK guidance", sourceUpdatedAt: r.updatedAt ? new Date(r.updatedAt) : null, contentHash: "empty", fetchedAt: new Date(), removedAt: null };
    await db.transaction(async (tx) => {
      await tx.insert(kbDocuments).values(doc).onConflictDoUpdate({ target: kbDocuments.url, set: doc });
      await tx.delete(kbPassages).where(eq(kbPassages.documentUrl, url));
    });
    return "unchanged";
  }
  const page = r.page;
  const contentHash = hash(page.text);
  const [existing] = await db.select({ contentHash: kbDocuments.contentHash, removedAt: kbDocuments.removedAt }).from(kbDocuments).where(eq(kbDocuments.url, url));
  const sourceUpdatedAt = page.updatedAt ? new Date(page.updatedAt) : listedUpdatedAt ? new Date(listedUpdatedAt) : null;
  const doc = { url, kind: c.kind, collection: c.slug, title: page.title, publisher: page.publisher, sourceUpdatedAt, contentHash, fetchedAt: new Date(), removedAt: null };
  if (existing && existing.contentHash === contentHash && !existing.removedAt) {
    await db.update(kbDocuments).set({ sourceUpdatedAt, fetchedAt: new Date() }).where(eq(kbDocuments.url, url));
    return "unchanged";
  }
  const passages = toPassages(page.title, page.text).map((p, ord) => ({ documentUrl: url, ord, heading: p.heading, body: p.body }));
  await db.transaction(async (tx) => {
    await tx.insert(kbDocuments).values(doc).onConflictDoUpdate({ target: kbDocuments.url, set: doc });
    await tx.delete(kbPassages).where(eq(kbPassages.documentUrl, url));
    for (let i = 0; i < passages.length; i += 200) await tx.insert(kbPassages).values(passages.slice(i, i + 200));
  });
  return existing ? "updated" : "added";
}

/**
 * Rebuilds kb_terms from the passage index, then refreshes the planner's table statistics. Without fresh
 * statistics after a bulk load, Postgres can pick a plan that turns a 0.3s search into a 40s one.
 */
export async function refreshTermStats(): Promise<void> {
  const db = await getDb();
  await db.transaction(async (tx) => {
    await tx.delete(kbTerms);
    await tx.execute(sql`insert into kb_terms (word, ndoc) select word, ndoc from ts_stat('select tsv from kb_passages')`);
  });
  for (const table of ["kb_passages", "kb_documents", "kb_terms"]) await db.execute(sql.raw(`analyze ${table}`));
}

export interface SyncOptions {
  trigger: "cron" | "manual" | "script";
  /** Stop starting new downloads after this long, leaving the run "partial" to resume next time. */
  budgetMs?: number;
  /** Limit to some collections (slugs) — used for testing. */
  only?: string[];
}

/** Whether the scheduled job has anything to do: resume a partial run, or it's time for the weekly check. */
export async function syncDue(): Promise<boolean> {
  const db = await getDb();
  const [last] = await db.select().from(kbSyncRuns).orderBy(desc(kbSyncRuns.startedAt)).limit(1);
  if (!last) return true;
  if (last.status === "partial" || last.status === "failed") return true;
  if (last.status === "running") return Date.now() - last.startedAt.getTime() > 30 * 60_000; // stale lock
  return Date.now() - last.startedAt.getTime() > FULL_SYNC_EVERY_DAYS * 86_400_000;
}

export async function runSync(opts: SyncOptions): Promise<string> {
  const db = await getDb();
  const deadline = Date.now() + (opts.budgetMs ?? Infinity);
  const [running] = await db
    .select({ id: kbSyncRuns.id })
    .from(kbSyncRuns)
    .where(and(eq(kbSyncRuns.status, "running"), gt(kbSyncRuns.startedAt, new Date(Date.now() - 30 * 60_000))));
  if (running) return "A sync is already running.";
  const [run] = await db.insert(kbSyncRuns).values({ trigger: opts.trigger }).returning({ id: kbSyncRuns.id });
  const stats = { listed: 0, added: 0, updated: 0, removed: 0, failed: 0 };
  const changedUrls: string[] = [];
  let stoppedEarly = false;
  const listingFailures: string[] = [];
  try {
    for (const c of COLLECTIONS.filter((x) => !opts.only || opts.only.includes(x.slug))) {
      if (Date.now() > deadline) {
        stoppedEarly = true;
        break;
      }
      const { listed, complete } = await listCollection(c).catch(() => ({ listed: [] as Listed[], complete: false }));
      if (!listed.length) listingFailures.push(c.label);
      stats.listed += listed.length;
      const stored = await db
        .select({ url: kbDocuments.url, sourceUpdatedAt: kbDocuments.sourceUpdatedAt, removedAt: kbDocuments.removedAt })
        .from(kbDocuments)
        .where(eq(kbDocuments.collection, c.slug));
      const plan = planSync(listed, stored, complete && listed.length > 0);
      if (plan.remove.length) {
        await db.update(kbDocuments).set({ removedAt: new Date() }).where(inArray(kbDocuments.url, plan.remove));
        stats.removed += plan.remove.length;
        changedUrls.push(...plan.remove);
      }
      const updatedAtOf = new Map(listed.map((l) => [l.url, l.updatedAt]));
      const queue = [...plan.fetch];
      const worker = async () => {
        while (queue.length) {
          if (Date.now() > deadline) {
            stoppedEarly = true;
            return;
          }
          const url = queue.shift()!;
          const r = await ingest(url, c, updatedAtOf.get(url) ?? null).catch(() => "failed" as const);
          if (r === "added") stats.added++;
          else if (r === "updated") (stats.updated++, changedUrls.push(url));
          else if (r === "failed") stats.failed++;
        }
      };
      await Promise.all(Array.from({ length: CONCURRENCY }, worker));
      await db.update(kbSyncRuns).set(stats).where(eq(kbSyncRuns.id, run.id));
    }

    // Legislation (legislation.gov.uk). Skipped cleanly while that site refuses automated requests.
    let legislation: LegislationResult | null = null;
    if (process.env.LEGISLATION_SYNC !== "off" && !opts.only && !stoppedEarly && Date.now() < deadline) {
      legislation = await syncLegislation(deadline).catch((err) => {
        console.error("[kb-sync] legislation", err);
        return null;
      });
      if (legislation) {
        stats.listed += legislation.listed;
        stats.added += legislation.added;
        stats.updated += legislation.updated;
        stats.removed += legislation.removed;
        stats.failed += legislation.failed;
        changedUrls.push(...legislation.changedUrls);
        if (legislation.status === "partial") stoppedEarly = true;
      }
    }

    // Refresh term statistics used by search to skip ultra-common words (only when content changed).
    const [termCount] = await db.select({ n: sql<number>`count(*)::int` }).from(kbTerms);
    if (stats.added || stats.updated || stats.removed || !termCount?.n) await refreshTermStats();

    // Knock-on effects of changed pages: stop reusing answers built on them, and tell content reviewers.
    let libraryRetired = 0;
    for (const url of new Set(changedUrls)) {
      const r = await db
        .update(answerLibrary)
        .set({ retiredAt: new Date(), retiredReason: `Source updated: ${url}` })
        .where(and(isNull(answerLibrary.retiredAt), sql`jsonb_exists(${answerLibrary.sourceVersions}, ${url})`))
        .returning({ id: answerLibrary.id });
      libraryRetired += r.length;
      const b = await db
        .update(topicBriefs)
        .set({ status: "retired", retiredReason: `Source updated: ${url}` })
        .where(and(eq(topicBriefs.status, "published"), sql`jsonb_exists(${topicBriefs.sourceVersions}, ${url})`))
        .returning({ id: topicBriefs.id });
      libraryRetired += b.length;
    }
    const changed = new Set(changedUrls.map(norm));
    const lessonsAffected = allLessons()
      .filter((l) => l.lesson.sources.some((s) => changed.has(norm(s.url))))
      .map((l) => l.id);

    // Anything left undone (time budget, GOV.UK refusing a listing, failed downloads) makes the run "partial",
    // so the next scheduled run resumes — failed pages simply show up again as "to fetch".
    const incomplete = stoppedEarly || listingFailures.length > 0 || stats.failed > 0;
    const notes = [
      stoppedEarly && "Time budget reached.",
      listingFailures.length && `Couldn't list: ${listingFailures.slice(0, 5).join(", ")}${listingFailures.length > 5 ? ` +${listingFailures.length - 5} more` : ""}.`,
      stats.failed && `${stats.failed} page(s) couldn't be downloaded.`,
      legislation?.note,
      incomplete && "The next run continues where this one stopped.",
    ].filter(Boolean);
    const status = incomplete ? "partial" : "done";
    await db
      .update(kbSyncRuns)
      .set({ ...stats, status, lessonsAffected, libraryRetired, finishedAt: new Date(), note: notes.length ? notes.join(" ") : null })
      .where(eq(kbSyncRuns.id, run.id));
    return `${status === "done" ? "Sync complete" : "Sync paused (will resume)"}: ${stats.added} added, ${stats.updated} updated, ${stats.removed} removed, ${stats.failed} failed.`;
  } catch (err) {
    await db
      .update(kbSyncRuns)
      .set({ ...stats, status: "failed", finishedAt: new Date(), note: err instanceof Error ? err.message.slice(0, 500) : "Unknown error" })
      .where(eq(kbSyncRuns.id, run.id));
    throw err;
  }
}
