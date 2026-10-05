// Marks every workspace owned by a PLATFORM_ADMIN_EMAILS user as the internal Capto workspace:
// never billed, never on trial, never suspended, excluded from customer metrics.
// Idempotent — runs after migrations on every deploy (and on local PGlite start-up).
export const PLATFORM_SYNC_SQL = `
UPDATE organizations
   SET kind = 'internal', plan = 'practice', trial_ends_at = NULL, status = 'active', suspended_reason = NULL
 WHERE id IN (SELECT organization_id FROM users WHERE lower(email) = ANY($1::text[]) AND role = 'owner')
   AND (kind <> 'internal' OR plan <> 'practice' OR trial_ends_at IS NOT NULL OR status <> 'active')`;

/** Bootstrap emails always hold the Super admin platform role, so the operator can never be locked out. */
export const PLATFORM_ROLE_SYNC_SQL = `
UPDATE users SET platform_role = 'super_admin'
 WHERE lower(email) = ANY($1::text[]) AND platform_role IS DISTINCT FROM 'super_admin'`;

export function platformAdminEmails() {
  return (process.env.PLATFORM_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
