import { CheckCircle2, Repeat } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { requirePermission } from "@/lib/auth/dal";
import { dailyCards } from "@/lib/learning/daily";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { DailyFive } from "@/components/learn/DailyFive";

export const metadata = { title: "Daily 5" };

export default async function DailyFivePage() {
  const ctx = await requirePermission("learning.view");
  const { cards, dueCount, deckSize } = await dailyCards(ctx.org.id, ctx.user.id);
  const view = cards.map((c) => ({
    itemId: c.itemId,
    lessonId: c.lessonId,
    lessonTitle: c.lessonTitle,
    trackTitle: c.trackTitle,
    promptHtml: renderMarkdown(c.prompt),
    optionsHtml: c.options.map((o) => renderInline(o)),
  }));
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Daily 5</h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            Five quick questions from lessons you&apos;ve already taken. Get one right and it comes back later, spaced further apart; miss it and you&apos;ll see it again tomorrow. Two minutes a day keeps it
            all fresh.
          </p>
        </div>
      </div>
      <div style={{ maxWidth: 820 }}>
        {view.length ? (
          <>
            <p className="small faint" style={{ marginTop: 0 }}>
              {dueCount} question{dueCount === 1 ? "" : "s"} due · {deckSize} in your review deck
            </p>
            <DailyFive cards={view} />
          </>
        ) : (
          <EmptyState
            icon={deckSize ? CheckCircle2 : Repeat}
            title={deckSize ? "All caught up for today" : "Nothing to review yet"}
            text={deckSize ? `Your review deck has ${deckSize} questions; none are due today. Come back tomorrow, or take another lesson.` : "Finish a lesson's quiz and its questions join your review deck, starting tomorrow."}
            action={{ href: "/learn", label: deckSize ? "Take another lesson" : "Go to courses" }}
          />
        )}
      </div>
    </>
  );
}
