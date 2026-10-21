/*
 * One shared, branded layout for every Capto Learn email. Email clients ignore stylesheets and web fonts, so
 * this is table-based, inline-styled HTML with safe font fallbacks (Georgia for headings in place of the app's
 * Newsreader, Arial for text in place of Public Sans). Same family look as Capto Sign's emails: magenta header,
 * rounded card, solid button with a copy-the-link fallback. Every email also gets a plain-text part.
 * Pure (no server imports), so it's unit-tested.
 */

const CAPTO_MAGENTA = "#a01f62";
const CAPTO_GOLD = "#d4a72c";
const INK = "#1f1720";
const MUTED = "#6b6470";
const PAGE = "#f4f2f5";

export interface EmailButton {
  label: string;
  url: string;
}

export interface EmailContent {
  /** Shown in bold at the top of the card. */
  heading: string;
  /** Inbox preview line (hidden in the email itself). Keep under ~110 characters. */
  preheader?: string;
  /** Paragraphs of plain text (escaped for you). Use `bodyHtml` instead for trusted, pre-built HTML. */
  paragraphs?: string[];
  bodyHtml?: string;
  /** Short facts shown in a box, e.g. [["Role", "Content reviewer"], ["Expires", "28 Oct 2026"]]. */
  details?: [string, string][];
  button?: EmailButton;
  /** A short note under the button, e.g. "The link expires in 7 days." */
  note?: string;
  /** Why they're getting this email (one sentence, shown in the footer). */
  reason?: string;
  /** Adds "Manage email settings" to the footer (digest and other optional emails). */
  settingsUrl?: string;
}

export interface EmailBrand {
  /** When an email is sent on behalf of a firm, its name and colour lead; otherwise Capto Learn's. */
  firmName?: string | null;
  color?: string | null;
  /** Public https URL of a logo image (data: URLs are blocked by most mail clients, so they're ignored). */
  logoUrl?: string | null;
}

export const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const safeColor = (c: string | null | undefined) => (c && /^#[0-9a-f]{6}$/i.test(c) ? c : CAPTO_MAGENTA);
const safeUrl = (u: string) => (/^(https?:\/\/|mailto:)/i.test(u) ? u : "#");

const COMPANY_LINE = "Capto Learn is provided by Capto Cloud Ltd, part of the Affinity Associates Group.";

/** The full HTML document. */
export function renderEmailHtml(c: EmailContent, brand: EmailBrand = {}): string {
  const color = safeColor(brand.color);
  const firm = brand.firmName?.trim();
  const logo = brand.logoUrl && /^https:\/\//i.test(brand.logoUrl) ? brand.logoUrl : null;
  const masthead = logo
    ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(firm ?? "Capto Learn")}" height="32" style="display:block;max-height:32px;border:0;" />`
    : `<span style="font-family:Georgia,'Times New Roman',serif;font-size:21px;font-weight:700;color:#ffffff;letter-spacing:0.01em;">${firm ? escapeHtml(firm) : "Capto <span style=\"color:" + CAPTO_GOLD + ";\">Learn</span>"}</span>`;
  const sub = firm ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#f3dbe7;margin-top:4px;">via Capto Learn</div>` : "";

  const body =
    (c.paragraphs ?? []).map((p) => `<p style="margin:0 0 14px;">${escapeHtml(p)}</p>`).join("") + (c.bodyHtml ?? "");

  const details = c.details?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 4px;background:#faf7f9;border:1px solid #ece5ea;border-radius:8px;">
        ${c.details
          .map(
            ([k, v]) => `<tr>
          <td style="padding:9px 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};width:38%;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:9px 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${INK};font-weight:600;vertical-align:top;">${escapeHtml(v)}</td>
        </tr>`
          )
          .join("")}
      </table>`
    : "";

  const link = c.button ? safeUrl(c.button.url) : "#";
  const button = c.button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 0;">
        <tr><td style="border-radius:8px;background:${color};">
          <a href="${escapeHtml(link)}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(c.button.label)}</a>
        </td></tr>
      </table>
      ${
        link !== "#"
          ? `<p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${MUTED};word-break:break-all;">If the button doesn't work, copy this link into your browser:<br /><a href="${escapeHtml(link)}" style="color:${MUTED};">${escapeHtml(link)}</a></p>`
          : ""
      }`
    : "";

  const note = c.note ? `<p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${MUTED};">${escapeHtml(c.note)}</p>` : "";

  const footer = [
    c.reason ? escapeHtml(c.reason) : null,
    c.settingsUrl ? `<a href="${escapeHtml(safeUrl(c.settingsUrl))}" style="color:${MUTED};">Manage email settings</a>` : null,
    escapeHtml(COMPANY_LINE),
  ]
    .filter(Boolean)
    .join("<br />");

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${escapeHtml(c.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${PAGE};">
${c.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAGE};">${escapeHtml(c.preheader)}&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE};padding:28px 12px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="background:${color};border-radius:12px 12px 0 0;padding:20px 30px;border-bottom:3px solid ${CAPTO_GOLD};">${masthead}${sub}</td></tr>
      <tr><td style="background:#ffffff;padding:30px 30px 26px;border-radius:0 0 12px 12px;">
        <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:23px;line-height:1.3;font-weight:700;color:${INK};">${escapeHtml(c.heading)}</h1>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#33293a;">${body}</div>
        ${details}${button}${note}
      </td></tr>
      <tr><td style="padding:18px 30px 0;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:1.6;color:${MUTED};text-align:center;">${footer}</td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** The plain-text alternative (helps deliverability, and some people read mail as text). */
export function renderEmailText(c: EmailContent, brand: EmailBrand = {}): string {
  const lines: string[] = [];
  lines.push(brand.firmName ? `${brand.firmName} via Capto Learn` : "Capto Learn", "", c.heading, "");
  for (const p of c.paragraphs ?? []) lines.push(p, "");
  if (c.bodyHtml) lines.push(htmlToPlain(c.bodyHtml), "");
  for (const [k, v] of c.details ?? []) lines.push(`${k}: ${v}`);
  if (c.details?.length) lines.push("");
  if (c.button && safeUrl(c.button.url) !== "#") lines.push(`${c.button.label}: ${c.button.url}`, "");
  if (c.note) lines.push(c.note, "");
  lines.push("--");
  if (c.reason) lines.push(c.reason);
  if (c.settingsUrl) lines.push(`Manage email settings: ${c.settingsUrl}`);
  lines.push(COMPANY_LINE);
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function htmlToPlain(html: string): string {
  return html
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "$2 ($1)")
    .replace(/<(br|\/p|\/li|\/h[1-6]|\/tr)[^>]*>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Both parts at once, ready for sendEmail. */
export function renderEmail(c: EmailContent, brand: EmailBrand = {}): { html: string; text: string } {
  return { html: renderEmailHtml(c, brand), text: renderEmailText(c, brand) };
}
