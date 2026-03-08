import { ListingCard } from './ListingCard'
import type { ListingCardItem } from '@/lib/frontend/listings'

export const ListingGridSection = ({
  title,
  description,
  items,
}: {
  title: string
  description?: string
  items: ListingCardItem[]
}) => {
  return (
    <section className="pb-15 pt-20 lg:pt-25">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-12.5 text-center">
          <h2 className="mb-3.5 text-2xl font-bold text-dark sm:text-4xl xl:text-heading-3">{title}</h2>
          {description && <p>{description}</p>}
        </div>

        {items.length ? (
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ListingCard key={`${item.relationTo}-${item.id}`} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center">No items found yet.</p>
        )}
      </div>
    </section>
  )
}
