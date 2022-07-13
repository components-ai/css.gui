import { camelCase } from 'lodash-es'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { HtmlNode, Slot } from '../../components/html/types'

export const getSlots = (value: HtmlNode) => {
  if (value.type === 'text' || value.type === 'slot') {
    return []
  }

  let slots: Slot[] = []
  unified()
    .use(() => (tree: any) => {
      visit(tree, 'slot', (node: any) => {
        slots.push(node)
      })
    })
    .runSync(value)

  return slots
}

export const getPropSyntax = (value: HtmlNode) => {
  const slots = getSlots(value)
  const props = slots.map((slot) => camelCase(slot.name)).join(', ')
  return props.length ? `{ ${props} }` : ''
}
