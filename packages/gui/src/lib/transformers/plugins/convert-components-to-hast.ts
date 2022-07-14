import { visit } from 'unist-util-visit'

export const convertComponentsToHast = () => (tree: any) => {
  visit(tree, 'component', (node) => {
    node.type = 'element'
    node.component = true
  })
}
