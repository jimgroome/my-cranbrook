import { MainNav } from './MainNav'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Media, Page } from '@/payload-types'
import { SocialLinks } from '../SocialLinks'

const PageHeader = async () => {
  const payload = await getPayload({ config })
  const branding = await payload.findGlobal({
    slug: 'branding',
  })
  const mainMenu = await payload.findGlobal({
    slug: 'mainMenu',
  })

  return (
    <header className="fixed left-0 top-0 w-full z-9999 bg-white py-7 lg:py-0 transition-all ease-in-out duration-300">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 lg:flex items-center justify-between relative">
        <div className="w-full lg:w-3/12 flex items-center justify-between">
          <Link href="/">
            <Image src={(branding?.logo as Media)?.url || ''} alt="Logo" width={100} height={100} />
          </Link>

          <button id="menuToggler" aria-label="button for menu toggle" className="lg:hidden block">
            <span className="block relative cursor-pointer w-5.5 h-5.5">
              <span className="du-block absolute right-0 w-full h-full">
                <span className="block relative top-0 left-0 bg-dark rounded-xs w-0 h-0.5 my-1 ease-in-out duration-200 delay-0"></span>
                <span className="block relative top-0 left-0 bg-dark rounded-xs w-0 h-0.5 my-1 ease-in-out duration-200 delay-150"></span>
                <span className="block relative top-0 left-0 bg-dark rounded-xs w-0 h-0.5 my-1 ease-in-out duration-200 delay-200"></span>
              </span>
              <span className="du-block absolute right-0 w-full h-full rotate-45">
                <span className="block bg-dark rounded-xs ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full"></span>
                <span className="block bg-dark rounded-xs ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5"></span>
              </span>
            </span>
          </button>
        </div>

        <div className="w-full lg:w-9/12 h-0 lg:h-auto invisible lg:visible lg:flex items-center justify-between">
          <nav>
            <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-10">
              {mainMenu?.items?.map((item) => (
                <li key={item?.id} className="nav__menu lg:py-6.5">
                  <Link href={(item?.link as Page)?.slug || ''}>{item?.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap items-center gap-8.5 mt-7 lg:mt-0">
            <SocialLinks />
            <div className="flex items-center gap-4.5">
              <button
                id="searchModalButton"
                aria-label="button for modal open"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-gray lg:transition-all lg:ease-linear lg:duration-200 hover:bg-gray-2 hover:text-dark"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1875 17.4063L14.0313 13.2188C16.1563 10.3125 15.9375 6.15625 13.2812 3.53125C11.875 2.125 10 1.34375 8 1.34375C6 1.34375 4.125 2.125 2.71875 3.53125C-0.1875 6.4375 -0.1875 11.1875 2.71875 14.0938C4.125 15.5 6 16.2813 8 16.2813C9.90625 16.2813 11.6875 15.5625 13.0938 14.2813L18.3125 18.5C18.4375 18.5938 18.5938 18.6563 18.75 18.6563C18.9688 18.6563 19.1562 18.5625 19.2812 18.4063C19.5312 18.0938 19.5 17.6563 19.1875 17.4063ZM8 14.875C6.375 14.875 4.875 14.25 3.71875 13.0938C1.34375 10.7188 1.34375 6.875 3.71875 4.53125C4.875 3.375 6.375 2.75 8 2.75C9.625 2.75 11.125 3.375 12.2812 4.53125C14.6562 6.90625 14.6562 10.75 12.2812 13.0938C11.1562 14.25 9.625 14.875 8 14.875Z"
                    fill=""
                  />
                </svg>
              </button>

              <button className="rounded-md text-white font-medium flex py-2.5 px-5.5 bg-dark hover:opacity-90 lg:transition-all lg:ease-linear lg:duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
