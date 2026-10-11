CREATE TABLE "topic_briefs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_key" text NOT NULL,
	"area" text NOT NULL,
	"question" text NOT NULL,
	"restated_question" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"answer" jsonb,
	"source_versions" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"prepared" jsonb,
	"batch_id" text,
	"cost_micros" integer DEFAULT 0 NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	"failure_reason" text,
	"retired_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "topic_briefs_topic_idx" ON "topic_briefs" USING btree ("topic_key");--> statement-breakpoint
CREATE INDEX "topic_briefs_status_idx" ON "topic_briefs" USING btree ("status");