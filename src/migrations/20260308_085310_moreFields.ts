import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ALTER COLUMN "date" SET DEFAULT '2026-03-08T08:53:10.572Z';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" ALTER COLUMN "date" SET DEFAULT '2026-03-04T23:08:30.269Z';`)
}
