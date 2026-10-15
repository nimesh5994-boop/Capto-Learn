import "server-only";
import { Resend } from "resend";

export interface EmailResult {
  sent: boolean;
  /** Set when no provider is configured — the caller shows the link so it can be shared manually. */
  skipped?: boolean;
  error?: string;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Whether outbound email is configured at all — safe to reveal, it says nothing about any account. */
export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

export async function sendEmail(input: { to: string; subject: string; html: string; replyTo?: string | null; fromName: string }): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM;
  if (!key || !fromAddress) {
    console.info(`[email skipped — RESEND_API_KEY/EMAIL_FROM not set] to=${input.to} subject="${input.subject}"`);
    return { sent: false, skipped: true };
  }
  // EMAIL_FROM may be a bare address or "Name <address>"; only the address is used, under the firm's name.
  const address = fromAddress.match(/<([^>]+)>/)?.[1] ?? fromAddress.trim();
  try {
    const { error } = await new Resend(key).emails.send({
      from: `${input.fromName.replace(/[<>"]/g, "")} <${address}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo ?? undefined,
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Email failed" };
  }
}
