CREATE TABLE "kb_documents" (
	"url" text PRIMARY KEY NOT NULL,
	"kind" text NOT NULL,
	"collection" text NOT NULL,
	"title" text NOT NULL,
	"publisher" text NOT NULL,
	"source_updated_at" timestamp with time zone,
	"content_hash" text NOT NULL,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL,
	"removed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "kb_passages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_url" text NOT NULL,
	"ord" integer NOT NULL,
	"heading" text,
	"body" text NOT NULL,
	"tsv" "tsvector" GENERATED ALWAYS AS (setweight(to_tsvector('english', coalesce(heading, '')), 'A') || setweight(to_tsvector('english', body), 'B')) STORED NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kb_sync_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trigger" text NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"listed" integer DEFAULT 0 NOT NULL,
	"added" integer DEFAULT 0 NOT NULL,
	"updated" integer DEFAULT 0 NOT NULL,
	"removed" integer DEFAULT 0 NOT NULL,
	"failed" integer DEFAULT 0 NOT NULL,
	"lessons_affected" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"library_retired" integer DEFAULT 0 NOT NULL,
	"note" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "kb_passages" ADD CONSTRAINT "kb_passages_document_url_kb_documents_url_fk" FOREIGN KEY ("document_url") REFERENCES "public"."kb_documents"("url") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "kb_documents_collection_idx" ON "kb_documents" USING btree ("collection");--> statement-breakpoint
CREATE INDEX "kb_passages_doc_idx" ON "kb_passages" USING btree ("document_url");--> statement-breakpoint
CREATE INDEX "kb_passages_tsv_idx" ON "kb_passages" USING gin ("tsv");