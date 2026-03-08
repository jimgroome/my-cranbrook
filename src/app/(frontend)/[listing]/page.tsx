import { ListingGridSection } from '@/components/listings/ListingGridSection'
import { findListingCollection, findListingPage, isListingCollection } from '@/lib/frontend/listingData'
import { getCollectionLabel, toListingCardItem } from '@/lib/frontend/listings'
import { notFound } from 'next/navigation'

export default async function ListingPage({ params }: { params: Promise<{ listing: string }> }) {
  const { listing } = await params

  if (!isListingCollection(listing)) {
    notFound()
  }

  const [page, listingData] = await Promise.all([
    findListingPage(listing),
    findListingCollection(listing, 24),
  ])

  const items = listingData.docs
    .map((doc) => toListingCardItem(listing, doc))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <ListingGridSection
      title={page?.title || getCollectionLabel(listing)}
      description={
        page?.content ? 'Discover places, groups and activities around Cranbrook.' : undefined
      }
      items={items}
    />
  )
}
