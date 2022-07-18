import { unified } from 'unified'
import { cleanNewLines } from './plugins/clean-new-lines'
import { propertiesToAttributes } from './plugins/properties-to-attributes'
import { Root } from 'rehype-parse/lib'

export const hastToEditorSchema = (tree: Root) => {
  const processedTree = unified()
    .use(cleanNewLines)
    // @ts-ignore
    .use(propertiesToAttributes)
    .runSync(tree)

  const htmlBody = processedTree.children[0]
  return htmlBody
}
