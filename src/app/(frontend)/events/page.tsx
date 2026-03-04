import { getPayload } from 'payload'
import config from '@/payload.config'
import { HighlightedContent } from '@/components/highlighted-content/HighlightedContent'

const EventsPage = async () => {
  const payload = await getPayload({ config })
  const pageData = await payload.find({
    collection: 'pages',
    where: { listing: { equals: 'events' } },
  })

  if (!pageData.docs.length) {
    return null
  }

  const page = pageData.docs[0]

  const events = await payload.find({
    collection: 'events',
    limit: 10,
    sort: 'date',
  })
  return (
    <>
      <h2 className="text-2xl font-bold">{page.title}</h2>
      <HighlightedContent highlightedContent={page.highlightedContent} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.docs.map((event) => (
          <div key={event.id}>
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p className="text-sm text-gray-500">{event.date}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default EventsPage
