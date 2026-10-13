"use client";

import { useState, useTransition } from "react";
import { Check, Copy } from "lucide-react";
import { createInterview } from "@/app/actions/interviews";
import styles from "./interviews.module.css";

type Area = { key: string; label: string; tracks: string[] };

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-sm"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        });
      }}
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Copied" : label}
    </button>
  );
}

/** Set up an interview test in a few clicks, then copy the link, code and a ready-made message for the candidate. */
export function NewInterview({ areas, courses, firmName }: { areas: Area[]; courses: { slug: string; title: string }[]; firmName: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [picked, setPicked] = useState<string[]>(areas[0]?.tracks ?? []);
  const [difficulty, setDifficulty] = useState<"trainee" | "experienced" | "senior">("experienced");
  const [count, setCount] = useState(20);
  const [minutes, setMinutes] = useState(30);
  const [days, setDays] = useState(7);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ link: string; code: string; who: string } | null>(null);
  const [pending, start] = useTransition();

  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  const submit = () =>
    start(async () => {
      setError(null);
      const r = await createInterview({ candidateName: name, candidateEmail: email, role, tracks: picked, difficulty, questionCount: count, minutes, validDays: days });
      if (!r.ok) return setError(r.error);
      setCreated({ link: `${window.location.origin}/interview/${r.data.token}`, code: r.data.code, who: name });
      setName("");
      setEmail("");
      setRole("");
    });

  if (created) {
    const message = `Hello ${created.who.split(" ")[0]},\n\nAs part of your application to ${firmName}, please complete a short online technical assessment (${count} questions, ${minutes} minutes).\n\nOpen this link when you're ready: ${created.link}\nOr go to ${window.location.origin}/interview and enter the code ${created.code}.\n\nIt can be taken once, on one device, within the next ${days} day${days === 1 ? "" : "s"}. It runs in full screen and must be done without AI tools, search engines or anyone else's help — you'll be asked to confirm this before you start.\n\nThank you.`;
    return (
      <div className={styles.created}>
        <h3>Test ready for {created.who}</h3>
        <p className="small muted" style={{ margin: 0 }}>
          Send the candidate the link, or the code to type in at {typeof window === "undefined" ? "" : window.location.host}/interview. Save the link now — for security it isn&apos;t shown again (you can make a new one from the list).
        </p>
        <div className={styles.creds}>
          <div>
            <span>Link</span>
            <code>{created.link}</code>
            <CopyButton text={created.link} label="Copy link" />
          </div>
          <div>
            <span>Code</span>
            <code className={styles.code}>{created.code}</code>
            <CopyButton text={created.code} label="Copy code" />
          </div>
        </div>
        <details>
          <summary className="small" style={{ cursor: "pointer", fontWeight: 600 }}>
            Ready-to-send message
          </summary>
          <pre className={styles.message}>{message}</pre>
          <CopyButton text={message} label="Copy message" />
        </details>
        <button type="button" className="btn btn-sm" onClick={() => setCreated(null)}>
          Set up another test
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="grid-2">
        <label>
          Candidate&apos;s name
          <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} placeholder="e.g. Priya Shah" />
        </label>
        <label>
          <span>
            Role applied for <span className="faint">(optional)</span>
          </span>
          <input value={role} onChange={(e) => setRole(e.target.value)} maxLength={120} placeholder="e.g. Accounts semi-senior" />
        </label>
      </div>
      <label>
        <span>
          Candidate&apos;s email <span className="faint">(optional, for your records)</span>
        </span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} />
      </label>

      <div>
        <div className={styles.fieldLabel}>What to test</div>
        <div className={styles.areaRow}>
          {areas.map((a) => {
            const on = a.tracks.length === picked.length && a.tracks.every((t) => picked.includes(t));
            return (
              <button key={a.key} type="button" className={`${styles.chip} ${on ? styles.chipOn : ""}`} onClick={() => setPicked(a.tracks)}>
                {a.label}
              </button>
            );
          })}
        </div>
        <details className={styles.custom}>
          <summary className="small">Choose individual subjects ({picked.length} selected)</summary>
          <div className={styles.subjects}>
            {courses.map((c) => (
              <label key={c.slug} className={styles.subject}>
                <input type="checkbox" checked={picked.includes(c.slug)} onChange={() => toggle(c.slug)} />
                {c.title}
              </label>
            ))}
          </div>
        </details>
      </div>

      <div className={styles.numbers}>
        <label>
          Level
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}>
            <option value="trainee">Trainee / junior</option>
            <option value="experienced">Experienced</option>
            <option value="senior">Senior / manager</option>
          </select>
        </label>
        <label>
          Questions
          <input type="number" min={5} max={60} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
        <label>
          Time limit (minutes)
          <input type="number" min={5} max={180} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
        </label>
        <label>
          Link valid for (days)
          <input type="number" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </label>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      <div>
        <button className="btn btn-primary" disabled={pending || !name.trim() || !picked.length}>
          {pending ? "Creating…" : "Create test link"}
        </button>
      </div>
    </form>
  );
}
