import { unified } from 'unified'
import { attributesToProperties } from './plugins/attributes-to-properties'
import { moveStyleToProperties } from './plugins/move-style-to-properties'

export const editorSchemaToHast = (node: any) => {
  const processedTree = unified()
    .use(attributesToProperties)
    .use(moveStyleToProperties)
    .runSync(node)
  return processedTree
}
