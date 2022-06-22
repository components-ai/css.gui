import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { attributesToProperties } from './plugins/attributes-to-properties'
import { moveStyleToProperties } from './plugins/move-style-to-properties'
import { removeProperties } from './plugins/remove-properties'

type Options = {
  removeStyleProperty: boolean
}
export const editorSchemaToHast = (node: any, options?: Options) => {
  const propertiesToRemove: string[] = []

  if (options?.removeStyleProperty) {
    propertiesToRemove.push('style')
  }

  const processedTree = unified()
    .use(attributesToProperties)
    .use(moveStyleToProperties as any)
    .use(removeProperties, { propertiesToRemove })
    .runSync(node)
  return processedTree
}
