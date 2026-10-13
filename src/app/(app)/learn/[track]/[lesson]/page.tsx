import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CheckCircle2, ChevronRight, ClipboardList, Clock, ExternalLink, GraduationCap, Landmark, Layers, MessageSquareQuote, Sparkles, Target } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getLesson, moduleLessons, neighbours, trackLessons } from "@/content";
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
import { StatusDot } from "@/components/learn/bits";
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
  const courseLessons = trackLessons(trackSlug);
  const courseDone = courseLessons.filter((l) => progress.get(l.id)?.status === "completed").length;

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
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link href="/learn">Courses</Link>
        <ChevronRight size={13} />
        <Link href={`/learn/${track.slug}`}>{track.title}</Link>
        <ChevronRight size={13} />
        <span>{module.title}</span>
      </nav>
      <div className="page-head">
        <div>
          <h1>{lesson.title}</h1>
          <p className="muted">{lesson.summary}</p>
          <div className={styles.lessonFacts}>
            <span>{LEVELS[lesson.level].label}</span>
            <span>
              <Clock size={13} /> {lesson.minutes} min
            </span>
            {lesson.taxYear && <span>Figures for {lesson.taxYear}</span>}
            {mine?.status === "completed" && (
              <span className={styles.factDone}>
                <CheckCircle2 size={13} /> Completed{mine.bestQuizScore != null ? ` · quiz ${mine.bestQuizScore}%` : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 14, flexWrap: "wrap" }}>
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
              <BadgeCheck size={16} color="var(--success)" />
              <span>
                Reviewed by {review?.reviewerName ?? "a qualified reviewer"} on {date(review?.reviewedAt)}.
              </span>
            </div>
          ) : (
            <details className={styles.draftBanner}>
              <summary>
                <Sparkles size={15} />
                <strong>{status === "needs_changes" ? "Being corrected" : status === "changed" ? "Changed since review" : "AI-drafted"}</strong>
                <span>— not yet reviewed by a qualified accountant. Check figures against the sources.</span>
                <span className={styles.draftMore}>Details</span>
              </summary>
              <p>
                This lesson was written from HMRC and GOV.UK guidance. Until a qualified reviewer signs it off, check figures against the official sources listed at the end before relying on them for
                client work, and use &ldquo;Report a problem&rdquo; if anything looks wrong.
              </p>
            </details>
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
          <section className={styles.outline}>
            <Link href={`/learn/${track.slug}`} className={styles.outlineHead}>
              <span className={styles.outlineCourse}>{track.title}</span>
              <span className={styles.outlineCount}>
                {courseDone}/{courseLessons.length} lessons done
              </span>
              <span className={styles.outlineBar}>
                <span style={{ width: `${Math.round((courseDone / courseLessons.length) * 100)}%` }} />
              </span>
            </Link>
            {track.modules.map((m) => {
              const lessons = moduleLessons(trackSlug, m.slug);
              const here = m.slug === module.slug;
              return (
                <details key={m.slug} className={styles.outlineModule} open={here}>
                  <summary>
                    {m.title}
                    <span>
                      {lessons.filter((l) => progress.get(l.id)?.status === "completed").length}/{lessons.length}
                    </span>
                  </summary>
                  <nav className={styles.asideList}>
                    {lessons.map((s) => {
                      const p = progress.get(s.id);
                      return (
                        <Link key={s.id} href={`/learn/${s.id}`} className={s.id === id ? styles.current : undefined} aria-current={s.id === id ? "page" : undefined}>
                          <StatusDot status={p?.status === "completed" ? "completed" : p ? "started" : "none"} />
                          <span>{s.lesson.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </details>
              );
            })}
          </section>
          <section className={styles.help}>
            <h3>Need help?</h3>
            {ctx.can("research.use") && (
              <Link href={`/ask?q=${encodeURIComponent(lesson.title)}`} className="btn btn-sm">
                <MessageSquareQuote size={14} /> Ask Capto about this topic
              </Link>
            )}
            <Link href={`/flashcards?course=${track.slug}`} className="btn btn-sm">
              <Layers size={14} /> Flashcards for this course
            </Link>
            <ReportProblem lessonId={id} />
          </section>
        </aside>
      </div>
    </>
  );
}
