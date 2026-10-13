CREATE TABLE "content_review_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lesson_id" text NOT NULL,
	"status" text NOT NULL,
	"content_hash" text NOT NULL,
	"reviewer_user_id" uuid,
	"reviewer_name" text,
	"notes" text,
	"checklist" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content_review_events" ADD CONSTRAINT "content_review_events_reviewer_user_id_users_id_fk" FOREIGN KEY ("reviewer_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "content_review_events_lesson_idx" ON "content_review_events" USING btree ("lesson_id","created_at");--> statement-breakpoint
CREATE INDEX "content_review_events_created_idx" ON "content_review_events" USING btree ("created_at");--> statement-breakpoint
INSERT INTO "content_review_events" ("lesson_id", "status", "content_hash", "reviewer_user_id", "reviewer_name", "notes", "created_at")
SELECT "lesson_id", "status", coalesce("content_hash", ''), "reviewer_user_id", "reviewer_name", "notes", coalesce("reviewed_at", "updated_at") FROM "content_reviews";
