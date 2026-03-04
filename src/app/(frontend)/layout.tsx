import React from 'react'
import './styles.css'
import { Geist } from 'next/font/google'
import PageHeader from '@/components/page-header/PageHeader'
import { PageFooter } from '@/components/page-footer/PageFooter'
import { getPayload } from 'payload'
import config from '@/payload.config'

// const geist = Geist({
//   subsets: ['latin'],
// })

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
        {/* <div className="flex flex-col gap-2 min-h-screen"> */}
        <PageHeader />

        <main>{children}</main>

        <PageFooter />
        {/* </div> */}
      </body>
    </html>
  )
}
