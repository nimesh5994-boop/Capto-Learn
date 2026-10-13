import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { organizations } from "@/lib/db/schema";
import { joinFirm } from "@/app/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";
import { CaptoLogo } from "@/components/CaptoLogo";
import styles from "../../auth.module.css";

export const metadata = { title: "Join your firm", robots: { index: false } };
export const dynamic = "force-dynamic";

/** A firm's join link: staff create their own account (straight in on an approved email domain, otherwise after approval). */
export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const db = await getDb();
  const [org] = await db
    .select({ name: organizations.name, domains: organizations.joinDomains, status: organizations.status })
    .from(organizations)
    .where(and(eq(organizations.joinCode, decodeURIComponent(code).toUpperCase()), eq(organizations.joinEnabled, true)));

  return (
    <AuthShell>
      <div className={`card card-pad ${styles.card}`}>
        <div className={styles.head}>
          <CaptoLogo size="lg" />
          {org && org.status === "active" ? (
            <>
              <h1>Join {org.name}</h1>
              <p className="muted">
                Create your Capto Learn account.{" "}
                {org.domains.length
                  ? `Use your ${org.domains.map((d) => `@${d}`).join(" or ")} work email and you can start straight away; other emails need an admin's approval.`
                  : "An admin at the firm will approve your account before you can sign in."}
              </p>
            </>
          ) : (
            <>
              <h1>This join link isn&apos;t active</h1>
              <p className="muted">It may have been switched off or replaced. Ask someone at your firm for the current link, or for an invitation.</p>
            </>
          )}
        </div>
        {org && org.status === "active" ? (
          <AuthForm
            action={joinFirm}
            submitLabel="Create my account"
            hidden={{ code: decodeURIComponent(code) }}
            fields={[
              { name: "name", label: "Your name", autoComplete: "name" },
              { name: "email", label: "Work email", type: "email", autoComplete: "email" },
              { name: "password", label: "Choose a password (10+ characters)", type: "password", autoComplete: "new-password" },
            ]}
          />
        ) : (
          <Link href="/login" className="btn btn-primary">
            Go to sign in
          </Link>
        )}
        <p className={styles.foot}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </AuthShell>
  );
}
