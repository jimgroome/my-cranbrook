import type { Page } from '@/payload-types'
import { ListingCard } from '@/components/listings/ListingCard'
import { fromHighlightedContent } from '@/lib/frontend/listings'

export const Listings = ({ listings }: { listings: Page['highlightedContent'] }) => {
  const items = fromHighlightedContent(listings)

  if (!items.length) {
    return <p className="text-center">No highlighted content configured yet.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-x-7.5 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ListingCard key={`${item.relationTo}-${item.id}`} item={item} />
      ))}
    </div>
  )
}
