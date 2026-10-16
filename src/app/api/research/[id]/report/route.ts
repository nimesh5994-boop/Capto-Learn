import { and, eq, or } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { researchQueries, savedResearch } from "@/lib/db/schema";
import { AccessError, authorize } from "@/lib/auth/dal";
import { appUrl } from "@/lib/url";
import { buildReport, documentRef, reportFilename } from "@/lib/research/report";
import { renderDocx } from "@/lib/research/reportDocx";
import { renderPdf } from "@/lib/research/reportPdf";

export const runtime = "nodejs";

const TYPES = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
} as const;

/**
 * Downloads an Ask Capto answer as a Word or PDF report, in the firm's branding. Free: it re-uses the stored
 * answer, no AI. Anyone who can open the answer can export it (their own, or one shared in their firm).
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
  const format = new URL(req.url).searchParams.get("format");
  if (format !== "docx" && format !== "pdf") return Response.json({ error: "Choose format=docx or format=pdf." }, { status: 400 });
  if (!/^[0-9a-f-]{36}$/i.test(id)) return Response.json({ error: "Not found." }, { status: 404 });

  const db = await getDb();
  const [row] = await db
    .select()
    .from(researchQueries)
    .where(and(eq(researchQueries.id, id), eq(researchQueries.organizationId, ctx.org.id), or(eq(researchQueries.userId, ctx.user.id), eq(researchQueries.shared, true))));
  if (!row?.answer) return Response.json({ error: "Not found." }, { status: 404 });
  const [saved] = await db.select().from(savedResearch).where(and(eq(savedResearch.queryId, id), eq(savedResearch.userId, ctx.user.id)));

  const title = saved?.title || row.question;
  const blocks = buildReport(
    row.question,
    row.answer,
    { firm: ctx.org.name, docRef: documentRef(id), preparedBy: ctx.user.name, reference: saved?.reference, note: saved?.note, url: `${appUrl()}/ask/${id}`, exportedAt: new Date() },
    saved?.title
  );
  const brand = { firm: ctx.org.name, color: ctx.org.brandColor, logoDataUrl: ctx.org.logoDataUrl, docRef: documentRef(id) };
  const body = format === "docx" ? await renderDocx(blocks, brand) : await renderPdf(blocks, brand);
  return new Response(new Uint8Array(body), {
    headers: {
      "content-type": TYPES[format],
      "content-disposition": `attachment; filename="${reportFilename(`${documentRef(id)} ${title}`, format)}"`,
      "cache-control": "private, no-store",
    },
  });
}
