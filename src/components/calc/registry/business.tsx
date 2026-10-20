import type { CalcEntry } from "./types";
import { CorporationTaxPeriodCalc } from "../business/CorporationTaxPeriodCalc";
import { S455Calc } from "../business/S455Calc";
import { SalaryDividendCalc } from "../business/SalaryDividendCalc";
import { CapitalAllowancesCalc } from "../business/CapitalAllowancesCalc";
import { VatFrsCalc, VatFractionCalc, VatRegistrationCalc } from "../business/VatCalcs";
import { InterestCalc, PenaltiesCalc } from "../business/PenaltiesCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  {
    id: "corporation-tax",
    label: "Corporation tax",
    summary: "Dated periods, marginal relief, associates, long periods, instalments and due dates",
    component: CorporationTaxPeriodCalc,
  },
  { id: "salary-dividend", label: "Salary vs dividend", summary: "Director's pay options side by side, optimum salary, dividend for a target net cash", component: SalaryDividendCalc },
  { id: "capital-allowances", label: "Capital allowances", summary: "AIA, full expensing, FYAs, pools, hybrid rate, cars, disposals", component: CapitalAllowancesCalc },
  { id: "s455", label: "Loans to participators (s455)", summary: "Overdrawn director's loan: s455 tax and s458 relief timing", component: S455Calc },
  { id: "vat-flat-rate", label: "VAT Flat Rate Scheme", summary: "Flat rate vs standard, limited cost trader test, first-year discount", component: VatFrsCalc },
  { id: "vat-fraction", label: "VAT fraction", summary: "Take VAT out of a gross amount or add it to a net one", component: VatFractionCalc },
  { id: "vat-registration", label: "VAT registration threshold", summary: "Rolling 12-month turnover, deadlines and the 30-day forward look", component: VatRegistrationCalc },
  { id: "penalties", label: "Penalties", summary: "Late filing and payment: SA, corporation tax, VAT and MTD points", component: PenaltiesCalc },
  { id: "late-payment-interest", label: "Late payment interest", summary: "HMRC interest at the rates in force over a date range", component: InterestCalc },
];
