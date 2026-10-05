// Applies ./drizzle migrations to the real Postgres database during `vercel build`, then syncs the
// internal Capto workspace flag for PLATFORM_ADMIN_EMAILS owners.
// A no-op without a postgres DATABASE_URL (local dev uses PGlite, which does both itself on first use).
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import ws from "ws";
import { PLATFORM_ROLE_SYNC_SQL, PLATFORM_SYNC_SQL, platformAdminEmails } from "../src/lib/db/platformSync.mjs";

const url = process.env.DATABASE_URL ?? "";
if (!/^postgres(ql)?:\/\//.test(url)) {
  console.log("[migrate] no postgres DATABASE_URL — skipping");
  process.exit(0);
}
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: url });
await migrate(drizzle(pool), { migrationsFolder: "./drizzle" });
console.log("[migrate] migrations applied");
const emails = platformAdminEmails();
if (emails.length) {
  const res = await pool.query(PLATFORM_SYNC_SQL, [emails]);
  const roles = await pool.query(PLATFORM_ROLE_SYNC_SQL, [emails]);
  console.log(`[migrate] internal workspace sync: ${res.rowCount ?? 0} workspace(s), ${roles.rowCount ?? 0} super admin(s) updated`);
}
await pool.end();
