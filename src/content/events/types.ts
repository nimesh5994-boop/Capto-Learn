/*
 * Events: dated fiscal or regulatory events (a Budget, an Autumn Statement, a major HMRC change) written up once for
 * everyone on the platform. Each measure carries the official GOV.UK document it was checked against, so a reader can
 * go straight to the source. New events are added as files beside this one and become part of the archive.
 */

export type EventArea = "personal" | "property" | "savings" | "capital" | "business" | "payroll" | "vat" | "pensions" | "compliance" | "other";

export const EVENT_AREAS: Record<EventArea, string> = {
  personal: "Personal tax",
  property: "Landlords and property",
  savings: "Savings and ISAs",
  capital: "Capital gains and shares",
  business: "Companies and business",
  payroll: "Employment and payroll",
  vat: "VAT",
  pensions: "Pensions",
  compliance: "Compliance and admin",
  other: "Other",
};

/** Where a measure stands, so a draft proposal is never mistaken for settled law. */
export type MeasureStatus = "in-force" | "announced" | "consultation";

export const MEASURE_STATUS: Record<MeasureStatus, string> = {
  "in-force": "Takes effect immediately",
  announced: "Announced — legislation to follow",
  consultation: "Direction set — detail still in consultation",
};

export interface EventSource {
  title: string;
  /** An official GOV.UK page or document. */
  url: string;
}

export interface EventMeasure {
  id: string;
  area: EventArea;
  title: string;
  /** What changes, in plain words, using only the figures in the sources. */
  what: string;
  /** When it starts, as the source states it. */
  effective: string;
  status: MeasureStatus;
  /** What it means for the practice: work to do, returns and software affected. */
  forAccountants: string;
  /** What to tell clients, in plain words. */
  forClients: string;
  /** Anything the sources leave open. */
  notYetClear?: string;
  sources: EventSource[];
}

export interface TaxEvent {
  slug: string;
  title: string;
  /** ISO date the event took place. */
  date: string;
  /** ISO date the content was last checked against the official pages. */
  checkedOn: string;
  summary: string;
  /** The few things most practices need to act on first. */
  headlines: string[];
  measures: EventMeasure[];
  /** Official documents the whole event can be read from. */
  officialDocuments: EventSource[];
  /** What this write-up does not cover. */
  limits: string;
}
