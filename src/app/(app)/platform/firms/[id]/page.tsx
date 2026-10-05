import Link from "next/link";
import { notFound } from "next/navigation";
import { and, asc, desc, eq, gt, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { auditLog, invitations, lessonProgress, organizations, users } from "@/lib/db/schema";
import { requirePlatform } from "@/lib/auth/dal";
import { usage } from "@/lib/entitlements";
import { FEATURE_LABELS, PLANS, PLAN_KEYS, accountState, orgHasFeature, orgLimits, planOf, trialDaysLeft, hasFeature, type Feature } from "@/lib/plans";
import { BUILT_IN_ROLES, BUILT_IN_ROLE_KEYS, isBuiltInRole } from "@/lib/rbac";
import { date, dateTime, money } from "@/lib/format";
import { FirmControls } from "../../FirmControls";
import { BillingForm, FeatureToggle, LimitsForm, PracticeUsers, RenameForm } from "./PracticeControls";
import styles from "./practice.module.css";

export const metadata = { title: "Practice controls" };

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "billing", label: "Billing & plan" },
  { key: "users", label: "Users" },
  { key: "features", label: "Features & limits" },
  { key: "activity", label: "Activity" },
  { key: "status", label: "Status" },
] as const;

export default async function PracticePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { id } = await params;
  const { tab: rawTab } = await searchParams;
  const tab = TABS.find((t) => t.key === rawTab)?.key ?? "overview";
  const ctx = await requirePlatform("platform.firms.view");
  const db = await getDb();
  const [org] = await db.select().from(organizations).where(eq(organizations.id, id));
  if (!org) notFound();

  const internal = org.kind === "internal";
  const plan = planOf(org.plan);
  const limits = orgLimits(org);
  const state = internal ? "active" : accountState(org);
  const can = ctx.platformCan;

  const [use, members, pendingInvites, [stats], activity] = await Promise.all([
    usage(db, org),
    db.select().from(users).where(eq(users.organizationId, id)).orderBy(asc(users.name)),
    db
      .select()
      .from(invitations)
      .where(and(eq(invitations.organizationId, id), isNull(invitations.acceptedAt), isNull(invitations.revokedAt), gt(invitations.expiresAt, new Date())))
      .orderBy(desc(invitations.createdAt)),
    db
      .select({
        completed: sql<number>`count(*) filter (where ${lessonProgress.status} = 'completed')::int`,
        started: sql<number>`count(*)::int`,
        learners: sql<number>`count(distinct ${lessonProgress.userId})::int`,
        research: sql<number>`(select count(*)::int from research_queries r where r.organization_id = ${id})`,
      })
      .from(lessonProgress)
      .where(eq(lessonProgress.organizationId, id)),
    db.select().from(auditLog).where(eq(auditLog.organizationId, id)).orderBy(desc(auditLog.createdAt)).limit(tab === "activity" ? 300 : 8),
  ]);
  const lastLogin = members.reduce<Date | null>((d, m) => (m.lastLoginAt && (!d || m.lastLoginAt > d) ? m.lastLoginAt : d), null);
  const owner = members.find((m) => m.role === "owner");
  const listPrice = plan.monthlyPrice;
  const effectivePrice = org.customMonthlyPrice ?? listPrice;
  const pct = (n: number, max: number | null) => (max ? Math.min(100, Math.round((n / max) * 100)) : 0);

  return (
    <div style={{ maxWidth: 1120 }}>
      <Link href="/platform" className="small">
        ← Platform admin
      </Link>
      <div className="page-head" style={{ marginTop: 6 }}>
        <div>
          <h1>{org.name}</h1>
          <p className="muted">
            {internal ? "Internal Capto workspace" : `${plan.label} plan`} · owner {owner?.email ?? "—"} · created {date(org.createdAt)}{" "}
            {state === "suspended" ? (
              <span className="pill pill-declined">Suspended</span>
            ) : state === "trial_expired" ? (
              <span className="pill pill-viewed">Trial ended</span>
            ) : state === "trial" ? (
              <span className="pill pill-sent">Trial · {trialDaysLeft(org.trialEndsAt)} days left</span>
            ) : (
              <span className="pill pill-accepted">Active</span>
            )}
          </p>
        </div>
      </div>

      <nav className={styles.tabs}>
        {TABS.map((t) => (
          <Link key={t.key} href={`/platform/firms/${id}?tab=${t.key}`} className={`${styles.tab} ${t.key === tab ? styles.tabActive : ""}`}>
            {t.label}
          </Link>
        ))}
      </nav>

      {tab === "overview" && (
        <div className="stack" style={{ gap: 18 }}>
          <div className={styles.stats}>
            <Meter label="Active users" value={use.activeUsers} extra={use.pendingInvites ? `+${use.pendingInvites} invited` : undefined} max={limits.maxUsers} pct={pct(use.activeUsers + use.pendingInvites, limits.maxUsers)} />
            <Meter label="Ask Capto questions this month" value={use.researchThisMonth} max={limits.maxResearchPerMonth} pct={pct(use.researchThisMonth, limits.maxResearchPerMonth)} />
            <Stat label="Lessons completed" value={stats.completed} sub={`${stats.started} started`} />
            <Stat label="Active learners" value={stats.learners} />
            <Stat label="Ask Capto (all time)" value={stats.research} />
            <Stat label="Price" value={internal ? "—" : effectivePrice === null ? "Trial" : `${money(effectivePrice)}/mo`} sub={org.customMonthlyPrice !== null ? `agreed · list ${money(listPrice)}` : undefined} />
            <Stat label="Last sign-in" value={lastLogin ? dateTime(lastLogin) : "Never"} />
          </div>
          <section className="card card-pad">
            <h2 style={{ marginBottom: 10 }}>Features</h2>
            <div className="row wrap" style={{ gap: 6 }}>
              {(Object.keys(FEATURE_LABELS) as Feature[]).map((f) => (
                <span key={f} className={`pill ${orgHasFeature(org, f) ? "pill-accepted" : ""}`}>
                  {orgHasFeature(org, f) ? "✓" : "—"} {FEATURE_LABELS[f]}
                </span>
              ))}
            </div>
          </section>
          <section className="card">
            <div className="card-pad row between" style={{ paddingBottom: 8 }}>
              <h2>Recent activity</h2>
              <Link href={`/platform/firms/${id}?tab=activity`} className="small">
                View all
              </Link>
            </div>
            <ActivityTable rows={activity} />
          </section>
        </div>
      )}

      {tab === "billing" && (
        <div className="stack" style={{ gap: 18 }}>
          {internal ? (
            <div className="alert alert-info">This is the internal Capto workspace — it&apos;s never billed and always has every feature.</div>
          ) : (
            <>
              <section className="card card-pad stack">
                <h2>Plan</h2>
                <p className="small muted">
                  {plan.label}
                  {org.plan === "trial" && org.trialEndsAt ? ` — trial ends ${date(org.trialEndsAt)}` : ""}. List price {money(listPrice)}/month.
                </p>
                {can("platform.firms.plan") ? <FirmControls orgId={id} plan={org.plan} suspended={org.status === "suspended"} canPlan canSuspend={false} /> : <p className="small faint">Your platform role can&apos;t change plans.</p>}
              </section>
              <section className="card card-pad stack">
                <h2>Billing details</h2>
                <BillingForm
                  orgId={id}
                  disabled={!can("platform.firms.plan")}
                  initial={{ customMonthlyPrice: org.customMonthlyPrice === null ? "" : String(org.customMonthlyPrice), billingEmail: org.billingEmail ?? "", platformNotes: org.platformNotes ?? "" }}
                  listPrice={listPrice}
                />
              </section>
              <section className="card">
                <div className="card-pad" style={{ paddingBottom: 8 }}>
                  <h2>Plan & price history</h2>
                </div>
                <ActivityTable rows={activity.filter((a) => a.action.startsWith("billing.") || a.action === "firm.created")} empty="No plan changes yet." />
              </section>
            </>
          )}
        </div>
      )}

      {tab === "users" && (
        <PracticeUsers
          orgId={id}
          canManage={can("platform.firms.users")}
          meId={ctx.user.id}
          roleOptions={BUILT_IN_ROLE_KEYS.map((k) => ({ value: k, label: BUILT_IN_ROLES[k].label }))}
          seats={limits.maxUsers === null ? "Unlimited seats" : `${use.activeUsers + use.pendingInvites} of ${limits.maxUsers} seats used`}
          members={members.map((m) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            role: m.role,
            roleLabel: m.customRoleId ? "Custom role" : isBuiltInRole(m.role) ? BUILT_IN_ROLES[m.role].label : m.role,
            active: m.status === "active",
            lastLogin: m.lastLoginAt ? dateTime(m.lastLoginAt) : "Never",
            platformRole: m.platformRole,
          }))}
          invites={pendingInvites.map((i) => ({ id: i.id, email: i.email, roleLabel: isBuiltInRole(i.role) ? BUILT_IN_ROLES[i.role].label : i.role, expires: dateTime(i.expiresAt) }))}
        />
      )}

      {tab === "features" && (
        <div className="stack" style={{ gap: 18 }}>
          {internal && <div className="alert alert-info">The internal Capto workspace always has every feature and no limits.</div>}
          <section className="card">
            <div className="card-pad" style={{ paddingBottom: 8 }}>
              <h2>Features</h2>
              <p className="small muted">Switch a feature on or off for this practice regardless of its plan — e.g. a trial of Capto Sign, or AI capture for a pilot.</p>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{plan.label} plan</th>
                  <th>This practice</th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(FEATURE_LABELS) as Feature[]).map((f) => {
                  const override = org.featureOverrides?.[f];
                  const mode = typeof override === "boolean" ? (override ? "on" : "off") : "plan";
                  return (
                    <tr key={f}>
                      <td>{FEATURE_LABELS[f]}</td>
                      <td className="small muted">{hasFeature(org.plan, f) ? "Included" : "Not included"}</td>
                      <td>
                        <FeatureToggle orgId={id} feature={f} mode={mode} disabled={internal || !can("platform.firms.configure")} effective={orgHasFeature(org, f)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section className="card card-pad stack">
            <h2>Limits</h2>
            <LimitsForm
              orgId={id}
              disabled={internal || !can("platform.firms.configure")}
              planLimits={{ maxUsers: plan.maxUsers, maxResearchPerMonth: plan.maxResearchPerMonth }}
              initial={{
                maxUsers: org.limitOverrides?.maxUsers === undefined ? "" : org.limitOverrides.maxUsers === null ? "unlimited" : String(org.limitOverrides.maxUsers),
                maxResearchPerMonth:
                  org.limitOverrides?.maxResearchPerMonth === undefined ? "" : org.limitOverrides.maxResearchPerMonth === null ? "unlimited" : String(org.limitOverrides.maxResearchPerMonth),
              }}
            />
          </section>
        </div>
      )}

      {tab === "activity" && (
        <section className="card">
          <ActivityTable rows={activity} empty="Nothing recorded yet." />
        </section>
      )}

      {tab === "status" && (
        <div className="stack" style={{ gap: 18 }}>
          <section className="card card-pad stack">
            <h2>Practice name</h2>
            <RenameForm orgId={id} name={org.name} disabled={!can("platform.firms.configure")} />
          </section>
          <section className="card card-pad stack">
            <h2>Account status</h2>
            {internal ? (
              <p className="small muted">The internal Capto workspace can&apos;t be suspended.</p>
            ) : (
              <>
                <p className="small muted">
                  {org.status === "suspended" ? `Suspended${org.suspendedReason ? ` — ${org.suspendedReason}` : ""}. Users can view their data but can't take lessons or use Ask Capto.` : "Active. Suspending makes the practice read-only straight away; nothing is deleted."}
                </p>
                {can("platform.firms.suspend") ? <FirmControls orgId={id} plan={org.plan} suspended={org.status === "suspended"} canPlan={false} canSuspend /> : <p className="small faint">Your platform role can&apos;t suspend practices.</p>}
              </>
            )}
          </section>
          <section className="card card-pad">
            <h2 style={{ marginBottom: 6 }}>Plans at a glance</h2>
            <p className="small muted">{PLAN_KEYS.map((k) => `${PLANS[k].label}: ${PLANS[k].monthlyPrice === null ? "free" : `${money(PLANS[k].monthlyPrice)}/mo`}`).join(" · ")}</p>
          </section>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="card card-pad">
      <div className="small muted">{label}</div>
      <div className={styles.statValue}>{value}</div>
      {sub && <div className="small faint">{sub}</div>}
    </div>
  );
}

function Meter({ label, value, max, pct, extra }: { label: string; value: number; max: number | null; pct: number; extra?: string }) {
  return (
    <div className="card card-pad">
      <div className="small muted">{label}</div>
      <div className={styles.statValue}>
        {value}
        <span className="faint small"> / {max === null ? "∞" : max}</span>
      </div>
      {max !== null && (
        <div className={styles.meter} role="img" aria-label={`${pct}% used`}>
          <div style={{ width: `${pct}%`, background: pct >= 90 ? "var(--danger)" : pct >= 70 ? "var(--warning)" : "var(--success)" }} />
        </div>
      )}
      {extra && <div className="small faint">{extra}</div>}
    </div>
  );
}

function ActivityTable({ rows, empty = "Nothing recorded yet." }: { rows: (typeof auditLog.$inferSelect)[]; empty?: string }) {
  if (!rows.length) return <div className="empty" style={{ padding: 24 }}>{empty}</div>;
  return (
    <table className="table">
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td className="small num" style={{ whiteSpace: "nowrap", width: 170 }}>
              {dateTime(r.createdAt)}
            </td>
            <td className="small" style={{ width: 200 }}>
              {r.actorName ?? "System"}
            </td>
            <td>
              {r.summary}
              <div className="small faint">{r.action}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
