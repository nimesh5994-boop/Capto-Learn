const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const gbp0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** Whole pounds when the value is whole, pence otherwise. */
export function money(n: number | null | undefined): string {
  const v = Number(n ?? 0);
  return Math.abs(v - Math.round(v)) < 0.005 ? gbp0.format(Math.round(v)) : gbp.format(v);
}
export const money2 = (n: number | null | undefined) => gbp.format(Number(n ?? 0));

// Servers run in UTC; every date a UK firm or client sees should read in UK time.
const TZ = "Europe/London";

export function date(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: TZ });
}

export function dateTime(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: TZ });
}

/** yyyy-mm-dd for <input type="date">. */
export function isoDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}
