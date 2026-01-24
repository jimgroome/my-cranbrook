import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_highlighted_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"clubs_id" integer,
  	"organisations_id" integer,
  	"pubs_id" integer,
  	"sports_id" integer
  );
  
  ALTER TABLE "pages_highlighted_content" ADD CONSTRAINT "pages_highlighted_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_clubs_fk" FOREIGN KEY ("clubs_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_organisations_fk" FOREIGN KEY ("organisations_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pubs_fk" FOREIGN KEY ("pubs_id") REFERENCES "public"."pubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_sports_fk" FOREIGN KEY ("sports_id") REFERENCES "public"."sports"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_highlighted_content_order_idx" ON "pages_highlighted_content" USING btree ("_order");
  CREATE INDEX "pages_highlighted_content_parent_id_idx" ON "pages_highlighted_content" USING btree ("_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_events_id_idx" ON "pages_rels" USING btree ("events_id");
  CREATE INDEX "pages_rels_clubs_id_idx" ON "pages_rels" USING btree ("clubs_id");
  CREATE INDEX "pages_rels_organisations_id_idx" ON "pages_rels" USING btree ("organisations_id");
  CREATE INDEX "pages_rels_pubs_id_idx" ON "pages_rels" USING btree ("pubs_id");
  CREATE INDEX "pages_rels_sports_id_idx" ON "pages_rels" USING btree ("sports_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_highlighted_content" CASCADE;
  DROP TABLE "pages_rels" CASCADE;`)
}
