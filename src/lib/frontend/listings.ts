import type { Club, Event, Organisation, Page, Pub, Sport } from '@/payload-types'

export const listingCollections = ['events', 'clubs', 'organisations', 'pubs', 'sports'] as const

export type ListingCollection = (typeof listingCollections)[number]
export type ListingDoc = Event | Club | Organisation | Pub | Sport

export type ListingCardItem = {
  id: number
  title: string
  slug: string
  excerpt?: string | null
  date?: string | null
  town?: string | null
  location?: string | null
  postcode?: string | null
  link?: string | null
  imageUrl?: string | null
  imageAlt?: string
  relationTo: ListingCollection
}

const collectionLabel: Record<ListingCollection, string> = {
  events: 'Events',
  clubs: 'Clubs',
  organisations: 'Organisations',
  pubs: 'Pubs',
  sports: 'Sports',
}

const collectionBadgeClass: Record<ListingCollection, string> = {
  events: 'text-purple-dark bg-purple/[0.08]',
  clubs: 'text-blue bg-blue/[0.08]',
  organisations: 'text-green-dark bg-green/[0.08]',
  pubs: 'text-cyan-dark bg-cyan/[0.08]',
  sports: 'text-teal-dark bg-teal/[0.08]',
}

export const getCollectionLabel = (collection: ListingCollection) => collectionLabel[collection]

export const getCollectionBadgeClass = (collection: ListingCollection) => collectionBadgeClass[collection]

export const getListingHref = (collection: ListingCollection, slug?: string | null) => {
  if (!slug) return `/${collection}`
  return `/${collection}/${slug}`
}

export const getPageHref = (slug?: string | null) => {
  if (!slug || slug === 'home') return '/'
  return `/${slug}`
}

export const toListingCardItem = (
  collection: ListingCollection,
  doc: ListingDoc,
): ListingCardItem | null => {
  if (!doc.slug) {
    return null
  }

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    date: 'date' in doc ? doc.date : null,
    town: doc.town,
    location: doc.location,
    postcode: doc.postcode,
    link: doc.link,
    imageUrl: typeof doc.image === 'object' && doc.image?.url ? doc.image.url : null,
    imageAlt:
      typeof doc.image === 'object' && doc.image?.alt
        ? doc.image.alt
        : `${doc.title} image`,
    relationTo: collection,
  }
}

export const fromHighlightedContent = (highlightedContent: Page['highlightedContent']): ListingCardItem[] => {
  if (!highlightedContent?.length) {
    return []
  }

  return highlightedContent
    .map((item) => {
      if (!item.item || typeof item.item.value !== 'object') {
        return null
      }

      const relationTo = item.item.relationTo
      const value = item.item.value

      if (!value || !('title' in value)) {
        return null
      }

      const mapped = toListingCardItem(relationTo, value as ListingDoc)

      if (!mapped) {
        return null
      }

      return {
        ...mapped,
        title: item.title || mapped.title,
      }
    })
    .filter((entry): entry is ListingCardItem => Boolean(entry))
}
