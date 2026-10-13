"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { newInterviewLink, revokeInterview } from "@/app/actions/interviews";

/** For a test that hasn't started: get a fresh link (if the old one was lost), or withdraw it. */
export function RowActions({ id }: { id: string }) {
  const router = useRouter();
  const [link, setLink] = useState<string | null>(null);
  const [pending, start] = useTransition();
  if (link)
    return (
      <span className="row small" style={{ gap: 6, justifyContent: "flex-end" }}>
        <code style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link}</code>
        <button type="button" className="btn btn-sm" onClick={() => void navigator.clipboard.writeText(link)}>
          Copy
        </button>
      </span>
    );
  return (
    <span className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
      <button
        type="button"
        className="btn btn-sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await newInterviewLink(id);
            if (r.ok) setLink(`${window.location.origin}/interview/${r.data.token}`);
          })
        }
      >
        New link
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            if (!window.confirm("Withdraw this test? The link and code will stop working.")) return;
            await revokeInterview(id);
            router.refresh();
          })
        }
      >
        Withdraw
      </button>
    </span>
  );
}
