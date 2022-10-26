import { toH } from 'hast-to-hyperscript'
import { HtmlNode } from '../../components/html/types'
import { editorSchemaToHast } from '../transformers/editor-schema-to-hast'
import { toCSSObject } from './to-css-object'
import { stringifyHastNode } from './stringify-hast-node-as-html'
import { toReactProps } from './to-react-props'
import { format } from './format'
import { CodegenOptions } from './types'
import { Theme } from '../../types/theme'
import { inlineStylesToStyleElement } from '../transformers/inline-styles-to-style-element'

const h = (theme: Theme) => (tagName: string, props: any, children?: any[]) => {
  const newProps = toReactProps(props)

  if (newProps.style) {
    const style = newProps.style
    delete newProps.style
    newProps.style = toCSSObject(style, theme)
  }

  return { tagName, props: newProps, children }
}

export const astro = async (node: HtmlNode, options: CodegenOptions) => {
  const root = editorSchemaToHast(node, { addSlotTagSyntax: true })
  const { node: htmlNode, styles } = inlineStylesToStyleElement(root, options)
  // @ts-ignore
  const markup = stringifyHastNode(toH(h(options?.theme), htmlNode))

  const htmlString = `${markup}
${styles.trim() ? `\n<style>${styles}</style>\n` : ''}`
  const formattedHtmlString = await format('html', htmlString)

  const output = `---
---

${formattedHtmlString}`

  return format('html', output)
}
