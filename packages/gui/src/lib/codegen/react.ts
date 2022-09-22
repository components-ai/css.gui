import { toH } from 'hast-to-hyperscript'
import { HtmlNode } from '../../components/html/types'
import { extractStyles } from './extract-styles'
import { format } from './format'
import { html as toHtml } from './html'
import { stringifyHastNode } from './stringify-hast-node-as-jsx'
import { toReactProps } from './to-react-props'
import { CodegenOptions } from './types'

const h = (tagName: string, props: any, children?: any[]) => {
  const newProps = toReactProps(props)

  return { tagName, props: newProps, children }
}

export const react = async (
  node: HtmlNode,
  options: CodegenOptions
): Promise<string> => {
  const html = await toHtml(node, options)
  const { styles } = await extractStyles(html)
  const jsx = stringifyHastNode(toH(h, node as any))

  const output = `
    import * as React from 'react'

    export default function Component() {
      return (
        <>
          <Styles />${jsx}
        </>
      )
    }

    function Styles() {
      return <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    }

    const STYLES = \`${styles}\`
`

  return format('js', output)
}
