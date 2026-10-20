import type { CalcEntry } from "./types";
import { CapitalGainsFullCalc } from "../capital/CapitalGainsFullCalc";
import { PrivateResidenceReliefCalc } from "../capital/PrivateResidenceReliefCalc";
import { InheritanceTaxFullCalc } from "../capital/InheritanceTaxFullCalc";
import { StampDutyCalc } from "../capital/StampDutyCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  { id: "cgt", label: "Capital gains tax", summary: "Disposals, losses, BADR/IR, trustees and PRs, 60-day returns", component: CapitalGainsFullCalc },
  { id: "prr", label: "Private residence relief", summary: "Periods of occupation, absences, final 9 months, lettings relief", component: PrivateResidenceReliefCalc },
  { id: "iht", label: "Inheritance tax", summary: "Lifetime gifts, taper, CLTs, estate, APR/BPR, QSR, who pays", component: InheritanceTaxFullCalc },
  { id: "sdlt", label: "Stamp Duty Land Tax", summary: "Residential, first-time buyers, surcharges, non-residential, leases", component: StampDutyCalc },
];
