import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { CaptoLogo } from "@/components/CaptoLogo";
import styles from "../auth.module.css";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <div className={styles.wrap}>
      <div className={`card card-pad ${styles.card}`}>
        <div className={styles.head}>
          <CaptoLogo size="lg" />
          <h1>Reset your password</h1>
          <p className="muted">We&apos;ll email you a link to choose a new one.</p>
        </div>
        <AuthForm action={requestPasswordReset} submitLabel="Send reset link" fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]} />
        <p className={styles.foot}>
          <Link href="/login">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
