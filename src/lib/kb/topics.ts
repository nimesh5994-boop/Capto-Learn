/*
 * Which courses an official page belongs to, so change alerts can go to the people who follow those topics.
 * HMRC manuals map by manual; GOV.UK guidance and policy papers (which span every tax) map by words in the
 * title. Pure, so it's unit-tested.
 */

/** Course slugs for each mirrored HMRC manual. */
const MANUAL_TOPICS: Record<string, string[]> = {
  "company-taxation-manual": ["corporation-tax", "directors"],
  "business-income-manual": ["personal-tax", "corporation-tax", "accounts-production"],
  "capital-allowances-manual": ["corporation-tax", "personal-tax", "accounts-production"],
  "corporate-finance-manual": ["corporation-tax"],
  "corporate-intangibles-research-and-development-manual": ["rd", "corporation-tax"],
  "property-income-manual": ["personal-tax"],
  "employment-income-manual": ["payroll", "personal-tax", "directors"],
  "employment-status-manual": ["ir35"],
  "paye-manual": ["payroll"],
  "national-insurance-manual": ["payroll", "directors"],
  "statutory-payments-manual": ["payroll"],
  "pensions-tax-manual": ["pensions"],
  "construction-industry-scheme-reform": ["cis"],
  "self-assessment-manual": ["personal-tax"],
  "savings-and-investment-manual": ["personal-tax"],
  "residence-domicile-and-remittance-basis": ["personal-tax"],
  "capital-gains-manual": ["capital-taxes"],
  "inheritance-tax-manual": ["capital-taxes"],
  "trusts-settlements-and-estates-manual": ["capital-taxes"],
  "compliance-handbook": ["practice"],
  "enquiry-manual": ["practice"],
  "companies-house": ["cosec", "accounts-production"],
  "companies-house-mainstream": ["cosec", "accounts-production"],
};

/** Title words for pages from collections that span every topic (HMRC guidance, policy papers, Budget papers). */
const TITLE_TOPICS: [string, RegExp][] = [
  ["vat", /\bvat\b|value added tax|making tax digital for vat/i],
  ["payroll", /\bpaye\b|payroll|national insurance|statutory (sick|maternity|paternity|adoption|shared parental)|student loan|minimum wage|living wage|employment allowance|benefits? in kind|expenses and benefits/i],
  ["pensions", /pension|auto[- ]?enrolment/i],
  ["personal-tax", /self assessment|income tax|making tax digital for income tax|dividend|rental income|landlord|property income|child benefit|marriage allowance/i],
  ["capital-taxes", /capital gains|inheritance tax|business asset disposal|agricultural property relief|business property relief|trust/i],
  ["corporation-tax", /corporation tax|capital allowances|full expensing|marginal relief|loss relief|group relief/i],
  ["directors", /director|close compan|loans? to participators|s455/i],
  ["rd", /research and development|\br&d\b|\beris\b/i],
  ["ir35", /off-payroll|\bir35\b|intermediaries|employment status|umbrella compan/i],
  ["cis", /construction industry scheme|\bcis\b|reverse charge for building/i],
  ["cosec", /companies house|confirmation statement|identity verification|registered office|persons with significant control/i],
  ["accounts-production", /\bfrs ?10[25]\b|annual accounts|micro-entity|small compan(y|ies) accounts/i],
  ["practice", /anti-money laundering|money laundering|tax agent|agent services|penalt|tribunal|compliance check/i],
];

/** The courses a page belongs to (most specific first). Empty when nothing matches. */
export function topicsForDoc(collection: string, title: string): string[] {
  const byManual = MANUAL_TOPICS[collection] ?? (collection.startsWith("vat-") || collection === "imports" ? ["vat"] : null);
  if (byManual) return byManual;
  return TITLE_TOPICS.filter(([, re]) => re.test(title)).map(([t]) => t);
}
