import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/** The one way an empty page or list looks: an icon, what's going on, and the next thing to do. */
export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: { href: string; label: string } }) {
  return (
    <div className="card empty-state">
      <span className="empty-state-icon">
        <Icon size={24} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <Link href={action.href} className="btn btn-primary btn-sm">
          {action.label}
        </Link>
      )}
    </div>
  );
}
