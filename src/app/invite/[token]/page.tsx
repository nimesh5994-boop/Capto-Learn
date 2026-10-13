import { AuthShell } from "@/components/AuthShell";
import Link from "next/link";
import { and, eq, gt, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { invitations, organizations } from "@/lib/db/schema";
import { hashToken } from "@/lib/tokens";
import { acceptInvitation } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { CaptoLogo } from "@/components/CaptoLogo";
import styles from "../../auth.module.css";

export const metadata = { title: "Join your team", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const db = await getDb();
  const [invite] = await db
    .select({ email: invitations.email, firm: organizations.name })
    .from(invitations)
    .innerJoin(organizations, eq(organizations.id, invitations.organizationId))
    .where(and(eq(invitations.tokenHash, hashToken(token)), isNull(invitations.acceptedAt), isNull(invitations.revokedAt), gt(invitations.expiresAt, new Date())));

  return (
    <AuthShell>
      <div className={`card card-pad ${styles.card}`}>
        <div className={styles.head}>
          <CaptoLogo size="lg" />
          {invite ? (
            <>
              <h1>Join {invite.firm}</h1>
              <p className="muted">
                Set up your account for <strong>{invite.email}</strong>.
              </p>
            </>
          ) : (
            <>
              <h1>This invitation isn&apos;t valid</h1>
              <p className="muted">It may have expired, been revoked, or already been used. Ask your firm to send a new one.</p>
            </>
          )}
        </div>
        {invite ? (
          <AuthForm
            action={acceptInvitation}
            submitLabel="Create my account"
            hidden={{ token }}
            fields={[
              { name: "name", label: "Your name", autoComplete: "name" },
              { name: "password", label: "Choose a password (10+ characters)", type: "password", autoComplete: "new-password" },
            ]}
          />
        ) : (
          <Link href="/login" className="btn btn-primary">
            Go to sign in
          </Link>
        )}
      </div>
    </AuthShell>
  );
}
