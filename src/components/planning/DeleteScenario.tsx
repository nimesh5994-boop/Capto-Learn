"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteScenario } from "@/app/actions/planning";

/** Delete this scenario: asks first, then returns to the Tax planning page. */
export function DeleteScenario({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="stack" style={{ gap: 6 }}>
      <button
        className="btn btn-sm btn-danger"
        disabled={pending}
        onClick={() => {
          if (!window.confirm("Delete this scenario and its report? The researched answers stay in your research register. This can't be undone.")) return;
          setError(null);
          start(async () => {
            const r = await deleteScenario(id);
            if (!r.ok) return setError(r.error);
            router.push("/planning");
            router.refresh();
          });
        }}
      >
        <Trash2 size={13} /> {pending ? "Deleting…" : "Delete scenario"}
      </button>
      {error && <div className="alert alert-warning small">{error}</div>}
    </div>
  );
}
