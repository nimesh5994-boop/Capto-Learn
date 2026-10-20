CREATE TABLE "case_refs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"citations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"url" text NOT NULL,
	"link_kind" text NOT NULL,
	"year" integer,
	"court" text,
	"mentions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"mention_count" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "case_refs_key_idx" ON "case_refs" USING btree ("key");--> statement-breakpoint
CREATE INDEX "case_refs_count_idx" ON "case_refs" USING btree ("mention_count");