import "server-only";
import path from "node:path";
import type { NeonDatabase } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

/*
 * Production: Neon over WebSockets (real BEGIN/COMMIT transactions, same as Capto Sign).
 * Local dev: an embedded PGlite database under .data/ when DATABASE_URL isn't a postgres URL,
 * so the app runs with zero external setup. Migrations from ./drizzle are applied on first use.
 *
 * Both drivers expose the same drizzle PgDatabase API, so the rest of the app only sees one type.
 */
export type DB = NeonDatabase<typeof schema>;

const url = process.env.DATABASE_URL ?? "";
const usePglite = !/^postgres(ql)?:\/\//.test(url);

type Holder = { db?: DB; ready?: Promise<void> };
const globalHolder = globalThis as unknown as { __captoLearnDb?: Holder };
const holder: Holder = (globalHolder.__captoLearnDb ??= {});

async function init(): Promise<DB> {
  if (usePglite) {
    const { PGlite } = await import("@electric-sql/pglite");
    const { drizzle } = await import("drizzle-orm/pglite");
    const { migrate } = await import("drizzle-orm/pglite/migrator");
    const dataDir = path.join(process.cwd(), ".data", "pglite");
    const client = new PGlite(dataDir);
    const pdb = drizzle(client, { schema });
    await migrate(pdb, { migrationsFolder: path.join(process.cwd(), "drizzle") });
    const { PLATFORM_ROLE_SYNC_SQL, PLATFORM_SYNC_SQL, platformAdminEmails } = await import("./platformSync.mjs");
    const emails = platformAdminEmails();
    if (emails.length) {
      await client.query(PLATFORM_SYNC_SQL, [emails]);
      await client.query(PLATFORM_ROLE_SYNC_SQL, [emails]);
    }
    return pdb as unknown as DB;
  }
  const { Pool, neonConfig } = await import("@neondatabase/serverless");
  const { drizzle } = await import("drizzle-orm/neon-serverless");
  const ws = (await import("ws")).default;
  neonConfig.webSocketConstructor = ws;
  return drizzle(new Pool({ connectionString: url }), { schema });
}

/** Resolves the shared database handle (a process-wide singleton — PGlite must never be opened twice). */
export async function getDb(): Promise<DB> {
  if (holder.db) return holder.db;
  holder.ready ??= init().then(
    (d) => {
      holder.db = d;
    },
    (err) => {
      holder.ready = undefined; // let the next request retry instead of caching the failure
      throw err;
    }
  );
  await holder.ready;
  return holder.db!;
}
