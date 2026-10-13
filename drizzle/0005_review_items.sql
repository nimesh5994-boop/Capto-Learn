CREATE TABLE "review_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"lesson_id" text NOT NULL,
	"question_id" text NOT NULL,
	"box" integer DEFAULT 1 NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"reviews" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"last_reviewed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "review_items" ADD CONSTRAINT "review_items_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_items" ADD CONSTRAINT "review_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "review_items_user_q_uq" ON "review_items" USING btree ("user_id","lesson_id","question_id");--> statement-breakpoint
CREATE INDEX "review_items_due_idx" ON "review_items" USING btree ("user_id","due_at");