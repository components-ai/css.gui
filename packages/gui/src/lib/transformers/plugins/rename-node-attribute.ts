import { visit } from 'unist-util-visit'

export const renameNodeAttribute = (
  tree: any,
  currKey: string,
  newKey: string
) => {
  visit(tree, 'element', (node) => {
    if (!node[currKey]) {
      return
    }

    const currValue: Record<string, string[]> = node[currKey]

    node[newKey] = currValue
    delete node[currKey]
  })
}
