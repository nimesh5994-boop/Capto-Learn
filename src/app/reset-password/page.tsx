import { AuthShell } from "@/components/AuthShell";
import Link from "next/link";
import { resetPassword } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { CaptoLogo } from "@/components/CaptoLogo";
import styles from "../auth.module.css";

export const metadata = { title: "Choose a new password", robots: { index: false } };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AuthShell>
      <div className={`card card-pad ${styles.card}`}>
        <div className={styles.head}>
          <CaptoLogo size="lg" />
          <h1>Choose a new password</h1>
        </div>
        {token ? (
          <AuthForm action={resetPassword} submitLabel="Save password and sign in" hidden={{ token }} fields={[{ name: "password", label: "New password (10+ characters)", type: "password", autoComplete: "new-password" }]} />
        ) : (
          <p className="muted">
            This link is incomplete. <Link href="/forgot-password">Request a new reset link</Link>.
          </p>
        )}
        <p className={styles.foot}>
          <Link href="/login">Back to sign in</Link>
        </p>
      </div>
    </AuthShell>
  );
}
