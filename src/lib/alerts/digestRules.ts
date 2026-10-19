/*
 * The weekly "what changed" digest: its shape, when it's worth sending, and the email it becomes.
 * Pure (no database, no network), so it's unit-tested.
 */

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
}

export const DIGEST_GUIDANCE_CAP = 12;
/** A digest goes out at most this often per person. */
export const DIGEST_MIN_DAYS = 6;

export const digestIsEmpty = (d: Digest): boolean => !d.saved.length && !d.approved.length && !d.guidanceTotal && !d.lessons.length;

export function digestDue(lastSent: Date | null, now = new Date()): boolean {
  return !lastSent || now.getTime() - lastSent.getTime() >= DIGEST_MIN_DAYS * 86_400_000;
}

/** Topics to follow: the learner's chosen ones, else the courses they've studied, else nothing (saved/approved only). */
export function digestTopics(chosen: string[], studied: string[]): string[] {
  return chosen.length ? chosen : [...new Set(studied)];
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const day = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/London" });

/** The email: subject plus simple, client-safe HTML (inline styles only). */
export function renderDigestEmail(d: Digest, opts: { name: string; firm: string; appUrl: string; color: string }): { subject: string; html: string } {
  const c = /^#[0-9a-f]{6}$/i.test(opts.color) ? opts.color : "#a01f62";
  const parts: string[] = [];
  const section = (title: string, intro: string, items: string[]) =>
    parts.push(`<h2 style="font-size:16px;color:${c};margin:22px 0 6px">${esc(title)}</h2><p style="margin:0 0 8px;color:#555;font-size:13px">${esc(intro)}</p><ul style="margin:0;padding-left:18px">${items.join("")}</ul>`);
  const li = (href: string, text: string, meta = "") => `<li style="margin:0 0 6px"><a href="${esc(href)}" style="color:#1f5fa8">${esc(text)}</a>${meta ? ` <span style="color:#777;font-size:12px">${esc(meta)}</span>` : ""}</li>`;

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

  const count = d.saved.length + d.approved.length + d.lessons.length + d.guidanceTotal;
  const subject = d.saved.length || d.approved.length ? `Capto: ${d.saved.length + d.approved.length} saved or approved answer${d.saved.length + d.approved.length === 1 ? " needs" : "s need"} a check` : `Capto: ${count} update${count === 1 ? "" : "s"} in your topics this week`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;color:#222;font-size:14px;line-height:1.45">
<p style="font-weight:bold;color:${c};margin:0">${esc(opts.firm)} · Capto Learn</p>
<h1 style="font-size:20px;margin:6px 0 4px">What changed this week</h1>
<p style="margin:0;color:#555">Hi ${esc(opts.name.split(" ")[0] || opts.name)}, here's what changed in the official guidance behind your work.</p>
${parts.join("\n")}
<p style="margin:24px 0 0;font-size:12px;color:#777">You get this weekly because you use Capto Learn. Change your topics or turn it off in <a href="${esc(opts.appUrl)}/account" style="color:#777">My account</a>. Contains public sector information licensed under the Open Government Licence v3.0.</p>
</div>`;
  return { subject, html };
}
