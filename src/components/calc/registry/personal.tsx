import type { CalcEntry } from "./types";
import { IncomeTaxCalc } from "../IncomeTaxCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  { id: "income-tax", label: "Income tax", summary: "Personal allowance taper, bands, savings and dividends", component: IncomeTaxCalc },
];
