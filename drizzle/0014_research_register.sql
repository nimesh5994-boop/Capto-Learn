CREATE TABLE "research_exports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid,
	"user_name" text NOT NULL,
	"query_id" uuid NOT NULL,
	"doc_ref" text NOT NULL,
	"format" text NOT NULL,
	"reference" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "review_status" text;--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "reviewed_by_id" uuid;--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "reviewed_by_name" text;--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "review_note" text;--> statement-breakpoint
ALTER TABLE "research_exports" ADD CONSTRAINT "research_exports_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_exports" ADD CONSTRAINT "research_exports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "research_exports" ADD CONSTRAINT "research_exports_query_id_research_queries_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."research_queries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "research_exports_org_idx" ON "research_exports" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX "research_exports_query_idx" ON "research_exports" USING btree ("query_id");--> statement-breakpoint
ALTER TABLE "research_queries" ADD CONSTRAINT "research_queries_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;