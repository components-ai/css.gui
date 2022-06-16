import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'

type Extracted = {
  styles: string
  html: string
}
export const extractStyles = async (html: string): Promise<Extracted> => {
  const styles: string[] = []
  const processed = String(
    await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeStringify)
      .use(() => (tree) => {
        visit(tree, 'element', (node: any) => {
          if (node.tagName !== 'style') {
            return
          }

          styles.push(node.children[0].value)
        })
      })
      .use(() => (tree) => {
        // @ts-ignore
        remove(tree, 'element', (node: any) => node.tagName === 'style')
      })
      .processSync(html)
  )

  return { styles: styles.join('\n'), html: processed }
}
