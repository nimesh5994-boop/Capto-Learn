import type { CalcEntry } from "./types";
import { CapitalGainsCalc } from "../CapitalGainsCalc";
import { InheritanceTaxCalc } from "../InheritanceTaxCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  { id: "cgt", label: "Capital gains tax", summary: "Annual exempt amount, losses, BADR and rates", component: CapitalGainsCalc },
  { id: "iht", label: "Inheritance tax", summary: "Nil rate bands, residence band taper, charity rate", component: InheritanceTaxCalc },
];
