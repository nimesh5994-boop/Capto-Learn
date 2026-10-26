/*
 * Tax planning memorandum: turns a stored scenario into the same neutral blocks the Ask Capto report uses, so the
 * Word and PDF renderers draw it identically. Conclusion first, then options and risks, matters to confirm, a
 * review sign-off and an appendix holding the researched issues and the quotations relied on.
 * Pure (no database, no rendering), so it's unit-tested.
 */
import type { Block } from "@/lib/research/report";
import type { ResearchAnswer } from "@/lib/research/types";
import { coverageLine, type PlanningIssue, type PlanningReport, type ScenarioInput } from "./types";

export interface MemoMeta {
  firm: string;
  docRef: string;
  preparedBy: string;
  /** Client / matter reference typed by the preparer, if any. */
  reference?: string;
  url: string;
  createdAt: Date | string;
  exportedAt: Date;
  /** The firm's review of the scenario, when there is one. */
  review?: { status: "approved" | "changes"; by: string | null; at: Date | string | null; note: string | null } | null;
}

const LONG_DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
const fmtDate = (d: Date | string) => LONG_DATE.format(new Date(d));

/** A stable, human-readable reference for a scenario, e.g. "TP-A6509153". */
export const planningRef = (id: string): string => `TP-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;

const CONFIDENCE: Record<PlanningReport["confidence"], string> = {
  high: "High: the research directly settles every issue the recommendation rests on.",
  medium: "Medium: the recommendation draws on inference across sources, or an unverified point or unanswered issue sits behind it.",
  low: "Low: the research leaves material gaps. Senior review is essential before relying on this.",
};

/** The memorandum's status line: reflects the firm's recorded review. */
export function statusLine(review: MemoMeta["review"]): string {
  if (review?.status === "approved") return `Reviewed and approved by ${review.by ?? "a reviewer"}${review.at ? ` on ${fmtDate(review.at)}` : ""}${review.note ? `: ${review.note}` : "."} Not advice to the client until issued by a qualified adviser.`;
  if (review?.status === "changes") return `Reviewer asked for changes${review.by ? ` (${review.by})` : ""}${review.note ? `: ${review.note}` : "."} Do not rely on this memorandum until they are made.`;
  return "Draft for review. Not advice to the client and not to be relied on until reviewed and approved (see Review and approval).";
}

const para = (text: string, tone?: "muted" | "warning"): Block => ({ kind: "p", runs: [{ text }], tone });
const bullets = (items: string[]): Block[] => (items.length ? [{ kind: "list", ordered: false, items: items.map((t) => [{ text: t }]) }] : []);
const refs = (r: string[]) => (r.length ? ` (${r.join(", ")})` : "");

export function buildPlanningMemo(title: string, input: ScenarioInput, report: PlanningReport | null, issues: PlanningIssue[], answers: Map<string, ResearchAnswer>, meta: MemoMeta): Block[] {
  let n = 0;
  const section = (text: string): Block => ({ kind: "h2", text: `${++n}. ${text}` });
  const out: Block[] = [{ kind: "title", text: title }];
  out.push({ kind: "meta", label: "Document reference", value: meta.docRef });
  if (meta.reference) out.push({ kind: "meta", label: "Client / matter", value: meta.reference });
  out.push(
    { kind: "meta", label: "Prepared by", value: `${meta.preparedBy}, ${meta.firm}` },
    { kind: "meta", label: "Date of research", value: fmtDate(report?.generatedAt ?? meta.createdAt) },
    { kind: "meta", label: "Date issued", value: fmtDate(meta.exportedAt) }
  );
  if (input.taxYear) out.push({ kind: "meta", label: "Tax year", value: input.taxYear });
  out.push(
    { kind: "meta", label: "Status", value: statusLine(meta.review) },
    { kind: "meta", label: "Classification", value: "Confidential: internal working paper" }
  );

  if (report) {
    out.push(section("Summary and recommendation"), para(report.executiveSummary));
    out.push({ kind: "p", runs: [{ text: `Recommendation${refs(report.recommendation.issueRefs)}: `, bold: true }, { text: report.recommendation.headline }] }, para(report.recommendation.reasoning));
    if (report.recommendation.conditions.length) out.push({ kind: "p", runs: [{ text: "This holds if:", bold: true }] }, ...bullets(report.recommendation.conditions));
    out.push(para(`Confidence: ${CONFIDENCE[report.confidence]} ${coverageLine(issues)}`, "muted"));
  } else {
    out.push(section("Status"), para("A report could not be written for this scenario. The researched issues are set out in Appendix A.", "warning"));
  }

  out.push(
    section("The situation and objectives"),
    { kind: "p", runs: [{ text: "Situation: ", bold: true }, { text: input.facts }] },
    { kind: "p", runs: [{ text: "Objectives: ", bold: true }, { text: input.objectives }] },
    ...(input.constraints ? [{ kind: "p", runs: [{ text: "Constraints: ", bold: true }, { text: input.constraints }] } as Block] : []),
    para("No other facts have been assumed beyond those listed under assumptions. If the client's circumstances differ, the conclusions may not apply.", "muted")
  );

  if (report) {
    out.push(section("Options"));
    const sec = n;
    report.options.forEach((o, i) => {
      out.push({ kind: "h3", text: `${sec}.${i + 1}  ${o.name}${refs(o.issueRefs)}` }, para(o.summary));
      if (o.suitableWhen) out.push({ kind: "p", runs: [{ text: "Suits: ", bold: true }, { text: o.suitableWhen }] });
      if (o.advantages.length) out.push({ kind: "p", runs: [{ text: "Advantages", bold: true }] }, ...bullets(o.advantages));
      if (o.disadvantages.length) out.push({ kind: "p", runs: [{ text: "Disadvantages", bold: true }] }, ...bullets(o.disadvantages));
      out.push({ kind: "p", runs: [{ text: "Tax effect: ", bold: true }, { text: o.taxEffect }] });
      if (o.risks.length) out.push({ kind: "p", runs: [{ text: "Risks", bold: true }] }, ...bullets(o.risks));
    });

    if (report.antiAvoidance.length) {
      out.push(section("Anti-avoidance, penalties and time limits"), { kind: "list", ordered: false, items: report.antiAvoidance.map((a) => [{ text: `${a.point}${refs(a.issueRefs)}` }]) });
    }
    if (report.notCovered.length) {
      out.push(section("Not settled by the research"), para("Do not rely on the following without further work.", "warning"), ...bullets(report.notCovered));
    }
    out.push(section("Matters to confirm before advising"));
    out.push({ kind: "list", ordered: true, items: [...report.informationNeeded.map((t) => [{ text: t }]), [{ text: "Check that the sources in Appendix A have not been updated since the date of research." }]] });
    if (report.assumptions.length) out.push({ kind: "h3", text: "Assumptions made" }, ...bullets(report.assumptions));
    out.push(section("Next steps"), { kind: "list", ordered: true, items: report.nextSteps.map((t) => [{ text: t }]) });
    out.push(para("This memorandum does not calculate tax. Work out the figures for each option separately (for example with the Capto calculators) before advising.", "muted"));
  }

  out.push(section("Review and approval"), para("Complete before this memorandum is relied on or its conclusions are shared with a client.", "muted"), {
    kind: "signoff",
    rows: [
      { role: "Prepared by", name: meta.preparedBy, date: fmtDate(meta.exportedAt) },
      { role: "Reviewed by", name: "", date: "" },
      { role: "Approved for client use", name: "", date: "" },
    ],
  });

  out.push({ kind: "h2", text: "Appendix A: Researched issues and evidence" });
  out.push(para("Each issue was researched separately from HMRC manuals, GOV.UK guidance and, where shown, the professional bodies. A quotation marked verified was found word for word in its source.", "muted"));
  for (const issue of issues) {
    out.push({ kind: "h3", text: `${issue.id}  ${issue.title}`, tag: issue.confidence ? `${issue.confidence[0].toUpperCase()}${issue.confidence.slice(1)} confidence` : "No answer" }, { kind: "p", runs: [{ text: "Question researched: ", bold: true }, { text: issue.question }] });
    const a = issue.queryId ? answers.get(issue.queryId) : undefined;
    if (!a) {
      out.push(para(issue.error ?? "No answer was produced for this issue.", "warning"));
      continue;
    }
    out.push({ kind: "p", runs: [{ text: "Finding: ", bold: true }, { text: a.shortAnswer }] });
    const cited = [...a.points, ...(a.steps ?? [])].flatMap((x) => x.citations);
    for (const s of a.sources) {
      const link = s.kind === "lesson" ? `${meta.url.replace(/\/planning\/.*$/, "")}${s.url}` : s.url;
      out.push({ kind: "p", tone: "muted", runs: [{ text: `${issue.id}/${s.id} · ${s.title} · ${s.publisher}${s.updatedAt ? ` · last updated ${fmtDate(s.updatedAt)}` : ""} · ` }, { text: link, link }] });
      for (const c of cited.filter((x) => x.sourceId === s.id)) out.push({ kind: "quote", text: c.quote, source: `${issue.id}/${s.id}`, verified: c.verified });
    }
    if (a.professional) out.push({ kind: "p", tone: "muted", runs: [{ text: `Professional bodies (not verified by Capto): ${a.professional.summary}` }] });
  }

  out.push(
    { kind: "h2", text: "Appendix B: Important notice" },
    para(
      `This memorandum was prepared by ${meta.firm} using Ask Capto, a research tool that answers from official HMRC and GOV.UK guidance and checks each quotation against its source. The options, recommendation and risks were drafted from those findings only. It is a research aid and is not advice. A suitably qualified person must review it, applying professional judgement and the firm's quality management procedures, before it is relied on or its conclusions are given to a client. Guidance and law change, so check the sources have not been updated since the date of research.`,
      "muted"
    ),
    para("Contains public sector information licensed under the Open Government Licence v3.0.", "muted"),
    { kind: "p", tone: "muted", runs: [{ text: `Reference ${meta.docRef}. Live scenario: ` }, { text: meta.url, link: meta.url }] }
  );
  return out;
}
