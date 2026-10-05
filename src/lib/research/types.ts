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
  model: string;
  generatedAt: string;
}
