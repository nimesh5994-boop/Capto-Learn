"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ListChecks, RotateCcw, Shuffle, Sparkles, XCircle } from "lucide-react";
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
  /** Multiple-choice options (the right answer plus three from other checked cards), when available. */
  options?: string[];
  answer?: number;
}

type Mode = "choose" | "flip";
const MODE_KEY = "capto-flashcard-mode";

function shuffled<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Flashcards, two ways: pick the right answer from four (default — tests real recall), or the classic flip and
 * say whether you knew it. Cards you get wrong go to the back of the pile until you get them right.
 */
export function FlashcardDeck({ cards }: { cards: FlashcardView[] }) {
  const [mode, setMode] = useState<Mode>("choose");
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [known, setKnown] = useState(0);
  const [again, setAgain] = useState(0);
  const card = queue[0];
  const choosing = mode === "choose" && !!card?.options;

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a per-viewer preference after hydration
      if (localStorage.getItem(MODE_KEY) === "flip") setMode("flip");
    } catch {}
  }, []);
  const switchMode = (m: Mode) => {
    setMode(m);
    setFlipped(false);
    setPicked(null);
    try {
      localStorage.setItem(MODE_KEY, m);
    } catch {}
  };

  const answer = useCallback((knewIt: boolean) => {
    setFlipped(false);
    setPicked(null);
    if (knewIt) setKnown((n) => n + 1);
    else setAgain((n) => n + 1);
    setQueue((q) => (knewIt ? q.slice(1) : [...q.slice(1), q[0]]));
  }, []);
  const restart = (mix: boolean) => {
    setQueue(mix ? shuffled(cards) : cards);
    setFlipped(false);
    setPicked(null);
    setKnown(0);
    setAgain(0);
  };
  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    setFlipped(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card || (e.target as HTMLElement)?.closest("input, textarea, select")) return;
      if (choosing) {
        const n = Number(e.key);
        if (picked === null && n >= 1 && n <= (card.options?.length ?? 0)) pick(n - 1);
        else if (picked !== null && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
          e.preventDefault();
          answer(picked === card.answer);
        }
        return;
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && (e.key === "ArrowRight" || e.key === "2")) answer(true);
      else if (flipped && (e.key === "ArrowLeft" || e.key === "1")) answer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, flipped, picked, choosing, answer]);

  const modeSwitch = (
    <div className={styles.modes} role="radiogroup" aria-label="Card style">
      <button type="button" role="radio" aria-checked={mode === "choose"} className={mode === "choose" ? styles.modeOn : undefined} onClick={() => switchMode("choose")}>
        <ListChecks size={14} /> Multiple choice
      </button>
      <button type="button" role="radio" aria-checked={mode === "flip"} className={mode === "flip" ? styles.modeOn : undefined} onClick={() => switchMode("flip")}>
        <Sparkles size={14} /> Flip cards
      </button>
    </div>
  );

  if (!card)
    return (
      <div className={`card ${playerStyles.panel}`}>
        <h2 className={playerStyles.panelTitle}>Deck complete</h2>
        <p className="muted" style={{ margin: 0 }}>
          {cards.length} cards · {again === 0 ? "every one right first time" : `${again} needed another go`}.
        </p>
        <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => restart(true)}>
            <Shuffle size={15} /> Shuffle and go again
          </button>
          <Link href="/flashcards" className="btn">
            Choose another deck
          </Link>
        </div>
      </div>
    );

  const right = picked !== null && picked === card.answer;
  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="row between" style={{ gap: 10, flexWrap: "wrap" }}>
        {modeSwitch}
        <span className="row small muted" style={{ gap: 6 }}>
          <span>
            {known} of {cards.length} known{again ? ` · ${again} to retry` : ""}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={() => restart(true)} title="Shuffle">
            <Shuffle size={14} />
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => restart(false)} title="Start over">
            <RotateCcw size={14} />
          </button>
        </span>
      </div>
      <div className={playerStyles.bar} role="progressbar" aria-valuenow={known} aria-valuemin={0} aria-valuemax={cards.length} aria-label="Deck progress">
        <div className={playerStyles.barFill} style={{ width: `${(known / cards.length) * 100}%` }} />
      </div>

      {choosing ? (
        <div className={styles.mc}>
          <div className={styles.mcQuestion}>
            <span className={styles.kicker}>Question</span>
            <span className={styles.front}>{card.front}</span>
          </div>
          <div className={styles.mcOptions}>
            {card.options!.map((o, k) => {
              const state = picked === null ? "" : k === card.answer ? styles.optRight : k === picked ? styles.optWrong : styles.optDim;
              return (
                <button key={k} type="button" className={`${styles.opt} ${state}`} onClick={() => pick(k)} disabled={picked !== null}>
                  <span className={styles.optKey}>{k + 1}</span>
                  <span>{o}</span>
                  {picked !== null && k === card.answer && <CheckCircle2 size={17} className={styles.optIcon} />}
                  {picked === k && k !== card.answer && <XCircle size={17} className={styles.optIcon} />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className={`${styles.verdict} ${right ? styles.verdictRight : styles.verdictWrong}`}>
              <strong>{right ? "Right." : "Not quite — it comes round again."}</strong>
              <span className={styles.evidence}>From the lesson: &ldquo;{card.evidence}&rdquo;</span>
            </div>
          )}
        </div>
      ) : (
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
      )}

      <div className="row between" style={{ gap: 10, flexWrap: "wrap" }}>
        <Link href={`/learn/${card.lessonId}`} className="small">
          From: {card.lessonTitle}
          {card.taxYear ? ` (${card.taxYear})` : ""}
        </Link>
        {choosing ? (
          picked !== null && (
            <button className="btn btn-primary" onClick={() => answer(right)}>
              Next card
            </button>
          )
        ) : flipped ? (
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
