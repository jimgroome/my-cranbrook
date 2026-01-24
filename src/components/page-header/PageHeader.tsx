import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MainNav } from './MainNav'
import Container from '@mui/material/Container'

const PageHeader = () => (
  <Box component="header" color="primary.main" display="flex" flexDirection="column" gap={2}>
    <Container maxWidth="xl">
      <Typography variant="h1">My Cranbrook</Typography>
      <MainNav />
    </Container>
  </Box>
)

export default PageHeader
