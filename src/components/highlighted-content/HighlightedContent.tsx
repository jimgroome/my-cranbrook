import { Page } from '@/payload-types'
import Box from '@mui/material/Box'
import { HighlightedContentItem } from './HighlightedContentItem'

export const HighlightedContent = ({
  highlightedContent,
}: {
  highlightedContent: Page['highlightedContent']
}) => {
  if (!highlightedContent?.length) {
    return null
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {highlightedContent?.map((item) => (
        <HighlightedContentItem key={item.id} item={item} />
      ))}
    </Box>
  )
}
