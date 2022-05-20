import { visit } from 'unist-util-visit'

export const propertiesToAttributes = () => (tree: any) => {
  visit(tree, 'element', (node) => {
    if (!node.properties) {
      return
    }

    const properties: Record<string, string[]> = node.properties
    const attributes = Object.entries(properties).reduce(
      (acc: Record<string, string>, curr: [string, string | string[]]) => {
        const [attr, value] = curr

        if (Array.isArray(value)) {
          return {
            [attr]: value.join(' '),
            ...acc,
          }
        }

        return {
          [attr]: value as string,
          ...acc,
        }
      },
      {}
    )

    node.attributes = attributes
    delete node.properties
    delete node.position
  })
}
