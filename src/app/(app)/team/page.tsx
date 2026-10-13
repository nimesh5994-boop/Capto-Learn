import { redirect } from "next/navigation";
import { and, asc, eq, gte, sql } from "drizzle-orm";
import { requireUser } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { exerciseAttempts, users } from "@/lib/db/schema";
import { getLesson, tracks } from "@/content";
import { LEVELS } from "@/content/types";
import { openAssignments, overallStats, viewAssignment } from "@/lib/learning/progress";
import { skillsFor } from "@/lib/learning/skillData";
import { skillBand } from "@/lib/learning/skills";
import { latestSkillChecks } from "@/lib/learning/skillCheck";
import { orgHasFeature } from "@/lib/plans";
import { date } from "@/lib/format";
import { daysAgo } from "@/lib/time";
import { ProgressBar } from "@/components/learn/bits";
import { AssignForm, CancelAssignment, type AssignOption } from "@/components/learn/AssignForm";

export const metadata = { title: "Team training" };

export default async function TeamTrainingPage() {
  const ctx = await requireUser();
  const canView = ctx.can("progress.view_team");
  const canAssign = ctx.can("assignments.manage") && orgHasFeature(ctx.org, "assignments");
  if ((!canView && !canAssign) || !orgHasFeature(ctx.org, "teamProgress")) redirect("/?denied=1");

  const db = await getDb();
  const members = await db
    .select({ id: users.id, name: users.name, jobTitle: users.jobTitle, lastLoginAt: users.lastLoginAt })
    .from(users)
    .where(and(eq(users.organizationId, ctx.org.id), eq(users.status, "active")))
    .orderBy(asc(users.name));
  const ids = members.map((m) => m.id);
  const [{ progress, skills }, assigned, struggles, checks] = await Promise.all([
    skillsFor(ids),
    openAssignments(ctx.org.id),
    // Questions the team most often gets wrong in the last 90 days — where to focus coaching.
    db
      .select({ lessonId: exerciseAttempts.lessonId, exerciseId: exerciseAttempts.exerciseId, wrong: sql<number>`count(*) filter (where not ${exerciseAttempts.correct})::int`, total: sql<number>`count(*)::int` })
      .from(exerciseAttempts)
      .where(and(eq(exerciseAttempts.organizationId, ctx.org.id), gte(exerciseAttempts.createdAt, daysAgo(90))))
      .groupBy(exerciseAttempts.lessonId, exerciseAttempts.exerciseId)
      .orderBy(sql`count(*) filter (where not ${exerciseAttempts.correct}) desc`)
      .limit(8),
    latestSkillChecks(ids),
  ]);
  const all = tracks();
  const nameOf = new Map(members.map((m) => [m.id, m.name]));
  // Team average skill per subject, weakest first — where the firm's gaps are.
  const gaps = all
    .map((t) => {
      const scores = ids.map((id) => skills.get(id)!.find((s) => s.slug === t.slug)!.score);
      return { slug: t.slug, title: t.title, avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0, none: scores.filter((x) => x === 0).length };
    })
    .sort((a, b) => a.avg - b.avg || a.title.localeCompare(b.title));

  const options: AssignOption[] = all.flatMap((t) => [
    { type: "track" as const, id: t.slug, label: `${t.title} — whole track` },
    ...t.modules.map((m) => ({ type: "module" as const, id: `${t.slug}/${m.slug}`, label: m.title === LEVELS[m.level].label ? `${t.title} · ${m.title}` : `${t.title} · ${m.title} (${LEVELS[m.level].label})` })),
  ]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Team training</h1>
          <p className="muted">Who has covered what, what&apos;s assigned, and where the team is struggling.</p>
        </div>
      </div>

      {canView && (
        <section className="card" style={{ marginBottom: 18, overflowX: "auto" }}>
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2>Skills by person</h2>
            <p className="small muted" style={{ margin: 0 }}>
              Skill score per subject (0–100): 60% lessons completed, 40% quiz and Daily 5 accuracy. Hover a score for the band.
            </p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Person</th>
                <th style={{ minWidth: 120 }}>Overall</th>
                {all.map((t) => (
                  <th key={t.slug} className="small" title={t.title} style={{ minWidth: 90 }}>
                    {t.title.split(/[ ,]/)[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const p = progress.get(m.id)!;
                const o = overallStats(p);
                return (
                  <tr key={m.id}>
                    <td>
                      <strong>{m.name}</strong>
                      <div className="small faint">{m.jobTitle ?? (m.lastLoginAt ? `Last in ${date(m.lastLoginAt)}` : "Never signed in")}</div>
                      {checks.get(m.id) && (
                        <a href={`/skills-check/result?user=${m.id}`} className="small">
                          Skills check {date(checks.get(m.id)!.completedAt)}
                        </a>
                      )}
                    </td>
                    <td>
                      <ProgressBar pct={o.pct} />
                      <span className="small faint">
                        {o.done} lesson{o.done === 1 ? "" : "s"} · {o.pct}%
                      </span>
                    </td>
                    {skills.get(m.id)!.map((s) => (
                      <td
                        key={s.slug}
                        className="small num"
                        title={`${s.title}: ${skillBand(s.score)} · ${s.done}/${s.total} lessons`}
                        style={{ color: s.score ? undefined : "var(--text-faint)", fontWeight: s.score >= 85 ? 700 : undefined }}
                      >
                        {s.score ? (
                          <>
                            {s.score}
                            {s.completedAt && (
                              <a href={`/certificates/${s.slug}?user=${m.id}`} title="Certificate" style={{ marginLeft: 3, textDecoration: "none" }}>
                                🏅
                              </a>
                            )}
                          </>
                        ) : (
                          "—"
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {canView && members.length > 0 && (
        <section className="card" style={{ marginBottom: 18 }}>
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2>Team skills gaps</h2>
            <p className="small muted" style={{ margin: 0 }}>
              Average skill score by subject, weakest first. Assign the course to close a gap.
            </p>
          </div>
          <table className="table">
            <tbody>
              {gaps.slice(0, 6).map((g) => (
                <tr key={g.slug}>
                  <td>
                    <a href={`/learn/${g.slug}`}>
                      <strong>{g.title}</strong>
                    </a>
                    <div className="small faint">
                      {g.none ? `${g.none} of ${members.length} not started` : "Everyone has started"}
                    </div>
                  </td>
                  <td style={{ width: "35%" }}>
                    <ProgressBar pct={g.avg} label={`${g.title} team average`} />
                  </td>
                  <td className="small" style={{ whiteSpace: "nowrap" }}>
                    <strong>{g.avg}</strong> · {skillBand(g.avg)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <div className="grid-2" style={{ alignItems: "start" }}>
        {canAssign && (
          <section className="card card-pad stack" style={{ gap: 12 }}>
            <h2 style={{ margin: 0 }}>Assign training</h2>
            <AssignForm people={members.map((m) => ({ id: m.id, name: m.name }))} options={options} />
          </section>
        )}

        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2>Open assignments</h2>
          </div>
          {assigned.length === 0 ? (
            <p className="card-pad small muted" style={{ paddingTop: 0 }}>
              Nothing assigned yet.
            </p>
          ) : (
            <table className="table">
              <tbody>
                {assigned
                  .map((a) => viewAssignment(a, progress.get(a.userId) ?? new Map()))
                  .sort((x, y) => Number(x.complete) - Number(y.complete) || (x.a.dueDate?.getTime() ?? Infinity) - (y.a.dueDate?.getTime() ?? Infinity))
                  .map((v) => (
                    <tr key={v.a.id}>
                      <td>
                        <strong>{nameOf.get(v.a.userId) ?? "Former member"}</strong>
                        <div className="small">{v.title}</div>
                      </td>
                      <td className="small" style={{ whiteSpace: "nowrap" }}>
                        {v.complete ? (
                          <span className="pill pill-accepted">Complete</span>
                        ) : (
                          <>
                            {v.done}/{v.total}
                            {v.a.dueDate && <div style={{ color: v.overdue ? "var(--danger)" : "var(--text-muted)" }}>{v.overdue ? "Overdue" : `Due ${date(v.a.dueDate)}`}</div>}
                          </>
                        )}
                      </td>
                      <td>{canAssign && <CancelAssignment id={v.a.id} />}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {canView && struggles.some((s) => s.wrong > 0) && (
        <section className="card" style={{ marginTop: 18 }}>
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2>Questions the team gets wrong most</h2>
            <p className="small muted" style={{ margin: 0 }}>
              Last 90 days. A good starting point for a team training session.
            </p>
          </div>
          <table className="table">
            <tbody>
              {struggles
                .filter((s) => s.wrong > 0)
                .map((s) => {
                  const ref = getLesson(s.lessonId);
                  const ex = ref && [...ref.lesson.exercises, ...ref.lesson.quiz].find((e) => e.id === s.exerciseId);
                  return (
                    <tr key={`${s.lessonId}#${s.exerciseId}`}>
                      <td>
                        <a href={`/learn/${s.lessonId}`}>{ref?.lesson.title ?? s.lessonId}</a>
                        <div className="small faint">{ex ? ex.prompt.replace(/[*_`#>|]/g, "").slice(0, 140) : s.exerciseId}</div>
                      </td>
                      <td className="small num" style={{ whiteSpace: "nowrap" }}>
                        {s.wrong}/{s.total} wrong
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
