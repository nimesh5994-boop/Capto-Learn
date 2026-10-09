/*
 * What the Capto Knowledge Base mirrors from GOV.UK — the "core set" for UK practice work.
 * Crown copyright, reused under the Open Government Licence v3.0. To add coverage, add a slug here;
 * the next sync downloads it. (Sizes are section counts as of Oct 2026.)
 */

export interface ManualDef {
  slug: string;
  label: string;
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
];

/** A full re-check of every collection happens at most this often (the "weekly sync"). */
export const FULL_SYNC_EVERY_DAYS = 7;
