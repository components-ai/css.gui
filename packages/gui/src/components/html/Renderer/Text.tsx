import { HtmlNode } from '../types'

type TextRendererProps = {
  value: HtmlNode
}
export function TextRenderer({ value }: TextRendererProps) {
  return <>{value.value}</>
}
