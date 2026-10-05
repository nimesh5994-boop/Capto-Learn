import "server-only";
import { headers } from "next/headers";
import { getDb } from "@/lib/db/client";
import { auditLog } from "@/lib/db/schema";

export async function requestIp(): Promise<string | null> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

/** Records a firm-level audit event. Never throws — an audit write must not break the action it describes. */
export async function audit(
  actor: { organizationId: string; userId: string | null; name: string | null },
  action: string,
  summary: string,
  target?: { type: string; id: string }
): Promise<void> {
  try {
    const db = await getDb();
    await db.insert(auditLog).values({
      organizationId: actor.organizationId,
      actorUserId: actor.userId,
      actorName: actor.name,
      action,
      summary,
      targetType: target?.type ?? null,
      targetId: target?.id ?? null,
      ip: await requestIp(),
    });
  } catch (err) {
    console.error("audit write failed", err);
  }
}

export const actorOf = (ctx: { user: { id: string; name: string; organizationId: string } }) => ({
  organizationId: ctx.user.organizationId,
  userId: ctx.user.id,
  name: ctx.user.name,
});
