import { Page } from '@/payload-types'
import Box from '@mui/material/Box'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Link } from '@payloadcms/ui'
import Typography from '@mui/material/Typography'
import { RichText } from '@/components/rich-text/RichText'

export const HighlightedContentItem = ({
  item,
}: {
  item: NonNullable<NonNullable<Page['highlightedContent']>[0]>
}) => {
  return (
    <Box key={item.id}>
      <Typography variant="h3">
        <Link href={`/${item.item?.relationTo}/${(item.item?.value as Page)?.slug}`}>
          {item.title}
        </Link>
      </Typography>
      <RichText data={item.description as SerializedEditorState} />
      <Link href={`/${item.item?.relationTo}/${(item.item?.value as Page)?.slug}`}>View more</Link>
    </Box>
  )
}
