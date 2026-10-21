import { and, desc, gte, isNull, or } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { firmInvitations } from "@/lib/db/schema";
import { requirePlatform } from "@/lib/auth/dal";
import { planOf, PLAN_KEYS, PLANS } from "@/lib/plans";
import { dateTime } from "@/lib/format";
import { InvitationActions, InviteFirmForm } from "../PlatformForms";
import { daysAgo, latestEmailByRelated } from "@/lib/emailLog";
import { invitationStatus } from "@/lib/emailTracking";

export const metadata = { title: "Firm invitations" };

export default async function InvitationsPage() {
  const ctx = await requirePlatform("platform.firms.invite");
  const db = await getDb();
  const pendingInvites = await db
    .select()
    .from(firmInvitations)
    // Open (pending or expired) invitations, plus those used or revoked in the last 30 days.
    .where(
      or(
        and(isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt)),
        gte(firmInvitations.acceptedAt, daysAgo(30)),
        gte(firmInvitations.revokedAt, daysAgo(30))
      )
    )
    .orderBy(desc(firmInvitations.createdAt))
    .limit(200);
  const inviteEmails = await latestEmailByRelated(pendingInvites.map((i) => i.id));
  const now = new Date();

  return (
    <div className="stack" style={{ gap: 22, maxWidth: 1040 }}>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Platform admin</div>
          <h1>Firm invitations</h1>
          <p className="muted">Signup is invitation-only — this is how new practices join.</p>
        </div>
      </div>
      {ctx.platformCan("platform.firms.invite") && (
        <section className="card card-pad stack">
          <div>
            <h2>Invite a firm</h2>
            <p className="small muted">
              Signup is invitation-only. The firm&apos;s owner gets a single-use link, valid for 14 days, and signs up on the plan you choose. Resend creates a new link (the old one
              stops working) and another 14 days.
            </p>
          </div>
          <InviteFirmForm plans={PLAN_KEYS.map((k) => ({ value: k, label: PLANS[k].label }))} />
          {pendingInvites.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Invitation</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Invited by</th>
                  <th>Expires</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {pendingInvites.map((i) => {
                  const st = invitationStatus(i, inviteEmails.get(i.id) ?? null, now);
                  return (
                    <tr key={i.id}>
                      <td>
                        <div style={{ fontWeight: 560 }}>{i.firmName}</div>
                        <div className="small muted">{i.email}</div>
                      </td>
                      <td>{planOf(i.plan).label}</td>
                      <td>
                        <span className={`pill ${st.pill}`}>{st.label}</span>
                      </td>
                      <td className="small muted">{i.invitedByEmail}</td>
                      <td className="small muted">
                        {st.state === "accepted" ? `Used ${dateTime(i.acceptedAt)}` : st.state === "revoked" ? `Revoked ${dateTime(i.revokedAt)}` : dateTime(i.expiresAt)}
                      </td>
                      <td className="right">
                        {(st.canResend || st.canRevoke) && <InvitationActions id={i.id} type="firm" canResend={st.canResend} canRevoke={st.canRevoke} />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      )}

    </div>
  );
}
