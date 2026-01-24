import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_page_type" AS ENUM('default', 'home', 'listings');
  CREATE TYPE "public"."enum_pages_listing" AS ENUM('events', 'clubs', 'organisations', 'pubs', 'sports');
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"page_type" "enum_pages_page_type" DEFAULT 'default' NOT NULL,
  	"listing" "enum_pages_listing",
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "main_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_id" integer
  );
  
  CREATE TABLE "main_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "branding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"logo_id" integer,
  	"header_logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "main_menu_items" ADD CONSTRAINT "main_menu_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu_items" ADD CONSTRAINT "main_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_header_logo_id_media_id_fk" FOREIGN KEY ("header_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "main_menu_items_order_idx" ON "main_menu_items" USING btree ("_order");
  CREATE INDEX "main_menu_items_parent_id_idx" ON "main_menu_items" USING btree ("_parent_id");
  CREATE INDEX "main_menu_items_link_idx" ON "main_menu_items" USING btree ("link_id");
  CREATE INDEX "branding_logo_idx" ON "branding" USING btree ("logo_id");
  CREATE INDEX "branding_header_header_logo_idx" ON "branding" USING btree ("header_logo_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "branding" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "main_menu_items" CASCADE;
  DROP TABLE "main_menu" CASCADE;
  DROP TABLE "branding" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_pages_listing";`)
}
