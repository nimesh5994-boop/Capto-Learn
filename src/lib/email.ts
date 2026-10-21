import "server-only";
import { Resend } from "resend";
import { recordEmail, type EmailLogInput } from "@/lib/emailLog";
import { renderEmail } from "@/lib/emailTemplate";
import type { BuiltEmail } from "@/lib/emailContent";

export interface EmailResult {
  sent: boolean;
  /** Set when no provider is configured — the caller shows the link so it can be shared manually. */
  skipped?: boolean;
  error?: string;
  /** Resend's id for the email, when it was accepted. */
  providerId?: string;
}

/** Whether outbound email is configured at all — safe to reveal, it says nothing about any account. */
export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

/**
 * Sends one email through Resend and records the attempt in email_log (sent with Resend's id, failed with the reason,
 * or skipped when email isn't configured). `log` says what the email is for, so it can be tracked and shown to admins.
 */
export async function sendEmail(input: { to: string; subject: string; html: string; text?: string; replyTo?: string | null; fromName: string; log: EmailLogInput }): Promise<EmailResult> {
  const result = await deliver(input);
  await recordEmail({
    log: input.log,
    to: input.to,
    subject: input.subject,
    status: result.sent ? "sent" : result.skipped ? "skipped" : "failed",
    providerId: result.providerId ?? null,
    error: result.error ?? null,
  });
  return result;
}

/** Renders a built email (lib/emailContent.ts) through the branded template and sends it. */
export async function sendBuiltEmail(input: { to: string; email: BuiltEmail; fromName: string; replyTo?: string | null; log: EmailLogInput }): Promise<EmailResult> {
  const { html, text } = renderEmail(input.email.content, input.email.brand);
  return sendEmail({ to: input.to, subject: input.email.subject, html, text, fromName: input.fromName, replyTo: input.replyTo, log: input.log });
}

async function deliver(input: { to: string; subject: string; html: string; text?: string; replyTo?: string | null; fromName: string }): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM;
  if (!key || !fromAddress) {
    console.info(`[email skipped — RESEND_API_KEY/EMAIL_FROM not set] to=${input.to} subject="${input.subject}"`);
    return { sent: false, skipped: true };
  }
  // EMAIL_FROM may be a bare address or "Name <address>"; only the address is used, under the firm's name.
  const address = fromAddress.match(/<([^>]+)>/)?.[1] ?? fromAddress.trim();
  try {
    const resend = new Resend(key);
    const payload = {
      from: `${input.fromName.replace(/[<>"]/g, "")} <${address}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo ?? undefined,
    };
    await paceSends();
    let { data, error } = await resend.emails.send(payload);
    // Resend allows a few requests a second; one patient retry covers a burst (e.g. assigning a whole team).
    if (error && error.name === "rate_limit_exceeded") {
      await new Promise((r) => setTimeout(r, 1100));
      ({ data, error } = await resend.emails.send(payload));
    }
    if (error) return { sent: false, error: error.message };
    return { sent: true, providerId: data?.id };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Email failed" };
  }
}

/** Spaces sends from this process at least SEND_GAP_MS apart, to stay under Resend's per-second rate limit. */
const SEND_GAP_MS = 550;
let nextSlot = 0;
async function paceSends() {
  const now = Date.now();
  const at = Math.max(now, nextSlot);
  nextSlot = at + SEND_GAP_MS;
  if (at > now) await new Promise((r) => setTimeout(r, at - now));
}
