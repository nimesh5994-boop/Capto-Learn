import { describe, expect, it } from "vitest";
import { signSvixPayload, verifySvixSignature } from "./webhookSignature";

// A made-up secret in Svix's format ("whsec_" + base64 key).
const secret = `whsec_${Buffer.from("capto-learn-test-signing-key-123").toString("base64")}`;
const payload = JSON.stringify({ type: "email.delivered", created_at: "2026-10-21T10:00:00.000Z", data: { email_id: "re_123" } });
const now = new Date("2026-10-21T10:00:30Z");
const ts = String(Math.floor(now.getTime() / 1000));
const id = "msg_2abc";

const good = () => ({ secret, id, timestamp: ts, signature: signSvixPayload(secret, id, ts, payload), payload, now });

describe("verifySvixSignature", () => {
  it("accepts a correctly signed request", () => {
    expect(verifySvixSignature(good())).toBe(true);
  });
  it("matches the Svix reference vector", () => {
    // From Svix's documentation of the signing scheme.
    expect(
      verifySvixSignature({
        secret: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
        id: "msg_p5jXN8AQM9LWM0D4loKWxJek",
        timestamp: "1614265330",
        signature: "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
        payload: '{"test": 2432232314}',
        now: new Date(1614265330 * 1000),
      })
    ).toBe(true);
  });
  it("accepts when any one of several signatures matches (secret rotation)", () => {
    const g = good();
    expect(verifySvixSignature({ ...g, signature: `v1,bm90LXRoZS1yaWdodC1vbmU= ${g.signature}` })).toBe(true);
  });
  it("rejects a tampered body, id or timestamp", () => {
    const g = good();
    expect(verifySvixSignature({ ...g, payload: payload.replace("delivered", "bounced") })).toBe(false);
    expect(verifySvixSignature({ ...g, id: "msg_other" })).toBe(false);
    expect(verifySvixSignature({ ...g, timestamp: String(Number(ts) + 1) })).toBe(false);
  });
  it("rejects the wrong secret", () => {
    const other = `whsec_${Buffer.from("some-other-key").toString("base64")}`;
    expect(verifySvixSignature({ ...good(), secret: other })).toBe(false);
  });
  it("rejects old or future timestamps (replay)", () => {
    const g = good();
    expect(verifySvixSignature({ ...g, now: new Date(now.getTime() + 6 * 60_000) })).toBe(false);
    expect(verifySvixSignature({ ...g, now: new Date(now.getTime() - 6 * 60_000) })).toBe(false);
  });
  it("rejects missing or malformed headers", () => {
    const g = good();
    expect(verifySvixSignature({ ...g, signature: null })).toBe(false);
    expect(verifySvixSignature({ ...g, id: null })).toBe(false);
    expect(verifySvixSignature({ ...g, timestamp: null })).toBe(false);
    expect(verifySvixSignature({ ...g, timestamp: "soon" })).toBe(false);
    expect(verifySvixSignature({ ...g, signature: g.signature.replace("v1,", "v2,") })).toBe(false);
    expect(verifySvixSignature({ ...g, signature: "garbage" })).toBe(false);
    expect(verifySvixSignature({ ...g, secret: "" })).toBe(false);
  });
});
