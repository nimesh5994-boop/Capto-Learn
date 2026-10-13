import { requirePermission } from "@/lib/auth/dal";
import { tracks, trackLessons } from "@/content";
import { myProgress } from "@/lib/learning/progress";
import { CourseList, type CourseListTrack } from "@/components/learn/CourseList";

export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const ctx = await requirePermission("learning.view");
  const progress = await myProgress(ctx.user.id);
  const all = tracks();
  const data: CourseListTrack[] = all.map((t) => ({
    slug: t.slug,
    title: t.title,
    icon: t.icon,
    summary: t.summary,
    lessons: trackLessons(t.slug).map((r) => {
      const p = progress.get(r.id);
      return {
        id: r.id,
        title: r.lesson.title,
        summary: r.lesson.summary,
        minutes: r.lesson.minutes,
        level: r.lesson.level,
        module: r.module.title,
        status: p?.status === "completed" ? "completed" : p ? "started" : "none",
      };
    }),
  }));
  const total = data.reduce((n, t) => n + t.lessons.length, 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Courses</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Every course and every lesson, {all.length} subjects and {total} lessons from first principles to advanced work. Pick any lesson and go: each one runs as short steps with practice
            questions and a quick quiz at the end.
          </p>
        </div>
      </div>
      <CourseList tracks={data} />
    </>
  );
}
