ALTER TABLE "organizations" ADD COLUMN "skill_check_minutes_per_subject" integer DEFAULT 2 NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "skill_check_retake_months" integer DEFAULT 6 NOT NULL;--> statement-breakpoint
ALTER TABLE "skill_checks" ADD COLUMN "area" text;--> statement-breakpoint
ALTER TABLE "skill_checks" ADD COLUMN "asked" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "skill_checks" ADD COLUMN "not_reached" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "skill_checks" ADD COLUMN "timed_out" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "skill_checks" ADD COLUMN "duration_seconds" integer;