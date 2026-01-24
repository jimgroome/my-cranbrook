import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/events/Events'
import { Clubs } from './collections/clubs/Clubs'
import { Organisations } from './collections/organisations/Organisations'
import { Pubs } from './collections/pubs/Pubs'
import { Sports } from './collections/sports/Sports'
import { Pages } from './collections/pages/Pages'

import { MainMenu } from './globals/MainMenu'
import { Branding } from './globals/Branding'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Events, Clubs, Organisations, Pubs, Sports, Users, Media],
  globals: [MainMenu, Branding],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
