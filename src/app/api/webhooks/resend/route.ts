import { verifySvixSignature } from "@/lib/webhookSignature";
import { planEmailEvent } from "@/lib/emailTracking";
import { applyEmailEvent } from "@/lib/emailLog";

export const runtime = "nodejs";

/**
 * Resend's delivery webhooks (sent / delivered / delivery_delayed / bounced / complained / opened / clicked, plus
 * failed). No session — authenticity comes entirely from the Svix signature, keyed by RESEND_WEBHOOK_SECRET (same
 * approach as Capto Sign). The endpoint is registered by hand in Resend: Webhooks → Add endpoint →
 * https://learn.chitta.cloud/api/webhooks/resend, and the signing secret it shows goes in RESEND_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return new Response("Not configured", { status: 501 });

  const payload = await req.text();
  const id = req.headers.get("svix-id");
  const ok = verifySvixSignature({ secret, id, timestamp: req.headers.get("svix-timestamp"), signature: req.headers.get("svix-signature"), payload });
  if (!ok || !id) return new Response("Invalid signature", { status: 401 });

  let body: unknown;
  try {
    body = JSON.parse(payload);
  } catch {
    return new Response("Bad payload", { status: 400 });
  }
  const plan = planEmailEvent(body);
  // Unknown event types, and emails we didn't log (e.g. another app on the same Resend account), are fine — 200 so
  // Resend doesn't keep retrying them.
  if (!plan) return Response.json({ ok: true, ignored: true });
  const matched = await applyEmailEvent(plan, id);
  return Response.json({ ok: true, matched });
}
