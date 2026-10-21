CREATE TABLE "email_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid,
	"to_email" text NOT NULL,
	"subject" text NOT NULL,
	"kind" text NOT NULL,
	"related_id" text,
	"status" text NOT NULL,
	"provider_id" text,
	"error" text,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"delivered_at" timestamp with time zone,
	"opened_at" timestamp with time zone,
	"first_clicked_at" timestamp with time zone,
	"bounced_at" timestamp with time zone,
	"complained_at" timestamp with time zone,
	"delayed_at" timestamp with time zone,
	"last_event" text,
	"last_event_at" timestamp with time zone,
	"open_count" integer DEFAULT 0 NOT NULL,
	"click_count" integer DEFAULT 0 NOT NULL,
	"webhook_ids" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_log_org_sent_idx" ON "email_log" USING btree ("organization_id","sent_at");--> statement-breakpoint
CREATE UNIQUE INDEX "email_log_provider_idx" ON "email_log" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "email_log_related_idx" ON "email_log" USING btree ("related_id");--> statement-breakpoint
CREATE INDEX "email_log_to_idx" ON "email_log" USING btree ("to_email");