import { toH } from 'hast-to-hyperscript'
import { HtmlNode } from '../../components/html/types'
import { extractStyles } from './extract-styles'
import { format } from './format'
import { html as toHtml } from './html'
import { stringifyHastNode } from './stringify-hast-node'
import { toReactProps } from './to-react-props'

const h = (tagName: string, props: any, children?: any[]) => {
  const newProps = toReactProps(props)

  return { tagName, props: newProps, children }
}

export const styledJsx = async (node: HtmlNode): Promise<string> => {
  const html = await toHtml(node)
  const { styles } = await extractStyles(html)
  const jsx = stringifyHastNode(toH(h, node as any))

  const output = `
    import * as React from 'react'

    export default function Component() {
      return (
        <>
          ${jsx}
          <styled jsx>{\`${styles}\`}</styled>
        </>
      )
    }
`

  return format('js', output)
}
