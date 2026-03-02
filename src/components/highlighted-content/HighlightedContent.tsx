import { Page } from '@/payload-types'
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
    <div className="flex flex-col gap-2">
      {highlightedContent?.map((item) => (
        <HighlightedContentItem key={item.id} item={item} />
      ))}
    </div>
  )
}
