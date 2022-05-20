import { remove } from 'unist-util-remove'
import { whitespaceRegexp } from '../../whitespace-regex'

export const cleanNewLines = () => (tree: any) => {
  // @ts-ignore
  remove(tree, 'text', (node) => {
    if (!node.value) {
      return false
    }

    return whitespaceRegexp().test(node.value)
  })
}
