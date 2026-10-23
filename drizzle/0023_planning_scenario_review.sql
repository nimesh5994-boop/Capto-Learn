ALTER TABLE "planning_scenarios" ADD COLUMN "review_status" text;--> statement-breakpoint
ALTER TABLE "planning_scenarios" ADD COLUMN "reviewed_by_id" uuid;--> statement-breakpoint
ALTER TABLE "planning_scenarios" ADD COLUMN "reviewed_by_name" text;--> statement-breakpoint
ALTER TABLE "planning_scenarios" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "planning_scenarios" ADD COLUMN "review_note" text;--> statement-breakpoint
ALTER TABLE "planning_scenarios" ADD CONSTRAINT "planning_scenarios_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;