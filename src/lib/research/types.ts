/* Shapes stored in research_queries.answer and rendered by the Ask Capto page. Pure types. */

export type SourceKind = "official" | "lesson" | "professional";

export interface ResearchSource {
  /** "S1", "S2"… — the label the model cites. */
  id: string;
  kind: SourceKind;
  url: string;
  title: string;
  /** e.g. "HMRC internal manual", "GOV.UK guidance", "Capto Learn lesson". */
  publisher: string;
  /** ISO date the publisher last changed the page, when known. */
  updatedAt?: string | null;
}

export interface Citation {
  sourceId: string;
  quote: string;
  /** True only when the quote was found word-for-word in the fetched source text. */
  verified: boolean;
}

export type AnswerLevel = "essentials" | "practitioner" | "expert";

export interface AnswerStep {
  /** Markdown. */
  text: string;
  citations: Citation[];
  verified: boolean;
}

export interface AnswerPoint {
  /** How deep this point goes; answers written before levels existed have none (shown at practitioner level). */
  level?: AnswerLevel;
  heading: string;
  /** Markdown. */
  text: string;
  citations: Citation[];
  /** At least one verified citation backs this point. */
  verified: boolean;
}

export interface ProfessionalNote {
  summary: string;
  links: { url: string; title: string; citedText: string }[];
}

export interface ResearchAnswer {
  shortAnswer: string;
  /** Numbered practical steps, for "how do I…" questions. */
  steps?: AnswerStep[];
  /** A worked illustration (e.g. a journal as Dr/Cr). Not quote-checked: it applies the cited points. */
  example?: { title: string; body: string } | null;
  points: AnswerPoint[];
  caveats: string[];
  followUps: string[];
  confidence: "high" | "medium" | "low";
  taxYear: string | null;
  sources: ResearchSource[];
  /** Capto Learn lessons worth studying for this topic: `${track}/${lesson}`. */
  relatedLessons: { id: string; title: string; track: string }[];
  professional?: ProfessionalNote | null;
  /** Set when this answer was reused from the firm's answer library rather than researched fresh. */
  reuse?: { libraryId: string; originalDate: string; sourcesChecked: number; approvedBy?: string; approvedAt?: string } | null;
  /** Set when this answer is a Capto topic brief (written overnight, shared across firms). */
  brief?: { id: string; area: string; writtenAt: string; sourcesChecked: number } | null;
  /** Set when the question bot served this from what it has learned (Level 1, no AI). */
  learned?: { id: string; learnedAt: string } | null;
  /** Which bot level answered: 1 Instant (local, no AI), 2 Standard (cited AI answer), 3 Expert research. */
  tier?: { level: 1 | 2 | 3; label: string; reason: string } | null;
  /** Which model wrote the answer and why (cost routing). */
  route?: { complexity: "simple" | "complex"; model: string; escalated: boolean } | null;
  model: string;
  generatedAt: string;
}
