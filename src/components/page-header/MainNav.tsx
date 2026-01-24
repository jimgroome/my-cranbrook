import Box from '@mui/material/Box'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import type { Page } from '@/payload-types'

export const MainNav = async () => {
  const payload = await getPayload({ config })
  const mainMenu = await payload.findGlobal({
    slug: 'mainMenu',
  })

  if (!mainMenu) {
    return null
  }

  return (
    <Box component="nav" display="flex" gap={2}>
      {mainMenu.items?.map((item) => (
        <Link key={item.id} href={(item.link as Page)?.slug || ''}>
          {item.label}
        </Link>
      ))}
    </Box>
  )
}
