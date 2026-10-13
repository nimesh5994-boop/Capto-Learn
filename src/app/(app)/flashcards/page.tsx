import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { allLessons, getLesson, getTrack, tracks } from "@/content";
import { lessonFlashcards, trackFlashcards } from "@/content/flashcards";
import { quizOptions } from "@/lib/learning/flashcardQuiz";
import { FlashcardDeck } from "@/components/learn/FlashcardDeck";
import { TrackIcon } from "@/components/learn/bits";
import styles from "./flashcards.module.css";

export const metadata = { title: "Flashcards" };

export default async function FlashcardsPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  await requirePermission("learning.view");
  const { course } = await searchParams;
  const track = course ? getTrack(course) : undefined;

  if (track) {
    // Wrong options come from every checked card, so the pool is the whole library.
    const pool = allLessons().flatMap((r) => lessonFlashcards(r.id));
    const cards = trackFlashcards(track.slug).map((c) => ({ ...c, lessonTitle: getLesson(c.lessonId)?.lesson.title ?? "", ...(quizOptions(c, pool) ?? {}) }));
    return (
      <>
        <Link href="/flashcards" className={styles.back}>
          <ArrowLeft size={14} /> All decks
        </Link>
        <div className="page-head">
          <div className="row" style={{ gap: 14, alignItems: "center" }}>
            <TrackIcon name={track.icon} size={22} />
            <div>
              <h1>{track.title}</h1>
              <p className="muted">{cards.length} cards · rates, thresholds, deadlines and key terms, each quoted from its lesson.</p>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 780 }}>
          {cards.length ? <FlashcardDeck cards={cards} /> : <div className="card card-pad muted">No cards for this course yet.</div>}
          <p className="small faint" style={{ marginTop: 14 }}>
            Shortcuts: <kbd>1</kbd>–<kbd>4</kbd> choose · <kbd>Enter</kbd> next card. In flip mode: <kbd>Space</kbd> flip · <kbd>1</kbd> didn&apos;t know · <kbd>2</kbd> knew it.
          </p>
        </div>
      </>
    );
  }

  const decks = tracks().map((t) => ({ t, n: trackFlashcards(t.slug).length }));
  const total = decks.reduce((n, d) => n + d.n, 0);
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Flashcards</h1>
          <p className="muted">
            {total.toLocaleString("en-GB")} quick-fire cards on the figures and terms you need at your fingertips. Pick the right answer from four — anything you miss comes round again. Every answer is
            quoted from its lesson.
          </p>
        </div>
      </div>
      <div className={styles.decks}>
        {decks.map(({ t, n }) =>
          n ? (
            <Link key={t.slug} href={`/flashcards?course=${t.slug}`} className={styles.deck}>
              <TrackIcon name={t.icon} size={20} />
              <span className={styles.deckText}>
                <strong>{t.title}</strong>
                <span>
                  <Layers size={12} /> {n} cards
                </span>
              </span>
              <ArrowRight size={16} className={styles.deckGo} />
            </Link>
          ) : (
            <div key={t.slug} className={`${styles.deck} ${styles.deckOff}`}>
              <TrackIcon name={t.icon} size={20} />
              <span className={styles.deckText}>
                <strong>{t.title}</strong>
                <span>Cards coming soon</span>
              </span>
            </div>
          )
        )}
      </div>
    </>
  );
}
