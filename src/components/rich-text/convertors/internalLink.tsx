import { Page } from '@/payload-types'
import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!

  const slug = typeof value !== 'string' && (value as unknown as Page)?.slug

  if (relationTo === 'posts') {
    return `/posts/${slug}`
  } else if (relationTo === 'users') {
    return `/users/${slug}`
  } else {
    return `/${slug}`
  }
}
