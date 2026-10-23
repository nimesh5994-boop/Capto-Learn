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
