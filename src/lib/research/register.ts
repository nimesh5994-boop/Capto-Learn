/*
 * Research register: the firm's record of every Ask Capto question, its review and every document issued from
 * it. Pure rules (no database) shared by the register page, the Excel download, the answer page and the
 * reuse bot, so they're unit-tested.
 */
import type { ResearchReviewStatus } from "@/lib/db/schema";

export const REVIEW_LABEL: Record<ResearchReviewStatus | "none", string> = { approved: "Approved", changes: "Needs changes", none: "Not reviewed" };

/** How the answer was produced, in plain words for the register. */
export function routeLabel(route: string | null | undefined): string {
  if (!route) return "—";
  const labels: Record<string, string> = { instant: "Instant (no AI)", library: "Reused (firm library or topic brief)", sonnet: "Standard", opus: "Expert", "sonnet>opus": "Standard, escalated to Expert" };
  return labels[route] ?? route;
}

/**
 * Who may open an answer: the person who asked, anyone in the firm once it's shared or approved, and anyone
 * who holds the research register permission (reviewers). Always within the same firm.
 */
export function canViewAnswer(row: { organizationId: string; userId: string | null; shared: boolean; reviewStatus: ResearchReviewStatus | null }, viewer: { orgId: string; userId: string; canRegister: boolean }): boolean {
  if (row.organizationId !== viewer.orgId) return false;
  return row.userId === viewer.userId || row.shared || row.reviewStatus === "approved" || viewer.canRegister;
}

export type ReviewFilter = "all" | "none" | "approved" | "changes";
export const parseReviewFilter = (v: string | undefined): ReviewFilter => (v === "none" || v === "approved" || v === "changes" ? v : "all");

/** Register search box: every word must appear in the question, the asker's name or a document reference. */
export function matchesRegister(q: string, r: { question: string; askedBy: string; docRefs: string[] }): boolean {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = `${r.question} ${r.askedBy} ${r.docRefs.join(" ")}`.toLowerCase();
  return words.every((w) => hay.includes(w));
}

/** Parses a yyyy-mm-dd filter date (start of that day, UK time is close enough for a register filter). */
export function parseDay(v: string | undefined): Date | null {
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const d = new Date(`${v}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Cost in pence, from the stored millionths of a US dollar (approximate GBP at a fixed rate for display). */
export const USD_TO_GBP = 0.79;
export const costPence = (micros: number): number => Math.round((micros / 1e6) * USD_TO_GBP * 100 * 100) / 100;
