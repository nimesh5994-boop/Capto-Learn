"use client";

import { useCallback, useState } from "react";

/** String state for a set of inputs, with example/clear helpers. */
export function useFields<T extends Record<string, string>>(example: T, blank: T) {
  const [values, setValues] = useState<T>(example);
  const set = useCallback((key: keyof T) => (v: string) => setValues((s) => ({ ...s, [key]: v })), []);
  return {
    values,
    set,
    loadExample: () => setValues(example),
    clear: () => setValues(blank),
  };
}
