import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";
import styles from "./interview.module.css";

export const metadata = { title: "Start an assessment", robots: { index: false } };

/** Where candidates type the short code they were sent (e.g. ABCD-2345). */
export default async function InterviewCodePage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  const clean = (code ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length === 8) redirect(`/interview/${clean.slice(0, 4)}-${clean.slice(4)}`);
  return (
    <div className={styles.page}>
      <header className={styles.top}>
        <strong className={styles.firm}>Capto Learn</strong>
        <span className={styles.powered}>Candidate assessments</span>
      </header>
      <main className={styles.main}>
        <form className={`card ${styles.panel} ${styles.center}`} action="/interview" method="get">
          <KeyRound size={30} className={styles.iconMuted} />
          <h1>Start your assessment</h1>
          <p className="muted">Enter the code from the firm that invited you.</p>
          <input name="code" defaultValue={code ?? ""} placeholder="ABCD-2345" aria-label="Assessment code" className={styles.codeInput} autoComplete="off" autoCapitalize="characters" maxLength={9} required />
          {code && <div className="alert alert-error">That code isn&apos;t complete — it has 8 letters and numbers.</div>}
          <button className="btn btn-primary">Continue</button>
        </form>
      </main>
    </div>
  );
}
