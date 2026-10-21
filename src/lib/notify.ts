import "server-only";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customRoles, emailLog, users, type Organization } from "@/lib/db/schema";
import { orgHasFeature } from "@/lib/plans";
import { permissionsFor, type Permission } from "@/lib/rbac";
import type { FirmBrand } from "@/lib/emailContent";

/** A firm's name and brand colour, for emails sent on its behalf. */
export const firmBrandOf = (org: Pick<Organization, "name" | "brandColor">): FirmBrand => ({ name: org.name, color: org.brandColor });

/** Active people in a firm who hold a permission (custom roles count only while the plan includes them). */
export async function activeUsersWith(org: Organization, permission: Permission): Promise<{ id: string; name: string; email: string }[]> {
  const db = await getDb();
  const rows = await db
    .select({ u: users, cr: customRoles })
    .from(users)
    .leftJoin(customRoles, eq(customRoles.id, users.customRoleId))
    .where(and(eq(users.organizationId, org.id), eq(users.status, "active")));
  const custom = orgHasFeature(org, "customRoles");
  return rows.filter((r) => permissionsFor(r.u.role, r.cr && custom ? r.cr.permissions : null).has(permission)).map((r) => ({ id: r.u.id, name: r.u.name, email: r.u.email }));
}

/** Whether an email of this kind about this record was already sent (or attempted) — for one-off emails. */
export async function alreadyEmailed(kind: (typeof emailLog.$inferSelect)["kind"], relatedId: string): Promise<boolean> {
  const db = await getDb();
  const [row] = await db
    .select({ id: emailLog.id })
    .from(emailLog)
    .where(and(eq(emailLog.kind, kind), eq(emailLog.relatedId, relatedId)))
    .limit(1);
  return Boolean(row);
}
