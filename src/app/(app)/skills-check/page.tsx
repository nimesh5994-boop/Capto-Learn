import Link from "next/link";
import { Clock, Compass, ListChecks } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { tracks } from "@/content";
import { LEVELS } from "@/content/types";
import { checkQuestions, latestSkillChecks, validSlugs } from "@/lib/learning/skillCheck";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { date } from "@/lib/format";
import { SkillCheck } from "@/components/learn/SkillCheck";
import { TrackIcon } from "@/components/learn/bits";

export const metadata = { title: "Skills check" };

export default async function SkillsCheckPage({ searchParams }: { searchParams: Promise<{ subjects?: string | string[] }> }) {
  const ctx = await requirePermission("learning.view");
  const raw = (await searchParams).subjects;
  const slugs = validSlugs((Array.isArray(raw) ? raw : raw ? [raw] : []).flatMap((s) => s.split(",")));

  if (slugs.length) {
    const qs = await checkQuestions(ctx.user.id, slugs);
    const titles = new Map(tracks().map((t) => [t.slug, t.title]));
    return (
      <>
        <div className="page-head">
          <div>
            <h1>Skills check</h1>
            <p className="muted">
              {slugs.length} subject{slugs.length === 1 ? "" : "s"} · about {Math.max(2, Math.round(qs.length * 0.4))} minutes
            </p>
          </div>
          <Link href="/skills-check" className="btn btn-sm">
            Change subjects
          </Link>
        </div>
        <div style={{ maxWidth: 820 }}>
          <SkillCheck
            slugs={slugs}
            questions={qs.map((q) => ({
              key: `${q.lessonId}#${q.questionId}`,
              trackTitle: titles.get(q.track) ?? q.track,
              levelLabel: LEVELS[q.level].label,
              promptHtml: renderMarkdown(q.prompt),
              optionsHtml: q.options.map((o) => renderInline(o)),
            }))}
          />
        </div>
      </>
    );
  }

  const last = (await latestSkillChecks([ctx.user.id])).get(ctx.user.id);
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Skills check</h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            A short starting assessment. Three questions per subject — one Foundation, one Practitioner, one Advanced — and we suggest where to start in each course so you don&apos;t repeat
            what you already know.
          </p>
        </div>
        {last && (
          <Link href="/skills-check/result" className="btn btn-sm">
            Last result ({date(last.completedAt)})
          </Link>
        )}
      </div>

      <div className="grid-3" style={{ marginBottom: 18 }}>
        <div className="card card-pad row" style={{ gap: 12 }}>
          <Clock size={20} color="var(--primary)" />
          <span className="small">About 20 seconds a question. No time limit.</span>
        </div>
        <div className="card card-pad row" style={{ gap: 12 }}>
          <ListChecks size={20} color="var(--primary)" />
          <span className="small">Not an exam — it doesn&apos;t affect your skill scores.</span>
        </div>
        <div className="card card-pad row" style={{ gap: 12 }}>
          <Compass size={20} color="var(--primary)" />
          <span className="small">You get a suggested starting point for each subject.</span>
        </div>
      </div>

      <form action="/skills-check" method="get" className="card card-pad stack" style={{ gap: 14 }}>
        <div>
          <h2 style={{ margin: 0 }}>Which subjects are part of your role?</h2>
          <p className="small muted" style={{ margin: "4px 0 0" }}>
            Untick anything you won&apos;t work on. You can take the check again later with different subjects.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
          {tracks().map((t) => (
            <label key={t.slug} className="row" style={{ gap: 10, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
              <input type="checkbox" name="subjects" value={t.slug} defaultChecked />
              <TrackIcon name={t.icon} size={15} />
              <span className="small">{t.title}</span>
            </label>
          ))}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Start the skills check
          </button>
        </div>
      </form>
    </>
  );
}
