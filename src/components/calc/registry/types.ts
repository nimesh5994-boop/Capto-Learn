import type { ComponentType } from "react";

export type CalcGroup = "personal" | "employment" | "business" | "capital";

export interface CalcEntry {
  /** URL-safe id, used in ?calc= links. */
  id: string;
  label: string;
  /** One line shown in the list. */
  summary: string;
  component: ComponentType<{ taxYear: string }>;
}

export const GROUP_LABELS: Record<CalcGroup, string> = {
  personal: "Personal tax",
  employment: "Employment and payroll",
  business: "Business and company",
  capital: "Capital, property and estates",
};
