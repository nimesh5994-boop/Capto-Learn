import { createHash } from "node:crypto";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { getTrack } from "@/content";
import { skillsFor } from "@/lib/learning/skillData";
import { date } from "@/lib/format";
import { CaptoLogo } from "@/components/CaptoLogo";
import { PrintButton } from "./PrintButton";
import styles from "./certificate.module.css";

export const metadata = { title: "Certificate" };

/** Short, stable reference for a certificate — same person, course and completion date always give the same ID. */
function certificateId(userId: string, track: string, completedAt: Date): string {
  const h = createHash("sha256").update(`${userId}|${track}|${completedAt.toISOString()}`).digest("hex").toUpperCase();
  return `CL-${h.slice(0, 4)}-${h.slice(4, 8)}-${h.slice(8, 12)}`;
}

export default async function CertificatePage({ params, searchParams }: { params: Promise<{ track: string }>; searchParams: Promise<{ user?: string }> }) {
  const ctx = await getCurrentUser();
  if (!ctx) redirect("/login");
  const { track: slug } = await params;
  const { user: asked } = await searchParams;
  const track = getTrack(slug);
  if (!track) notFound();

  // Your own certificate, or a team member's if you can see team progress in the same firm.
  let person = { id: ctx.user.id, name: ctx.user.name };
  if (asked && asked !== ctx.user.id) {
    if (!ctx.can("progress.view_team")) notFound();
    const db = await getDb();
    const [row] = await db
      .select({ id: users.id, name: users.name })
      .from(users)
      .where(and(eq(users.id, asked), eq(users.organizationId, ctx.org.id)));
    if (!row) notFound();
    person = row;
  }

  const { progress, skills } = await skillsFor([person.id]);
  const s = skills.get(person.id)!.find((x) => x.slug === slug)!;
  if (!s.completedAt) notFound();
  const p = progress.get(person.id)!;
  const quizzes = [...p.values()].filter((x) => x.lessonId.startsWith(`${slug}/`) && x.bestQuizScore !== null).map((x) => x.bestQuizScore!);
  const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((a, b) => a + b, 0) / quizzes.length) : null;
  const hours = (s.minutes / 60).toFixed(1);

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <Link href={asked ? "/team" : "/progress"} className="btn btn-sm">
          ← Back
        </Link>
        <PrintButton />
      </div>

      <article className={styles.cert} style={{ ["--brand" as string]: ctx.org.brandColor }}>
        <header className={styles.head}>
          {ctx.org.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={ctx.org.logoDataUrl} alt={ctx.org.name} className={styles.logo} />
          ) : (
            <strong className={styles.firm}>{ctx.org.name}</strong>
          )}
          <CaptoLogo />
        </header>

        <p className={styles.kicker}>Certificate of completion</p>
        <p className={styles.small}>This certifies that</p>
        <h1 className={styles.name}>{person.name}</h1>
        <p className={styles.small}>has completed the Capto Learn course</p>
        <h2 className={styles.course}>{track.title}</h2>

        <dl className={styles.facts}>
          <div>
            <dt>Lessons</dt>
            <dd>{s.total}</dd>
          </div>
          <div>
            <dt>Structured learning</dt>
            <dd>{hours} hours</dd>
          </div>
          <div>
            <dt>Average quiz score</dt>
            <dd>{avgQuiz === null ? "—" : `${avgQuiz}%`}</dd>
          </div>
          <div>
            <dt>Completed</dt>
            <dd>{date(s.completedAt)}</dd>
          </div>
        </dl>

        <footer className={styles.foot}>
          <span>{ctx.org.name}</span>
          <span>Certificate ID {certificateId(person.id, slug, s.completedAt)}</span>
        </footer>
      </article>

      <p className={styles.note}>
        Hours are the course&apos;s planned learning time. You can record this as structured CPD with your professional body if it is relevant to your role.
      </p>
    </main>
  );
}
