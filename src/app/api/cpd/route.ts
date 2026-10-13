import { getCurrentUser } from "@/lib/auth/dal";
import { getLesson } from "@/content";
import { myProgress } from "@/lib/learning/progress";
import { isoDate } from "@/lib/format";

const cell = (v: string | number) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** CPD log for the signed-in user: one row per completed lesson, newest first. */
export async function GET() {
  const ctx = await getCurrentUser();
  if (!ctx || !ctx.can("learning.view")) return new Response("Not signed in", { status: 401 });
  const rows = [...(await myProgress(ctx.user.id)).values()]
    .filter((p) => p.status === "completed" && p.completedAt)
    .sort((a, b) => b.completedAt!.getTime() - a.completedAt!.getTime())
    .flatMap((p) => {
      const ref = getLesson(p.lessonId);
      if (!ref) return [];
      return [[isoDate(p.completedAt), ref.track.title, ref.module.title, ref.lesson.title, ref.lesson.minutes, p.bestQuizScore ?? "", "Structured — Capto Learn e-learning", `/learn/${p.lessonId}`]];
    });
  const header = ["Date completed", "Course", "Module", "Lesson", "Minutes", "Best quiz %", "Type", "Link"];
  const csv = [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cpd-log-${isoDate(new Date())}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
