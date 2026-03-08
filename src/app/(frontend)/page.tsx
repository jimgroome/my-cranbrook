import { Hero } from '@/components/Hero'
import { Listings } from '@/components/Listings'
import config from '@/payload.config'
import { fromHighlightedContent, getCollectionLabel, toListingCardItem } from '@/lib/frontend/listings'
import { getPayload } from 'payload'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [pageData, events, clubs, organisations, pubs, sports] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { pageType: { equals: 'home' } },
      limit: 1,
    }),
    payload.find({ collection: 'events', limit: 6, sort: '-date' }),
    payload.find({ collection: 'clubs', limit: 1, sort: '-createdAt' }),
    payload.find({ collection: 'organisations', limit: 1, sort: '-createdAt' }),
    payload.find({ collection: 'pubs', limit: 1, sort: '-createdAt' }),
    payload.find({ collection: 'sports', limit: 1, sort: '-createdAt' }),
  ])

  const page = pageData.docs[0]

  const heroFromHighlighted = fromHighlightedContent(page?.highlightedContent)
  const fallbackHero = events.docs
    .map((event) => toListingCardItem('events', event))
    .filter((event): event is NonNullable<typeof event> => Boolean(event))
  const heroItems = heroFromHighlighted.length ? heroFromHighlighted.slice(0, 3) : fallbackHero.slice(0, 3)

  const listingCounts = [
    { slug: 'events', total: events.totalDocs },
    { slug: 'clubs', total: clubs.totalDocs },
    { slug: 'organisations', total: organisations.totalDocs },
    { slug: 'pubs', total: pubs.totalDocs },
    { slug: 'sports', total: sports.totalDocs },
  ] as const

  return (
    <>
      <Hero items={heroItems} />

      <section className="pb-15 pt-20 lg:pt-25">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="mb-12.5 text-center">
            <h2 className="mb-3.5 text-2xl font-bold text-dark sm:text-4xl xl:text-heading-3">
              Browse by Category
            </h2>
            <p>Select a category to see more related content from around Cranbrook.</p>
          </div>

          <div className="mb-15 flex flex-wrap items-center justify-center gap-4">
            {listingCounts.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${entry.slug}`}
                className="rounded-full border border-gray-3 bg-gray px-4.5 py-2.5 font-medium text-dark transition duration-200 ease-in hover:border-dark hover:bg-dark hover:text-white"
              >
                {getCollectionLabel(entry.slug)} ({entry.total})
              </Link>
            ))}
          </div>

          {page?.highlightedContent && <Listings listings={page.highlightedContent} />}
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-gray py-12.5">
        <div className="absolute left-0 top-0 -z-1 h-full w-full">
          <img src="/bg-dots.svg" alt="dot pattern" />
        </div>
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="rounded-[10px] bg-white px-4 py-9 shadow-1 sm:px-8 xl:px-10">
            <div className="flex flex-wrap items-center justify-between gap-10">
              <div className="w-full max-w-[455px]">
                <h3 className="mb-3 text-heading-6 font-semibold text-dark">My Cranbrook</h3>
                <p>
                  Discover events, clubs, organisations, pubs and sports happening in Cranbrook,
                  Kent.
                </p>
              </div>
              <div className="w-full max-w-[494px]">
                <div className="flex flex-wrap items-center gap-3">
                  {listingCounts.map((entry) => (
                    <Link
                      key={`cta-${entry.slug}`}
                      href={`/${entry.slug}`}
                      className="rounded-md bg-dark px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                    >
                      Explore {getCollectionLabel(entry.slug)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
