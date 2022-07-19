import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import { fromMarkdown } from 'mdast-util-from-markdown'

export const mdToHtml = (text: string) => {
  const mdast = fromMarkdown(text)
  const hast = toHast(mdast)!
  return toHtml(hast)
}
