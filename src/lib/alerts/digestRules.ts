/*
 * The weekly "what changed" digest: its shape, when it's worth sending, and the email it becomes.
 * Pure (no database, no network), so it's unit-tested.
 */
import { renderEmail } from "@/lib/emailTemplate";

export interface Digest {
  /** The learner's saved answers whose official sources changed since they were written. */
  saved: { queryId: string; title: string; changed: number }[];
  /** Firm-approved answers whose sources changed (only for people who hold the research register). */
  approved: { queryId: string; question: string; changed: number }[];
  /** Changed official pages in the learner's topics, newest first (capped), and how many there were in all. */
  guidance: { title: string; url: string; topics: string[]; updatedAt: string }[];
  guidanceTotal: number;
  /** Lessons in the learner's topics whose cited sources changed — worth a re-read. */
  lessons: { id: string; title: string; trackTitle: string }[];
  /** Managers only: their team's overdue assignments (capped) and how many there are in all. */
  overdueTeam?: { person: string; title: string; dueDate: string }[];
  overdueTotal?: number;
  /** Content reviewers only (and only if they want it): what needs their attention this week. */
  reviewer?: { sourceChanged: { id: string; title: string; trackTitle: string }[]; newReports: number; awaitingReview: number } | null;
}

export const DIGEST_OVERDUE_CAP = 15;

export const reviewerSectionEmpty = (r: Digest["reviewer"]): boolean => !r || (!r.sourceChanged.length && !r.newReports && !r.awaitingReview);

export const DIGEST_GUIDANCE_CAP = 12;
/** A digest goes out at most this often per person. */
export const DIGEST_MIN_DAYS = 6;

export const digestIsEmpty = (d: Digest): boolean =>
  !d.saved.length && !d.approved.length && !d.guidanceTotal && !d.lessons.length && !d.overdueTotal && reviewerSectionEmpty(d.reviewer);

export function digestDue(lastSent: Date | null, now = new Date()): boolean {
  return !lastSent || now.getTime() - lastSent.getTime() >= DIGEST_MIN_DAYS * 86_400_000;
}

/** Topics to follow: the learner's chosen ones, else the courses they've studied, else nothing (saved/approved only). */
export function digestTopics(chosen: string[], studied: string[]): string[] {
  return chosen.length ? chosen : [...new Set(studied)];
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const day = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/London" });
/** Due dates are stored as the end of a UTC day. */
const dueDay = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/** The email: subject plus the branded template (HTML and plain text), sections as `bodyHtml`. */
export function renderDigestEmail(d: Digest, opts: { name: string; firm: string; appUrl: string; color: string }): { subject: string; html: string; text: string } {
  const c = /^#[0-9a-f]{6}$/i.test(opts.color) ? opts.color : "#a01f62";
  const parts: string[] = [];
  const section = (title: string, intro: string, items: string[]) =>
    parts.push(
      `<h2 style="font-family:Georgia,'Times New Roman',serif;font-size:17px;color:${c};margin:24px 0 6px;">${esc(title)}</h2><p style="margin:0 0 8px;color:#6b6470;font-size:13px;">${esc(intro)}</p><ul style="margin:0;padding-left:18px;">${items.join("")}</ul>`
    );
  const li = (href: string, text: string, meta = "") =>
    `<li style="margin:0 0 7px;"><a href="${esc(href)}" style="color:${c};">${esc(text)}</a>${meta ? ` <span style="color:#6b6470;font-size:12px;">${esc(meta)}</span>` : ""}</li>`;
  const plain = (text: string, meta = "") => `<li style="margin:0 0 7px;">${esc(text)}${meta ? ` <span style="color:#6b6470;font-size:12px;">${esc(meta)}</span>` : ""}</li>`;

  if (d.saved.length)
    section(
      "Your saved research needs a check",
      "Official guidance behind these answers has changed since they were written.",
      d.saved.map((s) => li(`${opts.appUrl}/ask/${s.queryId}`, s.title, `${s.changed} source${s.changed === 1 ? "" : "s"} changed`))
    );
  if (d.approved.length)
    section(
      "Approved firm answers to re-review",
      "These are approved in your research register, but a source has changed since.",
      d.approved.map((a) => li(`${opts.appUrl}/ask/${a.queryId}`, a.question.length > 120 ? `${a.question.slice(0, 120)}…` : a.question, `${a.changed} source${a.changed === 1 ? "" : "s"} changed`))
    );
  if (d.overdueTotal && d.overdueTeam?.length)
    section(
      `Overdue training in your team (${d.overdueTotal})`,
      d.overdueTotal > d.overdueTeam.length ? `The ${d.overdueTeam.length} most overdue are below; see them all on Team training.` : "Assignments past their due date and not yet finished.",
      [...d.overdueTeam.map((o) => plain(`${o.person}: ${o.title}`, `due ${dueDay(o.dueDate)}`)), li(`${opts.appUrl}/team`, "Open Team training")]
    );
  if (d.lessons.length)
    section(
      "Lessons whose sources changed",
      "The change may be minor; our reviewers are checking. Worth a re-read before you rely on them.",
      d.lessons.map((l) => li(`${opts.appUrl}/learn/${l.id}`, l.title, l.trackTitle))
    );
  if (d.guidanceTotal)
    section(
      `HMRC and Companies House updates in your topics (${d.guidanceTotal})`,
      d.guidanceTotal > d.guidance.length ? `The latest ${d.guidance.length} are below; see them all in Capto.` : "Pages GOV.UK recorded as changed this week.",
      [...d.guidance.map((g) => li(g.url, g.title, day(g.updatedAt))), ...(d.guidanceTotal > d.guidance.length ? [li(`${opts.appUrl}/updates?days=7`, "See every change this week")] : [])]
    );
  if (d.reviewer && !reviewerSectionEmpty(d.reviewer)) {
    const r = d.reviewer;
    const items = [
      ...r.sourceChanged.slice(0, 12).map((l) => li(`${opts.appUrl}/reviewer/lesson/${l.id}`, l.title, `${l.trackTitle}: a cited source changed`)),
      ...(r.sourceChanged.length > 12 ? [plain(`…and ${r.sourceChanged.length - 12} more lessons with changed sources`)] : []),
      ...(r.newReports ? [plain(`${r.newReports} new learner error report${r.newReports === 1 ? "" : "s"} this week`)] : []),
      ...(r.awaitingReview ? [plain(`${r.awaitingReview} lesson${r.awaitingReview === 1 ? "" : "s"} still awaiting a first review`)] : []),
      li(`${opts.appUrl}/reviewer`, "Open the Review centre"),
    ];
    section("Reviewer update", "Content that needs a reviewer's eye this week.", items);
  }

  const answers = d.saved.length + d.approved.length;
  const count = answers + d.lessons.length + d.guidanceTotal;
  const subject = answers
    ? `Capto: ${answers} saved or approved answer${answers === 1 ? " needs" : "s need"} a check`
    : d.overdueTotal
      ? `Capto: ${d.overdueTotal} overdue training assignment${d.overdueTotal === 1 ? "" : "s"} in your team`
      : count
        ? `Capto: ${count} update${count === 1 ? "" : "s"} in your topics this week`
        : "Capto: your reviewer update";
  const { html, text } = renderEmail(
    {
      heading: "What changed this week",
      preheader: subject.replace(/^Capto: /, ""),
      paragraphs: [`Hi ${opts.name.split(" ")[0] || opts.name}, here's what changed in the official guidance behind your work, and anything waiting for you.`],
      bodyHtml: parts.join("\n") + `<p style="margin:22px 0 0;font-size:12px;color:#6b6470;">Contains public sector information licensed under the Open Government Licence v3.0.</p>`,
      reason: "You get this on Mondays when something has changed. Change your topics or turn it off in My account.",
      settingsUrl: `${opts.appUrl}/account`,
    },
    { firmName: opts.firm, color: c }
  );
  return { subject, html, text };
}
