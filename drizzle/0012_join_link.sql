CREATE TABLE "join_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"decided_by_name" text,
	"decided_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "join_code" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "join_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "join_role" text DEFAULT 'staff' NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "join_domains" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "join_requests" ADD CONSTRAINT "join_requests_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "join_requests_org_idx" ON "join_requests" USING btree ("organization_id","status");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_join_code_unique" UNIQUE("join_code");