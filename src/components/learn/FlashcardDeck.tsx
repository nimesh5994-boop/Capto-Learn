"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw, Shuffle } from "lucide-react";
import styles from "./flashcards.module.css";
import playerStyles from "./player.module.css";

export interface FlashcardView {
  id: string;
  front: string;
  back: string;
  evidence: string;
  lessonId: string;
  lessonTitle: string;
  taxYear?: string;
}

function shuffled<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Flip a card, say whether you knew it; cards you didn't know go to the back of the pile until you do. */
export function FlashcardDeck({ cards }: { cards: FlashcardView[] }) {
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [again, setAgain] = useState(0);
  const card = queue[0];

  const answer = useCallback(
    (knewIt: boolean) => {
      setFlipped(false);
      if (knewIt) setKnown((n) => n + 1);
      else setAgain((n) => n + 1);
      setQueue((q) => (knewIt ? q.slice(1) : [...q.slice(1), q[0]]));
    },
    []
  );
  const restart = (mix: boolean) => {
    setQueue(mix ? shuffled(cards) : cards);
    setFlipped(false);
    setKnown(0);
    setAgain(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card || (e.target as HTMLElement)?.closest("input, textarea, select")) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && (e.key === "ArrowRight" || e.key === "2")) answer(true);
      else if (flipped && (e.key === "ArrowLeft" || e.key === "1")) answer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, flipped, answer]);

  if (!card)
    return (
      <div className={`card ${playerStyles.panel}`}>
        <h2 className={playerStyles.panelTitle}>Deck complete</h2>
        <p className="muted" style={{ margin: 0 }}>
          {cards.length} cards · {again === 0 ? "every one first time" : `${again} needed another go`}.
        </p>
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-primary" onClick={() => restart(true)}>
            <Shuffle size={15} /> Shuffle and go again
          </button>
          <Link href="/flashcards" className="btn">
            Choose another deck
          </Link>
        </div>
      </div>
    );

  const done = known;
  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="row between small muted">
        <span>
          {done} of {cards.length} known{again ? ` · ${again} to retry` : ""}
        </span>
        <span className="row" style={{ gap: 6 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => restart(true)} title="Shuffle">
            <Shuffle size={14} /> Shuffle
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => restart(false)} title="Start over">
            <RotateCcw size={14} /> Restart
          </button>
        </span>
      </div>
      <div className={playerStyles.bar} role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={cards.length} aria-label="Deck progress">
        <div className={playerStyles.barFill} style={{ width: `${(done / cards.length) * 100}%` }} />
      </div>

      <button type="button" className={`${styles.card} ${flipped ? styles.flipped : ""}`} onClick={() => setFlipped((f) => !f)} aria-label={flipped ? "Show question" : "Show answer"}>
        <span className={styles.inner}>
          <span className={styles.face}>
            <span className={styles.kicker}>Question</span>
            <span className={styles.front}>{card.front}</span>
            <span className={styles.hint}>Click or press space to reveal</span>
          </span>
          <span className={`${styles.face} ${styles.back}`}>
            <span className={styles.kicker}>Answer</span>
            <span className={styles.answer}>{card.back}</span>
            <span className={styles.evidence}>&ldquo;{card.evidence}&rdquo;</span>
          </span>
        </span>
      </button>

      <div className="row between" style={{ gap: 10, flexWrap: "wrap" }}>
        <Link href={`/learn/${card.lessonId}`} className="small">
          From: {card.lessonTitle}
          {card.taxYear ? ` (${card.taxYear})` : ""}
        </Link>
        {flipped ? (
          <span className="row" style={{ gap: 8 }}>
            <button className="btn" onClick={() => answer(false)}>
              Didn&apos;t know it
            </button>
            <button className="btn btn-primary" onClick={() => answer(true)}>
              Knew it
            </button>
          </span>
        ) : (
          <button className="btn btn-primary" onClick={() => setFlipped(true)}>
            Show answer
          </button>
        )}
      </div>
    </div>
  );
}
