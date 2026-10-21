import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies a Svix-signed webhook (Resend signs its webhooks with Svix). Done by hand with node:crypto rather than the
 * `svix` package — the scheme is small and well specified:
 *   signed content = `${svix-id}.${svix-timestamp}.${raw body}`
 *   signature      = base64(HMAC-SHA256(key, signed content)), key = base64-decoded secret after the "whsec_" prefix
 *   svix-signature = space-separated "v1,<signature>" entries (several while a secret is being rotated)
 * The timestamp must be within `toleranceSec` of now, which stops an intercepted request being replayed later.
 */
export function verifySvixSignature(input: {
  secret: string;
  id: string | null;
  timestamp: string | null;
  signature: string | null;
  payload: string;
  now?: Date;
  toleranceSec?: number;
}): boolean {
  const { secret, id, timestamp, signature, payload } = input;
  if (!secret || !id || !timestamp || !signature) return false;
  if (!/^\d+$/.test(timestamp)) return false;
  const nowSec = Math.floor((input.now ?? new Date()).getTime() / 1000);
  if (Math.abs(nowSec - Number(timestamp)) > (input.toleranceSec ?? 300)) return false;

  let key: Buffer;
  try {
    key = Buffer.from(secret.startsWith("whsec_") ? secret.slice(6) : secret, "base64");
  } catch {
    return false;
  }
  if (!key.length) return false;
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${payload}`).digest();

  for (const part of signature.split(" ")) {
    const [version, sig] = part.split(",", 2);
    if (version !== "v1" || !sig) continue;
    const given = Buffer.from(sig, "base64");
    if (given.length === expected.length && timingSafeEqual(given, expected)) return true;
  }
  return false;
}

/** Produces a valid svix-signature header value — used by the tests (and handy for local manual testing). */
export function signSvixPayload(secret: string, id: string, timestamp: string, payload: string): string {
  const key = Buffer.from(secret.startsWith("whsec_") ? secret.slice(6) : secret, "base64");
  return `v1,${createHmac("sha256", key).update(`${id}.${timestamp}.${payload}`).digest("base64")}`;
}
