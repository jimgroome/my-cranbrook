import { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Pubs: CollectionConfig = {
  slug: 'pubs',
  admin: {
    useAsTitle: 'title',
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
    { name: 'town', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'link', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
