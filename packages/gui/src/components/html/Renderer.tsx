import { toCSSObject } from '../../lib'
import { ElementData } from './types'
import { HTMLFontTags } from './FontTags'

interface Props {
  value: ElementData
}

export function HtmlRenderer({ value }: Props) {
  return (
    <>
      <HTMLFontTags htmlTree={value} />
      <ElementRenderer value={value} />
    </>
  )
}

function ElementRenderer({ value }: Props) {
  const { tagName, attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'

  return (
    <>
      <Tag {...attributes} sx={{ ...toCSSObject(style) }}>
        {children.map((child, i) => {
          if (typeof child === 'string') {
            return child
          }
          return <ElementRenderer key={i} value={child} />
        })}
      </Tag>
    </>
  )
}
