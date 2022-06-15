import { visit } from 'unist-util-visit'

export const moveStyleToTopLevel = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (!node.properties.style) {
      return
    }

    node.style = node.properties.style
    delete node.properties.style
  })
}
