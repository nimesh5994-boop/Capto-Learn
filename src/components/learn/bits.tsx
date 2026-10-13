import {
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  FileCheck,
  FileSpreadsheet,
  FlaskConical,
  GraduationCap,
  HardHat,
  Landmark,
  NotebookPen,
  PiggyBank,
  Receipt,
  ScrollText,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { EffectiveReview } from "@/lib/learning/review";
import styles from "./learn.module.css";

const ICONS: Record<string, LucideIcon> = { BookOpen, Briefcase, Building2, FileCheck, FileSpreadsheet, FlaskConical, HardHat, Landmark, NotebookPen, PiggyBank, Receipt, ScrollText, ShieldCheck, User, Wallet };

/** Each course's icon belongs to one subject area, which sets its colours (see lib/learning/catalogue.ts). */
const ICON_AREA: Record<string, "accounts" | "tax" | "people" | "compliance"> = {
  BookOpen: "accounts",
  NotebookPen: "accounts",
  FileSpreadsheet: "accounts",
  Receipt: "tax",
  Building2: "tax",
  User: "tax",
  Landmark: "tax",
  Briefcase: "tax",
  FlaskConical: "tax",
  FileCheck: "tax",
  HardHat: "tax",
  Wallet: "people",
  PiggyBank: "people",
  ScrollText: "compliance",
  ShieldCheck: "compliance",
};

/** The course's icon on its own (for covers), without the tinted tile. */
export function CourseGlyph({ name, size = 28, strokeWidth = 1.6 }: { name: string; size?: number; strokeWidth?: number }) {
  const Icon = ICONS[name] ?? GraduationCap;
  return <Icon size={size} strokeWidth={strokeWidth} />;
}

export function TrackIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? GraduationCap;
  return (
    <span className={`${styles.trackIcon} ${styles[`area_${ICON_AREA[name] ?? "accounts"}`]}`}>
      <Icon size={size} />
    </span>
  );
}

export function ProgressBar({ pct, label }: { pct: number; label?: string }) {
  return (
    <div className={styles.bar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={styles.barFill} style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}

export function ReviewPill({ status }: { status: EffectiveReview }) {
  if (status === "reviewed")
    return (
      <span className="pill pill-accepted" title="Checked by a qualified reviewer">
        <CheckCircle2 size={11} /> Reviewed
      </span>
    );
  if (status === "needs_changes") return <span className="pill pill-declined">Under correction</span>;
  return (
    <span className="pill pill-viewed" title={status === "changed" ? "Edited since it was last reviewed" : "AI-drafted — not yet checked by a qualified reviewer"}>
      <Sparkles size={11} /> {status === "changed" ? "Edited since review" : "AI draft"}
    </span>
  );
}

export function StatusDot({ status }: { status: "none" | "started" | "completed" }) {
  return (
    <span className={`${styles.statusDot} ${status === "started" ? styles.statusStarted : status === "completed" ? styles.statusDone : ""}`} aria-label={status === "completed" ? "Completed" : status === "started" ? "Started" : "Not started"}>
      {status === "completed" && <CheckCircle2 size={14} />}
    </span>
  );
}
