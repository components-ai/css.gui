import { toCSSObject } from '../../lib'
import { ElementData } from './types'

interface Props {
  value: ElementData
}

export function HtmlRenderer({ value }: Props) {
  const { tagName, attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'
  return (
    <Tag {...attributes} sx={{ ...toCSSObject(style) }}>
      {children.map((child, i) => {
        if (typeof child === 'string') {
          return child
        }
        return <HtmlRenderer key={i} value={child} />
      })}
    </Tag>
  )
}
