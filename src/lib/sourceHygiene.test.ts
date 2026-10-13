import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Invisible control characters (e.g. a stray backspace in a regex) silently break code — keep them out of the source. */
describe("source hygiene", () => {
  const files = (readdirSync(join(process.cwd(), "src"), { recursive: true }) as string[]).filter((f) => /\.(ts|tsx|css)$/.test(f));
  it("has no hidden control characters", () => {
    const bad = files.filter((f) => /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(readFileSync(join(process.cwd(), "src", f), "utf8")));
    expect(bad).toEqual([]);
  });
});
