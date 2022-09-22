import { camelCase, cloneDeep } from 'lodash-es'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { attributesToProperties } from './plugins/attributes-to-properties'
import { convertComponentsToHast } from './plugins/convert-components-to-hast'
import { moveStyleToProperties } from './plugins/move-style-to-properties'
import { removeProperties } from './plugins/remove-properties'

type Options = {
  removeStyleProperty?: boolean
  addSlotSyntax?: boolean
  addSlotTagSyntax?: boolean
}
export const editorSchemaToHast = (node: any, options?: Options) => {
  const propertiesToRemove: string[] = []

  if (options?.removeStyleProperty) {
    propertiesToRemove.push('style')
  }

  const processedTree = unified()
    .use(convertComponentsToHast)
    // @ts-ignore
    .use(attributesToProperties)
    .use(moveStyleToProperties as any)
    // @ts-ignore
    .use(removeProperties, { propertiesToRemove })
    .use(() => (tree) => {
      if (options?.addSlotSyntax) {
        visit(tree, 'slot', (node) => {
          node.type = 'text'
          node.value = `{${camelCase(node.name)}}`
        })
      }
      if (options?.addSlotTagSyntax) {
        visit(tree, 'slot', (node) => {
          node.type = 'text'
          node.value = `<slot name="${camelCase(node.name)}"></slot>`
        })
      }
    })
    .runSync(cloneDeep(node))

  return processedTree
}
