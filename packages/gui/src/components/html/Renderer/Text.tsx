import { ElementPath, HtmlNode } from '../types'

type TextRendererProps = {
  value: HtmlNode
  path: ElementPath
}
export function TextRenderer({ value }: TextRendererProps) {
  return <>{value.value}</>
}
