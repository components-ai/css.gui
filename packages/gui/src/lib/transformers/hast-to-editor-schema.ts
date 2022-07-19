import { unified } from 'unified'
import { cleanNewLines } from './plugins/clean-new-lines'
import { propertiesToAttributes } from './plugins/properties-to-attributes'
import { Root } from 'rehype-parse/lib'
import { transformStyleAttributes } from './plugins/transform-style-attributes'
import { moveStyleToTopLevel } from './plugins/move-style-to-top-level'

export const hastToEditorSchema = (tree: Root) => {
  const processedTree = unified()
    .use(cleanNewLines)
    // @ts-ignore
    .use(moveStyleToTopLevel)
    // @ts-ignore
    .use(propertiesToAttributes)
    .use(transformStyleAttributes)
    .runSync(tree)

  const htmlBody = processedTree.children[0]
  return htmlBody
}
