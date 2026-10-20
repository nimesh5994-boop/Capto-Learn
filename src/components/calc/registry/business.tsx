import type { CalcEntry } from "./types";
import { CorporationTaxCalc } from "../CorporationTaxCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  { id: "corporation-tax", label: "Corporation tax", summary: "Small profits rate, main rate and marginal relief", component: CorporationTaxCalc },
];
