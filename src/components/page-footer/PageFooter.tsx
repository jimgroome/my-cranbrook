import config from '@/payload.config'
import type { MainMenu, Page } from '@/payload-types'
import { getPageHref } from '@/lib/frontend/listings'
import { getPayload } from 'payload'
import Link from 'next/link'
import { SocialLinks } from '../SocialLinks'

const toFooterMenuItems = (mainMenu: MainMenu | null) => {
  if (!mainMenu?.items?.length) {
    return []
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

export const PageFooter = async () => {
  const year = new Date().getFullYear()
  const payload = await getPayload({ config })
  const mainMenu = await payload.findGlobal({ slug: 'mainMenu' })
  const menuItems = toFooterMenuItems(mainMenu as MainMenu)

  return (
    <footer className="relative z-10 border-t border-gray-3 py-8">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
          <div>
            <p className="text-custom-sm">&copy; {year} My Cranbrook. All rights reserved</p>
          </div>

          <div>
            <ul className="flex flex-wrap items-center gap-2.5 text-custom-sm">
              {menuItems.flatMap((item, index) => [
                  <li key={`${item.href}-${item.label}`}>
                    <Link href={item.href} className="group leading-none hover:text-dark">
                      <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                        {item.label}
                      </span>
                    </Link>
                  </li>,
                  index < menuItems.length - 1 ? (
                    <li key={`${item.href}-${item.label}-dot`}>
                      <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2" />
                    </li>
                  ) : null,
                ])}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <p className="text-custom-sm font-medium text-dark">Follow Us:</p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
