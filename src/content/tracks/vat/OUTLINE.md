# Planned outline (authored index.ts before the interim rebuild)

Unwritten lessons: 

```ts
import type { Track } from "../../types";
import { lesson as inputTax } from "./lessons/input-tax-what-you-can-claim";

const track: Track = {
  slug: "vat",
  title: "VAT",
  icon: "Receipt",
  summary: "Placeholder — being written.",
  order: 4,
  modules: [{ slug: "recovering-vat", title: "Recovering VAT", level: "practitioner", summary: "x", lessons: [inputTax] }],
};
export default track;

```
