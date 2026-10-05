// Validates individual lesson files (even before a track's index.ts exists): `npx tsx scripts/validate-lessons.mts [track...]`
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { lessonProblems } from "../src/content/validate.ts";
import type { Lesson } from "../src/content/types.ts";

const dir = path.join(process.cwd(), "src", "content", "tracks");
const tracks = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(dir);
let bad = 0;
for (const t of tracks) {
  const ld = path.join(dir, t, "lessons");
  if (!existsSync(ld)) continue;
  for (const f of readdirSync(ld).filter((f) => f.endsWith(".ts"))) {
    try {
      const mod = (await import(pathToFileURL(path.join(ld, f)).href)) as { lesson?: Lesson };
      if (!mod.lesson) throw new Error("no `lesson` export");
      const p = lessonProblems(mod.lesson, `${t}/${mod.lesson.slug}`);
      if (mod.lesson.slug !== f.replace(/\.ts$/, "")) p.push(`slug "${mod.lesson.slug}" doesn't match file name`);
      console.log(`${p.length ? "✗" : "✓"} ${t}/${f} (${mod.lesson.level}, ${mod.lesson.exercises.length} ex, ${mod.lesson.quiz.length} quiz)`);
      p.forEach((e) => console.log(`   - ${e}`));
      if (p.length) bad++;
    } catch (e) {
      bad++;
      console.log(`✗ ${t}/${f}: ${(e as Error).message.split("\n")[0]}`);
    }
  }
}
process.exit(bad ? 1 : 0);
