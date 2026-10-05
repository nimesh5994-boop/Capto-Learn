"use client";

import { useState, useTransition } from "react";
import { Share2 } from "lucide-react";
import { setAnswerShared } from "@/app/actions/research";

/** Shares a useful answer with the whole firm (it appears under "Shared in your firm"). */
export function ShareToggle({ id, initial }: { id: string; initial: boolean }) {
  const [shared, setShared] = useState(initial);
  const [pending, start] = useTransition();
  return (
    <div className="card card-pad row between">
      <span className="small">
        <Share2 size={13} /> {shared ? "Shared with your firm" : "Only you can see this"}
      </span>
      <button
        className="btn btn-sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await setAnswerShared(id, !shared);
            setShared(!shared);
          })
        }
      >
        {shared ? "Unshare" : "Share"}
      </button>
    </div>
  );
}
