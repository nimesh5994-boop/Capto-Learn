import { AuthShell } from "@/components/AuthShell";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { CaptoLogo } from "@/components/CaptoLogo";
import styles from "../auth.module.css";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell>
      <div className={`card card-pad ${styles.card}`}>
        <div className={styles.head}>
          <CaptoLogo size="lg" />
          <h1>Sign in to Capto Learn</h1>
          <p className="muted">Welcome back — sign in to continue.</p>
        </div>
        <AuthForm
          action={login}
          submitLabel="Sign in"
          fields={[
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
          ]}
        />
        <p className={styles.foot}>
          <Link href="/forgot-password">Forgot your password?</Link>
        </p>
        <p className={styles.foot} style={{ marginTop: 6 }}>
          Capto Learn is invitation-only. Got an invitation? Use the link in your email.
        </p>
      </div>
    </AuthShell>
  );
}
