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

/** One line under each area in the calculator list, shown while the area is collapsed. */
export const GROUP_SUMMARIES: Record<CalcGroup, string> = {
  personal: "Income tax, self-employment, property income and partnerships",
  employment: "Take-home pay, employer costs, statutory payments and mileage",
  business: "Corporation tax, salary vs dividend, capital allowances, VAT, penalties",
  capital: "Capital gains, main residence relief, inheritance tax and SDLT",
};
