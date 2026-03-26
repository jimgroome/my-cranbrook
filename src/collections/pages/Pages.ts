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
        { label: 'Directory', value: 'directory' },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'directorySections',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      admin: {
        description: 'Drag and drop to reorder directory sections.',
        condition: (data) => data.pageType === 'directory',
      },
      fields: [
        {
          name: 'section',
          type: 'select',
          required: true,
          options: [
            { label: 'Sports', value: 'sports' },
            { label: 'Pubs', value: 'pubs' },
            { label: 'Organisations', value: 'organisations' },
            { label: 'Clubs', value: 'clubs' },
          ],
        },
        {
          name: 'sportsItems',
          type: 'relationship',
          relationTo: 'sports',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.section === 'sports',
            description: 'Pick up to 3 sports items for this section.',
          },
          validate: (value) => {
            if (!Array.isArray(value)) return true
            if (value.length > 3) return 'You can select up to 3 sports items.'
            return true
          },
        },
        {
          name: 'pubsItems',
          type: 'relationship',
          relationTo: 'pubs',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.section === 'pubs',
            description: 'Pick up to 3 pub items for this section.',
          },
          validate: (value) => {
            if (!Array.isArray(value)) return true
            if (value.length > 3) return 'You can select up to 3 pub items.'
            return true
          },
        },
        {
          name: 'organisationsItems',
          type: 'relationship',
          relationTo: 'organisations',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.section === 'organisations',
            description: 'Pick up to 3 organisation items for this section.',
          },
          validate: (value) => {
            if (!Array.isArray(value)) return true
            if (value.length > 3) return 'You can select up to 3 organisation items.'
            return true
          },
        },
        {
          name: 'clubsItems',
          type: 'relationship',
          relationTo: 'clubs',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.section === 'clubs',
            description: 'Pick up to 3 club items for this section.',
          },
          validate: (value) => {
            if (!Array.isArray(value)) return true
            if (value.length > 3) return 'You can select up to 3 club items.'
            return true
          },
        },
      ],
      validate: (value) => {
        if (!value?.length) return true
        const rows = Array.isArray(value) ? (value as Array<{ section?: string }>) : []
        const sections = rows.map((row) => row.section).filter(Boolean)
        const unique = new Set(sections)

        if (unique.size !== sections.length) {
          return 'Each directory section can only be used once.'
        }

        return true
      },
    },
    {
      name: 'listing',
      type: 'select',
      options: [
        { label: 'News', value: 'news' },
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
    {
      name: 'highlightedContent',
      type: 'array',
      admin: {
        condition: (data) => ['listings', 'home'].includes(data.pageType),
      },
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: ['events', 'clubs', 'organisations', 'pubs', 'sports'],
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
      ],
    },
    {
      name: 'carouselImages',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        condition: (data) => data.pageType === 'home',
        description: 'Pick the images to use in the homepage carousel.',
      },
    },
    { name: 'content', type: 'richText' },
  ],
}
