import type { Block, Lesson } from "@/content/types";

/*
 * Splits a lesson into short, screen-sized steps for the step-by-step player:
 *   Overview → theory in bite-sized chunks → scenario → worked walkthrough → one exercise per step → quiz.
 * Pure, so the chunking rules are unit-tested. Theory is split at "###" sub-headings and otherwise by size,
 * keeping a callout / table / journal on the same screen as the text it illustrates.
 */

export type Step =
  | { kind: "overview" }
  | { kind: "theory"; title: string; blocks: Block[] }
  | { kind: "scenario" }
  | { kind: "walkthrough"; title: string; blocks: Block[] }
  | { kind: "exercise"; index: number }
  | { kind: "quiz" };

const TARGET_CHARS = 1100;

function blockSize(b: Block): number {
  if (b.kind === "md" || b.kind === "callout") return b.md.length + (b.kind === "callout" ? 120 : 0);
  if (b.kind === "table") return 200 + b.rows.flat().join(" ").length;
  return 250 + b.lines.length * 40;
}

/** The first "###"/"##" heading in a markdown block, used as the step's title. */
function headingOf(b: Block): string | null {
  if (b.kind !== "md") return null;
  const m = b.md.match(/^#{2,3}\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

export function chunkBlocks(blocks: Block[], fallbackTitle: string): { title: string; blocks: Block[] }[] {
  const out: { title: string; blocks: Block[] }[] = [];
  let cur: Block[] = [];
  let size = 0;
  let title = fallbackTitle;
  const flush = () => {
    if (cur.length) out.push({ title, blocks: cur });
    cur = [];
    size = 0;
  };
  for (const b of blocks) {
    const h = headingOf(b);
    const startsSection = b.kind === "md" && /^#{2,3}\s/.test(b.md.trimStart());
    // New screen at a sub-heading, or when plain text would overflow. Callouts/tables/journals stay with
    // the text before them (they illustrate it) unless the screen is already very full.
    const illustrative = b.kind !== "md";
    if (cur.length && (startsSection || (!illustrative && size + blockSize(b) > TARGET_CHARS) || (illustrative && size > TARGET_CHARS * 1.6))) flush();
    if (!cur.length) title = h ?? (out.length ? `${fallbackTitle} (continued)` : fallbackTitle);
    cur.push(b);
    size += blockSize(b);
  }
  flush();
  return out;
}

export function lessonSteps(lesson: Lesson): Step[] {
  const steps: Step[] = [{ kind: "overview" }];
  for (const c of chunkBlocks(lesson.body, "The rules")) steps.push({ kind: "theory", ...c });
  if (lesson.scenario) {
    steps.push({ kind: "scenario" });
    for (const c of chunkBlocks(lesson.scenario.walkthrough, "How to work it through")) steps.push({ kind: "walkthrough", ...c });
  }
  lesson.exercises.forEach((_, index) => steps.push({ kind: "exercise", index }));
  steps.push({ kind: "quiz" });
  return steps;
}

export function stepLabel(s: Step, exerciseCount: number): string {
  switch (s.kind) {
    case "overview":
      return "Overview";
    case "theory":
      return s.title;
    case "scenario":
      return "Real-life scenario";
    case "walkthrough":
      return s.title;
    case "exercise":
      return `Practice ${s.index + 1} of ${exerciseCount}`;
    case "quiz":
      return "Lesson quiz";
  }
}
