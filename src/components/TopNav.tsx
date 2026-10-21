"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Menu, MessageSquareQuote, PanelLeftClose, PanelLeftOpen, PlayCircle, Search, UserRound, X } from "lucide-react";
import { NAV_ITEMS, type NavKey } from "./navItems";
import { NAV_CATEGORIES, RAIL_PERSONAL, RAIL_QUICK, type NavCategoryId } from "@/lib/navGroups";
import { logout } from "@/app/actions/auth";
import { CaptoLogo } from "./CaptoLogo";
import { ThemeToggle } from "./ThemeToggle";
import { openPalette } from "./CommandPalette";
import styles from "./TopNav.module.css";

type VisibleCategory = { id: NavCategoryId; label: string; keys: NavKey[] };
type Open = { id: string; pinned: boolean; left: number } | null;

const ICONS = Object.fromEntries(NAV_CATEGORIES.map((c) => [c.id, c.icon])) as Record<NavCategoryId, (typeof NAV_CATEGORIES)[number]["icon"]>;
const MOBILE_MAX = 900;
const CLOSE_DELAY_MS = 160;

/** Sticky top navigation: grouped dropdown panels on desktop (disclosure pattern), a full-height sheet of
 *  expandable sections on phones and tablets. */
export function TopNav({
  firmName,
  userName,
  roleLabel,
  categories,
  adminLabel,
  continueLesson,
  visibleKeys,
  railOpen,
}: {
  firmName: string;
  userName: string;
  roleLabel: string;
  categories: VisibleCategory[];
  adminLabel: string;
  continueLesson?: { href: string; title: string; course: string } | null;
  visibleKeys: NavKey[];
  /** Initial state of the left icon rail (always collapsed: the expanded rail is a temporary overlay). */
  railOpen: boolean;
}) {
  const pathname = usePathname();
  const uid = useId();
  const [open, setOpen] = useState<Open>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sections, setSections] = useState<string[]>([]);
  const [mac, setMac] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const [rail, setRail] = useState(railOpen);
  const [tip, setTip] = useState<{ label: string; top: number } | null>(null);
  const railRef = useRef<HTMLElement>(null);
  const railToggleRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- platform check needs the browser
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  // Close everything whenever the page changes (adjusting state during render, per React guidance).
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(null);
    setMenuOpen(false);
    setRail(false);
    setTip(null);
  }

  // The expanded rail is a temporary overlay (it covers page content), so its state is deliberately NOT remembered:
  // every page load starts as the slim icon strip, and it closes again on navigation, Escape or an outside click.

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href || (href === "/platform" && pathname.startsWith("/platform/firms")) : pathname === href || pathname.startsWith(`${href}/`);
  const activeCategory = categories.find((c) => c.keys.some((k) => isActive(NAV_ITEMS[k].href, NAV_ITEMS[k].exact)))?.id;
  const labelFor = (c: VisibleCategory) => (c.id === "admin" ? adminLabel : c.id === "platform" ? "Platform admin" : c.label);

  const getBtn = (id: string) => barRef.current?.querySelector<HTMLButtonElement>(`[data-catbtn="${CSS.escape(id)}"]`) ?? null;
  const clearTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const close = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setOpen(null);
  }, []);

  // Place the panel under its button, kept inside the viewport.
  const openPanel = (id: string, pinned: boolean, width: number, align: "start" | "end" = "start") => {
    clearTimer();
    const btn = getBtn(id);
    let left = 12;
    if (btn) {
      const r = btn.getBoundingClientRect();
      const w = Math.min(width, window.innerWidth - 24);
      left = align === "end" ? r.right - w : r.left;
      left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
    }
    setOpen({ id, pinned, left });
  };
  const widthFor = (c: VisibleCategory) => (c.keys.length > 4 ? 620 : 340);

  // Outside click / Escape / resize close the panels and the sheet.
  useEffect(() => {
    if (!open && !menuOpen && !rail) return;
    const onDown = (e: PointerEvent) => {
      if (open && barRef.current && !barRef.current.contains(e.target as Node)) close();
      if (rail && railRef.current && !railRef.current.contains(e.target as Node)) setRail(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        const btn = getBtn(open.id);
        const focusInside = !!barRef.current?.contains(document.activeElement) && document.activeElement !== document.body;
        close();
        if (focusInside) btn?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      } else if (rail) {
        const inside = railRef.current?.contains(document.activeElement);
        setRail(false);
        if (inside) railToggleRef.current?.focus();
      }
    };
    const onResize = () => {
      close();
      if (window.innerWidth > MOBILE_MAX) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, menuOpen, rail, close]);

  // Lock page scroll while the phone sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const ids = [...categories.map((c) => c.id as string), "account"];
  const focusButton = (id: string) => getBtn(id)?.focus();
  const panelLinks = (id: string) => Array.from(document.querySelectorAll<HTMLElement>(`[data-panel="${CSS.escape(id)}"] a, [data-panel="${CSS.escape(id)}"] button`));

  function onButtonKey(e: React.KeyboardEvent, id: string, width: number, align: "start" | "end") {
    const i = ids.indexOf(id);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = ids[(i + (e.key === "ArrowRight" ? 1 : -1) + ids.length) % ids.length];
      focusButton(next);
      if (open) {
        const nextCat = categories.find((c) => c.id === next);
        openPanel(next, true, nextCat ? widthFor(nextCat) : 240, next === "account" ? "end" : "start");
      }
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      focusButton(e.key === "Home" ? ids[0] : ids[ids.length - 1]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      openPanel(id, true, width, align);
      // The panel is hidden until it renders open; focus its first link on the next frame.
      requestAnimationFrame(() => panelLinks(id)[0]?.focus());
    }
  }

  function onPanelKey(e: React.KeyboardEvent, id: string) {
    const links = panelLinks(id);
    const i = links.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(i + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) focusButton(id);
      else links[i - 1]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1]?.focus();
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = ids[(ids.indexOf(id) + (e.key === "ArrowRight" ? 1 : -1) + ids.length) % ids.length];
      focusButton(next);
      const nextCat = categories.find((c) => c.id === next);
      openPanel(next, true, nextCat ? widthFor(nextCat) : 240, next === "account" ? "end" : "start");
    }
  }

  const hoverEnter = (e: React.PointerEvent, id: string, width: number, align: "start" | "end" = "start") => {
    if (e.pointerType !== "mouse") return;
    if (open?.id === id) clearTimer();
    else openPanel(id, false, width, align);
  };
  const hoverLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || open?.pinned) return;
    clearTimer();
    closeTimer.current = setTimeout(close, CLOSE_DELAY_MS);
  };
  // Tabbing out of a group closes it.
  const groupBlur = (e: React.FocusEvent, id: string) => {
    if (open?.id === id && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) close();
  };

  const toggleMenu = () => {
    if (!menuOpen) setSections(activeCategory ? [activeCategory] : []);
    close();
    setMenuOpen((o) => !o);
  };
  const toggleSection = (id: string) => setSections((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const showContinue = continueLesson && !pathname.startsWith(continueLesson.href);
  const accountId = `${uid}-panel-account`;
  const accountOpen = open?.id === "account";

  const itemLink = (key: NavKey, onClick: () => void, withDesc = true) => {
    const { href, label, description, icon: Icon, exact } = NAV_ITEMS[key];
    const on = isActive(href, exact);
    return (
      <Link key={key} href={href} onClick={onClick} aria-current={on ? "page" : undefined} className={`${styles.item} ${on ? styles.itemActive : ""}`}>
        <span className={styles.itemIcon}>
          <Icon size={17} strokeWidth={2} />
        </span>
        <span className={styles.itemText}>
          <span className={styles.itemLabel}>{label}</span>
          {withDesc && <span className={styles.itemDesc}>{description}</span>}
        </span>
      </Link>
    );
  };

  const showTip = (el: HTMLElement, label: string) => {
    const r = el.getBoundingClientRect();
    setTip({ label, top: r.top + r.height / 2 });
  };
  const railAnchor = (href: string, label: string, Icon: (typeof NAV_CATEGORIES)[number]["icon"], on: boolean, quick = false) => (
    <Link
      key={href}
      href={href}
      aria-label={label}
      aria-current={on ? "page" : undefined}
      onClick={() => setRail(false)}
      onPointerEnter={(e) => !rail && showTip(e.currentTarget, label)}
      onPointerLeave={() => setTip(null)}
      onFocus={(e) => !rail && showTip(e.currentTarget, label)}
      onBlur={() => setTip(null)}
      className={`${styles.railItem} ${quick ? styles.railQuick : ""} ${on ? styles.railActive : ""}`}
    >
      <span className={styles.railIcon}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <span className={styles.railLabel}>{label}</span>
    </Link>
  );
  const railLink = (key: NavKey, quick = false) => {
    const { href, label, icon, exact } = NAV_ITEMS[key];
    return railAnchor(href, label, icon, isActive(href, exact), quick);
  };
  const personal = RAIL_PERSONAL.filter((k) => visibleKeys.includes(k));
  const quickKeys = RAIL_QUICK.filter((k) => visibleKeys.includes(k));

  return (
    <>
    <header className={styles.bar} ref={barRef}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Capto Learn — dashboard">
          <CaptoLogo />
          <span className={styles.firm} title={firmName}>
            {firmName}
          </span>
        </Link>

        <nav className={styles.cats} aria-label="Main">
          <ul>
            {/* eslint-disable-next-line react-hooks/refs -- handlers only touch refs on events; the rule cannot see through the callbacks */}
            {categories.map((c) => {
              const isOpen = open?.id === c.id;
              const Icon = ICONS[c.id];
              const panelId = `${uid}-panel-${c.id}`;
              const w = widthFor(c);
              return (
                <li key={c.id} className={styles.cat} onPointerEnter={(e) => hoverEnter(e, c.id, w)} onPointerLeave={(e) => hoverLeave(e)} onBlur={(e) => groupBlur(e, c.id)}>
                  <button
                    type="button"
                    data-catbtn={c.id}
                    className={`${styles.catBtn} ${activeCategory === c.id ? styles.catCurrent : ""} ${isOpen ? styles.catOpen : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => (isOpen && open?.pinned ? close() : openPanel(c.id, true, w))}
                    onKeyDown={(e) => onButtonKey(e, c.id, w, "start")}
                  >
                    {c.label}
                    <ChevronDown size={14} className={styles.chev} aria-hidden />
                  </button>
                  <div
                    id={panelId}
                    data-panel={c.id}
                    hidden={!isOpen}
                    className={`${styles.panel} ${c.keys.length > 4 ? styles.panelWide : ""}`}
                    style={{ left: open?.left ?? 0, width: w }}
                    onKeyDown={(e) => onPanelKey(e, c.id)}
                  >
                    <div className={styles.panelHead}>
                      <Icon size={14} aria-hidden /> {labelFor(c)}
                    </div>
                    {c.id === "learn" && showContinue && (
                      <Link href={continueLesson.href} onClick={() => close()} className={styles.continue} title={continueLesson.course}>
                        <PlayCircle size={15} />
                        <span className={styles.continueText}>
                          <span className={styles.continueKicker}>Continue learning</span>
                          <span className={styles.continueTitle}>{continueLesson.title}</span>
                        </span>
                      </Link>
                    )}
                    <div className={styles.items}>{c.keys.map((k) => itemLink(k, () => close()))}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.right}>
          {visibleKeys.includes("ask") && (
            <Link href={NAV_ITEMS.ask.href} className={styles.askBtn}>
              <MessageSquareQuote size={15} /> Ask Capto
            </Link>
          )}
          <button type="button" className={styles.jump} onClick={openPalette} aria-label="Search or jump to">
            <Search size={15} />
            <span className={styles.jumpText}>Jump to…</span>
            <kbd>{mac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <ThemeToggle />
          <div className={styles.account} onBlur={(e) => groupBlur(e, "account")}>
            <button
              type="button"
              data-catbtn="account"
              className={`${styles.accountBtn} ${pathname.startsWith("/account") ? styles.catCurrent : ""} ${accountOpen ? styles.catOpen : ""}`}
              aria-expanded={accountOpen}
              aria-controls={accountId}
              aria-label={`Account menu, ${userName}`}
              onClick={() => (accountOpen ? close() : openPanel("account", true, 250, "end"))}
              onKeyDown={(e) => onButtonKey(e, "account", 250, "end")}
            >
              <span className={styles.avatar} aria-hidden>
                {userName.trim().charAt(0).toUpperCase() || <UserRound size={14} />}
              </span>
              <span className={styles.who}>
                <span className={styles.whoName}>{userName}</span>
                <span className={styles.whoRole}>{roleLabel}</span>
              </span>
              <ChevronDown size={14} className={styles.chev} aria-hidden />
            </button>
            <div id={accountId} data-panel="account" hidden={!accountOpen} className={`${styles.panel} ${styles.accountPanel}`} style={{ left: open?.left ?? 0, width: 250 }} onKeyDown={(e) => onPanelKey(e, "account")}>
              <div className={styles.accountHead}>
                <span className={styles.whoName}>{userName}</span>
                <span className={styles.whoRole}>{roleLabel}</span>
              </div>
              <Link href="/account" onClick={() => close()} aria-current={pathname.startsWith("/account") ? "page" : undefined} className={`${styles.menuLink} ${pathname.startsWith("/account") ? styles.itemActive : ""}`}>
                <UserRound size={16} /> My account
              </Link>
              <form action={logout}>
                <button type="submit" className={styles.menuLink}>
                  <LogOut size={16} /> Sign out
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.mobileActions}>
          <button type="button" className={styles.iconBtn} aria-label="Search or jump to" onClick={openPalette}>
            <Search size={19} />
          </button>
          <button
            type="button"
            ref={burgerRef}
            className={styles.iconBtn}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={`${uid}-sheet`}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id={`${uid}-sheet`} className={styles.sheet} hidden={!menuOpen}>
        <nav aria-label="Main (menu)" className={styles.sheetNav}>
          {showContinue && (
            <Link href={continueLesson.href} className={styles.sheetContinue} onClick={() => setMenuOpen(false)}>
              <span className={styles.continueKicker}>
                <PlayCircle size={12} /> Continue learning
              </span>
              <span className={styles.sheetContinueTitle}>{continueLesson.title}</span>
              <span className={styles.itemDesc}>{continueLesson.course}</span>
            </Link>
          )}
          {categories.map((c) => {
            const isOpen = sections.includes(c.id);
            const Icon = ICONS[c.id];
            const secId = `${uid}-sec-${c.id}`;
            return (
              <section key={c.id} className={styles.section}>
                <button type="button" className={`${styles.sectionBtn} ${activeCategory === c.id ? styles.catCurrent : ""}`} aria-expanded={isOpen} aria-controls={secId} onClick={() => toggleSection(c.id)}>
                  <Icon size={18} aria-hidden />
                  <span className={styles.sectionLabel}>{labelFor(c)}</span>
                  <ChevronDown size={18} className={`${styles.chev} ${isOpen ? styles.chevOpen : ""}`} aria-hidden />
                </button>
                <div id={secId} hidden={!isOpen} className={styles.sectionBody}>
                  {c.keys.map((k) => itemLink(k, () => setMenuOpen(false)))}
                </div>
              </section>
            );
          })}
        </nav>
        <div className={styles.sheetAccount}>
          <div className={styles.accountHead}>
            <span className={styles.whoName}>{userName}</span>
            <span className={styles.whoRole}>{roleLabel}</span>
          </div>
          <Link href="/account" onClick={() => setMenuOpen(false)} className={`${styles.menuLink} ${pathname.startsWith("/account") ? styles.itemActive : ""}`}>
            <UserRound size={16} /> My account
          </Link>
          <div className={styles.themeRow}>
            <span>Theme</span>
            <ThemeToggle />
          </div>
          <form action={logout}>
            <button type="submit" className={styles.menuLink}>
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
    <aside ref={railRef} className={`${styles.rail} ${rail ? styles.railOpen : ""}`} aria-label="Quick navigation">
      <button
        type="button"
        ref={railToggleRef}
        className={styles.railToggle}
        aria-expanded={rail}
        aria-label={rail ? "Collapse sidebar" : "Expand sidebar"}
        onClick={() => {
          setTip(null);
          setRail((o) => !o);
        }}
        onPointerEnter={(e) => !rail && showTip(e.currentTarget, "Expand sidebar")}
        onPointerLeave={() => setTip(null)}
      >
        <span className={styles.railIcon}>{rail ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}</span>
        <span className={styles.railLabel}>Collapse</span>
      </button>
      <nav className={styles.railNav} aria-label="My pages">
        {personal.map((k) => railLink(k))}
        {railAnchor("/account", "My account", UserRound, pathname.startsWith("/account"))}
      </nav>
      {quickKeys.length > 0 && (
        <nav className={styles.railQuickBlock} aria-label="Quick actions">
          {quickKeys.map((k) => railLink(k, true))}
        </nav>
      )}
      {!rail && tip && (
        <div role="tooltip" className={styles.tip} style={{ top: tip.top }}>
          {tip.label}
        </div>
      )}
    </aside>
    </>
  );
}
