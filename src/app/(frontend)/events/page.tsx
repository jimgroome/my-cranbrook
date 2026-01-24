import { getPayload } from 'payload'
import config from '@/payload.config'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const EventsPage = async () => {
  const payload = await getPayload({ config })
  const pageData = await payload.find({
    collection: 'pages',
    where: { listing: { equals: 'events' } },
  })

  const events = await payload.find({
    collection: 'events',
    limit: 10,
    sort: 'date',
  })
  return (
    <>
      <Typography variant="h2">{pageData.docs[0].title}</Typography>
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
