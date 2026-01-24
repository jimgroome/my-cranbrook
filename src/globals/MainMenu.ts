import type { GlobalConfig } from 'payload'

export const MainMenu: GlobalConfig = {
  slug: 'mainMenu',
  admin: {
    group: 'Settings',
    description: 'Main menu for the website',
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
