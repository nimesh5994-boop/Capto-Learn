/*
 * Email tracking rules — pure functions only (no database, no server-only), so they can be unit-tested:
 *  - what each kind of email is called,
 *  - the delivery status shown for a logged email (derived from the Resend events recorded against it),
 *  - how a Resend webhook event maps onto an update of the email_log row,
 *  - the status shown for an invitation.
 */

export const EMAIL_KINDS = [
  "invite",
  "platform_invite",
  "firm_invite",
  "welcome",
  "password_reset",
  "digest",
  "training_assigned",
  "training_reminder",
  "course_completed",
  "interview",
  "join_request",
  "register_review",
  "other",
] as const;
export type EmailKind = (typeof EMAIL_KINDS)[number];

export const EMAIL_KIND_LABELS: Record<EmailKind, string> = {
  invite: "Team invitation",
  platform_invite: "Platform invitation",
  firm_invite: "Firm invitation",
  welcome: "Welcome",
  password_reset: "Password reset",
  digest: "Weekly update",
  training_assigned: "Training assigned",
  training_reminder: "Training reminder",
  course_completed: "Course completed",
  interview: "Interview test",
  join_request: "Join request",
  register_review: "Research review",
  other: "Other",
};

export const isEmailKind = (k: unknown): k is EmailKind => typeof k === "string" && (EMAIL_KINDS as readonly string[]).includes(k);

/** Outcome of the send attempt itself (before any provider events arrive). */
export type SendStatus = "sent" | "failed" | "skipped";

/** What the status pill shows — the furthest point the email is known to have reached. */
export const DELIVERY_STATUSES = ["skipped", "failed", "sent", "delayed", "delivered", "opened", "clicked", "bounced", "complained"] as const;
export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];

export const isDeliveryStatus = (s: unknown): s is DeliveryStatus => typeof s === "string" && (DELIVERY_STATUSES as readonly string[]).includes(s);

export const DELIVERY_LABELS: Record<DeliveryStatus, string> = {
  skipped: "Skipped",
  failed: "Failed",
  sent: "Sent",
  delayed: "Delayed",
  delivered: "Delivered",
  opened: "Opened",
  clicked: "Clicked",
  bounced: "Bounced",
  complained: "Spam complaint",
};

/** Maps onto the app's existing pill colours (globals.css). */
export const DELIVERY_PILL: Record<DeliveryStatus, string> = {
  skipped: "pill-draft",
  failed: "pill-declined",
  sent: "pill-sent",
  delayed: "pill-viewed",
  delivered: "pill-accepted",
  opened: "pill-accepted",
  clicked: "pill-accepted",
  bounced: "pill-declined",
  complained: "pill-declined",
};

export interface TrackedEmail {
  status: string;
  deliveredAt: Date | null;
  openedAt: Date | null;
  firstClickedAt: Date | null;
  bouncedAt: Date | null;
  complainedAt: Date | null;
  delayedAt: Date | null;
}

/**
 * The status to show. Problems win over progress (a complaint or bounce is what an admin needs to see), then the
 * furthest step reached: clicked > opened > delivered > delayed > sent. Events can arrive out of order, so this looks
 * at which timestamps are set rather than at the last event received.
 */
export function deliveryStatus(e: TrackedEmail): DeliveryStatus {
  if (e.status === "skipped") return "skipped";
  if (e.status === "failed") return "failed";
  if (e.complainedAt) return "complained";
  if (e.bouncedAt) return "bounced";
  if (e.firstClickedAt) return "clicked";
  if (e.openedAt) return "opened";
  if (e.deliveredAt) return "delivered";
  if (e.delayedAt) return "delayed";
  return "sent";
}

/* ───────────── Resend webhook events ───────────── */

export type StampField = "deliveredAt" | "openedAt" | "firstClickedAt" | "bouncedAt" | "complainedAt" | "delayedAt";

/** One webhook event, reduced to what the email_log row needs. */
export interface EmailEventPlan {
  providerId: string;
  /** Short event name stored as lastEvent, e.g. "delivered". */
  event: string;
  at: Date;
  /** Timestamp column to fill — only if still empty, so the first occurrence is kept. */
  stamp: StampField | null;
  /** Counter to increment (once per distinct webhook delivery). */
  counter: "openCount" | "clickCount" | null;
  /** Set for email.failed: the attempt is marked failed with this reason. */
  failed: boolean;
  /** Bounce / failure detail worth keeping in the error column. */
  detail: string | null;
}

const EVENT_MAP: Record<string, { event: string; stamp: StampField | null; counter: EmailEventPlan["counter"]; failed?: boolean }> = {
  "email.sent": { event: "sent", stamp: null, counter: null },
  "email.delivered": { event: "delivered", stamp: "deliveredAt", counter: null },
  "email.delivery_delayed": { event: "delayed", stamp: "delayedAt", counter: null },
  "email.bounced": { event: "bounced", stamp: "bouncedAt", counter: null },
  "email.complained": { event: "complained", stamp: "complainedAt", counter: null },
  "email.opened": { event: "opened", stamp: "openedAt", counter: "openCount" },
  "email.clicked": { event: "clicked", stamp: "firstClickedAt", counter: "clickCount" },
  "email.failed": { event: "failed", stamp: null, counter: null, failed: true },
};

export const HANDLED_EVENTS = Object.keys(EVENT_MAP);

const asRecord = (v: unknown): Record<string, unknown> | null => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null);

function validDate(v: unknown): Date | null {
  if (typeof v !== "string" && typeof v !== "number") return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Turns a (verified) Resend webhook payload into an update plan, or null when it's an event type we don't track or
 * it carries no email id. Unknown types are a no-op, never an error — Resend adds new event types over time.
 */
export function planEmailEvent(payload: unknown, now: Date = new Date()): EmailEventPlan | null {
  const p = asRecord(payload);
  if (!p || typeof p.type !== "string") return null;
  const m = EVENT_MAP[p.type];
  if (!m) return null;
  const data = asRecord(p.data);
  const providerId = data && typeof data.email_id === "string" ? data.email_id.trim() : "";
  if (!providerId) return null;
  // The event's own time (top-level created_at); a click/open may also carry its own timestamp.
  const inner = asRecord(data?.click) ?? asRecord(data?.open);
  const at = validDate(inner?.timestamp) ?? validDate(p.created_at) ?? now;
  let detail: string | null = null;
  const bounce = asRecord(data?.bounce);
  if (bounce) {
    const kind = [bounce.type, bounce.subType].filter((x) => typeof x === "string" && x).join("/");
    const msg = typeof bounce.message === "string" ? bounce.message : "";
    detail = [kind, msg].filter(Boolean).join(": ") || null;
  }
  const failure = asRecord(data?.failed);
  if (m.failed && failure && typeof failure.reason === "string") detail = failure.reason;
  return { providerId, event: m.event, at, stamp: m.stamp, counter: m.counter, failed: Boolean(m.failed), detail: detail ? detail.slice(0, 500) : null };
}

/* ───────────── Invitations ───────────── */

export type InvitationState = "pending" | "expired" | "accepted" | "revoked";

export interface InvitationStatus {
  state: InvitationState;
  /** Delivery of the most recent invitation email (pending/expired invitations only). */
  delivery: DeliveryStatus | null;
  label: string;
  pill: string;
  /** Resend issues a fresh link — for anything not yet accepted or revoked. */
  canResend: boolean;
  canRevoke: boolean;
}

export function invitationStatus(
  inv: { acceptedAt: Date | null; revokedAt: Date | null; expiresAt: Date },
  latestEmail: TrackedEmail | null,
  now: Date = new Date()
): InvitationStatus {
  if (inv.acceptedAt) return { state: "accepted", delivery: null, label: "Accepted", pill: "pill-accepted", canResend: false, canRevoke: false };
  if (inv.revokedAt) return { state: "revoked", delivery: null, label: "Revoked", pill: "pill-withdrawn", canResend: false, canRevoke: false };
  const delivery = latestEmail ? deliveryStatus(latestEmail) : null;
  if (inv.expiresAt.getTime() <= now.getTime()) return { state: "expired", delivery, label: "Expired", pill: "pill-viewed", canResend: true, canRevoke: true };
  const problem = delivery === "bounced" || delivery === "complained" || delivery === "failed";
  return {
    state: "pending",
    delivery,
    label: delivery ? `Pending · ${DELIVERY_LABELS[delivery]}` : "Pending",
    pill: problem ? "pill-declined" : "pill-sent",
    canResend: true,
    canRevoke: true,
  };
}
