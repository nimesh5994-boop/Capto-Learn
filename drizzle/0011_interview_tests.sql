CREATE TABLE "interview_tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"created_by_id" uuid,
	"created_by_name" text,
	"candidate_name" text NOT NULL,
	"candidate_email" text,
	"role" text,
	"tracks" jsonb NOT NULL,
	"difficulty" text DEFAULT 'experienced' NOT NULL,
	"question_count" integer NOT NULL,
	"minutes" integer NOT NULL,
	"token_hash" text NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'ready' NOT NULL,
	"session_hash" text,
	"declaration" jsonb,
	"questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"events" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"score" integer,
	"started_at" timestamp with time zone,
	"deadline_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "interview_tests" ADD CONSTRAINT "interview_tests_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_tests" ADD CONSTRAINT "interview_tests_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "interview_tests_org_idx" ON "interview_tests" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "interview_tests_token_uq" ON "interview_tests" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "interview_tests_code_idx" ON "interview_tests" USING btree ("code");