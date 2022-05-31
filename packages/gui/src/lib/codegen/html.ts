import { HtmlNode } from '../../components/html/types'

export const html = async (node: HtmlNode) => {
  const res = await fetch('https://components.ai/api/v1/gui/export/html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html: node }),
  })

  const docHtml: string = await res.text()
  return docHtml
}
