import config from '@/payload.config'
import type { Branding, MainMenu, Media, Page, Social } from '@/payload-types'
import { getPageHref } from '@/lib/frontend/listings'
import { getPayload } from 'payload'
import { PageHeaderClient } from './PageHeaderClient'

const toMenuItems = (mainMenu: MainMenu | null) => {
  if (!mainMenu?.items?.length) {
    return [
      { href: '/', label: 'Home' },
      { href: '/events', label: 'Events' },
      { href: '/clubs', label: 'Clubs' },
      { href: '/organisations', label: 'Organisations' },
      { href: '/pubs', label: 'Pubs' },
      { href: '/sports', label: 'Sports' },
    ]
  }

  return mainMenu.items
    .map((item) => {
      const page = item?.link as Page | null

      return {
        href: getPageHref(page?.slug),
        label: item?.label || page?.title || '',
      }
    })
    .filter((item) => Boolean(item.href && item.label))
}

const PageHeader = async () => {
  const payload = await getPayload({ config })

  const [branding, mainMenu, social] = await Promise.all([
    payload.findGlobal({ slug: 'branding' }),
    payload.findGlobal({ slug: 'mainMenu' }),
    payload.findGlobal({ slug: 'social' }),
  ])

  const logoUrl = ((branding as Branding)?.logo as Media | null)?.url

  return (
    <PageHeaderClient
      menuItems={toMenuItems(mainMenu as MainMenu)}
      logoUrl={logoUrl}
      logoAlt={(branding as Branding)?.name || 'My Cranbrook'}
      social={social as Social}
    />
  )
}

export default PageHeader
