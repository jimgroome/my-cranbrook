import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from '@/components/rich-text/convertors'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
  const { className, ...rest } = props

  return <RichTextConverter {...rest} className={className} converters={jsxConverter} />
}
