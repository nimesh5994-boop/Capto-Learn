import ExcelJS from "exceljs";
import { AccessError, authorize } from "@/lib/auth/dal";
import { appUrl } from "@/lib/url";
import { loadRegister } from "@/lib/research/registerData";
import { costPence, parseDay, parseReviewFilter, REVIEW_LABEL, routeLabel } from "@/lib/research/register";
import { documentRef } from "@/lib/research/report";
import { audit, actorOf } from "@/lib/audit";

export const runtime = "nodejs";

/**
 * The research register as an Excel workbook: one sheet of questions (with review and verification) and one
 * of documents issued, each with filters and frozen headers. Uses the same filters as the register page.
 */
export async function GET(req: Request) {
  let ctx;
  try {
    ctx = await authorize("research.register");
  } catch (err) {
    if (err instanceof AccessError) return Response.json({ error: err.message }, { status: 403 });
    throw err;
  }
  const sp = new URL(req.url).searchParams;
  const who = sp.get("who");
  const { rows, scenarios, documents } = await loadRegister(ctx.org.id, {
    review: parseReviewFilter(sp.get("review") ?? undefined),
    userId: who && /^[0-9a-f-]{36}$/i.test(who) ? who : null,
    from: parseDay(sp.get("from") ?? undefined),
    to: parseDay(sp.get("to") ?? undefined),
    q: (sp.get("q") ?? "").trim().slice(0, 200),
  });

  const brand = /^#[0-9a-f]{6}$/i.test(ctx.org.brandColor) ? ctx.org.brandColor.slice(1).toUpperCase() : "A01F62";
  const wb = new ExcelJS.Workbook();
  wb.creator = ctx.org.name;
  wb.created = new Date();
  wb.title = "Research register";

  const style = (ws: ExcelJS.Worksheet, title: string) => {
    ws.insertRow(1, [`${ctx.org.name}: ${title}`]);
    ws.insertRow(2, [`Exported ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })} by ${ctx.user.name}. Confidential.`]);
    ws.getRow(1).font = { bold: true, size: 14, color: { argb: `FF${brand}` } };
    ws.getRow(2).font = { italic: true, size: 9, color: { argb: "FF6B6470" } };
    const head = ws.getRow(3);
    head.font = { bold: true, color: { argb: "FFFFFFFF" } };
    head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: `FF${brand}` } };
    head.alignment = { vertical: "middle", wrapText: true };
    head.height = 30;
    ws.views = [{ state: "frozen", ySplit: 3 }];
    ws.autoFilter = { from: { row: 3, column: 1 }, to: { row: 3, column: ws.columnCount } };
    ws.eachRow((r, n) => {
      if (n > 3) r.alignment = { vertical: "top", wrapText: true };
    });
  };

  const q = wb.addWorksheet("Questions");
  q.columns = [
    { header: "Date", key: "date", width: 18, style: { numFmt: "dd/mm/yyyy hh:mm" } },
    { header: "Document ref", key: "ref", width: 14 },
    { header: "Question", key: "question", width: 70 },
    { header: "Asked by", key: "askedBy", width: 20 },
    { header: "Answered by", key: "route", width: 24 },
    { header: "Tax year", key: "taxYear", width: 10 },
    { header: "Confidence", key: "confidence", width: 12 },
    { header: "Points verified", key: "verified", width: 12 },
    { header: "Review", key: "review", width: 15 },
    { header: "Reviewed by", key: "reviewedBy", width: 20 },
    { header: "Reviewed on", key: "reviewedAt", width: 14, style: { numFmt: "dd/mm/yyyy" } },
    { header: "Review note", key: "reviewNote", width: 40 },
    { header: "Shared in firm", key: "shared", width: 10 },
    { header: "Learner rating", key: "rating", width: 12 },
    { header: "Documents issued", key: "docs", width: 10 },
    { header: "AI cost (£)", key: "cost", width: 10, style: { numFmt: "0.00" } },
    { header: "Link", key: "link", width: 30 },
  ];
  for (const r of rows) {
    q.addRow({
      date: r.createdAt,
      ref: documentRef(r.id),
      question: r.question,
      askedBy: r.askedBy,
      route: r.status === "answered" ? routeLabel(r.route) : "No answer produced",
      taxYear: r.taxYear ?? "",
      confidence: r.confidence ?? "",
      verified: r.checked ? `${r.verified} of ${r.checked}` : "",
      review: r.status === "answered" ? REVIEW_LABEL[r.reviewStatus ?? "none"] : "",
      reviewedBy: r.reviewedByName ?? "",
      reviewedAt: r.reviewedAt ?? null,
      reviewNote: r.reviewNote ?? "",
      shared: r.shared ? "Yes" : "No",
      rating: r.helpful === true ? "Helpful" : r.helpful === false ? "Not helpful" : "",
      docs: r.docs.length,
      cost: costPence(r.costMicros) / 100,
      link: { text: "Open", hyperlink: `${appUrl()}/ask/${r.id}` },
    });
  }
  style(q, "Research register — questions");

  const p = wb.addWorksheet("Tax planning");
  p.columns = [
    { header: "Date", key: "date", width: 18, style: { numFmt: "dd/mm/yyyy hh:mm" } },
    { header: "Document ref", key: "ref", width: 14 },
    { header: "Scenario", key: "title", width: 60 },
    { header: "Client / matter", key: "reference", width: 24 },
    { header: "Prepared by", key: "by", width: 20 },
    { header: "Tax year", key: "taxYear", width: 10 },
    { header: "Status", key: "status", width: 16 },
    { header: "Issues answered", key: "issues", width: 12 },
    { header: "Confidence", key: "confidence", width: 12 },
    { header: "Documents issued", key: "docs", width: 10 },
    { header: "AI cost (£)", key: "cost", width: 10, style: { numFmt: "0.00" } },
    { header: "Link", key: "link", width: 30 },
  ];
  for (const s of scenarios)
    p.addRow({
      date: s.createdAt,
      ref: s.ref,
      title: s.title,
      reference: s.reference,
      by: s.askedBy,
      taxYear: s.taxYear ?? "",
      status: s.status === "completed" ? "Report written" : s.status === "partial" ? "Research only" : "Failed",
      issues: `${s.answeredCount} of ${s.issueCount}`,
      confidence: s.confidence ?? "",
      docs: s.docs.length,
      cost: costPence(s.costMicros) / 100,
      link: { text: "Open", hyperlink: `${appUrl()}/planning/${s.id}` },
    });
  style(p, "Research register — tax planning scenarios");

  const d = wb.addWorksheet("Documents issued");
  d.columns = [
    { header: "Issued", key: "date", width: 18, style: { numFmt: "dd/mm/yyyy hh:mm" } },
    { header: "Document ref", key: "ref", width: 14 },
    { header: "Format", key: "format", width: 8 },
    { header: "Subject", key: "question", width: 70 },
    { header: "Client / matter", key: "reference", width: 28 },
    { header: "Issued by", key: "user", width: 20 },
  ];
  for (const x of documents) d.addRow({ date: x.createdAt, ref: x.docRef, format: x.format === "docx" ? "Word" : "PDF", question: x.question, reference: x.reference, user: x.userName });
  style(d, "Research register — documents issued");

  const buf = await wb.xlsx.writeBuffer();
  await audit(actorOf(ctx), "research.register_exported", `Downloaded the research register (${rows.length} questions, ${scenarios.length} planning scenarios, ${documents.length} documents)`);
  const day = new Date().toISOString().slice(0, 10);
  return new Response(new Uint8Array(buf as ArrayBuffer), {
    headers: {
      "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": `attachment; filename="research-register-${day}.xlsx"`,
      "cache-control": "private, no-store",
    },
  });
}
