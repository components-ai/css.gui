import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { hastToEditorSchema } from './hast-to-editor-schema'

export const htmlToEditorSchema = (text: string) => {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(text)
  const processedTree = hastToEditorSchema(tree)

  if (processedTree.children.length > 1) {
    return processedTree
  }

  const htmlBody = processedTree.children[0]
  return htmlBody
}
