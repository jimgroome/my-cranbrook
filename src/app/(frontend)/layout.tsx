import React from 'react'
import './styles.css'
import PageHeader from '@/components/page-header/PageHeader'
import { PageFooter } from '@/components/page-footer/PageFooter'
import { getPayload } from 'payload'
import config from '@/payload.config'

const payload = await getPayload({ config })
const branding = await payload.findGlobal({
  slug: 'branding',
})

export const metadata = {
  description:
    (branding?.description as string) || 'A blank template using Payload in a Next.js app.',
  title: (branding?.name as string) || 'My Cranbrook',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageHeader />
        <main>{children}</main>
        <PageFooter />
      </body>
    </html>
  )
}
