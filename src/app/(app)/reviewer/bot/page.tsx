import Link from "next/link";
import { and, desc, eq, gte, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { botAliases, botEvents, researchQueries } from "@/lib/db/schema";
import { allLessons } from "@/content";
import { lessonPlainText } from "@/lib/learning/flashcards";
import { EXAM_QUESTIONS } from "@/lib/search/examQuestions";
import { gradeCase } from "@/lib/search/grade";
import { GLOSSARY } from "@/lib/search/glossary";
import { dateTime } from "@/lib/format";
import { daysAgo } from "@/lib/time";
import { ForgetAlias, ResolveButton, TeachForm } from "./BotTraining";

export const metadata = { title: "Bot training" };

/** The live exam score, computed on the server from the current bot and lessons (no AI, takes a second). */
function examScore() {
  const lessons = allLessons().map((r) => ({ id: r.id, title: r.lesson.title, track: r.track.slug, trackTitle: r.track.title, plain: lessonPlainText(r.lesson), level: r.lesson.level }));
  const vocab = new Set(lessons.flatMap((l) => l.plain.toLowerCase().match(/[a-z]{5,}/g) ?? []));
  const graded = EXAM_QUESTIONS.map((c) => ({ c, miss: gradeCase(c, lessons, vocab).miss }));
  return { pass: graded.filter((g) => !g.miss.length).length, total: graded.length, fails: graded.filter((g) => g.miss.length) };
}

export default async function BotTrainingPage() {
  const db = await getDb();
  const since = daysAgo(30);
  const [unrecognised, thumbsDown, taught, askDown, [counts]] = await Promise.all([
    db
      .select({ q: sql<string>`lower(${botEvents.question})`, n: sql<number>`count(*)::int`, last: sql<Date>`max(${botEvents.createdAt})`, ids: sql<string[]>`array_agg(${botEvents.id})` })
      .from(botEvents)
      .where(and(isNull(botEvents.concept), isNull(botEvents.resolvedAt), gte(botEvents.createdAt, since)))
      .groupBy(sql`lower(${botEvents.question})`)
      .orderBy(sql`count(*) desc`, sql`max(${botEvents.createdAt}) desc`)
      .limit(40),
    db.select().from(botEvents).where(and(eq(botEvents.helpful, false), isNull(botEvents.resolvedAt))).orderBy(desc(botEvents.createdAt)).limit(40),
    db.select().from(botAliases).orderBy(desc(botAliases.createdAt)).limit(100),
    db
      .select({ id: researchQueries.id, question: researchQueries.question, note: researchQueries.feedbackNote, at: researchQueries.createdAt })
      .from(researchQueries)
      .where(eq(researchQueries.helpful, false))
      .orderBy(desc(researchQueries.createdAt))
      .limit(15),
    db
      .select({
        total: sql<number>`count(*)::int`,
        recognised: sql<number>`count(*) filter (where ${botEvents.concept} is not null)::int`,
        answered: sql<number>`count(*) filter (where ${botEvents.answer} is not null)::int`,
        up: sql<number>`count(*) filter (where ${botEvents.helpful})::int`,
        down: sql<number>`count(*) filter (where not ${botEvents.helpful})::int`,
      })
      .from(botEvents)
      .where(gte(botEvents.createdAt, since)),
  ]);
  const exam = examScore();
  const concepts = GLOSSARY.map((g) => g.name).sort((a, b) => a.localeCompare(b));
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Bot training</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            How the free question bot is doing on real searches, and where it needs teaching. Teach it wording people use and it applies within a few minutes — every question it answers itself is one
            that costs nothing.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 18 }}>
        {[
          { label: "Bot exam", value: `${exam.pass}/${exam.total}`, sub: exam.fails.length ? `${exam.fails.length} to fix` : "all passing" },
          { label: "Searches (30 days)", value: counts?.total ?? 0, sub: "free, no AI" },
          { label: "Understood", value: pct(counts?.recognised ?? 0, counts?.total ?? 0), sub: "recognised the topic" },
          { label: "Answered instantly", value: pct(counts?.answered ?? 0, counts?.total ?? 0), sub: "from checked material" },
          { label: "Ratings", value: `${counts?.up ?? 0} 👍 · ${counts?.down ?? 0} 👎`, sub: "on instant answers" },
        ].map((s) => (
          <div key={s.label} className="card card-pad">
            <div className="small muted">{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{s.value}</div>
            <div className="small faint">{s.sub}</div>
          </div>
        ))}
      </div>

      {exam.fails.length > 0 && (
        <div className="alert alert-warning" style={{ marginBottom: 16 }}>
          Exam questions not passing: {exam.fails.map((f) => `“${f.c.q}” (${f.miss.join("; ")})`).join(" · ")}
        </div>
      )}

      <section className="card" style={{ marginBottom: 16 }}>
        <div className="card-pad" style={{ paddingBottom: 4 }}>
          <h2 style={{ margin: 0 }}>Teach the bot</h2>
          <p className="small muted" style={{ margin: "4px 0 0" }}>
            When people use wording the bot doesn&apos;t know, tell it which topic they mean.
          </p>
        </div>
        <div className="card-pad" style={{ paddingTop: 8 }}>
          <TeachForm concepts={concepts} />
        </div>
      </section>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 4 }}>
            <h2 style={{ margin: 0 }}>Not recognised ({unrecognised.length})</h2>
            <p className="small muted" style={{ margin: "4px 0 0" }}>
              Last 30 days, most-asked first. Teach the wording, or mark it dealt with.
            </p>
          </div>
          {unrecognised.length === 0 ? (
            <p className="card-pad small muted">Nothing waiting.</p>
          ) : (
            <table className="table">
              <tbody>
                {unrecognised.map((r) => (
                  <tr key={r.q}>
                    <td>
                      <Link href={`/search?q=${encodeURIComponent(r.q)}`}>{r.q}</Link>
                      <div className="small faint">
                        {r.n}× · last {dateTime(r.last)}
                      </div>
                    </td>
                    <td style={{ width: 300 }}>
                      <TeachForm concepts={concepts} compact eventIds={r.ids} suggest={r.q} />
                      <ResolveButton eventIds={r.ids} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 4 }}>
            <h2 style={{ margin: 0 }}>Marked unhelpful ({thumbsDown.length})</h2>
            <p className="small muted" style={{ margin: "4px 0 0" }}>
              What the bot understood and answered, and what the person said they wanted.
            </p>
          </div>
          {thumbsDown.length === 0 ? (
            <p className="card-pad small muted">Nothing waiting.</p>
          ) : (
            <table className="table">
              <tbody>
                {thumbsDown.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <Link href={`/search?q=${encodeURIComponent(e.question)}`}>{e.question}</Link>
                      <div className="small faint">
                        Understood: {e.concept ?? "nothing"} · {e.intent}
                        {e.lessonId ? ` · answered from ${e.lessonId}` : ""}
                      </div>
                      {e.answer && <div className="small">“{e.answer.slice(0, 180)}”</div>}
                      {e.note && <div className="small" style={{ color: "var(--primary)" }}>Wanted: {e.note}</div>}
                    </td>
                    <td style={{ width: 120 }}>
                      <ResolveButton eventIds={[e.id]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {askDown.length > 0 && (
            <div className="card-pad" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="small" style={{ fontWeight: 600, marginBottom: 6 }}>
                Ask Capto answers rated unhelpful
              </div>
              {askDown.map((a) => (
                <div key={a.id} className="small" style={{ marginBottom: 6 }}>
                  {a.question}
                  {a.note && <span className="faint"> — “{a.note}”</span>}
                  <span className="faint"> · {dateTime(a.at)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <div className="card-pad" style={{ paddingBottom: 4 }}>
          <h2 style={{ margin: 0 }}>Wording taught so far ({taught.length})</h2>
        </div>
        {taught.length === 0 ? (
          <p className="card-pad small muted">None yet.</p>
        ) : (
          <table className="table">
            <tbody>
              {taught.map((t) => (
                <tr key={t.id}>
                  <td>
                    “{t.alias}” → <strong>{t.concept}</strong>
                  </td>
                  <td className="small faint">
                    {t.createdByName} · {dateTime(t.createdAt)}
                  </td>
                  <td style={{ width: 90 }}>
                    <ForgetAlias id={t.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
