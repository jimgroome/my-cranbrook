import { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Pages for the website',
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
    {
      name: 'pageType',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Home', value: 'home' },
        { label: 'Listings', value: 'listings' },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'listing',
      type: 'select',
      options: [
        { label: 'Events', value: 'events' },
        { label: 'Clubs', value: 'clubs' },
        { label: 'Organisations', value: 'organisations' },
        { label: 'Pubs', value: 'pubs' },
        { label: 'Sports', value: 'sports' },
      ],
      admin: {
        condition: (data) => data.pageType === 'listings',
      },
    },
    { name: 'content', type: 'richText' },
  ],
}
