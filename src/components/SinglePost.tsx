import type { Event } from '@/payload-types'
import { ListingCard } from '@/components/listings/ListingCard'
import { toListingCardItem } from '@/lib/frontend/listings'

export const SinglePost = ({ post }: { post: Event }) => {
  const item = toListingCardItem('events', post)

  if (!item) {
    return null
  }

  return <ListingCard item={item} />
}
