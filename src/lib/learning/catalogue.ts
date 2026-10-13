/*
 * How the catalogue is organised for learners: subject areas (each with its own cover style) and curated
 * learning paths that string courses together for a role. Pure data.
 */

export type CategoryKey = "accounts" | "tax" | "people" | "compliance";

export const CATEGORIES: Record<CategoryKey, { label: string; blurb: string }> = {
  accounts: { label: "Accounting & bookkeeping", blurb: "Double entry to finished accounts" },
  tax: { label: "Tax", blurb: "Business, personal and capital taxes" },
  people: { label: "Payroll & pensions", blurb: "Paying people correctly" },
  compliance: { label: "Companies & compliance", blurb: "Company secretarial, AML and practice" },
};

export const COURSE_CATEGORY: Record<string, CategoryKey> = {
  foundations: "accounts",
  bookkeeping: "accounts",
  "accounts-production": "accounts",
  vat: "tax",
  "corporation-tax": "tax",
  "personal-tax": "tax",
  "capital-taxes": "tax",
  directors: "tax",
  rd: "tax",
  ir35: "tax",
  cis: "tax",
  payroll: "people",
  pensions: "people",
  cosec: "compliance",
  practice: "compliance",
};

export const categoryOf = (slug: string): CategoryKey => COURSE_CATEGORY[slug] ?? "accounts";

export interface LearningPath {
  key: string;
  title: string;
  /** Who it's for, in a few words. */
  forWho: string;
  courses: string[];
}

export const PATHS: LearningPath[] = [
  { key: "new-starter", title: "New starter", forWho: "Your first months in practice", courses: ["foundations", "bookkeeping", "accounts-production", "practice"] },
  { key: "business-tax", title: "Business tax", forWho: "Companies and their owners", courses: ["corporation-tax", "vat", "directors", "capital-taxes"] },
  { key: "personal-tax", title: "Personal tax", forWho: "Individuals and sole traders", courses: ["personal-tax", "capital-taxes", "ir35"] },
  { key: "payroll", title: "Payroll specialist", forWho: "Running payroll for clients", courses: ["payroll", "pensions", "cis"] },
  { key: "company-sec", title: "Company secretarial", forWho: "Companies House and compliance", courses: ["cosec", "practice", "directors"] },
];
