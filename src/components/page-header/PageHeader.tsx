import config from '@/payload.config'
import type { Branding, MainMenu, Media, Page, PopoutMenu, Social } from '@/payload-types'
import { getPageHref } from '@/lib/frontend/listings'
import { getPayload } from 'payload'
import { PageHeaderClient } from './PageHeaderClient'

const toMenuItems = (menu: { items?: MainMenu['items'] | PopoutMenu['items'] } | null) => {
  if (!menu?.items?.length) {
    return []
  }

  return menu.items
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

  const [branding, mainMenu, popoutMenu, social] = await Promise.all([
    payload.findGlobal({ slug: 'branding' }),
    payload.findGlobal({ slug: 'mainMenu' }),
    payload.findGlobal({ slug: 'popoutMenu' }),
    payload.findGlobal({ slug: 'social' }),
  ])

  const logoUrl = ((branding as Branding)?.logo as Media | null)?.url
  const fallbackMainMenu = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/clubs', label: 'Clubs' },
    { href: '/organisations', label: 'Organisations' },
    { href: '/pubs', label: 'Pubs' },
    { href: '/sports', label: 'Sports' },
  ]
  const resolvedMainMenu = toMenuItems(mainMenu as MainMenu)
  const resolvedPopoutMenu = toMenuItems(popoutMenu as PopoutMenu)

  return (
    <PageHeaderClient
      menuItems={resolvedMainMenu.length ? resolvedMainMenu : fallbackMainMenu}
      popoutItems={resolvedPopoutMenu}
      logoUrl={logoUrl}
      logoAlt={(branding as Branding)?.name || 'My Cranbrook'}
      strapline={(branding as Branding)?.description || 'Discover Cranbrook, Kent'}
      social={social as Social}
    />
  )
}

export default PageHeader
