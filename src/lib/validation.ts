import * as z from "zod";

export const ProfileSchema = z.object({
  entityType: z.enum(["individual", "sole_trader", "partnership", "llp", "ltd"]),
  turnoverBand: z.enum(["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]),
  recordQuality: z.enum(["excellent", "good", "average", "poor"]),
  bookkeepingSystem: z.enum(["cloud", "desktop", "spreadsheet", "paper"]),
  industry: z.enum(["standard", "professional", "property", "stock", "construction", "ecommerce"]),
});
