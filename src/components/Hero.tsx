import Link from 'next/link'
import type { ListingCardItem } from '@/lib/frontend/listings'
import { getCollectionBadgeClass, getCollectionLabel, getListingHref } from '@/lib/frontend/listings'

export const Hero = ({ items }: { items: ListingCardItem[] }) => {
  if (!items.length) {
    return null
  }

  const [featured, ...secondary] = items

  return (
    <section id="home" className="relative z-10 overflow-hidden rounded-b-[50px] pb-15 pt-34">
      <div>
        <div className="absolute bottom-0 left-0 h-full w-full rounded-b-[50px] bg-gray" />
        <div className="absolute bottom-0 left-0 hidden h-full w-full rounded-b-[50px] lg:block">
          <img src="/hero-bg.svg" alt="hero background" />
        </div>
      </div>

      <div className="relative z-1 mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-x-7.5 gap-y-9">
          <article className="flex w-full max-w-[1170px] flex-col gap-7.5 rounded-xl bg-white p-4 shadow-1 lg:flex-row lg:items-center lg:gap-11 lg:p-2.5">
            <div className="w-full lg:max-w-[536px]">
              <Link href={getListingHref(featured.relationTo, featured.slug)}>
                {featured.imageUrl ? (
                  <img src={featured.imageUrl} alt={featured.imageAlt || featured.title} className="w-full" />
                ) : (
                  <div className="h-80 w-full bg-gray" />
                )}
              </Link>
            </div>

            <div className="w-full lg:max-w-[540px]">
              <span
                className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getCollectionBadgeClass(featured.relationTo)}`}
              >
                {getCollectionLabel(featured.relationTo)}
              </span>
              <h1 className="mb-4 text-custom-4 font-bold text-dark xl:text-heading-4">
                <Link href={getListingHref(featured.relationTo, featured.slug)}>{featured.title}</Link>
              </h1>
              {featured.excerpt && <p className="max-w-[524px]">{featured.excerpt}</p>}
              <div className="mt-5 flex items-center gap-2.5 text-sm">
                <p>{featured.town || 'Cranbrook'}</p>
                <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2" />
                <p>
                  {featured.date
                    ? new Date(featured.date).toLocaleDateString('en-GB')
                    : featured.location || 'Kent'}
                </p>
              </div>
            </div>
          </article>

          {secondary.slice(0, 2).map((item) => (
            <article
              key={`${item.relationTo}-${item.id}`}
              className="flex w-full flex-col gap-6 rounded-xl bg-white p-2.5 shadow-1 sm:flex-row sm:items-center lg:max-w-[570px]"
            >
              <div className="w-full lg:max-w-[238px]">
                <Link href={getListingHref(item.relationTo, item.slug)}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full" />
                  ) : (
                    <div className="h-[180px] w-full bg-gray" />
                  )}
                </Link>
              </div>

              <div className="w-full lg:max-w-[272px]">
                <span
                  className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getCollectionBadgeClass(item.relationTo)}`}
                >
                  {getCollectionLabel(item.relationTo)}
                </span>
                <h2 className="mb-3 text-custom-lg font-semibold text-dark">
                  <Link href={getListingHref(item.relationTo, item.slug)}>{item.title}</Link>
                </h2>
                <div className="flex items-center gap-2.5 text-sm">
                  <p>{item.town || 'Cranbrook'}</p>
                  <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2" />
                  <p>
                    {item.date ? new Date(item.date).toLocaleDateString('en-GB') : item.location || 'Kent'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
