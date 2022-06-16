import { toH } from 'hast-to-hyperscript'
import { HtmlNode } from '../../components/html/types'
import { editorSchemaToHast } from '../transformers/editor-schema-to-hast'
import { toCSSObject } from './to-css-object'
import { stringifyHastNode } from './stringify-hast-node'
import { toReactProps } from './to-react-props'

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
  const root = editorSchemaToHast(node)
  const functionBody = stringifyHastNode(toH(h, root))

  const output = `
  /** @jsxImportSource @emotion/react */
  export default function Component() {
    return (
      ${functionBody}
    )
  }
  `

  try {
    const res = await fetch('https://components.ai/api/format', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ format: 'js', src: output }),
    })

    const { src } = await res.json()
    return src
  } catch (e) {
    return output
  }
}
