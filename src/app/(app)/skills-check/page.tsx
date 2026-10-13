import Link from "next/link";
import { ArrowRight, Clock, Compass, RefreshCw, Shuffle } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { tracks } from "@/content";
import { AREAS } from "@/lib/learning/placement";
import { latestSkillChecks, retakeDue, subjectsFor } from "@/lib/learning/skillCheck";
import { date } from "@/lib/format";
import { SkillCheck } from "@/components/learn/SkillCheck";
import { TrackIcon } from "@/components/learn/bits";
import styles from "./skills.module.css";

export const metadata = { title: "Skills check" };

export default async function SkillsCheckPage({ searchParams }: { searchParams: Promise<{ area?: string; subjects?: string | string[]; go?: string }> }) {
  const ctx = await requirePermission("learning.view");
  const sp = await searchParams;
  const custom = (Array.isArray(sp.subjects) ? sp.subjects : sp.subjects ? [sp.subjects] : []).flatMap((s) => s.split(","));
  const area = AREAS.some((a) => a.key === sp.area) ? sp.area! : null;
  const slugs = subjectsFor(area, custom);
  const minutes = ctx.org.skillCheckMinutesPerSubject;
  const titles = Object.fromEntries(tracks().map((t) => [t.slug, t.title]));

  if (sp.go && slugs.length) {
    const label = AREAS.find((a) => a.key === area)?.label ?? "Your chosen subjects";
    return (
      <>
        <div className="page-head">
          <div>
            <h1>Skills check · {label}</h1>
            <p className="muted">
              {slugs.length} subject{slugs.length === 1 ? "" : "s"} · {minutes * slugs.length} minutes · 2–3 questions per subject
            </p>
          </div>
          <Link href="/skills-check" className="btn btn-sm">
            Stop
          </Link>
        </div>
        <div style={{ maxWidth: 820 }}>
          <SkillCheck area={area} subjects={slugs} trackTitles={titles} seconds={minutes * slugs.length * 60} />
        </div>
      </>
    );
  }

  const last = (await latestSkillChecks([ctx.user.id])).get(ctx.user.id);
  const due = retakeDue(last, ctx.org.skillCheckRetakeMonths);
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Skills check</h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            Pick an area and go. The check adapts as you answer — harder after a right answer, easier after a wrong one — and tells you where to start in each course. Questions rotate, so every
            retake is fresh.
          </p>
        </div>
        {last && (
          <Link href="/skills-check/result" className="btn btn-sm">
            Last result ({date(last.completedAt)})
          </Link>
        )}
      </div>

      {last && due && (
        <div className="alert alert-info" style={{ marginBottom: 14 }}>
          <RefreshCw size={14} /> It&apos;s been a while since your last check ({date(last.completedAt)}). A fresh one, with new questions, keeps your starting points up to date.
        </div>
      )}

      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div className="card card-pad row" style={{ gap: 12 }}>
          <Clock size={20} color="var(--primary)" />
          <span className="small">
            {`${minutes} minute${minutes === 1 ? "" : "s"} per subject`}, with a countdown. Time&apos;s up submits what you&apos;ve answered.
          </span>
        </div>
        <div className="card card-pad row" style={{ gap: 12 }}>
          <Shuffle size={20} color="var(--primary)" />
          <span className="small">Adapts to you, and rotates to questions you haven&apos;t seen before.</span>
        </div>
        <div className="card card-pad row" style={{ gap: 12 }}>
          <Compass size={20} color="var(--primary)" />
          <span className="small">Not an exam — it doesn&apos;t affect your scores. It just finds your starting point.</span>
        </div>
      </div>

      <div className={styles.areas}>
        {AREAS.map((a) => {
          const n = subjectsFor(a.key).length;
          return (
            <Link key={a.key} href={`/skills-check?area=${a.key}&go=1`} className={`card ${styles.area}`}>
              <strong>{a.label}</strong>
              <span className="small muted">{a.blurb}</span>
              <span className={styles.areaFoot}>
                <span className="small faint">
                  {n} subject{n === 1 ? "" : "s"} · {n * minutes} min
                </span>
                <span className="small" style={{ color: "var(--primary)", fontWeight: 600 }}>
                  Start <ArrowRight size={13} />
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <details className="card card-pad" style={{ marginTop: 16 }}>
        <summary className="small" style={{ cursor: "pointer", fontWeight: 600 }}>
          Or choose your own subjects
        </summary>
        <form action="/skills-check" method="get" className="stack" style={{ gap: 12, marginTop: 12 }}>
          <input type="hidden" name="go" value="1" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
            {tracks().map((t) => (
              <label key={t.slug} className="row" style={{ gap: 10, padding: "8px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
                <input type="checkbox" name="subjects" value={t.slug} />
                <TrackIcon name={t.icon} size={15} />
                <span className="small">{t.title}</span>
              </label>
            ))}
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Start with these subjects
            </button>
          </div>
        </form>
      </details>
    </>
  );
}
