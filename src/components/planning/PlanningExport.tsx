"use client";

import { useState } from "react";
import { FileDown, FileText } from "lucide-react";

/** Word / PDF download buttons with an optional client or matter reference, printed on the memorandum. */
export function PlanningExport({ id, initialReference = "" }: { id: string; initialReference?: string }) {
  const [reference, setReference] = useState(initialReference);
  const href = (format: "docx" | "pdf") => `/api/planning/${id}/report?format=${format}${reference.trim() ? `&reference=${encodeURIComponent(reference.trim())}` : ""}`;
  return (
    <span className="row" style={{ gap: 6, flexWrap: "wrap" }}>
      <input
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        maxLength={120}
        placeholder="Client / matter ref (optional)"
        aria-label="Client or matter reference to print on the memorandum"
        style={{ width: 200, fontSize: 13, padding: "5px 9px" }}
      />
      <a href={href("docx")} className="btn btn-sm" download>
        <FileText size={13} /> Word
      </a>
      <a href={href("pdf")} className="btn btn-sm" download>
        <FileDown size={13} /> PDF
      </a>
    </span>
  );
}
