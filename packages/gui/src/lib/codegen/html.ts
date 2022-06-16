import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import { HtmlNode } from '../../components/html/types'
import { editorSchemaToHast } from '../transformers/editor-schema-to-hast'
import { format } from './format'

export const unstyledHtml = async (node: HtmlNode) => {
  const root = editorSchemaToHast(node)
  const output = unified().use(rehypeStringify).stringify(root)
  return format('html', output)
}

export const html = async (node: HtmlNode) => {
  const res = await fetch('https://components.ai/api/v1/gui/export/html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html: node }),
  })

  const html = await res.text()
  return html
}
