"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import styles from "./ThemeToggle.module.css";

type ThemeChoice = "system" | "light" | "dark";

const STORAGE_KEY = "capto-theme";
const ORDER: ThemeChoice[] = ["system", "light", "dark"];
const ICON = { system: Monitor, light: Sun, dark: Moon };
const LABEL = { system: "Matching your system", light: "Light", dark: "Dark" };

function applyTheme(choice: ThemeChoice) {
  if (choice === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = choice;
}

function readStoredChoice(): ThemeChoice {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

// A minimal local pub/sub so useSyncExternalStore knows to re-render after
// cycle() below writes a new value — this only ever changes via this
// component's own click, never from another tab, so there's no need for a
// real `storage` event listener, just a way to notify after our own write.
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function notifyThemeChanged() {
  listeners.forEach((listener) => listener());
}

/** Cycles system → light → dark → system. Purely a per-browser preference
 *  (localStorage, not synced across devices like the List/Tile view
 *  toggle) — this was flagged as a low-priority nice-to-have, not worth
 *  a schema change/migration for. The root layout's inline blocking
 *  script applies whatever's stored here before first paint, so there's
 *  no flash of the wrong theme on load. useSyncExternalStore (rather than
 *  useState+useEffect) is the correct way to read this external,
 *  browser-only value — it has a built-in server/client snapshot split
 *  that avoids both a hydration mismatch and a set-state-in-effect. */
export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribe, readStoredChoice, () => "system" as ThemeChoice);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing / blocked storage — the toggle still works for
      // this page load via applyTheme below, it just won't persist.
    }
    applyTheme(next);
    notifyThemeChanged();
  }

  const Icon = ICON[choice];
  return (
    <button type="button" className={styles.button} onClick={cycle} title={`Theme: ${LABEL[choice]} — click to change`} aria-label={`Theme: ${LABEL[choice]}. Click to change.`}>
      <Icon size={18} />
    </button>
  );
}
