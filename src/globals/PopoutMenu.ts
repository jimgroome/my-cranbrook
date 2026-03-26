import type { GlobalConfig } from 'payload'

export const PopoutMenu: GlobalConfig = {
  slug: 'popoutMenu',
  admin: {
    group: 'Settings',
    description: 'Pop-out menu for the website',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'relationship', relationTo: 'pages' },
      ],
    },
  ],
}
