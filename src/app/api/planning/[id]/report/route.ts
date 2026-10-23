import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { planningScenarios, researchExports, researchQueries } from "@/lib/db/schema";
import { AccessError, authorize } from "@/lib/auth/dal";
import { appUrl } from "@/lib/url";
import { reportFilename } from "@/lib/research/report";
import { renderDocx } from "@/lib/research/reportDocx";
import { renderPdf } from "@/lib/research/reportPdf";
import type { ResearchAnswer } from "@/lib/research/types";
import { canViewAnswer } from "@/lib/research/register";
import { buildPlanningMemo, planningRef } from "@/lib/planning/memo";

export const runtime = "nodejs";

const TYPES = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
} as const;

/**
 * Downloads a tax planning scenario as a Word or PDF memorandum, in the firm's branding. Free: it re-uses the stored
 * scenario and its researched answers, no AI. The person who ran it, or anyone who can see the research register, can export it.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  let ctx;
  try {
    ctx = await authorize("research.use");
  } catch (err) {
    if (err instanceof AccessError) return Response.json({ error: err.message }, { status: 403 });
    throw err;
  }
  const { id } = await params;
  const url = new URL(req.url);
  const format = url.searchParams.get("format");
  if (format !== "docx" && format !== "pdf") return Response.json({ error: "Choose format=docx or format=pdf." }, { status: 400 });
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: "Not found." }, { status: 404 });

  const db = await getDb();
  const [row] = await db
    .select()
    .from(planningScenarios)
    .where(and(eq(planningScenarios.id, id), eq(planningScenarios.organizationId, ctx.org.id)));
  if (!row || !canViewAnswer({ organizationId: row.organizationId, userId: row.userId, shared: false, reviewStatus: row.reviewStatus }, { orgId: ctx.org.id, userId: ctx.user.id, canRegister: ctx.can("research.register") })) return Response.json({ error: "Not found." }, { status: 404 });

  const queryIds = row.issues.map((i) => i.queryId).filter((q): q is string => !!q);
  const rows = queryIds.length ? await db.select({ id: researchQueries.id, answer: researchQueries.answer }).from(researchQueries).where(and(eq(researchQueries.organizationId, ctx.org.id), inArray(researchQueries.id, queryIds))) : [];
  const answers = new Map<string, ResearchAnswer>(rows.flatMap((r) => (r.answer ? [[r.id, r.answer] as [string, ResearchAnswer]] : [])));

  const reference = (url.searchParams.get("reference") ?? row.input.reference ?? "").trim().slice(0, 120);
  const docRef = planningRef(id);
  const blocks = buildPlanningMemo(row.title, row.input, row.report, row.issues, answers, {
    firm: ctx.org.name,
    docRef,
    preparedBy: ctx.user.name,
    reference: reference || undefined,
    url: `${appUrl()}/planning/${id}`,
    createdAt: row.createdAt,
    exportedAt: new Date(),
    review: row.reviewStatus ? { status: row.reviewStatus, by: row.reviewedByName, at: row.reviewedAt, note: row.reviewNote } : null,
  });
  const brand = { firm: ctx.org.name, color: ctx.org.brandColor, logoDataUrl: ctx.org.logoDataUrl, docRef, kicker: "TAX PLANNING MEMORANDUM" };
  const body = format === "docx" ? await renderDocx(blocks, brand) : await renderPdf(blocks, brand);
  // The research register keeps a record of every document issued, so it is recorded against the scenario's first researched issue.
  if (queryIds[0]) await db.insert(researchExports).values({ organizationId: ctx.org.id, userId: ctx.user.id, userName: ctx.user.name, queryId: queryIds[0], docRef, format, reference });
  return new Response(new Uint8Array(body), {
    headers: {
      "content-type": TYPES[format],
      "content-disposition": `attachment; filename="${reportFilename(`${docRef} ${row.title}`, format)}"`,
      "cache-control": "private, no-store",
    },
  });
}
