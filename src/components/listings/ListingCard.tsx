import Link from 'next/link'
import type { ListingCardItem } from '@/lib/frontend/listings'
import { getCollectionBadgeClass, getCollectionLabel, getListingHref } from '@/lib/frontend/listings'

export const ListingCard = ({ item }: { item: ListingCardItem }) => {
  const href = getListingHref(item.relationTo, item.slug)

  return (
    <article className="group flex h-full flex-col">
      <div className="mb-6 overflow-hidden rounded-[10px]">
        <Link href={href} className="block">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.imageAlt || item.title}
              className="h-60 w-full object-cover transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-60 w-full bg-gray" />
          )}
        </Link>
      </div>

      <div className="mb-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getCollectionBadgeClass(item.relationTo)}`}
        >
          {getCollectionLabel(item.relationTo)}
        </span>
      </div>

      <h3 className="mb-3.5">
        <Link href={href} className="mb-3.5 block text-xl font-bold text-dark">
          <span className="bg-linear-to-r from-primary/50 to-primary/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
            {item.title}
          </span>
        </Link>
      </h3>

      {item.excerpt && <p className="min-h-[3.5rem] text-sm">{item.excerpt}</p>}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4.5">
        <div className="text-sm">
          {item.date ? new Date(item.date).toLocaleDateString('en-GB') : item.location || item.town || ''}
        </div>
        {item.town && (
          <span className="inline-flex rounded-full bg-blue/[0.08] px-3 py-1 text-sm font-medium text-blue">
            {item.town}
          </span>
        )}
      </div>
    </article>
  )
}
