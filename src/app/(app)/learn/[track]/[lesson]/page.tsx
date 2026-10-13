import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ClipboardList, ExternalLink, GraduationCap, Landmark, Sparkles, Target } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getLesson, moduleLessons, neighbours } from "@/content";
import { LEVELS } from "@/content/types";
import { markLessonStarted } from "@/app/actions/learning";
import { myProgress } from "@/lib/learning/progress";
import { effectiveReview, lessonSourceChanges, reviewRows, sourceChangedSinceReview } from "@/lib/learning/review";
import { publicExercise, QUIZ_PASS_MARK } from "@/lib/learning/marking";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { date } from "@/lib/format";
import { Blocks } from "@/components/learn/Blocks";
import { Exercise, type RenderedExercise } from "@/components/learn/Exercise";
import { Quiz } from "@/components/learn/Quiz";
import { ReportProblem } from "@/components/learn/ReportProblem";
import { ReviewPill, StatusDot } from "@/components/learn/bits";
import styles from "@/components/learn/learn.module.css";
import playerStyles from "@/components/learn/player.module.css";
import { LessonPlayer } from "@/components/learn/LessonPlayer";
import { lessonSteps, stepLabel } from "@/lib/learning/steps";

export default async function LessonPage({ params, searchParams }: { params: Promise<{ track: string; lesson: string }>; searchParams: Promise<{ view?: string }> }) {
  const { track: trackSlug, lesson: lessonSlug } = await params;
  const full = (await searchParams).view === "full";
  const ctx = await requirePermission("learning.view");
  const id = `${trackSlug}/${lessonSlug}`;
  const ref = getLesson(id);
  if (!ref) notFound();
  const { track, module, lesson } = ref;
  await markLessonStarted(id);
  const [progress, reviews, sourceChanges] = await Promise.all([myProgress(ctx.user.id), reviewRows(), lessonSourceChanges()]);
  const mine = progress.get(id);
  const review = reviews.get(id);
  const status = effectiveReview(lesson, review);
  const guidanceChangedAt = sourceChanges.get(id);
  const guidanceChangedSinceReview = sourceChangedSinceReview(review, guidanceChangedAt);
  const { prev, next } = neighbours(id);
  const siblings = moduleLessons(trackSlug, module.slug);

  const exercises: RenderedExercise[] = lesson.exercises.map((e) => {
    const pub = publicExercise(e);
    return {
      ...pub,
      promptHtml: renderMarkdown(pub.prompt),
      optionsHtml: "options" in pub ? pub.options.map((o) => renderInline(o)) : undefined,
      itemsHtml: pub.kind === "classify" ? pub.items.map((i) => renderInline(i)) : undefined,
    };
  });
  const quiz = lesson.quiz.map((q) => ({ id: q.id, promptHtml: renderMarkdown(q.prompt), optionsHtml: q.options.map((o) => renderInline(o)) }));
  const solved = new Set(mine?.exercisesCorrect ?? []);

  // Step-by-step mode: every step rendered here on the server; the client player shows one at a time.
  const steps = lessonSteps(lesson);
  const quizNode = <Quiz lessonId={id} questions={quiz} best={mine?.bestQuizScore ?? null} passMark={QUIZ_PASS_MARK} nextHref={next ? `/learn/${next.id}` : undefined} />;
  const panels = steps.map((st, n) => {
    if (st.kind === "overview")
      return (
        <div key={n} className={`card ${playerStyles.panel}`}>
          <div className={playerStyles.panelKicker}>Overview</div>
          <h2 className={playerStyles.panelTitle}>{lesson.title}</h2>
          <p className="muted" style={{ margin: 0 }}>
            {lesson.summary}
          </p>
          <div className={playerStyles.overviewMeta}>
            <span>{lesson.minutes} min</span>
            <span>{steps.length} short steps</span>
            <span>
              {lesson.exercises.length} practice questions + {lesson.quiz.length}-question quiz
            </span>
          </div>
          <div>
            <strong className="small">By the end you can:</strong>
            <ul className={playerStyles.objectives}>
              {lesson.objectives.map((o, k) => (
                <li key={k} dangerouslySetInnerHTML={{ __html: renderInline(o) }} />
              ))}
            </ul>
          </div>
          <p className="small faint" style={{ margin: 0 }}>
            Already know this? Jump straight to the quiz from the step list above. Passing it completes the lesson.
          </p>
        </div>
      );
    if (st.kind === "theory" || st.kind === "walkthrough")
      return (
        <div key={n} className={`card ${playerStyles.panel}`}>
          <div className={playerStyles.panelKicker}>{st.kind === "theory" ? "The rules" : "Worked example"}</div>
          <h2 className={playerStyles.panelTitle}>{st.title.replace(/^#+\s*/, "")}</h2>
          <Blocks blocks={st.blocks} />
        </div>
      );
    if (st.kind === "scenario")
      return (
        <div key={n} className={`card ${playerStyles.panel}`}>
          <div className={playerStyles.panelKicker}>Real-life scenario</div>
          <h2 className={playerStyles.panelTitle}>{lesson.scenario!.title}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.scenario!.narrative) }} />
          <p className="small faint" style={{ margin: 0 }}>
            Think about how you&apos;d handle it — the next step works through it.
          </p>
        </div>
      );
    if (st.kind === "exercise") {
      const e = exercises[st.index];
      return (
        <div key={n} className={`card ${playerStyles.panel}`}>
          <div className={playerStyles.panelKicker}>{stepLabel(st, exercises.length)}</div>
          <Exercise lessonId={id} ex={e} number={st.index + 1} solvedBefore={solved.has(e.id)} />
        </div>
      );
    }
    return (
      <div className={`card ${playerStyles.panel}`} key={n}>
        <div className={playerStyles.panelKicker}>Check your understanding</div>
        <h2 className={playerStyles.panelTitle}>Lesson quiz</h2>
        <p className="small muted" style={{ margin: 0 }}>
          Score {QUIZ_PASS_MARK}% or more to complete the lesson.
        </p>
        {quizNode}
      </div>
    );
  });

  return (
    <>
      <p className="small" style={{ margin: "0 0 8px" }}>
        <Link href="/learn">Courses</Link> / <Link href={`/learn/${track.slug}`}>{track.title}</Link> / {module.title}
      </p>
      <div className="page-head">
        <div>
          <div className="row" style={{ gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span className="pill">{LEVELS[lesson.level].label}</span>
            <span className="small faint">{lesson.minutes} min</span>
            {lesson.taxYear && <span className="pill">Figures: {lesson.taxYear}</span>}
            <ReviewPill status={status} />
            {mine?.status === "completed" && (
              <span className="pill pill-accepted">
                <CheckCircle2 size={11} /> Completed
              </span>
            )}
          </div>
          <h1>{lesson.title}</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            {lesson.summary}
          </p>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 14 }}>
        <nav className={playerStyles.viewSwitch} aria-label="Lesson view">
          <Link href={`/learn/${id}`} aria-current={full ? undefined : "page"}>
            Step by step
          </Link>
          <Link href={`/learn/${id}?view=full`} aria-current={full ? "page" : undefined}>
            Full page
          </Link>
        </nav>
      </div>

      <div className={styles.lessonLayout}>
        <div className={styles.lessonMain}>
          {guidanceChangedSinceReview && (
            <div className="alert alert-warning">
              Official guidance this lesson cites was updated on {date(guidanceChangedAt)}, after the lesson was reviewed. Check the linked sources while our reviewers re-check it.
            </div>
          )}
          {status === "reviewed" ? (
            <div className={styles.reviewedBanner}>
              <CheckCircle2 size={16} color="var(--success)" />
              <span>
                Technically reviewed by {review?.reviewerName ?? "a qualified reviewer"} on {date(review?.reviewedAt)}.
              </span>
            </div>
          ) : (
            <div className={styles.draftBanner}>
              <Sparkles size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>
                <strong>{status === "needs_changes" ? "This lesson is being corrected." : status === "changed" ? "This lesson has changed since it was reviewed." : "AI-drafted lesson — not yet reviewed by a qualified accountant."}</strong>{" "}
                It was written from HMRC and GOV.UK guidance, but check figures against the linked sources before relying on them for client work, and use “Report a problem” if anything looks wrong.
              </span>
            </div>
          )}

          {!full && <LessonPlayer lessonId={id} steps={steps.map((st) => ({ label: stepLabel(st, exercises.length), kind: st.kind }))} panels={panels} />}

          {full && (
            <>
          <section className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>
              <Target size={18} /> By the end of this lesson you can
            </h2>
            <ul className={styles.objectives}>
              {lesson.objectives.map((o, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(o) }} />
              ))}
            </ul>
          </section>

          <section className={`card ${styles.section}`}>
            <div className={styles.kicker}>Theory</div>
            <h2 className={styles.sectionTitle}>
              <GraduationCap size={18} /> The rules
            </h2>
            <Blocks blocks={lesson.body} />
          </section>

          {lesson.scenario && (
            <section className={`card ${styles.section}`}>
              <div className={styles.kicker}>Real-life scenario</div>
              <h2 className={styles.sectionTitle}>
                <Landmark size={18} /> {lesson.scenario.title}
              </h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.scenario.narrative) }} />
              <h3 style={{ fontFamily: "var(--font-heading)", margin: "18px 0 10px" }}>How to work it through</h3>
              <Blocks blocks={lesson.scenario.walkthrough} />
            </section>
          )}

          <section className={`card ${styles.section}`}>
            <div className={styles.kicker}>Practice</div>
            <h2 className={styles.sectionTitle}>
              <ClipboardList size={18} /> Practical exercises
            </h2>
            <div className="stack" style={{ gap: 14 }}>
              {exercises.map((e, i) => (
                <Exercise key={e.id} lessonId={id} ex={e} number={i + 1} solvedBefore={solved.has(e.id)} />
              ))}
            </div>
          </section>

          <section className={`card ${styles.section}`} id="quiz">
            <div className={styles.kicker}>Check your understanding</div>
            <h2 className={styles.sectionTitle}>
              <CheckCircle2 size={18} /> Lesson quiz
            </h2>
            <p className="small muted" style={{ marginTop: -4 }}>
              Score {QUIZ_PASS_MARK}% or more to complete the lesson.
            </p>
            {quizNode}
          </section>
            </>
          )}

          <section className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle} style={{ fontSize: 18 }}>
              Official sources
            </h2>
            <ul className={styles.sources}>
              {lesson.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label} <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.navRow}>
            {prev ? (
              <Link href={`/learn/${prev.id}`} className={styles.navLink}>
                <span>← Previous</span>
                <span>{prev.lesson.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/learn/${next.id}`} className={styles.navLink} style={{ textAlign: "right" }}>
                <span>Next →</span>
                <span>{next.lesson.title}</span>
              </Link>
            )}
          </div>
        </div>

        <aside className={styles.lessonAside}>
          <div className="card card-pad">
            <div className="small muted" style={{ marginBottom: 6 }}>
              {module.title}
            </div>
            <nav className={styles.asideList}>
              {siblings.map((s) => {
                const p = progress.get(s.id);
                return (
                  <Link key={s.id} href={`/learn/${s.id}`} className={s.id === id ? styles.current : undefined}>
                    <StatusDot status={p?.status === "completed" ? "completed" : p ? "started" : "none"} />
                    {s.lesson.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="card card-pad stack" style={{ gap: 8 }}>
            <div className="small muted">Spotted something wrong or out of date?</div>
            <ReportProblem lessonId={id} />
          </div>
          {ctx.can("research.use") && (
            <Link href={`/ask?q=${encodeURIComponent(lesson.title)}`} className="btn btn-sm">
              Ask Capto about this topic
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}
