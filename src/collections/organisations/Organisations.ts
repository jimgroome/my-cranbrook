import { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Organisations: CollectionConfig = {
  slug: 'organisations',
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
  ],
}
