import React from 'react'
import './styles.css'
import { Geist } from 'next/font/google'
import Container from '@mui/material/Container'
import PageHeader from '@/components/page-header/PageHeader'
import Box from '@mui/material/Box'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={geist.className}>
        <Container maxWidth="xl">
          <Box display="flex" flexDirection="column" gap={2}>
            <PageHeader />
            <Box component="main" display="flex" flexDirection="column" gap={2}>
              {children}
            </Box>
          </Box>
        </Container>
      </body>
    </html>
  )
}
