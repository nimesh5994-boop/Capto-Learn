import "server-only";
import { createHash, randomBytes } from "node:crypto";

/** A random URL-safe token plus the hash we store — the raw token only ever lives in the link. */
export function newToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString("base64url");
  return { token, hash: hashToken(token) };
}

export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");
