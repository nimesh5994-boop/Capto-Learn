"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, BookOpen, CornerDownLeft, GraduationCap, History, LayoutGrid, MessageSquareQuote, Search } from "lucide-react";
import styles from "./CommandPalette.module.css";

export interface PaletteItem {
  href: string;
  label: string;
  group: "Pages" | "Courses" | "Lessons";
  hint?: string;
  /** Single key for the "g then key" shortcut, pages only. */
  key?: string;
}

const RECENT_KEY = "capto-recent";
const OPEN_EVENT = "capto:palette";

/** Opens the palette from anywhere (e.g. the sidebar's search button). */
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

const readRecent = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
};

function score(item: PaletteItem, words: string[]): number {
  const label = item.label.toLowerCase();
  const all = `${label} ${(item.hint ?? "").toLowerCase()}`;
  if (!words.every((w) => all.includes(w))) return 0;
  let s = 1;
  if (label.startsWith(words[0])) s += 3;
  if (words.every((w) => label.includes(w))) s += 2;
  if (item.group === "Pages") s += 1.5;
  if (item.group === "Courses") s += 1;
  return s;
}

/**
 * Quick jump: Ctrl/⌘ K or "/" opens it; type to find any page, course or lesson, or send the text straight to
 * Ask Capto or the guidance search. "g" then a letter jumps to a page; "?" lists the shortcuts.
 */
export function CommandPalette({ items, canAsk }: { items: PaletteItem[]; canAsk: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [help, setHelp] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const byHref = useMemo(() => new Map(items.map((i) => [i.href, i])), [items]);

  const show = useCallback((withHelp = false) => {
    setRecent(readRecent());
    setQ("");
    setSel(0);
    setHelp(withHelp);
    setOpen(true);
  }, []);

  // Remember lessons and courses visited, for the "Recent" list.
  useEffect(() => {
    if (!byHref.has(pathname) || byHref.get(pathname)!.group === "Pages") return;
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify([pathname, ...readRecent().filter((h) => h !== pathname)].slice(0, 6)));
    } catch {}
  }, [pathname, byHref]);

  useEffect(() => {
    let pendingG = 0;
    const typing = (t: EventTarget | null) => t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
        return;
      }
      if (open || typing(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        show();
      } else if (e.key === "?") {
        e.preventDefault();
        show(true);
      } else if (e.key === "g") {
        pendingG = Date.now();
      } else if (Date.now() - pendingG < 1200) {
        const target = items.find((i) => i.key === e.key.toLowerCase());
        pendingG = 0;
        if (target) {
          e.preventDefault();
          router.push(target.href);
        }
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, [open, items, router, show]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => input.current?.focus());
  }, [open]);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) {
      const rec = recent.map((h) => byHref.get(h)).filter((i): i is PaletteItem => !!i);
      return [...rec.map((i) => ({ ...i, group: "Recent" as const })), ...items.filter((i) => i.group === "Pages")];
    }
    return items
      .map((i) => ({ i, s: score(i, words) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.i);
  }, [q, items, recent, byHref]);

  const actions = q.trim().length >= 3 ? [...(canAsk ? [{ href: `/ask?q=${encodeURIComponent(q.trim())}`, label: `Ask Capto: “${q.trim()}”`, kind: "ask" as const }] : []), { href: `/search?q=${encodeURIComponent(q.trim())}`, label: `Search guidance and lessons for “${q.trim()}”`, kind: "search" as const }] : [];
  const flat = [...results.map((r) => ({ href: r.href })), ...actions.map((a) => ({ href: a.href }))];

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };
  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(flat.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter" && flat[sel]) {
      e.preventDefault();
      go(flat[sel].href);
    } else if (e.key === "Escape") setOpen(false);
  };
  useEffect(() => {
    list.current?.querySelector(`[data-idx="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;
  const shortcutPages = items.filter((i) => i.key);
  const rows = results.map((r, i) => ({ r, i, head: i === 0 || results[i - 1].group !== r.group ? r.group : null }));
  return (
    <div className={styles.backdrop} onMouseDown={() => setOpen(false)}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Quick jump" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onListKey}>
        <div className={styles.inputRow}>
          <Search size={17} />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
              setHelp(false);
            }}
            placeholder="Jump to a course, lesson or page — or type a question"
            aria-label="Search pages, courses and lessons"
          />
          <kbd>Esc</kbd>
        </div>
        {help ? (
          <div className={styles.help}>
            <div className={styles.groupLabel}>Keyboard shortcuts</div>
            <div className={styles.helpGrid}>
              <span>
                <kbd>Ctrl</kbd> <kbd>K</kbd> or <kbd>/</kbd>
              </span>
              <span>Quick jump</span>
              {shortcutPages.map((p) => (
                <span key={p.href} style={{ display: "contents" }}>
                  <span>
                    <kbd>g</kbd> then <kbd>{p.key}</kbd>
                  </span>
                  <span>{p.label}</span>
                </span>
              ))}
              <span>
                <kbd>?</kbd>
              </span>
              <span>This list</span>
            </div>
          </div>
        ) : (
          <div className={styles.list} ref={list} role="listbox">
            {rows.map(({ r, i, head }) => {
              const Icon = r.group === "Lessons" ? BookOpen : r.group === "Courses" ? GraduationCap : r.group === "Recent" ? History : LayoutGrid;
              return (
                <div key={`${r.group}${r.href}`}>
                  {head && <div className={styles.groupLabel}>{head}</div>}
                  <button type="button" data-idx={i} role="option" aria-selected={sel === i} className={`${styles.item} ${sel === i ? styles.itemOn : ""}`} onMouseMove={() => setSel(i)} onClick={() => go(r.href)}>
                    <Icon size={15} />
                    <span className={styles.itemLabel}>{r.label}</span>
                    {r.hint && <span className={styles.itemHint}>{r.hint}</span>}
                    {r.key && !q && (
                      <span className={styles.itemKeys}>
                        <kbd>g</kbd>
                        <kbd>{r.key}</kbd>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
            {actions.length > 0 && <div className={styles.groupLabel}>Ask or search</div>}
            {actions.map((a, k) => {
              const i = results.length + k;
              return (
                <button key={a.href} type="button" data-idx={i} role="option" aria-selected={sel === i} className={`${styles.item} ${sel === i ? styles.itemOn : ""}`} onMouseMove={() => setSel(i)} onClick={() => go(a.href)}>
                  {a.kind === "ask" ? <MessageSquareQuote size={15} /> : <Search size={15} />}
                  <span className={styles.itemLabel}>{a.label}</span>
                  <ArrowRight size={14} />
                </button>
              );
            })}
            {!results.length && !actions.length && <div className={styles.empty}>Nothing matches.</div>}
          </div>
        )}
        <div className={styles.foot}>
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> move
          </span>
          <span>
            <CornerDownLeft size={12} /> open
          </span>
          <button type="button" className={styles.helpLink} onClick={() => setHelp((h) => !h)}>
            {help ? "Back" : "Shortcuts"} <kbd>?</kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
