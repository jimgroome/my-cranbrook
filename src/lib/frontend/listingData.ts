import config from '@/payload.config'
import type { Page } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { getPayload } from 'payload'
import { listingCollections, type ListingCollection, type ListingDoc } from './listings'

const collectionSet = new Set<string>(listingCollections)

export const isListingCollection = (value: string): value is ListingCollection => collectionSet.has(value)

export const findListingPage = async (listing: ListingCollection): Promise<Page | null> => {
  const payload = await getPayload({ config })
  const pageData = await payload.find({
    collection: 'pages',
    where: { listing: { equals: listing } },
    limit: 1,
  })

  return pageData.docs[0] || null
}

export const findListingCollection = async (
  listing: ListingCollection,
  limit = 24,
): Promise<PaginatedDocs<ListingDoc>> => {
  const payload = await getPayload({ config })

  switch (listing) {
    case 'events':
      return payload.find({ collection: 'events', limit, sort: '-date' })
    case 'clubs':
      return payload.find({ collection: 'clubs', limit, sort: '-createdAt' })
    case 'organisations':
      return payload.find({ collection: 'organisations', limit, sort: '-createdAt' })
    case 'pubs':
      return payload.find({ collection: 'pubs', limit, sort: '-createdAt' })
    case 'sports':
      return payload.find({ collection: 'sports', limit, sort: '-createdAt' })
  }
}

export const findListingBySlug = async (
  listing: ListingCollection,
  slug: string,
): Promise<ListingDoc | null> => {
  const payload = await getPayload({ config })

  switch (listing) {
    case 'events': {
      const result = await payload.find({
        collection: 'events',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return result.docs[0] || null
    }
    case 'clubs': {
      const result = await payload.find({
        collection: 'clubs',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return result.docs[0] || null
    }
    case 'organisations': {
      const result = await payload.find({
        collection: 'organisations',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return result.docs[0] || null
    }
    case 'pubs': {
      const result = await payload.find({
        collection: 'pubs',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return result.docs[0] || null
    }
    case 'sports': {
      const result = await payload.find({
        collection: 'sports',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      return result.docs[0] || null
    }
  }
}
