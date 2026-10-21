import { describe, expect, it } from "vitest";
import {
  courseCompletedEmail,
  firmInviteEmail,
  interviewInviteEmail,
  interviewReceiptEmail,
  joinRequestAdminEmail,
  joinRequestDecisionEmail,
  joinRequestReceivedEmail,
  passwordResetEmail,
  platformInviteEmail,
  registerChangesEmail,
  teamInviteEmail,
  trainingAssignedEmail,
  trainingReminderEmail,
  welcomeEmail,
  type BuiltEmail,
} from "./emailContent";
import { renderEmail } from "./emailTemplate";

const firm = { name: "Smith & Co", color: "#123456" };
const app = "https://learn.chitta.cloud";
const render = (e: BuiltEmail) => renderEmail(e.content, e.brand);

describe("email content", () => {
  it("team invitation: firm-branded, with role, inviter and expiry", () => {
    const e = teamInviteEmail({ firm, inviterName: "Jo Bloggs", roleLabel: "Staff", link: `${app}/invite/tok`, expiresAt: new Date("2026-10-28T10:00:00Z") });
    expect(e.subject).toBe("Jo Bloggs invited you to Smith & Co on Capto Learn");
    expect(e.brand).toEqual({ firmName: "Smith & Co", color: "#123456" });
    expect(e.content.details).toContainEqual(["Role", "Staff"]);
    expect(e.content.details).toContainEqual(["Link expires", "Wednesday 28 October 2026"]);
    expect(e.content.preheader).toContain("Staff");
    const { html, text } = render(e);
    expect(html).toContain("Smith &amp; Co");
    expect(html).toContain(`${app}/invite/tok`);
    expect(text).toContain(`Accept the invitation: ${app}/invite/tok`);
  });
  it("team invitation from Capto staff has no inviter name", () => {
    const e = teamInviteEmail({ firm, inviterName: null, roleLabel: "Admin", link: `${app}/invite/x`, expiresAt: new Date() });
    expect(e.subject).toBe("You've been invited to Smith & Co on Capto Learn");
    expect(e.content.details?.some(([k]) => k === "Invited by")).toBe(false);
  });
  it("platform and firm invitations use Capto branding", () => {
    expect(platformInviteEmail({ inviterName: "N P", roleLabel: "Content reviewer", roleDescription: "Signs off lessons.", link: `${app}/invite/x`, expiresAt: new Date() }).brand).toEqual({});
    const f = firmInviteEmail({ firmName: "New Firm", planText: "14-day free trial", link: `${app}/signup?invite=x`, expiresAt: new Date() });
    expect(f.brand).toEqual({});
    expect(f.content.details).toContainEqual(["Plan", "14-day free trial"]);
  });
  it("password reset: Capto-branded when self-service, firm-branded when an admin sends it", () => {
    const self = passwordResetEmail({ email: "a@b.com", link: `${app}/reset-password?token=t`, expiresText: "1 hour" });
    expect(self.brand).toEqual({});
    expect(self.content.note).toContain("1 hour");
    const admin = passwordResetEmail({ email: "a@b.com", link: `${app}/reset-password?token=t`, expiresText: "24 hours", admin: { name: "Jo", firm } });
    expect(admin.brand.firmName).toBe("Smith & Co");
    expect(admin.content.paragraphs?.[0]).toContain("Jo at Smith & Co");
  });
  it("welcome lists the getting-started steps as links", () => {
    const e = welcomeEmail({ name: "Ann Lee", firmName: "New Firm", appUrl: app, trialDays: 14 });
    const { html } = render(e);
    for (const path of ["/admin/users", "/admin/branding", "/team", "/ask"]) expect(html).toContain(`${app}${path}`);
    expect(e.subject).toBe("Welcome to Capto Learn, Ann");
    expect(e.content.details).toContainEqual(["Free trial", "14 days"]);
  });
  it("join requests: admin notice, receipt, and both decisions", () => {
    expect(joinRequestAdminEmail({ firm, name: "Sam", email: "sam@x.com", link: `${app}/admin/users` }).content.details).toContainEqual(["Email", "sam@x.com"]);
    expect(joinRequestReceivedEmail({ firm, name: "Sam Patel" }).content.paragraphs?.[0]).toContain("Hi Sam,");
    const yes = joinRequestDecisionEmail({ firm, name: "Sam", approved: true, loginUrl: `${app}/login` });
    expect(yes.content.button?.url).toBe(`${app}/login`);
    const no = joinRequestDecisionEmail({ firm, name: "Sam", approved: false, loginUrl: `${app}/login` });
    expect(no.content.button).toBeUndefined();
    expect(no.content.heading).toContain("wasn't approved");
  });
  it("training: assigned and reminders show the due date as the calendar day it was set for", () => {
    const dueDate = new Date("2026-10-24T23:59:59Z"); // 00:59 on the 25th in London (BST) — must still read the 24th
    const a = trainingAssignedEmail({ firm, name: "Jo", assignerName: "Ann", title: "VAT", lessons: 12, dueDate, note: "Before the VAT quarter", link: `${app}/learn/vat` });
    expect(a.content.details).toContainEqual(["Due", "Saturday 24 October 2026"]);
    expect(a.content.paragraphs?.join(" ")).toContain("Before the VAT quarter");
    expect(trainingAssignedEmail({ firm, name: "Jo", assignerName: "Ann", title: "VAT", lessons: 1, dueDate: null, note: null, link: "x" }).content.details).toContainEqual(["Due", "No due date"]);
    const soon = trainingReminderEmail({ firm, name: "Jo", title: "VAT", dueDate, done: 3, total: 12, stage: "due_soon", link: `${app}/learn/vat`, settingsUrl: `${app}/account` });
    expect(soon.subject).toBe("Reminder: VAT is due Saturday 24 October 2026");
    expect(soon.content.details).toContainEqual(["Progress", "3 of 12 lessons done"]);
    expect(soon.content.settingsUrl).toBe(`${app}/account`);
    expect(trainingReminderEmail({ firm, name: "Jo", title: "VAT", dueDate, done: 3, total: 12, stage: "overdue", link: "x", settingsUrl: "y" }).subject).toBe("Overdue: VAT");
  });
  it("course completed links to the certificate", () => {
    const e = courseCompletedEmail({ firm, name: "Jo", courseTitle: "VAT", lessons: 12, certificateUrl: `${app}/certificates/vat` });
    expect(e.content.button?.url).toBe(`${app}/certificates/vat`);
  });
  it("interview: link and deadline, then a receipt without the score", () => {
    const e = interviewInviteEmail({ firm, candidateName: "Chris Doe", role: "Tax senior", minutes: 30, questions: 20, expiresAt: new Date("2026-10-28T10:00:00Z"), link: `${app}/interview/tok` });
    expect(e.content.details).toContainEqual(["Take it by", "Wednesday 28 October 2026"]);
    expect(e.content.paragraphs?.[0]).toContain("Tax senior role");
    const r = interviewReceiptEmail({ firm, candidateName: "Chris Doe" });
    expect(JSON.stringify(r)).not.toMatch(/score|%/i);
  });
  it("research register: question and note, clipped, never the answer", () => {
    const e = registerChangesEmail({ firm, name: "Jo", reviewerName: "Ann", question: "Q".repeat(300), note: "Cite the 2024 manual", link: `${app}/ask/q1` });
    const q = e.content.details?.find(([k]) => k === "Question")?.[1] ?? "";
    expect(q.length).toBeLessThanOrEqual(140);
    expect(e.content.details).toContainEqual(["Reviewer's note", "Cite the 2024 manual"]);
  });
  it("escapes what people type, everywhere", () => {
    const { html } = render(joinRequestAdminEmail({ firm: { name: "<b>Firm</b>" }, name: "<script>x</script>", email: "a@b.com", link: `${app}/admin/users` }));
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>Firm</b>");
  });
});
