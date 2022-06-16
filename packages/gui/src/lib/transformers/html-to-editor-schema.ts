import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { cleanNewLines } from './plugins/clean-new-lines'
import { propertiesToAttributes } from './plugins/properties-to-attributes'

export const htmlToEditorSchema = (text: string) => {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(text)

  const processedTree = unified()
    .use(cleanNewLines)
    // @ts-ignore
    .use(propertiesToAttributes)
    .runSync(tree)

  const htmlBody = processedTree.children[0]
  return htmlBody
}
