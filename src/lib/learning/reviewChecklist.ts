/** What a reviewer confirms before signing a lesson off. All must be ticked to sign off. */
export const REVIEW_CHECKLIST = [
  { key: "figures", label: "Rates, thresholds, limits and dates are correct for the tax year shown" },
  { key: "law", label: "The rules and their exceptions are stated correctly and not over-simplified" },
  { key: "answers", label: "Every exercise and quiz answer key, and its explanation, is correct" },
  { key: "sources", label: "Sources are official, relevant and still current" },
  { key: "flashcards", label: "Flashcards (if any) are correct" },
  { key: "level", label: "Clear, practical and pitched at the stated level" },
] as const;

export type ChecklistKey = (typeof REVIEW_CHECKLIST)[number]["key"];
export const CHECKLIST_KEYS = REVIEW_CHECKLIST.map((c) => c.key) as ChecklistKey[];
