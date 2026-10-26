/* Shapes stored in planning_scenarios and shown on the Tax planning pages. Pure types. */

/** What the adviser tells us about the client's situation. No client names: the text is sent to the AI service. */
export interface ScenarioInput {
  title: string;
  /** Client or matter reference, printed on the memorandum and shown in the research register. */
  reference?: string;
  /** Tax year the plan is for, e.g. "2026/27", or "" when not year-specific. */
  taxYear: string;
  facts: string;
  objectives: string;
  constraints: string;
}

export type IssueConfidence = "high" | "medium" | "low";

/** One researched sub-question. The full cited answer lives in research_queries (queryId), so it is also in the register. */
export interface PlanningIssue {
  /** "I1", "I2"… — the label the report cites. */
  id: string;
  title: string;
  question: string;
  queryId: string | null;
  status: "answered" | "no_sources" | "failed";
  shortAnswer: string | null;
  confidence: IssueConfidence | null;
  error: string | null;
  /** Points whose quotation was found word for word in the source, out of all points checked. Absent on older scenarios. */
  verified?: number;
  checked?: number;
}

/** "4 of 5 issues answered; 28 of 30 points quote-verified" — the plain-facts counterpart of the confidence label. */
export function coverageLine(issues: PlanningIssue[]): string {
  const answered = issues.filter((i) => i.status === "answered").length;
  const checked = issues.reduce((n, i) => n + (i.checked ?? 0), 0);
  const verified = issues.reduce((n, i) => n + (i.verified ?? 0), 0);
  return `${answered} of ${issues.length} issues answered${checked ? `; ${verified} of ${checked} points supported by quotations verified word for word` : ""}.`;
}

export interface PlanningOption {
  name: string;
  summary: string;
  suitableWhen: string;
  advantages: string[];
  disadvantages: string[];
  taxEffect: string;
  risks: string[];
  issueRefs: string[];
}

export interface PlanningReport {
  executiveSummary: string;
  recommendation: { headline: string; reasoning: string; conditions: string[]; issueRefs: string[] };
  options: PlanningOption[];
  antiAvoidance: { point: string; issueRefs: string[] }[];
  assumptions: string[];
  informationNeeded: string[];
  nextSteps: string[];
  /** Things the research could not settle: shown prominently so nobody relies on a gap. */
  notCovered: string[];
  confidence: IssueConfidence;
  model: string;
  generatedAt: string;
}
