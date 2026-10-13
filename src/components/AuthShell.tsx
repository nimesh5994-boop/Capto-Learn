import { BadgeCheck, GraduationCap, MessageSquareQuote } from "lucide-react";
import styles from "@/app/auth.module.css";

/** The shared frame for sign-in, sign-up, invitation and password pages: a brand panel beside the form. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.brandPanel} aria-hidden="false">
        <div className={styles.brandTop}>
          <span className={styles.brandWord}>
            Capto <em>Learn</em>
          </span>
        </div>
        <div className={styles.brandMain}>
          <h2>Training and cited research for UK practice teams.</h2>
          <ul>
            <li>
              <GraduationCap size={18} />
              <span>
                <strong>15 courses, 197 short lessons</strong> — from double entry to R&amp;D relief, with practice questions and a quiz in every lesson.
              </span>
            </li>
            <li>
              <MessageSquareQuote size={18} />
              <span>
                <strong>Ask Capto</strong> — answers from HMRC and GOV.UK guidance, with every quote checked word for word.
              </span>
            </li>
            <li>
              <BadgeCheck size={18} />
              <span>
                <strong>Certificates and CPD records</strong> for every course your team completes.
              </span>
            </li>
          </ul>
        </div>
        <p className={styles.brandFoot}>Contains public sector information licensed under the Open Government Licence v3.0.</p>
      </aside>
      <main className={styles.formSide}>{children}</main>
    </div>
  );
}
