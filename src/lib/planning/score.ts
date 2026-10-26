/*
 * Automatic scoring of a finished planning scenario, so every change to the research or the writer can be measured
 * against the same five starter scenarios without a human reading each report. It checks things a machine can check
 * reliably: the run completed, every issue was answered, quotations verified, figures grounded, and the report covers
 * the topics a competent report on that situation cannot leave out. It does NOT judge whether the advice is sound:
 * that still needs a qualified reviewer. Pure, so it's unit-tested.
 */
import { reportText } from "./report";
import type { PlanningIssue, PlanningReport } from "./types";

export interface Check {
  name: string;
  pass: boolean;
  detail: string;
}

export interface Score {
  checks: Check[];
  passed: number;
  total: number;
  pct: number;
}

export interface ScoreInput {
  report: PlanningReport | null;
  issues: PlanningIssue[];
  /** Figures the report states that appear nowhere in the situation or findings (see ungroundedFigures). */
  ungrounded: string[];
  /** Topics the report must cover, as case-insensitive regular expressions. */
  mustCover: string[];
  /** Extra text the topics may be found in, e.g. the researched answers. */
  evidenceTexts?: string[];
}

export function scoreScenario(i: ScoreInput): Score {
  const checks: Check[] = [];
  const add = (name: string, pass: boolean, detail: string) => checks.push({ name, pass, detail });

  add("Report written", !!i.report, i.report ? "yes" : "no report");
  const answered = i.issues.filter((x) => x.status === "answered").length;
  add("Every issue answered", answered === i.issues.length && i.issues.length >= 2, `${answered} of ${i.issues.length}`);
  const checked = i.issues.reduce((n, x) => n + (x.checked ?? 0), 0);
  const verified = i.issues.reduce((n, x) => n + (x.verified ?? 0), 0);
  add("Quotations verified (at least 90%)", checked > 0 && verified / checked >= 0.9, `${verified} of ${checked}`);

  if (i.report) {
    add("At least two options compared", i.report.options.length >= 2, `${i.report.options.length} options`);
    const unsourced = i.report.options.filter((o) => o.issueRefs.length === 0).length;
    add("Every option traced to researched issues", unsourced === 0, unsourced ? `${unsourced} option(s) cite no issue` : "all cited");
    add("Next steps given", i.report.nextSteps.length >= 3, `${i.report.nextSteps.length} steps`);
    add("Figures grounded (at most one unexplained)", i.ungrounded.length <= 1, i.ungrounded.length ? i.ungrounded.join(", ") : "none");
    const haystack = [reportText(i.report), ...i.report.notCovered, ...i.issues.flatMap((x) => [x.title, x.shortAnswer ?? ""]), ...(i.evidenceTexts ?? [])].join("\n");
    for (const topic of i.mustCover) add(`Covers: ${topic.split("|")[0]}`, new RegExp(topic, "i").test(haystack), "");
  } else {
    for (const topic of i.mustCover) add(`Covers: ${topic.split("|")[0]}`, false, "no report");
  }

  const passed = checks.filter((c) => c.pass).length;
  return { checks, passed, total: checks.length, pct: Math.round((passed / checks.length) * 100) };
}
