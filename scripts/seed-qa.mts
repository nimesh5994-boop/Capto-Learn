/*
 * LOCAL-ONLY QA seed. Refuses to run against a real Postgres URL — production accounts are created
 * by people signing up / accepting invitations, never by script. Stop the dev server first (PGlite is single-process).
 *
 *   npx tsx scripts/seed-qa.mts        (reads QA_PASSWORD from .env.local)
 *
 * Creates (or updates):
 *  - "QA Test Practice" (customer firm, Professional plan): qa@ (owner), qa-manager@, qa-staff@, qa-staff2@, qa-viewer@captolearn.test
 *  - "Capto (QA internal)" internal workspace: qa-platform@captolearn.test as Super admin, qa-reviewer@ as Content reviewer
 * All share QA_PASSWORD.
 */
import path from "node:path";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "../src/lib/db/schema.ts";

config({ path: ".env.local" });
if (/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL ?? "")) {
  console.error("Refusing to seed: DATABASE_URL points at a real Postgres database. This script is for the local PGlite database only.");
  process.exit(1);
}
const qaPassword = process.env.QA_PASSWORD;
if (!qaPassword || qaPassword.length < 10) {
  console.error("Set QA_PASSWORD (10+ characters) in .env.local.");
  process.exit(1);
}

const client = new PGlite(path.join(process.cwd(), ".data", "pglite"));
const db = drizzle(client, { schema });
await migrate(db, { migrationsFolder: "./drizzle" });

async function ensureFirm(name: string, ownerEmail: string, plan: string, kind: schema.OrgKind) {
  const [existingOwner] = await db.select().from(schema.users).where(eq(schema.users.email, ownerEmail));
  const values = { plan, kind, status: "active" as const, trialEndsAt: kind === "internal" ? null : new Date(Date.now() + 365 * 86_400_000) };
  if (existingOwner) {
    await db.update(schema.organizations).set(values).where(eq(schema.organizations.id, existingOwner.organizationId));
    return existingOwner.organizationId;
  }
  const [org] = await db.insert(schema.organizations).values({ name, email: ownerEmail, ...values }).returning({ id: schema.organizations.id });
  return org.id;
}

async function ensureUser(orgId: string, email: string, name: string, role: schema.Role, platformRole: string | null = null) {
  const passwordHash = await bcrypt.hash(qaPassword!, 12);
  const [u] = await db.select().from(schema.users).where(eq(schema.users.email, email));
  if (u) {
    if (u.organizationId !== orgId) throw new Error(`${email} already belongs to another firm`);
    await db.update(schema.users).set({ role, passwordHash, status: "active", customRoleId: null, platformRole }).where(eq(schema.users.id, u.id));
  } else await db.insert(schema.users).values({ organizationId: orgId, email, name, role, passwordHash, platformRole });
  console.log(`  ✓ ${(platformRole ?? role).padEnd(16)} ${email}`);
}

console.log("QA Test Practice (Professional plan):");
const qaOrg = await ensureFirm("QA Test Practice", "qa@captolearn.test", "professional", "customer");
await ensureUser(qaOrg, "qa@captolearn.test", "QA Owner", "owner");
await ensureUser(qaOrg, "qa-manager@captolearn.test", "QA Manager", "manager");
await ensureUser(qaOrg, "qa-staff@captolearn.test", "QA Staff", "staff");
await ensureUser(qaOrg, "qa-staff2@captolearn.test", "QA Trainee Two", "staff");
await ensureUser(qaOrg, "qa-viewer@captolearn.test", "QA Viewer", "viewer");

console.log("Capto (QA internal) workspace:");
const internal = await ensureFirm("Capto (QA internal)", "qa-platform@captolearn.test", "practice", "internal");
await ensureUser(internal, "qa-platform@captolearn.test", "QA Platform Admin", "owner", "super_admin");
await ensureUser(internal, "qa-reviewer@captolearn.test", "QA Reviewer", "staff", "content_reviewer");

await client.close();
console.log("Done.");
