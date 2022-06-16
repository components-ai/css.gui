import { visit } from 'unist-util-visit'

type Options = {
  propertiesToRemove?: string[]
}
export const removeProperties = (options: Options) => (tree: any) => {
  const { propertiesToRemove } = options
  visit(tree, 'element', (node) => {
    const properties = Object.entries(node.properties).reduce(
      (acc: any, curr: any) => {
        const [key, value] = curr
        if (propertiesToRemove?.includes(key)) {
          return acc
        }

        return {
          ...acc,
          [key]: value,
        }
      },
      {}
    )

    node.properties = properties
  })
}
