import { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Organisations: CollectionConfig = {
  slug: 'organisations',
  admin: {
    useAsTitle: 'title',
    group: 'Directory',
    description: 'Organisations in the area',
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
    { name: 'description', type: 'richText' },
    { name: 'excerpt', type: 'text' },
    { name: 'town', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'postcode', type: 'text' },
    { name: 'link', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
