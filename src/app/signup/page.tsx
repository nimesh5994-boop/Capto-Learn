import Link from "next/link";
import { and, eq, gt, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { firmInvitations } from "@/lib/db/schema";
import { hashToken } from "@/lib/tokens";
import { signup } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { CaptoLogo } from "@/components/CaptoLogo";
import { planOf, TRIAL_DAYS } from "@/lib/plans";
import styles from "../auth.module.css";

export const metadata = { title: "Create account", robots: { index: false } };
export const dynamic = "force-dynamic";

/**
 * Invitation-only signup:
 *   /signup?invite=<token>  — a firm invited from the platform console
 *   /signup?setup=1         — platform admins (PLATFORM_ADMIN_EMAILS) creating the internal Capto workspace;
 *                             the server rejects any other email, so this is not an open door.
 *   /signup                 — closed.
 */
export default async function SignupPage({ searchParams }: { searchParams: Promise<{ invite?: string; setup?: string }> }) {
  const { invite, setup } = await searchParams;

  if (invite) {
    const db = await getDb();
    const [inv] = await db
      .select()
      .from(firmInvitations)
      .where(and(eq(firmInvitations.tokenHash, hashToken(invite)), isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt), gt(firmInvitations.expiresAt, new Date())));
    return (
      <Shell
        title={inv ? `Set up ${inv.firmName}` : "This invitation isn't valid"}
        subtitle={
          inv
            ? inv.plan === "trial"
              ? `You've been invited to Capto Learn with a ${TRIAL_DAYS}-day free trial.`
              : `You've been invited to Capto Learn on the ${planOf(inv.plan).label} plan.`
            : "It may have expired, been revoked, or already been used. Ask Capto for a new invitation."
        }
      >
        {inv ? (
          <AuthForm
            action={signup}
            submitLabel="Create my firm's account"
            hidden={{ invite }}
            fields={[
              { name: "firmName", label: "Firm name", autoComplete: "organization", defaultValue: inv.firmName },
              { name: "name", label: "Your name", autoComplete: "name" },
              { name: "email", label: "Email", type: "email", autoComplete: "email", defaultValue: inv.email, readOnly: true },
              { name: "password", label: "Choose a password (10+ characters)", type: "password", autoComplete: "new-password" },
            ]}
          />
        ) : (
          <Link href="/login" className="btn btn-primary">
            Go to sign in
          </Link>
        )}
      </Shell>
    );
  }

  if (setup === "1") {
    return (
      <Shell title="Capto admin setup" subtitle="For Capto software administrators only. Other emails are refused — firms join by invitation.">
        <AuthForm
          action={signup}
          submitLabel="Create admin workspace"
          fields={[
            { name: "firmName", label: "Workspace name", autoComplete: "organization", defaultValue: "Capto" },
            { name: "name", label: "Your name", autoComplete: "name" },
            { name: "email", label: "Admin email", type: "email", autoComplete: "email" },
            { name: "password", label: "Password (10+ characters)", type: "password", autoComplete: "new-password" },
          ]}
        />
      </Shell>
    );
  }

  return (
    <Shell title="Invitation-only" subtitle="Capto Learn is available by invitation. If you've been invited, open the signup link in your invitation email.">
      <Link href="/login" className="btn btn-primary">
        Sign in
      </Link>
    </Shell>
  );
}

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className={styles.wrap}>
      <div className={`card card-pad ${styles.card}`}>
        <div className={styles.head}>
          <CaptoLogo size="lg" />
          <h1>{title}</h1>
          <p className="muted">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
