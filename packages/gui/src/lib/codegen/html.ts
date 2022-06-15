import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'
import { HtmlNode } from '../../components/html/types'
import { editorSchemaToHast } from '../transformers/editor-schema-to-hast'

export const html = async (node: HtmlNode) => {
  const root = editorSchemaToHast(node)
  const output = unified().use(rehypeStringify).stringify(root)

  try {
    const res = await fetch('https://components.ai/api/format', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ format: 'html', src: output }),
    })

    const { src } = await res.json()
    return src
  } catch (e) {
    return output
  }
}

export const compiledHtml = async (node: HtmlNode) => {
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
