import { visit } from 'unist-util-visit'

export const moveStyleToProperties = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (!node.style) {
      return
    }

    node.properties.style = node.style
    delete node.style
  })
}
