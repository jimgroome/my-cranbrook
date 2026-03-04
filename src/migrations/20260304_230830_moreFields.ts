import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pubs" ALTER COLUMN "town" DROP NOT NULL;
  ALTER TABLE "pubs" ALTER COLUMN "location" DROP NOT NULL;
  ALTER TABLE "sports" ALTER COLUMN "town" DROP NOT NULL;
  ALTER TABLE "sports" ALTER COLUMN "location" DROP NOT NULL;
  ALTER TABLE "clubs" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "clubs" ADD COLUMN "town" varchar;
  ALTER TABLE "clubs" ADD COLUMN "location" varchar;
  ALTER TABLE "clubs" ADD COLUMN "postcode" varchar;
  ALTER TABLE "organisations" ADD COLUMN "description" jsonb;
  ALTER TABLE "organisations" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "organisations" ADD COLUMN "town" varchar;
  ALTER TABLE "organisations" ADD COLUMN "location" varchar;
  ALTER TABLE "organisations" ADD COLUMN "postcode" varchar;
  ALTER TABLE "organisations" ADD COLUMN "link" varchar;
  ALTER TABLE "organisations" ADD COLUMN "image_id" integer;
  ALTER TABLE "pubs" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "pubs" ADD COLUMN "postcode" varchar;
  ALTER TABLE "sports" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "sports" ADD COLUMN "postcode" varchar;
  ALTER TABLE "news" ADD COLUMN "date" timestamp(3) with time zone DEFAULT '2026-03-04T23:08:30.269Z' NOT NULL;
  ALTER TABLE "organisations" ADD CONSTRAINT "organisations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "organisations_image_idx" ON "organisations" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "organisations" DROP CONSTRAINT "organisations_image_id_media_id_fk";
  
  DROP INDEX "organisations_image_idx";
  ALTER TABLE "pubs" ALTER COLUMN "town" SET NOT NULL;
  ALTER TABLE "pubs" ALTER COLUMN "location" SET NOT NULL;
  ALTER TABLE "sports" ALTER COLUMN "town" SET NOT NULL;
  ALTER TABLE "sports" ALTER COLUMN "location" SET NOT NULL;
  ALTER TABLE "clubs" DROP COLUMN "excerpt";
  ALTER TABLE "clubs" DROP COLUMN "town";
  ALTER TABLE "clubs" DROP COLUMN "location";
  ALTER TABLE "clubs" DROP COLUMN "postcode";
  ALTER TABLE "organisations" DROP COLUMN "description";
  ALTER TABLE "organisations" DROP COLUMN "excerpt";
  ALTER TABLE "organisations" DROP COLUMN "town";
  ALTER TABLE "organisations" DROP COLUMN "location";
  ALTER TABLE "organisations" DROP COLUMN "postcode";
  ALTER TABLE "organisations" DROP COLUMN "link";
  ALTER TABLE "organisations" DROP COLUMN "image_id";
  ALTER TABLE "pubs" DROP COLUMN "excerpt";
  ALTER TABLE "pubs" DROP COLUMN "postcode";
  ALTER TABLE "sports" DROP COLUMN "excerpt";
  ALTER TABLE "sports" DROP COLUMN "postcode";
  ALTER TABLE "news" DROP COLUMN "date";`)
}
