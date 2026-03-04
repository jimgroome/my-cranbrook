import type { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Clubs: CollectionConfig = {
  slug: 'clubs',
  admin: {
    useAsTitle: 'title',
    group: 'Directory',
    description: 'Clubs in the area',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [({ data }) => slugify(data?.title || '')],
      },
    },
    { name: 'description', type: 'richText', required: true },
    { name: 'excerpt', type: 'text' },
    { name: 'link', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'town', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'postcode', type: 'text' },
  ],
}
