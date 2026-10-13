"use client";

import { useState, useTransition } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { rateBotAnswer } from "@/app/actions/bot";

/** 👍/👎 on the question bot's reading and instant answer; a 👎 asks what they were after. Feeds the Review centre. */
export function BotFeedback({ eventId, question }: { eventId: string; question: string }) {
  const [state, setState] = useState<"ask" | "note" | "done">("ask");
  const [note, setNote] = useState("");
  const [pending, start] = useTransition();
  const send = (helpful: boolean, text: string | null) =>
    start(async () => {
      await rateBotAnswer(eventId, helpful, text);
      setState("done");
    });

  if (state === "done") return <div className="small faint">Thanks — this helps the bot get better.</div>;
  if (state === "note")
    return (
      <form
        className="row"
        style={{ gap: 8, flexWrap: "wrap" }}
        onSubmit={(e) => {
          e.preventDefault();
          send(false, note.trim() || null);
        }}
      >
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What were you looking for? (optional)" aria-label="What were you looking for?" style={{ flex: 1, minWidth: 220 }} maxLength={500} autoFocus />
        <button className="btn btn-sm" disabled={pending}>
          Send
        </button>
      </form>
    );
  return (
    <div className="row small muted" style={{ gap: 8, flexWrap: "wrap" }}>
      <span>{question}</span>
      <button type="button" className="btn btn-ghost btn-sm" aria-label="Yes, helpful" disabled={pending} onClick={() => send(true, null)}>
        <ThumbsUp size={14} />
      </button>
      <button type="button" className="btn btn-ghost btn-sm" aria-label="No, not helpful" disabled={pending} onClick={() => setState("note")}>
        <ThumbsDown size={14} />
      </button>
    </div>
  );
}
