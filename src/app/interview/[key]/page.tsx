import { eq } from "drizzle-orm";
import { CheckCircle2, Clock, ListChecks, LockKeyhole, ShieldAlert } from "lucide-react";
import { getDb } from "@/lib/db/client";
import { organizations } from "@/lib/db/schema";
import { getTrack } from "@/content";
import { DECLARATION, DIFFICULTIES } from "@/lib/interviews/rules";
import { candidateView, findByKey, nextQuestion } from "@/lib/interviews/store";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { Declaration } from "./Declaration";
import { InterviewRunner } from "./InterviewRunner";
import styles from "../interview.module.css";

export const metadata = { title: "Assessment", robots: { index: false } };
export const dynamic = "force-dynamic";

const MESSAGES = {
  invalid: { title: "This link or code isn't valid", text: "Check you've typed the code exactly as it was sent to you, or ask the firm for a new link." },
  expired: { title: "This assessment has expired", text: "The time to take it has passed. Ask the firm that sent it if you'd still like to sit it." },
  revoked: { title: "This assessment has been withdrawn", text: "The firm that sent it has withdrawn it. Contact them if you think this is a mistake." },
  "other-device": { title: "This assessment is in progress on another device", text: "It can only be taken on the device where it was started. Contact the firm that sent it if you need help." },
} as const;

export default async function InterviewPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const row = await findByKey(decodeURIComponent(key));
  const view = await candidateView(row);
  const db = await getDb();
  const org = row ? (await db.select({ name: organizations.name, logo: organizations.logoDataUrl, colour: organizations.brandColor }).from(organizations).where(eq(organizations.id, row.organizationId)))[0] : null;

  const frame = (body: React.ReactNode, wide = false) => (
    <div className={styles.page}>
      <header className={styles.top}>
        {org?.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={org.logo} alt={org.name} className={styles.logo} />
        ) : (
          <strong className={styles.firm}>{org?.name ?? "Capto Learn"}</strong>
        )}
        <span className={styles.powered}>Assessment by Capto Learn</span>
      </header>
      <main className={`${styles.main} ${wide ? styles.wide : ""}`}>{body}</main>
    </div>
  );

  if (!row || view === "invalid" || view === "expired" || view === "revoked" || view === "other-device") {
    const m = MESSAGES[view === "intro" || view === "test" || view === "done" ? "invalid" : view];
    return frame(
      <div className={`card ${styles.panel} ${styles.center}`}>
        <ShieldAlert size={30} className={styles.iconMuted} />
        <h1>{m.title}</h1>
        <p className="muted">{m.text}</p>
      </div>
    );
  }

  if (view === "done")
    return frame(
      <div className={`card ${styles.panel} ${styles.center}`}>
        <CheckCircle2 size={34} className={styles.iconOk} />
        <h1>Thank you, {row.declaration?.name.split(" ")[0] ?? row.candidateName.split(" ")[0]}</h1>
        <p className="muted">Your answers have been submitted to {org?.name ?? "the firm"}. They&apos;ll be in touch about the next steps. You can close this window now.</p>
      </div>
    );

  const subjects = row.tracks.map((t) => getTrack(t)?.title ?? t);

  if (view === "intro")
    return frame(
      <div className={`card ${styles.panel}`}>
        <div className={styles.kicker}>Knowledge assessment{row.role ? ` · ${row.role}` : ""}</div>
        <h1>Hello {row.candidateName.split(" ")[0]}</h1>
        <p className="muted">
          {org?.name ?? "The firm"}{" "}has asked you to complete a short technical assessment. Please read the rules, confirm the declaration and start when you&apos;re ready — once started, the timer
          can&apos;t be paused.
        </p>
        <div className={styles.facts}>
          <span>
            <ListChecks size={16} /> {row.questionCount} multiple-choice questions
          </span>
          <span>
            <Clock size={16} /> {row.minutes} minutes
          </span>
          <span>
            <LockKeyhole size={16} /> One attempt, on this device
          </span>
        </div>
        <p className="small muted" style={{ margin: 0 }}>
          Subjects: {subjects.join(", ")} · Level: {DIFFICULTIES[row.difficulty].label}
        </p>
        <Declaration code={key} statements={DECLARATION} candidateName={row.candidateName} />
      </div>
    );

  // view === "test"
  const q = nextQuestion(row);
  return frame(
    <InterviewRunner
      testKey={key}
      total={row.questions.length}
      answered={Object.keys(row.answers).length}
      deadline={row.deadlineAt!.toISOString()}
      watermark={`${row.declaration?.name ?? row.candidateName} · ${org?.name ?? ""}`}
      question={q ? { key: q.key, subject: getTrack(q.track)?.title ?? q.track, promptHtml: renderMarkdown(q.prompt), optionsHtml: q.options.map((o) => renderInline(o)) } : null}
    />,
    true
  );
}
