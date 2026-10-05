import { and, desc, gt, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { firmInvitations } from "@/lib/db/schema";
import { requirePlatform } from "@/lib/auth/dal";
import { planOf, PLAN_KEYS, PLANS } from "@/lib/plans";
import { dateTime } from "@/lib/format";
import { InviteFirmForm, RevokeFirmInvite } from "../PlatformForms";

export const metadata = { title: "Firm invitations" };

export default async function InvitationsPage() {
  const ctx = await requirePlatform("platform.firms.invite");
  const db = await getDb();
  const pendingInvites = await db
    .select()
    .from(firmInvitations)
    .where(and(isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt), gt(firmInvitations.expiresAt, new Date())))
    .orderBy(desc(firmInvitations.createdAt));

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
            <p className="small muted">Signup is invitation-only. The firm&apos;s owner gets a single-use link, valid for 14 days, and signs up on the plan you choose.</p>
          </div>
          <InviteFirmForm plans={PLAN_KEYS.map((k) => ({ value: k, label: PLANS[k].label }))} />
          {pendingInvites.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Pending invitation</th>
                  <th>Plan</th>
                  <th>Invited by</th>
                  <th>Expires</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {pendingInvites.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <div style={{ fontWeight: 560 }}>{i.firmName}</div>
                      <div className="small muted">{i.email}</div>
                    </td>
                    <td>{planOf(i.plan).label}</td>
                    <td className="small muted">{i.invitedByEmail}</td>
                    <td className="small muted">{dateTime(i.expiresAt)}</td>
                    <td className="right">
                      <RevokeFirmInvite id={i.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

    </div>
  );
}
