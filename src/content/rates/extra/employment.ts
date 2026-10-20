import type { RateSection } from "../types";

/**
 * Extra verified rate sections for the employment calculators, merged into the main dataset by tax year.
 * Same rule as the main dataset: every figure checked against a live official page, with its source.
 */
export const extra: Record<string, RateSection[]> = {
  "2026/27": [],
  "2025/26": [],
};
