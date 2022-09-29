import { cloneDeep } from 'lodash-es'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import hash from '../hash'
import { stringifyCSSObject } from '../codegen/stringify-css-object'
import { toCSSObject } from '../codegen/to-css-object'
import { addCSSClassSyntax } from '../classes'
import { CodegenOptions } from '../codegen/types'

export const inlineStylesToStyleElement = (
  node: any,
  options: CodegenOptions
) => {
  const styleMap: Record<string, any> = {}
  const processedTree = unified()
    .use(() => (tree) => {
      visit(tree, 'element', (node: any) => {
        if (!node.properties.style) {
          return
        }

        const style = node.properties.style
        // @ts-ignore
        const selector = 'css-' + hash(JSON.stringify(style))

        if (!node.properties.class) {
          node.properties.class = selector
        } else {
          node.properties.class = node.properties.class + ' ' + selector
        }

        delete node.properties.style

        styleMap[selector] = stringifyCSSObject(
          toCSSObject(style, options?.theme),
          addCSSClassSyntax(selector)
        )
      })
    })
    .runSync(cloneDeep(node))

  return {
    node: processedTree,
    styles: Object.values(styleMap).join('\n'),
  }
}
