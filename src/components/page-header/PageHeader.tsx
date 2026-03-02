import Box from '@mui/material/Box'
import { MainNav } from './MainNav'
import Container from '@mui/material/Container'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Media } from '@/payload-types'

const PageHeader = async () => {
  const payload = await getPayload({ config })
  const branding = await payload.findGlobal({
    slug: 'branding',
  })

  return (
    <Box component="header" color="primary.main" display="flex" flexDirection="column" gap={2}>
      <Container maxWidth="xl">
        <Box
          component="div"
          display="flex"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/">
            <Image
              src={(branding?.logo as Media)?.url || '/logo.png'}
              alt={(branding?.logo as Media)?.alt || 'My Cranbrook'}
              width={400}
              height={102}
              priority
            />
          </Link>
          <MainNav />
        </Box>
      </Container>
    </Box>
  )
}

export default PageHeader
