import type { GlobalConfig } from 'payload'

export const Social: GlobalConfig = {
  slug: 'social',
  admin: {
    group: 'Settings',
    description: 'Social links for the website',
  },
  fields: [
    {
      name: 'facebook',
      type: 'text',
    },
    {
      name: 'twitter',
      type: 'text',
    },
    {
      name: 'instagram',
      type: 'text',
    },
  ],
}
