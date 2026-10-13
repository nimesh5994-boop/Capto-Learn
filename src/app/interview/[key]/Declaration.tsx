"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { startInterview } from "@/app/actions/interviews";
import styles from "../interview.module.css";

/** The no-AI declaration: every statement ticked and the candidate's name typed as a signature. */
export function Declaration({ code, statements, candidateName }: { code: string; statements: string[]; candidateName: string }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(statements.map(() => false));
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const ready = agreed.every(Boolean) && name.trim().length >= 3;

  const begin = () =>
    start(async () => {
      setError(null);
      // Full screen must be requested from the click itself; the test asks again if it's refused or left.
      try {
        await document.documentElement.requestFullscreen?.();
      } catch {}
      const r = await startInterview(code, name, agreed);
      if (!r.ok) {
        setError(r.error);
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
        } catch {}
        return;
      }
      router.refresh();
    });

  return (
    <section className={styles.declaration}>
      <h2>Declaration</h2>
      <p className="small muted" style={{ margin: 0 }}>
        This assessment checks what you know without help. The test runs in full screen, copy and paste are switched off, and leaving the page is recorded and shared with the firm along
        with your answers.
      </p>
      <div className={styles.statements}>
        {statements.map((s, i) => (
          <label key={i} className={styles.statement}>
            <input type="checkbox" checked={agreed[i]} onChange={(e) => setAgreed((a) => a.map((v, k) => (k === i ? e.target.checked : v)))} />
            <span>{s}</span>
          </label>
        ))}
      </div>
      <label className={styles.sign}>
        <span>Type your full name to sign</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={candidateName} autoComplete="name" maxLength={120} />
      </label>
      {error && <div className="alert alert-error">{error}</div>}
      <button type="button" className="btn btn-primary" disabled={!ready || pending} onClick={begin}>
        {pending ? "Starting…" : "I agree — start the assessment"}
      </button>
    </section>
  );
}
