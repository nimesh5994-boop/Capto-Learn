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

export interface AnswerPoint {
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
  reuse?: { libraryId: string; originalDate: string; sourcesChecked: number } | null;
  /** Set when this answer is a Capto topic brief (written overnight, shared across firms). */
  brief?: { id: string; area: string; writtenAt: string; sourcesChecked: number } | null;
  /** Which model wrote the answer and why (cost routing). */
  route?: { complexity: "simple" | "complex"; model: string; escalated: boolean } | null;
  model: string;
  generatedAt: string;
}
