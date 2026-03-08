import Link from 'next/link'
import { SocialLinks } from '../SocialLinks'

export const PageFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-gray-3 py-8">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
          <div>
            <p className="text-custom-sm">&copy; {year} My Cranbrook. All rights reserved</p>
          </div>

          <div>
            <ul className="flex flex-wrap items-center gap-2.5 text-custom-sm">
              <li>
                <Link href="/events" className="group leading-none hover:text-dark">
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    Events
                  </span>
                </Link>
              </li>
              <li>
                <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2" />
              </li>
              <li>
                <Link href="/organisations" className="group leading-none hover:text-dark">
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    Organisations
                  </span>
                </Link>
              </li>
              <li>
                <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2" />
              </li>
              <li>
                <Link href="/pubs" className="group leading-none hover:text-dark">
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    Pubs
                  </span>
                </Link>
              </li>
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
