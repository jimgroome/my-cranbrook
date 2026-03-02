import { Page } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Link } from '@payloadcms/ui'
import { RichText } from '@/components/rich-text/RichText'

export const HighlightedContentItem = ({
  item,
}: {
  item: NonNullable<NonNullable<Page['highlightedContent']>[0]>
}) => {
  return (
    <div key={item.id}>
      <h3 className="text-2xl font-bold">
        <Link href={`/${item.item?.relationTo}/${(item.item?.value as Page)?.slug}`}>
          {item.title}
        </Link>
      </h3>
      <RichText data={item.description as SerializedEditorState} />
      <Link href={`/${item.item?.relationTo}/${(item.item?.value as Page)?.slug}`}>View more</Link>
    </div>
  )
}
