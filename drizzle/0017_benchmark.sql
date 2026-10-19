CREATE TABLE "benchmark_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"model_answer" text NOT NULL,
	"area" text NOT NULL,
	"created_by_name" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "benchmark_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" uuid NOT NULL,
	"query_id" uuid,
	"verdict" text,
	"note" text,
	"graded_by_name" text,
	"graded_by_credentials" text,
	"graded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "benchmark_results" ADD CONSTRAINT "benchmark_results_question_id_benchmark_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."benchmark_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "benchmark_results" ADD CONSTRAINT "benchmark_results_query_id_research_queries_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."research_queries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "benchmark_results_question_idx" ON "benchmark_results" USING btree ("question_id","created_at");