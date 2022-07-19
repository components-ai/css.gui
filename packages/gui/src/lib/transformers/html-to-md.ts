import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { toMdast } from 'hast-util-to-mdast'
import { toMarkdown } from 'mdast-util-to-markdown'

export const htmlToMd = (text: string) => {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(text)
  const mdast = toMdast(tree)
  return toMarkdown(mdast)
}
