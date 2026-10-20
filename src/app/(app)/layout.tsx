import Link from "next/link";
import { requireUser } from "@/lib/auth/dal";
import { Sidebar } from "@/components/Sidebar";
import { NAV_ITEMS, type NavGroup, type NavKey } from "@/components/navItems";
import { CommandPalette, type PaletteItem } from "@/components/CommandPalette";
import { allLessons, getLesson, tracks } from "@/content";
import { LEVELS } from "@/content/types";
import { myProgress } from "@/lib/learning/progress";
import { orgHasFeature, planOf, trialDaysLeft } from "@/lib/plans";
import styles from "./shell.module.css";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const ctx = await requireUser();
  const { user, org, state, can } = ctx;

  // Learning, research, the team view, then the practice's own administration and (Capto staff only) the
  // platform. Each item appears only when the person holds the permission behind it.
  const learn: NavKey[] = ["dashboard"];
  if (can("learning.view")) learn.push("learn", "review", "flashcards", "skillsCheck", "progress", "coach");
  const research: NavKey[] = [];
  if (can("learning.view")) research.push("search", "rates", "cases", "calculators", "updates");
  if (can("research.use") && orgHasFeature(org, "research")) research.push("ask", "saved");
  if (can("research.register") && orgHasFeature(org, "research")) research.push("register");
  const manage: NavKey[] = [];
  if ((can("progress.view_team") || can("assignments.manage")) && orgHasFeature(org, "teamProgress")) manage.push("team");
  if (can("interviews.manage")) manage.push("interviews");

  const practice: NavKey[] = [];
  if (can("team.manage")) practice.push("admin.users");
  if (can("roles.manage")) practice.push("admin.roles");
  if (can("settings.firm")) practice.push("admin.practice", "admin.branding");
  if (can("billing.manage") && !ctx.isInternal) practice.push("admin.billing");
  if (can("audit.view") && orgHasFeature(org, "auditLog")) practice.push("admin.activity");

  const platform: NavKey[] = [];
  if (ctx.platformCan("platform.firms.view")) platform.push("platform.firms");
  if (ctx.platformCan("platform.firms.invite")) platform.push("platform.invitations");
  if (ctx.platformCan("platform.content.review")) platform.push("platform.knowledge", "platform.benchmark");
  if (ctx.isPlatformAdmin) platform.push("platform.team", "platform.roles");

  const groups: NavGroup[] = [
    { label: "Learn", items: learn },
    { label: "Research", items: research },
    { label: "Manage", items: manage },
    { label: "Review", items: ctx.platformCan("platform.content.review") ? ["platform.content"] : [] },
    { label: ctx.isInternal ? "Workspace admin" : "Practice admin", items: practice },
    { label: "Platform admin", items: platform },
  ];

  // Quick-jump index: every page this person can open, every course and every lesson.
  const SHORTCUT: Partial<Record<NavKey, string>> = { dashboard: "d", learn: "c", review: "r", flashcards: "f", progress: "p", coach: "o", search: "s", updates: "u", ask: "a", team: "t", interviews: "i", "platform.content": "v" };
  const canLearn = can("learning.view");
  const palette: PaletteItem[] = [
    ...groups.flatMap((g) => g.items.map((k) => ({ href: NAV_ITEMS[k].href, label: NAV_ITEMS[k].label, group: "Pages" as const, hint: g.label, key: SHORTCUT[k] }))),
    { href: "/account", label: "My account", group: "Pages" as const },
    ...(canLearn
      ? [
          ...tracks().map((t) => ({ href: `/learn/${t.slug}`, label: t.title, group: "Courses" as const, hint: t.summary })),
          ...allLessons().map((r) => ({ href: `/learn/${r.id}`, label: r.lesson.title, group: "Lessons" as const, hint: `${r.track.title} · ${LEVELS[r.lesson.level].label}` })),
        ]
      : []),
  ];

  // The lesson most recently worked on and not yet finished.
  let continueLesson: { href: string; title: string; course: string } | null = null;
  if (canLearn) {
    const last = [...(await myProgress(user.id)).values()].filter((p) => p.status === "started" && getLesson(p.lessonId)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
    const ref = last && getLesson(last.lessonId);
    if (ref) continueLesson = { href: `/learn/${ref.id}`, title: ref.lesson.title, course: ref.track.title };
  }

  const days = trialDaysLeft(org.trialEndsAt);
  const billingLink = can("billing.manage") ? (
    <Link href="/admin/billing">Choose a plan</Link>
  ) : (
    <span>Ask your firm&apos;s owner to choose a plan.</span>
  );

  return (
    <div className={styles.shell}>
      <Sidebar firmName={ctx.isInternal ? `${org.name} · Capto internal` : org.name} userName={user.name} roleLabel={ctx.roleLabel} groups={groups} continueLesson={continueLesson} />
      <CommandPalette items={palette} canAsk={can("research.use") && orgHasFeature(org, "research")} />
      <main className={styles.main}>
        {state === "suspended" && (
          <div className="alert alert-error" style={{ marginBottom: 18 }}>
            This account is suspended{org.suspendedReason ? ` — ${org.suspendedReason}` : ""}. You can view your progress but can&apos;t take lessons or use Ask Capto. Contact support to restore access.
          </div>
        )}
        {state === "trial_expired" && (
          <div className="alert alert-warning" style={{ marginBottom: 18 }}>
            Your free trial has ended, so lessons and Ask Capto are paused. {billingLink}
          </div>
        )}
        {state === "trial" && days <= 5 && (
          <div className="alert alert-info" style={{ marginBottom: 18 }}>
            {days === 0 ? "Your trial ends today." : `${days} day${days === 1 ? "" : "s"} left of your ${planOf("trial").label.toLowerCase()}.`} {billingLink}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
