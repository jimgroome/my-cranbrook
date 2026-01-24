import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Typography from '@mui/material/Typography'
import { HighlightedContent } from '@/components/highlighted-content/HighlightedContent'
import { RichText } from '@/components/rich-text/RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pageData = await payload.find({
    collection: 'pages',
    where: { pageType: { equals: 'home' } },
  })

  if (!pageData.docs.length) {
    return null
  }

  const page = pageData.docs[0]

  return (
    <>
      <Typography variant="h2">{page.title}</Typography>
      <RichText data={page.content as SerializedEditorState} />
      {page.highlightedContent && (
        <HighlightedContent highlightedContent={page.highlightedContent} />
      )}
    </>
  )
}
