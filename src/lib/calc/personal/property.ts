/**
 * UK residential property income: profit (expenses or property allowance),
 * finance cost restriction (basic rate tax reduction, ITTOIA 2005 s272A,
 * s274A), combined with the client's other income for the tax, and the tax
 * attributable to the letting.
 */
import { type CalcResult, CalcInputError, r2 } from "../common";
import { personalIncomeTax, validatePersonalTax, type PersonalTaxInput, type PersonalTaxResult, type PropertyInput } from "./incomeTax";

export interface PropertyTaxInput extends Omit<PersonalTaxInput, "property"> {
  property: PropertyInput;
}

export interface PropertyTaxResult extends CalcResult {
  incomeTax: PersonalTaxResult;
  /** Total income tax without the property income (same other inputs). */
  taxWithoutProperty: number;
  /** Extra income tax because of the letting. */
  taxOnProperty: number;
  /** What the tax would be if finance costs were fully deductible (pre-2017 rules), for comparison. */
  taxIfFinanceCostsDeductible: number | null;
  effectiveRate: number | null;
}

export function validatePropertyTax(i: PropertyTaxInput): string[] {
  return validatePersonalTax(i);
}

export function propertyTax(input: PropertyTaxInput): PropertyTaxResult {
  const errors = validatePropertyTax(input);
  if (errors.length) throw new CalcInputError(errors);
  const it = personalIncomeTax(input);
  const without = personalIncomeTax({ ...input, property: undefined });
  const p = input.property;
  let comparison: number | null = null;
  if (!it.propertyAllowanceUsed && p.financeCosts > 0) {
    comparison = personalIncomeTax({
      ...input,
      property: { ...p, expenses: p.expenses + p.financeCosts, financeCosts: 0, financeCostsBroughtForward: 0, allowance: "expenses" },
    }).tax;
  }
  const taxOnProperty = r2(it.tax - without.tax);
  const notes = [
    ...it.notes.filter((n) => !n.startsWith("Not covered")),
    "Furnished holiday lettings: the special regime was abolished from 6 April 2025 (PIM4165). Former FHLs are now part of the ordinary property business: finance costs get only the basic rate reduction and the income isn't relevant earnings for pensions.",
    "Jointly owned property: enter the client's share. Spouses and civil partners are taxed 50:50 unless a Form 17 declaration is in place.",
    "Not covered: Rent a Room relief, commercial property finance costs (fully deductible: enter them as expenses), replacement of domestic items and capital allowances details (enter the totals as expenses), overseas property, non-resident landlord tax, and property income of companies or trusts. Property income isn't liable to Class 4 NIC.",
  ];
  return {
    taxYear: input.taxYear,
    tax: it.tax,
    working: it.working,
    rateIds: it.rateIds,
    notes,
    incomeTax: it,
    taxWithoutProperty: without.tax,
    taxOnProperty,
    taxIfFinanceCostsDeductible: comparison,
    effectiveRate: it.effectiveRate,
  };
}
