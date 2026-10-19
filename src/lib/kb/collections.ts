/*
 * What the Capto Knowledge Base mirrors from GOV.UK — the "core set" for UK practice work.
 * Crown copyright, reused under the Open Government Licence v3.0. To add coverage, add a slug here;
 * the next sync downloads it. (Sizes are section counts as of Oct 2026.)
 */

export interface ManualDef {
  slug: string;
  label: string;
  /** GOV.UK Search API filter for guidance collections (defaults to the organisation's guidance & regulation). */
  query?: string;
}

export const MANUALS: ManualDef[] = [
  // VAT
  { slug: "vat-input-tax", label: "VAT Input Tax" },
  { slug: "vat-supply-and-consideration", label: "VAT Supply and Consideration" },
  { slug: "vat-registration-manual", label: "VAT Registration" },
  { slug: "vat-time-of-supply", label: "VAT Time of Supply" },
  { slug: "vat-valuation", label: "VAT Valuation" },
  { slug: "vat-business-non-business", label: "VAT Business / Non-Business" },
  { slug: "vat-partial-exemption-guidance", label: "VAT Partial Exemption" },
  { slug: "vat-land-and-property", label: "VAT Land and Property" },
  { slug: "vat-construction", label: "VAT Construction" },
  { slug: "vat-reverse-charge-for-building-and-construction-services-manual", label: "VAT Domestic Reverse Charge (Construction)" },
  { slug: "vat-place-of-supply-services", label: "VAT Place of Supply of Services" },
  { slug: "vat-place-of-supply-goods", label: "VAT Place of Supply (Goods)" },
  { slug: "vat-transfer-of-a-going-concern", label: "VAT Transfer of a Going Concern" },
  { slug: "vat-trader-records", label: "VAT Traders' Records" },
  { slug: "vat-accounting", label: "VAT Accounting" },
  { slug: "vat-cash-accounting-scheme", label: "VAT Cash Accounting Scheme" },
  { slug: "vat-annual-accounting-system", label: "VAT Annual Accounting Scheme" },
  { slug: "vat-flat-rate-scheme", label: "VAT Flat Rate Scheme" },
  { slug: "vat-margin-schemes", label: "VAT Margin Schemes" },
  { slug: "vat-bad-debt-relief", label: "VAT Bad Debt Relief" },
  { slug: "vat-assessments-and-error-correction", label: "VAT Assessments and Error Correction" },
  { slug: "imports", label: "Import VAT" },
  // Corporation tax & business
  { slug: "company-taxation-manual", label: "Company Taxation (CTM)" },
  { slug: "business-income-manual", label: "Business Income (BIM)" },
  { slug: "capital-allowances-manual", label: "Capital Allowances (CA)" },
  { slug: "corporate-finance-manual", label: "Corporate Finance (CFM)" },
  { slug: "corporate-intangibles-research-and-development-manual", label: "Corporate Intangibles and R&D (CIRD)" },
  { slug: "property-income-manual", label: "Property Income (PIM)" },
  // Employment, payroll, pensions
  { slug: "employment-income-manual", label: "Employment Income (EIM)" },
  { slug: "employment-status-manual", label: "Employment Status (ESM)" },
  { slug: "paye-manual", label: "PAYE" },
  { slug: "national-insurance-manual", label: "National Insurance (NIM)" },
  { slug: "statutory-payments-manual", label: "Statutory Payments (SPM)" },
  { slug: "pensions-tax-manual", label: "Pensions Tax (PTM)" },
  { slug: "construction-industry-scheme-reform", label: "Construction Industry Scheme (CISR)" },
  // Personal & capital taxes
  { slug: "self-assessment-manual", label: "Self Assessment (SAM)" },
  { slug: "savings-and-investment-manual", label: "Savings and Investment (SAIM)" },
  { slug: "residence-domicile-and-remittance-basis", label: "Residence, Domicile and Remittance Basis (RDRM)" },
  { slug: "capital-gains-manual", label: "Capital Gains (CG)" },
  { slug: "inheritance-tax-manual", label: "Inheritance Tax (IHTM)" },
  { slug: "trusts-settlements-and-estates-manual", label: "Trusts, Settlements and Estates (TSEM)" },
  // Compliance
  { slug: "compliance-handbook", label: "Compliance Handbook (CH)" },
  { slug: "enquiry-manual", label: "Enquiry Manual (EM)" },
];

/** Every GOV.UK guidance page these organisations publish (manual sections excluded — they come from MANUALS). */
export const GUIDANCE_ORGS: ManualDef[] = [
  { slug: "hm-revenue-customs", label: "HMRC guidance" },
  { slug: "companies-house", label: "Companies House guidance" },
  // GOV.UK "mainstream" guides and answers (e.g. /vat-registration, /self-assessment-tax-returns) sit outside the
  // guidance category, but hold the plain-English thresholds, rates and deadlines practitioners look up most.
  { slug: "hmrc-mainstream", label: "HMRC GOV.UK guides and answers", query: "filter_organisations=hm-revenue-customs&filter_format=guide&filter_format=answer" },
  { slug: "companies-house-mainstream", label: "Companies House GOV.UK guides and answers", query: "filter_organisations=companies-house&filter_format=guide&filter_format=answer" },
  // What's coming: Budget measures, tax information and impact notes (TIINs), technical notes and Revenue and
  // Customs Briefs are HMRC policy papers; HM Treasury publishes the Budget documents. From 2024 onwards.
  { slug: "hmrc-policy-papers", label: "HMRC policy papers (Budget measures, TIINs, technical notes, Revenue and Customs Briefs)", query: "filter_organisations=hm-revenue-customs&filter_content_store_document_type=policy_paper&filter_public_timestamp=from:2024-01-01" },
  { slug: "hmt-tax-policy", label: "HM Treasury tax policy papers (Budget documents)", query: "filter_organisations=hm-treasury&filter_content_store_document_type=policy_paper&filter_public_timestamp=from:2024-01-01&q=tax" },
];

/** A full re-check of every collection happens at most this often (the "weekly sync"). */
export const FULL_SYNC_EVERY_DAYS = 7;

export interface ActDef {
  /** legislation.gov.uk type/year/number, e.g. "ukpga/1994/23". */
  id: string;
  label: string;
  /** Limit to these provisions (e.g. one schedule of a Finance Act); omit for the whole instrument. */
  only?: string[];
}

/**
 * Core tax and company legislation mirrored from legislation.gov.uk (Open Government Licence v3.0).
 * Synced automatically once legislation.gov.uk accepts our requests — see lib/kb/legislation.ts.
 */
export const LEGISLATION: ActDef[] = [
  { id: "ukpga/1994/23", label: "Value Added Tax Act 1994" },
  { id: "uksi/1995/2518", label: "Value Added Tax Regulations 1995" },
  { id: "uksi/1992/3222", label: "Value Added Tax (Input Tax) Order 1992" },
  { id: "ukpga/2003/1", label: "Income Tax (Earnings and Pensions) Act 2003" },
  { id: "uksi/2003/2682", label: "Income Tax (PAYE) Regulations 2003" },
  { id: "ukpga/2005/5", label: "Income Tax (Trading and Other Income) Act 2005" },
  { id: "ukpga/2007/3", label: "Income Tax Act 2007" },
  { id: "ukpga/2009/4", label: "Corporation Tax Act 2009" },
  { id: "ukpga/2010/4", label: "Corporation Tax Act 2010" },
  { id: "ukpga/2001/2", label: "Capital Allowances Act 2001" },
  { id: "ukpga/1992/12", label: "Taxation of Chargeable Gains Act 1992" },
  { id: "ukpga/1984/51", label: "Inheritance Tax Act 1984" },
  { id: "ukpga/1970/9", label: "Taxes Management Act 1970" },
  { id: "ukpga/1992/4", label: "Social Security Contributions and Benefits Act 1992" },
  { id: "ukpga/2004/12", label: "Finance Act 2004 (pensions)", only: ["section/149-284", "schedule/28", "schedule/29", "schedule/36"] },
  { id: "ukpga/2007/11", label: "Finance Act 2007 Sch 24 (inaccuracy penalties)", only: ["schedule/24"] },
  { id: "ukpga/2008/9", label: "Finance Act 2008 Sch 36 (information powers)", only: ["schedule/36"] },
  { id: "ukpga/2009/10", label: "Finance Act 2009 Schs 55–56 (late filing and payment penalties)", only: ["schedule/55", "schedule/56"] },
  { id: "ukpga/2006/46", label: "Companies Act 2006" },
  { id: "ukpga/2008/30", label: "Pensions Act 2008 (auto-enrolment)" },
  { id: "uksi/2017/692", label: "Money Laundering Regulations 2017" },
  { id: "ukpga/2023/56", label: "Economic Crime and Corporate Transparency Act 2023" },
];
