import { describe, expect, it } from "vitest";
import { deliveryStatus, invitationStatus, planEmailEvent, type TrackedEmail } from "./emailTracking";

const blank: TrackedEmail = { status: "sent", deliveredAt: null, openedAt: null, firstClickedAt: null, bouncedAt: null, complainedAt: null, delayedAt: null };
const t = (iso: string) => new Date(iso);

describe("deliveryStatus", () => {
  it("reports the send outcome when nothing came back", () => {
    expect(deliveryStatus({ ...blank, status: "skipped" })).toBe("skipped");
    expect(deliveryStatus({ ...blank, status: "failed" })).toBe("failed");
    expect(deliveryStatus(blank)).toBe("sent");
  });
  it("shows the furthest step reached, whatever order events arrived in", () => {
    expect(deliveryStatus({ ...blank, delayedAt: t("2026-10-01") })).toBe("delayed");
    expect(deliveryStatus({ ...blank, delayedAt: t("2026-10-01"), deliveredAt: t("2026-10-02") })).toBe("delivered");
    expect(deliveryStatus({ ...blank, openedAt: t("2026-10-02") })).toBe("opened");
    expect(deliveryStatus({ ...blank, deliveredAt: t("2026-10-02"), openedAt: t("2026-10-03"), firstClickedAt: t("2026-10-03") })).toBe("clicked");
  });
  it("lets problems win over progress", () => {
    expect(deliveryStatus({ ...blank, deliveredAt: t("2026-10-02"), complainedAt: t("2026-10-03") })).toBe("complained");
    expect(deliveryStatus({ ...blank, bouncedAt: t("2026-10-02"), openedAt: t("2026-10-03") })).toBe("bounced");
    expect(deliveryStatus({ ...blank, bouncedAt: t("2026-10-02"), complainedAt: t("2026-10-03") })).toBe("complained");
  });
  it("a failed send stays failed even if a stray event lands", () => {
    expect(deliveryStatus({ ...blank, status: "failed", deliveredAt: t("2026-10-02") })).toBe("failed");
  });
});

describe("planEmailEvent", () => {
  const now = t("2026-10-21T12:00:00Z");
  const ev = (type: string, data: Record<string, unknown> = {}, created_at = "2026-10-21T10:00:00.000Z") => ({ type, created_at, data: { email_id: "re_123", ...data } });

  it("maps each tracked event to its column", () => {
    expect(planEmailEvent(ev("email.sent"), now)).toMatchObject({ providerId: "re_123", event: "sent", stamp: null, counter: null, failed: false });
    expect(planEmailEvent(ev("email.delivered"), now)).toMatchObject({ event: "delivered", stamp: "deliveredAt", counter: null });
    expect(planEmailEvent(ev("email.delivery_delayed"), now)).toMatchObject({ event: "delayed", stamp: "delayedAt" });
    expect(planEmailEvent(ev("email.complained"), now)).toMatchObject({ event: "complained", stamp: "complainedAt" });
    expect(planEmailEvent(ev("email.opened"), now)).toMatchObject({ event: "opened", stamp: "openedAt", counter: "openCount" });
    expect(planEmailEvent(ev("email.clicked"), now)).toMatchObject({ event: "clicked", stamp: "firstClickedAt", counter: "clickCount" });
    expect(planEmailEvent(ev("email.failed", { failed: { reason: "reached daily quota" } }), now)).toMatchObject({ event: "failed", failed: true, detail: "reached daily quota" });
  });
  it("uses the event's own time, preferring a click's timestamp", () => {
    expect(planEmailEvent(ev("email.delivered"), now)?.at.toISOString()).toBe("2026-10-21T10:00:00.000Z");
    expect(planEmailEvent(ev("email.clicked", { click: { link: "https://x", timestamp: "2026-10-21T10:05:00.000Z" } }), now)?.at.toISOString()).toBe("2026-10-21T10:05:00.000Z");
    expect(planEmailEvent({ type: "email.delivered", data: { email_id: "re_1" } }, now)?.at).toEqual(now);
  });
  it("keeps the bounce reason", () => {
    const p = planEmailEvent(ev("email.bounced", { bounce: { type: "Permanent", subType: "General", message: "Mailbox does not exist" } }), now);
    expect(p).toMatchObject({ event: "bounced", stamp: "bouncedAt", detail: "Permanent/General: Mailbox does not exist" });
  });
  it("ignores untracked or malformed events", () => {
    expect(planEmailEvent(ev("email.scheduled"), now)).toBeNull();
    expect(planEmailEvent(ev("contact.created"), now)).toBeNull();
    expect(planEmailEvent({ type: "email.delivered", data: {} }, now)).toBeNull();
    expect(planEmailEvent({ type: "email.delivered" }, now)).toBeNull();
    expect(planEmailEvent(null, now)).toBeNull();
    expect(planEmailEvent("email.delivered", now)).toBeNull();
  });
});

describe("invitationStatus", () => {
  const now = t("2026-10-21T12:00:00Z");
  const open = { acceptedAt: null, revokedAt: null, expiresAt: t("2026-10-25") };
  it("finished invitations can't be re-sent", () => {
    expect(invitationStatus({ ...open, acceptedAt: t("2026-10-20") }, null, now)).toMatchObject({ state: "accepted", label: "Accepted", canResend: false, canRevoke: false });
    expect(invitationStatus({ ...open, revokedAt: t("2026-10-20") }, blank, now)).toMatchObject({ state: "revoked", label: "Revoked", canResend: false });
  });
  it("shows the delivery of the latest email while pending", () => {
    expect(invitationStatus(open, null, now)).toMatchObject({ state: "pending", label: "Pending", canResend: true, canRevoke: true });
    expect(invitationStatus(open, blank, now).label).toBe("Pending · Sent");
    expect(invitationStatus(open, { ...blank, deliveredAt: t("2026-10-20") }, now).label).toBe("Pending · Delivered");
    expect(invitationStatus(open, { ...blank, openedAt: t("2026-10-20") }, now).label).toBe("Pending · Opened");
    const bounced = invitationStatus(open, { ...blank, bouncedAt: t("2026-10-20") }, now);
    expect(bounced.label).toBe("Pending · Bounced");
    expect(bounced.pill).toBe("pill-declined");
    expect(invitationStatus(open, { ...blank, status: "skipped" }, now).label).toBe("Pending · Skipped");
  });
  it("expired invitations can be re-sent", () => {
    expect(invitationStatus({ ...open, expiresAt: t("2026-10-21T11:59:59Z") }, blank, now)).toMatchObject({ state: "expired", label: "Expired", canResend: true, delivery: "sent" });
  });
});
