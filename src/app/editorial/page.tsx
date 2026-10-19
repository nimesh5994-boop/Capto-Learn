import Link from "next/link";
import { BadgeCheck, BookOpenCheck, RefreshCw, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { allLessons, getTrack } from "@/content";
import { ACCURACY_PASSES, totalCorrections } from "@/content/editorial";
import { effectiveReview, reviewRows } from "@/lib/learning/review";
import { kbStats } from "@/lib/kb/search";
import { latestBenchmark } from "@/lib/research/benchmark";
import { date } from "@/lib/format";

export const metadata = { title: "Editorial standards", description: "How Capto Learn's courses and research answers are written, checked and kept up to date." };
export const dynamic = "force-dynamic";

/**
 * Public page: how content is made and checked, with live figures. Linked from every lesson and the sign-in page,
 * so firms (and their clients) can see the basis for what they're relying on.
 */
export default async function EditorialPage() {
  const [reviews, stats, bench] = await Promise.all([reviewRows(), kbStats(), latestBenchmark()]);
  const lessons = allLessons();
  const status = lessons.map((l) => effectiveReview(l.lesson, reviews.get(l.id)));
  const reviewed = status.filter((s) => s === "reviewed").length;
  // Named reviewers with the qualifications they held when they signed off, and how many current sign-offs each has.
  const reviewers = new Map<string, { credentials: string; count: number }>();
  lessons.forEach((l, i) => {
    const r = reviews.get(l.id);
    if (status[i] !== "reviewed" || !r?.reviewerName) return;
    const cur = reviewers.get(r.reviewerName) ?? { credentials: r.reviewerCredentials ?? "", count: 0 };
    reviewers.set(r.reviewerName, { credentials: cur.credentials || r.reviewerCredentials || "", count: cur.count + 1 });
  });

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px 64px" }} className="stack">
      <p className="small" style={{ margin: 0 }}>
        <Link href="/">Capto Learn</Link>
      </p>
      <h1 style={{ margin: "4px 0 0" }}>Editorial standards</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        How Capto Learn&apos;s courses and Ask Capto&apos;s research answers are written, checked and kept up to date — and what they are not.
      </p>

      <section className="grid-3" style={{ gap: 12 }}>
        <div className="card card-pad">
          <div className="small muted">Lessons signed off by a qualified reviewer</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>
            {reviewed} <span className="small muted">of {lessons.length}</span>
          </div>
        </div>
        <div className="card card-pad">
          <div className="small muted">Official pages in our synced guidance library</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{stats.documents ? stats.documents.toLocaleString("en-GB") : "—"}</div>
        </div>
        <div className="card card-pad">
          <div className="small muted">Accuracy benchmark (graded by qualified reviewers)</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{bench ? `${bench.correct} of ${bench.graded}` : "Not yet run"}</div>
          {bench && <div className="small faint">fully correct · last graded {date(bench.lastGraded)}</div>}
        </div>
      </section>

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0 }}>
          <BookOpenCheck size={18} /> Our sources
        </h2>
        <p style={{ margin: 0 }}>
          Lessons and answers are based on official material: HMRC&apos;s internal manuals and guidance, GOV.UK, Companies House, The Pensions Regulator, HMRC and HM Treasury policy papers (Budget measures, tax information and impact notes, Revenue and Customs Briefs), and the FRC&apos;s accounting standards. Every lesson lists its sources, and every research answer shows the exact passage it relies on. Material from professional bodies (ICAEW, ACCA, ATT, CIOT) is only linked or summarised and is always labelled as such. We do not copy commercial publishers&apos; commentary.
        </p>
      </section>

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0 }}>
          <Sparkles size={18} /> How content is written, and our use of AI
        </h2>
        <p style={{ margin: 0 }}>
          Lessons are drafted with the help of AI from the official sources, then checked. We say so plainly: until a qualified reviewer signs a lesson off, it is marked <strong>AI draft</strong> on the page. Ask Capto&apos;s answers are written by AI from passages it has just retrieved, and every quotation is then checked <strong>word for word</strong> against the source text by our software — a point whose quotation can&apos;t be found is marked <em>unverified</em>, never hidden.
        </p>
      </section>

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0 }}>
          <ShieldCheck size={18} /> How content is checked
        </h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            <strong>Human review.</strong> A qualified reviewer works through a fixed checklist (law and figures current, calculations correct, sources support the text, nothing misleading) and signs the lesson off. The sign-off records the reviewer, their qualifications, the date and a fingerprint of the content: if the lesson is edited afterwards it automatically drops back to &ldquo;edited since review&rdquo;.
          </li>
          <li>
            <strong>Accuracy passes.</strong> Periodically every lesson is re-read, every calculation re-done and every fact re-checked against official sources, and only changed where an official source proves it wrong.
          </li>
          <li>
            <strong>Firm review.</strong> Firms can approve Ask Capto answers in their own research register before they are reused or relied on, and every research memo carries a prepared / reviewed / approved box.
          </li>
          <li>
            <strong>Accuracy benchmark.</strong> A fixed set of real practice questions with model answers set by qualified reviewers is put to Ask Capto and graded by them; the result is published above.
          </li>
        </ul>
      </section>

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0 }}>
          <RefreshCw size={18} /> Keeping it current
        </h2>
        <p style={{ margin: 0 }}>
          Our copy of the official guidance is re-checked against GOV.UK every week; only changed pages are downloaded. When a page behind a lesson changes, the lesson is flagged to reviewers and to learners; when a page behind a saved or approved research answer changes, the people relying on it are told and the answer is no longer reused automatically. Lessons state the tax year they are written for, and the rates table states the date each figure was checked.
        </p>
      </section>

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0 }}>
          <BadgeCheck size={18} /> Corrections
        </h2>
        <p style={{ margin: 0 }}>
          Anyone using Capto Learn can report a problem on any lesson; reports go straight to our reviewers. We record corrections and publish a summary of each accuracy pass.
        </p>
        {ACCURACY_PASSES.map((p) => (
          <details key={p.label}>
            <summary>
              <strong>{p.label} accuracy pass</strong> (completed {date(p.completed)}): {totalCorrections(p)} corrections
            </summary>
            <p className="small">{p.method}</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Corrections</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(p.corrections).map(([slug, n]) => (
                  <tr key={slug}>
                    <td>{getTrack(slug)?.title ?? slug}</td>
                    <td>{n}</td>
                  </tr>
                ))}
                <tr>
                  <td>Instant-answer question bot</td>
                  <td>{p.botCorrections}</td>
                </tr>
              </tbody>
            </table>
          </details>
        ))}
      </section>

      {reviewers.size > 0 && (
        <section className="card card-pad stack" style={{ gap: 8 }}>
          <h2 style={{ margin: 0 }}>Our reviewers</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {[...reviewers.entries()].map(([name, r]) => (
              <li key={name}>
                {name}
                {r.credentials ? `, ${r.credentials}` : ""} — {r.count} lesson{r.count === 1 ? "" : "s"} signed off
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0 }}>
          <TriangleAlert size={18} /> What Capto Learn is not
        </h2>
        <p style={{ margin: 0 }}>
          Capto Learn is a training and research aid for accountancy professionals. It is not advice, and it does not replace professional judgement, a firm&apos;s own review procedures, or reading the legislation and guidance itself. Primary legislation and case law are not yet part of our library; HMRC guidance sets out HMRC&apos;s view of the law and does not bind the courts.
        </p>
      </section>

      <p className="small faint">Contains public sector information licensed under the Open Government Licence v3.0.</p>
    </main>
  );
}
