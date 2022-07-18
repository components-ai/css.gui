import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { hastToEditorSchema } from '../transformers/hast-to-editor-schema'

export const md = (mdString: string) => {
  const tree = toHast(fromMarkdown(mdString))
  // @ts-ignore
  const node = hastToEditorSchema(tree)
  return {
    type: 'element',
    tagName: 'div',
    children: [node],
  }
}
