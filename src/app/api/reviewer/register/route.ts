import { getCurrentUser } from "@/lib/auth/dal";
import { registerRows } from "@/lib/learning/register";
import { REVIEW_CHECKLIST } from "@/lib/learning/reviewChecklist";
import { isoDate } from "@/lib/format";

const cell = (v: string | number | boolean) => {
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** The approvals register as CSV, for reviewers and auditors. */
export async function GET() {
  const ctx = await getCurrentUser();
  if (!ctx || !ctx.platformCan("platform.content.review")) return new Response("Not allowed", { status: 403 });
  const rows = await registerRows(100_000);
  const header = ["Date and time (UTC)", "Course", "Lesson", "Level", "Tax year", "Decision", "Reviewer", "Notes", ...REVIEW_CHECKLIST.map((c) => `Confirmed: ${c.label}`), "Lesson version", "Still current"];
  const lines = rows.map((r) => [r.at.toISOString(), r.course, r.lesson, r.level, r.taxYear, r.decision, r.reviewer, r.notes, ...REVIEW_CHECKLIST.map((c) => (r.checklist.includes(c.key) ? "Yes" : "")), r.version, r.current ? "Yes" : "No"]);
  const csv = [header, ...lines].map((l) => l.map(cell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="capto-learn-approvals-register-${isoDate(new Date())}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
