import { getPayload } from 'payload'
import config from '@/payload.config'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
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
      <Typography variant="h2">{page.title}</Typography>
      <HighlightedContent highlightedContent={page.highlightedContent} />
      <Grid container spacing={2}>
        {events.docs.map((event) => (
          <Grid key={event.id}>
            <Typography variant="h3">{event.title}</Typography>
            <Typography variant="body1">{event.date}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default EventsPage
