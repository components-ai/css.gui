import { toH } from 'hast-to-hyperscript'
import { HtmlNode } from '../../components/html/types'
import { editorSchemaToHast } from '../transformers/editor-schema-to-hast'
import { toCSSObject } from './to-css-object'
import { stringifyHastNode } from './stringify-hast-node'
import { toReactProps } from './to-react-props'
import { format } from './format'
import { getPropSyntax } from './util'

const h = (tagName: string, props: any, children?: any[]) => {
  const newProps = toReactProps(props)

  if (newProps.style) {
    const style = newProps.style
    delete newProps.style
    newProps.css = toCSSObject(style)
  }

  return { tagName, props: newProps, children }
}

export const emotion = async (node: HtmlNode) => {
  const root = editorSchemaToHast(node, { addSlotSyntax: true })
  const functionBody = stringifyHastNode(toH(h, root))

  const output = `
  /** @jsxImportSource @emotion/react */
  export default function Component(${getPropSyntax(node)}) {
    return (
      ${functionBody}
    )
  }
  `

  return format('js', output)
}
