ALTER TABLE "content_review_events" ADD COLUMN "reviewer_credentials" text;--> statement-breakpoint
ALTER TABLE "content_reviews" ADD COLUMN "reviewer_credentials" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "qualifications" text;