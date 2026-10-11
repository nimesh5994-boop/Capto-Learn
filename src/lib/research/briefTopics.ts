/*
 * Topics the Librarian bot keeps a verified brief for. Each is a general, fact-free practice question that comes up
 * constantly — the brief is written once (at half price, overnight) and then served free to every firm until one
 * of its official sources changes. Add topics freely; the next Librarian run writes the missing briefs.
 */

export interface BriefTopic {
  key: string;
  area: string;
  question: string;
}

export const BRIEF_TOPICS: BriefTopic[] = [
  // VAT
  { key: "vat-registration-thresholds", area: "VAT", question: "What are the current VAT registration and deregistration thresholds, and how do the historic and future tests work?" },
  { key: "vat-business-entertainment", area: "VAT", question: "When can a business reclaim input VAT on entertainment — staff, clients, overseas customers and mixed events?" },
  { key: "vat-cars-and-vans", area: "VAT", question: "When can input VAT be reclaimed on buying or leasing cars and vans, and what is the 50% lease restriction?" },
  { key: "vat-road-fuel", area: "VAT", question: "What are the options for reclaiming VAT on road fuel, and how does the fuel scale charge work?" },
  { key: "vat-pre-registration", area: "VAT", question: "What input VAT can be reclaimed on goods and services bought before VAT registration?" },
  { key: "vat-flat-rate-scheme", area: "VAT", question: "How does the VAT Flat Rate Scheme work, including the limited cost trader rules and the capital goods exception?" },
  { key: "vat-cash-accounting", area: "VAT", question: "Who can use the VAT cash accounting scheme and how does it work?" },
  { key: "vat-errors", area: "VAT", question: "How do you correct errors on a previous VAT return, and when must they be disclosed to HMRC separately?" },
  { key: "vat-domestic-reverse-charge", area: "VAT", question: "How does the VAT domestic reverse charge for construction services work?" },
  { key: "vat-invoice-requirements", area: "VAT", question: "What must a valid VAT invoice show, and when can a simplified invoice be used?" },
  { key: "vat-partial-exemption-de-minimis", area: "VAT", question: "How do the partial exemption de minimis tests work?" },
  // Corporation tax & directors
  { key: "ct-rates-marginal-relief", area: "Corporation tax", question: "What are the corporation tax main rate, small profits rate and marginal relief, and how do associated companies affect them?" },
  { key: "ct-payment-dates", area: "Corporation tax", question: "When is corporation tax due for payment and when must the CT600 be filed, including quarterly instalments?" },
  { key: "ct-annual-investment-allowance", area: "Corporation tax", question: "How do the annual investment allowance and full expensing work for companies?" },
  { key: "ct-trading-losses", area: "Corporation tax", question: "How can a company use trading losses — carry back, carry forward and group relief?" },
  { key: "s455-loans-to-participators", area: "Directors", question: "How does the s455 charge on loans to participators work, including the rate, the 9-month repayment window and s458 relief?" },
  { key: "dla-bed-and-breakfasting", area: "Directors", question: "What are the anti bed-and-breakfasting rules for repaying a director's loan account?" },
  { key: "beneficial-loans-bik", area: "Directors", question: "When does a director's loan from the company create a beneficial loan benefit in kind?" },
  { key: "dividends-distributable-reserves", area: "Directors", question: "When is a dividend lawful, and what happens if a company pays an illegal dividend?" },
  // Payroll & pensions
  { key: "employment-allowance", area: "Payroll", question: "What is the Employment Allowance, who can claim it, and when is a single-director company excluded?" },
  { key: "employer-nic-thresholds", area: "Payroll", question: "What are the current employer Class 1 NIC rate and secondary threshold?" },
  { key: "director-nic-annual-earnings-period", area: "Payroll", question: "How are National Insurance contributions calculated for company directors using the annual earnings period?" },
  { key: "p11d-deadlines", area: "Payroll", question: "What are the P11D and P11D(b) deadlines and when is Class 1A NIC payable?" },
  { key: "termination-payments", area: "Payroll", question: "How are termination payments taxed, including the £30,000 exemption and post-employment notice pay?" },
  { key: "mileage-allowance-payments", area: "Payroll", question: "What are the approved mileage allowance payment rates and how are they taxed?" },
  { key: "auto-enrolment-thresholds", area: "Pensions", question: "What are the auto-enrolment earnings trigger and qualifying earnings band, and the minimum contributions?" },
  { key: "pension-annual-allowance", area: "Pensions", question: "How do the pension annual allowance, tapered annual allowance and carry forward work?" },
  // Personal tax
  { key: "sa-deadlines-penalties", area: "Personal tax", question: "What are the Self Assessment filing and payment deadlines and the late filing and late payment penalties?" },
  { key: "payments-on-account", area: "Personal tax", question: "How do Self Assessment payments on account work and when can they be reduced?" },
  { key: "dividend-tax-rates", area: "Personal tax", question: "What are the current dividend tax rates and the dividend allowance?" },
  { key: "mtd-income-tax", area: "Personal tax", question: "When does Making Tax Digital for Income Tax apply to sole traders and landlords, and what are the income thresholds?" },
  { key: "property-finance-costs", area: "Personal tax", question: "How does the restriction on finance cost relief for residential landlords work?" },
  { key: "hicbc", area: "Personal tax", question: "How does the High Income Child Benefit Charge work and what is the income threshold?" },
  { key: "trading-allowance", area: "Personal tax", question: "How do the £1,000 trading and property allowances work?" },
  // Capital taxes
  { key: "cgt-rates-annual-exempt", area: "Capital taxes", question: "What are the current capital gains tax rates and annual exempt amount?" },
  { key: "cgt-60-day-reporting", area: "Capital taxes", question: "When must a UK residential property gain be reported and the CGT paid within 60 days?" },
  { key: "badr", area: "Capital taxes", question: "How does Business Asset Disposal Relief work, including the current rate and lifetime limit?" },
  { key: "private-residence-relief", area: "Capital taxes", question: "How does private residence relief work, including the final period exemption and lettings relief?" },
  { key: "iht-nil-rate-bands", area: "Capital taxes", question: "How do the inheritance tax nil rate band and residence nil rate band work, including the taper?" },
  { key: "iht-gifts-seven-years", area: "Capital taxes", question: "How are lifetime gifts treated for inheritance tax, including the 7-year rule, taper relief and the annual exemptions?" },
  // Compliance, CIS, IR35, R&D
  { key: "cis-deduction-rates", area: "CIS", question: "What are the CIS deduction rates and the tests for gross payment status?" },
  { key: "cis-monthly-returns", area: "CIS", question: "When are CIS monthly returns due and what are the late filing penalties?" },
  { key: "ir35-off-payroll-small-company", area: "IR35", question: "When do the off-payroll working rules (Chapter 10) apply instead of Chapter 8, and what is the small company exemption?" },
  { key: "rd-merged-scheme", area: "R&D", question: "How does the merged R&D expenditure credit scheme work, and when does ERIS apply instead?" },
  { key: "rd-claim-notification", area: "R&D", question: "When must a company submit an R&D claim notification and the additional information form?" },
  { key: "inaccuracy-penalties", area: "Compliance", question: "How are penalties for inaccuracies in tax returns calculated, including the behaviour categories and disclosure reductions?" },
  { key: "assessment-time-limits", area: "Compliance", question: "What are HMRC's time limits for raising assessments (4, 6 and 20 years)?" },
  { key: "companies-house-late-filing", area: "Company secretarial", question: "What are the Companies House late filing penalties for annual accounts?" },
  { key: "confirmation-statement", area: "Company secretarial", question: "When must a confirmation statement be filed and what does it need to include?" },
  { key: "companies-house-identity-verification", area: "Company secretarial", question: "Who must verify their identity with Companies House and by when?" },
];
