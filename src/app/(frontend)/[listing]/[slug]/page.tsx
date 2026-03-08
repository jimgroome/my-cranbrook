import { RichText } from '@/components/rich-text/RichText'
import { findListingBySlug, isListingCollection } from '@/lib/frontend/listingData'
import { getCollectionBadgeClass, getCollectionLabel } from '@/lib/frontend/listings'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ listing: string; slug: string }>
}) {
  const { listing, slug } = await params

  if (!isListingCollection(listing)) {
    notFound()
  }

  const item = await findListingBySlug(listing, slug)

  if (!item) {
    notFound()
  }

  return (
    <section className="pb-15 pt-34">
      <div className="mx-auto max-w-[970px] px-4 sm:px-8 xl:px-0">
        <Link href={`/${listing}`} className="mb-6 inline-flex text-sm text-dark-4 hover:text-dark">
          Back to {getCollectionLabel(listing)}
        </Link>

        <span
          className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getCollectionBadgeClass(listing)}`}
        >
          {getCollectionLabel(listing)}
        </span>

        <h1 className="mb-4 text-heading-5 font-bold text-dark sm:text-heading-3">{item.title}</h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-dark-4">
          {'date' in item && item.date && <span>{new Date(item.date).toLocaleDateString('en-GB')}</span>}
          {item.location && <span>{item.location}</span>}
          {item.town && <span>{item.town}</span>}
          {item.postcode && <span>{item.postcode}</span>}
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
              Visit website
            </a>
          )}
        </div>

        {typeof item.image === 'object' && item.image?.url && (
          <div className="mb-8 overflow-hidden rounded-[12px]">
            <img src={item.image.url} alt={item.image.alt || item.title} className="w-full" />
          </div>
        )}

        {item.excerpt && <p className="mb-6 text-custom-lg text-dark">{item.excerpt}</p>}

        {'description' in item && item.description && (
          <div className="prose max-w-none">
            <RichText data={item.description as SerializedEditorState} />
          </div>
        )}
      </div>
    </section>
  )
}
