import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { getLesson, getTrack, tracks } from "@/content";
import { trackFlashcards } from "@/content/flashcards";
import { FlashcardDeck } from "@/components/learn/FlashcardDeck";
import { TrackIcon } from "@/components/learn/bits";

export const metadata = { title: "Flashcards" };

export default async function FlashcardsPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  await requirePermission("learning.view");
  const { course } = await searchParams;
  const track = course ? getTrack(course) : undefined;

  if (track) {
    const cards = trackFlashcards(track.slug).map((c) => ({ ...c, lessonTitle: getLesson(c.lessonId)?.lesson.title ?? "" }));
    return (
      <>
        <div className="page-head">
          <div>
            <h1>{track.title} flashcards</h1>
            <p className="muted">{cards.length} cards · rates, thresholds, deadlines and key terms from the course.</p>
          </div>
          <Link href="/flashcards" className="btn btn-sm">
            All decks
          </Link>
        </div>
        <div style={{ maxWidth: 760 }}>
          {cards.length ? <FlashcardDeck cards={cards} /> : <div className="card card-pad muted">No cards for this course yet.</div>}
          <p className="small faint" style={{ marginTop: 14 }}>
            Shortcuts: <kbd>Space</kbd> flip · <kbd>1</kbd> didn&apos;t know · <kbd>2</kbd> knew it. Every answer is quoted from its lesson underneath.
          </p>
        </div>
      </>
    );
  }

  const decks = tracks().map((t) => ({ t, n: trackFlashcards(t.slug).length }));
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Flashcards</h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            Quick-fire decks of the numbers and terms you need at your fingertips. Pick a course, flip a card, and say whether you knew it — cards you miss come round again.
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
        {decks.map(({ t, n }) =>
          n ? (
            <Link key={t.slug} href={`/flashcards?course=${t.slug}`} className="card card-pad row" style={{ gap: 12, textDecoration: "none", color: "inherit" }}>
              <TrackIcon name={t.icon} size={18} />
              <span>
                <strong>{t.title}</strong>
                <div className="small faint">{n} cards</div>
              </span>
            </Link>
          ) : (
            <div key={t.slug} className="card card-pad row" style={{ gap: 12, opacity: 0.55 }}>
              <TrackIcon name={t.icon} size={18} />
              <span>
                <strong>{t.title}</strong>
                <div className="small faint">Cards coming soon</div>
              </span>
            </div>
          )
        )}
      </div>
    </>
  );
}
