"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/reviewer", label: "Overview", match: (p: string) => p === "/reviewer" || (/^\/reviewer\/[^/]+$/.test(p) && p !== "/reviewer/register") || p.startsWith("/reviewer/lesson/") },
  { href: "/reviewer/register", label: "Approvals register", match: (p: string) => p.startsWith("/reviewer/register") },
  { href: "/platform/content", label: "Learner reports", match: () => false },
];

export function ReviewerTabs() {
  const path = usePathname();
  return (
    <nav aria-label="Review centre" className="row" style={{ gap: 4, marginBottom: 16, borderBottom: "1px solid var(--border)" }}>
      {TABS.map((t) => {
        const on = t.match(path);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={on ? "page" : undefined}
            style={{
              padding: "8px 12px",
              fontSize: 13.5,
              fontWeight: on ? 600 : 500,
              color: on ? "var(--primary)" : "var(--text-muted)",
              borderBottom: `2px solid ${on ? "var(--primary)" : "transparent"}`,
              marginBottom: -1,
              textDecoration: "none",
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
