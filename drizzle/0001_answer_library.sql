CREATE TABLE "answer_library" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"question" text NOT NULL,
	"restated_question" text NOT NULL,
	"answer" jsonb NOT NULL,
	"source_versions" jsonb NOT NULL,
	"origin_query_id" uuid,
	"hits" integer DEFAULT 0 NOT NULL,
	"last_hit_at" timestamp with time zone,
	"retired_at" timestamp with time zone,
	"retired_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "cost_micros" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "research_queries" ADD COLUMN "route" text;--> statement-breakpoint
ALTER TABLE "answer_library" ADD CONSTRAINT "answer_library_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_library" ADD CONSTRAINT "answer_library_origin_query_id_research_queries_id_fk" FOREIGN KEY ("origin_query_id") REFERENCES "public"."research_queries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answer_library_org_idx" ON "answer_library" USING btree ("organization_id","created_at");