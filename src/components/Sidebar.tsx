"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpenCheck,
  Building2,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareQuote,
  Search,
  Database,
  Palette,
  ShieldCheck,
  UserCog,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import { CaptoLogo } from "./CaptoLogo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Sidebar.module.css";

export type NavKey =
  | "dashboard"
  | "learn"
  | "search"
  | "ask"
  | "team"
  | "admin.users"
  | "admin.roles"
  | "admin.practice"
  | "admin.branding"
  | "admin.billing"
  | "admin.activity"
  | "platform.firms"
  | "platform.invitations"
  | "platform.content"
  | "platform.knowledge"
  | "platform.team"
  | "platform.roles";

const ITEMS: Record<NavKey, { href: string; label: string; icon: LucideIcon; exact?: boolean }> = {
  dashboard: { href: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  learn: { href: "/learn", label: "Courses", icon: GraduationCap },
  search: { href: "/search", label: "Guidance search", icon: Search },
  ask: { href: "/ask", label: "Ask Capto", icon: MessageSquareQuote },
  team: { href: "/team", label: "Team training", icon: ClipboardCheck },
  "admin.users": { href: "/admin/users", label: "Users", icon: UsersRound },
  "admin.roles": { href: "/admin/roles", label: "Roles", icon: UserCog },
  "admin.practice": { href: "/admin/practice", label: "Practice details", icon: Building2 },
  "admin.branding": { href: "/admin/branding", label: "Branding", icon: Palette },
  "admin.billing": { href: "/admin/billing", label: "Plan & billing", icon: CreditCard },
  "admin.activity": { href: "/admin/activity", label: "Activity log", icon: Activity },
  "platform.firms": { href: "/platform", label: "Firms", icon: Building2, exact: true },
  "platform.invitations": { href: "/platform/invitations", label: "Firm invitations", icon: Mail },
  "platform.content": { href: "/platform/content", label: "Content review", icon: BookOpenCheck },
  "platform.knowledge": { href: "/platform/knowledge", label: "Knowledge base", icon: Database },
  "platform.team": { href: "/platform/team", label: "Platform team", icon: ShieldCheck },
  "platform.roles": { href: "/platform/roles", label: "Platform roles", icon: UserCog },
};

export type NavGroup = { label: string; items: NavKey[] };

export function Sidebar({ firmName, userName, roleLabel, groups }: { firmName: string; userName: string; roleLabel: string; groups: NavGroup[] }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href || (href === "/platform" && pathname.startsWith("/platform/firms")) : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Link href="/" aria-label="Capto Learn — dashboard" style={{ textDecoration: "none" }}>
          <CaptoLogo />
        </Link>
        <div className={styles.firm}>{firmName}</div>
      </div>
      <nav className={styles.nav}>
        {groups
          .filter((g) => g.items.length > 0)
          .map((g, i) => (
            <div key={g.label} className={styles.group}>
              {i > 0 && <div className={styles.divider} />}
              <div className={styles.groupLabel}>{g.label}</div>
              {g.items.map((key) => {
                const { href, label, icon: Icon, exact } = ITEMS[key];
                return (
                  <Link key={key} href={href} className={`${styles.link} ${isActive(href, exact) ? styles.active : ""}`}>
                    <Icon size={16} strokeWidth={2} />
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
      </nav>
      <div className={styles.foot}>
        <Link href="/account" className={`${styles.user} ${pathname.startsWith("/account") ? styles.userActive : ""}`} title="My account">
          <span className={styles.userName}>{userName}</span>
          <span className={styles.role}>{roleLabel}</span>
        </Link>
        <ThemeToggle />
        <form action={logout}>
          <button className="btn btn-ghost btn-sm" title="Sign out" aria-label="Sign out">
            <LogOut size={15} />
          </button>
        </form>
      </div>
    </aside>
  );
}
