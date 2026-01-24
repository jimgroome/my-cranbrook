import { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Sports: CollectionConfig = {
  slug: 'sports',
  admin: {
    useAsTitle: 'title',
    group: 'Directory',
    description: 'Sports clubs in the area',
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
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'link', type: 'text' },
    { name: 'town', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
  ],
}
