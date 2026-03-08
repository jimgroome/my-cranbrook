'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SocialIconLinks } from '../SocialIconLinks'

type MenuItem = {
  href: string
  label: string
}

type Props = {
  menuItems: MenuItem[]
  logoUrl?: string | null
  logoAlt: string
  social: {
    facebook?: string | null
    twitter?: string | null
    instagram?: string | null
  }
}

export const PageHeaderClient = ({ menuItems, logoUrl, logoAlt, social }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-9999 w-full bg-white py-7 transition-all duration-300 ease-in-out lg:py-0">
      <div className="relative mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0 lg:flex lg:items-center lg:justify-between">
        <div className="flex w-full items-center justify-between lg:w-3/12">
          <Link href="/" className="inline-flex items-center">
            {logoUrl ? (
              <img src={logoUrl} alt={logoAlt} className="h-auto max-h-12 w-auto" />
            ) : (
              <span className="text-lg font-semibold text-dark">{logoAlt}</span>
            )}
          </Link>

          <button
            id="menuToggler"
            aria-label="Toggle menu"
            className="block lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="block w-5.5 cursor-pointer">
              <span className="mb-1 block h-0.5 w-full rounded-xs bg-dark" />
              <span className="mb-1 block h-0.5 w-full rounded-xs bg-dark" />
              <span className="block h-0.5 w-full rounded-xs bg-dark" />
            </span>
          </button>
        </div>

        <div
          className={`w-full lg:flex lg:w-9/12 lg:items-center lg:justify-between ${
            isOpen ? 'visible mt-4 rounded-md bg-white p-7.5 shadow-lg' : 'invisible h-0 lg:visible lg:h-auto'
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
              {menuItems.map((item) => (
                <li key={`${item.href}-${item.label}`} className="py-1 lg:py-6.5">
                  <Link href={item.href} className="hover:text-dark">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex flex-wrap items-center gap-8.5 lg:mt-0">
            <SocialIconLinks social={social} idPrefix="header-social" />
          </div>
        </div>
      </div>
    </header>
  )
}
