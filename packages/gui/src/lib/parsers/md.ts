import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { hastToEditorSchema } from '../transformers/hast-to-editor-schema'

export const md = (mdString: string) => {
  const tree = toHast(fromMarkdown(mdString))!
  return hastToEditorSchema({
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'div',
        children: (tree as any).children,
      },
    ],
  })
}
