import type { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'News articles',
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
    { name: 'excerpt', type: 'text' },
    { name: 'date', type: 'date', required: true, defaultValue: new Date() },
    { name: 'content', type: 'richText', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
