/*
 * SaaS plan ladder. Pure module — limits are enforced server-side (lib/entitlements.ts) and shown
 * on the Billing page. Prices are list prices (GBP, ex VAT, per firm per month) for display; payment collection comes later.
 */

export type PlanKey = "trial" | "starter" | "professional" | "practice";
export type Feature = "research" | "professionalSources" | "assignments" | "teamProgress" | "customRoles" | "auditLog" | "customBranding";

export interface PlanDef {
  key: PlanKey;
  label: string;
  monthlyPrice: number | null;
  /** Paying yearly up front: two months free. */
  annualPrice: number | null;
  tagline: string;
  /** null = unlimited */
  maxUsers: number | null;
  /** Ask Capto questions per firm per calendar month; null = unlimited (fair use). */
  maxResearchPerMonth: number | null;
  /** Interview tests for job applicants per calendar month; null = unlimited, 0 = not included. */
  maxInterviewsPerMonth: number | null;
  features: readonly Feature[];
}

export const TRIAL_DAYS = 14;

export const PLANS: Record<PlanKey, PlanDef> = {
  trial: {
    key: "trial",
    label: "Free trial",
    monthlyPrice: null,
    annualPrice: null,
    tagline: `Everything in Professional for ${TRIAL_DAYS} days.`,
    maxUsers: 5,
    maxResearchPerMonth: 40,
    maxInterviewsPerMonth: 3,
    features: ["research", "professionalSources", "assignments", "teamProgress", "customRoles", "auditLog", "customBranding"],
  },
  starter: {
    key: "starter",
    label: "Starter",
    monthlyPrice: 39,
    annualPrice: 390,
    tagline: "Sole practitioners and small teams: the full course library plus Ask Capto.",
    maxUsers: 5,
    maxResearchPerMonth: 150,
    maxInterviewsPerMonth: 5,
    features: ["research"],
  },
  professional: {
    key: "professional",
    label: "Professional",
    monthlyPrice: 99,
    annualPrice: 990,
    tagline: "Growing firms: assign training, track the team, professional-body search.",
    maxUsers: 20,
    maxResearchPerMonth: 600,
    maxInterviewsPerMonth: 25,
    features: ["research", "professionalSources", "assignments", "teamProgress", "customRoles", "customBranding"],
  },
  practice: {
    key: "practice",
    label: "Practice",
    monthlyPrice: 229,
    annualPrice: 2290,
    tagline: "Multi-office practices needing controls, audit and unlimited seats.",
    maxUsers: null,
    maxResearchPerMonth: 2000,
    maxInterviewsPerMonth: null,
    features: ["research", "professionalSources", "assignments", "teamProgress", "customRoles", "auditLog", "customBranding"],
  },
};

export const PLAN_KEYS = Object.keys(PLANS) as PlanKey[];

export const FEATURE_LABELS: Record<Feature, string> = {
  research: "Ask Capto — cited answers from HMRC manuals & GOV.UK",
  professionalSources: "Ask Capto also searches ICAEW, ACCA, ATT, CIOT and FRC",
  assignments: "Assign training with due dates",
  teamProgress: "Team progress & skills dashboard",
  customRoles: "Custom roles & permissions",
  auditLog: "Audit log",
  customBranding: "Firm logo & brand colour",
};

export function planOf(key: string | null | undefined): PlanDef {
  return PLANS[(key as PlanKey) in PLANS ? (key as PlanKey) : "trial"];
}

export function hasFeature(plan: string, feature: Feature): boolean {
  return planOf(plan).features.includes(feature);
}

/** The subset of a firm record that decides entitlements. */
export interface EntitlementSource {
  plan: string;
  kind?: string;
  featureOverrides?: Partial<Record<string, boolean>> | null;
  limitOverrides?: { maxUsers?: number | null; maxResearchPerMonth?: number | null } | null;
}

/** Per-firm feature check: the internal Capto workspace has everything; a platform override beats the plan. */
export function orgHasFeature(org: EntitlementSource, feature: Feature): boolean {
  if (org.kind === "internal") return true;
  const override = org.featureOverrides?.[feature];
  return typeof override === "boolean" ? override : hasFeature(org.plan, feature);
}

/** Interview tests allowed per month for this firm (null = unlimited). The internal workspace is unlimited. */
export function interviewLimit(org: EntitlementSource): number | null {
  if (org.kind === "internal") return null;
  return planOf(org.plan).maxInterviewsPerMonth;
}

/** Effective seat / research limits (null = unlimited), honouring platform overrides. */
export function orgLimits(org: EntitlementSource): { maxUsers: number | null; maxResearchPerMonth: number | null } {
  if (org.kind === "internal") return { maxUsers: null, maxResearchPerMonth: null };
  const plan = planOf(org.plan);
  const o = org.limitOverrides ?? {};
  return {
    maxUsers: o.maxUsers !== undefined ? o.maxUsers : plan.maxUsers,
    maxResearchPerMonth: o.maxResearchPerMonth !== undefined ? o.maxResearchPerMonth : plan.maxResearchPerMonth,
  };
}

export type AccountState = "active" | "trial" | "trial_expired" | "suspended";

/** An expired trial or suspended firm is read-only: it can still see its data but not create or send. */
export function accountState(org: { plan: string; trialEndsAt: Date | null; status: string }, now = Date.now()): AccountState {
  if (org.status === "suspended") return "suspended";
  if (org.plan === "trial") return org.trialEndsAt && org.trialEndsAt.getTime() < now ? "trial_expired" : "trial";
  return "active";
}

export function trialDaysLeft(trialEndsAt: Date | null, now = Date.now()): number {
  if (!trialEndsAt) return 0;
  return Math.max(0, Math.ceil((trialEndsAt.getTime() - now) / 86_400_000));
}
