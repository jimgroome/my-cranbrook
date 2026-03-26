import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "popout_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_id" integer
  );
  
  CREATE TABLE "popout_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "news" ALTER COLUMN "date" SET DEFAULT '2026-03-26T14:45:33.545Z';
  ALTER TABLE "pages_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "popout_menu_items" ADD CONSTRAINT "popout_menu_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "popout_menu_items" ADD CONSTRAINT "popout_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."popout_menu"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "popout_menu_items_order_idx" ON "popout_menu_items" USING btree ("_order");
  CREATE INDEX "popout_menu_items_parent_id_idx" ON "popout_menu_items" USING btree ("_parent_id");
  CREATE INDEX "popout_menu_items_link_idx" ON "popout_menu_items" USING btree ("link_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "popout_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "popout_menu" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "popout_menu_items" CASCADE;
  DROP TABLE "popout_menu" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_media_fk";
  
  DROP INDEX "pages_rels_media_id_idx";
  ALTER TABLE "news" ALTER COLUMN "date" SET DEFAULT '2026-03-08T13:27:56.053Z';
  ALTER TABLE "pages_rels" DROP COLUMN "media_id";`)
}
