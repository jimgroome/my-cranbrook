import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_directory_sections_section" AS ENUM('sports', 'pubs', 'organisations', 'clubs');
  ALTER TYPE "public"."enum_pages_page_type" ADD VALUE 'directory';
  ALTER TYPE "public"."enum_pages_listing" ADD VALUE 'news' BEFORE 'events';
  CREATE TABLE "pages_directory_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" "enum_pages_directory_sections_section"
  );
  
  ALTER TABLE "news" ALTER COLUMN "date" SET DEFAULT '2026-03-08T13:27:56.053Z';
  ALTER TABLE "pages_directory_sections" ADD CONSTRAINT "pages_directory_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_directory_sections_order_idx" ON "pages_directory_sections" USING btree ("_order");
  CREATE INDEX "pages_directory_sections_parent_id_idx" ON "pages_directory_sections" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_directory_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_directory_sections" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_page_type";
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('default', 'home', 'listings');
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'default'::"public"."enum_pages_page_type";
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE "public"."enum_pages_page_type" USING "page_type"::"public"."enum_pages_page_type";
  ALTER TABLE "pages" ALTER COLUMN "listing" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_listing";
  CREATE TYPE "public"."enum_pages_listing" AS ENUM('events', 'clubs', 'organisations', 'pubs', 'sports');
  ALTER TABLE "pages" ALTER COLUMN "listing" SET DATA TYPE "public"."enum_pages_listing" USING "listing"::"public"."enum_pages_listing";
  ALTER TABLE "news" ALTER COLUMN "date" SET DEFAULT '2026-03-08T08:53:10.572Z';
  DROP TYPE "public"."enum_pages_directory_sections_section";`)
}
