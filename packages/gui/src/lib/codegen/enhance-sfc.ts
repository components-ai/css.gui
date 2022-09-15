import { toH } from 'hast-to-hyperscript'
import { HtmlNode } from '../../components/html/types'
import { editorSchemaToHast } from '../transformers/editor-schema-to-hast'
import { toCSSObject } from './to-css-object'
import { stringifyHastNode } from './stringify-hast-node-as-html'
import { toReactProps } from './to-react-props'
import { format } from './format'
import { getSlots } from './util'
import { kebabCase } from 'lodash-es'

const h = (tagName: string, props: any, children?: any[]) => {
  const newProps = toReactProps(props)

  if (newProps.style) {
    const style = newProps.style
    delete newProps.style
    newProps.style = toCSSObject(style)
  }

  return { tagName, props: newProps, children }
}

export const enhanceSFC = async (node: HtmlNode) => {
  const root = editorSchemaToHast(node, { addSlotTagSyntax: true })
  const functionBody = stringifyHastNode(toH(h, root))

  const output = `
  export default function Component({ html, state = {} }) {
    ${getAttrSyntax(node)}
    return html\`
      ${functionBody}
    \`
  }
  `

  return format('js', output)
}

export const getAttrSyntax = (value: HtmlNode) => {
  const slots = getSlots(value)

  if (!slots.length) {
    return ''
  }

  const props = slots.map((slot) => kebabCase(slot.name)).join(', ')
  const attrString = props.length ? `{ ${props} }` : ''

  return `
    const { attrs } = state
    const ${attrString} = attrs
  `
}
