import { isObject, isString } from 'lodash-es'
import { visit } from 'unist-util-visit'

export const transformStyleAttributes = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (!node.style || isObject(node.style)) {
      return
    }

    // TODO: Perform a style import
    // https://github.com/components-ai/css.gui/issues/506
    if (isString(node.style)) {
      delete node.style
    }
  })
}
