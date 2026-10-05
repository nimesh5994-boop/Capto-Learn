import { getDb } from "@/lib/db/client";
import { requirePermission } from "@/lib/auth/dal";
import { usage } from "@/lib/entitlements";
import { FEATURE_LABELS, PLANS, PLAN_KEYS, orgLimits, planOf, trialDaysLeft, type Feature } from "@/lib/plans";
import { date, money } from "@/lib/format";
import styles from "./billing.module.css";

export const metadata = { title: "Plan & billing" };

const ALL_FEATURES = Object.keys(FEATURE_LABELS) as Feature[];

export default async function BillingPage() {
  const ctx = await requirePermission("billing.manage");
  const { org } = ctx;
  const db = await getDb();
  const use = await usage(db, org);
  const plan = planOf(org.plan);
  const limit = (n: number | null) => (n === null ? "Unlimited" : String(n));
  const limits = orgLimits(org);

  return (
    <div style={{ maxWidth: 1080 }}>
      <div className="page-head">
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Practice admin</div>
          <h1>Plan &amp; billing</h1>
          <p className="muted">
            You&apos;re on <strong>{plan.label}</strong>
            {org.plan === "trial" && org.trialEndsAt && (ctx.state === "trial_expired" ? ` — ended ${date(org.trialEndsAt)}` : ` — ${trialDaysLeft(org.trialEndsAt)} days left (ends ${date(org.trialEndsAt)})`)}.
            {org.customMonthlyPrice !== null && ` Your agreed price is ${money(org.customMonthlyPrice)} a month + VAT.`}
          </p>
        </div>
      </div>

      <div className={styles.usage}>
        <div className="card card-pad">
          <div className="small muted">Users</div>
          <div className={styles.usageValue}>
            {use.activeUsers + use.pendingInvites} <span className="faint">/ {limit(limits.maxUsers)}</span>
          </div>
          <div className="small faint">{use.pendingInvites ? `includes ${use.pendingInvites} pending invite${use.pendingInvites > 1 ? "s" : ""}` : "active seats"}</div>
        </div>
        <div className="card card-pad">
          <div className="small muted">Ask Capto questions this month</div>
          <div className={styles.usageValue}>
            {use.researchThisMonth} <span className="faint">/ {limit(limits.maxResearchPerMonth)}</span>
          </div>
          <div className="small faint">resets on the 1st</div>
        </div>
      </div>

      <div className={styles.plans}>
        {PLAN_KEYS.filter((k) => k !== "trial").map((k) => {
          const p = PLANS[k];
          const current = org.plan === k;
          return (
            <div key={k} className={`card card-pad ${styles.plan} ${current ? styles.current : ""}`}>
              <div className="row between">
                <h2>{p.label}</h2>
                {current && <span className="pill pill-accepted">Current plan</span>}
              </div>
              <div className={styles.price}>
                {money(p.monthlyPrice)}
                <span className="small muted"> / month + VAT</span>
              </div>
              <p className="small muted">{p.tagline}</p>
              <ul className={styles.features}>
                <li>{p.maxUsers === null ? "Unlimited users" : `Up to ${p.maxUsers} users`}</li>
                <li>{p.maxResearchPerMonth === null ? "Unlimited Ask Capto questions" : `${p.maxResearchPerMonth.toLocaleString("en-GB")} Ask Capto questions / month`}</li>
                <li>Full course library: foundation to advanced, all tracks</li>
                {ALL_FEATURES.map((f) => (
                  <li key={f} className={p.features.includes(f) ? "" : styles.missing}>
                    {FEATURE_LABELS[f]}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="alert alert-info" style={{ marginTop: 18 }}>
        Online card payments are coming soon. To change plan now, contact Capto support and we&apos;ll switch your account straight away — any change shows in your audit log.
      </div>
    </div>
  );
}
