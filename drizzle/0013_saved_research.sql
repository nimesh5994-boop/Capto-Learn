CREATE TABLE "saved_research" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"query_id" uuid NOT NULL,
	"title" text NOT NULL,
	"reference" text DEFAULT '' NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"source_versions" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saved_research" ADD CONSTRAINT "saved_research_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_research" ADD CONSTRAINT "saved_research_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_research" ADD CONSTRAINT "saved_research_query_id_research_queries_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."research_queries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "saved_research_user_query_idx" ON "saved_research" USING btree ("user_id","query_id");--> statement-breakpoint
CREATE INDEX "saved_research_org_idx" ON "saved_research" USING btree ("organization_id","created_at");