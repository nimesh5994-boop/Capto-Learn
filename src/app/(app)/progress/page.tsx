import Link from "next/link";
import { Award, ClipboardList, Compass, Download } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getLesson } from "@/content";
import { skillsFor } from "@/lib/learning/skillData";
import { skillBand } from "@/lib/learning/skills";
import { date } from "@/lib/format";
import { ProgressBar, TrackIcon } from "@/components/learn/bits";

export const metadata = { title: "My progress" };

const LEVEL = { foundation: "Foundation", practitioner: "Practitioner", advanced: "Advanced" } as const;

export default async function MyProgressPage() {
  const ctx = await requirePermission("learning.view");
  const { progress, skills } = await skillsFor([ctx.user.id]);
  const mine = skills.get(ctx.user.id)!;
  const p = progress.get(ctx.user.id)!;
  const completed = [...p.values()].filter((x) => x.status === "completed" && x.completedAt);
  const yearStart = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1));
  const thisYear = completed.filter((x) => x.completedAt! >= yearStart);
  const minutesThisYear = thisYear.reduce((n, x) => n + (getLesson(x.lessonId)?.lesson.minutes ?? 0), 0);
  const certificates = mine.filter((s) => s.completedAt).sort((a, b) => b.completedAt!.getTime() - a.completedAt!.getTime());
  const sorted = [...mine].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>My progress</h1>
          <p className="muted">Your skill in each subject, your certificates and your CPD record.</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Link href="/skills-check" className="btn">
            <Compass size={15} /> Skills check
          </Link>
          <Link href="/cpd" className="btn">
            <ClipboardList size={15} /> CPD record
          </Link>
          <a href="/api/cpd" className="btn">
            <Download size={15} /> Download CPD log (CSV)
          </a>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div className="card card-pad">
          <div className="small muted">Lessons completed</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{completed.length}</div>
          <div className="small faint">{thisYear.length} this year</div>
        </div>
        <div className="card card-pad">
          <div className="small muted">Structured learning this year</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{(minutesThisYear / 60).toFixed(1)} h</div>
          <div className="small faint">from completed lessons</div>
        </div>
        <div className="card card-pad">
          <div className="small muted">Certificates</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{certificates.length}</div>
          <div className="small faint">one per completed course</div>
        </div>
      </div>

      <section className="card">
        <div className="card-pad" style={{ paddingBottom: 6 }}>
          <h2 style={{ margin: 0 }}>Skills by subject</h2>
          <p className="small muted" style={{ margin: "4px 0 0" }}>
            Score = 60% lessons completed + 40% quiz and Daily 5 accuracy. &ldquo;Level reached&rdquo; is the highest level you&apos;ve fully completed.
          </p>
        </div>
        <table className="table">
          <tbody>
            {sorted.map((s) => (
              <tr key={s.slug}>
                <td style={{ width: 44 }}>
                  <TrackIcon name={s.icon} size={16} />
                </td>
                <td>
                  <Link href={`/learn/${s.slug}`}>
                    <strong>{s.title}</strong>
                  </Link>
                  <div className="small faint">
                    {s.done}/{s.total} lessons{s.levelReached ? ` · ${LEVEL[s.levelReached]} level complete` : ""}
                  </div>
                </td>
                <td style={{ width: "28%" }}>
                  <ProgressBar pct={s.score} label={`${s.title} skill`} />
                </td>
                <td className="small" style={{ whiteSpace: "nowrap" }}>
                  <strong>{s.score}</strong> · {skillBand(s.score)}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {s.completedAt ? (
                    <Link href={`/certificates/${s.slug}`} className="btn btn-sm">
                      <Award size={14} /> Certificate
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {certificates.length > 0 && (
        <p className="small faint" style={{ marginTop: 12 }}>
          Latest certificate: {certificates[0].title} ({date(certificates[0].completedAt)}).
        </p>
      )}
    </>
  );
}
