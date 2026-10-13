import { describe, expect, it } from "vitest";
import type { Block } from "@/content/types";
import { getLesson, allLessons } from "@/content";
import { chunkBlocks, lessonSteps } from "./steps";

const md = (s: string): Block => ({ kind: "md", md: s });
const callout = (s: string): Block => ({ kind: "callout", tone: "tip", md: s });

describe("chunkBlocks", () => {
  it("starts a new screen at each sub-heading and titles it", () => {
    const chunks = chunkBlocks([md("Intro text."), md("### Road fuel\nThree options."), md("### Mixed use\nApportion.")], "The rules");
    expect(chunks.map((c) => c.title)).toEqual(["The rules", "Road fuel", "Mixed use"]);
  });
  it("keeps a callout on the same screen as the text it illustrates", () => {
    const chunks = chunkBlocks([md("Rule text."), callout("Watch out for this.")], "The rules");
    expect(chunks).toHaveLength(1);
    expect(chunks[0].blocks).toHaveLength(2);
  });
  it("splits long plain text into several screens", () => {
    const long = "x".repeat(900);
    const chunks = chunkBlocks([md(long), md(long), md(long)], "The rules");
    expect(chunks.length).toBeGreaterThanOrEqual(2);
    expect(chunks[1].title).toBe("The rules (continued)");
  });
});

describe("lessonSteps on real lessons", () => {
  it("gives every lesson an overview, at least one theory step, every exercise and a final quiz", () => {
    for (const ref of allLessons()) {
      const steps = lessonSteps(ref.lesson);
      expect(steps[0].kind).toBe("overview");
      expect(steps.at(-1)!.kind).toBe("quiz");
      expect(steps.filter((s) => s.kind === "theory").length).toBeGreaterThan(0);
      expect(steps.filter((s) => s.kind === "exercise").length).toBe(ref.lesson.exercises.length);
      // Every body block appears exactly once across the theory steps.
      const shown = steps.flatMap((s) => (s.kind === "theory" ? s.blocks : []));
      expect(shown.length).toBe(ref.lesson.body.length);
    }
  });
  it("keeps steps screen-sized for the model lesson", () => {
    const steps = lessonSteps(getLesson("vat/input-tax-what-you-can-claim")!.lesson);
    expect(steps.length).toBeGreaterThanOrEqual(10);
    expect(steps.length).toBeLessThanOrEqual(25);
  });
});
