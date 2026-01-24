import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MainNav } from './MainNav'

const PageHeader = () => (
  <Box component="header" color="primary.main" display="flex" flexDirection="column" gap={2}>
    <Typography variant="h1">My Cranbrook</Typography>
    <MainNav />
  </Box>
)

export default PageHeader
