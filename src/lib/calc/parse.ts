/**
 * Parse a £ amount as typed by a person: accepts "1,234.56", "£1234", " 1 234 ",
 * "-50" (so the calculator can say negatives aren't allowed). Blank is 0, or
 * undefined when `blankIsUndefined` (for optional inputs).
 */
export function parseMoney(raw: string, blankIsUndefined = false): { value?: number; error?: string } {
  const s = raw.replace(/[£,\s]/g, "");
  if (s === "") return { value: blankIsUndefined ? undefined : 0 };
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return { error: "Enter an amount in pounds, e.g. 12,570 or 1250.50." };
  const n = Number(s);
  if (!Number.isFinite(n)) return { error: "That amount is too large." };
  if (n > 1e12) return { error: "That amount is too large." };
  return { value: Math.round(n * 100) / 100 };
}

/** Whole number (e.g. associated companies, months). */
export function parseWhole(raw: string, blankAs = 0): { value?: number; error?: string } {
  const s = raw.replace(/[,\s]/g, "");
  if (s === "") return { value: blankAs };
  if (!/^-?\d+$/.test(s)) return { error: "Enter a whole number." };
  return { value: Number(s) };
}

/** Percentage 0–100, decimals allowed. */
export function parsePercent(raw: string, blankAs = 0): { value?: number; error?: string } {
  const s = raw.replace(/[%\s]/g, "");
  if (s === "") return { value: blankAs };
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return { error: "Enter a percentage, e.g. 100 or 37.5." };
  return { value: Number(s) };
}

/** Re-format a typed amount with thousands separators (used on blur). */
export function formatMoneyInput(raw: string): string {
  const p = parseMoney(raw, true);
  if (p.value === undefined || p.error) return raw;
  return p.value.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(p.value) ? 0 : 2, maximumFractionDigits: 2 });
}
