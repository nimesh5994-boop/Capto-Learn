CREATE TABLE "cpd_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"activity_date" timestamp with time zone NOT NULL,
	"title" text NOT NULL,
	"provider" text DEFAULT '' NOT NULL,
	"kind" text NOT NULL,
	"minutes" integer NOT NULL,
	"reflection" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cpd_entries" ADD CONSTRAINT "cpd_entries_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cpd_entries" ADD CONSTRAINT "cpd_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cpd_entries_user_idx" ON "cpd_entries" USING btree ("user_id","activity_date");