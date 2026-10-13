CREATE TABLE "bot_knowledge" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"concept" text NOT NULL,
	"intent" text NOT NULL,
	"question" text NOT NULL,
	"answer" jsonb NOT NULL,
	"source_versions" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"research_query_id" uuid,
	"uses" integer DEFAULT 0 NOT NULL,
	"retired_at" timestamp with time zone,
	"retired_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "bot_knowledge_concept_idx" ON "bot_knowledge" USING btree ("concept","intent");