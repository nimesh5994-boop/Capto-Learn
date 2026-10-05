// Validates one or more content tracks: `npx tsx scripts/validate-content.mts vat payroll` (no args = every track folder).
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { trackProblems } from "../src/content/validate.ts";
import type { Track } from "../src/content/types.ts";

const dir = path.join(process.cwd(), "src", "content", "tracks");
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(dir).filter((d) => existsSync(path.join(dir, d, "index.ts")));

let failed = 0;
for (const slug of slugs) {
  const file = path.join(dir, slug, "index.ts");
  const mod = (await import(pathToFileURL(file).href)) as { default?: Track; track?: Track };
  const track = mod.default ?? mod.track;
  if (!track) {
    console.error(`✗ ${slug}: index.ts must \`export default\` a Track`);
    failed++;
    continue;
  }
  const errors = trackProblems(track);
  if (track.slug !== slug) errors.unshift(`track slug "${track.slug}" doesn't match folder "${slug}"`);
  const lessons = track.modules.reduce((n, m) => n + m.lessons.length, 0);
  const exercises = track.modules.reduce((n, m) => n + m.lessons.reduce((k, l) => k + l.exercises.length + l.quiz.length, 0), 0);
  if (errors.length) {
    failed++;
    console.error(`✗ ${slug}: ${errors.length} problem(s)`);
    for (const e of errors) console.error(`   - ${e}`);
  } else {
    console.log(`✓ ${slug}: ${track.modules.length} modules, ${lessons} lessons, ${exercises} questions`);
  }
}
process.exit(failed ? 1 : 0);
