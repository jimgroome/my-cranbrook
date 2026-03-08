import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { getPayload } from 'payload'
import Link from 'next/link'

const NEWS_PER_PAGE = 5

const getPageNumber = (raw?: string) => {
  const parsed = Number(raw)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = getPageNumber(params.page)

  const payload = await getPayload({ config })
  const news = await payload.find({
    collection: 'news',
    limit: NEWS_PER_PAGE,
    page: currentPage,
    sort: '-date',
  })

  const hasPrevPage = news.hasPrevPage
  const hasNextPage = news.hasNextPage

  return (
    <section className="pb-15 pt-34">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-12.5 text-center">
          <h1 className="mb-3.5 text-2xl font-bold text-dark sm:text-4xl xl:text-heading-3">News</h1>
          <p>Latest updates from around Cranbrook.</p>
        </div>

        {news.docs.length ? (
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {news.docs.map((item) => {
              const image = item.image as Media | null
              const href = item.slug ? `/news/${item.slug}` : '#'

              return (
                <article key={item.id} className="group flex h-full flex-col">
                  <div className="mb-6 overflow-hidden rounded-[10px]">
                    <Link href={href} className="block">
                      {image?.url ? (
                        <img
                          src={image.url}
                          alt={image.alt || item.title}
                          className="h-60 w-full object-cover transition-all duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-60 w-full bg-gray" />
                      )}
                    </Link>
                  </div>

                  <h2 className="mb-3.5 text-xl font-bold text-dark">
                    <Link href={href}>{item.title}</Link>
                  </h2>

                  {item.excerpt && <p className="min-h-[3.5rem] text-sm">{item.excerpt}</p>}

                  <div className="mt-auto pt-4.5 text-sm text-dark-4">
                    {new Date(item.date).toLocaleDateString('en-GB')}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="text-center">No news items found yet.</p>
        )}

        <nav className="mt-12 flex items-center justify-center gap-4" aria-label="News pagination">
          {hasPrevPage ? (
            <Link
              href={`/news?page=${news.prevPage}`}
              className="rounded-md border border-gray-3 px-4 py-2 text-sm font-medium text-dark hover:border-dark hover:bg-dark hover:text-white"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-md border border-gray-3 px-4 py-2 text-sm text-dark-3">Previous</span>
          )}

          <span className="text-sm text-dark-4">
            Page {news.page} of {news.totalPages || 1}
          </span>

          {hasNextPage ? (
            <Link
              href={`/news?page=${news.nextPage}`}
              className="rounded-md border border-gray-3 px-4 py-2 text-sm font-medium text-dark hover:border-dark hover:bg-dark hover:text-white"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-md border border-gray-3 px-4 py-2 text-sm text-dark-3">Next</span>
          )}
        </nav>
      </div>
    </section>
  )
}
