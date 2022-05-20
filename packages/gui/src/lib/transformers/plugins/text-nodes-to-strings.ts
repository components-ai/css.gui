// https://github.com/syntax-tree/unist-util-map/blob/main/license
export function map(tree: any) {
  return preorder(tree, null)

  function preorder(node: any, index: number | null) {
    const newNode = node.type === 'text' ? node.value : node

    if ('children' in node) {
      newNode.children = node.children.map(function (child: any) {
        return preorder(child, index)
      })
    }

    return newNode
  }
}

export const textNodesToStrings = () => (tree: any) => {
  return map(tree)
}
