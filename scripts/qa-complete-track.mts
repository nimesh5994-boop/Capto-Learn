/*
 * LOCAL-ONLY QA helper: marks every lesson of one course complete for one QA account, so certificates and
 * skill scores can be checked without clicking through a whole course. Stop the dev server first (PGlite).
 *
 *   npx tsx scripts/qa-complete-track.mts <track-slug> [email]     (default email qa-staff@captolearn.test)
 */
import path from "node:path";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "../src/lib/db/schema.ts";
import { trackLessons } from "../src/content/index.ts";

config({ path: ".env.local" });
if (/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL ?? "")) {
  console.error("Refusing: DATABASE_URL points at a real Postgres database. This script is for the local PGlite database only.");
  process.exit(1);
}
const [slug, email = "qa-staff@captolearn.test"] = process.argv.slice(2);
if (!email.endsWith("@captolearn.test")) {
  console.error("Refusing: QA accounts only (@captolearn.test).");
  process.exit(1);
}
const refs = trackLessons(slug ?? "");
if (!refs.length) {
  console.error(`Unknown course "${slug}".`);
  process.exit(1);
}

const db = drizzle(new PGlite(path.join(process.cwd(), ".data", "pglite")), { schema });
const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
if (!user) {
  console.error(`No user ${email} — run scripts/seed-qa.mts first.`);
  process.exit(1);
}
const now = Date.now();
for (const [i, r] of refs.entries()) {
  const score = 70 + ((i * 7) % 31);
  const values = { status: "completed" as const, bestQuizScore: score, lastQuizScore: score, quizAttempts: 1, completedAt: new Date(now - (refs.length - i) * 3_600_000), updatedAt: new Date() };
  await db
    .insert(schema.lessonProgress)
    .values({ organizationId: user.organizationId, userId: user.id, lessonId: r.id, trackSlug: slug, ...values })
    .onConflictDoUpdate({ target: [schema.lessonProgress.userId, schema.lessonProgress.lessonId], set: values });
}
console.log(`Marked ${refs.length} ${slug} lessons complete for ${email}.`);
process.exit(0);
