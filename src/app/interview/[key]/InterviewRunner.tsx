"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Expand, Timer } from "lucide-react";
import { answerInterview, finishInterview, logInterviewEvents } from "@/app/actions/interviews";
import styles from "../interview.module.css";

type Ev = { t: string; type: string; ms?: number };

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * The timed test. Watches for the candidate leaving the page (tab or app switch), exiting full screen, and
 * copy/paste attempts; blocks copy, paste, right-click and drag; records everything with the answers.
 */
export function InterviewRunner({
  testKey,
  total,
  answered,
  deadline,
  watermark,
  question,
}: {
  testKey: string;
  total: number;
  answered: number;
  deadline: string;
  watermark: string;
  question: { key: string; subject: string; promptHtml: string; optionsHtml: string[] } | null;
}) {
  const router = useRouter();
  const [choice, setChoice] = useState<number | null>(null);
  const [left, setLeft] = useState(() => Math.max(0, Math.round((new Date(deadline).getTime() - Date.now()) / 1000)));
  const [fullscreen, setFullscreen] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const buffer = useRef<Ev[]>([]);
  const awaySince = useRef<number | null>(null);
  const finished = useRef(false);

  const log = (e: Omit<Ev, "t">) => {
    buffer.current.push({ t: new Date().toISOString(), ...e });
  };
  const take = () => buffer.current.splice(0, buffer.current.length);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    start(async () => {
      await finishInterview(testKey, take());
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
      } catch {}
      router.refresh();
    });
  }, [testKey, router]);

  // Nothing left to answer: submit.
  useEffect(() => {
    if (!question) finish();
  }, [question, finish]);

  // Countdown from the server's deadline; time up submits.
  useEffect(() => {
    const t = setInterval(() => {
      const s = Math.max(0, Math.round((new Date(deadline).getTime() - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) finish();
    }, 500);
    return () => clearInterval(t);
  }, [deadline, finish]);

  // Integrity monitoring.
  useEffect(() => {
    const goAway = (why: string) => {
      if (awaySince.current !== null) return;
      awaySince.current = Date.now();
      log({ type: "left" });
      setWarning(why);
    };
    const comeBack = () => {
      if (awaySince.current === null) return;
      log({ type: "returned", ms: Date.now() - awaySince.current });
      awaySince.current = null;
    };
    const onVisibility = () => (document.hidden ? goAway("You left the assessment page. This has been recorded.") : comeBack());
    const onBlur = () => goAway("The assessment window lost focus (another app or window). This has been recorded.");
    const onFocus = () => comeBack();
    const onFullscreen = () => {
      const on = !!document.fullscreenElement;
      setFullscreen(on);
      if (!on) {
        log({ type: "fullscreen-exit" });
        setWarning("You left full screen. This has been recorded — please return to full screen to continue.");
      }
    };
    const block = (type: string) => (e: Event) => {
      e.preventDefault();
      log({ type });
      setWarning(type === "paste" ? "Pasting is switched off and the attempt has been recorded." : "Copying is switched off during the assessment.");
    };
    const onPaste = block("paste");
    const onCopy = block("copy");
    const onCut = block("copy");
    const noMenu = (e: Event) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "v", "x", "a", "p", "s", "u"].includes(k)) {
        e.preventDefault();
        if (k === "v") log({ type: "paste" });
        else if (k === "c" || k === "x") log({ type: "copy" });
      }
      if (k === "f12") e.preventDefault();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("fullscreenchange", onFullscreen);
    document.addEventListener("paste", onPaste);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("contextmenu", noMenu);
    document.addEventListener("dragstart", noMenu);
    window.addEventListener("keydown", onKey);
    // Check full screen once the page has settled (it may have been refused or not supported).
    const fsCheck = setTimeout(() => setFullscreen(!!document.fullscreenElement), 800);
    // Send what's been recorded every 15 seconds, even if no answer is given.
    const flush = setInterval(() => {
      if (buffer.current.length) void logInterviewEvents(testKey, take());
    }, 15_000);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("fullscreenchange", onFullscreen);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("contextmenu", noMenu);
      document.removeEventListener("dragstart", noMenu);
      window.removeEventListener("keydown", onKey);
      clearInterval(flush);
      clearTimeout(fsCheck);
    };
  }, [testKey]);

  const submit = (picked: number) => {
    if (!question) return;
    start(async () => {
      setError(null);
      const r = await answerInterview(testKey, question.key, picked, take());
      if (!r.ok) return setError(r.error);
      setChoice(null);
      setWarning(null);
      router.refresh();
    });
  };

  const done = answered;
  const low = left <= 60;
  return (
    <div className={styles.runner} data-watermark={watermark}>
      <div className={styles.runBar}>
        <span>
          Question {Math.min(total, done + 1)} of {total}
        </span>
        <span className={`${styles.timer} ${low ? styles.timerLow : ""}`} aria-live={low ? "polite" : "off"}>
          <Timer size={16} /> {clock(left)}
        </span>
      </div>
      <div className={styles.progress}>
        <span style={{ width: `${(done / total) * 100}%` }} />
      </div>

      {!fullscreen && (
        <div className={styles.fsGate}>
          <p>The assessment runs in full screen.</p>
          <button type="button" className="btn btn-primary" onClick={() => void document.documentElement.requestFullscreen?.().catch(() => {})}>
            <Expand size={15} /> Return to full screen
          </button>
        </div>
      )}
      {warning && <div className="alert alert-warning">{warning}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {question ? (
        <div className={`card ${styles.qCard}`}>
          <div className={styles.kicker}>{question.subject}</div>
          <div className={`prose ${styles.noSelect}`} dangerouslySetInnerHTML={{ __html: question.promptHtml }} />
          <div className={styles.options}>
            {question.optionsHtml.map((o, k) => (
              <button key={k} type="button" className={`${styles.option} ${choice === k ? styles.optionOn : ""}`} onClick={() => setChoice(k)} disabled={pending}>
                <span className={styles.optKey}>{String.fromCharCode(65 + k)}</span>
                <span className={styles.noSelect} dangerouslySetInnerHTML={{ __html: o }} />
              </button>
            ))}
            <button type="button" className={`${styles.option} ${choice === -1 ? styles.optionOn : ""}`} onClick={() => setChoice(-1)} disabled={pending}>
              <span className={styles.optKey}>–</span>
              <span className="muted">I don&apos;t know — skip</span>
            </button>
          </div>
          <div className={styles.qFoot}>
            <span className="small faint">Answers can&apos;t be changed once submitted.</span>
            <button type="button" className="btn btn-primary" disabled={choice === null || pending} onClick={() => choice !== null && submit(choice)}>
              {done + 1 >= total ? "Submit final answer" : "Next question"}
            </button>
          </div>
        </div>
      ) : (
        <div className={`card ${styles.qCard}`}>Submitting your answers…</div>
      )}
    </div>
  );
}
