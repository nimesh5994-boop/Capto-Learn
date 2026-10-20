import type { CalcEntry } from "./types";
import { TakeHomeCalc } from "../employment/TakeHomeCalc";
import { EmployerCostCalc } from "../employment/EmployerCostCalc";
import { StatutoryPayCalc } from "../employment/StatutoryPayCalc";
import { MileageCalc } from "../employment/MileageCalc";

/** Calculators in this group, in the order they're listed. */
export const entries: CalcEntry[] = [
  { id: "take-home", label: "Take-home pay", summary: "PAYE, NIC, student loans, pensions; gross for a target net", component: TakeHomeCalc },
  { id: "employer-cost", label: "Employer cost and NIC", summary: "Employer NIC by category, Employment Allowance, levy, Class 1A", component: EmployerCostCalc },
  { id: "statutory-pay", label: "Statutory payments", summary: "SSP, SMP, SAP, SPP and ShPP with recovery", component: StatutoryPayCalc },
  { id: "mileage", label: "Mileage and expenses", summary: "Approved mileage rates, taxable excess or MAR claim", component: MileageCalc },
];
