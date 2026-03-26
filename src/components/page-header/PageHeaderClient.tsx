'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SocialIconLinks } from '../SocialIconLinks'

type MenuItem = {
  href: string
  label: string
}

type Props = {
  menuItems: MenuItem[]
  popoutItems: MenuItem[]
  logoUrl?: string | null
  logoAlt: string
  strapline: string
  social: {
    facebook?: string | null
    twitter?: string | null
    instagram?: string | null
  }
}

export const PageHeaderClient = ({
  menuItems,
  popoutItems,
  logoUrl,
  logoAlt,
  strapline,
  social,
}: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const setHeaderHeight = () => {
      const height = headerRef.current?.offsetHeight ?? 0
      document.documentElement.style.setProperty('--site-header-height', `${height}px`)
    }

    setHeaderHeight()
    window.addEventListener('resize', setHeaderHeight)

    return () => {
      window.removeEventListener('resize', setHeaderHeight)
    }
  }, [isNavOpen])

  return (
    <>
      <header
        ref={headerRef}
        className="relative z-9999 w-full border-b border-[#dfe7e7] bg-white shadow-[0_6px_18px_rgba(21,23,26,0.05)]"
      >
        <div className="w-full border-b border-[#edf2f2] bg-[#f7fbfb]">
          <div className="flex w-full items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#6f8586] sm:px-6 lg:px-10">
            <span className="max-w-[280px] leading-5 sm:max-w-none">{strapline}</span>
            <div className="hidden lg:flex">
              <SocialIconLinks
                social={social}
                idPrefix="header-social"
                className="flex items-center gap-1.5 text-[#18444f]"
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-[82px] w-full items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:min-h-[88px] lg:gap-6 lg:px-10">
          <Link href="/" className="min-w-0 flex-1 lg:flex-none">
            <span className="flex min-w-0 items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-auto max-h-12 w-auto max-w-full object-contain sm:max-h-14 lg:max-h-16"
              />
            ) : (
              <span className="truncate text-lg font-bold uppercase tracking-[0.08em] text-[#163b46] sm:text-xl lg:text-2xl lg:tracking-[0.12em]">
                {logoAlt}
              </span>
            )}
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-8 lg:flex">
            <nav aria-label="Primary" className="min-w-0">
              <ul className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3">
                {menuItems.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#163b46] transition-colors duration-200 hover:text-[#0f8a8d]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              aria-label="Open pull-out menu"
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-[#d6e1e2] bg-[#f7fbfb] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#163b46]"
              onClick={() => setIsPanelOpen((prev) => !prev)}
            >
              Menu
              <span className="block w-5">
                <span className="mb-1 block h-0.5 w-full rounded-xs bg-[#163b46]" />
                <span className="mb-1 block h-0.5 w-full rounded-xs bg-[#163b46]" />
                <span className="block h-0.5 w-full rounded-xs bg-[#163b46]" />
              </span>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label="Toggle navigation"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#d6e1e2] bg-[#f7fbfb] px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#163b46] sm:px-4"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              Nav
            </button>
            <button
              type="button"
              aria-label="Open pull-out menu"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#d6e1e2] bg-[#f7fbfb] px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#163b46] sm:px-4"
              onClick={() => setIsPanelOpen((prev) => !prev)}
            >
              Menu
            </button>
          </div>
        </div>

        {isNavOpen && (
          <div className="border-t border-[#ecf2f2] px-6 py-5 lg:hidden">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-3">
                {menuItems.map((item) => (
                  <li key={`${item.href}-${item.label}-mobile`}>
                    <Link
                      href={item.href}
                      className="block rounded-lg border border-[#e3eaed] bg-[#f8fbfc] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#153e4d]"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {isPanelOpen && (
        <aside className="fixed right-0 top-0 z-[1000000] h-full w-full max-w-[360px] border-l border-[#dfe7e7] bg-white shadow-[0_18px_40px_rgba(21,23,26,0.16)]">
          <div className="flex items-center justify-between border-b border-[#edf2f2] px-6 py-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#163b46]">Menu</h2>
            <button
              type="button"
              aria-label="Close pull-out menu"
              className="rounded-full border border-[#d6e1e2] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#163b46]"
              onClick={() => setIsPanelOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="px-6 py-6">
            {popoutItems.length ? (
              <nav aria-label="Pop-out menu">
                <ul className="flex flex-col gap-3">
                  {popoutItems.map((item) => (
                    <li key={`${item.href}-${item.label}-popout`}>
                      <Link
                        href={item.href}
                        className="block rounded-lg border border-[#e3eaed] bg-[#f8fbfc] px-4 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#153e4d] transition-colors duration-200 hover:text-[#0f8a8d]"
                        onClick={() => setIsPanelOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <div className="rounded-xl border border-dashed border-[#d6e1e2] bg-[#f8fbfc] p-6 text-sm text-[#6f8586]">
                No pop-out menu items configured yet.
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  )
}
