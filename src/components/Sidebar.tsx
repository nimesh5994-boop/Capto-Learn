"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, PlayCircle, Search, X } from "lucide-react";
import { NAV_ITEMS, type NavGroup } from "./navItems";

export type { NavGroup, NavKey } from "./navItems";
import { logout } from "@/app/actions/auth";
import { CaptoLogo } from "./CaptoLogo";
import { ThemeToggle } from "./ThemeToggle";
import { openPalette } from "./CommandPalette";
import styles from "./Sidebar.module.css";



export function Sidebar({
  firmName,
  userName,
  roleLabel,
  groups,
  continueLesson,
}: {
  firmName: string;
  userName: string;
  roleLabel: string;
  groups: NavGroup[];
  continueLesson?: { href: string; title: string; course: string } | null;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mac, setMac] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- platform check needs the browser
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);
  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to navigation
    setMenuOpen(false);
  }, [pathname]);
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href || (href === "/platform" && pathname.startsWith("/platform/firms")) : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
      <div className={styles.brand}>
        <Link href="/" aria-label="Capto Learn — dashboard" style={{ textDecoration: "none" }}>
          <CaptoLogo />
        </Link>
        <div className={styles.firm}>{firmName}</div>
        <div className={styles.mobileActions}>
          <button type="button" className="btn btn-ghost btn-sm" aria-label="Search or jump to" onClick={openPalette}>
            <Search size={17} />
          </button>
          <button type="button" className="btn btn-ghost btn-sm" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <button type="button" className={styles.jump} onClick={openPalette}>
        <Search size={14} />
        <span>Jump to…</span>
        <kbd>{mac ? "⌘" : "Ctrl"} K</kbd>
      </button>
      {continueLesson && !pathname.startsWith(continueLesson.href) && (
        <Link href={continueLesson.href} className={styles.continue} title={continueLesson.title}>
          <span className={styles.continueKicker}>
            <PlayCircle size={12} /> Continue learning
          </span>
          <span className={styles.continueTitle}>{continueLesson.title}</span>
          <span className={styles.continueCourse}>{continueLesson.course}</span>
        </Link>
      )}
      <nav className={styles.nav}>
        {groups
          .filter((g) => g.items.length > 0)
          .map((g, i) => (
            <div key={g.label} className={styles.group}>
              {i > 0 && <div className={styles.divider} />}
              <div className={styles.groupLabel}>{g.label}</div>
              {g.items.map((key) => {
                const { href, label, icon: Icon, exact } = NAV_ITEMS[key];
                const on = isActive(href, exact);
                return (
                  <Link key={key} href={href} aria-current={on ? "page" : undefined} className={`${styles.link} ${on ? styles.active : ""}`}>
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
