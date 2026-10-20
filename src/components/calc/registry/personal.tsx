import type { CalcEntry } from "./types";
import { PersonalIncomeTaxCalc } from "../personal/PersonalIncomeTaxCalc";
import { SelfEmployedCalc } from "../personal/SelfEmployedCalc";
import { PropertyIncomeCalc } from "../personal/PropertyIncomeCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  {
    id: "income-tax",
    label: "Income tax",
    summary: "Full computation: Scottish or UK bands, pensions, Gift Aid, Child Benefit charge, marriage allowance, payments on account",
    component: PersonalIncomeTaxCalc,
  },
  {
    id: "self-employed",
    label: "Self-employed tax and NIC",
    summary: "Trading profit or trading allowance, income tax, Class 4 and Class 2, payment timetable",
    component: SelfEmployedCalc,
  },
  {
    id: "property-income",
    label: "Property income",
    summary: "Rental profit, property allowance, 20% finance cost reduction, tax on the letting",
    component: PropertyIncomeCalc,
  },
];
