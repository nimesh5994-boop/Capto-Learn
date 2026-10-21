import { and, asc, desc, eq, gte, isNotNull, isNull, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { invitations, organizations, users } from "@/lib/db/schema";
import { isPlatformAdminEmail, requireUser } from "@/lib/auth/dal";
import { PLATFORM_ROLES, PLATFORM_ROLE_KEYS, isPlatformRole } from "@/lib/rbac";
import { InvitationActions, InvitePlatformMemberForm, PlatformRoleSelect } from "../PlatformForms";
import { date } from "@/lib/format";
import { daysAgo, latestEmailByRelated } from "@/lib/emailLog";
import { invitationStatus } from "@/lib/emailTracking";

export const metadata = { title: "Platform team" };

export default async function PlatformTeamPage() {
  const ctx = await requireUser();
  if (!ctx.platformCan("platform.team.manage")) redirect("/?denied=1");
  const db = await getDb();
  const internalTeam = await db
    .select({ id: users.id, name: users.name, email: users.email, platformRole: users.platformRole, status: users.status })
    .from(users)
    .innerJoin(organizations, eq(organizations.id, users.organizationId))
    .where(eq(organizations.kind, "internal"))
    .orderBy(asc(users.name));
  const pending = await db
    .select({
      id: invitations.id,
      email: invitations.email,
      platformRole: invitations.platformRole,
      expiresAt: invitations.expiresAt,
      createdAt: invitations.createdAt,
      acceptedAt: invitations.acceptedAt,
      revokedAt: invitations.revokedAt,
    })
    .from(invitations)
    .innerJoin(organizations, eq(organizations.id, invitations.organizationId))
    // Open (pending or expired) invitations, plus those accepted or revoked in the last 30 days.
    .where(
      and(
        eq(organizations.kind, "internal"),
        isNotNull(invitations.platformRole),
        or(
          and(isNull(invitations.acceptedAt), isNull(invitations.revokedAt)),
          gte(invitations.acceptedAt, daysAgo(30)),
          gte(invitations.revokedAt, daysAgo(30))
        )
      )
    )
    .orderBy(desc(invitations.createdAt))
    .limit(100);
  const inviteEmails = await latestEmailByRelated(pending.map((p) => p.id));
  const now = new Date();
  const inviteRoles = PLATFORM_ROLE_KEYS.filter((k) => k !== "super_admin").map((k) => ({ value: k, label: PLATFORM_ROLES[k].label, description: PLATFORM_ROLES[k].description }));

  return (
    <div className="stack" style={{ gap: 22, maxWidth: 900 }}>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Platform admin</div>
          <h1>Platform team</h1>
          <p className="muted">Capto staff and what each can do across every practice.</p>
        </div>
      </div>
      <section className="card card-pad stack" style={{ gap: 12 }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>Invite a reviewer or team member</h2>
          <p className="small muted" style={{ margin: 0 }}>
            They join the internal Capto workspace with this role as soon as they accept. A Content reviewer can open the Review centre, sign off lessons (after adding their qualifications in My account) and grade the accuracy benchmark — nothing else.
          </p>
        </div>
        <InvitePlatformMemberForm roles={inviteRoles} />
        {pending.length > 0 && (
          <div className="stack" style={{ gap: 6 }}>
            <div className="small muted">Invitations — open, plus accepted or revoked in the last 30 days. Resend creates a new link (the old one stops working) valid for 7 days.</div>
            <table className="table">
              <tbody>
                {pending.map((p) => {
                  const st = invitationStatus(p, inviteEmails.get(p.id) ?? null, now);
                  return (
                    <tr key={p.id}>
                      <td className="small" style={{ overflowWrap: "anywhere" }}>
                        {p.email}
                        <div className="faint">{p.platformRole && isPlatformRole(p.platformRole) ? PLATFORM_ROLES[p.platformRole].label : p.platformRole}</div>
                      </td>
                      <td>
                        <span className={`pill ${st.pill}`}>{st.label}</span>
                      </td>
                      <td className="small muted">
                        Sent {date(p.createdAt)}
                        <div className="faint">
                          {st.state === "accepted" ? `Accepted ${date(p.acceptedAt)}` : st.state === "revoked" ? `Revoked ${date(p.revokedAt)}` : `${st.state === "expired" ? "Expired" : "Expires"} ${date(p.expiresAt)}`}
                        </div>
                      </td>
                      <td className="right">
                        {(st.canResend || st.canRevoke) && <InvitationActions id={p.id} type="platform" canResend={st.canResend} canRevoke={st.canRevoke} />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="card">
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <h2>Platform team</h2>
          <p className="small muted">
            People in the internal Capto workspace and their platform role. Invite new people above, or change an existing member&apos;s role here. Emails in PLATFORM_ADMIN_EMAILS are
            always Super admin.
          </p>
        </div>
        <table className="table">
          <tbody>
            {internalTeam.map((m) => {
              const locked = isPlatformAdminEmail(m.email);
              const current = locked ? "super_admin" : isPlatformRole(m.platformRole) ? m.platformRole : "none";
              return (
                <tr key={m.id}>
                  <td>
                    <div style={{ fontWeight: 560 }}>{m.name}</div>
                    <div className="small muted">{m.email}</div>
                  </td>
                  <td style={{ width: 280 }}>
                    {ctx.platformCan("platform.team.manage") && !locked && m.id !== ctx.user.id ? (
                      <PlatformRoleSelect userId={m.id} value={current} options={[{ value: "none", label: "No platform access" }, ...PLATFORM_ROLE_KEYS.map((k) => ({ value: k, label: PLATFORM_ROLES[k].label }))]} />
                    ) : (
                      <span>
                        {current === "none" ? "No platform access" : PLATFORM_ROLES[current].label}
                        {locked && <span className="small faint"> · permanent</span>}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

    </div>
  );
}
