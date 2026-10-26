/*
 * Checks applied to the written-up planning report before anyone sees it. The AI writes the report from the issue
 * findings only; these steps make sure it can't point at an issue that doesn't exist and can't sound more certain than
 * the research behind it. Pure, so it's unit-tested.
 */
import type { IssueConfidence, PlanningIssue, PlanningOption, PlanningReport } from "./types";

const RANK: Record<IssueConfidence, number> = { low: 0, medium: 1, high: 2 };

/** The report's confidence can't exceed its weakest answered issue, and drops a level when any issue got no answer. */
export function capConfidence(claimed: IssueConfidence, issues: PlanningIssue[]): IssueConfidence {
  let level = claimed;
  for (const i of issues) {
    if (i.status !== "answered" || !i.confidence) {
      if (RANK[level] > RANK.medium) level = "medium";
      continue;
    }
    if (RANK[i.confidence] < RANK[level]) level = i.confidence;
  }
  return level;
}

/** Keeps only references to issues that exist (e.g. "I2"), in a tidy order and without repeats. */
export function cleanRefs(refs: string[], issues: PlanningIssue[]): string[] {
  const known = new Set(issues.map((i) => i.id));
  return [...new Set(refs.map((r) => r.trim().toUpperCase()).filter((r) => known.has(r)))];
}

/** Issues that produced no usable answer, worded for the "not covered" list. */
export function unansweredNotes(issues: PlanningIssue[]): string[] {
  return issues.filter((i) => i.status !== "answered").map((i) => `${i.id} — ${i.title}: no answer was produced${i.error ? ` (${i.error})` : ""}. Research this separately before relying on the report.`);
}

type Drafted = Omit<PlanningReport, "confidence" | "model" | "generatedAt" | "notCovered"> & { notCovered: string[]; confidence: IssueConfidence };

export function finaliseReport(draft: Drafted, issues: PlanningIssue[], model: string, now = new Date()): PlanningReport {
  const options: PlanningOption[] = draft.options.map((o) => ({ ...o, issueRefs: cleanRefs(o.issueRefs, issues) }));
  const notCovered = [...draft.notCovered, ...unansweredNotes(issues)];
  return {
    ...draft,
    options,
    recommendation: { ...draft.recommendation, issueRefs: cleanRefs(draft.recommendation.issueRefs, issues) },
    antiAvoidance: draft.antiAvoidance.map((a) => ({ ...a, issueRefs: cleanRefs(a.issueRefs, issues) })),
    notCovered,
    confidence: capConfidence(draft.confidence, issues),
    model,
    generatedAt: now.toISOString(),
  };
}

/** The issue findings as the write-up model reads them, trimmed to `maxChars` (each issue gets an equal share). */
export function findingsText(
  issues: { issue: PlanningIssue; points: { heading: string; text: string; verified: boolean }[]; caveats: string[] }[],
  maxChars: number
): string {
  const share = Math.max(800, Math.floor(maxChars / Math.max(1, issues.length)));
  return issues
    .map(({ issue, points, caveats }) => {
      if (issue.status !== "answered") return `<issue id="${issue.id}" title="${issue.title.replace(/"/g, "'")}" status="no answer">No answer was produced for this issue.</issue>`;
      const head = `Question: ${issue.question}\nShort answer: ${issue.shortAnswer ?? ""}\nConfidence: ${issue.confidence ?? "unknown"}`;
      const body = points.map((p) => `- ${p.heading}${p.verified ? "" : " [UNVERIFIED — quote not found in source]"}: ${p.text}`).join("\n");
      const cav = caveats.length ? `\nCaveats: ${caveats.join(" | ")}` : "";
      const text = `${head}\n${body}${cav}`;
      return `<issue id="${issue.id}" title="${issue.title.replace(/"/g, "'")}">\n${text.length > share ? `${text.slice(0, share)}…` : text}\n</issue>`;
    })
    .join("\n\n");
}

/** Every £ amount and percentage in a piece of text, as written. */
export function extractFigures(text: string): string[] {
  return [...text.matchAll(/£\s?\d(?:[\d,]*\d)?(?:\.\d+)?(?:\s?(?:k|m|bn|million|billion)\b)?|\d+(?:\.\d+)?\s?(?:%|per\s?cent)/gi)].map((m) => m[0]);
}

/** Figures compare equal regardless of spacing, commas, case and "per cent" vs "%". */
const normFigure = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s?per\s?cent/g, "%")
    .replace(/(\d),(?=\d{3}\b)/g, "$1") // thousands separators only: "£12,570" -> "£12570", but "5,16%" stays two things
    .replace(/£\s+/g, "£")
    .replace(/(\d)\s+(%|k\b|m\b|bn\b)/g, "$1$2")
    .replace(/(\d)\s*(million)\b/g, "$1m")
    .replace(/(\d)\s*(billion)\b/g, "$1bn");

/** All the text of a written report that a reader could take figures from. */
export function reportText(r: PlanningReport): string {
  return [
    r.executiveSummary,
    r.recommendation.headline,
    r.recommendation.reasoning,
    ...r.recommendation.conditions,
    ...r.options.flatMap((o) => [o.name, o.summary, o.suitableWhen, o.taxEffect, ...o.advantages, ...o.disadvantages, ...o.risks]),
    ...r.antiAvoidance.map((a) => a.point),
    ...r.assumptions,
    ...r.informationNeeded,
    ...r.nextSteps,
  ].join("\n");
}

/**
 * Figures the report states that appear in neither the client's situation nor the researched findings. The writer is
 * told not to use figures from memory; this is the check that it didn't. Pure, so it's unit-tested.
 */
export function ungroundedFigures(report: PlanningReport, groundTexts: string[]): string[] {
  const ground = normFigure(groundTexts.join("\n"));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const f of extractFigures(reportText(report))) {
    const n = normFigure(f);
    if (seen.has(n)) continue;
    seen.add(n);
    // Match on a digit boundary so "£5,000" is not "found" inside "£15,000".
    const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const found = new RegExp(`(^|[^\\d.])${escaped}(?!\\d)`).test(ground);
    if (!found) out.push(f.trim());
  }
  return out;
}
